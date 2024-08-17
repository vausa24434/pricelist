// import axios from 'axios';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       // Ambil data username, sign, dan URL API dari environment variables
//       const { VITE_USERNAME, VITE_SIGN_D, VITE_API_URL_D } = process.env;

//       // Gabungkan data yang diterima dari request dengan data tambahan
//       const requestData = {
//         ...req.body,
//         username: VITE_USERNAME,
//         sign: VITE_SIGN_D,
//       };

//       // Lakukan request ke URL API eksternal
//       const response = await axios.post(
//         VITE_API_URL_D,
//         requestData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       // Kirim response kembali ke klien
//       res.status(200).json(response.data);
//     } catch (error) {
//       console.error('Error handling deposit:', error.message);
//       res.status(500).json({ error: 'Error handling deposit' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

























import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Ambil data username dan sign dari environment variables
      const { VITE_USERNAME, VITE_SIGN_D, VITE_API_URL_D} = process.env;

      // Gabungkan data yang diterima dari request dengan data tambahan
      const requestData = {
        ...req.body,
        username: VITE_USERNAME,
        sign: VITE_SIGN_D,
      };

      // Lakukan request ke URL API eksternal
      const response = await axios.post(
        VITE_API_URL_D,
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
