var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');
var mqtt = require('mqtt');
var RTDataMonitorPanel = require('./rTDataMonitorPanel.js');

var client;
var RTDataDashBoard = React.createClass({
    getInitialState: function () {
        return {
            stationName: "NWHYJZ",
            currentDataName: null,
            rTdatas: {}
        };
    },
    componentDidMount: function () {
        var dashBoard = this;
        client = mqtt.connect('ws://10.0.3.16:61623', {"username": "gridvo", "password": "gridvo"});
        client.on('connect', function () {
            client.subscribe(`${dashBoard.state.stationName}/#`);
            client.publish(`startRTDataMonitor/${dashBoard.state.stationName}`, '');
            console.log("connect success");
        });
        client.on('message', function (topic, message) {
            if (topic == `${dashBoard.state.stationName}/startRTDataMonitor`) {
                var result = JSON.parse(message.toString());
                if (result.startSuccess) {
                    dashBoard.setState({
                        currentDataName: _.keys(result.rTdatas)[0],
                        rTdatas: result.rTdatas
                    });
                }
                else {
                    let stationRTDataConfig = {};
                    stationRTDataConfig.stationName = dashBoard.state.stationName;
                    stationRTDataConfig.rTDataConfigs = {};
                    for (let dataName of _.keys(result.rTdatas)) {
                        stationRTDataConfig.rTDataConfigs[dataName] = {};
                        stationRTDataConfig.rTDataConfigs[dataName].dataName = dataName;
                        stationRTDataConfig.rTDataConfigs[dataName].timeSpace = 1000 * 6;
                        stationRTDataConfig.rTDataConfigs[dataName].timeLong = 1000 * 60 * 60 * 4;
                    }
                    client.publish(`setStationRTData/${dashBoard.state.stationName}`, JSON.stringify(stationRTDataConfig));
                }
            }
        });
        client.on('close', function () {
            console.log("close success");
        });
    },
    componentWillUnmount: function () {
        client.end();
    },
    backMainDashBoard: function (event) {
        var MainDashBoard = require("./mainDashBoard.js");
        ReactDOM.render(
            <MainDashBoard/>,
            document.getElementById('content')
        );
    },
    render: function () {
        var {currentDataName,rTdatas} = this.state;
        if (_.isNull(currentDataName)) {
            return (
                <div className="weui_tab">
                    <div id="rt_data_content" className="weui_tab_bd">
                        <div id="loadingToast" className="weui_loading_toast">
                            <div className="weui_mask_transparent"></div>
                            <div className="weui_toast">
                                <div className="weui_loading">
                                    <div className="weui_loading_leaf weui_loading_leaf_0"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_1"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_2"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_3"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_4"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_5"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_6"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_7"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_8"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_9"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_10"></div>
                                    <div className="weui_loading_leaf weui_loading_leaf_11"></div>
                                </div>
                                <p className="weui_toast_content">数据加载中</p>
                            </div>
                        </div>
                    </div>
                    <div className="weui_tabbar">
                        <a href="javascript:;" className="weui_tabbar_item weui_bar_item_on">
                            <div className="weui_tabbar_icon">
                                <img src="./images/icon_nav_button.png" alt=""/>
                            </div>
                            <p className="weui_tabbar_label">实时数据</p>
                        </a>
                        <a href="javascript:;" className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img src="./images/icon_nav_cell.png" alt=""/>
                            </div>
                            <p className="weui_tabbar_label">监控设置</p>
                        </a>
                        <a href="javascript:;" onClick={this.backMainDashBoard} className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img src="./images/icon_nav_article.png" alt=""/>
                            </div>
                            <p className="weui_tabbar_label">返 回</p>
                        </a>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="weui_tab">
                    <div id="rt_data_content" className="weui_tab_bd">
                        <RTDataMonitorPanel dataName={currentDataName} rTData={rTdatas[currentDataName]}/>
                    </div>
                    <div className="weui_tabbar">
                        <a href="javascript:;" className="weui_tabbar_item weui_bar_item_on">
                            <div className="weui_tabbar_icon">
                                <img src="./images/icon_nav_button.png" alt=""/>
                            </div>
                            <p className="weui_tabbar_label">实时数据</p>
                        </a>
                        <a href="javascript:;" className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img src="./images/icon_nav_cell.png" alt=""/>
                            </div>
                            <p className="weui_tabbar_label">监控设置</p>
                        </a>
                        <a href="javascript:;" onClick={this.backMainDashBoard} className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img src="./images/icon_nav_article.png" alt=""/>
                            </div>
                            <p className="weui_tabbar_label">返 回</p>
                        </a>
                    </div>
                </div>
            );
        }
    }
});

module.exports = RTDataDashBoard;