import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {

    return (<div onClick={props.close} className="fixed top-0 left-0 w-full h-full z-30 bg-gray-light bg-opacity-50 backdrop-filter" >

    </div>)
};

const LoadingModalOverlay = (props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {props.children}
        </div>
    );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop close={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<LoadingModalOverlay onClose={props.onClose}>{props.children}</LoadingModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;
