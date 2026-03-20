import type { User, AsyncResponse, Query } from "~/interface";
import ApiService from "~/service/ApiService";

const paths = "/users";

/**
 * Get all users
 * @returns Promise with array of users
 */
export function getUsers(query: Query) {
  const api = useApiService();
  console.log(query);
  return api.get<User[]>(`${paths}/all`, {
    params: query,
  });
}

/**
 * Get a specific user by ID
 * @param id User ID
 * @returns Promise with user data
 */
export function getUserById(id: string) {
  const api = useApiService();
  return api.get<User>(`${paths}/${id}`);
}

/**
 * Create a new user
 * @param userData User data to create
 * @returns Promise with created user data
 */
export function createUser(userData: Partial<User>) {
  const api = useApiService();
  return api.post<User>(`${paths}`, userData);
}

/**
 * Update an existing user
 * @param id User ID
 * @param userData Updated user data
 * @returns Promise with updated user data
 */
export function updateUser(id: string, userData: User) {
  const api = useApiService();
  return api.put<User>(`${paths}/${id}`, userData);
}

/**
 * Delete a user
 * @param id User ID
 * @returns Promise with deletion status
 */
export function deleteUser(id: string) {
  const api = useApiService();
  return api.delete(`${paths}/${id}`);
}

/**
 * Get paginated users with optional search
 * @param pagination Pagination parameters
 * @returns Promise with paginated users
 */
export function getPaginatedUsers(pagination: any) {
  const api = useApiService();
  const { page, limit, search } = pagination;
  let url = `${paths}?page=${page}&limit=${limit}`;

  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  return api.get<{
    data: User[];
    total: number;
    page: number;
    limit: number;
  }>(url);
}

/**
 * Update user status
 * @param id User ID
 * @param status New status
 * @returns Promise with updated user data
 */
export function updateUserStatus(id: string, status: string) {
  const api = useApiService();
  return api.patch<User>(`${paths}/${id}/status`, { status });
}

/**
 * Assign roles to a user
 * @param userId User ID
 * @param roleIds Array of role IDs
 * @returns Promise with updated user data
 */
export function assignRolesToUser(userId: string, roleIds: string[]) {
  const api = useApiService();
  return api.post<User, { roleIds: string[] }>(`${paths}/${userId}/roles`, {
    roleIds,
  });
}
