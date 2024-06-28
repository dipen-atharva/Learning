<script lang="ts">
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      name: "prince",
      count: 10 as number
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment(): void {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted(): void {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <div class="container">
    <div>Name is: {{name }}</div>
    <button @click="increment">Count is: {{ count }}</button>
  </div>
</template>

<style scoped>
.container{
  display: grid;
  gap: 10px;

}
</style>