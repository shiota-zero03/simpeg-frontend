export const CaseNilai = (nilai: number) => {
  if (nilai === 1) {
    return "Tingkat 1 (Nilai 1) - Sangat Kurang";
  } else if (nilai === 2) {
    return "Tingkat 2 (Nilai 2) - Kurang";
  } else if (nilai === 3) {
    return "Tingkat 3 (Nilai 3) - Cukup";
  } else if (nilai === 4) {
    return "Tingkat 4 (Nilai 4) - Baik";
  } else if (nilai === 5) {
    return "Tingkat 5 (Nilai 5) - Sangat Baik";
  } else {
    return "Belum mengisi penilaian";
  }
};

export const indikatorDescriptions: Record<string, Record<number, string[]>> = {
  kinerja: {
    1: ["Pelaksanaan Kinerja belum mempunyai target yang jelas"],
    2: [
      "Pelaksanaan Kinerja sudah mempunyai target kinerja tertuang dalam jobdesk masing-masing tenaga Non ASN",
    ],
    3: [
      "Pelaksanaan kinerja dapat diselesaikan namun ada beberapa yang selesai dan sebagian tidak tepat waktu",
    ],
    4: ["Pelaksanaan kinerja selesai tepat pada waktu yang ditentukan"],
    5: [
      "Pelaksanaan kinerja selesai semua tepat pada waktunya ditambah dengan penyelesaian tugas tambahan dan disposisi dari pimpinan",
    ],
  },
  disiplin: {
    1: [
      "Tidak Hadir lebih dari 3 hari, berturut-turut, mauapun berulang dalam jeda waktu tertentu",
    ],
    2: [
      "Tidak tepat waktu datang dan pulang kerja, tidak tepat penggunaan seragam dinas",
    ],
    3: [
      "Tepat waktu datang dan/atau tidak tepat waktu pulang kerja atau sebaliknya, tidak tepat penggunaan seragam dinas",
    ],
    4: [
      "Tepat waktu datang dan pulang kerja, tidak tepat penggunaan seragam dinas dan/atau sebaliknya",
    ],
    5: [
      "Tepat waktu datang, tepat waktu pulang, tepat penggunaan seragam dinas, plus pulang lebih akhir untuk menyelesaikan tugas dilebih waktu.",
    ],
  },
  loyalitas: {
    1: [
      "Keinginan kuat untuk tetap menjadi anggota organisasi",
      "Keinginan dan penerimaan yang kuat terhadap nilai dan tujuan organisasi",
      "Memberikan ide kreatif tanpa paksaaan",
      "Melaksanakan tugas tanpa paksaan",
      "Melaporkan hasil kerja pada atasan",
    ],
    2: [
      "Keinginan kuat untuk tetap menjadi anggota organisasi",
      "Keinginan dan penerimaan yang kuat terhadap nilai dan tujuan organisasi",
      "Memberikan ide kreatif tanpa paksaaan",
      "Melaksanakan tugas tanpa paksaan",
      "Melaporkan hasil kerja pada atasan",
    ],
    3: [
      "Keinginan kuat untuk tetap menjadi anggota organisasi",
      "Keinginan dan penerimaan yang kuat terhadap nilai dan tujuan organisasi",
      "Memberikan ide kreatif tanpa paksaaan",
      "Melaksanakan tugas tanpa paksaan",
      "Melaporkan hasil kerja pada atasan",
    ],
    4: [
      "Keinginan kuat untuk tetap menjadi anggota organisasi",
      "Keinginan dan penerimaan yang kuat terhadap nilai dan tujuan organisasi",
      "Memberikan ide kreatif tanpa paksaaan",
      "Melaksanakan tugas tanpa paksaan",
      "Melaporkan hasil kerja pada atasan",
    ],
    5: [
      "Keinginan kuat untuk tetap menjadi anggota organisasi",
      "Keinginan dan penerimaan yang kuat terhadap nilai dan tujuan organisasi",
      "Memberikan ide kreatif tanpa paksaaan",
      "Melaksanakan tugas tanpa paksaan",
      "Melaporkan hasil kerja pada atasan",
    ],
  },
  kerjasama: {
    1: ["Tidak dapat bekerjasama dengan tim"],
    2: [
      "Melaksanakan tugas dan Tanggung jawab secara bersama-sama dalam menyelesaikan pekerjaan",
    ],
    3: [
      "Tanggung jawab secara bersama-sama menyelesaikan pekerjaan, dan saling berkontribusi terhadap penyelesaian pekerjaan",
    ],
    4: [
      "Tanggung jawab secara bersama-sama menyelesaikan pekerjaan, saling berkontribusi terhadap penyelesaian pekerjaan, dan Pengerahan kemampuan secara maksimal",
    ],
    5: [
      "Tanggung jawab secara bersama-sama menyelesaikan pekerjaan, saling berkontribusi terhadap penyelesaian pekerjaan, dan Pengerahan kemampuan secara maksimal serta mampu melaksanakan tugas bersama lintas sektoral",
    ],
  },
  attitude: {
    1: [
      "Sopan dan Ramah",
      "Konsisten",
      "Jujur dan dapat dipercaya",
      "Menjaga Hubungan dengan Rekan Kerja dan pimpinan",
      "Rendah Hati",
    ],
    2: [
      "Sopan dan Ramah",
      "Konsisten",
      "Jujur dan dapat dipercaya",
      "Menjaga Hubungan dengan Rekan Kerja dan pimpinan",
      "Rendah Hati",
    ],
    3: [
      "Sopan dan Ramah",
      "Konsisten",
      "Jujur dan dapat dipercaya",
      "Menjaga Hubungan dengan Rekan Kerja dan pimpinan",
      "Rendah Hati",
    ],
    4: [
      "Sopan dan Ramah",
      "Konsisten",
      "Jujur dan dapat dipercaya",
      "Menjaga Hubungan dengan Rekan Kerja dan pimpinan",
      "Rendah Hati",
    ],
    5: [
      "Sopan dan Ramah",
      "Konsisten",
      "Jujur dan dapat dipercaya",
      "Menjaga Hubungan dengan Rekan Kerja dan pimpinan",
      "Rendah Hati",
    ],
  },
};

export const caseIndikator = (nilai: number, kategori: string): string[] => {
  const lowerKategori = kategori.toLowerCase();
  return indikatorDescriptions[lowerKategori]?.[nilai] || ["Tidak ada data"];
};

export function caseIndikatorNilai(nilai: number): string {
  if (nilai >= 1 && nilai <= 5) {
    return "Kinerja Sangat Rendah";
  } else if (nilai > 5 && nilai <= 10) {
    return "Kinerja Rendah";
  } else if (nilai > 10 && nilai <= 15) {
    return "Kinerja Sedang";
  } else if (nilai > 15 && nilai <= 20) {
    return "Kinerja Tinggi";
  } else if (nilai > 20 && nilai <= 25) {
    return "Kinerja Sangat Tinggi";
  } else {
    return "Nilai tidak valid";
  }
}

export function caseRekomendasi(nilai: number): string {
  if (nilai >= 0 && nilai <= 50) {
    return "TIDAK DAPAT DIREKOMENDASIKAN";
  } else if (nilai >= 51 && nilai <= 60) {
    return "Dipertimbangkan dengan catatan";
  } else if (nilai >= 61 && nilai <= 70) {
    return "Dipertimbangkan";
  } else if (nilai >= 71 && nilai <= 80) {
    return "Direkomendasikan dengan catatan";
  } else if (nilai >= 81 && nilai <= 100) {
    return "DIREKOMENDASIKAN";
  } else {
    return "Nilai tidak valid";
  }
}
