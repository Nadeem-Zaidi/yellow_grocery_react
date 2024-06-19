import Loader from "../components/loader/loader";
import LoadingModal from "../components/modal/loading_modal"

const ProgressIndicator = (props) => {
    return (

        <LoadingModal>
            <div className="flex flex-row items-center justify-center bg-white py-2 px-2 rounded-md">
                <Loader />
                <h1 className="ml-2">{props.message}</h1>
            </div>
        </LoadingModal >

    )

}

export default ProgressIndicator