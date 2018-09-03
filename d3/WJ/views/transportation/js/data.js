//黄标车
var consistscarItem = [{
    'city': '驻马店',
    'dismantling': 1200,
    'buckle': 1400,
    'percent':25,
    'sum': 2600
}, {
    'city': '信阳',
    'dismantling': 1600,
    'buckle': 1400,
    'percent':20,
    'sum': 3000
}, {
    'city': '平顶山',
    'dismantling': 2100,
    'buckle': 1200,
    'percent':35,
    'sum': 3300
}, {
    'city': '漯河',
    'dismantling': 1100,
    'buckle': 1200,
    'percent':45,
    'sum': 2300
}, {
    'city': '焦作',
    'dismantling': 1500,
    'buckle': 1000,
    'percent':40,
    'sum': 2500
}, {
    'city': '安阳',
    'dismantling': 880,
    'buckle': 940,
    'percent':55,
    'sum': 1820
}, {
    'city': '三门峡',
    'dismantling': 1270,
    'buckle': 630,
    'percent':50,
    'sum': 1900
}, {
    'city': '开封',
    'dismantling': 1150,
    'buckle': 700,
    'percent':75,
    'sum': 1850
}, {
    'city': '济源',
    'dismantling': 1650,
    'buckle': 700,
    'percent':95,
    'sum': 2350
}, {
    'city': '周口',
    'dismantling': 1500,
    'buckle': 900,
    'percent':85,
    'sum': 2400
}, {
    'city': '鹤壁',
    'dismantling': 2200,
    'buckle': 900,
    'percent':15,
    'sum': 3100
}, {
    'city': '新乡',
    'dismantling': 1700,
    'buckle': 700,
    'percent':37,
    'sum': 2400
}, {
    'city': '郑州',
    'dismantling': 1600,
    'buckle': 700,
    'percent':18,
    'sum': 2300
}, {
    'city': '洛阳',
    'dismantling': 900,
    'buckle': 1300,
    'percent':44,
    'sum': 2200
}, {
    'city': '濮阳',
    'dismantling': 1000,
    'buckle': 1100,
    'percent':66,
    'sum': 2100
}, {
    'city': '南阳',
    'dismantling': 900,
    'buckle': 1400,
    'percent':87,
    'sum': 2300
}, {
    'city': '商丘',
    'dismantling': 1200,
    'buckle': 600,
    'percent':29,
    'sum': 1800
}, {
    'city': '许昌',
    'dismantling': 1300,
    'buckle': 800,
    'percent':34,
    'sum': 2100
}];
function mySort (propertyName) {
        return function  (obj1,obj2) {
            var value1 = obj1[propertyName];
            var value2 = obj2[propertyName];
            if (value1 < value2) {
                return 1;
            }else if (value1 > value2 ) {
                return -1;
            } else{
                return 0;
            }
        }
}

function city0() {
    consistscarItem.sort(mySort('percent'));
    var cityData = '';
    for (var i = 0; i < consistscarItem.length; i++) {
        cityData += consistscarItem[i].city + ',';
    };
    cityDatas = cityData.substring(0, cityData.length - 1);
    cityDatarel = cityDatas.split(',');
    return cityDatarel;
}

function dismantling() {
    var dismantlingData = '';
    for (var i = 0; i < consistscarItem.length; i++) {
        dismantlingData += consistscarItem[i].dismantling + ',';
    };
    dismantlingDatas = dismantlingData.substring(0, dismantlingData.length - 1);
    dismantlingDatarel = dismantlingDatas.split(',');
    return dismantlingDatarel;
}

function buckle() {
    var buckleData = '';
    for (var i = 0; i < consistscarItem.length; i++) {
        buckleData += consistscarItem[i].buckle + ',';
    };
    buckleDatas = buckleData.substring(0, buckleData.length - 1);
    buckleDatarel = buckleDatas.split(',');
    return buckleDatarel;
}
function percent() {
    var percentData = '';
    for (var i = 0; i < consistscarItem.length; i++) {
        percentData += consistscarItem[i].percent + ',';
    };
    percentDatas = percentData.substring(0, percentData.length - 1);
    percentDatarel = percentDatas.split(',');
    return percentDatarel;
}
function sum() {
    var sumData = '';
    for (var i = 0; i < consistscarItem.length; i++) {
        sumData += consistscarItem[i].sum + ',';
    };
    sumDatas = sumData.substring(0, sumData.length - 1);
    sumDatarel = sumDatas.split(',');
    return sumDatarel;
}
//醉酒驾
var drunktroubleItem = [{
    'city': '驻马店',
    'drunkDriving': 1600,
    'drunkenDriving': 1700,
    'sum': 3300
}, {
    'city': '信阳',
    'drunkDriving': 1600,
    'drunkenDriving': 1600,
    'sum': 3200
}, {
    'city': '平顶山',
    'drunkDriving': 1400,
    'drunkenDriving': 1500,
    'sum': 2900
}, {
    'city': '漯河',
    'drunkDriving': 1600,
    'drunkenDriving': 800,
    'sum': 2400
}, {
    'city': '焦作',
    'drunkDriving': 1580,
    'drunkenDriving': 1440,
    'sum': 2020
}, {
    'city': '安阳',
    'drunkDriving': 2000,
    'drunkenDriving': 500,
    'sum': 2500
}, {
    'city': '三门峡',
    'drunkDriving': 1000,
    'drunkenDriving': 1400,
    'sum': 2400
}, {
    'city': '开封',
    'drunkDriving': 650,
    'drunkenDriving': 1300,
    'sum': 1950
}, {
    'city': '济源',
    'drunkDriving': 1150,
    'drunkenDriving': 1200,
    'sum': 2350
}, {
    'city': '周口',
    'drunkDriving': 770,
    'drunkenDriving': 1130,
    'sum': 1900
}, {
    'city': '鹤壁',
    'drunkDriving': 1400,
    'drunkenDriving': 800,
    'sum': 2200
}, {
    'city': '新乡',
    'drunkDriving': 1200,
    'drunkenDriving': 1400,
    'sum': 2600
}, {
    'city': '郑州',
    'drunkDriving': 1600,
    'drunkenDriving': 700,
    'sum': 2300
}, {
    'city': '洛阳',
    'drunkDriving': 1700,
    'drunkenDriving': 1400,
    'sum': 3100
}, {
    'city': '濮阳',
    'drunkDriving': 1200,
    'drunkenDriving': 1200,
    'sum': 2400
}, {
    'city': '南阳',
    'drunkDriving': 1900,
    'drunkenDriving': 400,
    'sum': 2300
}, {
    'city': '商丘',
    'drunkDriving': 700,
    'drunkenDriving': 1200,
    'sum': 1900
}, {
    'city': '许昌',
    'drunkDriving': 1200,
    'drunkenDriving': 1100,
    'sum': 2300
}];
function city() {
    var cityData = '';
    for (var i = 0; i < drunktroubleItem.length; i++) {
        cityData += drunktroubleItem[i].city + ',';
    };
    cityDatas = cityData.substring(0, cityData.length - 1);
    cityDatarel = cityDatas.split(',');
    return cityDatarel;
}
function drunkDriving() {
    var drunkDrivingData = '';
    for (var i = 0; i < drunktroubleItem.length; i++) {
        drunkDrivingData += drunktroubleItem[i].drunkDriving + ',';
    };
    drunkDrivingDatas = drunkDrivingData.substring(0, drunkDrivingData.length - 1);
    drunkDrivingDatarel = drunkDrivingDatas.split(',');
    return drunkDrivingDatarel;
}

function drunkenDriving() {
    var drunkenDrivingData = '';
    for (var i = 0; i < drunktroubleItem.length; i++) {
        drunkenDrivingData += drunktroubleItem[i].drunkenDriving + ',';
    };
    drunkenDrivingDatas = drunkenDrivingData.substring(0, drunkenDrivingData.length - 1);
    drunkenDrivingDatarel = drunkenDrivingDatas.split(',');
    return drunkenDrivingDatarel;
}
function sum1() {
    var sumData = '';
    for (var i = 0; i < drunktroubleItem.length; i++) {
        sumData += drunktroubleItem[i].sum + ',';
    };
    sumDatas = sumData.substring(0, sumData.length - 1);
    sumDatarel = sumDatas.split(',');
    return sumDatarel;
}

//处罚与事故
var punishMeasureItem = [{
    'city': '许昌',
    'measure1': 800,
    'measure2': 500,
    'compulsoryMeasure':300,
    'accident':1000,
    'sum': 1600
},{
    'city': '商丘',
    'measure1': 700,
    'measure2': 200,
    'compulsoryMeasure':150,
    'accident':1500,
    'sum': 1050
},{
    'city': '南阳',
    'measure1': 900,
    'measure2': 400,
    'compulsoryMeasure':250,
    'accident':1200,
    'sum': 1550
},{
    'city': '濮阳',
    'measure1': 700,
    'measure2': 700,
    'compulsoryMeasure':300,
    'accident':1800,
    'sum': 1700
},{
    'city': '洛阳',
    'measure1': 1700,
    'measure2': 400,
    'compulsoryMeasure':400,
    'accident':1700,
    'sum': 2500
}, {
    'city': '郑州',
    'measure1': 1100,
    'measure2': 200,
    'compulsoryMeasure':100,
    'accident':2000,
    'sum': 1400
}, {
    'city': '新乡',
    'measure1': 1200,
    'measure2': 400,
    'compulsoryMeasure':100,
    'accident':2500,
    'sum': 1700
}, {
    'city': '鹤壁',
    'measure1': 400,
    'measure2': 800,
    'compulsoryMeasure':200,
    'accident':800,
    'sum': 1400
}, {
    'city': '周口',
    'measure1': 770,
    'measure2': 130,
    'compulsoryMeasure':300,
    'accident':990,
    'sum': 1200
}, {
    'city': '济源',
    'measure1': 1150,
    'measure2': 200,
    'compulsoryMeasure':300,
    'accident':1120,
    'sum': 1650
}, {
    'city': '开封',
    'measure1': 650,
    'measure2': 300,
    'compulsoryMeasure':330,
    'accident':1230,
    'sum': 1280
}, {
    'city': '三门峡',
    'measure1': 1000,
    'measure2': 400,
    'compulsoryMeasure':300,
    'accident':2230,
    'sum': 1700
},{
    'city': '安阳',
    'measure1': 1000,
    'measure2': 500,
    'compulsoryMeasure':300,
    'accident':1950,
    'sum': 1500
},{
    'city': '焦作',
    'measure1': 580,
    'measure2': 440,
    'compulsoryMeasure':500,
    'accident':2100,
    'sum': 1520
},{
    'city': '漯河',
    'measure1': 600,
    'measure2': 800,
    'compulsoryMeasure':300,
    'accident':2200,
    'sum': 1400
}, {
    'city': '平顶山',
    'measure1': 1400,
    'measure2': 500,
    'compulsoryMeasure':650,
    'accident':1750,
    'sum': 2550
},{
    'city': '驻马店',
    'measure1': 1600,
    'measure2': 700,
    'compulsoryMeasure':450,
    'accident':1680,
    'sum': 2750
}, {
    'city': '信阳',
    'measure1': 1600,
    'measure2': 600,
    'compulsoryMeasure':300,
    'accident':2000,
    'sum': 2200
}];
function city1() {
    var cityData = '';
    for (var i = 0; i < punishMeasureItem.length; i++) {
        cityData += punishMeasureItem[i].city + ',';
    };
    cityDatas = cityData.substring(0, cityData.length - 1);
    cityDatarel = cityDatas.split(',');
    return cityDatarel;
}
function measure1() {
    var measure1Data = '';
    for (var i = 0; i < punishMeasureItem.length; i++) {
        measure1Data += punishMeasureItem[i].measure1 + ',';
    };
    measure1Datas = measure1Data.substring(0, measure1Data.length - 1);
    measure1Datarel = measure1Datas.split(',');
    for (var i = 0; i < measure1Datarel.length; i++) {
        measure1Datarel[i] = -measure1Datarel[i];
    };
    return measure1Datarel;
}
function measure2() {
    var measure2Data = '';
    for (var i = 0; i < punishMeasureItem.length; i++) {
        measure2Data += punishMeasureItem[i].measure2 + ',';
    };
    measure2Datas = measure2Data.substring(0, measure2Data.length - 1);
    measure2Datarel = measure2Datas.split(',');
    for (var i = 0; i < measure2Datarel.length; i++) {
        measure2Datarel[i] = -measure2Datarel[i];
    };
    return measure2Datarel;
}
function compulsoryMeasure() {
    var compulsoryMeasureData = '';
    for (var i = 0; i < punishMeasureItem.length; i++) {
        compulsoryMeasureData += punishMeasureItem[i].compulsoryMeasure + ',';
    };
    compulsoryMeasureDatas = compulsoryMeasureData.substring(0, compulsoryMeasureData.length - 1);
    compulsoryMeasureDatarel = compulsoryMeasureDatas.split(',');
    for (var i = 0; i < compulsoryMeasureDatarel.length; i++) {
        compulsoryMeasureDatarel[i] = -compulsoryMeasureDatarel[i];
    };
    return compulsoryMeasureDatarel;
}
function accident() {
    var accidentData = '';
    for (var i = 0; i < punishMeasureItem.length; i++) {
        accidentData += punishMeasureItem[i].accident + ',';
    };
    accidentDatas = accidentData.substring(0, accidentData.length - 1);
    accidentDatarel = accidentDatas.split(',');
    for (var i = 0; i < accidentDatarel.length; i++) {
        accidentDatarel[i] = accidentDatarel[i];
    };
    return accidentDatarel;
}