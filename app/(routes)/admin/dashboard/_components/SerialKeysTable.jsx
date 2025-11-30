"use client";
import React, { useEffect, useState } from "react";
import {
  getSerialKeys,
  generateSerialKey,
} from "@/utils/client/admin/serialKeysApi";
import { Search, Key, Plus, Copy, Check } from "lucide-react";
// import { toast } from "sonner";

function SerialKeysTable() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const fetchKeys = async () => {
    try {
      setLoading(true);
      const res = await getSerialKeys();
      // console.log("getSerialKeys response:", res.data);
      setKeys(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch keys", error);
      // toast.error("Failed to load serial keys");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      const res = await generateSerialKey();
      const newKey = res.data.data;
      setKeys([newKey, ...keys]);
      alert("Serial key generated successfully");
    } catch (error) {
      console.error("Failed to generate key", error);
      alert("Failed to generate serial key");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredKeys = keys.filter((k) =>
    k.key.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#d4f758]"></div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">Serial Keys</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search keys..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border border-gray-200 py-2 pr-4 pl-10 text-sm outline-none focus:border-[#d4f758] focus:ring-1 focus:ring-[#d4f758]"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 rounded-lg bg-[#d4f758] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#c6e84d] disabled:opacity-50"
          >
            <Plus size={18} />
            {generating ? "Generating..." : "Generate Key"}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">Key</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Used By</th>
              <th className="px-6 py-3 font-medium">Used At</th>
              <th className="px-6 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredKeys.map((k, index) => (
              <tr key={k._id || k.key || index} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-mono font-medium text-gray-900">
                  {k.key}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      k.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {k.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {k.usedBy ? (
                    <span className="text-gray-900">{k.usedBy}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {k.usedAt ? (
                    new Date(k.usedAt).toLocaleDateString()
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleCopy(k.key)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                    title="Copy Key"
                  >
                    {copiedKey === k.key ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {filteredKeys.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No serial keys found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SerialKeysTable;
