import { footerNav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-line)] text-[var(--color-text)]"
      style={{ backgroundColor: "var(--color-body)" }}
    >
      <div className="container-site section-y">
        <div className="grid gap-12 border-b border-[var(--color-line)] pb-14 md:grid-cols-2">
          <div>
            <p className="eyebrow">Newsletter</p>
            <h3 className="font-serif mt-3 text-3xl md:text-4xl">
              Stay in the loop!
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed opacity-75">
              Sign up for our newsletter and receive our latest articles on
              skin health along with exclusive offers. You&apos;re going to
              love it.
            </p>
          </div>
          <form className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="h-[52px] w-full flex-1 border border-[var(--color-line)] px-5 text-sm text-[var(--color-text)] placeholder:opacity-60 focus:border-[var(--color-text)] focus:outline-none"
              style={{ backgroundColor: "var(--color-section)" }}
            />
            <button type="submit" className="btn btn-primary h-[52px] shrink-0 px-8">
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <img
              src={site.logo}
              alt={site.name}
              className="h-11 w-auto object-contain"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed opacity-75">
              {site.description}
            </p>
            <p className="mt-4 text-sm opacity-75">{site.address}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 block text-sm opacity-75 hover:opacity-100"
            >
              {site.email}
            </a>
            <div className="mt-6 flex items-center gap-4">
              <SocialIcon label="Facebook" href={site.facebook}>
                <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.408 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0Z" />
              </SocialIcon>
              <SocialIcon label="Instagram" href={site.instagram}>
                <path d="M12 2.16c3.2 0 3.58.012 4.85.07 1.17.054 1.8.249 2.23.415.56.217.96.477 1.38.897.42.42.68.819.9 1.38.16.422.36 1.057.41 2.227.06 1.265.07 1.645.07 4.85s-.01 3.585-.07 4.85c-.05 1.17-.25 1.805-.41 2.227a3.71 3.71 0 0 1-.9 1.38 3.71 3.71 0 0 1-1.38.897c-.43.166-1.06.36-2.23.415-1.27.058-1.65.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.055-1.8-.249-2.23-.415a3.71 3.71 0 0 1-1.38-.897 3.71 3.71 0 0 1-.9-1.38c-.16-.422-.36-1.057-.41-2.227-.06-1.265-.07-1.645-.07-4.85s.01-3.585.07-4.85c.05-1.17.25-1.805.41-2.227.22-.561.48-.96.9-1.38.42-.42.82-.68 1.38-.897.43-.166 1.06-.361 2.23-.415C8.415 2.172 8.8 2.16 12 2.16Zm0-2.16C8.74 0 8.33.014 7.05.072 5.78.13 4.9.333 4.14.63a5.87 5.87 0 0 0-2.12 1.38A5.87 5.87 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13a5.87 5.87 0 0 0 2.12 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.12-1.38 5.87 5.87 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.38-2.13A5.87 5.87 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
              </SocialIcon>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{ color: "#4D4D4D", borderColor: "rgba(77,77,77,0.3)" }}
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-opacity hover:opacity-70"
              >
                <svg
                  viewBox="0 0 32 32"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M16.001 2.667c-7.363 0-13.334 5.97-13.334 13.333 0 2.353.615 4.646 1.782 6.666L2.667 29.333l6.84-1.75a13.27 13.27 0 0 0 6.494 1.7h.006c7.363 0 13.333-5.97 13.333-13.333 0-3.562-1.387-6.912-3.905-9.43A13.246 13.246 0 0 0 16.001 2.667Zm0 24.4h-.005a11.06 11.06 0 0 1-5.636-1.545l-.404-.24-4.06 1.04 1.084-3.958-.264-.407a11.03 11.03 0 0 1-1.692-5.89c0-6.114 4.976-11.09 11.083-11.09a11.02 11.02 0 0 1 7.844 3.253 11.02 11.02 0 0 1 3.245 7.847c0 6.114-4.976 11.09-11.195 11.09Zm6.077-8.302c-.334-.167-1.97-.972-2.276-1.083-.305-.111-.527-.167-.75.167-.221.334-.86 1.083-1.054 1.305-.194.223-.389.25-.723.084-.334-.167-1.409-.52-2.684-1.657-.992-.885-1.663-1.978-1.858-2.312-.194-.334-.02-.514.147-.68.15-.15.334-.39.501-.585.167-.195.222-.334.334-.556.111-.223.055-.417-.028-.585-.083-.167-.75-1.807-1.028-2.474-.27-.65-.545-.562-.75-.573l-.639-.012a1.227 1.227 0 0 0-.889.417c-.306.334-1.167 1.14-1.167 2.782s1.195 3.229 1.362 3.452c.167.223 2.353 3.594 5.702 5.04.797.344 1.418.55 1.902.704.799.254 1.526.218 2.101.132.641-.096 1.97-.805 2.248-1.583.278-.777.278-1.443.194-1.583-.083-.14-.305-.223-.639-.39Z" />
                </svg>
              </a>
            </div>
          </div>

          <FooterCol title="Concerns" links={footerNav.domaines} />
          <FooterCol title="Treatments" links={footerNav.traitements} />
          <FooterCol title="Navigation" links={footerNav.navigation} />
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--color-line)] pt-8 text-xs uppercase tracking-[0.15em] opacity-60 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name} — All rights reserved</p>
          <span>Privacy</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
        {title}
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((label) => (
          <li key={label} className="text-sm opacity-80">
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ color: "#4D4D4D", borderColor: "rgba(77,77,77,0.3)" }}
      className="flex h-9 w-9 items-center justify-center rounded-full border transition-opacity hover:opacity-70"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        {children}
      </svg>
    </a>
  );
}
