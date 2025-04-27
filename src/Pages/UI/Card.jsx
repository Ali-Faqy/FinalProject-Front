export function Card({ children, className }) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className }) {
    return <div className={`text-gray-800 text-base ${className}`}>{children}</div>;
  }
  