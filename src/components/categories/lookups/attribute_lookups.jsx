import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllAttributes } from "../../../attributes/attributes_side_effect/attribute_side_effects";

const AttributeLookup = (props) => {
    const [attributes, setAttributes] = useState([]);
    const { data, status, error, refetch } = useQuery({ queryKey: ["attributes"], queryFn: fetchAllAttributes });

    useEffect(() => {
        if (status === "success" && data) {
            setAttributes(data);
        }
    }, [status, data]);

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attribute Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Type</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {attributes.map((item) => {
                    return (
                        <tr key={item.id} onClick={() => props.selectedItem(item)}> {/* Assuming each item has a unique id */}
                            <td className="px-6 py-4 whitespace-nowrap">{item.attributename}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.datatype}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default AttributeLookup;
