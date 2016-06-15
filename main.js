require('babel-polyfill');
var React = require('react');
var ReactDOM = require('react-dom');
var SelectStationPanel = require("./lib/ui/selectStationPanel.js");
require('pomelo-cocos2d-js');

var pomelo = window.pomelo;
pomelo.init({
    host: "127.0.0.1",
    port: "3010",
    log: true
}, function () {
    pomelo.request("stationConGate.stationConHandler.queryConnector", {}, function (result) {
        pomelo.disconnect();
        if (result.code === 500) {
            console.log("query station connector server fail");
            return;
        }
        pomelo.init({
            host: result.host,
            port: result.port,
            log: true
        }, function () {
            pomelo.request("stationConnector.employeeEntryHandler.entry", {
                accountID: "WeChatAccount",
                accountType: "WeChat"
            }, function (result) {
                if (result.code === 500) {
                    console.log("station employee entry fail");
                    return;
                }
                window.stationNames = result.account.dutyStations;
                ReactDOM.render(
                    <SelectStationPanel/>,
                    document.getElementById('content')
                );
            });
        });
    });
});
