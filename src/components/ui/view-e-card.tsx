"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { StaffDirectory } from "@/payload-types";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  GlobeAltIcon,
  XMarkIcon,
  UserIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface StaffCardModalProps {
  staff: StaffDirectory;
}
const alamat =
  "Aras 13, Blok Menara, Menara Usahawan, No. 18, Persiaran Perdana, Presint 2, Pusat Pentadbiran Kerajaan Persekutuan, 62000 Putrajaya, Malaysia";
const StaffCardModal: React.FC<StaffCardModalProps> = ({ staff }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex h-8 w-[6.9375rem] items-center justify-center gap-1.5 whitespace-nowrap rounded border border-gray-300 px-[10px] py-[6px] text-sm font-medium text-black-700 shadow-[0px_1px_3px_0px_#00000012] hover:bg-gray-50">
          <ArrowUpRightIcon className="h-5 w-5" />
          View Card
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="z-60 fixed inset-0 bg-[#00000080] backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
          {/* Close Button (absolute, top right) */}
          <div className="absolute right-4 top-4">
            <Dialog.Close asChild>
              <button className="flex h-8 w-8 max-w-[180px] items-center justify-center rounded border border-[#F4F4F5] bg-white p-[6px] text-gray-400 shadow-[0px_1px_3px_0px_#00000012] hover:bg-gray-100">
                <XMarkIcon className="h-5 w-5 text-black-700" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.DialogTitle>
            <p className="hidden"> E-CARD</p>
          </Dialog.DialogTitle>

          {/* Main Content */}
          <div className="text-center">
            <div className="mb-4 mt-2 flex flex-row items-center justify-center gap-2">
              <Image
                src="/jata-negara.png"
                alt="Kementerian Digital"
                width={24}
                height={24}
              />
              <span className="font-semibold">Kementerian Digital</span>
            </div>

            <h2 className="text-black text-xl font-bold uppercase">
              {staff.nama}
            </h2>
            <p className="mt-2 text-sm font-medium text-gray-600">
              {staff.jawatan}
            </p>
            <p className="text-sm text-gray-500">
              {typeof staff.id_bhg !== "string" && staff.id_bhg.bhg}
            </p>

            <hr className="my-6" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-50 p-2">
                  <PhoneIcon className="h-5 w-5 shrink-0 text-blue-600" />
                </div>

                <span className="text-left">{staff.telefon}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-50 p-2">
                  <EnvelopeIcon className="h-5 w-5 shrink-0 text-blue-600" />
                </div>

                <span className="text-left">
                  {staff.emel ? `${staff.emel}@digital.gov.my` : ""}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-50 p-2">
                  <MapPinIcon className="h-5 w-5 shrink-0 text-blue-600" />
                </div>

                <span className="text-left">{alamat}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-50 p-2">
                  <GlobeAltIcon className="h-5 w-5 shrink-0 text-blue-600" />
                </div>

                <a
                  href={"https://digital.gov.my"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-left text-blue-600"
                >
                  https://digital.gov.my
                </a>
              </div>
            </div>

            {typeof staff.eCard === "object" && staff.eCard?.url && (
              <div className="mt-8 flex justify-center text-sm">
                <a
                  href={staff.eCard.url}
                  download
                  className="inline-flex h-10 w-[9.8125rem] items-center justify-center gap-1.5 rounded-full border border-white/20 bg-gradient-to-b from-[#5288FF] to-[#2563EB] py-2 pl-3 pr-4 font-semibold text-white"
                >
                  <UserIcon className="h-5 w-5 shrink-0" />
                  <span>Save Contact</span>
                </a>
              </div>
            )}

            {/* )} */}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default StaffCardModal;
