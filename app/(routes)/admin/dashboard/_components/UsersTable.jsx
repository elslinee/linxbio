"use client";
import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "@/utils/client/admin/usersApi";
import { Pencil, Trash2, Search, Shield, User } from "lucide-react";
import EditModal from "./EditModal";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      // console.log("getAllUsers response:", res.data);
      setUsers(res.data.data.users || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
      // toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      // toast.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Failed to delete user");
    }
  };

  const handleUpdate = async () => {
    if (!editUser) return;
    try {
      setEditLoading(true);
      await updateUser(editUser.id, editUser);
      setUsers(
        users.map((u) => (u.id === editUser.id ? { ...u, ...editUser } : u)),
      );
      setEditUser(null);
      // toast.success("User updated successfully");
    } catch (error) {
      console.error("Failed to update user", error);
      alert("Failed to update user");
    } finally {
      setEditLoading(false);
    }
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(search.toLowerCase()),
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
        <h2 className="text-lg font-semibold text-gray-900">Users</h2>
        <div className="relative">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 py-2 pr-4 pl-10 text-sm outline-none focus:border-[#d4f758] focus:ring-1 focus:ring-[#d4f758]"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">User</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user, index) => (
              <tr key={user.id || index} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.fullName || "No Name"}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      <div className="text-xs text-gray-400">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role === "admin" && <Shield size={12} />}
                    {user.role || "user"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditUser(user)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EditModal
        isOpen={!!editUser}
        onClose={() => setEditUser(null)}
        title="Edit User"
        onSave={handleUpdate}
        loading={editLoading}
      >
        {editUser && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <input
                type="text"
                value={editUser.fullName || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, fullName: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#d4f758] focus:ring-1 focus:ring-[#d4f758]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={editUser.username || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, username: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#d4f758] focus:ring-1 focus:ring-[#d4f758]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={editUser.email || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#d4f758] focus:ring-1 focus:ring-[#d4f758]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={editUser.role || "user"}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#d4f758] focus:ring-1 focus:ring-[#d4f758]"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        )}
      </EditModal>
    </div>
  );
}

export default UsersTable;
