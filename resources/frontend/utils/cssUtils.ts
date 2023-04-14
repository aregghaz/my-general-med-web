export const selectStyles:any = {

    control: (baseStyles: any, state: any) => ({
        ...baseStyles,
        display: "flex",
        borderBottom: "1px solid #D63D3D",
        width: "100%",
        outline: "none",
        border: "none",
        boxShadow: "none !important",
        borderRadius: 0,
        overflowX: "auto",
        cursor: "pointer",
        "&:hover": {
            boxShadow: "none",
            // borderBottom: "1px solid #194b76",
        }
    }),
    valueContainer: (baseStyles: any, state: any) => ({
        ...baseStyles,
        display: "flex",
        flexDirection: "row"
    }),
    // indicatorsContainer: base => ({
    //     ...base,
    //     color: "aqua",
    // }),
    menu: (baseStyles: any, state: any) => ({
        ...baseStyles,
        backgroundColor: "white",
        marginTop: "3px",
        zIndex: 9999,
        right: "0",
        outline: "none",
        display: "inline-block",
        width: 'auto',
        boxShadow: "0px 3px 3px gray"
    }),
    option: (baseStyles: any, state: any) => ({
        ...baseStyles,
        display: "inline-block",
        width: 'auto',
        padding: "15px",
        fontWeight: 500,
        backgroundColor: state.isSelected ? "#D63D3D" : baseStyles.backgroundColor
    }),
    menuList: (base: any) => ({
        ...base,
        // kill the white space on first and last option
        padding: "0px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white"
        /// borderRadius: "5px",
    }),
    multiValue: (baseStyles: any, state: any) => ({
        ...baseStyles,
        fontSize: 20,
        // borderRadius: "15px",
        // lineHeight: 1.5,
        // color: "black",
        color: "gray",
        fontWeight: "bold",
        borderButton: "1px solid #D63D3D",
        backgroundColor: "white"
    }),
    multiValueLabel: (baseStyles: any, {data}: any) => ({
        ...baseStyles,
        // backgroundColor: '#6D9886',
        backgroundColor: "white",
        color: data.color
    }),
    placeholder: (base: any) => ({
        ...base,
        color: "#757575",
    }),
    singleValue: (base: any) => ({
        ...base,
        color: "gray",
    })
}

export const selectStylesFunction = (styles?:any,error?:string) => ( {
    control: (baseStyles: any, state: any) => ({
        ...baseStyles,
        display: "flex",
        borderBottom: "1px solid #D63D3D",
        width: "100%",
        outline: "none",
        border: "none",
        boxShadow: "none !important",
        borderRadius: 0,
        overflowX: "auto",
        cursor: "pointer",
        "&:hover": {
            boxShadow: "none",
            // borderBottom: "1px solid #194b76",
        }
    }),
    valueContainer: (baseStyles: any, state: any) => ({
        ...baseStyles,
        display: "flex",
        flexDirection: "row"
    }),
    // indicatorsContainer: base => ({
    //     ...base,
    //     color: "aqua",
    // }),
    menu: (baseStyles: any, state: any) => ({
        ...baseStyles,
        backgroundColor: "white",
        marginTop: "3px",
        zIndex: 9999,
        right: "0",
        outline: "none",
        display: "inline-block",
        width: 'auto',
        boxShadow: "0px 3px 3px gray",
        ...styles.menu,
    }),
    option: (baseStyles: any, state: any) => ({
        ...baseStyles,
        display: "inline-block",
        width: 'auto',
        padding: "15px",
        fontWeight: 500,
        backgroundColor: state.isSelected ? "#D63D3D" : baseStyles.backgroundColor,
        ...styles.option,
    }),
    menuList: (base: any) => ({
        ...base,
        // kill the white space on first and last option
        padding: "0px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white"
        /// borderRadius: "5px",
    }),
    multiValue: (baseStyles: any, state: any) => ({
        ...baseStyles,
        fontSize: 20,
        // borderRadius: "15px",
        // lineHeight: 1.5,
        // color: "black",
        color: "gray",
        fontWeight: "bold",
        borderButton: "1px solid #D63D3D",
        backgroundColor: "white"
    }),
    multiValueLabel: (baseStyles: any, {data}: any) => ({
        ...baseStyles,
        // backgroundColor: '#6D9886',
        backgroundColor: "white",
        color: data.color
    }),
    placeholder: (base: any) => ({
        ...base,
        color: error ? "crimson" : "#757575",
    }),
    singleValue: (base: any) => ({
        ...base,
        color: "gray",
    })
})

