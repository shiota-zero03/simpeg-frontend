import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@heroui/react';
import { LucideDownloadCloud } from 'lucide-react';
import { LuFullscreen } from 'react-icons/lu';

interface PetaJabatanData {
    name: string;
    class: number;
    b: number;
    k: number;
    plus: number;
    minus: number;
}

export default function BigTable() {

    const tableRef = useRef<HTMLTableElement>(null);

    const generateColumns = () => {
        const columns = [];
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
        for (let i = 0; i < 160; i++) {
            let col = '';
            let n = i;
            do {
                col = letters[n % 26] + col;
                n = Math.floor(n / 26) - 1;
            } while (n >= 0);
            columns.push(col);
        }
        return columns;
    };

    const columns = generateColumns();

  // Fullscreen
  const toggleFullscreen = () => {
    if (tableRef.current) {
      if (!document.fullscreenElement) {
        tableRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };
    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollTo({
                left: (tableRef.current.scrollWidth - tableRef.current.clientWidth) / 2,
                behavior: 'smooth',
            });
        }
    }, []);

    const handleDownload = async () => {
        if (tableRef.current) {
            const rect = tableRef.current.getBoundingClientRect();
            const canvas = await html2canvas(tableRef.current, {
                scrollX: -window.scrollX,
                scrollY: -window.scrollY,
                x: rect.left - (0.15 * tableRef.current.scrollWidth),
                width: tableRef.current.scrollWidth,
                height: tableRef.current.scrollHeight,
                windowWidth: tableRef.current.scrollWidth,
                windowHeight: tableRef.current.scrollHeight,
            });
            const link = document.createElement('a');
            link.download = 'PetaJabatan.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };



    const perencanaanKeuangan: PetaJabatanData[] = [
        { name: "Penelaah Teknis Kebijakan ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pranata Komputer Keahlian", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
    ]
    const umpeg: PetaJabatanData[] = [
        { name: "Penelaah Teknis Kebijakan ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pranata Komputer Keahlian", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Arsiparis", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
    ]

    const ln: PetaJabatanData[] = [
        { name: "Analis Perdagangan Ahli Pertama", class: 8, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Analis Perdagangan Ahli Muda", class: 10, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Analis Perdagangan Ahli Madya", class: 12, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penelaah Teknis Kebijakan ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penelaah Pengembangan Jasa Sertifikasi dan Pengujian", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Fasilitator Perdagangan ", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Surveyor Perdagangan ", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pranata Komputer Keahlian", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
    ]
    const spl: PetaJabatanData[] = [
        { name: "Analis Perdagangan Ahli Pertama", class: 8, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Analis Perdagangan Ahli Muda", class: 10, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Analis Perdagangan Ahli Madya", class: 12, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penelaah Teknis Kebijakan", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Fasilitator Perdagangan ", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Surveyor Perdagangan ", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pranata Komputer Keahlian", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
    ]
    const kemetrologian: PetaJabatanData[] = [
        { name: "Pengawas Kemetrologian Ahli Pertama", class: 8, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengawas Kemetrologian Ahli Muda", class: 10, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengawas Kemetrologian Ahli Madya", class: 12, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penelaah Teknis Kebijakan", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
    ]
    const pbpp: PetaJabatanData[] = [
        { name: "Analis Perdagangan Ahli Pertama", class: 8, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Analis Perdagangan Ahli Muda", class: 10, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Analis Perdagangan Ahli Madya", class: 12, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penelaah Teknis Kebijakan", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penelaah Pengembangan Jasa Sertifikasi dan Pengujian", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Surveyor Perdagangan ", class: 7, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pranata Komputer Keahlian", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
    ]

    const uptd1: PetaJabatanData[] = [
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penata Layanan Operasional", class: 3, b: 0, k: 0, plus: 0, minus: 0 }
    ]
    const uptd2: PetaJabatanData[] = [
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penata Layanan Operasional", class: 3, b: 0, k: 0, plus: 0, minus: 0 }
    ]
    const uptd3: PetaJabatanData[] = [
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penata Layanan Operasional", class: 3, b: 0, k: 0, plus: 0, minus: 0 }
    ]
    const uptd4: PetaJabatanData[] = [
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penata Layanan Operasional", class: 3, b: 0, k: 0, plus: 0, minus: 0 }
    ]
    const uptd5: PetaJabatanData[] = [
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penata Layanan Operasional", class: 3, b: 0, k: 0, plus: 0, minus: 0 }
    ]
    const uptd6: PetaJabatanData[] = [
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penata Layanan Operasional", class: 3, b: 0, k: 0, plus: 0, minus: 0 }
    ]
    const uptd7: PetaJabatanData[] = [
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penata Layanan Operasional", class: 3, b: 0, k: 0, plus: 0, minus: 0 }
    ]
    const uptd8: PetaJabatanData[] = [
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penata Layanan Operasional", class: 3, b: 0, k: 0, plus: 0, minus: 0 }
    ]
    const uptd9: PetaJabatanData[] = [
        { name: "Pengolah Data dan Informasi ", class: 6, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengadministrasi Perkantoran", class: 5, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penata Layanan Operasional", class: 3, b: 0, k: 0, plus: 0, minus: 0 }
    ]
    const uptdMetrologiLegal: PetaJabatanData[] = [
        { name: "Penera Ahli Pertama", class: 8, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penera Ahli Muda", class: 9, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Penera Ahli Madya", class: 11, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengawas Perdagangan Pertama", class: 8, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengawas Perdagangan Muda", class: 9, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Pengawas Perdagangan Madya", class: 11, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Analis Perdagangan Pertama", class: 8, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Analis Perdagangan Muda", class: 9, b: 0, k: 0, plus: 0, minus: 0 },
        { name: "Analis Perdagangan Madya", class: 11, b: 0, k: 0, plus: 0, minus: 0 },
    ]

  return (
    <div className='bg-white'>
        <div className="flex gap-4 mb-4 p-4">
        <Button
          onPress={handleDownload}
          className="px-4 py-2 bg-button-primary text-white rounded"
        >
            <LucideDownloadCloud size={18} />
          Download PNG
        </Button>
        <Button
          onPress={toggleFullscreen}
          className="px-4 py-2 bg-info text-white rounded"
        >
            <LuFullscreen size={18} />
          Fullscreen
        </Button>
      </div>

        <div>
            <div ref={tableRef} className='w-full min-h-screen overflow-auto border border-button-primary scrollbar-hide'>
                <table className="table-auto bg-white">
                    <thead className=" bg-white">
                    <tr>
                        {columns.map((col) => (
                        <th key={col} className="w-6"></th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colSpan={160} className='h-12'></th>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs' colSpan={73}></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>Kepala Dinas</th>
                            <th className='px-2 py-2 text-center text-xs' colSpan={73}></th>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs' colSpan={73}></th>
                            <td className='px-2 py-2 text-center text-xs badge-map' colSpan={14}>Kelas 14</td>
                            <th className='px-2 py-2 text-center text-xs' colSpan={73}></th>
                        </tr>
                        <tr>
                            <td className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={80}></td>
                            <td className='px-2 py-2 border-s border-button-primary text-center text-xs' colSpan={80}></td>
                        </tr>
                        <tr>
                            <td className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={80}></td>
                            <td className='px-2 py-2 border-s border-button-primary text-center text-xs border-b' colSpan={16}></td>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>Sekretaris</th>
                            <td className='px-2 py-2 border-s border-button-primary text-center text-xs' colSpan={50}></td>
                        </tr>
                        <tr>
                            <td className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={80}></td>
                            <td className='px-2 py-2 border-s border-button-primary text-center text-xs' colSpan={16}></td>
                            <td className='px-2 py-2 text-center text-xs badge-map' colSpan={14}>Kelas 12</td>
                            <td className='px-2 py-2 border-s border-button-primary text-center text-xs' colSpan={50}></td>
                        </tr>
                        <tr>
                            <td className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={80}></td>
                            <td className='px-2 py-2 text-center text-xs' colSpan={15}></td>
                            <td className='px-2 py-2 border-e border-b border-button-primary text-center text-xs' colSpan={8}></td>
                            <td className='px-2 py-2 border-s border-b border-button-primary text-center text-xs' colSpan={8}></td>
                            <td className='px-2 py-2 text-center text-xs' colSpan={49}></td>
                        </tr>
                        <tr>
                            <td className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={80}></td>
                            <td className='px-2 py-2 text-center text-xs' colSpan={15}></td>
                            <td className='px-2 py-2 border-s border-button-primary text-center text-xs' colSpan={8}></td>
                            <td className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={8}></td>
                            <td className='px-2 py-2 text-center text-xs' colSpan={49}></td>
                        </tr>

                        <tr>
                            <th className='px-2 py-2 text-center text-xs border-e border-button-primary' colSpan={80}></th>
                            <th className='px-2 py-2 text-center text-xs border-s border-button-primary' colSpan={8}></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>Kasubbag Perencanaan dan Keuangan </th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>Kasubbag Umum dan Kepegawaian</th>
                            <th className='px-2 py-2 text-center text-xs' colSpan={42}></th>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs border-e border-button-primary' colSpan={80}></th>
                            <th className='px-2 py-2 text-center text-xs border-s border-button-primary' colSpan={8}></th>
                            <td className='px-2 py-2 text-center text-xs badge-map' colSpan={14}>Kelas 9</td>
                            <td className='px-2 py-2 text-center text-xs'></td>
                            <td className='px-2 py-2 text-center text-xs'></td>
                            <td className='px-2 py-2 text-center text-xs badge-map' colSpan={14}>Kelas 9</td>
                            <th className='px-2 py-2 text-center text-xs' colSpan={42}></th>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs border-e border-button-primary' colSpan={80}></th>
                            <th className='px-2 py-2 text-center text-xs border-e border-button-primary' colSpan={9}></th>
                            <th className='px-2 py-2 text-center text-xs border-e border-button-primary' colSpan={16}></th>
                            <th className='px-2 py-2 text-center text-xs' colSpan={55}></th>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs border-e border-button-primary' colSpan={80}></th>
                            <th className='px-2 py-2 text-center text-xs' colSpan={7}></th>
                            {Array.from({ length: 2 }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <th className={`px-2 py-2 border-button-primary text-center text-xs ${index === 2 && "border-s border-button-primary"}`}></th>
                                    <th className='px-2 py-2 border-e border-button-primary text-center text-xs'></th>
                                    <th className='px-2 py-2 text-center text-xs'></th>
                                    <th className='px-2 py-2 badge-map text-center text-xs' colSpan={6}>Jabatan</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs' colSpan={2}>Kelas</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>B</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>K</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>(+)</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>(-)</th>
                                    <th className={`px-2 py-2 text-center text-xs`}></th>
                                </React.Fragment>
                            ))}
                            <th className='px-2 py-2 text-center text-xs' colSpan={48}></th>
                        </tr>
                        {umpeg.map((itemUmpeg, index) => {
                            const itemPK = perencanaanKeuangan[index] || {};
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        <th className='px-2 py-2 text-center text-xs border-e border-button-primary' colSpan={80} rowSpan={2}></th>
                                        <th className='px-2 py-2 text-center text-xs' colSpan={7} rowSpan={2}></th>

                                        {itemPK.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2}></th>}
                                        {itemPK.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th></th>}
                                        {itemPK.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" colSpan={6} rowSpan={2}>{itemUmpeg.name}</td> : <td colSpan={6} rowSpan={2}></td>}
                                        {itemPK.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" colSpan={2} rowSpan={2}>{itemUmpeg.class}</td> : <td colSpan={2} rowSpan={2}></td>}
                                        {itemPK.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUmpeg.b}</td> : <td rowSpan={2}></td>}
                                        {itemPK.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUmpeg.k}</td> : <td rowSpan={2}></td>}
                                        {itemPK.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUmpeg.plus}</td> : <td rowSpan={2}></td>}
                                        {itemPK.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUmpeg.minus}</td> : <td rowSpan={2}></td>}
                                        {itemPK.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2}></th>}

                                        <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th>
                                        <th className='px-2 py-2 text-center text-xs'></th>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" colSpan={6} rowSpan={2}>{itemUmpeg.name}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" colSpan={2} rowSpan={2}>{itemUmpeg.class}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUmpeg.b}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUmpeg.k}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUmpeg.plus}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUmpeg.minus}</td>
                                        <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th>

                                        <th className='px-2 py-2 text-center text-xs' colSpan={48} rowSpan={2}></th>
                                    </tr>
                                    <tr>
                                        {itemPK.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th>  : <th></th>}
                                        <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th>
                                    </tr>
                                </React.Fragment>
                            );
                        })}

                        <tr>
                            <td className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={80}></td>
                            <td className='px-2 py-2 border-s border-button-primary text-center text-xs' colSpan={80}></td>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs' colSpan={56}></th>
                            <th className='px-2 py-2 text-center text-xs border-b border-e border-button-primary' colSpan={24}></th>
                            <th className='px-2 py-2 text-center text-xs border-b border-s border-button-primary' colSpan={24}></th>
                            <th className='px-2 py-2 text-center text-xs' colSpan={56}></th>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs' colSpan={48}></th>
                            <td className='px-2 py-2 text-center border-e text-xs border-button-primary' colSpan={8}></td>
                            <td className='px-2 py-2 text-center border-s text-xs border-button-primary' colSpan={8}></td>
                            <td className='px-2 py-2 text-center border-e text-xs border-button-primary' colSpan={8}></td>
                            <td className='px-2 py-2 text-center border-x text-xs border-button-primary' colSpan={8}></td>
                            <td className='px-2 py-2 text-center border-x text-xs border-button-primary' colSpan={8}></td>
                            <td className='px-2 py-2 text-center border-s text-xs border-button-primary' colSpan={8}></td>
                            <td className='px-2 py-2 text-center border-e text-xs border-button-primary' colSpan={8}></td>
                            <td className='px-2 py-2 text-center border-s text-xs border-button-primary' colSpan={8}></td>
                            <th className='px-2 py-2 text-center text-xs' colSpan={48}></th>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs' colSpan={49}></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>Kepala Bidang Pengembangan Perdagangan Luar Negeri</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>Kepala Bidang Sarana dan Pelaku Distribusi</th>
                            <th className='px-2 py-2 text-center text-xs border-e border-button-primary'></th>
                            <th className='px-2 py-2 text-center text-xs border-s border-button-primary'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>Kepala Bidang Kemetrologian</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>Kepala Bidang Pengendalian Barang Pokok dan Penting</th>
                            <th className='px-2 py-2 text-center text-xs' colSpan={49}></th>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs' colSpan={49}></th>
                            <td className='px-2 py-2 text-center text-xs badge-map' colSpan={14}>Kelas 11</td>
                            <td className='px-2 py-2 text-center text-xs'></td>
                            <td className='px-2 py-2 text-center text-xs'></td>
                            <td className='px-2 py-2 text-center text-xs badge-map' colSpan={14}>Kelas 11</td>
                            <td className='px-2 py-2 text-center text-xs border-e border-button-primary'></td>
                            <td className='px-2 py-2 text-center text-xs border-e border-button-primary'></td>
                            <td className='px-2 py-2 text-center text-xs badge-map' colSpan={14}>Kelas 11</td>
                            <td className='px-2 py-2 text-center text-xs'></td>
                            <td className='px-2 py-2 text-center text-xs'></td>
                            <td className='px-2 py-2 text-center text-xs badge-map' colSpan={14}>Kelas 11</td>
                            <th className='px-2 py-2 text-center text-xs' colSpan={49}></th>
                        </tr>
                        <tr>
                        <th className='px-2 py-2 text-center text-xs' colSpan={48}></th>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <td className={`px-2 py-2 border-button-primary text-center text-xs ${index === 2 && "border-s"}`}></td>
                                    <td className='px-2 py-2 border-e border-button-primary text-center text-xs'></td>
                                    <td className='px-2 py-2 text-xs' colSpan={13}></td>
                                    <td className={`px-2 py-2 text-xs  ${index === 1 && "border-e border-button-primary"}`}></td>
                                </React.Fragment>
                            ))}
                            <th className='px-2 py-2 text-center text-xs' colSpan={48}></th>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs' colSpan={48}></th>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <th className={`px-2 py-2 border-button-primary text-center text-xs ${index === 2 && "border-s border-button-primary"}`}></th>
                                    <th className='px-2 py-2 border-e border-button-primary text-center text-xs'></th>
                                    <th className='px-2 py-2 text-center text-xs'></th>
                                    <th className='px-2 py-2 badge-map text-center text-xs' colSpan={6}>Jabatan</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs' colSpan={2}>Kelas</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>B</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>K</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>(+)</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>(-)</th>
                                    <th className={`px-2 py-2 text-center text-xs ${index === 1 && "border-e border-button-primary"}`}></th>
                                </React.Fragment>
                            ))}
                            <th className='px-2 py-2 text-center text-xs' colSpan={48}></th>
                        </tr>
                        {ln.map((itemLN, index) => {
                            const itemSPL = spl[index] || {};
                            const itemKemetrologian = kemetrologian[index] || {};
                            const itemPBPP = pbpp[index] || {};
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        <th className='px-2 py-2 text-center text-xs' colSpan={48} rowSpan={2}></th>

                                        <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th>
                                        <th className='px-2 py-2 text-center text-xs'></th>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" colSpan={6} rowSpan={2}>{itemLN.name}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" colSpan={2} rowSpan={2}>{itemLN.class}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemLN.b}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemLN.k}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemLN.plus}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemLN.minus}</td>
                                        <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th>

                                        {itemSPL.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2}></th>}
                                        {itemSPL.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th></th>}
                                        {itemSPL.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemSPL.name || '-'}</td> : <td rowSpan={2} colSpan={6}></td>}
                                        {itemSPL.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemSPL.class ?? '-'}</td> : <td rowSpan={2} colSpan={2}></td>}
                                        {itemSPL.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemSPL.b ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemSPL.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemSPL.k ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemSPL.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemSPL.plus ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemSPL.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemSPL.minus ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemSPL.name ? <th className='px-2 py-2 text-center border-e border-button-primary text-xs' rowSpan={2}></th> : <th rowSpan={2}></th>}

                                        {itemKemetrologian.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2}></th>}
                                        {itemKemetrologian.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th></th>}
                                        {itemKemetrologian.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemKemetrologian.name || '-'}</td> : <td rowSpan={2} colSpan={6}></td>}
                                        {itemKemetrologian.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemKemetrologian.class ?? '-'}</td> : <td rowSpan={2} colSpan={2}></td>}
                                        {itemKemetrologian.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemKemetrologian.b ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemKemetrologian.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemKemetrologian.k ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemKemetrologian.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemKemetrologian.plus ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemKemetrologian.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemKemetrologian.minus ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemKemetrologian.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2}></th>}

                                        {itemPBPP.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2}></th>}
                                        {itemPBPP.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th></th>}
                                        {itemPBPP.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemPBPP.name || '-'}</td> : <td rowSpan={2} colSpan={6}></td>}
                                        {itemPBPP.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemPBPP.class ?? '-'}</td> : <td rowSpan={2} colSpan={2}></td>}
                                        {itemPBPP.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemPBPP.b ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemPBPP.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemPBPP.k ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemPBPP.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemPBPP.plus ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemPBPP.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemPBPP.minus ?? '-'}</td> : <td rowSpan={2}></td>}
                                        {itemPBPP.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2}></th>}

                                        <th className='px-2 py-2 text-center text-xs' colSpan={48} rowSpan={2}></th>
                                    </tr>
                                    <tr>
                                        <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th>
                                        {itemSPL.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th>  : <th></th>}
                                        {itemKemetrologian.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th>  : <th></th>}
                                        {itemPBPP.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th>  : <th></th>}
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                        <tr>
                            <td className='px-2 py-2 text-center border-e text-xs border-button-primary' colSpan={80}></td>
                            <td className='px-2 py-2 text-center border-s text-xs border-button-primary' colSpan={80}></td>
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs' colSpan={8}></th>
                            <th className='px-2 py-2 text-center text-xs border-b border-e border-button-primary' colSpan={72}></th>
                            <th className='px-2 py-2 text-center text-xs border-b border-s border-button-primary' colSpan={72}></th>
                            <th className='px-2 py-2 text-center text-xs' colSpan={8}></th>
                        </tr>
                        <tr>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <td className='px-2 py-2 text-center border-e text-xs border-button-primary' colSpan={8}></td>
                                    <td className='px-2 py-2 text-center border-s text-xs border-button-primary' colSpan={8}></td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>UPTD Pengelolaan Pasar Tambun</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>UPTD Pengelolaan Pasar Cibitung dan Sukatani</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>UPTD Pengelolaan Pasar Setu</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>UPTD Pengelolaan Pasar Baru Cikarang dan Pertokoan</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>UPTD Pengelolaan Pasar Lemah Abang Kedung Gede</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>UPTD Pengelolaan Pasar Babelan</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>UPTD Pengelolaan Pasar Tarumajaya</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>UPTD Pengelolaan Pasar Serang</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>UPTD Pengelolaan Pasar Cibarusah</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                            <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>UPTD Metrologi Legal</th>
                            <th className='px-2 py-2 text-center text-xs'></th>
                        </tr>
                        <tr>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <td className='px-2 py-2 text-center text-xs'></td>
                                    <td className='px-2 py-2 text-center text-xs badge-map' colSpan={14}>Kelas 9</td>
                                    <td className='px-2 py-2 text-center text-xs'></td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <td className='px-2 py-2 text-center border-e text-xs border-button-primary' colSpan={8}></td>
                                    <td className='px-2 py-2 text-center border-s text-xs border-button-primary' colSpan={8}></td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <th className='px-2 py-2 text-center text-xs'></th>
                                    <th className='px-2 py-2 text-center border border-button-primary text-xs' colSpan={14}>Kepala Subbagian Tata Usaha</th>
                                    <th className='px-2 py-2 text-center text-xs'></th>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <td className='px-2 py-2 text-center text-xs'></td>
                                    <td className='px-2 py-2 text-center text-xs badge-map' colSpan={14}>Kelas 8</td>
                                    <td className='px-2 py-2 text-center text-xs'></td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <td className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2}></td>
                                    <td className='px-2 py-2 text-xs' colSpan={14}></td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <React.Fragment key={index}>
                                    <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2}></th>
                                    <th className='px-2 py-2 text-center text-xs'></th>
                                    <th className='px-2 py-2 badge-map text-center text-xs' colSpan={6}>Jabatan</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs' colSpan={2}>Kelas</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>B</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>K</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>(+)</th>
                                    <th className='px-2 py-2 badge-map text-center text-xs'>(-)</th>
                                    <th className='px-2 py-2 text-center text-xs'></th>
                                </React.Fragment>
                            ))}
                        </tr>
                        {uptdMetrologiLegal.map((itemMetrologi, index) => {
                            const itemUptd1 = uptd1[index] || {};
                            const itemUptd2 = uptd2[index] || {};
                            const itemUptd3 = uptd3[index] || {};
                            const itemUptd4 = uptd4[index] || {};
                            const itemUptd5 = uptd5[index] || {};
                            const itemUptd6 = uptd6[index] || {};
                            const itemUptd7 = uptd7[index] || {};
                            const itemUptd8 = uptd8[index] || {};
                            const itemUptd9 = uptd9[index] || {};
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        
                                        {itemUptd1.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th className="px-2 py-2 text-center text-xs" colSpan={2} rowSpan={2}></th>}
                                        {itemUptd1.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd1.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemUptd1.name || '-'}</td> : <td rowSpan={2} colSpan={6} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd1.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemUptd1.class ?? '-'}</td> : <td rowSpan={2} colSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd1.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd1.b ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd1.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd1.k ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd1.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd1.plus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd1.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd1.minus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd1.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        
                                        {itemUptd2.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd2.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd2.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemUptd2.name || '-'}</td> : <td rowSpan={2} colSpan={6} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd2.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemUptd2.class ?? '-'}</td> : <td rowSpan={2} colSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd2.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd2.b ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd2.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd2.k ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd2.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd2.plus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd2.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd2.minus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd2.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        
                                        {itemUptd3.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd3.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd3.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemUptd3.name || '-'}</td> : <td rowSpan={2} colSpan={6} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd3.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemUptd3.class ?? '-'}</td> : <td rowSpan={2} colSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd3.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd3.b ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd3.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd3.k ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd3.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd3.plus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd3.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd3.minus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd3.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        
                                        {itemUptd4.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd4.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd4.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemUptd4.name || '-'}</td> : <td rowSpan={2} colSpan={6} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd4.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemUptd4.class ?? '-'}</td> : <td rowSpan={2} colSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd4.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd4.b ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd4.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd4.k ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd4.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd4.plus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd4.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd4.minus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd4.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        
                                        {itemUptd5.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd5.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd5.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemUptd5.name || '-'}</td> : <td rowSpan={2} colSpan={6} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd5.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemUptd5.class ?? '-'}</td> : <td rowSpan={2} colSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd5.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd5.b ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd5.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd5.k ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd5.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd5.plus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd5.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd5.minus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd5.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        
                                        {itemUptd6.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd6.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd6.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemUptd6.name || '-'}</td> : <td rowSpan={2} colSpan={6} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd6.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemUptd6.class ?? '-'}</td> : <td rowSpan={2} colSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd6.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd6.b ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd6.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd6.k ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd6.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd6.plus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd6.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd6.minus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd6.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        
                                        {itemUptd7.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd7.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd7.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemUptd7.name || '-'}</td> : <td rowSpan={2} colSpan={6} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd7.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemUptd7.class ?? '-'}</td> : <td rowSpan={2} colSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd7.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd7.b ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd7.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd7.k ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd7.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd7.plus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd7.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd7.minus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd7.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        
                                        {itemUptd8.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd8.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd8.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemUptd8.name || '-'}</td> : <td rowSpan={2} colSpan={6} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd8.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemUptd8.class ?? '-'}</td> : <td rowSpan={2} colSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd8.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd8.b ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd8.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd8.k ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd8.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd8.plus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd8.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd8.minus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd8.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        
                                        {itemUptd9.name ? <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th> : <th colSpan={2} rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd9.name ? <th className='px-2 py-2 text-center text-xs'></th> : <th className="px-2 py-2 text-center text-xs"></th>}
                                        {itemUptd9.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={6}>{itemUptd9.name || '-'}</td> : <td rowSpan={2} colSpan={6} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd9.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2} colSpan={2}>{itemUptd9.class ?? '-'}</td> : <td rowSpan={2} colSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd9.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd9.b ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd9.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd9.k ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd9.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd9.plus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd9.name ? <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemUptd9.minus ?? '-'}</td> : <td rowSpan={2} className="px-2 py-2 text-center text-xs"></td>}
                                        {itemUptd9.name ? <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th> : <th rowSpan={2} className="px-2 py-2 text-center text-xs"></th>}
                                        
                                        <th className='px-2 py-2 border-e border-button-primary text-center text-xs' colSpan={2} rowSpan={2}></th>
                                        <th className='px-2 py-2 text-center text-xs'></th>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" colSpan={6} rowSpan={2}>{itemMetrologi.name}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" colSpan={2} rowSpan={2}>{itemMetrologi.class}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemMetrologi.b}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemMetrologi.k}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemMetrologi.plus}</td>
                                        <td className="px-2 py-2 border border-button-primary text-center text-xs" rowSpan={2}>{itemMetrologi.minus}</td>
                                        <th className='px-2 py-2 text-center text-xs' rowSpan={2}></th>
                                    </tr>
                                    <tr>
                                        {itemUptd1.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th> : <th ></th> }
                                        {itemUptd2.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th> : <th ></th> }
                                        {itemUptd3.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th> : <th ></th> }
                                        {itemUptd4.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th> : <th ></th> }
                                        {itemUptd5.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th> : <th ></th> }
                                        {itemUptd6.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th> : <th ></th> }
                                        {itemUptd7.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th> : <th ></th> }
                                        {itemUptd8.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th> : <th ></th> }
                                        {itemUptd9.name ? <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th> : <th ></th> }
                                        <th className='px-2 py-2 text-center text-xs border-t border-button-primary'></th>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                        <tr>
                            <th className='px-2 py-2 text-center text-xs' colSpan={160}></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}