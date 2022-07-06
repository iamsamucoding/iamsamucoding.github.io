
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



addActiveClassToNavbarItem();

