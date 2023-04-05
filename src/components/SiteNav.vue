<template>
  <!-- default-active visually selects the correct nav button when you load the page through the URL bar -->
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
  >
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/about">About</el-menu-item>
  </el-menu>
</template>
