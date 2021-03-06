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
            <!-- <div class="alarm_item">
                <div class="alarm_content">
                    <span class="alarm_text">오전 6시 10분</span>
                </div>
                <button id="delete_btn_0" class="delete_btn" onclick="deleteAlarmItem(this)">삭제</button>
            </div> -->
        </div>
        `;
    }

    async runAlarmJS() {
        let ampmValue = '오전';
        let hour = 0;
        let minute = 0;
        let alarmAlertList = [];
        let alarmData = {};
        let serializedData = '';
        let deserializedData = {};

        const setAMPM = () => {
            let ampm = document.getElementById('select_am_pm');
            ampmValue = ampm.options[ampm.selectedIndex].value;
        }

        const setHour = () => {
            hour = document.getElementById('hour').value;
        }

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
            const combinedTime = ampmValue + ' ' + String(hour) + '시 ' + String(minute) + '분';
            let alarmList = document.querySelector('#alarm_list');
            let alarmItem = document.createElement('div');
            let alarmContent = document.createElement('div');
            let deleteBtn = document.createElement('button');
            let alarmText = document.createElement('span');

            setAlarmAlert(ampmValue, Number(hour), Number(minute));

            alarmItem.classList.add('alarm_item');
            alarmContent.classList.add('alarm_content');

            deleteBtn.id = 'delete_btn_' + String(document.getElementById("alarm_list").childElementCount);
            deleteBtn.classList.add('delete_btn');
            deleteBtn.textContent = '삭제';
            deleteBtn.addEventListener('click', e => deleteAlarmItem(e.currentTarget));

            alarmText.classList.add('alarm_text');
            alarmText.textContent = combinedTime;

            alarmItem.appendChild(alarmContent);
            alarmItem.appendChild(deleteBtn);
            alarmContent.appendChild(alarmText);
            alarmList.appendChild(alarmItem);

            // 인풋컨테이너 닫기
            const inputContainer = document.getElementById('input_container');
            inputContainer.style.display = 'none';
            alarmList.style.height = '100%';
        }

        const deleteAlarmItem = (child) => {
            const alarmItem = child.parentNode;
            const alarmList = alarmItem.parentNode;
            const text = alarmItem.childNodes[0].innerText.split(' ');
            const ampmtext = text[0];
            const hourtext = Number(text[1].split('시')[0]);
            const mintext = Number(text[2].split('분')[0]);

            alarmList.removeChild(alarmItem);
            deleteStorageData(ampmtext, hourtext, mintext);
            deleteAlarmAlert(ampmtext, hourtext, mintext);
        }

        const matchHour = (ampm, hour, nowTime) => {
            if (ampm === '오전') {
                return hour === nowTime.getHours();
            }
            if (ampm === '오후') {
                return hour + 12 === nowTime.getHours();
            }
        }

        const matchMinute = (min, nowTime) => {
            return min === nowTime.getMinutes();
        }

        const setAlarmAlert = (ampm, hour, minute) => {
            let time = {
                "ampm": ampm,
                "hour": hour,
                "minute": minute
            };
            alarmAlertList.push(time);
            saveStorageData(time);
        }

        const deleteAlarmAlert = (ampmtext, hourtext, mintext) => {
            const idx = alarmAlertList.findIndex(item => {
                return (item.ampm === ampmtext && item.hour === hourtext && item.minute === mintext)
            });
            alarmAlertList.splice(idx, 1);
        }

        const saveStorageData = (time) => {
            alarmData[Object.keys(alarmData).length] = time;
            serializedData = JSON.stringify(alarmData);
            localStorage.setItem("alarmData", serializedData);
        }


        const deleteStorageData = (ampmtext, hourtext, mintext) => {
            deserializedData = JSON.parse(localStorage.getItem("alarmData"));
            for (let key in deserializedData) {
                if (findStorageData(deserializedData, key, ampmtext, hourtext, mintext)) {
                    delete alarmData[key];
                    break;
                }
            }
            serializedData = JSON.stringify(alarmData);
            localStorage.setItem("alarmData", serializedData);
        }

        const findStorageData = (data, key, ampmtext, hourtext, mintext) => {
            return (data[key].ampm === ampmtext && data[key].hour === hourtext && data[key].minute === mintext)
        }

        const bringStorageData = () => {
            deserializedData = JSON.parse(localStorage.getItem("alarmData"));
            for (let key in deserializedData) {
                ampmValue = deserializedData[key].ampm;
                hour = deserializedData[key].hour;
                minute = deserializedData[key].minute;
                makeNewAlarmItem();
            }
        }

        const countTime = () => {
            let nowTime = new Date();
            for (let i = 0; i < alarmAlertList.length; i++) {
                const ampmContent = alarmAlertList[i].ampm;
                const hourContent = alarmAlertList[i].hour;
                const minuteContent = alarmAlertList[i].minute;
                let spanTags = document.querySelectorAll('.alarm_text');

                if (matchHour(ampmContent, hourContent, nowTime) && matchMinute(minuteContent, nowTime)) {
                    alert(`알람! ${ampmContent} ${hourContent}시 ${minuteContent}분입니다.`);
                    findDeleteAlarmItem(spanTags, ampmContent, hourContent, minuteContent);
                }
            }
        }

        const findDeleteAlarmItem = (spanTags, ampmContent, hourContent, minuteContent) => {
            for (let i = 0; i < spanTags.length; i++) {
                if (spanTags[i].innerText == `${ampmContent} ${String(hourContent)}시 ${String(minuteContent)}분`) {
                    deleteAlarmItem(spanTags[i].parentNode);
                    break;
                }
            }
        }

        document.getElementById('header_new_btn').onclick = showInputContainer;
        document.getElementById('select_am_pm').onchange = setAMPM;
        document.getElementById('hour').onchange = setHour;
        document.getElementById('minute').onchange = setMin;
        document.getElementById('save_btn').onclick = makeNewAlarmItem;
        bringStorageData();
        setInterval(countTime, 1000);
    }
}