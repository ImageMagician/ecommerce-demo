import { ClipLoader } from "react-spinners"

const Loader = () => {
    return (
        <div className={`p-5 text-center`}>
            <ClipLoader color={`rgb(50,125,200)`} className={`mx-auto`} size={50} />
        </div>
    )
}

export default Loader;