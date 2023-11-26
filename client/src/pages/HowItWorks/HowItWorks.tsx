import PageTitle from "../../UI/PageTitle/PageTitle"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import { UserGuide } from "../../modules/UserGuide"


const HowItWorks = () => {
    return (
        <>
            <PageMetaInfo
                title="Как это работает? | FotoJäger`s Auctions"
            />

            <div className="content">
                <PageTitle
                    text="Как это работает?"
                />

                <UserGuide />
            </div>
        </>
    )
}

export default HowItWorks