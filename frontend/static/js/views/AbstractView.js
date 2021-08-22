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

    async getHeaderClockHtml() {
        function clock() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            let clockDate = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            clockTarget.innerText = `${year}년 ${month + 1}월 ${clockDate}일 ` +
                `${hours < 10 ? `0${hours}` : hours}시 ${minutes < 10 ? `0${minutes}` : minutes}분 ${seconds < 10 ? `0${seconds}` : seconds}초`;
        }

        let clockTarget = document.getElementById('clock');
        setInterval(clock, 1000);
    }

    async getSectionHtml() {
        return "";
    }
}