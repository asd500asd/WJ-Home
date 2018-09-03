// 定义一个数组，使每个模块成为一个对象
var arr = [
    // 涉及公安的大屏需要隐藏
    /*{
        image: 'img/intell-page1.png',
        address: 'cbbs/intelligentbs/page1.html',
        title: '智能分析大屏',
        introduce: ''
    },
    {
        image: 'img/intell-page2.jpeg',
        address: 'cbbs/intelligentbs/page2.html',
        title: '部门传播力排行榜',
        introduce: ''
    },
    {
        image: 'img/caseInfo.png',
        address: 'nmPSbs/caseInfo/index.html',
        title: '全区公安机关案件信息展示图',
        introduce: ''
    },{
        image: 'img/bayonetState.png',
        address: 'nmPSbs/bayonetState/index.html',
        title: '内蒙古卡口动态图',
        introduce: ''
    },{
        image: 'img/bayonetData.png',
        address: 'nmPSbs/bayonetData/index.html',
        title: '全区卡口数据信息展示图',
        introduce: ''
    },
    {
        image: 'img/videowatch.png',
        address: 'nmPSbs/videoWatch/index.html',
        title: '内蒙古视频监控信息图',
        introduce: ''
    },{
        image: 'img/totalData.png',
        address: 'nmPSbs/totalData/index.html',
        title: '内蒙古全区公安数据总量图',
        introduce: ''
    },{
        image: 'img/appStore.png',
        address: 'nmPSbs/appStore/index.html',
        title: '全区公安机关信息化应用系统',
        introduce: ''
    },{
        image: 'img/110DataGraph.jpg',
        address: 'hngatbs/110DataGraph/index.html',
        title: '110指挥中心接警信息分析',
        introduce: ''
    }, {
        image: 'img/alarm.png',
        address: 'hngatbs/alarm/index.html',
        title: '接警信息分析统计图',
        introduce: ''
    }, {
        image: 'img/alarmII.jpg',
        address: 'hngatbs/alarmII/index.html',
        title: '全省交通警情接警统计',
        introduce: ''
    }, {
        image: 'img/case.png',
        address: 'hngatbs/case/index.html',
        title: '全省刑事案件统计图',
        introduce: ''
    },
    {
        image: 'img/transportation.png',
        address: 'transportation/index.html',
        title: '河南省交通图',
        introduce: ''
    },
    {
        image: 'img/internetData.png',
        address: 'internetData/index.html',
        title: '河南省互联网数据图',
        introduce: ''
    },{
        image: 'img/regOffAnaMap.png',
        address: 'internetData/regOffAnaMap/index.html',
        title: '全省公安“互联网”注册量和办案量分析图',
        introduce: ''
    },{
        image: 'img/distributionMap.jpg',
        address: 'hngatbs/distributionMap/index.html',
        title: '河南省涉恐人员分布图',
        introduce: ''
    }, {
        image: 'img/transfer.png',
        address: 'hngatbs/transfer2/index.html',
        title: '全国涉恐人员火车飞机往返河南流动情况',
        introduce: ''
    }, {
        image: 'img/transfer-hn.png',
        address: 'hngatbs/transferHN/index.html',
        title: '河南省涉恐人员火车往返流动情况',
        introduce: ''
    }, {
        image: 'img/criminal.png',
        address: 'hngatbs/criminal/index.html',
        title: '违法犯罪人员处理流向图',
        introduce: ''
    }, {
        image: 'img/prewarn.png',
        address: 'hngatbs/prewarn/index.html',
        title: '全省案件监督预警数据分析图',
        introduce: ''
    },*/ {
        image: 'img/china.jpg',
        address: 'dataVisual/map-china.html',
        title: '全国热点事件可视化',
        introduce: ''
    }, {
        image: 'img/chongQing.jpg',
        address: 'cbbs/hotInfoVisual/map-city.html',
        title: '重庆热点事件可视化',
        introduce: ''
    }, {
        image: 'cbbs/app/images/index.png',
        address: 'cbbs/app/index.html',
        title: '新闻内容生产及运营监管服务平台',
        introduce: ''
    }, {
        image: 'img/path.png',
        address: '/dataVisual/accessPath/accessPath.demo.html',
        title: '访问途径图',
        introduce: ''
    },
    // {
    //     image: 'cbbs/app/images/product.png',
    //     address: 'cbbs/app/product.html',
    //     title: '新闻展示',
    //     introduce: ''
    // },
    {
        image: 'cbbs/app/images/transshipment.png',
        address: 'cbbs/app/transshipment.html',
        title: '新闻被转载情况分析',
        introduce: ''
    }, {
        image: 'img/dataPage0.png',
        address: 'cbbs/v2/dataList/index.html',
        title: '互联网资源采集数据可视化（v2)',
        introduce: ''
    }, {
        image: 'img/dataPage.png',
        address: 'cbbs/v1/page1.html',
        title: '互联网资源采集数据可视化（v1)',
        introduce: ''
    }, {
        image: 'img/dataPage2.png',
        address: 'cbbs/v2/resource/index.html',
        title: '成品资源可视化',
        introduce: ''
    }, {
        image: 'img/dataPage3.png',
        address: 'cbbs/v1/page2.html',
        title: '成品资源可视化',
        introduce: ''
    }, {
        image: 'img/dataPage5.png',
        address: '/zblhdp/index.html',
        title: '两会热议事件可视化',
        introduce: ''
    }, {
        image: 'cbbs/app/images/typeHot.png',
        address: 'cbbs/app/typeHot.html',
        title: '分类热点信息',
        introduce: ''
    }, {
        image: 'cbbs/app/images/highlights.png',
        address: 'cbbs/app/highlightsMeta.html',
        title: '新媒体矩阵－亮点荟萃',
        introduce: ''
    }, {
        image: 'cbbs/app/images/map.png',
        address: 'cbbs/app/map.html',
        title: '标记地图',
        introduce: ''
    }, {
        image: 'cbbs/app/images/migrate.png',
        address: 'cbbs/app/migrate.html',
        title: '热点列表',
        introduce: ''
    }, {
        image: 'cbbs/app/images/monitoring.png',
        address: 'cbbs/app/monitoring.html',
        title: '新媒体监控',
        introduce: ''
    }, {
        image: 'cbbs/app/images/newWeibo.png',
        address: 'cbbs/app/newWeibo.html',
        title: '最新微博',
        introduce: ''
    }, {
        image: 'cbbs/app/images/microblogspread.png',
        address: 'cbbs/app/spread.html',
        title: '路径传播图',
        introduce: ''
    }, {
        image: 'img/sentiment2.png',
        address: 'zbbs/sentiment/sentiment.html',
        title: '全球涉浙舆情',
        introduce: ''
    }, {
        image: 'img/headline2.png',
        address: 'zbbs/headline/headline.html',
        title: '头版头条',
        introduce: ''
    }, {
        image: 'img/news2.png',
        address: 'zbbs/news/news.html',
        title: '新闻实时线索',
        introduce: ''
    },{
        image: 'img/reporter.png',
        address: '/bs/bgReporter/map-china.html',
        title: '记者实时动态',
        introduce: ''
    }
    // , {
    //     image: 'cbbs/app/images/postpartum.png',
    //     address: 'cbbs/app/postpartum.html',
    //     title: '最新微博监控',
    //     introduce: ''
    // }, {
    //     image: 'cbbs/app/images/wx_postpartum.png',
    //     address: 'cbbs/app/wx_postpartum.html',
    //     title: '最新微信监控',
    //     introduce: ''
    // }, {
    //     image: 'cbbs/app/images/new_postpartum.png',
    //     address: 'cbbs/app/new_postpartum.html',
    //     title: '最新新闻监控',
    //     introduce: ''
    // }
]


// 获得外部容器控件
var container = document.getElementById('container')
for (var i = 0; i < arr.length; i++) {
    var h3 = document.createElement('h3');
    // 动态生成a标签
    var a = document.createElement('a');
    a.setAttribute('class', 'containerC');
    a.href = arr[i].address;
    a.target = "_blank";
    //动态生成a中的img标签、strong标签及p标签
    var img = document.createElement('img');
    var strong = document.createElement('strong');
    var p = document.createElement('p');
    //动态设置img的src路径及h4标签和介绍内容
    img.src = arr[i].image;
    strong.innerHTML = arr[i].title;
    p.innerHTML = arr[i].introduce;
    // 将img标签和strong标签加入到每个a标签上
    a.appendChild(img);
    a.appendChild(strong);
    a.appendChild(p);
    // 将a标签加到外部容器上
    container.appendChild(a);



}