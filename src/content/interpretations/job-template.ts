export type InterpretationTemplate = {
  tag: string;
  title: string;
  content: string;
  priority: number;
};

export const JOB_INTERPRETATION_TEMPLATES: InterpretationTemplate[] = [
  {
    tag: "JOB_WOOD_SUITABLE",
    title: "취업운: 목 기운 직업 적합",
    content: "목(木)의 기운이 강해 교육, 출판, 환경 관련 직업이 적합합니다. 성장과 확장을 추구하세요.",
    priority: 90,
  },
  {
    tag: "JOB_FIRE_SUITABLE",
    title: "취업운: 화 기운 직업 적합",
    content: "화(火)의 기운이 강해 엔터테인먼트, 요식업, 마케팅 관련 직업이 적합합니다.",
    priority: 90,
  },
  {
    tag: "JOB_EARTH_SUITABLE",
    title: "취업운: 토 기운 직업 적합",
    content: "토(土)의 기운이 강해 부동산, 농업, 건설 관련 직업이 적합합니다. 안정성을 추구하세요.",
    priority: 90,
  },
  {
    tag: "JOB_METAL_SUITABLE",
    title: "취업운: 금 기운 직업 적합",
    content: "금(金)의 기운이 강해 금융, IT, 법률 관련 직업이 적합합니다. 정확성과 전문성을 살리세요.",
    priority: 90,
  },
  {
    tag: "JOB_WATER_SUITABLE",
    title: "취업운: 수 기운 직업 적합",
    content: "수(水)의 기운이 강해 연구, 물류, 무역 관련 직업이 적합합니다. 유연한 사고를 활용하세요.",
    priority: 90,
  },
  {
    tag: "JOB_LEADERSHIP",
    title: "취업운: 리더십 적성",
    content: "리더십과 관리 능력이 뛰어납니다. 관리직이나 팀 리더 역할에 적합합니다.",
    priority: 85,
  },
  {
    tag: "JOB_CREATIVITY",
    title: "취업운: 창작/예술 적성",
    content: "창의력이 풍부하여 예술, 디자인, 콘텐츠 제작 분야에서 재능을 발휘합니다.",
    priority: 85,
  },
  {
    tag: "JOB_ANALYSIS",
    title: "취업운: 분석/기획 적성",
    content: "분석력과 기획력이 뛰어납니다. 데이터 분석, 전략 기획, 컨설팅 분야에 적합합니다.",
    priority: 85,
  },
  {
    tag: "JOB_COMMUNICATION",
    title: "취업운: 소통/대인관계 적성",
    content: "대인관계 능력이 뛰어납니다. 영업, 상담, 교육, 서비스 분야에서 강점을 발휘합니다.",
    priority: 85,
  },
  {
    tag: "JOB_TECHNICAL",
    title: "취업운: 기술/전문 분야 적성",
    content: "기술적 전문성이 강합니다. 엔지니어링, 개발, 의료 등 전문 분야에 적합합니다.",
    priority: 85,
  },
  {
    tag: "JOB_BUSINESS_GOOD",
    title: "취업운: 사업운 양호",
    content: "사업운이 좋은 흐름입니다. 창업이나 독립적인 활동에 유리한 시기입니다.",
    priority: 80,
  },
  {
    tag: "JOB_BUSINESS_CAUTION",
    title: "취업운: 사업 시 주의",
    content: "사업에서 리스크가 있을 수 있습니다. 충분한 준비와 검토 후 시작하세요.",
    priority: 70,
  },
  {
    tag: "JOB_CHANGE_GOOD",
    title: "취업운: 직업 변동 유리",
    content: "직업 변동이 좋은 방향으로 이어질 수 있습니다. 새로운 도전을 고려해보세요.",
    priority: 80,
  },
  {
    tag: "JOB_CHANGE_CAUTION",
    title: "취업운: 직업 변동 주의",
    content: "직업 변동 시 서두르지 마세요. 현재 위치에서 성장을 먼저 시도하세요.",
    priority: 70,
  },
  {
    tag: "JOB_PROMOTION",
    title: "취업운: 승진/승급운",
    content: "승진이나 승급의 기회가 있을 수 있습니다. 성실한 노력이 보상받는 시기입니다.",
    priority: 85,
  },
  {
    tag: "JOB_TEAMWORK",
    title: "취업운: 팀워크/협업",
    content: "팀워크와 협업 능력이 뛰어납니다. 함께 일하는 환경에서 성과가 극대화됩니다.",
    priority: 80,
  },
];
