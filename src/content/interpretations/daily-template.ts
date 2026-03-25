export type InterpretationTemplate = {
  tag: string;
  title: string;
  content: string;
  priority: number;
};

export const DAILY_INTERPRETATION_TEMPLATES: InterpretationTemplate[] = [
  {
    tag: "DAILY_WOOD_FAVORABLE",
    title: "오늘의 운세: 목 기운 호조",
    content: "오늘 목(木)의 기운이 작용하여 성장과 확장의 에너지가 좋은 날입니다. 새로운 시작에 유리합니다.",
    priority: 90,
  },
  {
    tag: "DAILY_FIRE_FAVORABLE",
    title: "오늘의 운세: 화 기운 호조",
    content: "오늘 화(火)의 기운이 작용하여 활동적이고 표현력이 빛나는 날입니다. 대인관계에 유리합니다.",
    priority: 90,
  },
  {
    tag: "DAILY_EARTH_FAVORABLE",
    title: "오늘의 운세: 토 기운 호조",
    content: "오늘 토(土)의 기운이 작용하여 안정감과 정리 정돈에 좋은 날입니다. 계획 수립에 유리합니다.",
    priority: 90,
  },
  {
    tag: "DAILY_METAL_FAVORABLE",
    title: "오늘의 운세: 금 기운 호조",
    content: "오늘 금(金)의 기운이 작용하여 판단력과 결단력이 뛰어난 날입니다. 중요한 결정에 유리합니다.",
    priority: 90,
  },
  {
    tag: "DAILY_WATER_FAVORABLE",
    title: "오늘의 운세: 수 기운 호조",
    content: "오늘 수(水)의 기운이 작용하여 유연성과 직관이 빛나는 날입니다. 학습과 연구에 유리합니다.",
    priority: 90,
  },
  {
    tag: "DAILY_WOOD_UNFAVORABLE",
    title: "오늘의 운세: 목 기운 주의",
    content: "오늘 목(木)의 기운이 과다하여 성급한 판단을 할 수 있습니다. 신중하게 행동하세요.",
    priority: 80,
  },
  {
    tag: "DAILY_FIRE_UNFAVORABLE",
    title: "오늘의 운세: 화 기운 주의",
    content: "오늘 화(火)의 기운이 과다하여 감정적 반응이 클 수 있습니다. 차분함을 유지하세요.",
    priority: 80,
  },
  {
    tag: "DAILY_EARTH_UNFAVORABLE",
    title: "오늘의 운세: 토 기운 주의",
    content: "오늘 토(土)의 기운이 과다하여 고집이 강해질 수 있습니다. 유연한 태도를 유지하세요.",
    priority: 80,
  },
  {
    tag: "DAILY_METAL_UNFAVORABLE",
    title: "오늘의 운세: 금 기운 주의",
    content: "오늘 금(金)의 기운이 과다하여 비판적이거나 경직될 수 있습니다. 부드러운 대응을 권합니다.",
    priority: 80,
  },
  {
    tag: "DAILY_WATER_UNFAVORABLE",
    title: "오늘의 운세: 수 기운 주의",
    content: "오늘 수(水)의 기운이 과다하여 우유부단하거나 감정 기복이 클 수 있습니다. 중심을 잡으세요.",
    priority: 80,
  },
  {
    tag: "DAILY_GENERAL_BALANCE",
    title: "오늘의 운세: 균형의 날",
    content: "오늘은 전체적으로 균형 잡힌 흐름입니다. 평소 루틴을 유지하며 안정적인 하루를 보내세요.",
    priority: 50,
  },
  {
    tag: "DAILY_CAREER",
    title: "오늘의 운세: 직업/업무",
    content: "오늘 직업운이 안정적입니다. 업무에 집중하면 좋은 성과를 기대할 수 있습니다.",
    priority: 70,
  },
  {
    tag: "DAILY_LOVE",
    title: "오늘의 운세: 연애/관계",
    content: "오늘 연애운이 상승합니다. 솔직한 대화가 관계를 발전시키는 데 도움이 됩니다.",
    priority: 70,
  },
  {
    tag: "DAILY_HEALTH",
    title: "오늘의 운세: 건강",
    content: "오늘 건강운이 보통입니다. 무리하지 않고 적절한 휴식을 취하는 것이 좋습니다.",
    priority: 70,
  },
  {
    tag: "DAILY_MONEY",
    title: "오늘의 운세: 재물/금전",
    content: "오늘 재물운이 안정적입니다. 큰 지출보다는 저축과 계획적인 소비가 유리합니다.",
    priority: 70,
  },
];
