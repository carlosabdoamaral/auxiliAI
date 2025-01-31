import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSymptomsStore = defineStore('symptoms', () => {
  const selectedSymptoms = ref([])
  const symptomsAnswers = ref([])

  function setSelectedSymptoms(symptoms) {
    selectedSymptoms.value = symptoms
  }

  function saveAnswers(answers) {
    symptomsAnswers.value = answers.map(symptom => ({
      id: symptom.id,
      tag: symptom.tag,
      name: symptom.name,
      answers: symptom.questions.map(question => {
        const hasOptions = question.options && question.options.length > 0;
        
        return {
          id: question.id,
          question: question.text,
          answerId: hasOptions ? question.answer : null,
          answerText: hasOptions ? question.options.find(opt => opt.id === question.answer)?.text : question.answer
        };
      })
    }))
  }

  function clearAnswers() {
    symptomsAnswers.value = []
  }

  return {
    selectedSymptoms,
    symptomsAnswers,
    setSelectedSymptoms,
    saveAnswers,
    clearAnswers
  }
})
