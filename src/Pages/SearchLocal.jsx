import Nav from "../Components/Nav";
import NavUser from "../Components/NavUser";
import { useAuth } from "../Components/Auth/AuthProvider";
import SearchLocal from "../Components/Search/SearchLocal";

export default function SearchLocalPage() {
  const { user } = useAuth();

  return (
    <>
      {user ? <NavUser /> : <Nav />}
      <SearchLocal />
    </>
  )
}
