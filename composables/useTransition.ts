import { inject, type Ref } from "vue";

interface TransitionOverlayInstance {
  enter: (cb: () => void) => void;
  leave: (cb: () => void) => void;
}

export const useTransitionHelper = () => {
  const transitionOverlay =
    inject<Ref<TransitionOverlayInstance | null>>("transitionOverlay");

  const navigateWithTransition = async (path: string) => {
    if (!transitionOverlay?.value) {
      await navigateTo(path);
      return;
    }

    // 1. Trigger transition overlay enter animation
    transitionOverlay.value.enter(async () => {
      // 2. Once overlay covers screen, perform navigation
      await navigateTo(path);
    });
  };

  return {
    navigateWithTransition,
  };
};
