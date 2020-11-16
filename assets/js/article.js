let article = UTILS.getUrlParameter('article');
let info = article.split('-');
let title = UTILS.toFirstLetterUpperCase(info.slice(1).join(' ').slice(0, -5));
let datetime = UTILS.toDatetime(parseInt(info[0])).join('-');

$('#article-title').html(title);
$('#article-date').html(datetime);
$('#article-content').load(`${CONSTANT.ARTICLES_PATH}/${article}`, (_, status) => {
    if (status === 'error') {
        window.location.replace('404-page.html')
    }
});

$.ajax({
    type: "GET",
    headers: {
        Accept: 'application/vnd.github.v3+json',
        // Authorization: `Basic ${token}`
        Authorization: `token ${CONSTANT.READONLY}`
    },
    url: `https://api.github.com/repos/${CONSTANT.USER}/${CONSTANT.REPO}/git/trees/${CONSTANT.BRANCH}:${CONSTANT.IMAGES_PATH}`,
    success: function (response) {
        let images = [];
        for (let image of response.tree) {
            images.push(image.path);
        }
        var image = images.filter(i => i.includes(article.slice(0, -5)));
        if (image.length) {
            $('meta[property=og\\:image]').attr('content', `${CONSTANT.IMAGES_PATH}/${image[0]}`);
        }
    }
});