<template>
  <div id="app-stage"><slot></slot></div>
</template>
<script>
export default {
  name: 'app-stage'
}
</script>
<style lang="scss">
#app-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
