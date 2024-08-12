import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from '../../../supabaseClient';

export default function Login() {
    const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState(0);

    async function validateForm(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            alert('Info user tidak ditemukan atau terjadi kesalahan: ' + error.message);
        } else if (data.user) {
            navigate("/");
        }
    }

    function RedirectRegister() {
        navigate("/register");
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
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/50 group-hover:bg-white/70 ">
                            <svg className="w-4 h-4 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" className="absolute top-1/2 right-4 z-30 flex items-center justify-center h-10 w-10 bg-white/30 hover:bg-white/50 focus:outline-none group" data-carousel-next onClick={handleNextSlide}>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/50 group-hover:bg-white/70 ">
                            <svg className="w-4 h-4 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>

                <div className="w-full md:w-1/2 max-w-md p-8 space-y-6 bg-white rounded-tr-large rounded-bl-large shadow-md">
                    <div className="text-center">
                        <a href="/" className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900">
                            Muvausa Store
                        </a>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
                            Masuk
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={validateForm}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Masukkan Alamat Email Anda"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Sandi</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                            </div>
                            <div className="flex justify-between">
                                <a
                                    onClick={() => navigate("/resetpasswordrequest")}

                                    className="text-sm cursor-pointer font-medium text-primary-600 text-utama hover:underline">Lupa Sandi?</a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-utama border border-utama bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Masuk
                            </button>
                            <p className="text-sm text-center font-light text-gray-500">
                                Belum memiliki akun?{" "}
                                <a
                                    onClick={RedirectRegister}
                                    className="font-medium cursor-pointer text-primary-600 text-utama hover:underline"
                                >
                                    Daftar
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
