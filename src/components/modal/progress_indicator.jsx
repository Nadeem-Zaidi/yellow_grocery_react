import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return <div className="fixed top-0 left-0 w-full h-full z-10 bg-zinc-200 bg-opacity-50 backdrop-filter" onClick={props.onClose}></div>;
};

const LoadingModalOverlay = (props) => {
    return (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2  max-w-4xl w-44 drop-shadow-lg bg-white z-30 rounded-md overflow-hidden">
            <div className="p-4 max-h-44 overflow-auto">{props.children}</div>
            <div className="flex flex-row justify-end">

                <div className="p-4 border-t flex justify-end">
                    {props.isError && <button type='button' onClick={props.onClose} className="py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full">
                        Close
                    </button>}
                </div>
            </div>

        </div>
    );
};

const portalElement = document.getElementById("overlays");

const ProgressIndicator = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(
                <LoadingModalOverlay onClose={props.onClose} onSave={props.onSave}>{props.children}</LoadingModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default ProgressIndicator;
