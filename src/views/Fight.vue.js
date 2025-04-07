import { ref, onMounted, watch, onUnmounted, computed } from "vue";
import { useDisplay } from 'vuetify';
// Reactive variables
const breakpoint = ref(useDisplay());
const counter = ref(0);
const counter2 = ref(0);
const countdownRef = ref();
const bgColor = ref('#3498db');
const bgColor2 = ref('red');
const totalBarsPassed = ref(0);
const winLose = ref(-1);
const showFightButton = ref(true);
// Pinia Stores
import { useStatsPlayerStore } from "@/stores/statsPlayerStore";
const statsPlayerStore = useStatsPlayerStore();
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore(); // Countdown store for managing countdown logic
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
const selectedCharactersStore = useSelectedCharactersStore();
// Components
import Character from '@/components/Character.vue';
import Countdown from "@/components/Countdown.vue";
// Props
// Computed
const fightTime = computed({
    get: () => statsPlayerStore.fightTime,
    set: (value) => statsPlayerStore.setFightTime(value),
});
const playerIsAuto = computed({
    get: () => statsPlayerStore.playerIsAuto,
    set: (value) => statsPlayerStore.playerIsAuto = value,
});
// Methods
const handleCounterChange = (value) => {
    counter.value = value;
    if (counter.value < 0)
        counter.value = 0;
};
const handleCounterChange2 = (value) => {
    counter2.value = value;
    if (counter2.value < 0)
        counter2.value = 0;
};
const handleDivisionPassed = (passedBars) => {
    totalBarsPassed.value = passedBars;
};
const handleDivisionPassed2 = (passedBars) => {
    totalBarsPassed.value = passedBars;
};
const toggleFight = () => {
    winLose.value = -1;
    startCountdown();
};
const startCountdown = () => {
    counter2.value = 0;
    counter.value = 0;
    countdownStore.startCountdown();
    countdownStore.startBattle();
    if (countdownRef.value) {
        countdownRef.value.startCounting();
    }
    else {
        console.error("countdownRef is not available");
    }
};
const endBattle = () => {
    countdownStore.stopCountdown();
    countdownStore.stopBattle();
    statsPlayerStore.addBattle(Number(selectedCharactersStore.getCharacterByIndex(0).id), Number(selectedCharactersStore.getCharacterByIndex(1).id), counter.value, counter2.value, selectedCharactersStore.getCharacterByIndex(0)?.images.xs, selectedCharactersStore.getCharacterByIndex(1)?.images.xs);
    if (counter.value > counter2.value) {
        statsPlayerStore.recordWin();
        winLose.value = 1;
    }
    else {
        statsPlayerStore.recordLoss();
        winLose.value = 0;
    }
};
const handleKeyPress = (event) => {
    if (event.code === "Space" && showFightButton.value) {
        event.preventDefault();
        toggleFight();
    }
};
// Watchers
watch(() => selectedCharactersStore.selectedCharacters, () => {
    winLose.value = -1;
}, { deep: true });
watch(() => countdownStore.isCountdownActive, (newValue) => {
    if (!newValue) {
        setTimeout(() => {
            showFightButton.value = true;
            winLose.value = -1;
        }, 3000);
    }
    else {
        showFightButton.value = false;
    }
});
// Lifecycle hooks
onMounted(async () => {
    window.addEventListener("keydown", handleKeyPress);
});
onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hb-fight__backgroundBar" },
    ...{ style: (__VLS_ctx.breakpoint.xs ? 'height: 100%' : '') },
});
const __VLS_0 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "hb-fight__container flex-column flex-sm-row justify-center align-center" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "hb-fight__container flex-column flex-sm-row justify-center align-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    cols: "12",
    sm: "5",
    ...{ class: "pt-0 pr-0" },
}));
const __VLS_6 = __VLS_5({
    cols: "12",
    sm: "5",
    ...{ class: "pt-0 pr-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
if (__VLS_ctx.selectedCharactersStore.getCharacterByIndex(0)) {
    /** @type {[typeof Character, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(Character, new Character({
        ...{ 'onDivisionPassed': {} },
        ...{ 'onCounterChange': {} },
        ...{ 'onFilled': {} },
        mode: ('fight'),
        ...{ class: "hb-character--fight--0" },
        character: (__VLS_ctx.selectedCharactersStore.getCharacterByIndex(0)),
        counter: (__VLS_ctx.counter),
        bgColor: (__VLS_ctx.bgColor),
        isAuto: (__VLS_ctx.playerIsAuto),
        index: (0),
        isCharacterPowerBar: (true),
        winLose: (__VLS_ctx.winLose),
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onDivisionPassed': {} },
        ...{ 'onCounterChange': {} },
        ...{ 'onFilled': {} },
        mode: ('fight'),
        ...{ class: "hb-character--fight--0" },
        character: (__VLS_ctx.selectedCharactersStore.getCharacterByIndex(0)),
        counter: (__VLS_ctx.counter),
        bgColor: (__VLS_ctx.bgColor),
        isAuto: (__VLS_ctx.playerIsAuto),
        index: (0),
        isCharacterPowerBar: (true),
        winLose: (__VLS_ctx.winLose),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_11;
    let __VLS_12;
    let __VLS_13;
    const __VLS_14 = {
        onDivisionPassed: (__VLS_ctx.handleDivisionPassed)
    };
    const __VLS_15 = {
        onCounterChange: (__VLS_ctx.handleCounterChange)
    };
    const __VLS_16 = {
        onFilled: (__VLS_ctx.endBattle)
    };
    var __VLS_10;
}
else {
    const __VLS_17 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        to: "/",
    }));
    const __VLS_19 = __VLS_18({
        to: "/",
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_20.slots.default;
    const __VLS_21 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        color: "white",
    }));
    const __VLS_23 = __VLS_22({
        color: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_24.slots.default;
    var __VLS_24;
    var __VLS_20;
}
var __VLS_7;
const __VLS_25 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    cols: "12",
    sm: "2",
}));
const __VLS_27 = __VLS_26({
    cols: "12",
    sm: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
if (__VLS_ctx.selectedCharactersStore.getCharacterByIndex(0) &&
    __VLS_ctx.selectedCharactersStore.getCharacterByIndex(1)) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "d-flex align-center justify-center hb-countdown-fight" },
    });
    if (__VLS_ctx.showFightButton) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "d-block hb-countdown-fight--in my-0 my-sm-6" },
        });
        const __VLS_29 = {}.VBtn;
        /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
            ...{ 'onClick': {} },
            color: "secondary",
            variant: "outlined",
            ...{ class: "hb-btn--fight hb-animation--glow permanent-marker-regular" },
            icon: "",
            width: "100",
            height: "100",
        }));
        const __VLS_31 = __VLS_30({
            ...{ 'onClick': {} },
            color: "secondary",
            variant: "outlined",
            ...{ class: "hb-btn--fight hb-animation--glow permanent-marker-regular" },
            icon: "",
            width: "100",
            height: "100",
        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        let __VLS_33;
        let __VLS_34;
        let __VLS_35;
        const __VLS_36 = {
            onClick: (__VLS_ctx.toggleFight)
        };
        __VLS_32.slots.default;
        var __VLS_32;
    }
    /** @type {[typeof Countdown, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(Countdown, new Countdown({
        ...{ 'onFinished': {} },
        ref: "countdownRef",
        maxCount: (__VLS_ctx.fightTime),
    }));
    const __VLS_38 = __VLS_37({
        ...{ 'onFinished': {} },
        ref: "countdownRef",
        maxCount: (__VLS_ctx.fightTime),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    let __VLS_40;
    let __VLS_41;
    let __VLS_42;
    const __VLS_43 = {
        onFinished: (__VLS_ctx.endBattle)
    };
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.countdownStore.isCountdownActive) }, null, null);
    /** @type {typeof __VLS_ctx.countdownRef} */ ;
    var __VLS_44 = {};
    var __VLS_39;
}
var __VLS_28;
const __VLS_46 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    cols: "12",
    sm: "5",
    ...{ class: "pt-0 pr-0" },
}));
const __VLS_48 = __VLS_47({
    cols: "12",
    sm: "5",
    ...{ class: "pt-0 pr-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
__VLS_49.slots.default;
if (__VLS_ctx.selectedCharactersStore.getCharacterByIndex(1)) {
    /** @type {[typeof Character, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(Character, new Character({
        ...{ 'onDivisionPassed': {} },
        ...{ 'onCounterChange': {} },
        ...{ 'onFilled': {} },
        mode: ('fight'),
        ...{ class: "hb-character--fight--1" },
        character: (__VLS_ctx.selectedCharactersStore.getCharacterByIndex(1)),
        counter: (__VLS_ctx.counter2),
        bgColor: (__VLS_ctx.bgColor2),
        isAuto: (true),
        index: (1),
        isCharacterPowerBar: (true),
        winLose: (__VLS_ctx.winLose),
    }));
    const __VLS_51 = __VLS_50({
        ...{ 'onDivisionPassed': {} },
        ...{ 'onCounterChange': {} },
        ...{ 'onFilled': {} },
        mode: ('fight'),
        ...{ class: "hb-character--fight--1" },
        character: (__VLS_ctx.selectedCharactersStore.getCharacterByIndex(1)),
        counter: (__VLS_ctx.counter2),
        bgColor: (__VLS_ctx.bgColor2),
        isAuto: (true),
        index: (1),
        isCharacterPowerBar: (true),
        winLose: (__VLS_ctx.winLose),
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    let __VLS_53;
    let __VLS_54;
    let __VLS_55;
    const __VLS_56 = {
        onDivisionPassed: (__VLS_ctx.handleDivisionPassed2)
    };
    const __VLS_57 = {
        onCounterChange: (__VLS_ctx.handleCounterChange2)
    };
    const __VLS_58 = {
        onFilled: (__VLS_ctx.endBattle)
    };
    var __VLS_52;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_59 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
        to: "/",
    }));
    const __VLS_61 = __VLS_60({
        to: "/",
    }, ...__VLS_functionalComponentArgsRest(__VLS_60));
    __VLS_62.slots.default;
    const __VLS_63 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        color: "white",
    }));
    const __VLS_65 = __VLS_64({
        color: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    __VLS_66.slots.default;
    var __VLS_66;
    var __VLS_62;
}
var __VLS_49;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['hb-fight__backgroundBar']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-fight__container']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-sm-row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-0']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-character--fight--0']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-countdown-fight']} */ ;
/** @type {__VLS_StyleScopedClasses['d-block']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-countdown-fight--in']} */ ;
/** @type {__VLS_StyleScopedClasses['my-0']} */ ;
/** @type {__VLS_StyleScopedClasses['my-sm-6']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-btn--fight']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-animation--glow']} */ ;
/** @type {__VLS_StyleScopedClasses['permanent-marker-regular']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-0']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-character--fight--1']} */ ;
// @ts-ignore
var __VLS_45 = __VLS_44;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            breakpoint: breakpoint,
            counter: counter,
            counter2: counter2,
            countdownRef: countdownRef,
            bgColor: bgColor,
            bgColor2: bgColor2,
            winLose: winLose,
            showFightButton: showFightButton,
            countdownStore: countdownStore,
            selectedCharactersStore: selectedCharactersStore,
            Character: Character,
            Countdown: Countdown,
            fightTime: fightTime,
            playerIsAuto: playerIsAuto,
            handleCounterChange: handleCounterChange,
            handleCounterChange2: handleCounterChange2,
            handleDivisionPassed: handleDivisionPassed,
            handleDivisionPassed2: handleDivisionPassed2,
            toggleFight: toggleFight,
            endBattle: endBattle,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
