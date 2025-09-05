// Simple authentication logic - in a real app, this would interact with Cloudflare Workers
export class AuthService {
    static async login(username, password) {
        // In a real app, this would call a Cloudflare Worker endpoint
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('authToken', 'demo-token');
            localStorage.setItem('isAdmin', 'true');
            return { success: true };
        }
        return { success: false, error: 'Invalid credentials' };
    }

    static isAuthenticated() {
        return localStorage.getItem('authToken') !== null;
    }

    static logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
        window.location.href = '/admin/login';
    }

    static getAuthToken() {
        return localStorage.getItem('authToken');
    }
}