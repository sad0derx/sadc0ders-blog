<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 class="pt-2 pr-2 pb-2 pl-2" v-for="post in posts" :key="post.id">
        <v-card>
          <v-card-media :src="post.imageUrl" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h1 class="headline mb-0">{{ post.title }}</h1>
            <div>lorem Ipsum dolor sit amet dolor is gay lol lmao hahahhahahaha ...</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="red" :to="'/posts/' + post.id">
              View Post
              <v-icon right>arrow_forward</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      posts () {
        return this.$store.getters.loadedPosts
      }
    }
  }
</script>