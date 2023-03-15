import React from "react";

export interface TabInputs {
    id: string;
    title: string;
    tabIndex?: string | number;
}

declare class Tab extends React.Component {
    static propTypes: {
        id: React.Validator<string>;
        title: React.Validator<string>;
        tabIndex?: React.Requireable<React.Requireable<string> | React.Requireable<number>>;
    };
    props: TabInputs & {
        children: React.ReactNode;
    };

    componentDidMount(): void;

    render(): React.ReactNode;
}

export default Tab;
