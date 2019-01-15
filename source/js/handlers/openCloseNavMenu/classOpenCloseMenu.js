export default class OpenCloseMenu {
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
      })
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
