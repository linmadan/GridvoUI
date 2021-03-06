var _ = require('underscore');
var React = require('react');

var dVConfigs = null;
var pomelo = window.pomelo;
var DVConfigPanel = React.createClass({
    getInitialState: function () {
        return {
            dVConfigs: null,
            isSubmit: false
        };
    },
    componentDidMount: function () {
        var panel = this;
        pomelo.request("stationManage.stationHandler.getStationDVConfig", {
            stationName: this.props.stationName,
        }, function (result) {
            if (result.code === 500) {
                console.log("get station dv config fail");
                return;
            }
            dVConfigs = result.dVConfigs;
            panel.setState({
                dVConfigs: dVConfigs
            });
        });
    },
    componentDidUpdate: function () {
        if (this.state.isSubmit) {
            var dvcp = this;
            setTimeout(function () {
                dvcp.setState({
                    isSubmit: false
                })
            }, 1500);
        }
    },
    handleChange: function (event) {
        var {dVConfigs} = this.state;
        var dataName = event.target.name.split("-")[0];
        var configName = event.target.name.split("-")[1];
        if (configName == "maxV" || configName == "minV" || configName == "axisIntervalV" || configName == "splitNumber") {
            dVConfigs[dataName][configName] = parseInt(event.target.value);
        }
        else {
            dVConfigs[dataName][configName] = event.target.value;
        }
        this.setState({
            dVConfigs: dVConfigs
        });
    },
    submitHandler: function (event) {
        event.preventDefault();
        var panel = this;
        var stationDVConfig = {};
        stationDVConfig.stationName = this.props.stationName;
        stationDVConfig.dVConfigs = this.state.dVConfigs;
        pomelo.request("stationManage.stationHandler.setStationDVConfig", {stationDVConfig: stationDVConfig}, function (result) {
            if (result.code === 500) {
                console.log("set station dv config fail");
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
        var {dVConfigs} = this.state;
        var dvcp = this;
        var dVCUIs = [];
        _.each(_.keys(dVConfigs), function (key) {
            var dVConfig = dVConfigs[key];
            var ui = (
                <div key={dVConfig.dataName}>
                    <div className="weui_cells_title">
                        {dVConfig.dataName}
                    </div>
                    <div className="weui_cells weui_cells_form">
                        <div className="weui_cell">
                            <div className="weui_cell_hd">
                                可视化名称
                            </div>
                            <div className="weui_cell_bd weui_cell_primary">
                                <input className="weui_input" type="text"
                                       name={`${dVConfig.dataName}-visualName`}
                                       value={dVConfig.visualName} onChange={dvcp.handleChange}/>
                            </div>
                        </div>
                        <div className="weui_cell">
                            <div className="weui_cell_hd">
                                范围上限值
                            </div>
                            <div className="weui_cell_bd weui_cell_primary">
                                <input className="weui_input" type="number" pattern="[0-9]*"
                                       name={`${dVConfig.dataName}-maxV`}
                                       value={dVConfig.maxV} onChange={dvcp.handleChange}/>
                            </div>
                        </div>
                        <div className="weui_cell">
                            <div className="weui_cell_hd">
                                范围下限值
                            </div>
                            <div className="weui_cell_bd weui_cell_primary">
                                <input className="weui_input" type="number" pattern="[0-9]*"
                                       name={`${dVConfig.dataName}-minV`}
                                       value={dVConfig.minV} onChange={dvcp.handleChange}/>
                            </div>
                        </div>
                        <div className="weui_cell">
                            <div className="weui_cell_hd">
                                轴间隔值
                            </div>
                            <div className="weui_cell_bd weui_cell_primary">
                                <input className="weui_input" type="number" pattern="[0-9]*"
                                       name={`${dVConfig.dataName}-axisIntervalV`}
                                       value={dVConfig.axisIntervalV} onChange={dvcp.handleChange}/>
                            </div>
                        </div>
                        <div className="weui_cell">
                            <div className="weui_cell_hd">
                                轴间隔数目
                            </div>
                            <div className="weui_cell_bd weui_cell_primary">
                                <input className="weui_input" type="number" pattern="[0-9]*"
                                       name={`${dVConfig.dataName}-splitNumber`}
                                       value={dVConfig.splitNumber} onChange={dvcp.handleChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
            dVCUIs.push(ui);
        })
        if (_.isNull(dVConfigs)) {
            return (
                <div>
                    <div className="hd">
                        <h3 className="page_title">数据可视化设置</h3>
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
                        <h3 className="page_title">数据可视化设置</h3>
                    </div>
                    <div className="bd">
                        <form onSubmit={this.submitHandler}>
                            {dVCUIs}
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

module.exports = DVConfigPanel;