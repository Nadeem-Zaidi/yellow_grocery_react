

export const fetchMeasureUnit = async ({ pageParam, sortKey, sortOrder, filterKeys }) => {

    const url = new URL('http://localhost:3001/grocery/measureunit')
    url.searchParams.append('page', pageParam)
    url.searchParams.append('sortKey', sortKey)
    url.searchParams.append('sortOrder', sortOrder)

    if (Object.keys(filterKeys).length > 0) {
        Object.entries(filterKeys).forEach(([key, value]) => {
            if (value !== '') {
                url.searchParams.append(key, value)
            }
        })
    }
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Error in fetching measureunit")
        }
        const result = await response.json()
        return result

    } catch (error) {
        throw error

    }
}

export const createMeaureUnit = async (data) => {
    const url = "http://localhost:3001/grocery/measureunit/create"
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "An unknown error occurred")
        }

        const result = await response.json()
        return result

    } catch (error) {
        throw error

    }
}

export const createManyMeaureUnit = async (data) => {
    const url = "http://localhost:3001/grocery/measureunit/createmany"
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "An unknown error occurred")
        }

        const result = await response.json()
        return result

    } catch (error) {
        throw error

    }
}

export const deleteMeasureUnit = async (id) => {
    const url = `http://localhost:3001/grocery/measureunit/delete/${id}`
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error)
        }

    } catch (error) {
        throw error

    }

}

export const updateMeasureUnit = async (id, body) => {
    const url = `http://localhost:3001/grocery/measureunit/update/${id}`

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "An unknown error occurred")
        }

        const result = await response.json()
        return result

    } catch (error) {
        throw error

    }

}

export const fetchCategories = async ({ pageParam, sortKey, sortOrder, filterKeys }) => {
    const url = new URL("http://localhost:3001/grocery/specs")
    url.searchParams.append('page', 'pageParams')
    url.searchParams.append('sortKey', sortKey)
    url.searchParams.append('sortOrder', sortOrder)
    if (Object.keys(filterKeys).length > 0) {
        Object.entries(filterKeys).forEach(([key, value]) => {
            if (value !== '') {
                url.searchParams.append(key, value)
            }
        })
    }
    try {
        const response = await fetch(url)

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error)
        }
        const result = await response.json()
        return result

    } catch (error) {
        throw error

    }
}

export const createSpecs = async (data) => {
    const url = "http://localhost:3001/grocery/specs/create"

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData)
        }
        return await response.json()
    } catch (error) {
        throw error

    }
}

export const deleteCategorySpecs = async (id) => {
    const url = `http://localhost:3001/grocery/specs/delete/${id}`

    try {
        const response = await fetch(url, {
            methos: 'DELETE',
            headers: {
                'Content-Type': 'application/json'

            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData)
        }

    } catch (error) {
        throw error

    }
}


export const fetchProducts = async ({ pageParam, sortKey, sortOrder, filterKeys }) => {

    const url = new URL('http://localhost:3001/grocery/product')
    url.searchParams.append('page', pageParam)
    url.searchParams.append('sortKey', sortKey)
    url.searchParams.append('sortOrder', sortKey)

    Object.entries(filterKeys)
        .filter(([_, value]) => value !== '')
        .forEach(([key, value]) => {
            url.searchParams.append(key, value)
        })
    try {
        const response = await fetch(url.toString())
        if (!response.ok) {
            throw new Error("Error in fetching products")
        }
        const productList = await response.json()
        return productList

    } catch (error) {
        throw error

    }
}

