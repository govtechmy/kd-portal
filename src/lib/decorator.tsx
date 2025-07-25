import config from "@payload-config";
import type { BasePayload } from "payload";
import { getPayload } from "payload";
import { FunctionComponent, ReactNode } from "react";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Params } from "next/dist/server/request/params";

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
export type UnresolvedServerProp = {
  payload: BasePayload;
  params?: Promise<Params>;
  locale: "en-GB" | "ms-MY";
  searchParams?: Promise<Record<string, any>>;
  children?: ReactNode;
};

export type ServerOption = {
  debug?: boolean;
};

export const inject = (Component: FSP) => {
  return async ({
    params,
    searchParams,
  }: Pick<UnresolvedServerProp, "params" | "searchParams">) => {
    const payload = await getPayload({ config });
    const _params = await params;
    const _searchParams = await searchParams;

    let props: ServerProp = {
      params: _params,
      searchParams: _searchParams,
      payload,
      locale: (_params?.locale as "en-GB" | "ms-MY") || "ms-MY",
    };

    setRequestLocale(props.locale);

    return <Component {...props} />;
  };
};

type MetagenMapper = {
  [P in keyof Metadata]: string;
};

export type MetagenProps = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metagen = async (
  props: MetagenProps,
  namespace: string,
  map: MetagenMapper,
): Promise<Metadata> => {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale || "en-GB",
    namespace,
  });
  return {
    title: map.title ? t(map.title) : "Kementerian Digital",
    description: map.description
      ? t(map.description)
      : "Portal Rasmi Kementerian Digital Malaysia yang menerajui transformasi digital negara secara berfokus, holistik dan berkesan.",
  };
  return {};
};
