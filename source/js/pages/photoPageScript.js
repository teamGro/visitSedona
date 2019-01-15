import photoMenu from '../handlers/openCloseNavMenu/photoMenu';
import LikeHandler from '../handlers/addLikes/likesHandler';
import {getLikes, addNumber} from '../handlers/addLikes/showLikesCount';
import {setLikes, createArrWithNewLike} from "../handlers/addLikes/saveLikesCount";

let likes = new LikeHandler();
likes.addLike();

window.addEventListener('load', ()=> {
	let likesCount = document.querySelectorAll('.photo__like-count');

	getLikes('/getLikes').
		then( res => {
			res = JSON.parse(res);
			addNumber(likesCount, res);
	}).
		catch(err => {
			console.log(err);
	})
});

window.addEventListener('beforeunload', () => {
	let btnLike = document.querySelectorAll('.photo__btn-like');

	setLikes('/setLikes', createArrWithNewLike(btnLike)).
		catch(err => console.log(err));


});
