export function downloadVCF(vcfString: string, filename: string) {
  const blob = new Blob([vcfString], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.vcf`;
  a.click();

  URL.revokeObjectURL(url);
}
