import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

export default withMDX({
  reactStrictMode: true,
  poweredByHeader: false,
  htmlLimitedBots:
    /Googlebot|Bingbot|GPTBot|ChatGPT-User|ClaudeBot|anthropic-ai|PerplexityBot|Bytespider|cohere-ai|Applebot|Google-Extended|Twitterbot|facebookexternalhit|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot/,
  async headers() {
    return [
      {
        source: "/api/og",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/opengraph-image",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/twitter-image",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
});
