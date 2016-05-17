var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');
var RTDataConfigPanel = require('./rTDataConfigPanel.js');
var DVConfigPanel = require('./dVConfigPanel.js');

var ConfigDashBoard = React.createClass({
    componentDidMount: function () {
        ReactDOM.render(
            <article className="weui_article">
                <h1>配置参考文档</h1>
                <section>
                    <h2 className="title">实时数据配置</h2>
                    <section>
                        <h3></h3>

                        <p></p>
                    </section>
                    <section>
                        <h3></h3>

                        <p></p>
                    </section>
                    <h2 className="title">数据可视化配置</h2>
                    <section>
                        <h3></h3>

                        <p></p>
                    </section>
                    <section>
                        <h3></h3>

                        <p></p>
                    </section>
                </section>
            </article>,
            document.getElementById('config_content')
        );
    },
    backMainDashBoard: function (event) {
        var MainDashBoard = require("./mainDashBoard.js");
        ReactDOM.render(
            <MainDashBoard stationName={this.props.stationName}/>,
            document.getElementById('content')
        );
    },
    loadRTDataConfigPanel: function (event) {
        ReactDOM.render(
            <RTDataConfigPanel stationName={this.props.stationName}/>,
            document.getElementById('config_content')
        );
    },
    loadDVConfigPanel: function (event) {
        ReactDOM.render(
            <DVConfigPanel stationName={this.props.stationName}/>,
            document.getElementById('config_content')
        );
    },
    render: function () {
        return (
            <div className="weui_tab">
                <div id="config_content" className="weui_tab_bd">
                </div>
                <div className="weui_tabbar">
                    <a href="javascript:;" onClick={this.loadRTDataConfigPanel}
                       className="weui_tabbar_item">
                        <div className="weui_tabbar_icon">
                            <img src="./images/icon_nav_button.png" alt=""/>
                        </div>
                        <p className="weui_tabbar_label">实时监控</p>
                    </a>
                    <a href="javascript:;" onClick={this.loadDVConfigPanel} className="weui_tabbar_item">
                        <div className="weui_tabbar_icon">
                            <img src="./images/icon_nav_cell.png" alt=""/>
                        </div>
                        <p className="weui_tabbar_label">数据可视化</p>
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
});

module.exports = ConfigDashBoard;