const execSync = require("child_process").execSync;

function exec(cmd) {
    execSync(cmd, { stdio: "inherit", env: process.env });
}

if (process.env.CI) {
    if (process.env.TRAVIS_BRANCH !== "website") {
        // exec("lerna bootstrap --ci --ignore website --registry http://registry.npm.rsscc.cn/repository/hbgj-fe/");
        exec("lerna bootstrap --ci --ignore website --registry https://registry.npmjs.org/");
    } else {
        exec("lerna bootstrap --ci --registry https://registry.npmjs.org/");
    }
} else {
    exec("lerna bootstrap --no-ci --registry https://registry.npmjs.org/");
}
