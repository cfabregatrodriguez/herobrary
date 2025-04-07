import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCharacter } from "@/services/api";
// Components
import Character from "@/components/Character.vue";
// Reactive variables
const character = ref(null);
const route = useRoute();
const characterId = route.params.id;
// Lifecycle hooks
onMounted(async () => {
    try {
        const data = await getCharacter(characterId);
        if (data && data.id) { // Check if data is valid
            character.value = data;
        }
        else {
            console.error("Invalid character data");
        }
    }
    catch (error) {
        console.error("Error fetching character:", error);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.character) {
    const __VLS_0 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "text-left align-start justify-start align-md-center justify-md-center" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "text-left align-start justify-start align-md-center justify-md-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    const __VLS_4 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        cols: "12",
        sm: "6",
        md: "4",
    }));
    const __VLS_6 = __VLS_5({
        cols: "12",
        sm: "6",
        md: "4",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    const __VLS_8 = {}.VContainer;
    /** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ class: "position-relative hb-animation--slideLeft" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "position-relative hb-animation--slideLeft" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "hb-detail__backgroundChar" },
    });
    if (__VLS_ctx.character) {
        /** @type {[typeof Character, ]} */ ;
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent(Character, new Character({
            character: (__VLS_ctx.character),
            index: (0),
            isCharacterPowerBar: (false),
        }));
        const __VLS_13 = __VLS_12({
            character: (__VLS_ctx.character),
            index: (0),
            isCharacterPowerBar: (false),
        }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    }
    var __VLS_11;
    var __VLS_7;
    const __VLS_15 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
    const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
    __VLS_18.slots.default;
    const __VLS_19 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        ...{ class: "bg-white" },
    }));
    const __VLS_21 = __VLS_20({
        ...{ class: "bg-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_22.slots.default;
    for (const [value, title] of __VLS_getVForSourceType((__VLS_ctx.character.biography))) {
        const __VLS_23 = {}.VCol;
        /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
            cols: "12",
            sm: "12",
            md: "4",
            key: (title),
        }));
        const __VLS_25 = __VLS_24({
            cols: "12",
            sm: "12",
            md: "4",
            key: (title),
        }, ...__VLS_functionalComponentArgsRest(__VLS_24));
        __VLS_26.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mb-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "text-caption font-weight-bold" },
        });
        (title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "opacity-50 text-subtitle-2" },
        });
        (value || 'Unknown');
        var __VLS_26;
    }
    for (const [value, title] of __VLS_getVForSourceType((__VLS_ctx.character.appearance))) {
        const __VLS_27 = {}.VCol;
        /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
            cols: "12",
            sm: "12",
            md: "4",
            key: (title),
        }));
        const __VLS_29 = __VLS_28({
            cols: "12",
            sm: "12",
            md: "4",
            key: (title),
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
        __VLS_30.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mb-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "text-caption font-weight-bold" },
        });
        (title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "opacity-50 text-subtitle-2" },
        });
        (value || 'Unknown');
        var __VLS_30;
    }
    for (const [value, title] of __VLS_getVForSourceType((__VLS_ctx.character.work))) {
        const __VLS_31 = {}.VCol;
        /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
            cols: "12",
            sm: "12",
            md: "4",
            key: (title),
        }));
        const __VLS_33 = __VLS_32({
            cols: "12",
            sm: "12",
            md: "4",
            key: (title),
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        __VLS_34.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mb-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "text-caption font-weight-bold" },
        });
        (title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "opacity-50 text-subtitle-2" },
        });
        (value || 'Unknown');
        var __VLS_34;
    }
    for (const [value, title] of __VLS_getVForSourceType((__VLS_ctx.character.connections))) {
        const __VLS_35 = {}.VCol;
        /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
            cols: "12",
            sm: "12",
            md: "4",
            key: (title),
        }));
        const __VLS_37 = __VLS_36({
            cols: "12",
            sm: "12",
            md: "4",
            key: (title),
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        __VLS_38.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mb-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "text-caption font-weight-bold" },
        });
        (title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "opacity-50 text-subtitle-2" },
        });
        (value || 'Unknown');
        var __VLS_38;
    }
    var __VLS_22;
    var __VLS_18;
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['align-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['align-md-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-md-center']} */ ;
/** @type {__VLS_StyleScopedClasses['position-relative']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-animation--slideLeft']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-detail__backgroundChar']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Character: Character,
            character: character,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
