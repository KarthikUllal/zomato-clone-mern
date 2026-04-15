import { useState, useEffect } from "react";
import "../styles/AdminManageUser.css";
import { toast } from "react-toastify";
import api from "../../api";
import Loader from "../../utils/Loder";
import AdminBackButton from "../components/AdminBackButton";

export default function AdminManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/admin/users");
        setUsers(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/api/admin/users/${userId}`);
      toast.success("User deleted");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  return (
    <div className="admin-manage-user-wrapper">
      <div className="users-header">
        <h2>Manage Users</h2>
        <AdminBackButton />
      </div>

      <div className="users-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Verified</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="center">
                    <Loader loading={loading} />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="center">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="user-id">{user._id}</td>
                    <td>{user.fullname || "N/A"}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.isVerified ? "verified" : "not-verified"
                        }`}
                      >
                        {user.isVerified ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}