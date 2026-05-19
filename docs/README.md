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

⚠️ **Estas dos cosas son obligatorias antes de empezar a vender:**

1. **Registrar Leyva Web Studio LLC** en Ohio.
   - Costo: ~$99 USD una vez + ~$99/año de renovación.
   - Donde: https://www.ohiosos.gov/businesses/
   - Por qué: sin LLC, los contratos te exponen personalmente. Si algo sale mal con un cliente, pueden ir contra tus bienes personales (auto, ahorros).

2. **Revisión legal del contrato** por un abogado de Ohio.
   - Costo: ~$200-500 USD una sola vez.
   - Donde: cualquier abogado de small business en Cleveland. Buscar "small business attorney Ohio" en Google.
   - Por qué: la plantilla `CONTRATO-PROYECTO.md` es un punto de partida, no asesoría legal. Un abogado te lo deja blindado y aprende para futuros casos.

Si hacés outreach sin estos dos pasos, **no firmes contratos formales todavía** — limitate a llamadas exploratorias y "ya te confirmo cuando esté listo el contrato".

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
