<template>
  <div class="report-container" v-if="reportData">
    <div class="header">
      <h1>Resultado da Análise</h1>
      <p class="subtitle">
        Com base nas suas respostas, preparamos uma análise preliminar dos seus
        sintomas.
        <br />
        <b
          >Lembre-se que esta é apenas uma sugestão e não substitui a consulta
          médica.</b
        >
      </p>
    </div>

    <div class="report-sections">
      <!-- Diagnósticos -->
      <div class="section-card">
        <h2>Possíveis Diagnósticos</h2>
        <div class="section-content">
          <a-card
            class="primary-diagnosis"
            :title="reportData.diagnosticAnalysis.primaryDiagnosis.condition"
          >
            <p>
              {{ reportData.diagnosticAnalysis.primaryDiagnosis.description }}
            </p>
            <div class="confidence">
              Confiança:
              <a-progress
                :percent="
                  reportData.diagnosticAnalysis.primaryDiagnosis.confidence
                "
                size="small"
                :stroke-color="getPriorityColor('alta')"
              />
            </div>
          </a-card>

          <div
            v-if="reportData.diagnosticAnalysis.secondaryDiagnoses?.length"
            class="secondary-diagnoses"
          >
            <h3>Diagnósticos Secundários</h3>
            <a-card
              v-for="(diagnosis, index) in reportData.diagnosticAnalysis
                .secondaryDiagnoses"
              :key="index"
              class="secondary-diagnosis"
            >
              <h4>{{ diagnosis.condition }}</h4>
              <p>{{ diagnosis.description }}</p>
              <div class="confidence">
                Confiança:
                <a-progress
                  :percent="diagnosis.confidence"
                  size="small"
                  :stroke-color="getPriorityColor('média')"
                />
              </div>
            </a-card>
          </div>
        </div>
      </div>

      <!-- Recomendações -->
      <div class="section-card">
        <h2>Recomendações</h2>
        <div class="section-content">
          <!-- Agrupamento por categoria -->
          <div
            v-for="(category, categoryKey) in recommendationCategories"
            :key="categoryKey"
          >
            <a-card
              v-if="
                reportData.recommendations.some(
                  (r) => r.category === categoryKey
                )
              "
              class="recommendation-category"
              :title="category.title"
              :headStyle="{
                backgroundColor: `${category.color}10`,
                borderBottom: `1px solid ${category.color}`,
              }"
            >
              <template #extra>
                <span class="category-icon">{{ category.icon }}</span>
              </template>

              <a-list>
                <a-list-item
                  v-for="recommendation in reportData.recommendations.filter(
                    (r) => r.category === categoryKey
                  )"
                  :key="recommendation.title"
                  class="recommendation-item"
                >
                  <div class="recommendation-content">
                    <div class="recommendation-header">
                      <h4>{{ recommendation.title }}</h4>
                      <a-tag :color="getPriorityColor(recommendation.priority)">
                        {{ getPriorityText(recommendation.priority) }}
                      </a-tag>
                    </div>
                    <p>{{ recommendation.description }}</p>
                  </div>
                </a-list-item>
              </a-list>
            </a-card>
          </div>
        </div>
      </div>
    </div>

    <div id="action-section">
      <a-button @click="goHome" size="large">Voltar ao Início</a-button>

      <a-button type="primary" @click="downloadPDF" size="large">
        <template #icon>
          <download-outlined />
        </template>
        Baixar Relatório em PDF
      </a-button>
    </div>

    <div class="spacer">
      <p class="subtitle">Obrigado por usar a AuxiliAI</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSymptomsStore } from "../stores/symptoms";
import { DownloadOutlined } from "@ant-design/icons-vue";
import reportTemplate from "../assets/report_template.json";

const router = useRouter();
const symptomsStore = useSymptomsStore();
const loading = ref(true);

// Dados do relatório
const reportData = ref(null);

// Categorias de recomendações
const recommendationCategories = {
  medical_advice: {
    icon: "👨‍⚕️",
    title: "Orientações Médicas",
    color: "#1890ff",
  },
  lifestyle: {
    icon: "🧘",
    title: "Estilo de Vida",
    color: "#52c41a",
  },
  nutrition: {
    icon: "🥗",
    title: "Nutrição",
    color: "#faad14",
  },
  physical_health: {
    icon: "💪",
    title: "Saúde Física",
    color: "#eb2f96",
  },
};

function getPriorityColor(priority) {
  switch (priority) {
    case "alta":
      return "#ff4d4f";
    case "média":
      return "#faad14";
    case "baixa":
      return "#52c41a";
    default:
      return "#8c8c8c";
  }
}

function downloadPDF() {
  // TODO: Implementar geração do PDF
  console.log("Gerando PDF...", symptomsStore.symptomsAnswers);
}

function getPriorityText(priority) {
  return priority.capitalize();
}

function goHome() {
  router.push("/");
}

onMounted(async () => {
  reportData.value = reportTemplate;
  loading.value = false;
});
</script>

<style scoped lang="scss">
.subtitle {
  color: #666;
  font-size: 16px;
}

.report-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 0 16px;
  gap: 24px;

  .header {
    text-align: center;
    width: 100%;
    margin-bottom: 16px;

    h1 {
      font-size: 30px;
      color: #1890ff;
      margin-bottom: 8px;
    }
  }

  .report-sections {
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .section-card {
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      h2 {
        font-size: 20px;
        color: #1890ff;
        margin-bottom: 16px;
        text-align: center;
      }

      .section-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }
  }

  #action-section {
    display: flex;
    justify-content: center;
    gap: 16px;
    width: 100%;
    max-width: 500px;
    margin: 24px 0;

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

    .header {
      h1 {
        font-size: 24px;
      }

      .subtitle {
        font-size: 14px;
      }
    }

    .report-sections {
      .section-card {
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
