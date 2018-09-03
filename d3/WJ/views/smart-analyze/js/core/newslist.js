// 新闻


IABS.initnewList = function() {
    // 头版头条热点
    var headlinesPaper = $('.hot-news').find('.frontPage').find('.paperMedia'); // 纸媒
    var headlinesNet = $('.hot-news').find('.frontPage').find('.netMedia'); // 网媒
    var max; // 最大转载量
    try {
        IABS.getHeadlines_paper(getHeadlines, headlinesPaper, max);
        IABS.getHeadlines_net(getHeadlines, headlinesNet, max);
    } catch (e) {
        console.error(e.message);
    }

    function getHeadlines(data, ele, max) {
        for (var a = 0; a < data.CONTENT.length; a++) {
            var mediaContentCon = document.createElement('div');
            mediaContentCon.classList.add('mediaContent');
            ele.append(mediaContentCon);
            var circleCon = document.createElement('div');
            circleCon.classList.add('circle');
            mediaContentCon.appendChild(circleCon);
            circleCon.innerHTML = '<div class="circleOuter"></div><div class="circleInner"></div>';
            var circleD = document.createElement('div');
            circleD.classList.add('circleD');
            circleCon.appendChild(circleD);
            drawDynamicbar(circleD, Math.round(data.CONTENT[a].HOTPOINTNUM / max * 100));
            var textCon = document.createElement('div');
            textCon.classList.add('textCon');
            mediaContentCon.appendChild(textCon);
            var text = document.createElement('div');
            text.classList.add('text');
            text.innerHTML = data.CONTENT[a].TITLE;
            textCon.appendChild(text);
            var value = document.createElement('div');
            value.classList.add('value');
            value.innerHTML = '转载数：<span>' + data.CONTENT[a].HOTPOINTNUM + '</span>';
            textCon.appendChild(value);
        }
    }

    function drawDynamicbar(ele, percent) {
        var option;
        option = {
            parent: ele,
            animated: true,
            width: 35,
            radius: 15,
            arc: 3,
            perent: percent,
            color: ['rgba(255,255,255,0)', '#CD450B'],
            textColor: '#CD450B',
            textSize: '0px'
        };
        drawDynamicBar(option);
    }


    // 垂直行热点分布
    var element = $('.hot-news').find('.right');
    try {
        IABS.getHotNews_right(getHotNews);
    } catch (e) {
        console.error(e.message);
    }

    function getHotNews(data) {
        for (var i = 0; i < data.CONTENT.length; i++) {
            var newsCon = document.createElement('div');
            newsCon.classList.add('rightNewsCon');
            newsCon.innerHTML = '<div class="type">' + data.CONTENT[i].title + '</div><div class="contentCon" id="contentCon' + i + '"></div>';
            element.append(newsCon);
            var contentCon = document.getElementById('contentCon' + i);
            for (var j = 0; j < data.CONTENT[i].data.length; j++) {
                var contentOuter = document.createElement('div');
                contentOuter.classList.add('contentOuter');
                contentCon.append(contentOuter);
                var contentDiv = document.createElement('div');
                contentDiv.classList.add('content');
                contentDiv.innerHTML = data.CONTENT[i].data[j].SHORTTITLE;
                if (contentDiv.innerHTML.length < 14) {
                    contentDiv.classList.add('shortTitle');
                }
                contentOuter.appendChild(contentDiv);
            }
        }

    }

    var picH = 62; //移动高度
    var scrollstep = 3; //移动步幅,越大越快
    var scrolltime = 30; //移动频度(毫秒)越大越慢
    var stoptime = 1000; //间断时间(毫秒)
    var tmpH = 0;
    var Mars = document.querySelectorAll('.contentCon');
    setTimeout(function() {
        for (var i = 0; i < Mars.length; i++) {
            var Mar = Mars[i];
            var child_div = Mar.getElementsByTagName("div");
            if (child_div.length > 2) { // 分类下只有一条新闻 不进行滚动
                start(Mar, tmpH, child_div);
            }
        }
    }, stoptime);

    function start(Mar, tmpH, childDiv) {
        if (tmpH < picH) {
            tmpH += scrollstep;
            if (tmpH > picH) tmpH = picH;
            Mar.scrollTop = tmpH;
            setTimeout(function() {
                start(Mar, tmpH, childDiv);
            }, scrolltime);
        } else {
            tmpH = 0;
            Mar.appendChild(childDiv[0]);
            Mar.scrollTop = 0;
            setTimeout(function() {
                start(Mar, tmpH, childDiv);
            }, stoptime);
        }
    }

};
