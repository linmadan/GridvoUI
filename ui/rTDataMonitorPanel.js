var _ = require('underscore');
var React = require('react');
var Echarts = require('echarts');

var chart;
var RTDataMonitorPanel = React.createClass({
    componentDidMount: function () {
        chart = Echarts.init(document.getElementById('rTDataCharts'));
        var {rTDatas} = this.props;
        var legend = [];
        var series = [];
        var dates = [];
        for (let dataName of _.keys(rTDatas)) {
            legend.push(dataName);
            let serie = {};
            serie.name = dataName;
            serie.type = "line";
            if (false) {
                serie.yAxisIndex = 1;
            }
            if (dataName.indexOf("_LJYL") != -1) {
                serie.yAxisIndex = 2;
                serie.hoverAnimation = false;
                serie.areaStyle = {normal: {}};
                serie.lineStyle = {normal: {width: 1}};
            }
            serie.data = [];
            for (let data of rTDatas[dataName].datas) {
                if (!_.isNull(data)) {
                    serie.data.push(data.value);
                    let year, month, date, hours, minutes, timestamp;
                    timestamp = new Date(data.timestamp);
                    year = timestamp.getFullYear();
                    month = timestamp.getMonth();
                    date = timestamp.getDate();
                    hours = timestamp.getHours();
                    minutes = timestamp.getMinutes();
                    dates.push(`${year}/${month + 1}/${date} ${hours}:${minutes}`);
                }
            }
            series.push(serie);
        }
        var option = {
            title: {
                text: "",
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legend,
                x: "left"
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 75,
                    end: 100
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 75,
                    end: 100
                }
            ],
            xAxis: {
                splitNumber: 12,
                axisLine: {onZero: false},
                data: dates
            },
            yAxis: [{
                name: "发电量",
                type: 'value',
                splitNumber: 10
            }, {
                name: "水位",
                type: 'value',
            }, {
                name: "降雨量",
                nameLocation: 'middle',
                type: 'value',
                splitNumber: 0,
                axisTick: {
                    inside: true
                },
                axisLabel: {
                    inside: true
                }
            }],
            series: series
        };
        chart.setOption(option);
    },
    componentDidUpdate: function () {
        var {rTDatas,updateDataName} = this.props;
        var series = [];
        var dates = [];
        let serie = {};
        serie.name = updateDataName;
        serie.data = [];
        for (let data of rTDatas[updateDataName].datas) {
            if (!_.isNull(data)) {
                serie.data.push(data.value);
                let year, month, date, hours, minutes, timestamp;
                timestamp = new Date(data.timestamp);
                year = timestamp.getFullYear();
                month = timestamp.getMonth();
                date = timestamp.getDate();
                hours = timestamp.getHours();
                minutes = timestamp.getMinutes();
                dates.push(`${year}/${month + 1}/${date} ${hours}:${minutes}`);
            }
        }
        series.push(serie);
        var option = {
            xAxis: {
                data: dates
            },
            yAxis: {},
            series: series
        };
        chart.setOption(option);
    },
    render: function () {
        return (
            <div id="rTDataCharts" style={{width: "100%",height:"100%"}}></div>
        );
    }
});

module.exports = RTDataMonitorPanel;