<template>
    <div id="app">
        <transition name="fade">
            <router-view/>
        </transition>
    </div>
</template>

<style>
    #app {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }

    ul, li {
        list-style: none;
        padding: 0;
    }

    s, i, em {
        text-decoration: none;
        font-style: normal;
    }

</style>
