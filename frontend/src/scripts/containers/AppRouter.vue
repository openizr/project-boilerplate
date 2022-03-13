<!-- App router. -->

<script lang="ts" setup>
import { Locale } from 'basx/i18n';
import routes from 'scripts/store/routes';
import { useCombiner } from 'scripts/store/index';
import { defineProps, defineAsyncComponent } from 'vue';
import AppLoader from 'scripts/components/AppLoader.vue';

defineProps<{
  locale: Locale;
}>();

const route = useCombiner('router', (newState) => newState.route || '');
const lazyComponents = Object.keys(routes).reduce((components, currentRoute) => ({
  ...components,
  [currentRoute]: defineAsyncComponent({
    loader: routes[currentRoute],
    loadingComponent: AppLoader,
    delay: 0,
    // errorComponent: ErrorComponent,
    timeout: 5000,
  }),
}), {});
</script>

<template>
  <component
    :is="lazyComponents[route]"
    v-if="routes[route] !== undefined"
    :locale="locale"
  />
</template>
