export const PsychologistCardSkeleton = () => {
  return (
    <li className="grid grid-cols-[auto_1fr] w-full py-5 px-2.5 gap-5 items-center">
      <div className="w-32 h-32 object-cover rounded-full bg-gray-300 animate-pulse"></div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <div className="bg-gray-300 animate-pulse w-32 h-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2.5 mt-5">
          <div className="flex flex-col gap-1">
            <div className="bg-gray-300 animate-pulse w-64 h-4 rounded-full"></div>

            <div className="bg-gray-300 animate-pulse w-64 h-4 rounded-full"></div>

            <div className="bg-gray-300 animate-pulse w-64 h-4 rounded-full"></div>

            <div className="bg-gray-300 animate-pulse w-64 h-4 rounded-full"></div>
          </div>

          <div className="flex items-end">
            <div className="bg-gray-300 animate-pulse w-32 h-8 rounded-full"></div>
          </div>
        </div>
      </div>
    </li>
  );
};
