import config from "@payload-config";
import type { BasePayload } from "payload";
import { getPayload } from "payload";
import { FunctionComponent, ReactNode } from "react";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export interface ContextArgs {
  params: Record<string, any>;
  searchParams: Record<string, any>;
}

export type FSP = FunctionComponent<ServerProp>;
export type FSM = Record<"locale", any>;
export type Locale = "en-GB" | "ms-MY";

export type ServerProp = {
  payload: BasePayload;
  params?: Params;
  locale: "en-GB" | "ms-MY";
  searchParams?: Record<string, any>;
  children?: ReactNode;
};

export type ServerOption = {
  debug?: boolean;
};

export const inject = (Component: FSP) => {
  return async ({
    params = {},
    searchParams = {},
  }: Pick<ServerProp, "params" | "searchParams">) => {
    const payload = await getPayload({ config });

    let props: ServerProp = {
      params,
      searchParams,
      payload,
      locale: params.locale || "ms-MY",
    };

    unstable_setRequestLocale(props.locale);

    return <Component {...props} />;
  };
};

type MetagenMapper = {
  [P in keyof Metadata]: string;
};

export type MetagenProps = {
  params: Record<string, string>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metagen = async (
  props: MetagenProps,
  namespace: string,
  map: MetagenMapper,
): Promise<Metadata> => {
  const t = await getTranslations({ locale: props.params.locale, namespace });
  return {
    title: map.title ? t(map.title) : "Kementerian Digital",
    description: map.description
      ? t(map.description)
      : "Portal Rasmi Kementerian Digital Malaysia dimana Kementerian Digital telah ditubuhkan bagi menerajui usaha transformasi digital negara dengan pelaksanaan yang lebih berfokus, holistik dan berkesan.",
  };
  return {};
};
