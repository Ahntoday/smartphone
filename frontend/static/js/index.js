import Home from './views/Home.js';
import Alarm from './views/Alarm.js';
import Memo from './views/Memo.js';
import Photo from './views/Photo.js';

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/alarm", view: Alarm },
        { path: "/memo", view: Memo },
        { path: "/photo", view: Photo }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }
    const view = new match.route.view(); // 새로운 인스턴스를 생성한다.

    document.querySelector("#header_back_btn").style.visibility = await view.getBackBtnVisibility();
    document.querySelector("#header_new_btn").style.visibility = await view.getNewBtnVisibility();
    document.querySelector("#section").innerHTML = await view.getSectionHtml();
    await view.getHeaderClockHtml();

    runJS(match.route.path, view);
};

const runJS = (path, view) => {
    if (path == '/') {
        view.runHomeJS();
    }

    if (path == '/alarm') {
        view.runAlarmJS();
    }

    if (path == '/memo') {
        view.runMemoJS();
    }

    if (path == '/photo') {
        view.runPhotoJS();
    }
}

const navigateToclickHref = () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    navigateToclickHref();
    router();
});