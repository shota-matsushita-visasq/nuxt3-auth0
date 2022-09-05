<script setup lang="ts">
const { counter, updateNum, plusOne } = useCounter();

const increment = () => {
  updateNum(counter.value.num + 1);
};
</script>

<template>
  <div>
    <p>Counter: {{ counter }}</p>
    <button @click="increment">+</button>
    <button @click="updateNum(counter.num - 1)">-</button>
    <p>Computed PlusOne: {{ plusOne }}</p>
  </div>
</template>
