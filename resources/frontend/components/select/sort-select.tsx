import React, {MouseEventHandler, useState} from 'react'
import useLocalStorage from '../../hooks/use-local-storage'
import Checkbox from '../checkbox/checkbox'
import Select, {
    components,
    MenuProps,
    OptionProps,
    OptionTypeBase,
    MultiValueProps,
} from 'react-select'
import {
    SortableContainer,
    SortableContainerProps,
    SortableElement,
    SortEndHandler,
    SortableHandle,
} from 'react-sortable-hoc';
import {useTranslation} from 'react-i18next'
import s from './select.module.scss'

export interface IOption {
    id: number
    value: string
    label: string
    slug?: string
}

interface IMenu {
    props: MenuProps<OptionTypeBase>
    handlerAdd: () => void
}

interface ISelect {
    isCheckbox?: boolean
    isSearchable?: boolean
    placeholder?: string
    options?: IOption[]
    onChange: (option: IOption | Array<IOption>) => void
    getOptionLabel: (option: IOption) => string
    getOptionValue: (option: IOption) => string
    value?: IOption[]
    name?: string
    label?: string
    isMulti?: boolean
    authCheckboxLabelStyle?: string
    labelStyle?: string
    handlerMenuOpen?: () => void
    handlerMenuClose?: () => void
    hideSelectedOptions?: boolean
    isMenuAdd?: boolean,
    handlerAdd?: () => void
    onChangePosition?: (arr: any) => any
}

interface ISortOption {
    value: string;
    label: string;
    color: string;
    isFixed?: boolean;
    isDisabled?: boolean;
}

const Option = (props: OptionProps<OptionTypeBase>) => (
    <components.Option {...props}>
        <Checkbox
            label={props.label}
            checked={props.isSelected}
            labelStyle={props.selectProps.authCheckboxLabelStyle}
        />
    </components.Option>
)

const Menu: React.FC<IMenu> = ({props, handlerAdd}) => {
    const {t} = useTranslation()
    return (
        <components.Menu {...props} >
            <>
                <ul className={s.customMenuList}>
                    {
                        props.options
                            .map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => props.selectOption(item)}
                                    >
                                        {item.value}
                                    </li>
                                )
                            )
                    }
                </ul>
                <div className={s.addBtn} onClick={handlerAdd}>
                    {t('add_new_type')} +
                </div>
            </>
        </components.Menu>
    )
}

function arrayMove<T>(array: T[], from: number, to: number) {
    const slicedArray = array.slice();
    slicedArray.splice(
        to < 0 ? array.length + to : to,
        0,
        slicedArray.splice(from, 1)[0]
    );
    return slicedArray;
}

const SortableMultiValue = SortableElement((props: MultiValueProps<ISortOption>) => {
        const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        const innerProps = {...props.innerProps, onMouseDown};
        return <components.MultiValue {...props} innerProps={innerProps}/>;
    }
);

const SortableMultiValueLabel = SortableHandle(
    (props: any) => <components.MultiValueLabel {...props} />
);

const SortableSelect: any = SortableContainer(Select)


const MultiSelectSort: React.FC<ISelect> = (
    {
        isCheckbox = false,
        isSearchable = false,
        placeholder = '',
        options,
        onChange,
        getOptionLabel,
        getOptionValue,
        value,
        name,
        label,
        isMulti = false,
        authCheckboxLabelStyle,
        labelStyle,
        handlerMenuClose,
        handlerMenuOpen,
        hideSelectedOptions = false,
        isMenuAdd = false,
        handlerAdd,
        onChangePosition
    }
) => {

    const [selected, setSelected] = useState(value);
    const onHandleChange = (selectedOptions: any) => setSelected(selectedOptions)

    const onSortEnd: SortEndHandler = ({oldIndex, newIndex}) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);
        onChangePosition(newValue)
    };
    const [themeType] = useLocalStorage('theme', 'light')


    return (
        <>
            <label className={`${s.label} ${labelStyle} `} htmlFor={name}>{label}</label>
            <SortableSelect
                isMulti={isMulti}
                className={s.select}
                placeholder={placeholder}
                name={name}
                isSearchable={isSearchable}
                useDragHandle
                axis="xy"
                onSortEnd={onSortEnd}
                distance={4}
                getHelperDimensions={({node}: any) => node.getBoundingClientRect()}
                options={options}
                // value={selected.length > 0 ? selected : value}
                value={selected}
                // value={value}
                onChange={(e: any) => {
                    onChange(e)
                    onHandleChange(e)
                }}
                components={
                    isCheckbox
                        ? {
                            Option,
                            IndicatorSeparator: (): null => null,
                            MultiValue: SortableMultiValue,
                            MultiValueLabel: SortableMultiValueLabel,
                        }
                        : isMenuAdd
                            ? {
                                Menu: (props: any) => <Menu props={props} handlerAdd={handlerAdd}/>,
                                IndicatorSeparator: (): null => null,
                                MultiValue: SortableMultiValue,
                                MultiValueLabel: SortableMultiValueLabel,
                            }
                            : {
                                IndicatorSeparator: (): null => null,
                                MultiValue: SortableMultiValue,
                                MultiValueLabel: SortableMultiValueLabel,
                            }
                }
                authCheckboxLabelStyle={authCheckboxLabelStyle}
                getOptionValue={getOptionValue}
                closeMenuOnSelect={false}
                getOptionLabel={getOptionLabel}
                onMenuOpen={handlerMenuOpen}
                onMenuClose={handlerMenuClose}
                hideSelectedOptions={hideSelectedOptions}
                styles={{
                    control: (baseStyles: any, state: any) => ({
                        ...baseStyles,
                       // borderColor: state.isFocused ? '#545cd8' : '#545cd8',
                       /// backgroundColor: '#545cd8',
                        borderRadius: "15px",
                        color: "#707980",
                    }),
                    menu: (base: any) => ({
                        ...base,
                        borderRadius: 15,
                        backgroundColor: 'white',
                        marginTop: 0,
                        color: "#707980",
                    }),
                    menuList: (base: any) => ({
                        ...base,
                        // kill the white space on first and last option
                        padding: 0,
                        color: "#707980",
                        backgroundColor: 'white',
                    }),
                    multiValue: (baseStyles: any, state: any) => ({
                        ...baseStyles,
                        height: 30,
                        fontSize: 20,
                        lineHeight: 1.5,
                        color: "#707980",
                        fontWeight: "bold",
                        backgroundColor: 'white',
                    }),
                    multiValueLabel: (styles: any, {data}: any) => ({
                        ...styles,
                        backgroundColor: 'white',
                        color: data.color,
                    }),
                }}
            />
        </>
    )
}

export default MultiSelectSort
