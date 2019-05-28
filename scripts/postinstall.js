const execSync = require("child_process").execSync;

function exec(cmd) {
    execSync(cmd, { stdio: "inherit", env: process.env });
}
exec("pwd")
exec("cat ~/.npmrc");
if (process.env.CI) {
    if (process.env.TRAVIS_BRANCH !== "website") {
        exec("lerna bootstrap --ci --ignore website --registry http://registry.npm.rsscc.cn/repository/hbgj-fe/");
    } else {
        exec("lerna bootstrap --ci --registry http://registry.npm.rsscc.cn/repository/hbgj-fe/");
    }
} else {
    exec("lerna bootstrap --no-ci --registry http://registry.npm.rsscc.cn/repository/hbgj-fe/");
}
