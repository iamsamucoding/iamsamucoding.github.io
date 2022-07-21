



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



///////////////////////////
// HIGHLIGHT MENU LINK
///////////////////////////
function getBaseName() {
    const index = window.location.href.lastIndexOf("/") + 1;
    const basenameWithExtension = window.location.href.slice(index);
    const basename = basenameWithExtension.split(".")[0];

    return basename;
}

function addActiveClassToNavbarItem() {
    const basename = getBaseName();
    
    let navbarId = "navbar-" + basename;
    
    if ((basename == '') || (basename[0] == '#')) {
        navbarId = "navbar-home";
    }

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
const typedCursor = select('.typed-cursor');
if (typedCursor) {
    setInterval(() => {
        typedCursor.style.visibility = (typedCursor.style.visibility == 'hidden' ? '' : 'hidden');
    }, 500);  // 0.5 secs
}


// ADDING A DYNAMIC LINK BUTTON FOR ANY HEADING OF A POST PAGE
const postHeadings = select(".post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6", all = true)
for (const heading of postHeadings) {
    heading.insertAdjacentHTML('beforeend', `<a href="#${heading.id}" rel="nofollow noopener noreferrer"><i class="bi bi-link-45deg"></i></a>`)
}


///////////////////////////
// CALLING SOME FUNCTIONS
///////////////////////////
addActiveClassToNavbarItem();

