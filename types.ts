export enum AppState {
  IDLE = 'IDLE',
  ANALYZING_MARKET = 'ANALYZING_MARKET',
  ESTIMATING = 'ESTIMATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface WageData {
  country: string;
  currencySymbol: string;
  currencyCode: string;
  hourlyRates: {
    junior: number;
    mid: number;
    senior: number;
    devops: number;
  };
  sourceSummary: string;
}

export interface CostBreakdown {
  min: number;
  avg: number;
  max: number;
}

export interface ComponentAllocation {
  backend: number;
  frontend: number;
  devops: number;
  qa: number;
}

export interface EstimationResult {
  projectName: string;
  summary: string;
  totalCost: CostBreakdown;
  timelineWeeks: {
    min: number;
    max: number;
  };
  componentCosts: ComponentAllocation;
  infrastructureCostMonthly: number;
  thirdPartyLicensesCost: number;
  assumptions: string[];
  wageDataUsed: WageData;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface UploadedFile {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
}
