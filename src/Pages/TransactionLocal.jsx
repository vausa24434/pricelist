import Nav from "../Components/Nav";
import NavUser from "../Components/NavUser";
import { useAuth } from "../Components/Auth/AuthProvider";
import TransactionLocal from "../Components/Transaction/TransactionLocal";

export default function TransactionLocalPage() {
  const { user } = useAuth();

  return (
    <>
      {user ? <NavUser /> : <Nav />}
      <TransactionLocal />
    </>
  )
}
