$(function() {
    video.resizePage();
    video.scaleValue = video.getScaleAndLocation().scale;
    window.onresize = function() {
        throttle(video.resizePage);
    }

    function throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function() {
            method.call(context);
        }, 100);
    }
    video.chartContainerPos = (function() {
        var container = $('.bar_chart');
        return {
            width: container.width(),
            height: container.height(),
            top: container.offset().top,
            left: container.offset().left
        }
    })();
    video.drawChart();
});
