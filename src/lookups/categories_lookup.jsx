import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { categoriesList } from "../components/categories/side_effects/categories_api";


const CategoryLookup = (props) => {
    console.log(props)

    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' });
    const { data, isLoading, error, status, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["categories_llokup", sortConfig],
        queryFn: ({ pageParam = 1 }) => categoriesList({ pageParam, sortKey: sortConfig.key, sortOrder: sortConfig.direction }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.meta.hasMore ? lastPage.meta.nextPage : undefined,
    });

    const category = (item) => {
        props.selectCategory(item)
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg block">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Category Name</th>

                            <th scope="col" className="px-6 py-3">
                                Category Path
                                <button className="ml-2">
                                    <FontAwesomeIcon icon={faArrowUp} />
                                </button>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {status === 'success' && data.pages.map((page) => (
                            page.data.map((item) => (
                                <tr onClick={() => category(item)} key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">{item.path}</td>

                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default CategoryLookup
