<script setup>
import { ref } from "vue";

const symptoms = ref([
  "Dor de cabeça",
  "Febre",
  "Tosse",
  "Fadiga",
  "Dor muscular",
  "Náusea",
  "Dor de garganta",
  "Falta de ar",
  "Dor no peito",
  "Diarreia",
  "Tontura",
  "Calafrios",
  "Suor noturno",
  "Perda de apetite",
  "Dificuldade para dormir",
  "Dor nas articulações",
  "Inchaço nas pernas",
  "Coceira na pele",
  "Erupção cutânea",
  "Dor abdominal",
  "Vômito",
  "Sangue na urina",
  "Dificuldade para engolir",
  "Visão turva",
  "Zumbido nos ouvidos",
  "Sensibilidade à luz",
  "Confusão mental",
  "Perda de peso inexplicável",
  "Dormência ou formigamento",
  "Palpitações cardíacas",
  "Dor nas costas",
  "Sangue nas fezes",
  "Gengivas inchadas",
  "Mau hálito persistente",
  "Queda de cabelo",
  "Unhas quebradiças",
  "Olhos secos",
  "Nariz entupido",
  "Espirros frequentes",
  "Sinusite",
  "Dor de ouvido",
  "Rouquidão",
  "Dificuldade para concentrar",
  "Irritabilidade",
  "Ansiedade",
  "Depressão",
  "Aumento da sede",
  "Micção frequente",
  "Incontinência urinária",
  "Dor ao urinar",
  "Inchaço abdominal",
  "Gases excessivos",
  "Azia",
  "Refluxo gastroesofágico",
  "Sangramento nasal",
  "Feridas que não cicatrizam",
  "Manchas na pele",
  "Sensação de queimação na pele",
  "Dores menstruais intensas",
  "Sangramento menstrual irregular",
  "Secreção vaginal anormal",
  "Dor durante a relação sexual",
  "Disfunção erétil",
  "Redução da libido",
  "Suores frios",
  "Sensação de desmaio",
  "Convulsões",
  "Tremores",
  "Rigidez muscular",
  "Dificuldade para mover membros",
  "Perda de memória",
  "Alucinações",
  "Delírios",
  "Comportamento compulsivo",
  "Dificuldade para falar",
  "Dificuldade para entender palavras",
  "Perda de equilíbrio",
  "Inchaço nos olhos",
  "Olhos vermelhos",
  "Sensação de pressão nos olhos",
  "Dor nos dentes",
  "Sensibilidade dentária",
  "Má cicatrização de feridas",
  "Cãibras musculares",
  "Pele seca",
  "Pele amarelada",
  "Unhas azuladas",
  "Lábios rachados",
  "Língua inchada",
  "Sabor metálico na boca",
  "Perda do paladar",
  "Perda do olfato",
]);

const selectedSymptoms = ref([]);
const searchQuery = ref("");
</script>

<template>
  <div class="home-wrapper">
    <section id="title-section">
      <h2 class="subtitle">Olá Carlos!</h2>
      <h1 class="title">Como você está se sentindo hoje?</h1>
    </section>

    <section id="search-section">
      <a-input-search
        v-model:value="searchQuery"
        placeholder="Buscar sintomas..."
      />
    </section>

    <section id="symptoms-section">

      <div class="symptoms-chips">
        <a-checkbox-group v-model:value="selectedSymptoms">
          <a-checkbox
            v-for="symptom in symptoms"
            :key="symptom"
            :value="symptom"
          >
            {{ symptom }}
          </a-checkbox>
        </a-checkbox-group>
      </div>
    </section>

    <div id="action-section">
      <a-button type="primary" size="large"> Avançar </a-button>
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

  #title-section {
    text-align: center;
    width: 100%;
    height: $titleSectionHeight;
    border: $debugBorder;

    .subtitle {
      color: grey;
      font-size: 25px;
      font-weight: 500;
    }

    .title {
      font-size: 40px;
      font-weight: 500;
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

    /* Estilização da scrollbar para Firefox */
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

    .symptoms-chips {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 0 16px;

      :deep(.ant-checkbox-group) {
        display: flex;
        flex-wrap: wrap;
        gap: 16px 12px;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 800px;
      }

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

  #search-section {
    width: 33dvw;

    :deep(.ant-input) {
      border-radius: 100em 0 0 100em;
      height: 48px;
      padding-left: 20px;
    }

    :deep(.ant-input-group-addon .ant-input-search-button) {
      border-radius: 0 100em 100em 0;
      height: 48px;
      width: 48px;
    }
  }

  #action-section {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: $titleSectionHeight;
    border: $debugBorder;

    :deep(.ant-btn) {
      background: #001529;
      border: none;
      height: 48px;
      padding: 0 48px;
      font-size: 16px;
      border-radius: 24px;
      min-width: 200px !important;

      &:hover {
        background-color: #002140;
      }
    }
  }
}
</style>
