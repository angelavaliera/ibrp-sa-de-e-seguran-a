export interface FaqItem {
  _id: string;
  pergunta: string;
  resposta: any; // Portable Text
  respostaPlainText: string;
  videoUrl?: string;
  categoria?: string;
  ordem?: number;
}
