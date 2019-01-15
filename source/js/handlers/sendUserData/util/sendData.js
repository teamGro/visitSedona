import {data} from '../data';
import {formFields} from '../formFields';

let template = document.querySelector('#form-result-template').content;
let fragment = document.createDocumentFragment();
let fail = template.querySelector('.form-notSend');
let success = template.querySelector('.form-send');
let container = document.querySelector('.review');

export class SendData {
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
	  container.appendChild(fragment);
	  let btn = container.querySelector(btnClass);

	  btn.addEventListener('click', ()=> {
		  container.removeChild(fragment);
	  })
  }

  init(){
    this.btn.addEventListener('click', (e)=> {
		 e.preventDefault();

		 this.checkRequiredFields(formFields);

      if(document.body.querySelector('.required-field')){
			let emptyFields = document.body.querySelectorAll('.required-field')
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

			  }
			  xhr.send(message);

			  this.showPopup(success, '.main-btn--send');
		  }
    })
  }
}
