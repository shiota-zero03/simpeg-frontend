export const OrganizationDataDummy = {
    "name": "Kepala Dinas",
    "position": "1",
    "parent_id": null,
    "children": [
      {
        "name": "Sekretaris Dinas Perdagangan",
        "position": "2",
        "parent_id": "1",
        "children": [
          {
            "name": "Kasubag Umum dan Kepegawaian",
            "position": "3",
            "parent_id": "2"
          },
          {
            "name": "Kasubag Perencanaan dan Keuangan",
            "position": "4",
            "parent_id": "2"
          }
        ]
      },
      {
        "name": "Kepala Bidang Sarana dan Pelaku Distribusi",
        "position": "5",
        "parent_id": "1",
        "children": [
          {
            "name": "Ketua Tim Pelaku Distribusi",
            "position": "6",
            "parent_id": "5"
          },
          {
            "name": "Ketua Tim Pemasaran Produk Dalam Negeri",
            "position": "7",
            "parent_id": "5"
          }
        ]
      },
      {
        "name": "Kepala Bidang Pengendalian Harga",
        "position": "8",
        "parent_id": "1",
        "children": [
          {
            "name": "Ketua Tim Pengendalian Harga",
            "position": "9",
            "parent_id": "8"
          },
          {
            "name": "Ketua Tim Ketersediaan Barang Pokok",
            "position": "10",
            "parent_id": "8"
          }
        ]
      }
    ]
  }
  