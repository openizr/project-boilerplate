<!-- Home page. -->
<script lang="ts">
  import type { Locale } from 'basx/i18n';
  import Message from 'scripts/components/Message.svelte';

  export let locale: Locale;
</script>

<Message label={locale.LABEL_TEST} />
