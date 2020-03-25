const navList = document.querySelectorAll('.list__item');
const list = document.querySelector('.list');
const logo = document.querySelector('.logo');
const menu = document.querySelector('.menu');
const arrow = document.querySelector('.arrow');
const about = document.querySelector('.about__content');
const skill = document.querySelector('.skill__content');
const contact = document.querySelector('.contact__content');
const loading = document.querySelector('.loading');
const navHeight = document.querySelector('nav').offsetHeight;
const aboutTop = document.querySelector('.about').offsetTop;
const skillTop = document.querySelector('.skill').offsetTop;
const portfolioTop = document.querySelector('.portfolio').offsetTop;
const contactTop = document.querySelector('.contact').offsetTop;
const mask = document.querySelectorAll('.mask');
const lightBox = document.querySelector('.lightBox');
let listChick = true;
loadingDisappear();
(() => {
  const request = new XMLHttpRequest();
  request.open(
    'get',
    './lightBoxData.json'
  );
  request.send('null');
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      mask.forEach((item, index) => {
        mask[index].addEventListener('click', () => {
          lightBox.classList.add('lightBox-active');
          const id = index;
          renderBox(id, data);
        }, true)
      })
    }
  }
})()
resetColor();
window.addEventListener('scroll', debounce(getScroll));
navList.forEach((item, index) => {
  navList[index].addEventListener('click', (e) => {
    const target = e.target.innerText;
    switch (target) {
      case 'ABOUT' :
        scroll(aboutTop - navHeight);
        break;
      case 'SKILL' :
        scroll(skillTop - navHeight);
        break;
      case 'PORTFOLIO' :
        scroll(portfolioTop - navHeight);
        break;
      case 'CONTACT' :
        scroll(contactTop - navHeight);
        break;
      default :
        break;
    }
  })
});
logo.addEventListener('click', () => {
  scroll(0);
});
menu.addEventListener('click', () => {
  if (listChick) {
    list.classList.add('list-active');
    listChick = false;
  } else {
    list.classList.remove('list-active');
    listChick = true;
  }
})

function scroll(topPosition) {
  window.scrollTo({ top: topPosition, behavior: 'smooth' });
}
function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
function getScroll() {
  let scrollAt = window.scrollY + window.screen.height * 0.8;
  domAppear(scrollAt, aboutTop, about, 'about__content-active');
  domAppear(scrollAt, skillTop, skill, 'skill__content-active');
  domAppear(scrollAt, contactTop, contact, 'contact__content-active');
}
function domAppear(scrollAt, domTop, dom, domClass) {
  if(scrollAt > domTop) dom.classList.add(domClass)
  else dom.classList.remove(domClass)
}
function renderBox(id, data) {
  let title = `
      <h3 class="title">${data[id].name}</h3>
      <h4 class="mt-30">${data[id].description}</h4>
      <p class="mt-30">
        <a href="${data[id].demo}" class="button mr-10" target="_blank">Demo</a>
        <a href="${data[id].github}" class="button" target="_blank">Github</a>
      </p>
      <div class="container mt-30"></div>
      <span class="close position-absolute">
        <i class="fas fa-times"></i>
      </span>
    `;
    lightBox.innerHTML = title;
    const closeBtn = document.querySelector('.close');
    const container = document.querySelector('.lightBox .container');
    let img = '';
    data[id].img.forEach((item) => {
      img += `<img class="mt-10" src="${item}">`;
    });
    container.innerHTML = img;
    closeBtn.addEventListener('click', () => {
      lightBox.innerHTML = '';
      lightBox.classList.remove('lightBox-active');
    })
}
function resetColor() {
  setTimeout(() => {
    arrow.classList.add('arrow-active');
    changeColor();
  },1000);
}
function changeColor() {
  setTimeout(() => {
    arrow.classList.remove('arrow-active');
    resetColor();
  },1500);
}
function loadingDisappear() {
  setTimeout(() => {
    loading.classList.add('loading-active');
  },2500);
}