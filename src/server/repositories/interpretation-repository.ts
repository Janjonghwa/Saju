import { BASIC_INTERPRETATION_TEMPLATES } from "@/content/interpretations/basic-template";
import { DAILY_INTERPRETATION_TEMPLATES } from "@/content/interpretations/daily-template";
import { JOB_INTERPRETATION_TEMPLATES } from "@/content/interpretations/job-template";
import { SPOUSE_INTERPRETATION_TEMPLATES } from "@/content/interpretations/spouse-template";
import { YEARLY_INTERPRETATION_TEMPLATES } from "@/content/interpretations/yearly-template";
import type { ThemeType } from "@/types/report";

export type InterpretationMessageRow = {
  tag: string;
  title: string;
  content: string;
  priority: number;
};

export const findInterpretationsByTags = async (
  tags: string[],
): Promise<InterpretationMessageRow[]> => {
  const rows = BASIC_INTERPRETATION_TEMPLATES.filter((row) => tags.includes(row.tag))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);

  return rows;
};

const resolveTemplatesByTheme = (theme: string) => {
  const normalizedTheme = theme as ThemeType;

  if (normalizedTheme === "daily") {
    return DAILY_INTERPRETATION_TEMPLATES;
  }

  if (normalizedTheme === "yearly") {
    return YEARLY_INTERPRETATION_TEMPLATES;
  }

  if (normalizedTheme === "spouse") {
    return SPOUSE_INTERPRETATION_TEMPLATES;
  }

  if (normalizedTheme === "job") {
    return JOB_INTERPRETATION_TEMPLATES;
  }

  return BASIC_INTERPRETATION_TEMPLATES;
};

export const findInterpretationsByTagsAndTheme = async (
  tags: string[],
  theme: string,
): Promise<InterpretationMessageRow[]> => {
  const templates = resolveTemplatesByTheme(theme);

  const rows = templates
    .filter((row) => tags.includes(row.tag))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);

  return rows;
};
