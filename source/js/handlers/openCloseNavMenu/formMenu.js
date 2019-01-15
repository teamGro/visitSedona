import OpenCloseMenu from './classOpenCloseMenu';

let pageControllers = {
	formNav: document.querySelector('.main-navForm'),
	formHeader: document.querySelector('.page-headerForm'),
};

let formMenu = new OpenCloseMenu(pageControllers.formNav, pageControllers.formHeader);
formMenu.open();
formMenu.close();

export default formMenu;
