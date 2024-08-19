import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTrash,
  faFilter,
  faPlus,
  faSave,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import LoadingModal from "../../components/modal/loading_modal";
import AttributeLookup from "../../components/categories/lookups/attribute_lookups";
import {
  addCategorySpec,
  deleteCategorySpec,
  updateCategorySpec,
} from "../../components/categories/side_effects/categories_with_parent_null";
import uploadImages from "../../firebase/upload_images";
import TextField from "../../utilities/textfield";
import TextFieldInList from "../../utilities/textfield_inlist";
import { useFetchCategoryWithIdQuery } from "../../store/api/api";
import CategorySpecTable from "../../tables/category_spec_table";
import MeasureunitLookup from "../../lookups/measureunit_lookup";
import MeasuringUnit from "../../measuringunit/measuringunit";
import MeasureLookup from "../../lookups/measureunit_lookup";
import CategorySpec from "./category_specs";
import { updateCategory } from "../../api/api";
import ErrorMessage from "../../utilities/error_box";
import ProgressIndicator from "../../utilities/show_progress_indicator";

const CategoryDetails = () => {
  const { id } = useParams();
  const {
    data,
    isSuccess: fetchIsSuccess,
    isLoading: fetchIsLoading,
    error: fetchError,
  } = useFetchCategoryWithIdQuery(id);

  const [attributeLookUp, setAttributeLookup] = useState(false);
  const [category, setCategory] = useState({});
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [specs, setSpecs] = useState([]);
  const [updatedItemsList, setUpdatedItemsList] = useState([]);
  const [selectedRowByLookUp, setSelectedRowByLookUp] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [images, setImages] = useState([]);
  const [measuringLookup, setMeasuringLookup] = useState(false);
  const [measureunit, setMeasureUnit] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (fetchIsSuccess && data) {
      setCategory(data);
      setTags(data.tags || []);
      setDescription(data.description);
      setSpecs(data.CategorySpec || []);
      setExistingImages(data.images);
    }
  }, [fetchIsSuccess, data]);

  console.log(data && data.tags);

  const attributeLookUpController = (rowitem) => {
    setSelectedRowByLookUp(rowitem);
    setAttributeLookup(true);
  };

  const tagsController = (e) => {
    setTags(e.target.value.split(","));
  };

  const descriptionController = (e) => {
    setDescription(e.target.value);
  };

  const selectAttributeFromLookUp = (selectedAttribute) => {
    setSpecs(
      specs.map((item) =>
        item.id === selectedRowByLookUp.id
          ? { ...item, attributename: selectedAttribute.attributename }
          : item
      )
    );
    setAttributeLookup(false);
  };

  const selectMeasureLookUpController = (rowitem) => {
    setSelectedRowByLookUp(rowitem);
    setMeasuringLookup(true);
  };

  const selectMeasureunitFromLookUp = (selectedMeasureunit) => {
    console.log(selectedMeasureunit);
    setSpecs(
      specs.map((item) =>
        item.id === selectedRowByLookUp.id
          ? { ...item, measureunitid: selectedMeasureunit.abbreviation }
          : item
      )
    );

    setMeasuringLookup(false);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const uploaded_image_url = [];

    try {
      if (images.length > 0) {
        for (let image of images) {
          const uploaded_image = await uploadImages(image);
          uploaded_image_url.push(uploaded_image);
        }

        if (uploaded_image_url.length > 0) {
          const data = { images: uploaded_image_url };
          const id = category.id;
          await updateCategory({ id, data });
        }
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }

    if (updatedItemsList.length > 0) {
      try {
        for (let item of Object.values(updatedItemsList)) {
          await updateCategorySpec(item);
        }
      } catch (error) {
        console.error("Error updating items:", error);
      }
    }

    if (specs.length > 0) {
      let resultData = [];
      try {
        for (let spec of specs) {
          console.log(spec.measureunitid);
          if (spec.isNew) {
            const specData = {};

            specData.attributename = spec.attributename;
            specData.categoryid = id;
            specData.measureunitid = spec.measureunitid;

            await addCategorySpec(specData);
          }
        }
      } catch (error) {
        console.error("Error adding specs:", error);
      }
    }
  };

  const updateCategoryHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images if any
      const uploaded_images_url =
        images.length > 0 ? await Promise.all(images.map(uploadImages)) : [];

      // Prepare the data object with only necessary properties
      const data = {
        ...(description && { description }),
        ...(tags?.length > 0 && { tags }),
        ...(uploaded_images_url.length > 0 && { images: uploaded_images_url }),
      };

      console.log(data);

      // Update the category with the prepared data
      const updatedCategory = await updateCategory(data, category.id);
      setCategory(updatedCategory);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "Something went wrong in saving the category. Please check the log."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    setImages((prev) => [...prev, ...fileList]);
  };

  const closeMeasuringunitLookup = () => {
    setMeasuringLookup(false);
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      {errorMessage && (
        <ErrorMessage
          content={errorMessage}
          onClose={() => {
            setErrorMessage(false);
          }}
        />
      )}
      {isLoading && <ProgressIndicator message="Saving Category" />}

      {attributeLookUp && (
        <LoadingModal>
          <AttributeLookup selectedItem={selectAttributeFromLookUp} />
        </LoadingModal>
      )}
      {measuringLookup && (
        <LoadingModal onClose={closeMeasuringunitLookup}>
          <MeasureLookup selectItem={selectMeasureunitFromLookUp} />
        </LoadingModal>
      )}
      <form onSubmit={updateCategoryHandler}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Category Details
          </h1>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Save
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <TextField
              name="Name"
              value={category.name}
              readOnly
              className="flex-1"
            />
            <TextField
              name="Description"
              value={category.description}
              className="flex-1"
              onChange={descriptionController}
            />
          </div>

          <div className="space-y-6">
            <TextField
              name="Hierarchy"
              value={category.path}
              readOnly
              className="mt-4"
            />
            <label htmlFor="tags" className="block mb-2 text-gray-500">
              Tags
            </label>
            <textarea
              value={tags.join(",")} // Use `tags` state here
              onChange={tagsController}
              id="tags"
              rows="3"
              className="block w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600"
              placeholder="Type tags separated by commas"
            />
          </div>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          Upload Images
        </h2>
        <div className="flex flex-wrap mt-2 space-x-2">
          <div className="w-48 h-48 mb-4">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="flex flex-wrap space-x-2">
            {existingImages.map((image, index) => (
              <div key={index} className="relative w-48 h-48 mb-4">
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover border border-gray-400 rounded-md"
                />
                <button
                  onClick={() =>
                    setExistingImages(
                      existingImages.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}

            {images.map((image, index) => (
              <div key={index} className="relative w-48 h-48 mb-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover border border-gray-400 rounded-md"
                />
                <button
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>

      <div className="mb-8">
        <div className="text-lg font-semibold text-gray-800 mb-4">
          Category Specification
        </div>
        <CategorySpec categoryid={id} />
      </div>
    </div>
  );
};

export default CategoryDetails;
