// 重庆返回数据
IABS.getChongqing_map = function(fn) {
    var data = {    
        "result": "success",
            "CONTENT": [{            
            "TITLE": "中秋节英加意领事馆15日仍可办签证",
                "SHORTTITLE": "中秋节英加意领事馆15日仍可办签证",
                "HOTPOINTNUM": "90",
            "AREA": "万州区"
        }, {            
            "TITLE": "北京市报告首例输入性寨卡病例",
                "SHORTTITLE": "北京市报告首例输入性寨卡病例",
                "HOTPOINTNUM": "50",
            "AREA": "城口县"
        }, {            
            "TITLE": "阿里技术男建打拐平台 马云呼吁国人“多管闲事”",
                "SHORTTITLE": "阿里技术男建打拐平台 马云呼吁国人“多管闲事”",
                "HOTPOINTNUM": "45",
            "AREA": "綦江区"
        }, {            
            "TITLE": "如果中日开战，美国的F-22以何种方式参战？",
                "SHORTTITLE": "如果中日开战，美国的F-22以何种方式参战？",
                "HOTPOINTNUM": "20",
            "AREA": "秀山土家族苗族自治县"
        }, {            
            "TITLE": "去年以来破获经济犯罪案件20.7起",
                "SHORTTITLE": "去年以来破获经济犯罪案件20.7起",
                "HOTPOINTNUM": "20",
            "AREA": "永川区"
        }, {            
            "TITLE": "北京节水每年省出一个怀柔水库",
                "SHORTTITLE": "北京节水每年省出一个怀柔水库",
                "HOTPOINTNUM": "50",
            "AREA": "铜梁区"
        }, {            
            "TITLE": "北京首设专项督查组抓堵车 缓堵不作为将被追责",
                "SHORTTITLE": "北京首设专项督查组抓堵车 缓堵不作为将被追责",
                "HOTPOINTNUM": "50",
            "AREA": "忠县"
        }, {            
            "TITLE": "老伴犯病 女子见死不救获刑",
                "SHORTTITLE": "老伴犯病 女子见死不救获刑",
                "HOTPOINTNUM": "45",
            "AREA": "奉节县"
        }, {            
            "TITLE": "重庆疫苗疑遭掉包详情：护士操作不慎致针头",
                "SHORTTITLE": "重庆疫苗疑遭掉包详情：护士操作不慎致针头",
                "HOTPOINTNUM": "20",
            "AREA": "九龙坡区"
        }, {            
            "TITLE": "中联鑫华酒店被爆洁厕液杯 酒店回应涉事人员",
                "SHORTTITLE": "中联鑫华酒店被爆洁厕液杯 酒店回应涉事人员",
                "HOTPOINTNUM": "20",
            "AREA": "彭水苗族土家族自治县"
        }]
    };
    fn(data);
};

// 返回全国数据
IABS.getQuanguo_map = function(fn) {
    var data = {    
        "result": "success",
            "CONTENT": [{            
            "TITLE": "小狗交配猝死旁人狂笑",
                "SHORTTITLE": "小狗交配猝死旁人狂笑",
                "HOTPOINTNUM": "75",
            "AREA": "北京"
        }, {            
            "TITLE": "北京市报告首例输入性寨卡病例",
                "SHORTTITLE": "北京市报告首例输入性寨卡病例",
                "HOTPOINTNUM": "60",
            "AREA": "上海"
        }, {            
            "TITLE": "重庆疫苗疑遭掉包详情：护士操作不慎致针头",
                "SHORTTITLE": "重庆疫苗疑遭掉包详情：护士操作不慎致针头",
                "HOTPOINTNUM": "45",
            "AREA": "重庆"
        }, {            
            "TITLE": "阿里技术男建打拐平台",
                "SHORTTITLE": "阿里技术男建打拐平台",
                "HOTPOINTNUM": "30",
            "AREA": "广州"
        }, {            
            "TITLE": "如果中日开战，美国的F-22以何种方式参战？",
                "SHORTTITLE": "如果中日开战，美国的F-22以何种方式参战？",
                "HOTPOINTNUM": "20",
            "AREA": "云南"
        }]
    };
    fn(data);
};

// 垂直行热点分布
IABS.getHotNews_right = function(fn) {
    var data = {
        "CONTENT": [{
            "title": '政治',
            "data": [{
                "ID": 1,
                "SHORTTITLE": "倪妮将做baby伴娘",
                "TITLE": "女星闺蜜情：王菲赵薇街头聚餐 倪妮当baby婚礼伴娘",
                "FIELD": "001",
            }, {
                "ID": 2,
                "SHORTTITLE": "111政治，指对社会治理的行为",
                "TITLE": "111政治，指对社会治理的行为",
                "FIELD": "001",
            }, {
                "ID": 3,
                "SHORTTITLE": "222政治，指对社会治理的行为",
                "TITLE": "222政治，指对社会治理的行为",
                "FIELD": "001",
            }, {
                "ID": 4,
                "SHORTTITLE": "333政治，指对社会治理的行为",
                "TITLE": "333政治，指对社会治理的行为",
                "FIELD": "001",
            }],
        }, {
            "title": '财经',
            "data": [{
                "ID": 5,
                "SHORTTITLE": "华龙证券重庆营业部早间信息荟萃全球前十全球前十，韩国第一大海运巨头企业",
                "TITLE": "华龙证券重庆营业部早间信息荟萃全球前十，韩国第一大海运巨头企业全球前十，韩国第一大海运巨头企业",
                "FIELD": "001",
            }, {
                "ID": 6,
                "SHORTTITLE": "全球前十，韩国第一大海运巨头企业",
                "TITLE": "全球前十，韩国第一大海运巨头企业",
                "FIELD": "001",
            }]
        }, {
            "title": '司法',
            "data": [{
                "ID": 7,
                "SHORTTITLE": "2016年国家司法考试公告",
                "TITLE": "2016年国家司法考试公告",
                "FIELD": "001",
            }]
        }, {
            "title": '社会',
            "data": [{
                "ID": 8,
                "SHORTTITLE": "社会社会社会政治-观察者网-中国关12社会社会社会政治-观察者网-中国关",
                "TITLE": "政治-观察者网-中国关怀 全球视野",
                "FIELD": "001",
            }, {
                "ID": 9,
                "SHORTTITLE": "社会，指对社会治理的行为",
                "TITLE": "政治，指对社会治理的行为",
                "FIELD": "001",
            }]
        }, {
            "title": '人文',
            "data": [{
                "ID": 10,
                "SHORTTITLE": "政治-观察者网-中国关怀 全球视野",
                "TITLE": "政治-观察者网-中国关怀 全球视野政治-观察者网-中国关怀 全球视野",
                "FIELD": "001",
            }, {
                "ID": 11,
                "SHORTTITLE": "政治，指对社会治理的行为",
                "TITLE": "政治，指对社会治理的行为",
                "FIELD": "001",
            }]
        }, {
            "title": '民生',
            "data": [{
                "ID": 12,
                "SHORTTITLE": "民生-现代意义上的民生概念有广义",
                "TITLE": "民生-现代意义上的民生概念有广义",
                "FIELD": "001",
            }, {
                "ID": 13,
                "SHORTTITLE": "民生保险携手爱佑慈善基金会持续开",
                "TITLE": "民生保险携手爱佑慈善基金会持续开",
                "FIELD": "001",
            }]
        }, {
            "title": '科技',
            "data": [{
                "ID": 14,
                "SHORTTITLE": "重庆市大学生电子设计竞赛",
                "TITLE": "重庆市大学生电子设计竞赛",
                "FIELD": "001",
            }]
        }]
    };
    fn(data);
};

// 头版头条热点 —— 纸媒
IABS.getHeadlines_paper = function(fn, ele, max) {
    var data = {
        "summary_info": {    
            "MaxHotPoint": 200, // 返回数据中的最大转载数
        },
        "CONTENT": [{ 
            "HOTPOINTNUM": 200, // 返回转载数
             "TITLE": "教育部开通高校生资助热线",
            "SOURCE": "南方日报"
        }, { 
            "HOTPOINTNUM": 50,
             "TITLE": "明年西南又快有一个中超球队了",
            "SOURCE": "南方日报"
        }, { 
            "HOTPOINTNUM": 20,
             "TITLE": "重庆巫山干旱致5000亩烤烟绝收",
            "SOURCE": "南方日报"
        }]
    };
    max = data.summary_info.MaxHotPoint;
    fn(data, ele, max);
};

// 头版头条热点 —— 网媒
IABS.getHeadlines_net = function(fn, ele, max) {
    var data = {
        "summary_info": {    
            "MaxHotPoint": 100, // 返回数据中的最大转载数
        },
        "CONTENT": [{ 
            "HOTPOINTNUM": 100, // 返回转载数
             "TITLE": "重庆，你再次震撼了亚洲，震惊了世界！",
            "SOURCE": "南方日报"
        }, { 
            "HOTPOINTNUM": 54,
             "TITLE": "222教育部开通高校生资助热线",
            "SOURCE": "南方日报"
        }, { 
            "HOTPOINTNUM": 34,
             "TITLE": "333教育部开通高校生资助热线",
            "SOURCE": "南方日报"
        }]
    };
    max = data.summary_info.MaxHotPoint;
    fn(data, ele, max);
};

IABS.getChongQingData = function() {
    return [{
        "area": "万州区",
        "coordinate": [108.380246, 30.807807]
    }, {
        "area": "涪陵区",
        "coordinate": [107.394905, 29.703652]
    }, {
        "area": "渝中区",
        "coordinate": [106.56288, 29.556742]
    }, {
        "area": "大渡口区",
        "coordinate": [106.48613, 29.481002]
    }, {
        "area": "江北区",
        "coordinate": [106.532844, 29.575352]
    }, {
        "area": "沙坪坝区",
        "coordinate": [106.4542, 29.541224]
    }, {
        "area": "九龙坡区",
        "coordinate": [106.480989, 29.523492]
    }, {
        "area": "南岸区",
        "coordinate": [106.560813, 29.523992]
    }, {
        "area": "北碚区",
        "coordinate": [106.437868, 29.82543]
    }, {
        "area": "綦江区",
        "coordinate": [106.651417, 29.028091]
    }, {
        "area": "大足区",
        "coordinate": [105.715319, 29.700498]
    }, {
        "area": "渝北区",
        "coordinate": [106.512851, 29.601451]
    }, {
        "area": "巴南区",
        "coordinate": [106.519423, 29.381919]
    }, {
        "area": "黔江区",
        "coordinate": [108.782577, 29.527548]
    }, {
        "area": "长寿区",
        "coordinate": [107.074854, 29.833671]
    }, {
        "area": "江津区",
        "coordinate": [106.253156, 29.283387]
    }, {
        "area": "合川区",
        "coordinate": [106.265554, 29.990993]
    }, {
        "area": "永川区",
        "coordinate": [105.894714, 29.348748]
    }, {
        "area": "南川区",
        "coordinate": [107.098153, 29.156646]
    }, {
        "area": "潼南区",
        "coordinate": [105.841818, 30.189554]
    }, {
        "area": "铜梁区",
        "coordinate": [106.054948, 29.839944]
    }, {
        "area": "荣昌区",
        "coordinate": [105.594061, 29.403627]
    }, {
        "area": "璧山区",
        "coordinate": [106.231126, 29.593581]
    }, {
        "area": "梁平县",
        "coordinate": [107.800034, 30.672168]
    }, {
        "area": "城口县",
        "coordinate": [108.6649, 31.946293]
    }, {
        "area": "丰都县",
        "coordinate": [107.73248, 29.866424]
    }, {
        "area": "垫江县",
        "coordinate": [107.348692, 30.330012]
    }, {
        "area": "武隆县",
        "coordinate": [107.75655, 29.32376]
    }, {
        "area": "忠县",
        "coordinate": [108.037518, 30.291537]
    }, {
        "area": "开县",
        "coordinate": [108.413317, 31.167735]
    }, {
        "area": "云阳县",
        "coordinate": [108.697698, 30.930529]
    }, {
        "area": "奉节县",
        "coordinate": [109.465774, 31.019967]
    }, {
        "area": "巫山县",
        "coordinate": [109.878928, 31.074843]
    }, {
        "area": "巫溪县",
        "coordinate": [109.628912, 31.3966]
    }, {
        "area": "石柱土家族自治县",
        "coordinate": [108.112448, 29.99853]
    }, {
        "area": "秀山土家族苗族自治县",
        "coordinate": [108.996043, 28.444772]
    }, {
        "area": "酉阳土家族苗族自治县",
        "coordinate": [108.767201, 28.839828]
    }, {
        "area": "彭水苗族土家族自治县",
        "coordinate": [108.166551, 29.293856]
    }];
};

IABS.getChinaData = function() {
    return [{
        "coordinate": [121.509062, 25.044332],
        "area": "台湾"
    }, {
        "coordinate": [114.502461, 38.045474],
        "area": "河北"
    }, {
        "coordinate": [112.549248, 37.857014],
        "area": "山西"
    }, {
        "coordinate": [111.670801, 40.818311],
        "area": "内蒙古"
    }, {
        "coordinate": [123.429096, 41.796767],
        "area": "辽宁"
    }, {
        "coordinate": [125.3245, 43.886841],
        "area": "吉林"
    }, {
        "coordinate": [126.642464, 45.756967],
        "area": "黑龙江"
    }, {
        "coordinate": [118.767413, 32.041544],
        "area": "江苏"
    }, {
        "coordinate": [120.153576, 30.287459],
        "area": "浙江"
    }, {
        "coordinate": [117.283042, 31.86119],
        "area": "安徽"
    }, {
        "coordinate": [119.306239, 26.075302],
        "area": "福建"
    }, {
        "coordinate": [115.892151, 28.676493],
        "area": "江西"
    }, {
        "coordinate": [117.000923, 36.675807],
        "area": "山东"
    }, {
        "coordinate": [113.665412, 34.757975],
        "area": "河南"
    }, {
        "coordinate": [114.298572, 30.584355],
        "area": "湖北"
    }, {
        "coordinate": [112.982279, 28.19409],
        "area": "湖南"
    }, {
        "coordinate": [113.280637, 23.125178],
        "area": "广东"
    }, {
        "coordinate": [108.320004, 22.82402],
        "area": "广西"
    }, {
        "coordinate": [110.33119, 20.031971],
        "area": "海南"
    }, {
        "coordinate": [106.713478, 26.578343],
        "area": "贵州"
    }, {
        "coordinate": [102.712251, 25.040609],
        "area": "云南"
    }, {
        "coordinate": [91.132212, 29.660361],
        "area": "西藏"
    }, {
        "coordinate": [108.948024, 34.263161],
        "area": "陕西"
    }, {
        "coordinate": [103.823557, 36.058039],
        "area": "甘肃"
    }, {
        "coordinate": [101.778916, 36.623178],
        "area": "青海"
    }, {
        "coordinate": [106.278179, 38.46637],
        "area": "宁夏"
    }, {
        "coordinate": [87.617733, 43.792818],
        "area": "新疆"
    }, {
        "coordinate": [116.405285, 39.904989],
        "area": "北京"
    }, {
        "coordinate": [117.190182, 39.125596],
        "area": "天津"
    }, {
        "coordinate": [121.472644, 31.231706],
        "area": "上海"
    }, {
        "coordinate": [106.504962, 29.533155],
        "area": "重庆"
    }, {
        "coordinate": [114.173355, 22.320048],
        "area": "香港"
    }, {
        "coordinate": [113.54909, 22.198951],
        "area": "澳门"
    }];
};
