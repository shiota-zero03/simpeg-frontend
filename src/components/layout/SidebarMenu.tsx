import store from "@/redux/store";

import { LoginSidebar } from "./SidebarInfo/Login";
import { BeforeSidebar } from "./SidebarInfo/Before";

export function AppSidebar() {
  const { role } = store.getState().auth;

  return role ? <LoginSidebar /> : <BeforeSidebar />;
}
