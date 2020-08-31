<template>
<div id="index">
    <keep-alive>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </keep-alive>
</div>
</template>

<script>
    export default {
        data() {
            return {}
        },
    }
</script>
<style>
    #index {
        height: 100%;
        padding-bottom: 40px;
        overflow-y: scroll;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
    .mu-modal-icon {
        float: left;
    }
</style>
