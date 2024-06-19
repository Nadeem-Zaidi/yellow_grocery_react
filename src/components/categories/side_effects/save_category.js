

export const saveCategory = async (data) => {

    try {
        const response = await fetch('http://localhost:3001/grocery/categories/add_category',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }
        )
        if (!response.ok) {
            throw new Error('error in saving record')
        }
        console.log(response)

    } catch (error) {
        throw error
    }

}