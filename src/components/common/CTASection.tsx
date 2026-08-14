import Reveal from "@/components/common/Reveal";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTASection({
  title = "Siap Mengembangkan Bisnis Anda?",
  description = "Mari diskusikan kebutuhan bisnis Anda dan temukan solusi digital yang tepat untuk mendukung pertumbuhan bisnis Anda.",
  buttonText = "Mulai Konsultasi Gratis",
  buttonHref = "/kontak",
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
            className="btn-animated bg-primary-container text-on-primary px-10 py-4 rounded-xl font-label-md text-label-md hover:bg-primary inline-flex items-center justify-center gap-2.5 text-center text-lg shadow-md hover:shadow-lg font-semibold group cursor-pointer"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}