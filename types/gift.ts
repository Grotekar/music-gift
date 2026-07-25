export type GiftTheme = "mist" | "earth";

export type ExternalLinks = Partial<{
  vk: string;
  youtube: string;
  other: string;
}>;

export type AudioSource = {
  path: string;
};

type TrackBase = {
  title: string;
  artist?: string;
  description?: string;
  externalLinks?: ExternalLinks;
};

export type Track =
  | (TrackBase & {
      mode: "preview";
      audioPreview?: AudioSource;
    })
  | (TrackBase & {
      mode: "full";
      audioFull?: AudioSource;
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
  tracksIntro: string;
  tracks: Track[];
  closingMessage?: string;
  scripture?: Scripture;
};
