export type InterpretationTemplate = {
  tag: string;
  title: string;
  content: string;
  priority: number;
};

export const SPOUSE_INTERPRETATION_TEMPLATES: InterpretationTemplate[] = [
  {
    tag: "SPOUSE_WOOD_STRONG",
    title: "배우자운: 목 기운 강조",
    content: "배우자(또는 배우자궁)에 목(木)의 기운이 강합니다. 성장 지향적이고 진취적인 배우자 인연입니다.",
    priority: 90,
  },
  {
    tag: "SPOUSE_FIRE_STRONG",
    title: "배우자운: 화 기운 강조",
    content: "배우자궁에 화(火)의 기운이 강합니다. 열정적이고 표현력이 뛰어난 배우자 인연입니다.",
    priority: 90,
  },
  {
    tag: "SPOUSE_EARTH_STRONG",
    title: "배우자운: 토 기운 강조",
    content: "배우자궁에 토(土)의 기운이 강합니다. 안정적이고 믿음직한 배우자 인연입니다.",
    priority: 90,
  },
  {
    tag: "SPOUSE_METAL_STRONG",
    title: "배우자운: 금 기운 강조",
    content: "배우자궁에 금(金)의 기운이 강합니다. 판단력이 뛰어나고 원칙적인 배우자 인연입니다.",
    priority: 90,
  },
  {
    tag: "SPOUSE_WATER_STRONG",
    title: "배우자운: 수 기운 강조",
    content: "배우자궁에 수(水)의 기운이 강합니다. 지혜롭고 유연한 배우자 인연입니다.",
    priority: 90,
  },
  {
    tag: "SPOUSE_COMPATIBILITY_GOOD",
    title: "배우자운: 궁합 양호",
    content: "배우자와의 궁합이 좋은 흐름입니다. 서로를 이해하고 보완하는 관계입니다.",
    priority: 85,
  },
  {
    tag: "SPOUSE_COMPATIBILITY_CAUTION",
    title: "배우자운: 궁합 주의",
    content: "배우자와의 관계에서 갈등이 생길 수 있습니다. 대화와 이해가 필요합니다.",
    priority: 75,
  },
  {
    tag: "SPOUSE_TIMING_EARLY",
    title: "배우자운: 결혼 시기 - 빠른 편",
    content: "배우자 인연이 비교적 빠른 시기에 찾아올 수 있습니다. 좋은 기회를 놓치지 마세요.",
    priority: 80,
  },
  {
    tag: "SPOUSE_TIMING_LATE",
    title: "배우자운: 결혼 시기 - 늦은 편",
    content: "배우자 인연이 다소 늦게 찾아올 수 있습니다. 서두르지 말고 기다림이 필요합니다.",
    priority: 70,
  },
  {
    tag: "SPOUSE_RELATIONSHIP_HARMONIOUS",
    title: "배우자운: 부부 관계 화목",
    content: "부부 관계가 화목한 흐름입니다. 서로를 존중하고 배려하는 마음이 중요합니다.",
    priority: 85,
  },
  {
    tag: "SPOUSE_RELATIONSHIP_CHALLENGE",
    title: "배우자운: 부부 관계 도전",
    content: "부부 관계에서 도전이 있을 수 있습니다. 인내와 대화로 극복할 수 있습니다.",
    priority: 75,
  },
  {
    tag: "SPOUSE_FAMILY_GOOD",
    title: "배우자운: 배우자 집안 관계",
    content: "배우자 집안과의 관계가 좋은 흐름입니다. 가족 간 화합이 이루어집니다.",
    priority: 80,
  },
  {
    tag: "SPOUSE_MONEY_GOOD",
    title: "배우자운: 배우자 재물운",
    content: "배우자를 통한 재물운이 좋은 흐름입니다. 함께 노력하면 경제적 안정을 얻을 수 있습니다.",
    priority: 80,
  },
  {
    tag: "SPOUSE_CHILDREN_GOOD",
    title: "배우자운: 자녀운",
    content: "자녀운이 좋은 흐름입니다. 자녀와의 관계가 원만하고 성장에 도움이 됩니다.",
    priority: 80,
  },
];
