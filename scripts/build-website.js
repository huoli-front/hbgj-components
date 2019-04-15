const path = require("path");
const execSync = require("child_process").execSync;

function exec(cmd) {
    execSync(cmd, { stdio: "inherit", env: process.env });
}

const cwd = process.cwd();

if (!process.argv.includes("--no-website-bak")) {
    process.chdir(path.resolve(__dirname, "../website"));
    exec("npm run build");
}

process.chdir(cwd);
