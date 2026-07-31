export interface LoginResponseDto {
	token: string;
    email: string;
    role: 'USER' | 'AGENT';
}
