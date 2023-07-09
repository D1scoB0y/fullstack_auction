import Header from "./Header/Header"
import Footer from "./Footer/Footer"

type Props = {
    children: any
}


const Layout = ({children}: Props) => {
  return (
    <>
        <Header />

        <main>
            {children}
        </main>

        <Footer />
    </>
  )
}

export default Layout