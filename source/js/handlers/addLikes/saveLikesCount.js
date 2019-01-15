export function setLikes(url, arr){
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		xhr.onload = ()=> {
			resolve(xhr.responseText);
		};

		xhr.onerror = () => {
			reject(xhr.error);
		};

		arr = JSON.stringify(arr);

		xhr.send(arr);
	})
}

export function createArrWithNewLike(btnLike) {
	let arr = [];

	for(let i = 0; i < btnLike.length; i++){
		if(btnLike[i].hasAttribute('data-like')){
			let imgDescribe = btnLike[i].parentNode.querySelector('.photo__like-count');
			let imgID = imgDescribe.getAttribute('id');
			let imgLikes = imgDescribe.textContent;
			arr.push({id: imgID, quality: imgLikes});
		}

	}
	return arr;
}

