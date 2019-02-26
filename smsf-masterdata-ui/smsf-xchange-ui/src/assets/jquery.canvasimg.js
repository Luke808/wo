(function($) {
    function init(target) {
        var opts = $.data(target, 'canvasimg').options;
        var canvas = $('<canvas></canvas>')
        $(target).after(canvas);
        opts.canvas = canvas[0];
        opts.imgWidth = target.width;
        opts.imgHeight = target.height;
        opts.originalScale = $(target).width()/target.width;
        opts.scale = $(target).width()/target.width;
    }

    function draw(target, opts) {
        //获取图片的高宽
        var w = opts.imgWidth * opts.scale;
        var h = opts.imgHeight * opts.scale;
        //获取画布对象
        var canvas = opts.canvas;
        //角度转为弧度
        if (!opts.rotate) {
            opts.rotate = 0;
        }
        var rotation = Math.PI * opts.rotate / 180;
        var c = Math.round(Math.cos(rotation) * 1000) / 1000;
        var s = Math.round(Math.sin(rotation) * 1000) / 1000;
        //旋转后canvas标签的大小
        canvas.height = Math.abs(c * h) + Math.abs(s * w);
        canvas.width = Math.abs(c * w) + Math.abs(s * h);
        //绘图开始
        var context = canvas.getContext("2d");
        context.save();
        //改变中心点
        if (rotation <= Math.PI / 2) {
            context.translate(s * h, 0);
        } else if (rotation <= Math.PI) {
            context.translate(canvas.width, -c * h);
        } else if (rotation <= 1.5 * Math.PI) {
            context.translate(-c * w, canvas.height);
        } else {
            context.translate(0, -s * w);
        }
        //旋转90°
        context.rotate(rotation);
        //绘制
        context.drawImage(target, 0, 0, w, h);
        context.restore();
        $(target).hide();
    }

    $.fn.canvasimg = function(options, param) {
        if (typeof options == 'string') {
            var method = $.fn.canvasimg.methods[options];
            if (method) {
                return method(this, param);
            }
        }

        options = options || {};
        return this.each(function() {
            var state = $.data(this, 'canvasimg');
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, 'canvasimg', {
                    options: $.extend(true, {}, $.fn.canvasimg.defaults, options)
                });
                init(this);
            }
        });
    };

    $.fn.canvasimg.methods = {
        //向右旋转
        right: function(jq) {
            return jq.each(function() {
                var target = this;
                var opts = $.data(target, 'canvasimg').options;
                opts.rotate += 90;

                if(opts.rotate === 360){
                    opts.rotate = 0;
                }

                draw(target, opts);
            });
        },
        //向左旋转
        left: function(jq) {
            return jq.each(function() {
                var target = this;
                var opts = $.data(target, 'canvasimg').options;

                if(opts.rotate === 0){
                    opts.rotate = 360;
                }
                opts.rotate -= 90;

                draw(target, opts);
            });
        },
        //缩放重置
        zoomreset: function(jq){
            return jq.each(function() {
                var target = this;
                var opts = $.data(target, 'canvasimg').options;
                opts.scale = opts.originalScale;                
                draw(target, opts);
            });
        },
        //放大
        zoomin: function(jq){
            return jq.each(function() {
                var target = this;
                var opts = $.data(target, 'canvasimg').options;
                opts.scale += 0.1;
                if (opts.scale >= 5) {
                    opts.scale = 5;
                }
                
                draw(target, opts);
            });
        },
        //缩小
        zoomout: function(jq){
            return jq.each(function() {
                var target = this;
                var opts = $.data(target, 'canvasimg').options;
                opts.scale -= 0.1;
                if (opts.scale <= 0) {
                    opts.scale = 0.1;
                }
                
                draw(target, opts);
            });
        },
        normal: function (jq) {
            return jq.each(function () {
                var target = this;
                var opts = $.data(target, 'canvasimg').options;
                draw(target, opts);
            });
        },
        options: function(jq){
            return $.data(jq[0], 'canvasimg').options;
        }
    }

    $.fn.canvasimg.defaults = {
        canvas:null,
        zoomLevel: 0.1,
        rotate:0,
        scale:1,
        originalScale:1,
        imgWidth:1,
        imgHeight:1
    };
})(jQuery);