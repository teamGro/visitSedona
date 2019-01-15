export function getLikes(url) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);

		xhr.onload = ()=> {
			resolve(xhr.responseText);
		};

		xhr.onerror = () => {
			reject(xhr.error);
		};

		xhr.send();
	})
}

export function addNumber(likes, result) {
	for(let i = 0; i < likes.length; i++){
		let idAttr = likes[i].getAttribute('id');
		if(idAttr === result[i].id){
			likes[i].textContent = result[i].quality;
		}
	}
	return;
}

