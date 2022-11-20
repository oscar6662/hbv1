import styled, { css } from "styled-components";
import { colors } from "../Colors/colors";

type FlexDivProps = {
  column?: boolean;
  backgroundColor?: string;
  dropShadowBelow?: boolean;
  gap?:number;
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
  marginAuto?:boolean;
  alignCenter?:boolean;
  justifyCenter?:boolean;
  alignStart?:boolean;
  alignEnd?:boolean;
  justifyEnd?:boolean;
  fullWidth?:boolean;
  fullHeight?:boolean;
  link?:boolean;
  width?:number;
  height?:number;
  maxWidth?:number;
  maxWidthPercentage?:number;
  minWidth?:number;
  margin?:number;
  minHeight?:number;
  maxHeight?:number;
  borderRadius?:number;
  borderBottom?: string;
  borderRight?: string;
  borderTop?: string;
  border?: string;
};

export const FlexDiv = styled.div<FlexDivProps>`
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  ${(props) =>
    props.backgroundColor &&
    css`
      background: ${props.backgroundColor};
    `}
  ${(props) =>
    props.dropShadowBelow &&
    css`
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1),
        0px 4px 24px rgba(29, 30, 29, 0.1);
    `}
    ${(props) =>
    props.padding &&
    css`
      padding: ${props.padding}px;
    `}
    ${(props) =>
    props.py &&
    css`
      padding-top: ${props.py}px;
      padding-bottom: ${props.py}px;
    `}
    ${(props) =>
    props.px &&
    css`
      padding-left: ${props.px}px;
      padding-right: ${props.px}px;
    `}
    ${(props) =>
    props.pt &&
    css`
      padding-top: ${props.pt}px;
    `}
    ${(props) =>
    props.pr &&
    css`
      padding-right: ${props.pr}px;
    `}
    ${(props) =>
    props.pb &&
    css`
      padding-bottom: ${props.pb}px;
    `}
    ${(props) =>
    props.pl &&
    css`
      padding-left: ${props.pl}px;
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
    props.mr &&
    css`
      margin-right: ${props.mr}px;
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
    props.marginAuto &&
    css`
      margin: auto;
    `}
    ${(props) =>
    props.alignCenter &&
    css`
      align-items: center;
    `}
    ${(props) =>
    props.justifyCenter &&
    css`
      justify-content: center;
    `}
    ${(props) =>
    props.alignStart &&
    css`
      align-items: flex-start !important;
    `}
    ${(props) =>
    props.alignEnd &&
    css`
      align-items: flex-end !important;
    `}
    ${(props) =>
    props.justifyEnd &&
    css`
      justify-content: flex-end;
    `}
    
    ${(props) =>
    props.column &&
    css`
      flex-direction: column;
    `}
    
    ${(props) =>
    props.width &&
    css`
      width: ${props.width}px;
    `}
        ${(props) =>
    props.height &&
    css`
      height: ${props.height}px;
    `}
    ${(props) =>
    props.maxWidth &&
    css`
      max-width: ${props.maxWidth}px;
    `}
    ${(props) =>
    props.maxWidthPercentage &&
    css`
      max-width: ${props.maxWidthPercentage}%;
    `}
    ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
    ${(props) =>
    props.minWidth &&
    css`
      min-width: ${props.minWidth}px;
    `}
        
    ${(props) =>
    props.height &&
    css`
      height: ${props.height}px;
    `}
    
    ${(props) =>
    props.maxHeight &&
    css`
      max-height: ${props.maxHeight}px;
    `}
        
    ${(props) =>
    props.minHeight &&
    css`
      min-height: ${props.minHeight}px;
    `}
    ${(props) =>
    props.fullHeight &&
    css`
      height: 100%;
    `}
    ${(props) =>
    props.borderBottom &&
    css`
      border-bottom: 1px solid ${colors.heavyMetalLight};
    `}
    ${(props) =>
    props.borderTop &&
    css`
      border-top: 1px solid ${colors.heavyMetalLight};
    `}
    ${(props) =>
    props.borderRight &&
    css`
      border-right: 1px solid ${colors.heavyMetalLight};
    `}
        
    ${(props) =>
    props.border &&
    css`
      border: 1px solid ${colors.heavyMetalLight};
      border-radius: 2px;
    `}
    ${(props) =>
    props.borderRadius &&
    css`
      border-radius: ${props.borderRadius}px;
    `}
    ${(props) =>
    props.link &&
    css`
      cursor: pointer;
    `}
    ${(props) =>
      props.gap &&
      css`
        gap: ${props.gap}px;
      `}
`;

export const SpaceBetweenDiv = styled(FlexDiv)`
  justify-content: space-between;
  align-items: center;
`;
