import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Profile.css";
import axios from "axios";
import Header from "../Header/Header";

function Profile({ triggerUserRefresh }) {
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function updateLocalStorageUserData(updates) {
    const storedData = localStorage.getItem("user_data");
    const userData = storedData ? JSON.parse(storedData) : {};

    // Merge existing data with updates
    const updatedUserData = { ...userData, ...updates };

    localStorage.setItem("user_data", JSON.stringify(updatedUserData));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { first_name, last_name, address, phone, email } = formData;

    if (!email || !first_name || !last_name || !address || !phone) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    const phonePattern = /^\d{10,15}$/;
    if (!phonePattern.test(phone.trim())) {
      setErrorMessage(
        "Please enter a valid phone number (10-15 digits, numbers only)."
      );
      return;
    }

    setErrorMessage("");

    try {
      await axios.put(`http://localhost:3000/api/user/${userId}`, {
        first_name,
        last_name,
        address,
        phone,
      });
      updateLocalStorageUserData({
        first_name: first_name,
        last_name: last_name,
      });

      if (triggerUserRefresh) triggerUserRefresh();

      setTimeout(() => {
        toast.success("Profile Update successful!", {
          position: "top-right",
          autoClose: 3000,
        });
      }, 100);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/api/user/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
        const user = data.data;
        setFormData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          address: user.address || "",
          phone: user.phone || "",
          email: user.email || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading)
    return (
      <div className="container">
        <div className="form-container">Loading...</div>
      </div>
    );
  if (!userId)
    return (
      <div className="container">
        <div className="form-container">User not found.</div>
      </div>
    );

  return (
    <div className="container">
      <div className="form-container">
        <form className="form" onSubmit={handleUpdate}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            User Profile
          </h2>

          {errorMessage && (
            <div
              className="error-message"
              style={{ color: "red", marginBottom: "8px" }}
            >
              {errorMessage}
            </div>
          )}

          <input
            type="text"
            name="first_name"
            value={formData.first_name || ""}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ""}
            required
            onChange={handleChange}
          />
          <input
            type="email"
            value={formData.email || ""}
            required
            onChange={handleChange}
            readOnly
          />
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            required
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
