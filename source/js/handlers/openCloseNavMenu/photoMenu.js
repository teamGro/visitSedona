import OpenCloseMenu from './classOpenCloseMenu';

let pageControllers = {
	photoNav: document.querySelector('.main-navPhoto'),
	photoHeader: document.querySelector('.page-headerPhoto')
};

let photoMenu = new OpenCloseMenu(pageControllers.photoNav, pageControllers.photoHeader);
photoMenu.open();
photoMenu.close();

export default photoMenu;
