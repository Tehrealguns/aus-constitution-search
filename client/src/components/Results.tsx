import { useState } from "react";
import type { SearchResponse, SearchResult } from "../App";

interface ResultsProps {
  data: SearchResponse;
}

const RELEVANCE_STYLES = {
  high: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    label: "High relevance",
  },
  moderate: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    label: "Moderate",
  },
  tangential: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
    label: "Tangential",
  },
};

const JURISDICTION_STYLES: Record<string, { bg: string; text: string }> = {
  federal: { bg: "bg-emerald-50", text: "text-emerald-700" },
  nsw: { bg: "bg-sky-50", text: "text-sky-700" },
};

export default function Results({ data }: ResultsProps) {
  if (data.resultCount === 0) {
    return (
      <div className="mt-8 rounded-xl border border-gray-200 bg-white px-6 py-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          No relevant provisions found
        </h3>
        <p className="mt-2 text-sm text-gray-500">{data.overview}</p>
      </div>
    );
  }

  const actGroups = data.results.reduce<Record<string, SearchResult[]>>(
    (groups, result) => {
      const key = result.act;
      if (!groups[key]) groups[key] = [];
      groups[key].push(result);
      return groups;
    },
    {}
  );

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-medium text-gray-900">
          {data.resultCount} provision{data.resultCount !== 1 ? "s" : ""} found
          across {Object.keys(actGroups).length} Act
          {Object.keys(actGroups).length !== 1 ? "s" : ""}
        </h2>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {data.topic}
        </p>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 px-6 py-4">
        <p className="text-sm text-blue-900">{data.overview}</p>
      </div>

      <div className="space-y-4">
        {data.results.map((result, idx) => (
          <ResultCard key={`${result.act}-${result.section}-${idx}`} result={result} />
        ))}
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: SearchResult }) {
  const [expanded, setExpanded] = useState(false);
  const style = RELEVANCE_STYLES[result.relevance] || RELEVANCE_STYLES.moderate;
  const jurisdictionStyle =
    JURISDICTION_STYLES[result.jurisdiction] || JURISDICTION_STYLES.federal;

  return (
    <div className="rounded-xl border border-gray-200 bg-white transition-colors hover:border-gray-300">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="shrink-0 rounded-lg bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                s {result.section}
              </span>
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {result.title}
              </h3>
              <span
                className={`shrink-0 rounded-lg border px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text} ${style.border}`}
              >
                {style.label}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span
                className={`rounded px-1.5 py-0.5 text-xs font-medium ${jurisdictionStyle.bg} ${jurisdictionStyle.text}`}
              >
                {result.jurisdiction === "federal" ? "Federal" : "NSW"}
              </span>
              <span className="text-xs text-gray-500">{result.act}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {result.summary}
            </p>
          </div>
          <svg
            className={`mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform ${
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
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-6 py-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
            Legislative text
          </p>
          <div className="rounded-xl bg-gray-50 px-4 py-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {result.verbatim}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
