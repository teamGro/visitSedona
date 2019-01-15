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
	formNav: document.querySelector('.main-navForm'),
	formHeader: document.querySelector('.page-headerForm'),
};

let formMenu = new OpenCloseMenu(pageControllers.formNav, pageControllers.formHeader);
formMenu.open();
formMenu.close();

let data = {
  'user-info': {
    'user-name': localStorage.getItem('user-name') || '',
    'user-surname': localStorage.getItem('user-surname') || '',
    'user-patronym': localStorage.getItem('user-patronym') || ''
  },

  'contact-info': {
    'user-tel': localStorage.getItem('user-tel') || '',
    'user-email': localStorage.getItem('user-email') || ''
  },

  'impression-info': {
    title: 'Скорее положительное'
  },

  'attractions-info': {
    bridge: false,
    mountain: false,
    park: false,
    rocks: false
  },

  'emotion-info': {
    text: localStorage.getItem('emotion-info') || null
  }
};

class SaveUserData {
  constructor(field){
    this.field = field;
  }

  setUserData(exp){
    this.field.addEventListener('blur', (evt) => {
      let target = evt.target;
      if(arguments[0]){
			if(!exp.test(target.value)) {
				target.classList.add('error-field');
				return;
			}
		}

      let parent;
      let oldTarget = target;
      while(target.tagName !== 'FORM'){
        if(target.tagName === 'FIELDSET'){
          parent = target;
          break;
        } else {
          target = target.parentNode;
        }
      }
      data[parent.getAttribute('data')][oldTarget.getAttribute('data')] = oldTarget.value;
		localStorage.setItem(oldTarget.getAttribute('data'), oldTarget.value);
    });
  }
}

class SaveUserInfoRequired extends SaveUserData {
  checkData() {
    this.field.addEventListener('input', (evt) => {
      this.addClass(this.field);
      this.removeClass(this.field);
    });
  }

  setClass(){
    this.field.addEventListener('focus', () => {
      this.field.classList.add('required-field');
      this.checkData();
		this.field.classList.remove('empty-field');
    });
  }

  addClass(elem){
    if(elem.value === '') {
      elem.classList.add('required-field');
    }
  }

  removeClass(elem){
    if(elem.value !== '') {
      elem.classList.remove('required-field');
    }
  }
}

let userInfo = {
  name: document.querySelector('#user-name'),
  surname: document.querySelector('#user-surname'),
  patronym: document.querySelector('#user-patronym')
};

let userName = new SaveUserInfoRequired(userInfo.name);
userName.setUserData(/^[а-яА-ЯёЁa-zA-Z0-9]+$/);
userName.setClass();

let userSurname = new SaveUserInfoRequired(userInfo.surname);
userSurname.setUserData(/^[а-яА-ЯёЁa-zA-Z0-9]+$/);
userSurname.setClass();

let userPatronym = new SaveUserData(userInfo.patronym);
userPatronym.setUserData(/^[а-яА-ЯёЁa-zA-Z]+$/);

let userInfo$1 = {
  tel: document.querySelector('#user-tel'),
  email: document.querySelector('#user-mail'),
  expTel: /[0-9]{6,10}/,
  expEmail: /^[-\w]+@([A-z0-9][-A-z0-9]+\.)+[A-z]$/
};

let userTel = new SaveUserInfoRequired(userInfo$1.tel);
userTel.setUserData(userInfo$1.expTel);
userTel.setClass();

let userEmail = new SaveUserInfoRequired(userInfo$1.email);
userEmail.setUserData();
userEmail.setClass();

class ChooseItem {
  constructor(container){
    this.container = container;
  }

  getElem(){
    this.container.addEventListener('click', evt => {
      let target = evt.target;
      if(!target.closest('.impression-info__elem')) return;

      let parent = target.closest('.impression-info__elem');
      data[this.container.getAttribute('data')].title = parent.querySelector('.impression-info__note').textContent;
    });
  }

}

let impressionsContainer = document.querySelector('.impression-info');

let userImpression = new ChooseItem(impressionsContainer);
userImpression.getElem();

let enterKeyCode = 13;
let impressionCont = document.querySelector('.impression-info__wrapper');

class SelectImpres {
  constructor(container = impressionCont){
    this.container = container;
  }

  getParentElem(){
    return Array.from(this.container.querySelectorAll('.impression-info__elem'));
  }

  getActiveElem(){
    let activeElem;
    let parent = this.getParentElem();
    parent.forEach( i => {
      let child = Array.from(i.children);
      child.map( i => {
        if(i.classList.contains('impression-info__select--active')){
          activeElem = i;
        }
      });
    });
    return activeElem;
  }

  clickOnDiv(evt){
    let activeEl = this.getActiveElem();
    let target = evt.target;
    if(target.classList.contains('impression-info__select')){
      activeEl.classList.remove('impression-info__select--active');
      target.classList.add('impression-info__select--active');
    } else {
      return;
    }
  }

  addClassBySelect(){
    this.container.addEventListener('click', (evt) => {this.clickOnDiv(evt);});
    this.container.addEventListener('keydown', (evt) => {
      if(evt.keyCode == enterKeyCode){
        this.clickOnDiv(evt);
      }
    });
  }

  clickOnLabel(evt){
    let activeEl = this.getActiveElem();
    let target = evt.target;
    if(target.classList.contains('impression-info__note')){
      activeEl.classList.remove('impression-info__select--active');
      let newActive = target.parentNode;
      newActive = newActive.querySelector('.impression-info__select');
      newActive.classList.add('impression-info__select--active');
    } else {
      return;
    }
  }

  addClassByLabel(){
    this.container.addEventListener('click', (evt)=> {
      this.clickOnLabel(evt);
    });
    this.container.addEventListener('keydown', (evt)=> {
      if(evt.keyCode === enterKeyCode){
        this.clickOnLabel(evt);
      }
    });
  }


}

let impressionsHandler = new SelectImpres();
impressionsHandler.addClassBySelect();
impressionsHandler.addClassByLabel();

let parentContainer = document.querySelector('.attractions-info');
const keyCodeEnter = 13;

class AddAtractions{
  constructor(container = parentContainer){
    this.container = parentContainer;
  }

  evtHandler(evt){
    let target = evt.target;
    if(!target.classList.contains('attractions-info__select')){
      return;
    }
    target.classList.toggle('attractions-info__select--active');
  }

  addChoiceOnClick(){
    try {
      this.container.addEventListener('click', (evt)=> {
        this.evtHandler(evt);
      });
    } catch(e){
      console.log(e);
    }

}

  addChoiceOnEnter(){
    this.container.addEventListener('keydown', (evt)=> {
      if(evt.keyCode == keyCodeEnter){
        this.evtHandler(evt);
      } else {
        return;
      }
    });
  }

  addChoiceOnLabel(){
    this.container.addEventListener('click', (evt)=> {
      let target = evt.target;
      if(target.classList.contains('attractions-info__note')){
        target.parentNode.querySelector('.attractions-info__select').classList.toggle('attractions-info__select--active');
      }
    });
  }
}

let attractionsHandler = new AddAtractions();
attractionsHandler.addChoiceOnClick();
attractionsHandler.addChoiceOnEnter();
attractionsHandler.addChoiceOnLabel();

class ChooseAttractions {
  constructor(container){
    this.container = container;
  }

  getElem(){
    this.container.addEventListener('click', evt => {
      let target = evt.target;
      if(!target.closest('.attractions-info__elem')) return;

      let parent = target.closest('.attractions-info__elem');
      let activeItem = parent.querySelector('.attractions-info__note');
      data[this.container.getAttribute('data')][activeItem.getAttribute('data')] = true;
      console.log(data['attractions-info']);
    });
  }

}

let attractionsContainer = document.querySelector('.attractions-info');

let userAttraction = new ChooseAttractions(attractionsContainer);
userAttraction.getElem();

class DescribeEmotions {
  constructor(container) {
    this.container = container;
  }

  saveReview(myClass){
    let elem = this.container.querySelector(myClass);
    elem.addEventListener('blur', ()=> {
      data[this.container.getAttribute('data')].text = elem.value;
		localStorage.setItem(this.container.getAttribute('data'), elem.value);
	 });
  }
}

let container = document.querySelector('.emotion-info');
console.log(container);

let userEmotion = new DescribeEmotions(container);
userEmotion.saveReview('.emotion-info__personal');

let myForm = document.querySelector('.review__form');
const formFields = {
	userName: myForm.querySelector('#user-name'),
	userSurname: myForm.querySelector('#user-surname'),
	userPatronym: myForm.querySelector('#user-patronym'),

	userTel: myForm.querySelector('#user-tel'),
	userMail: myForm.querySelector('#user-mail'),

	userEmotion: myForm.querySelector('.emotion-info__personal')
};

let template = document.querySelector('#form-result-template').content;
let fragment = document.createDocumentFragment();
let fail = template.querySelector('.form-notSend');
let success = template.querySelector('.form-send');
let container$1 = document.querySelector('.review');

class SendData {
  constructor(btn){
    this.btn = btn;
  }

  checkRequiredFields(fields){
	  for(let key in fields){
		  if(fields[key].value !== ''){
			  fields[key].classList.remove('required-field');
		  }
	  }
  }

  showPopup(condition, btnClass){
	  fragment = condition.cloneNode(true);
	  container$1.appendChild(fragment);
	  let btn = container$1.querySelector(btnClass);

	  btn.addEventListener('click', ()=> {
		  container$1.removeChild(fragment);
	  });
  }

  init(){
    this.btn.addEventListener('click', (e)=> {
		 e.preventDefault();

		 this.checkRequiredFields(formFields);

      if(document.body.querySelector('.required-field')){
			let emptyFields = document.body.querySelectorAll('.required-field');
			for(let i = 0; i < emptyFields.length; i++){
				emptyFields[i].classList.add('empty-field');
			}
        this.showPopup(fail, '.main-btn-notSend');
		  }
		  else if(document.body.querySelector('.error-field')){
			  this.showPopup(fail, '.main-btn-notSend');
		  }
		  else {
			  let xhr = new XMLHttpRequest();
			  xhr.open('POST', '/save-data');
			  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			  let message = JSON.stringify(data);
			  xhr.onload = ()=> {
				  if(xhr.status == 200){
					  console.log('ok');
				  } else {
					  console.log(xhr.responseText);
				  }

			  };
			  xhr.send(message);

			  this.showPopup(success, '.main-btn--send');
		  }
    });
  }
}

let btn = document.querySelector('.review__btn-send');
let userInfoSend = new SendData(btn);
userInfoSend.init();

window.addEventListener('load', ()=> {
	for(let key in formFields){
		if(localStorage.getItem(formFields[key].getAttribute('data'))){
			formFields[key].value = localStorage.getItem(formFields[key].getAttribute('data'));
		}
	}
});

}());
