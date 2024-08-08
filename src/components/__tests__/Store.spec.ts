import { setActivePinia, createPinia } from 'pinia'
import { useStore } from '@/stores/store'

describe('Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('should have default state', () => {
        const store = useStore()

        expect(store.links).toEqual([
            { name: 'users', linkName: 'users' },
            { name: 'books', linkName: 'books' },
            { name: 'settings', linkName: 'settings' },
        ])
        expect(store.transitionName).toBe('page')
    })

    it('should update transitionName when setTransitionName is called', () => {
        const store = useStore()

        store.setTransitionName('new-page')
        expect(store.transitionName).toBe('new-page')
    })
})