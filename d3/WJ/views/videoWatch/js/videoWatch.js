$(function() {
	var myChart = echarts.init($('.video_watch .thermodynamic_chart .chart').get(0));
	var option = {
		title: {
			text: '全区视频监控信息采集热力图',
			left: 'center',
			textStyle: {
				color: '#fff',
				fontSize: 22,
				fontWeight: 'normal'
			}
		},
		legend: {},
		tooltip: {
			trigger: 'item',
			formatter: function(params) {
				return params.name + ' : ' + params.value[2];
			}
		},
		visualMap: {
			min: 0,
			max: 100000,
			calculable: false,
			inRange: {
				color: ['green', 'yellow', 'red']
			},
			itemHeight: 250,
			top: '10%',
			left: '10%'
		},
		geo: {
			map: '内蒙古',
			layoutCenter: ['50%', '50%'],
			layoutSize: '110%',
			label: {
				normal: {
					show: true,
					textStyle: {
						color: '#fff',
						fontFamily: 'Microsoft YaHei'
					}
				},
				emphasis: {
					show: true,
					textStyle: {
						color: '#fff',
						fontFamily: 'Microsoft YaHei'
					}
				}
			},
			itemStyle: {
				normal: {
					borderColor: '#0ef',
					borderWidth: 2,
					areaColor: '#002944'
				},
				emphasis: {
					areaColor: '#323c48'
				}
			}
		},
		series: [{
			name: '视频监控采集数量',
			type: 'effectScatter',
			coordinateSystem: 'geo',
			data: thermodynamic_chart,
			symbolSize: function(params) {
				return params[2] / 5000;
			},
			rippleEffect: {
				//特效宽度不可控，通过改动源码46616实现2px宽度
				scale: 10, //控制动画半径
				brushType: 'stroke'
			},
			label: {
				normal: {
					show: false
				},
				emphasis: {
					show: false
				}
			},
			itemStyle: {
				normal: {
					opacity: 0.5
				}
			}
		}]
	};
	console.log(option);
	myChart.setOption(option);
});

/*$(function() {
	function repeat() {
		var myChart = echarts.init($('.video_watch .rigth_chart .bar_chart').get(0));
		var option = {
			title: {
				text: '全区视频监控情况统计',
				left: 'center',
				textStyle: {
					color: '#fff',
					fontSize: 22,
					fontWeight: 'normal'
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: ''
				},
				formatter: function(params, ticket) {
					return '在线 : ' + params[1].data + '<br />离线 : ' + params[0].data + '<br />在线率 :' + (100 * params[1].data / (params[1].data + params[0].data)).toFixed(1) + '%';
				}
			},
			
			xAxis: [{
				type: 'category',
				axisLabel: {
					rotate: 45,
					interval:0,
					textStyle: {
						color: '#fff',
						fontSize: 12
					}
				},
				axisTick: {
					show: false
				},
				name: '盟市',
				nameTextStyle: {
					color: '#00f1ff'
				},
				data: ['阿拉善', '乌海', '鄂尔多斯', '巴彦淖尔', '包头', '呼兰浩特', '乌兰察布', '锡林格勒', '赤峰', '通辽', '兴安', '呼伦贝尔']
			},{
				// 辅助 x 轴
        		show: false,
        		boundaryGap: false,
        		data: ['阿拉善','阿拉善', '乌海', '鄂尔多斯', '巴彦淖尔', '包头', '呼兰浩特', '乌兰察布', '锡林格勒', '赤峰', '通辽', '兴安', '呼伦贝尔']
			}],
			yAxis: {
				axisLine: {
					show: false
				},
				axisTick: {
					show: true,
					inside: true,
					lineStyle: {
						color: '#333',
						width: 5
					}
				},
				axisLabel: {
					textStyle: {
						color: '#fff'
					},
					margin: 20
				},
				splitLine: {
					lineStyle: {
						color: '#333'
					}
				},
				name: '监控数量',
				nameTextStyle: {
					color: '#00f1ff'
				}
			},
			series: [{
				 // 辅助系列
        		type: 'bar',
        		silent: true,
        		barWidth: '50%',
        		barCategoryGap: 0,
        		barGap: '50%',
				xAxisIndex: 1,
				animation: false,
				itemStyle: {
		            normal: {
		                color: '#0c2437',
						opacity: .7
		            }
		       },
		       data: ['',5000,5000,5000,5000,5000,5000,5000,5000,5000,5000,5000,'']
			},{
				name: '监控离线数量',
				type: 'bar',
				stack: '总量',
				barWidth: '50%',
				barCategoryGap: 0,
				barGap: '50%',
				itemStyle: {
					normal: {
						color: '#8b3bbb',
						opacity: .7
					}
				},
				animationEasing: 'elasticOut',
				animationEasingUpdate: 'elasticOut',
				animationDelay: function(idx) {
					return idx * 30;
				},
				animationDelayUpdate: function(idx) {
					return idx * 30;
				},
				data: [800, 900, 900, 700, 1200, 800, 1300, 800, 700, 1000, 1300, 800]
			}, {
				name: '监控在线数量',
				type: 'bar',
				stack: '总量',
				barWidth: '50%',
				barCategoryGap: 0,
				barGap: '50%',
				itemStyle: {
					normal: {
						color: '#1abbff',
						opacity: .7
					}
				},
				animationEasing: 'elasticOut',
				animationEasingUpdate: 'elasticOut',
				animationDelay: function(idx) {
					return idx * 30;
				},
				animationDelayUpdate: function(idx) {
					return idx * 30;
				},
				data: [2500, 3000, 2800, 2500, 3500, 2100, 3660, 2700, 2000, 2600, 2500, 2500]
			}]
		};
		myChart.setOption(option);
	}
	repeat();
	setInterval(function() {
		$('.video_watch .rigth_chart .bar_chart').empty();
		repeat();
	}, 5000);
});*/
$(function() {
	function draw() {
		$('.video_watch .rigth_chart .triangle').css({
			bottom: '-40%',
			opacity: 0
		});
		$('.video_watch .rigth_chart .triangle').eq(4).animate({
			bottom: '5%',
			opacity: 1
		}, 'slow', function() {
			$('.video_watch .rigth_chart .triangle').eq(3).animate({
				bottom: '5%',
				opacity: 1
			}, 'slow', function() {
				$('.video_watch .rigth_chart .triangle').eq(2).animate({
					bottom: '5%',
					opacity: 1
				}, 'slow', function() {
					$('.video_watch .rigth_chart .triangle').eq(1).animate({
						bottom: '5%',
						opacity: 1
					}, 'slow', function() {
						$('.video_watch .rigth_chart .triangle').eq(0).animate({
							bottom: '5%',
							opacity: 1
						}, 'slow');
					});
				});
			});
		});
	}
	draw();
	setInterval(function() {
		draw();
	}, 10000);
});