import { UpdateUserForm } from "../../modules/UpdateUserForm"
import ToggleMenu from "../../components/ToggleMenu/ToggleMenu"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import PageTitle from "../../UI/PageTitle/PageTitle"
import { useState } from "react"
import { VerificationSection } from "../../modules/VerificationSection"


const Settings = () => {
    const [menuToggled, setMenuToggled] = useState<boolean>(false)

    return (
        <>
            <PageMetaInfo
                title="Настройки аккаунта | FotoJäger`s Auctions"
            />

            <div className="content">
                <PageTitle text="Настройки аккаунта" />
                <ToggleMenu
                    options={['Личные данные', 'Верификация']}
                    toggled={menuToggled}
                    setToggled={setMenuToggled}
                />

                {menuToggled ? <VerificationSection /> : <UpdateUserForm />}
            </div>
        </>
    )
}

export default Settings
