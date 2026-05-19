# Setup Cal.com — Booking Integration

Para que los prospectos agenden la llamada de 15-30 min sin ping-pong de WhatsApp.

## Por qué Cal.com (no Calendly)

| | Cal.com | Calendly |
|---|---|---|
| Free tier | Sí, ilimitado | Sí pero limitado |
| Customizable | Mucho | Menos |
| Open source | Sí | No |
| Look premium | Sí | Genérico |
| White-label | Posible | Pago |

**Recomendación:** Cal.com.

---

## Pasos (10 min)

### 1. Crear cuenta

1. Andá a https://cal.com/signup
2. Sign up con tu cuenta de Google (alexrodriguez513@gmail.com).
3. Username: `leyva` o `alex-leyva` → tu URL queda `cal.com/leyva`.

### 2. Conectar calendario

1. En Settings → Calendars, conectá tu Google Calendar.
2. Cal.com lee tu disponibilidad automáticamente y NO agenda sobre eventos existentes.

### 3. Configurar disponibilidad

Sugerido para arrancar:
- **Lunes–viernes**, 5:00 PM – 7:00 PM ET (después del trabajo)
- **Sábados**, 10:00 AM – 12:00 PM ET
- Buffer entre llamadas: 15 min
- Anticipación mínima: 4 horas (no agendar 5 min antes)
- Anticipación máxima: 2 semanas

### 4. Crear el tipo de evento "Llamada de 15 min"

En Event Types → New:
- **Title:** "Llamada de 15 min — Cotización gratis"
- **URL:** `15min` → queda `cal.com/leyva/15min`
- **Duration:** 15 minutos
- **Location:** Phone call (vos llamás al cliente) **o** Google Meet
- **Description:**
  > Hablamos 15 min sobre tu negocio. Te entiendo qué hacés, quién es tu cliente ideal, qué querés lograr con el sitio. Yo después te mando una propuesta clara por email.
  >
  > Sin compromiso. Si no es para ti, no pasa nada.
- **Questions before booking** (opcional):
  - "¿Qué tipo de negocio tienes?" (text)
  - "¿Cuál es tu sitio actual (si tienes)?" (text)
  - "Brevemente, qué quieres lograr" (textarea)

### 5. Pasar la URL al sitio

Una vez tengas tu URL (algo como `https://cal.com/leyva/15min`):

Editá `src/lib/site.ts`:

```ts
export const site = {
  // ...
  contact: {
    // ...
    bookingUrl: "https://cal.com/leyva/15min", // ← acá
  },
};
```

Y deployá. El sitio automáticamente va a mostrar el CTA "Agendar llamada" en lugar (o además) del WhatsApp en lugares estratégicos.

---

## Mensaje sugerido al cliente al final del primer contacto

Después de que respondan al WhatsApp inicial con interés, en lugar de "¿qué hora te va?":

```
Buenísimo. Para no perder tiempo de los dos, agendá los 15 min directo
acá según TU disponibilidad: https://cal.com/leyva/15min

Cuando vea la invitación te confirmo y nos hablamos.
```

Esto:
- Te hace ver organizado
- Elimina el ping-pong
- Filtra serios vs curiosos (los serios agendan)
- Llena automáticamente tu Google Calendar

---

## Bonus: tipos de evento adicionales (después)

Cuando ya tengas tracción, podés agregar:

- **Llamada de 30 min — Discovery del proyecto** (`cal.com/leyva/discovery`) — para clientes que ya pasaron la primera llamada y van a firmar.
- **Revisión de propuesta visual — 30 min** — para clientes en curso, durante la fase de diseño.
- **Soporte mensual — 30 min** — para clientes con plan activo que quieran revisar su sitio.

Cada uno con su disponibilidad propia, sus preguntas, su descripción.

---

## Reportes que vas a poder ver

Cal.com te muestra:
- Cuántas llamadas agendaron en el mes
- De qué fuente vinieron (si pones UTM en los links que mandás)
- Tasa de no-show
- Tasa de conversión llamada → cliente (si lo trackeas manualmente)

Útil para saber si tu funnel de outreach funciona o no.
