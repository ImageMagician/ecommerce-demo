import { useEffect, useState }          from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon }              from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass }            from "@fortawesome/free-solid-svg-icons";

type SearchBoxProps = {
    basepath?: string,
}

const SearchBox = ( { basepath = '/'}: SearchBoxProps ) => {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    const [ search, setSearch ] = useState( searchParams.get( 'keyword' ) ?? '');

    useEffect( () => {
        setSearch( searchParams.get( 'keyword' ) ?? '' );
    }, [ searchParams ] );

    const searchHandler = ( e: { preventDefault: () => void; } ) => {
        e.preventDefault();

        const trimmed = search.trim();

        if ( trimmed ) {
            // new search on page 1
            navigate( `${ basepath }?keyword=${ encodeURIComponent( trimmed ) }&pageNumber=1`)
        }
        else {
            navigate( basepath );
        }
    }
    return <>
        <form onSubmit={ searchHandler } className="flex border border-gray-300 rounded">
            <input type="text"
                   name="keyword"
                   className="border-0 px-2 text-gray-600"
                   value={ search }
                   placeholder="Search products..."
                   onChange={ (e) => setSearch(e.target.value) }
            />
            <button type="submit" className="bg-black text-white py-1 px-2 rounded-r">
                <FontAwesomeIcon icon={ faMagnifyingGlass } />
            </button>
        </form>
    </>
}

export default SearchBox;