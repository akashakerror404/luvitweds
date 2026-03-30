export default function ImageCard({ src, title, height }) {
  return (
    <div className={`relative group w-full ${height} overflow-hidden`}>

      {/* Image */}
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark overlay (subtle) */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Bottom-center label */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2
                   opacity-0 translate-y-4
                   group-hover:opacity-100 group-hover:translate-y-0
                   transition-all duration-500 ease-out"
      >
        <div className="bg-black/70 px-6 py-3">
          <span className="text-white text-lg md:text-xl font-semibold tracking-widest">
            {title}
          </span>
        </div>
      </div>

    </div>
  )
}
