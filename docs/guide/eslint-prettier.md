# eslint + prettier 代码规范

安装步骤
[eslint](https://github.com/prettier/eslint-plugin-prettier)
yarn add eslint eslint-plugin-vue @typescript-eslint/eslint-plugin vue-eslint-parser --dev

typescript 支持
yarn add @typescript-eslint/parser --dev

prettier
yarn add prettier eslint-plugin-prettier --dev

解决 eslint 和 prettier 冲突
yarn add eslint-config-prettier --dev

[eslint-define-config](https://www.npmjs.com/package/eslint-define-config)
Why?
Improve your eslint configuration experience with:

auto-suggestions
type checking `(Use // @ts-check at the first line in your .eslintrc.js)`
documentation
deprecation warnings

[检测css样式]
<!-- https://juejin.cn/post/7022720509875847182 -->
[这里stylelint 版本有个坑，目前不能大于14，不然检测时会报错]
yarn stylelint stylelint-config-prettier stylelint-config-standard stylelint-order --dev

## TODO
<!-- git commit  -->
[安装husky](https://typicode.github.io/husky/#/)
[步骤](https://www.jianshu.com/p/77f715968e51)
Install
1、Install husky
yarn add husky --dev
yarn add pinst --dev # ONLY if your package is not private
2、Enable Git hooks
yarn husky install
3、To automatically have Git hooks enabled after install, edit package.json
// package.json
{
  "private": true, // ← your package is private, you only need postinstall
  "scripts": {
    "postinstall": "husky install"
  }
}
4、Create a hook
To add a command to a hook or create a new one, use husky add \<file> [cmd] (don't forget to run husky install before).

npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
Try to make a commit

git commit -m "Keep calm and commit"
If npm test command fails, your commit will be automatically aborted.

5、windows 兼容
Yarn on Windows
Git hooks may fail when using Yarn on Windows with Git Bash (stdin is not a tty). If you have users on Windows, it's highly recommended to add the following workaround.

Create .husky/common.sh:
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

## Workaround for Windows 10, Git Bash and Yarn

if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
Source it in in places where Yarn is used to run commands:
 #!/bin/sh
. "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"

yarn ...

[为什么需要单元测试](https://segmentfault.com/a/1190000015724775)
[单元测试jest](https://blog.csdn.net/weixin_33768481/article/details/93175049)

<!-- 按需加载插件组件 -->
[unplugin-element-plus](https://www.npmjs.com/package/unplugin-element-plus)
[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

<!-- vite插件 -->
处理 commonjs 引入
[vite-plugin-commonjs-externals](https://www.npmjs.com/package/vite-plugin-commonjs-externals)

vite eslint 配置插件
[vite-plugin-eslint](https://www.npmjs.com/package/vite-plugin-eslint)

svg icon
[vite-plugin-svg-icons](https://www.npmjs.com/package/vite-plugin-svg-icons)

Make the vue script setup syntax support the name attribute
[vite-plugin-vue-setup-extend](https://github.com/anncwb/vite-plugin-vue-setup-extend)

<!-- editorconfig -->
[.editorconfig](https://cloud.tencent.com/developer/article/1546185)
