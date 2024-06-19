import { Fragment } from "react"
import ReactDOM from "react-dom"




const Backdrop = props => {
    return <div className="fixed top-0 left-0 w-full h-full z-10 bg-zinc-200 bg-opacity-50 backdrop-filter backdrop-blur-sm" onClick={props.onClose}></div>
}

const LoadingModalOverlay = (props) => {
    return <div className="px-4 py-8 rounded-md fixed top-20  w-6/12 drop-shadow-lg bg-white z-30 left-1/4">
        <div>{props.children}</div>
    </div>
}
const portalElement = document.getElementById('overlays')

const AddCategory = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop obgcolor={props.obgcolor} blur={props.blur} bopacity={props.bopacity}>{props.children}</Backdrop>, portalElement)
        }
        {ReactDOM.createPortal(<LoadingModalOverlay>{props.children}</LoadingModalOverlay>, portalElement)
        }

    </Fragment>


}

export default AddCategory


