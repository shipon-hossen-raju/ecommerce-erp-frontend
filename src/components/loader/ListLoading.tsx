export default function ListLoading() {
  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="relative">
                <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-yellow-50 px-6 py-2 border-b border-gray-200">
          <div className="grid grid-cols-9 gap-4 text-sm font-medium">
            <div className="h-5 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-14 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Table Body - Loading Rows */}
        <div className="divide-y divide-gray-200">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="px-6 py-4">
              <div className="grid grid-cols-9 gap-4 items-center">
                {/* S.N. */}
                <div className="h-5 w-4 bg-gray-200 rounded animate-pulse"></div>

                {/* Token */}
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>

                {/* Customer */}
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>

                {/* Email */}
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>

                {/* Phone */}
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>

                {/* Amount */}
                <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>

                {/* Status */}
                <div className="h-7 w-20 bg-gray-200 rounded-full animate-pulse"></div>

                {/* Payment Status */}
                <div className="h-7 w-16 bg-gray-200 rounded-full animate-pulse"></div>

                {/* View */}
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
