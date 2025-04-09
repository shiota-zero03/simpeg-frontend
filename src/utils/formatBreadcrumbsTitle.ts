export const FormatBreadcrumb = (pathname: string) => {
  const dataBreadcrumbs = [];
  if (pathname !== "/") {
    dataBreadcrumbs.push({ name: "Beranda", link: "/" });
  }

  let currentPath = "";

  pathname.split("/").forEach((item, index) => {
    if (index !== 0) {
      if (item === "Berita") {
        currentPath += `/news`;
      } else {
        currentPath += `/${item}`;
      }
      dataBreadcrumbs.push({ name: FormatTitle(item), link: currentPath });
    }
  });

  return dataBreadcrumbs;
};

export const FormatTitle = (pathtitle: string) => {
  const formatedTitle = pathtitle
    .replace(/-/g, " ") // Mengganti "-" dengan spasi
    .split(" ") // Memisahkan kata
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
