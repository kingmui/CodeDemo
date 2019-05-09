module.exports = {
  // 以当前目录为根目录，不再向上查找 .eslintrc.js
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jquery: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  /**
   * 配置规则格式
   * 规则格式是<规则名称>: <告警级别>，告警级别分为三种:
   * 0 表示忽略问题，等同于"off"
   * 1 表示给出警告，等同于"warn"
   * 2 表示直接报错，等同于"error"
   */
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        semi: true
      }
    ],
    'no-alert': 0,
    'no-console': 2,
    // 禁止在函数参数中出现重复名称的参数
    'no-dupe-args': 2,
    // 禁止在对象字面量中出现重复名称的键名
    'no-dupe-keys': 2,
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ],
    // ---------最佳实践---------
    // setter 必须有对应的 getter，getter 可以没有对应的 setter
    'accessor-pairs': [
      'error',
      {
        setWithoutGet: true,
        getWithoutSet: false
      }
    ],
    // 数组的方法除了 forEach 之外，回调函数必须有返回值
    'array-callback-return': 2,
    // 将 var 定义的变量视为块作用域，禁止在块外使用
    'block-scoped-var': 2,
    // 禁止使用 caller 或 callee
    'no-caller': 2,
    // 禁止使用 eval
    'no-eval': 2,
    // 禁止使用 with
    'no-with': 2,
    // 禁止修改原生对象
    'no-extend-native': 2,
    // switch 的 case 内必须有 break, return 或 throw
    'no-fallthrough': 2,
    'no-undef': 2,
    'no-unused-vars': 2,
    // 禁止重复定义变量
    "no-redeclare": 2,
    // 必须使用单引号，禁止使用双引号
    'quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    // 分号必须写在行尾，禁止在行首出现
    'semi-style': [
      'error',
      'last'
    ],
    // if, function 等的大括号之前必须要有空格，比如 if (a) {
    'space-before-blocks': [
      'error',
      'always'
    ],
    // function 的小括号之前必须要有空格
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    // 小括号内的首尾禁止有空格
    'space-in-parens': [
      'error',
      'never'
    ],
    // 操作符左右必须有空格，比如 let sum = 1 + 2;
    'space-infix-ops': 2,
    // new, typeof 等后面必须有空格，++, -- 等禁止有空格
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ],
    // 注释的斜线或 * 后必须有空格
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          exceptions: [
            '*'
          ],
          balanced: true
        }
      }
    ],
    // case 的冒号前禁止有空格，冒号后必须有空格
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false
      }
    ],
    // 箭头函数的箭头前后必须有空格
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    // 禁止对定义过的 class 重新赋值
    'no-class-assign': 2,
    // 禁止对使用 const 定义的常量重新赋值
    'no-const-assign': 2,
    // 禁止重复定义类
    'no-dupe-class-members': 2,
    // ${name} 内的首尾禁止有空格
    'template-curly-spacing': [
      'error',
      'never'
    ]
  }
};
