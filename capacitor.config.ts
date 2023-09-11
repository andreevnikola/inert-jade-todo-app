import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "InertJadeTodoApp",
  webDir: "dist",
  server: {
    androidScheme: "https",
    allowNavigation: ["*"],
  },
};

export default config;
