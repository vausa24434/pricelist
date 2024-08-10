
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Components/AuthProvider";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       alert("Silakan login untuk mengakses halaman ini.");
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   return user ? children : null; // Render children jika user ada, atau null jika tidak
// };

// export default ProtectedRoute;












import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthProvider";
import { supabase } from "../../supabaseClient"; // Import supabase

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const [isAdmin, setIsAdmin] = useState(false); // Tambahkan state isAdmin

  useEffect(() => {
    const checkUserRole = async () => {
      if (user) {
        // Ambil data pengguna dari tabel 'users' berdasarkan ID
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single(); // Mengambil satu baris data

        if (error) {
          console.error('Error fetching user role:', error);
          navigate("/"); // Navigasi ke halaman utama jika ada error
        } else {
          // Cek apakah role adalah admin
          if (data.role === 'admin') {
            setIsAdmin(true);
          } else {
            setLoading(false); 
            navigate("/");
            alert("anda bukan admin"); // Navigasi ke halaman utama jika bukan admin
          }
        }
        setLoading(false); // Set loading ke false setelah pemeriksaan selesai
      } else {
        navigate("/login"); // Navigasi ke halaman login jika tidak ada user
        setLoading(false); // Set loading ke false jika tidak ada user
      }
    };

    checkUserRole();
  }, [user, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Tampilkan loading atau spinner saat memeriksa role
  }

  return isAdmin ? children : null; // Render children jika user admin, atau null jika tidak
};

export default ProtectedRoute;
