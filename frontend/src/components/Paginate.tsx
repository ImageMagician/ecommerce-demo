import { Link, useSearchParams } from "react-router-dom";

type PaginateProps = {
    pages: number,
    page: number,
}

const Paginate = ( { pages, page }: PaginateProps ) => {
    const [ searchParams ] = useSearchParams();

    // Nothing to paginate
    if ( pages <= 1 ) return null;

    // keep any other query params (keyword, category, etc.) and only change pageNumber
    const buildLink = ( n: number, k?: string )=> {
        const params = new URLSearchParams( searchParams );
        params.set('pageNumber', String( n ) );
        k ? params.set( 'keyword', k ) : undefined;
        return `?${ params.toString() }`;
    }

    const pageNumbers = Array.from( { length: pages }, ( _, i ) => i + 1 );

    return (
        <nav arial-label="Pagination" className="pagination">
            {
                pageNumbers.map( ( n ) => (
                    <Link to={ buildLink( n ) }
                          key={ n }
                          aria-current={ n === page ? 'page' : undefined }
                          className={ `pagination__item${ n === page ? ' pagination__item--active' : '' }` }
                    >
                        { n }
                    </Link>
                ))
            }
        </nav>
    )
}

export default Paginate;