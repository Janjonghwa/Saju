export type InterpretationTemplate = {
  tag: string;
  title: string;
  content: string;
  priority: number;
};

export const YEARLY_INTERPRETATION_TEMPLATES: InterpretationTemplate[] = [
  {
    tag: "YEARLY_CAREER_GOOD",
    title: "올해 직업운: 상승",
    content: "올해 직업운이 상승하는 흐름입니다. 승진이나 새로운 기회가 찾아올 수 있습니다.",
    priority: 90,
  },
  {
    tag: "YEARLY_CAREER_CAUTION",
    title: "올해 직업운: 주의",
    content: "올해 직업에서 변화가 클 수 있습니다. 신중한 판단과 꾸준한 노력이 필요합니다.",
    priority: 80,
  },
  {
    tag: "YEARLY_MONEY_GOOD",
    title: "올해 재물운: 상승",
    content: "올해 재물운이 상승하는 해입니다. 투자나 저축에 유리한 시기입니다.",
    priority: 90,
  },
  {
    tag: "YEARLY_MONEY_CAUTION",
    title: "올해 재물운: 주의",
    content: "올해 재물에서 지출이 늘어날 수 있습니다. 계획적인 소비 관리가 필요합니다.",
    priority: 80,
  },
  {
    tag: "YEARLY_LOVE_GOOD",
    title: "올해 연애운: 상승",
    content: "올해 연애운이 좋은 해입니다. 인연을 만나거나 관계가 깊어질 수 있습니다.",
    priority: 90,
  },
  {
    tag: "YEARLY_LOVE_CAUTION",
    title: "올해 연애운: 주의",
    content: "올해 연애에서 오해가 생길 수 있습니다. 소통을 강화하고 이해심을 발휘하세요.",
    priority: 80,
  },
  {
    tag: "YEARLY_HEALTH_GOOD",
    title: "올해 건강운: 상승",
    content: "올해 건강운이 양호한 해입니다. 규칙적인 생활로 체력이 향상될 수 있습니다.",
    priority: 90,
  },
  {
    tag: "YEARLY_HEALTH_CAUTION",
    title: "올해 건강운: 주의",
    content: "올해 건강에 주의가 필요합니다. 정기 검진과 충분한 휴식을 권합니다.",
    priority: 80,
  },
  {
    tag: "YEARLY_STUDY_GOOD",
    title: "올해 학업운: 상승",
    content: "올해 학업운이 상승하는 해입니다. 새로운 분야를 배우거나 자격 취득에 유리합니다.",
    priority: 90,
  },
  {
    tag: "YEARLY_FAMILY_GOOD",
    title: "올해 가정운: 상승",
    content: "올해 가정운이 화목한 해입니다. 가족과의 시간을 소중히 하세요.",
    priority: 90,
  },
  {
    tag: "YEARLY_FAMILY_CAUTION",
    title: "올해 가정운: 주의",
    content: "올해 가정에서 변화가 있을 수 있습니다. 가족 간 대화를 늘리고 이해를 넓히세요.",
    priority: 80,
  },
  {
    tag: "YEARLY_TRAVEL_GOOD",
    title: "올해 이동운: 상승",
    content: "올해 이동운이 좋은 해입니다. 여행이나 이사, 직장 이동 등에 유리합니다.",
    priority: 90,
  },
  {
    tag: "YEARLY_OVERALL_GOOD",
    title: "올해 전체운: 좋은 흐름",
    content: "올해 전체적으로 좋은 흐름입니다. 자신감을 갖고 적극적으로 도전하세요.",
    priority: 95,
  },
  {
    tag: "YEARLY_OVERALL_CAUTION",
    title: "올해 전체운: 주의 필요",
    content: "올해 전체적으로 주의가 필요한 해입니다. 무리한 도전보다는 안정을 추구하세요.",
    priority: 85,
  },
];
