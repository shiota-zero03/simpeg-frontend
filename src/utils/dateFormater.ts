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

export const MYIndoToFormat = (timeStamp: string) => {
  const date = new Date(timeStamp);

  // Mengubah format menjadi dd-MMMM-yyyy | hh:mm:ss (dengan nama bulan Indonesia)
  const month = date.toLocaleString("id-ID", { month: "long" }); // Nama bulan dalam bahasa Indonesia
  const year = date.getFullYear();

  const formattedTimestamp = `${month} ${year}`;

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

export const DaysDMYIndoToFormat = (timeStamp: string) => {
  const date = new Date(timeStamp);

  const dayName = date.toLocaleString("id-ID", { weekday: "long" });
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("id-ID", { month: "long" }); // Nama bulan dalam bahasa Indonesia
  const year = date.getFullYear();

  const formattedTimestamp = `${dayName}, ${day} ${month} ${year}`;

  return formattedTimestamp;
};

export const textToFormat = (isoString: string) => {
  const date = new Date(isoString);

  // Mapping hari
  const namaHari = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    date,
  );

  // Mapping bulan
  const namaBulan = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
    date,
  );

  // Mapping tanggal angka ke huruf
  const angkaKeHuruf: { [key: number]: string } = {
    1: "Satu",
    2: "Dua",
    3: "Tiga",
    4: "Empat",
    5: "Lima",
    6: "Enam",
    7: "Tujuh",
    8: "Delapan",
    9: "Sembilan",
    10: "Sepuluh",
    11: "Sebelas",
    12: "Dua Belas",
    13: "Tiga Belas",
    14: "Empat Belas",
    15: "Lima Belas",
    16: "Enam Belas",
    17: "Tujuh Belas",
    18: "Delapan Belas",
    19: "Sembilan Belas",
    20: "Dua Puluh",
    21: "Dua Puluh Satu",
    22: "Dua Puluh Dua",
    23: "Dua Puluh Tiga",
    24: "Dua Puluh Empat",
    25: "Dua Puluh Lima",
    26: "Dua Puluh Enam",
    27: "Dua Puluh Tujuh",
    28: "Dua Puluh Delapan",
    29: "Dua Puluh Sembilan",
    30: "Tiga Puluh",
    31: "Tiga Puluh Satu",
  };

  // Tahun bisa di-hardcode per bagian
  const tahunHuruf = "Dua Ribu Dua Puluh Lima"; // untuk 2025

  const tanggal = date.getDate();
  const kalimat = `${namaHari} tanggal ${angkaKeHuruf[tanggal]} bulan ${namaBulan} tahun ${tahunHuruf}`;
  return kalimat;
};
