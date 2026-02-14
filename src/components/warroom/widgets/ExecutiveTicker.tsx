export function ExecutiveTicker({ items }: { items: string[] }) {
  const list = items?.length ? items : ["Connecting live feed…"];

  return (
    <div className="border-b border-zinc-800/60 bg-zinc-950/80">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="mb-2 text-xs text-blue-400 font-medium shadow-[0_0_8px_rgba(59,130,246,0.6)]">
          EBITDA / Risk Feed
        </div>

        <div className="relative overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-ticker-slow">
            {list.concat(list).map((it, idx) => (
              <span 
                key={idx} 
                className="mr-10 text-sm text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker-slow {
          animation: ticker-slow 90s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}