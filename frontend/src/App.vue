<script setup>
import { ref } from 'vue';
import { HomeOutlined, UserOutlined, FileOutlined } from '@ant-design/icons-vue';
import Home from './components/Home.vue'

const collapsed = ref(true);
</script>

<template>
  <a-layout style="min-height: 100vh; height: 100%">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <HomeOutlined />
          <span>Home</span>
        </a-menu-item>
        <a-menu-item key="2">
          <UserOutlined />
          <span>Usuários</span>
        </a-menu-item>
        <a-menu-item key="3">
          <FileOutlined />
          <span>Arquivos</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0; height: calc(100vh - 128px);">
        <div style="padding: 24px; background: #fff; height: 100%;">
          <Home/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style>
#app {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.ant-layout {
  height: 100%;
}
</style>
