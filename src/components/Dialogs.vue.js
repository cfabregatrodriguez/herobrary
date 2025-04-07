import { ref, computed, watch } from 'vue';
// Pinia Stores
import { useStatsPlayerStore } from '@/stores/statsPlayerStore';
const statsPlayerStore = useStatsPlayerStore();
const emit = defineEmits(["update:helpDialog", "update:historyDialog", "update:settingsDialog"]);
const helpDialog = computed({
    get: () => props.helpDialog,
    set: (value) => emit("update:helpDialog", value),
});
const historyDialog = computed({
    get: () => props.historyDialog,
    set: (value) => emit("update:historyDialog", value),
});
const settingsDialog = computed({
    get: () => props.settingsDialog,
    set: (value) => emit("update:settingsDialog", value),
});
// Props
const props = defineProps({
    helpDialog: { type: Boolean, default: false },
    historyDialog: { type: Boolean, default: false },
    settingsDialog: { type: Boolean, default: false }
});
// State: Reactive variables
const dialog = ref(false);
const minFightTime = ref(10);
const maxFightTime = ref(40);
const minHandicap = ref(0.2);
const maxHandicap = ref(1);
const minDifficult = ref(1);
const maxDifficult = ref(5);
// Computed
const playerIsAuto = computed({
    get: () => statsPlayerStore.playerIsAuto,
    set: (value) => statsPlayerStore.setIsAuto(value),
});
const fightTime = computed({
    get: () => statsPlayerStore.fightTime,
    set: (value) => statsPlayerStore.setFightTime(value),
});
const handicap = computed({
    get: () => statsPlayerStore.handicap,
    set: (value) => statsPlayerStore.setHandicap(value),
});
const difficult = computed({
    get: () => statsPlayerStore.difficult,
    set: (value) => statsPlayerStore.setDifficult(value),
});
const battles = computed(() => statsPlayerStore.battles);
// Actions
const fetchAvatars = (battle) => {
    if (battle.characterAvatar) {
        battle.characterAvatar = battle.characterAvatar; // Ya está en el estado
    }
    else {
        console.error('No se encontraron imágenes para el personaje:', battle.characterId);
    }
    if (battle.enemyCharacterAvatar) {
        battle.enemyCharacterAvatar = battle.enemyCharacterAvatar; // Ya está en el estado
    }
    else {
        console.error('No se encontraron imágenes para el enemigo:', battle.enemyCharacterId);
    }
};
const clearBattles = () => {
    statsPlayerStore.clearBattlesFromLocalStorage();
    dialog.value = false;
};
const fetchBattleAvatars = async () => {
    const avatarPromises = battles.value.map((battle) => fetchAvatars(battle));
    await Promise.all(avatarPromises);
};
// Watchers
watch(battles, async () => {
    if (dialog.value) {
        await fetchBattleAvatars();
    }
});
watch(dialog, async (newVal) => {
    if (newVal) {
        await fetchBattleAvatars();
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.VDialog;
/** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.helpDialog),
    transition: "\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0064\u0069\u0061\u006c\u006f\u0067\u002d\u0062\u006f\u0074\u0074\u006f\u006d\u002d\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e",
    maxWidth: "500",
    opacity: ".8",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.helpDialog),
    transition: "\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0064\u0069\u0061\u006c\u006f\u0067\u002d\u0062\u006f\u0074\u0074\u006f\u006d\u002d\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e",
    maxWidth: "500",
    opacity: ".8",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    'onUpdate:modelValue': (...[$event]) => {
        __VLS_ctx.emit('update:helpDialog', $event);
    }
};
__VLS_3.slots.default;
const __VLS_8 = {}.VToolbar;
/** @type {[typeof __VLS_components.VToolbar, typeof __VLS_components.vToolbar, typeof __VLS_components.VToolbar, typeof __VLS_components.vToolbar, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    color: "primary",
}));
const __VLS_10 = __VLS_9({
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.VToolbarTitle;
/** @type {[typeof __VLS_components.VToolbarTitle, typeof __VLS_components.vToolbarTitle, typeof __VLS_components.VToolbarTitle, typeof __VLS_components.vToolbarTitle, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
var __VLS_15;
const __VLS_16 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    icon: "mdi-close",
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    icon: "mdi-close",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:helpDialog', false);
    }
};
var __VLS_19;
var __VLS_11;
const __VLS_24 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    color: "white",
}));
const __VLS_26 = __VLS_25({
    color: "white",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
const __VLS_32 = {}.VList;
/** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ class: " text-caption opacity-60" },
}));
const __VLS_34 = __VLS_33({
    ...{ class: " text-caption opacity-60" },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
var __VLS_39;
const __VLS_40 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
var __VLS_43;
const __VLS_44 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
var __VLS_47;
const __VLS_48 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "ml-4 mt-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
var __VLS_51;
const __VLS_52 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
var __VLS_55;
var __VLS_35;
var __VLS_31;
const __VLS_56 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
const __VLS_60 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const __VLS_64 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    ...{ 'onClick': {} },
    text: "Close",
}));
const __VLS_66 = __VLS_65({
    ...{ 'onClick': {} },
    text: "Close",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_68;
let __VLS_69;
let __VLS_70;
const __VLS_71 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:helpDialog', false);
    }
};
var __VLS_67;
var __VLS_59;
var __VLS_27;
var __VLS_3;
const __VLS_72 = {}.VDialog;
/** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    modelValue: (__VLS_ctx.historyDialog),
    transition: "dialog-bottom-transition",
    width: "400",
    opacity: ".8",
    scrollable: true,
}));
const __VLS_74 = __VLS_73({
    modelValue: (__VLS_ctx.historyDialog),
    transition: "dialog-bottom-transition",
    width: "400",
    opacity: ".8",
    scrollable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
__VLS_75.slots.default;
const __VLS_76 = {}.VToolbar;
/** @type {[typeof __VLS_components.VToolbar, typeof __VLS_components.vToolbar, typeof __VLS_components.VToolbar, typeof __VLS_components.vToolbar, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    color: "primary",
}));
const __VLS_78 = __VLS_77({
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
__VLS_79.slots.default;
const __VLS_80 = {}.VToolbarTitle;
/** @type {[typeof __VLS_components.VToolbarTitle, typeof __VLS_components.vToolbarTitle, typeof __VLS_components.VToolbarTitle, typeof __VLS_components.vToolbarTitle, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({}));
const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
__VLS_83.slots.default;
var __VLS_83;
const __VLS_84 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    ...{ 'onClick': {} },
    icon: "mdi-close",
}));
const __VLS_86 = __VLS_85({
    ...{ 'onClick': {} },
    icon: "mdi-close",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
let __VLS_88;
let __VLS_89;
let __VLS_90;
const __VLS_91 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:historyDialog', false);
    }
};
var __VLS_87;
var __VLS_79;
const __VLS_92 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    color: "white",
}));
const __VLS_94 = __VLS_93({
    color: "white",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
__VLS_95.slots.default;
const __VLS_96 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({}));
const __VLS_98 = __VLS_97({}, ...__VLS_functionalComponentArgsRest(__VLS_97));
__VLS_99.slots.default;
const __VLS_100 = {}.VList;
/** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
    dense: true,
}));
const __VLS_102 = __VLS_101({
    dense: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
__VLS_103.slots.default;
if (__VLS_ctx.battles.length) {
    const __VLS_104 = {}.VItemGroup;
    /** @type {[typeof __VLS_components.VItemGroup, typeof __VLS_components.vItemGroup, typeof __VLS_components.VItemGroup, typeof __VLS_components.vItemGroup, ]} */ ;
    // @ts-ignore
    const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({}));
    const __VLS_106 = __VLS_105({}, ...__VLS_functionalComponentArgsRest(__VLS_105));
    __VLS_107.slots.default;
    for (const [battle, index] of __VLS_getVForSourceType((__VLS_ctx.battles))) {
        const __VLS_108 = {}.VListItem;
        /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
        // @ts-ignore
        const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
            key: (index),
            ...{ class: ((Math.round(battle.playerEnergy) < Math.round(battle.enemyEnergy)) ? 'opacity-40' : '') },
        }));
        const __VLS_110 = __VLS_109({
            key: (index),
            ...{ class: ((Math.round(battle.playerEnergy) < Math.round(battle.enemyEnergy)) ? 'opacity-40' : '') },
        }, ...__VLS_functionalComponentArgsRest(__VLS_109));
        __VLS_111.slots.default;
        {
            const { default: __VLS_thisSlot } = __VLS_111.slots;
            const [props] = __VLS_getSlotParams(__VLS_thisSlot);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...(props),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "d-flex w-100" },
            });
            const __VLS_112 = {}.VRow;
            /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
            // @ts-ignore
            const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
                ...{ class: "align-center justify-start v-row--no-gutters text-primary" },
            }));
            const __VLS_114 = __VLS_113({
                ...{ class: "align-center justify-start v-row--no-gutters text-primary" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_113));
            __VLS_115.slots.default;
            const __VLS_116 = {}.VCol;
            /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
            // @ts-ignore
            const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
                cols: "1",
            }));
            const __VLS_118 = __VLS_117({
                cols: "1",
            }, ...__VLS_functionalComponentArgsRest(__VLS_117));
            __VLS_119.slots.default;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (index + 1);
            var __VLS_119;
            const __VLS_120 = {}.VCol;
            /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
            // @ts-ignore
            const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
                cols: "4",
            }));
            const __VLS_122 = __VLS_121({
                cols: "4",
            }, ...__VLS_functionalComponentArgsRest(__VLS_121));
            __VLS_123.slots.default;
            const __VLS_124 = {}.VAvatar;
            /** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
            // @ts-ignore
            const __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({
                size: "30px",
            }));
            const __VLS_126 = __VLS_125({
                size: "30px",
            }, ...__VLS_functionalComponentArgsRest(__VLS_125));
            __VLS_127.slots.default;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                src: (battle.characterAvatar),
                alt: "Character Avatar",
            });
            var __VLS_127;
            const __VLS_128 = {}.VAvatar;
            /** @type {[typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, typeof __VLS_components.VAvatar, typeof __VLS_components.vAvatar, ]} */ ;
            // @ts-ignore
            const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
                size: "30px",
            }));
            const __VLS_130 = __VLS_129({
                size: "30px",
            }, ...__VLS_functionalComponentArgsRest(__VLS_129));
            __VLS_131.slots.default;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                src: (battle.enemyCharacterAvatar),
                alt: "Enemy Avatar",
            });
            var __VLS_131;
            var __VLS_123;
            const __VLS_132 = {}.VCol;
            /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
            // @ts-ignore
            const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({
                cols: "6",
                ...{ class: "text-center" },
            }));
            const __VLS_134 = __VLS_133({
                cols: "6",
                ...{ class: "text-center" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_133));
            __VLS_135.slots.default;
            (Math.round(battle.playerEnergy));
            (Math.round(battle.enemyEnergy));
            var __VLS_135;
            const __VLS_136 = {}.VCol;
            /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
            // @ts-ignore
            const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
                cols: "1",
            }));
            const __VLS_138 = __VLS_137({
                cols: "1",
            }, ...__VLS_functionalComponentArgsRest(__VLS_137));
            __VLS_139.slots.default;
            if (Math.round(battle.playerEnergy) > Math.round(battle.enemyEnergy)) {
                const __VLS_140 = {}.VIcon;
                /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
                // @ts-ignore
                const __VLS_141 = __VLS_asFunctionalComponent(__VLS_140, new __VLS_140({
                    icon: "mdi-check-bold",
                    size: "large",
                }));
                const __VLS_142 = __VLS_141({
                    icon: "mdi-check-bold",
                    size: "large",
                }, ...__VLS_functionalComponentArgsRest(__VLS_141));
            }
            else {
                const __VLS_144 = {}.VIcon;
                /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
                // @ts-ignore
                const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({
                    icon: "mdi-close-thick",
                    size: "large",
                }));
                const __VLS_146 = __VLS_145({
                    icon: "mdi-close-thick",
                    size: "large",
                }, ...__VLS_functionalComponentArgsRest(__VLS_145));
            }
            var __VLS_139;
            var __VLS_115;
            const __VLS_148 = {}.VDivider;
            /** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
            // @ts-ignore
            const __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({
                ...{ class: "mt-2" },
            }));
            const __VLS_150 = __VLS_149({
                ...{ class: "mt-2" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_149));
        }
        var __VLS_111;
    }
    var __VLS_107;
}
else {
    const __VLS_152 = {}.VListItem;
    /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
    // @ts-ignore
    const __VLS_153 = __VLS_asFunctionalComponent(__VLS_152, new __VLS_152({}));
    const __VLS_154 = __VLS_153({}, ...__VLS_functionalComponentArgsRest(__VLS_153));
    __VLS_155.slots.default;
    const __VLS_156 = {}.VListItemTitle;
    /** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
    // @ts-ignore
    const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({}));
    const __VLS_158 = __VLS_157({}, ...__VLS_functionalComponentArgsRest(__VLS_157));
    __VLS_159.slots.default;
    var __VLS_159;
    var __VLS_155;
}
var __VLS_103;
var __VLS_99;
const __VLS_160 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_161 = __VLS_asFunctionalComponent(__VLS_160, new __VLS_160({
    ...{ class: "py-4" },
}));
const __VLS_162 = __VLS_161({
    ...{ class: "py-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_161));
__VLS_163.slots.default;
const __VLS_164 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({
    ...{ 'onClick': {} },
    color: "primary",
    variant: "flat",
}));
const __VLS_166 = __VLS_165({
    ...{ 'onClick': {} },
    color: "primary",
    variant: "flat",
}, ...__VLS_functionalComponentArgsRest(__VLS_165));
let __VLS_168;
let __VLS_169;
let __VLS_170;
const __VLS_171 = {
    onClick: (__VLS_ctx.clearBattles)
};
__VLS_167.slots.default;
var __VLS_167;
const __VLS_172 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({
    ...{ 'onClick': {} },
    color: "primary",
}));
const __VLS_174 = __VLS_173({
    ...{ 'onClick': {} },
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_173));
let __VLS_176;
let __VLS_177;
let __VLS_178;
const __VLS_179 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:historyDialog', false);
    }
};
__VLS_175.slots.default;
var __VLS_175;
var __VLS_163;
var __VLS_95;
var __VLS_75;
const __VLS_180 = {}.VDialog;
/** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent(__VLS_180, new __VLS_180({
    modelValue: (__VLS_ctx.settingsDialog),
    transition: "dialog-bottom-transition",
    width: "720",
    opacity: ".8",
    scrollable: true,
}));
const __VLS_182 = __VLS_181({
    modelValue: (__VLS_ctx.settingsDialog),
    transition: "dialog-bottom-transition",
    width: "720",
    opacity: ".8",
    scrollable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_181));
__VLS_183.slots.default;
const __VLS_184 = {}.VToolbar;
/** @type {[typeof __VLS_components.VToolbar, typeof __VLS_components.vToolbar, typeof __VLS_components.VToolbar, typeof __VLS_components.vToolbar, ]} */ ;
// @ts-ignore
const __VLS_185 = __VLS_asFunctionalComponent(__VLS_184, new __VLS_184({
    color: "primary",
}));
const __VLS_186 = __VLS_185({
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_185));
__VLS_187.slots.default;
const __VLS_188 = {}.VToolbarTitle;
/** @type {[typeof __VLS_components.VToolbarTitle, typeof __VLS_components.vToolbarTitle, typeof __VLS_components.VToolbarTitle, typeof __VLS_components.vToolbarTitle, ]} */ ;
// @ts-ignore
const __VLS_189 = __VLS_asFunctionalComponent(__VLS_188, new __VLS_188({}));
const __VLS_190 = __VLS_189({}, ...__VLS_functionalComponentArgsRest(__VLS_189));
__VLS_191.slots.default;
var __VLS_191;
const __VLS_192 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_193 = __VLS_asFunctionalComponent(__VLS_192, new __VLS_192({
    ...{ 'onClick': {} },
    icon: "mdi-close",
}));
const __VLS_194 = __VLS_193({
    ...{ 'onClick': {} },
    icon: "mdi-close",
}, ...__VLS_functionalComponentArgsRest(__VLS_193));
let __VLS_196;
let __VLS_197;
let __VLS_198;
const __VLS_199 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:settingsDialog', false);
    }
};
var __VLS_195;
var __VLS_187;
const __VLS_200 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_201 = __VLS_asFunctionalComponent(__VLS_200, new __VLS_200({
    color: "white",
}));
const __VLS_202 = __VLS_201({
    color: "white",
}, ...__VLS_functionalComponentArgsRest(__VLS_201));
__VLS_203.slots.default;
const __VLS_204 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
const __VLS_205 = __VLS_asFunctionalComponent(__VLS_204, new __VLS_204({}));
const __VLS_206 = __VLS_205({}, ...__VLS_functionalComponentArgsRest(__VLS_205));
__VLS_207.slots.default;
const __VLS_208 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_209 = __VLS_asFunctionalComponent(__VLS_208, new __VLS_208({}));
const __VLS_210 = __VLS_209({}, ...__VLS_functionalComponentArgsRest(__VLS_209));
__VLS_211.slots.default;
const __VLS_212 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent(__VLS_212, new __VLS_212({
    cols: "12",
    md: "6",
}));
const __VLS_214 = __VLS_213({
    cols: "12",
    md: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_213));
__VLS_215.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-caption" },
});
const __VLS_216 = {}.VSwitch;
/** @type {[typeof __VLS_components.VSwitch, typeof __VLS_components.vSwitch, typeof __VLS_components.VSwitch, typeof __VLS_components.vSwitch, ]} */ ;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({
    modelValue: (__VLS_ctx.playerIsAuto),
    prependIcon: "mdi-robot-excited-outline",
}));
const __VLS_218 = __VLS_217({
    modelValue: (__VLS_ctx.playerIsAuto),
    prependIcon: "mdi-robot-excited-outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_217));
var __VLS_215;
const __VLS_220 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_221 = __VLS_asFunctionalComponent(__VLS_220, new __VLS_220({
    cols: "12",
    md: "6",
}));
const __VLS_222 = __VLS_221({
    cols: "12",
    md: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_221));
__VLS_223.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-caption" },
});
const __VLS_224 = {}.VSlider;
/** @type {[typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, ]} */ ;
// @ts-ignore
const __VLS_225 = __VLS_asFunctionalComponent(__VLS_224, new __VLS_224({
    modelValue: (__VLS_ctx.fightTime),
    showTicks: "always",
    step: "5",
    tickSize: "5",
    prependIcon: "mdi-timer-sand",
    ticks: ({
        20: 'Default'
    }),
    thumbLabel: true,
    min: (__VLS_ctx.minFightTime),
    max: (__VLS_ctx.maxFightTime),
}));
const __VLS_226 = __VLS_225({
    modelValue: (__VLS_ctx.fightTime),
    showTicks: "always",
    step: "5",
    tickSize: "5",
    prependIcon: "mdi-timer-sand",
    ticks: ({
        20: 'Default'
    }),
    thumbLabel: true,
    min: (__VLS_ctx.minFightTime),
    max: (__VLS_ctx.maxFightTime),
}, ...__VLS_functionalComponentArgsRest(__VLS_225));
var __VLS_223;
const __VLS_228 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_229 = __VLS_asFunctionalComponent(__VLS_228, new __VLS_228({
    cols: "12",
    md: "6",
}));
const __VLS_230 = __VLS_229({
    cols: "12",
    md: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_229));
__VLS_231.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-caption" },
});
const __VLS_232 = {}.VSlider;
/** @type {[typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, ]} */ ;
// @ts-ignore
const __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({
    modelValue: (__VLS_ctx.handicap),
    showTicks: "always",
    step: ".1",
    tickSize: "5",
    prependIcon: "mdi-glass-stange",
    ticks: ({
        0.5: 'Default'
    }),
    thumbLabel: true,
    min: (__VLS_ctx.minHandicap),
    max: (__VLS_ctx.maxHandicap),
}));
const __VLS_234 = __VLS_233({
    modelValue: (__VLS_ctx.handicap),
    showTicks: "always",
    step: ".1",
    tickSize: "5",
    prependIcon: "mdi-glass-stange",
    ticks: ({
        0.5: 'Default'
    }),
    thumbLabel: true,
    min: (__VLS_ctx.minHandicap),
    max: (__VLS_ctx.maxHandicap),
}, ...__VLS_functionalComponentArgsRest(__VLS_233));
var __VLS_231;
const __VLS_236 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_237 = __VLS_asFunctionalComponent(__VLS_236, new __VLS_236({
    cols: "12",
    md: "6",
}));
const __VLS_238 = __VLS_237({
    cols: "12",
    md: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_237));
__VLS_239.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-caption text-disabled" },
});
const __VLS_240 = {}.VSlider;
/** @type {[typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, ]} */ ;
// @ts-ignore
const __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({
    disabled: true,
    modelValue: (__VLS_ctx.difficult),
    showTicks: "always",
    step: "1",
    tickSize: "5",
    prependIcon: "mdi-robot-angry-outline",
    ticks: ({
        2: 'Default'
    }),
    thumbLabel: true,
    min: (__VLS_ctx.minDifficult),
    max: (__VLS_ctx.maxDifficult),
    messages: "Upcoming...",
}));
const __VLS_242 = __VLS_241({
    disabled: true,
    modelValue: (__VLS_ctx.difficult),
    showTicks: "always",
    step: "1",
    tickSize: "5",
    prependIcon: "mdi-robot-angry-outline",
    ticks: ({
        2: 'Default'
    }),
    thumbLabel: true,
    min: (__VLS_ctx.minDifficult),
    max: (__VLS_ctx.maxDifficult),
    messages: "Upcoming...",
}, ...__VLS_functionalComponentArgsRest(__VLS_241));
var __VLS_239;
var __VLS_211;
var __VLS_207;
const __VLS_244 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_245 = __VLS_asFunctionalComponent(__VLS_244, new __VLS_244({
    ...{ class: "py-4" },
}));
const __VLS_246 = __VLS_245({
    ...{ class: "py-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_245));
__VLS_247.slots.default;
const __VLS_248 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_249 = __VLS_asFunctionalComponent(__VLS_248, new __VLS_248({
    ...{ 'onClick': {} },
    color: "primary",
}));
const __VLS_250 = __VLS_249({
    ...{ 'onClick': {} },
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_249));
let __VLS_252;
let __VLS_253;
let __VLS_254;
const __VLS_255 = {
    onClick: (...[$event]) => {
        __VLS_ctx.emit('update:settingsDialog', false);
    }
};
__VLS_251.slots.default;
var __VLS_251;
var __VLS_247;
var __VLS_203;
var __VLS_183;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['v-row--no-gutters']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            emit: emit,
            helpDialog: helpDialog,
            historyDialog: historyDialog,
            settingsDialog: settingsDialog,
            minFightTime: minFightTime,
            maxFightTime: maxFightTime,
            minHandicap: minHandicap,
            maxHandicap: maxHandicap,
            minDifficult: minDifficult,
            maxDifficult: maxDifficult,
            playerIsAuto: playerIsAuto,
            fightTime: fightTime,
            handicap: handicap,
            difficult: difficult,
            battles: battles,
            clearBattles: clearBattles,
        };
    },
    emits: {},
    props: {
        helpDialog: { type: Boolean, default: false },
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
        helpDialog: { type: Boolean, default: false },
        historyDialog: { type: Boolean, default: false },
        settingsDialog: { type: Boolean, default: false }
    },
});
; /* PartiallyEnd: #4569/main.vue */
