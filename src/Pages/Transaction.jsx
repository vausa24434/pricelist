import Nav from "../Components/Nav";
import NavUser from "../Components/NavUser";
import { useAuth } from "../Components/Auth/AuthProvider";
import Transaction from "../Components/Transaction/Transaction";

export default function TransactionPage() {
  const { user } = useAuth();

  return (
    <>
      {user ? <NavUser /> : <Nav />}
      <Transaction />
    </>
  )
}
