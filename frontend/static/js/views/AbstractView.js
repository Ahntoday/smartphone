export default class {
    constructor() {

    }

    setTitle(title) {
        document.title = title; // 위의 페이지 제목 설정
    }

    async getBackBtnVisibility() {
        return "hidden";
    }

    async getNewBtnVisibility() {
        return "hidden";
    }

    async getSectionHtml() {
        return "";
    }
}