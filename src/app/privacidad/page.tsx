import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo manejamos la información que compartes con Leyva Web Studio.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24">
        <div className="container max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ember-300/80 hover:text-ember-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <h1 className="mt-8 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Política de <span className="gradient-text">privacidad</span>
          </h1>
          <p className="mt-4 text-ember-50/60 text-sm">
            Última actualización: {new Date().toLocaleDateString("es-MX")}
          </p>

          <div className="mt-10 space-y-8 text-ember-50/80 leading-relaxed">
            <Section title="Resumen rápido">
              <p>
                {site.brand} {site.brandSub} respeta tu privacidad. No guardamos
                información en bases de datos propias. El formulario de
                cotización abre tu app de WhatsApp o correo con los datos que
                escribiste, y desde ese momento la conversación es entre tú y
                nosotros — directa, sin intermediarios ni terceros.
              </p>
            </Section>

            <Section title="Qué información compartes">
              <p>
                Cuando llenas el formulario de cotización, ingresas: nombre,
                negocio, contacto (WhatsApp o correo), industria, tipo de
                proyecto, presupuesto estimado, timeline, y cualquier mensaje
                adicional. Esta información se compone en un mensaje de
                WhatsApp/correo que <strong>tú envías</strong> presionando el
                botón.
              </p>
            </Section>

            <Section title="Qué hacemos con esa información">
              <ul className="list-disc pl-5 space-y-2">
                <li>La leemos para entender tu proyecto.</li>
                <li>Te respondemos en menos de 4 horas hábiles.</li>
                <li>
                  La conversamos contigo para definir alcance y cotización.
                </li>
                <li>No la compartimos con terceros.</li>
                <li>No la vendemos. Nunca.</li>
              </ul>
            </Section>

            <Section title="Cookies y tracking">
              <p>
                Este sitio no usa cookies de tracking de terceros. Usamos solo
                las cookies estrictamente necesarias para el funcionamiento
                (preferencias de tu navegador). No integramos Facebook Pixel,
                Google Analytics, ni servicios similares.
              </p>
            </Section>

            <Section title="Imágenes y assets externos">
              <p>
                Las imágenes ilustrativas que ves en el sitio son generadas con
                gradientes SVG (no hay carga de imágenes externas que rastreen
                tu IP).
              </p>
            </Section>

            <Section title="Tus derechos">
              <p>
                Puedes pedirnos en cualquier momento que borremos las
                conversaciones que has tenido con nosotros. Solo escríbenos a{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-ember-300 hover:text-ember-200"
                >
                  {site.contact.email}
                </a>
                .
              </p>
            </Section>

            <Section title="Cambios a esta política">
              <p>
                Si actualizamos esta política, lo verás reflejado en la fecha
                arriba. Cambios sustanciales se anuncian en este mismo sitio.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ember-50">
        {title}
      </h2>
      <div className="mt-3 text-[15px]">{children}</div>
    </div>
  );
}
