import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Menu, X, MapPin, Phone, Mail, Instagram, CheckCircle2, Clock, Shield } from "lucide-react";

const c = { base:"#f2f2f2", teal:"#348e91", tealDark:"#1c5052", deep:"#213635", darkest:"#0a0c0d" };
const navItems = [
  { id:"sobre", label:"Sobre mim" },
  { id:"planos", label:"Planos e Preços" },
  { id:"locais", label:"Local de Atendimento" },
  { id:"diferenciais", label:"Diferenciais" },
  { id:"contato", label:"Contato" },
];

function useScrollTo(){ return (id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }

function Logo(){
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="grid place-items-center w-10 h-10 rounded-2xl" style={{background:c.teal,color:c.base}}>
        <Dumbbell className="w-5 h-5" />
      </div>
      <div className="leading-tight">
        <p className="font-semibold tracking-wide" style={{color:c.base}}>Personal Gabriela Maia</p>
        <p className="text-xs opacity-80" style={{color:c.base}}>Performance & Saúde</p>
      </div>
    </div>
  );
}

function Header(){
  const [open,setOpen]=useState(false);
  const scrollTo = useScrollTo();
  return (
    <header className="sticky top-0 z-40 backdrop-blur" style={{background:"rgba(10,12,13,0.4)"}}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(i=>(
              <button key={i.id} onClick={()=>scrollTo(i.id)} className="text-sm font-medium hover:opacity-90" style={{color:c.base}}>
                {i.label}
              </button>
            ))}
            <a href="#contato" onClick={(e)=>{e.preventDefault();scrollTo("contato");}}
               className="px-4 py-2 rounded-xl text-sm font-semibold shadow-sm"
               style={{background:c.teal,color:c.base}}>
              Agendar avaliação
            </a>
          </nav>
          <button className="md:hidden p-2 rounded-xl border" style={{borderColor:c.deep,color:c.base}}
                  onClick={()=>setOpen(v=>!v)} aria-label="Abrir menu">
            {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t" style={{borderColor:c.deep,background:c.darkest}}>
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            {navItems.map(i=>(
              <button key={i.id} onClick={()=>{setOpen(false);document.getElementById(i.id)?.scrollIntoView({behavior:"smooth"});}}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium"
                      style={{color:c.base,background:"rgba(52,142,145,0.12)"}}>
                {i.label}
              </button>
            ))}
            <a href="#contato" onClick={(e)=>{e.preventDefault();setOpen(false);document.getElementById("contato")?.scrollIntoView({behavior:"smooth"});}}
               className="mt-1 w-full text-center px-4 py-3 rounded-xl text-sm font-semibold"
               style={{background:c.teal,color:c.base}}>
              Agendar avaliação
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({icon,text}) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
         style={{background:"#348e911a",color:c.base,border:`1px solid ${c.tealDark}33`}}>
      {icon}<span>{text}</span>
    </div>
  );
}

function Hero(){
  return (
    <section className="relative" style={{background:`linear-gradient(180deg, ${c.darkest} 0%, ${c.deep} 100%)`}}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight" style={{color:c.base}}>
              Treinos personalizados<br className="hidden sm:block"/> para resultados reais
            </h1>
            <p className="text-base sm:text-lg max-w-prose opacity-90" style={{color:c.base}}>
              Atendimento humanizado com foco em <span className="font-semibold">performance</span>, <span className="font-semibold">saúde</span> e <span className="font-semibold">consistência</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#planos" className="px-5 py-3 rounded-xl text-sm font-semibold shadow-md text-center" style={{background:c.teal,color:c.base}}>Ver planos</a>
              <a href="#contato" className="px-5 py-3 rounded-xl text-sm font-semibold text-center border" style={{borderColor:c.teal,color:c.base}}>Avaliação gratuita</a>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Badge icon={<CheckCircle2 className="w-4 h-4" />} text="CREF ativo" />
              <Badge icon={<Clock className="w-4 h-4" />} text="Horários flexíveis" />
              <Badge icon={<Shield className="w-4 h-4" />} text="Metodologia segura" />
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.1}} className="relative">
            <div className="aspect-[4/5] rounded-3xl shadow-2xl overflow-hidden"
                 style={{background:`radial-gradient(1200px 500px at 20% 10%, ${c.teal}22, transparent), ${c.deep}`}}>
              <div className="absolute inset-0 grid place-items-center">
                <Dumbbell className="w-28 h-28 opacity-20" style={{color:c.base}}/>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Section({id,title,subtitle,children}){
  return (
    <section id={id} className="py-14 sm:py-20" style={{background:c.darkest}}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{color:c.base}}>{title}</h2>
          {subtitle && <p className="mt-2 text-sm sm:text-base opacity-90" style={{color:c.base}}>{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function About(){
  return (
    <Section id="sobre" title="Sobre mim" subtitle="Sou Personal Trainer com experiência em condicionamento físico, emagrecimento e performance, unindo ciência e atendimento humano.">
      <div className="grid md:grid-cols-[280px,1fr] gap-8 items-start">
        
        {/* ALTERAÇÃO AQUI */}
        <img 
          src="/personal-gab.webp" 
          alt="Foto da Personal Trainer Gabriela" 
          className="w-full h-auto rounded-3xl object-cover border md:h-72" 
          style={{borderColor:c.deep}} 
        />

        <div className="space-y-4">
          <p className="text-sm sm:text-base leading-relaxed" style={{color:c.base}}>
            Avaliação detalhada, periodização inteligente e acompanhamento contínuo via app garantem evolução consistente e segura.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {["Avaliação postural e mobilidade","Planilhas semanais","Acompanhamento por WhatsApp","Integração com wearables"].map(t=>(
              <li key={t} className="flex items-start gap-2" style={{color:c.base}}>
                <CheckCircle2 className="mt-0.5 w-4 h-4"/><span className="text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function PlanCard({ name, price, per, features, highlight }) {
  return (
    <div className={`rounded-3xl p-6 border shadow-sm flex flex-col ${highlight ? "scale-[1.02]" : ""}`} style={{ borderColor: c.deep, background: c.deep }}>
      <div className="mb-4">
        <h3 className="text-xl font-bold" style={{ color: c.base }}>{name}</h3>
        <p className="text-3xl font-extrabold mt-2" style={{ color: c.base }}>
          {price} <span className="text-sm font-medium opacity-80">/{per}</span>
        </p>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2" style={{ color: c.base }}>
            <CheckCircle2 className="mt-0.5 w-4 h-4" />
            <span className="text-sm">{f}</span>
          </li>
        ))}
      </ul>
      <a href="#contato" className="mt-auto text-center px-4 py-2 rounded-xl font-semibold" style={{ background: c.teal, color: c.base }}>
        Escolher plano
      </a>
    </div>
  );
}

function Plans() {
  const plans = useMemo(() => [
    { name: "Start",       price: "R$ 199", per: "mês", features: ["Treino personalizado (mensal)", "Suporte semanal por WhatsApp", "Acesso ao app"] },
    { name: "Performance", price: "R$ 349", per: "mês", features: ["Atualização quinzenal", "Check-in semanal por vídeo", "Ajustes básicos de nutrição", "Relatórios"], highlight: true },
    { name: "Premium 1:1", price: "R$ 799", per: "mês", features: ["Sessões presenciais semanais", "Avaliação mensal completa", "Periodização avançada", "Suporte prioritário"] },
  ], []);

  return (
    <Section id="planos" title="Planos e Preços" subtitle="Escolha o formato que melhor se adapta ao seu momento.">
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => <PlanCard key={p.name} {...p} />)}
      </div>
      <p className="text-xs opacity-70 mt-4" style={{ color: c.base }}>* Valores ilustrativos.</p>
    </Section>
  );
}

function Locations() {
  return (
    <Section id="locais" title="Local de Atendimento" subtitle="Presencial e online conforme sua necessidade.">
      <div className="grid md:grid-cols-3 gap-6">
        {["Estúdio Parceiro", "Condomínio/Residência", "Aulas Online"].map((t, i) => (
          <div key={t} className="rounded-3xl overflow-hidden border" style={{ borderColor: c.deep, background: c.deep }}>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2" style={{ color: c.base }}>
                <MapPin className="w-5 h-5" /><h3 className="font-semibold">{t}</h3>
              </div>
              <p className="text-sm opacity-90" style={{ color: c.base }}>
                {i === 0 && "Equipado para musculação, funcional e HIIT."}
                {i === 1 && "Levo equipamentos essenciais e adapto ao seu espaço."}
                {i === 2 && "Treinos por videochamada com acompanhamento em tempo real."}
              </p>
            </div>
            <div className="h-36 w-full" style={{ background: `linear-gradient(135deg, ${c.teal}33, ${c.deep})` }} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Differentials() {
  const items = [
    { title: "Base em evidências", text: "Protocolos com ciência do exercício e resposta individual." },
    { title: "Acompanhamento contínuo", text: "Feedbacks semanais e ajustes de volume/intensidade." },
    { title: "Foco em longevidade", text: "Mais força, mobilidade e saúde cardiovascular." },
    { title: "Tecnologia a favor", text: "Integração com wearables e indicadores simples." },
  ];
  return (
    <Section id="diferenciais" title="Diferenciais">
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((it) => (
          <div key={it.title} className="rounded-3xl p-6 border" style={{ borderColor: c.deep, background: c.deep }}>
            <h3 className="font-semibold mb-2" style={{ color: c.base }}>{it.title}</h3>
            <p className="text-sm opacity-90" style={{ color: c.base }}>{it.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contato" title="Fale comigo" subtitle="Tire suas dúvidas e agende uma avaliação gratuita.">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-3xl p-6 border" style={{ borderColor: c.deep, background: c.deep }}>
          <form className="grid gap-4" onSubmit={(e)=>e.preventDefault()}>
            <div className="grid gap-2">
              <label className="text-sm" style={{ color: c.base }}>Nome</label>
              <input className="px-3 py-2 rounded-xl bg-transparent border outline-none" style={{ borderColor: c.teal, color: c.base }} placeholder="Seu nome" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm" style={{ color: c.base }}>E-mail</label>
              <input type="email" className="px-3 py-2 rounded-xl bg-transparent border outline-none" style={{ borderColor: c.teal, color: c.base }} placeholder="voce@email.com" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm" style={{ color: c.base }}>Mensagem</label>
              <textarea rows={4} className="px-3 py-2 rounded-xl bg-transparent border outline-none" style={{ borderColor: c.teal, color: c.base }} placeholder="Conte seu objetivo" />
            </div>
            <button type="submit" className="px-5 py-3 rounded-xl font-semibold" style={{ background: c.teal, color: c.base }}>
              Enviar mensagem
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl p-6 border" style={{ borderColor: c.deep, background: c.deep }}>
            <h3 className="font-semibold mb-3" style={{ color: c.base }}>Canais</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ borderColor: c.teal, color: c.base }}>
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
              <a href="mailto:contato@trainerpro.com" className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ borderColor: c.teal, color: c.base }}>
                <Mail className="w-4 h-4" /> E-mail
              </a>
              <a href="https://instagram.com/daianeraimann" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ borderColor: c.teal, color: c.base }}>
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a href="tel:+5500000000000" className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ borderColor: c.teal, color: c.base }}>
                <Phone className="w-4 h-4" /> Telefone
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="pt-10" style={{ background: c.darkest }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 border-t" style={{ borderColor: c.deep }}>
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl grid place-items-center" style={{ background: c.teal }}>
              <Dumbbell className="w-4 h-4" style={{ color: c.base }} />
            </div>
            <p className="text-sm" style={{ color: c.base }}>© {new Date().getFullYear()} Trainer Pro — Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-5 text-sm" style={{ color: c.base }}>
            <a href="#sobre" className="hover:opacity-80">Sobre</a>
            <a href="#planos" className="hover:opacity-80">Planos</a>
            <a href="#contato" className="hover:opacity-80">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPersonalTrainer(){
  return (
    <div className="min-h-screen" style={{background:c.darkest}}>
      <style>{`html{scroll-behavior:smooth}`}</style>
      <Header />
      <main>
        <Hero />
        <About />
        <Plans />
        <Locations />
        <Differentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
