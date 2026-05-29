"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Loader2, MessageCircle, Send } from "lucide-react";
import type { LeadData, Lang } from "@/lib/chatbot/chatbot-types";
import { validateLead, type LeadField } from "@/lib/chatbot/lead-schema";
import { t } from "@/lib/chatbot/chatbot-config";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full h-10 px-3 rounded-xl bg-ink-950/60 border border-white/[0.08] text-ember-50 placeholder:text-ember-50/35 focus:border-ember-300/50 focus:bg-ink-950 focus:outline-none transition-colors text-[14px]";

export function LeadCapturePanel({
  lang,
  initial,
  onBack,
  onSubmit,
  onDone,
}: {
  lang: Lang;
  initial: Partial<LeadData>;
  onBack: () => void;
  /** Returns true on success. */
  onSubmit: (lead: LeadData) => Promise<boolean>;
  onDone: () => void;
}) {
  const copy = t(lang);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({});
  const [form, setForm] = useState<LeadData>({
    name: initial.name ?? "",
    business: initial.business ?? "",
    phone: initial.phone ?? "",
    email: initial.email ?? "",
    businessType: initial.businessType ?? "",
    service: initial.service ?? "",
    budget: initial.budget ?? "",
    timeline: initial.timeline ?? "",
    notes: initial.notes ?? "",
    language: lang,
  });

  const update = <K extends keyof LeadData>(k: K, v: LeadData[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const whatsappHref = useMemo(() => {
    const lines = [
      lang === "en"
        ? `Hi Leyva, I'm ${form.name || "(name)"}.`
        : `Hola Leyva, soy ${form.name || "(nombre)"}.`,
      form.business && `${lang === "en" ? "Business" : "Negocio"}: ${form.business}`,
      form.businessType && `${lang === "en" ? "Type" : "Tipo"}: ${form.businessType}`,
      form.service && `${lang === "en" ? "Service" : "Servicio"}: ${form.service}`,
      form.budget && `${lang === "en" ? "Budget" : "Presupuesto"}: ${form.budget}`,
      form.timeline && `${lang === "en" ? "Timeline" : "Tiempo"}: ${form.timeline}`,
      form.notes && `\n${form.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
    return whatsappLink(lines);
  }, [form, lang]);

  const handleSubmit = async () => {
    const { ok, errors: errs } = validateLead(form);
    setErrors(errs);
    if (!ok) return;
    setStatus("submitting");
    const success = await onSubmit(form);
    setStatus(success ? "success" : "error");
  };

  // ─── Success screen ───────────────────────────────
  if (status === "success") {
    return (
      <PanelShell>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center"
        >
          <span className="grid place-items-center w-16 h-16 rounded-full bg-ember-300/[0.12] border border-ember-300/35 text-ember-300 shadow-[0_0_36px_-6px_rgba(236,139,42,0.7)]">
            <Check className="w-8 h-8" />
          </span>
          <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ember-50">
            {copy.leadSuccessTitle}
          </h3>
          <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-ember-50/70">
            {copy.leadSuccess}
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="no-tap-highlight mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ember-300/35 bg-ember-300/[0.06] px-5 py-2.5 text-[13.5px] font-medium text-ember-50 transition-colors hover:bg-ember-300/[0.14]"
          >
            <MessageCircle className="w-4 h-4 text-ember-300" />
            {copy.whatsappContinue}
          </a>
          <button
            type="button"
            onClick={onDone}
            className="no-tap-highlight mt-2.5 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-[13.5px] font-medium text-ember-50/70 transition-colors hover:text-ember-50"
          >
            {copy.done}
          </button>
        </motion.div>
      </PanelShell>
    );
  }

  // ─── Form ─────────────────────────────────────────
  return (
    <PanelShell>
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label={copy.leadBack}
          className="no-tap-highlight grid place-items-center w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] text-ember-50/70 transition-colors hover:bg-white/[0.08] hover:text-ember-50"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <p className="font-display text-[15px] font-semibold tracking-tight text-ember-50 leading-tight">
            {copy.leadTitle}
          </p>
          <p className="text-[11px] text-ember-50/55">{copy.leadSubtitle}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 [scrollbar-width:thin]">
        <div className="grid grid-cols-2 gap-3">
          <LeadField label={copy.fields.name} error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={cn(inputCls, errors.name && "border-red-400/50")}
              placeholder={copy.fields.name}
            />
          </LeadField>
          <LeadField label={copy.fields.business} optional optionalLabel={copy.optional}>
            <input
              value={form.business}
              onChange={(e) => update("business", e.target.value)}
              className={inputCls}
              placeholder={copy.fields.business}
            />
          </LeadField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <LeadField label={copy.fields.phone} error={errors.phone}>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={cn(inputCls, errors.phone && "border-red-400/50")}
              placeholder="+1 ..."
            />
          </LeadField>
          <LeadField label={copy.fields.email} error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={cn(inputCls, errors.email && "border-red-400/50")}
              placeholder="email@..."
            />
          </LeadField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <LeadField label={copy.fields.businessType} optional optionalLabel={copy.optional}>
            <input
              value={form.businessType}
              onChange={(e) => update("businessType", e.target.value)}
              className={inputCls}
              placeholder={copy.fields.businessType}
            />
          </LeadField>
          <LeadField label={copy.fields.service} optional optionalLabel={copy.optional}>
            <input
              value={form.service}
              onChange={(e) => update("service", e.target.value)}
              className={inputCls}
              placeholder={copy.fields.service}
            />
          </LeadField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <LeadField label={copy.fields.budget} optional optionalLabel={copy.optional}>
            <input
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={inputCls}
              placeholder={copy.fields.budget}
            />
          </LeadField>
          <LeadField label={copy.fields.timeline} optional optionalLabel={copy.optional}>
            <input
              value={form.timeline}
              onChange={(e) => update("timeline", e.target.value)}
              className={inputCls}
              placeholder={copy.fields.timeline}
            />
          </LeadField>
        </div>

        <LeadField label={copy.fields.notes} optional optionalLabel={copy.optional}>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className={cn(inputCls, "h-auto py-2 resize-none")}
            placeholder={copy.fields.notes}
          />
        </LeadField>

        {(errors.phone || errors.email || errors.name) && (
          <p className="text-[11px] text-red-300/80">{copy.requiredHint}</p>
        )}
        {status === "error" && (
          <p className="text-[12px] text-red-300/90">{copy.leadError}</p>
        )}
      </div>

      <div className="border-t border-white/[0.07] bg-ink-950/60 p-3">
        <p className="mb-2 text-center text-[11.5px] text-ember-50/60">
          {copy.leadQuestion}
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === "submitting"}
          className="no-tap-highlight inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 px-5 py-2.5 text-[13.5px] font-semibold text-ink-950 shadow-[0_0_24px_-6px_rgba(236,139,42,0.6)] transition-all hover:shadow-[0_0_32px_-4px_rgba(236,139,42,0.85)] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {copy.leadSending}
            </>
          ) : (
            <>
              {copy.leadSubmit}
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </PanelShell>
  );
}

function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-10 flex flex-col bg-ink-950/95 backdrop-blur-md"
    >
      {children}
    </motion.div>
  );
}

function LeadField({
  label,
  children,
  error,
  optional,
  optionalLabel,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  optional?: boolean;
  optionalLabel?: string;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.16em] text-ember-50/55">
        <span>{label}</span>
        {optional && (
          <span className="text-ember-50/30 normal-case tracking-normal text-[10px]">
            {optionalLabel}
          </span>
        )}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-[10.5px] text-red-300/80">{error}</span>}
    </label>
  );
}
