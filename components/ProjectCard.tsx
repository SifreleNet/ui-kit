import { Project, categoryLabels, statusColors } from '@/data/projects';

interface ProjectCardProps {
  project?: Partial<Project>;
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  status?: string;
  github?: string;
  demo?: string;
  year?: number | string;
  id?: number | string;
  index?: number;
}

const defaultStatusColors: Record<string, string> = {
  active: 'text-neon-green border-neon-green/27',
  completed: 'text-neon-green/67 border-neon-green/13',
  wip: 'text-[#febc2e] border-[#febc2e44]',
};

export default function ProjectCard({
  project,
  title,
  description,
  tags,
  category,
  status,
  github,
  demo,
  year,
  id,
  index = 0,
}: ProjectCardProps) {
  const pTitle = title || project?.title || 'Quantum Crypt';
  const pDesc = description || project?.description || 'Secure decentralized multi-party computation protocol with lattice-based encryption.';
  const pTags = tags || project?.tags || ['Cryptography', 'Rust', 'WASM'];
  const pCategory = category || (project?.category ? categoryLabels[project.category] : 'Security Tool');
  const pStatus = status || project?.status || 'active';
  const pGithub = github || project?.github;
  const pDemo = demo || project?.demo;
  const pYear = year || project?.year || 2026;
  const pId = id || project?.id || 1;

  const statusColorClass = 
    defaultStatusColors[pStatus.toLowerCase()] || 
    (project?.status && statusColors[project.status]) || 
    'text-neon-green border-neon-green/27';

  return (
    <article
      className="border border-[#1a2e1a] bg-[#0d0d0d] rounded-lg p-5 flex flex-col gap-4 border-glow group hover:bg-[#0f0f0f] transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-neon-green/33 text-xs">
              [{pId.toString().padStart(2, '0')}]
            </span>
            <span className="text-xs border border-current rounded px-2 py-0.5 font-mono opacity-70">
              {pCategory}
            </span>
          </div>
          <h3 className="text-neon-green font-bold text-base group-hover:text-shadow-glow transition-all duration-300 font-mono">
            {pTitle}
          </h3>
        </div>

        {/* Status badge */}
        <span
          className={`text-[10px] border rounded px-2 py-0.5 font-mono shrink-0 ${statusColorClass}`}
        >
          {pStatus}
        </span>
      </div>

      {/* Description */}
      <p className="text-neon-green/53 text-sm leading-relaxed flex-1">
        {pDesc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {pTags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono bg-neon-green/5 border border-neon-green/13 text-neon-green/47 rounded px-2 py-0.5 hover:text-neon-green hover:border-neon-green/27 transition-all duration-200"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer - year + links */}
      <div className="flex items-center justify-between pt-2 border-t border-[#1a2e1a]">
        <span className="text-neon-green/20 text-xs font-mono">
          {pYear}
        </span>
        <div className="flex items-center gap-3">
          {pGithub && (
            <a
              href={pGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neon-green/33 hover:text-neon-green font-mono transition-all duration-200 hover:underline"
            >
              [github]
            </a>
          )}
          {pDemo && (
            <a
              href={pDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neon-green/33 hover:text-neon-green font-mono transition-all duration-200 hover:underline"
            >
              [demo]
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
