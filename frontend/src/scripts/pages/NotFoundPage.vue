<!-- Not Found page. -->

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Locale } from 'basx/i18n';

defineProps<{
  locale: Locale;
}>();
</script>

<template>
  <div>Not Found.{{ typeof locale }}</div>
</template>
