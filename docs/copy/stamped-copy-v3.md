# Stamped copy, v3 (final)

3 October 2026, revised at 18:15 IST (short version added 18:20 IST) with Vinayak's latest direction:
- the approved outcomes paragraphs replace the earlier version;
- no hard-stop or "never" lists in public copy;
- flowing prose instead of short choppy sentences and fragment lists.

Revised 3 Oct 2026, 22:30 IST: "machine learning and AI" is no longer a required phrase. How the technology is named depends on where the copy sits (section 1, "Describing the technology"), and the approved texts below now use the plainer default.

Rules for anyone editing this, including any AI: `STAMPED_COPY_GUIDE.md`. [Brackets] are placeholders; no number, customer or result is invented. Client work stays confidential.

---

## 1. Positioning

**Category line** (tagline, title tag, LinkedIn, decks): AI for plant operations.

**What we say we do:** Stamped builds models of a plant from the data it already records, finds where efficiency is lost across process, quality, planning and maintenance, and improves it with actions the plant team can take.

### Describing the technology

No method label is required anywhere. "Machine learning and AI" is what every vendor says, so it tells a plant head nothing about us. Say what the models do in this plant, and get more specific the more technical the reader is.

| Placement | How to describe it | Example |
|---|---|---|
| Hero, homepage summaries, pitches, FAQ | Plain words about what the models do, without naming methods | "builds models of your plant from the data it already records", "learns how your plant actually runs" |
| How it works, About | Say what the models are trained on and what they learn | "models trained on your plant's own history, so normal means normal for your machines, products and shifts" |
| Process page, /platform "Models", technical decks | Name the specific methods | "digital twins of your lines, mathematical models of the process, reinforcement learning and machine learning to test and improve control policies" |
| Quality, Maintenance pages | Name the technique when it says what we do | "real-time alarms", "prescriptive maintenance", "specific energy consumption" |
| Category line, title tag, SEO metadata | "AI" is fine here because buyers and search engines file us under it | "AI for plant operations" |

Avoid "machine learning and AI" as a stock phrase, and avoid "AI-powered", "cutting-edge", "advanced analytics" and other words any competitor could use. If a sentence still reads the same after removing the method name, remove it.

## 2. Hero

### Options (recommendation first)

1. **From monitoring your plant to improving it.** *(recommended)* This is Vinayak's own line from LinkedIn. It sets Stamped against the dashboards most plants already have and leads naturally into a subhead that ends on "improves it".
2. **AI for plant operations.** Clear and short, though it names a category rather than a change in the plant, so it does more work as the eyebrow and tagline than as the hero.
3. **Turn plant data into action.** The current hero still reads well, and it stays on the page as the heading of the "What Stamped does" section.
4. **Run a more efficient plant, every shift.** The most direct way of saying "operational efficiency", although it is also the least distinctive of the four.

### Recommended placement

| Line | Where it goes |
|---|---|
| **From monitoring your plant to improving it.** | Homepage H1 |
| **AI for industrial plants** | Homepage hero eyebrow above the H1 (3 Oct 2026: broad on purpose, no sector or country) |
| **AI for plant operations.** | Title tag, LinkedIn tagline, email signature, footer |
| **Turn plant data into action.** | Heading of the "What Stamped does" section and the final call-to-action band |
| **From plant data to operator actions.** | How-it-works heading on the homepage and /platform |

### Subhead

> Stamped builds models of your plant from the data it already records, finds where efficiency is lost across process, quality, planning and maintenance, and improves it with actions your team can take.

## 3. What we achieve and how (approved text)

Approved by Vinayak on 3 Oct 2026, in two lengths. Use each word for word.

### Short version

Use it where space is tight, such as the homepage "What Stamped does" section, pitch decks and one-pagers.

> Stamped helps manufacturing plants run more efficiently, with fewer rejections, more output from the lines you already have, and less energy and material in every good part. Most plants already record the data that explains where efficiency is lost, but it sits in separate systems that rarely get looked at together. Stamped brings it into one view and builds a model of how your plant actually runs to find those losses, then turns them into specific actions for the person who can fix them, whether that's a setting that has drifted or a batch that looks like last month's rejections.
>
> Stamped recommends and your team decides. Once a change is made, we check it against your own baseline, so you can see what actually worked and catch it early if a gain starts to slip.

### Long version

Use it on the About page, the How it works page (/platform) and in longer written pitches.

> Stamped helps manufacturing plants run more efficiently: fewer rejections, more output from the lines and shifts you already have, and less energy and material going into every good part. We measure all of it against your own plant's baseline, in the units your team already tracks, so nobody has to take our word for it.
>
> Most plants already record far more than they use. The machines, control systems, meters, ERP and quality registers each hold a piece of the picture, but they sit in separate places and rarely get looked at together. Stamped brings that data into one view and models it to understand how your plant actually runs and where efficiency is quietly being lost.
>
> Stamped then turns that understanding into specific actions and sends each one to the person who can act on it, whether it is a setting that has drifted over a few weeks, a batch that looks like last month's rejections, or a plan that needs to change because a machine went down mid-shift. Stamped recommends and your team decides. Once a change is made, we check whether it worked, and if a gain starts slipping later, it goes back to the person who owns it.

*(3 Oct 2026: trimmed from four paragraphs to three.)*

## 4. How it works

**Heading:** From plant data to operator actions.

> Stamped connects to the systems your plant already runs, so there is nothing new to install before we start. Its models are trained on your plant's own history, so they learn what normal operation looks like in your plant and which conditions tend to come before a rejection, a stoppage or wasted energy.
>
> When something is worth acting on, Stamped sends it to the person best placed to act, ranked by what it is costing you and explained well enough that they can judge it for themselves. Once your team has made a change, Stamped checks the result against your own baseline and uses what it learns to make the next recommendation better.

**Line under the section:** Stamped recommends and your team decides.

**Diagram note** (labels only, never in body copy): a left-to-right diagram with four nodes labelled "Plant data", "Models", "Actions" and "Results", and a return arrow from "Results" to "Models" labelled "Team feedback". Short labels are fine inside the diagram. Written copy always uses the prose above.

**/platform loop section** (3 Oct 2026): heading "From plant data to a checked result, and back again." The two paragraphs above are split across four numbered step cards (one sentence each) plus a "Team feedback" path from Results back to Models. Source: `platformContent.flow` in `lib/content/platform.ts`.

## 5. What Stamped improves

> **v3.1 area framing (3 Oct 2026, ADR-038).** The headings and paragraphs below are the original v3 record. The live text is in `lib/content/solutions.ts`, and it changes these points:
> - **Process:** "Run better than your best shift." Stamped improves control policies, not just repeating the best run. It tests them on a digital twin of each line using mathematical models of the process, reinforcement learning and machine learning, and names those methods on the Process page and /platform only.
> - **Quality:** "Catch the problem while the lot can still be saved." Process data is linked to every lot, and real-time alerts are added where live data is connected, for example ageing running over or quench water out of band.
> - **Planning:** "Re-plan with the whole plant in view." Re-plans account for the live state of the whole plant: machines, furnace loads, material, dispatch and maintenance windows.
> - **Maintenance:** "Prescriptive maintenance, planned around production." It ranks stops by cost, watches specific energy consumption for drift, and prescribes the fix and the best window given production constraints.

Each area has a short statement heading, a paragraph and a few example action cards. The cards follow the current site's instruction style, written as complete sentences. Their numbers are placeholders, and they should be labelled "Example" on the site.

### Process and control
**Run every shift like your best one.**

Most process losses come from a setting that has slowly drifted, a restart that night shift handles differently from day shift, or a line running faster than the next station can absorb, far more often than from a broken machine. Stamped learns what your best runs looked like and what tends to go wrong before a poor one, then recommends a specific change to your process engineer, who can accept it, adjust it or turn it down.

- **Restart, for the shift lead:** Keep the heater warm during stops shorter than [N] minutes, starting from A shift, because last month's restarts sent [N] parts out of window.
- **Control, for the process engineer:** The heater aim has drifted by about [N]°C over [N] weeks, so a new aim with a small drift correction is ready for review before a step test.
- **Best run, for the plant head:** Line [2] had its best week in [month], and today's settings differ from that week on [N] parameters, which are listed in the comparison.

### Quality and lot checks
**Know which batch is at risk before it becomes a rejection.**

By the time a part fails inspection, the cause is usually hours or days old: a part that went in cold, a transfer that took too long, or a quench that started late. Stamped links process data to each lot and batch, learns which conditions came before past rejections, and flags any batch made under similar conditions while it is still in the plant, so the inspector can decide what to do with it.

- **For the inspector:** Bin [14] was made after a [9]-minute stop with the die below temperature, and bins made that way were rejected more often last quarter, so it is worth checking before it moves on.
- **For the heat-treatment lead:** Basket [B-07] reached ageing [N] minutes after quench against a written limit of [N], and its full record is attached for the audit file.
- **For the quality head:** Here is every process record for lot [N], gathered in one place for the 8D on the customer complaint that came in this morning.

Where a check is against a written limit, the card gives a clear yes or no, and where it is a prediction, the card shows how confident the model is.

### Planning and scheduling
**When the plan breaks, have the next one ready.**

Plans break in almost every shift, whether because a die change ran long, a furnace tripped or material arrived late. Stamped proposes the next sequence and shows what each option would do to output, energy and delivery, so the planner can choose with the trade-offs in front of them.

- **For the planner:** Press [3] will be down for about [N] hours, and the proposed re-plan keeps [N] of today's [N] dispatches on time if it is confirmed by [time].
- **For the heat-treatment lead:** Running these [N] lots back to back by temperature would save the furnace from heating up and cooling down between them.

### Maintenance
**Fix what costs you the most, before it stops the line.**

The stop log already shows where the hours go, but it rarely says which stops matter most. Stamped ranks them by the output and time they cost, and it picks up the slow drift that usually comes before a failure, such as a furnace burning more gas for the same load or a compressor running a little longer every week. It tells maintenance what it is seeing and how sure it is, and is equally open about what it cannot see, for example bearing wear on a machine that has no vibration sensor.

- **For the maintenance lead:** Press [2] lost [N] hours last month to [stop reason], which makes it the biggest single loss on the line.
- **For the maintenance lead:** Gas per kilo on Furnace [1] has crept up by [N]% on the same recipe over [N] weeks, so the burners and door seals are worth checking.
- **For the setter:** The repeating micro-stop on [machine] looks like a clamping issue, and the card can be closed once the machine runs cleanly.

### Energy
**Energy follows every operating decision.**

A reheat or an hour of a furnace sitting hot and empty uses energy that never ends up in a good part. Because most of the saving comes from running the plant better, Stamped counts energy inside every action described above and measures it against your own baseline, with tariff windows and demand peaks treated as one input among many.

- **For the shift lead:** Furnace [2] has been idle and hot for [N] hours with the next load due at [time], so it can be set back now.
- **For maintenance:** The air leak on Line B is worth inspecting now, and the card closes once the feeder draw drops.

## 6. Pitches

### 30 seconds
> "Most plants record far more data than they ever use, and it sits in separate systems that nobody looks at together. Stamped brings it into one place, learns how the plant actually runs and finds where efficiency is being lost, whether that's in the process, in quality, in planning or in maintenance. Then it sends a specific action to the person who can fix it and checks afterwards whether it worked. Stamped recommends and your team decides, and there's nothing new to install to get started. We usually begin with a few days on your floor."

### 2 minutes
> "Manufacturing is a hard industry to build software for, because every plant runs a little differently and getting something wrong on the floor has a real cost. So most plants end up with plenty of data and surprisingly few decisions that actually come out of it.
>
> Say rejections went up last week. The dashboard will tell you that much, but it won't tell you whether it was the restarts on night shift, a die that was running cold, or a batch that waited too long before heat treatment, and working that out is the part that takes people days.
>
> That's the gap Stamped fills. We connect to the systems you already run and build models from your own plant's history to learn how it actually behaves, including what tends to change in the hours before a loss shows up. When we find something worth acting on, it goes to the person who can act on it, with what to do, by when and why. That could mean keeping a heater warm during short stops, correcting a set point that has drifted, checking a batch that looks like last month's rejections, or re-planning the day after a press goes down.
>
> Stamped recommends and your team decides. After a change is made, we measure the result in your own units against your own baseline, and that answer goes into the next recommendation.
>
> We start with a site survey, which is a few days on your floor followed by a written read-out of where you're losing efficiency and what we would do first. If it makes sense, that leads to a paid pilot on one line for eight to twelve weeks, with the success criteria and the annual price agreed in writing before we begin, and the first finding usually comes within about two weeks. Right now we're working with auto-component makers, starting with forging, heat treatment and machining."

## 7. About

> Stamped was started by Vinayak Raizada and Utso Sarkar, engineers from IIT Roorkee. We began by working on energy in Indian plants, and the more time we spent on plant floors, the clearer it became that energy was only one symptom of a bigger problem: plants have the data they need to run better, but very little help turning it into decisions. That is what we build now. We know that being wrong in a factory has a real cost, and we try to work with that in mind.

*(3 Oct 2026: a three-paragraph rewrite was tried and reverted at the founder's request. The About hero is a light surface with label, headline, intro and a wide photo strip.)*

Optional line for the About page, for people searching the old name: "Stamped was called Stamped Energy until 2026." (Vinayak to confirm.)

## 8. Short lines

- **Title tag:** Stamped | AI for plant operations
- **Meta description (also the share text):** Stamped is AI for industrial plants. It models your plant from the data it already records and improves process, quality, planning and maintenance.
- **Share image (`public/og-default.png`):** logo, eyebrow "AI for industrial plants", the hero headline, the four areas and two example actions, with "Stamped recommends and your team decides."
- **LinkedIn tagline:** AI for plant operations. From monitoring your plant to improving it.
- **Email signature:** Stamped, AI for plant operations, stamped.work
- **Primary call to action:** Book a site survey

---

## 9. Full homepage, top to bottom

**Title tag:** Stamped | AI for plant operations
**Meta description (also the share text):** Stamped is AI for industrial plants. It models your plant from the data it already records and improves process, quality, planning and maintenance.
**Nav:** What we improve · How it works · Industries · Resources · About · Contact · **[Book a site survey]**

---

**Eyebrow:** AI for industrial plants

# From monitoring your plant to improving it.

Stamped builds models of your plant from the data it already records, finds where efficiency is lost across process, quality, planning and maintenance, and improves it with actions your team can take.

**[Book a site survey »]**   See how it works

*Every action says who should act, by when, and why.*

**Action card ticker** (labelled "Example actions"):
- **For the inspector:** Bin [14] was made after a [9]-minute stop, and similar bins were rejected more often, so check it before heat treatment.
- **For the shift lead:** Keep the heater warm during stops shorter than [N] minutes, starting from A shift.
- **For the setter:** The repeating micro-stop looks like a clamping issue, so close the card once the machine runs cleanly.
- **For the heat-treatment lead:** The mill is running 40 minutes late, so hold the furnace and set it back once production confirms.
- **For the process engineer:** The heater aim has drifted, and a new aim is ready for your review.
- **For the planner:** Press [3] is down for about [N] hours, and a re-plan is ready for review by [time].
- **For maintenance:** The air leak on Line B is worth inspecting now, and the card closes once the feeder draw drops.

---

**Eyebrow:** Problem

## Every plant has data. Very few turn it into action.

### Data is abundant. Clear priorities are not.
The signals are already sitting in your machines, control systems, meters and registers, but turning them into a clear next action takes more time than anyone on the floor has.

### Dashboards tell you what happened.
When rejections go up, the dashboard shows the number, but it rarely tells you whether the cause was the night-shift restarts, a die running cold or a batch that waited too long for heat treatment, and working that out is the hard part.

### The loss shows up after the decision.
Choices like running harder, delaying maintenance or changing the sequence all affect output, quality and cost, yet the rejection, the breakdown or the extra energy tends to surface days later, when it is too late to rethink the call.

---

**Eyebrow:** What Stamped does

## Turn plant data into action.

Stamped helps manufacturing plants run more efficiently, with fewer rejections, more output from the lines you already have, and less energy and material in every good part. Most plants already record the data that explains where efficiency is lost, but it sits in separate systems that rarely get looked at together. Stamped brings it into one view and builds a model of how your plant actually runs to find those losses, then turns them into specific actions for the person who can fix them, whether that's a setting that has drifted or a batch that looks like last month's rejections.

Stamped recommends and your team decides. Once a change is made, we check it against your own baseline, so you can see what actually worked and catch it early if a gain starts to slip.

---

**Eyebrow:** How it works

## From plant data to operator actions.

*[Diagram: Plant data → Models → Actions → Results, with a feedback arrow labelled "Team feedback"]*

Stamped connects to the systems your plant already runs, so there is nothing new to install before we start. Its models are trained on your plant's own history, so they learn what normal operation looks like in your plant and which conditions tend to come before a rejection, a stoppage or wasted energy.

When something is worth acting on, Stamped sends it to the person best placed to act, on WhatsApp or on screen, ranked by what it is costing you and explained well enough that they can judge it for themselves. Once your team has made a change, Stamped checks the result against your own baseline and uses what it learns to make the next recommendation better.

---

**Eyebrow:** Impact

## What changes in the plant.

- **Fewer rejections reach the customer,** because batches at risk are flagged while they are still in the plant.
- **More output from the same lines,** with restarts, pacing and settings brought closer to your best runs.
- **Fewer surprise breakdowns,** since slow drift shows up in data you already collect.
- **Less energy for every good part,** once idle heat, reheats and scrap are counted and brought down.

The first finding usually comes within about two weeks. Results are measured against your own baseline and published only with your permission. [PLACEHOLDER: first permitted plant result, stated in units with dates]

---

**Eyebrow:** What we improve

## Across the plant, not one machine.

**Process and control.** Run every shift like your best one, with settings, control rules, restart routines and pacing recommended to your engineers. Learn more »

**Quality and lot checks.** Know which batch is at risk before it becomes a rejection, and have each lot's record ready when the auditor or the customer asks. Learn more »

**Planning and scheduling.** When the plan breaks, have the next one ready, along with what each option would do to output and delivery. Learn more »

**Maintenance.** Find out which stops cost you the most and fix them before they halt the line. Learn more »

Energy is counted in all four.

---

**Eyebrow:** Industries

## Different plants, the same four places to improve.

A forge, a melt shop and a kiln look nothing alike, but each one loses efficiency in process, quality, planning and maintenance. Stamped learns the signals that matter in each plant from its own history.

- **Auto components:** forging, heat treatment and machining: rejections, audits and on-time delivery.
- **Steel:** power per tonne, heat chemistry, yield and cobbles.
- **Cement:** kiln stability, free lime, and heat and power per tonne.

The same four areas apply in: Pharma · Chemicals

See all industries »

*(Revised 3 Oct 2026, ADR-039: the section is no longer auto-first.)*

---

**Eyebrow:** Resources

## Notes from the plant floor.

[Three latest posts]

---

**Eyebrow:** FAQ

## Questions plant leaders ask

**What does Stamped do?**
Stamped connects to the systems already in your plant, learns how your plant actually runs, finds where efficiency is lost across process, quality, planning and maintenance, and sends ranked actions to the people who can act on them, then checks the results against your own baseline.

**Do we need new hardware?**
No hardware retrofit is needed to get started, because Stamped is software that works with the systems you already run.

**Who decides what changes?**
Stamped recommends and your team decides.

**We already have MES, ERP and SCADA.**
That's good, because that is where the data comes from. Stamped is not another MES or CMMS, and it works alongside what you already run.

**Where does our data go?**
[CONFIRM: hosted in India, with an on-site option that runs without internet.] We sign an NDA before the site survey.

**How do actions reach the floor?**
They go on WhatsApp or on screen to the supervisors, engineers and maintenance staff who can act on them, so they don't sit on a screen that only the plant head opens once a month.

**How do we start?**
We start with a site survey, which means a few days on your floor and a written read-out. If it makes sense, that is followed by a paid pilot on one line for eight to twelve weeks, with the success criteria and the annual price agreed in writing first.

---

## Turn plant data into action.

Spend a few days with us on your floor, and we'll give you a written read-out of where efficiency is being lost and what we would do first.

**[Book a site survey »]**   WhatsApp us   [Phone]

**Footer:** Stamped · AI for plant operations · What we improve · How it works · Industries · Resources · About · Contact · [hello@stamped.work] · © 2026 Stamped. All rights reserved.
