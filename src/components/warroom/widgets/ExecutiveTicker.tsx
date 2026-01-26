export function ExecutiveTicker({ items }: { items: string[] }) {
  const list = items?.length ? items : ["Connecting live feed…"];

  return (
    <div className="border-b border-zinc-800/60 bg-zinc-950/80">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="mb-2 text-xs text-zinc-400">EBITDA / Risk Feed</div>

        <div className="relative overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-ticker">
            {list.concat(list).map((it, idx) => (
              <span key={idx} className="mr-10 text-sm text-zinc-200">
                {it}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 26s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}