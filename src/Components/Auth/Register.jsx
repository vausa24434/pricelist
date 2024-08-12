import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";

export default function Register() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);

  const navigate = useNavigate();

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setIsModalOpen(false);
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Menghapus semua karakter non-numerik
    if (value.length <= 20) {
      setPhoneNumber(value);
      setPhoneNumberValid(true);
    } else {
      setPhoneNumberValid(false);
    }
  };

  async function validateForm(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    if (
      name !== "" &&
      email !== "" &&
      phoneNumber !== "" &&
      password !== "" &&
      repeatPassword !== "" &&
      password === repeatPassword &&
      termsAccepted
    ) {
      setError("");

      // Pendaftaran pengguna menggunakan Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        // Tambahkan data pengguna ke tabel 'users' setelah pendaftaran
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            { name, email, phone_number: phoneNumber, id: data.user.id }
          ]);

        if (dbError) {
          setError(dbError.message);
        } else {
          navigate("/"); // Navigate to homepage if successful
        }
      }
    } else if (password !== repeatPassword) {
      setError("Konfirmasi kata sandi tidak sesuai");
    } else {
      setError("Isi semua kolom dengan benar dan setujui S&K.");
    }
  }

  const slides = [
    "/images/logo-muvausa-store.webp",
    "/images/logo-muvausa-store.webp",
    "/images/logo-muvausa-store.webp",
  ];

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const handleSlideSelect = (index) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 2000); // Slide otomatis setiap 2 detik

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-bg_utama min-h-screen overflow-hidden flex items-center justify-center p-4">
      <div className="max-w-3xl w-full flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
        <div id="default-carousel" className="relative overflow-hidden w-full md:w-1/2" data-carousel="slide">
          <div className="relative rounded-lg h-64 md:h-96 mb-8 md:mb-24">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute block w-full transition-transform duration-700 ease-in-out ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: `translateX(${(index - activeSlide) * 100}%)` }}
                data-carousel-item
              >
                <img src={slide} className="w-full h-64 md:h-full object-contain" alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 space-x-2 rtl:space-x-reverse">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-white' : 'bg-gray-400'}`}
                aria-current={index === activeSlide}
                aria-label={`Slide ${index + 1}`}
                data-carousel-slide-to={index}
                onClick={() => handleSlideSelect(index)}
              ></button>
            ))}
          </div>
          <button type="button" className="absolute top-1/2 left-4 z-30 flex items-center justify-center h-10 w-10 bg-white/30 hover:bg-white/50 focus:outline-none group" data-carousel-prev onClick={handlePrevSlide}>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/50 group-hover:bg-white/70">
              <svg className="w-4 h-4 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button type="button" className="absolute top-1/2 right-4 z-30 flex items-center justify-center h-10 w-10 bg-white/30 hover:bg-white/50 focus:outline-none group" data-carousel-next onClick={handleNextSlide}>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/50 group-hover:bg-white/70">
              <svg className="w-4 h-4 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        <div className="w-full md:w-1/2 max-w-md p-8 space-y-6 bg-white rounded-tr-large rounded-bl-large shadow-md">
          <h1 className="text-2xl font-bold mb-6">Ayo Daftar</h1>
          <form className="space-y-4" onSubmit={validateForm}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                maxLength={30}
                name="name"
                id="name"
                required
                placeholder="Masukkan Nama Lengkap Anda"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                maxLength={50}
                name="email"
                id="email"
                required
                placeholder="Masukkan Alamat Email Anda"
                pattern="^[^@]+@[^@]+\.[^@]+$"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                Nomor Telepon
              </label>
              <input
                type="text"
                name="phone-number"
                id="phone-number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                placeholder="Masukkan Nomor Telepon Anda"
                className={`mt-1 block w-full p-2 border ${phoneNumberValid ? 'border-gray-300' : 'border-red-500'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                maxLength={14}
              />
              {!phoneNumberValid && <p className="text-red-500 text-xs mt-1">Nomor telepon harus tidak lebih dari 20 digit.</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Masukkan Kata Sandi Anda"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                name="repeat-password"
                id="repeat-password"
                required
                placeholder="Konfirmasi Kata Sandi Anda"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="terms-conditions"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                required
                className="mr-2"
              />
              <label htmlFor="terms-conditions" className="text-sm text-gray-700">
                Saya setuju dengan <button type="button" className="text-blue-500" onClick={handleToggleModal}>Syarat & Ketentuan</button>
              </label>
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Daftar
            </button>
            <p className="text-sm text-center font-light text-gray-500">
              Sudah memiliki akun?{" "}
              <a
                onClick={() => navigate("/login")}
                className="font-medium cursor-pointer text-primary-600 text-utama hover:underline"
              >
                Masuk
              </a>
            </p>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div
          id="static-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Syarat & Ketentuan
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleToggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-80">
                <h1 className="block text-gray-700 font-bold"> Privasi Terjamin</h1>
                <p className="mb-4 ">Kami menjaga privasi Anda dengan serius. Data pribadi Anda aman bersama kami, dan kami tidak akan membagikannya dengan pihak ketiga tanpa izin Anda.</p>

                <h1 className="block text-gray-700 font-bold"> Keamanan Data</h1>
                <p className="mb-4 ">Aplikasi kami dilengkapi dengan enkripsi tingkat tinggi untuk melindungi data Anda dari akses yang tidak sah. Setiap informasi yang Anda masukkan terlindungi dengan baik.</p>

                <h1 className="block text-gray-700 font-bold"> Perlindungan Privasi</h1>
                <p className="mb-4 ">Nikmati pencarian barang tanpa khawatir. Privasi Anda adalah prioritas kami, dan kami selalu berusaha memastikan bahwa informasi Anda tetap aman dan rahasia.</p>

                <h1 className="block text-gray-700 font-bold"> Keamanan Terbaik</h1>
                <p className="mb-4 ">Dengan teknologi keamanan terkini, kami memastikan data Anda selalu terlindungi. Protokol keamanan berlapis kami dirancang untuk menjaga integritas dan kerahasiaan data Anda.</p>

                <h1 className="block text-gray-700 font-bold"> Privasi</h1>
                <p className="mb-4 ">Informasi pribadi Anda hanya digunakan untuk keperluan pencarian dan tidak dibagikan kepada pihak ketiga. Kami berkomitmen untuk menjaga kerahasiaan data Anda.</p>

                <h1 className="block text-gray-700 font-bold"> Pengamanan Data</h1>
                <p className="mb-4 ">Kami menggunakan sistem pengamanan data berlapis untuk memastikan tidak ada celah keamanan. Setiap lapisan keamanan dirancang untuk melindungi informasi Anda dari ancaman potensial.</p>

                <h1 className="block text-gray-700 font-bold"> Privasi dan Keamanan Maksimal</h1>
                <p className="mb-4 ">Setiap pencarian yang Anda lakukan dilindungi dengan protokol keamanan terbaik. Kami memastikan bahwa aktivitas Anda dalam aplikasi kami selalu aman.</p>

                <h1 className="block text-gray-700 font-bold"> Aman dan Terpercaya</h1>
                <p className="mb-4 ">Keamanan informasi pribadi Anda adalah tanggung jawab utama kami. Kami berusaha keras untuk memastikan bahwa data Anda tidak akan jatuh ke tangan yang salah.</p>

                <h1 className="block text-gray-700 font-bold"> Privasi Anda, Prioritas Kami</h1>
                <p className="mb-4 ">Kami berkomitmen untuk melindungi privasi dan keamanan data Anda dalam setiap langkah pencarian. Dengan kebijakan privasi yang ketat, kami memastikan bahwa data Anda hanya digunakan untuk keperluan yang telah Anda setujui.</p>
              </div>
              <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleAcceptTerms}
                >
                  Setuju
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
