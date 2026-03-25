export type ThemeType = "basic" | "daily" | "yearly" | "spouse" | "job";

export type AccessLevel = "free" | "premium";

export type ReportSection = {
  title: string;
  content: string;
  accessLevel: AccessLevel;
  sectionAccessLevel?: AccessLevel;
};

export type ThemeReport = {
  theme: ThemeType;
  score?: number;
  tags: string[];
  summary: string;
  warnings?: string[];
  recommendations?: string[];
  sections: ReportSection[];
  generatedAt: string;
};
