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
              <div class="info--text mb-2">{{ post.date }} - What's going on in the World lul :D</div>
              <hr>
              <div class="mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis natus illum beatae. Molestiae corrupti veniam obcaecati nesciunt illo fugiat dolorum neque ducimus tenetur deleniti. Temporibus obcaecati itaque illum sapiente ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore vero, ipsum eligendi quod nesciunt laborum et, similique quos veniam at ab officia est qui? Esse nemo ad voluptas cumque inventore?</div>
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