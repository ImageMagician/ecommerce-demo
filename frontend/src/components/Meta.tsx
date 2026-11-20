import { Helmet } from "react-helmet-async";

interface MetaProps {
    title?: string,
    description?: string,
    keywords?: string,
}

const Meta = ({
                  title = "TechStash: The tech you want, the prices you love",
                  description = "Location for all your tech goodies",
                  keywords = "electronics, buy electronics, cheap electronics",
              }: MetaProps) => {
    return (
        <Helmet>
            <title>{ title }</title>
            <meta name="description" content={ description } />
            <meta name="keywords" content={ keywords } />
        </Helmet>
    )
}

export default Meta;