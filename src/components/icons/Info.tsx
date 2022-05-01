import { IconProps } from "../../types";

export const InfoIcon = ({ color = "white" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 24 24"
    width={32}
    height={32}
  >
    <g fill="none">
      <path d="M24 24h-24v-24h24Z"></path>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <line
        x1="11"
        x2="13.31"
        y1="15.5"
        y2="15.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <polyline
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        points="12.159,15.5 12.159,11.25 11.009,11.25"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.1 8.24726v0c0 .138071-.111929.25-.25.25 -.138071 0-.25-.111929-.25-.25 0-.138071.111929-.25.25-.25"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.85 7.99726h-1.09278e-08c.138071-6.03528e-09.25.111929.25.25"
      />
    </g>
  </svg>
);
