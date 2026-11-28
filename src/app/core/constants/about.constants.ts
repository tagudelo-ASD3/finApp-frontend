import { Tool } from '../models/tool.model';

// Demo video shared from the university OneDrive (SharePoint links can't be embedded, so the page links to it).
export const DEMO_VIDEO_URL = 'https://laiberocol-my.sharepoint.com/:v:/g/personal/tagudelo_estudiante_ibero_edu_co/IQB18bVztakJRIM_7L9fz2f3AdqR_9ChvQn-YBj_IXiDZK8?e=IdZdWV';

export const REPOSITORY_URL = 'https://github.com/tagudelo-ASD3/finApp-frontend';

export const TOOLS: Tool[] = [
  { name: 'Figma', icon: 'palette', reasonKey: 'about.tools.figma' },
  { name: 'Angular 22', icon: 'layers', reasonKey: 'about.tools.angular' },
  { name: 'TypeScript', icon: 'code', reasonKey: 'about.tools.typescript' },
  { name: 'SCSS', icon: 'palette', reasonKey: 'about.tools.scss' },
  { name: 'ngx-translate', icon: 'globe', reasonKey: 'about.tools.translate' },
  { name: 'Visual Studio Code', icon: 'code', reasonKey: 'about.tools.vscode' },
  { name: 'Git y GitHub', icon: 'layers', reasonKey: 'about.tools.github' },
  { name: 'GitHub Pages', icon: 'globe', reasonKey: 'about.tools.pages' },
];

export const BUILD_STEPS = ['design', 'setup', 'structure', 'styles', 'data', 'pages', 'deploy'] as const;
