import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedPosts: [
      { imageUrl: 'https://image.stern.de/7916974/uncropped-0-0/238a697e4caeecbffcd8caf9631c7b4d/Wf/far-cry-5-cover.jpg',
        title: 'Post 1',
        id: 'fib2i3br3',
        date: new Date(),
        location: 'New York',
        description: 'New yourk, lmao'
      },
      { imageUrl: 'http://www.ytgraphics.com/wp-content/uploads/2016/11/watch-dogs-2.jpg',
        title: 'This is Post 2',
        id: 'fiouub2huozb',
        date: new Date(),
        location: 'York',
        description: 'This is some freaking test lol'
      }
    ],
    user: null
  },
  mutations: {
    createPost (state, payload) {
      state.loadedPosts.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createPost ({commit}, payload) {
      const post = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'vf432uvdad'
      }
      // Reach out to firebase and store it
      commit('createPost', post)
    },

    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            likes: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            likes: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
    }
  },
  getters: {
    loadedPosts (state) {
      return state.loadedPosts.sort((postA, postB) => {
        return postMessage.date > postB.date
      })
    },
    featuredPosts (state, getters) {
      return getters.loadedPosts.slice(0, 5)
    },
    loadedPost (state) {
      return (postId) => {
        return state.loadedPosts.find((post) => {
          return post.id === postId
        })
      }
    },
    user (state) {
      return state.user
    }
  }
})
