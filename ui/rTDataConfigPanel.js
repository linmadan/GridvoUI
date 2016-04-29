var React = require('react');

var RTDataConfigPanel = React.createClass({
    getDefaultProps: function () {
        return {
            stationName: "",
            configs: {},
            mqttClient: null
        };
    },
    render: function () {
        return (
            <div classNmae="weui_panel">
                <div classNmae="weui_panel_hd">监控设置</div>
                <div classNmae="weui_panel_bd">
                    <div class="weui_cells_title">表单报错</div>
                    <div class="weui_cells weui_cells_form">
                        <div class="weui_cell">
                            <div class="weui_cell_hd"><label for="" class="weui_label">日期</label></div>
                            <div class="weui_cell_bd weui_cell_primary">
                                <input class="weui_input" type="date" value=""/>
                            </div>
                        </div>
                        <div class="weui_cell">
                            <div class="weui_cell_hd"><label for="" class="weui_label">时间</label></div>
                            <div class="weui_cell_bd weui_cell_primary">
                                <input class="weui_input" type="datetime-local" value="" placeholder=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = RTDataConfigPanel;