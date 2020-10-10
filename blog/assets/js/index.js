// define global variables
let images = [];
let currentPage = 1;
let totalPages = 1;
let count = 6;
let tree = [];

// define function
function paging(page) {
    window.history.pushState(null, '', `.?page=${page}`);
}

function genPagination() {
    if (totalPages > 1) {
        let blank = `<div class="pagination-button-blank"></div>`;
        let backButton = `
            <div class="pagination-button-back" data-button="-1">
                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.34124 6.70757L6.92401 0.330572C7.37899 -0.110191 8.11471 -0.110191 8.56486 0.330572L9.65876 1.39028C10.1137 1.83104 10.1137 2.54376 9.65876 2.97984L4.99274 7.5L9.65876 12.0202C10.1137 12.4609 10.1137 13.1736 9.65876 13.6097L8.56486 14.6694C8.10987 15.1102 7.37415 15.1102 6.92401 14.6694L0.34124 8.29244C-0.113746 7.86105 -0.113746 7.14833 0.34124 6.70757Z" fill="#0059FF" />
                </svg>
                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.341239 6.70757L6.92401 0.330572C7.37899 -0.110191 8.11471 -0.110191 8.56486 0.330572L9.65876 1.39028C10.1137 1.83104 10.1137 2.54376 9.65876 2.97984L4.99274 7.5L9.65876 12.0202C10.1137 12.4609 10.1137 13.1736 9.65876 13.6097L8.56486 14.6694C8.10987 15.1102 7.37415 15.1102 6.92401 14.6694L0.341239 8.29244C-0.113746 7.86105 -0.113746 7.14833 0.341239 6.70757V6.70757Z" fill="white"/>
                </svg>
                <div class="button-name">
                    Quay lại
                </div>
            </div>
        `;
        let nextButton = `
            <div class="pagination-button-next" data-button="1">
                <div class="button-name">
                    Tiếp theo
                </div>
                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.65876 8.29243L3.07599 14.6694C2.62101 15.1102 1.88529 15.1102 1.43514 14.6694L0.341239 13.6097C-0.113746 13.169 -0.113746 12.4562 0.341239 12.0202L5.00726 7.5L0.341239 2.97984C-0.113746 2.53907 -0.113746 1.82635 0.341239 1.39028L1.43514 0.330572C1.89013 -0.11019 2.62585 -0.11019 3.07599 0.330572L9.65876 6.70756C10.1137 7.13895 10.1137 7.85167 9.65876 8.29243Z" fill="#0059FF" />
                </svg>
                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.65876 8.29243L3.07599 14.6694C2.62101 15.1102 1.88529 15.1102 1.43514 14.6694L0.341239 13.6097C-0.113746 13.169 -0.113746 12.4562 0.341239 12.0202L5.00726 7.5L0.341239 2.97984C-0.113746 2.53908 -0.113746 1.82635 0.341239 1.39028L1.43514 0.330572C1.89013 -0.11019 2.62585 -0.11019 3.07599 0.330572L9.65876 6.70756C10.1137 7.13895 10.1137 7.85167 9.65876 8.29243V8.29243Z" fill="white"/>
                </svg>
            </div>
        `;
        let pagination = `
            <div class="pagination">
                ${
                    currentPage > 1 ? backButton : blank
                }
                <label class="pagination-button">
                    <div class="name">
                        Trang
                    </div>
                    <form class="paging-input">
                        <input
                            type="number"
                            value="${currentPage}"
                            id="paging-input"
                        />
                    </form>
                    <div class="paging-totals">
                        / <span id="paging-totals"> ${totalPages < 100 ? totalPages : '99+'}</span>
                    </div>
                </label>
                ${
                    currentPage < totalPages ? nextButton : blank
                }
            </div>
        `;
        
        $("#pagination").html(pagination);
        $("div[class|='pagination-button']").on("click", event => {
            paging(currentPage+$(event.currentTarget).data('button'));
            regist();
        });
        $(".paging-input").on("submit", event => {
            event.preventDefault();
            paging($("#paging-input").val());
            regist();
        });
    }
}

function genArticles() {
    var articles = '';
    if (!tree.length) {
        articles = `
            <div class="notification">
                <p>
                    Hiện tại Mẹ Mỡ đang bị lười nên chưa có bài viết nào, các bạn hãy quay lại sau nhá (=^v^=)
                </p>
                
                <svg width="252" height="221" viewBox="0 0 252 221" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M126.002 94.7163C86.9183 94.7163 31.5034 155.273 31.5034 193.499C31.5034 210.715 44.6989 221 66.8126 221C90.8508 221 106.724 208.628 126.002 208.628C145.449 208.628 161.366 221 185.192 221C207.306 221 220.501 210.715 220.501 193.499C220.501 155.273 165.087 94.7163 126.002 94.7163ZM53.5138 88.4958C48.3951 71.4031 32.6256 60.3336 18.2933 63.7669C3.96092 67.2002 -3.50548 83.8391 1.61321 100.932C6.73191 118.025 22.5014 129.094 36.8338 125.661C51.1661 122.227 58.6325 105.589 53.5138 88.4958ZM95.2115 78.2451C110.44 74.2297 118.059 53.6099 112.231 32.191C106.404 10.7721 89.3349 -3.3312 74.1068 0.684226C58.8786 4.69965 51.2596 25.3194 57.0871 46.7383C62.9145 68.1572 79.9883 82.2655 95.2115 78.2451ZM233.707 63.7718C219.374 60.3385 203.61 71.408 198.486 88.5007C193.367 105.593 200.834 122.232 215.166 125.666C229.499 129.099 245.263 118.029 250.387 100.937C255.505 83.844 248.039 67.2052 233.707 63.7718ZM156.793 78.2451C172.021 82.2606 189.09 68.1572 194.918 46.7383C200.745 25.3194 193.126 4.70459 177.898 0.684226C162.67 -3.33613 145.601 10.7721 139.774 32.191C133.946 53.6099 141.565 74.2297 156.793 78.2451Z" fill="#091A7A"/>
                </svg>
            </div>
        `;
    }
    else {
        var startIndex = (currentPage - 1) * count;
        var endIndex = Math.min(tree.length, startIndex + count);
        for (let article of tree.slice(startIndex, endIndex)) {
            var info = article.path.split('-');
    
            var datetime = UTILS.toDatetime(parseInt(info[0])).join('-');
    
            var title = UTILS.toFirstLetterUpperCase(info.slice(1).join(' ').slice(0, -5));
    
            var imageName = article.path.slice(0, -5);
            image = images.filter(i => i.includes(imageName));
            if (image.length) {
                articles += `
                    <div class="article">
                        <a href='article.html?article=${article.path}'>
                            <img src="https://${CONSTANT.REPO}/${CONSTANT.FOLDER}/${CONSTANT.IMAGES_PATH}/${image[0]}" alt="article-image"/>
                        </a>
                        <div class="info">
                            <a href='article.html?article=${article.path}'>${title}</a>
                            <p>Được viết ngày ${datetime}</p>
                        </div>
                    </div>
                `;
            }
            else {
                articles += `
                    <div class="article">
                        <a href='article.html?article=${article.path}'>
                            <img src="https://${CONSTANT.REPO}/${CONSTANT.FOLDER}/${CONSTANT.IMAGES_PATH}/default.png" alt="article-image"/>
                        </a>
                        <div class="info">
                            <a href='article.html?article=${article.path}'>${title}</a>
                            <p>Được viết ngày ${datetime}</p>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    $("#articles").html(articles);
}

// regist function
function regist() {
    currentPage = parseInt(UTILS.getUrlParameter('page'));
    if (!currentPage || currentPage > totalPages) {
        window.location.replace('.?page=1');
    }
    else {
        genArticles();
        genPagination();
    }
}

// init function
function init() {
    $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/vnd.github.v3+json',
            // Authorization: `Basic ${token}`
            Authorization: `token ${CONSTANT.READONLY}`
        },
        url: `https://api.github.com/repos/${CONSTANT.USER}/${CONSTANT.REPO}/git/trees/${CONSTANT.BRANCH}:${CONSTANT.FOLDER}/${CONSTANT.IMAGES_PATH}`,
        success: function (response) {
            for (let image of response.tree) {
                images.push(image.path);
            }
            $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    // Authorization: `Basic ${token}`
                    Authorization: `token ${CONSTANT.READONLY}`
                },
                url: `https://api.github.com/repos/${CONSTANT.USER}/${CONSTANT.REPO}/git/trees/${CONSTANT.BRANCH}:${CONSTANT.FOLDER}/${CONSTANT.ARTICLES_PATH}`,
                success: function (response) {
                    tree = response.tree.filter(file => file.path != ".gitkeep");
                    tree = UTILS.sortByDate(tree);
                    totalPages = Math.ceil(tree.length / count);
                    totalPages = totalPages ? totalPages : 1;
                    regist();
                }
            });
        }
    });
    
}

// run js
init();