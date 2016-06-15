var React = require('react');
var ReactDOM = require('react-dom');

var MainDashBoard = React.createClass({
    loadRTDataDashBoard: function (event) {
        var RTDataDashBoard = require('./realTimeDataDashBoard/dashBoard.js');
        ReactDOM.render(
            <RTDataDashBoard stationName={this.props.stationName}/>,
            document.getElementById('content')
        );
    },
    loadConfigDashBoard: function (event) {
        var ConfigDashBoard = require('./configDashBoard/dashBoard.js');
        ReactDOM.render(
            <ConfigDashBoard stationName={this.props.stationName}/>,
            document.getElementById('content')
        );
    },
    loadSelectStation: function (event) {
        var SelectStationPanel = require("./selectStationPanel.js");
        ReactDOM.render(
            <SelectStationPanel/>,
            document.getElementById('content')
        );
    },
    render: function () {
        return (
            <div>
                <div className="hd">
                    <h1 className="page_title">
                        格物科技
                    </h1>

                    <p className="page_desc">
                        小水电智能化专家
                    </p>
                </div>
                <div className="weui_grids">
                    <a href="#" onClick={this.loadRTDataDashBoard} className="weui_grid">
                        <div className="weui_grid_icon">
                            <i className="icon icon_ssjk"></i>
                        </div>
                        <p className="weui_grid_label">
                            实时监控
                        </p>
                    </a>
                    <a href="#" className="weui_grid">
                        <div className="weui_grid_icon">
                            <i className="icon icon_lscx"></i>
                        </div>
                        <p className="weui_grid_label">
                            历史查询
                        </p>
                    </a>
                    <a href="#" onClick={this.loadConfigDashBoard} className="weui_grid">
                        <div className="weui_grid_icon">
                            <i className="icon icon_pzxx"></i>
                        </div>
                        <p className="weui_grid_label">
                            配置选项
                        </p>
                    </a>
                    <a href="#" onClick={this.loadSelectStation} className="weui_grid">
                        <div className="weui_grid_icon">
                            <i className="icon icon_qhzd"></i>
                        </div>
                        <p className="weui_grid_label">
                            切换站点
                        </p>
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = MainDashBoard;