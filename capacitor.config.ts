import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.inertjade.todoapp",
  appName: "InertJadeTodoApp",
  webDir: "dist",
  server: {
    androidScheme: "https",
    allowNavigation: ["*"],
  },
};

export default config;
