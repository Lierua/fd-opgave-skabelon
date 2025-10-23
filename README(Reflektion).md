# Kort Refleksion af Projektet

## Indtro

Generelt fandt jeg ingen større udfordringer, bortset fra en mindre forvirring eller to. Generelt var ChatGPT en stor hjælp, når der var ting, jeg var usikker på, såsom at huske igen, hvordan man havde Astro til at generere sites ud fra en database, og hvor mapping-syntaksen var lidt speciel. Netlify medførte nogle problemer, da npm run dev fungerede, men deployment gav en del errors, for eksempel steder, hvor filer blev hentet uden stort begyndelsesbogstav.

```astro
import SectionTitle from "@components/utilityComp/SectionTitle.astro"
=/=
import SectionTitle from "@components/utilityComp/sectionTitle.astro"
```

Et andet problem ved den genererede side var, at Netlify fandt en anden URL til de genererede sider forskellig fra den til Astro.

```astro
http://localhost:4322/employees/john-carter
=/=
https://imp-figma-design.netlify.app/team/employees/john-carter/
```

Og da profilbillederne af medarbejderne lå i src-mappen, kunne Netlify ikke finde dem, så jeg måtte flytte billederne til public-mappen og ændre JSON-filen, så den virkede med Netlify.

## General Struktur af Komponenter

For strukturen af Komponenter prøvede jeg at lave elementer, der mindede om hinanden, som komponenter. Jeg ville ændre props’ene, så de reflekterede Figma-filen. Dette gjaldt elementer som sektionerne med overtitle, title og beskrivelse, som set i sektionerne What To Expect, More than 25 years of experience og Our core values & principles. Et andet element var knappen, som blev brugt de fleste steder. I begge tilfælde bestemmer en prop, hvilket farvetema komponenten skal anvende.

```astro
<SectionTitle data="Light" overTitle={overTitle} title={title} subtitle={subtitle}/>

<div class="section-title">
    <p class="overTitle" data-theme={data}>{overTitle}</p>
    <h1 data-theme={data}>{title}</h1>
    <p data-theme={data}>{subtitle}</p>
</div>

[data-theme="Light"] {
  --back-col: var(--light);
  --color: var(--black);
}
[data-theme="Dark"] {
  --back-col: var(--black);
  --color: var(--white);
}
```

Derfra prøvede jeg at bygge hjemmesiden op af komponenter i et mindre forsøg på at anvende et atomic design-princip, så jeg kunne opbygge siden af byggeblokke, som jeg kunne genanvende. I refleksion ville jeg, hvis jeg skulle lave hjemmesiden igen, nok have brugt den første dag på at studere Figma-layoutet mere dybdegående, så jeg kunne bygge siden mere effektivt op af mindre komponenter og dermed bedre følge atomic design-princippet.

## General Struktur for CSS

Til strukturen af CSS’en prøvede jeg for det globale stylesheet at holde det til globale variable, såsom farver, font-størrelser og border-radius.

```astro
  --content-width: 1200px;

  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;

  --step--2: clamp(0.7813rem, 0.7457rem + 0.1578vw, 0.8681rem);
  --step--1: clamp(0.9375rem, 0.8949rem + 0.1894vw, 1.0417rem);

  --black: #181818;
  --white: white;
  --yellow: #fbc336;
  --green: #4eaf4e;

  --border-radius: 20px;
  --margin-space: 6rem;
```

Da jeg ville være sikker på, at de matchede Figma-designet gennem hele siden, var det også her, jeg styrede body – herunder den generelle grid-template-columns – og lavede nogle globale klasser, såsom .full-bleed eller .reuseHero, som kunne anvendes på mere end én side.

```astro
body {
  display: grid;
  grid-template-columns:
    [full-bleed-start] minmax(1rem, 1fr) [content] minmax(
      0,
      var(--content-width)
    )
    minmax(1rem, 1fr) [full-bleed-end];
  > * {
    grid-column: content;
  }
  a {
    text-decoration: none;
  }
}

.full-bleed {
  grid-column: full-bleed;
}
```

Herefter anvendte jeg <style> inde i hvert separat komponent, hvor jeg prøvede at anvende de variabler, jeg havde defineret i den globale CSS, og samtidig prøve at neste så meget som muligt. Jeg forsøgte at give en sektion en generel klasse, ofte .content, som ville være mit referencepunkt i <style> for nesting, og muligvis dele komponenter op i to primære klasser, som ville styre styling og nesting.

```astro
    <div class="content">
        <div class="info">
        <SectionTitle data="Light" overTitle="OUR VISION" title="Turn your ideas into reality." subtitle="Capitalize on low hanging fruit to identify a ballpark value added activity beta test. Override the digital divide with additional from DevOps."/>
            <ul class="icon-list">
                <li>
                    <Image class="icon" src={Tick} alt="Tick" />
                    Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day.</li>
                <li>
                    <Image class="icon" src={Tick} alt="Tick" />
                    Identify opportunities to optimize processes and implement impactful solutions with measurable results.</li>
            </ul>
        </div>
        <Image class="pattern" src={Pattern2} alt="pattern" />
        <Image class="img" src={vision} alt="Experts" />
    </div>

    .content {
        display: grid;
        gap: 5rem;
        grid-template-columns: 4fr 3fr;
        grid-template-rows: 1fr 346px;
        margin-top: var(--margin-space);
        margin-bottom: 3rem;
        position: relative;
            .pattern {
                position: absolute;
                scale: 1;
                right: -80px;
                top: 0;
                z-index: -2;
            }
            &::after {
                top: 40px;
                right: -40px;
                content: "";
                position: absolute;
                height: 183px;
                width: 164px;
                border-radius: var(--border-radius);
                background-color: var(--green);
                z-index: -1;
            }
        .img {
            margin-top: -1rem;
            align-self: stretch;
            width: 100%;
            object-fit: cover;
            grid-row: 2;
            border-radius: var(--border-radius);


        }

    }

```

## Sidste Reflektioner

Som nogle sidste refleksioner syntes jeg, det var et sjovt projekt, og jeg synes, jeg fik en ny og bedre forståelse for, hvad atomic design er, og hvorfor det er et godt princip at kende. Jeg har også fået en bedre forståelse for, hvor meget det kan hjælpe at tage en dag til at forstå et givent design bedre og planlægge, hvilke komponenter siden kan deles op i. Desuden blev det klart, hvilke globale variabler man bør have klar, såsom standard-gap, padding, margin, border-line og andre, som jeg måske ville have ønsket at have haft på forhånd. Alt i alt har projektet givet mig et bedre indblik på hvordan man kan strukturer ens projekter, hvilket som nænvet tidligere var ret sjovt.
