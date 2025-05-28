import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import store from "@/redux/store";

interface PegawaiProps {
  id: number;
  userId: string;
  bankAccount: string;
  position: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    nip: string;
    jabatan: {
      nameJob: string;
    } | null;
  };
  budgets: {
    id: number;
    transport: number;
    volTransport: number;
    representatif: number;
    volRepresentatif: number;
    dailyAllowance: number;
    volDailyAllowance: number;
    bankAccount: string;
  }[];
}

interface props {
  pegawai: PegawaiProps[] | null;
  isOpen: boolean;
  onClose: () => void;
}

const PegawaiModal = ({ pegawai, isOpen, onClose }: props) => {

  const { role } = store.getState().auth;

  let totalAnggaran = 0;
  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="5xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Daftar Pegawai</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-center border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                      No
                    </th>
                    <th className="text-left border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                      Nama Pegawai
                    </th>
                    <th className="text-left border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                      NIP
                    </th>
                    {role !== "PEGAWAI" ? (
                      <th className="text-left border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white">
                        Jabatan
                      </th>
                    ) : null}
                    <th
                      colSpan={2}
                      className="text-left border-b-2 min-w-96 border-accent-gray p-2 text-sm bg-primary text-white"
                    >
                      Rincian Anggaran
                    </th>
                    <th className="text-left border-b-2 min-w-20 border-accent-gray p-2 text-sm bg-primary text-white">
                      Vol
                    </th>
                    <th className="text-left border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white">
                      Total Anggaran
                    </th>
                    <th className="text-left border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg">
                      Jumlah Yang Diterima
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pegawai && pegawai.length > 0 ? (
                    pegawai.map((item, index) => {
                      const user = item.user ?? {};

                      const dailyAllowance = {
                        harga: item.budgets[0]
                          ? Number(item.budgets[0].dailyAllowance || 0)
                          : 0,
                        vol: item.budgets[0]
                          ? Number(item.budgets[0].volDailyAllowance || 0)
                          : 0,
                        total: item.budgets[0]
                          ? Number(item.budgets[0].dailyAllowance || 0) *
                            Number(item.budgets[0].volDailyAllowance || 0)
                          : 0,
                      };
                      const transport = {
                        harga: item.budgets[0]
                          ? Number(item.budgets[0].transport || 0)
                          : 0,
                        vol: item.budgets[0]
                          ? Number(item.budgets[0].volTransport || 0)
                          : 0,
                        total: item.budgets[0]
                          ? Number(item.budgets[0].transport || 0) *
                            Number(item.budgets[0].volTransport || 0)
                          : 0,
                      };
                      const representatif = {
                        harga: item.budgets[0]
                          ? Number(item.budgets[0].representatif || 0)
                          : 0,
                        vol: item.budgets[0]
                          ? Number(item.budgets[0].volRepresentatif || 0)
                          : 0,
                        total: item.budgets[0]
                          ? Number(item.budgets[0].representatif || 0) *
                            Number(item.budgets[0].volRepresentatif || 0)
                          : 0,
                      };

                      const totalKeseluruhan =
                        dailyAllowance.total +
                        transport.total +
                        representatif.total;

                      totalAnggaran += totalKeseluruhan;

                      return (
                        <React.Fragment key={index}>
                          <tr>
                            <td
                              rowSpan={3}
                              className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 text-center"
                            >
                              {index + 1}
                            </td>
                            <td
                              rowSpan={3}
                              className="border-b-2 border-accent-gray p-2 text-sm font-semibold"
                            >
                              {user.name ?? "-"}
                            </td>
                            <td
                              rowSpan={3}
                              className="border-b-2 border-accent-gray p-2 text-sm font-semibold"
                            >
                              {user.nip ?? "-"}
                            </td>
                            {role !== "PEGAWAI" ? (
                              <td
                                rowSpan={3}
                                className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold"
                              >
                                {user.jabatan?.nameJob ?? "-"}
                              </td>
                            ) : null }
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              Uang Harian
                            </td>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              Rp {dailyAllowance.harga.toLocaleString("id-ID")}
                            </td>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              {dailyAllowance.vol.toLocaleString("id-ID")}
                            </td>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              Rp {dailyAllowance.total.toLocaleString("id-ID")}
                            </td>
                            <td
                              rowSpan={3}
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold"
                            >
                              Rp {totalKeseluruhan.toLocaleString("id-ID")}
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              Uang Transport
                            </td>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              Rp {transport.harga.toLocaleString("id-ID")}
                            </td>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              {transport.vol.toLocaleString("id-ID")}
                            </td>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              Rp {transport.total.toLocaleString("id-ID")}
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              Representatif
                            </td>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              Rp {representatif.harga.toLocaleString("id-ID")}
                            </td>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              {representatif.vol.toLocaleString("id-ID")}
                            </td>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              Rp {representatif.total.toLocaleString("id-ID")}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={role !== "PEGAWAI" ? 9 : 8} className="text-center p-2 text-sm">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <th
                    colSpan={role !== "PEGAWAI" ? 8 : 7}
                    className="text-left border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-lg"
                  >
                    Total Anggaran
                  </th>
                  <th className="text-left border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-br-lg">
                    Rp{totalAnggaran.toLocaleString("id-ID")}
                  </th>
                </tfoot>
              </table>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PegawaiModal;
