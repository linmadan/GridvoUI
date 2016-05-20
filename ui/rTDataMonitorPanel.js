var _ = require('underscore');
var React = require('react');
var Echarts = require('echarts');

var chart;
var RTDataMonitorPanel = React.createClass({
    componentDidMount: function () {
        chart = Echarts.init(document.getElementById('rTDataCharts'));
        var {rTDatas,timeLong,timeSpace,dVConfigs} = this.props;
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
            legend.push(dVConfigs[dataName].visualName);
            let serie = {};
            serie.name = dVConfigs[dataName].visualName;
            serie.type = "line";
            if (dataName.indexOf("_SQSW") != -1 || dataName.indexOf("_SHSW") != -1) {
                serie.yAxisIndex = 1;
                serie.hoverAnimation = false;
                serie.areaStyle = {normal: {}};
                serie.lineStyle = {normal: {width: 1}};
            }
            if (dataName.indexOf("_LJYL") != -1) {
                serie.yAxisIndex = 2;
                serie.type = "bar";
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
        var maxPQV, minPQV, maxSWV, minSWV, maxYLV, minYLV, intervalPQV, intervalSWV, intervalYLV, splitNumberPQ, splitNumberSW, splitNumberYL;
        maxPQV = minPQV = maxSWV = minSWV = maxYLV = minYLV = "auto";
        intervalPQV = intervalSWV = intervalYLV = splitNumberPQ = splitNumberSW = splitNumberYL = 0;
        for (let dataName of _.keys(dVConfigs)) {
            let dVConfig = dVConfigs[dataName];
            if (dataName.indexOf("_P") != -1 || dataName.indexOf("_Q") != -1) {
                if (!_.isNull(dVConfig.maxV)) {
                    if (maxPQV == "auto") {
                        maxPQV = 0;
                    }
                    if (dVConfig.maxV > maxPQV) {
                        maxPQV = dVConfig.maxV;
                    }
                }
                if (!_.isNull(dVConfig.minV)) {
                    if (minPQV == "auto") {
                        minPQV = 100000;
                    }
                    if (dVConfig.minV < minPQV) {
                        minPQV = dVConfig.minV;
                    }
                }
                if (dVConfig.axisIntervalV > intervalPQV) {
                    intervalPQV = dVConfig.axisIntervalV;
                }
                if (dVConfig.splitNumber > splitNumberPQ) {
                    splitNumberPQ = dVConfig.splitNumber;
                }
            }
            if (dataName.indexOf("_LJYL") != -1) {
                if (!_.isNull(dVConfig.maxV)) {
                    if (maxYLV == "auto") {
                        maxYLV = 0;
                    }
                    if (dVConfig.maxV > maxYLV) {
                        maxYLV = dVConfig.maxV;
                    }
                }
                if (!_.isNull(dVConfig.minV)) {
                    if (minYLV == "auto") {
                        minYLV = 100000;
                    }
                    if (dVConfig.minV < minYLV) {
                        minYLV = dVConfig.minV;
                    }
                }
                if (dVConfig.axisIntervalV > intervalYLV) {
                    intervalYLV = dVConfig.axisIntervalV;
                }
                if (dVConfig.splitNumber > splitNumberYL) {
                    splitNumberYL = dVConfig.splitNumber;
                }
            }
            if (dataName.indexOf("_SQSW") != -1 || dataName.indexOf("_SHSW") != -1) {
                if (!_.isNull(dVConfig.maxV)) {
                    if (maxSWV == "auto") {
                        maxSWV = 0;
                    }
                    if (dVConfig.maxV > maxSWV) {
                        maxSWV = dVConfig.maxV;
                    }
                }
                if (!_.isNull(dVConfig.minV)) {
                    if (minSWV == "auto") {
                        minSWV = 100000;
                    }
                    if (dVConfig.minV < minSWV) {
                        minSWV = dVConfig.minV;
                    }
                }
                if (dVConfig.axisIntervalV > intervalSWV) {
                    intervalSWV = dVConfig.axisIntervalV;
                }
                if (dVConfig.splitNumber > splitNumberSW) {
                    splitNumberSW = dVConfig.splitNumber;
                }
            }
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
                max: maxPQV,
                min: minPQV,
                interval: intervalPQV,
                splitNumber: splitNumberPQ
            }, {
                name: "水位",
                type: 'value',
                max: maxSWV,
                min: minSWV,
                interval: intervalSWV,
                splitNumber: splitNumberSW
            }, {
                name: "降雨量",
                nameLocation: 'middle',
                type: 'value',
                max: maxYLV,
                min: minYLV,
                interval: intervalYLV,
                splitNumber: splitNumberYL,
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
        var {rTDatas,timeLong,timeSpace,dVConfigs} = this.props;
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
            serie.name = dVConfigs[dataName].visualName;
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