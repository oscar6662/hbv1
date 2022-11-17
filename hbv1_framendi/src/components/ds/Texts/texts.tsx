import styled, { css } from 'styled-components';
import { colors } from '../Colors/colors';
const primaryColor = colors.dark1;

const Text = styled.span`
    font-weight: 400;
    color: ${colors.heavyMetal};
    padding: 0;
    margin: 0;
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
        props.bold &&
        css`
            font-weight: 700;
        `}
    ${(props:any) =>
        props.extraBold &&
        css`
            font-weight: 800;
        `}
    ${(props:any) =>
        props.underline &&
        css`
            text-decoration: underline;
        `}
    
    ${(props:any) =>
        props.italic &&
        css`
            font-style: italic;
        `}
    
    ${(props:any) =>
        props.lighter &&
        css`
            opacity: 0.6;
        `}
    ${(props:any) =>
        props.color &&
        css`
            color: ${(props:any) => props.color};
        `}
    
    ${(props:any) =>
        props.themed &&
        css`
            color: ${primaryColor};
        `}
    
    ${(props:any) =>
        props.error &&
        css`
            color: ${colors.error};
        `}
    
    ${(props:any) =>
        props.flex &&
        css`
            display: flex;
        `}
    ${(props:any) =>
        props.padding &&
        css`
            padding: ${props.padding}px;
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
        props.mr &&
        css`
            margin-right: ${props.mr}px;
        `}
    
    ${(props:any) =>
        props.airy &&
        css`
            margin-right: 4px;
        `}
    ${(props:any) =>
        props.link &&
        css`
            cursor: pointer;
        `}
    ${(props:any) =>
        props.uppercase &&
        css`
            text-transform: uppercase;
        `}
    ${(props:any) =>
        props.cutLongText &&
        css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `}
    ${(props:any) =>
        props.maxWidth &&
        css`
            max-width: ${props.maxWidth}px;
        `}
    ${(props:any) =>
        props.backgroundColor &&
        css`
            background: ${props.backgroundColor};
        `}
    ${(props:any) =>
        props.borderRadius &&
        css`
            border-radius: ${props.borderRadius}px;
        `}
    ${(props:any) =>
        props.desktopOnly &&
        css`
            @media (max-width: 992px) {
                display: none !important;
            }
        `}
    ${(props:any) =>
        props.mobileOnly &&
        css`
            display: none;
            @media (max-width: 992px) {
                display: initial;
            }
        `}
`;

// Text / Lead
export const TextLead = styled(Text)`
    font-size: 16px;
`;

// Text / Default
export const TextDefault = styled(Text)`
    font-size: 14px;
`;

// Text / Tiny (2nd line, or small widgets)
export const TextTiny = styled(Text)`
    font-size: 13px;
`;

// Text / Label
export const TextLabel = styled(Text)`
    font-size: 11px;
`;