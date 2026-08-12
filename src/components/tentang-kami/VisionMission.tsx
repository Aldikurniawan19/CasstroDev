import Reveal from "@/components/common/Reveal";
import { Target, ListChecks } from "lucide-react";

const missionItems = [
  "Membangun hubungan yang dekat dan komunikatif dengan client dalam memahami kebutuhan dan tujuan proyek.",
  "Mengembangkan solusi digital yang inovatif dan relevan sesuai dengan kebutuhan yang ada.",
  "Mengutamakan kualitas, kreativitas, dan ketelitian dalam setiap proses pengembangan.",
  "Memberikan pengalaman kerja sama yang profesional dan menyenangkan dalam setiap proyek.",
  "Menghasilkan solusi digital yang memiliki nilai dan manfaat nyata bagi pengguna.",
];

export default function VisionMission() {
  return (
    <section className="grid-layout pb-section-gap" id="visi-misi">
      <Reveal y={24} className="col-span-4 md:col-span-8 xl:col-span-12 mb-stack-lg">
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
          Arah & Tujuan
        </span>
        <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-primary mt-2 mb-stack-sm">
          Visi & Misi
        </h2>
        <div className="h-1 w-16 bg-accent-cyan rounded-full"></div>
      </Reveal>

      <Reveal className="col-span-4 md:col-span-6 xl:col-span-6 h-full">
        <div className="bg-primary text-white rounded-lg p-stack-lg relative overflow-hidden h-full flex flex-col justify-between gap-stack-lg">
          <div className="absolute top-0 right-0 w-52 h-52 border border-white/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-11 h-11 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <span className="font-label-md text-label-md text-white/80 uppercase tracking-widest font-semibold">
              Visi
            </span>
          </div>
          <p className="relative z-10 font-headline-lg text-headline-lg md:font-headline-xl md:text-headline-xl text-white leading-tight font-semibold">
            Membangun solusi digital untuk menciptakan dampak yang nyata.
          </p>
          <div className="relative z-10 h-1 w-12 bg-accent-cyan rounded-full"></div>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="col-span-4 md:col-span-6 xl:col-span-6 h-full">
        <div className="bg-surface-container-lowest border border-border-subtle rounded-lg p-stack-lg h-full">
          <div className="flex items-center gap-3 mb-stack-md">
            <div className="w-11 h-11 bg-surface-container-low text-primary rounded-full flex items-center justify-center">
              <ListChecks className="w-5 h-5" />
            </div>
            <span className="font-label-md text-label-md text-text-muted uppercase tracking-widest font-semibold">
              Misi
            </span>
          </div>
          <ol className="flex flex-col">
            {missionItems.map((item, index) => (
              <li
                key={index}
                className="flex gap-4 py-4 border-b border-border-subtle last:border-b-0 items-start"
              >
                <span className="font-mono text-label-sm text-accent-cyan font-bold shrink-0 w-6 text-right pt-0.5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-body-md text-body-md text-text-main leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}