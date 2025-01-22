import React from "react";

function UserPage() {
  return (
    <div>
      <h1>Welcome to User Page</h1>
      <div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/user-login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserPage;
