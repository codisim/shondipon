import Image from "next/image";

export default function VideoCard({ item, row, position }) {
  return (
    <div className="group relative h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:shadow-amber-200/50">
      {/* Image Container with Gradient Border Effect */}
      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl group-hover:blur-md" />
        
        <div className="absolute inset-[2px] bg-white rounded-t-2xl z-0" />
        
        <div className="relative z-10 h-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Play Button - Animated */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-pink-400 flex items-center justify-center transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 animate-pulse group-hover:animate-none">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <svg className="w-7 h-7 text-amber-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* View Count Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-semibold text-amber-700 rounded-full shadow-lg flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {item.views || "1.2M views"}
            </span>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-4 right-4 z-20">
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-800 rounded-lg shadow-lg">
              {item.duration || "5:30"}
            </span>
          </div>

          {/* Row & Position Indicator (Optional, can remove) */}
          <div className="absolute top-4 right-4 z-20">
            <span className="px-2 py-1 bg-black/20 backdrop-blur-sm text-xs font-semibold text-white rounded-lg">
              #{position}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative bg-gradient-to-b from-white to-gray-50/50">
        {/* Title with gradient text on hover */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:via-orange-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2 leading-tight">
          {item.title}
        </h3>
        
        {/* Artist Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-200 to-pink-200 flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              {item.artist}
            </p>
            <p className="text-xs text-gray-500">
              {item.genre || "ফোক মিউজিক"}
            </p>
          </div>
        </div>

        {/* Stats and Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">{item.likes || "12K"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">{item.comments || "234"}</span>
            </div>
          </div>
          
          {/* Upload Time */}
          <span className="text-xs font-medium px-3 py-1 bg-gradient-to-r from-amber-50 to-pink-50 text-amber-700 rounded-full">
            {item.uploaded || "2 দিন আগে"}
          </span>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 -z-10" />

      {/* YouTube Link */}
      <a
        href={`https://www.youtube.com/watch?v=${item?.youtubeLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`Watch ${item.title} by ${item.artist}`}
      />
    </div>
  );
}