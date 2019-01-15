import OpenCloseMenu from './classOpenCloseMenu';

let pageControllers = {
  mainNav: document.querySelector('.main-nav'),
  pageHeader: document.querySelector('.page-header'),
};

let indexMenu = new OpenCloseMenu(pageControllers.mainNav, pageControllers.pageHeader);
indexMenu.open();
indexMenu.close();

export default indexMenu;
