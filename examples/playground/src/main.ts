import { createApp, h } from "chibivue";

const app = createApp({
  render() {
    return h(
      "button",
      {
        onClick() {
          alert("Hello world!");
        },
      },
      ["click me!"]
    );
  },
});

app.mount("#app");
