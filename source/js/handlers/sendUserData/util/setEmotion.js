import {data} from '../data';

export class DescribeEmotions {
  constructor(container) {
    this.container = container;
  }

  saveReview(myClass){
    let elem = this.container.querySelector(myClass);
    elem.addEventListener('blur', ()=> {
      data[this.container.getAttribute('data')].text = elem.value;
		localStorage.setItem(this.container.getAttribute('data'), elem.value);
	 })
  }
}
