import { useEffect, useState } from "react";
import api from "../api.js";
import { toast } from "react-toastify";
export default function UserAddress() {
  const [address, setAddress] = useState([]);
  const [form, setForm] = useState({
    street: "",
    city: "",
    pincode: "",
  });

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchAddress();
  }, []);

  //fetch user address
  const fetchAddress = async () => {
    try {
      const response = await api.get("/api/user/address", {
        headers: {
          Authorization: token,
        },
      });
      setAddress(response.data.addresses);
    } catch (err) {
      toast.error("Error fetching user address:", err);
    }
  };

  //handle add address
  const handleAddress = async () => {
    try {
      await api.post("/api/user/address", form, {
        headers: {
          Authorization: token,
        },
      });
      toast.success("Address added successfully");
      setForm({
        street: "",
        city: "",
        pincode: "",
      });
      fetchAddress();
    } catch (err) {
      toast.error("Error adding address:", err);
    }
  };
  return (
    <>
      <div className="user-address-section">
        <h2>User Address</h2>
        <input
          type="text"
          placeholder="Enter street"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter city"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter pincode"
          value={form.pincode}
          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
        />
        <button onClick={handleAddress}>Add Address</button>

        {address.map((addr, i) =>(
            <div key = {i}>
                {addr.street}, {addr.city}, {addr.pincode}
            </div>
        ))}
      </div>
    </>
  );
}
