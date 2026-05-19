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
                Nuestros proyectos tienen dos componentes:{" "}
                <strong>pago inicial</strong> (construcción del sitio) y{" "}
                <strong>plan mensual</strong> (cuidado y crecimiento después
                del lanzamiento).
              </p>
              <p className="mt-3">
                El pago inicial se cobra 50% al iniciar (para apartar la fecha
                de inicio) y 50% al entregar el sitio en producción. El plan
                mensual se factura mensualmente a partir del lanzamiento. Todos
                los precios están en USD. Aceptamos transferencia bancaria,
                Zelle, Wise y tarjeta vía link de pago.
              </p>
            </Section>

            <Section title="Plan mensual de cuidado y crecimiento">
              <p>
                Todos los paquetes incluyen un plan mensual activo que cubre
                hosting, mantenimiento técnico, monitoreo, actualizaciones de
                contenido, mejoras periódicas y soporte. La cobertura
                específica varía según el paquete contratado (Starter Local,
                Growth Pro o Authority Premium).
              </p>
              <p className="mt-3">
                El plan se puede pausar o cancelar según el plan acordado. Al
                cancelar, dejamos de prestar los servicios mensuales (hosting
                gestionado, mantenimiento, mejoras). El sitio y el código
                siguen siendo tuyos — puedes llevártelos a otro proveedor o
                gestionar el hosting tú mismo.
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

            <Section title="Propiedad del código y assets">
              <p>
                El código, diseños y assets que producimos para tu proyecto
                quedan bajo tu propiedad según los términos del contrato. Te
                entregamos acceso al repositorio (GitHub) a tu nombre cuando el
                proyecto se completa. Sin lock-in, sin licencias raras.
              </p>
            </Section>

            <Section title="Dominio y hosting">
              <p>
                El dominio se registra o transfiere a tu nombre — tú eres el
                dueño legal desde el día 1. Leyva Web Studio puede gestionar
                la configuración técnica (DNS, conexión, certificados) como
                parte del plan mensual.
              </p>
              <p className="mt-3">
                El hosting está incluido en el plan mensual. Publicamos en
                Cloudflare (infraestructura premium con cobertura global). Si
                en algún momento quieres migrar a otro proveedor, el código es
                tuyo y puedes llevártelo — te ayudamos con la migración.
              </p>
            </Section>

            <Section title="Cambios al alcance">
              <p>
                Si durante el proyecto decides ampliar el alcance (por
                ejemplo, subir de Starter Local a Growth Pro), solo pagas la
                diferencia del setup más la nueva mensualidad. Si quieres
                reducir, lo conversamos — pero ya tenemos trabajo invertido,
                así que normalmente no se acepta reducir después de iniciado.
              </p>
            </Section>

            <Section title="Soporte post-lanzamiento">
              <p>
                Después del lanzamiento, el plan mensual cubre el soporte
                continuo: correcciones, ajustes, actualizaciones de contenido,
                monitoreo y mejoras. La cobertura específica varía según el
                paquete (más detalle en la sección de Plan mensual).
              </p>
            </Section>

            <Section title="Cancelación del proyecto">
              <p>
                Si decides no continuar el proyecto antes de la entrega, el
                50% inicial cubre el trabajo de diseño y discovery realizado.
                Te entregamos los assets producidos hasta ese punto. La
                cancelación del plan mensual posterior al lanzamiento se rige
                por los términos acordados al momento de la contratación.
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
