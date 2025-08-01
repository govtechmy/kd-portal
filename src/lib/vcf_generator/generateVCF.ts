import { StaffDirectory } from "@/payload-types";

export function generateVCF(
  staff: StaffDirectory,
  alamat: string,
  isDefaultAlamat: boolean = false,
): string {
  const fullName = staff.nama || "Staff";
  const firstName = fullName.split(" ").slice(0, -1).join(" ");
  const lastName = fullName.split(" ").slice(-1).join(" ");
  const org = "Kementerian Digital";
  const department =
    typeof staff.id_bhg !== "string" ? staff.id_bhg.bhg : "N/A";

  const processedAddress = isDefaultAlamat
    ? alamat.split("\n").slice(1).join(", ")
    : alamat;

  return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${fullName}
ORG:${org}${department ? `;${department}` : ""}
TITLE:${staff.jawatan || "N/A"}
TEL;TYPE=CELL:${staff.telefon || "N/A"}
EMAIL:${staff.emel ? `${staff.emel}@digital.gov.my` : "N/A"}
ADR;TYPE=WORK:;;${processedAddress};;;;
URL:${staff.laman || "https://digital.gov.my"}
END:VCARD`;
}
