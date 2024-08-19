

export const fetchAllAttributes = async () => {
    try {
        const response = await fetch("http://192.168.1.9:3001/grocery/attribute")
        if (!response.ok) {
            throw new Error('Failed to fetch attrubutes')
        }
        const result = await response.json()
        return result


    } catch (error) {
        throw error

    }
}

export const addAttributes = async (data) => {
    try {
        const response = await fetch("http://192.168.1.9:3001/grocery/attribute/createAttribute", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        // if (!response.ok) {
        //     console.log(response)
        //     throw new Error("can not add attributes")
        // }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const updateAttribute = async (data) => {
    try {
        const response = await fetch("http://192.168.1.9:3001/grocery/attribute/updateAttribute", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error("Error in updating the attribute")
        }

        return response.json()

    } catch (error) {
        throw error

    }
}

export const deleteRow = async (id) => {
    try {
        const response = await fetch(`http://192.168.1.9:3001/grocery/attribute/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Error in deleting the record");
        }

        return response.text();
    } catch (error) {
        throw error;
    }
};