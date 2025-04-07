import { ref, watch, computed, onMounted } from "vue";
// Props
const props = defineProps({
    character: {
        type: Object,
        required: false
    },
    counter: {
        type: Number,
        default: 0
    },
    bgColor: {
        type: String,
        default: "red",
    },
    index: {
        type: Number,
        default: 0
    }
});
const emit = defineEmits();
// Reactive Variables
const powerBarContainer = ref(null);
const passedDivisions = ref([]);
const messages = ref({});
// Watches
watch(() => props.counter, () => {
    if (props.counter <= 0)
        passedDivisions.value = [];
    const rectHeightInSVG = 50 + (props.counter * 2);
    const rectYInSVG = 1000 - rectHeightInSVG;
    for (let i = 1; i <= numDivisions.value; i++) {
        const divisionY = getDivisionY(i);
        if (rectYInSVG <= divisionY && !passedDivisions.value.includes(i)) {
            passedDivisions.value.push(i);
            emit('divisionPassed', i);
            messages.value[i] = true;
            setTimeout(() => {
                messages.value[i] = false;
            }, 500);
        }
    }
    if (rectYInSVG <= 0) {
        emit('filled');
    }
});
// Computed
const numDivisions = computed(() => {
    return props.character?.powerstats?.intelligence
        ? Math.max(1, Math.ceil(props.character.powerstats.intelligence / 20))
        : 1;
});
// Actions
function getDivisionY(i) {
    const totalHeight = 1000;
    const step = totalHeight / (numDivisions.value + 1);
    return totalHeight - i * step;
}
function getRadius(division) {
    return messages.value[division] ? 100 : 0;
}
function getOpacity(division) {
    return messages.value[division] ? 1 : 0;
}
// Expose properties and methods for testing
const __VLS_exposed = {
    numDivisions,
    getRadius,
    getOpacity,
};
defineExpose(__VLS_exposed);
// Lifecycle Hooks
onMounted(() => {
    passedDivisions.value = [];
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hb-power-bar" },
    ref: "powerBarContainer",
});
/** @type {typeof __VLS_ctx.powerBarContainer} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hb-power-bar__counter permanent-marker-regular" },
});
(Math.round(__VLS_ctx.counter));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hb-power-bar__in" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ style: {} },
    viewBox: "50 0 135 1000",
    ...{ class: "wave" },
    ...{ style: ({ filter: 'drop-shadow(0 -5px 5px ' + __VLS_ctx.bgColor + ')' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.defs, __VLS_intrinsicElements.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.filter, __VLS_intrinsicElements.filter)({
    id: "waveFilter",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.feTurbulence, __VLS_intrinsicElements.feTurbulence)({
    type: "fractalNoise",
    baseFrequency: "0.02",
    numOctaves: "5",
    result: "turbulence",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.animate)({
    attributeName: "baseFrequency",
    values: "0.015; 0.03; 0.015",
    dur: "10s",
    keyTimes: "0; 0.5; 1",
    keySplines: "0.25 0.8 0.25 1",
    repeatCount: "indefinite",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.feDisplacementMap)({
    in: "SourceGraphic",
    in2: "turbulence",
    scale: "100",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.rect)({
    filter: "url(#waveFilter)",
    y: (1000 - (0 + (__VLS_ctx.counter * 2))),
    height: (50 + (__VLS_ctx.counter * 2)),
    x: "0",
    width: "300",
    fill: (__VLS_ctx.bgColor),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({});
for (const [i] of __VLS_getVForSourceType((__VLS_ctx.numDivisions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.line)({
        x1: "300",
        x2: "150",
        y1: (__VLS_ctx.getDivisionY(i) + 40),
        y2: (__VLS_ctx.getDivisionY(i) + 40),
        stroke: "#ffb74d",
        'stroke-width': "4",
        'stroke-opacity': "1",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({});
for (const [division, index] of __VLS_getVForSourceType((__VLS_ctx.numDivisions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.circle)({
        fill: "#fff",
        cx: (180),
        cy: (__VLS_ctx.getDivisionY(division) + 40),
        r: (__VLS_ctx.getRadius(division)),
        ...{ class: "ok-message" },
        ...{ style: ([{ opacity: __VLS_ctx.getOpacity(division), transition: 'opacity 1s, r 0.5s' }, { zIndex: '9999' }]) },
    });
}
/** @type {__VLS_StyleScopedClasses['hb-power-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-power-bar__counter']} */ ;
/** @type {__VLS_StyleScopedClasses['permanent-marker-regular']} */ ;
/** @type {__VLS_StyleScopedClasses['hb-power-bar__in']} */ ;
/** @type {__VLS_StyleScopedClasses['wave']} */ ;
/** @type {__VLS_StyleScopedClasses['ok-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            powerBarContainer: powerBarContainer,
            numDivisions: numDivisions,
            getDivisionY: getDivisionY,
            getRadius: getRadius,
            getOpacity: getOpacity,
        };
    },
    __typeEmits: {},
    props: {
        character: {
            type: Object,
            required: false
        },
        counter: {
            type: Number,
            default: 0
        },
        bgColor: {
            type: String,
            default: "red",
        },
        index: {
            type: Number,
            default: 0
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeEmits: {},
    props: {
        character: {
            type: Object,
            required: false
        },
        counter: {
            type: Number,
            default: 0
        },
        bgColor: {
            type: String,
            default: "red",
        },
        index: {
            type: Number,
            default: 0
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
