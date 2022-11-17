import styled, { css } from 'styled-components';
import { colors } from '../Colors/colors';
const primaryColor = '#20A26B';

const Heading = styled.span`
    color: ${colors.heavyMetal};
    line-height: normal;
    padding: 0;
    margin: 0;
    font-weight: 700;
    ${(props:any) =>
        props.center &&
        css`
            text-align: center;
        `}
    ${(props:any) =>
        props.theme.darkMode && !props.dontTheme &&
        css`
            color: ${colors.dark10};
        `}
    ${(props:any) =>
        props.regular &&
        css`
            font-weight: 400;
        `}
    ${(props:any) =>
        props.bold &&
        css`
            font-weight: 700 !important;
        `}
    ${(props:any) =>
        props.themed &&
        css`
            color: ${primaryColor};
        `}
    ${(props:any) =>
        props.color &&
        css`
            color: ${(props:any) => props.color};
        `}
    ${(props:any) =>
        props.lighter &&
        css`
            opacity: 0.6;
        `}
    ${(props:any) =>
        props.margin &&
        css`
            margin: ${props.margin}px;
        `}
    ${(props:any) =>
        props.my &&
        css`
            margin-top: ${props.my}px;
            margin-bottom: ${props.my}px;
        `}
    ${(props:any) =>
        props.mx &&
        css`
            margin-left: ${props.mx}px;
            margin-right: ${props.mx}px;
        `}
    ${(props:any) =>
        props.mt &&
        css`
            margin-top: ${props.mt}px;
        `}
    ${(props:any) =>
        props.mr &&
        css`
            margin-right: ${props.mr}px;
        `}
    ${(props:any) =>
        props.mb &&
        css`
            margin-bottom: ${props.mb}px;
        `}
    ${(props:any) =>
        props.ml &&
        css`
            margin-left: ${props.ml}px;
        `}
    
    ${(props:any) =>
        props.link &&
        css`
            cursor: pointer;
        `}
    ${(props:any) =>
        props.maxWidth &&
        css`
            max-width: ${props.maxWidth}px;
        `}
`;

// titles only
export const Heading1 = styled(Heading)`
    font-size: 24px;
`;

// card titles
export const Heading2 = styled(Heading)`
    font-size: 20px;
    font-weight: 800;
`;

// inside cards
export const Heading3 = styled(Heading)`
    font-size: 16px;
`;

// smallest heading
export const Heading4 = styled(Heading)`
    font-size: 14px;
`;
