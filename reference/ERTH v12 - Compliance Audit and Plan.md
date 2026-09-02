# ERTH Homepage v12 — Requirements Compliance Audit & Implementation Plan
**Phase: planning only. No code, markup, styling, content or assets in `ERTH Homepage v9.dc.html` were modified to produce this document.**

Sources used:
1. `ERTH - Homepage (2).docx` — requirements source of truth
2. `ERTH Homepage v12 - Requirements Compliance Update.md` — process rules
3. Current implementation: `ERTH Homepage v9.dc.html` (= the v12 build; standalone exports v9–v12 derive from it)

---

## 1. COMPLETE V12 DESIGN AUDIT

### 1.1 Page structure as built (screen labels in file)

| # | Section id | Label | Role |
|---|---|---|---|
| — | (header) | fixed nav | logo, 5 nav items w/ hover dropdowns, Book button, mobile menu |
| 01 | `#top` | Hero | full-bleed photo + logomark, eyebrow, H1, lead, 2 CTAs, trust bar |
| 02 | `#proof` | Impact strip | 3 hairline stat cards |
| 03 | `#reward` | Rewards | primary scrap pricing card + voucher card + verified-proof card + benefits strip |
| 04 | `#pickup` | Doorstep pickup | headline + 4 benefit cards + CTA |
| 05 | `#accept` | What we accept | 8 device tiles + note + link |
| 06 | `#how` | How it works | 4 numbered step cards + CTA |
| 07 | `#choose` | Home or business | 2 large cards + partner logo row |
| 08 | `#blackbox` | Black Box | headline + 4 feature cards |
| 09 | `#gallery` | Gallery | 5 striped photo placeholders |
| 10 | `#b40` | B40 impact | centred statement block |
| 11 | `#impact` | Trust & impact | 2 stat blocks + 4 award cards + footnote |
| 12 | `#press` | Press coverage | 4 cards, logo slots, dated links |
| 13 | `#data` | Data security | headline + 3 steps + CTA |
| 14 | `#areas` | Service areas | 3 tiles + note |
| 15 | `#dropoff` | Drop-off options | 2 cards w/ image slots |
| 16 | `#reviews` | Reviews | 3 named review cards + link |
| 17 | `#process` | Recycling process | 4 numbered cards + CTA |
| 18 | `#difference` | Disposal vs recycling | 2 comparison cards + summary bar |
| 19 | `#faq` | FAQ | 11 static Q/A rows + terms disclosure |
| 20 | `#contact` | Final CTA | headline + booking CTA + contact tiles |
| — | `#story` | Footer | logo, blurb, link columns, legal line |

### 1.2 Visual language (LOCKED)
- **Backgrounds:** alternating `#050505` / `#0A0C0A`; section separator `1px solid rgba(255,255,255,.09)`.
- **Accent:** `#3BE07F` primary, `#8BF0B8` secondary/eyebrow, `#041007` on-accent text.
- **Text:** `#F2F5F2` headings, `#C3C9C3` lead, `#B4BAB4` body, `#9AA39A` meta.
- **Type:** Archivo 600/700 for headings (tight tracking, `-.02em` → `-.05em`), system sans for body, IBM Plex Mono for eyebrows/meta/prices (11–12px, `.14em`–`.2em`, uppercase).
- **Cards:** flat panels, `box-shadow:0 0 0 1px rgba(255,255,255,.1)` hairline (1px grid gaps), **no radius**, padding `clamp(18–34px)`.
- **Buttons:** pill `border-radius:999px`, height 52–54px; primary = solid `#3BE07F`; secondary = 1px outline; tertiary = mono uppercase text link with `→`.
- **Motion:** `erthRise` entrance, `erthBreathe` ambient, hover colour shifts only.
- **Section rhythm:** `padding: clamp(84px,11vh,132px) clamp(20px,4vw,56px)`, `max-width:1560px`.

### 1.3 Reusable component vocabulary
1. Eyebrow + H2 + lead (every section)
2. Hairline card grid (`repeat(auto-fit, minmax(N, 1fr))`, `gap:1px`)
3. Numbered step card (mono index + title + body)
4. Split feature card (large, gradient variant for emphasis)
5. Two-column price/rate list with hairline rows
6. Disclosure toggle (working rates, full terms) — state in logic class
7. Stat block (huge Archivo figure + mono caption + body)
8. Award card, review card, press card (same shell, different fields)
9. Striped image placeholder (new, gallery/press/drop-off)
10. Pill CTA row

**None of these need replacing to reach compliance.** Every gap below maps to copy inside an existing component, an extra card in an existing grid, or `<head>` metadata.

---

## 2. IMAGE AUDIT

| Asset | Where | Purpose | Status |
|---|---|---|---|
| Hero photograph | `#top`, `#contact` | atmosphere, masked | Keep |
| ERTH logomark PNG | header, hero glow, benefits strip, watermarks | brand | Keep |
| ERTH wordmark | header, mobile menu, footer | brand | Keep |
| DOE badge, 5-star glyph | hero trust bar | proof | Keep |
| 8 client logos | `#choose` | partner proof | **Verify — see §16** |
| 4 investor logos | `#impact` | backing | Keep |
| 3 uploaded PNGs (root) | `#pickup`, `#choose` | section imagery | Keep |
| 9 striped placeholders | gallery, press, drop-off | awaiting real photography | Fill, don't restyle |

**Image system is locked.** No replacements recommended. Only genuinely necessary addition: the requirements name the five gallery subjects — these are already reserved as labelled slots, so this is a fill, not a design change.

---

## 3. CONTRADICTIONS FOUND (highest priority)

| # | Contradiction | Locations | Severity |
|---|---|---|---|
| C1 | **Free-pickup threshold** — "Free pickup can start from just **1 working device or 3 qualifying non-working devices**" vs "Free pickup … at least **3 listed devices**; fewer than 3 = RM50" | `#pickup` "Small orders welcome" card · FAQ Q1 · terms disclosure · footer strip | **Critical** — the doc itself states both. Requires client ruling. |
| C2 | **RM2,500,000 "cash rewards paid"** | `#reward` verified-proof card, `#proof` strip | High — figure absent from requirements; BERNAMA cites 2.5 million **kg recycled**, not ringgit. Risk of a unit-confusion error in public copy. |
| C3 | **Client logo row** shows Maxis, U Mobile, Dell, Shell, NTT | `#choose` | High — requirements name PETRONAS, Panasonic, DHL, Hong Leong, Volvo, UN Malaysia. |
| C4 | **Stair reduction** — FAQ says "4 floors 100%, meaning no cash reward"; terms row says rewards quoted for ground floor/lift access | FAQ · terms | Low — compatible, but wording should match the doc verbatim. |
| C5 | **Working-device definition** appears in FAQ but the old "<5 years / −50% if incomplete" line was removed from `#accept` | `#accept` | Low |
| C6 | **Service coverage** — hero/nav imply doorstep pickup broadly; areas section lists KL, PJ, Shah Alam, Klang Valley, JB, Penang | `#areas`, `#pickup` | Medium — must not imply nationwide doorstep pickup. |

---

## 4. REQUIREMENT-BY-REQUIREMENT AUDIT

Status key: **F** fulfilled · **P** partially · **M** missing · **V** requires factual verification

### 4.1 Hero
| Requirement | Status | Location | Change | Level |
|---|---|---|---|---|
| H1 "Recycle Electronics Right From Your Doorstep For Free In One Step" | F | `#top` | — | — |
| Lead paragraph (doorstep / Pos Malaysia / DuitNow / responsible recycling) | F | `#top` | — | — |
| Eyebrow "Malaysia's #1 Authorised E-Waste Collector" | F | `#top` | — | — |
| Three hero proof points: 1,000,000+ kg · 50,000+ customers · 5-star | P | trust bar shows DOE badge + 5-star only | Add the two numeric proofs to the existing trust bar row | L1 |
| Hero mini-steps 01 One Minute Form / 02 We Come Over / 03 Cash On The Spot | M | — | Requirements place these in the hero; v12 covers them in `#how`. Recommend a compact 3-item mono row inside the hero's existing bottom bar, or accept `#how` as fulfilment (client call) | L1–L2 |
| CTAs "Book a Pickup \| Check Services" | F | `#top` | — | — |

### 4.2 Electronics we collect
| Requirement | Status | Location | Change | Level |
|---|---|---|---|---|
| H2 "The Electronics We're Ready to Collect" | F | `#accept` | — | — |
| Intro paragraph incl. disposal→recycling definition | F | `#accept` | — | — |
| Condition line "Broken · Large equipment · Damaged · Difficult to pack · Cracked · Missing parts" | M | — | Add as a mono chip row under the lead (existing style) | L1 |
| Four grouped categories (Computers & Storage / Phones & Tablets / TVs & Displays / Printing Equipment) with named sub-items | P | 8 flat tiles, no grouping, missing keyboards, mice, hard drives, feature phones, iPads, scanners, fax | Re-label the existing 8-tile grid into 4 group cards each listing its sub-items — same grid component, 4 columns instead of 8 tiles | L2 |
| "Cannot see your device listed? Send us a photo…" | F | `#accept` | — | — |
| CTAs "Submit an Unlisted Device \| Check Service Areas" | P | one link only | Add the second link to the existing row | L1 |

### 4.3 Why people choose ERTH
| Requirement | Status | Location | Change | Level |
|---|---|---|---|---|
| H2 "E-Waste Collection Built Around Your Convenience" | P | reads "Built around your convenience." | Align wording | L0 |
| Lead paragraph | F | `#pickup` | — | — |
| Same-Day Payment card | F | `#pickup` | — | — |
| Small Orders Welcome card | F | `#pickup` | Subject to C1 ruling | L0 |
| Free Pickup, No Trip card | M | only 2 of 4 benefit cards present | Add 2 cards to the existing 2-card grid | L2 |
| Recycled Responsibly card | M | — | as above | L2 |

### 4.4 Choose the service that fits you
| Requirement | Status | Location | Change | Level |
|---|---|---|---|---|
| H2 + lead | F | `#choose` | — | — |
| Home collection card + 3 bullets | P | card present, bullets missing | Add 3 bullet lines inside existing card | L1 |
| B2B card + 4 bullets | P | card present, bullets missing | as above | L1 |
| Black Box + 3 bullets | F | `#blackbox` (own section) | — | — |
| Data Protection + 3 bullets | P | `#data` has 3 steps | Align bullet wording to doc | L0 |
| CTAs (Book a Home Pickup / Request Enterprise Collection / Request a Black Box / Choose Data Protection) | F | all four present | — | — |

### 4.5 Track record
| Requirement | Status | Location | Change | Level |
|---|---|---|---|---|
| H2 "A Track Record You Can Trust" + lead | P | lead present, H2 differs | Align | L0 |
| 1,000,000+ kg card | F | `#impact` | — | — |
| 50,000+ customers card | F | `#impact` | — | — |
| 5-Star Experience card | M | only 2 stat blocks | Add third block to the existing grid | L2 |

### 4.6 Process
| Requirement | Status | Location | Change | Level |
|---|---|---|---|---|
| 3 steps (Book Your Pickup / We Handle Everything / Get Paid + Voucher) with full detail | P | v12 has 4 steps (split "Confirm the details" out) | Either merge to 3 or keep 4 — content is complete either way; recommend keeping 4 (design-preserving) and noting it | L0 |
| "no driving to a recycling centre or arranging transport yourself" | M | — | Add clause to step 2 body | L0 |

### 4.7 Recognition
| Requirement | Status | Location | Change | Level |
|---|---|---|---|---|
| 6 named awards with years | P | 4 shown; EWC 2020 + Alipay-NUS only in a footnote | Add 2 cards to the existing 4-card grid | L2 |
| "Cited by" source per award (Gobi Partners, iF Design, Vulcan Post, World Summit Awards) | M | — | Add a mono citation line to the existing award card | L1 |
| Award descriptions verbatim | P | shortened | Align | L0 |
| "Trusted by Leading Organizations" naming PETRONAS, Panasonic, DHL, Hong Leong, Volvo, UN Malaysia | V | logo row shows a different set | **Client must confirm which logos are licensed for use** | L1 |

### 4.8 Press
| Requirement | Status | Location | Change | Level |
|---|---|---|---|---|
| 4 outlets, headlines, summaries, dates | F | `#press` | — | — |
| NST is syndicated BERNAMA reporting — keep clear | M | — | Add clarifying clause to the NST card | L0 |
| Working article URLs | V | all links are `#press` placeholders | Client to supply 4 URLs | L0 |

### 4.9 Service areas
| Requirement | Status | Location | Change | Level |
|---|---|---|---|---|
| H2 "Where ERTH Comes to You" + full lead ("Stop searching for electronic recycling center near me…") | P | short lead | Align to doc | L0 |
| Six named locations | F | `#areas` note line | Consider promoting to their own chip row for scanability | L1 |
| "Book Your Collection" CTA | F | `#areas` | — | — |
| "Can't See Your Area? … [Check My Area on WhatsApp]" | P | text present, no WhatsApp CTA | Add link to existing row | L1 |
| No unsupported nationwide doorstep claim | P | see C6 | Qualify hero/`#pickup` wording | L0 |

### 4.10 Drop-off, B40, reviews, process, disposal-vs-recycling
All four sections exist and match the doc (`#dropoff`, `#b40`, `#reviews`, `#process`, `#difference`).
- Drop-off CTAs are placeholders → **V** (Google Maps URL, Pos Malaysia page).
- Reviews: v12 uses three **named, real** Google reviews; the doc supplies three **unattributed** quotes → **V / client decision** (swapping text under real names would misattribute).

### 4.11 FAQ
All 11 doc questions are present and verbatim-aligned. Gaps against the compliance brief's topic list:
| Missing topic | Fix | Level |
|---|---|---|
| "What electronics do you accept?" | Add Q linking to `#accept` | L1 |
| "What if my device is not listed?" | Add Q | L1 |
| "How does booking work?" | Add Q | L1 |
| "Do you collect from businesses?" | Add Q | L1 |
| "What happens after collection?" | Add Q linking to `#process` | L1 |
| "What happens to my data?" | Present (kept from v12) | — |

### 4.12 SEO / schema
| Item | Current | Required | Level |
|---|---|---|---|
| `<title>` | "ERTH: Recycle your electronics. Get rewarded." | "E-Waste recycling & Pickup in Malaysia \| ERTH" | L0 |
| Meta description | old reward-led copy | doc-supplied description | L0 |
| Canonical | **absent** | `https://erth.app/` | L0 |
| Open Graph / Twitter | **absent** | og:title, og:description, og:image, og:url, og:type | L0 |
| JSON-LD Organization / RecyclingCenter | **absent** | name ERTH, alt name "Electronic Recycling Through Heroes", description, logo, url, email hello@erth.app, phone +60 14-221 1446, address Ground Floor G-3A Kanvas Retail @ Prima 15, Jalan Teknokrat 6, Cyberjaya, Selangor 63000, MY; `Use Multiple Locations: No` | L0 |
| JSON-LD FAQPage | **absent** | mirror the 11 FAQ answers | L0 |
| H1 count | exactly 1 | correct | — |
| Heading hierarchy | H2 per section, H3 in cards | correct | — |
| Semantic HTML | `<section>`/`<footer>`/`<h1–h3>` used; nav is a `<div>` | wrap header nav in `<nav>`, main body in `<main>` | L0 |
| Image alt text | decorative `alt=""` correct; logos named | give the hero photo a descriptive alt; write alts for the 9 new photo slots when filled | L0 |
| Internal links | good; **new sections 09–18 are not in the nav dropdowns** | add anchors | L1 |

### 4.13 GEO / AI answerability
| Question | Answered self-containedly? |
|---|---|
| What does ERTH collect? | Yes — `#accept` (stronger once grouped) |
| Does ERTH accept broken electronics? | Yes — `#reward` H2 + FAQ |
| What qualifies for free pickup? | **Contradictory (C1)** |
| Where does ERTH collect? | Yes — `#areas` |
| How does pickup work? | Yes — `#how` |
| How do I book? | Yes — CTA + `#how` step 1 |
| What happens after collection? | Yes — `#process` |
| How is data handled? | Yes — `#data` |
| Does ERTH serve businesses? | Yes — `#choose`, `#blackbox` |

---

## 5. CUSTOMER JOURNEY AUDIT

| Stage | Section | Sufficient? | Smallest fix |
|---|---|---|---|
| 1. Can ERTH solve my problem? | Hero | Yes | add 2 numeric proofs |
| 2. Do you accept what I have? | `#accept` | Partly | condition line + 4 grouped categories |
| 3. Will you collect it from me? | `#pickup`, `#areas` | Yes | qualify coverage wording |
| 4. How easy is it? | `#how` | Yes | add "no driving/transport" clause |
| 5. What happens after collection? | `#process`, `#difference` | Yes | — |
| 6. Can I trust ERTH? | `#impact`, `#press`, `#reviews` | Partly | 3rd stat, 2 awards, citations |
| 7. Can businesses use ERTH? | `#choose`, `#blackbox` | Yes | add bullets |
| 8. Where is it available? | `#areas`, `#dropoff` | Yes | WhatsApp CTA |
| 9. How do I book? | header CTA, `#contact` | Yes | — |

**Section order does not need changing.**

---

## 6. FUNCTIONALITY AUDIT

| Item | Status |
|---|---|
| Fixed header, scroll state, hover dropdowns | Working |
| Mobile menu open/close | Working |
| Booking modal (`openBook`) | Working |
| Working-rates disclosure, terms disclosure | Working |
| Internal anchors `#top … #contact` | Working |
| Nav dropdown coverage of sections 09–18 | **Gap** — new sections unreachable from nav |
| Press card links (×4) | **Placeholder** `#press` |
| Drop-off CTAs (×2) | **Placeholder** `#dropoff` |
| Gallery / press-logo / drop-off image slots (×9) | **Awaiting assets** |
| External links (WhatsApp, tiny.cc/erthbox, mailto) | Working |
| Console | Clean on last verification |

---

## 7. RESPONSIVE RISK REGISTER

| Planned change | Risk | Mitigation |
|---|---|---|
| 4 grouped device cards with 6 sub-items each | taller cards on tablet | existing `auto-fit minmax` grid handles it; keep sub-items at 14–15px |
| +2 benefit cards in `#pickup` | 2×2 wrap on tablet | already an auto-fit grid |
| +2 award cards, +1 stat block | uneven last row at some widths | acceptable within the hairline grid; no change |
| Bullets in `#choose` cards | card height growth | cards are content-height already |
| Hero proof points added to trust bar | wrapping on ≤400px | bar already `flex-wrap` |
| Longer FAQ (16 Q) | page length | FAQ rows are compact; no change |

No layout system changes required.

---

## 8. FINAL DESIGN PLAN

### A. KEEP EXACTLY AS-IS
Grid system, palette, type scale, button styles, card hairlines, section padding/rhythm, animations, hero composition, nav/mobile menu, booking modal, rewards pricing card (all 14 rates + working-rate disclosure), voucher card and its sticker, verified-proof card, benefits strip + overlapping logomark, all existing photography and logos, footer.

### B. COPY CHANGES (Level 0)
Title, meta description, `#pickup` H2, `#impact` H2, award descriptions, `#areas` lead, `#how` step-2 clause, NST syndication clause, data-protection bullet wording, `#accept` intro alignment. All are text-node swaps inside existing elements.

### C. EXISTING COMPONENT UPDATES (Level 1–2)
1. `#accept` — condition chip row; regroup 8 tiles → 4 category cards with sub-items; second CTA.
2. `#pickup` — 2 additional benefit cards.
3. `#impact` — third stat block; 2 additional award cards; "Cited by" line per award.
4. `#choose` — 3–4 bullets inside each existing card.
5. `#areas` — city chip row; WhatsApp CTA.
6. `#top` — 2 numeric proofs in the trust bar (+ optional 3-step mono row).
7. `#faq` — 5 additional Q/A rows.
8. Header nav — anchors for sections 09–18.

### D. IMAGE CHANGES
None. Fill the 9 existing placeholders when photography arrives; write alt text at that point.

### E. SEO / GEO CHANGES
New `<head>` block: title, description, canonical, OG/Twitter, JSON-LD Organization+RecyclingCenter, JSON-LD FAQPage. Wrap header in `<nav>`, body sections in `<main>`. Descriptive hero alt. **No visual change.**

### F. FUNCTIONALITY CHANGES
Real URLs for 4 press links and 2 drop-off CTAs; nav anchors for new sections. Nothing else.

### G. FACTUAL VERIFICATION ITEMS (client sign-off needed)
1. **C1 — free-pickup threshold.** Is it "1 working OR 3 non-working", or "3 listed devices, else RM50"? One must win, page-wide.
2. **C2 — RM2,500,000.** Confirm ringgit paid out, or replace with the doc-supported 2.5 million kg / 1,000,000+ kg figures.
3. **C3 — client logos.** Which organisations may be displayed?
4. Press article URLs (×4).
5. Cyberjaya Google Maps URL; Pos Malaysia shipping page URL.
6. Reviews: keep real named reviews, or publish the doc's unattributed quotes?
7. Hero mini-steps: hero placement (per doc) or accept `#how` as fulfilment?
8. Nothing in either source supports certifications or "100% safe" data claims — current data copy is already conditional ("suitable wiping or physical drive destruction options") and should stay that way.

### H. COMPLIANCE MATRIX SUMMARY
| Area | Fulfilled | Partial | Missing | Verify |
|---|---|---|---|---|
| Hero | 4 | 1 | 1 | — |
| Devices accepted | 2 | 2 | 1 | — |
| Why choose ERTH | 3 | 1 | 2 | — |
| Service options | 5 | 3 | — | — |
| Track record | 2 | 1 | 1 | — |
| Process | 3 | 1 | 1 | — |
| Recognition | 1 | 2 | 1 | 1 |
| Press | 2 | — | 1 | 1 |
| Service areas | 2 | 3 | — | — |
| Drop-off / B40 / reviews / process / disposal | 5 | — | — | 3 |
| FAQ | 11 | — | 5 | — |
| SEO / schema | 3 | 2 | 7 | — |
| **Total** | **43** | **16** | **20** | **6** |

---

## 9. DESIGN-PRESERVATION CONFIRMATION

**Yes — every supported requirement can be met without altering the v12 design.**

- 20 missing items: 10 are `<head>`/metadata (invisible), 5 are FAQ rows in the existing FAQ component, 5 are additional cards inside grids that already exist.
- 16 partial items are copy alignment inside existing elements.
- Zero new sections. Zero new components. Zero image replacements. No change to section order, palette, type, spacing or motion.
- The only Level-2 items add **cards to grids that already auto-fit**, which is the design system working as intended.

The single genuine open question is whether the hero should carry the doc's three mini-steps. If yes, that is one compact mono row inside the hero's existing bottom bar — still not a redesign.

**Recommended sequence for the build phase:** (1) resolve G1–G3 with the client, (2) Level 0 copy + `<head>`/schema, (3) Level 1 additions, (4) Level 2 card additions, (5) nav anchors, (6) responsive pass at 1440 / 1024 / 768 / 390, (7) re-audit against this matrix.
