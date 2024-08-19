
const baseUrl = "http://localhost:3001/grocery";
export const fetchMeasureUnit = async ({ pageParam, sortKey, sortOrder, filterKeys }) => {

    const url = new URL('http://192.168.1.9:3001/grocery/measureunit')
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

export const fetchProductVariations=async({ pageParam, sortKey, sortOrder, filterKeys })=>{
    const url = new URL('http://192.168.1.9:3001/grocery/product/variations')
    url.searchParams.append('page', pageParam)
    url.searchParams.append('sortKey', sortKey)
    url.searchParams.append('sortOrder', sortOrder)

    if(Object.keys(filterKeys).length > 0){
        Object.entries(filterKeys).forEach(([key,value])=>{
            if(value!==''){
                url.searchParams.append(key, value);
            }
        })
    }

    console.log(url)

    try{
        const response=await fetch(url)
        if(!response.ok){
            const errorMessage=await response.json()
            throw new Error(errorMessage)
        }
        const result=await response.json()
        return result

    }catch(error){
        throw error

    }
}

  
  

export const createMeaureUnit = async (data) => {
    const url = "http://192.168.1.9:3001/grocery/measureunit/create"
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
    const url = "http://192.168.1.9:3001/grocery/measureunit/createmany"
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
    const url = `http://192.168.1.9:3001/grocery/measureunit/delete/${id}`
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
    const url = `http://192.168.1.9:3001/grocery/measureunit/update/${id}`

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

export const fetchCategoriesSpecs = async ({ pageParam, sortKey, sortOrder, filterKeys, id }) => {
    const url = new URL(`http://192.168.1.9:3001/grocery/categoryspec/${id}`);
    url.searchParams.append('page', pageParam);
    url.searchParams.append('sortKey', sortKey);
    url.searchParams.append('sortOrder', sortOrder);

    // Append filter keys if they are present
    if (Object.keys(filterKeys).length > 0) {
        Object.entries(filterKeys).forEach(([key, value]) => {
            if (value !== '') {
                url.searchParams.append(key, value);
            }
        });
    }

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export const createSpecs = async (data) => {
    const url = "http://192.168.1.9:3001/grocery/categoryspec/create"

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

export const createManySpecs=async(data)=>{
    const url="http://localhost/grocery/specs/createmany"
    try{
        const response=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        if(!response.ok){
            const errorData=await response.json()
            throw new Error(errorData.error)
        }
        return await response.json()
    }catch(error){
        throw error
    }
}

export const deleteCategorySpecs = async (id) => {
    const url = `http://192.168.1.9:3001/grocery/categoryspec/delete/${id}`

    try {
        const response = await fetch(url, {
            method: 'DELETE',
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

export const updateCategorySpecs=async(id,data)=>{
    const url=`http://192.168.1.9:3001/grocery/categoryspec/update/${id}`
    try{
        const response=await fetch(url,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })

        if(!response.ok){
            const errorData=await response.json()
            throw new Error(errorData)
        }

        return await response.json()

    }catch(error){
        throw error

    }

}


export const fetchProducts = async ({ pageParam, sortKey, sortOrder, filterKeys }) => {

    const url = new URL('http://192.168.1.9:3001/grocery/product')
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

export const fetchProduct = async (id) => {
    const url=`http://localhost:3001/grocery/product?id=${id}`
    console.log("url")
    console.log(url)
    console.log("url")
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage=await response.json()
        throw new Error(json.stringify(errorMessage.error));
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
}

export const createProduct=async(data)=>{
    const url='http://localhost:3001/grocery/product/createProduct'
    console.log(data)

    try{
        const response=await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),

        })

        if(!response.ok){
            const errorMessage=await response.json()
            throw new Error(errorMessage.error)
        }
        const result=await response.json()
        console.log(result)
        return result

    }catch(error){
        throw error
    }

}

export const createProductVariation=async(data)=>{
    const url="http://localhost:3001/grocery/product/createVariation"

    try{
        const response=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })

        if(!response.ok){
            const errorMessage=await response.json()
            throw new Error(errorMessage.error)
        }
        const result=await response.json()
        return result

    }catch(error){
        throw error

    }
}




export const categoriesList = async ({ pageParam,sortKey, sortOrder, filterKeys }) => {
    const url = new URL('http://192.168.1.9:3001/grocery/categories');
    url.searchParams.append('page', pageParam);
    url.searchParams.append('sortKey', sortKey);
    url.searchParams.append('sortOrder', sortOrder);

    console.log(filterKeys)
    if (Object.keys(filterKeys).length > 0) {
        Object.entries(filterKeys).forEach(([key, value]) => {
            if (value !== '') {
                url.searchParams.append(key, value);
            }
        });
    }
    console.log(url)
    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error("Failed fetching categories list");
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        throw error;
    }
};

export const createCategory=async(data)=>{
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
            const errorMessage=await response.json()
            console.log(errorMessage)
            throw new Error(errorMessage.error);

        }
        const result=await response.json()
        return  result

    } catch (error) {
        throw error
    }

}

export const updateCategory=async (data,id)=>{
    try{
        const updateUrl=`http://localhost:3001/grocery/categories/update/${id}`
        const response=await fetch(updateUrl,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)    
        })
        if(!response.ok){
            const errorMessage=await response.json()
            throw new Error(errorMessage.error)
        }
        const result=await response.json()
        return result
    }catch(error){
        throw error

    }

}

export const fetchBrand=async ({ pageParam, sortKey, sortOrder, filterKeys })=>{
    const url=new URL('http://localhost:3001/grocery/brands')
    url.searchParams.append('page', pageParam);
    url.searchParams.append('sortKey', sortKey);
    url.searchParams.append('sortOrder', sortOrder); //

    
    if(Object.keys(filterKeys).length >0){
        Object.entries(filterKeys).forEach(([key,value])=>{
            if(value!==''){
                url.searchParams.append(key,value)
            }
        })
    }
    console.log("working tille here")
    try {
        const response = await fetch(url)
        console.log(response)
        if (!response.ok) {
            const errorMessage=await response.json()
            throw new Error(errorMessage.error)
        }
        const result = await response.json()
        console.log(result)
        return result
    
    } catch (error) {
        throw error
    
    }  
}

export const addBrand=async(data)=>{
    const url="http://localhost:3001/grocery/brands/addbrand"
    try{
        const response=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)

        })

        if(!response.ok){
            const errorMessage=await response.json()
            throw new Error(errorMessage.error)
        }
        const result=await response.json()
        return result
    }catch(error){
        throw error
    }

}

export const addBrands = async (brands) => {
    try {
      // Send POST request to the API endpoint
      const response = await fetch('http://localhost:3001/grocery/brands/addmanybrand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(brands),
      });
  
      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        // If response status is not OK, throw an error
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred while adding brands.');
      }
  
      // Parse the response JSON
      const data = await response.json();
      return data;
  
    } catch (error) {
      // Handle errors
      console.error('Error posting brands:', error);
      throw error;
    }
  };
  

export const fetchResource=async(endpoint,options={})=>{
    try{
        const response=await fetch(`http://localhost:3001/grocery/${endpoint}`,{
            ...options,
            headers:{
                'Content-Type':'application/json',
                ...options.headers,
            }
        })

        if(!response.ok){
            const errorMessage=await response.json()
            throw new Error(errorMessage.error)
        }

        const result=await response.json()
        return result

    }catch(error){
        throw error

    }

}

export const fetchData = async ({
    endpoint,
    queryParams = {},
    filterKeys = {},
    options = {},
  }) => {
    // Construct the URL with baseUrl and endpoint
    const url = new URL(endpoint,baseUrl);
  
    // Append query parameters to the URL
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.append(key, value);
      }
    });
  
    // Append filter keys to the URL
    Object.entries(filterKeys).forEach(([key, value]) => {
      if (value !== '') {
        url.searchParams.append(key, value);
      }
    });
  
    try {
      // Perform the fetch request
      const response = await fetch(url, {
        ...options, // Allow additional options like method, headers, body
      });
  
      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      // Parse and return the JSON response
      return await response.json();
    } catch (error) {
      // Handle errors
      console.error('Fetch error:', error);
      throw error;
    }
  };
  

