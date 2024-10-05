import React, { useEffect, useState } from "react";
import { Table, TableCell, TableRow, TableHead, TableBody, makeStyles, Button } from "@material-ui/core";
import { deleteUser, getallUsers } from "../service/api";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
    table: {
        width: "80%",
        margin: "50px 100px 100px 140px",
    },
    thead: {
        "& > *": {
            background: "#000000",
            color: "#FFFFFF",
            fontSize: "16px",
        },
    },
    trow: {
        "& > *": {
            fontSize: "16px",
        },
    },
});

const AllUsers = () => {
    const classes = useStyle();

    const [user, setUser] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await getallUsers();
        console.log(response);
        setUser(response.data);
    };

    const deleteData = async (id) => {
        await deleteUser(id);
        getUsers();
    };

    return (
        <Table className={classes.table}>
            {/* 1. 데이터를 id 제외하고 firstname, lastname, email, phonenumber, gender, country로 6개 입력 및 관리하게 함 */}
            {/* 2. id값은 고유함, 그래서 앞 순서가 삭ㅈ가 된 경우 numbering애 구멍이 생기는 경우가 생김, 따라서 순서 나열을 index로 해주는 것 추가 */}
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell></TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>FirstName</TableCell>
                    <TableCell>LastName</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {user.map((data, index) => (
                    <TableRow className={classes.trow} key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.firstname}</TableCell>
                        <TableCell>{data.lastname}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>{data.phone}</TableCell>
                        <TableCell>{data.gender}</TableCell>
                        <TableCell>{data.country}</TableCell>
                        <TableCell>
                            {/* 3. edit button의 크기를 delete button의 크기와 동일하게 맞춰줌*/}
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: "0px 20px", width: "88px" }}
                                component={Link}
                                to={`/edit/${data.id}`}
                            >
                                Edit
                            </Button>
                            {/* 4. button label을 cancle에서 delete로 바꿈으로써 버튼의 기능을 직관적으로 명시 */}
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ margin: "0px 20px" }}
                                onClick={() => deleteData(data.id)}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AllUsers;
