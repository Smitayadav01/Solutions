

export default function CaseStudyCard({ c }) {
  return (
    <article className="case">
      <div className="top"><h3>{c.name}</h3><span className="ind">{c.industry}</span></div>
      <dl>
        <dt>Problem</dt><dd>{c.problem}</dd>
        <dt>Solution</dt><dd>{c.solution}</dd>
        <dt>Technologies</dt><dd>{c.tech}</dd>
        <dt>Key outcome</dt><dd>{c.outcome}</dd>
      </dl>
    </article>
  );
}
