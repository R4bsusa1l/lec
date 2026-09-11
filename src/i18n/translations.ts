import type { JoinMessageId } from '../data/lecs'

export type Locale = 'de' | 'en'

type LecCopy = {
  description: string
  founded: string
}

type Messages = {
  documentTitle: string
  brandKicker: string
  brandTitle: string
  proto: string
  heroKicker: string
  heroTitle: string
  heroBody: string
  chipMeta: string
  langToggleAria: string
  langDe: string
  langEn: string
  close: string
  closeAria: string
  districtLabel: string
  producers: string
  producersUnit: string
  consumers: string
  consumersUnit: string
  pvFleet: string
  lecCoverage: string
  coverageUnit: string
  lecTariff: string
  gridTariff: string
  feedIn: string
  founded: string
  energyBalance: string
  summerDay: string
  winterDay: string
  hourlyTitleSummer: string
  hourlyTitleWinter: string
  hourlyNote: string
  yearlyTitle: string
  yearlyNote: string
  tooltipLec: string
  tooltipPlant: string
  joinCalculator: string
  joinNote: string
  roleAria: string
  roleConsumer: string
  roleProducer: string
  annualUse: string
  kwhAria: string
  kwpAria: string
  rooftopPv: string
  yieldNote: string
  kwhPerYear: string
  household1: string
  household2: string
  householdH4: string
  householdHeatPump: string
  supply: string
  demand: string
  balanceAria: string
  legendSolar: string
  legendYou: string
  legendDemand: string
  yourOffer: string
  yourDemand: string
  yourLecShare: string
  stillFromPlants: string
  takenUpLocally: string
  spillToFeedIn: string
  months: string[]
  join: Record<
    JoinMessageId,
    {
      headline: string
      detail: (ctx: {
        coveragePct: number
        offtakePct: number
        producers: number
        consumers: number
      }) => string
    }
  >
  lecs: Partial<Record<string, LecCopy>>
}

export const translations: Record<Locale, Messages> = {
  de: {
    documentTitle: 'Winterthur Lokale Elektrizitätsgemeinschaften',
    brandKicker: 'Winterthur · Lokale Elektrizitätsgemeinschaften',
    brandTitle: 'Mein LEG-Check Winterthur',
    proto: 'Prototyp · alle LEC-Zahlen sind fiktiv',
    heroKicker: 'Stadtplan der Quartierstrom-Inseln',
    heroTitle: 'Klicken Sie auf ein Quartier, um dessen Energiegemeinschaft zu öffnen',
    heroBody:
      'Sieben Winterthurer Stadtkreise beherbergen modellierte LECs im Stadtwerk-Netz. Die Umrisse folgen den offiziellen Stadtquartieren; Produzentenzahlen, Tarife und Stundenprofile sind erfunden, aber dimensioniert wie eine Schweizer LEG 2026 — lokaler Solarstrom zum LEC-Tarif, der Rest weiterhin aus dem Kraftwerksmix.',
    chipMeta: '{producers} PV · {consumers} Verbraucher · {pct}% LEC',
    langToggleAria: 'Sprache wählen',
    langDe: 'DE',
    langEn: 'EN',
    close: 'Schliessen',
    closeAria: 'Schliessen',
    districtLabel: 'Kreis {id} · {name} · {transformer}',
    producers: 'Produzenten',
    producersUnit: 'Solardächer',
    consumers: 'Verbraucher',
    consumersUnit: 'Zähler',
    pvFleet: 'PV-Park',
    lecCoverage: 'LEC-Deckung',
    coverageUnit: 'des Jahresbedarfs',
    lecTariff: 'LEC-Tarif {value} Rp/kWh',
    gridTariff: 'Netz {value} Rp/kWh',
    feedIn: 'Einspeisung {value} Rp/kWh',
    founded: 'Gegründet {value}',
    energyBalance: '{produced} MWh erzeugt · {demanded} MWh nachgefragt',
    summerDay: 'Sommertag',
    winterDay: 'Wintertag',
    hourlyTitleSummer: 'Typischer Werktag im Juli',
    hourlyTitleWinter: 'Typischer Werktag im Januar',
    hourlyNote:
      'Türkis = zum LEC-Tarif verbraucht (lokaler Solarstrom). Cyan = Rest aus dem öffentlichen Netz / Kraftwerken.',
    yearlyTitle: 'Jahresaufteilung · LEC vs. Kraftwerk',
    yearlyNote:
      'Monatlicher Gemeinschaftsverbrauch, lokal abgerechnet versus aus dem Netzmix bezogen.',
    tooltipLec: 'LEC-Tarif',
    tooltipPlant: 'Kraftwerk / Netz',
    joinCalculator: 'Beitrittsrechner',
    joinNote:
      'Prüfen Sie, ob diese LEC noch freien Solarstrom für neue Verbraucher oder freie Nachfrage für neue Produzenten hat. Zahlen sind modelliert, nicht gemessen.',
    roleAria: 'Ihre Rolle',
    roleConsumer: 'Ich bin Verbraucher',
    roleProducer: 'Ich bin Solarproduzent',
    annualUse: 'Jährlicher Stromverbrauch',
    kwhAria: 'Kilowattstunden pro Jahr',
    kwpAria: 'Kilowatt Peak',
    rooftopPv: 'Dach-PV, die Sie anbieten würden',
    yieldNote: 'Winterthurer Ertrag modelliert mit ~970 kWh/kWp · {kwh} kWh/Jahr',
    kwhPerYear: 'kWh/Jahr',
    household1: '1 Person',
    household2: '2 Personen',
    householdH4: 'H4-Familie',
    householdHeatPump: 'Wärmepumpe',
    supply: 'Angebot',
    demand: 'Nachfrage',
    balanceAria: 'Angebot und Nachfrage',
    legendSolar: 'Gemeinschafts-Solar',
    legendYou: 'Sie',
    legendDemand: 'Gemeinschaftsnachfrage',
    yourOffer: 'Ihr Angebot',
    yourDemand: 'Ihre Nachfrage',
    yourLecShare: 'Ihr LEC-Anteil',
    stillFromPlants: 'Weiterhin aus Kraftwerken',
    takenUpLocally: 'Lokal abgenommen',
    spillToFeedIn: 'Überschuss zur Einspeisung',
    months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    join: {
      consumerStrong: {
        headline: 'Lokales Angebot kann einen nützlichen Teil Ihres Bedarfs decken',
        detail: ({ coveragePct }) =>
          `Etwa ${Math.round(coveragePct)}% Ihres Stroms würden zum LEC-Tarif abgerechnet. Der Rest kommt weiterhin aus dem öffentlichen Netz / Kraftwerken.`,
      },
      consumerModerate: {
        headline: 'Knappes Angebot — nur ein bescheidener LEC-Anteil für neue Verbraucher',
        detail: () =>
          'Die Produzenten sind bereits ausgelastet. Sie würden weiterhin die meisten Kilowattstunden aus dem Netz beziehen. Ein kleinerer Haushalt oder ein winterlastiges Profil sähe noch weniger LEC-Deckung.',
      },
      consumerWeak: {
        headline: 'Wenig Angebot — als Verbraucher lohnt sich der Beitritt kaum',
        detail: ({ producers, consumers }) =>
          `Diese Gemeinschaft hat bereits ${producers} Solarproduzent${producers === 1 ? '' : 'en'} für ${consumers} Verbraucher. Zusätzliche Nachfrage würde grösstenteils mit Kraftwerksstrom gedeckt, sodass der LEC-Tarif kaum greift.`,
      },
      producerStrong: {
        headline: 'Nachfrage übersteigt das Angebot deutlich — Produzenten sind gefragt',
        detail: ({ offtakePct }) =>
          `Ein hoher Anteil Ihres angebotenen Stroms (~${Math.round(offtakePct)}%) könnte innerhalb der LEC abgenommen werden statt zur günstigen Einspeisung. Nachbarn importieren tagsüber noch viel Kraftwerksstrom.`,
      },
      producerModerate: {
        headline: 'Es gibt noch Platz für zusätzliche Solaranlagen',
        detail: ({ offtakePct }) =>
          `Ein Teil Ihrer Erzeugung bliebe in der Gemeinschaft (~${Math.round(offtakePct)}% Abnahme). Mittagsspitzen können im Sommer weiterhin ins Netz fliessen.`,
      },
      producerWeak: {
        headline: 'Lokale Nachfrage ist bereits gesättigt',
        detail: () =>
          'Der Grossteil Ihres Überschusses würde weiterhin zum Einspeisetarif ans Netz verkauft. Diese LEC braucht derzeit keinen weiteren Produzenten.',
      },
    },
    lecs: {
      neuwiesen: {
        founded: 'März 2026',
        description:
          'Eine dichte Innenstadtgemeinschaft rund um das Bahnhofsquartier und die Altstadt. Denkmalschutzdächer und Verschattung durch höhere Blöcke halten Solarstrom knapp, während Büros, Läden und Wohnungen tagsüber und abends stark belasten. Stadtwerk Winterthur liefert den Rest aus dem regionalen Mix — inklusive der NOK-Laufwasserkraftwerke am Rhein und saisonaler Importe.',
      },
      hegi: {
        founded: 'Januar 2026',
        description:
          'Hallendächer entlang des Industriegebiets Grüze und neuer Wohnraum in Hegi geben dieser LEC eine der stärksten PV-Flotten der Stadt. Mittagsüberschüsse sind von April bis August üblich; Winterabende stützen sich weiterhin aufs Netz. Eine fiktive Genossenschaft, Quartierstrom Oberi, koordiniert die Zuteilung alle 15 Minuten.',
      },
      seen: {
        founded: 'Mai 2026',
        description:
          'Vorwiegend Einfamilienhausstrassen Richtung Eidberg und Iberg, mit nur wenigen grösseren Süddächern. Abendspitzen durch Wärmepumpen und Kochen übertreffen den verfügbaren Solarstrom, sodass Mitglieder den Grossteil ihrer Kilowattstunden zum Standardtarif von Stadtwerk beziehen.',
      },
      toess: {
        founded: 'Februar 2026',
        description:
          'Benannt nach der alten Spinnerei, liegt diese Gemeinschaft auf ehemaligen Industriedächern plus dem Wohngewebe Richtung Dättnau. Produktion und Nachfrage liegen über das Jahr ungewöhnlich nahe beieinander — der LEC-Tarif greift für einen grossen Teil des Tagesverbrauchs und lässt nur wenig Spielraum für zusätzliche Produzenten.',
      },
      rosenberg: {
        founded: 'Juni 2026',
        description:
          'Eine winzige Hanggemeinschaft: eine Bauernhofanlage an der Rosenbergstrasse und acht Nachbarhaushalte. Die Nachfrage übersteigt bereits den einzelnen Produzenten. Extra-Verbraucher sähen kaum LEC-Strom; ein zweites Dach würde den Grossteil seines Überschusses in der Gruppe verkaufen statt zur Einspeisung.',
      },
      auen: {
        founded: 'April 2026',
        description:
          'Dorfähnliche Strassen zwischen den Töss-Auen und den Rebbergen. Dachpotenzial ist anständig, aber nicht dicht, und mehrere Wärmepumpen-Sanierungen 2023–2025 haben den Winterbedarf erhöht. Die LEC deckt ein faires Frühlings–Herbst-Mittagsfenster und wenig von der Abendspitze.',
      },
      gutschick: {
        founded: 'März 2026',
        description:
          'Schulhallen, das Eissport-Dach Deutweg (modelliert als 90-kWp-Anlage) und Wohnblöcke um Gutschick. Tageslast öffentlicher Gebäude nimmt einen nützlichen Anteil Solarstrom auf; Nächte und Eventabende fallen zurück auf den Kraftwerksmix.',
      },
    },
  },
  en: {
    documentTitle: 'Winterthur Local Energy Communities',
    brandKicker: 'Winterthur · Local Energy Communities',
    brandTitle: 'Mein LEG-Check Winterthur',
    proto: 'Prototype · all LEC figures are fictional',
    heroKicker: 'City map of neighbourhood power islands',
    heroTitle: 'Click a district to open its energy community',
    heroBody:
      'Seven Winterthur Stadtkreise host modelled LECs on the Stadtwerk grid. Outlines follow the official city districts; producer counts, tariffs and hourly traces are invented but sized like a 2026 Swiss LEG — local solar at the LEC tariff while the rest still comes from the plant mix.',
    chipMeta: '{producers} PV · {consumers} loads · {pct}% LEC',
    langToggleAria: 'Choose language',
    langDe: 'DE',
    langEn: 'EN',
    close: 'Close',
    closeAria: 'Close',
    districtLabel: 'District {id} · {name} · {transformer}',
    producers: 'Producers',
    producersUnit: 'solar roofs',
    consumers: 'Consumers',
    consumersUnit: 'meters',
    pvFleet: 'PV fleet',
    lecCoverage: 'LEC coverage',
    coverageUnit: 'of yearly demand',
    lecTariff: 'LEC tariff {value} Rp/kWh',
    gridTariff: 'Grid {value} Rp/kWh',
    feedIn: 'Feed-in {value} Rp/kWh',
    founded: 'Founded {value}',
    energyBalance: '{produced} MWh produced · {demanded} MWh demanded',
    summerDay: 'Summer day',
    winterDay: 'Winter day',
    hourlyTitleSummer: 'Typical July weekday',
    hourlyTitleWinter: 'Typical January weekday',
    hourlyNote:
      'Turquoise = consumed at the LEC tariff (local solar). Cyan = residual from the public grid / power plants.',
    yearlyTitle: 'Year split · LEC vs plant',
    yearlyNote: 'Monthly community consumption billed locally versus drawn from the grid mix.',
    tooltipLec: 'LEC tariff',
    tooltipPlant: 'Power plant / grid',
    joinCalculator: 'Join calculator',
    joinNote:
      'Test whether this LEC still has spare solar for a new consumer, or spare demand for a new producer. Figures are modelled, not metered.',
    roleAria: 'Your role',
    roleConsumer: 'I am a consumer',
    roleProducer: 'I am a solar producer',
    annualUse: 'Annual electricity use',
    kwhAria: 'Kilowatt-hours per year',
    kwpAria: 'Kilowatt peak',
    rooftopPv: 'Rooftop PV you would offer',
    yieldNote: 'Winterthur yield modelled at ~970 kWh/kWp · {kwh} kWh/year',
    kwhPerYear: 'kWh/year',
    household1: '1 person',
    household2: '2 people',
    householdH4: 'H4 family',
    householdHeatPump: 'Heat pump',
    supply: 'Supply',
    demand: 'Demand',
    balanceAria: 'Supply and demand',
    legendSolar: 'community solar',
    legendYou: 'you',
    legendDemand: 'community demand',
    yourOffer: 'Your offer',
    yourDemand: 'Your demand',
    yourLecShare: 'Your LEC share',
    stillFromPlants: 'Still from plants',
    takenUpLocally: 'Taken up locally',
    spillToFeedIn: 'Spill to feed-in',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    join: {
      consumerStrong: {
        headline: 'Local supply can cover a useful share of your demand',
        detail: ({ coveragePct }) =>
          `About ${Math.round(coveragePct)}% of your electricity would be billed at the LEC tariff. The rest still comes from the public grid / power plants.`,
      },
      consumerModerate: {
        headline: 'Tight supply — only a modest LEC share for new consumers',
        detail: () =>
          'Producers are already stretched. You would still import most kilowatt-hours from the grid. A smaller household or a winter-lean profile would see even less LEC coverage.',
      },
      consumerWeak: {
        headline: 'Supply is low — joining as a consumer is not beneficial',
        detail: ({ producers, consumers }) =>
          `This community already has ${producers} solar producer${producers === 1 ? '' : 's'} serving ${consumers} consumers. Extra demand would mostly be met by power-plant electricity, so the LEC tariff barely applies.`,
      },
      producerStrong: {
        headline: 'Demand far outweighs supply — producers are needed',
        detail: ({ offtakePct }) =>
          `A high share of the power you offer (~${Math.round(offtakePct)}%) could be taken up inside the LEC instead of cheap feed-in. Neighbours currently import a lot of plant electricity during the day.`,
      },
      producerModerate: {
        headline: 'There is still room for additional solar',
        detail: ({ offtakePct }) =>
          `Part of your generation would stay in the community (~${Math.round(offtakePct)}% offtake). Midday peaks may still spill to the grid in summer.`,
      },
      producerWeak: {
        headline: 'Local demand is already saturated',
        detail: () =>
          'Most of your surplus would still be sold to the grid at the feed-in tariff. This LEC does not currently need another producer.',
      },
    },
    lecs: {
      neuwiesen: {
        founded: 'March 2026',
        description:
          'A dense inner-city community around the station quarter and the old town. Heritage roofs and shading from taller blocks keep solar scarce, while offices, shops and apartments pull a heavy daytime and evening load. Stadtwerk Winterthur still supplies the residual from the regional mix — including the NOK run-of-river plants on the Rhine and seasonal imports.',
      },
      hegi: {
        founded: 'January 2026',
        description:
          'Hall roofs along the Grüze industrial belt and new housing at Hegi give this LEC one of the strongest PV fleets in the city. Midday surplus is common from April to August; winter evenings still lean on the grid. A fictional cooperative, Quartierstrom Oberi, coordinates allocation every 15 minutes.',
      },
      seen: {
        founded: 'May 2026',
        description:
          'Mostly single-family streets toward Eidberg and Iberg, with only a handful of larger south roofs. Evening peaks from heat pumps and cooking dwarf the available solar, so members still buy the majority of their kilowatt-hours at the standard Stadtwerk tariff.',
      },
      toess: {
        founded: 'February 2026',
        description:
          'Named after the old spinning mill, this community sits on former industrial roofs plus the residential fabric toward Dättnau. Production and demand are unusually close over the year, which makes the LEC tariff apply for a large slice of daytime consumption — and leaves only a modest gap for extra producers.',
      },
      rosenberg: {
        founded: 'June 2026',
        description:
          'A tiny hillside community: one farmhouse array on Rosenbergstrasse and eight neighbouring households. Demand already outruns the single producer. Extra consumers would see almost no LEC electricity; a second roof would sell most of its surplus inside the group instead of at feed-in.',
      },
      auen: {
        founded: 'April 2026',
        description:
          'Village-scale streets between the Töss river meadows and the vineyards. Roof potential is decent but not dense, and several heat-pump retrofits from 2023–2025 lifted winter demand. The LEC covers a fair spring–autumn lunch window and little of the evening peak.',
      },
      gutschick: {
        founded: 'March 2026',
        description:
          'School halls, the Deutweg ice-sport roof (modelled as a 90 kWp array) and apartment blocks around Gutschick. Daytime load from public buildings soaks up a useful share of solar; nights and event evenings fall back to the plant mix.',
      },
    },
  },
}

export function formatTemplate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''))
}
