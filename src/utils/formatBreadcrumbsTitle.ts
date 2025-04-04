export const FormatBreadcrumb = (pathname: string) => {
  const dataBreadcrumbs = [];
  if (pathname.includes("sa/dashboard")) {
    dataBreadcrumbs.push({ name: "Dashboard", link: "/sa/dashboard" });
  } else if (!pathname.includes("dashboard")) {
    dataBreadcrumbs.push({ name: "Dashboard", link: "/dashboard" });
  }

  let currentPath = "";

  if (pathname.split("/")[1] === "sa") {
    currentPath = "/sa";
  }

  pathname.split("/").forEach((item, index) => {
    if (index !== 0 && item !== "sa") {
      currentPath += `/${item}`;
      dataBreadcrumbs.push({ name: FormatTitle(item), link: currentPath });
    }
  });

  return dataBreadcrumbs;
};

export const FormatTitle = (pathtitle: string) => {
  const formatedTitle = pathtitle
    .replace(/-/g, " ") // Mengganti "-" dengan spasi
    .split(" ") // Memisahkan kata
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi setiap kata
    .join(" ");

  return formatedTitle;
};

export const FormatRole = (pathtitle: string) => {
  const formattedTitle = pathtitle
    .replace(/_/g, " ") // Mengganti "_" dengan spasi
    .toLowerCase() // Mengubah semua huruf menjadi kecil
    .split(" ") // Memisahkan kata-kata
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama tiap kata
    .join(" ");

  return formattedTitle;
};
