<template>
    <div>
        愿你有前进一寸的勇气， 亦有后退一尺的从容
    </div>
    <br>
    <div class="back" @click="back">返回</div>
</template>
<script>
import { useRouter } from 'vue-router';
export default {
    setup() {

        const router = useRouter()

        const back = () => {
            router.back()
        }

        return {
            back
        }
    },
}
</script>
<style lang="sass" scoped>
.back { 
    color: black;
}
</style>