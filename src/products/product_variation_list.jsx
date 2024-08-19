import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductVariations } from "../api/api";

const ProductVariationList = ({ productId }) => {
  console.log("****************8");
  console.log(productId);
  console.log("****************8");
  const [variations, setVariations] = useState([]);
  const [variationName, setVariationName] = useState("");
  const [mrp, setMrp] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const navigate = useNavigate();

  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });

  const [filterKeys, setFilterKeys] = useState({
    id: "",
    productid: productId || "",
    name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    setFilterKeys((prevKeys) => ({
      ...prevKeys,
      productid: productId || "", // Update with the latest productId
    }));
  }, [productId]);

  const {
    data,
    isLoading,
    error,
    status,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["variations", sortConfig, filterKeys],
    queryFn: ({ pageParam = 1 }) =>
      fetchProductVariations({
        pageParam,
        sortKey: sortConfig.key,
        sortOrder: sortConfig.direction,
        filterKeys,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextPage : null,
  });
  useEffect(() => {
    if (status === "success" && data) {
      const variationsList = data.pages.flatMap((page) => page.data);
      setVariations(variationsList);
    }
  }, [status, data]);

  return (
    <>
      <div>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left text-gray-600">
                Variation Name
              </th>
              <th className="py-2 px-4 text-left text-gray-600">MRP</th>
              <th className="py-2 px-4 text-left text-gray-600">
                Selling Price
              </th>
              <th className="py-2 px-4 text-left text-gray-600">Discount</th>
              <th className="py-2 px-4 text-left text-gray-600">
                Available quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {variations.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="variationname"
                    value={item.name}
                    onChange={(e) => setVariationName(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="mrp"
                    value={item.mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="selling_price"
                    value={item.sellingprice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="discount"
                    value={item.discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="available_quantity"
                    value={"1"}
                    className="border border-gray-300 p-2 rounded"
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isLoading}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default ProductVariationList;
