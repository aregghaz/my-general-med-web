import React, { CSSProperties } from "react";
import TabItem, { TabInputs } from "./Tab";

declare class Tabs extends React.Component {
    static Tab: typeof TabItem;
    props: {
        activeTab: TabInputs;
        children: React.ReactDOM;
        tabsProps?: {
            style?: CSSProperties;
            className?: string;
        };
    };
    state: {
        tabsElements: any[];
    };

    updateDimensions(): void;

    componentDidMount(): void;

    componentWillUnmount(): void;

    render(): JSX.Element;
}

export default Tabs;
