import {SendData} from './util/sendData';

let btn = document.querySelector('.review__btn-send');
export let userInfoSend = new SendData(btn);
userInfoSend.init();
