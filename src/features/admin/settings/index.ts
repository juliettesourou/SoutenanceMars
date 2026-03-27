export interface AdminSetting {
  key: string;
  value: string | number | boolean;
}

export async function fetchAdminSettings(): Promise<AdminSetting[]> {
  // TODO: branchement API
  return Promise.resolve([]);
}
