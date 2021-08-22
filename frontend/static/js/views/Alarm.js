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
        <div id="input_container">
            <div class="input_contents">
                <select name="ampm" id="select_am_pm" onchange="setAMPM()">
                    <option value="오전">오전</option>
                    <option value="오후">오후</option>
                </select>
                <input type="number" name="hour" id="hour" min="0" max="12" value="0" onchange="setHour()">
                <span>시</span>
                <input type="number" name="minute" id="minute" min="00" max="59" step="10" value="0" onchange="setMin()">
                <span>분</span>
            </div>
            <button id="save_btn" onclick="makeNewAlarmItem()">저장</button>
        </div>
        <div id="alarm_list">
            <div class="alarm_item">
                <div class="alarm_content">
                    <span class="alarm_text">오전 6시 15분</span>
                </div>
                <button id="delete_btn_0" class="delete_btn" onclick="deleteAlarmItem(this)">삭제</button>
            </div>
        </div>
        `;
    }

    async runAlarmJS() {
        let ampmValue = '오전';
        const setAMPM = () => {
            let ampm = document.getElementById('select_am_pm');
            ampmValue = ampm.options[ampm.selectedIndex].value;
        }

        let hour = 0;
        const setHour = () => {
            hour = document.getElementById('hour').value;
        }

        let minute = 0;
        const setMin = () => {
            minute = document.getElementById('minute').value;
        }

        const showInputContainer = () => {
            let inputContainer = document.getElementById('input_container');
            let alarmList = document.getElementById('alarm_list');
            inputContainer.style.display = 'flex';
            alarmList.style.height = '85%';
        }

        const makeNewAlarmItem = () => {
            let combinedTime = ampmValue + ' ' + String(hour) + '시 ' + String(minute) + '분';
            // console.log(combinedTime);
            let alarmList = document.querySelector('#alarm_list');
            let alarmItem = document.createElement('div');
            alarmItem.classList.add('alarm_item');

            let alarmContent = document.createElement('div');
            alarmContent.classList.add('alarm_content');

            let deleteBtn = document.createElement('button');
            deleteBtn.id = 'delete_btn_' + String(document.getElementById("alarm_list").childElementCount);

            deleteBtn.classList.add('delete_btn');
            deleteBtn.textContent = '삭제';
            deleteBtn.addEventListener('click', e => deleteAlarmItem(e.currentTarget));

            let alarmText = document.createElement('span');
            alarmText.classList.add('alarm_text');
            alarmText.textContent = combinedTime;

            alarmItem.appendChild(alarmContent);
            alarmItem.appendChild(deleteBtn);
            alarmContent.appendChild(alarmText);
            alarmList.appendChild(alarmItem);

            // 인풋컨테이너 닫기
            let inputContainer = document.getElementById('input_container');
            inputContainer.style.display = 'none';
            alarmList.style.height = '100%';
        }

        const deleteAlarmItem = (child) => {
            let alarmItem = child.parentNode;
            let alarmList = alarmItem.parentNode;
            alarmList.removeChild(alarmItem);
        }

        let newBtn = document.getElementById('header_new_btn');
        newBtn.onclick = showInputContainer;

        let defaultItemBtn = document.getElementById('delete_btn_0');
        defaultItemBtn.onclick = e => deleteAlarmItem(e.currentTarget);

        document.getElementById('select_am_pm').onchange = setAMPM;
        document.getElementById('hour').onchange = setHour;
        document.getElementById('minute').onchange = setMin;
        document.getElementById('save_btn').onclick = makeNewAlarmItem;
    }
}