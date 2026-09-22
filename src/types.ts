export type Language = 'en' | 'fr' | 'ar';

export type ProjectCategory = 'all' | 'ai' | 'mobile' | 'industry';

export interface Project {
  id: string;
  title: string;
  titleFr: string;
  titleAr: string;
  description: string;
  descriptionFr: string;
  descriptionAr: string;
  category: ('ai' | 'mobile' | 'industry')[];
  badge: string;
  badgeFr: string;
  badgeAr: string;
  tags: string[];
  metrics: string;
  metricsFr: string;
  metricsAr: string;
  iconType: 'robot' | 'factory' | 'mobile' | 'server' | 'globe' | 'gears';
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  titleFr: string;
  titleAr: string;
  iconName: 'brain' | 'code' | 'database' | 'factory';
  color: string;
  skills: {
    name: string;
    detail: string;
    detailFr: string;
    detailAr: string;
  }[];
}

export interface TimelineItem {
  id: string;
  period: string;
  periodFr: string;
  periodAr: string;
  role: string;
  roleFr: string;
  roleAr: string;
  company: string;
  companyFr: string;
  companyAr: string;
  description: string;
  descriptionFr: string;
  descriptionAr: string;
  type: 'work' | 'education' | 'cert';
}

export interface InspectionTelemetry {
  status: 'PASS' | 'REJECT';
  latency: number;
  confidence: number;
  defectsCount: number;
  batchNumber: string;
  lastScannedObject: string;
}

export interface Certification {
  id: string;
  title: string;
  titleFr: string;
  titleAr: string;
  issuer: string;
  issuerBadge: string;
  date: string;
  dateFr: string;
  dateAr: string;
  category: 'ai' | 'security' | 'cloud' | 'web' | 'lang';
  summary: string;
  summaryFr: string;
  summaryAr: string;
  skills: string[];
  pdfName: string;
  verificationStatus: string;
}
