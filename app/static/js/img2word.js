$(document).ready(function () {
    $('.image-select-item').click(function () {
        $('.image-url').val("");
        $(this).addClass('is-active').siblings().removeClass('is-active');
        imgShow($('img', this).attr('src'));
        submitURL($('img', this).attr('src'))
    })

    $('.image-local-input').change(function () {
        $('.image-url').val("");
        var file = $('.image-local-input').get(0).files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            $('.is-active').removeClass('is-active');
            imgShow(reader.result);
        }
        submitFILE(file)
    })

    $(".image-url").bind("input propertychange", function () {
        $(".image-button").addClass("image-button-active")
        if ($(".image-url").val() == '') {
            $(".image-button").removeClass("image-button-active")
        }
    })

    $(".image-button").click(function () {
        if ($(".image-url").val().length > 0) {
            imgShow($(".image-url").val());
            submitURL($(".image-url").val())
        }
    })

    function imgShow(imgPath) {
        var imgScale = 1;
        var canvas = $('.demo-canvas-centerlize')[0];
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        var img = new Image();
        img.src = imgPath;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            if (img.width > img.height) {
                var scale = 840 / img.width;
            } else {
                var scale = 524 / img.height;
            }
            if (scale > 1) {
                scale = 1;
            }
            canvas.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
            var imgX = (canvas.width - img.width) / 2;
            var imgY = (canvas.height - img.height) / 2;
            ctx.drawImage(img, //规定要使用的图像、画布或视频。
                0, 0, //开始剪切的 x 坐标位置。
                img.width, img.height,  //被剪切图像的高度。
                imgX, imgY,//在画布上放置图像的 x 、y坐标位置。
                img.width * imgScale, img.height * imgScale  //要使用的图像的宽度、高度
            )
        }


    }

    function submitURL(path) {
        $('.tech-recognition-scan').css('display', 'block')
        var data = {imgpath: path}
        $.ajax({
            type: 'POST',
            url: '/img2word/',
            data: data,
            success: function (res) {
                $('.tech-recognition-scan').css('display', 'none')
                var context = res.data.words_result;
                var text = '';
                for (var i = 0; i < context.length; i++) {
                    text += "<li class='result-item'><span class='result-text'>" + context[i].words + "</span></li>"
                }
                $(".result-item").html(text)
            }
        })
    }

    function submitFILE(file) {
        $('.tech-recognition-scan').css('display', 'block')
        var formData = new FormData();
        formData.append("file", file)
        $.ajax({
            url: '/img2word/',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                $('.tech-recognition-scan').css('display', 'none')
                var context = res.data.words_result;
                var text = '';
                for (var i = 0; i < context.length; i++) {
                    text += "<li class='result-item'><span class='result-text'>" + context[i].words + "</span></li>"
                }
                $(".result-item").html(text)
            }
        });

    }
});