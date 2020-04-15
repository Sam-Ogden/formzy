import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

const theme = {
  ...themes.dark,
  brandTitle: 'Formzy',
  brandUrl: 'https://example.com',
  brandImage: ''
};

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'right',
  sidebarAnimations: true,
  enableShortcuts: true,
  isToolshown: true,
  theme,
  selectedPanel: 'docs'
});
