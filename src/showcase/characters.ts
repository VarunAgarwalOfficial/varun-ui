import peep1Asset from "$lib/assets/characters/varunui/peep-1.svg";
import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
import peepSitting13Asset from "$lib/assets/characters/varunui/peep-sitting-13.svg";
import peepSitting8Asset from "$lib/assets/characters/varunui/peep-sitting-8.svg";
import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
import peepStanding10Asset from "$lib/assets/characters/varunui/peep-standing-10.svg";
import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
import peepStanding18Asset from "$lib/assets/characters/varunui/peep-standing-18.svg";
import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
import peepStanding5Asset from "$lib/assets/characters/varunui/peep-standing-5.svg";
export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  description: string;
  previewImage?: string;
  previewAlt?: string;
  sprites: CharacterSprite[];
  tags: string[];
}

export interface CharacterSprite {
  title: string;
  label: string;
  description: string;
  image: string;
  alt: string;
}

export const characterProfiles: CharacterProfile[] = [
  {
    id: "varunui",
    name: "varunUI Characters",
    role: "Storyteller set",
    description:
      "Hand-drawn people for onboarding, empty states, support panels, and friendly product moments.",
    previewImage: peepStanding1Asset,
    previewAlt: "A standing varunUI character with glasses.",
    sprites: [
      {
        title: "Standing",
        label: "Welcome",
        description:
          "Full-body standing pose for welcome, onboarding, and empty-state panels.",
        image: peepStanding1Asset,
        alt: "A standing varunUI character with glasses.",
      },
      {
        title: "Casual",
        label: "Calm",
        description:
          "Relaxed standing pose for low-pressure setup and account moments.",
        image: peepStanding5Asset,
        alt: "A relaxed standing varunUI character with one hand in a pocket.",
      },
      {
        title: "Confident",
        label: "Assure",
        description:
          "Arms-crossed stance for security, permissions, and confident confirmation.",
        image: peepStanding10Asset,
        alt: "A standing varunUI character with folded arms.",
      },
      {
        title: "Ready",
        label: "Support",
        description:
          "Steady standing pose for support, help, and human handoff moments.",
        image: peepStanding12Asset,
        alt: "A standing varunUI character ready to help.",
      },
      {
        title: "Hands on hips",
        label: "Complete",
        description:
          "Confident pose for completion, decisions, and successful account flows.",
        image: peepStanding18Asset,
        alt: "A varunUI character standing with hands on hips.",
      },
      {
        title: "Presenter",
        label: "Explain",
        description:
          "Presenter pose for explaining a dashboard, feature, or product decision.",
        image: peepStanding23Asset,
        alt: "A varunUI character presenting with one arm raised.",
      },
      {
        title: "Seated",
        label: "Calm",
        description:
          "Seated pose for calm welcome screens, article context, and workspace illustrations.",
        image: peepSitting1Asset,
        alt: "A seated varunUI character.",
      },
      {
        title: "Bike",
        label: "Journey",
        description:
          "Bike pose for playful journey, progress, and movement-oriented sections.",
        image: peepSitting8Asset,
        alt: "A varunUI character riding a bicycle.",
      },
      {
        title: "Thinking",
        label: "Reflect",
        description:
          "Seated pose for considered choices, waiting, and reflective story moments.",
        image: peepSitting13Asset,
        alt: "A seated varunUI character pausing to think.",
      },
      {
        title: "Bust",
        label: "Profile",
        description:
          "Upper-body peep for compact profile, testimonial, and account surfaces.",
        image: peep1Asset,
        alt: "A varunUI character bust portrait.",
      },
    ],
    tags: ["People", "Onboarding", "Empty states", "Support"],
  },
];

export function getCharacterProfile(id: string) {
  return characterProfiles.find((character) => character.id === id);
}
