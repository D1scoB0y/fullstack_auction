import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import PageTitle from "../../UI/PageTitle/PageTitle"
import { EndedLots as EndedLotsModule } from "../../modules/EndedLots"


const EndedLots = () => {
    return (
        <>
            <PageMetaInfo
                title="Завершенные лоты | FotoJäger`s Auctions"
            />

            <div className="content">
                <PageTitle
                    text="Завершенные лоты"
                />

                <EndedLotsModule />
            </div>
        </>
    )
}

export default EndedLots