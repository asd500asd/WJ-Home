(function() {
    var st = {
        chart: {}
    };
    //全局变量暴露
    window.st = st;
})();
(function() {
    st.chart.spread = function(initData) {
        var textNodeName, childName;
        if (initData.config.normalizeDataFlag) {
            if (!initData.data) {
                alert("子节点标识或文本显示的数据字段名称不能为空!");
                return;
            } else {
                initData.data = normalizeData(initData.data);
            }
            textNodeName = initData.config.textNodeName;
            childName = initData.config.childName;
        } else {
            textNodeName = "IR_SCREEN_NAME";
            childName = "CHILD";
        }
        var jsonData = [];
        var jsonDataItem = [];
        var jsonDataItemDetail = {};
        jsonDataItemDetail[textNodeName] = initData.data[0].parentInfo[0][textNodeName];
        jsonDataItem.push(jsonDataItemDetail);
        jsonDataItemDetail[childName] = [];
        for (var i = 0; i < initData.data[0].spreadInfo.length; i++) {
            var jsonDataItemDetailItem = [];
            jsonDataItemDetailItem.push(initData.data[0].spreadInfo[i]);
            jsonDataItemDetail[childName].push(jsonDataItemDetailItem);
        }
        jsonData.push(jsonDataItem);
        var deep = 0;
        var links = [];
        Traverse(jsonData, deep);

        function Traverse(jsonData, deep) {
            var size;
            if (deep == 0) {
                size = initData.config.circleSize;
            } else if (deep == 1) {
                size = initData.config.circleSize - 10;
            } else {
                size = initData.config.circleSize - 10 - (deep*3);
            }
            if (size <= 0) {
                size = 1;
            }
            for (var i = 0; i < jsonData.length; i++) {
                if (jsonData[i][0][childName].length != 0) {
                    for (var j = 0; j < jsonData[i][0][childName].length; j++) {
                        linkDataItem = {};
                        linkDataItem.source = {};
                        linkDataItem.source.name = jsonData[i][0][textNodeName];
                        linkDataItem.source.size = size;
                        linkDataItem.target = {};
                        linkDataItem.target.name = jsonData[i][0][childName][j][0][textNodeName];
                        if (deep == 0) {
                            linkDataItem.target.size = linkDataItem.source.size - 10;
                        } else {
                            linkDataItem.target.size = linkDataItem.source.size - 3;
                            if(linkDataItem.target.size<=0){
                                linkDataItem.target.size=1;
                            }
                        }
                        links.push(linkDataItem);
                    }
                    Traverse(jsonData[i][0][childName], ++deep);
                }
            }
        }
        var nodes = {};
        console.log(links);

        links.forEach(function(link) {
            link.source = nodes[link.source.name] || (nodes[link.source.name] = {
                name: link.source.name,
                size: link.source.size
            });
            link.target = nodes[link.target.name] || (nodes[link.target.name] = {
                name: link.target.name,
                size: link.target.size
            });
        });
        // if (!nodes[link.source.name]) {
        //         nodes[link.source.name] = {
        //             name: link.source.name,
        //             size: link.source.size
        //         };
        //     }
        //     if (!nodes[link.target.name]) {
        //         nodes[link.target.name] = {
        //             name: link.target.name,
        //             size: link.target.size
        //         }
        //     }
        console.log(nodes);
        d3.values(nodes);
        var width = d3.select(initData.renderTo)[0][0].clientWidth != 0 ? d3.select(initData.renderTo)[0][0].clientWidth : initData.config.width;
        var height = d3.select(initData.renderTo)[0][0].clientHeight != 0 ? d3.select(initData.renderTo)[0][0].clientHeight : initData.config.height;
        var force = d3.layout.force()
            .nodes(d3.values(nodes))
            .links(links)
            .size([width, height])
            .linkDistance(initData.config.lineLength)
            .charge(-400)
            .on("tick", tick)
            .start();

        var svg = d3.select(initData.renderTo).append("svg")
            .attr("width", width)
            .attr("height", height);

        // Per-type markers, as they don't inherit styles.
        // svg.append("defs").selectAll("marker")
        //     .data(["suit", "licensing", "resolved"])
        //   .enter().append("marker")
        //     .attr("id", function(d) { return d; })
        //     .attr("viewBox", "0 -5 10 10")
        //     .attr("refX", 15)
        //     .attr("refY", -1.5)
        //     .attr("markerWidth", 6)
        //     .attr("markerHeight", 6)
        //     .attr("orient", "auto")
        //     .append("path")
        //     .attr("d", "M0,-5L10,0L0,5");

        var path = svg.append("g").selectAll("path")
            .data(force.links())
            .enter().append("path")
            .attr("fill", "none")
            .attr("stroke", initData.config.lineColor)
            .attr("stroke-width", initData.config.lineWidth)
            .attr("d", linkArc);
        // .attr("class", function(d) { return "link " + d.type; })
        // .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

        var circle = svg.append("g").selectAll("circle")
            .data(force.nodes())
            .enter().append("circle")
            .attr("r", function(d) {
                return d.size;
            })
            .attr("fill", initData.config.circleColor)
            .call(force.drag);

        var text = svg.append("g").selectAll("text")
            .data(force.nodes())
            .enter().append("text")
            .attr("fill", initData.config.textColor)
            .attr("font-size", initData.config.textSize)
            .attr("font-family", initData.config.textfontfamily)
            .attr("x", function(d) {
                return d.size;
            })
            .attr("y", ".31em")
            .text(function(d) {
                return d.name;
            });

        // Use elliptical arc path segments to doubly-encode directionality.
        function tick() {
            path.attr("d", linkArc);
            circle.attr("transform", function(d){
                return "translate(" + d.x + "," + d.y + ")";
            });
            text.attr("transform", function(d){
                return "translate(" + d.x + "," + d.y + ")";
            });
        }

        function linkArc(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        }
        function GetRandomNum(Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        }

        function normalizeData(data) {
            var finalData = [];
            var finalDataObject = {};
            var i = 0;
            for (var name in data[0]) {
                if (i == 0) {
                    finalDataObject.parentInfo = data[0][name];
                } else if (i == 1) {
                    finalDataObject.spreadInfo = data[0][name];
                }
                i++;
            }
            finalData.push(finalDataObject);
            return finalData;
        }
    }
})();
$(function() {
    //初始化路径传播分析图
    st.chart.spread({
            renderTo: '.wb-lj-fx', //将路径图放置到你页面的位置
            data:window.json,//json数据
            config: {
                circleSize: 30, //最大圆环的大小,
                circleColor: "rgb(67, 123, 197)", //圆环的颜色
                textSize: 10, //文字大小
                textColor: "rgb(67, 123, 197)", //文字的颜色
                textfontfamily: "微软雅黑", //文字字体
                lineLength: 150, //连线的长度
                lineColor: "rgb(67, 123, 197)", //连线的颜色
                lineWidth: 0.5, //连线的宽度
                width: 1000, //画布的默认宽，如果放置到的页面位置的div没有设置宽
                height: 500,//画布的默认高，如果放置到的页面位置的div没有设置高
                normalizeDataFlag:true,//数据是否需要处理
                childName:"CHILD",//子节点标识(当数据需要处理时有效)
                textNodeName:"IR_SCREEN_NAME1"//文本显示的数据字段名称(当数据需要处理时有效)                  
            }
        }
    );
})