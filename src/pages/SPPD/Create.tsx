import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { LuArchiveRestore, LuArrowLeft, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { Link } from "react-router-dom";
import { useGetAllPegawaiOption } from "@/services/pegawai";
import {
  LucidePlusCircle,
  LucideTrash2,
  LucideUploadCloud,
} from "lucide-react";
import { useCreateSPPD } from "@/services/sppd";
import { StoreSPPD } from "@/interface/request/sppd.interface";
import { convertFileToBase64 } from "@/utils/base64Formater";
import store from "@/redux/store";
import { useGetProfile } from "@/services/auth";

interface formProps {
  nomorSurat?: string;
  type?: string;
  kodeRekening?: string;
  activity?: string;
  reasoning?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  file?: string;
  komitmenid?: string;
  komitmenName?: string;
  komitmenJabatan?: string;
  komitmenNip?: string;
  bendaharaId?: string;
  bendaharaName?: string;
  bendaharaJabatan?: string;
  bendaharaNip?: string;
  participantsLeader?: {
    userId?: string;
    userName?: string;
    userJabatan?: string;
    userNIP?: string;
    bankAccount?: string;
    position?: string;
    role?: string;
    budgets?: {
      transport?: number;
      volTransport?: number;
      representatif?: number;
      volRepresentatif?: number;
      dailyAllowance?: number;
      volDailyAllowance?: number;
      bankAccount?: string;
    };
  };
  participants?: {
    userId?: string;
    userName?: string;
    userJabatan?: string;
    userNIP?: string;
    bankAccount?: string;
    position?: string;
    role?: string;
    budgets?: {
      transport?: number;
      volTransport?: number;
      representatif?: number;
      volRepresentatif?: number;
      dailyAllowance?: number;
      volDailyAllowance?: number;
      bankAccount?: string;
    };
  }[];
}

interface errorProps {
  nomorSurat?: string;
  type?: string;
  kodeRekening?: string;
  activity?: string;
  reasoning?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  file?: string;
  komitmenid?: string;
  komitmenName?: string;
  komitmenJabatan?: string;
  komitmenNip?: string;
  bendaharaId?: string;
  bendaharaName?: string;
  bendaharaJabatan?: string;
  bendaharaNip?: string;
  leader?: string;
  participantsLeader?: string;
  participants?: string;
}

export default function CreateSPPD() {
  const { role } = store.getState().auth;

  const queryParams = new URLSearchParams(window.location.search);
  const tab = queryParams.get("type");
  const tabData = tab as string;

  const [formData, setFormData] = useState<formProps>({
    nomorSurat: "",
    type: "",
    kodeRekening: "",
    reasoning: "",
    activity: "",
    location: "",
    startDate: "",
    endDate: "",
    file: "",
    komitmenid: "",
    komitmenName: "",
    komitmenJabatan: "",
    komitmenNip: "",
    bendaharaId: "",
    bendaharaName: "",
    bendaharaJabatan: "",
    bendaharaNip: "",
    participantsLeader: {
      userId: "",
      userName: "",
      userJabatan: "",
      userNIP: "",
      bankAccount: "",
      position: "",
      role: "PEGAWAI",
      budgets: {
        transport: 0,
        volTransport: 0,
        representatif: 0,
        volRepresentatif: 0,
        dailyAllowance: 0,
        volDailyAllowance: 0,
        bankAccount: "",
      },
    },
    participants: [
      {
        userId: "",
        userName: "",
        userJabatan: "",
        userNIP: "",
        bankAccount: "",
        position: "",
        role: "PENGIKUT",
        budgets: {
          transport: 0,
          volTransport: 0,
          representatif: 0,
          volRepresentatif: 0,
          dailyAllowance: 0,
          volDailyAllowance: 0,
          bankAccount: "",
        },
      },
    ],
  });

  const addPengikut = () => {
    const updatedTim = [
      ...(formData.participants || []),
      {
        userId: "",
        userName: "",
        userJabatan: "",
        userNIP: "",
        bankAccount: "",
        position: "",
        role: "PENGIKUT",
        budgets: {
          transport: 0,
          volTransport: 0,
          representatif: 0,
          volRepresentatif: 0,
          dailyAllowance: 0,
          volDailyAllowance: 0,
          bankAccount: "",
        },
      },
    ];
    setFormData({ ...formData, participants: updatedTim });
  };
  const removePengikut = (index: number) => {
    const updatedTim = [...(formData.participants || [])];
    updatedTim.splice(index, 1); // hapus item berdasarkan index
    setFormData({ ...formData, participants: updatedTim });
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, file: fileToShow });
    } else {
      setFormData({ ...formData, file: "" });
    }
  };

  const {
    data: allDataJabatan,
    isFetching: isFetchingJabatan,
    refetch: refetchJabatan,
  } = useGetAllPegawaiOption();

  const PEGAWAI_SELECT = useMemo(() => {
    if (!allDataJabatan) return [];
    return allDataJabatan.data;
  }, [allDataJabatan]);

  const [formError, setFormError] = useState<errorProps>({});

  const { data: dataProfile, refetch: refetchProfile } = useGetProfile();
  const DATA_FETCHING = useMemo(() => {
    if (!dataProfile) return null;
    return dataProfile.data;
  }, [dataProfile]);

  const rules = () => {
    const error: errorProps = {};
    if (!formData.nomorSurat)
      error.nomorSurat = "Nomor surat tidak boleh kosong";
    if (!formData.type) error.type = "Tipe tidak boleh kosong";
    if (!formData.reasoning)
      error.reasoning = "Maksud perjalanan tidak boleh kosong";
    if (!formData.activity) error.activity = "Nama kegiatan tidak boleh kosong";
    if (!formData.location)
      error.location = "Tujuan kegiatan tidak boleh kosong";
    if (!formData.startDate)
      error.startDate = "Tanggal mulai tidak boleh kosong";
    if (!formData.endDate) error.endDate = "Tanggal selesai tidak boleh kosong";
    if (!formData.file) error.file = "File tidak boleh kosong";
    if (!formData.komitmenid)
      error.komitmenid = "Data komitmen tidak boleh kosong";
    if (!formData.bendaharaId)
      error.bendaharaId = "Data bendahara tidak boleh kosong";

    if (role === "PEGAWAI") {
      if (!formData.participantsLeader?.bankAccount)
        error.participantsLeader = "Data pegawai belum lengkap";
    } else {
      if (
        !formData.participantsLeader?.userId ||
        !formData.participantsLeader?.bankAccount
      )
        error.participantsLeader = "Data pegawai belum lengkap";
    }

    return error;
  };

  useEffect(() => {
    setFormData({
      nomorSurat: "",
      type: "",
      kodeRekening: "",
      activity: "",
      reasoning: "",
      location: "",
      startDate: "",
      endDate: "",
      file: "",
      komitmenid: "",
      komitmenName: "",
      komitmenJabatan: "",
      komitmenNip: "",
      bendaharaId: "",
      bendaharaName: "",
      bendaharaJabatan: "",
      bendaharaNip: "",
      participantsLeader: {
        userId: "",
        userName: "",
        userJabatan: "",
        userNIP: "",
        bankAccount: "",
        position: "",
        role: "PEGAWAI",
        budgets: {
          transport: 0,
          volTransport: 0,
          representatif: 0,
          volRepresentatif: 0,
          dailyAllowance: 0,
          volDailyAllowance: 0,
          bankAccount: "",
        },
      },
      participants: [
        {
          userId: "",
          userName: "",
          userJabatan: "",
          userNIP: "",
          bankAccount: "",
          position: "",
          role: "PENGIKUT",
          budgets: {
            transport: 0,
            volTransport: 0,
            representatif: 0,
            volRepresentatif: 0,
            dailyAllowance: 0,
            volDailyAllowance: 0,
            bankAccount: "",
          },
        },
      ],
    });
    refetchJabatan();
    refetchProfile();
  }, []);

  type BudgetsKey = keyof NonNullable<
    NonNullable<typeof formData.participantsLeader>["budgets"]
  >;
  type LeaderField = keyof NonNullable<typeof formData.participantsLeader>;

  // ✅ Function Overloads
  function onChangeLeader(value: string, field: LeaderField): void;
  function onChangeLeader(value: number, field: `budgets.${BudgetsKey}`): void;

  // ✅ Implementation
  function onChangeLeader(
    value: string | number,
    field: LeaderField | `budgets.${BudgetsKey}`,
  ) {
    setFormData((prev) => {
      const updated = { ...prev.participantsLeader };

      if (field === "userId") {
        const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);

        updated.userId = checkPegawai?.id || "";
        updated.userName = checkPegawai?.name || "";
        updated.userJabatan = checkPegawai?.jabatan?.nameJob || "";
        updated.userNIP = checkPegawai?.nip || "";
        updated.position = checkPegawai?.jabatan?.nameJob || "";
      } else if (field.startsWith("budgets.")) {
        const budgetKey = field.split(".")[1] as BudgetsKey;

        updated.budgets = {
          ...updated.budgets,
          [budgetKey]: value as number, // karena ini pasti number
        };
      } else {
        updated[field as LeaderField] = value as string; // field biasa pasti string
      }

      return {
        ...prev,
        participantsLeader: updated,
      };
    });
  }

  type ParticipantField = keyof NonNullable<typeof formData.participantsLeader>;

  // ✅ Function Overloads
  function onChangeParticipant(
    index: number,
    value: string,
    field: ParticipantField,
  ): void;
  function onChangeParticipant(
    index: number,
    value: number,
    field: `budgets.${BudgetsKey}`,
  ): void;

  // ✅ Implementation
  function onChangeParticipant(
    index: number,
    value: string | number,
    field: ParticipantField | `budgets.${BudgetsKey}`,
  ) {
    setFormData((prev) => {
      const participants = [...(prev.participants || [])];
      const updated = { ...participants[index] };

      if (field === "userId") {
        const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);

        updated.userId = checkPegawai?.id || "";
        updated.userName = checkPegawai?.name || "";
        updated.userJabatan = checkPegawai?.jabatan?.nameJob || "";
        updated.userNIP = checkPegawai?.nip || "";
        updated.position = checkPegawai?.jabatan?.nameJob || "";
      } else if (field.startsWith("budgets.")) {
        const budgetKey = field.split(".")[1] as BudgetsKey;

        updated.budgets = {
          ...updated.budgets,
          [budgetKey]: value as number, // ⛳️ Pastikan hanya number di sini
        };
      } else {
        updated[field as ParticipantField] = value as string; // ⛳️ Hanya string di field biasa
      }

      participants[index] = updated;

      return {
        ...prev,
        participants,
      };
    });
  }

  const onChangePegawai = (value: string, type: string) => {
    if (type === "komitmen") {
      const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
      setFormData({
        ...formData,
        komitmenid: value as string,
        komitmenJabatan: checkPegawai?.jabatan
          ? checkPegawai?.jabatan.nameJob
          : "",
        komitmenName: checkPegawai?.name,
        komitmenNip: checkPegawai?.nip,
      });
    } else if (type === "bendahara") {
      const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
      setFormData({
        ...formData,
        bendaharaId: value as string,
        bendaharaJabatan: checkPegawai?.jabatan
          ? checkPegawai?.jabatan.nameJob
          : "",
        bendaharaName: checkPegawai?.name,
        bendaharaNip: checkPegawai?.nip,
      });
    }
  };

  const navigate = useNavigate();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const [isLoadingConfirm, setLoadingConfirm] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpenConfirm();
  };

  const { mutate: mutatePost } = useCreateSPPD();
  const handleConfirm = () => {
    setLoadingConfirm(true);

    const errorRules = rules();
    setFormError(errorRules);

    if (Object.keys(errorRules).length > 0) {
      setLoadingConfirm(false);
      onCloseConfirm();
      ErrorToast({ text: "Validasi gagal, cek kembali form anda" });
      return true;
    }

    const formToSendData: StoreSPPD = {};

    const participantData: {
      userId?: string;
      bankAccount?: string;
      position?: string;
      role?: string;
      budgets?: {
        transport?: number;
        volTransport?: number;
        representatif?: number;
        volRepresentatif?: number;
        dailyAllowance?: number;
        volDailyAllowance?: number;
        bankAccount?: string;
      }[];
    }[] = [];

    if (role === "PEGAWAI") {
      if (formData.participantsLeader && DATA_FETCHING) {
        const partiLead = formData.participantsLeader;
        participantData.push({
          userId: DATA_FETCHING.id,
          bankAccount: partiLead.bankAccount,
          position: partiLead.position,
          role: partiLead.role,
          budgets: [
            {
              transport: partiLead.budgets ? partiLead.budgets.transport : 0,
              volTransport: partiLead.budgets
                ? partiLead.budgets.volTransport
                : 0,
              representatif: partiLead.budgets
                ? partiLead.budgets.representatif
                : 0,
              volRepresentatif: partiLead.budgets
                ? partiLead.budgets.volRepresentatif
                : 0,
              dailyAllowance: partiLead.budgets
                ? partiLead.budgets.dailyAllowance
                : 0,
              volDailyAllowance: partiLead.budgets
                ? partiLead.budgets.volDailyAllowance
                : 0,
              bankAccount: partiLead.bankAccount,
            },
          ],
        });
      }
    } else {
      if (formData.participantsLeader) {
        const partiLead = formData.participantsLeader;
        participantData.push({
          userId: partiLead.userId,
          bankAccount: partiLead.bankAccount,
          position: partiLead.position,
          role: partiLead.role,
          budgets: [
            {
              transport: partiLead.budgets ? partiLead.budgets.transport : 0,
              volTransport: partiLead.budgets
                ? partiLead.budgets.volTransport
                : 0,
              representatif: partiLead.budgets
                ? partiLead.budgets.representatif
                : 0,
              volRepresentatif: partiLead.budgets
                ? partiLead.budgets.volRepresentatif
                : 0,
              dailyAllowance: partiLead.budgets
                ? partiLead.budgets.dailyAllowance
                : 0,
              volDailyAllowance: partiLead.budgets
                ? partiLead.budgets.volDailyAllowance
                : 0,
              bankAccount: partiLead.bankAccount,
            },
          ],
        });
      }
    }

    if (formData.participants) {
      formData.participants.forEach((item) => {
        if (item.userId && item.bankAccount && item.position && item.role) {
          participantData.push({
            userId: item.userId,
            bankAccount: item.bankAccount,
            position: item.position,
            role: item.role,
            budgets: [
              {
                transport: item.budgets ? item.budgets.transport : 0,
                volTransport: item.budgets ? item.budgets.volTransport : 0,
                representatif: item.budgets ? item.budgets.representatif : 0,
                volRepresentatif: item.budgets
                  ? item.budgets.volRepresentatif
                  : 0,
                dailyAllowance: item.budgets ? item.budgets.dailyAllowance : 0,
                volDailyAllowance: item.budgets
                  ? item.budgets.volDailyAllowance
                  : 0,
                bankAccount: item.bankAccount,
              },
            ],
          });
        }
      });
    }

    if (formData.nomorSurat) formToSendData.nomorSurat = formData.nomorSurat;
    if (formData.type) formToSendData.type = formData.type;
    if (formData.type === "PERJALANAN_BIASA") {
      formToSendData.kodeRekening = "5.1.02.04.01.0001";
    } else {
      formToSendData.kodeRekening = "5.1.02.04.01.0003";
    }
    if (formData.activity) formToSendData.activity = formData.activity;
    if (formData.reasoning) formToSendData.reasoning = formData.reasoning;
    if (formData.location) formToSendData.location = formData.location;
    if (formData.startDate) formToSendData.startDate = formData.startDate;
    if (formData.endDate) formToSendData.endDate = formData.endDate;
    if (formData.file) formToSendData.file = formData.file;
    if (formData.komitmenid) formToSendData.komitmenid = formData.komitmenid;
    if (formData.komitmenName)
      formToSendData.komitmenName = formData.komitmenName;
    if (formData.komitmenJabatan)
      formToSendData.komitmenJabatan = formData.komitmenJabatan;
    if (formData.komitmenNip) formToSendData.komitmenNip = formData.komitmenNip;
    if (formData.bendaharaId) formToSendData.bendaharaId = formData.bendaharaId;
    if (formData.bendaharaName)
      formToSendData.bendaharaName = formData.bendaharaName;
    if (formData.bendaharaJabatan)
      formToSendData.bendaharaJabatan = formData.bendaharaJabatan;
    if (formData.bendaharaNip)
      formToSendData.bendaharaNip = formData.bendaharaNip;

    formToSendData.participants = participantData;

    try {
      mutatePost(formToSendData, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil disimpan" });
          setLoadingConfirm(false);
          onCloseConfirm();
          navigate(
            `/sppd?tabs=${tabData === "PERJALANAN_DALAM_KOTA" ? "dalamkota" : "biasa"}`,
          );
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          setLoadingConfirm(false);
          onCloseConfirm();
          ErrorToast({
            text:
              (error.response?.data.message as string) ||
              "Terjadi kesalahan saat menambah data",
          });
          throw error;
        },
      });
    } catch (error) {
      setLoadingConfirm(false);
      onCloseConfirm();
      throw error;
    }
  };

  useEffect(() => {
    if (tabData) {
      setFormData({
        ...formData,
        type: tabData,
      });
    }
  }, [tabData]);

  return (
    <>
      <BreadcrumbAdmin location="/SPPD/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/sppd?tabs=${tabData === "PERJALANAN_DALAM_KOTA" ? "dalamkota" : "biasa"}`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Data SPPD"
          text="Digunakan Untuk Menambah Perjalanan Dinas yang Terbaru"
        />

        <div className="bg-white shadow-md rounded-xl border p-4">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Nomor Surat <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.nomorSurat}
                  onChange={(e) =>
                    setFormData({ ...formData, nomorSurat: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.nomorSurat}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Tipe Perjalanan Dinas <span className="text-danger">*</span>
                  </label>
                </div>
                <Select
                  selectedKeys={[formData.type || ""]}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    trigger: "border-[0.8px]",
                    value: "text-xs",
                  }}
                >
                  <SelectItem key={"PERJALANAN_BIASA"}>
                    Perjalanan Biasa
                  </SelectItem>
                  <SelectItem key={"PERJALANAN_DALAM_KOTA"}>
                    Perjalanan Dalam Kota
                  </SelectItem>
                </Select>
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.type}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Nama Kegiatan <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.activity}
                  onChange={(e) =>
                    setFormData({ ...formData, activity: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.nomorSurat}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Maksud Perjalanan <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.reasoning}
                  onChange={(e) =>
                    setFormData({ ...formData, reasoning: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.reasoning}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Tujuan <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.location}
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                <div>
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Tanggal Mulai <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="Masukkan disini"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-[0.8px]",
                      input: "text-xs",
                    }}
                  />
                  <div className="text-danger text-[0.7rem] mt-1">
                    {formError.startDate}
                  </div>
                </div>
                <div>
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Tanggal Selesai <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="Masukkan disini"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-[0.8px]",
                      input: "text-xs",
                    }}
                  />
                  <div className="text-danger text-[0.7rem] mt-1">
                    {formError.endDate}
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 my-2">
                <div>
                  <h1 className="font-semibold">Data Pegawai</h1>
                </div>
                <div className="mb-2">
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Nama Pegawai <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Autocomplete
                    defaultItems={PEGAWAI_SELECT}
                    isLoading={isFetchingJabatan}
                    isDisabled={role === "PEGAWAI"}
                    aria-label="pegawai"
                    placeholder="Cari pegawai"
                    variant="bordered"
                    radius="sm"
                    selectedKey={
                      role === "PEGAWAI"
                        ? DATA_FETCHING?.id
                        : String(formData.participantsLeader?.userId)
                    }
                    onSelectionChange={(value) =>
                      onChangeLeader(value as string, "userId")
                    }
                    inputProps={{
                      classNames: {
                        input: "text-xs",
                        inputWrapper: "border-[0.8px]",
                      },
                    }}
                  >
                    {(peg) => (
                      <AutocompleteItem key={peg.id} textValue={peg.name}>
                        {peg.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
                {formData.participantsLeader?.budgets && (
                  <div className="flex flex-col gap-3">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                      <div className="md:col-span-2 col-span-1">
                        <h1 className="font-medium text-sm">1. Uang Harian</h1>
                      </div>
                      <div>
                        <div className="mb-1">
                          <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                          >
                            Jumlah Anggaran
                          </label>
                        </div>
                        <Input
                          value={String(
                            formData.participantsLeader.budgets
                              .dailyAllowance || "",
                          )}
                          onChange={(e) =>
                            onChangeLeader(
                              Number(e.target.value),
                              "budgets.dailyAllowance",
                            )
                          }
                          aria-label="Judul"
                          startContent={"Rp"}
                          labelPlacement="outside"
                          placeholder="Masukkan disini"
                          variant="bordered"
                          radius="sm"
                          classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Vol
                            </label>
                          </div>
                          <Input
                            value={String(
                              formData.participantsLeader.budgets
                                .volDailyAllowance || "",
                            )}
                            onChange={(e) =>
                              onChangeLeader(
                                Number(e.target.value),
                                "budgets.volDailyAllowance",
                              )
                            }
                            aria-label="Judul"
                            labelPlacement="outside"
                            placeholder="Masukkan disini"
                            variant="bordered"
                            radius="sm"
                            classNames={{
                              inputWrapper: "border-[0.8px]",
                              input: "text-xs",
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Total
                            </label>
                          </div>
                          <Input
                            isDisabled
                            value={(
                              (formData.participantsLeader.budgets
                                .dailyAllowance || 0) *
                              (formData.participantsLeader.budgets
                                .volDailyAllowance || 0)
                            ).toLocaleString("id-ID")}
                            aria-label="Judul"
                            startContent={"Rp"}
                            labelPlacement="outside"
                            placeholder="AUTO_FILLED"
                            variant="bordered"
                            radius="sm"
                            classNames={{
                              inputWrapper: "border-[0.8px]",
                              input: "text-xs",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                      <div className="md:col-span-2 col-span-1">
                        <h1 className="font-medium text-sm">
                          2. Uang Transport
                        </h1>
                      </div>
                      <div>
                        <div className="mb-1">
                          <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                          >
                            Jumlah Anggaran
                          </label>
                        </div>
                        <Input
                          value={String(
                            formData.participantsLeader.budgets.transport || "",
                          )}
                          onChange={(e) =>
                            onChangeLeader(
                              Number(e.target.value),
                              "budgets.transport",
                            )
                          }
                          aria-label="Judul"
                          startContent={"Rp"}
                          labelPlacement="outside"
                          placeholder="Masukkan disini"
                          variant="bordered"
                          radius="sm"
                          classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Vol
                            </label>
                          </div>
                          <Input
                            value={String(
                              formData.participantsLeader.budgets
                                .volTransport || "",
                            )}
                            onChange={(e) =>
                              onChangeLeader(
                                Number(e.target.value),
                                "budgets.volTransport",
                              )
                            }
                            aria-label="Judul"
                            labelPlacement="outside"
                            placeholder="Masukkan disini"
                            variant="bordered"
                            radius="sm"
                            classNames={{
                              inputWrapper: "border-[0.8px]",
                              input: "text-xs",
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Total
                            </label>
                          </div>
                          <Input
                            isDisabled
                            value={(
                              (formData.participantsLeader.budgets.transport ||
                                0) *
                              (formData.participantsLeader.budgets
                                .volTransport || 0)
                            ).toLocaleString("id-ID")}
                            aria-label="Judul"
                            startContent={"Rp"}
                            labelPlacement="outside"
                            placeholder="AUTO_FILLED"
                            variant="bordered"
                            radius="sm"
                            classNames={{
                              inputWrapper: "border-[0.8px]",
                              input: "text-xs",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                      <div className="md:col-span-2 col-span-1">
                        <h1 className="font-medium text-sm">
                          3. Uang Representatif
                        </h1>
                      </div>
                      <div>
                        <div className="mb-1">
                          <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                          >
                            Jumlah Anggaran
                          </label>
                        </div>
                        <Input
                          value={String(
                            formData.participantsLeader.budgets.representatif ||
                              "",
                          )}
                          onChange={(e) =>
                            onChangeLeader(
                              Number(e.target.value),
                              "budgets.representatif",
                            )
                          }
                          aria-label="Judul"
                          startContent={"Rp"}
                          labelPlacement="outside"
                          placeholder="Masukkan disini"
                          variant="bordered"
                          radius="sm"
                          classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Vol
                            </label>
                          </div>
                          <Input
                            value={String(
                              formData.participantsLeader.budgets
                                .volRepresentatif || "",
                            )}
                            onChange={(e) =>
                              onChangeLeader(
                                Number(e.target.value),
                                "budgets.volRepresentatif",
                              )
                            }
                            aria-label="Judul"
                            labelPlacement="outside"
                            placeholder="Masukkan disini"
                            variant="bordered"
                            radius="sm"
                            classNames={{
                              inputWrapper: "border-[0.8px]",
                              input: "text-xs",
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Total
                            </label>
                          </div>
                          <Input
                            isDisabled
                            value={(
                              (formData.participantsLeader.budgets
                                .representatif || 0) *
                              (formData.participantsLeader.budgets
                                .volRepresentatif || 0)
                            ).toLocaleString("id-ID")}
                            aria-label="Judul"
                            startContent={"Rp"}
                            labelPlacement="outside"
                            placeholder="AUTO_FILLED"
                            variant="bordered"
                            radius="sm"
                            classNames={{
                              inputWrapper: "border-[0.8px]",
                              input: "text-xs",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-2">
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Nomor Rekening BJB <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Input
                    value={formData.participantsLeader?.bankAccount || ""}
                    onChange={(e) =>
                      onChangeLeader(e.target.value, "bankAccount")
                    }
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="Masukkan disini"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-[0.8px]",
                      input: "text-xs",
                    }}
                  />
                </div>
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.participantsLeader}
                </div>
              </div>
              {formData.participants &&
                formData.participants.length > 0 &&
                formData.participants.map((item, index) => (
                  <div className="md:col-span-2 my-2" key={index}>
                    <div className="flex gap-2 items-center">
                      <div className="px-3 py-2 rounded-md text-xs bg-alert-success text-success">
                        {index + 1}
                      </div>
                      <h1 className="font-semibold">Data Pengikut</h1>
                    </div>
                    <div className="mb-2">
                      <div className="mb-1">
                        <label
                          htmlFor="content"
                          className="font-semibold text-xs"
                        >
                          Nama Pegawai <span className="text-danger">*</span>
                        </label>
                      </div>
                      <Autocomplete
                        defaultItems={PEGAWAI_SELECT}
                        isLoading={isFetchingJabatan}
                        aria-label="pegawai"
                        placeholder="Cari pegawai"
                        variant="bordered"
                        radius="sm"
                        selectedKey={String(item.userId)}
                        onSelectionChange={(value) =>
                          onChangeParticipant(index, value as string, "userId")
                        }
                        inputProps={{
                          classNames: {
                            input: "text-xs",
                            inputWrapper: "border-[0.8px]",
                          },
                        }}
                      >
                        {(peg) => (
                          <AutocompleteItem key={peg.id} textValue={peg.name}>
                            {peg.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </div>
                    {item.budgets && (
                      <div className="flex flex-col gap-3">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                          <div className="md:col-span-2 col-span-1">
                            <h1 className="font-medium text-sm">
                              1. Uang Harian
                            </h1>
                          </div>
                          <div>
                            <div className="mb-1">
                              <label
                                htmlFor="content"
                                className="font-semibold text-xs"
                              >
                                Jumlah Anggaran
                              </label>
                            </div>
                            <Input
                              value={String(item.budgets.dailyAllowance || "")}
                              onChange={(e) =>
                                onChangeParticipant(
                                  index,
                                  Number(e.target.value),
                                  "budgets.dailyAllowance",
                                )
                              }
                              aria-label="Judul"
                              startContent={"Rp"}
                              labelPlacement="outside"
                              placeholder="Masukkan disini"
                              variant="bordered"
                              radius="sm"
                              classNames={{
                                inputWrapper: "border-[0.8px]",
                                input: "text-xs",
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <div className="mb-1">
                                <label
                                  htmlFor="content"
                                  className="font-semibold text-xs"
                                >
                                  Vol
                                </label>
                              </div>
                              <Input
                                value={String(
                                  item.budgets.volDailyAllowance || "",
                                )}
                                onChange={(e) =>
                                  onChangeParticipant(
                                    index,
                                    Number(e.target.value),
                                    "budgets.volDailyAllowance",
                                  )
                                }
                                aria-label="Judul"
                                labelPlacement="outside"
                                placeholder="Masukkan disini"
                                variant="bordered"
                                radius="sm"
                                classNames={{
                                  inputWrapper: "border-[0.8px]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                            <div className="col-span-2">
                              <div className="mb-1">
                                <label
                                  htmlFor="content"
                                  className="font-semibold text-xs"
                                >
                                  Total
                                </label>
                              </div>
                              <Input
                                isDisabled
                                value={(
                                  (item.budgets.dailyAllowance || 0) *
                                  (item.budgets.volDailyAllowance || 0)
                                ).toLocaleString("id-ID")}
                                aria-label="Judul"
                                startContent={"Rp"}
                                labelPlacement="outside"
                                placeholder="AUTO_FILLED"
                                variant="bordered"
                                radius="sm"
                                classNames={{
                                  inputWrapper: "border-[0.8px]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                          <div className="md:col-span-2 col-span-1">
                            <h1 className="font-medium text-sm">
                              2. Uang Transport
                            </h1>
                          </div>
                          <div>
                            <div className="mb-1">
                              <label
                                htmlFor="content"
                                className="font-semibold text-xs"
                              >
                                Jumlah Anggaran
                              </label>
                            </div>
                            <Input
                              value={String(item.budgets.transport || "")}
                              onChange={(e) =>
                                onChangeParticipant(
                                  index,
                                  Number(e.target.value),
                                  "budgets.transport",
                                )
                              }
                              aria-label="Judul"
                              startContent={"Rp"}
                              labelPlacement="outside"
                              placeholder="Masukkan disini"
                              variant="bordered"
                              radius="sm"
                              classNames={{
                                inputWrapper: "border-[0.8px]",
                                input: "text-xs",
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <div className="mb-1">
                                <label
                                  htmlFor="content"
                                  className="font-semibold text-xs"
                                >
                                  Vol
                                </label>
                              </div>
                              <Input
                                value={String(item.budgets.volTransport || "")}
                                onChange={(e) =>
                                  onChangeParticipant(
                                    index,
                                    Number(e.target.value),
                                    "budgets.volTransport",
                                  )
                                }
                                aria-label="Judul"
                                labelPlacement="outside"
                                placeholder="Masukkan disini"
                                variant="bordered"
                                radius="sm"
                                classNames={{
                                  inputWrapper: "border-[0.8px]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                            <div className="col-span-2">
                              <div className="mb-1">
                                <label
                                  htmlFor="content"
                                  className="font-semibold text-xs"
                                >
                                  Total
                                </label>
                              </div>
                              <Input
                                isDisabled
                                value={(
                                  (item.budgets.transport || 0) *
                                  (item.budgets.volTransport || 0)
                                ).toLocaleString("id-ID")}
                                aria-label="Judul"
                                startContent={"Rp"}
                                labelPlacement="outside"
                                placeholder="AUTO_FILLED"
                                variant="bordered"
                                radius="sm"
                                classNames={{
                                  inputWrapper: "border-[0.8px]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                          <div className="md:col-span-2 col-span-1">
                            <h1 className="font-medium text-sm">
                              3. Uang Representatif
                            </h1>
                          </div>
                          <div>
                            <div className="mb-1">
                              <label
                                htmlFor="content"
                                className="font-semibold text-xs"
                              >
                                Jumlah Anggaran
                              </label>
                            </div>
                            <Input
                              value={String(item.budgets.representatif || "")}
                              onChange={(e) =>
                                onChangeParticipant(
                                  index,
                                  Number(e.target.value),
                                  "budgets.representatif",
                                )
                              }
                              aria-label="Judul"
                              startContent={"Rp"}
                              labelPlacement="outside"
                              placeholder="Masukkan disini"
                              variant="bordered"
                              radius="sm"
                              classNames={{
                                inputWrapper: "border-[0.8px]",
                                input: "text-xs",
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <div className="mb-1">
                                <label
                                  htmlFor="content"
                                  className="font-semibold text-xs"
                                >
                                  Vol
                                </label>
                              </div>
                              <Input
                                value={String(
                                  item.budgets.volRepresentatif || "",
                                )}
                                onChange={(e) =>
                                  onChangeParticipant(
                                    index,
                                    Number(e.target.value),
                                    "budgets.volRepresentatif",
                                  )
                                }
                                aria-label="Judul"
                                labelPlacement="outside"
                                placeholder="Masukkan disini"
                                variant="bordered"
                                radius="sm"
                                classNames={{
                                  inputWrapper: "border-[0.8px]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                            <div className="col-span-2">
                              <div className="mb-1">
                                <label
                                  htmlFor="content"
                                  className="font-semibold text-xs"
                                >
                                  Total
                                </label>
                              </div>
                              <Input
                                isDisabled
                                value={(
                                  (item.budgets.representatif || 0) *
                                  (item.budgets.volRepresentatif || 0)
                                ).toLocaleString("id-ID")}
                                aria-label="Judul"
                                startContent={"Rp"}
                                labelPlacement="outside"
                                placeholder="AUTO_FILLED"
                                variant="bordered"
                                radius="sm"
                                classNames={{
                                  inputWrapper: "border-[0.8px]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-2">
                      <div className="mb-1">
                        <label
                          htmlFor="content"
                          className="font-semibold text-xs"
                        >
                          Nomor Rekening BJB{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={item.bankAccount || ""}
                          onChange={(e) =>
                            onChangeParticipant(
                              index,
                              e.target.value,
                              "bankAccount",
                            )
                          }
                          aria-label="Judul"
                          labelPlacement="outside"
                          placeholder="Masukkan disini"
                          variant="bordered"
                          radius="sm"
                          classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                          }}
                        />
                        <Button
                          onPress={() => removePengikut(index)}
                          isIconOnly
                          variant="bordered"
                          color="danger"
                          radius="sm"
                        >
                          <LucideTrash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="md:col-span-2 col-span-1">
                <Button
                  onPress={addPengikut}
                  size="sm"
                  radius="full"
                  className="bg-button-primary text-white font-semibold flex items-center justify-start"
                >
                  <LucidePlusCircle size={16} /> Tambah Pengikut
                </Button>
              </div>
              <div className="md:col-span-2 col-span-1 grid md:grid-cols-3 grid-cols-1 gap-2">
                <div>
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Pejabat Pembuat Komitmen{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Autocomplete
                    defaultItems={PEGAWAI_SELECT}
                    isLoading={isFetchingJabatan}
                    aria-label="pegawai"
                    placeholder="Cari pegawai"
                    variant="bordered"
                    radius="sm"
                    selectedKey={String(formData.komitmenid)}
                    onSelectionChange={(value) =>
                      onChangePegawai(value as string, "komitmen")
                    }
                    inputProps={{
                      classNames: {
                        input: "text-xs",
                        inputWrapper: "border-[0.8px]",
                      },
                    }}
                  >
                    {(peg) => (
                      <AutocompleteItem key={peg.id} textValue={peg.name}>
                        {peg.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  <div className="text-danger text-[0.7rem] mt-1">
                    {formError.komitmenid}
                  </div>
                </div>
                <div>
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      NIP
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={formData.komitmenNip || ""}
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="AUTO_FILLED"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        inputWrapper: "border-[0.8px]",
                        input: "text-xs",
                      }}
                      isDisabled
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Jabatan
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      isDisabled
                      value={formData.komitmenJabatan || ""}
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="AUTO_FILLED"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        inputWrapper: "border-[0.8px]",
                        input: "text-xs",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 col-span-1 grid md:grid-cols-3 grid-cols-1 gap-2">
                <div>
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Bendahara Pengeluaran{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Autocomplete
                    defaultItems={PEGAWAI_SELECT}
                    isLoading={isFetchingJabatan}
                    aria-label="pegawai"
                    placeholder="Cari pegawai"
                    variant="bordered"
                    radius="sm"
                    selectedKey={String(formData.bendaharaId)}
                    onSelectionChange={(value) =>
                      onChangePegawai(value as string, "bendahara")
                    }
                    inputProps={{
                      classNames: {
                        input: "text-xs",
                        inputWrapper: "border-[0.8px]",
                      },
                    }}
                  >
                    {(peg) => (
                      <AutocompleteItem key={peg.id} textValue={peg.name}>
                        {peg.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  <div className="text-danger text-[0.7rem] mt-1">
                    {formError.bendaharaId}
                  </div>
                </div>
                <div>
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      NIP
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={formData.bendaharaNip || ""}
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="AUTO_FILLED"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        inputWrapper: "border-[0.8px]",
                        input: "text-xs",
                      }}
                      isDisabled
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Jabatan
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      isDisabled
                      value={formData.bendaharaJabatan || ""}
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="AUTO_FILLED"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        inputWrapper: "border-[0.8px]",
                        input: "text-xs",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 col-span-1">
                <div className="max-w-80">
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      File <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="border p-8 mb-2 flex items-center justify-center">
                    {formData.file ? (
                      <LuArchiveRestore size={32} />
                    ) : (
                      <LucideUploadCloud size={32} />
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={handleChangeFile}
                    accept=".png,.jpg,.jpeg,.pdf"
                  />
                  <div className="text-danger text-[0.7rem] mt-1">
                    {formError.file}
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-auto">
              <Button
                isLoading={isLoadingConfirm}
                className="bg-button-primary text-white"
                size="sm"
                radius="sm"
                type="submit"
              >
                <LuSave /> Simpan Data
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
