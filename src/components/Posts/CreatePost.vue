<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="red--text">Create a new Post</h1>
        <!-- <hr> -->
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="onCreatePost">
          <v-layout row>
            <v-flex xs12>
              <v-text-field name="title" label="Title" id="titel" v-model="title" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field name="location" label="Location" id="location" v-model="location" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input type="file" style="display: none;" ref="fileInput" accept="image/*" @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <img :src="imageUrl" height="150px">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field name="description" label="Description" id="description" v-model="description" multi-line required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Post</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        image: null
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
      }
    },
    methods: {
      onCreatePost () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const postData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: new Date()
        }
        this.$store.dispatch('createPost', postData)
        this.$router.push('/posts')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>