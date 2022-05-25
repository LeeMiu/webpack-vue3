import { createStore } from 'vuex'

export default createStore({
    state: {
        name: '臻宇'
    },

    mutations: {
        changeName(state) {
            const { name } = state;
            if (name === '臻宇') {
                state.name = '雪儿';
            } else {
                state.name = '臻宇';
            }
            console.log('state', state)
        }
    }
})