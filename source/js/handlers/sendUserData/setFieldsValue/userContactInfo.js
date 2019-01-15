import {SaveUserInfoRequired} from '../util/saveRequiredData';

let userInfo = {
  tel: document.querySelector('#user-tel'),
  email: document.querySelector('#user-mail'),
  expTel: /[0-9]{6,10}/,
  expEmail: /^[-\w]+@([A-z0-9][-A-z0-9]+\.)+[A-z]$/
};

export let userTel = new SaveUserInfoRequired(userInfo.tel);
userTel.setUserData(userInfo.expTel);
userTel.setClass();

export let userEmail = new SaveUserInfoRequired(userInfo.email);
userEmail.setUserData();
userEmail.setClass();
