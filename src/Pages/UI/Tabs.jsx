import { Children } from "react";

export function Tabs({ value, onValueChange, children }) {
  return (
    <div>
      {Children.map(children, (child) => {
        if (child.type.name === "TabsList") {
          return child;
        }
        if (child.type.name === "TabsContent") {
          return (
            child.props.value === value && (
              <div className="mt-4">
                {child.props.children}
              </div>
            )
          );
        }
        return null;
      })}
    </div>
  );
}

export function TabsList({ children, className }) {
  return (
    <div className={`flex gap-6 mb-6 border-b pb-2 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, onClick, className, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-xl text-base font-semibold text-gray-700 hover:text-green-700 hover:bg-green-100 transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }) {
  return children;
}
