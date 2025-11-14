import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { HudBorder, HudGrid } from '../ui/HudEffects';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:contato@dobbs.com.br', label: 'Email' },
];

const footerLinks = {
  Navegação: [
    { href: '/', label: 'Início' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Cases' },
    { href: '/about', label: 'Sobre' },
  ],
  Recursos: [
    { href: '/blog', label: 'Artigos Práticos' },
    { href: '/projects', label: 'Cases de Consultoria' },
    { href: '/contact', label: 'Agendar Consultoria' },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-primary-100 border-t border-neutral-800/50 overflow-hidden">
      <HudGrid density="sparse" />
      
      <div className="container-custom py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Logo variant="hud" className="mb-4" />
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
              Consultoria de IA para pessoas que querem aprender a usar IA de forma 
              assertiva e eficiente. Orientação prática e personalizada.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <HudBorder key={label} variant="glow" intensity="subtle" className="group">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary-200/20 border border-accent-500/20 hover:bg-accent-500/10 hover:border-accent-500/50 flex items-center justify-center transition-all text-neutral-400 hover:text-accent-500 backdrop-blur-sm"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                </HudBorder>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-0.5 w-6 bg-accent-500" />
                <h3 className="text-neutral-200 font-display font-semibold hud-data text-sm uppercase tracking-wider">
                  {category}
                </h3>
              </div>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-neutral-400 hover:text-accent-500 transition-colors text-sm group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-500/0 group-hover:bg-accent-500 transition-colors" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm hud-data">
            © {new Date().getFullYear()} Dobbs. Todos os direitos reservados.
          </p>
          <p className="text-neutral-500 text-sm mt-4 md:mt-0 hud-data">
            Feito com <span className="text-accent-500">❤</span> e TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

