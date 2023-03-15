import React from "react";

declare const TabsContext: React.Context<{
    context: {
        prevActiveTab: {};
        activeTab: {
            id: any;
        };
        tabs: any[];
        addTab: (tab: any) => void;
        removeTab: (tab: any) => void;
        onClick: (tab: any) => (event: any) => void;
    };
}>;

declare class TabProvider extends React.Component {
    props: {
        activeTab: any;
        children: any;
    };
    state: {
        tabs: any[];
        prevActiveTab: {};
        activeTab: any;
    };
    addTab: (tab: any) => void;
    removeTab: (tabId: string) => void;
    onClick: (tab: any) => (event: any) => void;

    render(): JSX.Element;
}

declare const TabConsumer: React.Consumer<{
    context: {
        prevActiveTab: {};
        activeTab: {
            id: any;
        };
        tabs: any[];
        addTab: (tab: any) => void;
        removeTab: (tab: any) => void;
        onClick: (tab: any) => (event: any) => void;
    };
}>;
export { TabProvider, TabsContext, TabConsumer };
