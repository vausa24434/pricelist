import Nav from "../Components/Nav";
import NavUser from "../Components/NavUser";
import Hero from "../Components/Hero";
import Services from "../Components/Services";
import ShowMenu from "../Components/ShowMenu";
import Customers from "../Components/Customers";
import GetApp from "../Components/GetApp";
import { useAuth } from '../Components/AuthProvider';
import Footer from "../Components/Footer";

export default function HomePage() {
    const {user} = useAuth();
    return (
        <>
            {user ? <NavUser /> : <Nav />}
            <Hero />
            <Services />
            <ShowMenu />
            <Customers />
            <GetApp />
            <Footer />
            
        </>
    );
}
