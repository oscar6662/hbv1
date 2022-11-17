import { rgba } from 'polished';

export const colors = {
    dark1:'#202a39',
    dark2:'#343d4b',
    dark3:'#49515c',
    dark4:'#656b74',
    dark5:'#8a8e94',
    dark6:'#afb1b4',
    dark7:'#b9bbc8',
    dark8:'#ced0dd',
    dark9:'#dedfec',
    dark10:'#eceefb',

    white: '#FFFFFF',
    heavyMetal: '#343534',
    aspargus: '#20A26B',

    contentYellow: '#FFD860',

    error: '#EB5757',
    success: '#20A26B',
    delete: '#CC213D',
    errorLight: '',
    successLight:'',
    heavyMetalSlightlyLight:'',
    heavyMetalLight:'',
    heavyMetalUltraLight:''
};

/** variations of the basic colors */
colors.errorLight = rgba(colors.error, 0.1);
colors.successLight = rgba(colors.success, 0.1);
colors.heavyMetalSlightlyLight = rgba(colors.heavyMetal, 0.9);
colors.heavyMetalLight = rgba(colors.heavyMetal, 0.1);
colors.heavyMetalUltraLight = rgba(colors.heavyMetal, 0.05);