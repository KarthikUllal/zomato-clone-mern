import { useState, useEffect } from "react";
import "../styles/AdminManageUser.css";

import { toast } from "react-toastify";
import api from "../../api";
import Loader from "../../utils/Loder";

export default function AdminManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/admin/users");
        setUsers(res.data.data);
        setLoading(false);
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
      //update the users state to remove the deleted user
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };
  return (
    <div className="admin-manage-user-wrapper">
      <h2>Admin Manage User</h2>
      <div className="admin-manage-user-table">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Is Verified</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  <Loader loading={loading} />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.fullname ? user.fullname : "N/A"}</td>
                  <td>{user.email}</td>
                  <td>{user.isVerified ? "Yes" : "No"}</td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      className="action-btn delete"
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
  );
}
