/**
 * Response of `POST /api/auth/signin`.
 * `role` is one of the roles exposed by the API (`Role` enum from the backend).
 */
export interface LoginResponseDto {
	token: string;
	email: string;
	role: 'USER' | 'AGENT';
}
