module.exports = {
  apps: [
    {
      name: "inf-auth-webapp",
      script: "./build/server.js",
      watch: true,
      "ignore-watch": ["node_modules"],
      exec_mode: "fork",
      max_memory_restart: "500M",
      // log_file: "/home/gmadmin/Desktop/server.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
}
