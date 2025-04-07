import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { VProgressLinear } from 'vuetify/components';
import { useBarFightZones } from "@/composables/useBarFightZones";
import { useBarFightControls } from "@/composables/useBarFightControls";
import { useBarFightBar } from "@/composables/useBarFightBar";
// Props definition
const props = defineProps({
    character: { type: Object, required: false },
    bgColor: { type: String, default: "red" },
    isAuto: { type: Boolean, default: false },
    counter: { type: Number, default: 1 },
    divisionPassed: { type: Number, default: 1 },
    isPlayer: { type: Number, default: 0 }
});
// Pinia Stores
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore();
import { useStatsPlayerStore } from "@/stores/statsPlayerStore";
const statsPlayerStore = useStatsPlayerStore();
const emit = defineEmits();
// Reactive variables
const progressBarRef = ref(null);
const divisionPassedRef = ref(props.divisionPassed);
// Refs for player
let interval = null;
const holdTime = ref(0);
// Refs for auto player
const baseHoldIntervalAuto = 100;
const baseChanceToHitAuto = 1;
const isAutoClick = ref(false);
let intervalAutoClicks;
const autoBonusCounter = ref(1);
// Functions
const { calculateZones } = useBarFightZones();
// Function that updates the counter value based on the current zone and various conditions
const updateCounterValue = () => {
    let bonusFinal;
    // If the current zone is a combat zone, reset the hold timer
    if (isInCombatZone.value) {
        bonusFinal = bonus.value;
        if (holdTimer.value) {
            clearInterval(holdTimer.value); // Stop the hold timer when inside a combat zone
            holdTimer.value = null;
        }
        holdTime.value = 0;
    }
    else if (currentZone.value?.type === "power") {
        // If the current zone is a power zone, apply an additional bonus
        bonusFinal = bonus.value * 1.5; // Additional bonus for the powerZone
    }
    else {
        // If not in combat zone or power zone, use the hold time as bonus
        bonusFinal = (holdTime.value / 2) * handicap.value;
    }
    let newValue;
    // If the character is inside a colored zone, increase the counter by bonus
    if (isInsideColoredZone.value) {
        newValue = props.counter + bonusFinal;
    }
    else {
        // If not inside a colored zone, decrease the counter by penalty and reset the hold timer
        newValue = props.counter - penalty.value;
        if (holdTimer.value) {
            clearInterval(holdTimer.value); // Reset the hold timer when not inside a colored zone
            holdTimer.value = null;
        }
        holdTime.value = 0;
    }
    // Ensure the new value does not go below zero
    newValue = Math.max(newValue, 0);
    // Emit the updated counter value
    emit("updateCounter", newValue);
};
const { isHolding, holdTimer, handleStart, // Cambia handleKeyDown por handleStart
handleKeyUp, } = useBarFightControls(countdownStore, updateCounterValue);
const { maxTotalWidth, minibarPos, updateBarWidth, updateWidth, moveMinibar, } = useBarFightBar();
const handicap = computed({
    get: () => statsPlayerStore.handicap,
    set: (value) => statsPlayerStore.setHandicap(value),
});
const currentZone = computed(() => coloredZones.value.find((zone) => minibarPos.value + minibarWidth.value > zone.start &&
    minibarPos.value < zone.start + zone.width));
const isInsideColoredZone = computed(() => !!currentZone.value);
const isInCombatZone = computed(() => currentZone.value?.type === 'combat');
const coloredZones = computed(() => {
    if (!props.character || maxTotalWidth.value <= 1)
        return [];
    const { combat, power } = props.character.powerstats;
    return calculateZones(power, combat, maxTotalWidth.value, divisionPassedRef.value);
});
// Computed stats
const speed = computed(() => {
    if (!props.character)
        return 1;
    return Math.exp((75 - props.character.powerstats.speed / 1.5) * 0.02);
});
const minibarWidth = computed(() => {
    if (!props.character)
        return 20;
    return Math.max(5, props.character.powerstats.intelligence / 2 - 10);
});
const penalty = computed(() => {
    if (!props.character)
        return 4;
    return (props.counter * ((15 - props.character.powerstats.durability / 10)) / 100) * handicap.value;
});
const bonus = computed(() => {
    if (!props.character)
        return 1;
    return (1 + props.character.powerstats.strength / 4) * handicap.value;
});
// Methods
const handleAutoModeChange = (autoMode) => {
    if (intervalAutoClicks) {
        clearInterval(intervalAutoClicks); // Clear the previous interval if it exists
    }
    if (autoMode || props.isPlayer == 1) {
        intervalAutoClicks = setInterval(() => {
            if (countdownStore.isCountdownActive) {
                updateCounterValueAuto();
            }
        }, baseHoldIntervalAuto);
    }
    else {
        window.addEventListener("keydown", handleStart);
        window.addEventListener("keyup", handleKeyUp);
    }
};
// Function that automatically updates the counter value based on the current zone and random events
const updateCounterValueAuto = () => {
    const zoneWidth = currentZone.value ? currentZone.value.width : 0; // Width of the colored zone
    const randomValue = Math.random(); // Generate a random value between 0 and 1
    // Calculate the reduction of the hit chance based on the character's speed
    const speedFactor = Math.pow((props.character?.powerstats.speed || 0) / 100, 2);
    // The speedFactor will reduce the hit chance as speed decreases from 100 to 0.
    if (randomValue <= (isInCombatZone.value ? .8 : .95)) {
        autoBonusCounter.value += 1;
        isAutoClick.value = true; // Simulate an automatic click
    }
    else {
        autoBonusCounter.value = 1; // Reset the automatic bonus counter
        isAutoClick.value = false;
    }
    // Calculate the final bonus based on whether we're in a combat zone
    const bonusFinal = isInCombatZone.value ? bonus.value / 2 : autoBonusCounter.value * handicap.value;
    let newValue = 0;
    // Calculate the precision based on the zone width and speed-modified hit chance
    const factor = 1.3;
    const rawPrecision = Math.pow(zoneWidth, baseChanceToHitAuto);
    const precision = Math.max(0.05, Math.min(0.95, rawPrecision * factor * speedFactor)); // Modify precision with speed factor
    // If we're inside a colored zone and the random value is less than or equal to the adjusted precision, increase the counter
    if (isInsideColoredZone.value && randomValue <= precision) {
        newValue = props.counter + bonusFinal;
    }
    // If the random value is less than or equal to 0.1, reset the automatic bonus counter and apply penalty
    else if (randomValue <= 0.1) {
        autoBonusCounter.value = 1;
        isAutoClick.value = true;
        newValue = props.counter - penalty.value; // Apply the penalty
    }
    // If none of the above conditions are met, keep the counter the same
    else {
        isAutoClick.value = false;
        newValue = props.counter;
        autoBonusCounter.value = 1;
    }
    // Ensure the value doesn't go below zero
    newValue = Math.max(newValue, 0);
    // Emit the updated counter value
    emit("updateCounter", newValue);
};
// Watchers
// Observe when countdownStore.isCountdownActive changes
watch(() => countdownStore.isCountdownActive, (newValue) => {
    if (newValue) {
        nextTick(() => updateBarWidth(progressBarRef.value?.$el ?? null, minibarWidth.value, props.isPlayer));
        divisionPassedRef.value = 0;
        // Activate the interval when isCountdownActive is true
        interval = setInterval(() => moveMinibar(speed.value, minibarWidth.value), 12);
    }
    else {
        // Clear the interval when isCountdownActive is false
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
});
watch(() => props.divisionPassed, (newValue) => {
    divisionPassedRef.value = newValue;
});
// Watch to react to changes in isAuto
watch(() => statsPlayerStore.playerIsAuto, (newValue) => {
    handleAutoModeChange(newValue);
});
// Lifecycle Hooks
onMounted(() => {
    nextTick(() => {
        updateBarWidth(progressBarRef.value?.$el ?? null, minibarWidth.value, props.isPlayer);
        updateWidth(progressBarRef.value?.$el ?? null);
    });
    window.addEventListener("resize", () => updateBarWidth(progressBarRef.value?.$el ?? null, minibarWidth.value, props.isPlayer));
    handleAutoModeChange(statsPlayerStore.playerIsAuto);
    window.addEventListener("keydown", handleStart);
    window.addEventListener("keyup", handleKeyUp);
});
// Clear intervals when the countdown ends
onUnmounted(() => {
    if (interval)
        clearInterval(interval);
    if (holdTimer.value)
        clearInterval(holdTimer.value);
    if (intervalAutoClicks)
        clearInterval(intervalAutoClicks);
    window.removeEventListener("resize", () => updateBarWidth(progressBarRef.value?.$el ?? null, minibarWidth.value, props.isPlayer));
    window.removeEventListener("keydown", handleStart);
    window.removeEventListener("keyup", handleKeyUp);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.character) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "hb-barfight d-flex flex-column align-center" },
    });
    const __VLS_0 = {}.VProgressLinear;
    /** @type {[typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ref: "progressBarRef",
        ...{ class: "position-relative" },
        ...{ style: {} },
    }));
    const __VLS_2 = __VLS_1({
        ref: "progressBarRef",
        ...{ class: "position-relative" },
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {typeof __VLS_ctx.progressBarRef} */ ;
    var __VLS_4 = {};
    __VLS_3.slots.default;
    for (const [zone, index] of __VLS_getVForSourceType((__VLS_ctx.coloredZones))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "hb-barfight__colored-zones position-absolute" },
            ...{ style: ({
                    left: zone.start + 'px',
                    width: zone.width + 'px',
                    height: '30px',
                    backgroundColor: zone.color
                }) },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "hb-barfight__minibar position-absolute" },
        ...{ style: ({
                left: __VLS_ctx.minibarPos + 'px',
                width: __VLS_ctx.minibarWidth + 'px',
                height: '100%',
            }) },
        ...{ class: ((__VLS_ctx.isHolding || __VLS_ctx.isAutoClick) && __VLS_ctx.countdownStore.isCountdownActive ? 'hb-barfight__minibar--hit' : '') },
    });
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['hb-barfight']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['position-relative']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-barfight__colored-zones']} */ ;
/** @type {__VLS_StyleScopedClasses['position-absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-barfight__minibar']} */ ;
/** @type {__VLS_StyleScopedClasses['position-absolute']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            VProgressLinear: VProgressLinear,
            countdownStore: countdownStore,
            progressBarRef: progressBarRef,
            isAutoClick: isAutoClick,
            isHolding: isHolding,
            minibarPos: minibarPos,
            coloredZones: coloredZones,
            minibarWidth: minibarWidth,
        };
    },
    __typeEmits: {},
    props: {
        character: { type: Object, required: false },
        bgColor: { type: String, default: "red" },
        isAuto: { type: Boolean, default: false },
        counter: { type: Number, default: 1 },
        divisionPassed: { type: Number, default: 1 },
        isPlayer: { type: Number, default: 0 }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    props: {
        character: { type: Object, required: false },
        bgColor: { type: String, default: "red" },
        isAuto: { type: Boolean, default: false },
        counter: { type: Number, default: 1 },
        divisionPassed: { type: Number, default: 1 },
        isPlayer: { type: Number, default: 0 }
    },
});
; /* PartiallyEnd: #4569/main.vue */
