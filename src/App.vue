<template>

  <div id="app">
    <el-button
      style="color: #333; position: absolute; top: 10px; z-index: 10000;"
      @click="clickInit"
    >测试</el-button>
    <router-view />
  </div>
</template>

<script>
import { initFn } from '@/utils/test.js'
import { testFn } from '@/utils/test2.js'
import { testFn3 } from '@/utils/test3.js'
export default {
  name: 'App',
  created() {},
  methods: {
    clickInit() {
      // initFn()
      // testFn()
      testFn3()
    }
  }
}
</script>
