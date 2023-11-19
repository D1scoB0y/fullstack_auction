import { FC, createContext, useContext, useRef } from 'react'
import Snackbar from '../UI/Snackbar/Snackbar'


export type TypeSnackbarType = 'fail' | 'success'

interface ISnackbarContext {
    showSnackbar: (type: TypeSnackbarType , text: string) => void
}

const SnackbarContext = createContext<ISnackbarContext | null>(null)

const SnackbarProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const snackbarRef = useRef(null)

    const showSnackbar = (type: TypeSnackbarType , text: string): void => {
        // @ts-ignore
        snackbarRef.current.show(type, text)
    }

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar ref={snackbarRef} />
        </SnackbarContext.Provider>
    )
}

const useSnackbarContext = () => useContext(SnackbarContext) as ISnackbarContext

export {
    SnackbarProvider,
    useSnackbarContext,
}
