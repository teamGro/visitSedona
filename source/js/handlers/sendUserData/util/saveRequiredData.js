import {SaveUserData} from './saveDataInObj';

export class SaveUserInfoRequired extends SaveUserData {
  checkData() {
    this.field.addEventListener('input', (evt) => {
      this.addClass(this.field);
      this.removeClass(this.field);
    })
  }

  setClass(){
    this.field.addEventListener('focus', () => {
      this.field.classList.add('required-field');
      this.checkData();
		this.field.classList.remove('empty-field');
    })
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
