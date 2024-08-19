import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentScreen } from "../../store/slice/screen_State";

import CategoryListTable from "./categories_table_view.jsx/category_list_table";

const CategoryList = (props) => {
  const dispatch = useDispatch();
  dispatch(setCurrentScreen("category-list"));

  const [mobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="w-full p-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-128">
        <CategoryListTable />
      </div>
    </div>
  );
};

export default CategoryList;
