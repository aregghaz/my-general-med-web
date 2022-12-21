import React, {useEffect, useState} from 'react'
import {AdminApi} from '../../../api/admin-api/admin-api'
import List from '../../layouts/templates/list/list'
import {useNavigate} from '@reach/router'
import Button from "../../../components/button/button";
import s from "../../layouts/templates/list/list.module.scss";
import Select, {IOption, IOptionMultiselect} from '../../../components/select/select'
import {useTranslation} from 'react-i18next'
import Modal from 'react-modal'
import numberFormatting from '../../../constants/utils';
import BackDropSearch from '../../../components/backdrop-search/backdrop-search';
import {useDispatch} from "react-redux";
import {actions} from "../../../store/home";

interface IVendors {
    path: string
}

const Vendors: React.FC<IVendors> = () => {
    const dispatch = useDispatch();
    const crudKey = 'vendors'
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [countPages, setCountPages] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [count, setCount] = useState({from: 0, to: 10})
    const [activeItem, setActiveItem] = useState(null)


    const navigate = useNavigate()
    const {t} = useTranslation()
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.getAllVendorData(crudKey, 1, '')
                data.to
                setCount({from: data.to - 3, to: data.to + 5})
                setData(data.vendors)


            }
        )()
        dispatch(actions.setTitles(titles))
        dispatch(actions.clearData())
    }, [])


    const titles: Array<string> = [
        'id',
        'name',
        'address',
        'phone_number',
        'status',
        'action',
    ]
    const handlerAddBeneficiaryItem = () => navigate(`/admin/${crudKey}/create`)


    const handlerCloseModal = () => {
        setIsModalOpen(false)
    }
    const handlerDeleteModal = (id: number) => {
        setDeleteId(id)
        setIsModalOpen(true)
    }


    const handlerDeleteItem = () => {

        AdminApi.delete(crudKey, deleteId).then(data => {
            setData(data.data.beneficiaries)
            setIsModalOpen(false)
        })
    }
    const handlerEditBeneficiaryItem = (id: number) => navigate(`/admin/${crudKey}/${id}`)
    const HandlerGetProducts = (id: number) => navigate(`/admin/users-products/${id}`)

    const HandlerPagination = async (activeItem: number) => {
        const query = localStorage.getItem('query')
        const homeData = await AdminApi.getAllData(crudKey, activeItem + 1, query ? query : '')
        setCount({from: homeData.current_page, to: homeData.current_page + 5})
        setData(homeData.data)
        const role = localStorage.getItem('role');
        localStorage.setItem('page', activeItem.toString());

    }

    const customStyles: ReactModal.Styles = {
        content: {
            position: 'fixed',
            border: 'none',
            overflowY: 'unset',
            outline: 'none',
            top: '50%',
            left: '50%',
            transform: 'translate(-50% , -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '290px'
        },
        overlay: {
            zIndex: 400,
            background: 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(5px)'
        }
    }


    return (
        data &&
        <>
            <List
                data={data}
                titles={titles}
                isDelete
                isEdit
                isCreate
                isGetItems
                handlerAddItem={handlerAddBeneficiaryItem}
                handlerDeleteItem={handlerDeleteModal}
                handlerEditItem={handlerEditBeneficiaryItem}
                HandlerPagination={HandlerPagination}
                HandlerGetProducts={HandlerGetProducts}
                count={count}
                paginated={true}
                activeItem={activeItem}
                className={'pagination'}
            />
            <Modal
                isOpen={isModalOpen !== false}
                style={customStyles}
                onRequestClose={handlerCloseModal}
            >
                <div className={s.modalBody}>
                    <div className={s.iconWrapper}>
                        <i className='cancelicon-'
                           onClick={handlerCloseModal}
                        />
                    </div>

                    <i className={`binicon- ${s.icon}`}/>
                    <p className={s.text}>{t('do_you_want_to_delete')}</p>
                    <div className={s.buttons}>
                        <Button type={'green'} onClick={handlerDeleteItem}
                                className={s.button}>{t('yes')}</Button>
                        <Button type={'transparent'} onClick={handlerCloseModal} className={s.button}>{t('no')}</Button>
                    </div>
                </div>
            </Modal>

        </>
    )
}


export default Vendors
