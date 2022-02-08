<template>
  <Draggable>
      <div>
          Test Draggable
      </div>
  </Draggable>

</template>

<script>
import { Draggable } from '@braks/revue-draggable'

export default {
    name: 'Card',
    components: {
        Draggable
    },

}
</script>

<style>

</style>