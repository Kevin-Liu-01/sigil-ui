import * as React from "react";

export type BackgroundVariant = "dots" | "grid" | "lines";

interface ChartBackgroundProps {
  variant: BackgroundVariant;
}

function ChartBackground({ variant }: ChartBackgroundProps) {
  const id = React.useId().replace(/:/g, "");

  switch (variant) {
    case "dots":
      return (
        <defs>
          <pattern id={`bg-${id}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="0.75" fill="currentColor" opacity="0.15" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#bg-${id})`} />
        </defs>
      );
    case "grid":
      return (
        <defs>
          <pattern id={`bg-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#bg-${id})`} />
        </defs>
      );
    case "lines":
      return (
        <defs>
          <pattern id={`bg-${id}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#bg-${id})`} />
        </defs>
      );
    default:
      return null;
  }
}

export { ChartBackground };
