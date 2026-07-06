export default function CardLoadingFallback() {
  return (
    <div className="w-full min-h-screen p-4">
      <div className="shadow-[0px_5px_14px_0px_#144A6C26] rounded-[20px] py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ServiceCardLoading key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ServiceCardLoading = () => {
  return (
    <div className="border rounded-lg overflow-hidden animate-pulse">
      {/* icon area */}
      <div className="flex items-center justify-center bg-gray-100 p-8">
        <div className="h-20 w-20 bg-gray-200 rounded-md"></div>
      </div>

      {/* content */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 w-3/4 rounded"></div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 w-full rounded"></div>
          <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
          <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
        </div>

        <div className="h-6 bg-gray-200 w-24 rounded"></div>

        <div className="flex gap-3 pt-2">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
