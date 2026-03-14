import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import LegislationFilter from "./components/LegislationFilter";
import Results from "./components/Results";

export interface LegislationItem {
  id: string;
  title: string;
  jurisdiction: string;
  year: number;
  category: string;
  description: string;
  keywords: string[];
}

export interface CatalogResponse {
  legislation: LegislationItem[];
  jurisdictions: { id: string; label: string }[];
  categories: string[];
}

export interface SearchResult {
  act: string;
  jurisdiction: string;
  section: string;
  title: string;
  summary: string;
  relevance: "high" | "moderate" | "tangential";
  verbatim: string;
}

export interface SearchResponse {
  topic: string;
  overview: string;
  results: SearchResult[];
  resultCount: number;
}

export default function App() {
  const [catalog, setCatalog] = useState<CatalogResponse | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>(["constitution"]);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/catalog")
      .then((res) => res.json())
      .then((data: CatalogResponse) => setCatalog(data))
      .catch(() => setError("Failed to load legislation catalog."));
  }, []);

  async function handleSearch(topic: string) {
    if (selectedIds.length === 0) {
      setError("Please select at least one piece of legislation to search.");
      return;
    }
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, legislationIds: selectedIds }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error || `Request failed with status ${res.status}`
        );
      }

      const data: SearchResponse = await res.json();
      setResponse(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Australian Legislation Search
              </h1>
              <p className="text-sm text-gray-500">
                Search across the Constitution, Federal Acts, and NSW
                legislation with AI-powered analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="space-y-6">
          <SearchBar onSearch={handleSearch} loading={loading} />

          {catalog && (
            <LegislationFilter
              catalog={catalog}
              selectedIds={selectedIds}
              onChange={setSelectedIds}
              disabled={loading}
            />
          )}
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-6 py-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {loading && <SkeletonResults />}

        {response && !loading && <Results data={response} />}

        {!response && !loading && !error && (
          <div className="mt-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900">
              Search Australian legislation
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">
              Select the legislation you want to search, then enter a topic.
              Try "freedom of religion", "unfair dismissal", "tenant rights",
              or "discrimination in employment".
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function SkeletonResults() {
  return (
    <div className="mt-8 space-y-6">
      <div className="h-6 w-48 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-16 animate-pulse rounded-xl bg-gray-200" />
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 bg-white p-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-6 w-20 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-6 w-64 animate-pulse rounded-lg bg-gray-200" />
            </div>
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
