import { $q } from '../helpers/selectors.js';

const pageTitle = $q('#page-title');
pageTitle.textContent = 'Hi there!';

console.log(`${pageTitle.textContent}`);
