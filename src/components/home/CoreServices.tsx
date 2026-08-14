import { TbWorldWww } from "react-icons/tb";
import { MdDesignServices } from "react-icons/md";
import Reveal from "@/components/common/Reveal";

const services = [
  {
    icon: <TbWorldWww className="text-2xl" />,
    title: "Web Architecture",
    description:
      "Jasa pembuatan website profesional untuk bisnis, company profile, sistem informasi, hingga aplikasi web dengan teknologi modern.",
  },
  {
    icon: <MdDesignServices className="text-2xl" />,
    title: "UI/UX Systems",
    description:
      "Jasa desain UI/UX untuk website dan aplikasi dengan tampilan modern, responsif, dan berorientasi pada kebutuhan pengguna.",
  },
];

export default function CoreServices() {
  return (
    <section className="py-section-gap grid-layout bg-surface-off-white" id="services-summary">
      <Reveal className="col-span-4 md:col-span-8 xl:col-span-12 mb-stack-lg flex flex-col md:flex-row justify-between items-end gap-stack-md">
        <div className="max-w-2xl">
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-text-main mb-stack-sm">
            Layanan Kami
          </h2>
          <p className="font-body-md text-body-md text-text-muted">
            Solusi web dan desain digital profesional untuk membantu bisnis
            membangun website yang modern, cepat, responsif, dan mudah digunakan.
          </p>
        </div>
        <a
          href="/layanan"
          className="font-label-md text-label-md text-primary-container hover:text-primary flex items-center gap-2 group font-semibold"
        >
          Semua Layanan
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </a>
      </Reveal>

      {services.map((service, index) => (
        <Reveal
          key={service.title}
          delay={index * 0.12}
          className="col-span-4 md:col-span-4 xl:col-span-6 h-full"
        >
          <article className="bg-white dark:bg-[#07162c] p-6 border border-border-subtle dark:border-white/10 rounded-2xl card-hover flex flex-col h-full shadow-sm">
            <div className="w-12 h-12 bg-surface-container-low dark:bg-slate-800 text-primary-container dark:text-cyan-400 rounded-xl flex items-center justify-center mb-6 border border-border-subtle dark:border-white/10">
              {service.icon}
            </div>
            <h3 className="font-headline-md text-headline-md text-text-main mb-3">{service.title}</h3>
            <p className="font-body-md text-body-md text-text-muted flex-grow leading-relaxed">
              {service.description}
            </p>
          </article>
        </Reveal>
      ))}
    </section>
  );
}