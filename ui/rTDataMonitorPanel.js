var _ = require('underscore');
var React = require('react');
var Echarts = require('echarts');

var chart;
var RTDataMonitorPanel = React.createClass({
    componentDidMount: function () {
        chart = Echarts.init(document.getElementById('rTDataCharts'));
        var {rTDatas,timeLong,timeSpace} = this.props;
        var datesCount = timeLong / timeSpace;
        var dates = new Array(datesCount);
        var cDate = new Date();
        for (let n = datesCount; n > 0; n--) {
            let year, month, day, hours, minutes, date;
            date = new Date(cDate.getTime() - (datesCount - n) * timeSpace);
            year = date.getFullYear();
            month = date.getMonth();
            day = date.getDate();
            hours = date.getHours();
            minutes = date.getMinutes();
            dates[n - 1] = `${year}/${month + 1}/${day} ${hours}:${minutes}`;
        }
        var legend = [];
        var series = [];
        for (let dataName of _.keys(rTDatas)) {
            legend.push(dataName);
            let serie = {};
            serie.name = dataName;
            serie.type = "line";
            if (dataName.indexOf("_SQSW") != -1 || dataName.indexOf("_SHSW") != -1) {
                serie.type = "bar";
                serie.yAxisIndex = 1;
            }
            if (dataName.indexOf("_LJYL") != -1) {
                serie.yAxisIndex = 2;
                serie.hoverAnimation = false;
                serie.areaStyle = {normal: {}};
                serie.lineStyle = {normal: {width: 1}};
            }
            serie.data = new Array(dates.length).fill(undefined);
            for (let data of rTDatas[dataName].datas) {
                if (!_.isNull(data)) {
                    let year, month, day, hours, minutes, date, timestamp;
                    timestamp = new Date(data.timestamp);
                    year = timestamp.getFullYear();
                    month = timestamp.getMonth();
                    day = timestamp.getDate();
                    hours = timestamp.getHours();
                    minutes = timestamp.getMinutes();
                    date = `${year}/${month + 1}/${day} ${hours}:${minutes}`;
                    let index = _.indexOf(dates, date);
                    serie.data[index] = (data.value);
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
                min: 1579,
                max: 1580
            }, {
                name: "降雨量",
                nameLocation: 'middle',
                type: 'value',
                min: 2900,
                max: 3100,
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
        var {rTDatas,timeLong,timeSpace} = this.props;
        var datesCount = timeLong / timeSpace;
        var dates = new Array(datesCount);
        var cDate = new Date();
        for (let n = datesCount; n > 0; n--) {
            let year, month, day, hours, minutes, date;
            date = new Date(cDate.getTime() - (datesCount - n) * timeSpace);
            year = date.getFullYear();
            month = date.getMonth();
            day = date.getDate();
            hours = date.getHours();
            minutes = date.getMinutes();
            dates[n - 1] = `${year}/${month + 1}/${day} ${hours}:${minutes}`;
        }
        var series = [];
        for (let dataName of _.keys(rTDatas)) {
            let serie = {};
            serie.name = dataName;
            serie.data = new Array(dates.length).fill(undefined);
            for (let data of rTDatas[dataName].datas) {
                if (!_.isNull(data)) {
                    let year, month, day, hours, minutes, date, timestamp;
                    timestamp = new Date(data.timestamp);
                    year = timestamp.getFullYear();
                    month = timestamp.getMonth();
                    day = timestamp.getDate();
                    hours = timestamp.getHours();
                    minutes = timestamp.getMinutes();
                    date = `${year}/${month + 1}/${day} ${hours}:${minutes}`;
                    let index = _.indexOf(dates, date);
                    serie.data[index] = (data.value);
                }
            }
            series.push(serie);
        }
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