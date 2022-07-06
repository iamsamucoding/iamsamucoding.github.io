



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
// HERO SECTION
///////////////////////////

// TYPED CURSOR
setInterval(() => {
    const ele = select('.typed-cursor');
    ele.style.visibility = (ele.style.visibility == 'hidden' ? '' : 'hidden');
}, 500);  // 0.5 secs




///////////////////////////
// CALLING SOME FUNCTIONS
///////////////////////////
addActiveClassToNavbarItem();

