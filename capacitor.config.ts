import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.inertjade.todoapp",
  appName: "InertJadeTodoApp",
  webDir: "dist",
  server: {
    androidScheme: "https",
    allowNavigation: ["*"],
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId:
        "575367381658-nnu1hdg7heb74qbfl1ql9oic7inanv7u.apps.googleusercontent.com",
      androidClientId:
        "575367381658-nnu1hdg7heb74qbfl1ql9oic7inanv7u.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
