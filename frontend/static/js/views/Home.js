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
        <div id="alarm_app" class="app draggable" draggable="true">
            <a href="/alarm" class="nav_link" data-link>알람</a>
        </div>
        <div id="memo_app" class="app draggable" draggable="true">
            <a href="/memo" class="nav_link" data-link>메모</a>
        </div>
        <div id="photo_app" class="app draggable" draggable="true">
            <a href="/photo" class="nav_link" data-link>사진</a>
        </div>
        `;
    }

    async runHomeJS() {
        const draggables = document.querySelectorAll('.draggable');
        const section = document.getElementById('section');

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            })

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            })
        })

        section.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(section, e.clientX);

            console.log(afterElement);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) { // 다음 것이 없다면
                section.appendChild(draggable);
            }
            else {
                section.insertBefore(draggable, afterElement);
            }
        })

        function getDragAfterElement(container, x) {
            const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]; // 현재 drag안하고 있는 거 찾기

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = x - box.left - box.width / 2;
                console.log(offset);
                if (offset < 0 && offset > closest.offset) { // 0보다는 작지만 0에 가장 근접한 것이 가장 가까운 것
                    return { offset: offset, element: child };

                }
                else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element
        }
    }
}