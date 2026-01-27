interface ExternalSource {
  name: string;
  type: string;
  authority: string;
  url: string;
  evidenceRule: string;
  description: string;
  usageNotes: string[];
  citation?: string;
}

interface ExternalSourceReceiptCardProps {
  source?: ExternalSource;
}

export function ExternalSourceReceiptCard({ source }: ExternalSourceReceiptCardProps) {
  const defaultSource: ExternalSource = {
    name: "SEC EDGAR",
    type: "External Filing Search",
    authority: "SEC.gov",
    url: "https://www.sec.gov/edgar/search/",
    evidenceRule: "Link-out required",
    description: "Public filings are treated as \"authoritative external artifacts\" for market / company truth claims.",
    usageNotes: [
      "Store the EDGAR URL as an artifact pointer (no scraping required).",
      "Attach it to KPI narratives as \"External Evidence (Authoritative).\"",
      "Require an internal receipt for any derived metric (transform hash + DQ + reconciliation)."
    ],
    citation: "Source: SEC EDGAR full text search (filings since 2001)."
  };

  const activeSource = source || defaultSource;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white">External Source Receipt: {activeSource.name}</div>
          <div className="mt-1 text-sm text-white/65">
            {activeSource.description}
          </div>
        </div>
        <a
          href={activeSource.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
        >
          Open {activeSource.name} ↗
        </a>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs text-white/60">Artifact Type</div>
          <div className="text-sm font-semibold">{activeSource.type}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs text-white/60">Authority</div>
          <div className="text-sm font-semibold">{activeSource.authority}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs text-white/60">Evidence Rule</div>
          <div className="text-sm font-semibold">{activeSource.evidenceRule}</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs font-semibold text-white/60 mb-2">How Kincaid IQ uses this</div>
        <div className="text-sm text-white/75 space-y-1">
          {activeSource.usageNotes.map((note, idx) => (
            <div key={idx}>• {note}</div>
          ))}
        </div>
      </div>

      {activeSource.citation && (
        <div className="mt-3 text-xs text-white/55">
          {activeSource.citation}
        </div>
      )}
    </div>
  );
}