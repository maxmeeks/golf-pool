<template>
  <div
    class="w-full px-3 py-2 bg-white border-l border-b border-slate-300 flex space-x-3"
  >
    <div
      v-if="
        model.status?.position?.displayName &&
        model.status.position.displayName !== '-'
      "
      class="text-xs w-4"
    >
      {{ model.status?.position?.displayName }}
    </div>
    <div class="flex items-center w-12">
      <img
        v-if="model.athlete?.headshot?.href"
        :src="model.athlete?.headshot?.href"
        :alt="model.athlete?.headshot?.alt"
        class="w-12 rounded-[50%]"
      />
      <template v-else-if="viewsStore.event === 'masters'">
        <img
          alt="The masters"
          src="@/assets/masters-logo.png"
          class="w-full max-w-[200px]"
        />
      </template>
      <template v-else-if="viewsStore.event === 'pga'">
        <img
          alt="PGA Championship"
          src="@/assets/pga-championship-logo.png"
          class="w-12 rounded-[50%]"
        />
      </template>
      <template v-else-if="viewsStore.event === 'us open'">
        <img
          alt="Us Open"
          src="@/assets/us-open-logo.png"
          class="w-full max-w-[200px] mix-blend-multiply"
        />
      </template>
      <template v-else-if="viewsStore.event === 'open championship'">
        <img
          alt="The Open Championship"
          src="@/assets/open-championship-logo.png"
          class="w-full max-w-[200px] mix-blend-multiply"
        />
      </template>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="w-full uppercase md:text-lg">
        <template v-if="showPlayerId"> {{ model.athlete?.id }}</template>
        {{ model.athlete?.shortName }}
      </div>
      <div class="flex space-x-3 items-center">
        <div
          class="md:text-lg font-semibold"
          :class="[
            {
              'text-tournament-300':
                negativeScore &&
                model.status?.displayValue !== 'WD' &&
                model.status?.displayValue !== 'CUT',
            },
            {
              'text-tournament-100':
                positiveScore &&
                model.status?.displayValue !== 'WD' &&
                model.status?.displayValue !== 'CUT',
            },
          ]"
        >
          <template
            v-if="
              model.status?.displayValue === 'WD' ||
              model.status?.displayValue === 'CUT'
            "
          >
            {{ model.status?.displayValue }}
          </template>
          <template
            v-else-if="
              model.status?.type?.name === 'STATUS_SCHEDULED' &&
              model.status?.teeTime
            "
          >
            {{ teeTime }}
          </template>
          <template
            v-else-if="model.linescores[model.status?.period - 1]?.displayValue"
          >
            {{ model.linescores[model.status?.period - 1]?.displayValue }}
          </template>
        </div>
        <div
          v-if="model.status?.thru || model.status?.thru === '0'"
          class="text-xs uppercase"
          :class="{
            'text-tournament-100':
              model.status?.type?.name === 'STATUS_IN_PROGRESS',
          }"
        >
          Thru {{ model.status?.thru }}
        </div>
      </div>
    </div>
    <div
      class="flex font-semibold"
      :class="[
        {
          'text-tournament-300': model.statistics[0]?.value < 0,
        },
        {
          'text-tournament-100': model.statistics[0]?.value > 0,
        },
        {
          'text-tournament-500':
            model.status?.displayValue === 'WD' ||
            model.status?.displayValue === 'CUT' ||
            model.statistics[0]?.value === 0,
        },
      ]"
    >
      <template
        v-if="
          model.status?.displayValue === 'WD' ||
          model.status?.displayValue === 'CUT'
        "
      >
        {{ model.status?.displayValue }}
      </template>
      <template v-else>
        {{ model.statistics[0]?.displayValue }}
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { DateTime } from "luxon";
import { useViewsStore } from "@/stores/views";

const viewsStore = useViewsStore();

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  },
  showPlayerId: {
    type: Boolean,
    default: false,
  },
});

const negativeScore = computed(() => {
  if (!props.model.linescores || props.model.linescores.length < 1) {
    return false;
  }
  const letter =
    props.model.linescores[props.model.status.period - 1]?.displayValue?.charAt(
      0
    );

  if (
    props.model.linescores[props.model.status.period - 1]?.displayValue !==
      "-" &&
    letter === "-"
  ) {
    return true;
  } else {
    return false;
  }
});

const positiveScore = computed(() => {
  if (!props.model.linescores || props.model.linescores.length < 1) {
    return false;
  }

  const letter =
    props.model.linescores[props.model.status.period - 1]?.displayValue?.charAt(
      0
    );

  if (letter === "+") {
    return true;
  } else {
    return false;
  }
});

const teeTime = computed(() => {
  let time = props.model.status.teeTime;
  if (time) {
    time = DateTime.fromISO(time);

    return time.toLocaleString(DateTime.TIME_SIMPLE);
  } else {
    return "";
  }
});
</script>
