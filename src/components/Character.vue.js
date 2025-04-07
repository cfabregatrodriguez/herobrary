import { ref } from 'vue';
// Components
import CharacterCard from '@/components/character/CharacterCard.vue';
import CharacterPowerBar from '@/components/character/CharacterPowerBar.vue';
import CharacterBarFight from '@/components/character/CharacterBarFight.vue';
// Pinia Stores
// Props
const __VLS_props = defineProps({
    character: { type: Object, required: true, default: () => ({}) },
    counter: { type: Number, default: 0 },
    isAuto: { type: Boolean, default: false },
    isCharacterPowerBar: { type: Boolean, default: false },
    isCharacterBarFight: { type: Boolean, default: true },
    isCharacterStats: { type: Boolean, default: true },
    isCharacterPublisher: { type: Boolean, default: true },
    compact: { type: Boolean, default: false },
    bgColor: { type: String, default: "#FFFFFF" },
    index: { type: Number, required: true },
    winLose: { type: Number, default: -1 },
    mode: { type: String, default: 'default' }
});
// Reactive variables
const divisionPassed = ref(0);
const emit = defineEmits();
// Event handlers
const handleFilled = () => {
    emit('filled', 0);
};
const handleDivisionPassed = (division) => {
    divisionPassed.value = division;
    emit('divisionPassed', division);
};
const handleCounterChange = (counter) => {
    emit('counterChange', counter);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.character) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (['hb-character', `hb-character--${__VLS_ctx.index}`, { 'hb-character--compact': __VLS_ctx.compact }]) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "d-flex" },
        ...{ style: {} },
    });
    /** @type {[typeof CharacterCard, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(CharacterCard, new CharacterCard({
        character: (__VLS_ctx.character),
        mode: (__VLS_ctx.mode),
        characterNum: (1),
        index: (__VLS_ctx.index),
        isCharacterStats: (__VLS_ctx.isCharacterStats),
        isCharacterPublisher: (__VLS_ctx.isCharacterPublisher),
        compact: (__VLS_ctx.compact),
        winLose: (__VLS_ctx.winLose),
    }));
    const __VLS_1 = __VLS_0({
        character: (__VLS_ctx.character),
        mode: (__VLS_ctx.mode),
        characterNum: (1),
        index: (__VLS_ctx.index),
        isCharacterStats: (__VLS_ctx.isCharacterStats),
        isCharacterPublisher: (__VLS_ctx.isCharacterPublisher),
        compact: (__VLS_ctx.compact),
        winLose: (__VLS_ctx.winLose),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    if (__VLS_ctx.isCharacterPowerBar) {
        /** @type {[typeof CharacterPowerBar, ]} */ ;
        // @ts-ignore
        const __VLS_3 = __VLS_asFunctionalComponent(CharacterPowerBar, new CharacterPowerBar({
            ...{ 'onDivisionPassed': {} },
            ...{ 'onUpdateCounter': {} },
            ...{ 'onFilled': {} },
            character: (__VLS_ctx.character),
            counter: (__VLS_ctx.counter),
            bgColor: (__VLS_ctx.bgColor),
            index: (__VLS_ctx.index),
        }));
        const __VLS_4 = __VLS_3({
            ...{ 'onDivisionPassed': {} },
            ...{ 'onUpdateCounter': {} },
            ...{ 'onFilled': {} },
            character: (__VLS_ctx.character),
            counter: (__VLS_ctx.counter),
            bgColor: (__VLS_ctx.bgColor),
            index: (__VLS_ctx.index),
        }, ...__VLS_functionalComponentArgsRest(__VLS_3));
        let __VLS_6;
        let __VLS_7;
        let __VLS_8;
        const __VLS_9 = {
            onDivisionPassed: (__VLS_ctx.handleDivisionPassed)
        };
        const __VLS_10 = {
            onUpdateCounter: (__VLS_ctx.handleCounterChange)
        };
        const __VLS_11 = {
            onFilled: (__VLS_ctx.handleFilled)
        };
        var __VLS_5;
    }
    if (__VLS_ctx.isCharacterBarFight) {
        /** @type {[typeof CharacterBarFight, ]} */ ;
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent(CharacterBarFight, new CharacterBarFight({
            ...{ 'onUpdateCounter': {} },
            isPlayer: (__VLS_ctx.index),
            character: (__VLS_ctx.character),
            counter: (__VLS_ctx.counter),
            bgColor: (__VLS_ctx.bgColor),
            isAuto: (__VLS_ctx.isAuto),
            divisionPassed: (__VLS_ctx.divisionPassed),
        }));
        const __VLS_13 = __VLS_12({
            ...{ 'onUpdateCounter': {} },
            isPlayer: (__VLS_ctx.index),
            character: (__VLS_ctx.character),
            counter: (__VLS_ctx.counter),
            bgColor: (__VLS_ctx.bgColor),
            isAuto: (__VLS_ctx.isAuto),
            divisionPassed: (__VLS_ctx.divisionPassed),
        }, ...__VLS_functionalComponentArgsRest(__VLS_12));
        let __VLS_15;
        let __VLS_16;
        let __VLS_17;
        const __VLS_18 = {
            onUpdateCounter: (__VLS_ctx.handleCounterChange)
        };
        var __VLS_14;
    }
}
/** @type {__VLS_StyleScopedClasses['hb-character']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-character--compact']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CharacterCard: CharacterCard,
            CharacterPowerBar: CharacterPowerBar,
            CharacterBarFight: CharacterBarFight,
            divisionPassed: divisionPassed,
            handleFilled: handleFilled,
            handleDivisionPassed: handleDivisionPassed,
            handleCounterChange: handleCounterChange,
        };
    },
    __typeEmits: {},
    props: {
        character: { type: Object, required: true, default: () => ({}) },
        counter: { type: Number, default: 0 },
        isAuto: { type: Boolean, default: false },
        isCharacterPowerBar: { type: Boolean, default: false },
        isCharacterBarFight: { type: Boolean, default: true },
        isCharacterStats: { type: Boolean, default: true },
        isCharacterPublisher: { type: Boolean, default: true },
        compact: { type: Boolean, default: false },
        bgColor: { type: String, default: "#FFFFFF" },
        index: { type: Number, required: true },
        winLose: { type: Number, default: -1 },
        mode: { type: String, default: 'default' }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    props: {
        character: { type: Object, required: true, default: () => ({}) },
        counter: { type: Number, default: 0 },
        isAuto: { type: Boolean, default: false },
        isCharacterPowerBar: { type: Boolean, default: false },
        isCharacterBarFight: { type: Boolean, default: true },
        isCharacterStats: { type: Boolean, default: true },
        isCharacterPublisher: { type: Boolean, default: true },
        compact: { type: Boolean, default: false },
        bgColor: { type: String, default: "#FFFFFF" },
        index: { type: Number, required: true },
        winLose: { type: Number, default: -1 },
        mode: { type: String, default: 'default' }
    },
});
; /* PartiallyEnd: #4569/main.vue */
