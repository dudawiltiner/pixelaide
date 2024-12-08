interface ChipOption {
  value: string;
  label: string;
  command: string;
}

interface ChipGroupConfig {
  key: string;
  label: string;
  options: ChipOption[];
  multiple: boolean;
  default?: string | string[];
}

interface LanguageOption {
  value: string;
  label: string;
  command: string;
}

interface LanguageConfig {
  key: string;
  label: string;
  placeholder: string;
  options: LanguageOption[];
  default: string;
}

interface TechnologyConfig {
  key: string;
  label: string;
  placeholder?: string;
  data: {
    group: string;
    items: string[];
  }[];
  command: (selected: string[]) => string;
}

// Chip group configurations
export const chipGroups: ChipGroupConfig[] = [
  {
    key: "personality",
    label: "What personalities should she have?",
    options: [
      {
        value: "formal",
        label: "Formal Tone",
        command:
          "You are a formal and serious personal assistant, always helpful and professional.",
      },
      {
        value: "casual",
        label: "Casual Tone",
        command:
          "You are a relaxed and friendly personal assistant, always ready for an informal chat.",
      },
      {
        value: "technical",
        label: "Technical Focus",
        command:
          "You are a highly specialized technical assistant and always provide detailed and accurate explanations.",
      },
      {
        value: "creative",
        label: "Creative",
        command:
          "You are a creative and inspiring personal assistant, always offering new ideas and approaches.",
      },
    ],
    multiple: false,
    default: "casual",
  },
  {
    key: "responseStyle",
    label: "How should the response be?",
    options: [
      {
        value: "detailed",
        label: "Detailed",
        command:
          "Always provide a detailed response, explaining each step clearly and completely.",
      },
      {
        value: "stepByStep",
        label: "Step by step",
        command:
          "Provide a structured response in clear and easy-to-follow steps.",
      },
      {
        value: "summary",
        label: "Summarized",
        command:
          "Provide a concise and objective response, covering only the main points.",
      },
    ],
    multiple: false,
    default: "detailed",
  },
  {
    key: "codeStyle",
    label: "What is the code style?",
    options: [
      {
        value: "prettier",
        label: "Prettier",
        command:
          "Your code should follow the Prettier style, with automatic and consistent formatting.",
      },
      {
        value: "minimalist",
        label: "Minimalist",
        command:
          "Your code should be simple and straightforward, without excesses and without comments.",
      },
      {
        value: "commented",
        label: "Commented",
        command:
          "Your code should be well commented, clearly explaining what each part does.",
      },
      {
        value: "eslint",
        label: "ESLint Friendly",
        command: "Ensure that the code complies with ESLint rules.",
      },
      {
        value: "performative",
        label: "Performant",
        command:
          "Ensure the code is performant with best performance practices.",
      },
      {
        value: "accessible",
        label: "Accessibility First",
        command:
          "Ensure that the code meets the accessibility criteria of SEO and Light House with all the necessary accessibility settings.",
      },
    ],
    multiple: true,
    default: ["prettier", "eslint"],
  },
];

// Language configuration
export const languageConfig: LanguageConfig = {
  key: "language",
  label: "What is the response language?",
  placeholder: "Select the response language",
  options: [
    {
      value: "english",
      label: "English",
      command: "You must provide all responses in English.",
    },
    {
      value: "portuguese",
      label: "Portuguese",
      command: "You must provide all responses in Portuguese.",
    },
    {
      value: "spanish",
      label: "Spanish",
      command: "You must provide all responses in Spanish.",
    },
  ],
  default: "english",
};

// Technology configuration
export const technologyConfig: TechnologyConfig = {
  key: "technologies",
  label: "Which technologies should Pixel focus on?",
  placeholder: "Select the technologies to focus on",
  data: [
    {
      group: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java"],
    },
    {
      group: "Frameworks",
      items: ["React", "Vue", "Nuxt", "Next"],
    },
    {
      group: "Libraries",
      items: [
        "Cypress",
        "Jest",
        "React Hook Forms",
        "Axios",
        "Mantine",
        "Material UI",
        "Tailwind CSS",
      ],
    },
  ],
  command: (selected: string[]) =>
    selected.length > 0
      ? `You should focus on the following technologies: ${selected.join(
          ", "
        )}.`
      : "",
};
