export interface Website {
  id: string;
  name: string;
  url: string;
  status: 'safe' | 'warning' | 'danger';
  protections: {
    sqlInjection: boolean;
    xssProtection: boolean;
    defacementProtection: boolean;
  };
  metrics: {
    totalRequests: number;
    blockedAttacks: number;
    uptime: number;
    responseTime: number;
  };
  attacks: Attack[];
  lastChecked: Date;
}

export interface Attack {
  id: string;
  type: 'sql_injection' | 'xss' | 'defacement' | 'brute_force' | 'ddos';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  sourceIp: string;
  blocked: boolean;
  details: string;
  location?: string;
}

export interface SecurityMetrics {
  totalWebsites: number;
  activeThreats: number;
  blockedAttacks: number;
  uptime: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}