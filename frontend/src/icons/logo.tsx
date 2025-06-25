export const Logo = () => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="bStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0ea5e9" />
          <stop offset="50%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>
      </defs>

      <path
        d="M30 15
       Q30 50 52 35
       Q68 25 50 52
       Q40 70 62 76
       Q80 80 60 90"
        stroke="url(#bStroke)"
        stroke-width="9"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        transform="skewX(-10)"
      />
    </svg>
  );
};
