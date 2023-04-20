import store from "@/store";
export function downloadFile(res, fileName) {
  const { headers, data } = res;
  if (!headers["content-disposition"]) {
    return false;
  }
  const blob = new Blob([data]);
  let FILE_NAME = "";
  if (fileName) {
    FILE_NAME = fileName;
  } else {
    const NAME = headers["content-disposition"]
      .split(";")[1]
      .split("filename=")[1];
    FILE_NAME = decodeURIComponent(NAME);
  }
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, FILE_NAME);
  } else {
    const link = document.createElement("a");
    link.download = FILE_NAME;
    link.style.display = "none";
    link.href = window.URL.createObjectURL(blob);
    link.click();
  }
  return true;
}

/**
 * 深拷贝对象
 * @param {*} obj 拷贝的数据
 * @returns 返回拷贝的数据
 * @author LenGxin
 */
export function deepClone(obj) {
  const _toString = Object.prototype.toString;

  // null, undefined, non-object, function
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  // DOM Node
  if (obj.nodeType && "cloneNode" in obj) {
    return obj.cloneNode(true);
  }

  // Date
  if (_toString.call(obj) === "[object Date]") {
    return new Date(obj.getTime());
  }

  // RegExp
  if (_toString.call(obj) === "[object RegExp]") {
    const flags = [];
    if (obj.global) {
      flags.push("g");
    }
    if (obj.multiline) {
      flags.push("m");
    }
    if (obj.ignoreCase) {
      flags.push("i");
    }

    return new RegExp(obj.source, flags.join(""));
  }

  const result = Array.isArray(obj)
    ? []
    : obj.constructor
    ? new obj.constructor()
    : {};

  Object.keys(obj).forEach((key) => {
    result[key] = deepClone(obj[key]);
  });

  return result;
}

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roleType = store.getters && store.getters.roleType;
    const permissionRoles = value;

    const hasPermission = roleType.some((role) => {
      return permissionRoles.includes(role);
    });
    return hasPermission;
  } else {
    /**
     * 角色类型
     * @param {string} roleType 1 - 集采总监（采购审批员）
     * @param {string} roleType 2 - 禹佳卡运营
     * @param {string} roleType 3 - 禹佳财务
     * @param {string} roleType 4 - 禹佳财务总监
     */
    console.error(`need roles! Like v-permission="['1','2', '3', '4']"`);
    return false;
  }
}
