

// const TableBody = ({ columns, data }) => {
//     return (
//         <>
//             <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                         <tr>
//                             <th scope="col" className="p-4">
//                                 <div className="flex items-center">
//                                     <input
//                                         id="checkbox-all-search"
//                                         type="checkbox"
//                                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                                     />
//                                     <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
//                                 </div>
//                             </th>
//                             {columns.map((column) => (
//                                 <th key={column} scope="col" className="px-6 py-3">
//                                     {columns}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>

//                         {data && data.map((page, pageIndex) => (
//                             page.data.map((item: any, itemIndex: number) => (
//                                 <tr key={`${pageIndex}-${itemIndex}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                                     <td className="p-4">
//                                         <div className="flex items-center">
//                                             <input
//                                                 id={`checkbox-${pageIndex}-${itemIndex}`}
//                                                 type="checkbox"
//                                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                                             />
//                                             <label htmlFor={`checkbox-${pageIndex}-${itemIndex}`} className="sr-only">checkbox</label>
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         {item.name}
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         {item.description}
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         {item.path}
//                                     </td>
//                                 </tr>
//                             ))
//                         ))}
//                     </tbody>
//                 </table>
//                 <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
//                     <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
//                         Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span>
//                     </span>
//                     <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
//                         <li>
//                             <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
//                         </li>
//                         <li>
//                             <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
//                         </li>
//                         <li>
//                             <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
//                         </li>
//                         <li>
//                             <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
//                         </li>
//                         <li>
//                             <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
//                         </li>
//                         <li>
//                             <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
//                         </li>
//                         <li>
//                             <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//         </>
//     )

// }