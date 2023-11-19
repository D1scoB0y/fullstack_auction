import React, { Dispatch, FC, SetStateAction } from 'react'


interface Props {
    children: JSX.Element[]
    onSubmit: () => Promise<void>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    style?: React.CSSProperties
    className?: string
}

const Form: FC<Props> = ({
    children,
    onSubmit,
    setIsLoading,
    style,
    className,
}) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        await onSubmit()

        setIsLoading(false)
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ maxWidth: 320, margin: '0 auto', ...style }}
            className={className}
            noValidate
        >
            {children}
        </form>
    )
}

export default Form
