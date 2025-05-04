import { FormatBreadcrumb } from "@/utils/formatBreadcrumbsTitle";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

const BreadcrumbAdmin = ({ location }: { location: string }) => {
  // Ambil breadcrumbs dari fungsi utility
  const dataBreadcrumbs = FormatBreadcrumb(location).filter((item) =>
    isNaN(Number(item.name)),
  ); // Filter jika namanya angka

  return (
    <div className="bg-[#DDFCFF] py-3 px-4 flex justify-start">
      <Breadcrumbs
        itemsAfterCollapse={2}
        itemsBeforeCollapse={1}
        maxItems={3}
        renderEllipsis={({ items, ellipsisIcon, separator }) => (
          <div className="flex items-center">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="min-w-6 w-6 h-6 bg-transparent text-primary"
                  size="sm"
                  variant="flat"
                >
                  {ellipsisIcon}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Routes">
                {items.map((item, index) => (
                  <DropdownItem key={index} href={item.href}>
                    {item.children}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {separator}
          </div>
        )}
      >
        {dataBreadcrumbs.map((item, index) => (
          <BreadcrumbItem
            href={item.link.toLowerCase()}
            key={index}
            className="md:text-base text-sm font-medium"
          >
            {item.name}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbAdmin;
