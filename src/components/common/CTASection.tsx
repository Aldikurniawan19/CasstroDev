import Reveal from "@/components/common/Reveal";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTASection({
  title = "Ready to scale your business?",
  description = "Mari diskusikan bagaimana pendekatan rekayasa perangkat lunak presisi kami dapat mempercepat transformasi digital perusahaan Anda.",
  buttonText = "Mulai Konsultasi Gratis",
  buttonHref = "/tentang-kami#contact",
}: CTASectionProps) {
  return (
    <section
      className="py-20 md:py-28 grid-layout bg-surface-off-white border-t border-border-subtle"
      id="contact-cta"
    >
      <Reveal className="col-span-4 md:col-span-8 xl:col-start-3 xl:col-span-8 text-center flex flex-col items-center gap-stack-lg">
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-text-main">
          {title}
        </h2>
        <p className="font-body-lg text-body-lg text-text-muted max-w-2xl">{description}</p>
        <div className="mt-4">
          <a
            href={buttonHref}
            className="bg-primary-container text-on-primary px-10 py-4 rounded font-label-md text-label-md hover:bg-primary transition-all inline-block text-center text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            {buttonText}
          </a>
        </div>
      </Reveal>
    </section>
  );
}