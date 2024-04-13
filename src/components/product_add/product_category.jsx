import { useState } from "react"
import SelectCategoryImage from "./select_category_image"
import { storage } from "../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import Modal from "../modal/modal";
import Loader from "../loader/loader";



const Category = () => {

    const [categoryName, setCategoryName] = useState("")
    const [categoryDescription, setCategoryDescription] = useState("")
    const [categoryParent, setCategoryParent] = useState("")
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, showError] = useState(false)
    const [categoryList, setCategoryList] = useState([])


    const upload = async (image) => {
        if (image == null) {
            return

        }
        const storageRef = ref(storage, `yellowgrocery/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        try {
            // Listen for state changes
            uploadTask.on("state_changed", (snapshot) => {
                console.log(snapshot);
            });

            await uploadTask;
            // Once upload is complete, get the download URL
            const url = await getDownloadURL(uploadTask.snapshot.ref);

            return url

        } catch (error) {
            // Handle any errors that occur during the upload or URL retrieval
            if (error) {
                setLoading(false)
                showError(true)

            }
        } finally {
            setLoading(false);
        }
    }



    const categoryNameController = (e) => {
        setCategoryName(e.target.value)

    }
    const categoryDescriptionCOntroller = (e) => {
        setCategoryDescription(e.target.value)
    }

    const categoryParentController = (e) => {
        setCategoryParent(e.target.value)
    }

    const categoryImageController = (e) => {
        const fileList = Array.from(e.target.files); // Convert FileList to array
        setImages(prev => [...prev, ...fileList]); // Append all selected files to images state
    };

    const saveCategory = async (jsonData) => {
        try {
            const response = await fetch('http://localhost:3001/grocery/categories/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            if (!response.ok) {

                showError("cannot create category record")
            }
        } catch (error) {
            if (error) {
                console.log(error)
                showError(true)
            }
        }

    }
    const fetchCategory = async () => {
        try {
            // Make an API call to fetch data
            const response = await fetch('http://localhost:3001/grocery/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();

            console.log(jsonData)

            let c = jsonData.map((item) => item.name)
            console.log(c)

        } catch (error) {
            // Handle errors
            setError(error.message);
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchCategory()
    //     return () => {

    //     }
    // }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        //get all the image list
        const image_url_list = []

        setLoading(true)
        //upload all the selected images
        for (let image of images) {
            //app loading state started
            setLoading(true)
            let url = await upload(image)
            image_url_list.push(url)
        }

        let urls = image_url_list.join(',')

        //prepare the json data
        const json_data = {
            "name": categoryName,
            "description": categoryDescription,
            "images": images
        }
        //call saveCategory function
        saveCategory(json_data)
        setLoading(false)

        !error && alert("Category record created successfully")

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex-flex-col items-start w-3/4 mx-2 my-5">


                    <div>
                        <h2 className="bg-gray-200">Slect Category</h2>
                    </div>
                    {loading && <Modal className="px-2 py-2 rounded-md  w-36 drop-shadow-lg bg-red-400 z-30">
                        <div className="flex flex-row items-center">
                            <Loader />
                            <h1 className="ml-4">Saving</h1>

                        </div>

                    </Modal>
                    }
                    {error && <Modal className="px-2 py-2 rounded-md  w-36 drop-shadow-lg bg-red-400 z-30">
                        <div className="flex flex-row items-center">

                            <h1 className="ml-4">Some thing went wrong please try again</h1>

                        </div>

                    </Modal>
                    }


                    <div className="flex flex-row">
                        <div className="mb-5 mx-2 py-2">

                            <label htmlFor="categoryname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Name</label>
                            <input type="text" id="categoryname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category Name" required
                                onChange={categoryNameController} />
                        </div>
                        <div className="mb-5 mx-2 py-2">
                            <label htmlFor="categorydescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Description</label>
                            <input type="text" id="categorydescription" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category Description"
                                onChange={categoryDescriptionCOntroller}
                            />
                        </div>
                        <div className="mb-5 mx-2 py-2">
                            <label htmlFor="selectparent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Parent</label>
                            <input type="hidden" id="selectparent" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select Parent"
                                onChange={categoryParentController}
                            />
                            <button type="button" class="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2" onClick={fetchCategory}>

                                Select Category
                            </button>
                        </div>
                        {/* <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div> */}
                    </div>
                    <div className="flex flex-row">
                        {images.length > 0 && images.map((item, index) => (
                            <img key={index} src={URL.createObjectURL(item)} alt={`Image ${index}`} className="w-8 h-8" />
                        ))}

                    </div>




                    <div>
                        <SelectCategoryImage onChange={categoryImageController} />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-2 my-2">Submit</button>


                </div>
            </form>

        </>)
}

export default Category