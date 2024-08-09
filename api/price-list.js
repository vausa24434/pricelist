import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.digiflazz.com/v1/price-list');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching price list' });
  }
}
