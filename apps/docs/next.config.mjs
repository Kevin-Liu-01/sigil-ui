import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  htmlLimitedBots:
    /Googlebot|Bingbot|GPTBot|ChatGPT-User|ClaudeBot|anthropic-ai|PerplexityBot|Bytespider|cohere-ai|Applebot|Google-Extended|Twitterbot|facebookexternalhit|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot/,
};

export default withMDX(config);
