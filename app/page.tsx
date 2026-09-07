const projects = [
  { title: "FoodLens AI", label: "AI · HealthTech · Mobile", description: "A local-first diet analysis app using Flutter, Firebase, Vercel and Gemini for food image understanding, nutrition analysis and cloud sync.", stack: ["Flutter", "Firebase", "Gemini", "Vercel"], href: "https://github.com/yuchan27/Ingredient-AI" },
  { title: "Vision Communication Routing", label: "Computer Vision · Research", description: "Sensor-fusion experiment centered on fire and smoke detection with a YOLOv11-based PyroDetector workflow.", stack: ["Python", "YOLOv11", "Computer Vision"], href: "https://github.com/yuchan27/Vision-Communication-Routing-based-on-Sensor-Fusion" },
  { title: "Cat Future Lab", label: "AI Interface · Web", description: "A multi-theme SPA with a natural-language smart navigator, validated action routing and low-noise interactive visual systems.", stack: ["JavaScript", "Node.js", "AI Actions", "3D UI"], href: "https://github.com/yuchan27/Anime_Cat" },
  { title: "Wasteland Recycler", label: "Game Systems · Experimental", description: "A Godot roguelike vertical slice with an 8-direction character system, quests, equipment, validation runners and custom asset pipelines.", stack: ["Godot", "GDScript", "Python", "Game Systems"], href: "https://github.com/yuchan27/Game" },
];
const focus = ["LLM applications", "RAG & retrieval systems", "Backend APIs", "Data pipelines", "HealthTech", "AI infrastructure"];

export default function Home() {
  return <main>
    <section className="hero shell">
      <nav><div className="brand">YC<span>/27</span></div><div className="navlinks"><a href="#work">Work</a><a href="#about">About</a><a href="https://github.com/yuchan27" target="_blank">GitHub ↗</a></div></nav>
      <div className="heroGrid">
        <div className="heroCopy"><p className="eyebrow">AI & BACKEND ENGINEER · TAIWAN</p><h1>I build systems where <em>AI</em> meets real-world products.</h1><p className="lede">LLM applications, RAG, backend services, healthcare data and experimental interfaces — engineered with a bias toward systems that can actually run in production.</p><div className="ctaRow"><a className="primary" href="#work">View selected work</a><a className="ghost" href="https://github.com/yuchan27" target="_blank">github.com/yuchan27</a></div></div>
        <div className="systemCard"><div className="status"><span></span> CURRENT FOCUS</div><div className="terminal"><p><b>01</b> AI systems</p><p><b>02</b> Backend engineering</p><p><b>03</b> HealthTech</p><p><b>04</b> Product experiments</p></div><div className="signal"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
      </div>
    </section>
    <section className="ticker"><div>RAG · LLM · BACKEND · DATA · HEALTHTECH · COMPUTER VISION · PRODUCT ENGINEERING · RAG · LLM · BACKEND · DATA · HEALTHTECH · COMPUTER VISION · PRODUCT ENGINEERING ·</div></section>
    <section id="work" className="shell section"><div className="sectionHead"><p className="eyebrow">SELECTED WORK</p><h2>Projects with different surfaces, same engineering instinct.</h2></div><div className="projects">{projects.map((p,i)=><a className="project" href={p.href} target="_blank" key={p.title}><div className="projectNo">0{i+1}</div><div className="projectMain"><p>{p.label}</p><h3>{p.title}</h3><span>{p.description}</span><div className="stack">{p.stack.map(s=><b key={s}>{s}</b>)}</div></div><div className="arrow">↗</div></a>)}</div></section>
    <section id="about" className="shell section about"><div><p className="eyebrow">ABOUT</p><h2>I care about the layer between a model demo and a usable system.</h2></div><div className="aboutText"><p>My work spans AI application design, retrieval systems, backend APIs, data processing, deployment and product prototyping. I am especially interested in healthcare technology and production-ready AI workflows.</p><p>Rather than treating AI as an isolated model call, I focus on the surrounding system: data quality, retrieval, APIs, reliability, infrastructure and the interface people actually use.</p></div></section>
    <section className="shell focus section"><p className="eyebrow">WORKING AREAS</p><div className="focusGrid">{focus.map((x,i)=><div className="focusItem" key={x}><span>0{i+1}</span>{x}</div>)}</div></section>
    <footer className="shell"><div><p className="eyebrow">YU-CHENG CHIEN</p><h2>Build useful things. Make the system hold.</h2></div><div className="footerLinks"><a href="https://github.com/yuchan27" target="_blank">GitHub ↗</a><a href="https://www.linkedin.com/in/yu-cheng-chien-a42472384/" target="_blank">LinkedIn ↗</a></div></footer>
  </main>;
}
