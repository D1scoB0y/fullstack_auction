import { useEffect } from "react"
import IMask from "imask"


type TypeUsePhoneMask = (elementId: string) => void

const usePhoneMask: TypeUsePhoneMask = (elementId) => {
    useEffect(() => {
        const element = document.getElementById(elementId)
        const maskOptions = {
            mask: '+{7} 000 000 00 00'
        }
        if (element) {
            IMask(element, maskOptions);
        }
    }, [])
}


export default usePhoneMask
