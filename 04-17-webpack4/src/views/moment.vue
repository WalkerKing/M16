<template>
    <div>
        <h2>moment</h2>
        <p>{{now}}</p>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data () {
        return {
            now: moment().format('YYYY-MM-DD hh:mm:ss')
        }
    },
    created () {
        setInterval(() => {
            this.now = moment().format('YYYY-MM-DD hh:mm:ss')
        }, 500)
    },
}
</script>

<style>
</style>