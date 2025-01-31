import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Questionaire from "@/components/Questionaire.vue";
import LoadingResult from "@/components/LoadingResult.vue";
import ReportResult from "@/components/ReportResult.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/questionaire",
    name: "Questionaire",
    component: Questionaire
  },
  {
    path: "/loading-result",
    name: "LoadingResult",
    component: LoadingResult
  },
  {
    path: "/report-result",
    name: "ReportResult",
    component: ReportResult
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
});

export default router;
