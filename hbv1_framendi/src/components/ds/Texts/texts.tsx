import styled, { css } from "styled-components";
import { colors } from "../Colors/colors";

type TextProps = {
    bold?:boolean;
    extraBold?:boolean;
    underline?:boolean;
    lighter?:boolean;
    center?:boolean;
    italic?:boolean;
    error?:boolean;
    link?:boolean;
    themed?:boolean;
    padding?: number;
    py?: number;
    px?:number;
    pt?:number;
    pr?:number;
    pb?:number;
    pl?:number;
    my?: number;
    mx?:number;
    mt?:number;
    mr?:number;
    mb?:number;
    ml?:number;
    margin?:number;
    color?:string;

};

const Text = styled.span<TextProps>`
  font-weight: 400;
  color: ${colors.heavyMetal};
  padding: 0;
  margin: 0;
  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}
  ${(props) =>
    props.bold &&
    css`
      font-weight: 700;
    `}
    ${(props) =>
    props.extraBold &&
    css`
      font-weight: 800;
    `}
    ${(props) =>
    props.underline &&
    css`
      text-decoration: underline;
    `}
    
    ${(props) =>
    props.italic &&
    css`
      font-style: italic;
    `}
    
    ${(props) =>
    props.lighter &&
    css`
      opacity: 0.6;
    `}
    ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
    
    ${(props) =>
    props.themed &&
    css`
      color: ${colors.heavyMetal};
    `}
    
    ${(props) =>
    props.error &&
    css`
      color: ${colors.error};
    `}
    ${(props) =>
    props.padding &&
    css`
      padding: ${props.padding}px;
    `}
    ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin}px;
    `}
    ${(props) =>
    props.my &&
    css`
      margin-top: ${props.my}px;
      margin-bottom: ${props.my}px;
    `}
    ${(props) =>
    props.mx &&
    css`
      margin-left: ${props.mx}px;
      margin-right: ${props.mx}px;
    `}
    ${(props) =>
    props.mt &&
    css`
      margin-top: ${props.mt}px;
    `}
    ${(props) =>
    props.mb &&
    css`
      margin-bottom: ${props.mb}px;
    `}
    ${(props) =>
    props.ml &&
    css`
      margin-left: ${props.ml}px;
    `}
    ${(props) =>
    props.mr &&
    css`
      margin-right: ${props.mr}px;
    `}
    ${(props) =>
    props.link &&
    css`
      cursor: pointer;
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
