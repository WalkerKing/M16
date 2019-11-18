<template>
    <div class='hello'>
        <div id='ztreeContainer' class='ztree'></div>
    </div>
</template>

<script>
import $ from 'jquery';
import 'ztree';
const ztreeSetting = {
    check: {
        enable: true,
        chkDisabled: true
    },
    data: {
        // simpleData: {
        //     enable: true,
        // },
        // key: {
        //     children: 'childrenList',
        //     // name: 'carnum',
        //     name: 'title',
        // },
    },
    view: {
        showIcon: false,
        nameIsHTML: true,
        showTitle: false,
        txtSelectedEnable: false,
        fontCss: {
            cursor: 'default'
        }
    }
};
export default {
    name: 'HelloWorld',
    data() {
        return {
            ztree: null,
            treeListData: []
        };
    },
    mounted() {
        this.ztree = $.fn.zTree.init(
            '#ztreeContainer',
            ztreeSetting,
            this.treeListData
        );
    }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
