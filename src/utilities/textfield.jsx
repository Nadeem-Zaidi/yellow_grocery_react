import React from "react";

const TextField = ({
  type = "text",
  name,
  readOnly = false,
  value = "",
  onChange,
  ccClassName = "",
  tclassName = "",
  lclassName = "",
}) => {
  return (
    <div>
      <div className={`relative ${ccClassName}`}>
        <input
          type={type}
          placeholder=""
          value={value}
          readOnly={readOnly}
          onChange={onChange}
          className={`peer h-12 w-full border-b mt-2 border-gray-300 bg-transparent text-gray-700 placeholder-transparent focus:border-focus-blue focus:outline-none ${tclassName}`}
        />
        <label
          className={`absolute left-0 -top-3.5 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-blue-600 ${lclassName}`}
        >
          {name}
        </label>
      </div>
    </div>
  );
};

export default TextField;

// import React from "react";

// const TextField = ({
//   type = "text",
//   name,
//   readOnly = false,
//   value = "",
//   onChange,
//   ccClassName = "",
//   tclassName = "",
//   lclassName = "",
// }) => {
//   return (
//     <div className={`relative ${ccClassName}`}>
//       <input
//         type={type}
//         placeholder=" "
//         value={value}
//         readOnly={readOnly}
//         onChange={onChange}
//         className={`peer block w-full py-5  px-1 left-0 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 dark:bg-gray-700  dark:border-gray-200 dark:text-white ${tclassName}`}
//       />
//       <label
//         className={`absolute top-1  left-3 text-gray-500 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-1 peer-focus:text-blue-500 peer-focus:scale-75 ${lclassName}`}
//       >
//         {name}
//       </label>
//     </div>
//   );
// };

// export default TextField;
