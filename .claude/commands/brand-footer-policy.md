# Brand Footer Policy — Leyva Web Studio

## Mission

Apply the Leyva Web Studio footer standard to the current project.

The footer must look professional, trustworthy, legally clean, responsive, and consistent with a premium local-business website. It should never feel like an afterthought.

## When to use this command

Use this command when:

- A project needs a new footer.
- A footer looks weak, generic, incomplete, or messy.
- A client website needs copyright and Leyva Web Studio credit.
- A private demo needs an unofficial redesign disclaimer.
- A website is being prepared for launch or client handoff.

## First inspect the project

Before changing code, inspect:

- Existing footer component.
- Layout components.
- Navigation links.
- Business information.
- Contact information.
- Social media links.
- Whether this is a real client website, Leyva Web Studio website, or private concept demo.
- Whether privacy/terms pages exist.
- Whether the site uses App Router, Pages Router, or another structure.

Do not create duplicate footers if one already exists. Improve the existing one unless rebuilding is clearly better.

## Required footer elements for client websites

Include the most relevant items available:

- Business name.
- Short brand description.
- Phone number.
- Email address if available.
- Address or service area.
- Opening hours if relevant.
- Main navigation links.
- Services/products links.
- Social media links.
- Google Maps or directions link if relevant.
- Privacy Policy link if available.
- Terms link if available.
- Copyright line.
- Website credit line.

Never invent fake contact details. If information is missing, use safe placeholders only if the project is clearly a demo, and clearly mark what needs real client info.

## Copyright rule

Always include a copyright line using the current year.

Use this format for normal client websites:

```txt
© [YEAR] [BUSINESS NAME]. All rights reserved.
```

Example:

```txt
© 2026 Tapatias Taqueria. All rights reserved.
```

## Leyva Web Studio credit rule

For normal client websites, include a subtle professional credit line unless the client contract says otherwise.

Preferred options:

```txt
Website by Leyva Web Studio
```

```txt
Designed & developed by Leyva Web Studio
```

```txt
Crafted by Leyva Web Studio
```

The credit should be tasteful and not visually compete with the client brand.

## Private concept demo disclaimer

If the project is an unofficial redesign, private concept, restaurant demo, pitch demo, or presentation to a business that has not yet hired Leyva Web Studio, include this disclaimer:

```txt
Unofficial redesign concept created for private presentation purposes only. All trademarks, logos, names, images, and brand assets belong to their respective owners.
```

This disclaimer should be visible in the footer but styled cleanly and professionally.

## Leyva Web Studio own website footer

For Leyva Web Studio’s own website, include:

- Leyva Web Studio.
- Premium websites for local businesses.
- Services.
- Portfolio.
- Pricing.
- Monthly services.
- Contact.
- WhatsApp CTA.
- Cleveland, Ohio service area.
- Copyright.
- Brand statement.

Suggested copyright line:

```txt
© [YEAR] Leyva Web Studio. Premium websites and digital growth systems for local businesses.
```

Suggested brand description:

```txt
Premium websites, local SEO, maintenance, and growth systems for local businesses that want to look more professional and get more customers online.
```

## Monthly services footer upsell

When appropriate for Leyva Web Studio or service-business projects, add a subtle monthly services CTA:

```txt
Need updates, SEO, or monthly growth support? Ask about our website care and digital marketing plans.
```

Do not add this to client websites unless it fits the agreement or the site is for Leyva Web Studio.

## Footer layout standard

Use a premium responsive layout.

Recommended structure:

1. Brand column.
2. Navigation column.
3. Services column.
4. Contact/location column.
5. Bottom bar with copyright, credit, and legal links.

On mobile:

- Stack columns cleanly.
- Keep spacing generous.
- Make links easy to tap.
- Avoid tiny text.
- Avoid overcrowding.

## Visual rules

The footer must be:

- Clean.
- Premium.
- Easy to scan.
- Consistent with the site design.
- Strong on mobile.
- Not overloaded.
- Not generic.
- Not visually disconnected from the rest of the page.

Avoid:

- Random colors.
- Too many links.
- Empty social icons.
- Broken legal links.
- Fake email/phone.
- Low-contrast text.
- Footer text that is too small on mobile.

## Technical rules

- Use semantic `<footer>`.
- Use accessible links.
- Use `aria-label` where helpful.
- Use proper external link attributes when opening new tabs.
- Use reusable data arrays for footer links when possible.
- Keep the component clean and maintainable.
- Avoid hardcoding repeated links in multiple places.
- Do not break existing layout.
- Do not introduce hydration problems.
- Respect the existing design system.

## Link rules

Check every footer link.

- No empty `href="#"` links unless clearly temporary in a demo.
- Phone links should use `tel:`.
- Email links should use `mailto:`.
- WhatsApp links should use the correct number format.
- External links should open safely when appropriate.
- If privacy/terms pages do not exist, either create basic pages or omit those links and mention they are missing.

## SEO and trust rules

For local businesses, the footer should support local trust and SEO naturally by including:

- Business name.
- City or service area.
- Address or service area when available.
- Phone number.
- Main services.
- Link to contact/location section.

Do not keyword stuff.

## Implementation steps

1. Inspect the current footer and project structure.
2. Decide whether to improve or rebuild the footer.
3. Create or update the footer component.
4. Add accurate business information.
5. Add copyright using the current year.
6. Add Leyva Web Studio credit if appropriate.
7. Add private concept disclaimer if appropriate.
8. Check responsive layout.
9. Check all links.
10. Summarize what changed and what information is still needed.

## Output required

After implementation, report:

1. Footer status: created, improved, or already good.
2. Files changed.
3. Copyright/credit added.
4. Disclaimer added if applicable.
5. Links that need real client information.
6. Any recommended privacy/terms pages.
7. Final mobile/footer checklist.

## Final quality bar

Do not finish until the footer looks like it belongs on a premium agency-built website.
