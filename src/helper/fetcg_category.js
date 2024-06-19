export const fetchCategory = async (setCategoryLoading) => {
    setCategoryLoading(true);
    try {
        const response = await fetch('http://localhost:3001/grocery/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        let c = jsonData.map((item) => item.name);
        setCategoryList(c);
    } catch (error) {
        console.error('Error fetching categories:', error);
        setError(true);
    } finally {
        setCategoryLoading(false);
    }
};