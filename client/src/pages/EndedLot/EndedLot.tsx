import { useParams } from "react-router-dom"
import { EndedLot as EndedLotModule } from "../../modules/EndedLot"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import PageTitle from "../../UI/PageTitle/PageTitle"


const EndedLot = () => {
    const { id } = useParams()

    if (!id) {
        return <>404 not found</>
    }

    return (
        <>
            <PageMetaInfo
                title={`Завершенный лот № ${id} | FotoJäger\`s Auction`}
            />

            <div className="content">
                <PageTitle
                    text={`Завершенный лот № ${id}`}
                />

                <EndedLotModule id={id} />
            </div>
        </>
    )
}

export default EndedLot
