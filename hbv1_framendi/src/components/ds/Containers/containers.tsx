import styled, { css } from 'styled-components';
import { colors } from '../Colors/colors';

export const FlexDiv = styled.div`
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    ${(props:any) =>
        props.backgroundColor &&
        css`
            background: ${props.backgroundColor};
        `}
    ${(props:any) =>
        props.dropShadowBelow &&
        css`
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.04),
                0px 4px 24px rgba(29, 30, 29, 0.04);
        `}
    ${(props:any) =>
        props.dropShadowAbove &&
        css`
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08),
                0px 4px 24px rgba(29, 30, 29, 0.08);
        `}
    ${(props:any) =>
        props.noWrap &&
        css`
            flex-wrap: nowrap;
        `}
    ${(props:any) =>
        props.padding &&
        css`
            padding: ${props.padding}px;
        `}
    ${(props:any) =>
        props.py &&
        css`
            padding-top: ${props.py}px;
            padding-bottom: ${props.py}px;
        `}
    ${(props:any) =>
        props.px &&
        css`
            padding-left: ${props.px}px;
            padding-right: ${props.px}px;
        `}
    ${(props:any) =>
        props.pt &&
        css`
            padding-top: ${props.pt}px;
        `}
    ${(props:any) =>
        props.pr &&
        css`
            padding-right: ${props.pr}px;
        `}
    ${(props:any) =>
        props.pb &&
        css`
            padding-bottom: ${props.pb}px;
        `}
    ${(props:any) =>
        props.pl &&
        css`
            padding-left: ${props.pl}px;
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
        props.marginAuto &&
        css`
            margin: auto;
        `}
    
    ${(props:any) =>
        props.alignCenter &&
        css`
            align-items: center;
        `}
    ${(props:any) =>
        props.alignStretch &&
        css`
            align-items: stretch !important;
        `}
    ${(props:any) =>
        props.justifyCenter &&
        css`
            justify-content: center;
        `}
    
    ${(props:any) =>
        props.alignStart &&
        css`
            align-items: flex-start !important;
        `}
    ${(props:any) =>
        props.alignEnd &&
        css`
            align-items: flex-end !important;
        `}
    ${(props:any) =>
        props.justifyEnd &&
        css`
            justify-content: flex-end;
        `}
    
    ${(props) =>
        props.column &&
        css`
            flex-direction: column;
        `}
    
    ${(props:any) =>
        props.width &&
        css`
            width: ${props.width}px;
        `}
        ${(props:any) =>
        props.height &&
        css`
            height: ${props.height}px;
        `}
    ${(props:any) =>
        props.maxWidth &&
        css`
            max-width: ${props.maxWidth}px;
        `}
    ${(props:any) =>
        props.maxWidthPercentage &&
        css`
            max-width: ${props.maxWidthPercentage}%;
        `}
    ${(props:any) =>
        props.fullWidth &&
        css`
            width: 100%;
        `}
    ${(props:any) =>
        props.minWidth &&
        css`
            min-width: ${props.minWidth}px;
        `}
        
    ${(props:any) =>
        props.height &&
        css`
            height: ${props.height}px;
        `}
    
    ${(props:any) =>
        props.maxHeight &&
        css`
            max-height: ${props.maxHeight}px;
        `}
        
    ${(props:any) =>
        props.minHeight &&
        css`
            min-height: ${props.minHeight}px;
        `}
    ${(props:any) =>
        props.fullHeight &&
        css`
            height: 100%;
        `}
    
    ${(props:any) =>
        props.flexGrow &&
        css`
            flex: ${props.flexGrow};
        `}
    ${(props:any) =>
        props.borderBottom &&
        css`
            border-bottom: 1px solid ${colors.heavyMetalLight};
        `}
    ${(props:any) =>
        props.borderTop &&
        css`
            border-top: 1px solid ${colors.heavyMetalLight};
        `}
    ${(props:any) =>
        props.borderRight &&
        css`
            border-right: 1px solid ${colors.heavyMetalLight};
        `}
        
    ${(props:any) =>
        props.border &&
        css`
            border: 1px solid ${colors.heavyMetalLight};
            border-radius: 2px;
        `}
    ${(props:any) =>
        props.borderRadius &&
        css`
            border-radius: ${props.borderRadius}px;
        `}
    
    ${(props:any) =>
        props.overflowYauto &&
        css`
            overflow-y: auto;
        `}
    ${(props:any) =>
        props.overflowHidden &&
        css`
            overflow: hidden;
        `}
    ${(props:any) =>
        props.link &&
        css`
            cursor: pointer;
        `}
    ${(props:any) =>
        props.positionRelative &&
        css`
            position: relative;
        `}
        ${(props:any) =>
        props.positionAbsolute &&
        css`
            position: absolute;
        `}
    ${(props:any) =>
        props.expandFullyOverParent &&
        css`
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
        `}
    ${(props:any) =>
        props.top &&
        css`
            top: ${props.top}px;
        `}
    ${(props:any) =>
        props.left &&
        css`
            left: ${props.left}px;
        `}
     ${(props:any) =>
        props.right &&
        css`
            right: ${props.right}px;
        `}
    ${(props:any) =>
        props.zIndex &&
        css`
            z-index: ${props.zIndex};
        `}
    
    ${(props:any) =>
        props.wrapper &&
        css`
            width: 100%;
            min-height: 100%;
        `}
    ${(props:any) =>
        props.columnReverse &&
        css`
            flex-direction: column-reverse;
        `}
    ${(props:any) =>
        props.rowReverse &&
        css`
            flex-direction: row-reverse;
        `}
    ${(props:any) =>
        props.ignoreParentPadding &&
        css`
            margin: -${props.ignoreParentPadding}px;
            max-width: initial;
        `}
    ${(props:any) =>
        props.gap &&
        css`
            gap: ${props.gap}px;
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
                display: flex;
            }
        `}
    ${(props:any) =>
        props.visibilityHidden &&
        css`
            visibility: hidden;
        `}
`;

export const Block = styled(FlexDiv)`
    background: white;
    border-radius: 2px;
    padding: 32px;
    margin-top: 20px;
    flex-direction: column;
    ${(props:any) =>
        props.paddingTopOnly &&
        css`
            padding: 32px 0 0 0;
        `}
    ${(props:any) =>
        props.noMargin &&
        css`
            margin: 0;
        `}
`;

export const SpaceBetweenDiv = styled(FlexDiv)`
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const Image = styled.img`
    ${(props:any) =>
        props.height &&
        css`
            height: ${props.height}px;
        `}
    ${(props:any) =>
        props.width &&
        css`
            width: ${props.width}px;
        `}
    ${(props:any) =>
        props.maxWidth &&
        css`
            max-width: ${props.maxWidth}px;
        `}
        ${(props:any) =>
        props.fullWidth &&
        css`
            max-width: 100%;
        `}
    ${(props:any) =>
        props.fullWidth &&
        css`
            width: 100%;
        `}
    ${(props:any) =>
        props.link &&
        css`
            cursor: pointer;
        `}
    ${(props:any) =>
        props.borderRadius &&
        css`
            border-radius: ${props.borderRadius}px;
        `}
    ${(props:any) =>
        props.border &&
        css`
            border: 1px solid ${colors.heavyMetalLight};
        `}
`;
