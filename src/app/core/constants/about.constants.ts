import { Tool } from '../models/tool.model';

/**
 * Content of the public "Cómo se construyó" page.
 * Paste the YouTube video id here once the demo video is uploaded
 * (from https://youtu.be/AbC123xyz the id is AbC123xyz).
 */
export const DEMO_VIDEO_ID = '';

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

/** Steps followed to build the site, shown as a numbered list. */
export const BUILD_STEPS = ['design', 'setup', 'structure', 'styles', 'data', 'pages', 'deploy'] as const;
