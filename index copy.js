import echarts from "echarts";
import mapJson from './public/map.geo.json'
import provinceDefault from "./public/provinceDefault.json"
console.log(mapJson)
console.log(echarts)
console.log(provinceDefault)

// window.onload = () => {
//     document.getElementById('main').style('width')
// }

// window.onresize = () => {
//     document.getElementById('main').style.width = '100%';
//     document.getElementById('main').style.height = '100%';

// }

// fetch(new Request('./map.geo.json')).then((it) => {
//     it.json().then((it) => {
//         console.log(it)
//     })
// })

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = mapJson[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};



// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
// myChart.setOption({
//     title: {
//         text: 'ECharts 入门示例'
//     },
//     tooltip: {},
//     xAxis: {
//         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//     },
//     yAxis: {},
//     series: [{
//         name: '销量',
//         type: 'bar',
//         data: [5, 20, 36, 10, 10, 20]
//     }]
// });

echarts.registerMap('MY', mapJson) //注册

// echarts.registerMap('xicheng', geoJson, {});
var option = {
    title :{
        text: "P2P default amount by province"
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c} (p / km2)'
    },
    bmap: {
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: true,
        mapStyle: {
            styleJson: [{
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'land',
                'elementType': 'all',
                'stylers': {
                    'color': '#f3f3f3'
                }
            }, {
                'featureType': 'railway',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'highway',
                'elementType': 'all',
                'stylers': {
                    'color': '#fdfdfd'
                }
            }, {
                'featureType': 'highway',
                'elementType': 'labels',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'arterial',
                'elementType': 'geometry',
                'stylers': {
                    'color': '#fefefe'
                }
            }, {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                    'color': '#fefefe'
                }
            }, {
                'featureType': 'poi',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'green',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'subway',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'local',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'arterial',
                'elementType': 'labels',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'boundary',
                'elementType': 'all',
                'stylers': {
                    'color': '#fefefe'
                }
            }, {
                'featureType': 'building',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'label',
                'elementType': 'labels.text.fill',
                'stylers': {
                    'color': '#999999'
                }
            }]
        }
    },
    visualMap: {
        min: 500,
        max: 50000,
        text: ['High', 'Low'],
        left: 'right',
        realtime: false,
        calculable: true,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8'].reverse()
        }
    },
    series: [
        {
        name: '全国',
        type: 'map',
        mapType: 'MY',
        coordinateSystem: 'bmap',
        data: provinceDefault,
        aspectScale: 0.85, //地图长度比
        label: {
            normal: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                    color: '#333'
                }
            }
        },
        
    }]
};

console.log(myChart)
myChart.setOption(option);

// var option = {
//     series: [{
//         name: 'my custom map',
//         type: 'map',
//         roam: true,
//         map: 'MY' //使用
//     }]
// };

// myChart.setOption(option);