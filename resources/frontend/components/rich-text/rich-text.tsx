import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { EventHandler } from "@tinymce/tinymce-react/lib/cjs/main/ts/Events";


interface IRichText {
    handleEditorChange: EventHandler<any>;
    menubar?: boolean;
    initialValue: string;
    height?: number;
    plugins?: Array<string>;
    toolbar?: string;
}

const RichText: React.FC<IRichText> = (
    {
        handleEditorChange,
        menubar = true,
        initialValue,
        height = 500,
        plugins = [""],
        toolbar = ""
    }
) => {

    return (
        <Editor
            initialValue={initialValue}
            init={{
                height: height,
                menubar: menubar,
                plugins: plugins,
                toolbar: toolbar
            }}
            onEditorChange={handleEditorChange}
        />
    );
};

export default RichText;
