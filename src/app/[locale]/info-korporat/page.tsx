import { buttonVariants } from "@/components/ui/button";
import UserGroup from "@/icons/user-group";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const t = useTranslations();

  return (
    <>
      <section className="flex flex-col gap-16 px-4.5 py-[84px] lg:px-6">
        <div className="mx-auto flex flex-col gap-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            {t("Info.background")}
          </p>
          <div className="flex flex-col items-center gap-4.5 font-poppins text-hxs font-semibold sm:flex-row sm:text-hsm">
            <Image
              src="/jata-negara.png"
              width={65}
              height={50}
              alt="Jata Negara"
            />
            {t("Agency.name")}
          </div>
        </div>
        <div className="gap-[42px] lg:grid lg:grid-cols-4">
          <div className="col-span-2 col-start-2">
            <div className="mx-auto flex max-w-prose flex-col gap-[42px]">
              <div>
                <p className="font-poppins text-[46px] leading-none text-brand-600">
                  “
                </p>
                <div className="space-y-6">
                  <p className="text-balance text-xl text-black-700">
                    Penubuhan sebuah kementerian khas iaitu Kementerian Digital
                    adalah untuk memberi penekanan kepada agenda pendigitalan.
                    Tanpa kementerian yang khas ini, Malaysia tidak akan dapat
                    bersaing pantas dengan negara-negara lain dalam bidang
                    digital.
                  </p>
                  <p className="text-dim-500">
                    –– YAB PM, Dato’ Seri Anwar Ibrahim
                  </p>
                </div>
              </div>

              <div className="space-y-4.5">
                <p>
                  Semasa mengumumkan rombakan kabinet pada 12 Disember 2023, 
                  YAB Perdana Menteri, Dato’ Seri Anwar Ibrahim telah
                  mencetuskan kewujudan sebuah kementerian yang baru iaitu
                  Kementerian Digital.
                </p>
                <p>
                  Agenda digital negara yang disusun semula membolehkan
                  pelaksanaannya yang lebih berfokus, holistik dan berkesan.
                  Fungsi pendigitalan dalam konteks sektor awam sebelum ini yang
                  diterajui oleh Unit Pemodenan Tadbiran dan Perancangan
                  Pengurusan (MAMPU) turut diperkasakan melalui penstrukturan
                  semula MAMPU yang kini dikenali sebagai Jabatan Digital Negara
                  (JDN).
                </p>
                <p>
                  Selain JDN, pasak kementerian ini dikuatkan lagi dengan
                  kehadiran agensi-agensi yang telah lama bertapak dalam arena
                  digitalisasi seperti  Jabatan Perlindungan Data Peribadi
                  (JPDP), MyDIGITAL Corporation, Malaysia Digital Economy
                  Corporation (MDEC), CyberSecurity Malaysia (CSM), Digital
                  Nasional Berhad (DNB) dan MyNIC.
                </p>
              </div>

              <div className="space-y-4.5">
                <p>
                  YB Tuan Gobind Singh Deo telah dilantik sebagai Menteri
                  Digital yang pertama di Malaysia. Beliau dibantu oleh Timbalan
                  Menteri, YB Datuk Wilson Ugak Anak Kumbong. Dari aspek
                  pentadbiran awamnya pula, Y.Bhg Datuk Haji Rodzi Md Saad
                  merupakan Ketua Setiausaha Kementerian Digital yang pertama.
                </p>
                <p>
                  Ibu pejabat Kementerian Digital secara rasminya beroperasi di
                  Menara Usahawan, Presint 2, Pusat Pentadbiran Kerajaan
                  Persekutuan, Putrajaya.
                </p>
              </div>

              <Link
                href={routes.DIRECTORY}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "md" }),
                  "mt-3 w-fit rounded-full",
                )}
              >
                <UserGroup />
                Direktori Kakitangan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
