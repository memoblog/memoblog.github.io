class Adapter {
    constructor(loader) {
        this.loader = loader;
        this.file = null;
    }

    upload() {
        return new Promise((resolve, reject) => {
            const reader = this.reader = new window.FileReader();

            reader.addEventListener('load', () => {
                this.loader.uploadTotal = this.loader.uploaded = this.file.size;
                resolve({ default: reader.result });
            });

            reader.addEventListener('error', err => {
                this.file = null;
                reject(err);
            });

            reader.addEventListener('abort', () => {
                this.file = null;
                reject();
            });

            this.loader.file.then(file => {
                this.file = file;
                reader.readAsDataURL(this.file);
            });
        });
    }

    abort() {
        this.reader.abort();
    }
}

function UploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
        return new Adapter(loader);
    };
}

function makeData(element) {
    let data = {};
    $(element).serializeArray().forEach(prop => {
        data[prop.name] = prop.value;
    })
    return data;
}

function makeFileName(title) {
    let filename = title ? title.toLowerCase().replaceAll(' ', '-') : 'test';
    var currentDate = new Date();
    var time = currentDate.getTime();
    return `${time}-${filename}`
}

function saveFile(headers, filename, text) {
    $.ajax({
        type: "PUT",
        url: `https://api.github.com/repos/${CONSTANT.USER}/${CONSTANT.REPO}/contents/${CONSTANT.FOLDER}/${CONSTANT.ARTICLES_PATH}/${filename}.html`,
        data: JSON.stringify({
            "message": `Push article ${filename}`,
            "content":  btoa(unescape(encodeURIComponent(text)))
        }),
        headers: headers,
        success: function (response) {
            console.log(response);
            window.location.href = '.';
        }
    });
}

DecoupledEditor
    .create( document.querySelector( '#editor' ), {
        extraPlugins: [ UploadAdapterPlugin ],

        // ...
    } )
    .then( editor => {
        const toolbarContainer = document.querySelector( '#toolbar-container' );
        toolbarContainer.appendChild( editor.ui.view.toolbar.element );

        // editor.model.document.on( 'change:data', () => {
        //     console.log( 'The data has changed!' );
        // } );

        $('form.editor').on( 'submit', event => {
            event.preventDefault();
            // let login = window.prompt("Username: ");
            // let password = window.prompt("Password: ");
            // let token = btoa(`${login}:${password}`);
            let token = window.prompt("Token: ");
            
            let headers = {
                Accept: 'application/vnd.github.v3+json',
                // Authorization: `Basic ${token}`
                Authorization: `token ${token}`
            }

            var serialize = {}
            $(event.target).serializeArray().forEach(prop => {
                serialize[prop.name] = prop.value;
            })

            let filename = makeFileName(serialize.title);
            
            var image = $("#image")[0].files[0];
            if (image) {
                var extension = image.type.split('/').slice(-1)[0];
                var fr = new FileReader();
                fr.readAsDataURL(image);
                fr.onload = () => {
                    $.ajax({
                        type: "PUT",
                        url: `https://api.github.com/repos/${CONSTANT.USER}/${CONSTANT.REPO}/contents/${CONSTANT.FOLDER}/${CONSTANT.IMAGES_PATH}/${filename}.${extension}`,
                        data: JSON.stringify({
                            "message": `Push image ${filename}.${extension}`,
                            "content":  fr.result.split(',').slice(-1)[0]
                        }),
                        headers: headers,
                        success: function (response) {
                            console.log(response);
                            saveFile(headers, filename, editor.data.get());
                        }
                    });
                };
            }
            else {
                saveFile(headers, filename, editor.data.get());
            }

        });
    } )
    .catch( error => {
        console.error( error );
    } );

$("#image").on('change', function() {
    image = $("#image")[0].files[0];
    console.log($("#imageLabel"))
    if (image) {
        $("#imageLabel").text(image.name);
    }
    else {
        $("#imageLabel").text('Ảnh bài viết');
    }
})