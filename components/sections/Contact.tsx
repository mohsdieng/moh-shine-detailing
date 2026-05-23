"use client";

import { useState, type FormEvent } from "react";
import { Section } from "../ui/Section";
import { Reveal } from "../Reveal";
import { Button } from "../ui/Button";
import { Magnetic } from "../anim/Magnetic";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

/**
 * Contact section.
 *  - Left: heading + booking CTAs + direct-contact cards + hours.
 *  - Right: quick "Get a quote" form that opens the user's mail client with
 *    a pre-filled body. Keeps the site backend-free while still feeling real.
 */
export function Contact() {
  return (
    <Section id="contact">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card to-black">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:p-14">
          {/* Left — pitch + contact cards */}
          <div>
            <Reveal>
              <p className="eyebrow mb-3">Book / Get a quote</p>
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
                Ready for that <span className="text-shine">shine?</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-muted sm:text-lg">
                Book online in under a minute through Square, or use the form to
                get a tailored quote. We confirm the time and come to you — no
                matter where you are in the Raleigh–Durham Triangle.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Magnetic>
                  <Button
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                  >
                    Book on Square
                  </Button>
                </Magnetic>
                <Magnetic strength={10}>
                  <Button href={site.phoneHref} variant="secondary" size="lg">
                    Call for a Quote
                  </Button>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 grid gap-3 sm:grid-cols-2">
              <ContactCard
                href={site.phoneHref}
                eyebrow="Call or text"
                label={site.phone}
                icon={<PhoneIcon />}
              />
              <ContactCard
                href={site.emailHref}
                eyebrow="Email"
                label={site.email}
                icon={<MailIcon />}
              />
            </Reveal>

            <Reveal delay={0.18} className="mt-3">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-muted">
                    Hours
                  </span>
                  <span className="flex items-center gap-2 text-xs text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]" />
                    Accepting bookings
                  </span>
                </div>
                <ul className="mt-3 grid gap-1.5 text-sm text-white/90">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="text-slate-muted">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right — quote form */}
          <Reveal delay={0.08}>
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function ContactCard({
  href,
  eyebrow,
  label,
  icon,
}: {
  href: string;
  eyebrow: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 transition-all hover:-translate-y-0.5 hover:border-shine/50"
    >
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-shine/15 text-shine transition-colors group-hover:bg-shine group-hover:text-black">
        {icon}
      </span>
      <span>
        <span className="block text-xs uppercase tracking-wider text-slate-muted">
          {eyebrow}
        </span>
        <span className="block font-semibold text-white">{label}</span>
      </span>
    </a>
  );
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string) || "";
    const contact = (fd.get("contact") as string) || "";
    const vehicle = (fd.get("vehicle") as string) || "";
    const service = (fd.get("service") as string) || "";
    const notes = (fd.get("notes") as string) || "";

    const subject = `Quote request — ${service || "Detail"}`;
    const body = [
      `Name: ${name}`,
      `Best contact: ${contact}`,
      `Vehicle: ${vehicle}`,
      `Service: ${service}`,
      ``,
      `Notes:`,
      notes,
    ].join("\n");

    // Open the visitor's mail client with everything pre-filled.
    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-black/50 p-6 sm:p-8"
    >
      <p className="text-xs uppercase tracking-wider text-shine">Quick quote</p>
      <h3 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
        Tell us about your car
      </h3>

      <div className="mt-6 grid gap-4">
        <Field name="name" label="Your name" placeholder="Alex Johnson" required />
        <Field
          name="contact"
          label="Phone or email"
          placeholder="(919) 555-0142 or you@email.com"
          required
        />
        <Field name="vehicle" label="Vehicle" placeholder="2020 Honda Civic" required />
        <SelectField
          name="service"
          label="Service"
          options={services.map((s) => s.title)}
        />
        <TextareaField name="notes" label="Notes (optional)" rows={3} />
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Magnetic>
          <Button size="lg">
            {submitted ? "Re-send →" : "Request a quote"}
          </Button>
        </Magnetic>
        <p className="text-xs text-slate-muted">
          Opens your mail app. We reply within the hour.
        </p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-slate-muted">
        {label} {required && <span className="text-shine">*</span>}
      </span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-muted/70 transition-colors focus:border-shine focus:outline-none focus:ring-2 focus:ring-shine/30"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-slate-muted">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="mt-1.5 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat px-4 py-3 text-sm text-white transition-colors focus:border-shine focus:outline-none focus:ring-2 focus:ring-shine/30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338B6FF' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>\")",
        }}
      >
        <option value="" disabled className="bg-black">
          Choose a service…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-black">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  name,
  label,
  rows = 4,
}: {
  name: string;
  label: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-slate-muted">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        placeholder="Anything we should know? Pet hair, stains, paint condition…"
        className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-muted/70 transition-colors focus:border-shine focus:outline-none focus:ring-2 focus:ring-shine/30"
      />
    </label>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
