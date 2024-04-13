import { Fragment } from "react"
import ReactDOM from "react-dom"

const ModalOverlay = props => {
    return <div className={props.className}>
        <div>{props.children}</div>
    </div>
}
const Backdrop = props => {
    return <div className=" flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full z-10 bg-zinc-200 bg-opacity-50 backdrop-filter backdrop-blur-m" onClick={props.onClose}>
        <ModalOverlay className={props.className}>{props.children}</ModalOverlay>
    </div>
}



const portalElement = document.getElementById('overlays')
const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}>{props.children}</Backdrop>, portalElement)
        }
        {/* {ReactDOM.createPortal(<ModalOverlay className={props.className}>{props.children}</ModalOverlay>, portalElement)} */}

    </Fragment >


}

export default Modal