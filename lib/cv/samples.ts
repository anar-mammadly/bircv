import { CVData } from '@/app/types/cv';
import { DEMO_CV_AZ, DEMO_CV_EN } from '@/lib/cv/demo';

export type SampleId = 'qa' | 'backend' | 'devops' | 'marketing' | 'sales';

export interface SampleProfile {
  id: SampleId;
  /** thumbnail shown in the picker card — same photo used inside the CV data below */
  photo: string;
  data: { az: CVData; en: CVData };
}

const BACKEND_PHOTO = '/images/samples/backend.jpg';
const DEVOPS_PHOTO = '/images/samples/devops.jpg';
const MARKETING_PHOTO = '/images/samples/marketing.jpg';
const SALES_PHOTO = '/images/samples/sales.jpg';

const BACKEND_AZ: CVData = {
  personal: {
    firstName: 'Nigar', lastName: 'Vəliyeva', email: 'nigar.veliyeva@gmail.com',
    phone: '+994 55 234 56 78', city: 'Bakı', country: 'Azərbaycan',
    jobTitle: 'Backend Proqramçı', photo: BACKEND_PHOTO,
    linkedin: 'linkedin.com/in/nigarvaliyeva',
    summary: 'Node.js və PostgreSQL üzrə 4+ illik təcrübəli backend proqramçı. Yüksək yüklənmiş API-lar qurur, sistemin cavab müddətini azaldır və komandanı mikroservis arxitekturasına keçidə istiqamətləndirir.',
  },
  experience: [
    { id: 'e1', jobTitle: 'Baş Backend Proqramçı', company: 'NovaTech Systems', city: 'Bakı', country: 'Azərbaycan', startMonth: '2', startYear: '2022', endMonth: '', endYear: '', current: true,
      description: '• 50 000+ gündəlik istifadəçini dəstəkləyən mikroservis arxitekturası qurdu\n• PostgreSQL sorğularını optimallaşdıraraq API cavab müddətini 40% azaltdı\n• 3 kiçik proqramçıya mentorluq etdi və kod review prosesini tətbiq etdi' },
    { id: 'e2', jobTitle: 'Backend Proqramçı', company: 'CloudBridge Solutions', city: 'Bakı', country: 'Azərbaycan', startMonth: '4', startYear: '2020', endMonth: '1', endYear: '2022', current: false,
      description: '• Node.js və Express əsasında REST API-ların dizaynı və inkişafı\n• Redis ilə keşləmə tətbiq edərək server yükünü azaltdı' },
    { id: 'e3', jobTitle: 'Kiçik Backend Proqramçı', company: 'PixelForge Studio', city: 'Bakı', country: 'Azərbaycan', startMonth: '9', startYear: '2019', endMonth: '3', endYear: '2020', current: false,
      description: '• Daxili admin panel üçün backend funksionallığı yazdı\n• Unit testlərin əhatə dairəsini 60%-ə çatdırdı' },
  ],
  education: [
    { id: 'edu1', institutionType: 'university' as const, institutionTypeCustom: '', school: 'ADA Universiteti', degree: 'Kompüter Elmləri, Bakalavr', educationLevel: 'Bakalavr', city: 'Bakı', country: 'Azərbaycan', startYear: '2015', endYear: '2019' },
  ],
  skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'REST API', 'Microservices', 'TypeScript', 'Git'],
  languages: [
    { id: 'l1', name: 'Azərbaycan dili', level: 'Ana dili' },
    { id: 'l2', name: 'İngilis dili', level: 'B2' },
    { id: 'l3', name: 'Rus dili', level: 'B1' },
  ],
  certificates: [
    { id: 'c1', name: 'AWS Certified Developer – Associate', issuer: 'Amazon', year: '2022' },
    { id: 'c2', name: 'Node.js Application Development', issuer: 'Udemy', year: '2021' },
  ],
  trainings: [
    { id: 't1', name: 'Backend Development Bootcamp', provider: 'Narix Academy', year: '2019', description: 'Node.js, Express, PostgreSQL' },
  ],
  additional: 'GitHub: github.com/nigarvaliyeva',
};

const BACKEND_EN: CVData = {
  personal: {
    firstName: 'Nigar', lastName: 'Valiyeva', email: 'nigar.valiyeva@gmail.com',
    phone: '+994 55 234 56 78', city: 'Baku', country: 'Azerbaijan',
    jobTitle: 'Backend Developer', photo: BACKEND_PHOTO,
    linkedin: 'linkedin.com/in/nigarvaliyeva',
    summary: 'Backend developer with 4+ years of experience in Node.js and PostgreSQL. Builds high-traffic APIs, reduces response times, and guides teams through the move to microservices.',
  },
  experience: [
    { id: 'e1', jobTitle: 'Senior Backend Developer', company: 'NovaTech Systems', city: 'Baku', country: 'Azerbaijan', startMonth: '2', startYear: '2022', endMonth: '', endYear: '', current: true,
      description: '• Built a microservice architecture supporting 50,000+ daily users\n• Optimised PostgreSQL queries, cutting API response time by 40%\n• Mentored 3 junior developers and introduced a code review process' },
    { id: 'e2', jobTitle: 'Backend Developer', company: 'CloudBridge Solutions', city: 'Baku', country: 'Azerbaijan', startMonth: '4', startYear: '2020', endMonth: '1', endYear: '2022', current: false,
      description: '• Designed and built REST APIs with Node.js and Express\n• Introduced Redis caching, reducing server load' },
    { id: 'e3', jobTitle: 'Junior Backend Developer', company: 'PixelForge Studio', city: 'Baku', country: 'Azerbaijan', startMonth: '9', startYear: '2019', endMonth: '3', endYear: '2020', current: false,
      description: '• Wrote backend functionality for an internal admin panel\n• Raised unit test coverage to 60%' },
  ],
  education: [
    { id: 'edu1', institutionType: 'university' as const, institutionTypeCustom: '', school: 'ADA University', degree: "Computer Science, Bachelor's", educationLevel: 'Bachelor', city: 'Baku', country: 'Azerbaijan', startYear: '2015', endYear: '2019' },
  ],
  skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'REST API', 'Microservices', 'TypeScript', 'Git'],
  languages: [
    { id: 'l1', name: 'Azerbaijani', level: 'Native' },
    { id: 'l2', name: 'English', level: 'B2' },
    { id: 'l3', name: 'Russian', level: 'B1' },
  ],
  certificates: [
    { id: 'c1', name: 'AWS Certified Developer – Associate', issuer: 'Amazon', year: '2022' },
    { id: 'c2', name: 'Node.js Application Development', issuer: 'Udemy', year: '2021' },
  ],
  trainings: [
    { id: 't1', name: 'Backend Development Bootcamp', provider: 'Narix Academy', year: '2019', description: 'Node.js, Express, PostgreSQL' },
  ],
  additional: 'GitHub: github.com/nigarvaliyeva',
};

const DEVOPS_AZ: CVData = {
  personal: {
    firstName: 'Ruslan', lastName: 'Əliyev', email: 'ruslan.aliyev@gmail.com',
    phone: '+994 50 345 67 89', city: 'Bakı', country: 'Azərbaycan',
    jobTitle: 'DevOps Mühəndisi', photo: DEVOPS_PHOTO,
    linkedin: 'linkedin.com/in/ruslanaliyev',
    summary: 'AWS və Kubernetes üzrə 5+ illik təcrübəli DevOps mühəndisi. CI/CD pipeline-larını avtomatlaşdıraraq deployment vaxtını azaldıb, infrastrukturun etibarlılığını və miqyaslana bilməsini təmin edir.',
  },
  experience: [
    { id: 'e1', jobTitle: 'Baş DevOps Mühəndisi', company: 'Vertex Analytics', city: 'Bakı', country: 'Azərbaycan', startMonth: '5', startYear: '2022', endMonth: '', endYear: '', current: true,
      description: '• Kubernetes klasterini idarə edərək 99.9% uptime təmin etdi\n• Terraform ilə infrastrukturu kod kimi (IaC) təşkil etdi\n• CI/CD pipeline-larını sürətləndirərək deployment vaxtını 70% azaltdı' },
    { id: 'e2', jobTitle: 'DevOps Mühəndisi', company: 'Silkway Logistics', city: 'Bakı', country: 'Azərbaycan', startMonth: '3', startYear: '2020', endMonth: '4', endYear: '2022', current: false,
      description: '• Docker konteynerləşdirməsinə keçid edərək server sayını 30% azaltdı\n• Prometheus və Grafana ilə monitorinq sistemi qurdu' },
    { id: 'e3', jobTitle: 'Sistem Administratoru', company: 'BrightWave Digital', city: 'Bakı', country: 'Azərbaycan', startMonth: '6', startYear: '2018', endMonth: '2', endYear: '2020', current: false,
      description: '• Linux serverlərinin idarə edilməsi və avtomatlaşdırılmış backup sistemi qurdu' },
  ],
  education: [
    { id: 'edu1', institutionType: 'university' as const, institutionTypeCustom: '', school: 'ADA Universiteti', degree: 'İnformasiya Texnologiyaları, Bakalavr', educationLevel: 'Bakalavr', city: 'Bakı', country: 'Azərbaycan', startYear: '2014', endYear: '2018' },
  ],
  skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux', 'Prometheus', 'Python'],
  languages: [
    { id: 'l1', name: 'Azərbaycan dili', level: 'Ana dili' },
    { id: 'l2', name: 'İngilis dili', level: 'C1' },
    { id: 'l3', name: 'Rus dili', level: 'B1' },
  ],
  certificates: [
    { id: 'c1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon', year: '2023' },
    { id: 'c2', name: 'Certified Kubernetes Administrator', issuer: 'CNCF', year: '2022' },
  ],
  trainings: [
    { id: 't1', name: 'DevOps Engineering Bootcamp', provider: 'Narix Academy', year: '2018', description: 'Docker, Kubernetes, CI/CD' },
  ],
  additional: 'GitHub: github.com/ruslanaliyev',
};

const DEVOPS_EN: CVData = {
  personal: {
    firstName: 'Ruslan', lastName: 'Aliyev', email: 'ruslan.aliyev@gmail.com',
    phone: '+994 50 345 67 89', city: 'Baku', country: 'Azerbaijan',
    jobTitle: 'DevOps Engineer', photo: DEVOPS_PHOTO,
    linkedin: 'linkedin.com/in/ruslanaliyev',
    summary: 'DevOps engineer with 5+ years of experience in AWS and Kubernetes. Automates CI/CD pipelines to cut deployment time while keeping infrastructure reliable and scalable.',
  },
  experience: [
    { id: 'e1', jobTitle: 'Senior DevOps Engineer', company: 'Vertex Analytics', city: 'Baku', country: 'Azerbaijan', startMonth: '5', startYear: '2022', endMonth: '', endYear: '', current: true,
      description: '• Ran a Kubernetes cluster maintaining 99.9% uptime\n• Managed infrastructure as code with Terraform\n• Sped up CI/CD pipelines, cutting deployment time by 70%' },
    { id: 'e2', jobTitle: 'DevOps Engineer', company: 'Silkway Logistics', city: 'Baku', country: 'Azerbaijan', startMonth: '3', startYear: '2020', endMonth: '4', endYear: '2022', current: false,
      description: '• Migrated services to Docker, reducing the server footprint by 30%\n• Built a monitoring stack with Prometheus and Grafana' },
    { id: 'e3', jobTitle: 'System Administrator', company: 'BrightWave Digital', city: 'Baku', country: 'Azerbaijan', startMonth: '6', startYear: '2018', endMonth: '2', endYear: '2020', current: false,
      description: '• Managed Linux servers and built an automated backup system' },
  ],
  education: [
    { id: 'edu1', institutionType: 'university' as const, institutionTypeCustom: '', school: 'ADA University', degree: "Information Technology, Bachelor's", educationLevel: 'Bachelor', city: 'Baku', country: 'Azerbaijan', startYear: '2014', endYear: '2018' },
  ],
  skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux', 'Prometheus', 'Python'],
  languages: [
    { id: 'l1', name: 'Azerbaijani', level: 'Native' },
    { id: 'l2', name: 'English', level: 'C1' },
    { id: 'l3', name: 'Russian', level: 'B1' },
  ],
  certificates: [
    { id: 'c1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon', year: '2023' },
    { id: 'c2', name: 'Certified Kubernetes Administrator', issuer: 'CNCF', year: '2022' },
  ],
  trainings: [
    { id: 't1', name: 'DevOps Engineering Bootcamp', provider: 'Narix Academy', year: '2018', description: 'Docker, Kubernetes, CI/CD' },
  ],
  additional: 'GitHub: github.com/ruslanaliyev',
};

const MARKETING_AZ: CVData = {
  personal: {
    firstName: 'Emil', lastName: 'Əhmədzadə', email: 'emil.ahmadzade@gmail.com',
    phone: '+994 55 456 78 90', city: 'Bakı', country: 'Azərbaycan',
    jobTitle: 'Marketinq Mütəxəssisi', photo: MARKETING_PHOTO,
    linkedin: 'linkedin.com/in/emilahmadzade',
    summary: 'Rəqəmsal marketinq üzrə 4+ illik təcrübəli mütəxəssis. Sosial media kampaniyaları və performans marketinqi ilə brend tanınırlığını və satışları artırır.',
  },
  experience: [
    { id: 'e1', jobTitle: 'Baş Marketinq Mütəxəssisi', company: 'Meridian Retail Group', city: 'Bakı', country: 'Azərbaycan', startMonth: '1', startYear: '2022', endMonth: '', endYear: '', current: true,
      description: '• Rəqəmsal kampaniyalar vasitəsilə onlayn satışı 45% artırdı\n• Instagram və Facebook reklam büdcəsini idarə edərək ROI-ni 2 dəfə yüksəltdi\n• 3 nəfərlik kreativ komandaya rəhbərlik etdi' },
    { id: 'e2', jobTitle: 'Marketinq Mütəxəssisi', company: 'Bravo Supermarket', city: 'Bakı', country: 'Azərbaycan', startMonth: '2', startYear: '2020', endMonth: '12', endYear: '2021', current: false,
      description: '• E-poçt marketinq kampaniyaları hazırlayaraq abunəçi sayını 3 dəfə artırdı\n• Rəqabət analizi əsasında yeni məhsul mövqeləndirmə strategiyası hazırladı' },
    { id: 'e3', jobTitle: 'Marketinq Assistenti', company: 'Zirvə Bank', city: 'Bakı', country: 'Azərbaycan', startMonth: '9', startYear: '2019', endMonth: '1', endYear: '2020', current: false,
      description: '• Sosial media hesablarının gündəlik idarəsi və məzmun planlaması' },
  ],
  education: [
    { id: 'edu1', institutionType: 'university' as const, institutionTypeCustom: '', school: 'Bakı Dövlət Universiteti', degree: 'Marketinq, Bakalavr', educationLevel: 'Bakalavr', city: 'Bakı', country: 'Azərbaycan', startYear: '2015', endYear: '2019' },
  ],
  skills: ['Rəqəmsal Marketinq', 'SEO', 'Google Ads', 'Meta Ads', 'Kontent Strategiyası', 'Analitika', 'E-poçt Marketinqi'],
  languages: [
    { id: 'l1', name: 'Azərbaycan dili', level: 'Ana dili' },
    { id: 'l2', name: 'İngilis dili', level: 'B2' },
    { id: 'l3', name: 'Türk dili', level: 'B1' },
  ],
  certificates: [
    { id: 'c1', name: 'Google Ads Certification', issuer: 'Google', year: '2023' },
    { id: 'c2', name: 'Meta Certified Digital Marketing Associate', issuer: 'Meta', year: '2022' },
  ],
  trainings: [
    { id: 't1', name: 'Digital Marketing Bootcamp', provider: 'Narix Academy', year: '2019', description: 'SEO, SEM, Sosial Media' },
  ],
  additional: 'Portfolio: behance.net/emilahmadzade',
};

const MARKETING_EN: CVData = {
  personal: {
    firstName: 'Emil', lastName: 'Ahmadzade', email: 'emil.ahmadzade@gmail.com',
    phone: '+994 55 456 78 90', city: 'Baku', country: 'Azerbaijan',
    jobTitle: 'Marketing Specialist', photo: MARKETING_PHOTO,
    linkedin: 'linkedin.com/in/emilahmadzade',
    summary: 'Digital marketing specialist with 4+ years of experience. Grows brand awareness and sales through social media campaigns and performance marketing.',
  },
  experience: [
    { id: 'e1', jobTitle: 'Senior Marketing Specialist', company: 'Meridian Retail Group', city: 'Baku', country: 'Azerbaijan', startMonth: '1', startYear: '2022', endMonth: '', endYear: '', current: true,
      description: '• Grew online sales by 45% through digital campaigns\n• Managed the Instagram and Facebook ad budget, doubling ROI\n• Led a creative team of 3' },
    { id: 'e2', jobTitle: 'Marketing Specialist', company: 'Bravo Supermarket', city: 'Baku', country: 'Azerbaijan', startMonth: '2', startYear: '2020', endMonth: '12', endYear: '2021', current: false,
      description: '• Built email campaigns that tripled the subscriber base\n• Shaped a new product positioning strategy from competitor analysis' },
    { id: 'e3', jobTitle: 'Marketing Assistant', company: 'Zirvə Bank', city: 'Baku', country: 'Azerbaijan', startMonth: '9', startYear: '2019', endMonth: '1', endYear: '2020', current: false,
      description: '• Ran day-to-day social media accounts and content planning' },
  ],
  education: [
    { id: 'edu1', institutionType: 'university' as const, institutionTypeCustom: '', school: 'Baku State University', degree: "Marketing, Bachelor's", educationLevel: 'Bachelor', city: 'Baku', country: 'Azerbaijan', startYear: '2015', endYear: '2019' },
  ],
  skills: ['Digital Marketing', 'SEO', 'Google Ads', 'Meta Ads', 'Content Strategy', 'Analytics', 'Email Marketing'],
  languages: [
    { id: 'l1', name: 'Azerbaijani', level: 'Native' },
    { id: 'l2', name: 'English', level: 'B2' },
    { id: 'l3', name: 'Turkish', level: 'B1' },
  ],
  certificates: [
    { id: 'c1', name: 'Google Ads Certification', issuer: 'Google', year: '2023' },
    { id: 'c2', name: 'Meta Certified Digital Marketing Associate', issuer: 'Meta', year: '2022' },
  ],
  trainings: [
    { id: 't1', name: 'Digital Marketing Bootcamp', provider: 'Narix Academy', year: '2019', description: 'SEO, SEM, Social Media' },
  ],
  additional: 'Portfolio: behance.net/emilahmadzade',
};

const SALES_AZ: CVData = {
  personal: {
    firstName: 'Elnur', lastName: 'Allazov', email: 'elnur.allazov@gmail.com',
    phone: '+994 50 567 89 01', city: 'Bakı', country: 'Azərbaycan',
    jobTitle: 'Satış Mütəxəssisi', photo: SALES_PHOTO,
    linkedin: 'linkedin.com/in/elnurallazov',
    summary: 'B2B satış üzrə 5+ illik təcrübəli mütəxəssis. Yeni bazarların açılması və müştəri portfelinin genişləndirilməsi ilə illik satış hədəflərini davamlı olaraq aşır.',
  },
  experience: [
    { id: 'e1', jobTitle: 'Baş Satış Meneceri', company: 'Silkway Logistics', city: 'Bakı', country: 'Azərbaycan', startMonth: '3', startYear: '2021', endMonth: '', endYear: '', current: true,
      description: '• İllik satış hədəfini 3 il ardıcıl 120%-dən çox yerinə yetirdi\n• 15 yeni korporativ müştəri cəlb edərək gəliri 35% artırdı\n• 5 nəfərlik satış komandasına rəhbərlik etdi' },
    { id: 'e2', jobTitle: 'Satış Mütəxəssisi', company: 'Bravo Supermarket', city: 'Bakı', country: 'Azərbaycan', startMonth: '4', startYear: '2019', endMonth: '2', endYear: '2021', current: false,
      description: '• Regional distribütorlarla danışıqlar apararaq satış şəbəkəsini genişləndirdi\n• CRM sistemində müştəri məlumatlarının idarə edilməsini təkmilləşdirdi' },
    { id: 'e3', jobTitle: 'Satış Nümayəndəsi', company: 'Meridian Retail Group', city: 'Bakı', country: 'Azərbaycan', startMonth: '6', startYear: '2017', endMonth: '3', endYear: '2019', current: false,
      description: '• Gündəlik 20+ müştəri görüşü keçirərək satış planını icra etdi' },
  ],
  education: [
    { id: 'edu1', institutionType: 'university' as const, institutionTypeCustom: '', school: 'Azərbaycan Dövlət İqtisad Universiteti', degree: 'Biznesin İdarə Edilməsi, Bakalavr', educationLevel: 'Bakalavr', city: 'Bakı', country: 'Azərbaycan', startYear: '2013', endYear: '2017' },
  ],
  skills: ['B2B Satış', 'Danışıqlar', 'CRM', 'Hesab İdarəetməsi', 'Potensial Müştəri Axtarışı', 'Salesforce'],
  languages: [
    { id: 'l1', name: 'Azərbaycan dili', level: 'Ana dili' },
    { id: 'l2', name: 'İngilis dili', level: 'B2' },
    { id: 'l3', name: 'Rus dili', level: 'B2' },
  ],
  certificates: [
    { id: 'c1', name: 'Professional Selling Skills', issuer: 'Miller Heiman', year: '2021' },
    { id: 'c2', name: 'Sales Management Certificate', issuer: 'Coursera', year: '2020' },
  ],
  trainings: [
    { id: 't1', name: 'Sales Excellence Program', provider: 'Narix Academy', year: '2017', description: 'Danışıqlar, CRM, Satış boru xətti' },
  ],
  additional: 'LinkedIn: linkedin.com/in/elnurallazov',
};

const SALES_EN: CVData = {
  personal: {
    firstName: 'Elnur', lastName: 'Allazov', email: 'elnur.allazov@gmail.com',
    phone: '+994 50 567 89 01', city: 'Baku', country: 'Azerbaijan',
    jobTitle: 'Sales Specialist', photo: SALES_PHOTO,
    linkedin: 'linkedin.com/in/elnurallazov',
    summary: 'B2B sales specialist with 5+ years of experience. Opens new markets and grows the client portfolio, consistently exceeding annual sales targets.',
  },
  experience: [
    { id: 'e1', jobTitle: 'Senior Sales Manager', company: 'Silkway Logistics', city: 'Baku', country: 'Azerbaijan', startMonth: '3', startYear: '2021', endMonth: '', endYear: '', current: true,
      description: '• Exceeded the annual sales target by 120%+ for 3 straight years\n• Brought in 15 new corporate accounts, growing revenue by 35%\n• Led a sales team of 5' },
    { id: 'e2', jobTitle: 'Sales Specialist', company: 'Bravo Supermarket', city: 'Baku', country: 'Azerbaijan', startMonth: '4', startYear: '2019', endMonth: '2', endYear: '2021', current: false,
      description: '• Negotiated with regional distributors to expand the sales network\n• Improved customer data management in the CRM' },
    { id: 'e3', jobTitle: 'Sales Representative', company: 'Meridian Retail Group', city: 'Baku', country: 'Azerbaijan', startMonth: '6', startYear: '2017', endMonth: '3', endYear: '2019', current: false,
      description: '• Ran 20+ client meetings a day to hit the sales plan' },
  ],
  education: [
    { id: 'edu1', institutionType: 'university' as const, institutionTypeCustom: '', school: 'Azerbaijan State University of Economics', degree: "Business Administration, Bachelor's", educationLevel: 'Bachelor', city: 'Baku', country: 'Azerbaijan', startYear: '2013', endYear: '2017' },
  ],
  skills: ['B2B Sales', 'Negotiation', 'CRM', 'Account Management', 'Lead Generation', 'Salesforce'],
  languages: [
    { id: 'l1', name: 'Azerbaijani', level: 'Native' },
    { id: 'l2', name: 'English', level: 'B2' },
    { id: 'l3', name: 'Russian', level: 'B2' },
  ],
  certificates: [
    { id: 'c1', name: 'Professional Selling Skills', issuer: 'Miller Heiman', year: '2021' },
    { id: 'c2', name: 'Sales Management Certificate', issuer: 'Coursera', year: '2020' },
  ],
  trainings: [
    { id: 't1', name: 'Sales Excellence Program', provider: 'Narix Academy', year: '2017', description: 'Negotiation, CRM, Pipeline management' },
  ],
  additional: 'LinkedIn: linkedin.com/in/elnurallazov',
};

/** Sample library shown by the "Load sample" picker. QA reuses the existing demo CV as-is. */
export const SAMPLE_PROFILES: SampleProfile[] = [
  { id: 'qa', photo: DEMO_CV_AZ.personal.photo || '', data: { az: DEMO_CV_AZ, en: DEMO_CV_EN } },
  { id: 'backend', photo: BACKEND_PHOTO, data: { az: BACKEND_AZ, en: BACKEND_EN } },
  { id: 'devops', photo: DEVOPS_PHOTO, data: { az: DEVOPS_AZ, en: DEVOPS_EN } },
  { id: 'marketing', photo: MARKETING_PHOTO, data: { az: MARKETING_AZ, en: MARKETING_EN } },
  { id: 'sales', photo: SALES_PHOTO, data: { az: SALES_AZ, en: SALES_EN } },
];

export function sampleData(id: SampleId, lang: 'az' | 'en'): CVData {
  return (SAMPLE_PROFILES.find(s => s.id === id) || SAMPLE_PROFILES[0]).data[lang];
}
