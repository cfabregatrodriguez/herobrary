import { ref } from "vue";
// Images
import logo from '@/assets/images/logo.webp';
import splat from '@/assets/images/splat.svg';
// Components
import SelectedCharacters from "@/components/SelectedCharacters.vue";
import PlayerStats from "@/components/PlayerStats.vue";
import Dialogs from "@/components/Dialogs.vue";
// Variables
const helpDialog = ref(false);
const historyDialog = ref(false);
const settingsDialog = ref(false);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VImg;
/** @type {[typeof __VLS_components.VImg, typeof __VLS_components.vImg, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "hb-image--splat" },
    src: (__VLS_ctx.splat),
    alt: "splat",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "hb-image--splat" },
    src: (__VLS_ctx.splat),
    alt: "splat",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_4 = {}.VApp;
/** @type {[typeof __VLS_components.VApp, typeof __VLS_components.vApp, typeof __VLS_components.VApp, typeof __VLS_components.vApp, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.VAppBar;
/** @type {[typeof __VLS_components.VAppBar, typeof __VLS_components.vAppBar, typeof __VLS_components.VAppBar, typeof __VLS_components.vAppBar, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    app: true,
    fixed: true,
    ...{ class: "hb-app-bar" },
}));
const __VLS_10 = __VLS_9({
    app: true,
    fixed: true,
    ...{ class: "hb-app-bar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    noGutters: true,
    ...{ class: "align-center justify-center" },
}));
const __VLS_14 = __VLS_13({
    noGutters: true,
    ...{ class: "align-center justify-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    cols: "2",
    md: "3",
}));
const __VLS_18 = __VLS_17({
    cols: "2",
    md: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    to: "/",
}));
const __VLS_22 = __VLS_21({
    to: "/",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.VImg;
/** @type {[typeof __VLS_components.VImg, typeof __VLS_components.vImg, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    height: " 50px",
    src: (__VLS_ctx.logo),
    alt: "logo herobrary",
}));
const __VLS_26 = __VLS_25({
    height: " 50px",
    src: (__VLS_ctx.logo),
    alt: "logo herobrary",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
var __VLS_23;
var __VLS_19;
const __VLS_28 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    cols: "8",
    md: "4",
}));
const __VLS_30 = __VLS_29({
    cols: "8",
    md: "4",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
/** @type {[typeof SelectedCharacters, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(SelectedCharacters, new SelectedCharacters({}));
const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
var __VLS_31;
const __VLS_35 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    cols: "2",
    md: "3",
}));
const __VLS_37 = __VLS_36({
    cols: "2",
    md: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
__VLS_38.slots.default;
/** @type {[typeof PlayerStats, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(PlayerStats, new PlayerStats({
    helpDialog: (__VLS_ctx.helpDialog),
    historyDialog: (__VLS_ctx.historyDialog),
    settingsDialog: (__VLS_ctx.settingsDialog),
}));
const __VLS_40 = __VLS_39({
    helpDialog: (__VLS_ctx.helpDialog),
    historyDialog: (__VLS_ctx.historyDialog),
    settingsDialog: (__VLS_ctx.settingsDialog),
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
var __VLS_38;
var __VLS_15;
var __VLS_11;
const __VLS_42 = {}.VMain;
/** @type {[typeof __VLS_components.VMain, typeof __VLS_components.vMain, typeof __VLS_components.VMain, typeof __VLS_components.vMain, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({}));
const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_45.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_46 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({}));
const __VLS_48 = __VLS_47({}, ...__VLS_functionalComponentArgsRest(__VLS_47));
/** @type {[typeof Dialogs, typeof Dialogs, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(Dialogs, new Dialogs({
    helpDialog: (__VLS_ctx.helpDialog),
    historyDialog: (__VLS_ctx.historyDialog),
    settingsDialog: (__VLS_ctx.settingsDialog),
}));
const __VLS_51 = __VLS_50({
    helpDialog: (__VLS_ctx.helpDialog),
    historyDialog: (__VLS_ctx.historyDialog),
    settingsDialog: (__VLS_ctx.settingsDialog),
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
var __VLS_45;
const __VLS_53 = {}.VBottomNavigation;
/** @type {[typeof __VLS_components.VBottomNavigation, typeof __VLS_components.vBottomNavigation, typeof __VLS_components.VBottomNavigation, typeof __VLS_components.vBottomNavigation, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    bgColor: "transparent",
    elevation: "0",
    ...{ class: "justify-end" },
}));
const __VLS_55 = __VLS_54({
    bgColor: "transparent",
    elevation: "0",
    ...{ class: "justify-end" },
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
__VLS_56.slots.default;
const __VLS_57 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    ...{ 'onClick': {} },
    icon: ('mdi-help'),
    flat: true,
}));
const __VLS_59 = __VLS_58({
    ...{ 'onClick': {} },
    icon: ('mdi-help'),
    flat: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_61;
let __VLS_62;
let __VLS_63;
const __VLS_64 = {
    onClick: (...[$event]) => {
        __VLS_ctx.helpDialog = true;
    }
};
var __VLS_60;
var __VLS_56;
var __VLS_7;
/** @type {__VLS_StyleScopedClasses['hb-image--splat']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-app-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            logo: logo,
            splat: splat,
            SelectedCharacters: SelectedCharacters,
            PlayerStats: PlayerStats,
            Dialogs: Dialogs,
            helpDialog: helpDialog,
            historyDialog: historyDialog,
            settingsDialog: settingsDialog,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
