"use client";

interface DeviceMockupProps {
  imageSrc: string;
  altText: string;
  title?: string;
}

export default function DeviceMockup({
  imageSrc,
  altText,
  title = "casstrodev.com/project-preview",
}: DeviceMockupProps) {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl transition-all duration-300 hover:border-blue-500/40">
      {/* Mockup Window Header Bar */}
      <div className="bg-slate-950/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-4">
        {/* Window Controls (Red, Yellow, Green dots) */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-sm mx-auto bg-slate-900/90 border border-slate-800 rounded-md px-3 py-1 text-center truncate">
          <span className="text-xs font-mono text-slate-400 select-none">
            https://{title.replace(/^https?:\/\//, "")}
          </span>
        </div>

        {/* Placeholder Status */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[11px] font-mono text-slate-400">Preview Live</span>
        </div>
      </div>

      {/* Screen Viewport with Aspect Ratio */}
      <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden bg-slate-950 group">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
