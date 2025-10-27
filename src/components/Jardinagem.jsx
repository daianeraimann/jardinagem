import { useState, useMemo } from "react";
import { motion } from "framer-motion";
// Ícone Dumbbell substituído por Sprout (broto/planta)
import { Sprout, Menu, X, MapPin, Phone, Mail, Instagram, CheckCircle2, Clock, Shield } from "lucide-react";
// Adicione esta linha no topo do seu arquivo
import gardenImage from '../assets/garden.webp';
import diogenes from "./assets/diogenes.webp";


// Sua nova paleta de cores
const c = { base:"#efece2", teal:"#4a4857", tealDark:"#77b885", deep:"#77b885", darkest:"#4a4857" };

// Itens de navegação atualizados
const navItems = [
  { id:"sobre", label:"Sobre" },
  { id:"servicos", label:"Serviços" },
  { id:"atendimento", label:"Área de Atendimento" },
  { id:"diferenciais", label:"Diferenciais" },
  { id:"contato", label:"Contato" },
];

function useScrollTo(){ return (id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }

function Logo(){
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="grid place-items-center w-10 h-10 rounded-2xl" style={{background:c.teal,color:c.base}}>
        {/* Ícone atualizado */}
        <Sprout className="w-5 h-5" />
      </div>
      <div className="leading-tight">
        {/* Textos atualizados */}
        <p className="font-semibold tracking-wide" style={{color:c.base}}>Diógenes Jardinagem</p>
        <p className="text-xs opacity-80" style={{color:c.base}}>Manutenção & Limpeza Pós-Obra</p>
      </div>
    </div>
  );
}

function Header(){
  const [open,setOpen]=useState(false);
  const scrollTo = useScrollTo();
  return (
    // O fundo do header usa 'darkest' (rgba(10,12,13,0.4)). Se o seu 'darkest' for o #4a4857,
    // você pode querer ajustar esse RGBA para algo como "rgba(74, 72, 87, 0.4)"
    <header className="sticky top-0 z-40 backdrop-blur" style={{background:"rgba(74, 72, 87, 0.4)"}}>
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
              {/* Botão atualizado */}
              Fale Comigo
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
                      // Cor de fundo do menu mobile atualizada para a nova paleta
                      style={{color:c.base,background:c.deep+"22"}}>
                {i.label}
              </button>
            ))}
            <a href="#contato" onClick={(e)=>{e.preventDefault();setOpen(false);document.getElementById("contato")?.scrollIntoView({behavior:"smooth"});}}
               className="mt-1 w-full text-center px-4 py-3 rounded-xl text-sm font-semibold"
               style={{background:c.teal,color:c.base}}>
              Fale Comigo
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
         // Estilo do badge atualizado para a nova paleta
         style={{background:c.deep+"22",color:c.base,border:`1px solid ${c.tealDark}33`}}>
      {icon}<span>{text}</span>
    </div>
  );
}

function Hero(){
  return (
    // O gradiente do Hero agora usa o 'darkest' (#4a4857) e o 'deep' (#77b885)
    <section className="relative" style={{background:`linear-gradient(180deg, ${c.darkest} 0%, ${c.deep} 100%)`}}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight" style={{color:c.base}}>
              O seu jardim bem cuidado,<br className="hidden sm:block"/> o ano todo.
            </h1>
            <p className="text-base sm:text-lg max-w-prose opacity-90" style={{color:c.base}}>
              Serviços de jardinagem, manutenção e limpeza especializada. Atendimento focado no <span className="font-semibold">Norte de Florianópolis</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#servicos" className="px-5 py-3 rounded-xl text-sm font-semibold shadow-md text-center" style={{background:c.teal,color:c.base}}>Ver Serviços</a>
              <a href="#contato" className="px-5 py-3 rounded-xl text-sm font-semibold text-center border" style={{borderColor:c.teal,color:c.base}}>Fale Comigo</a>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Badge icon={<CheckCircle2 className="w-4 h-4" />} text="Experiência Comprovada" />
              <Badge icon={<Clock className="w-4 h-4" />} text="Atendimento Flexível" />
              <Badge icon={<Shield className="w-4 h-4" />} text="Serviço Confiável" />
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.1}} className="relative">
            <img 
              src={gardenImage}
              alt="Foto de um jardim bem cuidado"
              className="aspect-[4/5] w-full object-cover rounded-3xl shadow-2xl"
            />

          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Section usa 'darkest' (#4a4857) como fundo padrão
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
    <Section id="sobre" title="Olá, sou Diógenes Raimann" subtitle="Jardineiro de 35 anos, focado e empenhado em transformar e manter áreas verdes.">
      <div className="grid md:grid-cols-[280px,1fr] gap-8 items-start">
        
        {/*           IMPORTANTE: Coloque uma foto do Diógenes na pasta 'public'
          e nomeie como 'diogenes-jardineiro.webp'
          ou use um placeholder como abaixo:
        */}
        <img src={diogenes} alt="Diógenes Raimann" />

        <div className="space-y-4">
          <p className="text-sm sm:text-base leading-relaxed" style={{color:c.base}}>
            Iniciando minha trajetória profissional, meu foco é revitalizar seu espaço com dedicação. Entendo que cada jardim é único e ofereço um serviço cuidadoso, da manutenção geral à limpeza pesada, garantindo que seu ambiente prospere.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {/* Lista de serviços atualizada */}
            {["Manutenção Geral de Jardins","Limpeza Pesada (Pós-obra, mudança)","Corte de Grama e Poda","Revitalização de Áreas Verdes"].map(t=>(
              <li key={t} className="flex items-start gap-2" style={{color:c.base}}>
                <CheckCircle2 className="mt-0.5 w-4 h-4 flex-shrink-0" style={{color:c.deep}}/>
                <span className="text-sm">{t}</span>
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
    // O fundo do card usa 'deep' (#77b885) e a borda também.
    // Se 'darkest' (#4a4857) for o fundo principal, talvez 'teal' (#4a4857) seja melhor para o card?
    // Vou manter o 'deep' (verde) como você definiu na paleta.
    <div className={`rounded-3xl p-6 border shadow-sm flex flex-col ${highlight ? "scale-[1.02]" : ""}`} style={{ borderColor: c.deep, background: c.darkest }}>
      <div className="mb-4">
        <h3 className="text-xl font-bold" style={{ color: c.base }}>{name}</h3>
        <p className="text-3xl font-extrabold mt-2" style={{ color: c.base }}>
          {price} <span className="text-sm font-medium opacity-80">/{per}</span>
        </p>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2" style={{ color: c.base }}>
            <CheckCircle2 className="mt-0.5 w-4 h-4 flex-shrink-0" style={{color:c.deep}} />
            <span className="text-sm">{f}</span>
          </li>
        ))}
      </ul>
      <a href="#contato" className="mt-auto text-center px-4 py-2 rounded-xl font-semibold" style={{ background: c.tealDark, color: c.darkest }}>
        Solicitar Serviço
      </a>
    </div>
  );
}

function Plans() {
  // Seus "planos" agora são os serviços
  const plans = useMemo(() => [
    { 
      name: "Manutenção do Jardim", 
      price: "A partir de R$250", 
      per: "serviço", 
      features: ["Corte de grama", "Poda de arbustos", "Limpeza de folhas", "Adubação básica"] 
    },
    { 
      name: "Limpeza Pesada", 
      price: "Sob Orçamento", 
      per: "projeto", 
      features: ["Limpeza pós-obra", "Limpeza pré/pós-mudança", "Remoção de entulhos verdes", "Preparo do terreno"], 
      highlight: true 
    },
    { 
      name: "Paisagismo e Novo Plantio", 
      price: "Sob Orçamento", 
      per: "projeto", 
      features: ["Novo plantio e design", "Controle de pragas (natural)", "Design de canteiros", "Adubação premium"] 
    },
  ], []);

  return (
    <Section id="servicos" title="Serviços Detalhados" subtitle="Soluções completas para a necessidade do seu jardim.">
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => <PlanCard key={p.name} {...p} />)}
      </div>
      <p className="text-xs opacity-70 mt-4" style={{ color: c.base }}>* Valores podem variar conforme o tamanho e complexidade do serviço.</p>
    </Section>
  );
}

function Locations() {
  return (
    <Section id="atendimento" title="Área de Atendimento" subtitle="Atendimento focado na região Norte de Florianópolis.">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Coluna do Mapa */}
        <div className="rounded-3xl overflow-hidden border" style={{ borderColor: c.deep }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56683.00344445851!2d-48.49080208638914!3d-27.46914620603704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952741973715e217%3A0xb06d2c68c34c8f5!2sNorte%20da%20Ilha%2C%20Florian%C3%B3polis%20-%20SC!5e0!3m2!1spt-BR!2sbr!4v1729899395275!5m2!1spt-BR!2sbr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        {/* Coluna dos Bairros */}
        <div className="rounded-3xl p-6 border" style={{ borderColor: c.deep, background: c.darkest }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: c.base }}>Principais Bairros Atendidos</h3>
          <ul className="grid sm:grid-cols-1 gap-3">
            {["Ingleses do Rio Vermelho", "São João do Rio Vermelho"].map(t=>(
              <li key={t} className="flex items-start gap-2" style={{color:c.base}}>
                <MapPin className="mt-0.5 w-4 h-4 flex-shrink-0" style={{color:c.deep}}/>
                <span className="text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}


function Differentials() {
  const items = [
    { title: "Serviço Dedicado e Cuidadoso", text: "Compromisso e atenção aos detalhes para cuidar do seu jardim como se fosse meu." },
    { title: "Especialista em Limpeza Pesada", text: "Solução ideal para pós-obra, pré-mudança ou terrenos abandonados." },
    { title: "Manutenção Completa", text: "Do corte de grama à adubação, seu jardim saudável o ano todo." },
    { title: "Atendimento Local", text: "Foco no Norte da Ilha, garantindo agilidade e pontualidade no serviço." },
  ];
  return (
    <Section id="diferenciais" title="Por que escolher Diógenes Jardinagem?">
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((it) => (
          <div key={it.title} className="rounded-3xl p-6 border" style={{ borderColor: c.deep, background: c.darkest }}>
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
    <Section id="contato" title="Fale Comigo" subtitle="Entre em contato para agendar uma visita e tirar suas dúvidas.">
      <div className="grid lg:grid-cols-2 gap-8">
        

        <div className="space-y-4">
          <div className="rounded-3xl p-6 border" style={{ borderColor: c.deep, background: c.darkest }}>
            <div className="grid sm:grid-cols-2 gap-3">
              {/* WhatsApp Link Atualizado */}
              <a href="https://wa.me/554899465835" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ borderColor: c.tealDark, color: c.base }}>
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
              {/* Instagram Link Atualizado */}
              <a href="https://instagram.com/diogenesrai" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ borderColor: c.tealDark, color: c.base }}>
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              {/* Link de E-mail removido */}
              {/* Link do Mapa Adicionado */}
              
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
              <Sprout className="w-4 h-4" style={{ color: c.base }} />
            </div>
            <p className="text-sm" style={{ color: c.base }}>© {new Date().getFullYear()} Diógenes Jardinagem — Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-5 text-sm" style={{ color: c.base }}>
            <a href="#sobre" className="hover:opacity-80">Sobre</a>
            <a href="#servicos" className="hover:opacity-80">Serviços</a>
            <a href="#contato" className="hover:opacity-80">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingJardinagem(){
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

