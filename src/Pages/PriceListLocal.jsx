import Nav from "../Components/Nav";
import NavUser from "../Components/NavUser";
import { useAuth } from "../Components/Auth/AuthProvider";
import React from 'react';
import PriceListLocal from "../Components/PriceListLocal";


export default function PriceListLocalPage() {
    const {user} = useAuth();
    return (
        <>
            {user ? <NavUser /> : <Nav />}
            <PriceListLocal />
        </>
    );  
}
