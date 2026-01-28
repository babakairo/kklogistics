CREATE TABLE `chatConversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`leadId` int,
	`customerName` varchar(255),
	`customerPhone` varchar(20),
	`customerEmail` varchar(320),
	`isQualified` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `chatConversations_id` PRIMARY KEY(`id`),
	CONSTRAINT `chatConversations_sessionId_unique` UNIQUE(`sessionId`)
);
--> statement-breakpoint
CREATE TABLE `chatMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20) NOT NULL,
	`serviceType` enum('house_removal','furniture_delivery','office_move','courier') NOT NULL,
	`message` text,
	`pickupAddress` text,
	`deliveryAddress` text,
	`preferredDate` varchar(50),
	`status` enum('new','contacted','quoted','booked','completed','cancelled') NOT NULL DEFAULT 'new',
	`source` enum('form','chatbot','quote_calculator','phone') NOT NULL DEFAULT 'form',
	`notificationSent` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int,
	`serviceType` enum('house_removal','furniture_delivery','office_move','courier') NOT NULL,
	`pickupAddress` text NOT NULL,
	`deliveryAddress` text NOT NULL,
	`distanceKm` decimal(10,2),
	`itemCount` int,
	`estimatedPrice` decimal(10,2) NOT NULL,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quotes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `chatConversations` ADD CONSTRAINT `chatConversations_leadId_leads_id_fk` FOREIGN KEY (`leadId`) REFERENCES `leads`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chatMessages` ADD CONSTRAINT `chatMessages_conversationId_chatConversations_id_fk` FOREIGN KEY (`conversationId`) REFERENCES `chatConversations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quotes` ADD CONSTRAINT `quotes_leadId_leads_id_fk` FOREIGN KEY (`leadId`) REFERENCES `leads`(`id`) ON DELETE no action ON UPDATE no action;