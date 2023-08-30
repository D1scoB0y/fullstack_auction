import { useState } from 'react'

import styles from './NewLotForm.module.css'

import useInput from '@/hooks/useInput'

import HiddenErrorMessage from '@/components/UI/Form/HiddenErrorMessage/HiddenErrorMessage'
import Input from '@/components/UI/Form/Input/Input'
import ErrorMessage from '@/components/UI/Form/ErrorMessage/ErrorMessage'
import TextArea from '@/components/UI/Form/TextArea/TextArea'
import Button from '@/components/UI/Button/Button'
import useFormValid from '@/hooks/useFormValid'
import DatePicker from '@/components/UI/Form/DatePicker/DatePicker'


const NewLotForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const title = useInput('', {required: true, minLength: 5})
    const basePrice = useInput('', {required: true, onlyNumbers: true})
    const reservePrice = useInput('', {required: true, onlyNumbers: true})
    const description = useInput('', {})

    const isValid = useFormValid(
        '',
        title,
        basePrice,
        reservePrice,
        description,
    )

    return (
        <form className={styles.newLotForm} onSubmit={() => {}} noValidate>

            <HiddenErrorMessage errorText={title.error}/>
            
            <Input
                value={title.value}
                onChange={title.onChange}
                maxLength={70}
                placeholder='Название'
            />


            <ErrorMessage errorText={basePrice.error}/>
            
            <Input
                value={basePrice.value}
                onChange={basePrice.onChange}
                placeholder='Начальная цена'
                type='number'
            />


            <ErrorMessage errorText={reservePrice.error}/>
            
            <Input
                value={reservePrice.value}
                onChange={reservePrice.onChange}
                placeholder='Резервная цена'
                type='number'
            />


            <ErrorMessage errorText={description.error}/>
            
            <TextArea
                value={description.value}
                onChange={description.onChange}
                maxLength={500}
                placeholder='Описание'
            />

            <DatePicker />

            <Button
                text='Создать'
                disabled={!isValid}
                isLoading={isLoading}
                style={{marginTop: 24, width: 300}}
            />

        </form>
    )
}

export default NewLotForm