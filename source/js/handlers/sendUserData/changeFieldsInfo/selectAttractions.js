let parentContainer = document.querySelector('.attractions-info');
const keyCodeEnter = 13;

export default class AddAtractions{
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
      })
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
    })
  }

  addChoiceOnLabel(){
    this.container.addEventListener('click', (evt)=> {
      let target = evt.target;
      if(target.classList.contains('attractions-info__note')){
        target.parentNode.querySelector('.attractions-info__select').classList.toggle('attractions-info__select--active');
      }
    })
  }
}

export let attractionsHandler = new AddAtractions();
attractionsHandler.addChoiceOnClick();
attractionsHandler.addChoiceOnEnter();
attractionsHandler.addChoiceOnLabel();
