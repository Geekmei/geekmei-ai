$(document).ready(function () {
    $('.tech-drag-container').mousedown(function (e) {
        var positionDiv = $(this).offset();
        var distenceX = e.pageX - positionDiv.left;
        $(document).mousemove(function (e) {
            $(".tech-drag-tip").css('display', 'none');
            var x = e.pageX - distenceX;
            if (x < 366) {
                x = 366;
            } else if (x > $(document).width() - $('.tech-drag-container').outerWidth(true)) {
                x = $(document).width() - $('.tech-drag-container').outerWidth(true);
            } else if (x > 1173) {
                x = 1173;
            }
            if (x < 451) {
                $('.tech-img-tip:eq(0)').css('display', 'none')
            } else {
                $('.tech-img-tip:eq(0)').css('display', 'block')
            }
            if (x > 1104) {
                $('.tech-img-tip:eq(1)').css('display', 'none')
            } else {
                $('.tech-img-tip:eq(1)').css('display', 'block')
            }
            $('.tech-drag-container').css({
                'left': x - 366 + 'px'
            });
            $('.tech-new-img').css({'width': x - 350 + 'px'})
        });
        $(document).mouseup(function () {
            $(document).off('mousemove');
        });
    });

    $('.image-select-item').click(function () {
        initImg()
        $('.image-url').val("");
        $(this).addClass('is-active').siblings().removeClass('is-active');
        img = $('img', this).attr('src');
        imgShow(img)
        submitURL(img)
    })

    $('.image-local-input').change(function () {
        initImg()
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
        initImg()
        if ($(".image-url").val().length > 0) {
            imgShow($(".image-url").val());
            submitURL($(".image-url").val());
        }
    })

    function imgShow(imgPath) {
        var maxWidth = 840;
        var maxHeight = 524;
        var ratio = 0;
        var imgWidth = 0;
        var imgHeight = 0;
        var img = new Image();
        img.src = imgPath;
        img.onload = function () {
            imgWidth = img.width;
            imgHeight = img.height;
            if (imgWidth > maxWidth) {
                ratio = maxWidth / imgWidth;
                imgHeight = imgHeight * ratio;
                imgWidth = maxWidth
            }
            if (imgHeight > maxHeight) {
                ratio = maxHeight / imgHeight;
                imgWidth = imgWidth * ratio;
                imgHeight = maxHeight;
            }
            var imgLeft = (maxWidth - imgWidth) / 2;
            var imgTop = (maxHeight-imgHeight) / 2;
            var cssVal = {
                width: imgWidth,
                height: imgHeight,
                left: imgLeft,
                top:imgTop
            }
            $('img', '.tech-old-img').attr('src', imgPath)
            $('img', '.tech-old-img').css(cssVal)
        }


    }

    function newImgShow(imgPath) {
        var maxWidth = 840;
        var maxHeight = 524;
        var ratio = 0;
        var imgWidth = 0;
        var imgHeight = 0;
        var img = new Image();
        img.src = imgPath;
        img.onload = function () {
            imgWidth = img.width;
            imgHeight = img.height;
            if (imgWidth > maxWidth) {
                ratio = maxWidth / imgWidth;
                imgHeight = imgHeight * ratio;
                imgWidth = maxWidth
            }
            if (imgHeight > maxHeight) {
                ratio = maxHeight / imgHeight;
                imgWidth = imgWidth * ratio;
                imgHeight = maxHeight;
            }
            var imgLeft = (maxWidth - imgWidth) / 2;
            var imgTop = (maxHeight-imgHeight) / 2;
            var cssVal = {
                width: imgWidth,
                height: imgHeight,
                left: imgLeft,
                top:imgTop
            }
            $('img', '.tech-new-img').attr('src', imgPath)
            $('img', '.tech-new-img').css(cssVal)
        }


    }

    function submitURL(path) {
        $('.tech-recognition-scan').css('display', 'block')
        var data = {imgpath: path}
        $.ajax({
            type: 'POST',
            url: '/picture2color/',
            data: data,
            success: function (res) {
                $('.tech-recognition-scan').css('display', 'none')
                context = 'data:image/jpg;base64,' + res.data.image;
                newImgShow(context)
                $('img', '.response').attr('src', context)
                $('img', '.tech-new-img').css('display', 'block')
                $(".tech-drag-container").css('display', 'block')
                $(".tech-drag-tip").css('display', 'block')
                $(".tech-img-tip").css('display', 'block')
                $(".tech-drag-container").animate({left: '404px'}, {
                    duration: 500, step: function (e) {
                        $('.tech-new-img').css({'width': e + 16 + 'px'})
                    }
                })
            }
        })
    }

    function submitFILE(file) {
        $('.tech-recognition-scan').css('display', 'block')
        var formData = new FormData();
        formData.append("file", file)
        $.ajax({
            url: '/picture2color/',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                $('.tech-recognition-scan').css('display', 'none')
                context = 'data:image/jpg;base64,' + res.data.image;
                newImgShow(context)
                $('img', '.response').attr('src', context)
                $('img', '.tech-new-img').css('display', 'block')
                $(".tech-drag-container").css('display', 'block')
                $(".tech-drag-tip").css('display', 'block')
                $(".tech-img-tip").css('display', 'block')
                $(".tech-drag-container").animate({left: '404px'}, {
                    duration: 500, step: function (e) {
                        $('.tech-new-img').css({'width': e + 16 + 'px'})
                    }
                })
            }
        });

    }

    function initImg() {
        $('img', '.tech-new-img').css('display', 'none')
        $(".tech-drag-container").css({'display': 'none','left':0})
        $(".tech-drag-tip").css('display', 'none')
        $(".tech-img-tip").css('display', 'none')
    }

})
