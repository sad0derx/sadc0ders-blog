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
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedPosts (state, payload) {
      state.loadedPosts = payload
    },
    createPost (state, payload) {
      state.loadedPosts.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadPosts ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('posts').once('value')
      .then((data) => {
        const posts = []
        const obj = data.val()
        for (let key in obj) {
          posts.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedPosts', posts)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    createPost ({commit, getters}, payload) {
      const post = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('posts').push(post)
      .then((data) => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('posts/' + key + '.' + ext).put(payload.image)
      })
      .then(fileData => {
        imageUrl = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('posts').child(key).update({imageUrl: imageUrl})
      })
      .then(() => {
        commit('createPost', {
          ...post,
          imageUrl: imageUrl,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            likes: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            likes: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, likes: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
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
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
