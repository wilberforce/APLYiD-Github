import { createStore } from 'vuex'

export default createStore({
  state: {
    transistion: '',
    clientWidth: {}
  },
  mutations: {
    
    setWidth(state: any, el: any) {
      state.clientWidth={ width: el.clientWidth + 'px' };
    },
    setTransistion(state: any,trans: any) {
      state.transistion=trans.state;
    },
  }
})