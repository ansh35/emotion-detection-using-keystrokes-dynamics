import { spawn } from "child_process";

 export async function predictEmotion(features) {
  return new Promise((resolve, reject) => {
    const pythonPath = "./venv/Scripts/python"; // adjust if needed
    const process = spawn(pythonPath, ["predict.py"], { cwd: "./" });

    let stdout = "";
    let stderr = "";

    process.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    process.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    process.on("error", (err) => {
      reject(new Error(`Failed to start Python process: ${err.message}`));
    });

    process.on("close", (code) => {
      // Only treat it as an error if Python actually failed (code ≠ 0)
      if (code !== 0) {
        reject(new Error(`Python crashed (code ${code}):\n${stderr}`));
        return;
      }

      // Filter out sklearn warnings
      const filtered = stderr
        .split("\n")
        .filter(
          (line) =>
            !line.includes("InconsistentVersionWarning") &&
            !line.includes("UserWarning") &&
            !line.includes("warnings.warn")
        )
        .join("\n")
        .trim();

      if (filtered) console.warn("⚠️ Python warnings:\n" + filtered);

      resolve(stdout.trim());
    });

    const inputData = JSON.stringify({ features });
    process.stdin.write(inputData);
    process.stdin.end();
  });
}
    


