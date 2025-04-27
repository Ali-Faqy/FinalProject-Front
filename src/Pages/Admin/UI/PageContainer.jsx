export default function PageContainer({ title, description, children }) {
  return (
    <main className="flex-1 overflow-y-auto pl-6 pr-6 bg-gray-50 w-full">
      <div className="flex flex-col items-start mb-6 transform transition-all duration-700 ease-out opacity-100 translate-y-0 animate-fadeIn">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 m-0 pt-5">
          {title}
        </h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      {children}
    </main>
  );
}
