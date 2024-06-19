

const AppTable = (props) => {

    return <>
        <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    {props.header.map((item) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{item}</th>)}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {props.children}
            </tbody>
        </table>
    </>
}