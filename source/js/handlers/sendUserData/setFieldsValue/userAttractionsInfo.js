import {ChooseAttractions} from '../util/setAttractions';
let attractionsContainer = document.querySelector('.attractions-info');

export let userAttraction = new ChooseAttractions(attractionsContainer);
userAttraction.getElem();
