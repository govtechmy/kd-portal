import { StaffDirectory } from "@/payload-types";

export function generateVCF(staff: StaffDirectory, alamat: string): string {
  const fullName = staff.nama || "Staff";
  const firstName = fullName.split(" ").slice(0, -1).join(" ");
  const lastName = fullName.split(" ").slice(-1).join(" ");

  return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${fullName}
ORG:Kementerian Digital
TITLE:${staff.jawatan || ""}
TEL;TYPE=CELL:${staff.telefon || ""}
EMAIL:${staff.emel ? `${staff.emel}@digital.gov.my` : ""}
ADR;TYPE=WORK:;;${alamat};;;;
URL:https://digital.gov.my
END:VCARD`;
}
