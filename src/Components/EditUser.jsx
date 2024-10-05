import React, { useEffect, useState, useCallback } from "react";
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button } from "@material-ui/core";
import { editUser, getallUsers } from "../service/api";
import { useHistory, useParams } from "react-router-dom";

const initialValue = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
};

const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    const { firstname, lastname, email, phone, gender, country } = user;
    const { id } = useParams();
    const history = useHistory();

    const loadUserData = useCallback(async () => {
        const response = await getallUsers(id);
        setUser(response.data);
    }, [id]);

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    };

    const editUserDetails = async () => {
        await editUser(id, user);
        history.push("/all");
    };

    return (
        <Container maxWidth="sm">
            <Box my={5}>
                <Typography variant="h5" align="center">
                    Update User Details
                </Typography>
                <FormGroup>
                    <FormControl>
                        <InputLabel>Name</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name="firstname" value={firstname} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>User Name</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name="username" value={lastname} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Email address</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name="email" value={email} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Phone Number</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name="phone" value={phone} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Gender</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name="gender" value={gender} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Country</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name="country" value={country} />
                    </FormControl>
                    <Box my={3}>
                        <Button variant="contained" onClick={() => editUserDetails()} color="primary" align="center">
                            Update User
                        </Button>
                        <Button
                            onClick={() => history.push("/all")}
                            variant="contained"
                            color="secondary"
                            align="center"
                            style={{ margin: "0px 20px" }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </FormGroup>
            </Box>
        </Container>
    );
};

export default EditUser;
