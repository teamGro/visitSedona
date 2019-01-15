import {DescribeEmotions} from '../util/setEmotion';

let container = document.querySelector('.emotion-info');
console.log(container);

export let userEmotion = new DescribeEmotions(container);
userEmotion.saveReview('.emotion-info__personal');
