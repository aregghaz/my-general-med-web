import React from "react";

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
export { TabProvider, TabsContext, TabConsumer };
//# sourceMappingURL=TabsContext.js.map
