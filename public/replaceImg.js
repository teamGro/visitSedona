window.addEventListener('load', ()=> {
  let container = document.querySelectorAll('.replaceImg');
  container = Array.from(container);
  container.forEach( i => {
    let source = i.querySelectorAll('source');
    source = Array.from(source);
    let image = i.querySelector('img');

    source.forEach( j => {
      let realsrc = j.getAttribute('data-src');
      //console.log(realsrc);
      image.srcset = j.setAttribute('srcset', realsrc);
    })
  })
});
