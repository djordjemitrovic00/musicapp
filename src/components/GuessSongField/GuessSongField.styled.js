import { Box } from "@mui/material";
import styled from "styled-components";
import {ReactComponent as Melody} from "../../assets/images/svg/melody.svg"
import {ReactComponent as Eye} from "../../assets/images/svg/eye.svg"
import TextField from "../TextField/TextField";

export const GuessSongFieldContainer = styled(Box)`
    display: flex;
    gap: 8px;
`
export const MelodyIcon = styled(Melody)`
    width: 22px;
    height: 22px;
`
export const EyeIcon = styled(Eye)`
    width: 22px;
    height: 22px;
`
export const GuessTextField = styled(TextField)`
    flex: 1;
`