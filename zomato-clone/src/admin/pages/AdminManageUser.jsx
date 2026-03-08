import {useState, useEffect} from "react"
import "../styles/AdminManageUser.css"
import axios from "axios"
import { toast } from "react-toastify";


export default function AdminManageUser() {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        try{
             const fetchUsers = async () => {
            const res = await axios.get("http://localhost:8000/api/admin/users");
            setUsers(res.data.data);
        }
        fetchUsers();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Error fetching users");
        }

    }, [])

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/admin/users/${userId}`);
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
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.fullName ? user.fullName : "N/A"}</td>
                                <td>{user.email}</td>
                                <td>{user.isVerified ? "Yes" : "No"}</td>
                                <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}</td>
                                <td>
                                    <button className="action-btn delete" onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}