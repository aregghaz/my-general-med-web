import React from "react";
import PropTypes from "prop-types";
import { __rest } from "tslib";

const TabsContext = React.createContext({
    context: {
        prevActiveTab: {},
        activeTab: { id: null },
        tabs: [],
        addTab: (tab) => {
        },
        removeTab: (tab) => {
        },
        onClick: (tab) => (event) => {
        }
    }
});

class TabProvider extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            tabs: [],
            prevActiveTab: {},
            activeTab: this.props.activeTab
        };
        this.addTab = (tab) => {
            const isTabExist = this.state.tabs.find((t) => tab.id === t.id);
            if (!isTabExist) {
                this.setState((prevState, props) => {
                    return {
                        tabs: prevState.tabs.concat(tab)
                    };
                });
            }
        };
        this.removeTab = (tabId) => {
            this.setState((prevState, props) => {
                return {
                    tabs: prevState.tabs.filter((tab) => tab.id !== tabId)
                };
            });
        };
        this.onClick = (tab) => (event) => {
            this.setState((prevState, props) => {
                return {
                    prevActiveTab: prevState.activeTab,
                    activeTab: tab
                };
            });
        };
    }

    render() {
        return React.createElement(
            TabsContext.Provider,
            {
                value: {
                    context: Object.assign(Object.assign({}, this.state), {
                        addTab: this.addTab,
                        removeTab: this.removeTab,
                        onClick: this.onClick
                    })
                }
            },
            this.props.children
        );
    }
}

const TabConsumer = TabsContext.Consumer;

class Tab extends React.Component {
    componentDidMount() {
        this.context.context.addTab({
            id: this.props.id,
            title: this.props.title,
            tabIndex: this.props.tabIndex
        });
    }

    render() {
        const {
            context: {
                activeTab: { id: activeTabId }
            }
        } = this.context;
        const { children, id: tabId } = this.props;
        return activeTabId === tabId && children;
    }
}

Tab.contextType = TabsContext;
Tab.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tabIndex: PropTypes.oneOf([PropTypes.string, PropTypes.number])
};

const ListTabs = ({ children, className = null, style = {} }) =>
    React.createElement(
        "ul",
        {
            style: Object.assign({ paddingLeft: 0, listStyle: "none", margin: 0 }, style),
            className: className
        },
        children
    );
const TabTitleItem = (_a) => {
    var { children, innerRef } = _a,
        restProps = __rest(_a, ["children", "innerRef"]);
    return React.createElement(
        "li",
        Object.assign(
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
const ActiveTabBorder = (_a) => {
    var { activeTabElement } = _a,
        restProps = __rest(_a, ["activeTabElement"]);
    const style = {
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
    return React.createElement("div", Object.assign({ style: style }, restProps));
};
const TabAnchorItem = (_a) => {
    var { isActiveTab, children, tabIndex } = _a,
        restProps = __rest(_a, ["isActiveTab", "children", "tabIndex"]);
    const style = {
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
        Object.assign({ style: style, tabIndex: tabIndex }, restProps),
        children
    );
};
const TabsContainer = (_a) => {
    var { children } = _a,
        restProps = __rest(_a, ["children"]);
    return React.createElement(
        "div",
        Object.assign(
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
const ReactTabs = (_a) => {
    var { children } = _a,
        restProps = __rest(_a, ["children"]);
    return React.createElement(
        "div",
        Object.assign({ style: { position: "relative" } }, restProps),
        children
    );
};

class Tabs extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            tabsElements: []
        };
    }

    updateDimensions() {
        this.setState(Object.assign({}, this.state));
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        const tabsProps = this.props.tabsProps || {};
        return React.createElement(
            TabProvider,
            { activeTab: this.props.activeTab },
            React.createElement(TabConsumer, null, (value) =>
                React.createElement(
                    ReactTabs,
                    null,
                    React.createElement(
                        TabsContainer,
                        null,
                        React.createElement(
                            ListTabs,
                            { className: tabsProps.className, style: tabsProps.style },
                            value.context.tabs.map((tab, index) =>
                                React.createElement(
                                    TabTitleItem,
                                    {
                                        key: index,
                                        id: tab.id,
                                        innerRef: (tabElement) => {
                                            if (!this.state.tabsElements[tab.id]) {
                                                this.setState((prevState, props) => {
                                                    const tabsElements = prevState.tabsElements;
                                                    tabsElements[tab.id] = tabElement;
                                                    return {
                                                        tabsElements
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
                                            onKeyPress: (event) => {
                                                const code = event.keyCode || event.which;
                                                if (code === 13) {
                                                    value.context.onClick(tab)(event);
                                                }
                                            }
                                        },
                                        tab.title
                                    )
                                )
                            )
                        ),
                        React.createElement(ActiveTabBorder, {
                            activeTabElement: this.state.tabsElements[value.context.activeTab.id]
                        })
                    ),
                    this.props.children
                )
            )
        );
    }
}

Tabs.Tab = Tab;

export { Tab, TabConsumer, TabProvider, Tabs, TabsContext };
//# sourceMappingURL=tabs.js.map
