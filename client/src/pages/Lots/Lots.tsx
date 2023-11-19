import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import PageTitle from "../../UI/PageTitle/PageTitle"
import { UserLots } from "../../modules/UserLots"


const Lots = () => {
    return (
        <>
            <PageMetaInfo
                title="Лоты | FotoJäger`s Auctions"
            />

            <div className="content">
                <PageTitle text="Лоты" />
                <UserLots />
            </div>
        </>
    )
}

export default Lots
