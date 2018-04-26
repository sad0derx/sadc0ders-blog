<template>
  <v-container>
    <v-layout row wrap>

      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/posts" class="primary">Explore Posts</v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/posts/new" class="primary">Create Posts</v-btn>
      </v-flex>

    </v-layout>

    <v-layout row>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap>

      <v-flex xs12 class="mt-3" v-if="!loading">
        <v-carousel>
          <v-carousel-item v-for="post in posts" :src="post.imageUrl" :key="post.id">
            <div class="title">
              {{ post.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>

      <v-flex xs12 class="mt-2">
        <p class="text-xs-center">Join my awesome Blog!</p>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      posts () {
        return this.$store.getters.featuredPosts
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
    }
  }
</script>

<style>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,.5);
    color: #fff;
    font-size: 2em;
    padding: 20px;
  }
</style>
