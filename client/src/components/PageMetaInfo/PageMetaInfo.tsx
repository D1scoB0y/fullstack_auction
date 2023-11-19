import { FC } from "react"
import { Helmet } from "react-helmet-async"


interface Props {
    title: string
    description?: string
}

const PageMetaInfo: FC<Props> = ({
    title,
    description,
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta
                name="description"
                content={description}
            />
        </Helmet >
    )
}

export default PageMetaInfo
