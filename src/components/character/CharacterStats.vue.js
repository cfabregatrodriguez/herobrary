import CharacterBarStat from "@/components/character/CharacterBarStat.vue";
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    noGutters: true,
    ...{ class: "justify-space-between" },
}));
const __VLS_2 = __VLS_1({
    noGutters: true,
    ...{ class: "justify-space-between" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    cols: "12",
}));
const __VLS_6 = __VLS_5({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
/** @type {[typeof CharacterBarStat, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(CharacterBarStat, new CharacterBarStat({
    density: (__VLS_ctx.density),
    stat: "Intelligence",
    icon: "mdi-brain",
    color: "orange-lighten-2",
    value: (__VLS_ctx.character.powerstats?.intelligence || 0),
}));
const __VLS_9 = __VLS_8({
    density: (__VLS_ctx.density),
    stat: "Intelligence",
    icon: "mdi-brain",
    color: "orange-lighten-2",
    value: (__VLS_ctx.character.powerstats?.intelligence || 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
var __VLS_7;
const __VLS_11 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    cols: "12",
}));
const __VLS_13 = __VLS_12({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
/** @type {[typeof CharacterBarStat, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(CharacterBarStat, new CharacterBarStat({
    density: (__VLS_ctx.density),
    stat: "Strength",
    icon: "mdi-dumbbell",
    color: "red-lighten-1",
    value: (__VLS_ctx.character.powerstats?.strength || 0),
}));
const __VLS_16 = __VLS_15({
    density: (__VLS_ctx.density),
    stat: "Strength",
    icon: "mdi-dumbbell",
    color: "red-lighten-1",
    value: (__VLS_ctx.character.powerstats?.strength || 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
var __VLS_14;
const __VLS_18 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    cols: "12",
}));
const __VLS_20 = __VLS_19({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
/** @type {[typeof CharacterBarStat, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(CharacterBarStat, new CharacterBarStat({
    density: (__VLS_ctx.density),
    stat: "Speed",
    icon: "mdi-run-fast",
    color: "blue-lighten-1",
    value: (__VLS_ctx.character.powerstats?.speed || 0),
}));
const __VLS_23 = __VLS_22({
    density: (__VLS_ctx.density),
    stat: "Speed",
    icon: "mdi-run-fast",
    color: "blue-lighten-1",
    value: (__VLS_ctx.character.powerstats?.speed || 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
var __VLS_21;
const __VLS_25 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    cols: "12",
}));
const __VLS_27 = __VLS_26({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
/** @type {[typeof CharacterBarStat, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(CharacterBarStat, new CharacterBarStat({
    density: (__VLS_ctx.density),
    stat: "Durability",
    icon: "mdi-wall",
    color: "green-darken-1",
    value: (__VLS_ctx.character.powerstats?.durability || 0),
}));
const __VLS_30 = __VLS_29({
    density: (__VLS_ctx.density),
    stat: "Durability",
    icon: "mdi-wall",
    color: "green-darken-1",
    value: (__VLS_ctx.character.powerstats?.durability || 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_28;
const __VLS_32 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    cols: "12",
}));
const __VLS_34 = __VLS_33({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
/** @type {[typeof CharacterBarStat, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(CharacterBarStat, new CharacterBarStat({
    density: (__VLS_ctx.density),
    stat: "Power",
    icon: "mdi-lightning-bolt-outline",
    color: "purple-lighten-1",
    value: (__VLS_ctx.character.powerstats?.power || 0),
}));
const __VLS_37 = __VLS_36({
    density: (__VLS_ctx.density),
    stat: "Power",
    icon: "mdi-lightning-bolt-outline",
    color: "purple-lighten-1",
    value: (__VLS_ctx.character.powerstats?.power || 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
var __VLS_35;
const __VLS_39 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    cols: "12",
}));
const __VLS_41 = __VLS_40({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
__VLS_42.slots.default;
/** @type {[typeof CharacterBarStat, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(CharacterBarStat, new CharacterBarStat({
    density: (__VLS_ctx.density),
    stat: "Combat",
    icon: "mdi-sword-cross",
    color: "deep-orange-lighten-2",
    value: (__VLS_ctx.character.powerstats?.combat || 0),
}));
const __VLS_44 = __VLS_43({
    density: (__VLS_ctx.density),
    stat: "Combat",
    icon: "mdi-sword-cross",
    color: "deep-orange-lighten-2",
    value: (__VLS_ctx.character.powerstats?.combat || 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
var __VLS_42;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CharacterBarStat: CharacterBarStat,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
