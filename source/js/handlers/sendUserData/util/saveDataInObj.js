import {data} from '../data';

export class SaveUserData {
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
		localStorage.setItem(oldTarget.getAttribute('data'), oldTarget.value)
    })
  }
}
