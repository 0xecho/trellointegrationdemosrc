<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Select Organization</span>
      </v-card-title>
      <v-card-text>
        <v-select
          :items="organizations"
          label="Organization"
          v-model="selectedOrganization"
          item-text="name"
          item-value="id"
          @change="fetchBoards"
        ></v-select>
      </v-card-text>
      <v-card-text>
        <v-select
          :items="boards"
          label="Board"
          v-model="selectedBoard"
          item-text="name"
          item-value="id"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          dark
          @click="select"
        >
          Select
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>