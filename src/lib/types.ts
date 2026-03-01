// Resort types
export interface Resort {
  id: number;
  name: string;
  abbreviation: string;
  location: string;
  expiration_year: number;
  has_resale_restrictions: boolean;
  sold_out_direct: boolean;
  total_rofr_records: number;
  rofr_rate_pct: number;
}

// Resort stats
export interface MonthlyBreakdown {
  year_month: string;
  passed: number;
  taken: number;
  total: number;
  rofr_rate_pct: number | null;
  avg_ppp: number | null;
}

export interface RecentOutcome {
  id: number;
  points: number;
  price_per_point: number;
  outcome: string;
  submission_date: string | null;
  use_year: string | null;
}

export interface ResortStats {
  name: string;
  abbreviation: string;
  location: string;
  expiration_year: number;
  total_outcomes: number;
  passed_count: number;
  taken_count: number;
  rofr_rate_pct: number | null;
  avg_passed_ppp: number | null;
  avg_taken_ppp: number | null;
  avg_ppp: number | null;
  monthly: MonthlyBreakdown[];
  recent_outcomes: RecentOutcome[];
  use_year_breakdown: UseYearBreakdown[];
  rofr_processing: RofrProcessing | null;
  trend: ResortTrend | null;
}

// Use Year Breakdown
export interface UseYearBreakdown {
  use_year: string;
  passed: number;
  taken: number;
  total: number;
  rofr_rate_pct: number | null;
  avg_ppp: number | null;
}

// ROFR Processing Time
export interface RofrProcessing {
  avg_days: number | null;
  min_days: number | null;
  max_days: number | null;
  sample_size: number;
}

// Resort Trend
export interface ResortTrend {
  taken_rate_30d: number | null;
  taken_rate_90d: number | null;
  direction: string;
}

// Contract Size Analysis
export interface SizeBucket {
  range: string;
  min_points: number;
  max_points: number;
  passed: number;
  taken: number;
  total: number;
  rofr_rate_pct: number | null;
  avg_ppp: number | null;
}

export interface SizeAnalysisResponse {
  buckets: SizeBucket[];
}

// Market Pulse
export interface VolumeChange {
  current_30d: number;
  prior_30d: number;
  change_pct: number | null;
}

export interface RateChange {
  current_30d: number | null;
  prior_30d: number | null;
  direction: string;
}

export interface PriceChange {
  current_30d: number | null;
  prior_30d: number | null;
  change_pct: number | null;
}

export interface MarketPulseResponse {
  volume: VolumeChange;
  taken_rate: RateChange;
  avg_ppp: PriceChange;
}

export interface ContextTrendPoint {
  month: string;
  resort_abbr: string;
  resort_name: string;
  max_rofr_ppp: number;
}

export interface ContextCoverageRow {
  abbreviation: string;
  name: string;
  months_present: number;
  months_total: number;
  coverage_pct: number;
  latest_month: string;
  latest_max_ppp: number;
  current_avg_ppp_30d?: number | null;
}

export interface ContextImpactSnapshot {
  context_available_accuracy: number | null;
  context_missing_accuracy: number | null;
  context_available_count: number;
  context_missing_count: number;
  ppp_vs_context_corr: number | null;
}

export interface ContextInsightsResponse {
  months: string[];
  trend: ContextTrendPoint[];
  coverage: ContextCoverageRow[];
  impact: ContextImpactSnapshot;
}

// Trends
export interface TrendMonth {
  year_month: string;
  total: number;
  passed: number;
  taken: number;
  rofr_rate_pct: number | null;
  avg_ppp: number | null;
  avg_passed_ppp: number | null;
  avg_taken_ppp: number | null;
}

export interface TrendSummary {
  total: number;
  passed: number;
  taken: number;
  rofr_rate_pct: number | null;
  avg_ppp: number | null;
}

export interface RofrTrends {
  months: TrendMonth[];
  summary: TrendSummary;
}

// Prediction
export interface PredictionRequest {
  resort: string;
  points: number;
  price_per_point: number;
  use_year?: string;
}

export interface PredictionFactor {
  feature: string;
  label: string;
  impact: number;
  direction: string;
  explanation: string;
}

export interface PredictionResponse {
  risk_score: number;
  risk_level: string;
  confidence: string;
  factors: PredictionFactor[];
  model_version: string;
}

// Admin - Scraping
export interface ScrapeRun {
  id: number;
  source: string;
  started_at: string;
  completed_at: string | null;
  records_found: number;
  records_new: number;
  errors: number;
  duration_seconds: number | null;
  status: string;
  error_details: string | null;
}

export interface ScrapeStatus {
  total_runs: number;
  recent_runs: ScrapeRun[];
  total_rofr_outcomes: number;
  total_listings: number;
}

export interface ScraperList {
  available: string[];
  descriptions: Record<string, string>;
}

export interface ScrapeRunResult {
  source: string;
  status: string;
  records_found: number;
  records_new: number;
  errors: number;
  duration_seconds: number;
  error_details: string | null;
}

export interface ScrapeJobStarted {
  status: "started" | "already_running";
  run_id: number;
}

export interface ScrapeJobStatus {
  run_id: number;
  source: string;
  status: "running" | "completed" | "failed";
  started_at: string | null;
  completed_at: string | null;
  records_found: number;
  records_new: number;
  errors: number;
  duration_seconds: number | null;
  error_details: string | null;
  total_items: number | null;
  completed_items: number;
}

export interface RunAllJobsStarted {
  status: "started" | "already_running";
  run_ids: Record<string, number>;
  already_running?: string[];
}

export interface ActiveJob {
  run_id: number;
  source: string;
  status: string;
  started_at: string | null;
  total_items: number | null;
  completed_items: number;
  records_found: number;
  records_new: number;
}

// Admin - Data Entry
export interface ManualRofrEntry {
  resort_abbr: string;
  points: number;
  price_per_point: number;
  total_price?: number;
  use_year?: string;
  outcome: string;
  submission_date?: string;
  decision_date?: string;
}

// Admin - Training
export interface TrainMetrics {
  auc_roc: number | null;
  precision: number;
  recall: number;
  f1: number;
}

export interface TrainResult {
  status: string;
  message: string | null;
  train_size: number | null;
  test_size: number | null;
  metrics: TrainMetrics | null;
  duration_seconds: number | null;
  backtest_status: string | null;
  backtest_outcomes_scored: number | null;
  backtest_message: string | null;
}

// Admin - Retrain Job
export interface TrainJobStarted {
  status: "started" | "already_running";
  job_id: string;
}

export interface TrainJobStatus {
  id: string;
  status: "running" | "completed" | "failed";
  started_at: string;
  result: TrainResult | null;
  error: string | null;
}

// Admin - Resorts
export interface AdminResort {
  id: number;
  name: string;
  abbreviation: string;
  location: string;
  expiration_year: number;
  has_resale_restrictions: boolean;
  sold_out_direct: boolean;
}

export interface AdminResortCreate {
  name: string;
  abbreviation: string;
  location: string;
  expiration_year: number;
  has_resale_restrictions?: boolean;
  sold_out_direct?: boolean;
}

// Bid Advisor
export interface PricePoint {
  price_per_point: number;
  risk_score: number;
  risk_level: string;
  market_viability: string | null;
  context_distance_pct?: number | null;
  context_position?: string | null;
  label: string | null;
}

export interface MarketContext {
  avg_listing_ppp: number | null;
  avg_passed_ppp: number | null;
  avg_taken_ppp: number | null;
  listing_count: number;
  recent_passed_count: number;
  context_prev_max_ppp?: number | null;
  context_prev_month?: string | null;
  context_avg_max_ppp_3mo?: number | null;
  context_months_seen_12mo?: number;
}

export interface SuggestPriceResponse {
  price_points: PricePoint[];
  market_context: MarketContext;
}

// Admin - Data Management
export interface ClearDataResult {
  deleted_outcomes: number;
  deleted_listings: number;
  deleted_scrape_runs: number;
  deleted_backtest_outcomes: number;
  deleted_monthly_context?: number;
}

export interface ClearMonthlyContextResult {
  deleted_monthly_context: number;
}

export interface ClearSourceResult {
  source: string;
  deleted_outcomes: number;
  deleted_listings: number;
  deleted_scrape_runs: number;
}

export interface MonthlyContextImportResult {
  parsed: number;
  imported: number;
  updated: number;
  skipped: number;
  errors: number;
  unmapped_resorts: string[];
}

export interface RunAllResult {
  results: ScrapeRunResult[];
  total_new: number;
}

export interface DvcMarketImportResult {
  source: string;
  months_fetched: number;
  imported: number;
  updated: number;
  skipped: number;
  unmapped_resorts: string[];
}

// Scraper Config
export interface ResortAlias {
  id: number;
  alias: string;
  canonical_abbr: string;
  scraper_source: string | null;
}

export interface ScraperThreadUrl {
  id: number;
  scraper_source: string;
  url: string;
  label: string | null;
  sort_order: number;
  active: boolean;
}

// Accuracy
export interface CalibrationBucket {
  bucket: string;
  count: number;
  actual_taken_rate: number;
  avg_predicted: number;
}

export interface ResortAccuracy {
  abbreviation: string;
  name: string;
  accuracy_pct: number;
  grade: string;
  correct: number;
  total: number;
  precision: number | null;
  recall: number | null;
  f1: number | null;
}

export interface MonthlyAccuracyPoint {
  year_month: string;
  total: number;
  correct: number;
  accuracy_pct: number;
  naive_pct: number;
}

export interface MonthlyAccuracyResponse {
  months: MonthlyAccuracyPoint[];
}

export interface AccuracySummary {
  total: number;
  correct: number;
  incorrect: number;
  accuracy_pct: number | null;
  grade: string;
  model_version: string | null;
  precision: number | null;
  recall: number | null;
  f1: number | null;
  calibration: CalibrationBucket[];
  by_resort: ResortAccuracy[];
}

// API Key types
export interface ApiKeyScopes {
  tiers: string[];
  allow: string[];
  deny: string[];
}

export interface ApiKeyResponse {
  id: string;
  name: string;
  key_prefix: string;
  scopes: ApiKeyScopes;
  rate_limit: number | null;
  cert_cn: string | null;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
  last_used_at: string | null;
}

export interface ApiKeyCreatedResponse {
  id: string;
  name: string;
  key: string;
  key_prefix: string;
  message: string;
}

export interface ApiKeyCreateRequest {
  name: string;
  scopes: ApiKeyScopes;
  rate_limit?: number | null;
  cert_cn?: string | null;
  expires_at?: string | null;
}

export interface ApiKeyUpdateRequest {
  name?: string;
  scopes?: ApiKeyScopes;
  rate_limit?: number | null;
  cert_cn?: string | null;
  is_active?: boolean;
  expires_at?: string | null;
}

export interface AuditLogEntry {
  id: number;
  api_key_id: string | null;
  method: string;
  path: string;
  status_code: number;
  ip_address: string;
  user_agent: string | null;
  response_time_ms: number;
  created_at: string;
}

export interface PaginatedAuditLog {
  items: AuditLogEntry[];
  total: number;
  page: number;
  per_page: number;
}
