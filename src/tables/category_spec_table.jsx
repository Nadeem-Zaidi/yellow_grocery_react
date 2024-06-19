import { Checkbox } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const CategorySpecTable = (props) => {
    console.log(props.data)
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                        {props.columns.length > 0 && props.columns.map((item, index) => (
                            <TableCell key={index}>
                                {item}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.length > 0 && props.data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell>
                                {row.categoryid}
                            </TableCell>
                            <TableCell>
                                {row.attributename}
                            </TableCell>
                            <TableCell>
                                {row.measureUnitId}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default CategorySpecTable;
