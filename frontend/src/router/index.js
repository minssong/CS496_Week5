import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import CreateRoom from '../components/CreateRoom.vue';
import Room from '../components/Room.vue';
import UserView from '../components/UserView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/create',
      name: 'CreateRoom',
      component: CreateRoom,
    },
    {
      path: '/room/:roomId',
      name: 'Room',
      component: Room,
    },
    {
      path: '/user/:userId',
      name: 'User',
      component: UserView,
    },
  ],
});
