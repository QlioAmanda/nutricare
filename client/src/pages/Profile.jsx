import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
      });
      logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">My Profile</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-medium">Name:</span>
            <span className="text-gray-900">{user.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-medium">Role:</span>
            <span className="text-gray-900 uppercase">{user.role}</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
