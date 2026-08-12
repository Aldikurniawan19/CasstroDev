import Reveal from "@/components/common/Reveal";

export default function PortfolioHero() {
  return (
    <section
      className="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-8 md:pt-14 pb-stack-lg"
      id="portfolio-hero"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
        <Reveal className="col-span-4 md:col-span-8 md:col-start-1">
          <div className="inline-block px-4 py-1 border border-border-subtle rounded-full w-fit mb-4 bg-white/50">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
              Showcase & Studi Kasus Rekayasa
            </span>
          </div>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-stack-md">
            Karya & Studi Kasus Kami.
          </h1>
          <p className="font-body-lg text-body-lg text-text-muted max-w-2xl leading-relaxed">
            Eksplorasi solusi rekayasa perangkat lunak presisi yang telah kami bangun untuk berbagai
            industri. Dari aplikasi skala enterprise hingga pengalaman mobile yang mulus.
          </p>
        </Reveal>
      </div>
    </section>
  );
}