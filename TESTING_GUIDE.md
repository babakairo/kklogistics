# 🧪 TESTING GUIDE - Before & After Deployment

**Updated:** January 28, 2026

---

## 📱 MOBILE TESTING (Critical - Do This First!)

### Test Device Setup
- [ ] iPhone 12 mini (5.4") – smallest common phone
- [ ] iPhone 12 (6.1") – standard
- [ ] iPhone 12 Pro Max (6.7") – largest phone  
- [ ] Android phone (Samsung S21 or similar)
- [ ] iPad (tablet, landscape mode)
- [ ] Chrome DevTools mobile emulation

### Hero Section Tests
- [ ] Logo visible and clickable
- [ ] "Man with a Van Falkirk You Can Trust" headline is readable
- [ ] Trust badge visible ("5-Star • Insured • Same-Day")
- [ ] Subheadline mentions Scottish cities (Glasgow, Edinburgh, etc.)
- [ ] CTA buttons visible and tappable (44px+ height)
- [ ] "Get Free Quote" button works (navigates to /quote)
- [ ] "Call Now" button works (opens tel: link, initiates call)
- [ ] WhatsApp button works (opens WhatsApp or link)
- [ ] Hero image loads properly
- [ ] No horizontal scroll

### Services Section Tests
- [ ] 4 service cards visible (Removals, Furniture, Office, Courier)
- [ ] Cards are readable on small screens
- [ ] Service icons load
- [ ] "Learn more" links work
- [ ] No overlap or layout shift

### Mid-Page CTA Tests
- [ ] Section heading visible ("Get Your Quote in 60 Seconds")
- [ ] Both buttons visible (Quote + Call)
- [ ] Buttons are full-width and tappable

### Why Choose Us Tests
- [ ] Dark blue background loads
- [ ] Heading visible and readable
- [ ] 6 trust points are clearly listed
- [ ] Icons load properly
- [ ] Right side content (5.0 rating) is readable

### How It Works Tests
- [ ] 3 step cards visible
- [ ] Each step number is visible (1, 2, 3)
- [ ] Text is readable
- [ ] Icons load
- [ ] CTA buttons in each step work

### FAQ Tests
- [ ] All 8 questions visible in list
- [ ] FAQ heading visible
- [ ] Each question can be tapped/clicked
- [ ] Answers expand when tapped
- [ ] Answers collapse when tapped again
- [ ] "Call Us Now" button visible at bottom
- [ ] Call button works

### Sticky Mobile Buttons Tests (Most Important!)
```
DO THIS:
1. Open site on mobile
2. You should NOT see sticky buttons immediately (they're not there yet)
3. Scroll down ~400px (past hero section)
4. Sticky buttons should slide up from bottom
5. Click each button:
   - Call button → Initiates phone call
   - WhatsApp button → Opens WhatsApp (or link)
6. Buttons should be full-width and easily tappable
7. Scroll back up → Sticky buttons should disappear
```

### Footer Tests
- [ ] "Ready to Move?" CTA section visible
- [ ] Call + WhatsApp buttons prominent
- [ ] Links section readable
- [ ] Contact info visible
- [ ] All links work
- [ ] No horizontal scroll

### Forms Tests
- [ ] Quote form page loads properly
- [ ] Form inputs are tappable
- [ ] Keyboard appears when tapping inputs
- [ ] Form can be filled out on mobile
- [ ] Submit button is tappable

### Performance Tests
- [ ] Page loads in < 3 seconds
- [ ] No "Loading..." delays
- [ ] Images load properly
- [ ] Smooth scrolling
- [ ] No layout shift as page loads
- [ ] No overlapping elements

---

## 🖥️ DESKTOP TESTING

### Hero Section Tests
- [ ] 2-column layout (text left, image right)
- [ ] Headline is large and readable
- [ ] All CTAs visible and in a row
- [ ] Hero image displays on right
- [ ] Proper spacing

### Services Section Tests
- [ ] 4 service cards in a row (or 2x2 grid)
- [ ] Cards have good spacing
- [ ] Hover effects work on cards
- [ ] No layout issues

### Why Choose Us Section Tests
- [ ] 2-column layout (text left, rating right)
- [ ] Proper spacing
- [ ] Dark blue background extends full width
- [ ] Image/decoration on right loads

### FAQ Tests
- [ ] FAQ section is centered and readable
- [ ] Cards are in a single column
- [ ] Expand/collapse works on hover/click
- [ ] Numbered icons visible

### Sticky Buttons Tests
- [ ] Sticky buttons NOT visible on desktop (should be hidden by CSS)
- [ ] No mobile elements showing on desktop

### Hover States Tests
- [ ] Buttons change color on hover
- [ ] Links underline on hover
- [ ] Cards have shadow effect on hover
- [ ] All hover animations are smooth

### Browser Compatibility Tests
- [ ] Chrome (latest) – looks good
- [ ] Safari (latest) – looks good
- [ ] Firefox (latest) – looks good
- [ ] Edge (latest) – looks good

---

## 🔗 LINK & CTA TESTS

### All Button CTAs Should Work
- [ ] Hero "Get Free Quote" → Goes to /quote
- [ ] Hero "Call Now" → Phone call initiates
- [ ] Hero WhatsApp → Opens WhatsApp
- [ ] "How It Works" step buttons → Appropriate pages
- [ ] FAQ "Call Us Now" → Phone call initiates
- [ ] Footer "Call" button → Phone call initiates
- [ ] Footer "WhatsApp" button → Opens WhatsApp
- [ ] All "Learn more" links → Appropriate pages

### Navigation Tests
- [ ] Logo click → Goes to home
- [ ] Menu links work
- [ ] Back button works
- [ ] No broken links (404s)

---

## ⚙️ FUNCTIONALITY TESTS

### Form Tests
- [ ] Quote form inputs work
- [ ] Contact form inputs work
- [ ] Forms can be submitted
- [ ] Success messages appear
- [ ] Form data is received (check backend/email)

### Map Tests (if present)
- [ ] Map loads
- [ ] Map is interactive
- [ ] Service area is visible

### Chat Widget Tests
- [ ] Chat widget appears (bottom right)
- [ ] Chat can be opened
- [ ] Messages can be sent

---

## 🎨 VISUAL TESTS

### Colors
- [ ] Trust badge colors are visible (blue, green, amber)
- [ ] Primary button is clearly visible (blue)
- [ ] WhatsApp button is green (standard)
- [ ] Text contrast is readable (accessibility)

### Images
- [ ] Hero van image loads
- [ ] Service card images load
- [ ] No broken image placeholders
- [ ] Images are properly sized (not pixelated)

### Icons
- [ ] All icons load properly
- [ ] Icons are correct for their purpose
- [ ] Icon colors are appropriate

### Text
- [ ] Font is readable (Inter)
- [ ] Headings are properly sized
- [ ] Line spacing is good
- [ ] No text overflow

---

## 📊 PERFORMANCE TESTS

### Load Time
- [ ] Page loads in < 3 seconds (mobile)
- [ ] Page loads in < 2 seconds (desktop)
- [ ] No "Loading..." states longer than 2 seconds

### Lighthouse Score
- [ ] Run Lighthouse in Chrome DevTools
- [ ] Performance: 80+
- [ ] Accessibility: 85+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

### Mobile PageSpeed Insights
- [ ] Run on Google PageSpeed Insights
- [ ] Score: 75+

---

## 🔍 SEO TESTS

### Meta Tags
- [ ] Page title is correct and keyword-rich
- [ ] Meta description is present and descriptive
- [ ] Open Graph tags are present
- [ ] Twitter tags are present

### Structured Data
- [ ] Schema markup is valid (test with validator)
- [ ] Breadcrumb schema is present
- [ ] FAQ schema is present
- [ ] LocalBusiness schema is present

### Accessibility
- [ ] All images have alt text
- [ ] Form labels are connected to inputs
- [ ] Focus states are visible (keyboard nav)
- [ ] Color contrast passes WCAG AA

---

## 🚀 DEPLOYMENT TESTS

### Before Deploy
```bash
# Run these commands
npm run build     # Should complete without errors
npm run dev       # Should start without warnings
```

### After Deploy
- [ ] Production URL loads
- [ ] No 404 errors
- [ ] No console errors (F12 → Console)
- [ ] All features work
- [ ] All links work

---

## 📈 ANALYTICS TESTS

### Track These Events
- [ ] Hero Quote button click
- [ ] Hero Call button click  
- [ ] Sticky Call button click
- [ ] Sticky WhatsApp button click
- [ ] FAQ expand/collapse
- [ ] Form submission

### Monitor These Metrics
- [ ] Page load time
- [ ] Bounce rate
- [ ] Session duration
- [ ] Mobile vs desktop traffic
- [ ] Form completion rate
- [ ] Phone call clicks

---

## ✅ TESTING CHECKLIST

### Mobile (30 minutes)
- [ ] Sticky buttons appear/disappear correctly
- [ ] All CTAs work
- [ ] No horizontal scroll
- [ ] Images load
- [ ] Forms work
- [ ] Page loads fast

### Desktop (15 minutes)
- [ ] 2-column layouts work
- [ ] Hover states work
- [ ] Sticky buttons hidden
- [ ] All browsers look good
- [ ] Performance is good

### Links & Forms (10 minutes)
- [ ] All links work
- [ ] All CTAs work
- [ ] Forms submit
- [ ] No 404s

### SEO (10 minutes)
- [ ] Meta tags present
- [ ] Schema markup valid
- [ ] Accessibility good

### Performance (5 minutes)
- [ ] Lighthouse 80+
- [ ] PageSpeed Insights 75+
- [ ] Load time < 3s

**Total Time:** ~70 minutes

---

## 🐛 COMMON ISSUES TO WATCH FOR

### Mobile Issues
- [ ] Sticky buttons overlap content (fix: ensure proper z-index)
- [ ] Buttons too small to tap (fix: ensure 44px+ height)
- [ ] Horizontal scroll (fix: check max-width)
- [ ] Text too small (fix: check font-size)

### Desktop Issues
- [ ] Sticky buttons visible (fix: add `md:hidden`)
- [ ] Layout breaks on wide screens (fix: add max-width)
- [ ] Hover effects not smooth (fix: add transition)

### Link Issues
- [ ] Links go to wrong page (fix: check href values)
- [ ] Phone link doesn't work (fix: check tel: format)
- [ ] WhatsApp link doesn't open (fix: check URL format)

### Form Issues
- [ ] Form doesn't submit (fix: check form handler)
- [ ] Data not saved (fix: check backend)
- [ ] Validation doesn't work (fix: check validation rules)

---

## 📱 DEVICE-SPECIFIC TESTS

### iPhone Tests
- [ ] All buttons work with thumb tap
- [ ] Text is readable without zooming
- [ ] Phone call initiates correctly
- [ ] WhatsApp link works (opens app or web)

### Android Tests
- [ ] All buttons work with touch
- [ ] Text is readable
- [ ] Phone call works
- [ ] WhatsApp works

### Tablet Tests (iPad/Android)
- [ ] Landscape mode works
- [ ] Portrait mode works
- [ ] Touch targets are good
- [ ] Layout is readable

---

## ✨ USER EXPERIENCE TESTS

### First-Time Visitor
- [ ] Homepage is clear about what you do
- [ ] Trust is immediately apparent
- [ ] CTA is obvious
- [ ] Can easily find phone number
- [ ] Can easily message on WhatsApp

### Mobile Visitor
- [ ] Can easily call you (sticky button)
- [ ] Can easily message on WhatsApp
- [ ] Forms are easy to fill
- [ ] Easy to navigate to services
- [ ] Easy to find contact info

### Desktop Visitor
- [ ] Professional appearance
- [ ] Easy to navigate
- [ ] All information visible
- [ ] CTAs are clear
- [ ] Form is easy to use

---

## 🎯 SUCCESS CRITERIA

✅ **All of these must pass before deployment:**

- [ ] Mobile sticky buttons work perfectly
- [ ] All links work (no 404s)
- [ ] All CTAs work (Call, WhatsApp, Quote)
- [ ] Forms submit successfully
- [ ] Page loads in < 3 seconds
- [ ] No console errors
- [ ] No layout issues on any device
- [ ] Accessibility is good (alt text, labels, etc.)
- [ ] Schema markup is valid
- [ ] Lighthouse score 80+

---

## 📝 TEST REPORT TEMPLATE

Use this to document your testing:

```
Testing Date: ___________
Tester Name: ___________

Mobile Testing:
- iPhone 12: ___________
- Android: ___________
- Tablet: ___________

Desktop Testing:
- Chrome: ___________
- Safari: ___________
- Firefox: ___________
- Edge: ___________

Issues Found:
1. ___________________________________________
2. ___________________________________________
3. ___________________________________________

Fixes Applied:
1. ___________________________________________
2. ___________________________________________

Ready to Deploy: [ ] YES  [ ] NO

Tester Signature: ___________________
```

---

## 🚀 FINAL SIGN-OFF

When you've completed all testing:

- [ ] All critical tests passed
- [ ] No major issues found
- [ ] Performance is good
- [ ] Mobile experience is smooth
- [ ] All CTAs work
- [ ] Ready to deploy!

**Good luck! 🎉**
