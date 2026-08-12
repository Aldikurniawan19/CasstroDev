import Reveal from "@/components/common/Reveal";
import TeamCarousel from "./TeamCarousel";

export default function TeamGrid() {
  return (
    <section className="py-section-gap border-t border-border-subtle" id="leadership">
      <Reveal y={24}>
        <div className="mb-stack-lg flex flex-col md:flex-row md:items-end md:justify-between gap-stack-md">
          <div>
            <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-primary mb-stack-sm">
              Anggota Tim Kami
            </h2>
            <div className="h-1 w-16 bg-accent-cyan rounded-full"></div>
          </div>
        </div>
      </Reveal>

      <Reveal y={32}>
        <TeamCarousel />
      </Reveal>
    </section>
  );
}
