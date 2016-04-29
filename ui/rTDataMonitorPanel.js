var _ = require('underscore');
var React = require('react');
var d3 = require('d3');

import ReStock from "react-stockcharts";

var { ChartCanvas, Chart, EventCapture } = ReStock;
var { AreaSeries } = ReStock.series;
var { MouseCoordinates } = ReStock.coordinates;
var { XAxis, YAxis } = ReStock.axes;

var RTDataMonitorPanel = React.createClass({
    getDefaultProps: function () {
        return {
            width: 800,
            height: 600,
            dataName: "",
            type: "hybrid",
            rTData: null
        };
    },
    render: function () {
        var {type,dataName,rTData,width,height} = this.props;
        var data = [];
        if (!_.isNull(rTData)) {
            for (let d of rTData.datas) {
                let o = {};
                o.value = d.value;
                o.timestamp = new Date(d.timestamp);
                data.push(o);
            }
        }
        return (
            <div classNmae="weui_panel">
                <div classNmae="weui_panel_hd">{this.props.dataName}</div>
                <div classNmae="weui_panel_bd">
                    <ChartCanvas width={width} height={height}
                                 margin={{left: 100, right: 100, top:10, bottom: 50}}
                                 seriesName={dataName}
                                 data={data} type={type}
                                 xAccessor={d => d.timestamp} xScale={d3.time.scale()}>
                        <Chart id={0} yExtents={d => d.value} yMousePointerDisplayLocation="right"
                               yMousePointerDisplayFormat={d3.format(".2f")}>
                            <XAxis axisAt="bottom" orient="bottom" ticks={32}/>
                            <YAxis axisAt="left" orient="left"/>
                            <AreaSeries yAccessor={(d) => d.value}/>
                        </Chart>
                        <MouseCoordinates xDisplayFormat={d3.time.format("%m-%d %H:%M")}/>
                        <EventCapture mouseMove={true} zoom={false} pan={true}/>
                    </ChartCanvas>
                </div>
            </div>
        );
    }
});

module.exports = RTDataMonitorPanel;