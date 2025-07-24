import React, { useEffect, useState } from "react";
import './Profile.css';


function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

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
        setUser(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="container"><div className="form-container">Loading...</div></div>;
  if (!userId) return <div className="container"><div className="form-container">User not found.</div></div>;
    console.log("Fetched user:", user)

 return (
  <div className="container">
    <div className="form-container">
      <form className="form">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Profile</h2>

        <input type="text" value={user?.first_name || ''} readOnly />
        <input type="text" value={user?.last_name || ''} readOnly />
        <input type="email" value={user?.email || ''} readOnly />
        <input type="text" value={user?.address || ''} readOnly />
        <input type="text" value={user?.phone || ''} readOnly />
      </form>
    </div>
  </div>
);

}

export default Profile;
