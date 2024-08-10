import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <div>
      <h1>Profil Pengguna</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Role: {role}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
