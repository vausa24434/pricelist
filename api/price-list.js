import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Buat client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Ambil data username dan sign dari environment variables
      const { VITE_USERNAME, VITE_SIGN, VITE_API_URL} = process.env;

      // Gabungkan data yang diterima dari request dengan data tambahan
      const requestData = {
        ...req.body,
        username: VITE_USERNAME,
        sign: VITE_SIGN,
      };

      // Lakukan request ke URL API eksternal
      const response = await axios.post(
        VITE_API_URL,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Kirim response kembali ke klien
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching price list:', error.message);
      res.status(500).json({ error: 'Error fetching price list' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
