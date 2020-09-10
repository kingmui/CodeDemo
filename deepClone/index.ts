// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
// WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的
// 持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行
function deepClone(source, hashMap = new WeakMap()) {
  // 基本数据类型直接返回
  if (!isObject(source)) return source;

  // 查找哈希表，解决**循环引用**
  if (hashMap.has(source)) return hashMap.get(source);

  const target = Array.isArray(source) ? [...source] : { ...source };

  // 设置哈希表
  hashMap.set(source, target);

  // *************** Reflect
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys
  // Reflect.ownKeys 方法返回一个由目标对象自身的属性键组成的数组
  // 它的返回值等同于 Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
  Reflect.ownKeys(target).forEach((key) => {
    if (isObject(source[key])) {
      target[key] = deepClone(source[key], hashMap);
    } else {
      target[key] = source[key];
    }
  });
  // ***************

  // =============== 处理 Symbol
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols
  // 返回一个给定对象自身的所有 Symbol 属性的数组

  // let symKeys = Object.getOwnPropertySymbols(source);
  // if (symKeys.length) {
  //   symKeys.forEach((symKey) => {
  //     if (isObject(source[symKey])) {
  //       target[symKey] = deepClone(source[symKey], hashMap);
  //     } else {
  //       target[symKey] = source[symKey];
  //     }
  //   });
  // }
  // ===============

  // =============== 排除 Symbol
  // 为什么不用 `source.hasOwnProperty(key)`？
  // 对象可能由 `Object.create(null)` 创建

  // for (const key in source) {
  //   if (Object.prototype.hasOwnProperty.call(source, key)) {
  //     if (isObject(source[key])) {
  //       target[key] = deepClone(source[key], hashMap);
  //     } else {
  //       target[key] = source[key];
  //     }
  //   }
  // }
  // ===============

  return target;
}

function isObject(obj) {
  return obj !== null && typeof obj === "object";
  // return Object.prototype.toString.call(obj) === '[object Object]';
}
