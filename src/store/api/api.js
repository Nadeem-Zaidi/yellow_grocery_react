import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({

    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/grocery/' }),
    endpoints: (builder) => ({
        fetchCategories: builder.query({
            query: () => 'categories/',
        }),
        fetchCategoryWithId: builder.query({
            query: (id) => `categories/${id}`,
        }),
        fetchProducts: builder.query({
            query: () => 'product'
        }),
        fetchProductWithId: builder.query({
            query: (id) => `product/${id}`
        }),
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `categories/update/${id}`, // The endpoint URL
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
        }),
        fetchMeasureunit: builder.query({
            query: () => `measureunit/`
        }),
        createMeasureunit: builder.mutation({
            query: (data) => ({
                url: 'measureunit/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data

            })
        }),
        updateMeasureunit: builder.mutation({
            query: ({ id, data }) => ({
                url: `/measureunit/update/${id}`,
                method: 'PUT',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        })
        // fetchProducts: builder.query({
        //     query: async () => 'products',
        // }),
        // fetchVariations: builder.query({
        //     query: async () => 'variations',
        // }),
        // Define more endpoints for other entities as needed
    }),
    extraReducers: (builder) => {
        // Add additional logic here if needed
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            // Additional logic after fetching categories
            console.log('Categories fetched successfully!');
        });
    },
});


export const { useFetchCategoriesQuery, useFetchCategoryWithIdQuery, useFetchProductsQuery, useFetchProductWithIdQuery, useFetchVariationsQuery, useUpdateCategoryMutation, useFetchMeasureunitQuery, useCreateMeasureunitMutation, useUpdateMeasureunitMutation } = categoryApi;