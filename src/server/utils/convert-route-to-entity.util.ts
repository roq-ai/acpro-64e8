const mapping: Record<string, string> = {
  'financial-records': 'financial_record',
  invitations: 'invitation',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
