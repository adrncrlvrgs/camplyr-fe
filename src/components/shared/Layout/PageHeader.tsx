const PageHeader = (props: any) => {
  const { children } = props;
  return (
    <header className="relative z-50 border-dashed border-b border-neutral-500 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm dark:bg-neutral-800">
      <nav className="max-w-[85rem] border-dashed border-x border-neutral-500  w-full mx-auto px-4 py-1.5  sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold dark:text-white focus:outline-hidden focus:opacity-80"
            href="#"
            aria-label="Brand"
          >
            <svg
              className="w-10 h-auto"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" rx="10" fill="black" />
              <g
                transform="translate(-10,95) scale(0.006,-0.006)"
                fill="white"
                stroke="none"
              >
                <path
                  d="M9220 12403 c-868 -88 -1637 -385 -2320 -897 -194 -145 -323 -258
    -500 -435 -746 -751 -1200 -1714 -1305 -2767 -12 -121 -13 -169 -5 -208 21
    -96 86 -177 179 -220 l46 -21 2045 0 2045 0 53 24 c71 32 147 115 167 183 13
    46 15 293 15 2074 l0 2023 -21 58 c-29 76 -96 143 -172 172 -56 20 -124 25
    -227 14z"
                />
                <path
                  d="M10553 12364 c-57 -21 -129 -87 -161 -148 l-27 -51 0 -2060 0 -2060
    27 -51 c15 -28 48 -70 73 -92 89 -78 -100 -72 2181 -72 l2042 0 63 33 c77 39
    130 105 154 188 14 51 15 76 5 182 -122 1365 -853 2605 -1990 3376 -411 279
    -848 481 -1343 621 -384 109 -907 178 -1024 134z"
                />
                <path
                  d="M14240 7200 c-647 -86 -1232 -288 -1770 -610 -939 -563 -1648 -1445
    -1994 -2482 -117 -350 -214 -843 -218 -1113 -2 -77 2 -98 24 -146 29 -64 80
    -119 141 -151 l42 -23 2050 -3 c2333 -3 2107 -11 2206 87 98 99 89 -125 89
    2186 0 2279 7 2082 -76 2174 -25 27 -68 61 -96 75 -46 23 -63 26 -157 25 -59
    0 -167 -9 -241 -19z"
                />
                <path
                  d="M5310 7136 c-58 -15 -110 -47 -149 -92 -76 -86 -87 -144 -66 -348
    154 -1547 1078 -2903 2460 -3612 542 -278 1174 -458 1724 -490 95 -6 112 -4
    165 16 79 30 146 97 175 173 l21 58 0 2023 c0 1781 -2 2028 -15 2074 -20 68
    -96 151 -167 183 l-53 24 -2025 2 c-1579 1 -2035 -1 -2070 -11z"
                />
              </g>
            </svg>
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              id="hs-navbar-example-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-example"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-example"
            >
              <svg
                className="hs-collapse-open:hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>
        <div
          id="hs-navbar-example"
          className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          aria-labelledby="hs-navbar-example-collapse"
        >
          {children}
        </div>
      </nav>
    </header>
  );
};

export default PageHeader;
