import { FC, useState } from "react"
import Form from "../../../../UI/Form/Form"
import DateInput from "../DateInput/DateInput"
import Input from "../../../../UI/Input/Input"
import Button from "../../../../UI/Button/Button"
import ErrorBox from "../../../../UI/ErrorBox/ErrorBox"
import validateTitle from "../../validators/titleValidator"
import validateEndDate from "../../validators/EndDateValidator"
import TextArea from "../../../../UI/TextArea/TextArea"
import { useEffect } from "react"
import { useUserContext } from "../../../../context/UserContext"
import { useNavigate } from "react-router-dom"
import createLot from "../../api/createLot"
import { useSnackbarContext } from "../../../../context/SnackbarContext"


interface FormData {
    title: string
    basePrice: string
    description: string
    endDate: string
}

interface DirtyFields {
    title: boolean
    basePrice: boolean
    endDate: boolean
}

interface Errors {
    title: string
    basePrice: string
    endDate: string
    afterSubmitError: string
}

const initialFormData = {
    title: '',
    basePrice: '',
    description: '',
    endDate: '',
}

const initialDirtyFields = {
    title: false,
    basePrice: false,
    endDate: false,
}

const initialErrors = {
    title: 'Введите название',
    basePrice: '',
    endDate: 'Веберите дату окончания',
    afterSubmitError: '',
}

const LotInfoForm: FC<{ files: File[] }> = ({
    files,
}) => {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [dirtyFields, setDirtyFields] = useState<DirtyFields>(initialDirtyFields)
    const [errors, setErrors] = useState<Errors>(initialErrors)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isValid, setIsValid] = useState<boolean>(false)

    const navigate = useNavigate()

    const {
        token,
    } = useUserContext()

    const {
        showSnackbar,
    } = useSnackbarContext()

    useEffect(() => {
        if (!files.length) {
            setIsValid(false)
            return
        }
        for (const errorIndex in errors) {
            if (errors[errorIndex as keyof object]) {
                setIsValid(false)
                return
            }
        }
        setIsValid(true)
    }, [errors, files.length])

    const handleTitle = (title: string) => {
        setFormData(prev => ({
            ...prev,
            title,
        }))
        setDirtyFields(prev => ({
            ...prev,
            title: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))

        const error = validateTitle(title)

        setErrors(prev => ({
            ...prev,
            title: error,
        }))
    }

    const handleBasePrice = (basePrice: string) => {
        if (basePrice) {
            if (!'1234567890'.includes(basePrice[basePrice.length - 1])) {
                return
            }

            if (basePrice.length === 1 && basePrice === '0') {
                return
            }
        }

        setFormData(prev => ({
            ...prev,
            basePrice,
        }))
        setDirtyFields(prev => ({
            ...prev,
            basePrice: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))

        if (!basePrice) {
            setErrors(prev => ({
                ...prev,
                basePrice: 'Введите базовую цену',
            }))
            return
        }

        setErrors(prev => ({
            ...prev,
            basePrice: '',
        }))
    }

    const handleDescription = (description: string) => {
        setFormData(prev => ({
            ...prev,
            description,
        }))
        setDirtyFields(prev => ({
            ...prev,
            description: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))
    }

    const handleEndDate = (endDate: string) => {
        setFormData(prev => ({
            ...prev,
            endDate,
        }))
        setDirtyFields(prev => ({
            ...prev,
            endDate: true,
        }))
        setErrors(prev => ({
            ...prev,
            afterSubmitError: '',
        }))

        const error = validateEndDate(endDate)

        setErrors(prev => ({
            ...prev,
            endDate: error,
        }))
    }

    const handleSubmit = async () => {
        if (files.length == 0) {
            setErrors(prev => ({
                ...prev,
                afterSubmitError: 'Минимум одно изображение',
            }))
            return
        }

        const lotData = {
            title: formData.title,
            description: formData.description,
            basePrice: formData.basePrice,
            endDate: formData.endDate,
            images: files,
        }

        const isCreated = await createLot(lotData, token as string)

        if (isCreated) {
            navigate('/lots')
            showSnackbar('success', 'Лот успешно создан!')
        } else {
            showSnackbar('fail', 'Ошибка, попробуйте позже')
        }
    }

    return (
        <Form
            onSubmit={handleSubmit}
            setIsLoading={setIsLoading}
            style={{ marginLeft: 24 }}
        >
            <ErrorBox
                errors={{
                    title: dirtyFields.title && errors.title,
                    basePrice: dirtyFields.basePrice && errors.basePrice,
                    endDate: dirtyFields.endDate && errors.endDate,
                    afterSubmitError: errors.afterSubmitError,
                }}
            />
            <Input
                value={formData.title}
                onChange={handleTitle}
                maxLength={70}
                placeholder="Название лота"
            />
            <Input
                value={formData.basePrice}
                onChange={handleBasePrice}
                placeholder="Базовая цена"
                style={{ marginTop: 32 }}
            />
            <TextArea
                value={formData.description}
                onChange={handleDescription}
                placeholder="Описание"
                maxLength={500}
                style={{ marginTop: 32 }}
            />
            <DateInput
                value={formData.endDate}
                onChange={handleEndDate}
                style={{ marginTop: 32 }}
            />
            <Button
                text="Создать"
                disabled={!isValid}
                isLoading={isLoading}
                style={{ marginTop: 32 }}
            />
        </Form>
    )
}

export default LotInfoForm
