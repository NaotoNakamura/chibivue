import { createRenderer, createAppAPI } from "../runtime-core";

export interface App<HostElement = any> {
  mount(rootContainer: HostElement | string): void;
}

export interface RendererNode {
  [key: string]: any;
}

export interface RendererOptions<HostNode = RendererNode> {
  setElementText(node: HostNode, text: string): void;
}

export type ComponentOptions = {
  render?: Function;
};
export type Component = ComponentOptions;

export type CreateAppFunction<HostElement> = (
  rootComponent: Component
) => App<HostElement>;

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
