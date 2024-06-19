export const fetchCategory = async (setFunction) => {

    try {
        const response = await fetch('http://localhost:3001/grocery/categories/?toplevel=true');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const data = JSON.parse(jsonData)
        console.log(data)
        let c = data.map((item) => ({ id: item.id, name: item.name, isleaf: item.isleaf }));
        return c
    } catch (error) {
        if (error) {
            throw error
        }

    }
};

export const fetchAllCategoryWithDepth = async () => {

    try {
        const response = await fetch('http://localhost:3001/grocery/categories/?withdepth=true');
        if (!response.ok) {
            throw new Error(`Failed to load categories. Error: ${error}`);
        }
        const jsonData = await response.json();
        const data = JSON.parse(jsonData)
        console.log(data)
        const categories = data.map(item => ({ id: item.id, name: item.name, depth: item.d }));
        return categories
    } catch (error) {
        if (error) {
            throw error
        }
        // showError(true); // Corrected from setError(true)
    }
};

export const fetchChildCategories = async (id) => {

    try {
        const response = await fetch(`http://localhost:3001/grocery/categories/?catid=${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const data = JSON.parse(jsonData)
        console.log(data)
        let c = data.map((item) => ({ id: item.id, name: item.name, isleaf: item.isleaf }));
        console.log(c)
        return c;
    } catch (error) {
        if (error) {
            throw error
        }

    }

}