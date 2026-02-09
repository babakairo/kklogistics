import { Helmet } from "react-helmet-async";

const SITE_URL = "https://kaithanlogistics.co.uk";
const DEFAULT_DESCRIPTION = "Professional removals, furniture delivery & courier services across Scotland. Falkirk-based, fully insured, same-day available. Free instant quotes. 07459 920 895.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

type SeoProps = {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const toAbsoluteUrl = (pathOrUrl?: string) => {
  if (!pathOrUrl) return SITE_URL;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
};

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = "/",
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  schema,
}: SeoProps) {
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const schemaItems = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={toAbsoluteUrl(ogImage)} />
      <meta property="og:site_name" content="Kaithan Logistics" />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={toAbsoluteUrl(ogImage)} />

      {schemaItems.map((item, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Helmet>
  );
}
