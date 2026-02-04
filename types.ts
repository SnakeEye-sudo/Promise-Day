
export interface Vachan {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface LoveNoteRequest {
  partnerName: string;
  tone: 'romantic' | 'poetic' | 'funny';
}
