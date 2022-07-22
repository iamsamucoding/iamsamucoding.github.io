



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
// SEARCHING POSTS ON BLOG PAGE
///////////////////////////
if (window.location.href.includes("/blog")) {
    fetch('/posts.json')
        .then(response => response.json())
        .then(posts => {
            console.log(posts);
            const postSearch = document.getElementById("post-search-input");

            const options = {
                includeScore: true,
                threshold: 0,
                useExtendedSearch: true,
                keys: ['title', 'subtitle', 'tags', 'date', 'description']
            };

            const fuse = new Fuse(posts, options);

            postSearch.addEventListener("keyup", event => {
                const key = event.target.value;
                let postsDiv = document.getElementById("posts");
                let filteredPostsDiv = document.getElementById("filtered-posts");
                let postSearchResultsDiv = document.getElementById("post-search-results");
                
                if (key.length == 0) {
                    postsDiv.classList.remove('d-none');
                    filteredPostsDiv.innerHTML = '';
                    postSearchResultsDiv.innerText = '';

                    return;
                }
                
                // key > 0
                postsDiv.classList.add('d-none');

                // include-match
                const filteredPosts = fuse.search(`'${key}`);
                console.log(filteredPosts.length);

                let postResultText = "No post found!";
                
                if (filteredPosts.length > 0) {
                    postResultText = `Found ${filteredPosts.length} posts!`;
                 
                    let innerHtml = `<div class="row post-list">`;

                    for (const filtedPostIdx in filteredPosts) {
                        const post = filteredPosts[filtedPostIdx].item;

                        innerHtml += postCardHtml(post);
                    }
                    
                    innerHtml += `</div>`;

                    filteredPostsDiv.innerHTML = innerHtml;
                }
                
                postSearchResultsDiv.innerText = postResultText;
            });
        })
        .catch(err => console.log(err));
}


const postCardHtml = (post) => {
    let thumbnail = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22316%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20316%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17f48594a84%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17f48594a84%22%3E%3Crect%20width%3D%22316%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.19921875%22%20y%3D%2297.35%22%3EImage%20cap%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

    if (post.thumbnail) {
        thumbnail = post.thumbnail;
    }
    else if (post.cover) {
        thumbnail = post.cover;
    }

    let html = `
    <div class="col-sm-6 col-md-4 mb-3">
        <div class="card post-card">
            <img class="card-img-top" src=${thumbnail} alt="Post cover">
            <div class="card-body">
                <h4 class="card-title mb-3">${post.title}</h4>
                <h6 class="card-subtitle mb-2 text-muted">
                    <i class="far fa-fw fa-calendar-alt" aria-hidden="true"></i>
                    <time datetime="${post.date}">${post.date}<time> •
                    ${post.estimated_reading_time} min read
                </h6>
    `;

    if (post.tags.size > 0) {
        html += `
                <h6 class="text-muted">
                    <i class="fas fa-tags"></i>
        `;

        for (const tag in post.tags) {
            html += `
                    <span class="tag-item">${tag}</span>
            `;
        }
        html += `
                </h6>
        `;
    }

    html += `
                <p class="card-text mt-3">${post.excerpt}</p>
                <a href="${post.url}" class="stretched-link"></a>
            </div>
        </div>
    </div>
    `;

    return html;
};




///////////////////////////
// CALLING SOME FUNCTIONS
///////////////////////////
addActiveClassToNavbarItem();

