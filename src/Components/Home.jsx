import React from "react";
import { Container, Typography } from "@material-ui/core";
import styled from "styled-components";
// 6. styled components 적용, Typography 의 variant값 조정 및 가운데 정렬햣
const BoxDiv = styled.div`
    margin: 40px 0;
    height: 80vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Home = () => {
    return (
        <Container maxWidth="lg">
            <BoxDiv>
                <Typography variant="h1" component="h1">
                    React JS Crud
                </Typography>
                <Typography variant="h2" component="h2">
                    Using Mock API
                </Typography>
            </BoxDiv>
        </Container>
    );
};

export default Home;
