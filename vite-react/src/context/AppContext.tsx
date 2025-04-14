import { createContext, useContext, useState, ReactNode } from "react";

interface BulletPoint {
  text: string;
  rationale: string;
  thumbs: string | null;
  qualitative: string | null;
}

type BulletPointGroup = {
  [key: string]: BulletPoint;
};

interface CoverLetterResponse {
  resume: string;
  job_desc: string;
  initial_cover_letter: string;
  review_all_view_intro: string;
  BSETB_enactive_mastery: BulletPointGroup;
  BSETB_vicarious_experience: BulletPointGroup;
  BSETB_verbal_persuasion: BulletPointGroup;
  _id?: any;
  document_id?: string;
}

interface AppState {
  resumeText: string;
  jobDescription: string;
  generatedCoverLetter: string;
  isGeneratingCoverLetter: boolean;
  generationError: string;
  coverLetterData: CoverLetterResponse | null;
  setResumeText: (text: string) => void;
  setJobDescription: (text: string) => void;
  setGeneratedCoverLetter: (text: string) => void;
  setIsGeneratingCoverLetter: (isLoading: boolean) => void;
  setGenerationError: (error: string) => void;
  setCoverLetterData: (data: CoverLetterResponse | null) => void;
  generateCoverLetter: () => Promise<boolean>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterResponse | null>(null);

  async function generateCoverLetter(): Promise<boolean> {
    if (resumeText && jobDescription) {
      setIsGeneratingCoverLetter(true);
      setGenerationError("");
  
      try {
        const response = await fetch("http://localhost:5002/lab/initialize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resume_text: resumeText, job_desc: jobDescription }),
        });
  
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Unknown server error");
        }
  
        const data: CoverLetterResponse = await response.json();
        setCoverLetterData(data);
        setGeneratedCoverLetter(data.initial_cover_letter);
  
        return true;
      } catch (error: any) {
        console.error("Error generating cover letter:", error);
        setGenerationError("Failed to generate cover letter. " + error.message);
        return false;
      } finally {
        setIsGeneratingCoverLetter(false);
      }
    } else {
      alert("Please provide both a resume and a job description.");
      return false;
    }
  }
  

  const value: AppState = {
    resumeText,
    jobDescription,
    generatedCoverLetter,
    isGeneratingCoverLetter,
    generationError,
    coverLetterData,
    setResumeText,
    setJobDescription,
    setGeneratedCoverLetter,
    setIsGeneratingCoverLetter,
    setGenerationError,
    setCoverLetterData,
    generateCoverLetter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;

}