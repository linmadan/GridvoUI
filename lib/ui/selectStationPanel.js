var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');

var SelectStationPanel = React.createClass({
    selectStation: function (event) {
        var pomelo = window.pomelo;
        var stationName = event.target.text;
        pomelo.request("stationConnector.employeeEntryHandler.selectStation", {
            stationName: stationName
        }, function (result) {
            if (result.code === 500) {
                console.log("station employee select station fail");
                return;
            }
            var MainDashBoard = require("./mainDashBoard.js");
            ReactDOM.render(
                <MainDashBoard stationName={stationName}/>,
                document.getElementById('content')
            );
        });
    },
    render: function () {
        var stationUIs = [];
        var self = this;
        var stationNames = window.stationNames;
        _.each(stationNames, function (stationName) {
            var ui = (
                <a key={stationName} href="javascript:;" onClick={self.selectStation}
                   className="weui_btn weui_btn_primary">{stationName}</a>
            );
            stationUIs.push(ui);
        })
        return (
            <div>
                <div className="hd">
                    <h3 className="page_title">站点选择</h3>
                </div>
                <div className="bd">
                    {stationUIs}
                </div>
            </div>
        );
    }
});

module.exports = SelectStationPanel;