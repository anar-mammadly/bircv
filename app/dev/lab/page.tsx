import { notFound } from 'next/navigation';
import LabClient from './LabClient';

export const dynamic = 'force-dynamic';

// Development-only QA page: renders any template × fixture × font and exposes the layout to tests.
export default function Page() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <LabClient />;
}
