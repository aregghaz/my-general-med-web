const customStyles: ReactModal.Styles = {
    content: {
        position: "fixed",
        border: "none",
        overflowY: "unset",
        outline: "none",
        top: "50%",
        left: "50%",
        overflow: "hidden",
        transform: "translate(-50% , -50%)",

        /// display: 'flex',
        justifyContent: "center",
        ///  alignItems: "center",
        width: "700px",
        height: "500px",
        // backgroundColor: "#194b76",
    },
    overlay: {
        zIndex: 99999,
        overflow: "hidden",
        // background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",

    }
};

export default customStyles;
