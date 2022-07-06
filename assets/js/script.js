



///////////////////////////
// GENERAL FUNCTIONS
///////////////////////////

// easy selector helper function
const select = (elem, all = false) => {
    elem = elem.trim()

    if (all) {
        return [...document.querySelectorAll(elem)]
    } else {
        return document.querySelector(elem)
    }
}


const on = (type, elem, listener, all = false) => {
    let selectElem = select(elem, all)

    if (selectElem) {
        if (all) {
            selectElem.forEach(e => e.addEventListener(type, listener))
        } else {
            selectElem.addEventListener(type, listener)
        }
    }
}




function getBaseName() {
    const index = window.location.href.lastIndexOf("/") + 1;
    const basenameWithExtension = window.location.href.slice(index);
    const basename = basenameWithExtension.split(".")[0];

    return basename;
}

function addActiveClassToNavbarItem() {
    const basename = getBaseName();
    const navbarId = "navbar-" + basename;
    
    let element = document.getElementById(navbarId);
    
    if (element) {
        element.classList.add("active");
    }
}

///////////////////////////
// HEADER / MENU BUTTON
///////////////////////////
on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active');
    
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
})




///////////////////////////
// HERO SECTION
///////////////////////////

// PROFESSIONS
// based on: https://github.com/mattboldt/typed.js/
const typed = select('.typed');
if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    
    new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
    });
}

// TYPED CURSOR
setInterval(() => {
    const ele = select('.typed-cursor');
    ele.style.visibility = (ele.style.visibility == 'hidden' ? '' : 'hidden');
}, 500);  // 0.5 secs




///////////////////////////
// CALLING SOME FUNCTIONS
///////////////////////////
addActiveClassToNavbarItem();

