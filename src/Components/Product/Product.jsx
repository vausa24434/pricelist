import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from '../../../supabaseClient';
import axios from "axios";

const Product = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const fetchAndUpdatePriceList = async () => {
      try {
        setLoading(true);

        // Fetch data from external API
        const response = await axios.post(
          "http://localhost:3001/price-list",
          {
            cmd: "prepaid",
            username: process.env.VITE_REACT_APP_USERNAME,
            code: "",
            sign: process.env.VITE_REACT_APP_SIGN,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const productsData = response.data.data;

        // Save data to Supabase
        await saveProductsToSupabase(productsData);

        // Fetch updated product data from Supabase
        const { data, error } = await supabase
          .from('price_list') // use the view
          .select('*')
          .eq('id', id) // assuming `id` is still used to uniquely identify products
          .single();

        if (error) {
        } else {
          setProduct({
            ...data
          });
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to update and fetch product data.");
      } finally {
        setLoading(false);
      }
    };

    const saveProductsToSupabase = async (products) => {
      try {
        // Hapus duplikat berdasarkan product_name
        const uniqueProducts = products.reduce((acc, current) => {
          const x = acc.find(item => item.product_name === current.product_name);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        const { data, error } = await supabase
          .from("products")
          .upsert(uniqueProducts, {
            onConflict: ['product_name'],
          });

        if (error) {
          console.error("Error upserting data");
          setError("Failed to save products");
        } else {
          console.log("Data successfully update");
        }
      } catch (error) {
      }
    };

    fetchAndUpdatePriceList();
  }, [id]);

  if (loading) {
    return <div className="container text-center mt-64 mx-auto p-6">Loading...</div>;
  }

  if (error || !product) {
    return <div className="container text-center mt-64 mx-auto p-6">{error || "Produk tidak ditemukan"}</div>;
  }

  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    }).catch(err => {
      setCopySuccess(false);
    });
  };

  const handleBeliSekarangClick = () => {
    // Navigate to the purchase page or handle purchase logic
    navigate(`/purchase/${product.id}`); // Example route to a purchase page
  };

  const MAX_DESCRIPTION_LENGTH = 250; // Adjust the length as needed
  const isDescriptionLong = product.desc && product.desc.length > MAX_DESCRIPTION_LENGTH;
  const displayedDescription = showFullDescription
    ? product.desc
    : product.desc?.substring(0, MAX_DESCRIPTION_LENGTH) + (isDescriptionLong ? '...' : '');

  return (
    <>
      <div className='flex items-center justify-between pt-6 px-8'>
        <button
          onClick={handleBackClick}
          className="flex items-center justify-center text-white bg-utama hover:bg-blue-400 font-medium rounded-lg text-sm px-3 py-2.5 sm:px-5 sm:py-2.5"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center text-white bg-utama hover:bg-blue-400 font-medium rounded-lg text-sm px-3 py-2.5 sm:px-5 sm:py-2.5"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
          </svg>
        </button>
      </div>

      {copySuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Link berhasil disalin!
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row h-full overflow-hidden">
        <div className="flex flex-col md:flex-row rounded-lg shadow-lg h-full w-full md:w-1/3 px-4">
          <div className="rounded-lg h-full bg-white flex flex-col w-full">
            <div className="flex flex-col items-center flex-shrink-0 p-4">
              <img
                src={product.image_url || '/images/logo-muvausa-store.webp'}
                alt={product.product_name}
                className="w-full max-h-96 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 p-2">
          <div className="w-full bg-white rounded-lg shadow-lg p-4">
            <div className="w-full overflow-auto sm:h-[450px] scrollable-content">
              <div className="list-none text-gray-600 flex flex-col">
                <h2 className="text-4xl mb-2 font-bold font-poppins text-utama text-center drop-shadow-lg overflow-hidden break-word">
                  {product.product_name}
                </h2>
                <p className="mb-2 text-center text-base py-2 font-medium break-word">
                  {product.product_status ? (<span className="text-green-500">Tersedia</span>) : (<span className="text-red-500">Gangguan</span>)}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Harga Jual:</span> {product.sell_price}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Brand:</span> {product.brand}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Kategori:</span> {product.category}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Sub Kategori:</span> {product.type}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Support Multi Transaksi:</span> {product.multi ? "Ya" : "Tidak"}
                </p>
                <p className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Jam Cut Off:</span> {product.cut_off_time}
                </p>
                <div className="relative mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-3 px-3 break-word">
                  <span className="font-semibold">Description:</span> {displayedDescription}
                  {isDescriptionLong && !showFullDescription && (
                    <button
                      className="text-blue-500 font-semibold ml-1"
                      onClick={() => setShowFullDescription(true)}
                    >
                      Show more
                    </button>
                  )}
                  {isDescriptionLong && showFullDescription && (
                    <button
                      className="text-blue-500 font-semibold ml-1"
                      onClick={() => setShowFullDescription(false)}
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleBeliSekarangClick}
            className="text-white w-full bg-utama hover:bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;