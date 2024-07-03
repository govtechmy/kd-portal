import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

export default withNextIntl(withPayload(nextConfig))
