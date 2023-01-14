import React, {CSSProperties} from 'react'
import {Props, Styles} from 'react-select'
import {themesType} from '../../types/home-types'

const customStyles: Styles = {
    option: (provided: CSSProperties) => ({
        ...provided,
        backgroundColor: '#1F1F20',
        color: '#FFFFFF',
        cursor: 'pointer',
        outline: 'none',
        padding: '0',
        '&:hover': {
            backgroundColor: '#1F1F20'
        }
    }),
    menu: (provided: CSSProperties) => ({
        ...provided,
        zIndex: 600,
        fontFamily: 'ArTarumianKamar-Regular',
        fontSize: '16px',
        borderTop: 'none',
        borderRadius: '0',
        marginTop: '5px',
        cursor: 'pointer',
        backgroundColor: '#1F1F20',
        padding: '20px',
        outline: 'none'
    }),
    menuList: (provided: CSSProperties) => ({
        ...provided,
        maxHeight: '220px'
    }),
    container: (provided: CSSProperties) => ({
        ...provided,
        width: '100%',
        cursor: 'pointer',
        outline: 'none'
    }),
    placeholder: (provided: CSSProperties) => ({
        ...provided,
        fontFamily: 'ArTarumianKamar-Regular',
        color: '#C4C4C4',
        outline: 'none'
    }),
    dropdownIndicator: (provided: CSSProperties, state: Props) => ({
        ...provided,
        color: '#535353',
        transition: 'all .2s ease',
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
        outline: 'none'
    }),
    control: (provided: CSSProperties) => ({
        ...provided,
        backgroundColor: '#242526',
        textAlign: 'center',
        borderRadius: '0',
        color: '#000000',
        border: 'none',
        boxShadow: 'none',
        cursor: 'pointer',
        fontFamily: 'ArTarumianKamar-Regular',
        outline: 'none',
        // This line disables the blue border
        '&:hover': {
            border: '1px solid #535353'
        }
    }),
    singleValue: (provided: CSSProperties, state: Props) => ({
        ...provided,
        opacity: state.isDisabled ? 0.5 : 1,
        transition: 'opacity 300ms',
        fontFamily: 'ArTarumianKamar-Regular',
        color: '#FFFFFF',
        outline: 'none'
    })
}
export const getStyles = (divider: themesType) => {
    if (divider === 'dark') {
        return customStyles
    } else {
        return {
            ...customStyles,
            control: (provided: CSSProperties) => ({
                ...provided,
                backgroundColor: '#FFFFFF',
                boxShadow: 'none',
                borderRadius: 0,
                '&:hover': {
                    border: '1px solid #BDBFC1'
                }
            }),
            menu: (provided: CSSProperties) => ({
                ...provided,
                border: '1px solid #BDBFC1',
                padding: '20px'
            }),
            menuList: (provided: CSSProperties) => ({
                ...provided,
                maxHeight: '220px'
            }),
            option: (provided: CSSProperties) => ({
                ...provided,
                color: '#757575',
                backgroundColor: '#FFFFFF',
                padding: '0',
                '&:hover': {
                    backgroundColor: '#FFFFFF'
                }
            }),
            singleValue: (provided: CSSProperties) => ({
                ...provided,
                color: '#4D4D4D'
            })
        }
    }
}
