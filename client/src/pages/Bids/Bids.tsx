import PageTitle from "../../UI/PageTitle/PageTitle"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import { UserBids } from "../../modules/UserBids"


const Bids = () => {
    return (
        <>
            <PageMetaInfo
                title="Ставки | FotoJäger`s Auction"
            />

            <div className="content">
                <PageTitle text="Ставки" />
                <UserBids />
            </div>
        </>
    )
}

export default Bids
