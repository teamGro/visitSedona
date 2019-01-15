import formMenu from '../handlers/openCloseNavMenu/formMenu';

import {userName, userSurname, userPatronym} from '../handlers/sendUserData/setFieldsValue/userInfo';
import {userTel, userEmail} from "../handlers/sendUserData/setFieldsValue/userContactInfo";

import {userImpression} from "../handlers/sendUserData/setFieldsValue/userImpressionInfo";
import {impressionsHandler} from "../handlers/sendUserData/changeFieldsInfo/selectlImpressions";

import {attractionsHandler} from "../handlers/sendUserData/changeFieldsInfo/selectAttractions";
import {userAttraction} from "../handlers/sendUserData/setFieldsValue/userAttractionsInfo";

import {userEmotion} from "../handlers/sendUserData/setFieldsValue/userEmotionInfo";

import {userInfoSend} from "../handlers/sendUserData/sendUserData";

import {formFields} from '../handlers/sendUserData/formFields';
window.addEventListener('load', ()=> {
	for(let key in formFields){
		if(localStorage.getItem(formFields[key].getAttribute('data'))){
			formFields[key].value = localStorage.getItem(formFields[key].getAttribute('data'));
		}
	}
});
