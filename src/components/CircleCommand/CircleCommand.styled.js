import { Box } from "@mui/material";
import styled from "styled-components";
import selectedTheme from "../../themes";

export const CircleCommandContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    border-radius: 100%;
    background-color: ${selectedTheme.colors.circleColorBackground};
    width: 50px;
    height: 50px;
    padding-top: 2.5px;
    cursor: pointer;
`