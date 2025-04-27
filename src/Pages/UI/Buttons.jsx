export function Buttons({ children, className, ...props }) {
    return (
      <button
        {...props}
        className={`px-6 py-3 rounded-2xl bg-green-700 text-white text-base font-medium shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 ease-in-out ${className}`}
      >
        {children}
      </button>
    );
  }
  