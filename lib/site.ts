export const site = {
  name: "GoldWorks",
  url: "https://goldworks.net",
  email: "support@goldworks.net",
  policyDate: "2026-09-10",
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;
