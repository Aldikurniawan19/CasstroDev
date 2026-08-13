import Reveal from "@/components/common/Reveal";

const advantages = [
  {
    icon: "timer",
    title: "Cepat & Tepat Waktu",
    description:
      "Waktu pengerjaan cepat dan tepat waktu. Manajemen proyek yang disiplin memastikan tenggat selalu terpenuhi tanpa menurunkan standar kualitas.",
    featured: true,
  },
  {
    icon: "devices",
    title: "Responsif di Semua Perangkat",
    description:
      "Desain responsif di semua perangkat. Tampilan menyesuaikan secara mulus dari mobile, tablet, hingga desktop dengan konsistensi visual penuh.",
    featured: false,
  },
  {
    icon: "speed",
    title: "Optimasi Kecepatan & SEO",
    description:
      "Optimasi kecepatan dan SEO dasar. Halaman dimuat dengan cepat dan dioptimalkan untuk mesin pencari demi visibilitas digital yang lebih baik.",
    featured: false,
  },
];

export default function CaseStudyHighlights() {
  return (
    <section className="py-section-gap grid-layout bg-white border-t border-border-subtle" id="advantages">
      <Reveal className="col-span-4 md:col-span-8 xl:col-span-12 mb-stack-lg flex flex-col md:flex-row justify-between items-end gap-stack-md">
        <div>
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-text-main mb-stack-sm">
            Keunggulan Kompetitif
          </h2>
          <p className="font-body-md text-body-md text-text-muted max-w-2xl">
            Mengapa Memilih Kami?
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
                <article className="bg-primary-container text-on-primary border border-border-subtle p-stack-lg rounded card-hover flex flex-col justify-between relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 border border-on-primary/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 text-on-primary rounded flex items-center justify-center mb-stack-md border border-on-primary/20">
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
                <article className="bg-surface-container-lowest border border-border-subtle p-stack-lg rounded card-hover flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 bg-surface-container-low text-primary-container rounded flex items-center justify-center mb-stack-md border border-border-subtle">
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