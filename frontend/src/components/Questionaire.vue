<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useSymptomsStore } from "../stores/symptoms";

const router = useRouter();
const symptomsStore = useSymptomsStore();
const selectedSymptoms = ref([]);
const currentSymptomIndex = ref(0);
const currentSymptom = computed(() => {
  return selectedSymptoms.value[currentSymptomIndex.value] || null;
});

const isFirstSymptom = computed(() => currentSymptomIndex.value === 0);
const isLastSymptom = computed(
  () => currentSymptomIndex.value === selectedSymptoms.value.length - 1
);
const progress = ref(0);

watch(currentSymptomIndex, () => {
  const total = selectedSymptoms.value.length;
  const current = currentSymptomIndex.value;
  progress.value = Math.round((current / total) * 100);
});

onMounted(() => {
  selectedSymptoms.value = symptomsStore.selectedSymptoms.map(symptom => ({
    ...symptom,
    questions: symptom.questions.map(question => ({
      ...question,
      answer: null
    }))
  }));

  if (selectedSymptoms.value.length === 0) {
    router.push("/");
  }
});

function goBack() {
  if (isFirstSymptom.value) {
    router.push("/");
  } else {
    currentSymptomIndex.value--;
  }
}

function goNext() {
  if (isLastSymptom.value) {
    progress.value = 100;
    symptomsStore.saveAnswers(selectedSymptoms.value);

    console.log("Questionário finalizado", symptomsStore.symptomsAnswers);
    router.push("/loading-result");
  } else {
    currentSymptomIndex.value++;
  }
}
</script>

<template>
  <div class="questionaire-container">
    <section id="title-section">
      <h1 class="title">Vamos analisar seus sintomas juntos?</h1>
    </section>

    <section id="symptoms-questions" v-if="currentSymptom">
      <div class="progress-bar">
        <div class="progress-text">{{ progress }}% concluído</div>
        <a-progress :percent="progress" :show-info="false" />
      </div>

      <div class="symptom-card">
        <h2>Sobre o sintoma: "{{ currentSymptom.name }}"</h2>
        <div class="questions">
          <div
            v-for="(question, index) in currentSymptom.questions"
            :key="index"
            class="question"
          >
            <p>{{ question.text }}</p>

            <!-- Se tiver opções, mostra como select -->
            <a-select
              v-if="question.options && question.options.length > 0"
              v-model:value="question.answer"
              placeholder="Selecione uma opção"
              style="width: 100%"
            >
              <a-select-option
                v-for="option in question.options"
                :key="option.id"
                :value="option.id"
              >
                {{ option.text }}
              </a-select-option>
            </a-select>

            <!-- Se não tiver opções, mostra como input text -->
            <a-input
              v-else
              v-model:value="question.answer"
              placeholder="Sua resposta"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="action-section">
      <a-button type="default" size="large" @click="goBack">
        {{ isFirstSymptom ? "Voltar" : "Anterior" }}
      </a-button>
      <a-button type="primary" size="large" @click="goNext">
        {{ isLastSymptom ? "Finalizar" : "Próximo" }}
      </a-button>
    </section>
  </div>
</template>

<style scoped lang="scss">
$titleSectionHeight: calc(5dvh - 64px);
$actionSectionHeight: 100px;
$debugBorder: 0px solid red;

.questionaire-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  height: 100%;

  #title-section {
    text-align: center;
    width: 100%;
    height: $titleSectionHeight;
    border: $debugBorder;

    .title {
      font-size: 30px;
      font-weight: 500;
    }
  }

  #symptoms-questions {
    width: 100%;
    max-width: 1000px;

    .progress-bar {
      margin-bottom: 24px;
      margin-top: 24px;

      .progress-text {
        margin-bottom: 8px;
        color: #666;
        font-size: 14px;
        text-align: center;
      }

      :deep(.ant-progress-line) {
        .ant-progress-bg {
          background-color: #1890ff;
        }
      }
    }

    .symptom-card {
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      h2 {
        font-size: 20px;
        margin-bottom: 16px;
        color: #1890ff;
        text-align: center;
      }

      .questions {
        .question {
          margin-bottom: 24px;

          p {
            margin-bottom: 12px;
            font-weight: 500;
          }

          :deep(.ant-select) {
            width: 100%;

            .ant-select-selector {
              height: 48px;
              padding: 0 20px;
              border-radius: 10px;
              display: flex;
              align-items: center;
              transition: all 0.3s ease;

              &:hover {
                border-color: #1890ff;
              }
            }
          }

          :deep(.ant-input) {
            height: 48px;
            padding-left: 20px;
            border-radius: 10px;
            transition: all 0.3s ease;

            &:hover, &:focus {
              border-color: #1890ff;
            }
          }
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
      .title {
        font-size: 24px;
      }
    }

    #symptoms-questions {
      .symptom-card {
        padding: 16px;
      }
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
