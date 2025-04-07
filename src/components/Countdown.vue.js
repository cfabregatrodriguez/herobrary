import { ref } from 'vue';
// Pinia Stores
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore(); // Using countdown store
// Props
const props = defineProps({
    maxCount: { type: Number, default: 10 }
});
// Emits
const emit = defineEmits(["finished"]);
// Reactive Variables
const count = ref(props.maxCount);
let interval = null;
const startCounting = () => {
    if (interval)
        clearInterval(interval);
    count.value = props.maxCount;
    interval = setInterval(() => {
        if (count.value > 0) {
            count.value--;
        }
        else if (countdownStore.isBattleActive) {
            clearInterval(interval);
            countdownStore.stopBattle();
            emit("finished"); // Emitir el evento solo si el combate sigue activo
        }
    }, 1000);
};
// Exponer el método startCounting
const __VLS_exposed = { startCounting };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hb-countdown" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    'data-testid': "countdown",
    ...{ class: "permanent-marker-regular" },
});
(__VLS_ctx.count);
/** @type {__VLS_StyleScopedClasses['hb-countdown']} */ ;
/** @type {__VLS_StyleScopedClasses['permanent-marker-regular']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            count: count,
        };
    },
    emits: {},
    props: {
        maxCount: { type: Number, default: 10 }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    emits: {},
    props: {
        maxCount: { type: Number, default: 10 }
    },
});
; /* PartiallyEnd: #4569/main.vue */
