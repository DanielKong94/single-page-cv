import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// The animation hooks need a real IntersectionObserver; the refs they return are
// irrelevant to what these tests assert. Both hooks exported by the module are
// stubbed since Skill.tsx uses useStaggerOnView in addition to useAnimateOnView.
vi.mock('@/hooks/useAnimateOnView', () => ({
  useAnimateOnView: () => ({ current: null }),
  useStaggerOnView: () => ({ current: null }),
}));

// next/font/google relies on the Next.js compiler plugin to rewrite these calls;
// under Vitest they are plain functions with no runtime behaviour, so stub them.
vi.mock('next/font/google', () => ({
  Pixelify_Sans: () => ({ className: 'mock-pixelify-sans' }),
  Silkscreen: () => ({ className: 'mock-silkscreen' }),
}));

import About from './About';
import Education from './Education';
import Skill from './Skill';
import Experience from './Experience';
import Projects from './Projects';

describe('About', () => {
  it('renders the profile paragraph with its emphasis intact', () => {
    render(<About />);
    expect(screen.getByText(/dedicated fullstack developer from Malaysia/)).toBeInTheDocument();
    expect(screen.getByText('Laravel, Nuxt.js, and Next.js').tagName).toBe('STRONG');
  });
});

describe('Education', () => {
  it('renders the qualification, institution and period', () => {
    render(<Education />);
    expect(screen.getByText('Diploma in Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Southern College, Johor, Malaysia')).toBeInTheDocument();
    expect(screen.getByText('2014 - 2017')).toBeInTheDocument();
  });
});

describe('Skill', () => {
  it('renders every group and its items', () => {
    render(<Skill />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('DevOps')).toBeInTheDocument();
    expect(screen.getByText('Cloudflare')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });
});

describe('Experience', () => {
  it('renders both companies with their locations', () => {
    render(<Experience />);
    expect(screen.getByText('Flow Digital SDN BHD')).toBeInTheDocument();
    expect(screen.getByText('Excel Technology')).toBeInTheDocument();
    expect(screen.getAllByText('Selangor, Malaysia')).toHaveLength(2);
  });

  it('renders every role title and period', () => {
    render(<Experience />);
    expect(screen.getByText('Team Leader / Senior Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('Senior Fullstack Developer')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer (Freelance)')).toBeInTheDocument();
    expect(screen.getByText('2025 - Present')).toBeInTheDocument();
    expect(screen.getByText('2022 - 2024')).toBeInTheDocument();
    expect(screen.getByText('2018 - 2022')).toBeInTheDocument();
  });

  it('renders all ten bullets with their emphasised lead-ins', () => {
    render(<Experience />);
    expect(screen.getAllByRole('listitem')).toHaveLength(10);
    expect(screen.getByText('Architected cloud infrastructure').tagName).toBe('STRONG');
  });
});

describe('Projects', () => {
  it('renders every project name, focus and stack', () => {
    render(<Projects />);
    expect(screen.getByText('Courier Management System')).toBeInTheDocument();
    expect(screen.getByText('Flories E-commerce System')).toBeInTheDocument();
    expect(screen.getByText('SaaS CRM System')).toBeInTheDocument();
    expect(screen.getByText(/Cross-border logistics/)).toBeInTheDocument();
    // Courier Management System and SaaS CRM System share this exact stack, so
    // two elements match — assert presence rather than a single unique match.
    expect(screen.getAllByText(/Laravel • Inertia\.js • Vue\.js • MySQL • AWS • Cloudflare/).length).toBeGreaterThan(0);
  });

  it('renders all fifteen project bullets', () => {
    render(<Projects />);
    expect(screen.getAllByRole('listitem')).toHaveLength(15);
  });
});
