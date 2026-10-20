import { SITE_URL } from "@/lib/seo/constants";

/** UTF-8 key file served at `/{INDEXNOW_KEY}.txt` for IndexNow verification. */
export const INDEXNOW_KEY = "8f3c2a91b4d6e7054c8a9f1e2b3d4c5";

export const INDEXNOW_KEY_FILE_PATH = `/${INDEXNOW_KEY}.txt`;

export const INDEXNOW_KEY_LOCATION = `${SITE_URL}${INDEXNOW_KEY_FILE_PATH}`;
