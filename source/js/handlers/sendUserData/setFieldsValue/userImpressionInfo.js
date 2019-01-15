import {ChooseItem} from '../util/setImpression';
let impressionsContainer = document.querySelector('.impression-info');

export let userImpression = new ChooseItem(impressionsContainer);
userImpression.getElem();
