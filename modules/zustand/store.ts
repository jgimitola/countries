import create from 'zustand';

const useStore = create((set) => {
  return {
    renderMode: 'SSG',
    changeRenderMode: (mode) => set((state) => ({ renderMode: mode })),
  };
});

export default useStore;
