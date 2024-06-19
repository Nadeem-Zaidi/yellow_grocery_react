import TextField from "../utilities/textfield"

const Attribute = () => {
    const [attributeName, setAttributeName] = useState("")
    const [description, setDescription] = useState("")
    const [dataType, setDataType] = useState("")

    const attributeNameInputController = (e) => {
        setAttributeName(e.target.value)

    }

    const descriptionInputController = (e) => {
        setDescription(e.target.value)

    }

    const dataTypeInputController = (e) => {
        setDataType(e.target.value)

    }


    return (
        <>
            <h2>Add Attributes</h2>
            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-8">
                    <TextField name="Attribute Name" value={attributeName} onChange={attributeNameInputController} />
                    <TextField name="Description" value={description} onChange={descriptionInputController} />
                    <TextField name="Data Type" value={dataType} onChange={dataTypeInputController} />
                </div>

            </div>
            <button className="bg-primary hover:bg-primary-light rounded-md">Save</button>
        </>
    )

}