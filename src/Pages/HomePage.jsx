import Nav from "../Components/Nav";
import NavUser from "../Components/NavUser";
import { useAuth } from "../Components/Auth/AuthProvider";
import Hero from "../Components/Home/Hero";
import Categories from "../Components/Home/Categories";
import NewBrands from "../Components/Home/NewBrand";
import Trending from "../Components/Home/Trending";

export default function HomePage() {
  const { user } = useAuth();
    return (
      <>
        {user ? <NavUser /> : <Nav />}
        <Hero />
        <Categories />
        <Trending />
        <NewBrands />
      </>
    )
  }