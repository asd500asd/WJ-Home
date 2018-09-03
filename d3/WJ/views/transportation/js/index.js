$(function() {
    var myChart0 = echarts.init(document.getElementById('main0'));
    myChart0.setOption({
        title: {
            show: true,
            text: '处罚与事故',
            x: 'center',
            y: 'top',
            textStyle: {
                fontFamily: '微软雅黑',
                fontSize: 20,
                fontStyle: 'normal',
                fontWeight: 'normal',
                color: 'white'
                },
            },
        animation:true,
        xAxis: [{         
            nameTextStyle: {
                color: 'white',
                fontSize: 20,
            },
            splitNumber: null,
            type: 'value',
            position:'top',
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#8E9CA6',
                    type: 'solid',
                    width: 0.2
                },
            },
            // axisLine:{
            //     lineStyle:{
            //         color:'transparent'
            //     }
            // },
            axisLabel: {
                formatter: function(v){                   
                    if ( v<0 ) {
                        return -v ;
                    }else{
                        return v  ;
                    };

                },
                textStyle: {
                    color: "#979B9D",
                    fontSize: 20,
                },               
            },
            nameLocation:'start'
        }],
        yAxis:[{
            type: 'category',
            nameTextStyle: {
                color: '#979B9D',
                fontSize: 20,
            },
            position:'left',           
            axisLabel: {
                textStyle: {
                    color: "#979B9D",
                    fontSize: 14,
                    fontWeight: 'bolder'
                }
            },
            splitLine: {
                show: false
            },
            axisTick:{
                show: true
            },
                   
            data:city1()
            
        }],
        grid: {         
            borderWidth:0,
            x: 70,
            y: 80,
            x2: 110,
            y2: 80,

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
                var sum = 0;
                var message = "";
                for (var i = 0; i < params.length-1; i++) {
                    sum += params[i].data - 0;                   
                };
               message += params[0].name + '&nbsp;' + '<br>' + params[3].seriesName + '&nbsp;' + (params[3].data) + '<br>' 
               + '处罚' +  '&nbsp;' + (-sum) + '<br>' + '现场' + '&nbsp;' + (-params[0].data) + '<br>' 
               + '非现场' + '&nbsp;' + (-params[1].data) + '<br>' + params[2].seriesName + '&nbsp;' + (-params[2].data) ;
               return  message;
            }
        }, 
        legend: {
            orient: 'vertical',
            x: '90%',
            y: 80,
            color:'white',
            itemWidth: 20,
            itemHeight: 20,
            textStyle: {
                'fontFamily': '微软雅黑',
                'fontSize': 16,
                color: 'white'
            },
            borderRradius: 10,
            data: [
                {name:'措施1',icon:'image/1.png'}, 
                {name:'措施2',icon:'image/2.png'},
                {name:'强制措施',icon:'image/3.png'}
            ]         
        },
       
        calculable: false,

        series: [{
            name: '措施1',
            type: 'bar',
            stack: 'measure',
            barCategoryGap: '40%',
            itemStyle: {
                normal: {
                    color: '#7C6DEA'
                }
            },
            data: measure1()
        },{
            name: '措施2',
            type: 'bar',
            stack: 'measure',
            barCategoryGap: '40%',
            itemStyle: {
                normal: {
                    color: '#2AF99E'
                }
            },
            data: measure2()
        },{
            name: '强制措施',
            type: 'bar',
            stack: 'measure',
            barCategoryGap: '40%',
            itemStyle: {
                normal: {
                    color: '#FFD630',
                }
            },
            data: compulsoryMeasure(),            
        },{
            name: '事故',
            type: 'bar',
            stack: 'measure',
            barCategoryGap: '40%',
            itemStyle: {
                normal: {
                    color: '#71DDD1',
                }
            },
            data: accident(),            
        }]
    })
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
        title: {
            show: true,
            text: '黄标车',
            x: 'center',
            y: 'top',
            textStyle: {
                fontFamily: '微软雅黑',
                fontSize: 20,
                fontStyle: 'normal',
                fontWeight: 'normal',
                color: 'white'
                },
            },
        xAxis: [{
            type: 'category',
            nameTextStyle: {
                color: '#979B9D',
                fontSize: 20,
            },
            axisLabel: {
                textStyle: {
                    color: "#979B9D",
                    fontSize: 14,
                    fontWeight: 'bolder'
                }
            },
            splitLine: {
                show: false
            },
            axisTick:{
                show: true
            },           
            data:city0()
        }],
        yAxis:[{
            
            splitNumber:7,
            nameTextStyle: {
                color: 'white',
                fontSize: 20
            },
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#8E9CA6',
                    type: 'solid',
                    width: 0.2
                },
            },
            axisLabel: {
                formatter: function(v){
                    return v + '  •'
                },
                textStyle: {
                    color: "#979B9D",
                    fontSize: 16,
                }
            },
            axisLine: {
                lineStyle:{
                    color: "transparent",
                }
            }
        },{
            name: '百分比',
            show: false,
            splitNumber:7,
            min:0,
            max:100,
            nameTextStyle: {
                color: 'white',
                fontSize: 20
            },
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#979B9D',
                    type: 'solid',
                    width: 0
                },
            },
            axisLabel: {
                formatter: '{value}%',
                textStyle: {
                    color: "#8E9CA6",
                    fontSize: 16,
                }
            },
            axisLine: {
                lineStyle:{
                    color: "transparent",
                }
            }
        }],
        grid: {         
            borderWidth:0,
            x: 80,
            y: 80,
            x2: 80,
            y2: 80,

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
                // .toFixed(1)
                var sum = 0;
                var message = "";
                for (var i = 0; i < params.length-2; i++) {
                    sum += params[i].data - 0;                   
                };
               message += params[0].name + '&nbsp;' + '<br>' + params[2].seriesName + '&nbsp;' + params[2].data + '%' + '<br>' + params[0].seriesName + '&nbsp;' + params[0].data + '<br>' 
               + params[1].seriesName + '&nbsp;' + params[1].data  + '<br>'
               + '总计' + '&nbsp;' + sum;
               return  message;
            }
        }, 
        legend: {
            orient: 'vertical',
            x: '92%',
            y: 80,
            color:'white',
            itemWidth: 20,
            itemHeight: 20,
            textStyle: {
                'fontFamily': '微软雅黑',
                'fontSize': 16,
                color: 'white'
            },
            borderRradius: 10,
            data: [
                {name:'拆解',icon:'image/5.png'}, 
                {name:'查扣',icon:'image/4.png'},              
            ],          
        },
        // toolbox: {
        //     show: true,
        //     orient: 'horizontal',
        //     x: 'right',
        //     y: 'top',        
        //     feature: {
        //         mark: {
        //             show: true
        //         },
        //         dataView: {
        //             show: true,
        //             readOnly: false
        //         },
        //         magicType: {
        //             show: true,
        //             type: ['line', 'bar', 'stack', 'tiled']
        //         },
        //         restore: {
        //             show: true
        //         },
        //         saveAsImage: {
        //             show: true
        //         }
        //     }
        // },
        calculable: false,

        series: [{
            name: '查扣',
            type: 'bar',
            stack: 'caseType',
            barCategoryGap: '40%',
            itemStyle: {
                normal: {
                    color: '#FFD72F',
                }
            },
            data: buckle(),            
        },{
            name: '拆解',
            type: 'bar',
            stack: 'caseType',
            barCategoryGap: '40%',
            itemStyle: {
                normal: {
                    color: '#FD686A'
                }
            },
            data: dismantling()
        }, {
            name:'处理量',
            type:'line',
            yAxisIndex: 1,
            data:percent(),
            itemStyle: {
                normal: {
                    color: 'white',
                    label:{
                        show: true,
                        formatter:function(v){
                            return v.data + '%'
                        },
                        textStyle:{
                            fontSize: 16
                        }
                    }
                }
            }
        
        }, {
            name:'总量',
            type:'line',
            yAxisIndex: 0,
            data:sum(),
            itemStyle:{
                normal:{
                    color:"transparent"
                }

            },
            markPoint : {
                itemStyle:{
                    normal:{
                        color:'transparent'
                    }
                },
                data : [
                    {type : 'max', name: '最大值'}
                ]
            }
        
        }]
    })
    var myChart1 = echarts.init(document.getElementById('main1'));
    myChart1.setOption({
        title: {
            show: true,
            text: '酒驾，醉驾',
            x: 'center',
            y: 20,
            textAlign: null,
            textStyle: {
                fontFamily: '微软雅黑',
                fontSize: 20,
                fontStyle: 'normal',
                fontWeight: 'normal',
                color: 'white'
                },
            },
        xAxis: [{
            type: 'category',
            nameTextStyle: {
                color: '#979B9D',
                fontSize: 20,
            },
            axisLabel: {
                textStyle: {
                    color: "#979B9D",
                    fontSize: 14,
                    fontWeight: 'bolder'
                }
            },
            axisLine: {
                lineStyle:{
                    color: "#979B9D",
                    width: 2
                }
            },
            splitLine: {
                show: false
            },
            axisTick:{
                show: true
            },  
                     
            data:city()
        }],
        yAxis:[{
            
            splitNumber: 7,
            nameTextStyle: {
                color: 'white',
                fontSize: 20
            },
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#8E9CA6',
                    type: 'solid',
                    width: 0.2
                },
            },

            axisLine: {
                lineStyle:{
                    color: "transparent",
                }
            },
            axisLabel: {
                formatter: function(v){
                    return (v) + '  •';
                },
                textStyle: {
                    color: "#979B9D",
                    fontSize: 16,
                },             
            },         
        }],
        grid: {                   
            borderWidth:0,
           

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
                // .toFixed(1)
                var sum = 0;
                var message = "";
                for (var i = 0; i < params.length-1; i++) {
                    sum += params[i].data - 0;                   
                };
               message += params[0].name + '&nbsp;' + '<br>' + params[0].seriesName + '&nbsp;' + params[0].data + '<br>' 
               + params[1].seriesName + '&nbsp;' + params[1].data  + '<br>' + '总计' + '&nbsp;' + sum;
               return  message;
            }
        }, 
        legend: {
            orient: 'vertical',
            x: '92%',
            y: 80,
            color:'white',
            itemWidth: 20,
            itemHeight: 20,
            textStyle: {
                'fontFamily': '微软雅黑',
                'fontSize': 16,
                color: 'white'
            },
            borderRradius: 10,
            data: [
             {name:'酒驾',icon:'image/6.png'}, 
             {name:'醉驾',icon:'image/7.png'},
            ]          
        },      
        calculable: false,

        series: [{
            name: '醉驾',
            type: 'bar',
            stack: 'caseType',
            barCategoryGap: '40%',
            itemStyle: {
                normal: {
                    color: '#29F299'
                }
            },
            data: drunkenDriving()
        },{
            name: '酒驾',
            type: 'bar',
            stack: 'caseType',
            barCategoryGap: '40%',
            itemStyle: {
                normal: {
                    color: '#7C6DEB',
                }
            },
            data: drunkDriving(),            
        },{
            name:'总量',
            type:'line',
            yAxisIndex: 0,
            data:sum1(),
            itemStyle:{
                normal:{
                    color:"transparent"
                }

            },
            markPoint : {
                itemStyle:{
                    normal:{
                        color:'transparent'
                    }
                },
                data : [
                    {type : 'max', name: '最大值'}
                ]
            }
        
        }]
    })
var partCatChart = echarts.init(document.getElementById('partCat'));
    var partCatOption = {
        title: {
            show: true,
            text: '渣土车',
            x: 'center',
            y: 'top',           
            textStyle: {
                fontFamily: '微软雅黑',
                fontSize: 20,
                fontStyle: 'normal',
                fontWeight: 'normal',
                color: 'white'
                },
            },
        tooltip: {
            trigger: 'item',
            formatter: function(params){
                return params.name + ": " + params.value;
            }
        },
        toolbox: {
            show: false,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },

        grid: {
            borderColor: 'transparent',
            
        },
        calculable: false,

        xAxis: [{
            type: 'category',
            axisTick:{
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel:{
                textStyle:{
                    color:"#979B9D",
                    fontSize: 14,
                    fontWeight: 'bolder'
                }
            },
            axisLine: {
                lineStyle:{
                    color: "#979B9D",
                    width: 2
                }
            },
            data: ['驻马店', '信阳', '平顶山', '漯河', '焦作', '安阳', '三峡门', '开村', '济源', '周口', '鹤壁', '新乡', '郑州', '洛阳', '濮阳', '南阳', '商丘', '许昌']
        }],

        yAxis: [{        
            nameTextStyle: {
                color: 'white',
                fontSize: 20
            },          
            show: true,
            splitNumber: 7,
            type: 'value',
            axisLabel:{
                textStyle:{
                    color:"#979B9D",
                    fontSize: 14,
                    fontFamily:"Microsoft YaHei" 
                },
                formatter: function(v){
                    return (v) + '　•';
                }
            },
            axisLine: {
                lineStyle:{
                    color: "transparent",
                }
            },
            splitLine:{
                lineStyle:{
                    color:"#979B9D",
                    width: 0.2
                }
            }
        }],
        series: [{
            name: '办案数量',
            type: 'bar',
            barWidth: 24,
            itemStyle: {
                normal: {
                    color: '#E5BF2A',
                    label:{
                        show: false,
                        position: 'top',
                        formatter: function(params){
                            return params.value;
                        },
                        textStyle:{
                            color:"#FFF",
                            fontSize: 14
                        }
                    }
                }
            },
            data: [450, 330, 400, 600, 570, 500, 470, 500, 200, 240, 470, 500, 580, 300, 370, 300, 190, 180],
        },{
            name:'总量',
            type:'line',
            yAxisIndex: 0,
            data:[450, 330, 400, 600, 570, 500, 470, 500, 200, 240, 470, 500, 580, 300, 370, 300, 190, 180],
            itemStyle:{
                normal:{
                    color:"transparent"
                }

            },
            markPoint : {
                itemStyle:{
                    normal:{
                        color:'transparent'
                    }
                },
                data : [
                    {type : 'max', name: '最大值'}
                ]
            }
        
        }]
    };

    // 为echarts对象加载数据 
    partCatChart.setOption(partCatOption);
    // myChart.connect([myChart0,myChart1,partCatChart]);
    // myChart0.connect([myChart,myChart1,partCatChart]);
    // myChart1.connect([myChart,myChart0,partCatChart]);
    // partCatChart.connect([myChart,myChart0,myChart1]);
    // setTimeout(function (){
    //     window.onresize = function () {
    //         myChart.resize();
    //         myChart1.resize();
    //     }
    // },200)
    initSize();
    $(window).resize(function() {
        initSize();
        window.location.reload();
    })

    function initSize() {
        var scaleAndLocation = getScaleAndLocation();
        if (scaleAndLocation.scale != 1) {
            $(".transportation").css({
                "transform-origin": "left top",
                "-webkit-transform-origin": "left top",
                "transform": "scale(" + scaleAndLocation.scale + ")",
                "-webkit-transform": "scale(" + scaleAndLocation.scale + ")",
                "transform-origin": "left top",
                "-webkit-transform-origin": "left top",
                "margin-left": scaleAndLocation.location.x + "px",
                "margin-top": scaleAndLocation.location.y + "px"
            });
        }
    }

    function getScaleAndLocation() {
        // 用于"transform": "scale(" + scale + ")",
        var scale = 1;
        // 缩放后居中的位置,
        var location = {
                x: 0,
                y: 0
            }
            // var width = document.body.clientWidth;
            // var height = document.body.clientHeight;
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        if (width / height < 1920 / 1080) {
            scale = width / 1920;
            location.y = (height - 1080 * scale) / 2;
        } else {
            scale = height / 1080;
            location.x = (width - 1920 * scale) / 2;
        }
        return {
            scale: scale,
            location: location
        };
    }
    $('button').click(function(event) {
       location.reload()
    })
})
