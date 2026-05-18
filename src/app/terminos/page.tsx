import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description:
    "Las reglas claras de cómo trabajamos en Leyva Web Studio.",
  alternates: { canonical: "/terminos" },
};

export default function TermsPage() {
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
            Términos de <span className="gradient-text">servicio</span>
          </h1>
          <p className="mt-4 text-ember-50/60 text-sm">
            Última actualización: {new Date().toLocaleDateString("es-MX")}
          </p>

          <div className="mt-10 space-y-8 text-ember-50/80 leading-relaxed">
            <Section title="Pagos">
              <p>
                Trabajamos con un esquema 50% / 50%: la mitad del paquete al
                iniciar (apartar fecha de inicio) y la mitad al entregar el
                sitio en producción. Todos los precios están en USD. Aceptamos
                transferencia bancaria, Zelle, Wise, y tarjeta vía link de
                pago.
              </p>
            </Section>

            <Section title="Rondas de revisión">
              <p>
                Cada paquete incluye rondas de revisión durante el diseño
                visual. No empezamos a programar hasta que apruebas
                explícitamente el diseño — esto evita que paguemos por
                rehacer trabajo más adelante.
              </p>
            </Section>

            <Section title="Propiedad del código">
              <p>
                El código, diseños y assets que producimos para tu proyecto
                son <strong>tuyos desde el día 1</strong>. Te entregamos
                acceso al repositorio de GitHub y al deploy de Vercel a tu
                nombre. Sin lock-in, sin licencias raras.
              </p>
            </Section>

            <Section title="Dominio y hosting">
              <p>
                El dominio se compra o transfiere a tu nombre. Tú eres el
                dueño. Por defecto, el sitio se publica en Vercel (que ofrece
                un free tier generoso para sitios de este tamaño); si
                prefieres otro hosting podemos ayudarte a migrar.
              </p>
            </Section>

            <Section title="Cambios al alcance">
              <p>
                Si durante el proyecto decides ampliar el alcance (por
                ejemplo, subir de Esencial a Crecimiento), solo pagas la
                diferencia. Si quieres reducir, lo conversamos — pero ya
                tenemos trabajo invertido, así que normalmente no se acepta
                reducir después de iniciado.
              </p>
            </Section>

            <Section title="Soporte post-lanzamiento">
              <p>
                Cada paquete incluye un período de soporte post-lanzamiento
                (30 a 60 días según paquete) para correcciones de bugs y
                pequeños ajustes. Después de ese período ofrecemos planes
                mensuales de mantenimiento, opcionales.
              </p>
            </Section>

            <Section title="Cancelación">
              <p>
                Si por cualquier razón decides no continuar el proyecto, el
                50% inicial cubre el trabajo de diseño y discovery realizado.
                Te entregamos los assets producidos hasta ese punto.
              </p>
            </Section>

            <Section title="Limitación de responsabilidad">
              <p>
                Nos comprometemos a entregar un sitio funcional, rápido y a la
                medida según lo acordado. No garantizamos resultados
                comerciales específicos (ventas, leads, conversiones) ya que
                dependen de muchos factores fuera del sitio (oferta, mercado,
                publicidad, operación).
              </p>
            </Section>

            <Section title="Contacto">
              <p>
                Cualquier duda sobre estos términos, escríbenos a{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-ember-300 hover:text-ember-200"
                >
                  {site.contact.email}
                </a>
                .
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
