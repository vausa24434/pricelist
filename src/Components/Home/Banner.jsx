import React, { useState } from 'react';

const Banner = () => {
    const [isVisible, setIsVisible] = useState(true);

    // Fungsi untuk menutup banner
    const closeBanner = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div
                id="bottom-banner"
                tabindex="-1"
                className="fixed bottom-0 start-0 z-50 flex justify-between w-full p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            >
                <div className="flex items-center ">
                    <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                        <span className="inline-flex p-1 me-3 bg-gray-200 rounded-full dark:bg-gray-600 w-6 h-6 items-center justify-center">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V9a5 5 0 1 1 10 0v7.083A2.919 2.919 0 0 1 14.083 19H14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 1.732-1h.351a4.917 4.917 0 0 0 4.83-4H19a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.45 3.275a4 4 0 0 0-4.352.976 1 1 0 0 0 1.452 1.376 2.001 2.001 0 0 1 2.836-.067 1 1 0 1 0 1.386-1.442 4 4 0 0 0-1.321-.843Z" clip-rule="evenodd" />
                            </svg>

                            <span className="sr-only">Discount</span>
                        </span>
                        <span>
                            Ada barang yang belum tersedia?{' '}
                            <a
                                href="https://flowbite.com"
                                className=" items-center ms-0 text-sm font-medium text-blue-600 md:ms-1 md:inline-flex dark:text-blue-500 hover:underline"
                            >
                                Hubungi Kami
                            </a>
                        </span>
                    </p>
                </div>
                <div className="flex items-center">
                    <button
                        data-dismiss-target="#bottom-banner"
                        type="button"
                        className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={closeBanner} // Menambahkan event untuk menutup banner
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
                        <span className="sr-only">Close banner</span>
                    </button>
                </div>
            </div>
        )
    );
};

export default Banner;
