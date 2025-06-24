export default function Loading() {
  return (
    <div className="p-1 min-h-dvh flex flex-col gap-2">
      <div className="bg-teal-800 primary h-48 w-full rounded-lg p-2"></div>
      <div className="flex-1 relative p-2">
        <div className="md:-mt-16 md:ml-4 md:flex md:items-end">
          <div className="mx-auto -mt-20 md:mt-0 md:mx-0 rounded-full w-36 h-36 bg-gray-300 animate-pulse"></div>
          <div className="p-2 text-center md:text-left md:mb-3">
            <h2 className="text-2xl font-semibold animate-pulse bg-gray-300 h-6 w-48 mb-2"></h2>
            <h3 className="text-base font-medium opacity-70 animate-pulse bg-gray-300 h-4 w-64"></h3>
          </div>
        </div>
      </div>
    </div>
  );
}
