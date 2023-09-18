export type Options = {
  render: () => string;
};

export interface App<HostElement = any> {
  mount(rootContainer: HostElement | string): void;
}

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

export type ComponentOptions = {
  render?: Function;
};
export type Component = ComponentOptions;

export type CreateAppFunction<HostElement> = (
  rootComponent: Component
) => App<HostElement>;

export function createRenderer(options: RendererOptions) {
  const { setElementText: hostSetElementText } = options;

  const render: RootRenderFunction = (message, container) => {
    hostSetElementText(container, message);
  };

  return { render };
}

export function createAppAPI<HostElement>(
  render: RootRenderFunction<HostElement>
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent) {
    const app: App = {
      mount(rootContainer: HostElement) {
        const message = rootComponent.render!();
        render(message, rootContainer);
      },
    };

    return app;
  };
}

export const nodeOps: RendererOptions<Node> = {
  setElementText(node, text) {
    node.textContent = text;
  },
};

const { render } = createRenderer(nodeOps);

export const createApp = ((...args) => {
  const _createApp = createAppAPI(render);
  const app = _createApp(...args);
  const { mount } = app;
  app.mount = (selector: string) => {
    const container = document.querySelector(selector);
    if (!container) return;
    mount(container);
  };
  return app;
}) as CreateAppFunction<Element>;
