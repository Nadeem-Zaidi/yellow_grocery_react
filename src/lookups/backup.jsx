// import React, { useEffect, useRef, useState } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { categoriesList } from "../http_request/categories";

// interface CategoryLookUpProps { }

// const CategoryLookUp: React.FC<CategoryLookUpProps> = () => {
//     const {
//         data,
//         isLoading,
//         error,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage
//     } = useInfiniteQuery({
//         queryKey: ["categories"],
//         queryFn: ({ pageParam = 1 }) => categoriesList({ pageParam }),
//         initialPageParam: 1,
//         getNextPageParam: (lastPage, allPages) => {
//             return allPages.length + 1;
//         }
//     });

//     const [isInteractive, setIsInteractive] = useState(false);
//     const buttonRef = useRef<HTMLButtonElement>(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 const entry = entries[0];
//                 if (entry.isIntersecting && hasNextPage) {
//                     fetchNextPage();
//                 }
//                 setIsInteractive(entry.isIntersecting);
//             },
//             { threshold: 1.0 }
//         );

//         if (buttonRef.current) {
//             observer.observe(buttonRef.current);
//         }

//         return () => {
//             if (buttonRef.current) {
//                 observer.unobserve(buttonRef.current);
//             }
//         };
//     }, [fetchNextPage, hasNextPage]);



//     return (
//         <>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white">
//                     <thead className="bg-gray-800 text-white">
//                         <tr>
//                             <th className="w-1/3 px-4 py-2">Category Name</th>
//                             <th className="w-1/3 px-4 py-2">Category Description</th>
//                             <th className="w-1/3 px-4 py-2">Category Path</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data &&
//                             data.pages.map((page) =>
//                                 page.data.map((item: any, index: number) => (
//                                     <tr
//                                         key={index}
//                                         className="whitespace-nowrap odd:bg-gray-100 even:bg-gray-200"
//                                     >
//                                         <td className="px-4 py-2 border">{item.name}</td>
//                                         <td className="px-4 py-2 border">{item.description}</td>
//                                         <td className="px-4 py-2 border">{item.path}</td>
//                                     </tr>
//                                 ))
//                             )}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="flex justify-center mt-4">
//                 <button
//                     ref={buttonRef}
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none disabled:opacity-50"
//                     disabled={!hasNextPage || isFetchingNextPage}
//                 >
//                     {isFetchingNextPage ? "Loading More..." : "Load More"}
//                 </button>
//             </div>
//             <div className="text-center mt-4">
//                 {isInteractive ? 'Button is interactive' : 'Button is not interactive'}
//             </div>
//         </>
//     );
// };

// export default CategoryLookUp;
