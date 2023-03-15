import { __assign, __extends } from "tslib";
import React from "react";

var TabsContext = React.createContext({
    context: {
        prevActiveTab: {},
        activeTab: { id: null },
        tabs: [],
        addTab: function(tab) {
        },
        removeTab: function(tab) {
        },
        onClick: function(tab) {
            return function(event) {
            };
        }
    }
});
var TabProvider = /** @class */ (function(_super) {
    __extends(TabProvider, _super);

    function TabProvider() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.state = {
            tabs: [],
            prevActiveTab: {},
            activeTab: _this.props.activeTab
        };
        _this.addTab = function(tab) {
            var isTabExist = _this.state.tabs.find(function(t) {
                return tab.id === t.id;
            });
            if (!isTabExist) {
                _this.setState(function(prevState, props) {
                    return {
                        tabs: prevState.tabs.concat(tab)
                    };
                });
            }
        };
        _this.removeTab = function(tabId) {
            _this.setState(function(prevState, props) {
                return {
                    tabs: prevState.tabs.filter(function(tab) {
                        return tab.id !== tabId;
                    })
                };
            });
        };
        _this.onClick = function(tab) {
            return function(event) {
                _this.setState(function(prevState, props) {
                    return {
                        prevActiveTab: prevState.activeTab,
                        activeTab: tab
                    };
                });
            };
        };
        return _this;
    }

    TabProvider.prototype.render = function() {
        return React.createElement(
            TabsContext.Provider,
            {
                value: {
                    context: __assign(__assign({}, this.state), {
                        addTab: this.addTab,
                        removeTab: this.removeTab,
                        onClick: this.onClick
                    })
                }
            },
            this.props.children
        );
    };
    return TabProvider;
})(React.Component);
var TabConsumer = TabsContext.Consumer;
export { TabProvider, TabsContext, TabConsumer };
//# sourceMappingURL=TabsContext.js.map
