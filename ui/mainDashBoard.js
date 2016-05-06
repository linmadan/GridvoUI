var React = require('react');
var ReactDOM = require('react-dom');
var RTDataDashBoard = require('./rTDataDashBoard.js');

var MainDashBoard = React.createClass({
    loadRTDataDashBoard: function (event) {
        ReactDOM.render(
            <RTDataDashBoard stationName={this.props.stationName}/>,
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
                    <a href="#" className="weui_grid">
                        <div className="weui_grid_icon">
                            <i className="icon icon_gdgn"></i>
                        </div>
                        <p className="weui_grid_label">
                            更多功能
                        </p>
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = MainDashBoard;