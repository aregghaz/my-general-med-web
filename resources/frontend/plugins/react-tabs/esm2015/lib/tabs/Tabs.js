import { __rest } from "tslib";
import React from "react";
import { TabConsumer, TabProvider } from "./TabsContext";
import TabItem from "./Tab";

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

Tabs.Tab = TabItem;
export default Tabs;
//# sourceMappingURL=Tabs.js.map
