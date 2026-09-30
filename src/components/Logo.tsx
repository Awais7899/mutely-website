/**
 * The Mutely mark: pin over its geofence ring on an indigo circle. Same geometry as the
 * app's launcher icon (108-unit grid cropped to the 72-unit safe zone).
 */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="36" fill="#4F46E5" />
      <g transform="translate(-18 -18)">
        <path
          d="M34,74a20,6 0 1,0 40,0a20,6 0 1,0 -40,0z"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="3"
        />
        <path
          fillRule="evenodd"
          fill="#fff"
          d="M54,30c-9.4,0 -17,7.6 -17,17c0,12.7 17,28 17,28s17,-15.3 17,-28c0,-9.4 -7.6,-17 -17,-17zM54,40.5a6.5,6.5 0 1,1 0,13a6.5,6.5 0 1,1 0,-13z"
        />
      </g>
    </svg>
  );
}
