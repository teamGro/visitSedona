import {SaveUserData} from '../util/saveDataInObj';
import {SaveUserInfoRequired} from '../util/saveRequiredData';

let userInfo = {
  name: document.querySelector('#user-name'),
  surname: document.querySelector('#user-surname'),
  patronym: document.querySelector('#user-patronym')
};

export let userName = new SaveUserInfoRequired(userInfo.name);
userName.setUserData(/^[а-яА-ЯёЁa-zA-Z0-9]+$/);
userName.setClass();

export let userSurname = new SaveUserInfoRequired(userInfo.surname);
userSurname.setUserData(/^[а-яА-ЯёЁa-zA-Z0-9]+$/);
userSurname.setClass();

export let userPatronym = new SaveUserData(userInfo.patronym);
userPatronym.setUserData(/^[а-яА-ЯёЁa-zA-Z]+$/);
