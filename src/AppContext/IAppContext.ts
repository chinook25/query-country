export interface IAppContext {
  city: string;
  hasError: boolean;
  forecast: [number, string][];
  isLoaded: boolean;
  isLoading: boolean;
  searchTerm: string;
  summary: string;
  temperature: number;
  weather: string;
  setSearchTerm: (newTerm: string) => void;
  searchInfo: () => void;
}
