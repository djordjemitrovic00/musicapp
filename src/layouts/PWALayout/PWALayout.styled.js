import { Box } from "@mui/material";
import styled from "styled-components";

export const PWALayoutContainer = styled(Box)`
    width: 400px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    @media (max-width: 600px) {
        width: 100%;
    }
`