import { CVData } from '@/app/types/cv';
import { DEFAULT_PROFILE_PHOTO } from '@/lib/cv/defaultPhoto';

export const DEMO_CV_AZ: CVData = {
  personal: {
    firstName: 'Anar', lastName: 'Məmmədov', email: 'anar.memmedov@gmail.com',
    phone: '+994 51 123 45 67', city: 'Bakı', country: 'Azərbaycan',
    jobTitle: 'QA Avtomasiya Mühəndisi', photo: DEFAULT_PROFILE_PHOTO,
    linkedin: 'linkedin.com/in/anarmammadly',
    summary: 'Fintech və e-ticarət məhsulları üçün etibarlı test sistemləri quran 5+ illik təcrübəli QA avtomasiya mühəndisi. Playwright və CI pipeline-ları ilə reqressiya vaxtını 85% azaldıb, komanda üzvlərinə keyfiyyət təcrübələrini öyrədir.',
  },
  experience: [
    { id:'e1', jobTitle:'Baş QA Avtomasiya Mühəndisi', company:'Google', city:'Bakı', country:'Azərbaycan', startMonth:'3', startYear:'2023', endMonth:'', endYear:'', current:true,
      description:'• Playwright və TypeScript əsasında web və mobil üzrə 400-dən çox kritik ssenarini əhatə edən test çərçivəsi qurdu\n• GitHub Actions-da paralel icra ilə reqressiya vaxtını 6 saatdan 40 dəqiqəyə endirdi\n• 4 kiçik mühəndisə mentorluq etdi, test kodu üçün code review təcrübəsi tətbiq etdi' },
    { id:'e2', jobTitle:'QA Mühəndisi', company:'Microsoft', city:'Bakı', country:'Azərbaycan', startMonth:'7', startYear:'2021', endMonth:'2', endYear:'2023', current:false,
      description:'• Postman və RestAssured ilə API kontrakt testləri yazaraq relizdən əvvəl 120-dən çox qüsur aşkar etdi\n• Agile sprintlərdə developerlərlə birlikdə qəbul meyarlarını müəyyən etdi' },
    { id:'e3', jobTitle:'Kiçik QA Mühəndisi', company:'Amazon', city:'Bakı', country:'Azərbaycan', startMonth:'9', startYear:'2019', endMonth:'6', endYear:'2021', current:false,
      description:'• Hər həftəlik relizdə əl ilə və avtomatlaşdırılmış smoke testləri apardı\n• JIRA-da qüsur hesabatlarını standartlaşdıraraq həll müddətini 30% qısaltdı' },
    { id:'e4', jobTitle:'QA Stajyoru', company:'Bolt', city:'Bakı', country:'Azərbaycan', startMonth:'6', startYear:'2018', endMonth:'8', endYear:'2019', current:false,
      description:'• Mobil tətbiqin reqressiya testlərində iştirak etdi və 60-dan çox test-keys yazdı' },
  ],
  education: [
    { id:'edu1', institutionType:'university' as const, institutionTypeCustom:'', school:'ADA Universiteti', degree:'Kompüter Elmləri, Magistr', educationLevel:'Magistr', city:'Bakı', country:'Azərbaycan', startYear:'2022', endYear:'2024' },
    { id:'edu2', institutionType:'university' as const, institutionTypeCustom:'', school:'Bakı Dövlət Universiteti', degree:'Tətbiqi Riyaziyyat, Bakalavr', educationLevel:'Bakalavr', city:'Bakı', country:'Azərbaycan', startYear:'2015', endYear:'2019' },
  ],
  skills: ['Playwright', 'Selenium', 'TypeScript', 'Postman', 'RestAssured', 'GitHub Actions', 'SQL', 'JIRA'],
  languages: [
    { id:'l1', name:'Azərbaycan dili', level:'Ana dili' },
    { id:'l2', name:'İngilis dili',    level:'C1' },
    { id:'l3', name:'Rus dili',        level:'B1' },
  ],
  certificates: [
    { id:'c1', name:'ISTQB Foundation Level',    issuer:'ISTQB',    year:'2022' },
    { id:'c2', name:'Test Automation Engineer',  issuer:'Udemy',    year:'2023' },
    { id:'c3', name:'AWS Cloud Practitioner',    issuer:'Amazon',   year:'2023' },
  ],
  trainings: [
    { id:'t1', name:'QA Avtomasiya Bootcamp', provider:'Narix Academy',              year:'2022', description:'Selenium, Playwright, TestNG' },
    { id:'t2', name:'Qabaqcıl API Testi',      provider:'Test Automation University', year:'2023', description:'REST, GraphQL, Postman' },
  ],
  additional: 'GitHub: github.com/anarmammadov',
};

export const DEMO_CV_EN: CVData = {
  personal: {
    firstName: 'Anar', lastName: 'Mammadov', email: 'anar.mammadov@gmail.com',
    phone: '+994 51 123 45 67', city: 'Baku', country: 'Azerbaijan',
    jobTitle: 'QA Automation Engineer', photo: DEFAULT_PROFILE_PHOTO,
    linkedin: 'linkedin.com/in/anarmammadly',
    summary: 'QA automation engineer with 5+ years of experience building reliable test suites for fintech and e-commerce products. Cut regression time by 85% with Playwright and CI pipelines, and mentors teammates on quality practices.',
  },
  experience: [
    { id:'e1', jobTitle:'Senior QA Automation Engineer', company:'Google', city:'Baku', country:'Azerbaijan', startMonth:'3', startYear:'2023', endMonth:'', endYear:'', current:true,
      description:'• Built a Playwright + TypeScript framework covering 400+ critical user flows across web and mobile\n• Reduced regression time from 6 hours to 40 minutes with parallel runs in GitHub Actions\n• Mentored 4 junior engineers and introduced code review for test code' },
    { id:'e2', jobTitle:'QA Engineer', company:'Microsoft', city:'Baku', country:'Azerbaijan', startMonth:'7', startYear:'2021', endMonth:'2', endYear:'2023', current:false,
      description:'• Wrote API contract tests with Postman and RestAssured, catching 120+ defects before release\n• Partnered with developers in Agile sprints to define clear acceptance criteria' },
    { id:'e3', jobTitle:'Junior QA Engineer', company:'Amazon', city:'Baku', country:'Azerbaijan', startMonth:'9', startYear:'2019', endMonth:'6', endYear:'2021', current:false,
      description:'• Ran manual and automated smoke tests for every weekly release\n• Standardised defect reports in JIRA, shortening resolution time by 30%' },
    { id:'e4', jobTitle:'QA Intern', company:'Bolt', city:'Baku', country:'Azerbaijan', startMonth:'6', startYear:'2018', endMonth:'8', endYear:'2019', current:false,
      description:'• Took part in mobile app regression testing and wrote 60+ test cases' },
  ],
  education: [
    { id:'edu1', institutionType:'university' as const, institutionTypeCustom:'', school:'ADA University', degree:"Computer Science, Master's", educationLevel:'Master', city:'Baku', country:'Azerbaijan', startYear:'2022', endYear:'2024' },
    { id:'edu2', institutionType:'university' as const, institutionTypeCustom:'', school:'Baku State University', degree:"Applied Mathematics, Bachelor's", educationLevel:'Bachelor', city:'Baku', country:'Azerbaijan', startYear:'2015', endYear:'2019' },
  ],
  skills: ['Playwright', 'Selenium', 'TypeScript', 'Postman', 'RestAssured', 'GitHub Actions', 'SQL', 'JIRA'],
  languages: [
    { id:'l1', name:'Azerbaijani', level:'Native' },
    { id:'l2', name:'English',     level:'C1' },
    { id:'l3', name:'Russian',     level:'B1' },
  ],
  certificates: [
    { id:'c1', name:'ISTQB Foundation Level',   issuer:'ISTQB',  year:'2022' },
    { id:'c2', name:'Test Automation Engineer', issuer:'Udemy',  year:'2023' },
    { id:'c3', name:'AWS Cloud Practitioner',   issuer:'Amazon', year:'2023' },
  ],
  trainings: [
    { id:'t1', name:'QA Automation Bootcamp', provider:'Narix Academy',              year:'2022', description:'Selenium, Playwright, TestNG' },
    { id:'t2', name:'Advanced API Testing',   provider:'Test Automation University', year:'2023', description:'REST, GraphQL, Postman' },
  ],
  additional: 'GitHub: github.com/anarmammadov',
};
