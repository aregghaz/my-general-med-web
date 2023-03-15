import { __assign, __extends, __rest } from "tslib";
import React from "react";
import PropTypes from "prop-types";

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

var ListTabs = function(_a) {
    var children = _a.children,
        _b = _a.className,
        className = _b === void 0 ? null : _b,
        _c = _a.style,
        style = _c === void 0 ? {} : _c;
    return React.createElement(
        "ul",
        {
            style: __assign({ paddingLeft: 0, listStyle: "none", margin: 0 }, style),
            className: className
        },
        children
    );
};
var TabTitleItem = function(_a) {
    var children = _a.children,
        innerRef = _a.innerRef,
        restProps = __rest(_a, ["children", "innerRef"]);
    return React.createElement(
        "li",
        __assign(
            {
                ref: innerRef,
                style: {
                    display: "inline-block",
                    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
                }
            },
            restProps
        ),
        children
    );
};
var ActiveTabBorder = function(_a) {
    var activeTabElement = _a.activeTabElement,
        restProps = __rest(_a, ["activeTabElement"]);
    var style = {
        height: "4px",
        backgroundColor: "#0088dd",
        position: "absolute",
        bottom: "0",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        willChange: "left, width"
    };
    if (activeTabElement) {
        style.width = activeTabElement.offsetWidth;
        style.left = activeTabElement.offsetLeft;
    }
    return React.createElement("div", __assign({ style: style }, restProps));
};
var TabAnchorItem = function(_a) {
    var isActiveTab = _a.isActiveTab,
        children = _a.children,
        tabIndex = _a.tabIndex,
        restProps = __rest(_a, ["isActiveTab", "children", "tabIndex"]);
    var style = {
        textTransform: "capitalize",
        color: "#000000",
        fontWeight: 600,
        padding: "16px 30px",
        cursor: "pointer",
        opacity: "0.4",
        display: "block",
        textDecoration: "none",
        backgroundColor: "transparent",
        outline: "none",
        border: 0,
        ":hover": {
            opacity: 1
        }
    };
    if (isActiveTab) {
        style.transition = "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms";
        style.cursor = "default";
        style.opacity = 1;
    }
    return React.createElement(
        "button",
        __assign({ style: style, tabIndex: tabIndex }, restProps),
        children
    );
};
var TabsContainer = function(_a) {
    var children = _a.children,
        restProps = __rest(_a, ["children"]);
    return React.createElement(
        "div",
        __assign(
            {
                style: {
                    position: "relative",
                    borderBottom: "1px solid #dfdfdf"
                }
            },
            restProps
        ),
        children
    );
};
var ReactTabs = function(_a) {
    var children = _a.children,
        restProps = __rest(_a, ["children"]);
    return React.createElement(
        "div",
        __assign({ style: { position: "relative" } }, restProps),
        children
    );
};
var Tabs = /** @class */ (function(_super) {
    __extends(Tabs, _super);

    function Tabs() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.state = {
            tabsElements: []
        };
        return _this;
    }

    Tabs.prototype.updateDimensions = function() {
        this.setState(__assign({}, this.state));
    };
    Tabs.prototype.componentDidMount = function() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    };
    Tabs.prototype.componentWillUnmount = function() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    };
    Tabs.prototype.render = function() {
        var _this = this;
        var tabsProps = this.props.tabsProps || {};
        return React.createElement(
            TabProvider,
            { activeTab: this.props.activeTab },
            React.createElement(TabConsumer, null, function(value) {
                return React.createElement(
                    ReactTabs,
                    null,
                    React.createElement(
                        TabsContainer,
                        null,
                        React.createElement(
                            ListTabs,
                            { className: tabsProps.className, style: tabsProps.style },
                            value.context.tabs.map(function(tab, index) {
                                return React.createElement(
                                    TabTitleItem,
                                    {
                                        key: index,
                                        id: tab.id,
                                        innerRef: function(tabElement) {
                                            if (!_this.state.tabsElements[tab.id]) {
                                                _this.setState(function(prevState, props) {
                                                    var tabsElements = prevState.tabsElements;
                                                    tabsElements[tab.id] = tabElement;
                                                    return {
                                                        tabsElements: tabsElements
                                                    };
                                                });
                                            }
                                        }
                                    },
                                    React.createElement(
                                        TabAnchorItem,
                                        {
                                            isActiveTab: value.context.activeTab.id === tab.id,
                                            onClick: value.context.onClick(tab),
                                            tabIndex: tab.tabIndex || index,
                                            onKeyPress: function(event) {
                                                var code = event.keyCode || event.which;
                                                if (code === 13) {
                                                    value.context.onClick(tab)(event);
                                                }
                                            }
                                        },
                                        tab.title
                                    )
                                );
                            })
                        ),
                        React.createElement(ActiveTabBorder, {
                            activeTabElement: _this.state.tabsElements[value.context.activeTab.id]
                        })
                    ),
                    _this.props.children
                );
            })
        );
    };
    Tabs.Tab = Tab;
    return Tabs;
})(React.Component);

export { Tab, TabConsumer, TabProvider, Tabs, TabsContext };
//# sourceMappingURL=tabs.js.map
