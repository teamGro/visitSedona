(function () {
'use strict';

class OpenCloseMenu {
  constructor(menu, header){
    this.menu = menu;
    this.header = header;
  }

  open(){
    if(document.querySelector('.page-header__menu-active')){
      let btnMenuOpen = document.querySelector('.page-header__menu-active');
      btnMenuOpen.addEventListener('click', ()=> {
        this.header.classList.remove('page-header--menu-close');
        this.menu.classList.remove('main-nav--close');
      });
    } else {
      return;
    }
  }

  close(){
    if(document.querySelector('.main-nav__close-menu')){
      let closeMenu = document.querySelector('.main-nav__close-menu');
      closeMenu.addEventListener('click', ()=> {
        this.menu.classList.add('main-nav--close');
        this.header.classList.add('page-header--menu-close');
      });
    } else {
      return;
    }
  }
}

let pageControllers = {
  mainNav: document.querySelector('.main-nav'),
  pageHeader: document.querySelector('.page-header'),
};

let indexMenu = new OpenCloseMenu(pageControllers.mainNav, pageControllers.pageHeader);
indexMenu.open();
indexMenu.close();

const map = new GMaps({
	el: '#map',
	lat:  34.8543734,
	lng: -111.8301581
});

map.addMarker({
	lat: 34.8543734,
	lng: -111.8301581,
	title: 'Sedona AZ'
});

map.setZoom(8);


//34.870978, -111.763020  34.8543734,-111.8301581

}());
