import store from "@/redux/store";

import Login from "./HeaderInfo/Login";
import Before from "./HeaderInfo/Before";

export default function Header() {
  const { role } = store.getState().auth;

  return role ? <Login /> : <Before />;
}
