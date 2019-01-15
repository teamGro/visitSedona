let galleryList = document.querySelector('.gallery__list');

export default class LikeHandler {
  constructor(gallery = galleryList){
    this.gallery = gallery;
  }

  addLike(){
    try{
      let likeBtns = this.gallery.querySelectorAll('.gallery__btn-like');
      likeBtns = Array.from(likeBtns);
      this.addLikeHandler(likeBtns);
    } catch(e){
      console.log(e);
    }

  }

  addLikeHandler(arr){
    arr.forEach( i => {
      i.addEventListener('click', ()=> {
        let count = i.parentNode.querySelector('.gallery__like-count');
        if(!i.hasAttribute('data-like')){
          i.setAttribute('data-like', 'like');
          count.textContent = +count.textContent + 1;
        } else {
          count.textContent = +count.textContent - 1;
          i.removeAttribute('data-like');
        }
      })
    })
  }
}
