export type GiftTheme = "mist" | "earth";

export type ExternalLinks = Partial<{
  vk: string;
  youtube: string;
  other: string;
}>;

type TrackBase = {
  title: string;
  artist?: string;
  description?: string;
  externalLinks?: ExternalLinks;
};

export type Track =
  | (TrackBase & {
      mode: "preview";
      audioPreview?: string;
    })
  | (TrackBase & {
      mode: "full";
      audioFull?: string;
    });

export type Scripture = {
  text: string;
  reference: string;
};

export type Gift = {
  slug: string;
  title: string;
  subtitle?: string;
  message: string[];
  coverImage: string;
  theme: GiftTheme;
  tracks: Track[];
  closingMessage?: string;
  scripture?: Scripture;
};
