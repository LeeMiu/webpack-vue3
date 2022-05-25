<template>
    <div>hello {{ name }}！！！</div>
    <img src="logo.jpg" alt="" class="src" @click="goback()">
    <br>
    <div @click="changeName">修改欢迎人</div>
</template>
<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup() {
        const router = useRouter();
        const store = useStore();

        // const name = ;
        
        const goback = () => {
            router.push({ path: '/detail' })
        };
        

        return {
            name: computed(() => store.state.name),
            changeName: () => store.commit('changeName'),
            goback
        }
    },

}
</script>