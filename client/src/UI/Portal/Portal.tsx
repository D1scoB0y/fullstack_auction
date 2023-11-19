import { useRef, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'


interface IPortal {
	children: ReactNode
}

const Portal = ({ children }: IPortal) => {
    const ref = useRef<Element | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      	ref.current = document.querySelector<HTMLElement>("#portal")
      	setMounted(true)
    }, [])

    if (mounted && ref.current) {
        return createPortal(
            children,
            ref.current,
        )
    }

    return null
}

export default Portal
