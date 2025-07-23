"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { StaffDirectory } from "@/payload-types";
import { SiteInfo } from "@/payload-types";
import { _social_media } from "@/lib/constants/links";
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
import { generateVCF } from "@/lib/vcf_generator/generateVCF";
import { downloadVCF } from "@/lib/vcf_generator/downloadVCF";
import { useTranslations } from "next-intl";

interface StaffCardModalProps {
  staff: StaffDirectory;
  siteInfo: SiteInfo;
}

const StaffCardModal: React.FC<StaffCardModalProps> = ({ staff, siteInfo }) => {
  const t = useTranslations("Agency");

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex h-8 w-[6.9375rem] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-300 px-[10px] py-1 text-sm font-medium text-black-700 shadow-[0px_1px_3px_0px_#00000012] hover:bg-gray-50">
          <ArrowUpRightIcon className="h-5 w-5" />
          View Card
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#00000080] backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-[70] max-h-[80vh] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow-xl md:max-h-[75vh]">
          {/* Close Button (absolute, top right) */}
          <div className="absolute right-4 top-4">
            <Dialog.Close asChild>
              <button className="flex h-8 w-8 max-w-[180px] items-center justify-center rounded border border-[#F4F4F5] bg-white p-[6px] text-gray-400 shadow-[0px_1px_3px_0px_#00000012] hover:bg-gray-100">
                <XMarkIcon className="h-5 w-5 text-black-700" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.DialogTitle className="hidden">E-CARD</Dialog.DialogTitle>

          {/* Main Content */}
          <div className="text-center">
            <div className="mb-4 mt-1 flex flex-row items-center justify-center gap-2">
              <Image
                src="/jata-negara.png"
                alt={t("name")}
                width={24}
                height={24}
              />
              <span className="font-semibold">{t("name")}</span>
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
                  {staff.emel ? `${staff.emel}@digital.gov.my` : "N/A"}
                </span>
              </div>
              <div className="flex gap-4">
                <div>
                  <div className="rounded-full bg-blue-50 p-2">
                    <MapPinIcon className="h-5 w-5 shrink-0 text-blue-600" />
                  </div>
                </div>

                <span className="whitespace-pre-line text-left">
                  {staff.alamat ||
                    `Aras 13, 14 & 15, Blok Menara,
                    Menara Usahawan
                    No. 18, Persiaran Perdana, Presint 2
                    Pusat Pentadbiran Kerajaan Persekutuan
                    62000 Putrajaya, Malaysia`}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-50 p-2">
                  <GlobeAltIcon className="h-5 w-5 shrink-0 text-blue-600" />
                </div>

                <a
                  href={staff.laman || "https://digital.gov.my"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-left text-blue-600"
                >
                  {staff.laman || "https://digital.gov.my"}
                </a>
              </div>
            </div>

            <div className="mt-8 flex justify-center text-sm">
              <button
                onClick={() => {
                  const alamat =
                    staff.alamat?.replace(/\n/g, "\\n") ||
                    `Aras 13, 14 & 15, Blok Menara\\nMenara Usahawan\\nNo. 18, Persiaran Perdana, Presint 2\\nPusat Pentadbiran Kerajaan Persekutuan\\n62000 Putrajaya, Malaysia`;

                  const vcfString = generateVCF(staff, alamat);
                  const filename = (staff.nama || "contact").replace(
                    /\s+/g,
                    "_",
                  );

                  downloadVCF(vcfString, filename);
                }}
                className="inline-flex h-10 w-[9.8125rem] items-center justify-center gap-1.5 rounded-full border border-white/20 bg-gradient-to-b from-[#5288FF] to-[#2563EB] py-2 pl-3 pr-4 font-semibold text-white"
              >
                <UserIcon className="h-5 w-5 shrink-0" />
                <span>Save Contact</span>
              </button>
            </div>

            <div className="mt-8 border-t border-gray-200 px-4 pt-4 text-sm text-dim-500">
              <div className="flex flex-row justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/jata-negara.png"
                    width={20}
                    height={20}
                    alt="Jata Negara"
                    className="select-none"
                  />
                  <span className="font-semibold text-black-900">
                    {siteInfo.site_name}
                  </span>
                </div>

                <div className="flex gap-4 pt-2">
                  {siteInfo.social_media.map(({ social, link, id }) =>
                    link.url ? (
                      <a
                        key={id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {_social_media[social].icon}
                      </a>
                    ) : null,
                  )}
                </div>
              </div>
            </div>

            {/* )} */}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default StaffCardModal;
