<!-- App message. -->
<script lang="ts">
  import testJpg from 'images/test.jpg';
  import testSvg from 'images/test.svg';

  export let label: string;
</script>

<p>
  <img alt="test" src={testJpg} />
  <img alt="test" src={testSvg} />
  {label}
</p>

<style scoped>
  img {
    display: block;
    width: 50px;
    height: 50px;
  }
</style>
