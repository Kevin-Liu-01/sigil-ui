import DemoPageClient, { DEMOS } from "./demo-page-client";

const SLUGS = Object.keys(DEMOS);

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DemoPageClient slug={slug} />;
}
