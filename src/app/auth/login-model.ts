/**
 * Login payload expected by `POST /api/auth/signin`.
 */
export interface LoginModel {
	email: string;
	password: string;
}
