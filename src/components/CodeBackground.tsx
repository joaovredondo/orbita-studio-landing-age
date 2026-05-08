'use client';

import { motion } from 'framer-motion';

/* Code lines that type themselves as the section enters the viewport.
   Positioned as a full-height absolute layer behind page content. */

const LEFT_LINES = [
  { t: "import React, { useState } from 'react'",   c: 'ci' },
  { t: "import { motion, useScroll } from 'framer-motion'", c: 'ci' },
  { t: "import { supabase } from '@/lib/supabase'", c: 'ci' },
  { t: '', c: '' },
  { t: 'interface Project {',                       c: 'ck' },
  { t: "  id: string",                              c: 'cp' },
  { t: "  name: string",                            c: 'cp' },
  { t: "  status: Status",                          c: 'cp' },
  { t: "  progress: number",                        c: 'cp' },
  { t: "  client: Client",                          c: 'cp' },
  { t: '}',                                         c: 'cb' },
  { t: '', c: '' },
  { t: "type Status =",                             c: 'ck' },
  { t: "  | 'waiting'",                             c: 'cs' },
  { t: "  | 'in_progress'",                         c: 'cs' },
  { t: "  | 'review'",                              c: 'cs' },
  { t: "  | 'done'",                                c: 'cs' },
  { t: '', c: '' },
  { t: 'const Dashboard = () => {',                 c: 'ck' },
  { t: "  const { data } = useProjects()",          c: 'cp' },
  { t: "  const active = data?.filter(",            c: 'cp' },
  { t: "    p => p.status !== 'done'",              c: 'cs' },
  { t: "  )",                                       c: 'cb' },
  { t: '', c: '' },
  { t: '  return (',                                c: 'ck' },
  { t: '    <Layout>',                              c: 'ct' },
  { t: '      <Sidebar />',                         c: 'ct' },
  { t: '      <main className="content">',          c: 'ct' },
  { t: '        {active?.map(p => (',               c: 'cp' },
  { t: '          <ProjectCard',                    c: 'ct' },
  { t: '            key={p.id}',                    c: 'ca' },
  { t: '            {...p}',                        c: 'ca' },
  { t: '          />',                              c: 'ct' },
  { t: '        ))}',                               c: 'cp' },
  { t: '      </main>',                             c: 'ct' },
  { t: '    </Layout>',                             c: 'ct' },
  { t: '  )',                                       c: 'ck' },
  { t: '}',                                         c: 'cb' },
];

const RIGHT_LINES = [
  { t: "const Interface = ({",                      c: 'ck' },
  { t: "  premium = true,",                         c: 'ca' },
  { t: "  animated = true,",                        c: 'ca' },
  { t: "  onConvert,",                              c: 'ca' },
  { t: "}: InterfaceProps) => {",                   c: 'ck' },
  { t: "  const theme = useDarkMode()",             c: 'cp' },
  { t: "  const scroll = useScrollY()",             c: 'cp' },
  { t: '', c: '' },
  { t: '  return (',                                c: 'ck' },
  { t: '    <motion.div',                           c: 'ct' },
  { t: '      initial={{ opacity: 0, y: 20 }}',    c: 'ca' },
  { t: '      animate={{ opacity: 1, y: 0 }}',     c: 'ca' },
  { t: '      transition={{ duration: 0.6 }}',      c: 'ca' },
  { t: '    >',                                     c: 'ct' },
  { t: '      <Header />',                          c: 'ct' },
  { t: '      <HeroSection />',                     c: 'ct' },
  { t: '      <Services />',                        c: 'ct' },
  { t: '      <Portfolio />',                       c: 'ct' },
  { t: '      <Contact />',                         c: 'ct' },
  { t: '    </motion.div>',                         c: 'ct' },
  { t: '  )',                                       c: 'ck' },
  { t: '}',                                         c: 'cb' },
  { t: '', c: '' },
  { t: '// Performance: 98/100',                    c: 'cc' },
  { t: '// Bundle: < 80kb',                         c: 'cc' },
  { t: '// LCP: < 1.2s',                            c: 'cc' },
  { t: '', c: '' },
  { t: 'export default Interface',                  c: 'ck' },
];

function CodeCol({
  lines,
  startDelay = 0,
}: {
  lines: typeof LEFT_LINES;
  startDelay?: number;
}) {
  return (
    <div className="code-bg-col">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className={`code-bg-line ${line.c}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: line.t === '' ? 0 : 1 }}
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          transition={{ delay: startDelay + i * 0.04, duration: 0.3 }}
        >
          <span className="code-bg-ln">{String(i + 1).padStart(2, ' ')}</span>
          <span>{line.t || ' '}</span>
        </motion.div>
      ))}
    </div>
  );
}

export const CodeBackground = () => {
  return (
    <div className="code-bg" aria-hidden="true">
      <CodeCol lines={LEFT_LINES} startDelay={0.2} />
      <CodeCol lines={RIGHT_LINES} startDelay={0.8} />
    </div>
  );
};
