import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./SidebarMenu"
import { Outlet } from "react-router-dom"
import Header from "./HeaderApp";

export default function Layout() {
  return (
    <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
            <AppSidebar />
            <main className="flex-1 min-h-screen lg:w-[calc(100%-16rem)] w-full">
                <div className="flex w-full">
                    <Header />
                </div>
                <div className="w-full md:mt-[84px] mt-[72px] duration-300 pb-24">
                    <Outlet />
                </div>
            </main>
        </div>
    </SidebarProvider>
  )
}
