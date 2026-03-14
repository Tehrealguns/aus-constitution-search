import { useState } from "react";
import type { CatalogResponse } from "../App";

interface LegislationFilterProps {
  catalog: CatalogResponse;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  disabled: boolean;
}

export default function LegislationFilter({
  catalog,
  selectedIds,
  onChange,
  disabled,
}: LegislationFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string | null>(
    null
  );
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filtered = catalog.legislation.filter((l) => {
    if (jurisdictionFilter && l.jurisdiction !== jurisdictionFilter) return false;
    if (categoryFilter && l.category !== categoryFilter) return false;
    return true;
  });

  function toggle(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((s) => s !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  }

  function selectAll() {
    const allFilteredIds = filtered.map((l) => l.id);
    const merged = [...new Set([...selectedIds, ...allFilteredIds])];
    onChange(merged);
  }

  function clearAll() {
    const filteredIds = new Set(filtered.map((l) => l.id));
    onChange(selectedIds.filter((id) => !filteredIds.has(id)));
  }

  const selectedCount = selectedIds.length;
  const selectedNames = catalog.legislation
    .filter((l) => selectedIds.includes(l.id))
    .map((l) => l.title);

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <button
        onClick={() => setExpanded(!expanded)}
        disabled={disabled}
        className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              Legislation to search
            </span>
            <span className="rounded-lg bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {selectedCount} selected
            </span>
          </div>
          {!expanded && selectedCount > 0 && (
            <p className="mt-1 truncate text-xs text-gray-500">
              {selectedNames.slice(0, 3).join(", ")}
              {selectedNames.length > 3 &&
                ` +${selectedNames.length - 3} more`}
            </p>
          )}
        </div>
        <svg
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-6 py-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Jurisdiction:
            </span>
            <FilterChip
              label="All"
              active={jurisdictionFilter === null}
              onClick={() => setJurisdictionFilter(null)}
            />
            {catalog.jurisdictions.map((j) => (
              <FilterChip
                key={j.id}
                label={j.label}
                active={jurisdictionFilter === j.id}
                onClick={() =>
                  setJurisdictionFilter(
                    jurisdictionFilter === j.id ? null : j.id
                  )
                }
              />
            ))}

            <span className="ml-4 text-xs font-medium uppercase tracking-wide text-gray-500">
              Category:
            </span>
            <FilterChip
              label="All"
              active={categoryFilter === null}
              onClick={() => setCategoryFilter(null)}
            />
            {catalog.categories.map((c) => (
              <FilterChip
                key={c}
                label={c}
                active={categoryFilter === c}
                onClick={() =>
                  setCategoryFilter(categoryFilter === c ? null : c)
                }
              />
            ))}
          </div>

          <div className="mb-4 flex gap-2">
            <button
              onClick={selectAll}
              className="rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Select all visible
            </button>
            <button
              onClick={clearAll}
              className="rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors"
            >
              Clear visible
            </button>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {filtered.map((leg) => {
              const isSelected = selectedIds.includes(leg.id);
              return (
                <label
                  key={leg.id}
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                    isSelected
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(leg.id)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {leg.title}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span
                        className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                          leg.jurisdiction === "federal"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-sky-50 text-sky-700"
                        }`}
                      >
                        {leg.jurisdiction === "federal" ? "Federal" : "NSW"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {leg.category}
                      </span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {selectedCount > 8 && (
            <p className="mt-4 text-xs text-amber-700">
              For best results, select up to 8 pieces of legislation at a time.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
