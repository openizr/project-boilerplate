<!-- App router. -->
<script lang="ts">
  import type { Locale } from 'basx/i18n';
  import loadLocale from 'scripts/locale';
  import routes from 'scripts/store/routes';
  import { useCombiner } from 'scripts/store/index';
  // import ErrorPage from 'scripts/pages/Error.svelte';
  import Loader from 'scripts/components/Loader.svelte';
  import NotFoundPage from 'scripts/pages/NotFound.svelte';
  import type { RoutingContext } from 'diox/extensions/router';
  import { onMount, onDestroy, SvelteComponent } from 'svelte';

  let loading = true;
  // const hasError = false;
  let locale: Locale | null = null;
  let component: SvelteComponent | null = null;

  const router = useCombiner<RoutingContext>('router');
  const unsubscribe = router.subscribe(async (state: RoutingContext) => {
    // FOR REDIRECT LOGIC ONLY.
    // const newRoute = newState.path;
    // if (newRoute !== null && newRoute !== newState.path) {
    //   mutate('router', 'NAVIGATE', newRoute);
    // }
    const currentRoute = state.route || '';
    if (routes[currentRoute] !== undefined) {
      component = (await routes[currentRoute]()) as SvelteComponent;
    } else {
      component = null;
    }
    loading = false;
  });
  onDestroy(unsubscribe);

  onMount(() => {
    loadLocale().then((newLocale) => {
      locale = newLocale;
    });
  });
</script>

{#if locale === null || loading}
  <Loader />
  <!-- {:else if locale !== null && hasError}
  <ErrorPage {locale} /> -->
{:else if component !== null && locale !== null}
  <svelte:component this={component.default} {locale} />
{:else}
  <NotFoundPage {locale} />
{/if}
