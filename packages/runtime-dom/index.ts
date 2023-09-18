import {
  CreateAppFunction,
  createAppAPI,
  createRenderer,
} from "../runtime-core";
import { nodeOps } from "./nodeOps";

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
