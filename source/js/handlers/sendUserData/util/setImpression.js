import {data} from '../data';

export class ChooseItem {
  constructor(container){
    this.container = container;
  }

  getElem(){
    this.container.addEventListener('click', evt => {
      let target = evt.target;
      if(!target.closest('.impression-info__elem')) return;

      let parent = target.closest('.impression-info__elem');
      data[this.container.getAttribute('data')].title = parent.querySelector('.impression-info__note').textContent;
    })
  }

}
