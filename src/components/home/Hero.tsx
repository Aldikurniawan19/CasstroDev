import ChipGraphic from "./ChipGraphic";
import Reveal from "@/components/common/Reveal";

export default function Hero() {
  return (
    <section className="pt-8 md:pt-14 pb-16 md:pb-24 grid-layout items-center" id="hero">
      <Reveal className="col-span-4 md:col-span-8 xl:col-span-7 flex flex-col gap-stack-lg">

        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-text-main tracking-tight">
          Crafting High-Performance Digital Solutions
        </h1>

        <p className="font-body-lg text-body-lg text-text-muted max-w-2xl leading-relaxed">
          Kami membangun arsitektur perangkat lunak yang tangguh dan skalabel untuk bisnis modern.
          Pendekatan berbasis rekayasa presisi untuk memastikan keandalan, keamanan, dan performa
          optimal di setiap baris kode.
        </p>

        <div className="flex flex-col sm:flex-row gap-stack-md pt-stack-sm">
          <a
            href="/tentang-kami#contact"
            className="bg-primary-container text-on-primary px-8 py-3.5 rounded font-label-md text-label-md hover:bg-primary transition-all text-center shadow-md hover:shadow-lg"
          >
            Hubungi Kami
          </a>
          <a
            href="/portofolio"
            className="bg-white text-primary-container border border-primary-container px-8 py-3.5 rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors text-center"
          >
            Lihat Portofolio
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="col-span-4 md:col-span-8 xl:col-span-5 h-[350px] sm:h-[450px] xl:h-[550px] relative mt-10 xl:mt-0">
        <ChipGraphic />
      </Reveal>
    </section>
  );
}