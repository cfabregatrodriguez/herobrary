import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import { getListCharacters } from "@/services/api"; // Import API
import { useDisplay } from 'vuetify';
//Reactive variables
const breakpoint = ref(useDisplay());
// Pinia Stores
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore(); // Using countdown store
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
const selectedCharactersStore = useSelectedCharactersStore();
// Computed
const selectedCharacters = computed(() => selectedCharactersStore.selectedCharacters);
const canFight = computed(() => {
    return selectedCharacters.value.length === 2 && selectedCharacters.value.every((character) => character !== null);
});
const allCharacters = ref([]);
onMounted(async () => {
    allCharacters.value = await getListCharacters();
});
// Actions
const toggleSelection = (character) => {
    if (countdownStore.isCountdownActive)
        return;
    selectedCharactersStore.removeCharacter(character);
};
const assignRandomCharacter = (index) => {
    if (allCharacters.value.length === 0)
        return;
    const randomIndex = Math.floor(Math.random() * allCharacters.value.length);
    const randomCharacter = allCharacters.value[randomIndex];
    if (selectedCharacters.value.some((c) => c?.id === randomCharacter.id)) {
        assignRandomCharacter(index); // Try again
        return;
    }
    selectedCharactersStore.setCharacter(index, randomCharacter);
};
//Routes
const router = useRouter();
const goToCharactersFight = () => {
    if (!selectedCharacters.value[0]?.id || !selectedCharacters.value[1]?.id)
        return;
    router.push({
        name: 'Fight'
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hb-selectedCharas w-100 justify-center d-flex justify-center align-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex justify-center align-center" },
});
const __VLS_0 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ class: "mr-1 mt-0" },
    color: "secondary",
    disabled: (__VLS_ctx.countdownStore.isCountdownActive),
    size: "x-small",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ class: "mr-1 mt-0" },
    color: "secondary",
    disabled: (__VLS_ctx.countdownStore.isCountdownActive),
    size: "x-small",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (...[$event]) => {
        __VLS_ctx.assignRandomCharacter(0);
    }
};
__VLS_3.slots.default;
var __VLS_3;
if (__VLS_ctx.selectedCharacters[0]) {
    const __VLS_8 = {}.VTooltip;
    /** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        location: "bottom",
        ...{ class: "text-center" },
    }));
    const __VLS_10 = __VLS_9({
        location: "bottom",
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    {
        const { activator: __VLS_thisSlot } = __VLS_11.slots;
        const [{ props }] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_12 = {}.VAvatar;
        /** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            ...{ 'onClick': {} },
            size: (__VLS_ctx.breakpoint.smAndDown ? '35' : '50'),
            ...(props),
            ...{ class: "hb-avatar-container mt-0" },
        }));
        const __VLS_14 = __VLS_13({
            ...{ 'onClick': {} },
            size: (__VLS_ctx.breakpoint.smAndDown ? '35' : '50'),
            ...(props),
            ...{ class: "hb-avatar-container mt-0" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        let __VLS_16;
        let __VLS_17;
        let __VLS_18;
        const __VLS_19 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedCharacters[0]))
                    return;
                __VLS_ctx.toggleSelection(__VLS_ctx.selectedCharacters[0]);
            }
        };
        __VLS_15.slots.default;
        const __VLS_20 = {}.VImg;
        /** @type {[typeof __VLS_components.VImg, typeof __VLS_components.vImg, ]} */ ;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            src: (__VLS_ctx.selectedCharacters[0].images.md),
            alt: "Character Image",
        }));
        const __VLS_22 = __VLS_21({
            src: (__VLS_ctx.selectedCharacters[0].images.md),
            alt: "Character Image",
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        if (!__VLS_ctx.countdownStore.isCountdownActive) {
            const __VLS_24 = {}.VIcon;
            /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
                ...{ 'onClick': {} },
                ...{ class: "hb-remove-icon mdi mdi-close" },
            }));
            const __VLS_26 = __VLS_25({
                ...{ 'onClick': {} },
                ...{ class: "hb-remove-icon mdi mdi-close" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_25));
            let __VLS_28;
            let __VLS_29;
            let __VLS_30;
            const __VLS_31 = {
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.selectedCharacters[0]))
                        return;
                    if (!(!__VLS_ctx.countdownStore.isCountdownActive))
                        return;
                    __VLS_ctx.toggleSelection(__VLS_ctx.selectedCharacters[0]);
                }
            };
            var __VLS_27;
        }
        var __VLS_15;
    }
    if (!__VLS_ctx.countdownStore.isCountdownActive && __VLS_ctx.router.currentRoute.value.name !== 'Fight') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.selectedCharacters[0] ? __VLS_ctx.selectedCharacters[0].name : 'Empty Slot');
    var __VLS_11;
}
else {
    const __VLS_32 = {}.VAvatar;
    /** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        color: "#B0BEC5",
        size: (__VLS_ctx.breakpoint.smAndDown ? '35' : '50'),
        ...{ class: "hb-avatar-container mt-0" },
    }));
    const __VLS_34 = __VLS_33({
        color: "#B0BEC5",
        size: (__VLS_ctx.breakpoint.smAndDown ? '35' : '50'),
        ...{ class: "hb-avatar-container mt-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    const __VLS_36 = {}.VTooltip;
    /** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        activator: "parent",
        location: "bottom",
        ...{ class: "text-center" },
        width: "200",
    }));
    const __VLS_38 = __VLS_37({
        activator: "parent",
        location: "bottom",
        ...{ class: "text-center" },
        width: "200",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    var __VLS_39;
    var __VLS_35;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (!__VLS_ctx.selectedCharactersStore.checkIfArrayHasElementsInBothPositions()) {
    const __VLS_40 = {}.VTooltip;
    /** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        activator: "parent",
        width: "150",
        location: "bottom",
        ...{ class: "text-center" },
    }));
    const __VLS_42 = __VLS_41({
        activator: "parent",
        width: "150",
        location: "bottom",
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    var __VLS_43;
}
const __VLS_44 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    ...{ 'onClick': {} },
    size: (__VLS_ctx.breakpoint.smAndDown ? 'x-small' : 'default'),
    ...{ class: (__VLS_ctx.canFight && __VLS_ctx.router.currentRoute.value.name !== 'Fight' ? 'hb-animation--glow' : '') },
    color: "secondary",
    variant: "outlined",
    ...{ class: "mx-4" },
    disabled: (__VLS_ctx.countdownStore.isCountdownActive || !__VLS_ctx.canFight || __VLS_ctx.router.currentRoute.value.name == 'Fight'),
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    size: (__VLS_ctx.breakpoint.smAndDown ? 'x-small' : 'default'),
    ...{ class: (__VLS_ctx.canFight && __VLS_ctx.router.currentRoute.value.name !== 'Fight' ? 'hb-animation--glow' : '') },
    color: "secondary",
    variant: "outlined",
    ...{ class: "mx-4" },
    disabled: (__VLS_ctx.countdownStore.isCountdownActive || !__VLS_ctx.canFight || __VLS_ctx.router.currentRoute.value.name == 'Fight'),
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_48;
let __VLS_49;
let __VLS_50;
const __VLS_51 = {
    onClick: (__VLS_ctx.goToCharactersFight)
};
__VLS_47.slots.default;
var __VLS_47;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex justify-center align-center" },
});
if (__VLS_ctx.selectedCharacters[1]) {
    const __VLS_52 = {}.VTooltip;
    /** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        location: "bottom",
        ...{ class: "text-center" },
    }));
    const __VLS_54 = __VLS_53({
        location: "bottom",
        ...{ class: "text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    {
        const { activator: __VLS_thisSlot } = __VLS_55.slots;
        const [{ props }] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_56 = {}.VAvatar;
        /** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
            ...{ 'onClick': {} },
            size: (__VLS_ctx.breakpoint.smAndDown ? '35' : '50'),
            ...(props),
            ...{ class: "hb-avatar-container mt-0" },
        }));
        const __VLS_58 = __VLS_57({
            ...{ 'onClick': {} },
            size: (__VLS_ctx.breakpoint.smAndDown ? '35' : '50'),
            ...(props),
            ...{ class: "hb-avatar-container mt-0" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        let __VLS_60;
        let __VLS_61;
        let __VLS_62;
        const __VLS_63 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedCharacters[1]))
                    return;
                __VLS_ctx.toggleSelection(__VLS_ctx.selectedCharacters[1]);
            }
        };
        __VLS_59.slots.default;
        const __VLS_64 = {}.VImg;
        /** @type {[typeof __VLS_components.VImg, typeof __VLS_components.vImg, ]} */ ;
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
            src: (__VLS_ctx.selectedCharacters[1].images.md),
            alt: "Character Image",
        }));
        const __VLS_66 = __VLS_65({
            src: (__VLS_ctx.selectedCharacters[1].images.md),
            alt: "Character Image",
        }, ...__VLS_functionalComponentArgsRest(__VLS_65));
        if (!__VLS_ctx.countdownStore.isCountdownActive) {
            const __VLS_68 = {}.VIcon;
            /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
            // @ts-ignore
            const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
                ...{ 'onClick': {} },
                ...{ class: "hb-remove-icon mdi mdi-close" },
            }));
            const __VLS_70 = __VLS_69({
                ...{ 'onClick': {} },
                ...{ class: "hb-remove-icon mdi mdi-close" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_69));
            let __VLS_72;
            let __VLS_73;
            let __VLS_74;
            const __VLS_75 = {
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.selectedCharacters[1]))
                        return;
                    if (!(!__VLS_ctx.countdownStore.isCountdownActive))
                        return;
                    __VLS_ctx.toggleSelection(__VLS_ctx.selectedCharacters[1]);
                }
            };
            var __VLS_71;
        }
        var __VLS_59;
    }
    if (!__VLS_ctx.countdownStore.isCountdownActive && __VLS_ctx.router.currentRoute.value.name !== 'Fight') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.selectedCharacters[1] ? __VLS_ctx.selectedCharacters[1].name : 'Empty Slot');
    var __VLS_55;
}
else {
    const __VLS_76 = {}.VAvatar;
    /** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
        color: "#B0BEC5",
        size: (__VLS_ctx.breakpoint.smAndDown ? '35' : '50'),
        ...{ class: "hb-avatar-container mt-0" },
    }));
    const __VLS_78 = __VLS_77({
        color: "#B0BEC5",
        size: (__VLS_ctx.breakpoint.smAndDown ? '35' : '50'),
        ...{ class: "hb-avatar-container mt-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    __VLS_79.slots.default;
    const __VLS_80 = {}.VTooltip;
    /** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
        activator: "parent",
        location: "bottom",
        ...{ class: "text-center" },
        width: "200",
    }));
    const __VLS_82 = __VLS_81({
        activator: "parent",
        location: "bottom",
        ...{ class: "text-center" },
        width: "200",
    }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    __VLS_83.slots.default;
    var __VLS_83;
    var __VLS_79;
}
const __VLS_84 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    ...{ 'onClick': {} },
    ...{ class: "ml-1 mt-0" },
    color: "secondary",
    disabled: (__VLS_ctx.countdownStore.isCountdownActive),
    size: "x-small",
}));
const __VLS_86 = __VLS_85({
    ...{ 'onClick': {} },
    ...{ class: "ml-1 mt-0" },
    color: "secondary",
    disabled: (__VLS_ctx.countdownStore.isCountdownActive),
    size: "x-small",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
let __VLS_88;
let __VLS_89;
let __VLS_90;
const __VLS_91 = {
    onClick: (...[$event]) => {
        __VLS_ctx.assignRandomCharacter(1);
    }
};
__VLS_87.slots.default;
var __VLS_87;
/** @type {__VLS_StyleScopedClasses['hb-selectedCharas']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-avatar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-remove-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['mdi']} */ ;
/** @type {__VLS_StyleScopedClasses['mdi-close']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-avatar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-avatar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-remove-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['mdi']} */ ;
/** @type {__VLS_StyleScopedClasses['mdi-close']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-avatar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            breakpoint: breakpoint,
            countdownStore: countdownStore,
            selectedCharactersStore: selectedCharactersStore,
            selectedCharacters: selectedCharacters,
            canFight: canFight,
            toggleSelection: toggleSelection,
            assignRandomCharacter: assignRandomCharacter,
            router: router,
            goToCharactersFight: goToCharactersFight,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
