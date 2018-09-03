video.drawChart = function() {
    // var scaleValue = video.getScaleAndLocation().scale;
    var container = $('.bar_chart');
    var isLoaded = false;
    var reDrawInterval = video.configData.drawBarInterval || 5;
    //svg大小
    // var svgWidth = 800,
    //     svgHeight = 480;
    var svgWidth = container.width(),
        svgHeight = container.height() - 50;

    //图区域的大小
    var contentWidth = svgWidth - 50,
        contentHeight = svgHeight - 50;

    //图相对于svg的偏移量
    var leftMove = 60,
        topMove = 20;

    //坐标轴信息与轴的距离
    var tickPadding = 20,
        tickPaddingX = 5;

    var container = d3.select('.bar_chart');
    var svg = container.append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .style('overflow', 'visible')
        .style('position', 'relative')
        .style('top', '50px');
    svg.append('text')
        .classed('bar-chart-explain', true)
        .attr('x', '0')
        .attr('y', '0')
        .text('监控数量')


    var colorGradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'barColorGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')
        .attr('spreadMethod', 'pad');
    colorGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#000000')
        .attr('stop-opacity', '0');
    colorGradient.append('stop')
        .attr('offset', '50%')
        .attr('stop-color', '#000000')
        .attr('stop-opacity', '0');
    colorGradient.append('stop')
        .attr('offset', '51%')
        .attr('stop-color', '#1F5779')
        .attr('stop-opacity', '0.2');
    colorGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#1F5779')
        .attr('stop-opacity', '0.1');

    var colorGradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'areaColorGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')
        .attr('spreadMethod', 'pad');
    colorGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#07659E')
        .attr('stop-opacity', '0.3');
    colorGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#07659E')
        .attr('stop-opacity', '0');

    /**
     * 处理数据
     * 数据决定x轴和y轴
     */

    //堆叠图布局
    var stack = d3.stack()
        .keys(['offline', 'online'])
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);
    var barDataset = video.getBarData();
    var thisyearSeries = stack(barDataset);
    var barDataMax = (function() {
        var maxIndex = 0;
        var max;
        for (var i = 0; i < barDataset.length; i++) {
            if (typeof max === 'undefined') {
                max = parseInt(barDataset[maxIndex].online) + parseInt(barDataset[maxIndex].offline);
            }
            var val = parseInt(barDataset[i].online) + parseInt(barDataset[i].offline);
            if (val > max) {
                max = val;
                maxIndex = i;
            }
        }
        return barDataset[maxIndex];
    })();
    console.log(barDataMax);

    //横坐标
    var xAxisTicks = (function() {
        var result = [];
        for (var i = 0; i < barDataset.length; i++) {
            result.push(barDataset[i].name);
        }
        return result;
    })();
    // debugger;

    //颜色
    var colors = ['#8b3cbb', '#16baff'];

    //x轴比例尺
    var xAxisScale = d3.scaleBand()
        .domain(xAxisTicks)
        .rangeRound([0, contentWidth])
        .paddingInner([0.5])
        .paddingOuter([0.5]);
    //x轴
    var xAxis = d3.axisBottom(xAxisScale)
        .tickSizeInner([0])
        .tickSizeOuter([0])
        .tickPadding([tickPaddingX]);

    var yMax = 5000;

    // 垂直方向的比例尺
    var yScale = d3.scaleLinear()
        .domain([0, yMax])
        // .rangeRound([0, 400]);
        .range([0, contentHeight]);

    // y轴比例尺--柱状图
    var yAxisScaleBar = d3.scaleLinear()
        .domain([0, yMax])
        // .domain([0, d3.max(dataset)])
        .rangeRound([contentHeight, 0])
        .nice();

    // y轴--柱状图
    var yAxisBar = d3.axisLeft(yAxisScaleBar)
        .tickSizeInner([0])
        .tickSizeOuter([0])
        .ticks([6])
        .tickPadding([tickPadding]);
    //添加坐标轴
    svg.append('g')
        .classed('axis-container xaxis', true)
        .attr('transform', 'translate(' + leftMove + ', ' + (contentHeight + topMove) + ')')
        .call(xAxis);
    svg.append('g')
        .classed('axis-container yaxis-left', true)
        .attr('transform', 'translate(' + (leftMove) + ', ' + topMove + ')')
        .call(yAxisBar);

    //添加水平分割线
    var ticks = [1000, 2000, 3000, 4000, 5000];
    svg.append('g')
        .classed('divide-line-container', true)
        .selectAll('line')
        .data(ticks)
        .enter()
        .append('line')
        .classed('divide-line', true)
        .attr('x1', leftMove)
        .attr('x2', (leftMove + contentWidth))
        .attr('y1', function(d, i) {
            return yAxisScaleBar(d) + topMove;
        })
        .attr('y2', function(d, i) {
            return yAxisScaleBar(d) + topMove;
        })
        .style('stroke', function(d, i) {
            if (d == 0) {
                return 'rgba(221, 98, 97, 0.5)';
            }
        });

    svg.append('g')
        .classed('divide-dots-container', true)
        .selectAll('circle')
        .data(ticks)
        .enter()
        .append('circle')
        .attr('cx', leftMove - 10)
        .attr('cy', function(d, i) {
            return yAxisScaleBar(d) + topMove;
        })
        .attr('r', 3)
        .style('fill', function(d, i) {
            if (d == 0) {
                return 'rgba(221, 98, 97, 0.5)';
            }
        });

    // 添加柱的背景
    svg.append('g')
        .classed('bar-bg', true)
        .selectAll('rect.bg')
        .data(xAxisTicks)
        .enter()
        .append('rect')
        .classed('bg', true)
        .attr('width', xAxisScale.step() * 0.5)
        .attr('height', contentHeight)
        .attr('fill', 'rgba(255, 255, 255, 0.1)')
        .attr('x', function(d, i) {
            return xAxisScale(xAxisTicks[i]) + leftMove - xAxisScale.step() * 0.5;
        })
        .attr('y', function(d, i) {
            return topMove;
        });

    svg.select('g.bar-bg')
        .append('rect')
        .classed('bg', true)
        .attr('width', xAxisScale.step() * 0.5)
        .attr('height', contentHeight)
        .attr('fill', 'rgba(255, 255, 255, 0.1)')
        .attr('x', function(d, i) {
            return xAxisScale(xAxisTicks[xAxisTicks.length - 1]) + leftMove + xAxisScale.step() * 0.5;
        })
        .attr('y', function(d, i) {
            return topMove;
        });
    /**
     * svg中没有z-index，根据画的顺序决定堆叠的次序
     */

    /**
     * 定义效果执行顺序
     */
    var dispatch = d3.dispatch('barStart', 'barDone', 'linePointsDone', 'lineDone', 'areaDone', 'lineMarkDone', 'lineTextsDone');
    dispatch.on('barDone', drawLine);

    drawBar();

    // 添加柱
    function drawBar() {
        var endCount = 0;
        var totalEndCount = thisyearSeries.length * 2;
        var rects = svg.selectAll('g.month-type2')
            .data(thisyearSeries)
            .enter()
            .append('g')
            .classed('month-type2', true)
            .attr('group-index', function(d, i) {
                return i;
            })
            .style('fill', function(d, i) {
                return colors[i];
            })
            .selectAll('rect')
            .data(function(d) {
                return d;
            })
            .enter()
            .append('rect')
            .classed('content', true)
            .attr('width', xAxisScale.step() * 0.5)
            .attr('x', function(d, i) {
                return xAxisScale(xAxisTicks[i]) + leftMove;
            })
            .attr('y', function(d, i) {
                return contentHeight + topMove;
            });

        rects.transition()
            .duration([1500])
            .ease(d3.easeElasticOut)
            .delay(function(d, i) {
                return i * 100;
            })
            .attr('height', function(d, i) {
                var result = yScale(d[1] - d[0]);
                return result > 0 ? result : 0;
            })
            .attr('y', function(d, i) {
                return (contentHeight + topMove - yScale(d[0])) - yScale(d[1] - d[0]);
            })
            .on('end', function() {
                endCount += 1;
                if (endCount == totalEndCount) {
                    console.log('bar-done');
                    // dispatch.call('barDone');
                    setTimeout(reDraw, reDrawInterval*1000);
                }
            });

        svg.append('text')
            .classed('max-value', true)
            .attr('x', function() {
                return xAxisScale(barDataMax.name) + leftMove + xAxisScale.bandwidth() / 2;
            })
            .attr('y', function() {
                return topMove
            })
            .text(function() {
                return parseInt(barDataMax.online) + parseInt(barDataMax.offline);
            })


        /**
         * 添加柱图的渐变颜色
         * 添加显示tooltips面板的触发事件
         * @type {Object}
         */
        // var panelArgument = {};
        var colorBg = svg.select('g[group-index="1"]')
            .append('g')
            .classed('color-bg', true)
            .selectAll('rect')
            .data(function(d) {
                return d;
            })
            .enter()
            .append('rect')
            .attr('x', function(d, i) {
                return xAxisScale(xAxisTicks[i]) + leftMove;
            })
            .attr('y', contentHeight + topMove - yScale(0))
            .attr('width', xAxisScale.bandwidth())
            .style('fill', 'url(#barColorGradient)');

        colorBg.transition()
            .duration([1500])
            .ease(d3.easeElasticOut)
            .delay(function(d, i) {
                return i * 100;
            })
            .attr('y', function(d, i) {
                return contentHeight + topMove - yScale(d[1]);
            })
            .attr('height', function(d, i) {
                return yScale(d[1])
            })
            .on('end', function() {
                endCount += 1;
                if (endCount == totalEndCount) {
                    // dispatch.call('barDone');
                    video.addTooltipTrigger();
                }
            });

        video.addTooltipTrigger = function() {
            var panelArgument = {};
            var tooltipTrigger = svg.append('g')
                .classed('tooltip-trigger', true)
                .selectAll('rect')
                .data(barDataset)
                .enter()
                .append('rect')
                .attr('x', function(d, i) {
                    return xAxisScale(d.name) + leftMove;
                })
                .attr('y', function(d, i) {
                    // return contentHeight + topMove - yScale(d[1]);
                    return topMove;
                })
                .attr('height', function(d, i) {
                    return contentHeight;
                })
                .attr('width', xAxisScale.bandwidth())
                .attr('fill', 'transparent')
                .on('mouseenter', function(data, index, nodes) {
                    var event = d3.event;
                    panelArgument.pos = {
                        x: event.clientX / video.scaleValue,
                        y: event.clientY / video.scaleValue
                    }
                    panelArgument.bindWidth = Math.round(xAxisScale.bandwidth()) + 10;
                    panelArgument.data = barDataset[index];
                    // panelArgument.data.lastyear = lastyearBarDataset[index];
                    // panelArgument.data.thisyear = thisyearBarDataset[index];
                    // panelArgument.data.yoy = yoy[data.name];
                    video.updateDataPanel('show', panelArgument);
                })
                .on('mouseleave', function() {
                    video.updateDataPanel('hide');
                })
                .on('mousemove', function() {
                    panelArgument.pos.x = d3.event.clientX / video.scaleValue;
                    panelArgument.pos.y = d3.event.clientY / video.scaleValue;
                    // video.updateDataPanel('update', panelArgument);
                    throttle(video.updateDataPanel, null, ['update', panelArgument]);
                });
        }
        video.addTooltipTrigger();

        function reDraw() {
            var endCount = 0,
                totalEndCount = thisyearSeries.length * 2;
            rects.attr('height', 0)
                .attr('y', function(d, i) {
                    return contentHeight + topMove;
                })
                .transition()
                .duration([1500])
                .ease(d3.easeElasticOut)
                .delay(function(d, i) {
                    return i * 100;
                })
                .attr('height', function(d, i) {
                    var result = yScale(d[1] - d[0]);
                    return result > 0 ? result : 0;
                })
                .attr('y', function(d, i) {
                    return (contentHeight + topMove - yScale(d[0])) - yScale(d[1] - d[0]);
                })
                .on('end', function() {
                    endCount += 1;
                    if (endCount == totalEndCount) {
                        setTimeout(reDraw, reDrawInterval*1000);
                    }
                });
        }
    }

    /**
     * 节流
     */
    function throttle(method, context, argument) {
        clearTimeout(method.interval);
        method.interval = setTimeout(function() {
            method.apply(context, argument);
        }, 15);
    }

    /**
     * 折线图
     */
    function drawLine() {
        /**
         * 重绘折线图区域，需要清除之前的效果
         * @return {[type]} [description]
         */
        video.updateLine = function(dataItemCount) {
            svg.select('g.line-content-container')
                .selectAll('*')
                .remove();
            linePath = svg.select('g.line-content-container')
                .append('path')
                .attr('stroke', '#fff')
                .attr('stroke-width', '2px')
                .attr('fill', 'none');
            if (dataItemCount > 0) {
                drawLinePoints();
            }

        }

        /**
         * 执行顺序
         * 1.画点-动画，其他点和线
         * 2.显示面积区域渐变
         * 3.首尾标注
         */
        // dispatch.on('linePointsDone', drawLinePath);
        dispatch.on('lineDone', drawLineArea);
        dispatch.on('areaDone', showLineMark);
        dispatch.on('lineMarkDone', showLineTexts);
        dispatch.on('lineTextsDone', video.addTooltipTrigger);

        var lineContent = svg.append('g')
            .classed('line-content-container', true)

        var linePath = svg.select('g.line-content-container')
            .append('path')
            .attr('stroke', '#fff')
            .attr('stroke-width', '2px')
            .attr('fill', 'none');

        drawLinePoints(); //画点

        function getLinePoints() {
            var line = d3.line()
                .x(function(d, i) {
                    return xAxisScale(d.name) + leftMove + xAxisScale.bandwidth() * 0.5;
                })
                .y(function(d, i) {
                    return yScaleLine(yoy[d.name].total) + topMove;
                });
            return line(thisyearBarDataset);
        }

        function getAreaPath(state) {
            var area = d3.area()
                .x(function(d, i, arr) {
                    if (i == 0) {
                        return xAxisScale(d.name) + leftMove;
                    } else if (i == arr.length - 1) {
                        return xAxisScale(d.name) + leftMove + xAxisScale.bandwidth();
                    } else {
                        return xAxisScale(d.name) + leftMove + xAxisScale.bandwidth() * 0.5;
                    }
                })
                .y1(function(d, i) {
                    return yScaleLine(yoy[d.name].total) + topMove;
                });
            if (state == 0) {
                area.y0(function(d, i) {
                    return yScaleLine(yoy[d.name].total) + topMove;
                })
            } else if (state == 1) {
                area.y0(function(d, i) {
                    return contentHeight + topMove;
                })
            }
            return area(thisyearBarDataset);
        }

        //划线
        function showLinePath() {
            linePath.classed('line-data', true)
                .attr('d', getLinePoints())
                .style('stroke-dasharray', function() {
                    return this.getTotalLength();
                })
                .style('stroke-dashoffset', function() {
                    return this.getTotalLength();
                });
            d3.timeout(function() {
                dispatch.call('lineDone');
            }, 1500); //曲线动画执行时间
        }

        //划折线下区域渐变色
        function drawLineArea() {
            var linearea = svg.select('g.line-content-container')
                .append('path')
                .classed('line-area', true)
                .style('fill', 'url(#areaColorGradient)')
                .attr('d', getAreaPath(0));

            linearea.transition()
                .duration([800])
                .attr('d', getAreaPath(1))
                .on('end', function() {
                    dispatch.call('areaDone');
                })
        }

        //画点
        function drawLinePoints() {
            var delay = 1500 / xAxisTicks.length;
            //画点-圆环

            var dots1 = svg.select('g.line-content-container')
                .append('g')
                .classed('dots-container', true)
                .selectAll('circle')
                .data(thisyearBarDataset)
                .enter()
                .append('circle')
                .classed('dot-ring', true)
                .attr('cx', function(d, i) {
                    return xAxisScale(d.name) + leftMove + xAxisScale.bandwidth() / 2;
                })
                .attr('cy', function(d, i) {
                    return yScaleLine(yoy[d.name].total) + topMove;
                });

            var dots2Container = svg.select('g.line-content-container')
                .append('g')
                .classed('dots-container2', true);
            //首位实心点
            var dots2 = dots2Container.selectAll('circle')
                .data(thisyearBarDataset)
                .enter()
                .append('circle')
                .classed('dot-inner', true)
                .style('fill', function(d, i, arr) {
                    if (i == 0 || i == arr.length - 1) {
                        return '#fff';
                    } else {
                        return 'transparent';
                    }
                })
                .attr('cx', function(d, i) {
                    return xAxisScale(d.name) + leftMove + xAxisScale.bandwidth() / 2;
                })
                .attr('cy', function(d, i) {
                    return yScaleLine(yoy[d.name].total) + topMove;
                });
            //第一个点需要执行动画
            var firstDot = dots2Container.select('circle.dot-inner')
                .attr('r', 0)
                .transition()
                .duration([400])
                .attr('r', 10)
                .transition()
                .duration([200])
                .attr('r', 7)
                .on('end', function() {
                    // 动画结束后，显示线和其他点
                    showLinePath();
                    showOtherDots();
                });

            dots2Container.append('text')
                .classed('line-label', true)
                .attr('x', function() {
                    return xAxisScale(thisyearBarDataset[0].name) + leftMove + xAxisScale.bandwidth() / 2 - 15;
                })
                .attr('y', function() {
                    return yScaleLine(yoy[thisyearBarDataset[0].name].total) + topMove + 5;
                })
                .text('同比');


            function showOtherDots() {
                dots1.transition()
                    .delay(function(d, i) {
                        return i * delay;
                    })
                    .attr('r', 8);
                dots2.transition()
                    .delay(function(d, i) {
                        return i * delay;
                    })
                    .attr('r', 6);
            }

        }

        //显示折线峰值数据量
        function showLineMark() {
            var markData = getLineMarkData();
            var markWrappers = svg.select('g.line-content-container')
                .selectAll('g.line-mark')
                .data(markData)
                .enter()
                .append('g')
                .style('opacity', 0);

            markWrappers.append('image')
                .attr('x', function(d, i) {
                    return xAxisScale(d.name) + leftMove + xAxisScale.bandwidth() / 2 - video.configData.markWidth / 2;
                })
                .attr('y', function(d, i) {
                    return yScaleLine(yoy[d.name].total) + topMove - video.configData.markHeight - 10;
                })
                .attr('width', video.configData.markWidth)
                .attr('height', video.configData.markHeight)
                .attr('xlink:href', function(d, i) {
                    return 'images/mark' + i + '.png';
                });
            markWrappers.append('text')
                .attr('x', function(d, i) {
                    return xAxisScale(d.name) + leftMove + xAxisScale.bandwidth() / 2;
                })
                .attr('y', function(d, i) {
                    return yScaleLine(yoy[d.name].total) + topMove - video.configData.markHeight / 2 - 7;
                })
                .text(function(d, i) {
                    return (Number(yoy[d.name].total) * 100).toFixed(2) + '%';
                });
            markWrappers.classed('line-mark', true)
                .classed('line-mark2', function(d, i, array) {
                    if (i == 0) {
                        return true;
                    }
                    return false;
                });
            // if (initLine == true) {
            //     initLine = false;
            // }
            dispatch.call('lineMarkDone');
        }

        function getLineMarkData() {
            return [thisyearBarDataset[thisyearBarDataset.length - 1], thisyearBarDataset[0]];
        }

        function showLineTexts() {
            var lineEndCount = 0;
            var lineTotalEndCount = thisyearBarDataset.length;
            var lineText = lineContent.append('g')
                .classed('line-text-container', true)
                .selectAll('text')
                .data(thisyearBarDataset)
                .enter()
                .append('text')
                .text(function(d, i, arr) {
                    if (i == 0 || i == arr.length - 1) {
                        return '';
                    }
                    // debugger;
                    return (Number(yoy[d.name].total) * 100).toFixed(2) + '%';
                })
                .style('opacity', 0)
                .attr('x', function(d, i) {
                    var gap = 5 - i;
                    return xAxisScale(d.name) + leftMove + xAxisScale.bandwidth() * (1.1 + gap) / 2;
                })
                .attr('y', function(d, i) {
                    return yScaleLine(yoy[d.name].total) + topMove - 20;
                });

            lineText.transition()
                .duration(500)
                .style('opacity', 1)
                .attr('x', function(d, i) {
                    return xAxisScale(d.name) + leftMove + xAxisScale.bandwidth() / 2;
                })
                .on('end', function(d, i) {
                    lineEndCount += 1;
                    if (lineEndCount == lineTotalEndCount) {
                        // debugger;
                        dispatch.call('lineTextsDone');
                    }
                });
        }

    }
}


video.panel = {
    node: $('.data-panel'),
    showing: false
};

video.updateDataPanel = function(type, argument) {
    if (type == 'show') {
        show(argument);
    } else if (type == 'hide') {
        hide();
    } else if (type == 'update') {
        update(argument);
    }

    function show(argument) {
        updatePanelContent();
        video.panel.node.show();
        // video.panel.showing = true;
        var originalHeight = video.panel.size ? video.panel.size.height : 0;
        video.panel.size = {
            width: video.panel.node.width(),
            height: video.panel.node.height()
        }
        if (originalHeight != video.panel.size.height) {
            video.panel.boundary = {
                maxLeft: video.chartContainerPos.width + video.chartContainerPos.left - video.panel.size.width,
                minLeft: video.chartContainerPos.left,
                maxTop: video.chartContainerPos.height + video.chartContainerPos.top - video.panel.size.height,
                minTop: video.chartContainerPos.top
            }
        }
        video.panel.node.offset(getPos(argument));
        // console.log(getPos(argument));
    }

    function hide() {
        video.panel.node.hide();
        // video.panel.showing = false;
    }

    function update() {
        video.panel.node.offset(getPos(argument));
    }

    function getPos(argument) {
        var result = {
            top: argument.pos.y + 10,
            left: argument.pos.x + argument.bindWidth
        }
        if (result.top < video.panel.boundary.minTop) {
            result.top = video.panel.boundary.minTop;
        } else if (result.top > video.panel.boundary.maxTop) {
            result.top = result.top - video.panel.size.height;
        }
        if (result.left < video.panel.boundary.minLeft) {
            result.left = video.panel.boundary.minLeft;
        } else if (result.left > video.panel.boundary.maxLeft) {
            result.left = result.left - video.panel.size.width - 2 * argument.bindWidth;
        }
        result.top = result.top * video.scaleValue;
        result.left = result.left * video.scaleValue;
        return result;
    }

    /**
     * 为panel添加内容
     * 设置需要隐藏的项
     * @return {[type]} [description]
     */
    function updatePanelContent() {
        var content = argument.data;
        $('.data-panel .online .value').text(content.online);
        $('.data-panel .offline .value').text(content.offline);
        var val = (Number(parseInt(content.offline) / (parseInt(content.online) + parseInt(content.offline))) * 100).toFixed(2) + '%';
        $('.data-panel .ratio .value').text(val);
    }
}
