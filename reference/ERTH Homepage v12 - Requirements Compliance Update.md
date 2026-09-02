# ERTH Homepage v12 — Requirements Compliance Update

## PRIMARY OBJECTIVE

Update the existing ERTH Homepage v12 implementation so that it fulfills **ALL applicable requirements in the provided Word requirements document**.

The current v12 design is the approved design baseline.

**DO NOT redesign the website.**

This is a **requirements-compliance and content/functionality update**, not a visual redesign.

---

## 1. DESIGN LOCK — NON-NEGOTIABLE

Treat the existing v12 homepage as design-locked.

Preserve the existing:

- Overall visual design
- Section structure
- Section order
- Hero layout
- Navigation
- Typography
- Colors
- Buttons
- Cards
- Borders
- Radius
- Shadows
- Icons
- Images
- Animations
- Responsive behavior
- Existing visual hierarchy

Do not introduce a new design system.

Do not rebuild the page from scratch.

Do not replace existing components when the existing component can be updated.

Do not create duplicate sections when an existing section can satisfy the requirement.

If a requirement is missing, integrate it into the **most appropriate existing section/component**.

Only create a genuinely new UI element if the requirement cannot reasonably be fulfilled otherwise.

---

# 2. REQUIREMENTS DOCUMENT IS THE SOURCE OF TRUTH

Use the supplied Word requirements document as the specification.

Before making changes:

1. Read the entire requirements document.
2. Audit the current v12 implementation against it.
3. Create an internal checklist of every requirement.
4. Mark each requirement:
   - Fulfilled
   - Partially fulfilled
   - Missing
   - Requires factual verification
5. Implement every requirement that is supported by the source material.
6. Do not invent facts to fill gaps.

Preserve the terminology and intent of the requirements document.

Do not silently replace source requirements with assumptions.

---

# 3. CUSTOMER JOURNEY

Ensure the existing homepage clearly communicates this sequence without redesigning it:

1. Can ERTH solve my problem?
2. Do you accept what I have?
3. Will you collect it from me?
4. How easy is the process?
5. What happens after collection?
6. Can I trust ERTH?
7. Can businesses use the service?
8. Where is the service available?
9. How do I book?

Use the existing sections/components wherever possible.

---

# 4. PICKUP ELIGIBILITY

Make the eligibility requirement completely clear and consistent throughout the page.

The wording must distinguish between:

- 1 qualifying working device
- OR 3 qualifying non-working devices

Do not use wording that could imply:

> Any single broken device automatically qualifies for free pickup.

Where the page mentions free pickup, ensure the relevant qualification is clear.

---

# 5. FREE PICKUP / BULKY ITEMS

Ensure free pickup messaging does not incorrectly imply that every possible collection is automatically free.

Where applicable, clearly communicate the bulky-item qualification and the applicable RM50 rule from the requirements document.

Do not contradict the source requirements.

Use existing UI/components rather than redesigning the page.

---

# 6. DEVICE ACCEPTANCE

Ensure the existing device/category content clearly covers the required electronics categories.

Include the existing unlisted-device pathway where required.

Make it obvious that users can still enquire about items that are not explicitly listed.

Do not create unnecessary new cards if existing cards can be updated.

---

# 7. WORKING + NON-WORKING DEVICES

Make sure the page clearly communicates that ERTH accepts both working and non-working electronics, subject to the stated qualification rules.

Avoid vague wording.

---

# 8. COLLECTION PROCESS

Ensure the existing page clearly explains the process:

Book
→ Collection
→ ERTH handles the rest

The customer should not feel that they need to transport, dismantle, sort, or personally process the electronics unless the requirements explicitly say so.

---

# 9. WHAT HAPPENS AFTER COLLECTION

Strengthen the existing "What Happens After We Collect It?" content using the requirements document.

Explain the relevant flow, including:

- Collection
- Assessment/sorting
- Reuse/refurbishment where applicable
- Responsible recycling/disposal
- Data-bearing device handling

Do not make unsupported operational claims.

---

# 10. DATA SECURITY

Review all data-security language.

Use only claims supported by the requirements/source material.

Do not invent certifications, guarantees, processes, or security standards.

Avoid unsupported absolute claims such as "100% safe" unless explicitly supported by the source.

Keep the trust message strong but factual.

---

# 11. REWARDS / PAYMENT

Ensure reward messaging is accurate.

Do not imply that every electronic item automatically receives cash.

Clearly distinguish:

- Eligibility for cash rewards
- Other applicable incentives/vouchers
- Any relevant conditions

Use the requirements document as the source of truth.

---

# 12. B2B / WORKPLACE COLLECTION

Ensure the existing B2B/business section clearly communicates the required workplace/bulk collection proposition.

Do not redesign the section.

Improve its copy and CTA where necessary.

---

# 13. SERVICE AREAS

Ensure the existing service-area content clearly distinguishes:

- Klang Valley pickup
- Nationwide Pos Malaysia shipping where applicable
- Cyberjaya 24/7 drop-off
- Any other service-area details explicitly required by the source

Do not introduce unsupported coverage claims.

---

# 14. TRUST / SOCIAL PROOF

Keep the existing trust-building design.

Ensure testimonials, impact claims, statistics, awards and recognition are consistent with the requirements document.

Do not invent testimonials, statistics, awards or certifications.

---

# 15. AWARDS / RECOGNITION

Audit the awards/recognition section against the requirements document.

Use the required verified recognitions and wording where supported.

Any additional award or recognition claim that is not supported by the source must be:

- verified before publication, or
- removed/softened.

Do not fabricate supporting information.

---

# 16. FAQ

Audit the existing FAQ against the requirements.

Ensure the FAQ answers the important user objections, including where applicable:

- What electronics are accepted?
- Are broken devices accepted?
- What is the minimum qualification?
- Is pickup free?
- What about bulky items?
- Do I get paid?
- What happens to my data?
- Where do you collect?
- What happens after collection?
- What if my device is not listed?
- How does booking work?

Reuse the existing FAQ design.

---

# 17. SEO

Without changing the visual design, audit and improve:

- `<title>`
- Meta description
- Heading hierarchy
- Semantic HTML
- Image alt text
- Internal links
- Canonical URL if applicable
- Relevant structured data
- Organization/local business information where supported
- FAQ structured data only where appropriate and compliant
- Service/location information where supported

Do not keyword-stuff.

Write naturally for users first.

---

# 18. GEO / AI SEARCH READABILITY

Make the existing content easy for search engines and AI systems to understand.

Use clear, direct answers to questions such as:

- What does ERTH collect?
- Where does ERTH collect?
- How does ERTH pickup work?
- What qualifies for free pickup?
- Does ERTH accept broken electronics?
- What happens to electronics after collection?
- Does ERTH handle data-bearing devices?
- Does ERTH serve businesses?

Do this primarily by improving existing copy and headings.

Do not create a visually repetitive page just to add keywords.

---

# 19. CONTENT CONSISTENCY AUDIT

Search the entire implementation for contradictory statements.

Pay particular attention to:

- Free pickup
- Minimum qualifying devices
- Broken devices
- Rewards
- Bulky items
- Service areas
- Data security
- Awards
- Recycling claims
- Business collection

There must be one consistent interpretation across the entire homepage.

---

# 20. FUNCTIONALITY AUDIT

Test every existing:

- CTA
- Navigation link
- Booking link
- FAQ interaction
- Mobile menu
- Form
- External link
- Internal anchor
- Interactive component

Do not change the visual design merely because a component can be implemented differently.

Fix functionality only where required.

---

# 21. RESPONSIVE AUDIT

After content changes, test:

- Desktop
- Tablet
- Mobile

Ensure longer compliance copy does not break:

- Cards
- Buttons
- Navigation
- Hero
- FAQ
- Footer
- Section spacing

Make only minimal CSS adjustments required to preserve the existing design.

---

# 22. PERFORMANCE / TECHNICAL SAFETY

Do not unnecessarily replace the current architecture.

Preserve working functionality.

Avoid adding unnecessary dependencies.

Do not remove existing working assets.

Do not introduce console errors.

Do not leave broken links or missing assets.

---

# 23. FINAL COMPLIANCE CHECK

After implementation, perform a second complete audit against the Word requirements document.

Produce an internal compliance matrix:

| Requirement | Status | Implementation Location |
|---|---|---|
| Requirement 1 | Fulfilled | Existing section/component |
| Requirement 2 | Fulfilled | Existing section/component |
| Requirement 3 | Fulfilled | Existing section/component |
| ... | ... | ... |

The target is:

**100% of supported requirements fulfilled.**

Anything that cannot be confirmed from the source document must be explicitly marked:

**REQUIRES FACTUAL VERIFICATION**

Do not guess.

---

# 24. FINAL DESIGN CHECK

Before finishing, compare the updated page to the original v12.

The result should look like the **same website**.

The difference should primarily be:

- More complete
- More accurate
- More consistent
- Better explained
- Better optimized for search/AI
- Better aligned with the requirements document

NOT a redesign.

## FINAL RULE

**CONTENT + COMPLIANCE + FUNCTIONALITY = CHANGE**

**FUNDAMENTAL DESIGN = LOCKED**

If a requirement can be fulfilled by changing existing text, do that instead of creating a new visual component.

If an existing component can satisfy the requirement, reuse it.

Only make structural/UI changes when absolutely necessary to fulfill a requirement.