import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  addProductVariation,
  fetchProductVariationById,
} from "./product_sideeffects/product_side_effects";

const UpdateProductVariation = () => {
  const { id } = useParams();

  const { data: variationDetails, status } = useQuery({
    queryKey: ["productVariationById", id],
    queryFn: () => fetchProductVariationById(id),
  });
  const [variation, setVariation] = useState({});
  const [variationName, setVariationName] = useState("");
  const [variationDescription, setVariationDescription] = useState("");

  useEffect(() => {
    if (status === "success" && variationDetails) {
      setVariation(variationDetails);
    }
  }, [status, variationDetails]);

  const variationNameController = (e) => setVariationName(e.target.value);
  const variationDescriptionController = (e) =>
    setVariationDescription(e.target.value);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // Implementation for form submission
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Product Variation Details
      </h2>
      <form onSubmit={formSubmitHandler} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <input
              type="text"
              value={id}
              readOnly
              className="peer h-12 w-full border border-gray-300 bg-gray-100 text-gray-700 rounded-md px-3 focus:border-blue-600 focus:outline-none"
            />
            <label className="absolute left-3 -top-3.5 text-gray-500 bg-white px-1 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-blue-600">
              Product ID
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={variation?.product?.category}
              name="categoryDescription"
              className="peer h-12 w-full border border-gray-300 bg-gray-100 text-gray-700 rounded-md px-3 focus:border-blue-600 focus:outline-none"
            />
            <label className="absolute left-3 -top-3.5 text-gray-500 bg-white px-1 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-blue-600">
              Category Description
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              value={variation.name}
              onChange={variationNameController}
              className="peer h-12 w-full border border-gray-300 bg-transparent text-gray-700 rounded-md px-3 focus:border-blue-600 focus:outline-none"
            />
            <label className="absolute left-3 -top-3.5 text-gray-500 bg-white px-1 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-blue-600">
              Product Variation Name
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              value={variation.description}
              onChange={variationDescriptionController}
              className="peer h-12 w-full border border-gray-300 bg-transparent text-gray-700 rounded-md px-3 focus:border-blue-600 focus:outline-none"
            />
            <label className="absolute left-3 -top-3.5 text-gray-500 bg-white px-1 transition-all transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-blue-600">
              Description
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Add Variation
        </button>
      </form>
      <h3 className="text-xl font-bold mt-10 mb-4 text-gray-800">
        Specifications
      </h3>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left text-gray-600">
              Attribute Name
            </th>
            <th className="py-2 px-4 text-left text-gray-600">ALNVALUE</th>
            <th className="py-2 px-4 text-left text-gray-600">NUMVALUE</th>
          </tr>
        </thead>
        <tbody>
          {variation?.ProductSpecs?.map((spec) => (
            <tr key={spec.id} className="border-b">
              <td className="py-2 px-4">
                <input
                  name="attributename"
                  value={spec.attributename}
                  type="text"
                  readOnly
                  className="w-full px-3 py-1 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                />
              </td>
              <td className="py-2 px-4">
                <input
                  name="alnvalue"
                  value={spec.alnvalue}
                  type="text"
                  readOnly={spec.attribute.datatype !== "ALN"}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-md ${
                    spec.attribute.datatype !== "ALN"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-white"
                  }`}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  name="numvalue"
                  value={spec.numvalue}
                  type="text"
                  readOnly={spec.attribute.datatype !== "NUMERIC"}
                  className={`w-full px-3 py-1 border border-gray-300 rounded-md ${
                    spec.attribute.datatype !== "NUMERIC"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-white"
                  }`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        Add Specification
      </button>
    </div>
  );
};

export default UpdateProductVariation;
