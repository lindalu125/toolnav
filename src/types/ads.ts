
export interface Ad {
  id: string;
  title: string;
  position: 'header' | 'sidebar' | 'footer' | 'content';
  size: string;
  content: string;
  url?: string;
  is_active: boolean;
  priority: number;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface AdClick {
  id: string;
  ad_id: string;
  clicked_at: string;
  user_ip?: string;
  user_agent?: string;
  referrer?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  is_active: boolean;
  tags: string[];
  subscribed_at: string;
  unsubscribed_at?: string;
}

export interface ScrapeTask {
  id: string;
  url: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error_message?: string;
  created_at: string;
  completed_at?: string;
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  is_active: boolean;
  secret?: string;
  created_at: string;
}

export interface ImportTask {
  id: string;
  filename: string;
  total_count: number;
  success_count: number;
  error_count: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  errors: any[];
  created_at: string;
  completed_at?: string;
}
