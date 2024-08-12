import Nav from "../Components/Nav";
import NavUser from "../Components/NavUser";
import { useAuth } from "../Components/Auth/AuthProvider";
import React from 'react';
import UpdatePriceListLocal from "../Components/UpdatePriceListLocal";


export default function HomePage() {
    const {user} = useAuth();
    return (
        <>
            {user ? <NavUser /> : <Nav />}
            <UpdatePriceListLocal />
        </>
    );  
}
