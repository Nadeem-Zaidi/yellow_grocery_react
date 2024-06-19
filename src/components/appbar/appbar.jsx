
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faS } from "@fortawesome/free-solid-svg-icons"
import SideDrawer from "./side_drawer"
import { useSelector } from "react-redux"



const AppBar = (props) => {
    const currentSelection = useSelector((state) => state)
    console.log("*************************")
    console.log(currentSelection)
    console.log("*************************")

    return (
        <>
            <div className="flex flex-row justify-between item-center px-2 py-2 bg-primary text-on-primary h-12 items-center sticky top-0 z-50">

                <div className="flex flex-row items-center">
                    <button
                        onClick={props.onClick}
                        className="p-2 focus:outline-none focus:border-none "
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <div>Category List</div>
                </div>

                <div onClick={props.toggleCategoryForm} >Add Category</div>
            </div>
        </>
    )
}

export default AppBar

