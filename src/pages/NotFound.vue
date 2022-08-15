<template>
  <div>
    <p class="panel-404">
      404 - missing page {{path.fullPath}}
    </p>
  </div>
</template>

<script>
  import {
    useRouter
  } from 'vue-router';

  import {
    defineComponent, ref
  } from 'vue'

  export default defineComponent({
      setup: () => {
      
      const r = useRouter();
      const path = ref(r.currentRoute)
    return { path}     
}
  })
</script>

<style scoped>
  .panel-404 {
    background-color: #ededed;
    border-radius: 6px;
    padding: 1em;
  }
  </style>