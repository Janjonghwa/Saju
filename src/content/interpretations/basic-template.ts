export type InterpretationTemplate = {
  tag: string;
  title: string;
  content: string;
  priority: number;
};

export const BASIC_INTERPRETATION_TEMPLATES: InterpretationTemplate[] = [
  {
    tag: "WOOD_STRONG",
    title: "목 기운 강조",
    content: "목(木)의 기운이 강해 확장성과 성장 욕구가 큰 편입니다.",
    priority: 100,
  },
  {
    tag: "FIRE_STRONG",
    title: "화 기운 강조",
    content: "화(火)의 기운이 강해 추진력과 표현력이 두드러집니다.",
    priority: 90,
  },
  {
    tag: "EARTH_STRONG",
    title: "토 기운 강조",
    content: "토(土)의 기운이 강해 안정감과 지속성이 뛰어난 흐름입니다.",
    priority: 80,
  },
  {
    tag: "METAL_STRONG",
    title: "금 기운 강조",
    content: "금(金)의 기운이 강해 판단력과 절제력이 강점으로 나타납니다.",
    priority: 70,
  },
  {
    tag: "WATER_STRONG",
    title: "수 기운 강조",
    content: "수(水)의 기운이 강해 유연성과 직관을 활용한 대응이 유리합니다.",
    priority: 60,
  },
  {
    tag: "GENERAL_BALANCE",
    title: "균형형 구조",
    content: "오행의 치우침이 크지 않아 전반적으로 균형 있는 성향입니다.",
    priority: 10,
  },
  {
    tag: "WOOD_STRONG_CHARACTER",
    title: "목(木)의 기운: 성격",
    content: "성장하려는 의지가 강하며 새로운 일에 도전하는 진취적인 성격입니다.",
    priority: 99,
  },
  {
    tag: "WOOD_STRONG_CAREER",
    title: "목(木)의 기운: 직업",
    content: "기획이나 창작 분야에서 재능을 발휘하며 리더십을 발휘하기 좋습니다.",
    priority: 98,
  },
  {
    tag: "WOOD_STRONG_LOVE",
    title: "목(木)의 기운: 연애",
    content: "솔직하고 열정적인 연애 스타일로 상대에게 헌신적인 면모를 보입니다.",
    priority: 97,
  },
  {
    tag: "WOOD_STRONG_HEALTH",
    title: "목(木)의 기운: 건강",
    content: "간과 눈의 건강에 유의하며 규칙적인 휴식을 취하는 것이 중요합니다.",
    priority: 96,
  },
  {
    tag: "FIRE_STRONG_CHARACTER",
    title: "화(火)의 기운: 성격",
    content: "사교적이고 활동적이며 매사에 자신감이 넘치는 성격이 돋보입니다.",
    priority: 95,
  },
  {
    tag: "FIRE_STRONG_CAREER",
    title: "화(火)의 기운: 직업",
    content: "연설이나 마케팅 등 사람들의 시선을 끄는 직무에서 성과가 뚜렷합니다.",
    priority: 94,
  },
  {
    tag: "FIRE_STRONG_LOVE",
    title: "화(火)의 기운: 연애",
    content: "금방 뜨거워지는 열정적인 사랑을 하며 화려한 로맨스를 선호합니다.",
    priority: 93,
  },
  {
    tag: "FIRE_STRONG_HEALTH",
    title: "화(火)의 기운: 건강",
    content: "심혈관 계통과 스트레스 관리에 신경을 쓰며 충분한 수분을 섭취하세요.",
    priority: 92,
  },
  {
    tag: "EARTH_STRONG_CHARACTER",
    title: "토(土)의 기운: 성격",
    content: "믿음직스럽고 포용력이 있어 주변 사람들의 신뢰를 한몸에 받습니다.",
    priority: 91,
  },
  {
    tag: "EARTH_STRONG_CAREER",
    title: "토(土)의 기운: 직업",
    content: "교육이나 부동산 관리 등 중재하고 조율하는 역할이 적합합니다.",
    priority: 90,
  },
  {
    tag: "EARTH_STRONG_LOVE",
    title: "토(土)의 기운: 연애",
    content: "변치 않는 한결같은 사랑을 지향하며 안정적인 관계를 추구합니다.",
    priority: 89,
  },
  {
    tag: "EARTH_STRONG_HEALTH",
    title: "토(土)의 기운: 건강",
    content: "위장과 소화 기능의 리듬을 잘 유지하고 규칙적인 식단을 권장합니다.",
    priority: 88,
  },
  {
    tag: "METAL_STRONG_CHARACTER",
    title: "금(金)의 기운: 성격",
    content: "공과 사가 분명하며 목표를 향해 나아가는 의지가 확고합니다.",
    priority: 87,
  },
  {
    tag: "METAL_STRONG_CAREER",
    title: "금(金)의 기운: 직업",
    content: "금융이나 기술직 등 정교한 판단이 필요한 업무에서 두각을 나타냅니다.",
    priority: 86,
  },
  {
    tag: "METAL_STRONG_LOVE",
    title: "금(金)의 기운: 연애",
    content: "이성적이고 담백한 연애를 선호하며 상대와의 예의를 중요하게 생각합니다.",
    priority: 85,
  },
  {
    tag: "METAL_STRONG_HEALTH",
    title: "금(金)의 기운: 건강",
    content: "폐와 기관지 건강을 위해 맑은 공기를 마시고 호흡기 관리에 유의하세요.",
    priority: 84,
  },
  {
    tag: "WATER_STRONG_CHARACTER",
    title: "수(水)의 기운: 성격",
    content: "생각이 깊고 지혜로우며 어떤 상황에서도 유연하게 대처하는 능력이 있습니다.",
    priority: 83,
  },
  {
    tag: "WATER_STRONG_CAREER",
    title: "수(水)의 기운: 직업",
    content: "연구나 학술 등 깊이 있는 탐구가 필요한 분야에서 능력을 발휘합니다.",
    priority: 82,
  },
  {
    tag: "WATER_STRONG_LOVE",
    title: "수(水)의 기운: 연애",
    content: "섬세하고 배려 깊은 연애를 하며 정서적인 교감을 최우선으로 합니다.",
    priority: 81,
  },
  {
    tag: "WATER_STRONG_HEALTH",
    title: "수(水)의 기운: 건강",
    content: "신장과 방광 계통의 활력을 유지하고 체온 조절에 각별히 신경 쓰세요.",
    priority: 80,
  },
  {
    tag: "WOOD_FIRE_GENERATION",
    title: "상생: 목생화(木生火)",
    content: "목생화의 흐름으로 창의적인 생각이 실질적인 성과로 이어집니다.",
    priority: 75,
  },
  {
    tag: "FIRE_EARTH_GENERATION",
    title: "상생: 화생토(火生土)",
    content: "화생토의 구조로 추진해온 일들이 점차 안정을 찾고 결실을 맺습니다.",
    priority: 74,
  },
  {
    tag: "EARTH_METAL_GENERATION",
    title: "상생: 토생금(土生金)",
    content: "토생금의 조화로 탄탄한 기초 위에 결단력이 더해져 성장이 가속화됩니다.",
    priority: 73,
  },
  {
    tag: "METAL_WATER_GENERATION",
    title: "상생: 금생수(金生水)",
    content: "금생수의 연결로 냉철한 판단이 유연한 해결책으로 승화되는 시기입니다.",
    priority: 72,
  },
  {
    tag: "WATER_WOOD_GENERATION",
    title: "상생: 수생목(水生木)",
    content: "수생목의 도움으로 충분한 지혜가 바탕이 되어 새로운 기회가 열립니다.",
    priority: 71,
  },
  {
    tag: "WOOD_EARTH_CONFLICT",
    title: "상극: 목극토(木剋土)",
    content: "목극토의 영향으로 지나친 의욕이 안정감을 해칠 수 있으니 주의가 필요합니다.",
    priority: 65,
  },
  {
    tag: "FIRE_METAL_CONFLICT",
    title: "상극: 화극금(火剋金)",
    content: "화극금의 작용으로 서두르는 마음이 정교한 계획을 망칠 우려가 있습니다.",
    priority: 64,
  },
  {
    tag: "EARTH_WATER_CONFLICT",
    title: "상극: 토극수(土剋水)",
    content: "토극수의 조짐으로 과도한 신중함이 유연한 대처를 방해할 수 있습니다.",
    priority: 63,
  },
  {
    tag: "METAL_WOOD_CONFLICT",
    title: "상극: 금극목(金剋木)",
    content: "금극목의 기운으로 예리한 비판이 성장의 동력을 꺾지 않도록 조절하세요.",
    priority: 62,
  },
  {
    tag: "WATER_FIRE_CONFLICT",
    title: "상극: 수극화(水剋火)",
    content: "수극화의 상충으로 감정의 기복이 열정을 가로막지 않도록 평정심을 유지하세요.",
    priority: 61,
  },
];
