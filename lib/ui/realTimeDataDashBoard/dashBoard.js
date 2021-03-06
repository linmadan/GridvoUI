var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');
var RTDataMonitorPanel = require('./rTDataMonitorPanel.js');

var pomelo = window.pomelo;
var rTDatas = null, dVConfigs = null;
var RTDataDashBoard = React.createClass({
    getInitialState: function () {
        return {
            rTDatas: null
        };
    },
    componentDidMount: function () {
        var dashBoard = this;
        pomelo.request("stationManage.stationHandler.getStationDVConfig", {
            stationName: dashBoard.props.stationName,
        }, function (result) {
            if (result.code === 500) {
                console.log("get station dv config fail");
                return;
            }
            dVConfigs = result.dVConfigs;
            pomelo.request("dataRTMaster.stationHandler.startRTDataMonitor", {
                stationName: dashBoard.props.stationName,
            }, function (result) {
                if (result.code === 500) {
                    console.log("station start rd monitor fail");
                    return;
                }
                if (result.startSuccess) {
                    rTDatas = result.rTdatas;
                    let maxTimeLong = 0, minTimeSpace = 1000 * 60 * 60;
                    for (let dataName of _.keys(rTDatas)) {
                        let rTData = rTDatas[dataName];
                        if (rTData.timeLong > maxTimeLong) {
                            maxTimeLong = rTData.timeLong;
                        }
                        if (rTData.timeSpace < minTimeSpace) {
                            minTimeSpace = rTData.timeSpace;
                        }
                    }
                    dashBoard.setState({
                        dVConfigs: dVConfigs,
                        rTDatas: rTDatas,
                        timeLong: maxTimeLong,
                        timeSpace: minTimeSpace
                    });
                    pomelo.on("onPubRTData", function (result) {
                        console.log(result);
                        if (!_.isNull(rTDatas)) {
                            for (let data of result.datas) {
                                if (rTDatas[result.dataName].datas.length < (rTDatas[result.dataName].timeLong / rTDatas[result.dataName].timeSpace)) {
                                    rTDatas[result.dataName].datas.push(data);
                                } else {
                                    rTDatas[result.dataName].datas.shift();
                                    rTDatas[result.dataName].datas.push(data);
                                }
                                console.log(data);
                            }
                            dashBoard.setState({
                                rTDatas: rTDatas
                            });
                        }
                    });
                }
            });
        });
    },
    componentWillUnmount: function () {
        pomelo.removeAllListeners("onPubRTData");
    },
    reLoadRTData: function (event) {
        var dashBoard = this;
        pomelo.request("dataRTMaster.stationHandler.startRTDataMonitor", {
            stationName: dashBoard.props.stationName,
        }, function (result) {
            if (result.code === 500) {
                console.log("station start rd monitor fail");
                return;
            }
            if (result.startSuccess) {
                rTDatas = result.rTdatas;
                dashBoard.setState({
                    rTDatas: rTDatas,
                });
            }
        });
    },
    backMainDashBoard: function (event) {
        var MainDashBoard = require("./../mainDashBoard.js");
        ReactDOM.render(
            <MainDashBoard stationName={this.props.stationName}/>,
            document.getElementById('content')
        );
    },
    render: function () {
        if (_.isNull(this.state.rTDatas)) {
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
                        <a href="javascript:;" className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img src="./images/icon_nav_button.png" alt=""/>
                            </div>
                            <p className="weui_tabbar_label">实时数据</p>
                        </a>
                        <a href="javascript:;" className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img src="./images/icon_nav_cell.png" alt=""/>
                            </div>
                            <p className="weui_tabbar_label">重新加载</p>
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
                        <RTDataMonitorPanel stationName={this.props.stationName}
                                            dVConfigs={this.state.dVConfigs}
                                            rTDatas={this.state.rTDatas}
                                            timeLong={this.state.timeLong}
                                            timeSpace={this.state.timeSpace}/>
                    </div>
                    <div className="weui_tabbar">
                        <a href="javascript:;" className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img src="./images/icon_nav_button.png" alt=""/>
                            </div>
                            <p className="weui_tabbar_label">实时数据</p>
                        </a>
                        <a href="javascript:;" onClick={this.reLoadRTData} className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img src="./images/icon_nav_cell.png" alt=""/>
                            </div>
                            <p className="weui_tabbar_label">重新加载</p>
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