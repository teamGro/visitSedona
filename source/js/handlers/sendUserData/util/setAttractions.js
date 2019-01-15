import {data} from '../data';

export class ChooseAttractions {
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
    })
  }

}
