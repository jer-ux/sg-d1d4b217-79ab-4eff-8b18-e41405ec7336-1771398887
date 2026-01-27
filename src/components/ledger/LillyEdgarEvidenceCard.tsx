import { ExternalLink } from "lucide-react";

export function LillyEdgarEvidenceCard() {
  const entityUrl = "https://www.sec.gov/edgar/browse/?CIK=0000059478";
  const tenKExample = "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm";
  const tenQExample = "https://www.sec.gov/Archives/edgar/data/59478/000005947825000254/lly-20250930.htm";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white">External Evidence (Authoritative): Eli Lilly • SEC EDGAR</div>
          <div className="mt-1 text-sm text-white/65">
            We treat SEC filings as authoritative public artifacts. Kincaid IQ links to them as evidence pointers—then enforces internal VERIFIED gating for any derived KPI.
          </div>
        </div>
        <a
          href={entityUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 flex items-center gap-2 whitespace-nowrap"
        >
          Open Lilly in EDGAR <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs text-white/60">CIK / Ticker</div>
          <div className="text-sm font-semibold text-white">0000059478 • LLY</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs text-white/60">Artifact Class</div>
          <div className="text-sm font-semibold text-white">Authoritative Pointer</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs text-white/60">Evidence Rule</div>
          <div className="text-sm font-semibold text-white">Link-out required</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={tenKExample}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 flex items-center gap-2"
        >
          View 10-K (example) <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href={tenQExample}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 flex items-center gap-2"
        >
          View 10-Q (example) <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs font-semibold text-white/60 mb-2">How this maps to an Evidence Receipt</div>
        <div className="text-sm text-white/75 space-y-1">
          <div>• artifact_id: EXT_SEC_EDGAR_LLY_CIK0000059478</div>
          <div>• storage_uri: SEC.gov URL (pointer)</div>
          <div>• authority: SEC.gov</div>
          <div>• transform_hash: required for any internal metric derived from this narrative</div>
          <div>• status inheritance: EDGAR supports narrative; internal DQ + reconciliation control VERIFIED</div>
        </div>
      </div>
    </div>
  );
}