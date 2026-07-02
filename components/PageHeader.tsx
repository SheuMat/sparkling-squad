import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-16 text-white">
      {/* soft decorative glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-royal/30 blur-3xl" />

      <div className="container-x relative">
        {crumbs && (
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-sky-200/80">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1">
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="px-1 text-sky-200/50">/</span>}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <span className="text-sm font-bold uppercase tracking-widest text-sky-300">{eyebrow}</span>
        )}
        <h1 className="mt-2 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-sky-100/85">{intro}</p>}
      </div>
    </section>
  );
}
