import Reveal from "@/components/common/Reveal";

export default function ServicesHero() {
  return (
    <section
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-8 md:pt-14 pb-stack-lg"
      id="services-hero"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
        <Reveal className="col-span-4 md:col-span-8 md:col-start-3 text-center">
          <div className="inline-block px-4 py-1 border border-border-subtle rounded-full w-fit mx-auto mb-4 bg-white/50">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
              Layanan Rekayasa Perangkat Lunak
            </span>
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-text-main mb-stack-md">
            Solusi Perangkat Lunak Presisi
          </h1>
          <p className="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            Kami merancang, membangun, dan memelihara sistem digital berkinerja tinggi. Pendekatan
            rekayasa kami memastikan skalabilitas, keamanan, dan keunggulan teknis di setiap lapisan
            tumpukan teknologi Anda.
          </p>
        </Reveal>
      </div>
    </section>
  );
}