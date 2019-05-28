const execSync = require("child_process").execSync;

function exec(cmd) {
    execSync(cmd, { stdio: "inherit", env: process.env });
}
exec('echo "before installaaaaaaaaaaaa"')
exec('echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > "$HOME/.npmrc"')
exec('echo "//registry.npm.rsscc.cn/repository/hbgj-npm/:_authToken=$HL_TOKEN" >> "$HOME/.npmrc"')
exec('echo "//registry.npm.rsscc.cn/repository/hbgj-fe/:_authToken=$HL_TOKEN" >> "$HOME/.npmrc"')
exec('echo "registry=http://registry.npm.rsscc.cn/repository/hbgj-fe/" >> "$HOME/.npmrc"')
exec('cat $HOME/.npmrc')

if (process.env.CI) {
    if (process.env.TRAVIS_BRANCH !== "website") {
        exec("lerna bootstrap --ci --ignore website --registry http://registry.npm.rsscc.cn/repository/hbgj-fe/");
    } else {
        exec("lerna bootstrap --ci --registry http://registry.npm.rsscc.cn/repository/hbgj-fe/");
    }
} else {
    exec("lerna bootstrap --no-ci --registry http://registry.npm.rsscc.cn/repository/hbgj-fe/");
}
