"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap, gsap } from "@/lib/studio/gsap";
import { useContent } from "@/lib/studio/i18n";
import { site, whatsappLink } from "@/lib/site";
import { onPrefillQuote } from "@/lib/prefill-quote";

/** Contact — hairline form wired to /api/contact + direct channels. */
export function StudioContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { contactBlock, ui } = useContent();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [fromLabel, setFromLabel] = useState<string | null>(null);

  useEffect(() => {
    return onPrefillQuote((data) => {
      if (data.message) setMessage(data.message);
      if (data.fromLabel) setFromLabel(data.fromLabel);
    });
  }, []);

  useEffect(() => {
    ensureGsap();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-contact-reveal]"),
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 74%" },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      contact: String(fd.get("contact") ?? ""),
      business: String(fd.get("business") ?? ""),
      industry: String(fd.get("industry") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setMessage("");
      setStatus(ui.form.ok);
    } catch {
      setStatus(ui.form.fail);
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      className="st-contact"
      id="contacto"
      ref={sectionRef}
      aria-label="Contacto"
    >
      {/* alias for legacy prefill scroll target */}
      <span id="contact" style={{ position: "absolute", top: 0 }} aria-hidden />
      <div className="st-contact-grid">
        <div>
          <div className="st-gh-label" data-contact-reveal>
            {contactBlock.label}
          </div>
          <h2 className="st-contact-title" data-contact-reveal>
            {contactBlock.title[0]}
            <br />
            {contactBlock.title[1]}
          </h2>
          <p className="st-contact-copy" data-contact-reveal>
            {contactBlock.copy}
          </p>
          <div className="st-contact-direct" data-contact-reveal>
            <a
              href={whatsappLink(ui.waMessages.quote)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="CHAT"
            >
              ↗ WhatsApp — {site.contact.whatsappDisplay}
            </a>
            <a href={`mailto:${site.contact.email}`} data-cursor="EMAIL">
              ↗ {site.contact.email}
            </a>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>
              {ui.location}
            </span>
          </div>
        </div>

        <form className="st-form" onSubmit={onSubmit} data-contact-reveal>
          {fromLabel && (
            <div className="st-form-note" style={{ marginBottom: 6 }}>
              {ui.form.prefilledFrom} {fromLabel}
            </div>
          )}
          <div className="st-field">
            <label htmlFor="st-name">{ui.form.name}</label>
            <input
              id="st-name"
              name="name"
              required
              maxLength={200}
              placeholder={ui.form.namePh}
              autoComplete="name"
            />
          </div>
          <div className="st-field">
            <label htmlFor="st-contact">{ui.form.contact}</label>
            <input
              id="st-contact"
              name="contact"
              required
              maxLength={300}
              placeholder={ui.form.contactPh}
              autoComplete="email"
            />
          </div>
          <div className="st-field">
            <label htmlFor="st-business">{ui.form.business}</label>
            <input
              id="st-business"
              name="business"
              maxLength={200}
              placeholder={ui.form.businessPh}
            />
          </div>
          <div className="st-field">
            <label htmlFor="st-industry">{ui.form.industry}</label>
            <select id="st-industry" name="industry" defaultValue="">
              <option value="" disabled>
                {ui.form.industryPh}
              </option>
              {ui.form.industries.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="st-field">
            <label htmlFor="st-message">{ui.form.project}</label>
            <textarea
              id="st-message"
              name="message"
              rows={4}
              maxLength={5000}
              placeholder={ui.form.projectPh}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {/* honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px", height: 0 }}
            aria-hidden="true"
          />
          <button className="st-form-submit" type="submit" disabled={sending} data-cursor="ENVIAR">
            {sending ? ui.form.sending : ui.form.submit}
          </button>
          <div className="st-form-note">{contactBlock.formNote}</div>
          {status && <div className="st-form-status" role="status">{status}</div>}
        </form>
      </div>
    </section>
  );
}
