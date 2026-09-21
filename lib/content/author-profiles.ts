export const AUTHOR_PROFILE_IDS = ["vinayak", "utsavsar"] as const;

export type AuthorProfileId = (typeof AUTHOR_PROFILE_IDS)[number];

export type AuthorProfile = {
  id: AuthorProfileId;
  name: string;
  role: string;
  shortBio: string;
  linkedIn: string;
};

export const AUTHOR_PROFILES: Record<AuthorProfileId, AuthorProfile> = {
  vinayak: {
    id: "vinayak",
    name: "Vinayak Raizada",
    role: "Co-Founder",
    shortBio:
      "Electrical Engineering, IIT Roorkee. Leads domain technical work, strategy, and marketing. Industrial AI intelligence-turning plant data into actions.",
    linkedIn: "https://www.linkedin.com/in/vinayak-rz/",
  },
  utsavsar: {
    id: "utsavsar",
    name: "Utso Sarkar",
    role: "Co-Founder",
    shortBio:
      "IIT Roorkee. Leads sales, outreach, and software engineering-building the platform and running pilots with manufacturing teams.",
    linkedIn: "https://www.linkedin.com/in/utso/",
  },
};

export const DEFAULT_AUTHOR_PROFILE_ID: AuthorProfileId = "vinayak";

export function isAuthorProfileId(value: string): value is AuthorProfileId {
  return AUTHOR_PROFILE_IDS.includes(value as AuthorProfileId);
}

export function getAuthorProfile(id: string | null | undefined): AuthorProfile {
  if (id && isAuthorProfileId(id)) {
    return AUTHOR_PROFILES[id];
  }
  return AUTHOR_PROFILES[DEFAULT_AUTHOR_PROFILE_ID];
}
