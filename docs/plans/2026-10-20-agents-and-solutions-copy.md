# Agents picker and "What we improve" pages: plan, revision 2

**Date:** 20 October 2026, revised 10:26 PM IST. **Status:** plan only. Nothing here is implemented.

**Branch:** `plan/agents-and-solutions-copy`, stacked on `feat/homepage-realignment` (PR #17).

**Vinayak's decisions (20 Oct, 10:21 PM):**
- The agent picker is chosen. It autoplays and stops for good once the visitor clicks.
- The copy guide may allow autonomous claims.
- Page titles use plain area names.
- Maintenance shows Coming soon.
- Find better examples than die-size and changeover.
- The llms.txt, llms-index and engagement leftovers are fixed in the implementation PR.
- Show agent capabilities much more richly, on the homepage and on every solution page.

**Inputs, and which wins:**
- **Stamped Research** (`/workspace/stamped-research/reports/2026-10-20-capabilities-for-website.md`): 48 capabilities, with their build status and claim rules. **Research's statuses and claim rules win.**
- **Positioning & Marketing** (`/workspace/stamped-website/inputs/2026-10-20-pm-capabilities-reply.md`): the area tabs, a sample finding card per tab, grouping by the three steps, page headlines, action lists and presentation advice.
- **write-like-vinayak** SKILL.md and stamped.md: voice and the sample-finding shape. The eyebrow stays **Industrial AI**, Vinayak's choice over P&M's kicker.

## 0. Rules this plan follows

1. **Status tags.**
   - Every capability shown on the site carries one tag: **First pilot scope** or **Planned**.
   - **First pilot scope** goes only on what Research maps to it. Those items are BUILT or PARTIAL, apart from the lot replay, which Research maps there as an offline prototype (see Q2): C01, C03, C04, C06, C09, C10, C11, C23 and C31.
   - Everything else is **Planned**. That includes items that are BUILT or PARTIAL but that Research tags as Planned.
2. **Hidden capabilities.** Five capabilities never appear: C22 (tariff timing), C30 (learned policies), C38 (model registry), C39 (release checks) and C42 (security). C33 (feedback capture, status unclear) is also left out. Foundation capabilities do not get their own tile. They appear inside the area that uses them.
3. **Autonomous wording is for Process only.**
   - Every autonomous line carries "inside limits set beforehand".
   - Approved facts, used only on Process:
     - the plant head signs the limits;
     - Stamped can narrow a limit and never widen one;
     - a safety filter checks every change and fails closed;
     - Stop restores the previous settings;
     - every write is logged and read back.
   - These are written as how it works and tagged **Planned**, because the writer is only proven in a simulator and the safety filter is not built yet.
   - Quality, Planning and Maintenance stay recommend-only.
   - The following stay with people, written as ownership lines rather than a "never" list: quality holds and release, maintenance authorisation and lockouts, promise dates, customer priority, routing and dispatch order.
4. **Still banned:**
   - widening limits, or Stamped setting its own limits;
   - safety or protected-system control, and any mention of PLC logic;
   - live or pilot status;
   - savings figures, percentages, rupee figures, guarantees or competitor results;
   - WhatsApp approvals;
   - client names, logos or quotes;
   - pricing;
   - an offline mode;
   - energy-only or tariff-led framing;
   - the words unlock, superpower, transform, platform (as the pitch), innovation, empower and seamless;
   - "replaces engineers", "acts silently";
   - digital twin and reinforcement learning in first-touch copy;
   - em dashes.
5. **Mock UI.** Every mock card is captioned **"Sample finding, illustrative. Written from the kind of records a plant already keeps."** None of it contains figures. Each tab and each page uses a different machine.
6. **Voice.** British spelling. No contrast lines. No default triplets, except the three steps themselves. Headings stay general, and sector names appear only in the body.

---

# Proposed changes

## 1. Homepage: agents picker by area

### Chosen design and why

The picker combines P&M's area tabs with Research's capability list. There are four tabs: **Process**, **Quality**, **Planning** and **Maintenance** (the last tagged Coming soon). Each tab shows:

- (a) that area's agent capabilities, grouped under **Monitoring**, **Decision making** and **Autonomous execution** (the third group appears only under Process), with a status tag on every item;
- (b) one sample finding card, using a different machine in each tab.

The five first-pilot agents from PR #17 are not lost. They appear as the **First pilot scope** items inside the tabs: records and sensors in every tab, the warning in Process and Quality, and the lot replay and reject cost in Quality.

**Why this design:**
- **More impressive.** It shows about 20 plain jobs across the plant instead of five, so the reader keeps thinking "it can do this too". It also mirrors the "What we improve" rows directly above, and repeats the three steps from the ladder.
- **Honest.** The tags tell the reader exactly what a first pilot covers and what is still planned. Autonomous wording appears only under Process, next to its limits.
- **Safer than a five-agent picker or a feed.** A picker of only five agents undersells the product. A feed implies live status.

### Layout

**Desktop (lg and up):**
- Header row:
  - Left: the badge and H2.
  - Right: the intro and the tag legend.
- Under the header, the tabs run in one row with a progress underline. Under the tabs is the tab panel, in two columns:
  - Left, 7 of 12 columns: the three step groups, each with a mono label (MONITORING, DECISION MAKING, AUTONOMOUS EXECUTION) and a list of items. Each item is a bold job name, one line of plain description, and a status pill.
  - Right, 5 of 12 columns: the sample finding card, sticky within the panel. Its colour comes from the motion palette, one per tab: Process forest, Quality acid, Planning primary-tint, Maintenance wine (the same as the What we improve rows).

**Mobile:**
- The tabs become a horizontally scrollable pill row.
- In the panel, the sample card comes first, then the groups.
- Each group is a disclosure that starts open for Monitoring and closed for the others.

**Without JS:** every panel is in the markup. The tabs are anchor links, and the panels stack.

### Motion (GSAP)

- **First view (ScrollTrigger at "top 70%"):**
  - The tabs fade up.
  - Process panel items stagger in by group.
  - The sample card builds: headline, tag, then the three blocks top to bottom, with the buttons landing last.
- **Autoplay:**
  - Starts once the section is in view, and pauses when it leaves.
  - Moves to the next tab after about 7 s. The progress underline fills across the active tab to show the timer.
  - **Stops for good on the first click, tap, or keyboard focus on a tab** (in line with Vinayak's call).
- **Tab change:** the panel cross-fades (opacity and y 12 px, 0.35 s). Items re-stagger, and the card rebuilds.
- **Reduced motion:** no autoplay, the Process tab selected, instant swaps.
- **Accessibility:**
  - `role="tablist"`, with arrow keys, Home and End.
  - `aria-selected` on the active tab.
  - Autoplay announces nothing, and focus never moves on its own.

### Copy (verbatim)

- Badge: **Agents**
- H2: **Agents for every part of the plant.**
- Intro: **Each agent does one job, from the records your plant already keeps. Pick an area to see what the agents watch and what they recommend. In process, a change that has proved itself keeps running on its own, inside limits set beforehand.**
- Tag legend: **First pilot scope: what a first pilot covers.** · **Planned: being built, not in a first pilot.**
- Tabs: **Process** · **Quality** · **Planning** · **Maintenance** (with a "Coming soon" pill)

#### Tab: Process

**Monitoring**
- **Warns when a run drifts.** A single signal starting to drift or jump is flagged while there is still time to act. *First pilot scope* (C11)
- **Checks the sensors first.** A reading that is stuck, flat or out of range is flagged before anyone trusts it. *First pilot scope* (C03)
- **Sees what the sensors cannot.** It estimates hidden states, such as the temperature inside a load or fouling on a heat exchanger. *Planned* (C14)

**Decision making**
- **Finds what your best runs did differently.** It compares the settings of your best runs, so the next one can repeat them. *Planned* (C17)
- **Tries the next setting on a model first.** A better setting for each part or product is tested on a model of that line before the line sees it. *Planned* (C15, C26)
- **Runs a fair trial.** Current and proposed settings alternate on matched batches, so the effect is measured, not guessed. *Planned* (C27, C37)

**Autonomous execution**
- **Keeps a proven change running.** Once a change has proved itself on your line, Stamped keeps running it on its own, inside limits set beforehand. *Planned* (C35)
- **Loads the settings that suit the product.** When the next grade comes up, it loads the settings from that grade's last good run, inside the limits set for the line. *Planned* (C28, C34)
- **Stops when you say stop.** Press Stop and the line goes back to its previous settings. Every write is logged and read back from the controller. *Planned* (C34, C43, C48)

**Sample card: reactor, falling behind its best runs**
- Headline: **This batch should be at temperature by now. The jacket is still heating at the slow rate.**
- Tag: **Process · A batch falling behind its best runs**
- Finding: **The best runs of this grade heated up faster. This batch is already behind them, and it is still in the reactor.**
- What we found: **Heat-up on this batch is slower than your best runs of the same grade.**
- The opportunity: **If it stays this slow, the batch runs long and holds up the next one.**
- How we capture it: **You approve. The agent raises the jacket setpoint within the band your plant head signed. A batch that must follow its written recipe stays with you.**
- Buttons (inert): **Evidence** · **Approve** · **Comment**
- Caption: **Sample finding, illustrative. Written from the kind of records a plant already keeps.**

#### Tab: Quality

**Monitoring**
- **Warns while the batch can still be saved.** A batch drifting toward the conditions seen before past rejections is flagged to the person who can act. *First pilot scope* (C11, C31)
- **Reads the records you keep on paper.** Lab sheets, batch cards and logbooks become one searchable record for every lot. *First pilot scope* (C01, C09)
- **Checks the sensors first.** A thermocouple or probe that has gone flat is flagged before it misleads anyone. *First pilot scope* (C03)
- **Estimates the lab result before the lab.** A property such as viscosity or hardness is estimated between lab tests and marked as estimated. *Planned* (C13, C23)

**Decision making**
- **Replays your worst lot.** A rejected lot is traced back through every machine and setting it passed, with the record behind each link. *First pilot scope* (C06, C18)
- **Counts what a reject really cost.** The energy and material in parts that never ship sit next to your rejections. *First pilot scope* (C10)
- **Spots the next lot at risk.** When another lot runs under the same conditions as a failed one, your team hears before it reaches the customer. *Planned* (C06, C12)
- **Puts one thing first this shift.** Findings are ranked, so the team sees the most useful action. *Planned* (C24)

Ownership line under the groups: **Holding and releasing lots stays with your quality team.**

**Sample card: fermentation, heading for an out-of-spec lot**
- Headline: **This batch is following the trend of past out-of-spec lots. It has not reached the next stage yet.**
- Tag: **Quality · A batch heading for rejection**
- Finding: **Dissolved oxygen on this batch is moving the way it did before past out-of-spec lots.**
- What we found: **The dissolved oxygen trend matches the lots that failed later, and this batch is still in the vessel.**
- The opportunity: **Checked now, it can still be corrected before the next stage, and the material and energy already in it are kept.**
- How we capture it: **The shift lead gets the warning with the trend behind it. Holding or releasing the batch stays with your quality team.**
- Buttons (inert): **Evidence** · **Comment**
- Caption: as above.

#### Tab: Planning

**Monitoring**
- **Knows what each line is really doing.** Running, stopped, changeover and restart periods are read from the records the line already writes. *Planned* (C07)
- **Warns when the plan is about to slip.** When a machine runs slower than the plan assumes, the planner hears while the shift can still be saved. *Planned* (C07, C16)

**Decision making**
- **Re-plans after a stop.** When a line goes down, a workable sequence for the rest of the shift is ready for your planner to accept. *Planned* (C25)
- **Groups similar work.** Jobs that share a recipe, a temperature or a clean-down are put back to back, so less time goes to warm-ups and wash-downs. *Planned* (C25, C19)
- **Writes the shift handover.** What changed this shift is written up for the next one. *Planned* (C32)
- **Answers where an order is.** A question such as "where is this order and when will it ship" is answered from your plant's records, with sources. *Planned* (C36)

Ownership line: **Promise dates, customer priority and dispatch order stay with your planner.**

**Sample card: food line, a wash-down it does not need**
- Headline: **These two batches are both allergen-free. The plan puts a full wash-down between them.**
- Tag: **Planning · Cleaning time the line does not need**
- Finding: **A batch that needs a wash-down after it sits between two allergen-free batches.**
- What we found: **Run back to back, the two allergen-free batches need no wash-down between them.**
- The opportunity: **The line skips one full wash-down this shift and gets that time back for production.**
- How we capture it: **Your planner sees the new order and accepts it. Promise dates and customer priority stay with your planner.**
- Buttons (inert): **Evidence** · **Accept** · **Comment**
- Caption: as above.

#### Tab: Maintenance (Coming soon)

Tab note: **We are building this next.**

**Monitoring**
- **Checks the sensors first.** A sensor that has gone dead or stuck is flagged before its reading is acted on. *First pilot scope* (C03)
- **Notices a machine starting to strain.** Motor current, run time or power creeping up under the same load is flagged early. *Planned* (C21)
- **Sees energy rising for no good reason.** Gas or power per good unit is compared fairly as output and mix change, so a rise that points to wear stands out. *Planned* (C10, C07)

**Decision making**
- **Ranks the stops that cost most.** Stops are ranked by the output they cost, so the first fix is the one that matters. *Planned* (C19)
- **Plans the fix around production.** The repair is suggested for the window that moves the least work. *Planned* (C19, C25)

Ownership line: **Authorising the work stays with your maintenance team.**

**Sample card: agitator motor, starting to strain**
- Headline: **This motor is drawing more current under the same load. The next batch gap is tomorrow morning.**
- Tag: **Maintenance · A motor starting to strain**
- Finding: **Agitator motor current has climbed week on week while the load stayed the same.**
- What we found: **The motor is working harder for the same job.**
- The opportunity: **Inspected in the next batch gap, the fix moves no batch. Left until it trips, it stops the line mid-batch.**
- How we capture it: **Your maintenance team gets the warning and the best window for it. Authorising the work stays with them.**
- Buttons (inert): **Evidence** · **Comment**
- Caption: as above.

### Small change to the three-step ladder (PR #17)

Under Research's rules, autonomous wording applies to process only, so step 3 should say so.

- Current: "Once a kind of change has already worked on your line, Stamped can run it on its own, always inside limits set beforehand."
- Proposed: **"Once a change to a process setting has already worked on your line, Stamped can run it on its own, always inside limits set beforehand."**

### Components and files

- `components/sections/HomeAgents.tsx`: rewritten as a client component. It contains the tablist, the autoplay controller (a GSAP timeline with a progress tween, killed on the first interaction) and the panels.
- New `components/agents/CapabilityGroups.tsx`: groups, items and status pills. It is shared with the solution pages.
- New `components/agents/SampleFindingCard.tsx`: headline, tag, finding, three blocks, inert buttons and caption. It is shared with the solution pages and takes a palette prop.
- `components/motion-slots/ladder.css`: the palette classes move into a shared `stamped-palette.css`.
- New `lib/content/capabilities.ts`: one typed list of the capabilities used, each with an `id` (the C number), `area[]`, `step` ("monitoring", "decision" or "autonomous"), `name`, `line` and `status` ("first-pilot" or "planned"). There is also a test-time check that `autonomous` appears only on `process`.
- New `lib/content/sampleFindings.ts`: one sample card per area.
- `lib/content/landing.ts`: the `agents` block slims down to badge, title, intro, legend and an autoplay interval. The flag stays.

---

## 2. Solution pages

Every page keeps its structure:
- hero
- example actions
- method
- energy note
- FAQ

Two blocks are added under the hero:

- **"What Stamped's agents do here"**: the same `CapabilityGroups` as the homepage tab, filtered to that area, plus the area's sample finding card. On the solution page the card uses a **different machine** from the homepage tab, so the two never repeat.
- **The four-step strip, once per page**, as P&M advised. It is the full loop on Process (find loss, simulate, approve, keep on). Other pages get a recommend-only loop (see each page).

### Shared changes

| Block | Current | Proposed | Why |
| --- | --- | --- | --- |
| Meta titles (`lib/seo/brand.ts`, `pages.ts`) | "Stamped Process & Control \| Optimisation \| Stamped", "Stamped Quality \| ...", "Stamped Production \| ...", "... \| Prescriptive maintenance \| Stamped" | **Process \| Industrial AI \| Stamped**, **Quality \| Industrial AI \| Stamped**, **Planning \| Industrial AI \| Stamped**, **Maintenance (Coming soon) \| Industrial AI \| Stamped** | Vinayak's decision: plain area names, no product names. |
| Examples label and note | "Example actions" / "Numbers in [brackets] are placeholders. Your pilot writes these from your own plant data." | **Example actions** / **Illustrative. Written from the kind of records a plant already keeps, with no real figures.** | No placeholders, and no implied pilot. |
| Hub description | Stamped learns how your plant runs ... with actions your team can take. | **Stamped models your processes and equipment from the data you already log, then its agents find the change that cuts the loss in process, quality and planning, inside limits set beforehand. Maintenance is coming next.** | Matches the homepage. |
| Hub H1 | Across the plant, not one machine. | **Agents for every part of the plant.** | The old line is a contrast shape. The new one matches the picker. |

### 2.1 Process (`/solutions/process`)

| Block | Current | Proposed | Why |
| --- | --- | --- | --- |
| H1 | Run better than your best shift. | **Run every process closer to its best.** | P&M headline. General, and covers all process types. |
| Intro | Most process losses come from a setting that has slowly drifted ... recommends them to your process engineer. | **Stamped learns how each machine in your process behaves from the data you already log and tries the next setting on a model before the line sees it. Once a change has proved itself, Stamped keeps it running on its own, inside limits your plant head signs.** | P&M intro, cut to two sentences, with autonomy stated alongside its limits. |
| New block, heading | none | **What Stamped's agents do here** | |
| New block, groups | none | Monitoring, Decision making and Autonomous execution, as in the homepage Process tab (all nine items and tags) | |
| New block, sample card | none | **Kiln, wrong settings for the next grade.** Headline: **Grade B is next on the kiln. The settings are still the ones for Grade A.** Tag: **Process · Settings left from the last grade.** Finding: **The last good run of Grade B used different settings, and the kiln has not been changed yet.** What we found: **The kiln is still set for the grade before.** The opportunity: **If Grade B starts on these settings, the first part of the run is out of spec.** How we capture it: **You approve once. After that, the agent loads Grade B's last good settings whenever it comes up, inside the limits set for this line.** Buttons: Evidence · Approve · Comment. Caption as standard. | A different machine from the homepage card (reactor), from Research example P3. |
| Method heading and steps | "How Stamped improves control": Learn the line / Try it on the model first / Recommend, then check | **How a change reaches your line**: **Find loss**: "A loss already happening, named in your plant's own words." **Simulate**: "The change is tried on a model of that machine, and the limit that would make it a bad change is checked." **Approve**: "Your engineer sees the change and the record behind it, and approves it before the machine is touched." **Keep on**: "Once it has proved itself, the agent runs it from then on, and it becomes part of how that line runs." | The stamped.md loop, once per page. |
| New block: limits | none | Heading **How far Stamped goes on its own**, tagged *Planned*. Body: **Your plant head signs the limits. Stamped can narrow a limit and never widen one. Every change is checked by a safety filter against the signed limits before it reaches the line, and if the check cannot run, nothing is written. Press Stop and the line goes back to its previous settings. Every write is logged and read back from the controller. Loads that must stay on stay with you.** | Research's approved autonomy facts, in one place. |
| Method paragraph | ...a digital twin... Learning-based control then searches... | **Stamped learns how each line behaves from its own history and builds a model of that line, combining the physics of the process with what past runs show. A new setting is tried on the model before it is tried on parts.** | No digital twin, no learning-based control. |
| Examples | Restart, heater aim drift [N]°C, heater rule, warm-up shots | (1) **For the process engineer:** "This reactor batch is running its heat-up slower than your best runs of the same grade. Raising the jacket setpoint within the agreed band brings it back on profile." (2) **Trial, for the process engineer:** "Next shift, alternate the barrel temperature between the current and proposed values on matched batches. If you stop the trial, the previous setting comes back." (3) **Restart, for the shift lead:** "The press has stopped, but the billet heater is still at full heat. A lower heat for the stop is ready, and the billets will still be hot enough when the press restarts." (4) **For the dyeing lead:** "Today's shade runs best with the dye bath held at the temperature your best runs used, and this batch is running above it." | Research examples P1 and P2, the stamped.md heater scene, and a textiles case. No placeholders, and four industries. |
| FAQ "how" | ...digital twin... reinforcement learning and machine learning... | **Stamped builds a model of each line from its own history, combining the physics of the process with what past runs show. A better setting, control rule or restart routine is tried on that model before it is recommended to your process engineer.** | Plain method. |
| FAQ "decides" | Q: Does Stamped change settings on the line by itself? A: No. Stamped recommends and your team decides... | Q: **Does Stamped change settings on the line by itself?** A: **Only after your engineer has approved that kind of change, and only inside limits your plant head signs. Stamped can narrow those limits and never widen them. Every change is checked against the limits before it reaches the line, Stop returns the line to its previous settings, and every write is logged. Loads that must stay on stay with you.** | Approved autonomy wording. Removes the leftover "your team decides". |
| Meta description | ...tests better control policies on a digital twin of your line... | **Run every process closer to its best. Stamped tries the next setting on a model of your line, and once a change has proved itself it keeps running inside limits set beforehand.** | Same reasons as the rows above. |

### 2.2 Quality (`/solutions/quality`)

| Block | Current | Proposed | Why |
| --- | --- | --- | --- |
| H1 | Catch the problem while the lot can still be saved. | **Catch the bad batch while it can still be saved.** | P&M. Matches stamped.md's "while the run can still be saved". |
| Intro | By the time a part fails inspection ... a quench that started late. Stamped links process data to every lot and alerts... | **Stamped watches every run against what good parts looked like and warns your team while the batch can still be fixed. When a reject does happen, it traces it back to its cause with the record behind it.** | Removes heat-treat mechanics and a triplet from the hero. |
| New block, groups | none | As in the homepage Quality tab (eight items and tags), plus the ownership line | |
| New block, sample card | none | **Coils, one raw-material lot.** Headline: **Last week's rejected coils came from one raw-material lot. Two more coils from that lot are still in the plant.** Tag: **Quality · Rejects with a shared cause.** Finding: **The rejected coils share one raw-material lot and one shift card note.** What we found: **Every rejected coil traces back to the same lot, and the links and their confidence are in the record.** The opportunity: **The coils from that lot still in the plant can be checked before they ship.** How we capture it: **The quality head gets the trace with the record behind it. Holding or releasing those coils stays with your quality team.** Buttons: Evidence · Comment. Caption as standard. | Research Q3. A different machine from the homepage card (fermenter). |
| Method strip | Link / Watch / Act | **Find loss**: "A batch drifting toward past rejections, or a reject already found." **Check**: "The batch is compared with the runs that passed, and the record behind it is gathered." **Warn**: "The person who can save the batch gets the warning and the evidence." **Learn**: "What your team found is fed back, so the next warning is sharper." | Recommend-only loop. No approve or keep on in quality. |
| Examples | Ageing basket, quench water, bin 14, quality head | (1) **Alert, for the shift lead:** "This fermentation batch is drifting towards the conditions seen before past out-of-spec lots. Check the dissolved oxygen trend before the next stage." (2) **For the lab:** "The estimated viscosity band for this lot is moving towards the upper limit. Estimated, not measured, so sample early." (3) **For the inspector:** "Check the castings from this morning's first hour: they were poured after a long stop, and castings made that way were rejected more often last quarter." (4) **For the quality head:** "Every process record for the lot in this morning's customer complaint is gathered in one place, ready for the 8D and the audit file." | Research Q1 and Q2, a foundry case, and the kept audit card. Three industries. |
| New FAQ | none | Q: **Does Stamped hold or release a lot on its own?** A: **Holding and releasing lots stays with your quality team. Stamped warns while the batch can still be saved and shows the record behind the warning.** | Ownership line for the hard stop. |
| FAQ "alerts" | ...ageing too long or the quench water has drifted... | **For example, a batch drifting toward the conditions seen before past rejections, or a sensor that has stopped moving. Where a check is against a written limit, the card gives a clear yes or no, and where it is a prediction, the card shows how confident the model is.** | Cross-industry. |
| Meta description | ...alerts your team in real time, before parts are rejected. | **Catch the bad batch while it can still be saved. Stamped watches every run against your good parts, warns your team in time and traces each reject to its cause.** | Matches the new H1 and intro. |

### 2.3 Planning (`/solutions/planning`)

| Block | Current | Proposed | Why |
| --- | --- | --- | --- |
| H1 | Re-plan with the whole plant in view. | **Plan around how your plant really runs.** | P&M. |
| Intro | Plans break in almost every shift, because a die change ran long, a furnace tripped or material arrived late. Stamped proposes ... output, energy and delivery. | **Plans break in almost every shift, because a changeover ran long or material arrived late. Stamped reads what each line is actually doing and warns your planner when the plan is about to slip, with a better order of work ready to accept.** | Removes the furnace and two triplets. Recommend-only. |
| New block, groups | none | As in the homepage Planning tab (six items, all *Planned*), plus the ownership line | See Q1. |
| New block, sample card | none | **Rubber line, a long cure on the wrong shift.** Headline: **The long-cure grade is on the day shift. Tomorrow night the line has room for it.** Tag: **Planning · A long job on the busiest shift.** Finding: **Tomorrow's forecast load leaves the night shift with spare time on the curing line.** What we found: **The long-cure grade ties up the line on the day shift, when the shorter jobs are waiting.** The opportunity: **Moved to the night shift, it runs while the line is quiet and the day shift clears the short jobs.** How we capture it: **Your planner sees the new order and accepts it. Promise dates and customer priority stay with your planner.** Buttons: Evidence · Accept · Comment. Caption as standard. | Research Pl3. A different machine from the homepage card (food line). |
| Method paragraph, last sentence | Stamped recommends and your team decides. | **Changes to dispatch order and promise dates stay with your planner.** | Removes the leftover. |
| Method steps | Track / Compare / Choose | **Find loss**: "A plan about to slip, or time lost to warm-ups and wash-downs." **Compare**: "Workable orders of work are scored for output and delivery, with energy counted in both." **Recommend**: "Your planner sees the best order and its trade-offs." **Learn**: "What the planner chose, and why, makes the next suggestion better." | A recommend-only loop that avoids a triplet. |
| Examples | Press 3 down [N] hours, four lots by temperature, basket hold, forge handoff [N] min | (1) **For the planner:** "Line 2 is down. A workable sequence for the rest of the shift is ready for you to accept." (2) **For the food line planner:** "Running these two allergen-free batches back to back saves one full wash-down this shift." (3) **For the planner:** "Tomorrow's forecast load leaves room to run the long-cure grade on the night shift." (4) **For the heat-treatment lead:** "Run these lots back to back by temperature this shift, so the furnace does not heat up and cool down between them." | Research Pl1 to Pl3 replace the die and changeover ideas, and one furnace card is kept further down. Three industries. |
| FAQ "decides" | The planner. Stamped recommends and your team decides, so... | **The planner. Stamped ranks the options with the trade-offs of each in front of them, and promise dates, customer priority and dispatch order stay with the planner.** | Removes the leftover and adds the ownership line. |
| Meta description | Re-plan with the whole plant in view... | **Plan around how your plant really runs. Stamped warns when the plan is about to slip and suggests a better order of work, with its effect on output and delivery.** | Matches the new H1 and intro. |

### 2.4 Maintenance (`/solutions/maintenance`), Coming soon

| Block | Current | Proposed | Why |
| --- | --- | --- | --- |
| Hero pill | none | **Coming soon** | Vinayak's decision. |
| H1 | Prescriptive maintenance, planned around production. | **Know which machine is starting to wear before it stops.** | P&M. A plain outcome. |
| Intro | The stop log shows where the hours go ... prescribes the fix... | **We are building this next. Stamped will watch how each machine behaves from run to run and tell your team when one starts to drift, while there is still time to plan the fix around production.** | Future tense. |
| New block, groups | none | As in the homepage Maintenance tab (five items: one *First pilot scope*, four *Planned*), plus the ownership line | |
| New block, sample card | none | **Filler, short stops.** Headline: **This filler's short stops cost the most output this week. The next planned changeover is on Thursday.** Tag: **Maintenance · Small stops adding up.** Finding: **The filler stopped for a few minutes at a time, more often than any other machine on the line.** What we found: **Short stops on the filler lost more output this week than any single breakdown.** The opportunity: **Fixed in the changeover already planned, the repair moves no batch.** How we capture it: **Your maintenance team gets the ranking and the window. Authorising the work stays with them.** Buttons: Evidence · Comment. Caption as standard. | Research M3. A different machine from the homepage card (agitator motor). |
| Method heading and paragraph | How Stamped plans the fix / Stamped watches specific energy consumption... | **How it will work** / **Stamped will watch energy per good unit and machine signals for the slow drift that usually comes before a failure, such as a motor drawing more current under the same load. It will say what it sees and how sure it is, and what it cannot see, such as bearing wear on a machine with no vibration sensor. Authorising work and lockouts stays with your maintenance team.** | Future tense, a cross-industry example and the ownership line. |
| Examples label | Example actions | **Example actions, planned** | Status. |
| Examples | Press 2 [N] hours, burners, Thursday window, VMC 3 [N] parts | (1) **For instrumentation:** "The kiln outlet thermocouple has not moved all shift. Check it before acting on its reading." (2) **For the maintenance lead:** "Agitator motor current is climbing under the same load. Plan an inspection at the next batch gap." (3) **For the maintenance lead:** "Gas per good tonne rose on the furnace even after adjusting for output and mix. The rise started after the last burner change." (4) **For the tool room:** "The current insert on VMC 3 is wearing out sooner than the last few on the same part, so check it and the coolant before the next batch." | Research M1 and M2 and E2, plus the tool card without its placeholder. |
| FAQ (all) | Present tense, "prescribes", "operational continuity" | Future tense throughout. For example, "Is this predictive maintenance?" becomes **"It is built to go a step further. Stamped will spot which machines are drifting toward a failure, then suggest what to fix and the best window for it, so the work fits around production."** | Honest status, and no jargon. |
| Meta description | Prescriptive maintenance, planned around production... | **Coming soon. Stamped will spot which machine is starting to wear and suggest the best window to fix it, planned around production.** | Same honest-status reason. |

---

## 3. How Stamped presents itself (applied across all pages)

1. **One explanation everywhere.**
   - The eyebrow is **Industrial AI**, the H1 is "From monitoring your plant to improving it.", and the O1 opening line comes from PR #17.
   - Solution heroes link back to it with "See how it works".
2. **Show the product.** A sample finding card on the homepage and on every solution page, always captioned and always on a different machine.
3. **Breadth through many plain jobs.** About 20 items on the homepage and 5 to 9 per page, each a job a shift lead can say back.
4. **The status legend wherever tags appear.** The legend is the honesty mechanism. Nothing reads as live.
5. **Autonomy appears once, properly.**
   - It is mentioned on the homepage ladder step 3, the Process tab, and the Process "How far Stamped goes on its own" block.
   - Every line carries "inside limits set beforehand".
6. **The four-step strip appears once per solution page.** Process uses the full loop. The other pages use the recommend-only loop.
7. **Sector names appear only in body copy.** Headings and heroes stay general. The examples span chemicals, food, pharma, plastics, cement, metals, textiles and rubber.
8. **One call to action:** Book a site survey.

## 4. Leftovers fixed in the implementation PR

- `lib/seo/llms-index.ts`:
  - Replace "Stamped recommends and your team decides" with "Stamped works inside limits set beforehand".
  - Then regenerate `public/llms.txt`, which repeats the FAQ answers from content, so the solutions and FAQ fixes above carry through.
- `public/llms.txt`:
  - Remove the zero-trust and India-hosting answer.
  - Remove the "about two weeks" clauses.
  - Change the "your team decides" lines (lines 65, 111, 134, 146 and 166 today).
  - Leave the India (en-IN) market lines as they are.
- `lib/content/engagement.ts`:
  - Line 32: remove "The first finding usually comes within about two weeks."
  - Line 80: remove the zero-trust and India-hosting sentence, leaving "We sign an NDA before the survey, and during the survey and the pilot we work only with the data your team agrees to share."

## 5. Implementation checks (for the build PR)

- tsc, lint, seo:check and next build all pass.
- Screenshots at 1440 and 390 px of each tab (first view, autoplay mid-progress, after a click) and of each solution page.
- A reduced-motion pass.
- A unit check that no `autonomous` item exists outside `process`, and that every item has a status tag.
- A grep for em dashes and banned words.

## 6. Remaining questions

1. **Planning has nothing in first pilot scope.** Every Planning item is *Planned* (Research: planning "not built"). Show the Planning tab and page as proposed, with every item tagged Planned, or mark Planning **Coming soon** like Maintenance?
2. **The lot replay as First pilot scope.** Research maps "Replays your worst lot" to First pilot scope, although the lot join is still an offline prototype. Keep that tag, or tag it Planned?
3. **Ladder step 3.** Narrow it to "a change to a process setting", as proposed in section 1, so it matches the Process-only rule?
