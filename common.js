  // // 深层克隆
  function deepClone(origin, target) {
      target = target || {},
          toStr = Object.prototype.toString,
          arrStr = "[object Array]";

      for (let prop in origin) {
          if (origin.hasOwnProperty(prop)) {
              if (origin[prop] !== null && typeof(origin[prop]) == "object") {
                  target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {};
                  deepClone(origin[prop], target[prop]);
              } else {
                  target[prop] = origin[prop];
              }
          }
      }
      return target;
  }