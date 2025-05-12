const NAV_BAR = document.getElementById('navBar');
const NAV_LIST = document.getElementById('navList');
const HERO_HEADER = document.getElementById('heroHeader');
const HAMBURGER_BTN = document.getElementById('hamburgerBtn');
const NAV_LINKS = Array.from( document.querySelectorAll('.nav__list-link'));
const SERVICE_BOXES = document.querySelectorAll('.service-card__box');
const ACTIVE_LINK_CLASS = 'active';
const BREAKPOINT = 576;

let currentServiceBG = null;
let currentActiveLink = document.querySelector('.nav__list-link.active');


const resetActiveState = ()=>{
  NAV_LIST.classList.remove('nav--active');
  Object.assign(NAV_LIST.style, {
    height: null
  });
  Object.assign(document.body.style, {
    overflowY: null
  });
}


const addPaddingToHeroHeaderFn = () => {
  const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
  const HEIGHT_IN_REM = NAV_BAR_HEIGHT / 10;

  
  if (NAV_LIST.classList.contains('nav--active')) {
    return;
  }
  Object.assign(HERO_HEADER.style, {
    paddingTop: HEIGHT_IN_REM + 'rem'
  });
}
addPaddingToHeroHeaderFn();
window.addEventListener('resize', ()=>{
  addPaddingToHeroHeaderFn();

  
  if(window.innerWidth >= BREAKPOINT){
    addPaddingToHeroHeaderFn();
    resetActiveState();
  }
});


window.addEventListener('scroll', ()=>{
  const sections = document.querySelectorAll('#heroHeader, #services, #works, #contact');

  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
    if (window.scrollY >= sectionTop - NAV_BAR_HEIGHT) {
      const ID = section.getAttribute('id');
      const LINK = NAV_LINKS.filter(link => {
        return link.href.includes('#'+ID);
      })[0];
      console.log(LINK);
      currentActiveLink.classList.remove(ACTIVE_LINK_CLASS);
      LINK.classList.add(ACTIVE_LINK_CLASS);
      currentActiveLink = LINK;
    }
  });
});


HAMBURGER_BTN.addEventListener('click', ()=>{
  NAV_LIST.classList.toggle('nav--active');
  if (NAV_LIST.classList.contains('nav--active')) {
    Object.assign(document.body.style, {
      overflowY: 'hidden'
    });
    Object.assign(NAV_LIST.style, {
      height: '100vh'
    });
    return;
  }
  Object.assign(NAV_LIST.style, {
    height: 0
  });
  Object.assign(document.body.style, {
    overflowY: null
  });
});


NAV_LINKS.forEach(link => {
  link.addEventListener('click', ()=>{
    resetActiveState();
    link.blur();
  })
})


SERVICE_BOXES.forEach(service => {
  const moveBG = (x, y) => {
    Object.assign(currentServiceBG.style, {
      left: x + 'px',
      top: y + 'px',
    })
  }
  service.addEventListener('mouseenter', (e) => {
    if (currentServiceBG === null) {
      currentServiceBG = service.querySelector('.service-card__bg');
    }
    moveBG(e.clientX, e.clientY);
  });
  service.addEventListener('mousemove', (e) => {
    const LEFT = e.clientX - service.getBoundingClientRect().left;
    const TOP = e.clientY - service.getBoundingClientRect().top;
    moveBG(LEFT, TOP);
  });
  service.addEventListener('mouseleave', () => {
    const IMG_POS = service.querySelector('.service-card__illustration')
    const LEFT = IMG_POS.offsetLeft + currentServiceBG.getBoundingClientRect().width;
    const TOP = IMG_POS.offsetTop + currentServiceBG.getBoundingClientRect().height;

    moveBG(LEFT, TOP);
    currentServiceBG = null;
  });
});


new SweetScroll({
  trigger: '.nav__list-link',
  easing: 'easeOutQuint',
  offset: NAV_BAR.getBoundingClientRect().height - 80
});
