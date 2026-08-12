import Reveal from "@/components/common/Reveal";

export default function AboutHero() {
  return (
    <section className="pt-8 md:pt-14 pb-16 md:pb-24 grid grid-cols-4 md:grid-cols-12 gap-gutter items-center" id="about-hero">
      <Reveal className="col-span-4 md:col-span-7 flex flex-col gap-stack-lg">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary leading-tight">
          Membangun Perangkat Lunak dengan <span className="text-secondary">Presisi.</span>
        </h1>
        <p className="font-body-lg text-body-lg text-text-muted max-w-2xl leading-relaxed">
          Kami adalah firma rekayasa perangkat lunak yang berdedikasi pada standar keunggulan teknis
          tertinggi. Visi kami bukan sekadar menulis kode, melainkan merancang arsitektur digital
          yang stabil, terukur, dan presisi. Misi kami adalah menjadi mitra teknologi jangka panjang
          bagi perusahaan yang mengutamakan kualitas substansial di atas tren sesaat.
        </p>
      </Reveal>
      <Reveal delay={0.15} className="col-span-4 md:col-span-5 flex items-center justify-center">
        <img
          className="w-full max-w-[350px] md:max-w-[380px] h-auto"
          src="/images/gambarOrang.png"
          alt="Modern Software House Corporate Engineering Office Environment"
          loading="lazy"
        />
      </Reveal>
    </section>
  );
}