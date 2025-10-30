const nodes = [
  { id: 'profile', label: 'Personal Story', description: 'Capture motivations, strengths, and internship goals.' },
  { id: 'skills', label: 'Skill Radar', description: 'List out technical, analytical, and collaborative superpowers.' },
  { id: 'pipeline', label: 'Application Flow', description: 'Outline roles you want to pursue and timelines to prep.' },
  { id: 'support', label: 'Support Pods', description: 'Track mentors, peers, and resources cheering you on.' },
]

function MindMapPage() {
  return (
    <div className="mindmap-page">
      <section className="hero mindmap-hero">
        <div className="hero__body">
          <span className="hero__tag">Mind Map workspace</span>
          <h1>Sketch the plan before the internship search begins.</h1>
          <p>
            This view lets students visualize every branch of their recruiting journey&mdash;from self-assessment
            prompts to weekly action items. We&apos;ll plug in the real data once the builder is ready.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#mindmap-preview">
              Preview the canvas
            </a>
            <a className="button button--secondary" href="/#contact">
              Say hello
            </a>
          </div>
        </div>
      </section>

      <div className="main-content mindmap-content">
        <section className="section">
          <h2>Mind map building blocks</h2>
          <p className="section__intro">
            Each branch is designed to keep students oriented. Swap in real copy later&mdash;these placeholders show
            how guidance and action items stack together.
          </p>
          <div className="mindmap-grid">
            {nodes.map((node) => (
              <article key={node.id} className="mindmap-card">
                <h3>{node.label}</h3>
                <p>{node.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="mindmap-preview" className="section mindmap-board">
          <h2>Interactive board preview</h2>
          <p className="section__intro">
            The canvas will let you drag, connect, and reorganize cards. For now, imagine the flow as a lightweight
            spider chart that adapts as goals evolve.
          </p>
          <div className="mindmap-board__frame" role="presentation">
            <div className="mindmap-node mindmap-node--primary">Internship North Star</div>
            <div className="mindmap-node-group">
              {nodes.map((node) => (
                <div key={node.id} className="mindmap-node">
                  <span className="mindmap-node__title">{node.label}</span>
                  <span className="mindmap-node__hint">Filler copy that hints at next steps.</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MindMapPage
