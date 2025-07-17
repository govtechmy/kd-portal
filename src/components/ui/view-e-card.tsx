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
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface StaffCardModalProps {
  staff: StaffDirectory;
}

const StaffCardModal: React.FC<StaffCardModalProps> = ({ staff }) => {
  const website = "https://digital.gov.my";

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50">
          View Card
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 fixed inset-0 z-40 backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl">
          {/* Close Button */}
          <div className="absolute right-3 top-3">
            <Dialog.Close asChild>
              <button className="rounded border-2 border-solid border-gray-100 p-1 text-gray-500">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </Dialog.Close>
            <Dialog.DialogTitle>
              <p className="hidden"> E-CARD</p>
            </Dialog.DialogTitle>
          </div>

          {/* Main Content */}
          <div className="text-center">
            <div className="my-4 flex flex-row justify-center gap-0.5">
              <Image
                src="/icon.png"
                alt="Kementerian Digital"
                width={20}
                height={20}
                className=""
              />
              <span className="text-sm font-semibold">Kementerian Digital</span>
            </div>

            <h2 className="text-black text-lg font-bold uppercase">
              {staff.nama}
            </h2>
            <p className="text-sm font-medium text-gray-600">{staff.jawatan}</p>
            <p className="text-sm text-gray-500">
              {typeof staff.id_bhg !== "string" && staff.id_bhg.bhg}
            </p>

            <hr className="my-4" />

            <div className="mt-6 flex justify-center">
              <div className="flex w-3/4 flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-3xl bg-blue-100 p-1">
                    <PhoneIcon className="h-5 w-5 shrink-0 text-blue-500" />
                  </div>

                  <span className="text-justify">{staff.telefon}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-3xl bg-blue-100 p-1">
                    <EnvelopeIcon className="h-5 w-5 shrink-0 text-blue-500" />
                  </div>

                  <span className="text-justify">{staff.emel}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-3xl bg-blue-100 p-1">
                    <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                  </div>

                  <span className="text-justify">{staff.alamat}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-3xl bg-blue-100 p-1">
                    <GlobeAltIcon className="h-5 w-5 shrink-0 text-blue-500" />
                  </div>

                  <a
                    href={
                      staff.laman?.startsWith("http")
                        ? staff.laman
                        : `https://${staff.laman}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-justify text-blue-600 underline"
                  >
                    {staff.laman}
                  </a>
                </div>
              </div>
            </div>

            {typeof staff.eCard === "object" && staff.eCard?.url && (
              <div className="my-8 flex justify-center">
                <a
                  href={staff.eCard.url}
                  download
                  className="flex w-1/2 justify-center gap-2 rounded-2xl border-2 border-solid border-blue-900 bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <UserIcon className="h-5 w-5 shrink-0" />
                  Save Contact
                </a>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default StaffCardModal;
