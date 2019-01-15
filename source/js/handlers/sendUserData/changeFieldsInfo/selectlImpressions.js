let enterKeyCode = 13;
let impressionCont = document.querySelector('.impression-info__wrapper');

export default class SelectImpres {
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
    this.container.addEventListener('click', (evt) => {this.clickOnDiv(evt)});
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
    })
  }


}

export let impressionsHandler = new SelectImpres();
impressionsHandler.addClassBySelect();
impressionsHandler.addClassByLabel();
