export function terbilang(nilai: number): string {
  const angka = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
  ];
  const tingkat = ["", "ribu", "juta", "miliar", "triliun"];

  if (nilai === 0) return "nol";

  let hasil = "";
  let i = 0;

  while (nilai > 0) {
    const sisa = nilai % 1000;
    if (sisa !== 0) {
      let str = "";
      const ratus = Math.floor(sisa / 100);
      const puluh = Math.floor((sisa % 100) / 10);
      const satu = sisa % 10;

      // Ratusan
      if (ratus > 0) {
        if (ratus === 1) {
          str += "seratus ";
        } else {
          str += angka[ratus] + " ratus ";
        }
      }

      // Puluhan dan satuan
      if (puluh > 0) {
        if (puluh === 1) {
          if (satu === 0) {
            str += "sepuluh ";
          } else if (satu === 1) {
            str += "sebelas ";
          } else {
            str += angka[satu] + " belas ";
          }
        } else {
          str += angka[puluh] + " puluh ";
          if (satu > 0) str += angka[satu] + " ";
        }
      } else if (satu > 0) {
        str += angka[satu] + " ";
      }

      // Ganti "satu ribu" jadi "seribu"
      if (i === 1 && sisa === 1) {
        str = "seribu ";
      }

      hasil = str + tingkat[i] + " " + hasil;
    }

    nilai = Math.floor(nilai / 1000);
    i++;
  }

  return hasil.trim();
}

export const toRoman = (num: number): string => {
  const romanMap: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, roman] of romanMap) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
};
