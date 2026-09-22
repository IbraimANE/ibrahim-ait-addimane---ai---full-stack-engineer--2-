import { Project, SkillCategory, TimelineItem, Certification } from '../types';

export const portfolioProjects: Project[] = [
  {
    id: 'youtechd-core',
    title: 'YouTechD Core & Industrial Vision AI',
    titleFr: 'YouTechD Core & Vision Industrielle par IA',
    titleAr: 'YouTechD Core ونظم الرؤية الحاسوبية الصناعية',
    description:
      'Flagship industrial AI suite delivering micro-defect identification, surface anomaly screening, and automated alert telemetry for high-speed manufacturing lines using OpenCV and Python.',
    descriptionFr:
      'Suite phare d’IA industrielle pour la détection automatisée des défauts géométriques et micro-fissures sur lignes de production, intégrant OpenCV, Python et alertes temps réel.',
    descriptionAr:
      'المنظومة الرائدة للذكاء الاصطناعي الصناعي لكشف العيوب الميكروية والشروخ السطحية بدقة فائقة مع إرسال تنبيهات لحظية لخطوط الإنتاج السريعة باستخدام OpenCV وPython.',
    category: ['ai', 'industry'],
    badge: 'Flagship Platform',
    badgeFr: 'Plateforme Phare',
    badgeAr: 'المشروع الرائد',
    tags: ['Python', 'OpenCV', 'YOLOv8', 'FastAPI', 'Edge AI'],
    metrics: '99.4% Accuracy • <15ms Latency',
    metricsFr: 'Précision 99.4% • Latence <15ms',
    metricsAr: 'دقة 99.4% • استجابة أقل من 15ms',
    iconType: 'robot',
  },
  {
    id: 'smartprod-supervisor',
    title: 'Superviseur IA (SmartProd & Siemens S7)',
    titleFr: 'Superviseur IA (SmartProd & Automates Siemens S7)',
    titleAr: 'المشرف الذكي (SmartProd ومتحكمات Siemens S7)',
    description:
      'Comprehensive smart factory manager combining multi-camera stream analysis, Siemens Simatic S7-300 PLC telemetry integration, SQL production tracking, and responsive desktop executive dashboard.',
    descriptionFr:
      'Supervision d’usine intelligente couplant flux de caméras, interfaçage avec automates programmables industriels Siemens Simatic S7-300, bases SQL et tableau de bord de production temps réel.',
    descriptionAr:
      'نظام إدارة المصانع الذكية الشامل: تحليل تدفقات الكاميرات، الربط بمتحكمات Siemens Simatic S7-300 الصناعية، وتتبع قواعد بيانات SQL في واجهة مكتبية تفاعلية للمدراء.',
    category: ['industry', 'ai'],
    badge: 'Industry 4.0 & PLC',
    badgeFr: 'Industrie 4.0 & API',
    badgeAr: 'صناعة 4.0 ومتحكمات',
    tags: ['Python', 'Siemens S7-300', 'Computer Vision', 'SQLite', 'Sensors'],
    metrics: 'Real-time PLC & Line Oversight',
    metricsFr: 'Supervision API & Ligne en Temps Réel',
    metricsAr: 'مراقبة خط الإنتاج وPLC لحظياً',
    iconType: 'factory',
  },
  {
    id: 'deroua-service',
    title: 'Deroua Service Platform',
    titleFr: 'Plateforme Deroua Service',
    titleAr: 'منصة دروة سيرفيس (Deroua Service)',
    description:
      'Full-stack local services marketplace connecting Moroccan service technicians with clients. Engineered with Flutter for buttery 60fps mobile experience and reactive PocketBase database synchronization.',
    descriptionFr:
      'Application web et mobile de mise en relation de services de proximité au Maroc. Développée avec Flutter (expérience fluide 60fps) et synchronisation réactive temps réel avec PocketBase.',
    descriptionAr:
      'منصة سوق الخدمات المحلية الرائدة لربط الحرفيين والتقنيين بالزبائن في دروة والدار البيضاء؛ مبنية بـ Flutter بأداء فائق 60fps مع مزامنة لحظية بـ PocketBase.',
    category: ['mobile'],
    badge: 'Cross-Platform App',
    badgeFr: 'App Multiplateforme',
    badgeAr: 'تطبيق متعدد المنصات',
    tags: ['Flutter', 'Dart', 'PocketBase', 'REST APIs', 'State Management'],
    metrics: 'Multi-device Sync • iOS & Android',
    metricsFr: 'Synchronisation Réactive • iOS & Android',
    metricsAr: 'مزامنة متعددة الأجهزة • أندرويد وiOS',
    iconType: 'mobile',
  },
  {
    id: 'aero-plastics-qc',
    title: 'Aeronautical Plastics & GEISS CNC Metrology',
    titleFr: 'Plastiques Aéronautiques & Thermoformeuses GEISS',
    titleAr: 'فحص البلاستيك المخصص للطيران وماكينات GEISS CNC',
    description:
      'Specialized optical inspection pipeline for thermoformed aeronautical plastics processed on high-precision GEISS CNC machinery under strict aerospace quality specifications.',
    descriptionAr:
      'منظومة فحص بصري دقيقة لقطع البلاستيك المخصصة لقطاع صناعة الطيران والتشكيل الحراري على ماكينات GEISS CNC وفق المعايير العالمية الصارمة.',
    descriptionFr:
      'Pipeline de contrôle qualité optique sur pièces thermoformées en plastiques aéronautiques usinées sur thermoformeuses à commande numérique GEISS selon normes aérospatiales strictes.',
    category: ['industry', 'ai'],
    badge: 'Aerospace Plastics',
    badgeFr: 'Plastiques Aéronautiques',
    badgeAr: 'بلاستيك الطيران والميتورولوجيا',
    tags: ['GEISS CNC', 'Aeronautical Plastics', 'OpenCV Metrology', 'ISO Compliance'],
    metrics: 'Aerospace-grade Tolerances',
    metricsFr: 'Normes Aéronautiques Strictes',
    metricsAr: 'مطابقة لمعايير قطاع الطيران',
    iconType: 'gears',
  },
  {
    id: 'devorbit-taskoff',
    title: 'DevOrbit & Taskoff Automation',
    titleFr: 'DevOrbit & Automatisation Taskoff',
    titleAr: 'DevOrbit وأتمتة خطوط الإنتاج البرمجي Taskoff',
    description:
      'Server DevOps architecture, automated code linting/formatting pipelines (ESLint, Prettier), test seed automation, and n8n Docker orchestration pipelines for agile teams.',
    descriptionFr:
      'Architecture serveur DevOps, pipelines d’intégration continue (ESLint, Prettier), génération de jeux de données et flux d’automatisation n8n conteneurisés avec Docker.',
    descriptionAr:
      'بنية خوادم متقدمة مع أتمتة اختبارات الكود وضبط الجودة (ESLint/Prettier)، وتدفقات عمل أوتوماتيكية عبر Docker وn8n لفرق العمل الرقمية السريعة.',
    category: ['industry'],
    badge: 'DevOps & Workflows',
    badgeFr: 'DevOps & Automatisation',
    badgeAr: 'DevOps والأتمتة',
    tags: ['Docker', 'n8n Workflows', 'Node.js', 'CI/CD Pipelines', 'Linux'],
    metrics: 'Automated CI/CD Deployment',
    metricsFr: 'Déploiement Automatisé CI/CD',
    metricsAr: 'نشر أوتوماتيكي متكامل',
    iconType: 'server',
  },
  {
    id: 'isf-digital-hub',
    title: 'Initiatives Sans Frontières IT Hub',
    titleFr: 'Hub Numérique Initiatives Sans Frontières',
    titleAr: 'البنية الرقمية لجمعية مبادرات بلا حدود',
    description:
      'Complete volunteer IT direction: centralizing digital assets, securing communication channels, deploying customized dashboards, and managing IT infrastructure for non-profit field operations.',
    descriptionFr:
      'Direction bénévole du pôle IT : sécurisation des communications, maintenance du parc informatique, et développement d’outils sur mesure (tableaux de bord, applications de gestion).',
    descriptionAr:
      'القيادة التقنية التطوعية للبنية الرقمية: تأمين الاتصالات والبيانات الحساسة، صيانة وتسيير الحظيرة المعلوماتية، وتطوير أدوات ولوحات تحكم مخصصة لتسيير الأنشطة الميدانية.',
    category: ['mobile'],
    badge: 'Civic Technology',
    badgeFr: 'Engagement Solidaire',
    badgeAr: 'حلول رقمية مجتمعية',
    tags: ['Web Systems', 'Databases', 'Process Automation', 'Digital Security'],
    metrics: 'Active Community Platform',
    metricsFr: 'Gestion de Parc & Outils Métiers',
    metricsAr: 'منصة تفاعلية نشطة',
    iconType: 'globe',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-vision',
    title: 'AI & Computer Vision',
    titleFr: 'IA & Vision par Ordinateur',
    titleAr: 'الذكاء الاصطناعي والرؤية الحاسوبية',
    iconName: 'brain',
    color: '#00f0ff',
    skills: [
      {
        name: 'OpenCV & Quality Control Pipelines',
        detail: 'Automated image inspection & defect detection',
        detailFr: 'Contrôle qualité automatisé par analyse d’image',
        detailAr: 'كشف العيوب الميكانيكية واستخلاص الحواف بالرؤية الحاسوبية',
      },
      {
        name: 'YOLOv8 & Deep Neural Nets',
        detail: 'Real-time object classification & bounding boxes',
        detailFr: 'Classification d’objets et détection d’anomalies',
        detailAr: 'تصنيف وتحديد الأجسام بالسرعة الفائقة مع صناديق التأطير',
      },
      {
        name: 'Ollama & Local LLMs',
        detail: 'Private offline LLM orchestration & agents',
        detailFr: 'Déploiement de modèles de langage locaux et souverains',
        detailAr: 'تشغيل ونشر النماذج اللغوية محلياً بأمان تام',
      },
      {
        name: 'Whisper Turbo Audio AI',
        detail: 'Sub-second speech-to-text transcription models',
        detailFr: 'Transcription vocale haute vitesse et haute fidélité',
        detailAr: 'تحويل الصوت إلى نصوص بدقة وسرعة البرق',
      },
      {
        name: 'UI-TARS Agentic Automation',
        detail: 'Autonomous multimodal GUI agent interaction',
        detailFr: 'Automatisation agentique des interfaces logicielles',
        detailAr: 'الأتمتة الذكية لواجهات النظم والتطبيقات',
      },
      {
        name: 'IBM Watson Studio (Certifié)',
        detail: 'Deep learning pipeline training & inference deployment',
        detailFr: 'Modélisation neuronale et exécution de modèles d’IA',
        detailAr: 'بناء وتدريب شبكات التعلم العميق المعتمدة من IBM',
      },
    ],
  },
  {
    id: 'mobile-frontend',
    title: 'Mobile, Web & i18n',
    titleFr: 'Mobile, Web & Internationalisation (i18n)',
    titleAr: 'تطوير الموبايل، الويب والتعريب (i18n)',
    iconName: 'code',
    color: '#ccff00',
    skills: [
      {
        name: 'Flutter & Dart (Cross-Platform)',
        detail: 'Native-speed 60fps mobile & desktop apps',
        detailFr: 'Applications mobiles iOS/Android réactives et fluides',
        detailAr: 'تطبيقات أندرويد وiOS فائقة السلاسة والأداء 60fps',
      },
      {
        name: 'Localisation & i18n',
        detail: 'Multi-lingual RTL/LTR application architecture',
        detailFr: 'Internationalisation d’applications, support RTL/LTR complet',
        detailAr: 'بناء معماريات برمجية تدعم تعدد اللغات واتجاهات RTL/LTR',
      },
      {
        name: 'JavaScript / TypeScript & HTML5/CSS3',
        detail: 'Modern interactive dashboards and modular components',
        detailFr: 'Interfaces dynamiques, code typé et maintenable',
        detailAr: 'واجهات ويب عصرية بشفرات قوية وموثوقة',
      },
      {
        name: 'PHP & Modern Web APIs',
        detail: 'Custom web solutions, REST endpoints, JSON APIs',
        detailFr: 'Conception de plateformes web sur mesure en PHP/SQL/Python',
        detailAr: 'تطوير منصات ويب مخصصة بـ PHP وSQL وPython',
      },
      {
        name: 'Interactive Canvas 2D & Telemetry',
        detail: 'Hardware gauges, laser scanners and edge filters',
        detailFr: 'Visualisation temps réel de données et métrologie',
        detailAr: 'رسوميات تفاعلية واستعراض بيانات الآلات على الشاشات',
      },
    ],
  },
  {
    id: 'backend-cloud',
    title: 'Backend & Reactive Databases',
    titleFr: 'Backend & Bases de Données Réactives',
    titleAr: 'الخوادم وقواعد البيانات التفاعلية',
    iconName: 'database',
    color: '#a855f7',
    skills: [
      {
        name: 'PocketBase (BaaS)',
        detail: 'Real-time SQLite, instant auth & file management',
        detailFr: 'Backend-as-a-Service ultra rapide avec synchronisation temps réel',
        detailAr: 'قاعدة بيانات لحظية تفاعلية مدمجة مع نظام مستخدمين وملفات',
      },
      {
        name: 'Python (FastAPI, Flask, Streamlit)',
        detail: 'High-throughput microservices for AI vision pipelines',
        detailFr: 'Services backend Python légers et ultra véloces pour l’IA',
        detailAr: 'بناء واجهات برمجية صاروخية لخدمات الذكاء الاصطناعي',
      },
      {
        name: 'MySQL, SQLite & Data Modeling',
        detail: 'Relational schemas, queries optimization, transactions',
        detailFr: 'Modélisation relationnelle et optimisation de requêtes SQL',
        detailAr: 'تصميم وبناء قواعد البيانات العلائقية المعقدة والاستعلامات',
      },
      {
        name: 'n8n Workflow Automation',
        detail: 'Low-code / self-hosted webhook integration triggers',
        detailFr: 'Automatisation de processus métiers et intégrations d’APIs',
        detailAr: 'أتمتة سيناريوهات العمل وربط الأنظمة الرقمية بدون تعقيد',
      },
      {
        name: 'Node.js & Express Architecture',
        detail: 'Asynchronous event-driven endpoints & microservices',
        detailFr: 'APIs modulaires, gestion de flux de données asynchrones',
        detailAr: 'خدمات خلفية مصغرة ومعالجة تدفقات البيانات المتزامنة',
      },
    ],
  },
  {
    id: 'industry-devops',
    title: 'Industry 4.0, Aeronautics & Linux',
    titleFr: 'Industrie 4.0, Aéronautique & Linux',
    titleAr: 'الصناعة 4.0، بلاستيك الطيران ونظم Linux',
    iconName: 'factory',
    color: '#10b981',
    skills: [
      {
        name: 'Plastiques Aéronautiques & Thermoformage',
        detail: 'Precision aerospace plastic manufacturing & strict specs',
        detailFr: 'Fabrication sous normes strictes pour l’aéronautique',
        detailAr: 'تصنيع وتشكيل البلاستيك المخصص للطيران وفق المعايير الصارمة',
      },
      {
        name: 'Thermoformeuses GEISS & CNC',
        detail: 'Numerical control setup, parameters tuning, molds calibration',
        detailFr: 'Conduite et paramétrage de thermoformeuses CN GEISS',
        detailAr: 'قيادة وضبط ماكينات التشكيل الحراري الرقمية GEISS والقوالب',
      },
      {
        name: 'Automates Siemens Simatic S7-300',
        detail: 'Industrial programmable logic controllers (PLC) operation',
        detailFr: 'Exploitation d’automates programmables industriels Siemens S7',
        detailAr: 'تشغيل والتعامل مع المتحكمات المنطقية القابلة للبرمجة Siemens S7',
      },
      {
        name: 'Linux Administration (Ubuntu, Kali, LinuxONE)',
        detail: 'Enterprise security, shell scripts & container servers',
        detailFr: 'Administration d’environnements Linux (Ubuntu, Kali, IBM LinuxONE)',
        detailAr: 'إدارة خوادم لينكس الأمنية (Ubuntu, Kali) وخوادم IBM LinuxONE',
      },
      {
        name: 'Git Version Control & CI/CD Pipelines',
        detail: 'Collaborative development, code quality standards',
        detailFr: 'Contrôle de version Git, pipelines d’intégration continue',
        detailAr: 'إدارة الإصدارات بـ Git وضبط جودة الكود البرمجي المستمر',
      },
    ],
  },
];

export const timelineItems: TimelineItem[] = [
  {
    id: 'isf',
    period: 'MARS 2026 - PRESENT',
    periodFr: 'MARS 2026 - PRÉSENT',
    periodAr: 'مارس 2026 - حتى الآن',
    role: 'Responsable Informatique (Engagement Bénévole)',
    roleFr: 'Responsable Informatique (Engagement Bénévole)',
    roleAr: 'مسؤول تكنولوجيا المعلومات (عمل تطوعي)',
    company: 'Association Initiative Sans Frontières',
    companyFr: 'Association Initiative Sans Frontières',
    companyAr: 'جمعية مبادرات بلا حدود (Initiative Sans Frontières)',
    description:
      'Ensuring operational reliability and high security for the full digital infrastructure. Overseeing IT fleet maintenance, engineering custom business applications and dashboards for field coordination, and securing sensitive non-profit communications.',
    descriptionFr:
      'Garant du bon fonctionnement et de la sécurité de l’infrastructure numérique de l’association. Maintenance et supervision du parc informatique, développement d’outils sur-mesure (applications, tableaux de bord) et sécurisation des données sensibles.',
    descriptionAr:
      'ضمان السير الأمثل والأمان الشامل للبنية الرقمية للجمعية: الإشراف على صيانة الحظيرة المعلوماتية، تطوير تطبيقات ولوحات قيادة مخصصة للفرق الميدانية، وتأمين وحفظ البيانات الحساسة.',
    type: 'work',
  },
  {
    id: 'youtechd',
    period: 'DÉCEMBRE 2025 - PRESENT',
    periodFr: 'DÉCEMBRE 2025 - PRÉSENT',
    periodAr: 'ديسمبر 2025 - حتى الآن',
    role: 'Fondateur & Lead Solutions Numériques',
    roleFr: 'Fondateur & Architecte Solutions Numériques',
    roleAr: 'مؤسس YouTechD والمهندس المعماري الرئيسي',
    company: 'YouTechD – Solutions Numériques Innovantes (Daroua)',
    companyFr: 'YouTechD – Solutions Numériques Innovantes (Daroua)',
    companyAr: 'YouTechD – للحلول الرقمية المبتكرة (دروة)',
    description:
      'Founding and leading a technology agency specialized in enterprise digital acceleration. Delivering high-performance Flutter mobile applications, bespoke web platforms (PHP, SQL, Python), and optimizing industrial IT and automation pipelines.',
    descriptionFr:
      'Création et direction d’une agence spécialisée dans l’accompagnement technologique des entreprises. Développement d’applications mobiles Flutter, plateformes web sur mesure (PHP, SQL, Python) et optimisation de systèmes industriels (Automatisme & IT).',
    descriptionAr:
      'تأسيس وإدارة وكالة متخصصة في المرافقة التكنولوجية للشركات: تطوير تطبيقات الهاتف بـ Flutter، منصات ويب متقدمة (PHP, SQL, Python)، وتحسين وصيانة النظم الصناعية (الأتمتة وتكنولوجيا المعلومات).',
    type: 'work',
  },
  {
    id: 'soplami',
    period: 'DÉCEMBRE 2023 - PRESENT',
    periodFr: 'DÉCEMBRE 2023 - PRÉSENT',
    periodAr: 'ديسمبر 2023 - حتى الآن',
    role: "Opérateur d'Usinage & Thermoformage (Plastiques Aéronautiques)",
    roleFr: "Opérateur d'Usinage & Thermoformage (Plastiques Aéronautiques)",
    roleAr: 'تقني تشغيل آلي وتشكيل حراري (بلاستيك الطيران)',
    company: 'SOPLAMI Maroc (Casablanca-Settat)',
    companyFr: 'SOPLAMI Maroc (Casablanca-Settat)',
    companyAr: 'شركة سوبلامي المغرب - SOPLAMI Maroc (الدار البيضاء)',
    description:
      'Precision tuning and startup of plastic injection and thermoforming machines (GEISS CNC machines, Siemens Simatic S7-300 PLCs). Mounting molds, optimizing production variables, tier-1 maintenance, and rigorous ISO/aeronautical quality control on finished parts.',
    descriptionFr:
      'Réglage et démarrage des machines de thermoformage et injection plastique (thermoformeuses GEISS, automates Siemens S7-300). Montage/démontage des moules, optimisation des paramètres de fabrication, maintenance de 1er niveau et contrôle qualité strict des pièces aéronautiques.',
    descriptionAr:
      'ضبط وتشغيل ماكينات التشكيل الحراري والحقن البلاستيكي (ماكينات GEISS CNC، ومتحكمات Siemens Simatic S7-300). تركيب وتعديل القوالب، ضبط معايير الإنتاج، الصيانة الوقائية والمراقبة الصارمة لجودة قطع بلاستيك الطيران المصنعة.',
    type: 'work',
  },
  {
    id: 'hermes',
    period: 'SEPTEMBRE 2019 - SEPTEMBRE 2021',
    periodFr: 'SEPTEMBRE 2019 - SEPTEMBRE 2021',
    periodAr: 'سبتمبر 2019 - سبتمبر 2021',
    role: 'Diplôme Technicien Spécialisé en Développement Informatique',
    roleFr: 'Diplôme Technicien Spécialisé en Développement Informatique',
    roleAr: 'دبلوم تقني متخصص في تطوير البرمجيات',
    company: "Institut Hermès d'Informatique de Gestion (Tanger)",
    companyFr: "Institut Hermès d'Informatique de Gestion (Tanger)",
    companyAr: 'معهد هيرميس لمعلوميات التسيير (طنجة)',
    description:
      'Comprehensive curriculum in computer science: algorithms, relational database modeling (SQL), object-oriented programming (OOP), web architecture, and full application lifecycle development.',
    descriptionFr:
      'Cursus complet en génie logiciel : algorithmique, modélisation de bases de données relationnelles (SQL), programmation orientée objet, architecture web et cycle de vie logiciel.',
    descriptionAr:
      'تكوين أكاديمي مكثف في هندسة البرمجيات، تصميم الخوارزميات، قواعد البيانات SQL، البرمجة الكائنية، ودورة حياة تطوير النظم.',
    type: 'education',
  },
  {
    id: 'ibm-certifications',
    period: 'CERTIFICATIONS OFFICIELLES',
    periodFr: 'CERTIFICATIONS OFFICIELLES',
    periodAr: 'شهادات واعتمادات دولية',
    role: "Certifications IA, Deep Learning, Cyber & Cloud IBM",
    roleFr: "Certifications IA, Deep Learning, Cyber & Cloud IBM",
    roleAr: 'شهادات معتمدة في الذكاء الاصطناعي والأمن السبراني وخوادم Linux',
    company: 'IBM SkillsBuild, IBM, Coursera & EF SET',
    companyFr: 'IBM SkillsBuild, IBM, Coursera & EF SET',
    companyAr: 'IBM SkillsBuild, IBM, Coursera & EF SET',
    description:
      'Certified credentials in Artificial Intelligence fundamentals, Machine Learning & Deep Learning architectures, model deployment on IBM Watson Studio, Cybersecurity fundamentals, NLP & Computer Vision, LinuxONE, and EF SET English C1/B2.',
    descriptionFr:
      'Certifications vérifiées : IA & Deep Learning, Exécution de modèles sur Watson Studio, Cybersécurité, Traitement du langage et vision par ordinateur, Linux on IBM LinuxONE, Développement Web et Anglais B2.',
    descriptionAr:
      'شهادات معتمدة وموثقة: مدخل إلى الذكاء الاصطناعي، التعلم العميق، تشغيل النماذج على Watson Studio، أساسيات الأمن السبراني، معالجة اللغات والرؤية الحاسوبية، إدارة LinuxONE، وتطوير الويب.',
    type: 'cert',
  },
];

export const officialCertifications: Certification[] = [
  {
    id: 'ibm-watson-studio',
    title: "Exécution de modèles d'IA avec IBM Watson Studio",
    titleFr: "Exécution de modèles d'IA avec IBM Watson Studio",
    titleAr: 'تشغيل وبناء نماذج الذكاء الاصطناعي على IBM Watson Studio',
    issuer: 'Student Ambassador Program with IBM SkillsBuild',
    issuerBadge: 'IBM SkillsBuild',
    date: 'Avr. 2025',
    dateFr: 'Avr. 2025',
    dateAr: 'أبريل 2025',
    category: 'ai',
    summary:
      'Training and simulating machine learning and AI model generation inside IBM Watson Studio enterprise environment.',
    summaryFr:
      "S'entraîner à créer un modèle d'apprentissage automatique d'IA dans une série de simulations à l'aide d'IBM Watson Studio.",
    summaryAr:
      'التدريب والمحاكاة على بناء وتدريب ونشر نماذج التعلم الآلي والذكاء الاصطناعي عبر بيئة العمل السحابية IBM Watson Studio.',
    skills: ['IBM Watson Studio', 'Machine Learning', 'Model Simulation', 'Model Deployment', 'Data Science'],
    pdfName: "Certificat Exécution de modèles d'IA avec IBM Watson Studio.pdf",
    verificationStatus: 'Vérifié par IBM SkillsBuild',
  },
  {
    id: 'ibm-cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    titleFr: 'Cybersecurity Fundamentals (Fondamentaux de la Cybersécurité)',
    titleAr: 'أساسيات الأمن السبراني الشامل (Cybersecurity Fundamentals)',
    issuer: 'IBM',
    issuerBadge: 'IBM Official',
    date: 'Avr. 2025',
    dateFr: 'Avr. 2025',
    dateAr: 'أبريل 2025',
    category: 'security',
    summary:
      'Foundational understanding of cybersecurity concepts: threat groups, attack vectors, social engineering, cryptography, defense-in-depth, prevention, detection, and incident response.',
    summaryFr:
      'Compréhension fondamentale de la cybersécurité : groupes de cybermenaces, types d’attaques, ingénierie sociale, cryptographie et stratégies globales de prévention et réponse aux cyberattaques.',
    summaryAr:
      'فهم شامل ومتقدم لأساسيات الأمن السبراني: مجموعات التهديدات، متجهات الهجمات، الهندسة الاجتماعية، التشفير واستراتيجيات الحماية والاستجابة للهجمات.',
    skills: ['Cyber Threat Intel', 'Social Engineering', 'Cryptography', 'Attack Vectors', 'Security Strategies', 'Incident Response'],
    pdfName: 'Cybersecurity Fundamentals.pdf',
    verificationStatus: 'Badge Officiel IBM',
  },
  {
    id: 'ibm-intro-cybersecurity',
    title: 'Introduction à la cybersécurité',
    titleFr: 'Introduction à la cybersécurité',
    titleAr: 'مدخل إلى الأمن السبراني وإدارة المخاطر',
    issuer: 'Student Ambassador Program with IBM SkillsBuild',
    issuerBadge: 'IBM SkillsBuild',
    date: 'Avr. 2025',
    dateFr: 'Avr. 2025',
    dateAr: 'أبريل 2025',
    category: 'security',
    summary:
      'Core principles of cybersecurity, risk management framework, legal and ethical considerations, and mastery of the CIA Triad (Confidentiality, Integrity, Availability).',
    summaryFr:
      'Notions de base de la cybersécurité, objectifs clés, gestion des risques appliquée, enjeux juridiques et éthiques, et maîtrise opérationnelle de la triade CIA.',
    summaryAr:
      'المفاهيم الجوهرية للأمن السبراني: إدارة المخاطر، الاعتبارات الأخلاقية والقانونية، والتحكم في ثلاثية الأمان (السرية، النزاهة، والتوافر CIA Triad).',
    skills: ['Triade CIA', 'Gestion des Risques', 'Éthique & Droit Numérique', 'Sécurité des Systèmes'],
    pdfName: 'Certificat Introduction à la cybersécurité.pdf',
    verificationStatus: 'Vérifié par IBM SkillsBuild',
  },
  {
    id: 'ibm-linuxone',
    title: 'Linux on IBM LinuxONE',
    titleFr: 'Linux on IBM LinuxONE (Administration Systèmes & Mainframes)',
    titleAr: 'نظام لينكس على خوادم ومين فريم IBM LinuxONE',
    issuer: 'Student Ambassador Program with IBM SkillsBuild',
    issuerBadge: 'IBM SkillsBuild',
    date: 'Avr. 2025',
    dateFr: 'Avr. 2025',
    dateAr: 'أبريل 2025',
    category: 'cloud',
    summary:
      'Advanced enterprise Linux administration tailored for IBM LinuxONE mainframe architecture, high-availability deployments, and hardware-software virtualization pipelines.',
    summaryFr:
      'Administration systèmes Linux, architectes et développeurs pour exploiter pleinement la plateforme de calcul et serveurs d’entreprise IBM LinuxONE.',
    summaryAr:
      'إدارة أنظمة Linux المتقدمة لمهندسي النظم والمطورين للعمل على خوادم المؤسسات الضخمة والبنية التحتية الموثوقة IBM LinuxONE.',
    skills: ['Linux Enterprise', 'IBM LinuxONE', 'Mainframe Architecture', 'System Administration', 'Virtualization'],
    pdfName: 'Certificat Linux on IBM LinuxONE.pdf',
    verificationStatus: 'Vérifié par IBM SkillsBuild',
  },
  {
    id: 'ibm-ml-deep-learning',
    title: 'Apprentissage automatique et apprentissage en profondeur',
    titleFr: 'Apprentissage automatique et apprentissage en profondeur',
    titleAr: 'التعلم الآلي والتعلم العميق والشبكات العصبونية',
    issuer: 'Student Ambassador Program with IBM SkillsBuild',
    issuerBadge: 'IBM SkillsBuild',
    date: 'Avr. 2025',
    dateFr: 'Avr. 2025',
    dateAr: 'أبريل 2025',
    category: 'ai',
    summary:
      'Supervised, unsupervised, and reinforcement learning; decision trees, logistic regression; biological neural networks inspiration, and perceptron information flow.',
    summaryFr:
      'Apprentissage supervisé, non supervisé et par renforcement ; arbres de décision, régression linéaire et logistique ; réseaux de neurones et flux d’informations dans les nœuds d’un perceptron.',
    summaryAr:
      'التعلم الخاضع وغير الخاضع للإشراف، التعلم المعزز، أشجار القرار، الانحدار اللوجستي، والشبكات العصبونية وتدفق البيانات عبر خلايا البيرسبترون.',
    skills: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Perceptron', 'Decision Trees', 'Regression Models'],
    pdfName: 'Certificat Apprentissage automatique et apprentissage en profondeur.pdf',
    verificationStatus: 'Vérifié par IBM SkillsBuild',
  },
  {
    id: 'ibm-nlp-computer-vision',
    title: 'Traitement automatique du langage naturel et vision par ordinateur',
    titleFr: 'Traitement automatique du langage naturel et vision par ordinateur',
    titleAr: 'معالجة اللغات الطبيعية (NLP) والرؤية الحاسوبية بالذكاء الاصطناعي',
    issuer: 'Student Ambassador Program with IBM SkillsBuild',
    issuerBadge: 'IBM SkillsBuild',
    date: 'Mars 2025',
    dateFr: 'Mars 2025',
    dateAr: 'مارس 2025',
    category: 'ai',
    summary:
      'Theoretical foundations and real-world implementations of NLP and Computer Vision powering conversational agents and automated image inspection.',
    summaryFr:
      'Théorie du traitement du langage naturel et de la vision artificielle : comment les systèmes comprennent le langage, identifient des images et alimentent des chatbots et l’analyse de photos.',
    summaryAr:
      'الأسس النظرية والتطبيقية لمعالجة اللغات الطبيعية والرؤية الاصطناعية: كيف تفهم الأنظمة لغة البشر، وتتعرف على الصور بدقة عالية لتحليل الصور والمحادثات.',
    skills: ['Computer Vision', 'NLP', 'Image Recognition', 'Conversational AI', 'Automated Photo Inspection'],
    pdfName: 'certificat Traitement automatique du langage naturel et vision par ordinateur.pdf',
    verificationStatus: 'Vérifié par IBM SkillsBuild',
  },
  {
    id: 'ibm-intro-ai',
    title: "Introduction à l'intelligence artificielle",
    titleFr: "Introduction à l'intelligence artificielle",
    titleAr: 'مدخل إلى الذكاء الاصطناعي وتحليل البيانات غير المنظمة',
    issuer: 'Student Ambassador Program with IBM SkillsBuild',
    issuerBadge: 'IBM SkillsBuild',
    date: 'Mars 2025',
    dateFr: 'Mars 2025',
    dateAr: 'مارس 2025',
    category: 'ai',
    summary:
      'Historical trajectory across 3 waves of AI development, unstructured data insights, and autonomous learning algorithms.',
    summaryFr:
      'Histoire de l’IA à travers ses 3 vagues de développement transformateur, exploration des données non structurées et apprentissage autonome sans intervention humaine.',
    summaryAr:
      'تاريخ الذكاء الاصطناعي عبر موجاته التحولية الثلاث، استكشاف البيانات غير المنظمة، وخوارزميات التعلم الذاتي.',
    skills: ['Artificial Intelligence', 'Unstructured Data', 'AI History & Evolution', 'Predictive Analysis'],
    pdfName: 'Certificat de fin de formation _ SkillsBuild.pdf',
    verificationStatus: 'Vérifié par IBM SkillsBuild',
  },
  {
    id: 'ibm-web-development',
    title: 'Développement de sites pour le Web',
    titleFr: 'Développement de sites pour le Web',
    titleAr: 'تطوير مواقع الويب ومنهجيات Agile الحديثة',
    issuer: 'Student Ambassador Program with IBM SkillsBuild',
    issuerBadge: 'IBM SkillsBuild',
    date: 'Mars 2025',
    dateFr: 'Mars 2025',
    dateAr: 'مارس 2025',
    category: 'web',
    summary:
      'Web application architecture, HTML, CSS, JavaScript evolution, complete software development lifecycle, and Agile workflow methodologies.',
    summaryFr:
      'Conception de sites Web, langages fondamentaux (HTML, CSS, JavaScript), cycle de développement logiciel complet et intégration des démarches Agiles.',
    summaryAr:
      'بناء وتطوير مواقع الويب، لغات الواجهات الحديثة (HTML/CSS/JS)، دورة حياة البرمجيات الكاملة وتطبيقات منهجية Agile.',
    skills: ['HTML5 / CSS3', 'JavaScript', 'Agile Methodology', 'Software Development Lifecycle', 'Web Standards'],
    pdfName: 'Completion Certificate _ SkillsBuild.pdf',
    verificationStatus: 'Vérifié par IBM SkillsBuild',
  },
  {
    id: 'coursera-wordpress',
    title: 'Build a free website with WordPress',
    titleFr: 'Build a free website with WordPress',
    titleAr: 'بناء وتخصيص مواقع الويب بواسطة WordPress',
    issuer: 'Coursera',
    issuerBadge: 'Coursera Project Network',
    date: 'Déc. 2024',
    dateFr: 'Déc. 2024',
    dateAr: 'ديسمبر 2024',
    category: 'web',
    summary:
      'Design, architecture, and deployment of responsive CMS-based websites using WordPress platform.',
    summaryFr:
      'Conception, structuration, personnalisation de thèmes et mise en ligne de sites Web administrables via le CMS WordPress.',
    summaryAr:
      'تصميم وبناء ونشر مواقع الويب التفاعلية عبر منصة إدارة المحتوى WordPress.',
    skills: ['WordPress', 'CMS Architecture', 'Theme Customization', 'Web Publishing'],
    pdfName: 'Build a free website with WordPress',
    verificationStatus: 'Certifié Coursera',
  },
  {
    id: 'efset-english-b2',
    title: 'EF SET English Certificate 54/100 (B2 Upper Intermediate)',
    titleFr: 'EF SET English Certificate 54/100 (B2 Upper Intermediate)',
    titleAr: 'شهادة إتقان اللغة الإنجليزية EF SET بدرجة 54/100 (مستوى B2)',
    issuer: 'EF SET (Standard English Test)',
    issuerBadge: 'EF SET International',
    date: 'Août 2024',
    dateFr: 'Août 2024',
    dateAr: 'أغسطس 2024',
    category: 'lang',
    summary:
      'Official EF SET score 54/100 certifying CEFR B2 Upper Intermediate international communication and technical fluency.',
    summaryFr:
      'Score officiel EF SET 54/100 certifiant le niveau B2 Avancé (Upper Intermediate) selon le CECRL pour la communication professionnelle et technique.',
    summaryAr:
      'شهادة دولية رسمية بدرجة 54/100 تؤكد مستوى B2 المتقدم للتواصل المهني والتقني باللغة الإنجليزية في بيئات العمل الدولية.',
    skills: ['English B2 Upper Intermediate', 'International Communication', 'Technical English', 'CEFR Standard'],
    pdfName: 'EF SET English Certificate 54/100 (B2)',
    verificationStatus: 'Certifié International EF SET',
  },
];
