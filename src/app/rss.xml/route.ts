import { getPosts, getSiteSettings } from "@/lib/content";

export async function GET() {
  const [posts, settings] = await Promise.all([getPosts(), getSiteSettings()]);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tariqleon.com";

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const pubDate = post.entry.publish_date
        ? new Date(post.entry.publish_date).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${post.entry.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.entry.excerpt || ""}]]></description>
      <category>${post.entry.category || "General"}</category>
      <pubDate>${pubDate}</pubDate>
      <author>contact@tariqleon.com (${settings.display_name})</author>
    </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${settings.display_name} · Notes & Dispatches]]></title>
    <link>${baseUrl}/blog</link>
    <description><![CDATA[${settings.tagline}]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
