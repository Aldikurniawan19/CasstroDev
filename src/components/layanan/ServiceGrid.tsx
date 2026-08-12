import Reveal from "@/components/common/Reveal";

const services = [
  {
    id: "web",
    badge: "Frontend & Backend",
    icon: "desktop_windows",
    title: "Pengembangan Web",
    description:
      "Membangun aplikasi web modern, responsif, dan sangat optimal menggunakan framework mutakhir. Kami fokus pada arsitektur berkinerja tinggi yang memberikan pengalaman pengguna tanpa hambatan di berbagai perangkat.",
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL"],
    deliverables: ["Aplikasi SPA / SSR kustom", "Integrasi API yang aman", "Dashboard admin yang tangguh"],
    process: [
      { step: "Discovery & Arsitektur", desc: "Merancang skema database dan aliran sistem." },
      { step: "Iterative Build", desc: "Pengembangan berbasis sprint dengan tinjauan klien secara teratur." },
      { step: "Pengujian & Peluncuran", desc: "Pengujian QA ketat, optimasi SEO/Kinerja, dan peluncuran bertahap." },
    ],
  },
  {
    id: "uiux",
    badge: "Penelitian & Estetika",
    icon: "design_services",
    title: "Desain UI/UX",
    description:
      "Menggabungkan empati terhadap pengguna dengan ketelitian teknis, kami merancang antarmuka yang tidak hanya terlihat premium secara visual tetapi juga memandu pengguna secara efektif melalui alur kerja yang kompleks.",
    techStack: ["Figma", "Protopie", "Adobe CC"],
    deliverables: ["Prototipe interaktif high-fidelity", "Sistem desain terpusat (Design System)", "Laporan pengujian pengguna"],
    process: [
      { step: "Penelitian & Strategi", desc: "Memahami demografi target dan menganalisis pesaing." },
      { step: "Wireframing & Prototipe", desc: "Membangun kerangka navigasi dan kemudian meningkatkannya dengan gaya visual." },
      { step: "Pengujian & Serah Terima", desc: "Memvalidasi keputusan desain dengan pengguna sungguhan, dilanjutkan serah terima developer." },
    ],
  },
];

export default function ServiceGrid() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap bg-surface-off-white rounded-lg">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
        {services.map((item, index) => (
          <Reveal
            key={item.id}
            delay={index * 0.12}
            className="col-span-4 md:col-span-6 h-full"
          >
            <article
              className="bg-surface-container-lowest border border-border-subtle p-stack-lg rounded-lg service-card transition-all duration-300 flex flex-col justify-between h-full"
              id={item.id}
            >
            <div>
              <div className="flex items-start justify-between mb-stack-md">
                <div className="bg-surface-container p-3 rounded text-primary border border-border-subtle">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary px-3 py-1 bg-primary-fixed rounded-full font-semibold">
                  {item.badge}
                </span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-text-main mb-stack-sm">{item.title}</h2>

              <p className="font-body-md text-body-md text-text-muted mb-stack-lg leading-relaxed">
                {item.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-stack-md">
                <h3 className="font-label-md text-label-md text-text-main mb-2 border-b border-border-subtle pb-1 font-bold">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-label-sm text-label-sm text-text-muted bg-surface-off-white border border-border-subtle px-2.5 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="mb-stack-md">
                <h3 className="font-label-md text-label-md text-text-main mb-2 border-b border-border-subtle pb-1 font-bold">
                  Deliverables
                </h3>
                <ul className="space-y-2">
                  {item.deliverables.map((deliv) => (
                    <li key={deliv} className="flex items-center gap-2 font-body-md text-body-md text-text-muted">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                      {deliv}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <h3 className="font-label-md text-label-md text-text-main mb-2 border-b border-border-subtle pb-1 font-bold">
                  Proses (3 Tahap)
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 font-body-md text-body-md text-text-muted ml-1">
                  {item.process.map((proc) => (
                    <li key={proc.step}>
                      <span className="font-semibold text-text-main">{proc.step}:</span> {proc.desc}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}