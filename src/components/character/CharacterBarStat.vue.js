const __VLS_props = defineProps({
    stat: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'black'
    },
    icon: {
        type: String,
        default: 'mdi-help'
    },
    value: {
        type: Number,
        required: true
    },
    density: {
        type: String,
        default: ""
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "hb-character__stat align-center justify-space-between" },
    noGutters: true,
}));
const __VLS_2 = __VLS_1({
    ...{ class: "hb-character__stat align-center justify-space-between" },
    noGutters: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    cols: "2",
    ...{ class: "text-left" },
    ...{ class: (__VLS_ctx.density === 'compact' ? 'pa-0' : 'pa-1') },
}));
const __VLS_7 = __VLS_6({
    cols: "2",
    ...{ class: "text-left" },
    ...{ class: (__VLS_ctx.density === 'compact' ? 'pa-0' : 'pa-1') },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.VTooltip;
/** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    activator: "parent",
    location: "end",
}));
const __VLS_11 = __VLS_10({
    activator: "parent",
    location: "end",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
(__VLS_ctx.stat);
var __VLS_12;
const __VLS_13 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    color: (__VLS_ctx.color),
    icon: (__VLS_ctx.icon),
    size: (__VLS_ctx.density === 'compact' ? 'x-small' : ''),
}));
const __VLS_15 = __VLS_14({
    color: (__VLS_ctx.color),
    icon: (__VLS_ctx.icon),
    size: (__VLS_ctx.density === 'compact' ? 'x-small' : ''),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
var __VLS_8;
const __VLS_17 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    cols: "10",
    ...{ class: (__VLS_ctx.density === 'compact' ? 'py-0' : 'py-1') },
}));
const __VLS_19 = __VLS_18({
    cols: "10",
    ...{ class: (__VLS_ctx.density === 'compact' ? 'py-0' : 'py-1') },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
const __VLS_21 = {}.VProgressLinear;
/** @type {[typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ class: "rounded-pill bg-blue-grey-darken-1" },
    color: (__VLS_ctx.color),
    modelValue: (__VLS_ctx.value),
    height: (__VLS_ctx.density === 'compact' ? 6 : 12),
}));
const __VLS_23 = __VLS_22({
    ...{ class: "rounded-pill bg-blue-grey-darken-1" },
    color: (__VLS_ctx.color),
    modelValue: (__VLS_ctx.value),
    height: (__VLS_ctx.density === 'compact' ? 6 : 12),
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
var __VLS_20;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['hb-character__stat']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-grey-darken-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        stat: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: 'black'
        },
        icon: {
            type: String,
            default: 'mdi-help'
        },
        value: {
            type: Number,
            required: true
        },
        density: {
            type: String,
            default: ""
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        stat: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: 'black'
        },
        icon: {
            type: String,
            default: 'mdi-help'
        },
        value: {
            type: Number,
            required: true
        },
        density: {
            type: String,
            default: ""
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
