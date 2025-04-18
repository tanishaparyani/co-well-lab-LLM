export interface BulletPoint {
  text: string;
  rationale: string;
  thumbs: string | null;
  qualitative: string | null;
}

export type BulletPointGroup = {
  [key: string]: BulletPoint;
};

export interface CoverLetterResponse {
  resume: string;
  job_desc: string;
  initial_cover_letter: string;
  review_all_view_intro: string;
  BSETB_enactive_mastery: BulletPointGroup;
  BSETB_vicarious_experience: BulletPointGroup;
  BSETB_verbal_persuasion: BulletPointGroup;
  _id?: string;
  document_id?: string;
}

export interface AppState {
  resumeText: string;
  jobDescription: string;
  generatedCoverLetter: string;
  isGeneratingCoverLetter: boolean;
  generationError: string;
  letterLabData: CoverLetterResponse | null;
  setResumeText: (text: string) => void;
  setJobDescription: (text: string) => void;
  setGeneratedCoverLetter: (text: string) => void;
  setIsGeneratingCoverLetter: (isLoading: boolean) => void;
  setGenerationError: (error: string) => void;
  setLetterLabData: (data: CoverLetterResponse | null) => void;
  initialGeneration: () => Promise<boolean>;
}
