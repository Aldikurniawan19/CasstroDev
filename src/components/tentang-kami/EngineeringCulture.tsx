import Reveal from "@/components/common/Reveal";

export default function EngineeringCulture() {
  return (
    <section className="py-section-gap grid grid-cols-4 md:grid-cols-12 gap-gutter items-center border-t border-border-subtle" id="culture">
      <Reveal className="col-span-4 md:col-span-6 h-[400px] md:h-[500px] md:order-2">
        <div className="w-full h-full bg-surface-container-low rounded-lg border border-border-subtle overflow-hidden shadow-inner group">
          <img
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHLQCHhptyopEfIk6AmSz1ZdyR_RR6C8h7nCBQMPjnekTJWysmx_Q6oCKDwM-Etgp2lNMQZD2ByYVyvE7M8ixbCHhGOhbQV_S8WYFNBkluKt4hgfR41n6Mj9XqOq3v4z2D6ZsanOL7v6nAOC44X5dEqhbxdKE55f3V0X_VJ3hpXgT9ZyfaMJP-I3gxjuFsqp2Bqg6CCvW38SrdvDwN-QmMGRGoF-w2ZDBVGm-wjvp_lONdsrRr-k4U"
            alt="Engineering Team Collaboration Space and Craftsmanship Environment"
            loading="lazy"
          />
        </div>
      </Reveal>
      <Reveal delay={0.15} className="col-span-4 md:col-span-6 md:col-start-1 flex flex-col gap-stack-lg md:order-1">
        <div>
          <h2 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-primary mb-stack-sm">
            Budaya Kerja & Rekayasa
          </h2>
          <div className="h-1 w-16 bg-accent-cyan rounded-full"></div>
        </div>
        <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
          Ruang kerja kami bukan arena bermain, melainkan laboratorium rekayasa. Kami berkolaborasi
          dalam keheningan yang terfokus, mendiskusikan arsitektur sistem di atas papan tulis yang
          bersih, dan melakukan tinjauan kode dengan ketelitian tingkat tinggi.
        </p>
        <ul className="flex flex-col gap-stack-sm mt-stack-sm">
          <li className="flex items-center gap-3.5">
            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
            <span className="font-body-md text-body-md text-on-surface font-semibold">
              Fokus mendalam (Deep Work) didahulukan.
            </span>
          </li>
          <li className="flex items-center gap-3.5">
            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
            <span className="font-body-md text-body-md text-on-surface font-semibold">
              Dokumentasi yang akurat adalah wajib.
            </span>
          </li>
          <li className="flex items-center gap-3.5">
            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
            <span className="font-body-md text-body-md text-on-surface font-semibold">
              Kolaborasi berbasis solusi, tanpa ego.
            </span>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}