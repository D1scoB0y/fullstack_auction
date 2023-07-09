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

  return (mounted && ref.current) ? createPortal(<div>{children}</div>, ref.current) : null
}


export default Portal
