const { spawn } = require("child_process");
const path = require("path");

const command = process.argv[2] || "start";
const reactScriptsPath = path.resolve(
  __dirname,
  "../node_modules/react-scripts/bin/react-scripts.js"
);

const existingNodeOptions = process.env.NODE_OPTIONS || "";
const legacyOpenSslFlag = "--openssl-legacy-provider";
const nodeOptions = existingNodeOptions.includes(legacyOpenSslFlag)
  ? existingNodeOptions
  : `${existingNodeOptions} ${legacyOpenSslFlag}`.trim();

const child = spawn(process.execPath, [reactScriptsPath, command], {
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_OPTIONS: nodeOptions,
  },
});

child.on("exit", (code) => {
  process.exit(code);
});
