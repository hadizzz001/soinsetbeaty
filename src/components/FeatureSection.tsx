import { site } from "@/lib/site";

type FeatureSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  image?: string;
  video?: string;
  reverse?: boolean;
  tint?: boolean;
};

export default function FeatureSection({
  eyebrow,
  title,
  description,
  cta,
  image,
  video,
  reverse,
  tint,
}: FeatureSectionProps) {
  return (
    <section
      className="section-y"
      style={{
        backgroundColor: tint ? "var(--color-section)" : "var(--color-body)",
      }}
    >
      <div className="container-site">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {video ? (
            <div className="shape-media relative mx-auto w-full max-w-sm">
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="block h-auto w-full"
              />
            </div>
          ) : (
            <div className="shape-media relative mx-auto aspect-[3/4] w-full max-w-sm">
              <img
                src={image ?? ""}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}
          <div className={reverse ? "lg:pr-8" : "lg:pl-8"}>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="font-serif mt-4 text-3xl leading-tight md:text-4xl">
              {title}
            </h2>
            <p className="body-text mt-5 max-w-md">
              {description}
            </p>
            <a
              href={site.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8"
            >
              {cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
