import React from "react";

const TextField = (props) => {
    const { name, readOnly, value, onChange, ccClassName, tclassName, lclassName } = props;

    return (
        <div>
            <div className={`relative ${ccClassName}`}>
                <input
                    placeholder=""
                    value={value}
                    readOnly={readOnly}
                    onChange={onChange}
                    className={`peer h-12 w-full border-b mt-4 border-gray-300 bg-transparent text-gray-700 placeholder-transparent focus:border-focus-blue focus:outline-none ${tclassName}`}
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
