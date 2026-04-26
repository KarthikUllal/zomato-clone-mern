// ManageSlots.jsx

import { useEffect, useState } from "react";
import api from "../../api";
import "../styles/ManageSlots.css";
import { toast } from "react-toastify";

export default function ManageSlots() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all restaurants on mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/api/admin/restaurants");
        setRestaurants(res.data.restaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        alert("Could not load restaurants");
      }
    };
    fetchRestaurants();
  }, []);

  // Fetch slots when selected restaurant changes
  useEffect(() => {
    if (!selectedRestaurantId) {
      setSlots([]);
      return;
    }

    const fetchSlots = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/api/admin/restaurants/${selectedRestaurantId}`,
        );
        setSlots(res.data.restaurant.slots || []);
      } catch (error) {
        console.error("Failed to fetch slots:", error);
        alert("Could not load slots for this restaurant");
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [selectedRestaurantId]);

  // Update slot time
  const updateSlotTime = (index, newTime) => {
    const updatedSlots = [...slots];
    updatedSlots[index] = { ...updatedSlots[index], time: newTime };
    setSlots(updatedSlots);
  };

  // Update slot capacity
  const updateSlotCapacity = (index, newCapacity) => {
    const updatedSlots = [...slots];
    updatedSlots[index] = {
      ...updatedSlots[index],
      capacity: parseInt(newCapacity) || 0,
    };
    setSlots(updatedSlots);
  };

  // Delete a slot
  const deleteSlot = (index) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    setSlots(updatedSlots);
  };

  // Add new empty slot
  const addSlot = () => {
    setSlots([...slots, { time: "", capacity: 10 }]);
  };

  // Save slots to backend
  const saveSlots = async () => {
    if (!selectedRestaurantId) {
      toast.info("Please select a restaurant first");
      return;
    }

    // Validate slots
    for (let i = 0; i < slots.length; i++) {
      if (!slots[i].time.trim()) {
        toast.warning(`Slot ${i + 1}: Please enter a time`);
        return;
      }
      if (!slots[i].capacity || slots[i].capacity < 1) {
        toast.warning(
          `Slot ${i + 1}: Please enter a valid capacity (minimum 1)`,
        );
        return;
      }
    }

    setLoading(true);
    try {
      await api.put(`/api/admin/restaurants/${selectedRestaurantId}/slots`, {
        slots,
      });
      toast.success("Slots saved successfully!");
    } catch (error) {
      console.error("Failed to save slots:", error);
      toast.error("Failed to save slots. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-slots-container">
      <h2 className="manage-slots-title">Manage Table Slots</h2>

      <select
        className="restaurant-select"
        value={selectedRestaurantId}
        onChange={(e) => setSelectedRestaurantId(e.target.value)}
      >
        <option value="">Select Restaurant</option>
        {restaurants.map((r) => (
          <option key={r._id} value={r._id}>
            {r.name}
          </option>
        ))}
      </select>

      {selectedRestaurantId && (
        <>
          <div className="slot-list">
            {slots.length === 0 ? (
              <div className="empty-slots">
                No slots added yet. Click "+ Add Slot" to create time slots.
              </div>
            ) : (
              slots.map((slot, index) => (
                <div className="slot-row" key={index}>
                  <input
                    placeholder="Time (e.g. 11:30 AM)"
                    value={slot.time}
                    onChange={(e) => updateSlotTime(index, e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Capacity"
                    value={slot.capacity}
                    min="0"
                    onChange={(e) => updateSlotCapacity(index, e.target.value)}
                  />
                  <button
                    type="button"
                    className="delete-slot-btn"
                    onClick={() => deleteSlot(index)}
                    title="Delete slot"
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          <button className="add-btn" onClick={addSlot}>
            + Add Slot
          </button>

          <button
            className="save-btn"
            onClick={saveSlots}
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Saving..." : "Save Slots"}
          </button>
        </>
      )}

      {!selectedRestaurantId && (
        <div className="empty-slots" style={{ marginTop: 20 }}>
          Please select a restaurant to manage its table slots
        </div>
      )}
    </div>
  );
}
