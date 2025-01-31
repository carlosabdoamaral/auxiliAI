<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSymptomsStore } from '../stores/symptoms'
import symptomsData from '../assets/symptoms.json'

const router = useRouter()
const symptomsStore = useSymptomsStore()
const selectedSymptoms = ref([])
const searchQuery = ref("")
const filteredSymptoms = ref([])

onMounted(() => {
  filteredSymptoms.value = symptomsData.symptoms
})

function toggleSymptom(symptom) {
  const index = selectedSymptoms.value.findIndex(s => s.id === symptom.id)
  if (index === -1) {
    selectedSymptoms.value.push(symptom)
  } else {
    selectedSymptoms.value.splice(index, 1)
  }
}

function clearSelection() {
  selectedSymptoms.value = []
}

function startQuestionaire() {
  if (selectedSymptoms.value.length === 0) {
    alert("Por favor, selecione pelo menos um sintoma")
    return
  }
  symptomsStore.setSelectedSymptoms(selectedSymptoms.value)
  router.push('/questionaire')
}

function updateFilteredSymptoms() {
  if (searchQuery.value) {
    filteredSymptoms.value = symptomsData.symptoms.filter((symptom) =>
      symptom.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  } else {
    filteredSymptoms.value = symptomsData.symptoms
  }
}
</script>

<template>
  <div class="home-wrapper">
    <section id="title-section">
      <h2 class="subtitle">Olá Carlos!</h2>
      <h1 class="title">Como você está se sentindo hoje?</h1>
    </section>

    <section id="search-section">
      <a-input v-model:value="searchQuery" placeholder="Buscar sintomas..." @change="updateFilteredSymptoms" />
    </section>

    <section id="symptoms-section">
      <div class="symptoms-chips">
        <div v-for="symptom in filteredSymptoms" :key="symptom.id">
          <a-checkbox 
            :checked="selectedSymptoms.includes(symptom)" 
            @change="toggleSymptom(symptom)"
          >
            {{ symptom.name }}
          </a-checkbox>
        </div>
      </div>
    </section>

    <div id="action-section">
      <a-button type="default" size="large" @click="clearSelection">
        Limpar
      </a-button>
      <a-button type="primary" size="large" @click="startQuestionaire">
        Avançar
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
$titleSectionHeight: 10dvh;
$symptomsSectionHeight: 40dvh;
$actionSectionHeight: 100px;
$debugBorder: 0px solid red;

.home-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  height: 100%;
  max-height: 100dvh;
  padding: 0 16px;

  #title-section {
    text-align: center;
    width: 100%;
    height: $titleSectionHeight;
    border: $debugBorder;

    .subtitle {
      color: grey;
      font-size: 20px;
      font-weight: 500;
    }

    .title {
      font-size: 30px;
      font-weight: 500;
    }
  }

  #search-section {
    width: 100%;
    max-width: 500px;

    :deep(.ant-input) {
      border-radius: 9999px;
      height: 48px;
    }
  }

  #symptoms-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    height: $symptomsSectionHeight;
    max-height: $symptomsSectionHeight;
    overflow-y: auto;
    border: $debugBorder;
    padding: 24px 0;

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      margin: 10px 0;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 100px;
      border: none;
      min-height: 40px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
    }

    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

    .symptoms-chips {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0 16px;
      gap: 16px;

      :deep(.ant-checkbox-wrapper) {
        background: transparent;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        padding: 8px 16px;
        margin: 0;
        transition: all 0.3s ease;
        flex: 0 1 auto;

        &:hover {
          border-color: #1890ff;
          color: #1890ff;
        }

        &.ant-checkbox-wrapper-checked {
          background: #e6f7ff;
          border-color: #1890ff;
          color: #1890ff;
        }

        .ant-checkbox {
          display: none;
        }

        span:last-child {
          padding: 0;
        }
      }
    }
  }

  #action-section {
    display: flex;
    justify-content: center;
    gap: 16px;
    width: 100%;
    max-width: 500px;

    :deep(.ant-btn) {
      border: none;
      height: 48px;
      padding: 0 48px;
      font-size: 16px;
      border-radius: 24px;
      min-width: 200px !important;
      transition: all 0.3s ease;
    }

    :deep(.ant-btn-default) {
      background: #f0f0f0;
      color: rgba(0, 0, 0, 0.85);

      &:hover {
        background: #e6e6e6;
      }
    }

    :deep(.ant-btn-primary) {
      background: #1890ff;

      &:hover {
        background: #40a9ff;
      }
    }
  }

  @media screen and (max-width: 768px) {
    gap: 16px;

    #title-section {
      .subtitle {
        font-size: 16px;
      }

      .title {
        font-size: 24px;
      }
    }

    #symptoms-section {
      height: auto;
      max-height: 50dvh;
    }

    #action-section {
      flex-direction: column;

      :deep(.ant-btn) {
        min-width: 100% !important;
      }
    }
  }
}
</style>
