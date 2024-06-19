import React from "react";

const TextFieldInList = (props) => {
    const { name, readOnly, value, onChange, ccClassName, tclassName, lclassName } = props;

    return (
        <div className={`relative ${ccClassName}`}>
            <input
                placeholder=" "
                value={value}
                readOnly={readOnly}
                onChange={onChange}
                className={`"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" ${tclassName}`}
            />
            <label
                className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${lclassName}`}
            >
                {name}
            </label>
        </div>
    );
};

export default TextFieldInList;
