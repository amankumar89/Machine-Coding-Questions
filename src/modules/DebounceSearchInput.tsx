// components/DebouncedSearch.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

interface SearchResult {
  id: number;
  title: string;
}

const fetchResults = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];
  const { data } = await axios.get<SearchResult[]>(
    `https://jsonplaceholder.typicode.com/posts`,
    { params: { q: query, _limit: 10 } },
  );
  return data;
};

const DebouncedSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<SearchResult[]>([]);
  const isLoading = false;
  const isError = false;

  const debouncedSearch = useDebounce(searchTerm, 800);

  useEffect(() => {
    if (searchTerm) {
      fetchResults(searchTerm).then((data) => {
        setData(data);
      });
    }
  }, [debouncedSearch]);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
      />

      {/* Status Indicators */}
      {isLoading && <p className="text-gray-500">Searching...</p>}
      {isError && <p className="text-red-500">Failed to fetch results</p>}

      {/* Results */}
      <ul className="space-y-2">
        {data?.map((item) => (
          <li key={item.id} className="p-3 bg-gray-50 rounded-lg">
            {item.title}
          </li>
        ))}
        {data?.length === 0 && debouncedSearch && (
          <li className="text-gray-400">No results found</li>
        )}
      </ul>
    </div>
  );
};

export default DebouncedSearch;
