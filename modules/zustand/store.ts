import create from 'zustand';

type RenderMode = 'SSG' | 'SSR';

interface AppState {
  renderMode: string;
  changeRenderMode: (mode: RenderMode) => void;
}

const useStore = create<AppState>((set) => {
  return {
    renderMode: 'SSG',
    changeRenderMode: (mode: RenderMode) =>
      set((state) => ({ renderMode: mode })),
  };
});

export default useStore;
