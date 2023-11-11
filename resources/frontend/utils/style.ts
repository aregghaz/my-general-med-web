const customStyles: ReactModal.Styles = {
    content: {
        position: "fixed",
        border: "none",
        overflowY: "unset",
        outline: "none",
        top: "50%",
        left: "50%",
        overflow: "visible",
        transform: "translate(-50% , -50%)",
        padding: 0,
        /// display: 'flex',
        justifyContent: "center",
        ///  alignItems: "center",
        width: "500px",
        height: "200px",
        // backgroundColor: "#194b76",
    },
    overlay: {
        zIndex: 1111111111,
        overflow: "hidden",
        // background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",

    }
};

export default customStyles;
