<!-- App router. -->

<script lang="ts" setup>
import { Locale } from 'basx/i18n';
import loadLocale from 'scripts/locale';
import routes from 'scripts/store/routes';
import { useCombiner } from 'scripts/store/index';
import ErrorPage from 'scripts/pages/ErrorPage.vue';
import { RoutingContext } from 'diox/extensions/router';
import AppLoader from 'scripts/components/AppLoader.vue';
import NotFoundPage from 'scripts/pages/NotFoundPage.vue';
import { defineAsyncComponent, onMounted, ref } from 'vue';

const locale = ref<Locale | null>(null);
const loading = ref<boolean>(true);
const router = useCombiner<RoutingContext>('router', (newState) => {
  // FOR REDIRECT LOGIC ONLY.
  // const newRoute = newState.path;
  // if (newRoute !== null && newRoute !== newState.path) {
  //   mutate('router', 'NAVIGATE', newRoute);
  // }
  loading.value = false;
  return ({ ...newState, route: newState.route || '' });
});
const lazyComponents = Object.keys(routes).reduce((components, currentRoute) => ({
  ...components,
  [currentRoute]: defineAsyncComponent({
    loader: routes[currentRoute],
    loadingComponent: AppLoader,
    delay: 200,
    errorComponent: ErrorPage,
    timeout: 5000,
  }),
}), {});

onMounted(() => {
  loadLocale().then((newLocale) => {
    locale.value = newLocale;
  });
});
</script>

<template>
  <app-loader v-if="locale === null || loading" />
  <component
    :is="lazyComponents[router.route]"
    v-else-if="routes[router.route] !== undefined && locale !== null"
    :locale="locale"
  />
  <not-found-page
    v-else
    :locale="locale"
  />
</template>
