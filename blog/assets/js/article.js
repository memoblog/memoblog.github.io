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