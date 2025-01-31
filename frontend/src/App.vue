<script setup>
import { ref } from "vue";
import { HomeOutlined, MedicineBoxOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

function navigateTo(path) {
  router.push(path);
}
</script>

<template>
  <a-layout
    style="min-height: 100vh; height: 100dvh; background-color: #f0f2f5"
  >
    <a-layout-header class="navbar">
      <div class="logo" @click="navigateTo('/')">
        <img src="/vite.svg" alt="AuxiliAI Logo" />
        <span>AuxiliAI</span>
      </div>
      <a-menu
        theme="light"
        mode="horizontal"
        :default-selected-keys="['1']"
        class="nav-menu"
      >
        <a-menu-item key="1" @click="navigateTo('/')">
          <home-outlined />
          <span>Início</span>
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout-content class="content-container">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: 64px;
  position: sticky;
  top: 0;
  margin-top: 24px;
  z-index: 1000;
  border-radius: 16px;
  width: 50%;
  transform: translateX(50%);
}

@media screen and (max-width: 768px) {
  .navbar {
    width: 100%;
    transform: none;
    border-radius: 0;
    margin-top: 0px;
  }

  .nav-menu {
    justify-content: center;
  }

  .logo {
    flex-grow: 1;
    justify-content: center;
  }
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
}

.logo img {
  height: 32px;
  width: 32px;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.1);
}

.logo span {
  font-size: 18px;
  font-weight: bold;
  color: #1890ff;
  transition: color 0.3s ease;
}

.logo:hover span {
  color: #40a9ff;
}

.nav-menu {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  background-color: transparent !important;
}

.nav-menu .ant-menu-item {
  color: #1890ff;
  transition: all 0.3s ease;
}

.nav-menu .ant-menu-item:hover {
  color: #40a9ff !important;
  background-color: #f0f5ff !important;
}

.nav-menu .ant-menu-item-selected {
  color: #1890ff !important;
  background-color: #e6f7ff !important;
}

.content-container {
  padding: 24px;
  height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
