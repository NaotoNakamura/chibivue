export type Options = {
  render: () => string;
};

export type App = {
  mount: (selector: string) => void;
};

export const createApp = (options: Options): App => {
  return {
    mount: (selector: string) => {
      const container = document.querySelector(selector);
      if (!container) return;
      container.textContent = options.render();
    },
  };
};
