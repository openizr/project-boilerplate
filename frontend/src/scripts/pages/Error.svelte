<!-- Error page. -->
<script lang="ts">
  import type { Locale } from 'basx/i18n';

  export let locale: Locale;
</script>

<div>Error.{typeof locale}</div>
