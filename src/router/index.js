import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Posts from '@/components/Posts/Posts'
import CreatePost from '@/components/Posts/CreatePost'
import Post from '@/components/Posts/Post'
import Profile from '@/components/User/Profile'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import About from '@/components/About'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'CreatePost',
      component: CreatePost,
      beforeEnter: AuthGuard
    },
    {
      path: '/posts/:id',
      name: 'Post',
      props: true,
      component: Post
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ],
  mode: 'history'
})
