import { create } from "zustand";


interface CarouselStore {
    isActive: boolean
    page: number
    moveLeft: () => void
    moveRight: () => void
    closeCarousel: () => void
    openCarousel: (page: number) => void
}

const useCarouselStore = create<CarouselStore>(set => ({
    isActive: false,
    page: 0,
    moveLeft: () => set((state) => ({
        page: state.page - 1,
    })),
    moveRight: () => set((state) => ({
        page: state.page + 1,
    })),
    openCarousel: (page) => set(() => ({
        isActive: true,
        page,
    })),
    closeCarousel: () => set(() => ({
        isActive: false,
    })),
}))

export { useCarouselStore }
