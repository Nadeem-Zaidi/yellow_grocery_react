// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

// const SideDrawer = (props) => {
//     console.log("inside side drawer")
//     const dispatch = useDispatch();

//     const handleLinkClick = (screenname) => {
//         dispatch(setCurrentScreen(screenname));
//     };

//     useEffect(() => {
//         const categoriesButton = document.getElementById("categoriesButton");
//         const categoriesDropdown = document.getElementById("categoriesDropdown");
//         const productsButton = document.getElementById("productsButton");
//         const productsDropdown = document.getElementById("productsDropdown");

//         const toggleDropdown = (dropdown) => {
//             dropdown.classList.toggle("hidden");
//         };

//         const categoriesToggleHandler = () => toggleDropdown(categoriesDropdown);
//         const productsToggleHandler = () => toggleDropdown(productsDropdown);

//         if (categoriesButton && categoriesDropdown) {
//             categoriesButton.addEventListener("click", categoriesToggleHandler);
//         }

//         if (productsButton && productsDropdown) {
//             productsButton.addEventListener("click", productsToggleHandler);
//         }

//         return () => {
//             if (categoriesButton && categoriesDropdown) {
//                 categoriesButton.removeEventListener("click", categoriesToggleHandler);
//             }

//             if (productsButton && productsDropdown) {
//                 productsButton.removeEventListener("click", productsToggleHandler);
//             }
//         };
//     }, []);

//     return (
//         <div className={`w-44 bg-white h-screen fixed z-50 transition-transform transform ${props.toggleDrawer ? 'translate-x-0' : '-translate-x-full'} left-0 ease-in-out duration-200`}>
//             <div className="bg-yellow-500 mx-2 px-2 my-2 rounded-md text-gray font-semibold">
//                 Yellow Grocery
//             </div>
//             <div className="flex flex-col mt-4">
//                 <button id="categoriesButton" type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="categoriesDropdown" data-collapse-toggle="categoriesDropdown">
//                     <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
//                         <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
//                     </svg>
//                     <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Categories</span>
//                     <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
//                     </svg>
//                 </button>
//                 <ul id="categoriesDropdown" className="hidden py-2 space-y-2">
//                     <li>
//                         <Link to="/categories" onClick={() => handleLinkClick('category-list')} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Categories</Link>
//                     </li>
//                     <li>
//                         <Link to="/attributes" onClick={() => handleLinkClick('attribute-list')} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Attributes</Link>
//                     </li>
//                     <li>
//                         <Link to="/measuringunit" onClick={() => handleLinkClick('measuringunit')} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Measureunit</Link>
//                     </li>
//                 </ul>

//                 <button id="productsButton" type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="productsDropdown" data-collapse-toggle="productsDropdown">
//                     <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
//                         <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
//                     </svg>
//                     <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Products</span>
//                     <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
//                     </svg>
//                 </button>
//                 <ul id="productsDropdown" className="hidden py-2 space-y-2">
//                     <li>
//                         <Link to="/products" onClick={() => handleLinkClick('product-list')} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</Link>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default SideDrawer;


import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SideDrawer = (props) => {
    console.log("Sidebar")
    const dispatch = useDispatch();
    const categoriesDropdownRef = useRef(null);
    const productsDropdownRef = useRef(null);

    const handleLinkClick = (screenname) => {
        dispatch(setCurrentScreen(screenname));
    };

    const toggleDropdown = (dropdownRef) => {
        if (dropdownRef.current.classList.contains("hidden")) {
            dropdownRef.current.classList.remove("hidden");
        } else {
            dropdownRef.current.classList.add("hidden");
        }
    };

    return (
        <div className={`w-44 bg-white shadow-md h-screen fixed z-50 transition-transform transform ${props.toggleDrawer ? 'translate-x-0' : '-translate-x-full'} left-0 ease-in-out duration-200`}>
            <div className="bg-yellow-500 mx-2 px-2 my-2 rounded-md text-gray font-semibold">
                Yellow Grocery
            </div>
            <div className="flex flex-col mt-4">
                <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onClick={() => toggleDropdown(categoriesDropdownRef)}>
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Categories</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <ul ref={categoriesDropdownRef} className="hidden py-2 space-y-2">
                    <li>
                        <Link to="/categories" onClick={() => handleLinkClick('category-list')} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Categories</Link>
                    </li>
                    <li>
                        <Link to="/attributes" onClick={() => handleLinkClick('attribute-list')} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Attributes</Link>
                    </li>
                    <li>
                        <Link to="/measuringunit" onClick={() => handleLinkClick('measuringunit')} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Measureunit</Link>
                    </li>
                </ul>

                <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onClick={() => toggleDropdown(productsDropdownRef)}>
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Products</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <ul ref={productsDropdownRef} className="hidden py-2 space-y-2">
                    <li>
                        <Link to="/products" onClick={() => handleLinkClick('product-list')} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideDrawer;
