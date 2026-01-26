import type { Filters, Period } from "../executiveTypes";

export function ExecutiveFiltersBar({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (v: Filters) => void;
}) {
  const set = (patch: Partial<Filters>) => onChange({ ...value, ...patch });

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-3">
      <Select
        label="Org"
        value={value.org}
        options={["Portfolio", "Client A", "Client B"]}
        onChange={(v) => set({ org: v })}
      />
      <Select
        label="Period"
        value={value.period}
        options={["MTD", "QTD", "YTD"]}
        onChange={(v) => set({ period: v as Period })}
      />
      <Select
        label="Currency"
        value={value.currency}
        options={["USD", "GBP", "EUR"]}
        onChange={(v) => set({ currency: v as "USD" | "GBP" | "EUR" })}
      />
      <Select
        label="BU"
        value={value.businessUnit}
        options={["All", "HQ", "Midwest", "EMEA"]}
        onChange={(v) => set({ businessUnit: v })}
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-zinc-400">
      <span className="hidden sm:inline">{label}</span>
      <select
        className="rounded-xl border border-zinc-800/60 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 outline-none hover:bg-zinc-900"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}