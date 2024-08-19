
// export const categoriesList = async ({ pageParam, sortKey, sortOrder, filterKey }) => {
//     const url = new URL('http://localhost:3001/grocery/categories');
//     url.searchParams.append('page', pageParam);
//     url.searchParams.append('sortKey', sortKey);
//     url.searchParams.append('sortOrder', sortOrder);
//     if (filterKey) {
//         url.searchParams.append('name', filterKey);
//     }

//     try {
//         const response = await fetch(url.toString());
//         if (!response.ok) {
//             throw new Error("Failed fetching categories list");
//         }
//         const categories = await response.json();
//         return categories;
//     } catch (error) {
//         throw error;
//     }
// };



