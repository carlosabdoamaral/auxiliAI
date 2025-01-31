<template>
  <div class="loading-container">
    <a-spin :size="large"></a-spin>
    <h2 class="loading-text">Gerando relatório</h2>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const large = "large";

onMounted(() => {
  setTimeout(() => {
    router.push('/report-result');
  }, 3000);
});
</script>

<style scoped lang="scss">
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 35dvh !important;
  transform: translateY(50%);

  .loading-text {
    margin-top: 16px;
    color: #1890ff;
    font-size: 24px;
    font-weight: 500;
  }

  :deep(.ant-spin) {
    .ant-spin-dot {
      font-size: 40px;
    }
  }
}
</style>