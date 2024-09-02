// src/app/test/page.tsx
"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const ExampleComponent: React.FC = () => {
  const { user } = useAuth(); // Access user from context
  if (user) {
    console.log("User ID:", user.id);
    console.log("User Email:", user.email);
    console.log("User Type:", user.userType);
    console.log("User Avatar:", user.avatar);
    console.log("User Number:", user.number);
    console.log("User First Name:", user.firstName);
    console.log("User Last Name:", user.lastName);
    console.log("User State:", user.state);
    console.log("User Town:", user.town);
    console.log("User Address:", user.address);
    console.log("User Position:", user.position);
    console.log("User Company:", user.company);
    console.log("User Is Verified:", user.isVerified);
    console.log("User Password Reset Token:", user.passwordResetToken);
    console.log("User Password Reset Expiry:", user.passwordResetExpiry);
    console.log("User Created At:", user.createdAt);
    console.log("User Chat IDs:", user.chatIDs);
    console.log("User Token:", user.token);
  } else {
    console.log("No user data available.");
  }

  return (
    <div>
      {user ? (
        <>
          <h1>User Details</h1>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User Type:</strong> {user.userType}</p>
          <p><strong>Avatar:</strong> {user.avatar ?? "N/A"}</p>
          <p><strong>Number:</strong> {user.number ?? "N/A"}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>State:</strong> {user.state ?? "N/A"}</p>
          <p><strong>Town:</strong> {user.town ?? "N/A"}</p>
          <p><strong>Address:</strong> {user.address ?? "N/A"}</p>
          <p><strong>Position:</strong> {user.position ?? "N/A"}</p>
          <p><strong>Company:</strong> {user.company ?? "N/A"}</p>
          <p><strong>Is Verified:</strong> {user.isVerified ? "Yes" : "No"}</p>
          <p><strong>Password Reset Token:</strong> {user.passwordResetToken ?? "N/A"}</p>
          <p><strong>Password Reset Expiry:</strong> {user.passwordResetExpiry ?? "N/A"}</p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Chat IDs:</strong> {user.chatIDs.length > 0 ? user.chatIDs.join(", ") : "None"}</p>
          <p><strong>Token:</strong> {user.token}</p>
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default ExampleComponent;
