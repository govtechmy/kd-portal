import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";

const NotFoundComponent: FC = () => {
  const t = useTranslations();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1>404 - {t("404.not_found")}</h1>
      <p>{t("404.cant_find")}</p>
      <Link href="/" className="font-bold underline">
        {t("404.back")}
      </Link>
    </div>
  );
};

export default NotFoundComponent;
