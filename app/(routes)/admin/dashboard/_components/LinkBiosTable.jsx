"use client";
import React, { useEffect, useState } from "react";
import {
  getAllLinkBios,
  updateLinkBio,
  deleteLinkBio,
} from "@/utils/client/admin/linkBioApi";
import {
  Pencil,
  Trash2,
  Search,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";
import EditModal from "./EditModal";
import Link from "next/link";

function LinkBiosTable() {
  const [linkBios, setLinkBios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editLinkBio, setEditLinkBio] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchLinkBios = async () => {
    try {
      setLoading(true);
      const res = await getAllLinkBios();
      // console.log("getAllLinkBios response:", res.data);
      setLinkBios(res.data.data.data || []);
    } catch (error) {
      console.error("Failed to fetch linkBios", error);
      // toast.error("Failed to load linkBios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinkBios();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this LinkBio?")) return;
    try {
      await deleteLinkBio(id);
      setLinkBios(linkBios.filter((lb) => lb._id !== id));
      // toast.success("LinkBio deleted successfully");
    } catch (error) {
      console.error("Failed to delete linkBio", error);
      alert("Failed to delete linkBio");
    }
  };

  const handleUpdate = async () => {
    if (!editLinkBio) return;
    try {
      setEditLoading(true);
      // Assuming we are updating the profile part of the linkbio for simplicity in this example
      // Adjust based on actual API structure if needed
      await updateLinkBio(editLinkBio._id, editLinkBio);
      setLinkBios(
        linkBios.map((lb) =>
          lb._id === editLinkBio._id ? { ...lb, ...editLinkBio } : lb,
        ),
      );
      setEditLinkBio(null);
      // toast.success("LinkBio updated successfully");
    } catch (error) {
      console.error("Failed to update linkBio", error);
      alert("Failed to update linkBio");
    } finally {
      setEditLoading(false);
    }
  };

  const filteredLinkBios = linkBios.filter(
    (lb) =>
      lb.profile?.username?.toLowerCase().includes(search.toLowerCase()) ||
      lb.profile?.displayName?.toLowerCase().includes(search.toLowerCase()),
  );

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLinkBios.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredLinkBios.length / itemsPerPage);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">LinkBios</h2>
        <div className="relative">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search linkbios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 py-2 pr-4 pl-10 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">Owner</th>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">URL</th>
              <th className="px-6 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((lb, index) => (
              <tr key={lb._id || index} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    @{lb.profile?.username}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900">
                    {lb.profile?.displayName || "Untitled"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/${lb.profile?.username}`}
                    target="_blank"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <LinkIcon size={14} />/{lb.profile?.username}
                    <ExternalLink size={12} />
                  </Link>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditLinkBio(lb)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(lb._id)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredLinkBios.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No LinkBios found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredLinkBios.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredLinkBios.length)} of{" "}
            {filteredLinkBios.length} linkbios
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-1 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                },
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <EditModal
        isOpen={!!editLinkBio}
        onClose={() => setEditLinkBio(null)}
        title="Edit LinkBio"
        onSave={handleUpdate}
        loading={editLoading}
      >
        {editLinkBio && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Username (URL)
              </label>
              <input
                type="text"
                value={editLinkBio.profile?.username || ""}
                onChange={(e) =>
                  setEditLinkBio({
                    ...editLinkBio,
                    profile: {
                      ...editLinkBio.profile,
                      username: e.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            {/* Add more fields here as needed, e.g., profile.displayName */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <input
                type="text"
                value={editLinkBio.profile?.displayName || ""}
                onChange={(e) =>
                  setEditLinkBio({
                    ...editLinkBio,
                    profile: {
                      ...editLinkBio.profile,
                      displayName: e.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex justify-between">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Verified Badge
              </label>

              <div
                onClick={() =>
                  setEditLinkBio({
                    ...editLinkBio,
                    profile: {
                      ...editLinkBio.profile,
                      verifiedBadge: !editLinkBio.profile?.verifiedBadge,
                      keyEntered: !editLinkBio.profile?.keyEntered,
                    },
                  })
                }
                className={`relative h-6 w-12 cursor-pointer rounded-full transition ${editLinkBio.profile?.verifiedBadge ? "bg-primary" : "bg-gray-300"}`}
              >
                <div
                  className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition ${editLinkBio.profile?.verifiedBadge ? "right-1" : "left-1"}`}
                ></div>
              </div>
            </div>
          </div>
        )}
      </EditModal>
    </div>
  );
}

export default LinkBiosTable;
