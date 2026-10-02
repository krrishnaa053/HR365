const { spawn } = require("child_process");
const path = require("path");

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";
const pythonCmd = isWin ? "python" : "python3";

console.log("\n=======================================================");
console.log("   🚀 Starting HR365 Fullstack (Frontend + Backend)   ");
console.log("=======================================================\n");

// 1. Start Python Backend on port 8000
const backend = spawn(pythonCmd, ["-m", "uvicorn", "app.main:app", "--reload", "--port", "8000"], {
  cwd: path.join(__dirname, "backend"),
  shell: true,
  stdio: "inherit",
});

backend.on("error", (err) => {
  console.error("Failed to start backend:", err);
});

// 2. Start Next.js Frontend on port 3000
const frontend = spawn(npmCmd, ["run", "dev"], {
  cwd: path.join(__dirname, "frontend"),
  shell: true,
  stdio: "inherit",
});

frontend.on("error", (err) => {
  console.error("Failed to start frontend:", err);
});

function cleanup() {
  console.log("\nShutting down HR365...");
  try {
    backend.kill();
  } catch (e) {}
  try {
    frontend.kill();
  } catch (e) {}
  process.exit();
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
