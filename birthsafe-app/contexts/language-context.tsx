"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fr"

// Simple translations just for the dashboard
const translations = {
  en: {
    // English translations (default text)
    careScore: "Care Safety Score",
    careScoreDesc: "Based on guideline adherence for your risk profile",
    currentScore: "Current Score",
    needsAttention: "Needs Attention",
    optimal: "Optimal",
    missingCareSteps: "Your care plan is missing 2 recommended monitoring steps for your risk profile.",
    criticalAlert: "Critical Safety Alert",
    placentaAlert:
      "Based on your placenta position, clinical guidelines recommend an additional ultrasound scan at 32 weeks. This scan appears to be missing from your care plan.",
    whyThisMatters: "Why this matters",
    placentaMonitoring:
      "For patients with your placenta position, regular monitoring is essential to detect potential complications early. Missing this scan could delay important interventions.",
    takeAction: "Take Action Now",
    addToBirthPlan: "Add to Birth Plan",
    clinicalTasks: "Third Trimester Clinical Tasks",
    clinicalTasksDesc: "Recommended care based on your risk profile",
    markAsCompleted: "Mark as completed",
    quickActions: "Quick Actions",
    emergencyAccess: "Emergency Access",
    emergencyHelp: "Emergency Help",
    emergencyDesc: "Need immediate help? Access emergency contacts and quick guidance.",
  },
  fr: {
    // French translations
    careScore: "Score de Sécurité des Soins",
    careScoreDesc: "Basé sur le respect des directives pour votre profil de risque",
    currentScore: "Score Actuel",
    needsAttention: "Nécessite Attention",
    optimal: "Optimal",
    missingCareSteps: "Votre plan de soins manque 2 étapes de surveillance recommandées pour votre profil de risque.",
    criticalAlert: "Alerte de Sécurité Critique",
    placentaAlert:
      "En raison de la position de votre placenta, les directives cliniques recommandent une échographie supplémentaire à 32 semaines. Cet examen semble manquer à votre plan de soins.",
    whyThisMatters: "Pourquoi c'est important",
    placentaMonitoring:
      "Pour les patientes avec votre position de placenta, une surveillance régulière est essentielle pour détecter précocement les complications potentielles. Manquer cet examen pourrait retarder des interventions importantes.",
    takeAction: "Agir Maintenant",
    addToBirthPlan: "Ajouter au Plan de Naissance",
    clinicalTasks: "Tâches Cliniques du Troisième Trimestre",
    clinicalTasksDesc: "Soins recommandés selon votre profil de risque",
    markAsCompleted: "Marquer comme terminé",
    quickActions: "Actions Rapides",
    emergencyAccess: "Accès d'Urgence",
    emergencyHelp: "Aide d'Urgence",
    emergencyDesc: "Besoin d'aide immédiate? Accédez aux contacts d'urgence et aux conseils rapides.",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    // Only translate if the key exists in our translations
    const currentTranslations = translations[language]
    return (currentTranslations as any)[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

