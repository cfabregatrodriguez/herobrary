import { ref, computed } from 'vue';
import { useDisplay } from 'vuetify';
// Props
const props = defineProps({
    helpDialog: { type: Boolean },
    historyDialog: { type: Boolean, default: false },
    settingsDialog: { type: Boolean, default: false }
});
// State: Reactive variables
const breakpoint = ref(useDisplay());
// Pinia Stores
import { useStatsPlayerStore } from '@/stores/statsPlayerStore';
const statsPlayerStore = useStatsPlayerStore();
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore();
// Computed
const wins = computed(() => statsPlayerStore.wins);
const loses = computed(() => statsPlayerStore.loses);
const emit = defineEmits(["update:helpDialog", "update:historyDialog", "update:settingsDialog"]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "align-center justify-center" },
    noGutters: true,
}));
const __VLS_2 = __VLS_1({
    ...{ class: "align-center justify-center" },
    noGutters: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.VChip;
/** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onClick': {} },
    size: (__VLS_ctx.breakpoint.smAndDown ? 'x-small' : 'small'),
    color: "primary",
    prependIcon: "mdi-check-bold",
    ...{ class: "hb-chip hb-chip--wins ma-2" },
}));
const __VLS_6 = __VLS_5({
    ...{ 'onClick': {} },
    size: (__VLS_ctx.breakpoint.smAndDown ? 'x-small' : 'small'),
    color: "primary",
    prependIcon: "mdi-check-bold",
    ...{ class: "hb-chip hb-chip--wins ma-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:historyDialog', true);
    }
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.breakpoint.mdAndUp) }, null, null);
__VLS_7.slots.default;
(__VLS_ctx.wins);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "ml-1" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.breakpoint.smAndDown) }, null, null);
var __VLS_7;
const __VLS_12 = {}.VChip;
/** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onClick': {} },
    size: (__VLS_ctx.breakpoint.smAndDown ? 'x-small' : 'small'),
    color: "primary",
    prependIcon: "mdi-close-thick",
    ...{ class: "hb-chip hb-chip--defeats ma-2" },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onClick': {} },
    size: (__VLS_ctx.breakpoint.smAndDown ? 'x-small' : 'small'),
    color: "primary",
    prependIcon: "mdi-close-thick",
    ...{ class: "hb-chip hb-chip--defeats ma-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:historyDialog', true);
    }
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.breakpoint.mdAndUp) }, null, null);
__VLS_15.slots.default;
(__VLS_ctx.loses);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "ml-1" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.breakpoint.smAndDown) }, null, null);
var __VLS_15;
const __VLS_20 = {}.VMenu;
/** @type {[typeof __VLS_components.VMenu, typeof __VLS_components.vMenu, typeof __VLS_components.VMenu, typeof __VLS_components.vMenu, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    location: "bottom",
}));
const __VLS_22 = __VLS_21({
    location: "bottom",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
{
    const { activator: __VLS_thisSlot } = __VLS_23.slots;
    const [{ props }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_24 = {}.VAvatar;
    /** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...(props),
    }));
    const __VLS_26 = __VLS_25({
        ...(props),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_27.slots.default;
    const __VLS_28 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        color: "white",
    }));
    const __VLS_30 = __VLS_29({
        color: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    __VLS_31.slots.default;
    var __VLS_31;
    var __VLS_27;
}
const __VLS_32 = {}.VList;
/** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:historyDialog', true);
    }
};
__VLS_39.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_39.slots;
    const __VLS_44 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        icon: "mdi-history",
        color: "white",
    }));
    const __VLS_46 = __VLS_45({
        icon: "mdi-history",
        color: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
}
const __VLS_48 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    ...{ class: "text-white" },
}));
const __VLS_50 = __VLS_49({
    ...{ class: "text-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
var __VLS_51;
var __VLS_39;
const __VLS_52 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.countdownStore.isCountdownActive),
}));
const __VLS_54 = __VLS_53({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.countdownStore.isCountdownActive),
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_56;
let __VLS_57;
let __VLS_58;
const __VLS_59 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:settingsDialog', true);
    }
};
__VLS_55.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_55.slots;
    const __VLS_60 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        icon: "mdi-cog-outline",
        color: "white",
    }));
    const __VLS_62 = __VLS_61({
        icon: "mdi-cog-outline",
        color: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
}
const __VLS_64 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    ...{ class: "text-white" },
}));
const __VLS_66 = __VLS_65({
    ...{ class: "text-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_67.slots.default;
var __VLS_67;
var __VLS_55;
const __VLS_68 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    href: "https://github.com/cfabregatrodriguez/herobrary/tree/main",
    target: "blank",
}));
const __VLS_70 = __VLS_69({
    href: "https://github.com/cfabregatrodriguez/herobrary/tree/main",
    target: "blank",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
__VLS_71.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_71.slots;
    const __VLS_72 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
        icon: "mdi-github",
        color: "white",
    }));
    const __VLS_74 = __VLS_73({
        icon: "mdi-github",
        color: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
}
const __VLS_76 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    ...{ class: "text-white" },
}));
const __VLS_78 = __VLS_77({
    ...{ class: "text-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
__VLS_79.slots.default;
var __VLS_79;
var __VLS_71;
const __VLS_80 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    ...{ 'onClick': {} },
}));
const __VLS_82 = __VLS_81({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
let __VLS_84;
let __VLS_85;
let __VLS_86;
const __VLS_87 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:helpDialog', true);
    }
};
__VLS_83.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_83.slots;
    const __VLS_88 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
        icon: "mdi-help",
        color: "white",
    }));
    const __VLS_90 = __VLS_89({
        icon: "mdi-help",
        color: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
}
const __VLS_92 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    ...{ class: "text-white" },
}));
const __VLS_94 = __VLS_93({
    ...{ class: "text-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
__VLS_95.slots.default;
var __VLS_95;
var __VLS_83;
var __VLS_35;
var __VLS_23;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-chip--wins']} */ ;
/** @type {__VLS_StyleScopedClasses['ma-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-chip--defeats']} */ ;
/** @type {__VLS_StyleScopedClasses['ma-2']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            breakpoint: breakpoint,
            countdownStore: countdownStore,
            wins: wins,
            loses: loses,
            emit: emit,
        };
    },
    emits: {},
    props: {
        helpDialog: { type: Boolean },
        historyDialog: { type: Boolean, default: false },
        settingsDialog: { type: Boolean, default: false }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    props: {
        helpDialog: { type: Boolean },
        historyDialog: { type: Boolean, default: false },
        settingsDialog: { type: Boolean, default: false }
    },
});
; /* PartiallyEnd: #4569/main.vue */
