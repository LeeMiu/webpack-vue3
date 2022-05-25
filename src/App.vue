<template>
    <router-view></router-view>
    <!-- <router-link to="/detail"></router-link> -->
</template>
<style lang="sass">
#app {
    div {
        color: pink;
        display: inline-block;
        animation: rotating 6s liner infinite;
    }
}

img {
    width: 40px;
}

@keyframes rotating {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>