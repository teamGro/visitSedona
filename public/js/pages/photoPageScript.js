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
	photoNav: document.querySelector('.main-navPhoto'),
	photoHeader: document.querySelector('.page-headerPhoto')
};

let photoMenu = new OpenCloseMenu(pageControllers.photoNav, pageControllers.photoHeader);
photoMenu.open();
photoMenu.close();

let galleryList = document.querySelector('.gallery__list');

class LikeHandler {
  constructor(gallery = galleryList){
    this.gallery = gallery;
  }

  addLike(){
    try{
      let likeBtns = this.gallery.querySelectorAll('.gallery__btn-like');
      likeBtns = Array.from(likeBtns);
      this.addLikeHandler(likeBtns);
    } catch(e){
      console.log(e);
    }

  }

  addLikeHandler(arr){
    arr.forEach( i => {
      i.addEventListener('click', ()=> {
        let count = i.parentNode.querySelector('.gallery__like-count');
        if(!i.hasAttribute('data-like')){
          i.setAttribute('data-like', 'like');
          count.textContent = +count.textContent + 1;
        } else {
          count.textContent = +count.textContent - 1;
          i.removeAttribute('data-like');
        }
      });
    });
  }
}

function getLikes(url) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);

		xhr.onload = ()=> {
			resolve(xhr.responseText);
		};

		xhr.onerror = () => {
			reject(xhr.error);
		};

		xhr.send();
	})
}

function addNumber(likes, result) {
	for(let i = 0; i < likes.length; i++){
		let idAttr = likes[i].getAttribute('id');
		if(idAttr === result[i].id){
			likes[i].textContent = result[i].quality;
		}
	}
	return;
}

function setLikes(url, arr){
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		xhr.onload = ()=> {
			resolve(xhr.responseText);
		};

		xhr.onerror = () => {
			reject(xhr.error);
		};

		arr = JSON.stringify(arr);

		xhr.send(arr);
	})
}

function createArrWithNewLike(btnLike) {
	let arr = [];

	for(let i = 0; i < btnLike.length; i++){
		if(btnLike[i].hasAttribute('data-like')){
			let imgDescribe = btnLike[i].parentNode.querySelector('.photo__like-count');
			let imgID = imgDescribe.getAttribute('id');
			let imgLikes = imgDescribe.textContent;
			arr.push({id: imgID, quality: imgLikes});
		}

	}
	return arr;
}

let likes = new LikeHandler();
likes.addLike();

window.addEventListener('load', ()=> {
	let likesCount = document.querySelectorAll('.photo__like-count');

	getLikes('/getLikes').
		then( res => {
			res = JSON.parse(res);
			addNumber(likesCount, res);
	}).
		catch(err => {
			console.log(err);
	});
});

window.addEventListener('beforeunload', () => {
	let btnLike = document.querySelectorAll('.photo__btn-like');

	setLikes('/setLikes', createArrWithNewLike(btnLike)).
		catch(err => console.log(err));


});

}());
