// Define type for size keys
type SizeKey = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

// Define reusable variant structure
interface SizeVariant {
  container: string;
  svg: string;
  title: string;
  desc: string;
}

// Map of size keys to their class names
const sizeMap: Record<SizeKey, SizeVariant> = {
  sm: {
    container: "p-4",
    svg: "w-16 h-16",
    title: "text-base",
    desc: "text-xs",
  },
  md: {
    container: "p-6",
    svg: "w-20 h-20",
    title: "text-lg",
    desc: "text-sm",
  },
  lg: {
    container: "p-8",
    svg: "w-24 h-24",
    title: "text-xl",
    desc: "text-base",
  },
  xl: {
    container: "p-10",
    svg: "w-32 h-32",
    title: "text-2xl",
    desc: "text-lg",
  },
  "2xl": {
    container: "p-12",
    svg: "w-36 h-36",
    title: "text-3xl",
    desc: "text-xl",
  },
  "3xl": {
    container: "p-14",
    svg: "w-40 h-40",
    title: "text-4xl",
    desc: "text-2xl",
  },
};


interface EmptyComponentProps {
  size?: SizeKey;
  className?: string;
}

// Empty Cart Component
export const EmptyCart: React.FC<EmptyComponentProps> = ({ size = "md", className = "" }) => {
  const s = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center ${s.container} ${className}`}>
      <div className="mb-4 relative">
        <svg className={s.svg} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cart body */}
          <path d="M20 35h55l-5 30H25l-5-30z" fill="#374151" stroke="#4b5563" strokeWidth="1.5" />
          {/* Cart handle */}
          <path d="M10 25h8l7 40h45l7-30" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
          {/* Wheels */}
          <circle cx="30" cy="75" r="4" fill="#4b5563" />
          <circle cx="60" cy="75" r="4" fill="#4b5563" />
          {/* Plus icon with primary color */}
          <circle cx="47.5" cy="50" r="8" fill="#ffc845" fillOpacity="0.2" stroke="#ffc845" strokeWidth="2" />
          <path d="M42 50h11M47.5 44.5v11" stroke="#ffc845" strokeWidth="2.5" strokeLinecap="round" />
          {/* Floating elements */}
          <circle cx="60" cy="30" r="8.5" fill="#ffc845" fillOpacity="0.7">
            <animate attributeName="cy" values="20;10;20" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy="25" r="5.5" fill="#ffc845" fillOpacity="0.5">
            <animate attributeName="cy" values="25;22;25" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <h3 className={`font-semibold text-gray-800 mb-2 ${s.title}`}>Your cart is empty</h3>
    </div>
  );
};


// Empty Wishlist Component
export const EmptyWishlist: React.FC<EmptyComponentProps> = ({ size = "md", className = "" }) => {

  const s = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center ${s.container} ${className}`}>
      <div className="mb-4 relative">
        <svg className={s.svg} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Heart shape */}
          <path d="M50 75c-15-12-25-22-25-35 0-10 8-18 18-18 5 0 10 2 12 6 2-4 7-6 12-6 10 0 18 8 18 18 0 13-10 23-25 35z"
            fill="#374151" stroke="#4b5563" strokeWidth="1.5" />
          {/* Heart accent */}
          <path d="M50 65c-10-8-18-16-18-25 0-7 6-13 13-13 3 0 6 1 8 4 2-3 5-4 8-4 7 0 13 6 13 13 0 9-8 17-18 25z"
            fill="#ffc845" fillOpacity="0.15" />
          {/* Animated sparkles */}
          <g>
            <circle cx="15" cy="25" r="3.5" fill="#ffc845">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="75" cy="30" r="4" fill="#ffc845">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="70" r="3" fill="#ffc845">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="20" cy="55" r="6.5" fill="#ffc845">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
            </circle>
          </g>
          {/* Star accents */}
          <path d="M35 20l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#ffc845" fillOpacity="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0 35 20;360 35 20" dur="8s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
      <h3 className={`font-semibold text-gray-800 mb-2 ${s.title}`}>Your wishlist is empty</h3>
      <p className={`text-gray-600 text-center max-w-xs leading-relaxed ${s.desc}`}>
        Save items you love for easy access later
      </p>
    </div>
  );
};

// Empty Search/Page Component
export const EmptyPage: React.FC<EmptyComponentProps> = ({ size = "md", className = "" }) => {
  const s = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center ${s.container} ${className}`}>
      <div className="mb-4 relative">
        <svg className={s.svg} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Search glass body */}
          <circle cx="40" cy="40" r="20" fill="#374151" stroke="#4b5563" strokeWidth="2" />
          <circle cx="40" cy="40" r="15" fill="none" stroke="#6b7280" strokeWidth="1.5" />
          {/* Search handle */}
          <path d="M55 55l15 15" stroke="#4b5563" strokeWidth="3" strokeLinecap="round" />
          {/* Question mark inside */}
          <path d="M40 50v-2c0-4 3-6 6-6s6 2 6 6c0 3-3 4-6 4" fill="none" stroke="#ffc845" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="40" cy="54" r="1.5" fill="#ffc845" />
          {/* Floating search elements */}
          <g>
            <rect x="15" y="15" width="8" height="2" rx="1" fill="#ffc845" fillOpacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </rect>
            <rect x="75" y="20" width="6" height="2" rx="1" fill="#ffc845" fillOpacity="0.4">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
            </rect>
            <rect x="20" y="75" width="5" height="2" rx="1" fill="#ffc845" fillOpacity="0.5">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.8s" repeatCount="indefinite" />
            </rect>
          </g>
        </svg>
      </div>
      <h3 className={`font-semibold text-gray-800 mb-2 ${s.title}`}>No results found</h3>
      <p className={`text-gray-600 text-center max-w-xs leading-relaxed ${s.desc}`}>
        Try different keywords or browse our categories
      </p>
    </div>
  );
};


// Error State Component
export const ErrorState: React.FC<EmptyComponentProps> = ({ size = "md", className = "" }) => {
  const s = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center ${s.container} ${className}`}>
      <div className="mb-4 relative">
        <svg className={s.svg} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Warning circle */}
          <circle cx="50" cy="50" r="25" fill="#374151" stroke="#4b5563" strokeWidth="2" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#6b7280" strokeWidth="1" />
          {/* Exclamation mark */}
          <path d="M50 35v18" stroke="#ffc845" strokeWidth="3.5" strokeLinecap="round">
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </path>
          <circle cx="50" cy="60" r="2.5" fill="#ffc845">
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Tool elements around */}
          <g transform="translate(20, 15)" opacity="0.7">
            <rect x="0" y="0" width="10" height="3" rx="1.5" fill="#6b7280" />
            <rect x="0" y="4" width="8" height="2" rx="1" fill="#6b7280" />
          </g>
          <g transform="translate(70, 20) rotate(30)" opacity="0.6">
            <rect x="0" y="0" width="8" height="2" rx="1" fill="#6b7280" />
            <rect x="3" y="-3" width="2" height="8" rx="1" fill="#6b7280" />
          </g>
          <g transform="translate(15, 70)" opacity="0.5">
            <circle cx="4" cy="4" r="4" fill="none" stroke="#6b7280" strokeWidth="1.5" />
            <circle cx="4" cy="4" r="1" fill="#ffc845" />
          </g>
          <g transform="translate(75, 75)" opacity="0.6">
            <path d="M0 4L4 0L8 4L4 8Z" fill="#6b7280" />
            <circle cx="4" cy="4" r="1" fill="#ffc845" />
          </g>
        </svg>
      </div>
      <h3 className={`font-semibold text-gray-800 mb-2 ${s.title}`}>Something went wrong</h3>
      <p className={`text-gray-600 text-center max-w-xs leading-relaxed ${s.desc}`}>
        We're working on it. Please try again in a moment
      </p>
    </div>
  );
};