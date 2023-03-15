import { __extends } from "tslib";
import React from "react";
import PropTypes from "prop-types";
import { TabsContext } from "./TabsContext";

var Tab = /** @class */ (function(_super) {
    __extends(Tab, _super);

    function Tab() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }

    Tab.prototype.componentDidMount = function() {
        this.context.context.addTab({
            id: this.props.id,
            title: this.props.title,
            tabIndex: this.props.tabIndex
        });
    };
    Tab.prototype.render = function() {
        var activeTabId = this.context.context.activeTab.id;
        var _a = this.props,
            children = _a.children,
            tabId = _a.id;
        return activeTabId === tabId && children;
    };
    return Tab;
})(React.Component);
Tab.contextType = TabsContext;
Tab.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tabIndex: PropTypes.oneOf([PropTypes.string, PropTypes.number])
};
export default Tab;
//# sourceMappingURL=Tab.js.map
