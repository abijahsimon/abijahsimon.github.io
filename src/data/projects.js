// All site content lives here. Copy budget: one sentence per project on the home page (`line`),
// one short paragraph on its own page (`more`), one sentence per section label (`d`). Nothing longer.
// Images are file names (without extension) in src/assets/work.
// `notes` are the opt-in annotations: x / y are percentages across the image.

export const me = {
  name: 'Abijah Simon',
  title: 'Web & Graphic Designer',
  line: 'I design websites, publications and identities that make complex ideas clear.',
  email: 'abijah@ucla.edu',
  sub: 'Ph.D. in Geology, UCLA. I work with research groups, educators and small businesses.',
  about: 'I trained as a geologist and spent years drawing maps and figures before designing websites and publications. Available for design roles and freelance projects.',
};

export const surface = { bg: '#E8EBE4', fg: '#101010' };
export const basement = { bg: '#E5674E', fg: '#1C0B07' };

export const projects = [
  {
    slug: 'hao-cao', n: '01', title: ['Hao Cao'], wdth: 150,
    kind: 'Research website', year: '2026', status: 'Live',
    bg: '#0A0F2C', fg: '#EEF0FF', ac: '#F0B35A', on: '#111',
    edge: 'M0,44 C200,6 420,78 700,40 C960,6 1180,70 1440,26 L1440,80 L0,80Z',
    line: 'A research website that makes planetary science visible.',
    more: 'The hero gives the research a face. Below it, summaries, publications, team, teaching and recorded talks are each one step away. The planet is an interpretation refined for legibility, not a simulation.',
    facts: [
      ['Role', 'Website design, scientific visual direction, WordPress theme adaptation'],
      ['For', 'UCLA Planetary Magnetism group'],
      ['Base', 'Helios by HTML5 UP, adapted'],
    ],
    link: { href: 'https://haocao.epss.ucla.edu/', label: 'haocao.epss.ucla.edu' },
    cover: { layout: 'web', imgs: ['hao-home', 'hao-mobile'] },
    blocks: [
      { type: 'full', img: 'hao-home', alt: 'Homepage: a cutaway planet with magnetic field lines beside the name', cap: 'Homepage · live site',
        notes: [
          { x: 80, y: 40, t: 'A cutaway planet with field lines gives the research a face. An interpretation, not a simulation.' },
          { x: 22, y: 31, t: 'The name in both scripts, in a serif on the dark field.' },
          { x: 50, y: 5.5, t: 'Eight destinations held on one line.' },
          { x: 50, y: 86, t: 'Straight below the hero: a plain-language summary of the research.' },
        ] },
      { type: 'row', cols: '3fr 1fr', imgs: [
        { img: 'hao-research', alt: 'Research page with topic summaries', cap: 'Research' },
        { img: 'hao-mobile', alt: 'Homepage on a phone', cap: 'Phone' },
      ] },
      { type: 'row', cols: '1fr 1fr', imgs: [
        { img: 'hao-pubs', alt: 'Publications page with a two-column list', cap: 'Publications' },
        { img: 'hao-team', alt: 'Team page with a group photograph', cap: 'Team · photograph from the group' },
      ] },
    ],
  },
  {
    slug: 'epss', n: '02', title: ['EPSS Annual', 'Newsletter'], wdth: 118,
    kind: 'Editorial design', year: '2019–2026', status: 'Print + live',
    bg: '#2774AE', fg: '#FFFFFF', ac: '#FFD100', on: '#111', hd: '#FFD100',
    edge: 'M0,52 L410,52 L452,18 L930,18 L972,60 L1440,60 L1440,80 L0,80Z',
    line: 'One annual science publication, from printed spreads to the web.',
    more: 'I edited and laid out two printed issues, then directed the design of the 2026 web edition with editorial collaborators. The job in both: make features, field diaries, awards and farewells, written by many people, read as one publication.',
    facts: [
      ['Print', 'Editing and layout, 2019–20 and 2020–21 issues'],
      ['Web', 'Editorial and web design direction, 2026. Built with AI assistance.'],
      ['Type', 'Newsreader, IBM Plex Sans, IBM Plex Mono'],
    ],
    link: { href: 'https://newsletter.epss.ucla.edu/', label: 'newsletter.epss.ucla.edu' },
    cover: { layout: 'grid', cols: '1fr 1fr 2.08fr', wide: 2, imgs: ['epss19-cover', 'epss20-cover', 'epss-home'] },
    blocks: [
      { type: 'full', img: 'epss-home', alt: 'Web edition homepage: serif masthead over a mountain fieldwork photograph', cap: 'Web edition, 2026 · live site · photography by its contributors',
        notes: [
          { x: 27, y: 44, t: 'Newsreader sets the masthead and the reading text.' },
          { x: 12, y: 28.5, t: 'IBM Plex Mono labels the parts: issue, section, slide count.' },
          { x: 57, y: 22, t: "Photography from the department's own fieldwork leads the page." },
          { x: 85, y: 64, t: "The Chair's letter sits on the cover as a card, the way the print issues open." },
        ] },
      { type: 'label', t: 'Print', s: '2019–21', d: 'Two issues, edited and laid out. Colour panels separate short news from long features.' },
      { type: 'strip', imgs: [
        { img: 'epss19-cover', alt: '2019–20 printed cover', cap: '2019–20 · cover' },
        { img: 'epss19-spread5', alt: 'Spread: Trekking Through Death Valley', cap: '2019–20 · field trip' },
        { img: 'epss19-spread7', alt: 'Spread with blue and yellow panels', cap: '2019–20 · news' },
        { img: 'epss19-spread3', alt: 'Spread with awards on black and yellow panels', cap: '2019–20 · awards' },
        { img: 'epss20-cover', alt: '2020–21 printed cover made from a video-call grid', cap: '2020–21 · cover' },
        { img: 'epss20-spread7', alt: "Spread: Zoomin' through the Poleta Folds", cap: '2020–21 · remote field camp' },
        { img: 'epss20-spread4', alt: 'Spread on radar observations of Venus', cap: '2020–21 · research' },
        { img: 'epss20-spread10', alt: 'Spread on the virtual outreach event', cap: '2020–21 · outreach' },
      ] },
      { type: 'label', t: 'Web', s: '2026', d: 'A contents page, story pages, and an archive of every cover since 1967.' },
      { type: 'row', cols: '1fr 1fr', imgs: [
        { img: 'epss-toc', alt: 'Table of contents on the web edition', cap: 'Contents' },
        { img: 'epss-story', alt: 'Story page: Dispatches from the Field', cap: 'Story page' },
      ] },
      { type: 'row', cols: '1fr 1fr', imgs: [
        { img: 'epss-deeptime', alt: 'Archive page: EPSS Through Deep Time', cap: 'Archive of covers, 1967–2025' },
        { img: 'epss-archive', alt: 'Photo archive grid', cap: 'Photo archive' },
      ] },
      { type: 'row', cols: '3fr 1fr', imgs: [
        { img: 'epss-past', alt: 'Past issues shelf', cap: 'Past issues · covers by their original designers' },
        { img: 'epss-story-m', alt: 'A story on a phone', cap: 'Phone' },
      ] },
    ],
  },
  {
    slug: 'diynamics', n: '03', title: ['DIYnamics'], wdth: 150,
    kind: 'Web + instructions', year: '2026', status: 'Live + proposals',
    bg: '#F9C62B', fg: '#191C52', ac: '#191C52', on: '#fff',
    edge: 'M0,72 L1440,10 L1440,80 L0,80Z',
    line: 'A tabletop science kit teachers can build and teach with.',
    more: 'DIYnamics is a rotating tank for showing how atmospheres and oceans move. The design follows one journey: understand the kit, get the parts, build it, teach with it. The screens here are redesign proposals; the published site runs on Squarespace.',
    facts: [
      ['Role', 'Website design, content organisation, instructional graphics, brand applications'],
      ['Status', 'Live Squarespace site, plus redesign proposals from November 2026'],
    ],
    link: { href: 'https://diynamics.ucla.edu/', label: 'diynamics.ucla.edu' },
    cover: { layout: 'grid', cols: '2fr 1fr 1fr', wide: 0, imgs: ['diy-home', 'diy-quickstart', 'diy-guide-02'] },
    blocks: [
      { type: 'full', img: 'diy-home', alt: 'Proposed homepage: A spinning planet. On your tabletop.', cap: 'Proposed homepage · design proposal, not live · photograph shared by Jon Aurnou',
        notes: [
          { x: 22, y: 42, t: 'The promise in six words.' },
          { x: 17, y: 62, t: 'Two actions only: build a kit, or teach with one.' },
          { x: 72, y: 50, t: 'A real experiment photograph, not a render.' },
        ] },
      { type: 'row', cols: '1fr 1fr', imgs: [
        { img: 'diy-parts', alt: 'Proposed parts page with two routes', cap: 'Parts · two routes, with prices' },
        { img: 'diy-build', alt: 'Proposed build page with a step checklist', cap: 'Build · step by step' },
      ] },
      { type: 'label', t: 'Instructions', d: 'A one-page quick start and a step-by-step illustrated assembly guide.' },
      { type: 'row', cols: '1fr 1fr 1fr', imgs: [
        { img: 'diy-quickstart', alt: 'Quick-start sheet', cap: 'Quick-start sheet' },
        { img: 'diy-guide-02', alt: 'Assembly guide page with numbered steps', cap: 'Assembly guide' },
        { img: 'diy-guide-03', alt: 'Assembly guide page with exploded drawings', cap: 'Assembly guide' },
      ] },
      { type: 'label', t: 'Brand', d: 'A business card, shown beside the published site.' },
      { type: 'row', cols: '1fr 1fr', imgs: [
        { img: 'diy-card', alt: 'Business card with tank, planet and QR code', cap: 'Business card' },
        { img: 'diy-live', alt: 'Live Squarespace homepage', cap: 'Live site' },
      ] },
    ],
  },
  {
    slug: 'results', n: '04', title: ['Results', 'Dog Training'], wdth: 132,
    kind: 'Small-business website', year: '2026', status: 'Prototype',
    bg: '#ECE2D2', fg: '#27221D', ac: '#27221D', on: '#fff', hd: '#5E6B34',
    edge: 'M0,40 q60,-34 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 L1440,80 L0,80Z',
    line: 'A training method explained in one drawing.',
    more: 'My own dog-training business, treated as a design project. The page stays quiet so one illustration can carry the idea: mark what you want with YES and what you do not with NO. It is a prototype and has not launched.',
    facts: [
      ['Role', 'Positioning, visual direction, copy. Prototyped with AI assistance.'],
      ['Status', 'Private prototype. The form is not connected; the hero photo is a placeholder.'],
    ],
    cover: { layout: 'grid', cols: '2fr 1fr', wide: 0, imgs: ['results-home', 'results-method'] },
    blocks: [
      { type: 'row', cols: '1fr 1.25fr', imgs: [
        { img: 'results-method', alt: 'YES and NO teaching sequence with line-drawn dogs', cap: 'The teaching sequence',
          notes: [
            { x: 26, y: 6.5, t: 'The idea in four words.' },
            { x: 9, y: 25, t: 'YES and NO are the only labels. The method reads before the copy does.' },
            { x: 62, y: 27, t: 'One line weight, one accent colour per signal.' },
          ] },
        { img: 'results-home', alt: 'Prototype homepage in warm beige with a serif headline', cap: 'Prototype homepage · placeholder photo' },
      ] },
      { type: 'row', cols: '3fr 1fr', imgs: [
        { img: 'results-full', alt: 'The full prototype page', cap: 'Full page', crop: '16/10' },
        { img: 'results-mobile', alt: 'Prototype on a phone', cap: 'Phone' },
      ] },
    ],
  },
  {
    slug: 'eyu', n: '05', title: ['Exploring', 'Your Universe'], wdth: 104,
    kind: 'Event print + wayfinding', year: '2018–2022', status: 'Event',
    bg: '#45ABE6', fg: '#0C2440', ac: '#FFD500', on: '#0C2440',
    edge: 'M0,62 L120,30 L205,54 L335,12 L470,50 L600,24 L760,58 L905,18 L1040,48 L1180,16 L1300,52 L1440,26 L1440,80 L0,80Z',
    line: 'A campus science festival people can find, navigate and join.',
    more: 'Exploring Your Universe is a free annual science festival at UCLA. I ran it as president for four years. The flyer, booth map and passport had to work together so a family could find a booth, a talk or a telescope.',
    facts: [
      ['Role', 'President, 2018–2022. Event print, wayfinding and web.'],
      ['Shown', '2022 materials'],
    ],
    link: { href: 'https://exploringyouruniverse.ucla.edu/', label: 'exploringyouruniverse.ucla.edu' },
    cover: { layout: 'grid', cols: '1.7fr 1fr', wide: 0, imgs: ['eyu-map', 'eyu-flyer'] },
    blocks: [
      { type: 'full', img: 'eyu-map', alt: 'Booth map of the UCLA Court of Sciences with legend', cap: 'Booth map, 2022',
        notes: [
          { x: 63, y: 12, t: 'Booth codes are coloured by type in the legend.' },
          { x: 10, y: 9, t: 'North arrow and building names for first-time visitors.' },
          { x: 88, y: 60, t: 'Sponsors sit in a side panel, off the map.' },
        ] },
      { type: 'row', cols: '1fr 1.4fr', imgs: [
        { img: 'eyu-flyer', alt: 'Flyer in blue and yellow', cap: 'Flyer' },
        { img: 'eyu-savethedate', alt: 'Save-the-date graphic', cap: 'Save the date' },
      ] },
      { type: 'full', img: 'eyu-passport', alt: 'Visitor passport panels', cap: 'Visitor passport' },
      { type: 'row', cols: '1.6fr 1fr', imgs: [
        { img: 'eyu-boothlist', alt: 'Booth list and schedule', cap: 'Booth list and schedule' },
        { img: 'eyu-shirt', alt: 'Event T-shirt', cap: 'T-shirt' },
      ] },
    ],
  },
  {
    slug: 'graphics', n: '06', title: ['Selected', 'Graphics'], wdth: 140,
    kind: 'Identity · poster · illustration', year: '2025–2026', status: 'Selected',
    bg: '#0B0B0B', fg: '#F4F2EC', ac: '#F4F2EC', on: '#111',
    edge: 'M0,30 C180,70 360,70 540,34 S900,0 1080,36 S1320,72 1440,40 L1440,80 L0,80Z',
    line: 'Mission identities, a poster, illustration.',
    more: 'Marks and print pieces for research proposals, a department and a lecture room. The WREXM mark began as AI-generated concepts and was redrawn from scratch in Illustrator.',
    facts: [],
    cover: { layout: 'tiles', imgs: ['wrexm', 'polarspark', 'coleman', 'epss-shirt'] },
    blocks: [
      { type: 'tiles', imgs: [
        { img: 'wrexm', alt: 'WREXM logo', cap: 'WREXM · mission identity, 2025', bg: '#fff' },
        { img: 'polarspark', alt: 'PolarSpark logo', cap: 'PolarSpark · proposal identity, 2026', bg: '#000' },
      ] },
      { type: 'row', cols: '1fr 2fr', imgs: [
        { img: 'polarspark-cover', alt: 'PolarSpark proposal cover with a lunar rover', cap: 'PolarSpark · proposal cover · lunar imagery not my own' },
        { img: 'coleman', alt: 'Coleman Chamber commemorative poster in navy and gold', cap: 'Coleman Chamber · commemorative poster, 2026' },
      ] },
      { type: 'row', cols: '1fr 1fr', imgs: [
        { img: 'epss-shirt', alt: 'One-colour mountain and night-sky illustration', cap: 'EPSS apparel · one-colour illustration' },
        { img: 'dunes-workshop', alt: 'Logo concepts for a planetary dunes workshop', cap: 'Planetary Dunes Workshop · logo concepts' },
      ] },
      { type: 'row', cols: '1fr 1.2fr', imgs: [
        { img: 'dunes', alt: 'Five-panel schematic of dunes migrating over bedrock', cap: 'Dune-process schematic · scientific illustration' },
        { img: 'watermelon', alt: 'Photo composite of a figure on a watermelon slice', cap: 'Personal photo composite' },
      ] },
    ],
  },
  {
    slug: 'research', n: '07', title: ['Maps &', 'Sections'], wdth: 140,
    kind: 'Ph.D. research, UCLA', year: '2025', status: 'Dissertation',
    bg: '#F4B8D1', fg: '#2B0E1C', ac: '#D7261E', on: '#fff',
    edge: 'M0,58 L300,58 L360,22 L820,22 L1000,64 L1440,64 L1440,80 L0,80Z',
    line: 'Geologic maps and cross-sections of the eastern Tibetan Plateau.',
    more: 'For my dissertation I mapped part of the eastern Tibetan Plateau in the field and drew what I found: geologic maps, cross-sections restored step by step, and a three-dimensional model of the crust. It is the same job as the design work: make dense information readable.',
    facts: [
      ['Degree', 'Ph.D. in Geology, UCLA, 2025'],
      ['Dissertation', 'Structural Geology and Tectonic Evolution of the Eastern Tibetan Plateau'],
      ['Scope', 'New field mapping across about 30,000 km²'],
    ],
    cover: { layout: 'map', imgs: ['phd-minshan', 'phd-wedge'] },
    blocks: [
      { type: 'full', img: 'phd-minshan', alt: 'Geologic map of the Min Shan with faults, bedding measurements and earthquake focal mechanisms', cap: 'Geologic map of the Min Shan · new mapping with published sources',
        notes: [
          { x: 80, y: 62, t: 'Red is reserved for faults, so structure reads first.' },
          { x: 12, y: 78, t: 'Three legends, grouped by what you are looking for.' },
          { x: 66, y: 48, t: 'Place names in italics, sized by importance.' },
        ] },
      { type: 'full', img: 'phd-wedge', alt: 'Three-dimensional block diagram of folded and faulted crust beneath the Min Shan', cap: 'Three-dimensional model of the crust' },
      { type: 'label', t: 'Cross-sections', d: 'Each section is restored step by step, undoing the folds and faults to show how the crust shortened.' },
      { type: 'row', cols: '1fr 1fr', imgs: [
        { img: 'phd-restoration-1', alt: 'Six-stage restoration of a cross-section', cap: 'Step-by-step restoration, profile 1' },
        { img: 'phd-restoration-3', alt: 'Four-stage restoration of a cross-section', cap: 'Step-by-step restoration, profile 3' },
      ] },
      { type: 'full', img: 'phd-profile-1', alt: 'Seismic profile shown uninterpreted, as first interpreted, and reinterpreted', cap: 'Seismic profile, reinterpreted · data from Jia et al. (2006)' },
      { type: 'label', t: 'Regional maps', d: 'The wider setting: active faults, topography and the full geologic map.' },
      { type: 'full', img: 'phd-faults', alt: 'Active fault map of eastern Tibet with earthquake epicentres', cap: 'Active faults of eastern Tibet' },
      { type: 'row', cols: '1.1fr 1fr', imgs: [
        { img: 'phd-topo', alt: 'Two topographic swath profiles', cap: 'Topographic profiles' },
        { img: 'phd-schematic', alt: 'Schematic fault map with terrane labels', cap: 'Regional schematic' },
      ] },
      { type: 'full', img: 'phd-map-main', alt: 'Regional geologic map of the eastern Tibetan Plateau', cap: 'Regional geologic map' },
    ],
  },
];

export const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
