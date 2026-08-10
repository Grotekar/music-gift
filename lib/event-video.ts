const rawEventVideoBaseUrl =
  process.env.NEXT_PUBLIC_EVENT_2026_VIDEO_BASE_URL?.trim() ?? "";

function normalizeEventVideoBaseUrl(value: string): string | undefined {
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

const eventVideoBaseUrl = normalizeEventVideoBaseUrl(rawEventVideoBaseUrl);

export function getEventVideoUrl(path: string | undefined): string | undefined {
  const normalizedPath = path?.trim().replace(/^\/+/, "");

  if (!eventVideoBaseUrl || !normalizedPath) {
    return undefined;
  }

  return `${eventVideoBaseUrl}/${normalizedPath}`;
}
