export interface LeaveSummary {
  total_requests: number;
  pending: number;
  approved: number;
  rejected?: number;
  approved_leave_days: number;
}

export interface Leave {
  id: string;
  employee_id?: string;
  employee?: string;
  employee_name?: string;
  leave_type: string;
  type?: string;
  start_date: string;
  end_date: string;
  startDate?: string;
  endDate?: string;
  reason?: string | null;
  status: "pending" | "approved" | "rejected" | string;
  created_at?: string;
}