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

// export const timestampToFormat = (format: string, timeStamp: string) => {
//     const date = new Date(timeStamp);

//     // Mengubah format menjadi dd-mm-yyyy | hh:mm:ss
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');

//     const formattedTimestamp = `${day}-${month}-${year}${format}${hours}:${minutes}:${seconds}`;

//     return formattedTimestamp;
// }

// export const DMYSplitIndoToFormat = (timeStamp: string) => {
//     const date = new Date(timeStamp);

//     // Mengubah format menjadi dd-MMMM-yyyy | hh:mm:ss (dengan nama bulan Indonesia)
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = date.toLocaleString('id-ID', { month: 'long' }); // Nama bulan dalam bahasa Indonesia
//     const year = date.getFullYear();

//     return [
//         day, month, year
//     ];
// }

// export const DetailForBeritaAcaraFormatDate = (dateString: string) => {
//     const [year, month, day] = dateString.split("-").map(Number); // Pecah string jadi angka

//     const days = [
//         "Minggu", "Senin", "Selasa", "Rabu",
//         "Kamis", "Jumat", "Sabtu"
//     ];

//     const months = [
//         "Januari", "Februari", "Maret", "April", "Mei", "Juni",
//         "Juli", "Agustus", "September", "Oktober", "November", "Desember"
//     ];

//     const dateObj = new Date(year, month - 1, day); // Buat Date Object
//     const dayName = days[dateObj.getDay()];
//     const monthName = months[month - 1];

//     const yearText = convertYearToWords(year); // Ubah angka tahun ke kata-kata

//     return `${dayName}, tanggal ${String(day).padStart(2, '0')} bulan ${monthName} tahun ${yearText} ( ${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year} )`;
// };

// // Fungsi untuk mengubah tahun menjadi kata-kata
// const convertYearToWords = (year: number): string => {
//     const numbers = [
//         "", "satu", "dua", "tiga", "empat", "lima", "enam",
//         "tujuh", "delapan", "sembilan"
//     ];

//     if (year < 2000) return year.toString(); // Handle jika tahun kurang dari 2000

//     const ribuan = "Dua ribu"; // Semua tahun setelah 2000 akan diawali "dua ribu"
//     const sisaTahun = year % 2000;

//     if (sisaTahun === 0) return ribuan;

//     if (sisaTahun < 10) return `${ribuan} ${numbers[sisaTahun]}`;
//     if (sisaTahun < 20) return `${ribuan} ${sisaTahun === 10 ? "sepuluh" : `sebelas`.replace("sebelas", `${numbers[sisaTahun - 10]} belas`)}`;

//     const puluhan = Math.floor(sisaTahun / 10);
//     const satuan = sisaTahun % 10;

//     return `${ribuan} ${numbers[puluhan]} puluh${satuan !== 0 ? " " + numbers[satuan] : ""}`;
// };
