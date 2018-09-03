cqrbdp.showTimeAxis = function(width, starthour, endhour) {


    var conWidth, //根据屏幕大小设定的
        conHeight,

        trackWidth, //轨道大小及位置
        trackHeight,
        trackTop,

        indicatorWidth, //中间按钮属性--位置大小
        indicatorHeigth,
        indicatorMidHeigth,
        indicatorMidTop,
        indicator1Pos, //当前按钮处于几点处
        indicator2Pos,
        indicator1Left,
        indicator2Left,
        stepGap,
        indicatorStep,
        initPos;

    //初始化区域及内部相关元素的大小
    cqrbdp.initTrackSize = function(conwidth) {
        // conWidth = 1300; //根据屏幕大小设定的
        // conHeight = 56.3;
        conWidth = conwidth;
        conHeight = conwidth / 1846 * 80;

        trackWidth = conWidth;
        trackHeight = conHeight * 0.3;
        trackTop = conHeight * 0.18;

        indicatorWidth = indicatorHeigth = trackHeight;
        indicatorMidHeigth = trackHeight * 0.4;
        indicatorMidTop = trackHeight * 0.3;
        indicatorStep = conWidth / 23; //每步移动的距离
        initPos = indicatorStep / 2 - indicatorWidth / 2; //初始左侧距离

        //初始化相关元素的大小
        $(".track").css({
            'width': trackWidth + "px",
            'height': trackHeight + 'px',
            'top': trackTop + 'px'
        });
        $('.indicator').css({
            'width': indicatorWidth + 'px',
            'height': indicatorHeigth + 'px',
            'left': initPos + 'px'
        });
        $('.labels .label').css("width", conWidth / 23);

        $('.indicator-mid').css({
            'height': indicatorMidHeigth,
            'top': indicatorMidTop
        });
        if (indicator1Pos) { //说明是通过页面缩放执行的
            $('#indicator-1').css('left', (initPos + indicatorStep * indicator1Pos) + 'px');
            $('#indicator-2').css('left', (initPos + indicatorStep * indicator2Pos) + 'px');
            //记录当前按钮的位置
            indicator1Left = parseFloat($('#indicator-1').css('left'));
            indicator2Left = parseFloat($('#indicator-2').css('left'));
            updateIndicatorMid();
            bindIndicatorDrag();
        }

    };
    /**
     * 初始化时间轴的显示，主要是显示
     * @param  {[type]} start [开始的时间--小时]
     * @param  {[type]} end   [结束的时间--小时]
     * @return {[type]}       [description]
     */
    cqrbdp.initTrackShow = function(starthour, endhour) {
        indicator1Pos = starthour - 1; //当前按钮处于几点处
        indicator2Pos = endhour - 1;
        stepGap = Math.abs(indicator1Pos - indicator2Pos);

        $('#indicator-1').css('left', (initPos + indicatorStep * indicator1Pos) + 'px');
        $('#indicator-2').css('left', (initPos + indicatorStep * indicator2Pos) + 'px');
        var indicatorMidLeft = parseFloat($('#indicator-1').css('left')) + indicatorWidth / 2;
        $('.indicator-mid').css({
            'left': indicatorMidLeft + 'px',
            'width': indicatorStep * stepGap
        });
        //记录当前按钮的位置
        indicator1Left = parseFloat($('#indicator-1').css('left'));
        indicator2Left = parseFloat($('#indicator-2').css('left'));
    }

    function bindIndicatorDrag() {
        var track = $('.track');

        $("#indicator-1").draggable({
            axis: 'x',
            containment: track,
            grid: [indicatorStep, indicatorStep],
            drag: function(event, ui) {
                /**
                 * 当拖动一个按钮时，需要更新以下内容
                 * 1.当前按钮的left
                 * 2.当前按钮的position，即处于几点处
                 */
                if (indicator1Left != ui.position.left) {
                    indicator1Left = ui.position.left;
                    indicator1Pos = Math.round((ui.position.left - indicatorStep / 2) / indicatorStep);
                    // console.log((indicator1Pos + 1) + 'hour');
                    updateIndicatorMid();
                }
            },
            stop: function(event, ui) {
                //拖动停止后，确定两个按钮的位置
                confirmHour();
            }
        });
        $("#indicator-2").draggable({
            axis: 'x',
            containment: track,
            grid: [indicatorStep, indicatorStep],
            drag: function(event, ui) {
                if (indicator2Left != ui.position.left) {
                    indicator2Left = ui.position.left;
                    indicator2Pos = Math.round((ui.position.left - indicatorStep / 2) / indicatorStep);
                    // console.log((indicator2Pos + 1) + 'hour');
                    updateIndicatorMid();
                }
            },
            stop: function(event, ui) {
                //拖动停止后，确定两个按钮的位置
                confirmHour();
            }
        });
    }

    /**
     * 更新两个按钮之间的区域，需要
     * 1.获得两个按钮的left
     * 2.获得两个按钮之间是stepGap
     * @return {[type]} [none]
     */
    function updateIndicatorMid() {
        var minLeft = Math.min(indicator1Left, indicator2Left);
        stepGap = Math.abs(indicator1Pos - indicator2Pos);
        var indicatorMidLeft = minLeft + indicatorWidth / 2;
        $('.indicator-mid').css({
            'left': indicatorMidLeft + 'px',
            'width': indicatorStep * stepGap
        });
    }

    /**
     * 根据label位置更新特定按钮的位置：
     * 1.更新按钮位置
     * 2.更新相关属性： 该按钮的pos、left、setGap等
     * 3.同时，更新按钮中间区域
     * @param  {[type]} pos            [label位置]
     * @param  {[type]} indicatorIndex [按钮顺序]
     * @return {[type]}                [none]
     */
    function updateIndicatorPos(pos, indicatorIndex) {
        if (indicatorIndex == 1) {
            indicator1Pos = pos;
            indicator1Left = initPos + indicatorStep * indicator1Pos;
            $('#indicator-1').css('left', indicator1Left + 'px');
            stepGap = Math.abs(indicator1Pos - indicator2Pos);
            // updateIndicatorMid();
        } else {
            indicator2Pos = pos;
            indicator2Left = initPos + indicatorStep * indicator2Pos;
            $('#indicator-2').css('left', indicator2Left + 'px');
            stepGap = Math.abs(indicator1Pos - indicator2Pos);
        }
        updateIndicatorMid();
    }

    /**
     * 更新起止时间参数
     * 然后取出并显示新数据
     * @return {[type]} [description]
     */
    function confirmHour() {
        // console.log((indicator1Pos + 1) + 'H--' + (indicator2Pos + 1) + 'H');
        if (indicator1Pos < indicator2Pos) {
            cqrbdp.showingStartHour = indicator1Pos + 1;
            cqrbdp.showingEndHour = indicator2Pos + 1;
        } else if (indicator1Pos > indicator2Pos) {
            cqrbdp.showingStartHour = indicator2Pos + 1;
            cqrbdp.showingEndHour = indicator1Pos + 1;
        }
        //如果是在显示当天，显示数据时的起止时间的处理
        if (cqrbdp.isToday) {

        }

        cqrbdp.loadInfoItems(cqrbdp.showingDate, cqrbdp.showingStartHour, cqrbdp.showingEndHour); //可增加时间日期

    }

    function bindLabelClick() {
        /**
         * 点击label时需要进行如下操作：
         * 1.获取点击的label的index，即点击的是第几个
         * 2.将距离该label近的按钮移动到该label中
         * 3.更新两个按钮中间的区域
         * 4.如果两个按钮距离label相同则随机移动一个到该label，且只能移动一个
         */
        $('.labels .label').click(function() {
            var clickdLabelIndex = parseInt($(this).attr("id").split("-")[1]);
            // console.log(clickdLabelIndex + "H");
            //两个按钮重叠，并且点击该区域
            if (indicator1Pos == indicator2Pos && indicator1Pos == clickdLabelIndex) {
                return;
            } else if (indicator1Pos == indicator2Pos) { //两个按钮重叠
                updateIndicatorPos(clickdLabelIndex, 1);
            } else {
                if (Math.abs(clickdLabelIndex - indicator1Pos) <= Math.abs(clickdLabelIndex - indicator2Pos)) {
                    updateIndicatorPos(clickdLabelIndex, 1);
                } else {
                    updateIndicatorPos(clickdLabelIndex, 2);
                }
            }
            confirmHour();
        });
    }


    cqrbdp.initTrackSize(width);
    cqrbdp.initTrackShow(starthour, endhour);
    bindIndicatorDrag();
    bindLabelClick();
}
