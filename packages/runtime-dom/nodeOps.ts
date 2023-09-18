export interface RendererNode {
  [key: string]: any;
}

export interface RendererOptions<HostNode = RendererNode> {
  setElementText(node: HostNode, text: string): void;
}

export const nodeOps: RendererOptions<Node> = {
  setElementText(node, text) {
    node.textContent = text;
  },
};
