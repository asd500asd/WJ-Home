cqrbdp.cm = new CommentManager($('#pro-danmaku-stage')[0]);
cqrbdp.cm.init();
cqrbdp.showInfoItems = function(day, starthour, endhour) {
    var isLoop = true; //是否循环播放，用于显示非当前的信息时，播放完毕后再播放一次
    var headiconWidth = 69; //信息条目中右侧头像的宽度
    // var dur = 20000; //各条目运行的时长，值越小走的越快
    // var delay = 1500; //各条目间隔时间，值越小两个之间间隔时间越短，容易发生重叠现象
    // console.log('show');
    var danmakuItems;
    var tmr = -1,
        start = 0,
        playhead = 0;

    // cqrbdp.sendInfoItems = function(danmakuItems) {
    //     var danmakuItem = '<div class="info-bar">' +
    //         '<div class="info-bar-text">' + '<span>保障金融消费者八大权利发布</span>' +
    //         '</div>' +
    //         '<div class="info-bar-headicon">' + '<img src="images/my-done-img01.png" style="width: 63px; height: 63px;">' +
    //         '</div>' +
    //         '<div class="info-bar-detail"><img src="images/sr-bac02.png" class="detail-bg">' +
    //         '<div class="info-bar-detail-title">重庆晨报</div>' +
    //         '<div class="info-bar-intro">' +
    //         '<div class="headicon">' +
    //         '<img src="images/sr-pc-bac01.png" class="icon-bg">' +
    //         '<img src="images/my-done-img01.png" class="icon-pic">' +
    //         '</div>' +
    //         '<div class="intro-name">肖永生</div>' +
    //         '<div class="intro-sp">联系电话: <span>12312341234</span></div>' +
    //         '<div class="intro-sp">擅长领域: <span>农村社会新闻</span></div>' +
    //         '</div>' +
    //         '</div>' +
    //         '</div>';


    //     var danmaku = {
    //         "mode": 1,
    //         "text": danmakuItem,
    //         "stime": 0,
    //         "dur": dur,
    //     };


    //     cqrbdp.cm.load(danmakuItems);
    //     // cqrbdp.cm.start();

    //     cqrbdp.cm.startTimer();
    //     // cm.load(danmakuList);
    //     start = new Date().getTime();
    //     tmr = setInterval(function() {
    //         playhead = new Date().getTime() - start;
    //         cqrbdp.cm.time(playhead);
    //     }, 100);
    //     // });
    // }
    // cqrbdp.sendInfoItems(danmakuItems);

    cqrbdp.loadInfoItems = function(day, starthour, endhour) {
        cqrbdp.cm.clear();
        start = 0;
        try {
            clearTimeout(tmr);
        } catch (e) {}
        danmakuItems = cqrbdp.getInfoItems(day, starthour, endhour);
        cqrbdp.cm.load(danmakuItems);

        cqrbdp.cm.startTimer();
        start = new Date().getTime();
        tmr = setInterval(function() {
            playhead = new Date().getTime() - start;
            cqrbdp.cm.time(playhead);
        }, 100);

        if (isLoop) {
            var count = 0,
                dataListLength = danmakuItems.length;
            cqrbdp.cm.addEventListener('exitComment', function(cmt) {
                count++;
                if (count >= dataListLength - 1) {
                    count = 0;
                    startTime = Date.now(); // 设定起始时间
                    if (tmr >= 0) {
                        clearInterval(tmr); // 如果之前就有定时器，把它停掉
                    }
                    //建立新的定时器
                    tmr = setInterval(function() {
                        var playTime = Date.now() - startTime; // 用起始时间和现在时间的差模拟播放
                        cqrbdp.cm.time(playTime); // 通报播放时间
                    }, 100); // 模拟播放器每 100ms 通报播放时间
                }
            });
        };


    }
    cqrbdp.loadInfoItems();

    cqrbdp.cm.addEventListener('showCommentDetail', function(cmt) {
        var wrapper = cmt.dom;
        var wrapperWidth = $(wrapper).width();
        $(wrapper).children().css({
            "transform-origin": (wrapperWidth - headiconWidth) + 'px top',
            "animation-fill-mode": "forwards"
        });
        $(wrapper).addClass('danmaku-highlight');
        $(wrapper).find(".info-bar-detail").fadeIn();
        $(wrapper).children().addClass('info-bar-highlight');
        if (cmt.track == 2 || cmt.track == 3) {
            // console.log('bottom');
            $(wrapper).find(".info-bar-detail").addClass('show-up');
        };
    });
    cqrbdp.cm.addEventListener('hideCommentDetail', function(cmt) {
        var wrapper = cmt.dom;
        $(wrapper).removeClass('danmaku-highlight');
        $(wrapper).children().removeClass('info-bar-highlight');
        $(wrapper).find(".info-bar-detail").fadeOut();
        $(wrapper).children().addClass('info-bar-normal');
    });


    $("#btn-send").click(function() {
        cqrbdp.cm.send(danmaku);
    });
    $("#btn-stop").click(function() {
        stop();
    });
    $("#btn-continue").click(function() {
        resume();
    });
    $("#btn-reset").click(function() {
        reset();
    });
    $("#btn-loop").click(function() {
        // var tmr;
        startTime = Date.now(); // 设定起始时间
        if (tmr >= 0) {
            clearInterval(tmr); // 如果之前就有定时器，把它停掉
        }
        //建立新的定时器
        tmr = setInterval(function() {
            var playTime = Date.now() - startTime; // 用起始时间和现在时间的差模拟播放
            cqrbdp.cm.time(playTime); // 通报播放时间
        }, 100); // 模拟播放器每 100ms 通报播放时间
    });

    function stop() {
        cqrbdp.cm.stopTimer();
        clearInterval(tmr);
        tmr = -1;
    }

    function resume() {
        if (tmr !== -1)
            return;
        cqrbdp.cm.startTimer();
        start = new Date().getTime() - playhead;
        tmr = setInterval(function() {
            playhead = new Date().getTime() - start;
            cqrbdp.cm.time(playhead);
        }, 100);
    }

    function reset() {
        playhead = 0;
        start = (new Date()).getTime();
        cqrbdp.cm.clear();
    }
}



/**
 * 根据指定时间获取数据，并返回格式化后的信息条目
 * @param  {[type]} day       [description]
 * @param  {[type]} starthour [description]
 * @param  {[type]} endhour   [description]
 * @return {[type]}           [description]
 */
cqrbdp.getInfoItems = function(day, starthour, endhour) {

    // var dur = 20000; //各条目运行的时长，值越小走的越快
    // var delay = 1500; //各条目间隔时间，值越小两个之间间隔时间越短，容易发生重叠现象
    var rawData = [{
        "id": "1212", //id
        "name": "重庆日报官方微信",
        "accountUnit": "重庆日报",
        "author": "戴佳",
        "headPicUrl": "http://img5.imgtn.bdimg.com/it/u=3494656842,1664655621&fm=21&gp=0.jpg",
        "telphone": "13898878978",
        "title": "重庆实施五大功能区域",
        "domain": "社会新闻"
    }, {
        "id": "1212", //id
        "name": "重庆日报官方微信",
        "accountUnit": "重庆日报",
        "author": "戴佳",
        "headPicUrl": "http://img5.imgtn.bdimg.com/it/u=3494656842,1664655621&fm=21&gp=0.jpg",
        "telphone": "13898878978",
        "title": "重庆招聘制公务员 最高年薪20万",
        "domain": "社会新闻"
    }, {
        "id": "1212", //id
        "name": "重庆日报官方微信",
        "accountUnit": "重庆日报",
        "author": "戴佳",
        "headPicUrl": "http://img5.imgtn.bdimg.com/it/u=3494656842,1664655621&fm=21&gp=0.jpg",
        "telphone": "13898878978",
        "title": "南坪中学啦啦操队欧洲夺冠",
        "domain": "社会新闻"
    }, {
        "id": "1212", //id
        "name": "重庆日报官方微信",
        "accountUnit": "重庆日报",
        "author": "戴佳",
        "headPicUrl": "http://img5.imgtn.bdimg.com/it/u=3494656842,1664655621&fm=21&gp=0.jpg",
        "telphone": "13898878978",
        "title": "保障金融消费者八大权利发布",
        "domain": "社会新闻"
    }, {
        "id": "1212", //id
        "name": "重庆日报官方微信",
        "accountUnit": "重庆日报",
        "author": "戴佳",
        "headPicUrl": "http://img5.imgtn.bdimg.com/it/u=3494656842,1664655621&fm=21&gp=0.jpg",
        "telphone": "13898878978",
        "title": "重庆汽车消费节首日揽金3.7亿",
        "domain": "社会新闻"
    }, {
        "id": "1212", //id
        "name": "重庆日报官方微信",
        "accountUnit": "重庆日报",
        "author": "戴佳",
        "headPicUrl": "http://img5.imgtn.bdimg.com/it/u=3494656842,1664655621&fm=21&gp=0.jpg",
        "telphone": "13898878978",
        "title": "重庆招聘制公务员 最高年薪20万",
        "domain": "社会新闻"
    }, {
        "id": "1212", //id
        "name": "重庆日报官方微信",
        "accountUnit": "重庆日报",
        "author": "戴佳",
        "headPicUrl": "http://img5.imgtn.bdimg.com/it/u=3494656842,1664655621&fm=21&gp=0.jpg",
        "telphone": "13898878978",
        "title": "重庆实施五大功能区域",
        "domain": "社会新闻"
    }, {
        "id": "1212", //id
        "name": "重庆日报官方微信",
        "accountUnit": "重庆日报",
        "author": "戴佳",
        "headPicUrl": "http://img5.imgtn.bdimg.com/it/u=3494656842,1664655621&fm=21&gp=0.jpg",
        "telphone": "13898878978",
        "title": "南坪中学啦啦操队欧洲夺冠",
        "domain": "社会新闻"
    }, {
        "id": "1212", //id
        "name": "重庆日报官方微信",
        "accountUnit": "重庆日报",
        "author": "戴佳",
        "headPicUrl": "http://img5.imgtn.bdimg.com/it/u=3494656842,1664655621&fm=21&gp=0.jpg",
        "telphone": "13898878978",
        "title": "保障金融消费者八大权利发布",
        "domain": "社会新闻"
    }, {
        "id": "1212", //id
        "name": "重庆日报官方微信",
        "accountUnit": "重庆日报",
        "author": "戴佳",
        "headPicUrl": "http://img5.imgtn.bdimg.com/it/u=3494656842,1664655621&fm=21&gp=0.jpg",
        "telphone": "13898878978",
        "title": "重庆汽车消费节首日揽金3.7亿",
        "domain": "社会新闻"
    }];

    /**
     * 将从服务端加载到的数据变为为下面的格式
     * {"mode": 1,
     *   "text": danmakuItem,
     *   "stime": n * delay,
     *   "dur": dur
     * }
     */
    function formateRawData(rawData) {
        var result = [];
        for (var i = 0; i < rawData.length; i++) {
            var rawDataItem = rawData[i];
            var item = {};
            item.mode = 1;
            item.stime = i * cqrbdp.timeDely;
            item.dur = cqrbdp.infoItemDur;

            var headPicUrl = 'images/my-done-img01.png'; //后续直接使用rawDataItem.headPicUrl
            item.text = '<div class="info-bar">' +
                '<div class="info-bar-text">' + '<span>' + rawDataItem.title + '</span>' +
                '</div>' +
                '<div class="info-bar-headicon">' + '<img src="' + headPicUrl + '" style="width: 63px; height: 63px;">' +
                '</div>' +
                '<div class="info-bar-detail">' +
                '<div class="detail-pointer"><img src="images/sr-ct-bac16.png"></div>' +
                '<div class="detail-info"><img src="images/sr-ct-bac17.png" class="bg">' +
                '<div class="detail-info-title">' + rawDataItem.accountUnit + '</div>' +
                '<div class="detail-info-intro">' +
                '<div class="headicon">' +
                '<img src="images/sr-pc-bac01.png" class="icon-bg">' +
                '<img src="' + headPicUrl + '" class="icon-pic">' +
                '</div>' +
                '<div class="intro-name">' + rawDataItem.author + '</div>' +
                '<div class="intro-sp">联系电话: <span>' + rawDataItem.telphone + '</span></div>' +
                '<div class="intro-sp">擅长领域: <span>' + rawDataItem.domain + '</span></div>' +

                '</div>' +
                '</div>' +

                '</div>' +

                '</div>';
            result.push(item);
        }
        return result;
    }
    return formateRawData(rawData);
}
