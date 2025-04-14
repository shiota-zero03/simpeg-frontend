import { ChevronDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import Logo from "@/assets/logo.png";
import Wave from "@/assets/wave.png";
import { Divider } from "@heroui/react";
import { SidebarMenuData } from "@/constants/SidebarMenu";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FaCircle } from "react-icons/fa";
import store from "@/redux/store";

type SubMenu = {
  name: string;
  key: string;
  link: string;
  subMenu?: SubMenu[];
};

type MenuItem = {
  name: string;
  menu: SubMenu[];
};

const roleAccessMap: Record<string, string[]> = {
  GUEST: ["beranda", "peta-jabatan", "buku-petunjuk", "hubungi-kami"],
  ADMIN: [
    "beranda",
    "peta-jabatan",
    "position",
    "pegawai",
    "summary-report",
    "berdasarkan-bobot",
    "berdasarkan-nilai",
    "pengaduan",
    "dialog-kinerja",
    "sppd",
    "asset",
    "buku-petunjuk",
    "hubungi-kami",
    "news",
    "galeri-dokumentasi",
    "whatsapp",
    "e-filling"
  ],
};

export function AppSidebar() {
  const { role } = store.getState().auth;
  const location = useLocation();

  const currentRole: keyof typeof roleAccessMap | "GUEST" =
    role && roleAccessMap[role] ? role : "GUEST";
  const allowedSubMenus = roleAccessMap[currentRole];

  const isMenuActive = (
    items: {
      key: string;
      subMenu?: {
        name: string;
        key: string;
        link: string;
      }[];
    }[],
    allowedSubMenus: string[],
  ): boolean => {
    return items.some(
      (item) =>
        allowedSubMenus.includes(item.key) ||
        (item.subMenu && isMenuActive(item.subMenu, allowedSubMenus)),
    );
  };

  const isMenuTrue = (item: MenuItem, allowedSubMenus: string[]): boolean => {
    return (
      allowedSubMenus.includes(item.name) ||
      item.menu.some(
        (menuItem) =>
          allowedSubMenus.includes(menuItem.key) ||
          (menuItem.subMenu && isMenuActive(menuItem.subMenu, allowedSubMenus)),
      )
    );
  };
  return (
    <Sidebar
      collapsible="icon"
      className="!border-none !outline-none !ring-0 overflow-hidden !z-50 bg-primary group"
    >
      <img src={Wave} alt="wave-simpeg" className="absolute bottom-0 w-full" />
      <SidebarHeader className="py-8">
        <SidebarMenu>
          <SidebarMenuItem className="text-white flex items-center justify-center gap-3">
            <img src={Logo} alt="logo-simpeg" width={40} />
            <div>
              <h5 className="text-sm font-semibold -mb-1">DINAS PERDAGANGAN</h5>
              <span className="text-xs">KABUPATEN BEKASI</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Divider className="bg-[#FFF1005A] h-[0.1px] w-[80%] mx-auto" />
      <SidebarContent className="relative m-0 py-4 z-20 overflow-y-hidden hover:overflow-y-auto duration-300">
        {SidebarMenuData.map((item, index) => {
          if (isMenuTrue(item, allowedSubMenus)) {
            return (
              <SidebarGroup className="!p-0" key={index}>
                <SidebarGroupLabel className="uppercase text-white text-[10px] px-4">
                  {item.name}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.menu.map((itemM) => {
                      const isActive =
                        ((location.pathname === "/" ||
                          location.pathname.includes("berita")) &&
                          itemM.key === "beranda") ||
                        location.pathname.includes(itemM.key) ||
                        (itemM.subMenu &&
                          itemM.subMenu.some(
                            (subItem) =>
                              ((location.pathname === "/" ||
                                location.pathname.includes("berita")) &&
                                subItem.key === "beranda") ||
                              location.pathname.includes(subItem.key),
                          ));

                      if (isMenuActive([itemM], allowedSubMenus)) {
                        return (
                          <SidebarMenuItem key={itemM.key}>
                            {itemM.subMenu ? (
                              <Collapsible
                                defaultOpen={isActive}
                                className="group/collapsible"
                              >
                                <SidebarMenuButton asChild>
                                  <CollapsibleTrigger asChild>
                                    <Link
                                      to={itemM.link}
                                      className={`font-light text-xs px-4 hover:font-medium hover:text-secondary rounded-none ${
                                        isActive
                                          ? "border-s-4 border-secondary bg-[#FFF1001A] text-secondary"
                                          : "border-s-4 border-transparent hover:border-secondary hover:bg-[#FFF1001A] text-white"
                                      } duration-300`}
                                    >
                                      <itemM.icon />
                                      <span>{itemM.name}</span>
                                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </Link>
                                  </CollapsibleTrigger>
                                </SidebarMenuButton>
                                <CollapsibleContent>
                                  <SidebarMenuSub className="!border-none">
                                    {itemM.subMenu.map((subItem) => {
                                      if (
                                        allowedSubMenus.includes(subItem.key)
                                      ) {
                                        return (
                                          <SidebarMenuSubItem
                                            key={subItem.key}
                                            className="py-1"
                                          >
                                            <Link
                                              to={subItem.link}
                                              className={`font-light px-2 hover:font-medium hover:text-secondary rounded-none duration-300 flex items-center gap-2 text-xs ${location.pathname.includes(subItem.key) ? "text-secondary" : "text-white"}`}
                                            >
                                              <FaCircle size={6} />
                                              <span>{subItem.name}</span>
                                            </Link>
                                          </SidebarMenuSubItem>
                                        );
                                      }
                                    })}
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </Collapsible>
                            ) : (
                              <SidebarMenuButton asChild>
                                <Link
                                  to={itemM.link}
                                  className={`
                                    font-light text-xs px-4 hover:font-medium hover:text-secondary rounded-none duration-300 
                                    ${
                                      location.pathname.includes(itemM.key)
                                        ? "border-s-4 border-secondary bg-[#FFF1001A] text-secondary"
                                        : (location.pathname === "/" ||
                                              location.pathname.includes(
                                                "berita",
                                              )) &&
                                            itemM.key === "beranda"
                                          ? "border-s-4 border-secondary bg-[#FFF1001A] text-secondary"
                                          : "border-s-4 border-transparent hover:border-secondary hover:bg-[#FFF1001A] text-white"
                                    }
                                  `}
                                >
                                  <itemM.icon />
                                  <span>{itemM.name}</span>
                                </Link>
                              </SidebarMenuButton>
                            )}
                          </SidebarMenuItem>
                        );
                      }
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }
        })}
      </SidebarContent>
    </Sidebar>
  );
}
