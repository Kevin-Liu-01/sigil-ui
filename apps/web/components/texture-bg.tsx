export function TextureBg({ opacity = 0.35, darkOpacity }: { opacity?: number; darkOpacity?: number }) {
  const dark = darkOpacity ?? Math.max(opacity - 0.05, 0.15);
  return (
    <>
      <img
        src="/images/texture-light.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover dark:hidden pointer-events-none"
        style={{ opacity }}
      />
      <img
        src="/images/texture-dark.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover dark:block pointer-events-none"
        style={{ opacity: dark }}
      />
    </>
  );
}
