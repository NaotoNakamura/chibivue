export type Options = {
  render: () => string;
};

export type App = {
  mount: (selector: string) => void;
};

export interface RendererNode {
  [key: string]: any;
}

export interface RendererOptions<HostNode = RendererNode> {
  setElementText(node: HostNode, text: string): void;
}

export interface RendererElement extends RendererNode {}

export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement
) => void;

export function createRenderer(options: RendererOptions) {
  const { setElementText: hostSetElementText } = options;

  const render: RootRenderFunction = (message, container) => {
    hostSetElementText(container, message);
  };

  return { render };
}

export const nodeOps: RendererOptions<Node> = {
  setElementText(node, text) {
    node.textContent = text;
  },
};

export const createApp = (options: Options): App => {
  return {
    mount: (selector: string) => {
      const container = document.querySelector(selector);
      if (!container) return;
      const { render } = createRenderer(nodeOps);
      render(options.render(), container);
    },
  };
};
