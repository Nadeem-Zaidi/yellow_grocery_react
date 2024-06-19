

export const categoriesWithParentNull = async () => {

    try {
        const response = await fetch('http://localhost:3001/grocery/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();

        return jsonData
    } catch (error) {
        console.error('Error fetching categories:', error);

    }
}

export const categoriesWithPath = async () => {
    try {
        const response = await fetch('http://localhost:3001/grocery/categories/?withpath=true')
        if (!response.ok) {
            throw new Error('Failed to load categories')
        }
        const result = await response.json()

        return result

    } catch (error) {
        throw error

    }
}

export const categoryWithId = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/grocery/categories/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch category with id")
        }
        const result = await response.json()
        return result

    } catch (error) {
        throw error
    }
}

export const updateCategory = async (id, data) => {
    try {
        const response = await fetch(`http://localhost:3001/grocery/categories/categories/update/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error('error in saving record')
        }
        return await response.json()
    } catch (error) {
        throw error

    }
}

export const fetchAllCategorySpec = async (catid) => {
    try {
        const response = await fetch(`http://localhost:3001/grocery/categoryspec/specs/${catid}`)

        if (!response.ok) {
            throw new Error("Error in fetching categoryspec")
        }

        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }

}

export const addCategorySpec = async (data) => {
    try {
        const response = await fetch('http://localhost:3001/grocery/categoryspec/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        })
        return await response.json()
    } catch (error) {
        throw new Error("Error in adding categoryspec")

    }
}

export const updateCategorySpec = async (data) => {
    try {
        const response = await fetch("http://localhost:3001/grocery/categoryspec/update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json()

    } catch (error) {
        throw new Error("Error in updating the record")

    }
}

export const deleteCategorySpec = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/grocery/categoryspec/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            // const errorMessage = await response.text();
            throw new Error(errorMessage || "Error in deleting the record");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

