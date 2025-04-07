import { computed, ref } from "vue";
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
//Reactive variables
const breakpoint = ref(useDisplay());
const isHovering = ref(false);
// Components
import CharacterStats from "../../components/character/CharacterStats.vue";
// Pinia Stores
import { useSelectedCharactersStore } from "../../stores/selectedCharactersStore";
const selectedCharactersStore = useSelectedCharactersStore();
const router = useRouter();
// Props
const props = defineProps({
    character: { type: Object, required: true },
    characterNum: { type: Number, required: true },
    index: { type: Number, required: true },
    isCharacterStats: { type: Boolean, default: true },
    isCharacterPublisher: { type: Boolean, default: true },
    compact: { type: Boolean, default: false },
    winLose: { type: Number, default: -1 },
    mode: { type: String, default: 'default' },
    isSelected: {
        type: Boolean,
        default: false,
    },
});
// Computed properties
const isSelected = computed(() => selectedCharactersStore.selectedCharacters.some((c) => c?.id === props.character?.id));
const isNotFightRoute = computed(() => router?.currentRoute.value.name !== 'Fight');
const isListRoute = computed(() => router?.currentRoute.value.name === 'List');
const isDetailRoute = computed(() => router?.currentRoute.value.name === 'Detail');
const cardSelectedClass = computed(() => ({
    'selected': isSelected.value && isNotFightRoute.value,
    'hb-card--selected': isSelected.value && isNotFightRoute.value
}));
const badgePositionClass = computed(() => props.index === 1 ? 'hb-card__badge--left' : 'hb-card__badge--right');
// Methods
const toggleSelection = () => {
    isSelected.value
        ? selectedCharactersStore.removeCharacter(props.character)
        : selectedCharactersStore.addCharacter(props.character);
};
const getRank = (character) => {
    if (!character || !character.powerstats)
        return 0;
    const { intelligence = 0, strength = 0, speed = 0, durability = 0, power = 0, combat = 0 } = character.powerstats;
    return Math.round((intelligence + strength + speed + durability + power + combat) / 6);
};
const goToDetail = () => {
    if (props.character) {
        router.push({ name: 'Detail', params: { id: props.character.id.toString() } });
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.character) {
    const __VLS_0 = {}.VContainer;
    /** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "pa-0" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "pa-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    __VLS_3.slots.default;
    const __VLS_5 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        ...{ class: (['hb-card', 'hb-card--nocut', __VLS_ctx.cardSelectedClass]) },
        ...{ class: "mx-auto" },
    }));
    const __VLS_7 = __VLS_6({
        ...{ class: (['hb-card', 'hb-card--nocut', __VLS_ctx.cardSelectedClass]) },
        ...{ class: "mx-auto" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_8.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ([{ 'hb-card--fight': __VLS_ctx.mode == 'fight' }, { 'hb-card--fight--0': __VLS_ctx.index == 0 }, { 'hb-card--fight--1': __VLS_ctx.index == 1 }]) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onMouseover: (...[$event]) => {
                if (!(__VLS_ctx.character))
                    return;
                __VLS_ctx.isHovering = true;
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.character))
                    return;
                __VLS_ctx.isHovering = false;
            } },
        ...{ class: "hb-card__img" },
    });
    const __VLS_9 = {}.VImg;
    /** @type {[typeof __VLS_components.VImg, typeof __VLS_components.vImg, typeof __VLS_components.VImg, typeof __VLS_components.vImg, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        ...{ 'onClick': {} },
        src: (__VLS_ctx.character.images?.lg || ''),
        alt: "Character Image",
        cover: true,
        ...{ style: ({ height: __VLS_ctx.compact ? '300px' : '400px' }) },
        ...{ class: "cursor-pointer" },
        ...{ class: ([{ 'hb-overlay': __VLS_ctx.isSelected && __VLS_ctx.isNotFightRoute }, { 'hb-card--darken-on-hover': __VLS_ctx.isHovering && __VLS_ctx.isListRoute }]) },
    }));
    const __VLS_11 = __VLS_10({
        ...{ 'onClick': {} },
        src: (__VLS_ctx.character.images?.lg || ''),
        alt: "Character Image",
        cover: true,
        ...{ style: ({ height: __VLS_ctx.compact ? '300px' : '400px' }) },
        ...{ class: "cursor-pointer" },
        ...{ class: ([{ 'hb-overlay': __VLS_ctx.isSelected && __VLS_ctx.isNotFightRoute }, { 'hb-card--darken-on-hover': __VLS_ctx.isHovering && __VLS_ctx.isListRoute }]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_13;
    let __VLS_14;
    let __VLS_15;
    const __VLS_16 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.character))
                return;
            __VLS_ctx.isNotFightRoute ? __VLS_ctx.toggleSelection() : '';
        }
    };
    __VLS_12.slots.default;
    const __VLS_17 = {}.VToolbar;
    /** @type {[typeof __VLS_components.VToolbar, typeof __VLS_components.vToolbar, typeof __VLS_components.VToolbar, typeof __VLS_components.vToolbar, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        color: "transparent",
    }));
    const __VLS_19 = __VLS_18({
        color: "transparent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_20.slots.default;
    {
        const { append: __VLS_thisSlot } = __VLS_20.slots;
        const __VLS_21 = {}.VBadge;
        /** @type {[typeof __VLS_components.VBadge, typeof __VLS_components.vBadge, ]} */ ;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
            ...{ class: (['hb-card__badge', __VLS_ctx.badgePositionClass]) },
            content: (__VLS_ctx.getRank(__VLS_ctx.character)),
            inline: true,
        }));
        const __VLS_23 = __VLS_22({
            ...{ class: (['hb-card__badge', __VLS_ctx.badgePositionClass]) },
            content: (__VLS_ctx.getRank(__VLS_ctx.character)),
            inline: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    }
    var __VLS_20;
    if (!__VLS_ctx.isSelected && __VLS_ctx.selectedCharactersStore.checkIfArrayHasElementsInBothPositions()) {
        const __VLS_25 = {}.VTooltip;
        /** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            activator: "parent",
            width: "200",
            location: "center",
        }));
        const __VLS_27 = __VLS_26({
            activator: "parent",
            width: "200",
            location: "center",
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        __VLS_28.slots.default;
        var __VLS_28;
    }
    const __VLS_29 = {}.transition;
    /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        name: "fade-scale",
    }));
    const __VLS_31 = __VLS_30({
        name: "fade-scale",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    __VLS_32.slots.default;
    if (__VLS_ctx.winLose != -1 && !__VLS_ctx.isNotFightRoute) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "hb-card__result permanent-marker-regular" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "hb-card__result__text" },
        });
        if ((__VLS_ctx.index == 0 && __VLS_ctx.winLose == 1) || (__VLS_ctx.index == 1 && __VLS_ctx.winLose == 0)) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        }
    }
    var __VLS_32;
    if (__VLS_ctx.isSelected && __VLS_ctx.isNotFightRoute) {
        const __VLS_33 = {}.VBadge;
        /** @type {[typeof __VLS_components.VBadge, typeof __VLS_components.vBadge, ]} */ ;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
            ...{ class: "hb-card__badge hb-card__badge--bottom hb-animation--slideBottom" },
            content: "selected",
            inline: true,
        }));
        const __VLS_35 = __VLS_34({
            ...{ class: "hb-card__badge hb-card__badge--bottom hb-animation--slideBottom" },
            content: "selected",
            inline: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    }
    if (__VLS_ctx.isNotFightRoute) {
        const __VLS_37 = {}.transition;
        /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
        // @ts-ignore
        const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
            name: "fade-opacity",
        }));
        const __VLS_39 = __VLS_38({
            name: "fade-opacity",
        }, ...__VLS_functionalComponentArgsRest(__VLS_38));
        __VLS_40.slots.default;
        if (__VLS_ctx.isHovering) {
            const __VLS_41 = {}.VBtn;
            /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
            // @ts-ignore
            const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
                ...{ class: "hb-card__image__icon" },
                icon: true,
                variant: "tonal",
                size: "large",
                disabled: (!__VLS_ctx.isSelected && __VLS_ctx.selectedCharactersStore.checkIfArrayHasElementsInBothPositions()),
            }));
            const __VLS_43 = __VLS_42({
                ...{ class: "hb-card__image__icon" },
                icon: true,
                variant: "tonal",
                size: "large",
                disabled: (!__VLS_ctx.isSelected && __VLS_ctx.selectedCharactersStore.checkIfArrayHasElementsInBothPositions()),
            }, ...__VLS_functionalComponentArgsRest(__VLS_42));
            __VLS_44.slots.default;
            const __VLS_45 = {}.VIcon;
            /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
            // @ts-ignore
            const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
                icon: (__VLS_ctx.isSelected ? 'mdi-minus' : __VLS_ctx.selectedCharactersStore.checkIfArrayHasElementsInBothPositions() ? 'mdi-close' : 'mdi-plus'),
            }));
            const __VLS_47 = __VLS_46({
                icon: (__VLS_ctx.isSelected ? 'mdi-minus' : __VLS_ctx.selectedCharactersStore.checkIfArrayHasElementsInBothPositions() ? 'mdi-close' : 'mdi-plus'),
            }, ...__VLS_functionalComponentArgsRest(__VLS_46));
            var __VLS_44;
        }
        var __VLS_40;
    }
    var __VLS_12;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: " hb-card__info " },
    });
    const __VLS_49 = {}.VCardTitle;
    /** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        ...{ class: " text-center mt-2" },
    }));
    const __VLS_51 = __VLS_50({
        ...{ class: " text-center mt-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    __VLS_52.slots.default;
    (__VLS_ctx.character.name);
    var __VLS_52;
    const __VLS_53 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({}));
    const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
    __VLS_56.slots.default;
    if (__VLS_ctx.isListRoute) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ({ 'my-4': __VLS_ctx.isDetailRoute }) },
            ...{ class: "d-flex justify-center align-center w-100" },
        });
        const __VLS_57 = {}.VBtn;
        /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
        // @ts-ignore
        const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
            ...{ 'onClick': {} },
            variant: "tonal",
            size: "small",
        }));
        const __VLS_59 = __VLS_58({
            ...{ 'onClick': {} },
            variant: "tonal",
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_58));
        let __VLS_61;
        let __VLS_62;
        let __VLS_63;
        const __VLS_64 = {
            onClick: (__VLS_ctx.goToDetail)
        };
        __VLS_60.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        var __VLS_60;
    }
    if (__VLS_ctx.isCharacterStats) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "px-4 px-sm-1 py-md-0 h-100" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.breakpoint.smAndDown) }, null, null);
        /** @type {[typeof CharacterStats, ]} */ ;
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent(CharacterStats, new CharacterStats({
            character: (__VLS_ctx.character),
            density: "compact",
        }));
        const __VLS_66 = __VLS_65({
            character: (__VLS_ctx.character),
            density: "compact",
        }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    }
    var __VLS_56;
    const __VLS_68 = {}.VCardActions;
    /** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        ...{ class: "d-block" },
    }));
    const __VLS_70 = __VLS_69({
        ...{ class: "d-block" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    __VLS_71.slots.default;
    const __VLS_72 = {}.VCardSubtitle;
    /** @type {[typeof __VLS_components.VCardSubtitle, typeof __VLS_components.vCardSubtitle, ]} */ ;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
        ...{ class: "pt-2" },
        ...{ class: ({ 'pb-2': !__VLS_ctx.isCharacterPublisher }) },
    }));
    const __VLS_74 = __VLS_73({
        ...{ class: "pt-2" },
        ...{ class: ({ 'pb-2': !__VLS_ctx.isCharacterPublisher }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    __VLS_asFunctionalDirective(__VLS_directives.vText)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.character.biography?.fullName || __VLS_ctx.character.name) }, null, null);
    if (__VLS_ctx.isCharacterPublisher) {
        const __VLS_76 = {}.VCardSubtitle;
        /** @type {[typeof __VLS_components.VCardSubtitle, typeof __VLS_components.vCardSubtitle, ]} */ ;
        // @ts-ignore
        const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
            ...{ class: "pb-2 text-subtitle-2 opacity-30" },
        }));
        const __VLS_78 = __VLS_77({
            ...{ class: "pb-2 text-subtitle-2 opacity-30" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_77));
        __VLS_asFunctionalDirective(__VLS_directives.vText)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.character.biography?.publisher || 'Unknown') }, null, null);
    }
    var __VLS_71;
    var __VLS_8;
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card--nocut']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card--fight']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card--fight--0']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card--fight--1']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card__img']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card--darken-on-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card__badge']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card__result']} */ ;
/** @type {__VLS_StyleScopedClasses['permanent-marker-regular']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card__result__text']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card__badge']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card__badge--bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-animation--slideBottom']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card__image__icon']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-card__info']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['my-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-sm-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-md-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-100']} */ ;
/** @type {__VLS_StyleScopedClasses['d-block']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-30']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            breakpoint: breakpoint,
            isHovering: isHovering,
            CharacterStats: CharacterStats,
            selectedCharactersStore: selectedCharactersStore,
            isSelected: isSelected,
            isNotFightRoute: isNotFightRoute,
            isListRoute: isListRoute,
            isDetailRoute: isDetailRoute,
            cardSelectedClass: cardSelectedClass,
            badgePositionClass: badgePositionClass,
            toggleSelection: toggleSelection,
            getRank: getRank,
            goToDetail: goToDetail,
        };
    },
    props: {
        character: { type: Object, required: true },
        characterNum: { type: Number, required: true },
        index: { type: Number, required: true },
        isCharacterStats: { type: Boolean, default: true },
        isCharacterPublisher: { type: Boolean, default: true },
        compact: { type: Boolean, default: false },
        winLose: { type: Number, default: -1 },
        mode: { type: String, default: 'default' },
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        character: { type: Object, required: true },
        characterNum: { type: Number, required: true },
        index: { type: Number, required: true },
        isCharacterStats: { type: Boolean, default: true },
        isCharacterPublisher: { type: Boolean, default: true },
        compact: { type: Boolean, default: false },
        winLose: { type: Number, default: -1 },
        mode: { type: String, default: 'default' },
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
});
; /* PartiallyEnd: #4569/main.vue */
