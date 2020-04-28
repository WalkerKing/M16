<template>
    <div>
        <h2>lodash</h2>
        <div>
            {{nums}}
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    data () {
        return {
            nums: []
        }
    },
    created () {
        this.nums = _.flattenDeep([1, [2, [3, [4]], 5]]);
    },
    methods: {

    },
}
</script>

<style>
</style>