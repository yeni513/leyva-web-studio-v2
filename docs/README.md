# Leyva Web Studio — Toolkit Operacional

Documentos para operar el estudio: vender, contratar, agendar.

## Archivos en este folder

| Archivo | Para qué sirve | Cuándo usarlo |
|---|---|---|
| **[PLAN-OUTREACH.md](./PLAN-OUTREACH.md)** | Plan completo para conseguir los primeros 3 clientes en 30 días | Antes de empezar outreach. Léelo entero la primera vez. |
| **[SETUP-CALCOM.md](./SETUP-CALCOM.md)** | Guía paso a paso para configurar Cal.com (10 min) | Antes de mandar el primer mensaje de outreach. |
| **[PROPUESTA-TEMPLATE.md](./PROPUESTA-TEMPLATE.md)** | Propuesta de 1 página para enviar después de la llamada de 15 min | Dentro de 24h de cada llamada de discovery. |
| **[CONTRATO-PROYECTO.md](./CONTRATO-PROYECTO.md)** | Contrato completo del proyecto (alcance, precio, timeline, IP, jurisdicción) | Cuando el cliente acepta la propuesta. |

## Orden recomendado de lectura

1. **Día 1 (hoy):** leer `PLAN-OUTREACH.md` entero. Entender la estrategia.
2. **Día 1:** seguir `SETUP-CALCOM.md`. 10 min. Te queda la URL de booking lista.
3. **Día 1:** pegar la URL de Cal.com en `src/lib/site.ts` campo `bookingUrl`, deployar. El sitio activa el CTA "Agendar 15 min" automáticamente.
4. **Día 2:** empezar outreach según `PLAN-OUTREACH.md`.
5. **Cuando alguien responde "sí, contame":** mandar Cal.com link.
6. **Después de cada llamada:** llenar `PROPUESTA-TEMPLATE.md` y enviar dentro de 24h.
7. **Cuando aceptan la propuesta:** mandar `CONTRATO-PROYECTO.md` adaptado + link de firma electrónica.

## Antes de firmar el primer contrato real

### Opción A — Operar como sole proprietor (lo que vas a hacer ahora)

Es 100% legal en Ohio operar como persona física vendiendo servicios bajo el nombre "Leyva Web Studio". No necesitas LLC para arrancar.

**Lo que sí conviene hacer:**

1. **Registrar el nombre comercial (DBA / Fictitious Name) en Ohio** — ~$39 USD, una sola vez.
   - Donde: https://www.ohiosos.gov/businesses/ → "Register a Trade Name or Fictitious Name"
   - Por qué: te permite cobrar y emitir facturas a nombre de "Leyva Web Studio" en lugar de "Alexander Rodriguez". Más profesional. Sin LLC, sin renovaciones anuales.

2. **Abrir cuenta bancaria de negocio** (puede ser una cuenta separada a tu nombre personal, no necesita ser business account formal).
   - Mantén ingresos del estudio separados de tus finanzas personales — es vital para impuestos al final del año.

3. **Para taxes:** los ingresos del estudio van en tu **Schedule C** del 1040 personal cada abril. Si superás los $400 anuales, también pagás Self-Employment tax (~15.3%). Usá un servicio como FreeTaxUSA o un contador (~$200/año) cuando llegue el momento.

**El riesgo que asumes operando como sole prop:**
- Si un cliente te demanda (incumplimiento, daños), pueden ir contra tus bienes personales (auto, ahorros, casa si tienes). La LLC es lo que separa eso.
- Para mitigar mientras tanto: **firma contratos con la cláusula 11 de limitación de responsabilidad** (que ya está en `CONTRATO-PROYECTO.md`) — limita tu exposición al monto pagado en los últimos 12 meses.
- Y elegí clientes con buen feeling — los conflictos serios pasan con gente que ya parecía conflictiva desde el inicio.

### Opción B — Registrar Leyva Web Studio LLC (cuando estés listo)

Cuando tengas 3-5 clientes activos y la operación esté generando $5,000+/mes, te conviene cambiar a LLC:

- Costo: ~$99 USD una vez + ~$99/año de renovación.
- Donde: https://www.ohiosos.gov/businesses/
- Beneficio: separa legalmente tu patrimonio personal de los del estudio. Si un cliente te demanda, solo pueden ir contra los activos del LLC (que probablemente sea poco al principio).
- También te abre la opción de elegir S-Corp tax treatment más adelante, lo que puede ahorrarte miles en self-employment tax.

**Hoy no es urgente.** Lo evaluamos cuando llegues a 3+ clientes activos.

### Lo que sí conviene hacer YA (sin LLC)

⚠️ **Antes de firmar el primer contrato:**

1. **Revisión del contrato base** por un abogado de Ohio (~$200-500, una sola vez).
   - Donde: cualquier abogado de small business en Cleveland. Buscar "small business attorney Ohio" en Google.
   - Por qué: la plantilla `CONTRATO-PROYECTO.md` es un punto de partida, no asesoría legal. Una hora con un abogado te lo deja blindado y te educa para futuros casos. **No saltes este paso aunque seas sole prop** — la responsabilidad limitada del contrato es tu única protección sin LLC.

2. **Setup de pago** (Zelle, Wise, o Stripe).
   - Tener listos los métodos de cobro antes del primer "sí" del cliente.

3. **DBA en Ohio** (~$39, ver arriba) si quieres facturar como "Leyva Web Studio" en lugar de tu nombre personal.

**Si decides arrancar antes de la revisión legal:** limita los primeros contratos a **Starter Local** (alcance pequeño, $900) para reducir exposición — y firmá con clientes referidos por familia/amigos donde el riesgo de conflicto es menor.

## Stack del sitio en producción

Para referencia rápida cuando hagas el handoff técnico al cliente:

- **Frontend:** Next.js 15 + TypeScript + Tailwind + Framer Motion
- **Hosting:** Cloudflare Workers (via OpenNext)
- **Email backend:** Resend (cotizaciones@leyvawebstudio.com)
- **Email forwarding:** Cloudflare Email Routing (hola@ y catch-all → Yahoo)
- **DNS:** Cloudflare
- **Repo:** https://github.com/yeni513/leyva-web-studio-v2
- **Domain:** leyvawebstudio.com (Cloudflare-registered)

## Si necesitás ajustar algo del sitio

Todo el código está en este repo. Para cambios:

1. Editar el archivo correspondiente.
2. `npm run build` para verificar.
3. `npm run deploy:cf` para publicar.
4. Commit + push.

Cambios típicos rápidos:
- **Subir/bajar precios:** `src/components/sections/Packages.tsx` (el dato `packages`).
- **Cambiar email/WhatsApp/dominio:** `src/lib/site.ts`.
- **Agregar/editar FAQ:** `src/components/sections/FAQ.tsx`.
- **Editar garantías:** `src/components/sections/Guarantees.tsx`.
