// Test data matrix for template / pagination / PDF QA (used by the dev lab page and by tests).
import { CVData, WorkExperience } from '@/app/types/cv';
import { DEMO_CV_EN, DEMO_CV_AZ } from '@/lib/cv/demo';

const EMPTY: CVData = {
  personal: { firstName: '', lastName: '', email: '', phone: '', city: '', country: '', jobTitle: '', photo: '', summary: '', linkedin: '' },
  experience: [], education: [], skills: [], languages: [], certificates: [], trainings: [], additional: '',
};

const BULLETS = [
  'Designed and maintained an end-to-end automated regression suite covering more than 400 critical user journeys across web and mobile clients',
  'Reduced average release cycle time by 35% by introducing parallel test execution and flaky-test quarantine in the CI pipeline',
  'Mentored five junior engineers and ran weekly code-review sessions focused on test design and maintainability',
  'Collaborated with product owners and developers to define acceptance criteria and shift quality checks left in the sprint',
  'Built dashboards that surfaced defect trends and helped leadership prioritise the technical debt backlog',
  'Migrated legacy Selenium scripts to Playwright, cutting execution time from 90 to 22 minutes',
];

function job(i: number, over: Partial<WorkExperience> = {}, bullets = 4): WorkExperience {
  return {
    id: 'x' + i, jobTitle: 'Senior QA Automation Engineer', company: ['Google', 'Microsoft', 'Amazon', 'Bolt', 'Kapital Bank', 'Azercell', 'SOCAR'][i % 7],
    city: 'Baku', country: 'Azerbaijan', startMonth: '3', startYear: String(2024 - i * 2), endMonth: '2', endYear: String(2026 - i * 2 - (i === 0 ? 0 : 0)),
    current: i === 0, description: BULLETS.slice(0, bullets).map(b => '• ' + b).join('\n'), ...over,
  };
}

const base = DEMO_CV_EN;

// tiny SVG portrait (no external files): head + shoulders on a soft background
const PHOTO = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="300" viewBox="0 0 240 300"><rect width="240" height="300" fill="#cfd8e3"/>' +
  '<circle cx="120" cy="110" r="54" fill="#f1c9a5"/><path d="M28 300c6-78 46-108 92-108s86 30 92 108z" fill="#2f4b7c"/><path d="M64 100c2-48 40-64 72-58 30 6 44 30 40 62-10-26-30-40-56-40s-40 14-56 36z" fill="#3b2a20"/></svg>');

export const FIXTURES: Record<string, CVData> = {
  empty: EMPTY,
  short: {
    ...EMPTY,
    personal: { ...base.personal, summary: '' },
    experience: [job(0, {}, 2)],
    education: base.education.slice(0, 1),
    skills: ['Playwright', 'SQL'],
  },
  standard: base,
  standardAz: DEMO_CV_AZ,
  long: {
    ...base,
    experience: [0, 1, 2, 3, 4, 5].map(i => job(i, {}, 5)),
    education: [...base.education, { ...base.education[0], id: 'edu3', school: 'Azerbaijan State University of Economics', degree: 'MBA, Business Administration' }],
    skills: ['Playwright', 'Selenium', 'Cypress', 'Postman', 'RestAssured', 'GitHub Actions', 'Jenkins', 'Docker', 'Kubernetes', 'SQL', 'PostgreSQL', 'MongoDB', 'Python', 'TypeScript', 'Java', 'JIRA', 'Confluence', 'Agile/Scrum', 'Kanban', 'Performance testing', 'k6', 'JMeter', 'Accessibility', 'Test strategy'],
    certificates: [1, 2, 3, 4, 5, 6].map(i => ({ id: 'c' + i, name: 'Professional Certificate in Software Quality ' + i, issuer: ['Coursera', 'Udemy', 'AWS', 'ISTQB', 'Google', 'Microsoft'][i - 1], year: String(2018 + i) })),
    trainings: base.trainings,
    personal: { ...base.personal, summary: 'Results-driven QA Automation Engineer with more than eight years of experience building reliable test infrastructure for high-traffic consumer products. Combines deep technical skills with a pragmatic, product-minded approach to quality, and enjoys mentoring teams toward better engineering practices.' },
    additional: 'GitHub: github.com/anarmammadov\nOpen-source contributor to Playwright ecosystem tooling. Speaker at regional QA meetups.',
  },
  extreme: {
    ...base,
    personal: { ...base.personal, jobTitle: 'Principal Staff Software Development Engineer in Test & Quality Engineering Practice Lead', firstName: 'Muhammad-Abdulrahman', lastName: 'Hasanzade-Shirvanshahov', email: 'muhammad.abdulrahman.hasanzade.shirvanshahov@verylongcompany-domain.example.com' },
    experience: [
      job(0, { jobTitle: 'Head of Global Quality Engineering, Platform Reliability and Developer Productivity', company: 'International Business Machines Corporation Azerbaijan Representative Office LLC' }, 6),
      job(1, { description: '• ' + BULLETS.join(' ') + ' ' + BULLETS.join(' ') }, 1),
      job(2, {}, 6), job(3, {}, 6), job(4, {}, 6), job(5, {}, 6), job(6, {}, 6), job(7, {}, 6),
    ],
    skills: Array.from({ length: 40 }, (_, i) => ['Playwright', 'Selenium', 'Cypress', 'Postman', 'Kubernetes', 'Terraform', 'Observability'][i % 7] + ' ' + (i + 1)),
  },
  withExtras: {
    ...base,
    personal: { ...base.personal, photo: PHOTO },
    projects: [
      { id: 'pr1', name: 'Open-source Playwright reporter', link: 'github.com/anarmammadov/pw-reporter', description: 'A lightweight HTML reporter adopted by several teams; 1.2k stars.' },
      { id: 'pr2', name: 'Test data generator', link: 'github.com/anarmammadov/datagen', description: 'CLI that produces realistic fixtures for e2e suites.' },
    ],
    customSections: [
      { id: 'cs1', title: 'Awards', content: 'Best Quality Initiative 2024 — Kapital Bank\nSpeaker, Baku QA Meetup 2023' },
      { id: 'cs2', title: 'Volunteering', content: 'Mentor at Code Academy — weekly sessions for junior testers.' },
    ],
  },
  noOptional: {
    ...EMPTY,
    personal: { ...base.personal, summary: '', linkedin: '' },
    experience: [job(0, {}, 3), job(1, {}, 3)],
  },
};

export const FIXTURE_IDS = Object.keys(FIXTURES);
