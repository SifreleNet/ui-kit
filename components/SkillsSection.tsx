'use client';

const SKILLS = [
  {
    title: 'Penetration Testing',
    skills: ['Burp Suite', 'Metasploit', 'Nmap', 'SQLmap', 'Nikto'],
    icon: '⚔',
  },
  {
    title: 'Web Security',
    skills: ['OWASP Top 10', 'XSS', 'SQLi', 'SSRF', 'IDOR'],
    icon: '🌐',
  },
  {
    title: 'Reverse Engineering',
    skills: ['Ghidra', 'IDA Pro', 'x64dbg', 'pwndbg', 'GDB'],
    icon: '⚙',
  },
  {
    title: 'CTF & Forensics',
    skills: [
      'HackTheBox',
      'TryHackMe',
      'Volatility',
      'Wireshark',
      'Steganography',
    ],
    icon: '🏴',
  },
  {
    title: 'Development',
    skills: ['Python', 'TypeScript', 'Next.js', 'React', 'Node.js'],
    icon: '</>',
  },
  {
    title: 'Infrastructure',
    skills: ['Docker', 'Linux', 'Bash', 'Git', 'VPN / Tunneling'],
    icon: '🔧',
  },
];

interface SkillsSectionProps {
  skills?: Array<{ title: string; skills: string[]; icon?: string }>;
  title?: string;
  commandPrefix?: string;
}

export default function SkillsSection({
  skills = SKILLS,
  title = 'Skill Set',
  commandPrefix = '$ cat skills.txt',
}: SkillsSectionProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 border-t border-[#1a2e1a]">
      <p className="text-[#00ff9f44] text-xs font-mono mb-1">
        {commandPrefix}
      </p>
      <h2 className="text-xl font-bold text-[#00ff9f] font-mono mb-8">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map(({ title: skillTitle, skills: subSkills, icon }, i) => (
          <div
            key={skillTitle}
            className="border border-[#1a2e1a] bg-[#0d0d0d] rounded-lg p-5 hover:border-[#00ff9f33] hover:bg-[#0f0f0f] group animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-2 mb-4">
              {icon && <span className="text-base">{icon}</span>}
              <h3 className="text-[#00ff9f] text-sm font-bold font-mono">
                {skillTitle}
              </h3>
            </div>
            <ul className="space-y-2">
              {subSkills.map((skill, j) => (
                <li key={skill} className="flex items-center gap-2 group/skill">
                  <span className="text-[#00ff9f33] text-xs group-hover:text-[#00ff9f66] transition-colors duration-200">
                    ›
                  </span>
                  <span className="text-xs text-[#00ff9f66] font-mono group-hover:text-[#00ff9f88] transition-colors duration-200 flex-1">
                    {skill}
                  </span>
                  <span
                    className="h-px bg-[#00ff9f22] rounded"
                    style={{ width: `${30 + j * 12}%` }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
