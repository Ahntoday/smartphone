import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Alarm");
    }

    async getBackBtnVisibility() {
        return "inherit";
    }

    async getNewBtnVisibility() {
        return "inherit";
    }

    async getSectionHtml() {
        return `
        <h2 class="hidden">알람 앱</h2>
        <div class="input_container">
            <div class="input_contents">
                <select name="ampm" id="select_am_pm">
                    <option value="AM">오전</option>
                    <option value="PM">오후</option>
                </select>
                <input type="number" name="hour" id="hour" min="0" max="12" value="0">
                <span>시</span>
                <input type="number" name="minute" id="minute" min="00" max="59" step="10" value="0">
                <span>분</span>
            </div>
            <button id="save_btn">저장</button>
        </div>
        <div class="alarm_list">
            <div class="alarm_item">
                <div class="alarm_content">
                    오전 6시 15분
                </div>
                <button id="delete_btn">삭제</button>
            </div>
            <div class="alarm_item">
                <div class="alarm_content">
                    오전 6시 15분
                </div>
                <button id="delete_btn">삭제</button>
            </div>
        </div>
        `;
    }
}