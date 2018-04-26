<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1 class="red--text">{{ post.title }}</h1>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-post-details-dialog></app-edit-post-details-dialog>
            </template>
          </v-card-title>
          <v-card-media :src="post.imageUrl" height="400px"></v-card-media>
          <v-card-text>
            <div>
              <div class="info--text mb-2">{{ post.date | date }} - {{ post.location }}</div>
              <hr>
              <div class="mt-2">{{ post.description }}</div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red">Like</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      post () {
        return this.$store.getters.loadedPost(this.id)
      }
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.post.creatorId
    }
  }
</script>