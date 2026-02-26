import React, { useState, useEffect, useRef } from 'react';

const CALENDLY_URL = "https://calendly.com/mirirabi18/15min";

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Inline SVG Icons ── */
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{display:'inline-block',verticalAlign:'middle'}}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block',verticalAlign:'middle'}}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block',verticalAlign:'middle'}}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{display:'inline-block',verticalAlign:'middle'}}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{display:'inline-block',verticalAlign:'middle'}}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{display:'inline-block',verticalAlign:'middle'}}>
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block',verticalAlign:'middle'}}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

/* ── Main Component ── */
const MiriWebsite = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const faqItems = [
    { q: "I'm nervous to talk about these topics with someone I don't know. Is that normal?", a: "Completely normal. Most Kallahs arrive with anxiety about these conversations. That's exactly why I've created a safe, judgment-free space. By the end of our first session, you'll feel relieved you reached out." },
    { q: "My mother wants to sit in on the sessions. Is that okay?", a: "I recommend keeping sessions one-on-one so you have space to ask anything freely. We can discuss what works best for you in our first conversation." },
    { q: "How is your class different from a standard Kallah class?", a: "Standard classes focus primarily on Halacha. Mine weaves together traditional Halacha with emotional intelligence, attachment theory, and nervous-system science. I help you understand yourself — your body, your feelings, your needs." },
    { q: "Can I do sessions remotely if I'm not in Melbourne?", a: "Absolutely. I work with Kallahs worldwide via Zoom. The connection and safety are just as powerful online as in-person." },
    { q: "How long is each session?", a: "Sessions are typically 45–60 minutes, depending on what we're exploring. I always make sure you have the time you need." },
    { q: "What if I'm not sure which package is right for me?", a: "That's what your first consultation is for. We'll talk about where you are, what you need, and design a plan that works for you. No pressure to commit to anything." }
  ];

  const blogResources = [
    { title: "Understanding Taharas HaMishpacha Beyond the Laws", description: "Why Halacha exists, what it's really about, and how it shapes intimacy", category: "Halacha & Intimacy" },
    { title: "The Nervous System & Your Wedding Night", description: "Why you might feel anxious, what's happening in your body, and how to regulate it", category: "Nervous System Science" },
    { title: "Building Secure Attachment in Marriage", description: "How to create the emotional foundation that makes everything else possible", category: "Attachment Theory" },
    { title: "Communication Scripts for Difficult Conversations", description: "Real words for talking about needs, boundaries, and desire with your husband", category: "Communication" },
    { title: "Myths About Female Desire (And What's Actually True)", description: "Unpacking the lies you've been told and replacing them with real knowledge", category: "Education" },
    { title: "The First Year: What Nobody Warns You About", description: "Practical guidance for navigating the biggest transition of your life", category: "Marriage Prep" }
  ];

  const s = {
    // typography helpers
    label: { fontFamily: "'Lora', serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b45309', marginBottom: 16, display: 'block' },
    h2: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1.2, color: '#1a1a1a' },
    gradText: { background: 'linear-gradient(135deg, #d97706, #b45309)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
    body: { color: '#4b5563', lineHeight: 1.8 },
    // button
    btnPrimary: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', background: '#d97706', color: '#fff', borderRadius: 50, fontFamily: "'Lora', serif", fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s' },
    btnOutline: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 32px', background: 'transparent', color: '#1a1a1a', borderRadius: 50, fontFamily: "'Lora', serif", fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', border: '2px solid #1a1a1a', transition: 'background 0.2s, transform 0.2s' },
  };

  const hoverPrimary = (e) => { e.currentTarget.style.background = '#b45309'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(180,83,9,0.3)'; };
  const unhoverPrimary = (e) => { e.currentTarget.style.background = '#d97706'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; };
  const hoverCard = (e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(180,83,9,0.12)'; };
  const unhoverCard = (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(180,83,9,0.06)'; };

  return (
    <div style={{ fontFamily: "'Lora', Georgia, serif", color: '#1a1a1a', background: '#fff' }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }
        @keyframes pulseGlow { 0%,100% { box-shadow:0 0 0 0 rgba(217,119,6,0.35); } 50% { box-shadow:0 0 0 10px rgba(217,119,6,0); } }
        input, textarea { font-family: 'Lora', serif; }
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr 1fr !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
          .six-col { grid-template-columns: repeat(3,1fr) !important; }
          .hero-h1 { font-size: 2.4rem !important; }
        }
        @media (max-width: 480px) {
          .three-col { grid-template-columns: 1fr !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── NAVIGATION ── */}
      <nav style={{ position:'sticky', top:0, zIndex:50, background:'rgba(255,255,255,0.97)', backdropFilter:'blur(8px)', borderBottom:'1px solid #fef3c7', boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none', transition:'box-shadow 0.3s ease' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'16px 24px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:'1.25rem', color:'#1a1a1a' }}>Miri Rabi</span>
          <div style={{ display:'flex', gap:28, alignItems:'center' }}>
            {['About','Approach','Services','Resources','FAQ','Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily:"'Lora',serif", fontSize:'0.85rem', color:'#6b7280', textDecoration:'none' }}
                onMouseEnter={e => e.currentTarget.style.color='#1a1a1a'} onMouseLeave={e => e.currentTarget.style.color='#6b7280'}
              >{link}</a>
            ))}
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
              style={{ ...s.btnPrimary, animation:'pulseGlow 2.5s ease-in-out infinite' }}
              onMouseEnter={hoverPrimary} onMouseLeave={unhoverPrimary}
            ><CalendarIcon /> Book Session</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background:'linear-gradient(160deg,#fffbf0 0%,#fef3c7 40%,#fff7ed 70%,#ffffff 100%)', padding:'80px 24px 96px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:40, right:40, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(253,230,138,0.4),transparent)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:0, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(252,211,77,0.3),transparent)', pointerEvents:'none' }} />
        <div style={{ maxWidth:800, margin:'0 auto', position:'relative' }}>
          <div style={{ ...s.label, textAlign:'center', animation:'fadeInUp 0.8s ease both' }}>Kallah Teacher & Marriage Educator · Melbourne</div>
          <h1 className="hero-h1" style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(2.4rem,6vw,4rem)', lineHeight:1.15, color:'#1a1a1a', marginBottom:24, animation:'fadeInUp 0.8s ease 0.1s both' }}>
            Where <em style={s.gradText}>Torah</em> meets<br />your whole heart.
          </h1>
          <p style={{ ...s.body, fontSize:'1.1rem', maxWidth:600, margin:'0 auto 40px', animation:'fadeInUp 0.8s ease 0.2s both' }}>
            You deserve more than just a checklist of laws. You deserve to walk into your marriage feeling <strong>confident, informed, and truly yourself.</strong> That's exactly what we build — together.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', animation:'fadeInUp 0.8s ease 0.3s both' }}>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={s.btnPrimary} onMouseEnter={hoverPrimary} onMouseLeave={unhoverPrimary}>
              <CalendarIcon /> Book Your First Session
            </a>
            <a href="#about" style={s.btnOutline}
              onMouseEnter={e => { e.currentTarget.style.background='#f9f5f0'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.transform='translateY(0)'; }}
            >Meet Miri</a>
          </div>
          <p style={{ marginTop:40, fontSize:'0.85rem', color:'#b45309', animation:'fadeInUp 0.8s ease 0.4s both' }}>
            ✦ Certified Kallah Teacher &nbsp;·&nbsp; Trained under Mindy Wiesner &nbsp;·&nbsp; Melbourne & Worldwide via Zoom
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding:'64px 24px', background:'#fff', borderTop:'1px solid #fef3c7', borderBottom:'1px solid #fef3c7' }}>
        <div className="four-col" style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32, textAlign:'center' }}>
          {[['10','One-on-One Sessions'],['3','Continents Served'],['100%','Judgment-Free Zone'],['∞','Questions Welcome']].map(([num, label], i) => (
            <Reveal key={num} delay={i * 100}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.2rem,4vw,3rem)', fontWeight:700, color:'#92400e', lineHeight:1 }}>{num}</div>
              <p style={{ fontSize:'0.7rem', color:'#9ca3af', fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', marginTop:8 }}>{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding:'96px 24px' }}>
        <div className="two-col" style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          <Reveal>
            <div style={{ display:'flex', justifyContent:'center' }}>
              <div style={{ position:'relative' }}>
                <div style={{ width:320, height:320, borderRadius:'50%', background:'linear-gradient(135deg,#fef3c7 0%,#fde68a 50%,#fcd34d 100%)', border:'6px solid #fff', boxShadow:'0 24px 60px rgba(180,83,9,0.2)', display:'flex', alignItems:'center', justifyContent:'center', animation:'float 4s ease-in-out infinite' }}>
                  <div style={{ textAlign:'center', padding:'0 32px' }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", color:'#78350f', fontSize:'1.5rem', marginBottom:8 }}>Miri Rabi</div>
                    <div style={{ color:'#b45309', fontSize:'0.9rem', lineHeight:1.6 }}>Kallah Teacher &<br />Marriage Educator</div>
                    <div style={{ marginTop:16, fontSize:'1.5rem', color:'#d97706' }}>✦</div>
                  </div>
                </div>
                <div style={{ position:'absolute', bottom:-12, right:-12, background:'#fff', borderRadius:50, padding:'8px 16px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', border:'1px solid #fef3c7' }}>
                  <span style={{ fontSize:'0.75rem', fontWeight:600, color:'#78350f' }}>Melbourne & Worldwide</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div>
              <span style={s.label}>About Miri</span>
              <h2 style={{ ...s.h2, marginBottom:24 }}>You've found your <em style={s.gradText}>safe place to land.</em></h2>
              <p style={{ ...s.body, marginBottom:20 }}>Hi, I'm Miri — and if you're feeling nervous about what's ahead, take a breath. That's completely normal. Most Kallahs arrive with excitement, anxiety, and about a hundred questions they're scared to ask. By the end of our first session, that changes.</p>
              <div style={{ borderLeft:'4px solid #d97706', background:'linear-gradient(to right,#fffbf0,#fff)', padding:'20px 24px', borderRadius:'0 12px 12px 0', margin:'24px 0' }}>
                <p style={{ ...s.body, fontStyle:'italic' }}>"I don't teach from across a formal dining room table. I teach from a cozy couch, with a cup of tea, and absolutely no judgment."</p>
              </div>
              <p style={{ ...s.body, marginBottom:16 }}>I'm a certified Kallah teacher and marriage educator, trained under <strong>Mindy Wiesner</strong>. I weave together Halacha, emotional intelligence, attachment theory, and nervous-system science to give you the fullest picture of your life ahead.</p>
              <p style={{ color:'#374151', lineHeight:1.8, fontWeight:500 }}>I believe every woman deserves to know her body, understand her feelings, and enter marriage with real knowledge — not shame. You are allowed to ask anything here. <em>Anything.</em></p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section style={{ padding:'96px 24px', background:'linear-gradient(160deg,#fffbf0 0%,#fef3c7 60%,#fff7ed 100%)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <span style={{ ...s.label, display:'block' }}>Credentials & Expertise</span>
              <h2 style={s.h2}>Trained, certified, and <em style={s.gradText}>deeply committed.</em></h2>
            </div>
          </Reveal>
          <div className="three-col" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:32 }}>
            {[
              { icon:'🏅', title:'Certified Kallah Teacher', body:'Trained and certified under Mindy Wiesner, one of the most respected and innovative Kallah educators in the world.', sub:"Mindy's approach combines traditional Halacha with modern understanding of relationships, attachment, and emotional health." },
              { icon:'⭐', title:'Specialized Training', body:'Trained in attachment theory, emotional intelligence, and nervous-system science.', sub:"These aren't theoretical — they're practical tools I teach you to use in your marriage from day one." },
              { icon:'📖', title:'Integrated Approach', body:"I don't compartmentalize. Torah, science, emotion, and body all belong together.", sub:"This integration is what makes the difference between knowing the laws and living them with confidence." },
            ].map(({ icon, title, body, sub }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div style={{ background:'#fff', borderRadius:20, padding:32, boxShadow:'0 2px 16px rgba(180,83,9,0.06)', border:'1px solid #fef3c7', transition:'transform 0.3s,box-shadow 0.3s', cursor:'default', height:'100%' }} onMouseEnter={hoverCard} onMouseLeave={unhoverCard}>
                  <div style={{ width:56, height:56, borderRadius:16, background:'linear-gradient(135deg,#fef3c7,#fde68a)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', marginBottom:24 }}>{icon}</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', color:'#1a1a1a', marginBottom:12 }}>{title}</h3>
                  <p style={{ ...s.body, fontSize:'0.9rem', marginBottom:10 }}>{body}</p>
                  <p style={{ color:'#9ca3af', fontSize:'0.8rem', lineHeight:1.6 }}>{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ background:'#fff', borderRadius:20, padding:32, borderLeft:'4px solid #d97706', boxShadow:'0 2px 16px rgba(180,83,9,0.06)' }}>
              <p style={{ color:'#374151', lineHeight:1.8 }}><strong>My commitment:</strong> Every Kallah who works with me receives the same depth, care, and expertise. You're not getting a script — you're getting a trained professional who has dedicated herself to understanding this crucial transition and helping you navigate it with wisdom and compassion.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section id="approach" style={{ padding:'96px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <span style={{ ...s.label, display:'block' }}>My Approach</span>
              <h2 style={{ ...s.h2, marginBottom:12 }}>Teaching that goes <em style={s.gradText}>all the way in.</em></h2>
              <p style={{ color:'#6b7280', maxWidth:500, margin:'0 auto' }}>Halacha is the foundation — but it's not the whole house. My approach covers every room.</p>
            </div>
          </Reveal>
          <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:64 }}>
            {[
              { title:'Clarity Over Shame', body:"You'll leave knowing your anatomy, cycle, and needs — with real words, not whispered euphemisms. Knowledge is empowerment." },
              { title:'Attunement Over Perfection', body:"Marriage is a cycle of connection, disconnection, and repair. I teach you to navigate it with grace, not guilt." },
              { title:'Your Nervous System Matters', body:"Fear lives in the body. I integrate nervous-system regulation so you move through newness with calm, not anxiety." },
              { title:'A Safe Container', body:"I'm your emotional First Responder. I hold space for fears, validate your feelings, and help you trust your intuition." },
            ].map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div style={{ background:'#fffbf0', borderRadius:20, padding:32, border:'1px solid #fef3c7', transition:'transform 0.3s,box-shadow 0.3s', cursor:'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 32px rgba(180,83,9,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
                >
                  <div style={{ color:'#d97706', fontSize:'1.3rem', marginBottom:12 }}>✦</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.15rem', color:'#1a1a1a', marginBottom:10 }}>{title}</h3>
                  <p style={{ ...s.body, fontSize:'0.88rem' }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {/* ART Framework */}
          <Reveal>
            <div style={{ borderRadius:28, padding:'64px 48px', textAlign:'center', background:'linear-gradient(135deg,#fffbf0 0%,#fef3c7 50%,#fde68a 100%)' }}>
              <span style={{ ...s.label, display:'block' }}>Core Framework</span>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', color:'#1a1a1a', marginBottom:12 }}>The <span style={s.gradText}>A.R.T.</span> of Marriage</h3>
              <p style={{ color:'#6b7280', marginBottom:40, maxWidth:480, margin:'0 auto 40px', fontSize:'0.9rem' }}>A six-pillar framework woven into every session — a compass for every stage of married life.</p>
              <div className="six-col" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:16, maxWidth:600, margin:'0 auto' }}>
                {[['A','Acceptance'],['R','Respect'],['T','Trust'],['A','Appreciation'],['R','Resolution'],['T','Time']].map(([letter, word]) => (
                  <div key={word} style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.2rem', fontWeight:700, color:'#b45309', lineHeight:1 }}>{letter}</div>
                    <div style={{ fontSize:'0.7rem', fontWeight:600, color:'#78350f', marginTop:4 }}>{word}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES & PRICING ── */}
      <section id="services" style={{ padding:'96px 24px', background:'#fafaf9' }}>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <span style={{ ...s.label, display:'block' }}>Services & Pricing</span>
              <h2 style={s.h2}>Choose your <em style={s.gradText}>starting point.</em></h2>
            </div>
          </Reveal>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {[
              { badge:'Most Popular', badgeBg:'#fef3c7', price:'$1,400', unit:'full course', title:'Comprehensive Kallah Course', sub:'10 sessions · For the engaged woman', borderColor:'#d97706', desc:'The full journey covering Taharas HaMishpacha, female anatomy, emotional health, communication skills, nervous-system regulation, and space to ask every question.', items:['Taharas HaMishpacha laws — practical, clear, complete','Female anatomy & the body you deserve to know','The Intimacy Triangle & A.R.T. framework','Emotional health & communication skills','Nervous-system tools for the early weeks'], note:'Flexible scheduling · Sessions spaced 1–2 weeks apart' },
              { badge:'Recommended', badgeBg:'#fef9ee', price:'$420', unit:'3 sessions', title:'Post-Wedding Support', sub:'3 sessions · "The Fourth Trimester"', borderColor:'#f59e0b', desc:'3 sessions to process, recalibrate, and clear intimacy blocks. One of the best gifts for a new marriage.', items:['3 dedicated post-wedding sessions','Real-life halachic questions answered clearly','Intimacy blocks identified and gently addressed','Emotional processing for the newlywed transition'], note:'Best booked within 3 months of wedding' },
              { badge:null, price:'$150', unit:'per session', title:'Refresher Classes', sub:'For married women · Flexible pricing', borderColor:'#fbbf24', desc:'For married women carrying unhelpful myths about intimacy. Reconnect with your body, your marriage, and yourself from a healthier place.', items:['Available in-person in Melbourne or via Zoom','Completely confidential and deeply respectful','Tailored to your specific stage of marriage','Book 1 session or a package of 3–6'], note:'Book 3+ sessions for 10% discount' },
            ].map(({ badge, badgeBg, price, unit, title, sub, borderColor, desc, items, note }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div style={{ background:'#fff', borderRadius:20, padding:32, borderLeft:`4px solid ${borderColor}`, boxShadow:'0 2px 16px rgba(0,0,0,0.04)', transition:'transform 0.3s,box-shadow 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateX(4px)'; e.currentTarget.style.boxShadow=`-4px 8px 32px rgba(180,83,9,0.1)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateX(0)'; e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,0.04)'; }}
                >
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16, marginBottom:20 }}>
                    <div>
                      {badge && <span style={{ display:'inline-block', padding:'3px 12px', background:badgeBg, color:'#78350f', fontSize:'0.7rem', fontWeight:700, borderRadius:20, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:10 }}>{badge}</span>}
                      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.4rem', color:'#1a1a1a', marginBottom:4 }}>{title}</h3>
                      <p style={{ color:'#b45309', fontSize:'0.85rem', fontWeight:500 }}>{sub}</p>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.2rem', color:'#b45309', lineHeight:1 }}>{price}</div>
                      <div style={{ color:'#9ca3af', fontSize:'0.75rem' }}>{unit}</div>
                    </div>
                  </div>
                  <p style={{ ...s.body, fontSize:'0.88rem', marginBottom:16 }}>{desc}</p>
                  <ul style={{ listStyle:'none', padding:0, margin:'0 0 16px', display:'flex', flexDirection:'column', gap:8 }}>
                    {items.map(item => (
                      <li key={item} style={{ display:'flex', alignItems:'flex-start', gap:8, color:'#4b5563', fontSize:'0.85rem' }}>
                        <span style={{ color:'#d97706', marginTop:2, flexShrink:0 }}>✦</span> {item}
                      </li>
                    ))}
                  </ul>
                  <p style={{ color:'#9ca3af', fontSize:'0.75rem' }}>{note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div style={{ marginTop:40, borderRadius:20, padding:32, border:'1px solid #fde68a', textAlign:'center', background:'linear-gradient(135deg,#fffbf0,#fef3c7)' }}>
              <p style={{ color:'#374151', fontSize:'0.9rem', marginBottom:6 }}><strong>All prices include:</strong> Personalized approach, unlimited questions, email support between sessions, and a safe, judgment-free space.</p>
              <p style={{ color:'#9ca3af', fontSize:'0.8rem' }}>Payment plans available. Reach out to discuss what works for you.</p>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div style={{ textAlign:'center', marginTop:40 }}>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={s.btnPrimary} onMouseEnter={hoverPrimary} onMouseLeave={unhoverPrimary}>
                <CalendarIcon /> Book a Free 15-Minute Consultation
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section id="resources" style={{ padding:'96px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <span style={{ ...s.label, display:'block' }}>Free Resources</span>
              <h2 style={{ ...s.h2, marginBottom:12 }}>Start learning <em style={s.gradText}>right now.</em></h2>
              <p style={{ color:'#6b7280', maxWidth:480, margin:'0 auto', fontSize:'0.9rem' }}>Free guides, articles, and insights to help you begin your journey with confidence.</p>
            </div>
          </Reveal>
          <div className="three-col" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {blogResources.map(({ title, description, category }, i) => (
              <Reveal key={title} delay={(i % 3) * 100}>
                <div style={{ background:'#fff', borderRadius:20, padding:28, border:'1px solid #f3f4f6', boxShadow:'0 2px 12px rgba(0,0,0,0.04)', transition:'transform 0.3s,box-shadow 0.3s', cursor:'pointer', height:'100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 32px rgba(180,83,9,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.04)'; }}
                >
                  <span style={{ display:'inline-block', padding:'3px 10px', background:'#fef3c7', color:'#78350f', fontSize:'0.68rem', fontWeight:600, borderRadius:20, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:16 }}>{category}</span>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1rem', color:'#1a1a1a', marginBottom:10, lineHeight:1.4 }}>{title}</h3>
                  <p style={{ color:'#6b7280', fontSize:'0.83rem', lineHeight:1.6, marginBottom:16 }}>{description}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:6, color:'#b45309', fontSize:'0.83rem', fontWeight:600 }}>
                    <span>Read more</span> <ArrowRight />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding:'96px 24px', background:'#fafaf9' }}>
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <span style={{ ...s.label, display:'block' }}>Frequently Asked Questions</span>
              <h2 style={s.h2}>Your questions, <em style={s.gradText}>answered.</em></h2>
            </div>
          </Reveal>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {faqItems.map(({ q, a }, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{ background:'#fff', borderRadius:16, border:'1px solid #f3f4f6', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width:'100%', textAlign:'left', padding:'20px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, background:'none', border:'none', cursor:'pointer', fontFamily:"'Lora',serif" }}
                  >
                    <span style={{ fontWeight:600, color:'#1a1a1a', fontSize:'0.9rem', lineHeight:1.5 }}>{q}</span>
                    <span style={{ color:'#d97706', flexShrink:0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition:'transform 0.3s ease' }}><ChevronDown /></span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? 300 : 0, overflow:'hidden', transition:'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                    <p style={{ padding:'0 28px 24px', color:'#4b5563', fontSize:'0.88rem', lineHeight:1.8 }}>{a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:'96px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <span style={{ ...s.label, display:'block' }}>Get in Touch</span>
              <h2 style={s.h2}>Ready to begin your <em style={s.gradText}>journey?</em></h2>
            </div>
          </Reveal>
          <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40 }}>
            {/* Left */}
            <Reveal>
              <div>
                <div style={{ borderRadius:24, padding:32, marginBottom:24, background:'linear-gradient(135deg,#fffbf0,#fef3c7)' }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:'#d97706', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20, color:'#fff' }}><CalendarIcon /></div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', color:'#1a1a1a', marginBottom:10 }}>Book a Session</h3>
                  <p style={{ ...s.body, fontSize:'0.85rem', marginBottom:20 }}>Click below to view available times and book directly. Sessions are typically 45–60 minutes.</p>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ ...s.btnPrimary, justifyContent:'center', width:'100%' }} onMouseEnter={hoverPrimary} onMouseLeave={unhoverPrimary}>
                    <CalendarIcon /> Open Booking Calendar
                  </a>
                </div>
                <div style={{ background:'#fff', borderRadius:20, padding:28, border:'1px solid #fef3c7' }}>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', color:'#1a1a1a', marginBottom:20 }}>Or reach out directly:</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                    {[
                      { href:'mailto:mirirabi18@gmail.com', icon:<MailIcon />, label:'mirirabi18@gmail.com', bg:'#fffbf0', iconColor:'#b45309' },
                      { href:'https://wa.me/61425796566', icon:<WhatsAppIcon />, label:'+61 425 796 566 (WhatsApp)', bg:'#f0fdf4', iconColor:'#16a34a' },
                    ].map(({ href, icon, label, bg, iconColor }) => (
                      <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        style={{ display:'flex', alignItems:'center', gap:12, color:'#4b5563', textDecoration:'none', fontSize:'0.88rem', transition:'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color=iconColor} onMouseLeave={e => e.currentTarget.style.color='#4b5563'}
                      >
                        <div style={{ width:36, height:36, borderRadius:10, background:bg, display:'flex', alignItems:'center', justifyContent:'center', color:iconColor, flexShrink:0 }}>{icon}</div>
                        {label}
                      </a>
                    ))}
                    <div style={{ display:'flex', alignItems:'center', gap:12, color:'#4b5563', fontSize:'0.88rem' }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:'#fffbf0', display:'flex', alignItems:'center', justifyContent:'center', color:'#b45309', flexShrink:0 }}><LocationIcon /></div>
                      Melbourne & Worldwide (Zoom)
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            {/* Right: form */}
            <Reveal delay={200}>
              <div style={{ background:'#fff', borderRadius:20, padding:32, border:'1px solid #f3f4f6', boxShadow:'0 2px 16px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', color:'#1a1a1a', marginBottom:24 }}>Send a Message</h3>
                <form onSubmit={handleFormSubmit} action="https://formsubmit.co/mirirabi18@gmail.com" method="POST" style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  <input type="hidden" name="_subject" value="New message from Miri Rabi website" />
                  <input type="hidden" name="_captcha" value="false" />
                  {[{ name:'name', type:'text', placeholder:'Your name' }, { name:'email', type:'email', placeholder:'Your email address' }].map(({ name, type, placeholder }) => (
                    <input key={name} type={type} name={name} placeholder={placeholder} required value={formData[name]} onChange={handleFormChange}
                      style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:'0.9rem', color:'#1a1a1a', outline:'none', transition:'border-color 0.2s,box-shadow 0.2s' }}
                      onFocus={e => { e.target.style.borderColor='#d97706'; e.target.style.boxShadow='0 0 0 3px rgba(217,119,6,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; }}
                    />
                  ))}
                  <textarea name="message" placeholder="Tell me what brings you here..." rows={4} required value={formData.message} onChange={handleFormChange}
                    style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:'0.9rem', color:'#1a1a1a', outline:'none', resize:'none', transition:'border-color 0.2s,box-shadow 0.2s' }}
                    onFocus={e => { e.target.style.borderColor='#d97706'; e.target.style.boxShadow='0 0 0 3px rgba(217,119,6,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; }}
                  />
                  <button type="submit" style={{ ...s.btnPrimary, justifyContent:'center' }} onMouseEnter={hoverPrimary} onMouseLeave={unhoverPrimary}>
                    <SendIcon /> Send Message
                  </button>
                  {submitted && (
                    <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, padding:'12px 16px', textAlign:'center', color:'#15803d', fontSize:'0.85rem', fontWeight:500 }}>
                      ✓ Message sent! Miri will be in touch soon.
                    </div>
                  )}
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:'#1a1a1a', color:'#9ca3af', padding:'64px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.5rem', color:'#fff', marginBottom:8 }}>Miri Rabi</p>
          <p style={{ fontSize:'0.85rem', color:'#6b7280', marginBottom:32 }}>Kallah Teacher & Marriage Educator · Melbourne, Australia</p>
          <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:24, marginBottom:32, fontSize:'0.85rem' }}>
            {['About','Approach','Services','Resources','FAQ','Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ color:'#6b7280', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='#6b7280'}
              >{link}</a>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'center', gap:24, marginBottom:32, flexWrap:'wrap' }}>
            <a href="mailto:mirirabi18@gmail.com" style={{ color:'#6b7280', textDecoration:'none', fontSize:'0.83rem', display:'flex', alignItems:'center', gap:6, transition:'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='#6b7280'}
            ><MailIcon /> mirirabi18@gmail.com</a>
            <a href="https://wa.me/61425796566" target="_blank" rel="noopener noreferrer" style={{ color:'#6b7280', textDecoration:'none', fontSize:'0.83rem', display:'flex', alignItems:'center', gap:6, transition:'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='#6b7280'}
            ><WhatsAppIcon /> +61 425 796 566</a>
          </div>
          <div style={{ borderTop:'1px solid #374151', paddingTop:24, fontSize:'0.75rem', color:'#4b5563' }}>
            © 2025 Miri Rabi. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default MiriWebsite;
