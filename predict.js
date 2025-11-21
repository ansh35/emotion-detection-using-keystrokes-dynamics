import { spawn } from "child_process";

export async function predictEmotion(features) {
  return new Promise((resolve, reject) => {
    const pythonPath = "./venv/Scripts/python"; 
    const process = spawn(pythonPath, ["predict.py"], { cwd: "./" });

    let stdout = "";
    let stderr = "";

    process.stdout.on("data", (data) => (stdout += data.toString()));
    process.stderr.on("data", (data) => (stderr += data.toString()));

    process.on("error", (err) =>
      reject(new Error(`Failed to start Python process: ${err.message}`))
    );

    process.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(`Python crashed:\n${stderr}`));
      }

      // Filter sklearn warnings
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

    process.stdin.write(JSON.stringify({ features }));
    process.stdin.end();
  });
}
