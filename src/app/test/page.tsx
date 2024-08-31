// src/app/users/page.tsx

"use client";

import { useEffect, useState } from 'react';
import api from '../../lib/api'; // Adjust the path to your lib directory

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  // Add other fields based on your user model
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); // Default to empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        const usersData = response.data.data; // Access the data array inside the response

        // Check if usersData is an array
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          setError('Unexpected response format');
          console.error('Expected an array but got:', usersData);
        }
      } catch (err) {
        setError('Failed to fetch users.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} ({user.email}) - {user.userType}
          </li>
        ))}
      </ul>
    </div>
  );
}
