import { describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLoginStore } from '@/stores/login';
import { useMockStore } from '@/stores/mockSrore';
import type { IUserLogin } from '@/interface/interfaces';

vi.mock('@/stores/mockStore', () => ({
    useMockStore: () => ({
        checkLogin: vi.fn(),
    }),
}));

describe('login store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should successfully login a user', async () => {
        const mockStore = useMockStore();
        const store = useLoginStore();

        const mockUser: IUserLogin = {
            id: 1,
            email: 'user@example.com',
            role: { name: 'user', permissions: {} },
        };

        mockStore.checkLogin = vi.fn().mockResolvedValue(mockUser);

        const loginData = { email: 'admin@admin.com', password: 'admin' };

        const result = await store.actionLogin(loginData);

        expect(result).toBe(true);
        expect(store.userLogin).toEqual(mockUser);
        expect(localStorage.getItem('userLogin')).toBe(JSON.stringify(mockUser));
    });

    it('should handle login failure', async () => {
        const mockStore = useMockStore();
        const store = useLoginStore();

        mockStore.checkLogin = vi.fn().mockResolvedValue(null);

        const loginData = { email: 'user@user.com', password: 'asdasdada' };

        const result = await store.actionLogin(loginData);

        expect(result).toBe(false);
        expect(store.userLogin).toBe(null);
        expect(localStorage.getItem('userLogin')).toBe(null);
    });

    it('should logout the user', async () => {
        const store = useLoginStore();
        store.userLogin = { id: 1, email: 'admin@admin.com', role: { name: 'user', permissions: {} } };

        localStorage.setItem('userLogin', JSON.stringify(store.userLogin));

        await store.logout({ push: vi.fn() } as any);

        expect(localStorage.getItem('userLogin')).toBe(null);
        expect(store.userLogin).toBe(null);
    });

    it('should return user data from getter', () => {
        const store = useLoginStore();
        const mockUser: IUserLogin = { id: 1, email: 'user@example.com', role: { name: 'user', permissions: {} } };

        localStorage.setItem('userLogin', JSON.stringify(mockUser));

        expect(store.getUserData).toEqual(mockUser);
    });

    it('should return permissions from getter', () => {
        const store = useLoginStore();
        const mockUser: IUserLogin = {
            id: 1,
            email: 'user@example.com',
            role: { name: 'user', permissions: { read: true, write: false } },
        };

        localStorage.setItem('userLogin', JSON.stringify(mockUser));

        expect(store.getPermissionAccess('read')).toBe(true);
        expect(store.getPermissionAccess('write')).toBe(false);
    });
});
