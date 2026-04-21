interface SynapseIconProps {
  className?: string;
  "aria-hidden"?: boolean;
}

/**
 * Neural network icon representing the Synapse AI brand.
 * Uses currentColor so it adapts automatically to light/dark themes.
 * Structure: 1 central node + 8 peripheral nodes (cardinal + diagonal),
 * connected by lines with opacity layering for visual hierarchy.
 */
export function SynapseIcon({
  className,
  "aria-hidden": ariaHidden = true,
}: SynapseIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
    >
      {!ariaHidden && <title>Synapse AI</title>}
      {/* Connection lines — cardinal directions (higher opacity) */}
      <line
        x1="16"
        y1="16"
        x2="16"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="16"
        x2="27"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="16"
        x2="16"
        y2="27"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="16"
        x2="5"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />

      {/* Connection lines — diagonal directions (lower opacity) */}
      <line
        x1="16"
        y1="16"
        x2="23.8"
        y2="8.2"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="16"
        x2="23.8"
        y2="23.8"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="16"
        x2="8.2"
        y2="23.8"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="16"
        x2="8.2"
        y2="8.2"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />

      {/* Peripheral nodes — cardinal (more prominent) */}
      <circle cx="16" cy="5" r="2.2" fill="currentColor" fillOpacity="0.75" />
      <circle cx="27" cy="16" r="2.2" fill="currentColor" fillOpacity="0.75" />
      <circle cx="16" cy="27" r="2.2" fill="currentColor" fillOpacity="0.75" />
      <circle cx="5" cy="16" r="2.2" fill="currentColor" fillOpacity="0.75" />

      {/* Peripheral nodes — diagonal (slightly smaller) */}
      <circle
        cx="23.8"
        cy="8.2"
        r="1.7"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <circle
        cx="23.8"
        cy="23.8"
        r="1.7"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <circle
        cx="8.2"
        cy="23.8"
        r="1.7"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <circle cx="8.2" cy="8.2" r="1.7" fill="currentColor" fillOpacity="0.5" />

      {/* Central node — most prominent */}
      <circle cx="16" cy="16" r="3.5" fill="currentColor" fillOpacity="0.95" />
      <circle cx="16" cy="16" r="2" fill="currentColor" fillOpacity="1" />
    </svg>
  );
}
