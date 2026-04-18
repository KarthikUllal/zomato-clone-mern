import { useEffect, useState } from "react";
import api from "../api.js";
import { toast } from "react-toastify";
import "./UserAddress.css";

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
  const handleAddAddress = async () => {
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

  //handle edit address
  const handleEditAddress = async () => {
    try {
      await api.put(
        "/api/user/address/edit",
        {
          id: form._id,
          street: form.street,
          city: form.city,
          pincode: form.pincode,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      toast.success("Address edited successfully");
      setForm({
        street: "",
        city: "",
        pincode: "",
      });
      fetchAddress();
    } catch (err) {
      toast.error("Error editing address", err);
    }
  };

  return (
    <div className="user-address-section">
      <h2>User Address</h2>
      <form>
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
        <div className="btns">
          <button
            onClick={(e) => {
              e.preventDefault();
              form._id ? handleEditAddress() : handleAddAddress();
            }}
          >
            {form._id ? "Edit Address" : "Add Address"}
          </button>
        </div>
      </form>

      <div className="divider"></div>
      <h1>My Addresses</h1>
      {address.map((addr) => (
        <div key={addr._id}>
          <div className="address-card">
            <p>Street : {addr.street}</p>
            <p>City : {addr.city}</p>
            <p>Pincode : {addr.pincode}</p>
          </div>
          <div>
            <button
              className="edit-btn"
              onClick={() =>
                setForm({
                  _id: addr._id,
                  street: addr.street,
                  city: addr.city,
                  pincode: addr.pincode,
                })
              }
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
