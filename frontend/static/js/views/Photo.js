import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Photo");
    }

    async getBackBtnVisibility() {
        return "inherit";
    }

    async getNewBtnVisibility() {
        return "hidden";
    }

    async getSectionHtml() {
        return `
        <h2 class="hidden">사진 앱</h2>
        <div class="image_container">
            <div class="image_item">
                <button class="image_btn"><img class="image_of_btn" id="image1" src="/static/images/1.png" alt="책상사진"></button>
            </div>
            <div class="image_item">
                <button class="image_btn"><img class="image_of_btn" id="image2" src="/static/images/2.png"
                        alt="Gather 리셉션 룸"></button>
            </div>
            <div class="image_item">
                <button class="image_btn"><img class="image_of_btn" id="image3" src="/static/images/3.png"
                        alt="Gather 팀빌딩 룸"></button>
            </div>
            <div class="image_item">
                <button class="image_btn"><img class="image_of_btn" id="image4" src="/static/images/4.png"
                        alt="Gather 서베이 룸"></button>
            </div>
            <div class="image_item">
                <button class="image_btn"><img class="image_of_btn" id="image5" src="/static/images/5.png"
                        alt="Gather 네트워킹 룸"></button>
            </div>
            <div class="image_item">
                <button class="image_btn"><img class="image_of_btn" id="image6" src="/static/images/6.png"
                        alt="Gather 네트워킹 룸 왼쪽"></button>
            </div>
            <div class="image_item">
                <button class="image_btn"><img class="image_of_btn" id="image7" src="/static/images/7.png"
                        alt="Gather 네트워킹 룸 오른쪽"></button>
            </div>
            <div class="image_item">
                <button class="image_btn"><img class="image_of_btn" id="image8" src="/static/images/8.png"
                        alt="Gather 네트워킹 룸 아래쪽"></button>
            </div>
            <div class="image_item">
                <button class="image_btn"><img class="image_of_btn" id="image9" src="/static/images/9.png"
                        alt="Gather 포토존"></button>
            </div>
            <div class="image_item">
                <button class="image_btn"><img class="image_of_btn" id="image10" src="/static/images/10.png"
                        alt="Gather 팀빌딩 룸 아래쪽"></button>
            </div>
        </div>
        <div class="image_area">
            <div id="big_image_container"></div>
        </div>
        `;
    }

    async runPhotoJS() {
        let imageOfBtns = document.querySelectorAll(".image_of_btn");

        function showImage(source) {
            if (!(!!document.getElementById("big_image"))) {
                let bigImageContainer = document.getElementById("big_image_container");
                let imgTag = document.createElement("img");
                imgTag.id = "big_image";
                bigImageContainer.appendChild(imgTag);
            }
            let bigImage = document.getElementById("big_image");
            bigImage.setAttribute("src", source);

            // console.log(bigImage.src);
        }

        for (let i = 0; i < imageOfBtns.length; i++) {
            imageOfBtns[i].addEventListener("click", e => showImage(e.target.src));
        }
    }
}