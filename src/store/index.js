import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedPosts: [
      { imageUrl: 'https://image.stern.de/7916974/uncropped-0-0/238a697e4caeecbffcd8caf9631c7b4d/Wf/far-cry-5-cover.jpg', title: 'Post 1', id: 'fib2i3br3', date: '2017-04-09' },
      { imageUrl: 'http://www.ytgraphics.com/wp-content/uploads/2016/11/watch-dogs-2.jpg', title: 'This is Post 2', id: 'fiouub2huozb', date: '2017-04-05' }
    ],
    user: {
      id: 'bv3uzrb4vuzv',
      likes: ['fiouub2huozb']
    }
  },
  mutations: {},
  actions: {},
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
    }
  }
})
