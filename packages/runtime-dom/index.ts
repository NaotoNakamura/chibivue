import { createRenderer, createAppAPI } from "../runtime-core";
import { nodeOps } from "./nodeOps";

export interface App<HostElement = any> {
  mount(rootContainer: HostElement | string): void;
}

export type ComponentOptions = {
  render?: Function;
};
export type Component = ComponentOptions;

export type CreateAppFunction<HostElement> = (
  rootComponent: Component
) => App<HostElement>;

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
