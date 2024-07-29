module.exports = {
  apps: [
    {
      name: "inf-auth-webapp",
      script: "./build/server.js",
      instances: 4,
      exec_mode: "cluster",
      max_memory_restart: "500M",
      log_file: "/var/log/server.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
}
