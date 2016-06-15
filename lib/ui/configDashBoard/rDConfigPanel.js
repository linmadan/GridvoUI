var _ = require('underscore');
var React = require('react');

var rDConfigs = null;
var pomelo = window.pomelo;
var RDConfigPanel = React.createClass({
    getInitialState: function () {
        return {
            rDConfigs: null,
            isSubmit: false
        };
    },
    componentDidMount: function () {
        var panel = this;
        pomelo.request("stationManage.stationHandler.getStationRDConfig", {
            stationName: this.props.stationName,
        }, function (result) {
            if (result.code === 500) {
                console.log("get station rd config fail");
                return;
            }
            rDConfigs = result.rDConfigs;
            panel.setState({
                rDConfigs: rDConfigs
            });
        });
    },
    componentDidUpdate: function () {
        if (this.state.isSubmit) {
            var rdcp = this;
            setTimeout(function () {
                rdcp.setState({
                    isSubmit: false
                })
            }, 2000);
        }
    },
    handleChange: function (event) {
        var {rDConfigs} = this.state;
        var dataName = event.target.name.split("-")[0];
        var configName = event.target.name.split("-")[1];
        if (configName == "openRDM" || configName == "isPubAllRTData") {
            rDConfigs[dataName][configName] = event.target.checked;
        }
        else {
            rDConfigs[dataName][configName] = parseInt(event.target.value) * 60000;
        }
        this.setState(rDConfigs);
    },
    submitHandler: function (event) {
        event.preventDefault();
        var panel = this;
        var stationRDConfig = {};
        stationRDConfig.stationName = this.props.stationName;
        stationRDConfig.rTDataConfigs = this.state.rDConfigs;
        pomelo.request("stationManage.stationHandler.setStationRDConfig", {stationRDConfig: stationRDConfig}, function (result) {
            if (result.code === 500) {
                console.log("set station rd config fail");
                return;
            }
            if (result.isSuccess) {
                panel.setState({
                    isSubmit: true
                });
            }
        });
    },
    render: function () {
        var {rDConfigs} = this.state;
        var rdcp = this;
        var rDCUIs = [];
        _.each(_.keys(rDConfigs), function (key) {
            var rDConfig = rDConfigs[key];
            var ui = (
                <div key={rDConfig.dataName}>
                    <div className="weui_cells_title">
                        {rDConfig.dataName}
                    </div>
                    <div className="weui_cells weui_cells_form">
                        <div className="weui_cell weui_cell_switch">
                            <div className="weui_cell_hd weui_cell_primary">开启实时监控</div>
                            <div className="weui_cell_ft">
                                <input className="weui_switch" type="checkbox" name={`${rDConfig.dataName}-openRDM`}
                                       checked={rDConfig.openRDM} onChange={rdcp.handleChange}/>
                            </div>
                        </div>
                        <div className="weui_cell">
                            <div className="weui_cell_hd">
                                时间间隔
                            </div>
                            <div className="weui_cell_bd weui_cell_primary">
                                <input className="weui_input" type="number" pattern="[0-9]*"
                                       name={`${rDConfig.dataName}-timeSpace`}
                                       value={rDConfig.timeSpace/60000} onChange={rdcp.handleChange}/>
                            </div>
                        </div>
                        <div className="weui_cell">
                            <div className="weui_cell_hd">
                                时间长度
                            </div>
                            <div className="weui_cell_bd weui_cell_primary">
                                <input className="weui_input" type="number" pattern="[0-9]*"
                                       name={`${rDConfig.dataName}-timeLong`}
                                       value={rDConfig.timeLong/60000} onChange={rdcp.handleChange}/>
                            </div>
                        </div>
                        <div className="weui_cell weui_cell_switch">
                            <div className="weui_cell_hd weui_cell_primary">全数据推送</div>
                            <div className="weui_cell_ft">
                                <input className="weui_switch" type="checkbox"
                                       name={`${rDConfig.dataName}-isPubAllRTData`} checked={rDConfig.isPubAllRTData}
                                       onChange={rdcp.handleChange}/>
                            </div>
                        </div>
                        <div className="weui_cell">
                            <div className="weui_cell_hd">
                                推送间隔
                            </div>
                            <div className="weui_cell_bd weui_cell_primary">
                                <input className="weui_input" type="number" pattern="[0-9]*"
                                       name={`${rDConfig.dataName}-pubDataSpace`}
                                       value={rDConfig.pubDataSpace/60000} onChange={rdcp.handleChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
            rDCUIs.push(ui);
        })
        if (_.isNull(rDConfigs)) {
            return (
                <div>
                    <div className="hd">
                        <h3 className="page_title">实时监控设置</h3>
                    </div>
                    <div className="bd">
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
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="hd">
                        <h3 className="page_title">实时监控设置</h3>
                    </div>
                    <div className="bd">
                        <form onSubmit={this.submitHandler}>
                            {rDCUIs}
                            <button className="weui_btn weui_btn_primary" type="submit">提 交</button>
                        </form>
                        <div id="toast" style={this.state.isSubmit?{display: "inherit"}:{display: "none"}}>
                            <div className="weui_mask_transparent"></div>
                            <div className="weui_toast">
                                <i className="weui_icon_toast"></i>

                                <p className="weui_toast_content">已完成</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
});

module.exports = RDConfigPanel;