<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1 class="red--text">{{ post.title }}</h1>
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
    }
  }
</script>