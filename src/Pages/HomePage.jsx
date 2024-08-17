import Nav from "../Components/Nav";
import Hero from "../Components/Home/Hero";
import Categories from "../Components/Home/Categories";
import NewBrands from "../Components/Home/NewBrand";
import Trending from "../Components/Home/Trending";

export default function HomePage() {
    return (
      <>
          <Nav />
          <Hero />
          <Categories />
          <Trending />
          <NewBrands />
      </>
    )
  }