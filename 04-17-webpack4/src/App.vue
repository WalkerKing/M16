<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'App',
    created () {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        // const type = connection.type;
        connection.addEventListener('change', () => {
            console.log('网络环境', connection.effectiveType);

        });
    }
}
</script>

<style>
</style>