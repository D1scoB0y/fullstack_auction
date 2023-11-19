import { Outlet } from "react-router-dom"
import { Suspense } from "react"

import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import PageSpinner from "../../../UI/PageSpinner/PageSpinner"


const Layout = () => {
    return (
        <>
            <Header />

            <main>
                <Suspense fallback={<PageSpinner />}>
                    <Outlet />
                </Suspense>
            </main>

            <Footer />
        </>
    )
}

export { Layout }
