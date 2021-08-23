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
        <div id="input_container">
            <input id="memo_input" type="text" placeholder="메모를 입력하세요.">
        </div>
        <div id="memo_list">
            <button class="memo_item" id="memo_item_0">
                <span class="memo_item_text" id="memo_item_text_0">
                    반짝이는 별빛들
                    깜빡이는 불 켜진 건물
                    우린 빛나고 있네
                    각자의 방 각자의 별에서
                    어떤 빛은 야망
                    어떤 빛은 방황
                    사람들의 불빛들
                    모두 소중한 하나
                    어두운 밤 (외로워 마)
                    별처럼 다 (우린 빛나)
                    사라지지 마
                    큰 존재니까
                    Let us shine
                    어쩜 이 밤의 표정이 이토록 또 아름다운 건
                    저 별들도 불빛도 아닌 우리 때문일 거야
                    You got me
                    난 너를 보며 꿈을 꿔
                    I got you
                    칠흑 같던 밤들 속
                    서로가 본 서로의 빛</span>
            </button>
        </div>
        `;
    }

    async runMemoJS() {
        let newBtn = document.getElementById('header_new_btn');
        let memoInput = document.getElementById('memo_input');
        let memoText = document.getElementById('memo_item_text_0');
        let showFullTextState = false;
        let memoData = {};

        const showFullText = (child) => {
            let clickedItem = child.parentNode;
            if (showFullTextState === false) { // 펼쳐진게 없으면
                clickedItem.style.height = 'auto';
                showFullTextState = true;
            }
            else { // 펼쳐진게 있으면
                let allMemoItem = document.querySelectorAll('.memo_item');
                for (let i = 0; i < allMemoItem.length; i++) {
                    if (allMemoItem[i].style.height = 'auto') {
                        allMemoItem[i].style.height = '50px';
                    }
                    clickedItem.style.height = 'auto';
                }
            }
        }

        const showInputContainer = () => {
            let inputContainer = document.getElementById('input_container');
            let memoList = document.getElementById('memo_list');
            inputContainer.style.display = 'block';
            memoList.style.height = '85%';
        }

        const makeNewMemoWithKeyCheck = () => {
            if (window.event.keyCode == 13) {
                makeNewMemo(memoInput.value);
            }
        }

        const makeNewMemo = (memo) => {
            let memoList = document.querySelector('#memo_list');
            let memoItem = document.createElement('button');
            let memoItemText = document.createElement('span');
            let inputContainer = document.getElementById('input_container');

            memoItem.id = 'memo_item_' + String(document.getElementById("memo_list").childElementCount);
            memoItem.classList.add('memo_item');
            memoItemText.id = 'memo_item_text_' + String(document.getElementById("memo_list").childElementCount);
            memoItemText.classList.add('memo_item_text');
            memoItemText.addEventListener('click', e => showFullText(e.currentTarget));
            memoItemText.innerHTML = memo;
            // console.log(memoInput);
            saveStorageData(memo);

            memoList.appendChild(memoItem);
            memoItem.appendChild(memoItemText);

            memoInput.value = null;
            inputContainer.style.display = 'none';
            memoList.style.height = '100%';
        }

        const saveStorageData = (newMemo) => {
            memoData[Object.keys(memoData).length] = newMemo;
            // console.log(memoData);
            let serializedData = JSON.stringify(memoData);
            localStorage.setItem("memoData", serializedData);
        }

        const bringStorageData = () => {
            let deserializedData = JSON.parse(localStorage.getItem("memoData"));
            for (let key in deserializedData) {
                let broughtMemo = deserializedData[key];
                makeNewMemo(broughtMemo);
            }
        }

        memoInput.onkeyup = makeNewMemoWithKeyCheck;
        memoText.onclick = e => showFullText(e.currentTarget);
        newBtn.onclick = showInputContainer;
        bringStorageData();

        // localStorage.clear();
    }
}