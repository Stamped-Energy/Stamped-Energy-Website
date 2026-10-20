# Agents section and "What we improve" copy plan

**Date:** 20 October 2026. **Status:** plan only, nothing implemented. **Branch:** `plan/agents-and-solutions-copy`, cut from `feat/homepage-realignment` (PR #17).

**Sources:**
- `write-like-vinayak` SKILL.md and stamped.md (stamped.md wins on the product explanation and authority).
- The copy guide (`external/docs/copy/STAMPED_COPY_GUIDE.md`, read from the stamped-external snapshot).
- The homepage wording in PR #17.
- `lib/content/solutions.ts` and `lib/seo/pages.ts`.

**Rules for both parts:**
- Status tags are only **First pilot scope** and **Planned**.
- The copy must not claim:
  - savings figures, percentages or rupee figures
  - live or pilot status
  - autonomous control beyond the approved step 3 ("Once a kind of change has already worked on your line, Stamped can run it on its own, always inside limits set beforehand.")
  - the words superpower, platform (as the pitch), unlock, transform or innovation
- Any mock UI is captioned **Illustrative** and carries no invented figures.
- Voice: no em dashes, British spelling, no contrast lines, no reflexive triplets, general headings.
- Authority: "inside limits set beforehand". Hard stops read as "loads that must stay on stay with you" or as plain ownership lines, never as a "never" list.
- Words: say "a model of that line" on first-touch copy. No digital twin and no reinforcement learning there.

---

## Part A. A fuller agents section below "What we improve"

**Placement:** directly after `HomeSolutionsRows`, replacing the compact `HomeAgents` strip from PR #17. It stays behind the same single flag, `landing.agents.enabled`.

**Agents in scope, unchanged from PR #17:**
- **First pilot scope:**
  1. Reads your scattered records
  2. Replays your worst lot
  3. Warns while there is time
  4. Checks your sensors first
  5. Counts what a reject really cost
- **Planned:** answers with sources, shift handovers, quality before the lab, better standards.

### Option 1 (recommended). Agent picker with a mock output

**Layout:**
- Desktop (lg and up): two columns.
  - Left: header, then a vertical list of the five agents as buttons (name and one line). The selected agent gets a primary left border.
  - Right: a large panel showing that agent's mock output card, in the motion-palette colour for that agent.
- Under both columns, one row of **Planned** chips.
- Mobile: the list becomes a horizontal scroll of pill tabs above the panel. Each panel is still reachable without JS, because every panel is in the markup and the tabs only toggle them.

**Motion (GSAP):**
- On first view, the list staggers in and the first card draws in (rows reveal top to bottom, the status pill lands last).
- On tab change, the card cross-fades with a short y shift, and the inner rows stagger again.
- Optional autoplay cycles the agents every few seconds while the section is in view and stops for good on the first user interaction.
- Reduced motion: no autoplay, instant swaps, everything static.
- Keyboard: a proper `role="tablist"` with arrow keys.

**Exact copy**

- Badge: **Agents**
- H2: **Agents that keep working when your team goes home.**
- Intro: **Each agent does one job on your line, from the records you already keep, and hands your team what it found with the record behind it. Pick one to see the kind of thing it writes.**
- Authority line under the intro: **Stamped works inside limits set beforehand.**
- Tag on all five: **First pilot scope**
- Card caption, on every mock card: **Illustrative. Written for this page, not taken from a plant.**

| Agent (tab) | Tab line | Mock card (illustrative, no figures) |
| --- | --- | --- |
| Reads your scattered records | One record for every batch. | Card title "Batch record". Source rows, each with a tick: "Controller data", "Historian tags", "ERP lot", "Handwritten shift card". Footer: "Joined into one record for this batch." |
| Replays your worst lot | See what the signals showed before it went wrong. | Card title "Lot replay". A short unlabelled trace with three markers. Rows: "Loaded", "Signals moved away from the runs that passed", "Rejected at inspection". Footer: "The signals turned before the reject. This is where." |
| Warns while there is time | A warning while the batch can still be saved. | Card title "Warning, for the shift lead". Body: "This batch is drifting toward the conditions that came before past rejections. It can still be saved." Buttons (inert): "Evidence", "Comment". |
| Checks your sensors first | A stuck reading is flagged before anyone trusts it. | Card title "Sensor check". A flat sparkline. Body: "This reading has not moved all shift. Check the sensor before trusting what it says." Pill: "Flagged". |
| Counts what a reject really cost | The energy and material in parts that never ship. | Card title "Cost of rejects". Two unlabelled bars, "Energy" and "Material", with no scale or numbers. Body: "Rejected parts used energy and material that never shipped. Shown next to your rejections." |

- Planned row label: **Planned**
- Planned chips: **Answers with sources** · **Shift handovers** · **Quality before the lab** · **Better standards**

**Components and files:**
- `components/sections/HomeAgents.tsx`, rewritten as a client component with the tablist and panel.
- New `components/motion-slots/AgentMockCards.tsx`: five small presentational cards using the existing ladder palette classes. Move the shared palette from `components/motion-slots/ladder.css` into `agents.css` or a shared stamped motion stylesheet.
- `lib/content/landing.ts`:
  - The `agents` block gains `intro`, `authorityLine`, `caption`, per-card `tabLine` and `mock` fields, and `planned: string[]`.
  - `planned` replaces `moreLine`.
  - Optional `autoplay: boolean`.
- Screenshots at 1440 and 390 px of each tab and the reduced-motion state, added to the PR #17 screenshot set.

**Why this option:**
- It shows each agent's output in one glance and maps one to one onto the five pilot-scope agents.
- It reads well on mobile, works without JS, and reuses the card language of the existing example actions.
- It carries the least risk of implying that something is running in a plant.

### Option 2. A night shift to morning timeline

**Layout and motion:**
- A horizontal band with a soft gradient from night to day, pinned with a ScrollTrigger scrub on desktop.
- Phases sit as markers along it: **Night shift**, **Before the shift change**, **Morning meeting**.
- Each phase shows one or two agents' mock notes popping onto the line.
- On mobile it becomes a vertical timeline. Under reduced motion, every note shows.

**Copy:**
- H2: **What your plant hears about by morning.**
- Intro: **The agents work through the night on the records your line already writes, so the morning shift starts with what happened and what to check.**
- Notes:
  - Night shift: "A temperature reading on Line 2 stopped moving. Flagged before anyone used it." and "This batch is drifting toward the conditions that came before past rejections."
  - Before the shift change: "Last week's rejected lot, replayed from your own records."
  - Morning meeting: "One record for every batch from the night" and "What the rejects cost in energy and material".
- Tags and caption: same as Option 1. Planned chips at the end.

**Files:** HomeAgents rewrite, a new `AgentsTimeline` visual and new content fields.

**Risks:**
- Machine names in the notes edge toward sector mechanics.
- The pin adds a second scroll-jacked section after the ladder, which is heavy.
- An overnight story can be read as unattended action, so it needs careful wording.

### Option 3. Split layout with an illustrative feed

**Layout and motion:**
- Left: the header and the five agent names as a static list with pilot-scope pills.
- Right: a tall panel where mock events slide up one at a time, each tagged with the agent name. The loop pauses on hover and stops when the section is out of view.
- Reduced motion: a static stack of five events.

**Copy:**
- H2: **Agents that keep working when your team goes home.**
- Panel header: **Illustrative feed**
- Events: the same five card bodies as Option 1, shortened to one line each.

**Risks:**
- A scrolling feed reads as a live product even with a caption. It is the closest of the three to the banned live or pilot implication.
- It is the weakest on mobile.

### Recommendation

**Option 1.** Option 2 is a good later piece for a dedicated agents page. Option 3 is not recommended because of the live-feed implication.

---

## Part B. Copy plan for the "What we improve" pages

**What the audit found:**
- No "about two weeks" and no zero-trust text appears on any solutions page or in its meta. Those leftovers sit on the engagement page, `public/llms.txt` and `lib/seo/llms-index.ts`, which are handled separately.
- "Recommends and your team decides" appears three times: process FAQ, planning method and planning FAQ.
- "Digital twin" and reinforcement learning appear in process copy and meta.
- The maintenance page does not say Coming soon at all.
- I propose keeping the structure of every page (hero, example actions, method, energy note, FAQ).

### Hub (`/solutions`)

| Block | Current | Proposed | Why |
| --- | --- | --- | --- |
| Description | Stamped learns how your plant runs from the data it already records, then improves control, catches quality problems while the lot can still be saved, re-plans with the whole plant in view and plans maintenance around production, with actions your team can take. | Stamped models your processes and equipment from the data you already log, then finds the change that cuts the loss in control, quality and planning, inside limits set beforehand. Maintenance is coming next. | Matches the homepage lede and authority line, and is honest about maintenance. |
| Examples note | Numbers in [brackets] are placeholders. Your pilot writes these from your own plant data. | Numbers in [brackets] are placeholders. In a pilot, these are written from your own plant's records. | Avoids implying a pilot already exists. |

### Process and control (`/solutions/process`)

| Block | Current | Proposed | Why |
| --- | --- | --- | --- |
| Home summary | Improve your control policies instead of only repeating your best runs, with better settings, control rules and restart routines recommended to your engineers. | Better settings, control rules and restart routines for each line, tried on a model first and recommended to your engineers. | Removes the "instead of" contrast shape and adds the model check. |
| Hero H1 | Run better than your best shift. | No change | General and strong. |
| Hero intro | Most process losses come from a setting that has slowly drifted, a restart night shift handles differently, or a line running faster than the next station can absorb. Stamped's process optimisation finds better settings, control rules and restart routines for each line and recommends them to your process engineer. | Most process losses come from a setting that has slowly drifted or a restart night shift handles differently. Stamped models each line from its own records, tries a better setting on that model first and recommends it to your process engineer, inside limits set beforehand. | Drops a triplet, uses the stamped.md method line and adds the authority line. |
| Method paragraph | ...builds a working model of it, a digital twin, so a new control rule is tried on the model before it is tried on parts. Learning-based control then searches for rules that hold the aim better than today's, and each result your team confirms makes the next recommendation better. | Stamped learns how each line behaves from its own history and builds a model of that line, so a new control rule is tried on the model before it is tried on parts. It searches for rules that hold the aim better than today's, and each result on your line makes the next recommendation better. | Removes "digital twin" and "learning-based control" from a first-touch page, per stamped.md. |
| Step 3 | Recommend, then check / Your engineer accepts, adjusts or turns it down, and the result is checked against your baseline. | Approve, then keep on / Your engineer sees the change and the record behind it and approves it first. Once it has proved itself, it keeps running inside limits set beforehand. | Brings in the approve and keep on loop and step 3 of the homepage ladder. Waits on D17/D20. |
| FAQ "how" | ...builds a digital twin of each line... mathematical models of the process, reinforcement learning and machine learning to test better control policies... | Stamped builds a model of each line from its own history, combining the physics of the process with what the line's past runs show, and tests better control rules on it before anything changes on the floor. It then recommends the improved setting, control rule or restart routine to your process engineer. | Plain method in one line, without method names. |
| FAQ "decides" | Q: Does Stamped change settings on the line by itself? A: No. Stamped recommends and your team decides. Your process engineer can accept a recommendation, adjust it or turn it down, and new control policies are tested on the digital twin first. | Q: Does Stamped change settings on the line by itself? A: Not before your engineer has approved it. A change is tried on a model of the line first, then your engineer sees it with the record behind it and approves it, adjusts it or comments. Once that kind of change has proved itself on your line, Stamped can keep running it, always inside limits set beforehand. Loads that must stay on stay with you. | Replaces the retired line and states the approved authority exactly. Waits on D17/D20. |
| Meta description | Run better than your best shift. Stamped tests better control policies on a digital twin of your line and recommends them to your process engineers. | Run better than your best shift. Stamped tries better settings and control rules on a model of your line and recommends them to your process engineers, inside limits set beforehand. | Same reason as the method paragraph. Keep the keyword "digital twin process control" in `keywords` only. |
| Examples and energy note | (restart, drifted aim, control rule, warm-up shots) | No change | Industry examples lower on the page are fine, and they cover two machines. |

### Quality and lot checks (`/solutions/quality`)

| Block | Current | Proposed | Why |
| --- | --- | --- | --- |
| Hero H1 | Catch the problem while the lot can still be saved. | No change | General, and matches "while the run can still be saved". |
| Hero intro | By the time a part fails inspection, the cause is usually hours or days old: a part that went in cold, a transfer that took too long, or a quench that started late. Stamped links process data to every lot and alerts the right person while the lot can still be saved. | By the time a part fails inspection, the cause is usually hours or days old, and the lot has already moved on. Stamped links process data to every lot and warns the right person while the lot can still be saved. | Takes heat-treat mechanics and a triplet out of the hero. Those examples stay lower down. |
| Method step "Watch" | Live where data is connected, such as ageing time, quench temperature and die temperature. | As each lot moves, where the data is connected, for example quench temperature or die temperature. | Drops the triplet and the bare "Live", which reads as product status. |
| Method step "Act" | An alert goes to the person who can save the lot, risky batches are flagged for the inspector, and the record is ready for the audit. | A warning goes to the person who can save the lot, and risky batches are flagged for the inspector with the record behind them. | Two items, not three. The audit point is already in the FAQ. |
| Examples | Ageing alert and quench alert (both heat treatment), inspector, quality head. | Replace "ageing-alert" with: "Live alert, for the cell lead / The last parts from die 4 are moving toward the size that fails, so hold the next billets until the die is checked." | Two samples on two machines (stamped.md), and less heat-treat weight. |
| New FAQ | (none) | Q: Does Stamped hold or release a lot on its own? A: Holding and releasing lots stays with your quality team. Stamped warns while the lot can still be saved and shows the record behind the warning. | Quality-hold release is a hard stop. This states it as ownership, not a "never" list. |
| Meta description | ...alerts your team in real time, before parts are rejected. | Catch the problem while the lot can still be saved. Stamped links process data to every lot and warns the right person while there is still time to act. | Uses the plainer verb and frees up the page's one "real time". |

### Planning and scheduling (`/solutions/planning`)

| Block | Current | Proposed | Why |
| --- | --- | --- | --- |
| Hero H1 | Re-plan with the whole plant in view. | No change | |
| Hero intro | Plans break in almost every shift, because a die change ran long, a furnace tripped or material arrived late. Stamped proposes the re-plan that works best for the whole plant, keeps machine utilisation up and idle time down, and shows what each option does to output, energy and delivery. | Plans break in almost every shift, because a changeover ran long or material arrived late. Stamped proposes the re-plan that works best for the whole plant and shows what each option does to output and delivery, with energy counted in both. | Takes the furnace out of the hero, uses general words and removes two stacked triplets. |
| Method paragraph, last sentence | Stamped recommends and your team decides. | Changes to dispatch order and promise dates stay with your planner. | Removes the retired line and states the hard stop as ownership. |
| FAQ "decides" | The planner. Stamped recommends and your team decides, so the planner chooses with the trade-offs of each option in front of them. | The planner. Stamped ranks the options with the trade-offs of each in front of them, and changes to dispatch order and promise dates stay with the planner. | Same reason as the method paragraph. |
| Examples and energy note | Furnace-heavy (three of four cards are heat treatment). | Replace "consolidate" with: "Changeover, for the planner / Run the two jobs on the same tooling back to back on Press 1 this shift, so the press changes over only once." | Adds a second machine. Energy is still counted. |

### Maintenance (`/solutions/maintenance`), Coming soon

| Block | Current | Proposed | Why |
| --- | --- | --- | --- |
| Hero tag (new) | (none) | **Coming soon** pill next to the H1, using the same component as the homepage row. | The page currently reads as live. |
| Hero H1 | Prescriptive maintenance, planned around production. | Maintenance, planned around production. | "Prescriptive" is jargon in a heading. Keep the word in meta and keywords. |
| Hero intro | The stop log shows where the hours go, but rarely which stops matter most or when to fix them. Stamped ranks stops by what they cost and prescribes the fix and the best window to make it, planned around production. | The stop log shows where the hours go, but rarely which stops matter most or when to fix them. We are building this next: Stamped will rank stops by what they cost and say what to fix and the best window to do it, planned around production. | Future tense, so nothing implies it exists. |
| Method heading | How Stamped plans the fix | How it will work | Honest status. |
| Method paragraph | Stamped watches specific energy consumption and machine signals... | Stamped will watch energy per unit and machine signals for the slow drift that usually comes before a failure, such as a furnace burning more gas per kilo on the same recipe. It will say what it sees and how sure it is, and what it cannot see, such as bearing wear on a machine with no vibration sensor. Authorising work and lockouts stays with your maintenance team. | Future tense, plainer wording and the hard stop as ownership. |
| Examples label | Example actions | Example actions, planned | Status clarity. The cards stay. |
| FAQ "predictive" | Yes, and it goes a step further... so maintenance protects operational continuity instead of interrupting production. | It is built to go a step further: Stamped will predict which machines are drifting toward a failure, then say what to fix and the best window for it, so maintenance fits around production. | Removes the "instead of" contrast and the jargon, and makes the status honest. |
| All FAQ answers | Present tense ("Stamped ranks...", "Stamped tells...") | Future tense ("will rank", "will tell") | Same honest-status reason. |
| Meta description | Prescriptive maintenance, planned around production. Stamped ranks stops by what they cost and prescribes the fix and the best window to make it. | Coming soon: prescriptive maintenance planned around production. Stamped will rank stops by what they cost and say what to fix and when. | Same honest-status reason. |

---

## Open decisions

1. **Agents option:** Option 1 (recommended), Option 2 or Option 3. Should Option 1 autoplay through the tabs, or stay still until clicked?
2. **Copy-guide amendment D17/D20:** the process step 3 and the "decides" FAQ depend on the amendment allowing the approve then keep-on authority. If it is not approved, fall back to the approve-first half only.
3. **Product-line SEO titles:** these are in `lib/seo/brand.ts` ("Stamped Process & Control", "Stamped Quality", "Stamped Production"). stamped.md says product names are still placeholders. Keep them, or drop them to "Process and control | Stamped" and so on?
4. **Maintenance page:** add the Coming soon tag and the future-tense copy (recommended), or `noindex` the page until it is built?
5. **New example cards:** the die-size example on quality and the shared-tooling changeover on planning are fine to add, or should the current heat-treat cards stay?
6. **Site-wide leftovers outside these pages:** `public/llms.txt`, `lib/seo/llms-index.ts` and `lib/content/engagement.ts`. Fold them into the same implementation PR?
