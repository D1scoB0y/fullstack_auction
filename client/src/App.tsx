import { lazy } from "react"
import {
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom"

import { Layout } from "./modules/Layout"

const AuthorizedOnly = lazy(() => import("./components/AuthorizedOnly/AuthorizedOnly"))
const UnauthorizedOnly = lazy(() => import("./components/UnauthorizedOnly/UnauthorizedOnly"))
const SellersOnly = lazy(() => import("./components/SellersOnly/SellersOnly"))

const Login = lazy(() => import('./pages/Login/Login'))
const Registration = lazy(() => import('./pages/Registration/Registration'))
const ResetPasswordStep1 = lazy(() => import("./pages/ResetPasswordStep1/ResetPasswordStep1"))
const ResetPasswordStep2 = lazy(() => import("./pages/ResetPasswordStep2/ResetPasswordStep2"))
const Settings = lazy(() => import("./pages/Settings/Settings"))
const EmailVerification = lazy(() => import("./pages/EmailVerification/EmailVerification"))
const ChangePassword = lazy(() => import("./pages/ChangePassword/ChangePassword"))
const PhoneVerification = lazy(() => import("./pages/PhoneVerification/PhoneVerification"))
const Lots = lazy(() => import("./pages/Lots/Lots"))
const CreateLot = lazy(() => import("./pages/CreateLot/CreateLot"))
const Home = lazy(() => import("./pages/Home/Home"))
const LotPage = lazy(() => import("./pages/LotPage/LotPage"))
const Bids = lazy(() => import("./pages/Bids/Bids"))
const EndedLots = lazy(() => import("./pages/EndedLots/EndedLots"))
const EndedLot = lazy(() => import("./pages/EndedLot/EndedLot"))
const HowItWorks = lazy(() => import("./pages/HowItWorks/HowItWorks"))


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/lot/:id" element={<LotPage />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route element={<UnauthorizedOnly />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/reset-password-step-1" element={<ResetPasswordStep1 />} />
                        <Route path="/reset-password-step-2" element={<ResetPasswordStep2 />} />
                    </Route>
                    <Route element={<AuthorizedOnly />}>
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/email-verification" element={<EmailVerification />} />
                        <Route path="/change-password" element={<ChangePassword />} />
                        <Route path="/phone-verification" element={<PhoneVerification />} />
                        <Route path="/bids" element={<Bids />} />
                        <Route element={<SellersOnly />}>
                            <Route path="/lots" element={<Lots />} />
                            <Route path="/create-lot" element={<CreateLot />} />
                            <Route path="/ended-lots" element={<EndedLots />} />
                            <Route path="/ended-lot/:id" element={<EndedLot />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
