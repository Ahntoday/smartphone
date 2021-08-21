import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getBackBtnVisibility() {
        return "hidden";
    }

    async getNewBtnVisibility() {
        return "hidden";
    }

    async getSectionHtml() {
        return `
        <h2 class="hidden">홈 화면</h2>
        <div class="app">
            <a href="/alarm" class="nav_link" data-link>알람</a>
        </div>
        <div class="app">
            <a href="/memo" class="nav_link" data-link>메모</a>
        </div>
        <div class="app">
            <a href="/photo" class="nav_link" data-link>사진</a>
        </div>
        `;
    }
}