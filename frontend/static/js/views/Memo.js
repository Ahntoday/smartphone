import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Memo");
    }

    async getBackBtnVisibility() {
        return "inherit";
    }

    async getNewBtnVisibility() {
        return "inherit";
    }

    async getSectionHtml() {
        return `
        <h2 class="hidden">메모 앱</h2>
        <div class="input_container">
        <input class="memo_input" type="text" placeholder="메모를 입력하세요.">
    </div>
    <div class="memo_list">
        <button id="memo_item">샘플 메모입니다.<br>샘플메모입니다.<br>샘플메모입니다.</button>
        <button id="memo_item">샘플 메모입니다.</button>
        <button id="memo_item">샘플 메모입니다.</button>
        <button id="memo_item">샘플 메모입니다.</button>
    </div>
        `;
    }
}