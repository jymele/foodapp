export const slideInVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15, // Stagger the animation based on index
      ease: "easeOut",
    },
  }),
};
