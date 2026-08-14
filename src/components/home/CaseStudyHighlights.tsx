import Reveal from "@/components/common/Reveal";

const advantages = [
  {
    icon: "timer",
    title: "Cepat & Tepat Waktu",
    description:
      "Proses pengerjaan terstruktur dengan target yang jelas, sehingga proyek selesai tepat waktu tanpa mengorbankan kualitas.",
    featured: true,
  },
  {
    icon: "devices",
    title: "Responsif di Semua Perangkat",
    description:
      "Website dirancang responsif dan nyaman digunakan di berbagai perangkat, mulai dari smartphone, tablet, hingga desktop.",
    featured: false,
  },
  {
    icon: "speed",
    title: "Optimasi Kecepatan & SEO",
    description:
      "Website dioptimalkan agar memiliki performa cepat, struktur yang baik, dan lebih siap ditemukan melalui mesin pencari.",
    featured: false,
  },
];

export default function CaseStudyHighlights() {
  return (
    <section className="py-section-gap grid-layout bg-white border-t border-border-subtle" id="advantages">
      <Reveal className="col-span-4 md:col-span-8 xl:col-span-12 mb-stack-lg flex flex-col md:flex-row justify-between items-end gap-stack-md">
        <div>
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-text-main mb-stack-sm">
            Mengapa Memilih Kami?
          </h2>
          <p className="font-body-md text-body-md text-text-muted max-w-2xl">
            Menghadirkan solusi digital yang cepat, responsif, dan berkualitas 
            dengan mengutamakan kebutuhan bisnis serta pengalaman pengguna.
          </p>
        </div>
        <a
          href="/kontak"
          className="font-label-md text-label-md text-primary-container hover:text-primary flex items-center gap-2 group font-semibold"
        >
          Mulai Konsultasi
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </a>
      </Reveal>

      <Reveal className="col-span-4 md:col-span-8 xl:col-span-12">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
          {advantages.map((item, index) =>
            item.featured ? (
              <Reveal
                key={item.title}
                delay={index * 0.1}
                className="col-span-4 md:col-span-4 h-full"
              >
                <article className="bg-primary-container text-on-primary border border-border-subtle p-stack-lg rounded-2xl card-hover flex flex-col justify-between relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 border border-on-primary/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 text-on-primary rounded-xl flex items-center justify-center mb-stack-md border border-on-primary/20">
                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md mb-stack-sm font-semibold">
                      {item.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-primary/90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ) : (
              <Reveal
                key={item.title}
                delay={index * 0.1}
                className="col-span-4 md:col-span-4 h-full"
              >
                <article className="bg-surface-container-lowest dark:bg-[#07162c] border border-border-subtle dark:border-white/10 p-stack-lg rounded-2xl card-hover flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 bg-surface-container-low dark:bg-slate-800 text-primary-container dark:text-cyan-400 rounded-xl flex items-center justify-center mb-stack-md border border-border-subtle dark:border-white/10">
                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-text-main mb-stack-sm font-semibold">
                      {item.title}
                    </h3>
                    <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          )}
        </div>
      </Reveal>
    </section>
  );
}