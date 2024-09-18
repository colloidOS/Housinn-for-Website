"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api"; // The Axios instance
import { useAuth } from "../../context/AuthContext"; // Assuming the AuthContext is set up

// Interfaces
interface UpdateUserResponse {
  status: string;
  message: string;
  data: {
    id: string;
    email: string;
    userType: string;
    avatar: string | null;
    number: string | null;
    firstName: string;
    lastName: string;
    state: string | null;
    town: string | null;
    address: string | null;
    position: string | null;
    company: string | null;
    isVerified: boolean;
    createdAt: string;
    chatIDs: string[];
  };
}

interface Post {
  id: string;
  content: string;
  createdAt: string;
}

interface ProfilePosts {
  userPosts: Post[];
  savedPosts: Post[];
}

// Main Component
const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuth(); // Get user and setUser from AuthContext

  // State for update user form
  const [formData, setFormData] = useState({
    userType: "",
    avatar: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // State for profile posts
  const [profilePosts, setProfilePosts] = useState<ProfilePosts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [postsError, setPostsError] = useState<string | null>(null);

  // Populate form with existing user data on mount
  useEffect(() => {
    if (user) {
      setFormData({
        userType: user.userType || "",
        avatar: user.avatar || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        password: "", // Not fetched from backend; user inputs new password if needed
      });
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update the user
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("User not found. Please log in.");
      return;
    }

    try {
      const userId = user.id;
      const response = await api.put<UpdateUserResponse>(
        `/users/${userId}`,
        formData
      );
      console.log("Response from server:", response.data);

      if (response.data.status === "success") {
        setResponseMessage(response.data.message);
        setUser({ ...user, ...response.data.data }); // Update the user in context with the new data
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user.");
    }
  };

  // Fetch profile posts when component mounts
  useEffect(() => {
    const fetchProfilePosts = async () => {
      try {
        const response = await api.get("/users/profilePosts");

        if (response.data.status === "success") {
          setProfilePosts(response.data.data);
        } else {
          setPostsError("Failed to retrieve profile posts.");
        }
      } catch (err) {
        setPostsError("An error occurred while fetching profile posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Profile Page</h1>

      {/* User Update Form */}
      <section>
        <h2 className="text-md font-semibold">Update User Information</h2>
        <form onSubmit={handleUpdateUser} className="space-y-4">
          <div>
            <label className="block">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block">User Type:</label>
            <input
              type="text"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block">Avatar URL:</label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block">Password (optional):</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          >
            Update User
          </button>
        </form>

        {responseMessage && (
          <p className="text-green-500 mt-4">{responseMessage}</p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </section>

      {/* Profile Posts Section */}
      <section className="mt-8">
        <h2 className="text-md font-semibold">Profile Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : postsError ? (
          <p className="text-red-500">{postsError}</p>
        ) : (
          <>
            <h3>User Posts</h3>
            {profilePosts?.userPosts.length ? (
              profilePosts.userPosts.map((post) => (
                <div key={post.id}>
                  <p>{post.content}</p>
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
              ))
            ) : (
              <p>No user posts available.</p>
            )}

            <h3 className="mt-4">Saved Posts</h3>
            {profilePosts?.savedPosts.length ? (
              profilePosts.savedPosts.map((post) => (
                <div key={post.id}>
                  <p>{post.content}</p>
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
              ))
            ) : (
              <p>No saved posts available.</p>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
