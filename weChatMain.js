require('babel-polyfill');
var React = require('react');
var ReactDOM = require('react-dom');
var SelectStationPanel = require("./lib/ui/selectStationPanel.js");
require('pomelo-cocos2d-js');

var getCookie = function (cname) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return document.cookie.substring(c_start, c_end);
        }
    }
    return ""
};
var pomelo = window.pomelo;
pomelo.init({
    host: "pascal.gridvo.com",
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
                accountID: getCookie("accountID"),
                accountType: getCookie("accountType")
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
