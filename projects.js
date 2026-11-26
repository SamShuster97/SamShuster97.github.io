const original = 'https://samshuster97.github.io/';
const projects = [
  {
    id: 'denver', category: 'Remote sensing', title: 'Mapping Denver’s growth',
    summary: 'A time-series study of population growth and land cover in Denver, Colorado.',
    detail: 'This study brings census data and remotely sensed land-cover information together to examine how Denver changed over time. It uses machine learning as part of the land-use and land-cover analysis.',
    tags: ['Land use and land cover', 'Census data', 'Machine learning'],
    alt: 'Land-cover maps from the Denver growth study',
    url: original + 'images/Final%20Report_GEOG4450.pdf', label: 'Read the report (PDF)'
  },
  {
    id: 'bike', category: 'GIS', title: 'Better bike routes in Athens',
    summary: 'A cycling suitability map built with BikeAthens and UGA’s Community Mapping Lab.',
    detail: 'The Community Mapping Lab worked with the nonprofit BikeAthens to identify suitable routes through Athens, Georgia. The resulting interactive map lets cyclists explore the route network.',
    tags: ['Community mapping', 'Cycling suitability', 'ArcGIS'],
    alt: 'BikeAthens cycling route suitability map',
    url: 'https://usg.maps.arcgis.com/apps/webappviewer/index.html?id=d8432d71c0f548469f48100de0896cf8', label: 'Open the interactive map'
  },
  {
    id: 'daymet', category: 'Remote sensing', title: 'Patterns in precipitation',
    summary: 'Exploratory time-series analysis of NASA DAYMET precipitation data.',
    detail: 'This undergraduate research project examined precipitation over time using the NASA DAYMET gridded weather dataset. The original presentation documents the analysis.',
    tags: ['DAYMET', 'Climate data', 'Time-series analysis'],
    alt: 'A figure from the DAYMET precipitation analysis',
    url: original + 'DAYMET.html', label: 'Open the original presentation'
  },
  {
    id: 'hotel', category: 'Data analytics', title: 'Hotel revenue dashboard',
    summary: 'A Power BI dashboard for exploring hotel revenue over time.',
    detail: 'The dashboard brings revenue trends and performance metrics together in one view. The screenshot below provides a preview. The original Power BI embed may require sign-in.',
    tags: ['Power BI', 'Business intelligence', 'Revenue analysis'],
    alt: 'Hotel revenue dashboard with charts and summary metrics',
    url: original + 'HotelRevenue_Dashboard.html', label: 'Open the original dashboard'
  },
  {
    id: 'atlanta', category: 'GIS', title: 'Violent crime patterns in Atlanta',
    summary: 'A geostatistical analysis of where violent crime was concentrated in Atlanta, Georgia.',
    detail: 'This project uses geostatistical methods to investigate the spatial distribution of violent crime. The original project page includes the analysis, presentation, and documentation of findings.',
    tags: ['Geostatistics', 'Spatial analysis', 'Atlanta'],
    alt: 'Maps from the Atlanta violent crime analysis',
    url: original + 'AtlCrime.html', label: 'Open the analysis and reports'
  },
  {
    id: 'kaza', category: 'GIS', title: 'Human–elephant conflict in Zimbabwe',
    summary: 'A conservation mapping project in the Kavango Zambezi region.',
    detail: 'This project examines human–elephant conflict in the Zimbabwe portion of the Kavango Zambezi Transfrontier Conservation Area. The map shows conservation designations across the region.',
    tags: ['Conservation', 'Cartography', 'Kavango Zambezi'],
    alt: 'Map of conservation designations in the Kavango Zambezi region',
    url: original + 'kaza.html', label: 'Open the original presentation'
  },
  {
    id: 'canyon', category: 'Personal', title: 'Grand Canyon, 2020',
    summary: 'A photograph from a 2020 trip to the Grand Canyon.',
    detail: 'This Grand Canyon photograph is also the cover image for the portfolio.',
    tags: ['Photography', 'Arizona'],
    alt: 'Layered rock formations at the Grand Canyon',
    url: 'img/canyon.webp', label: 'Open full image'
  },
  {
    id: 'uga', category: 'Personal', title: 'Alma mater',
    summary: 'A University of Georgia Bulldog illustration from the original portfolio.',
    detail: 'This illustration pays tribute to the University of Georgia, where I studied geography and GIS.',
    tags: ['University of Georgia', 'Illustration'],
    alt: 'Illustration of the University of Georgia Bulldog',
    url: 'img/uga.webp', label: 'Open full image'
  }
];

const grid = document.querySelector('#projects');
const filterGroup = document.querySelector('.filters');
const resultCount = document.querySelector('#result-count');
const dialog = document.querySelector('#case-study');

function element(tag, content, className) {
  const node = document.createElement(tag);
  node.textContent = content;
  if (className) node.className = className;
  return node;
}

function openProject(project) {
  document.querySelector('#case-category').textContent = project.category.toUpperCase();
  document.querySelector('#case-title').textContent = project.title;
  document.querySelector('#case-description').textContent = project.detail;
  const image = document.querySelector('#case-image');
  image.src = 'img/' + project.id + '.webp';
  image.alt = project.alt;
  document.querySelector('#case-tags').replaceChildren(...project.tags.map(tag => element('span', tag)));
  const link = document.querySelector('#case-link');
  link.href = project.url;
  link.textContent = project.label;
  dialog.showModal();
}

const cards = projects.map(project => {
  const card = element('article', '', 'project');
  const image = document.createElement('img');
  image.src = 'img/' + project.id + '.webp';
  image.alt = project.alt;
  image.loading = 'lazy';
  const body = element('div', '', 'project-body');
  const button = element('button', 'View project');
  button.type = 'button';
  button.setAttribute('aria-label', 'View project: ' + project.title);
  button.addEventListener('click', () => openProject(project));
  body.append(element('p', project.category.toUpperCase(), 'eyebrow'),
    element('h3', project.title), element('p', project.summary), button);
  card.append(image, body);
  return card;
});
grid.append(...cards);

const filters = ['All projects', 'GIS', 'Remote sensing', 'Data analytics', 'Personal'];
filters.forEach((filter, index) => {
  const button = element('button', filter);
  button.type = 'button';
  button.setAttribute('aria-pressed', String(index === 0));
  button.addEventListener('click', () => {
    for (const option of filterGroup.children) {
      option.setAttribute('aria-pressed', String(option === button));
    }
    cards.forEach((card, cardIndex) => {
      card.hidden = index !== 0 && projects[cardIndex].category !== filter;
    });
    const count = cards.filter(card => !card.hidden).length;
    resultCount.textContent = count + (count === 1 ? ' project shown' : ' projects shown');
  });
  filterGroup.append(button);
});
