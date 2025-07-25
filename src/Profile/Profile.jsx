import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Profile.css";
import axios from "axios";

function Profile() {
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { first_name, last_name, address, phone, email } = formData;

    if (!email || !first_name || !last_name || !address || !phone) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/user/${userId}`, {
        first_name,
        last_name,
        address,
        phone,
        email,
        role: 0,
      });
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

          <input
            type="text"
            name="first_name"
            value={formData.first_name || ""}
            required
            onChange={handleChange}
          />
          <input
            type="text"
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
            value={formData.address || ""}
            required
            onChange={handleChange}
          />
          <input
            type="text"
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
