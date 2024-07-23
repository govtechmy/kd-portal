/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    file: File;
    broadcast: Broadcast;
    achievement: Achievement;
    'kd-department': KdDepartment;
    'staff-directory': StaffDirectory;
    policy: Policy;
    'quick-link': QuickLink;
    search: Search;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    'site-info': SiteInfo;
    header: Header;
    footer: Footer;
    'profil-kementerian': ProfilKementerian;
  };
  locale: 'ms-MY' | 'en-GB';
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  caption?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "file".
 */
export interface File {
  id: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename: string;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "broadcast".
 */
export interface Broadcast {
  id: string;
  title: string;
  type: 'announcement' | 'media_release';
  date: string;
  description: string;
  broadcast_text: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  broadcast_text_html?: string | null;
  isPin?: boolean | null;
  broadcast_image?: string | Media | null;
  broadcast_file?: string | File | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "achievement".
 */
export interface Achievement {
  id: string;
  title: string;
  type: 'product_launch' | 'policy' | 'collaboration' | 'miscellaneous';
  date: string;
  description: string;
  content_text: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  isFlagged?: boolean | null;
  achievement_file?: string | Media | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "kd-department".
 */
export interface KdDepartment {
  id: string;
  id_bhg: number;
  bhg: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "staff-directory".
 */
export interface StaffDirectory {
  id: string;
  id_bhg: string | KdDepartment;
  staff_id: number;
  nama?: string | null;
  gred?: string | null;
  jawatan?: string | null;
  telefon?: string | null;
  emel?: string | null;
  image?: string | Media | null;
  social_media?:
    | {
        social: 'Facebook' | 'X' | 'Instagram' | 'Tiktok';
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | (
                | '/'
                | '/pencapaian'
                | '/siaran'
                | '/hubungi-kami'
                | '/profil-kementerian'
                | '/direktori'
                | '/penafian'
                | '/dasar'
                | '/dasar-privasi'
              )
            | null;
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "policy".
 */
export interface Policy {
  id: string;
  doc_name: string;
  doc_type: 'act' | 'document' | 'guideline' | 'circular';
  doc_description: string;
  doc_date: string;
  file_upload: string | File;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "quick-link".
 */
export interface QuickLink {
  id: string;
  name: string;
  type?: ('social' | 'quick_links') | null;
  description?: string | null;
  href: {
    link?: {
      type?: ('reference' | 'custom') | null;
      newTab?: boolean | null;
      reference?:
        | (
            | '/'
            | '/pencapaian'
            | '/siaran'
            | '/hubungi-kami'
            | '/profil-kementerian'
            | '/direktori'
            | '/penafian'
            | '/dasar'
            | '/dasar-privasi'
          )
        | null;
      url?: string | null;
    };
    id?: string | null;
  }[];
  image?: string | Media | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search".
 */
export interface Search {
  id: string;
  title?: string | null;
  priority?: number | null;
  doc:
    | {
        relationTo: 'achievement';
        value: string | Achievement;
      }
    | {
        relationTo: 'broadcast';
        value: string | Broadcast;
      }
    | {
        relationTo: 'staff-directory';
        value: string | StaffDirectory;
      }
    | {
        relationTo: 'policy';
        value: string | Policy;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-info".
 */
export interface SiteInfo {
  id: string;
  site_name: string;
  address: string;
  map_address: string;
  encoded_address?: string | null;
  no_tel: string;
  email: string;
  social_media: {
    social: 'Facebook' | 'X' | 'Instagram' | 'Tiktok';
    link: {
      type?: ('reference' | 'custom') | null;
      newTab?: boolean | null;
      reference?:
        | (
            | '/'
            | '/pencapaian'
            | '/siaran'
            | '/hubungi-kami'
            | '/profil-kementerian'
            | '/direktori'
            | '/penafian'
            | '/dasar'
            | '/dasar-privasi'
          )
        | null;
      url?: string | null;
      label: string;
    };
    id?: string | null;
  }[];
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  items: {
    link: {
      type?: ('reference' | 'custom') | null;
      newTab?: boolean | null;
      reference?:
        | (
            | '/'
            | '/pencapaian'
            | '/siaran'
            | '/hubungi-kami'
            | '/profil-kementerian'
            | '/direktori'
            | '/penafian'
            | '/dasar'
            | '/dasar-privasi'
          )
        | null;
      url?: string | null;
      label: string;
    };
    id?: string | null;
  }[];
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  about_us?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | (
                | '/'
                | '/pencapaian'
                | '/siaran'
                | '/hubungi-kami'
                | '/profil-kementerian'
                | '/direktori'
                | '/penafian'
                | '/dasar'
                | '/dasar-privasi'
              )
            | null;
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  'quick-links'?:
    | {
        'quick-links'?: (string | null) | QuickLink;
        id?: string | null;
      }[]
    | null;
  'open-source'?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | (
                | '/'
                | '/pencapaian'
                | '/siaran'
                | '/hubungi-kami'
                | '/profil-kementerian'
                | '/direktori'
                | '/penafian'
                | '/dasar'
                | '/dasar-privasi'
              )
            | null;
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  disclaimer_section?: {
    statement?: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
  };
  'privacy-policy_section'?: {
    statement?: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "profil-kementerian".
 */
export interface ProfilKementerian {
  id: string;
  vision: {
    statement: string;
    icon:
      | 'arrow-back'
      | 'arrow-forward'
      | 'arrow-outgoing'
      | 'bolt'
      | 'check-circle'
      | 'checkmark-14-point-star'
      | 'checkmark-shield'
      | 'chevron-down'
      | 'chevron-left'
      | 'chevron-right'
      | 'chevron-up'
      | 'cross-x'
      | 'direction'
      | 'ellipsis'
      | 'envelope'
      | 'eye-show'
      | 'file-document-paper'
      | 'flag'
      | 'globe'
      | 'gov'
      | 'hamburger-menu'
      | 'lock'
      | 'map'
      | 'money'
      | 'phone'
      | 'search'
      | 'solid-lock'
      | 'star'
      | 'trophy'
      | 'user-group';
  };
  mission: {
    statement: string;
    icon:
      | 'arrow-back'
      | 'arrow-forward'
      | 'arrow-outgoing'
      | 'bolt'
      | 'check-circle'
      | 'checkmark-14-point-star'
      | 'checkmark-shield'
      | 'chevron-down'
      | 'chevron-left'
      | 'chevron-right'
      | 'chevron-up'
      | 'cross-x'
      | 'direction'
      | 'ellipsis'
      | 'envelope'
      | 'eye-show'
      | 'file-document-paper'
      | 'flag'
      | 'globe'
      | 'gov'
      | 'hamburger-menu'
      | 'lock'
      | 'map'
      | 'money'
      | 'phone'
      | 'search'
      | 'solid-lock'
      | 'star'
      | 'trophy'
      | 'user-group';
  };
  functions_and_role: {
    statement: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
    icon:
      | 'arrow-back'
      | 'arrow-forward'
      | 'arrow-outgoing'
      | 'bolt'
      | 'check-circle'
      | 'checkmark-14-point-star'
      | 'checkmark-shield'
      | 'chevron-down'
      | 'chevron-left'
      | 'chevron-right'
      | 'chevron-up'
      | 'cross-x'
      | 'direction'
      | 'ellipsis'
      | 'envelope'
      | 'eye-show'
      | 'file-document-paper'
      | 'flag'
      | 'globe'
      | 'gov'
      | 'hamburger-menu'
      | 'lock'
      | 'map'
      | 'money'
      | 'phone'
      | 'search'
      | 'solid-lock'
      | 'star'
      | 'trophy'
      | 'user-group';
    id?: string | null;
  }[];
  leaders?:
    | {
        staff: string | StaffDirectory;
        id?: string | null;
      }[]
    | null;
  'latar-belakang'?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}