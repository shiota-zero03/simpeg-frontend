export const DateYMDFormat = (timeStamp: string) => {
  const date = new Date(timeStamp);

  // Mengubah format menjadi dd-MMMM-yyyy | hh:mm:ss (dengan nama bulan Indonesia)
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("id-ID", { month: "2-digit" }); // Nama bulan dalam bahasa Indonesia
  const year = date.getFullYear();

  const formattedTimestamp = `${year}-${month}-${day}`;

  return formattedTimestamp;
};

export const DateDMYFormat = (timeStamp: string) => {
  const date = new Date(timeStamp);

  // Mengubah format menjadi dd-MMMM-yyyy | hh:mm:ss (dengan nama bulan Indonesia)
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("id-ID", { month: "2-digit" }); // Nama bulan dalam bahasa Indonesia
  const year = date.getFullYear();

  const formattedTimestamp = `${day}/${month}/${year}`;

  return formattedTimestamp;
};

export const DMYIndoToFormat = (timeStamp: string) => {
  const date = new Date(timeStamp);

  // Mengubah format menjadi dd-MMMM-yyyy | hh:mm:ss (dengan nama bulan Indonesia)
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("id-ID", { month: "long" }); // Nama bulan dalam bahasa Indonesia
  const year = date.getFullYear();

  const formattedTimestamp = `${day} ${month} ${year}`;

  return formattedTimestamp;
};

export const timestampIndoToFormat = (format: string, timeStamp: string) => {
  const date = new Date(timeStamp);

  // Ambil nilai UTC agar tidak dikonversi ke zona waktu lokal
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = date.toLocaleString("id-ID", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0"); // Gunakan UTC Hours
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${day} ${month} ${year}${format}${hours}:${minutes}:${seconds}`;
};

export const HIDateformat = (timeStamp: string) => {
  const date = new Date(timeStamp);

  const hours = String(date.getUTCHours()).padStart(2, "0"); // Gunakan UTC Hours
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const YMToIndoFormat = (ymString: string) => {
  const [year, month] = ymString.split("-").map(Number);

  // Validasi input
  if (!year || !month || month > 12) {
    return "Format tidak valid";
  }

  // Buat tanggal dummy dari input
  const date = new Date(year, month - 1);

  // Format ke "MMMM yyyy" => Contoh: April 2025
  const formattedDate = date.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};
