let UTILS = {
    sortByDate: function (tree) {
        return tree.sort(function (a, b) {
            return b.path.split('-')[0] - a.path.split('-')[0];
        })
    },

    toFirstLetterUpperCase: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    
    pad: function (n) {
        return n<10 ? '0'+n : n;
    },

    toDatetime: function (second) {
        var datetime = new Date(parseInt(second));
        return [UTILS.pad(datetime.getDate()), UTILS.pad(datetime.getMonth() + 1), datetime.getFullYear()]
    },

    getUrlParameter: function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
}