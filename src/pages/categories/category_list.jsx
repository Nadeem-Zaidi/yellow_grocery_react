import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faThList, faTh, faArrowUp, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback } from "react";
import AddCategoryForm from "./add_category_form";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/loader";
import Modal from "../../components/modal/loading_modal";
import MeasuringUnit from "../../measuringunit/measuringunit";
import ProgressIndicator from "../../utilities/show_progress_indicator";
import ErrorMessage from "../../utilities/error_box";
import { useDispatch } from "react-redux";
import { setCurrentScreen } from "../../store/slice/screen_State";
import { categoriesList } from "../../components/categories/side_effects/categories_api";
import { debounce } from "../../utilities/debounce";

const CategoryList = (props) => {
    const dispatch = useDispatch();
    dispatch(setCurrentScreen('category-list'));

    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' });
    const [filterKey, setFilterKey] = useState(null);
    const [categoryModal, setCategoryModal] = useState(false);
    const [showAttributes, setShowAttributes] = useState(false);
    const [viewType, setViewType] = useState('grid');
    const [measureunit, setMeasureunit] = useState(false);
    const [showErrorBox, setShowErrorBox] = useState(false);
    const [showFilterRowField, setShowFilterRowField] = useState(false);
    const [lookup, setLookup] = useState(false)
    const navigate = useNavigate();


    const [filterKeys, setFilterKeys] = useState({ name: '', description: '', path: '', createdAt: '' });
    const { data, isLoading, error, status, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["categories", sortConfig, filterKey],
        queryFn: ({ pageParam = 1 }) => categoriesList({ pageParam, sortKey: sortConfig.key, sortOrder: sortConfig.direction, filterKeys }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined,
    });

    const handleCategoryModalOpen = () => setCategoryModal(true);
    const handleCategoryModalClose = () => setCategoryModal(false);
    const toggleAttributes = () => setShowAttributes((prev) => !prev);
    const toggleViewType = () => setViewType((prev) => (prev === 'grid' ? 'list' : 'grid'));
    const navigateToCategoryDetail = (id) => navigate(`/categories/${id}`);
    const handleMeasureUnitOpen = () => setMeasureunit(true);
    const handleErrorBoxClose = () => setShowErrorBox(false);
    console.log(data)

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
        refetch();
    };

    const debouncedFilter = useCallback(
        debounce((filterObj) => {
            setFilterKeys(filterObj);
            refetch();
        }, 400),
        []
    );

    const handleFilter = (e) => {
        const { id, value } = e.target;
        console.log(id, value)
        setFilterKeys((prev) => {
            const newFilterKeys = { ...prev, [id]: value };
            debouncedFilter(newFilterKeys);
            return newFilterKeys;
        });
    };


    const showFilter = () => {
        setShowFilterRowField(prev => !prev);
    };

    const lookUpCOntroller = () => {
        setLookup(true)
    }
    const selectCategory = (item) => {
        props.selectCategory(item)

    }


    return (
        <div className="w-full p-4">
            <div className="flex justify-end mt-2 mb-2">
                <button className="bg-gray text-white rounded-full w-10 h-10 flex items-center justify-center mx-2" onClick={handleCategoryModalOpen}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <button className=" bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center" onClick={showFilter}>
                    <FontAwesomeIcon icon={faFilter} />
                </button>
            </div>
            {categoryModal && (
                <Modal onClose={handleCategoryModalClose}>
                    <AddCategoryForm close={handleCategoryModalClose} isOpen={categoryModal} refetch={refetch} />
                </Modal>
            )}
            {showErrorBox && <ErrorMessage content="Error in fetching categories" onClose={handleErrorBoxClose} />}
            {isLoading && !showFilterRowField && <ProgressIndicator message="Loading Categories" />}
            {measureunit && (
                <Modal>
                    <MeasuringUnit />
                </Modal>
            )}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-128">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        {showFilterRowField ? (
                            <tr>
                                <th className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input onChange={handleFilter} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                </th>
                                <th className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <input onChange={handleFilter} type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                </th>
                                <th className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <label htmlFor="path" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Path</label>
                                        <input onChange={handleFilter} type="text" id="path" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                </th>
                                <th className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <label htmlFor="createdAt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Created At</label>
                                        <input onChange={handleFilter} type="text" id="createdAt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                    </div>
                                </th>
                            </tr>
                        ) : (
                            <tr>
                                <th scope="col" className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">Category Name</th>
                                <th scope="col" className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">Description</th>
                                <th scope="col" className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">
                                    Category Path
                                    <button onClick={() => handleSort("path")} className="ml-2">
                                        <FontAwesomeIcon icon={faArrowUp} />
                                    </button>
                                </th>
                                <th scope="col" className="sticky top-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-700">Created At</th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {status === 'success' && data.pages.map((page) => (
                            page.data.map((item) => (
                                <tr onClick={() => navigateToCategoryDetail(item.id)} key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">{item.description}</td>
                                    <td className="px-6 py-4">{item.path}</td>
                                    <td className="px-6 py-4">{item.createdAt}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
