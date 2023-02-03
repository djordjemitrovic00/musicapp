import styled from "styled-components";
import {ReactComponent as MusicDiscSvg} from "../../assets/images/svg/disc.svg";
import selectedTheme from "../../themes";

export const MusicDiscContainer = styled(MusicDiscSvg)`
    & path {
        fill: ${props => selectedTheme.colors.disc[props?.discColor]};
    }
`