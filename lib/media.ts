const rawMediaBaseUrl =
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim() ?? "";

function normalizeMediaBaseUrl(value: string): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return undefined;
    }

    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return undefined;
  }
}

const mediaBaseUrl = normalizeMediaBaseUrl(rawMediaBaseUrl);

export function getMediaUrl(path: string): string | undefined {
  const normalizedPath = path.trim().replace(/^\/+/, "");

  if (!mediaBaseUrl || !normalizedPath) {
    return undefined;
  }

  return `${mediaBaseUrl}/${normalizedPath}`;
}
