import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Blog } from '@/components/sections/Blog';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Blog />
      <CTA />
    </>
  );
}

