var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  render: () => render
});
module.exports = __toCommonJS(stdin_exports);

// app/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// app/node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   * @param {any} [value] - The value that failed to be serialized
   * @param {any} [root] - The root value being serialized
   */
  constructor(message, keys, value, root) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
    this.value = value;
    this.root = root;
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key) {
  return is_identifier.test(key) ? "." + key : "[" + JSON.stringify(key) + "]";
}
function is_valid_array_index(s) {
  if (s.length === 0) return false;
  if (s.length > 1 && s.charCodeAt(0) === 48) return false;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c < 48 || c > 57) return false;
  }
  const n = +s;
  if (n >= 2 ** 32 - 1) return false;
  if (n < 0) return false;
  return true;
}
function valid_array_indices(array) {
  const keys = Object.keys(array);
  for (var i = keys.length - 1; i >= 0; i--) {
    if (is_valid_array_index(keys[i])) {
      break;
    }
  }
  keys.length = i + 1;
  return keys;
}

// app/node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing, (value2) => uneval(value2, replacer));
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      if (typeof thing === "function") {
        throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
        case "URL":
        case "URLSearchParams":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key) ? stringify_primitive(key) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
          walk(thing.buffer);
          return;
        case "ArrayBuffer":
          return;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys,
              thing,
              value
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys,
              thing,
              value
            );
          }
          for (const key of Object.keys(thing)) {
            if (key === "__proto__") {
              throw new DevalueError(
                `Cannot stringify objects with __proto__ keys`,
                keys,
                thing,
                value
              );
            }
            keys.push(stringify_key(key));
            walk(thing[key]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "URL":
        return `new URL(${stringify_string(thing.toString())})`;
      case "URLSearchParams":
        return `new URLSearchParams(${stringify_string(thing.toString())})`;
      case "Array": {
        let has_holes = false;
        let result = "[";
        for (let i = 0; i < thing.length; i += 1) {
          if (i > 0) result += ",";
          if (Object.hasOwn(thing, i)) {
            result += stringify2(thing[i]);
          } else if (!has_holes) {
            const populated_keys = valid_array_indices(
              /** @type {any[]} */
              thing
            );
            const population = populated_keys.length;
            const d = String(thing.length).length;
            const hole_cost = thing.length + 2;
            const sparse_cost = 25 + d + population * (d + 2);
            if (hole_cost > sparse_cost) {
              const entries = populated_keys.map((k) => `${k}:${stringify2(thing[k])}`).join(",");
              return `Object.assign(Array(${thing.length}),{${entries}})`;
            }
            has_holes = true;
            i -= 1;
          }
        }
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return result + tail + "]";
      }
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        let str2 = `new ${type}`;
        if (counts.get(thing.buffer) === 1) {
          const array = new thing.constructor(thing.buffer);
          str2 += `([${array}])`;
        } else {
          str2 += `([${stringify2(thing.buffer)}])`;
        }
        const a = thing.byteOffset;
        const b = a + thing.byteLength;
        if (a > 0 || b !== thing.buffer.byteLength) {
          const m = +/(\d+)/.exec(type)[1] / 8;
          str2 += `.subarray(${a / m},${b / m})`;
        }
        return str2;
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      case "Temporal.Duration":
      case "Temporal.Instant":
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.PlainMonthDay":
      case "Temporal.PlainYearMonth":
      case "Temporal.ZonedDateTime":
        return `${type}.from(${stringify_string(thing.toString())})`;
      default:
        const keys2 = Object.keys(thing);
        const obj = keys2.map((key) => `${safe_key(key)}:${stringify2(thing[key])}`).join(",");
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return keys2.length > 0 ? `{${obj},__proto__:null}` : `{__proto__:null}`;
        }
        return `{${obj}}`;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        case "ArrayBuffer":
          values.push(
            `new Uint8Array([${new Uint8Array(thing).join(",")}]).buffer`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key) => {
            statements.push(
              `${name}${safe_prop(key)}=${stringify2(thing[key])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escape_unsafe_chars(JSON.stringify(key));
}
function safe_prop(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escape_unsafe_chars(JSON.stringify(key))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (typeof thing === "number") return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint") return thing + "n";
  return str;
}

// app/node_modules/@mdi/js/mdi.js
var mdiAlertRhombusOutline = "M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12M11 7V13H13V7M11 15V17H13V15Z";
var mdiChevronRight = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
var mdiDownloadOutline = "M13,5V11H14.17L12,13.17L9.83,11H11V5H13M15,3H9V9H5L12,16L19,9H15V3M19,18H5V20H19V18Z";
var mdiFile = "M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z";
var mdiFolder = "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z";
var mdiGithub = "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z";
var mdiInformationOutline = "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";
var mdiLightbulbGroupOutline = "M7 19A2.93 2.93 0 0 0 7.17 20H6A1 1 0 0 1 5 19V18H7M10 19A1 1 0 0 0 11 20H13A1 1 0 0 0 14 19V18H10M4 16A1 1 0 0 0 5 17H7V14.88A6.92 6.92 0 0 1 5 10A6.79 6.79 0 0 1 5.68 7A4 4 0 0 0 4 14.45M17 19A2.93 2.93 0 0 1 16.83 20H18A1 1 0 0 0 19 19V18H17M17 10A5 5 0 0 1 15 14V16A1 1 0 0 1 14 17H10A1 1 0 0 1 9 16V14A5 5 0 1 1 17 10M15 10A3 3 0 1 0 11 12.82V15H13V12.82A3 3 0 0 0 15 10M18.32 7A6.79 6.79 0 0 1 19 10A6.92 6.92 0 0 1 17 14.88V17H19A1 1 0 0 0 20 16V14.45A4 4 0 0 0 18.32 7Z";
var mdiPackage = "M5.12,5H18.87L17.93,4H5.93L5.12,5M20.54,5.23C20.83,5.57 21,6 21,6.5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V6.5C3,6 3.17,5.57 3.46,5.23L4.84,3.55C5.12,3.21 5.53,3 6,3H18C18.47,3 18.88,3.21 19.15,3.55L20.54,5.23M6,18H12V15H6V18Z";
var mdiTextSearch = "M19.31 18.9L22.39 22L21 23.39L17.88 20.32C17.19 20.75 16.37 21 15.5 21C13 21 11 19 11 16.5C11 14 13 12 15.5 12C18 12 20 14 20 16.5C20 17.38 19.75 18.21 19.31 18.9M15.5 19C16.88 19 18 17.88 18 16.5C18 15.12 16.88 14 15.5 14C14.12 14 13 15.12 13 16.5C13 17.88 14.12 19 15.5 19M21 4V6H3V4H21M3 16V14H9V16H3M3 11V9H21V11H18.97C17.96 10.37 16.77 10 15.5 10C14.23 10 13.04 10.37 12.03 11H3Z";

// <stdin>
var HYDRATION_START = "[";
var HYDRATION_START_FAILED = "[?";
var HYDRATION_END = "]";
var ELEMENT_IS_NAMESPACED = 1;
var ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
var ELEMENT_IS_INPUT = 1 << 2;
var UNINITIALIZED = /* @__PURE__ */ Symbol();
var ATTR_REGEX = /[&"<]/g;
var CONTENT_REGEX = /[&<]/g;
function escape_html(value, is_attr) {
  const str = String(value ?? "");
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
var has_own_property = Object.prototype.hasOwnProperty;
var noop = () => {
};
var replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (name === "hidden" && value !== "until-found") {
    is_boolean = true;
  }
  if (value == null || !value && is_boolean) return "";
  const normalized = has_own_property.call(replacements, name) && replacements[name].get(value) || value;
  const assignment = is_boolean ? `=""` : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function clsx2(value) {
  if (typeof value === "object") {
    return clsx(value);
  } else {
    return value ?? "";
  }
}
var whitespace = [..." 	\n\r\f\xA0\v\uFEFF"];
function to_class(value, hash, directives) {
  var classname = value == null ? "" : "" + value;
  if (hash) {
    classname = classname ? classname + " " + hash : hash;
  }
  if (directives) {
    for (var key of Object.keys(directives)) {
      if (directives[key]) {
        classname = classname ? classname + " " + key : key;
      } else if (classname.length) {
        var len = key.length;
        var a = 0;
        while ((a = classname.indexOf(key, a)) >= 0) {
          var b = a + len;
          if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
            classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
          } else {
            a = b;
          }
        }
      }
    }
  }
  return classname === "" ? null : classname;
}
function append_styles(styles, important = false) {
  var separator = important ? " !important;" : ";";
  var css = "";
  for (var key of Object.keys(styles)) {
    var value = styles[key];
    if (value != null && value !== "") {
      css += " " + key + ": " + value + separator;
    }
  }
  return css;
}
function to_css_name(name) {
  if (name[0] !== "-" || name[1] !== "-") {
    return name.toLowerCase();
  }
  return name;
}
function to_style(value, styles) {
  if (styles) {
    var new_style = "";
    var normal_styles;
    var important_styles;
    if (Array.isArray(styles)) {
      normal_styles = styles[0];
      important_styles = styles[1];
    } else {
      normal_styles = styles;
    }
    if (value) {
      value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var in_str = false;
      var in_apo = 0;
      var in_comment = false;
      var reserved_names = [];
      if (normal_styles) {
        reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
      }
      if (important_styles) {
        reserved_names.push(...Object.keys(important_styles).map(to_css_name));
      }
      var start_index = 0;
      var name_index = -1;
      const len = value.length;
      for (var i = 0; i < len; i++) {
        var c = value[i];
        if (in_comment) {
          if (c === "/" && value[i - 1] === "*") {
            in_comment = false;
          }
        } else if (in_str) {
          if (in_str === c) {
            in_str = false;
          }
        } else if (c === "/" && value[i + 1] === "*") {
          in_comment = true;
        } else if (c === '"' || c === "'") {
          in_str = c;
        } else if (c === "(") {
          in_apo++;
        } else if (c === ")") {
          in_apo--;
        }
        if (!in_comment && in_str === false && in_apo === 0) {
          if (c === ":" && name_index === -1) {
            name_index = i;
          } else if (c === ";" || i === len - 1) {
            if (name_index !== -1) {
              var name = to_css_name(value.substring(start_index, name_index).trim());
              if (!reserved_names.includes(name)) {
                if (c !== ";") {
                  i++;
                }
                var property = value.substring(start_index, i).trim();
                new_style += " " + property + ";";
              }
            }
            start_index = i + 1;
            name_index = -1;
          }
        }
      }
    }
    if (normal_styles) {
      new_style += append_styles(normal_styles);
    }
    if (important_styles) {
      new_style += append_styles(important_styles, true);
    }
    new_style = new_style.trim();
    return new_style === "" ? null : new_style;
  }
  return value == null ? null : String(value);
}
var STALE_REACTION = new class StaleReactionError extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function lifecycle_outside_component(name) {
  {
    throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
  }
}
var DOM_BOOLEAN_ATTRIBUTES = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected",
  "webkitdirectory",
  "defer",
  "disablepictureinpicture",
  "disableremoteplayback"
];
function is_boolean_attribute(name) {
  return DOM_BOOLEAN_ATTRIBUTES.includes(name);
}
var BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
var BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
var EMPTY_COMMENT = `<!---->`;
var controller = null;
function abort() {
  controller?.abort(STALE_REACTION);
  controller = null;
}
function await_invalid() {
  const error = new Error(`await_invalid
Encountered asynchronous work while rendering synchronously.
https://svelte.dev/e/await_invalid`);
  error.name = "Svelte error";
  throw error;
}
function invalid_csp() {
  const error = new Error(`invalid_csp
\`csp.nonce\` was set while \`csp.hash\` was \`true\`. These options cannot be used simultaneously.
https://svelte.dev/e/invalid_csp`);
  error.name = "Svelte error";
  throw error;
}
function server_context_required() {
  const error = new Error(`server_context_required
Could not resolve \`render\` context.
https://svelte.dev/e/server_context_required`);
  error.name = "Svelte error";
  throw error;
}
var ssr_context = null;
function set_ssr_context(v) {
  ssr_context = v;
}
function getContext(key) {
  const context_map = get_or_init_context_map();
  const result = (
    /** @type {T} */
    context_map.get(key)
  );
  return result;
}
function setContext(key, context) {
  get_or_init_context_map().set(key, context);
  return context;
}
function get_or_init_context_map(name) {
  if (ssr_context === null) {
    lifecycle_outside_component();
  }
  return ssr_context.c ??= new Map(get_parent_context(ssr_context) || void 0);
}
function push(fn) {
  ssr_context = { p: ssr_context, c: null, r: null };
}
function pop() {
  ssr_context = /** @type {SSRContext} */
  ssr_context.p;
}
function get_parent_context(ssr_context2) {
  let parent = ssr_context2.p;
  while (parent !== null) {
    const context_map = parent.c;
    if (context_map !== null) {
      return context_map;
    }
    parent = parent.p;
  }
  return null;
}
function unresolved_hydratable(key, stack) {
  {
    console.warn(`https://svelte.dev/e/unresolved_hydratable`);
  }
}
function get_render_context() {
  const store = als?.getStore();
  {
    server_context_required();
  }
  return store;
}
var als = null;
var text_encoder;
var crypto;
var obfuscated_import = (module_name) => import_627f0c8d3f2158f776f550ab47b35de9(
  /* @vite-ignore */
  module_name
);
async function sha256(data) {
  text_encoder ??= new TextEncoder();
  crypto ??= globalThis.crypto?.subtle?.digest ? globalThis.crypto : (
    // @ts-ignore - we don't install node types in the prod build
    // don't use import('node:crypto') directly because static analysers will think we rely on node when we don't
    (await obfuscated_import("node:crypto")).webcrypto
  );
  const hash_buffer = await crypto.subtle.digest("SHA-256", text_encoder.encode(data));
  return base64_encode(hash_buffer);
}
function base64_encode(bytes) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
var Renderer = class _Renderer {
  /**
   * The contents of the renderer.
   * @type {RendererItem[]}
   */
  #out = [];
  /**
   * Any `onDestroy` callbacks registered during execution of this renderer.
   * @type {(() => void)[] | undefined}
   */
  #on_destroy = void 0;
  /**
   * Whether this renderer is a component body.
   * @type {boolean}
   */
  #is_component_body = false;
  /**
   * If set, this renderer is an error boundary. When async collection
   * of the children fails, the failed snippet is rendered instead.
   * @type {{
   * 	failed: (renderer: Renderer, error: unknown, reset: () => void) => void;
   * 	transformError: (error: unknown) => unknown;
   * 	context: SSRContext | null;
   * } | null}
   */
  #boundary = null;
  /**
   * The type of string content that this renderer is accumulating.
   * @type {RendererType}
   */
  type;
  /** @type {Renderer | undefined} */
  #parent;
  /**
   * Asynchronous work associated with this renderer
   * @type {Promise<void> | undefined}
   */
  promise = void 0;
  /**
   * State which is associated with the content tree as a whole.
   * It will be re-exposed, uncopied, on all children.
   * @type {SSRState}
   * @readonly
   */
  global;
  /**
   * State that is local to the branch it is declared in.
   * It will be shallow-copied to all children.
   *
   * @type {{ select_value: string | undefined }}
   */
  local;
  /**
   * @param {SSRState} global
   * @param {Renderer | undefined} [parent]
   */
  constructor(global, parent) {
    this.#parent = parent;
    this.global = global;
    this.local = parent ? { ...parent.local } : { select_value: void 0 };
    this.type = parent ? parent.type : "body";
  }
  /**
   * @param {(renderer: Renderer) => void} fn
   */
  head(fn) {
    const head2 = new _Renderer(this.global, this);
    head2.type = "head";
    this.#out.push(head2);
    head2.child(fn);
  }
  /**
   * @param {Array<Promise<void>>} blockers
   * @param {(renderer: Renderer) => void} fn
   */
  async_block(blockers, fn) {
    this.#out.push(BLOCK_OPEN);
    this.async(blockers, fn);
    this.#out.push(BLOCK_CLOSE);
  }
  /**
   * @param {Array<Promise<void>>} blockers
   * @param {(renderer: Renderer) => void} fn
   */
  async(blockers, fn) {
    let callback = fn;
    if (blockers.length > 0) {
      const context = ssr_context;
      callback = (renderer) => {
        return Promise.all(blockers).then(() => {
          const previous_context = ssr_context;
          try {
            set_ssr_context(context);
            return fn(renderer);
          } finally {
            set_ssr_context(previous_context);
          }
        });
      };
    }
    this.child(callback);
  }
  /**
   * @param {Array<() => void>} thunks
   */
  run(thunks) {
    const context = ssr_context;
    let promise = Promise.resolve(thunks[0]());
    const promises = [promise];
    for (const fn of thunks.slice(1)) {
      promise = promise.then(() => {
        const previous_context = ssr_context;
        set_ssr_context(context);
        try {
          return fn();
        } finally {
          set_ssr_context(previous_context);
        }
      });
      promises.push(promise);
    }
    promise.catch(noop);
    this.promise = promise;
    return promises;
  }
  /**
   * @param {(renderer: Renderer) => MaybePromise<void>} fn
   */
  child_block(fn) {
    this.#out.push(BLOCK_OPEN);
    this.child(fn);
    this.#out.push(BLOCK_CLOSE);
  }
  /**
   * Create a child renderer. The child renderer inherits the state from the parent,
   * but has its own content.
   * @param {(renderer: Renderer) => MaybePromise<void>} fn
   */
  child(fn) {
    const child = new _Renderer(this.global, this);
    this.#out.push(child);
    const parent = ssr_context;
    set_ssr_context({
      ...ssr_context,
      p: parent,
      c: null,
      r: child
    });
    const result = fn(child);
    set_ssr_context(parent);
    if (result instanceof Promise) {
      result.catch(noop);
      result.finally(() => set_ssr_context(null)).catch(noop);
      if (child.global.mode === "sync") {
        await_invalid();
      }
      child.promise = result;
    }
    return child;
  }
  /**
   * Render children inside an error boundary. If the children throw and the API-level
   * `transformError` transform handles the error (doesn't re-throw), the `failed` snippet is
   * rendered instead. Otherwise the error propagates.
   *
   * @param {{ failed?: (renderer: Renderer, error: unknown, reset: () => void) => void }} props
   * @param {(renderer: Renderer) => MaybePromise<void>} children_fn
   */
  boundary(props, children_fn) {
    const child = new _Renderer(this.global, this);
    this.#out.push(child);
    const parent_context = ssr_context;
    if (props.failed) {
      child.#boundary = {
        failed: props.failed,
        transformError: this.global.transformError,
        context: parent_context
      };
    }
    set_ssr_context({
      ...ssr_context,
      p: parent_context,
      c: null,
      r: child
    });
    try {
      const result = children_fn(child);
      set_ssr_context(parent_context);
      if (result instanceof Promise) {
        if (child.global.mode === "sync") {
          await_invalid();
        }
        result.catch(noop);
        child.promise = result;
      }
    } catch (error) {
      set_ssr_context(parent_context);
      const failed_snippet = props.failed;
      if (!failed_snippet) throw error;
      const result = this.global.transformError(error);
      child.#out.length = 0;
      child.#boundary = null;
      if (result instanceof Promise) {
        if (this.global.mode === "sync") {
          await_invalid();
        }
        child.promise = /** @type {Promise<unknown>} */
        result.then((transformed) => {
          child.#out.push(`<!--${HYDRATION_START_FAILED}${JSON.stringify(transformed)}-->`);
          failed_snippet(child, transformed, noop);
          child.#out.push(BLOCK_CLOSE);
        });
        child.promise.catch(noop);
      } else {
        child.#out.push(`<!--${HYDRATION_START_FAILED}${JSON.stringify(result)}-->`);
        failed_snippet(child, result, noop);
        child.#out.push(BLOCK_CLOSE);
      }
    }
  }
  /**
   * Create a component renderer. The component renderer inherits the state from the parent,
   * but has its own content. It is treated as an ordering boundary for ondestroy callbacks.
   * @param {(renderer: Renderer) => MaybePromise<void>} fn
   * @param {Function} [component_fn]
   * @returns {void}
   */
  component(fn, component_fn) {
    push();
    const child = this.child(fn);
    child.#is_component_body = true;
    pop();
  }
  /**
   * @param {Record<string, any>} attrs
   * @param {(renderer: Renderer) => void} fn
   * @param {string | undefined} [css_hash]
   * @param {Record<string, boolean> | undefined} [classes]
   * @param {Record<string, string> | undefined} [styles]
   * @param {number | undefined} [flags]
   * @param {boolean | undefined} [is_rich]
   * @returns {void}
   */
  select(attrs, fn, css_hash, classes, styles, flags, is_rich) {
    const { value, ...select_attrs } = attrs;
    this.push(`<select${attributes(select_attrs, css_hash, classes, styles, flags)}>`);
    this.child((renderer) => {
      renderer.local.select_value = value;
      fn(renderer);
    });
    this.push(`${is_rich ? "<!>" : ""}</select>`);
  }
  /**
   * @param {Record<string, any>} attrs
   * @param {string | number | boolean | ((renderer: Renderer) => void)} body
   * @param {string | undefined} [css_hash]
   * @param {Record<string, boolean> | undefined} [classes]
   * @param {Record<string, string> | undefined} [styles]
   * @param {number | undefined} [flags]
   * @param {boolean | undefined} [is_rich]
   */
  option(attrs, body, css_hash, classes, styles, flags, is_rich) {
    this.#out.push(`<option${attributes(attrs, css_hash, classes, styles, flags)}`);
    const close = (renderer, value, { head: head2, body: body2 }) => {
      if (has_own_property.call(attrs, "value")) {
        value = attrs.value;
      }
      if (value === this.local.select_value) {
        renderer.#out.push(' selected=""');
      }
      renderer.#out.push(`>${body2}${is_rich ? "<!>" : ""}</option>`);
      if (head2) {
        renderer.head((child) => child.push(head2));
      }
    };
    if (typeof body === "function") {
      this.child((renderer) => {
        const r2 = new _Renderer(this.global, this);
        body(r2);
        if (this.global.mode === "async") {
          return r2.#collect_content_async().then((content) => {
            close(renderer, content.body.replaceAll("<!---->", ""), content);
          });
        } else {
          const content = r2.#collect_content();
          close(renderer, content.body.replaceAll("<!---->", ""), content);
        }
      });
    } else {
      close(this, body, { body: escape_html(body) });
    }
  }
  /**
   * @param {(renderer: Renderer) => void} fn
   */
  title(fn) {
    const path = this.get_path();
    const close = (head2) => {
      this.global.set_title(head2, path);
    };
    this.child((renderer) => {
      const r2 = new _Renderer(renderer.global, renderer);
      fn(r2);
      if (renderer.global.mode === "async") {
        return r2.#collect_content_async().then((content) => {
          close(content.head);
        });
      } else {
        const content = r2.#collect_content();
        close(content.head);
      }
    });
  }
  /**
   * @param {string | (() => Promise<string>)} content
   */
  push(content) {
    if (typeof content === "function") {
      this.child(async (renderer) => renderer.push(await content()));
    } else {
      this.#out.push(content);
    }
  }
  /**
   * @param {() => void} fn
   */
  on_destroy(fn) {
    (this.#on_destroy ??= []).push(fn);
  }
  /**
   * @returns {number[]}
   */
  get_path() {
    return this.#parent ? [...this.#parent.get_path(), this.#parent.#out.indexOf(this)] : [];
  }
  /**
   * @deprecated this is needed for legacy component bindings
   */
  copy() {
    const copy = new _Renderer(this.global, this.#parent);
    copy.#out = this.#out.map((item) => item instanceof _Renderer ? item.copy() : item);
    copy.promise = this.promise;
    return copy;
  }
  /**
   * @param {Renderer} other
   * @deprecated this is needed for legacy component bindings
   */
  subsume(other) {
    if (this.global.mode !== other.global.mode) {
      throw new Error(
        "invariant: A renderer cannot switch modes. If you're seeing this, there's a compiler bug. File an issue!"
      );
    }
    this.local = other.local;
    this.#out = other.#out.map((item) => {
      if (item instanceof _Renderer) {
        item.subsume(item);
      }
      return item;
    });
    this.promise = other.promise;
    this.type = other.type;
  }
  get length() {
    return this.#out.length;
  }
  /**
   * Only available on the server and when compiling with the `server` option.
   * Takes a component and returns an object with `body` and `head` properties on it, which you can use to populate the HTML when server-rendering your app.
   * @template {Record<string, any>} Props
   * @param {Component<Props>} component
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp }} [options]
   * @returns {RenderOutput}
   */
  static render(component, options = {}) {
    let sync;
    const result = (
      /** @type {RenderOutput} */
      {}
    );
    Object.defineProperties(result, {
      html: {
        get: () => {
          return (sync ??= _Renderer.#render(component, options)).body;
        }
      },
      head: {
        get: () => {
          return (sync ??= _Renderer.#render(component, options)).head;
        }
      },
      body: {
        get: () => {
          return (sync ??= _Renderer.#render(component, options)).body;
        }
      },
      hashes: {
        value: {
          script: ""
        }
      },
      then: {
        value: (
          /**
           * this is not type-safe, but honestly it's the best I can do right now, and it's a straightforward function.
           *
           * @template TResult1
           * @template [TResult2=never]
           * @param { (value: SyncRenderOutput) => TResult1 } onfulfilled
           * @param { (reason: unknown) => TResult2 } onrejected
           */
          ((onfulfilled, onrejected) => {
            {
              const result2 = sync ??= _Renderer.#render(component, options);
              const user_result = onfulfilled({
                head: result2.head,
                body: result2.body,
                html: result2.body,
                hashes: { script: [] }
              });
              return Promise.resolve(user_result);
            }
          })
        )
      }
    });
    return result;
  }
  /**
   * Collect all of the `onDestroy` callbacks registered during rendering. In an async context, this is only safe to call
   * after awaiting `collect_async`.
   *
   * Child renderers are "porous" and don't affect execution order, but component body renderers
   * create ordering boundaries. Within a renderer, callbacks run in order until hitting a component boundary.
   * @returns {Iterable<() => void>}
   */
  *#collect_on_destroy() {
    for (const component of this.#traverse_components()) {
      yield* component.#collect_ondestroy();
    }
  }
  /**
   * Performs a depth-first search of renderers, yielding the deepest components first, then additional components as we backtrack up the tree.
   * @returns {Iterable<Renderer>}
   */
  *#traverse_components() {
    for (const child of this.#out) {
      if (typeof child !== "string") {
        yield* child.#traverse_components();
      }
    }
    if (this.#is_component_body) {
      yield this;
    }
  }
  /**
   * @returns {Iterable<() => void>}
   */
  *#collect_ondestroy() {
    if (this.#on_destroy) {
      for (const fn of this.#on_destroy) {
        yield fn;
      }
    }
    for (const child of this.#out) {
      if (child instanceof _Renderer && !child.#is_component_body) {
        yield* child.#collect_ondestroy();
      }
    }
  }
  /**
   * Render a component. Throws if any of the children are performing asynchronous work.
   *
   * @template {Record<string, any>} Props
   * @param {Component<Props>} component
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string }} options
   * @returns {AccumulatedContent}
   */
  static #render(component, options) {
    var previous_context = ssr_context;
    try {
      const renderer = _Renderer.#open_render("sync", component, options);
      const content = renderer.#collect_content();
      return _Renderer.#close_render(content, renderer);
    } finally {
      abort();
      set_ssr_context(previous_context);
    }
  }
  /**
   * Render a component.
   *
   * @template {Record<string, any>} Props
   * @param {Component<Props>} component
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp }} options
   * @returns {Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>}
   */
  static async #render_async(component, options) {
    const previous_context = ssr_context;
    try {
      const renderer = _Renderer.#open_render("async", component, options);
      const content = await renderer.#collect_content_async();
      const hydratables = await renderer.#collect_hydratables();
      if (hydratables !== null) {
        content.head = hydratables + content.head;
      }
      return _Renderer.#close_render(content, renderer);
    } finally {
      set_ssr_context(previous_context);
      abort();
    }
  }
  /**
   * Collect all of the code from the `out` array and return it as a string, or a promise resolving to a string.
   * @param {AccumulatedContent} content
   * @returns {AccumulatedContent}
   */
  #collect_content(content = { head: "", body: "" }) {
    for (const item of this.#out) {
      if (typeof item === "string") {
        content[this.type] += item;
      } else if (item instanceof _Renderer) {
        item.#collect_content(content);
      }
    }
    return content;
  }
  /**
   * Collect all of the code from the `out` array and return it as a string.
   * @param {AccumulatedContent} content
   * @returns {Promise<AccumulatedContent>}
   */
  async #collect_content_async(content = { head: "", body: "" }) {
    await this.promise;
    for (const item of this.#out) {
      if (typeof item === "string") {
        content[this.type] += item;
      } else if (item instanceof _Renderer) {
        if (item.#boundary) {
          const boundary_content = { head: "", body: "" };
          try {
            await item.#collect_content_async(boundary_content);
            content.head += boundary_content.head;
            content.body += boundary_content.body;
          } catch (error) {
            const { context, failed, transformError } = item.#boundary;
            set_ssr_context(context);
            let transformed = await transformError(error);
            const failed_renderer = new _Renderer(item.global, item);
            failed_renderer.type = item.type;
            failed_renderer.#out.push(
              `<!--${HYDRATION_START_FAILED}${JSON.stringify(transformed)}-->`
            );
            failed(failed_renderer, transformed, noop);
            failed_renderer.#out.push(BLOCK_CLOSE);
            await failed_renderer.#collect_content_async(content);
          }
        } else {
          await item.#collect_content_async(content);
        }
      }
    }
    return content;
  }
  async #collect_hydratables() {
    const ctx = get_render_context().hydratable;
    for (const [_, key] of ctx.unresolved_promises) {
      unresolved_hydratable(key, ctx.lookup.get(key)?.stack ?? "<missing stack trace>");
    }
    for (const comparison of ctx.comparisons) {
      await comparison;
    }
    return await this.#hydratable_block(ctx);
  }
  /**
   * @template {Record<string, any>} Props
   * @param {'sync' | 'async'} mode
   * @param {import('svelte').Component<Props>} component
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp; transformError?: (error: unknown) => unknown }} options
   * @returns {Renderer}
   */
  static #open_render(mode, component, options) {
    var previous_context = ssr_context;
    try {
      const renderer = new _Renderer(
        new SSRState(
          mode,
          options.idPrefix ? options.idPrefix + "-" : "",
          options.csp,
          options.transformError
        )
      );
      const context = { p: null, c: options.context ?? null, r: renderer };
      set_ssr_context(context);
      renderer.push(BLOCK_OPEN);
      component(renderer, options.props ?? {});
      renderer.push(BLOCK_CLOSE);
      return renderer;
    } finally {
      set_ssr_context(previous_context);
    }
  }
  /**
   * @param {AccumulatedContent} content
   * @param {Renderer} renderer
   * @returns {AccumulatedContent & { hashes: { script: Sha256Source[] } }}
   */
  static #close_render(content, renderer) {
    for (const cleanup of renderer.#collect_on_destroy()) {
      cleanup();
    }
    let head2 = content.head + renderer.global.get_title();
    let body = content.body;
    for (const { hash, code } of renderer.global.css) {
      head2 += `<style id="${hash}">${code}</style>`;
    }
    return {
      head: head2,
      body,
      hashes: {
        script: renderer.global.csp.script_hashes
      }
    };
  }
  /**
   * @param {HydratableContext} ctx
   */
  async #hydratable_block(ctx) {
    if (ctx.lookup.size === 0) {
      return null;
    }
    let entries = [];
    let has_promises = false;
    for (const [k, v] of ctx.lookup) {
      if (v.promises) {
        has_promises = true;
        for (const p of v.promises) await p;
      }
      entries.push(`[${uneval(k)},${v.serialized}]`);
    }
    let prelude = `const h = (window.__svelte ??= {}).h ??= new Map();`;
    if (has_promises) {
      prelude = `const r = (v) => Promise.resolve(v);
				${prelude}`;
    }
    const body = `
			{
				${prelude}

				for (const [k, v] of [
					${entries.join(",\n					")}
				]) {
					h.set(k, v);
				}
			}
		`;
    let csp_attr = "";
    if (this.global.csp.nonce) {
      csp_attr = ` nonce="${this.global.csp.nonce}"`;
    } else if (this.global.csp.hash) {
      const hash = await sha256(body);
      this.global.csp.script_hashes.push(`sha256-${hash}`);
    }
    return `
		<script${csp_attr}>${body}<\/script>`;
  }
};
var SSRState = class {
  /** @readonly @type {Csp & { script_hashes: Sha256Source[] }} */
  csp;
  /** @readonly @type {'sync' | 'async'} */
  mode;
  /** @readonly @type {() => string} */
  uid;
  /** @readonly @type {Set<{ hash: string; code: string }>} */
  css = /* @__PURE__ */ new Set();
  /**
   * `transformError` passed to `render`. Called when an error boundary catches an error.
   * Throws by default if unset in `render`.
   * @type {(error: unknown) => unknown}
   */
  transformError;
  /** @type {{ path: number[], value: string }} */
  #title = { path: [], value: "" };
  /**
   * @param {'sync' | 'async'} mode
   * @param {string} id_prefix
   * @param {Csp} csp
   * @param {((error: unknown) => unknown) | undefined} [transformError]
   */
  constructor(mode, id_prefix = "", csp = { hash: false }, transformError) {
    this.mode = mode;
    this.csp = { ...csp, script_hashes: [] };
    this.transformError = transformError ?? ((error) => {
      throw error;
    });
    let uid = 1;
    this.uid = () => `${id_prefix}s${uid++}`;
  }
  get_title() {
    return this.#title.value;
  }
  /**
   * Performs a depth-first (lexicographic) comparison using the path. Rejects sets
   * from earlier than or equal to the current value.
   * @param {string} value
   * @param {number[]} path
   */
  set_title(value, path) {
    const current = this.#title.path;
    let i = 0;
    let l = Math.min(path.length, current.length);
    while (i < l && path[i] === current[i]) i += 1;
    if (path[i] === void 0) return;
    if (current[i] === void 0 || path[i] > current[i]) {
      this.#title.path = path;
      this.#title.value = value;
    }
  }
};
var INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function render$1(component, options = {}) {
  if (options.csp?.hash && options.csp.nonce) {
    invalid_csp();
  }
  return Renderer.render(
    /** @type {Component<Props>} */
    component,
    options
  );
}
function head(hash, renderer, fn) {
  renderer.head((renderer2) => {
    renderer2.push(`<!--${hash}-->`);
    renderer2.child(fn);
    renderer2.push(EMPTY_COMMENT);
  });
}
function attributes(attrs, css_hash, classes, styles, flags = 0) {
  if (styles) {
    attrs.style = to_style(attrs.style, styles);
  }
  if (attrs.class) {
    attrs.class = clsx2(attrs.class);
  }
  if (css_hash || classes) {
    attrs.class = to_class(attrs.class, css_hash, classes);
  }
  let attr_str = "";
  let name;
  const is_html = (flags & ELEMENT_IS_NAMESPACED) === 0;
  const lowercase = (flags & ELEMENT_PRESERVE_ATTRIBUTE_CASE) === 0;
  const is_input = (flags & ELEMENT_IS_INPUT) !== 0;
  for (name of Object.keys(attrs)) {
    if (typeof attrs[name] === "function") continue;
    if (name[0] === "$" && name[1] === "$") continue;
    if (INVALID_ATTR_NAME_CHAR_REGEX.test(name)) continue;
    var value = attrs[name];
    if (lowercase) {
      name = name.toLowerCase();
    }
    if (name.length > 2 && name.startsWith("on")) continue;
    if (is_input) {
      if (name === "defaultvalue" || name === "defaultchecked") {
        name = name === "defaultvalue" ? "value" : "checked";
        if (attrs[name]) continue;
      }
    }
    attr_str += attr(name, value, is_html && is_boolean_attribute(name));
  }
  return attr_str;
}
function spread_props(props) {
  const merged_props = {};
  let key;
  for (let i = 0; i < props.length; i++) {
    const obj = props[i];
    if (obj == null) continue;
    for (key of Object.keys(obj)) {
      const desc = Object.getOwnPropertyDescriptor(obj, key);
      if (desc) {
        Object.defineProperty(merged_props, key, desc);
      } else {
        merged_props[key] = obj[key];
      }
    }
  }
  return merged_props;
}
function stringify(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
function attr_class(value, hash, directives) {
  var result = to_class(value, hash, directives);
  return result ? ` class="${escape_html(result, true)}"` : "";
}
function attr_style(value, directives) {
  var result = to_style(value, directives);
  return result ? ` style="${escape_html(result, true)}"` : "";
}
function bind_props(props_parent, props_now) {
  for (const key of Object.keys(props_now)) {
    const initial_value = props_parent[key];
    const value = props_now[key];
    if (initial_value === void 0 && value !== void 0 && Object.getOwnPropertyDescriptor(props_parent, key)?.set) {
      props_parent[key] = value;
    }
  }
}
function ensure_array_like(array_like_or_iterator) {
  if (array_like_or_iterator) {
    return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }
  return [];
}
function once(get_value) {
  let value = (
    /** @type {V} */
    UNINITIALIZED
  );
  return () => {
    if (value === UNINITIALIZED) {
      value = get_value();
    }
    return value;
  };
}
function derived(fn) {
  const get_value = ssr_context === null ? fn : once(fn);
  let updated_value;
  return function(new_value) {
    if (arguments.length === 0) {
      return updated_value ?? get_value();
    }
    updated_value = new_value;
    return updated_value;
  };
}
var $$css$g = {
  hash: "svelte-1ltxu9w",
  code: ":root {--code-background: #121212;--code-text: #cecdc3;--code-margin: 1rem;--code-padding: 1rem;--code-roundness: 1rem;}.code.svelte-1ltxu9w {position:relative;margin-top:var(--code-margin);margin-bottom:var(--code-margin);overflow:auto;border-radius:var(--code-roundness);background-color:var(--code-background);}.code.svelte-1ltxu9w > .text:where(.svelte-1ltxu9w) {position:relative;color:var(--code-text);padding:var(--code-padding);z-index:1;}"
};
function Code($$renderer, $$props) {
  $$renderer.global.css.add($$css$g);
  $$renderer.component(($$renderer2) => {
    let { source, lang } = $$props;
    function align(text) {
      const lines = [];
      let firstMeaningfulLine = "";
      for (const line of text.split("\n")) {
        const lineIsEmpty = line.trim() === "";
        if (firstMeaningfulLine === "") {
          firstMeaningfulLine = line;
        }
        if (lineIsEmpty && firstMeaningfulLine === "") {
          continue;
        }
        let lineLocal = line;
        const matches = firstMeaningfulLine.match(/^(\s+)/g) ?? [];
        if (matches.length !== 0) {
          lineLocal = lineLocal.replace(matches[0] ?? "", "");
        }
        lines.push(lineLocal);
      }
      return lines.join("\n").trim();
    }
    $$renderer2.push(`<div class="code svelte-1ltxu9w">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<pre class="text svelte-1ltxu9w">${escape_html(align(source))}</pre>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
var $$css$f = {
  hash: "svelte-1g4xjg9",
  code: ':root {--indexed-section-circle-size: 1rem;--indexed-section-circle-background: rgba(0, 0, 0, 0.3);--indexed-section-link-background: rgba(0, 0, 0, 0.3);--indexed-section-link-width: 0.3rem;--indexed-section-gap: 0.3rem;}.keyed-section.svelte-1g4xjg9 {display:grid;position:relative;gap:var(--indexed-section-gap);grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"badge content"\n            "link content"\n            "empty empty";}.badge.svelte-1g4xjg9 {grid-area:badge;position:relative;justify-self:center;align-self:center;}.badge.svelte-1g4xjg9 > .key:where(.svelte-1g4xjg9) {display:grid;justify-items:center;align-items:center;position:absolute;left:0;right:0;top:0;bottom:0;}.badge.svelte-1g4xjg9 > .circle:where(.svelte-1g4xjg9) {position:relative;background:var(--indexed-section-circle-background);border-radius:50%;padding:var(--indexed-section-circle-size);}.content.svelte-1g4xjg9 {grid-area:content;padding-top:0.3rem; /* A small padding because OCD. */}.link.svelte-1g4xjg9 {grid-area:link;position:relative;display:grid;justify-items:center;align-items:center;}.link.svelte-1g4xjg9 > .bar:where(.svelte-1g4xjg9) {position:absolute;top:0;bottom:0;width:var(--indexed-section-link-width);border-radius:var(--indexed-section-link-width);background:var(--indexed-section-link-background);}.link.hidden.svelte-1g4xjg9 {display:none;}'
};
function Keyed_section($$renderer, $$props) {
  $$renderer.global.css.add($$css$f);
  $$renderer.component(($$renderer2) => {
    let { key, children, noLink = false } = $$props;
    $$renderer2.push(`<div class="keyed-section svelte-1g4xjg9"><div class="badge svelte-1g4xjg9"><span class="key svelte-1g4xjg9">${escape_html(key[0])}</span> <div class="circle svelte-1g4xjg9"></div></div> <div class="content svelte-1g4xjg9">`);
    children($$renderer2);
    $$renderer2.push(`<!----></div> <div${attr_class("link svelte-1g4xjg9", void 0, { "hidden": noLink })}><div class="bar svelte-1g4xjg9"></div></div></div>`);
  });
}
var $$css$e = {
  hash: "svelte-nf47ks",
  code: ":root {--inline-code-background: rgba(30, 119, 148, 0.1);--inline-code-text: rgba(255, 255, 255, 0.7);--inline-code-top: 0.1.3rem;--inline-code-padding: 0.3rem;--inline-code-roundness: 0.3rem;}.inline-code.svelte-nf47ks {position:relative;display:inline-flex;align-items:center;transform:scale(0.9);top:var(--inline-code-top);}.inline-code.svelte-nf47ks > .text:where(.svelte-nf47ks) {position:relative;color:var(--inline-code-text);padding-left:var(--inline-code-padding);padding-right:var(--inline-code-padding);z-index:1;}.inline-code.svelte-nf47ks > .background:where(.svelte-nf47ks) {left:0;right:0;top:0;bottom:0;z-index:0;position:absolute;pointer-events:none;border-radius:var(--inline-code-roundness);background-color:var(--inline-code-background);}"
};
function Inline_code($$renderer, $$props) {
  $$renderer.global.css.add($$css$e);
  let { source } = $$props;
  $$renderer.push(`<span class="inline-code svelte-nf47ks"><span class="text svelte-nf47ks">${escape_html(source)}</span> <span class="background svelte-nf47ks"></span></span>`);
}
var $$css$d = {
  hash: "svelte-1jfone2",
  code: '.footer.svelte-1jfone2 {position:relative;display:grid;grid-template-areas:"edit-page empty empty"\n            "line line line"\n            "empty empty next";}'
};
function Footer($$renderer) {
  $$renderer.global.css.add($$css$d);
  $$renderer.push(`<div class="footer svelte-1jfone2"></div>`);
}
var $$css$c = {
  hash: "svelte-w3wuk5",
  code: ':root {--layout-padding: 1rem;}.layout.svelte-w3wuk5 {display:grid;position:fixed;top:0;left:0;right:0;bottom:0;grid-template-columns:auto 1fr auto;grid-template-rows:auto 1fr auto;grid-template-areas:"navbar navbar navbar"\n            "left-sidebar content right-sidebar"\n            "footer footer footer ";}.navbar.svelte-w3wuk5 {grid-area:navbar;padding:var(--layout-padding);background-color:rgba(0, 0, 0, 0.3);}.left-sidebar.svelte-w3wuk5 {max-width:20vw;grid-area:left-sidebar;padding:var(--layout-padding);}.right-sidebar.svelte-w3wuk5 {max-width:20vw;grid-area:right-sidebar;padding:var(--layout-padding);}.content.svelte-w3wuk5 {overflow-y:auto;grid-area:content;padding:var(--layout-padding);}.footer.svelte-w3wuk5 {grid-area:footer;padding:var(--layout-padding);}'
};
function Layout($$renderer, $$props) {
  $$renderer.global.css.add($$css$c);
  let { title, navbar, leftSidebar, rightSidebar, content, footer } = $$props;
  head("w3wuk5", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>${escape_html(title)}</title>`);
    });
    $$renderer2.push(`<meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>`);
  });
  $$renderer.push(`<div class="layout svelte-w3wuk5"><div class="navbar svelte-w3wuk5">`);
  navbar($$renderer);
  $$renderer.push(`<!----></div> <div class="left-sidebar svelte-w3wuk5">`);
  leftSidebar($$renderer);
  $$renderer.push(`<!----></div> <div class="right-sidebar svelte-w3wuk5">`);
  rightSidebar($$renderer);
  $$renderer.push(`<!----></div> <div class="content svelte-w3wuk5">`);
  content($$renderer);
  $$renderer.push(`<!----></div> <div class="footer svelte-w3wuk5">`);
  footer($$renderer);
  $$renderer.push(`<!----></div></div>`);
}
var logo = "/assets/logo-hs55enA9.webp";
var $$css$b = {
  hash: "svelte-1g9256p",
  code: "svg.svelte-1g9256p {--size: 1rem;width:var(--size);height:var(--size);}"
};
function Icon($$renderer, $$props) {
  $$renderer.global.css.add($$css$b);
  let { path, size = "1rem", fill = "currentColor", stroke = "none" } = $$props;
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr_style(`--size:${stringify(size)}`)} viewBox="0 0 24 24"${attr("stroke", stroke)}${attr("fill", fill)} class="svelte-1g9256p"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"${attr("d", path)}></path></svg>`);
}
var $$css$a = {
  hash: "svelte-1kbyz96",
  code: ':root {--searchbar-text: #5f5e5a;--searchbar-text-focused: #c0c0c0;--searchbar-gap: 1rem;--searchbar-border: 1px solid #5f5e5a;--searchbar-border-focused: 1px solid #c0c0c0;--searchbar-roundness: 1rem;--searchbar-padding: 1.4rem;}.searchbar.svelte-1kbyz96 {color:var(--searchbar-text);border-radius:var(--searchbar-roundness);border:var(--searchbar-border);gap:var(--searchbar-gap);padding:var(--searchbar-padding);width:100%;display:grid;position:relative;justify-items:start;align-items:center;background-color:transparent;grid-template-columns:auto 1fr auto;grid-template-areas:"icon content shortcut";}.icon.svelte-1kbyz96 {display:grid;pointer-events:none;align-items:center;position:absolute;left:var(--searchbar-padding);top:0;bottom:0;}.text.svelte-1kbyz96 {display:grid;align-items:center;position:absolute;left:0;right:0;top:0;bottom:0;background-color:transparent;padding:var(--searchbar-padding);padding-left:calc(var(--searchbar-padding) * 2.5);border:0;outline:none;color:inherit;}.shortcut.svelte-1kbyz96 {pointer-events:none;display:grid;align-items:center;position:absolute;right:var(--searchbar-padding);top:0;bottom:0;}.searchbar.focused.svelte-1kbyz96 {border:var(--searchbar-border-focused);}.text.focused.svelte-1kbyz96 {color:var(--searchbar-text-focused);}'
};
function Searchbar($$renderer, $$props) {
  $$renderer.global.css.add($$css$a);
  $$renderer.component(($$renderer2) => {
    let focused = false;
    $$renderer2.push(`<button${attr_class("searchbar svelte-1kbyz96", void 0, { "focused": focused })}><div class="icon svelte-1kbyz96">`);
    Icon($$renderer2, { path: mdiTextSearch, size: "1.5rem" });
    $$renderer2.push(`<!----></div> <input${attr_class("text svelte-1kbyz96", void 0, { "focused": focused })} type="text"/> <div class="shortcut svelte-1kbyz96">Ctrl K</div></button>`);
  });
}
var $$css$9 = {
  hash: "svelte-1ha2mkh",
  code: ':root {--navbar-title-text: #a2dece;--navbar-gap: 1rem;}.navbar.svelte-1ha2mkh {position:relative;display:grid;gap:var(--navbar-gap);align-items:center;grid-template-columns:auto 1fr 1fr 1fr auto;grid-template-areas:"logo title searchbar empty links";}.logo.svelte-1ha2mkh {grid-area:logo;}.title.svelte-1ha2mkh {grid-area:title;color:var(--navbar-title-text);}.searchbar.svelte-1ha2mkh {grid-area:searchbar;}.links.svelte-1ha2mkh {grid-area:links;text-align:end;}'
};
function Navbar($$renderer) {
  $$renderer.global.css.add($$css$9);
  $$renderer.push(`<div class="navbar svelte-1ha2mkh"><div class="logo svelte-1ha2mkh"><img${attr("src", logo)} width="32" height="32" alt="logo"/></div> <div class="title svelte-1ha2mkh">Frizzante Docs</div> <div class="searchbar svelte-1ha2mkh">`);
  Searchbar($$renderer);
  $$renderer.push(`<!----></div> <div class="links svelte-1ha2mkh"><a href="https://github.com/razshare/frizzante">`);
  Icon($$renderer, { size: "2rem", path: mdiGithub });
  $$renderer.push(`<!----></a></div></div>`);
}
var $$css$8 = {
  hash: "svelte-nodelc",
  code: ':root {--menu-item-gap: 1rem;}.menu-item.svelte-nodelc {display:grid;position:relative;gap:var(--menu-item-gap);grid-template-columns:auto 1fr;grid-template-areas:"children children"\n            "empty menu";}.children.svelte-nodelc {grid-area:children;}.menu.svelte-nodelc {grid-area:menu;}'
};
function Menu_item($$renderer, $$props) {
  $$renderer.global.css.add($$css$8);
  let { children, menu } = $$props;
  $$renderer.push(`<div class="menu-item svelte-nodelc"><div class="children svelte-nodelc">`);
  children($$renderer);
  $$renderer.push(`<!----></div> <div class="menu svelte-nodelc">`);
  if (menu) {
    $$renderer.push("<!--[-->");
    menu($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div></div>`);
}
var IS_BROWSER = typeof document !== "undefined";
var lastUrl = false;
async function swap(target, view) {
  if (lastUrl === false) {
    lastUrl = location.toString();
  }
  let requestUrl;
  let response;
  let method = "GET";
  const body = {};
  if (target.nodeName === "A") {
    const anchor = target;
    requestUrl = anchor.href;
    if (view.type === "snapshot") {
      requestUrl = requestUrl.replace(/\/+$/, "") + "/data.json";
    }
    response = await fetch(requestUrl, {
      headers: {
        Accept: "application/json"
      }
    });
  } else if (target.nodeName === "FORM") {
    const form = target;
    const data = new FormData(form);
    const params = new URLSearchParams();
    requestUrl = form.action.split("?")[0] ?? "";
    if (view.type === "snapshot") {
      requestUrl = requestUrl.replace(/\/+$/, "") + "/data.json";
    }
    form.reset();
    data.forEach(function each(value, key) {
      if (value instanceof File) {
        return;
      }
      body[key] = `${value}`;
      params.append(key, `${value}`);
    });
    method = form.method.toUpperCase();
    if (method === "GET") {
      const query = `?${params.toString()}`;
      response = await fetch(`${requestUrl}${query}`, {
        headers: {
          Accept: "application/json"
        }
      });
    } else {
      requestUrl = form.action;
      if (view.type === "snapshot") {
        requestUrl += "/data.json";
      }
      response = await fetch(requestUrl, {
        method,
        body: data,
        headers: {
          Accept: "application/json"
        }
      });
    }
  } else {
    return function push2() {
    };
  }
  const text = await response.text();
  if (text === "") {
    return function push2() {
    };
  }
  const remote = JSON.parse(text);
  await view.pin();
  view.name = remote.name;
  view.align = remote.align;
  view.render = remote.render;
  if (view.align === 1) {
    if (typeof view.props !== "object") {
      console.warn("view alignment intends to merge props, but local view props is not an object");
    } else if (typeof remote.props !== "object") {
      console.warn("view alignment intends to merge props, but remote props is not an object");
    } else {
      view.props = {
        ...view.props,
        ...remote.props
      };
    }
  } else {
    view.props = remote.props;
  }
  let fixedResponseUrl = response.url;
  if (view.type === "snapshot") {
    fixedResponseUrl = fixedResponseUrl.replace(/\/data\.json$/, "");
  }
  const stationary = lastUrl === fixedResponseUrl;
  lastUrl = fixedResponseUrl;
  return function push2() {
    if (stationary) {
      return;
    }
    const entry = {
      nodeName: target.nodeName,
      method,
      url: fixedResponseUrl,
      body
    };
    window.history.pushState(JSON.stringify(entry), "", fixedResponseUrl);
  };
}
var swapping = { active: false };
var started = false;
function route(view) {
  if (!IS_BROWSER || started) {
    return;
  }
  const form = document.createElement("form");
  const anchor = document.createElement("a");
  const listener = async function pop2(e) {
    if (!swapping.active) {
      return;
    }
    e.preventDefault();
    const serialized = e.state ?? "";
    if (serialized !== "") {
      const entry = JSON.parse(serialized);
      if (entry.method === "GET") {
        anchor.href = entry.url;
        await swap(anchor, view);
      }
      form.innerHTML = "";
      for (const key in entry.body) {
        const value = entry.body[key];
        const input = document.createElement("input");
        input.value = value;
        form.appendChild(input);
      }
      await swap(form, view);
      return;
    }
    anchor.href = "/";
    await swap(anchor, view);
  };
  window.addEventListener("popstate", listener);
  started = true;
}
function href(path = "") {
  if (!IS_BROWSER) {
    return {
      href: path,
      async onclick() {
        return true;
      }
    };
  }
  const anchor = document.createElement("a");
  anchor.href = path;
  const view = getContext("view");
  route(view);
  return {
    href: path,
    async onclick(event) {
      swapping.active = true;
      event.preventDefault();
      try {
        const record = await swap(anchor, view);
        record();
      } catch (error) {
        console.error("swapping failed", error);
      }
      swapping.active = false;
      return false;
    }
  };
}
function Link($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { href: path, children, class: cls, style } = $$props;
    let pending = false;
    let error = false;
    let options = derived(function run() {
      const out = href(path);
      return {
        href: out.href,
        onclick(event) {
          pending = true;
          out.onclick(event).then(function run2() {
            pending = false;
          }).catch(function run2(errorLocal) {
            error = errorLocal;
          });
        }
      };
    });
    $$renderer2.push(`<a${attributes({ ...options(), class: clsx2(cls), style })}>`);
    children($$renderer2, { pending, error });
    $$renderer2.push(`<!----></a>`);
  });
}
var $$css$7 = {
  hash: "svelte-yf7de",
  code: ':root {--menu-padding: 1rem;}.menu.svelte-yf7de {display:grid;position:relative;justify-items:end;grid-template-areas:"";padding:var(--menu-padding);}.menu-item-wrapper.svelte-yf7de {display:grid;grid-template-columns:1fr 1fr;grid-template:"menu-item-hint menu-item-content";}.menu-item-hint.svelte-yf7de {grid-area:menu-item-hint;}.menu-item-content.svelte-yf7de {grid-area:menu-item-content;}'
};
function Menu($$renderer, $$props) {
  $$renderer.global.css.add($$css$7);
  $$renderer.component(($$renderer2) => {
    const view = getContext("view");
    function item($$renderer3, options) {
      {
        let children = function($$renderer4, { pending }) {
          $$renderer4.push(`<div class="menu-item-wrapper svelte-yf7de"><div class="menu-item-hint svelte-yf7de">`);
          if (pending) {
            $$renderer4.push("<!--[-->");
            Icon($$renderer4, { path: mdiDownloadOutline });
          } else if (view.name === options.viewName) {
            $$renderer4.push("<!--[1-->");
            Icon($$renderer4, { path: mdiChevronRight });
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--></div> <div class="menu-item-content svelte-yf7de">`);
          Menu_item($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->${escape_html(options.text)}`);
            }
          });
          $$renderer4.push(`<!----></div></div>`);
        };
        Link($$renderer3, { href: options.href, children });
      }
    }
    $$renderer2.push(`<div class="menu svelte-yf7de">`);
    item($$renderer2, {
      text: "Get Started",
      viewName: "GetStarted",
      href: "/get_started"
    });
    $$renderer2.push(`<!----> `);
    item($$renderer2, { text: "Basics", viewName: "Basics", href: "/basics" });
    $$renderer2.push(`<!----> `);
    item($$renderer2, {
      text: "Web Sockets",
      viewName: "WebSockets",
      href: "/web_sockets"
    });
    $$renderer2.push(`<!----> `);
    item($$renderer2, {
      text: "Server Sent Events",
      viewName: "ServerSentEvents",
      href: "/server_sent_events"
    });
    $$renderer2.push(`<!----> `);
    item($$renderer2, { text: "Guards", viewName: "Guards", href: "/guards" });
    $$renderer2.push(`<!----> `);
    item($$renderer2, { text: "Views", viewName: "Views", href: "/views" });
    $$renderer2.push(`<!----> `);
    item($$renderer2, {
      text: "Web Standards",
      viewName: "WebStandards",
      href: "/web_standards"
    });
    $$renderer2.push(`<!----> `);
    item($$renderer2, {
      text: "Type Definitions",
      viewName: "TypeDefinitions",
      href: "/type_definitions"
    });
    $$renderer2.push(`<!----> `);
    item($$renderer2, {
      text: "Todos Example",
      viewName: "TodosExample",
      href: "/todos_example"
    });
    $$renderer2.push(`<!----> `);
    item($$renderer2, { text: "Cli", viewName: "Cli", href: "/cli" });
    $$renderer2.push(`<!----> `);
    item($$renderer2, { text: "Docker", viewName: "Docker", href: "/docker" });
    $$renderer2.push(`<!----> `);
    item($$renderer2, { text: "Issues", viewName: "Issues", href: "/issues" });
    $$renderer2.push(`<!----> `);
    item($$renderer2, {
      text: "Contributing",
      viewName: "Contributing",
      href: "/contributing"
    });
    $$renderer2.push(`<!----> `);
    item($$renderer2, { text: "Faq", viewName: "Faq", href: "/faq" });
    $$renderer2.push(`<!----></div>`);
  });
}
var $$css$6 = {
  hash: "svelte-bveh4d",
  code: ':root {--left-sidebar-gap: 1rem;}.sidebar.svelte-bveh4d {display:grid;position:relative;gap:var(--left-sidebar-gap);grid-template-columns:1fr auto;grid-template-areas:"empty content";}.content.svelte-bveh4d {grid-area:content;}'
};
function Left_sidebar($$renderer) {
  $$renderer.global.css.add($$css$6);
  $$renderer.push(`<div class="sidebar svelte-bveh4d"><div class="content svelte-bveh4d">`);
  Menu($$renderer);
  $$renderer.push(`<!----></div></div>`);
}
function Page($$renderer, $$props) {
  let { title, children, rightSidebar: sidebar } = $$props;
  {
    let navbar = function($$renderer2) {
      Navbar($$renderer2);
    }, content = function($$renderer2) {
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    }, footer = function($$renderer2) {
      Footer($$renderer2);
    }, leftSidebar = function($$renderer2) {
      Left_sidebar($$renderer2);
    }, rightSidebar = function($$renderer2) {
      sidebar($$renderer2);
      $$renderer2.push(`<!---->`);
    };
    Layout($$renderer, {
      title,
      navbar,
      content,
      footer,
      leftSidebar,
      rightSidebar
    });
  }
}
var $$css$5 = {
  hash: "svelte-d2tr0e",
  code: ':root {--tip-background: #261c39;--tip-text: #a193bd;--tip-icon: #a193bd;--tip-title: #a193bd;--tip-padding: 0.7rem;--tip-roundness: 1rem;--tip-margin: 0.5rem;}.tip.svelte-d2tr0e {position:relative;display:grid;grid-template-columns:auto 1fr;grid-template-areas:"icon title"\n            "empty empty"\n            "content content";background-color:var(--tip-background);color:var(--tip-text);padding:var(--tip-padding);border-radius:var(--tip-roundness);margin-top:var(--tip-margin);margin-bottom:var(--tip-margin);}.icon.svelte-d2tr0e {grid-area:icon;color:var(--danger-icon);}.title.svelte-d2tr0e {grid-area:title;color:var(--tip-title);padding-left:var(--tip-padding);}.content.svelte-d2tr0e {grid-area:content;}'
};
function Tip($$renderer, $$props) {
  $$renderer.global.css.add($$css$5);
  let { children } = $$props;
  $$renderer.push(`<div class="tip svelte-d2tr0e"><div class="icon svelte-d2tr0e">`);
  Icon($$renderer, { path: mdiLightbulbGroupOutline, size: "1.5rem" });
  $$renderer.push(`<!----></div> <div class="title svelte-d2tr0e">Tip</div> <div class="content svelte-d2tr0e">`);
  children($$renderer);
  $$renderer.push(`<!----></div></div>`);
}
var $$css$4 = {
  hash: "svelte-1mamns7",
  code: ':root {--directory-gap: 0.1rem;--directory-text-hover: #a2dece;--directory-link-background: #878580;--directory-link-width: 1px;}.directory.svelte-1mamns7 {display:grid;position:relative;gap:var(--directory-gap);grid-template-columns:auto auto 1fr;grid-template-rows:auto auto auto;grid-template-areas:"icon name"\n            "link content";}.icon.svelte-1mamns7 {position:relative;top:0.2rem;grid-area:icon;}.icon.svelte-1mamns7:hover {color:var(--directory-text-hover);}.name.svelte-1mamns7 {position:relative;grid-area:name;}.name.svelte-1mamns7:hover {color:var(--directory-text-hover);}.content.svelte-1mamns7 {grid-area:content;}.link.svelte-1mamns7 {grid-area:link;position:relative;display:grid;justify-items:center;align-items:center;}.link.svelte-1mamns7 > .bar:where(.svelte-1mamns7) {position:absolute;top:0;bottom:0;width:var(--directory-link-width);border-radius:var(--directory-link-width);background:var(--directory-link-background);}.link.hidden.svelte-1mamns7 {display:none;}button.svelte-1mamns7 {cursor:pointer;background:transparent;color:inherit;text-align:start;border:0;font-family:inherit;font-size:inherit;font-weight:inherit;}'
};
function Directory($$renderer, $$props) {
  $$renderer.global.css.add($$css$4);
  $$renderer.component(($$renderer2) => {
    let { name, icon = mdiFolder, children, expanded = false } = $$props;
    $$renderer2.push(`<div class="directory svelte-1mamns7"><button class="name svelte-1mamns7">${escape_html(name)}</button> <button class="icon svelte-1mamns7">`);
    Icon($$renderer2, { path: icon });
    $$renderer2.push(`<!----></button> <div class="content svelte-1mamns7">`);
    if (expanded && children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div${attr_class("link svelte-1mamns7", void 0, { "hidden": !children })}><div class="bar svelte-1mamns7"></div></div></div>`);
    bind_props($$props, { expanded });
  });
}
var $$css$3 = {
  hash: "svelte-1mah8sg",
  code: ':root {--file-gap: 0.1rem;}.file.svelte-1mah8sg {display:grid;position:relative;gap:var(--file-gap);grid-template-columns:auto 1fr;grid-template-areas:"icon name";}.icon.svelte-1mah8sg {position:relative;top:0.2rem;grid-area:icon;}.name.svelte-1mah8sg {position:relative;grid-area:name;}button.svelte-1mah8sg {cursor:default;background:transparent;color:inherit;text-align:start;border:0;font-family:inherit;font-size:inherit;font-weight:inherit;}'
};
function File$1($$renderer, $$props) {
  $$renderer.global.css.add($$css$3);
  let { name, icon = mdiFile } = $$props;
  $$renderer.push(`<div class="file svelte-1mah8sg"><button class="name svelte-1mah8sg">${escape_html(name)}</button> <div class="icon svelte-1mah8sg">`);
  Icon($$renderer, { path: icon });
  $$renderer.push(`<!----></div></div>`);
}
var $$css$2 = {
  hash: "svelte-oc51hz",
  code: ":root {--file-tree-margin: 1rem;--file-tree-padding: 1rem;--file-tree-roundness: 1rem;--file-tree-background: #1c1b1a;--file-tree-text: #878580;}.tree.svelte-oc51hz {position:relative;color:var(--file-tree-text);background-color:var(--file-tree-background);padding:var(--file-tree-padding);margin-top:var(--file-tree-margin);border-radius:var(--file-tree-roundness);}"
};
function File_tree($$renderer, $$props) {
  $$renderer.global.css.add($$css$2);
  let { children } = $$props;
  $$renderer.push(`<div class="tree svelte-oc51hz">`);
  children($$renderer, { Directory, File: File$1 });
  $$renderer.push(`<!----></div>`);
}
function Get_started($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      let rightSidebar = function($$renderer3) {
      };
      Page($$renderer2, {
        title: "Get Started",
        rightSidebar,
        children: ($$renderer3) => {
          $$renderer3.push(`<h1>What is Frizzante?</h1> <p>Frizzante is an opinionated web server framework written in Go that uses Svelte to render web pages.</p> <h2>Prerequisites</h2> `);
          Code($$renderer3, {
            lang: "bash",
            source: "go install github.com/razshare/frizzante@latest"
          });
          $$renderer3.push(`<!----> `);
          Tip($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<span>Remember to add Go binaries to your path.</span> `);
              Code($$renderer4, {
                lang: "bash",
                source: ["export GOPATH=$HOME/go", "export PATH=$PATH:$GOPATH/bin"].join("\n")
              });
              $$renderer4.push(`<!---->`);
            }
          });
          $$renderer3.push(`<!----> <h1>Get Started</h1> `);
          Keyed_section($$renderer3, {
            key: "1",
            children: ($$renderer4) => {
              $$renderer4.push(`<span>Create project.</span> `);
              Code($$renderer4, { lang: "bash", source: "frizzante create my_project" });
              $$renderer4.push(`<!---->`);
            }
          });
          $$renderer3.push(`<!----> `);
          Keyed_section($$renderer3, {
            key: "2",
            children: ($$renderer4) => {
              $$renderer4.push(`<span>Configure project.</span> `);
              Code($$renderer4, { lang: "bash", source: "frizzante configure" });
              $$renderer4.push(`<!---->`);
            }
          });
          $$renderer3.push(`<!----> `);
          Keyed_section($$renderer3, {
            key: "3",
            children: ($$renderer4) => {
              $$renderer4.push(`<span>Start development.</span> `);
              Code($$renderer4, { lang: "bash", source: "frizzante dev" });
              $$renderer4.push(`<!---->`);
            }
          });
          $$renderer3.push(`<!----> `);
          Keyed_section($$renderer3, {
            key: "4",
            noLink: true,
            children: ($$renderer4) => {
              $$renderer4.push(`<span>Build.</span> `);
              Code($$renderer4, { lang: "bash", source: "frizzante build" });
              $$renderer4.push(`<!----> <span>This will create a</span> `);
              Inline_code($$renderer4, { source: ".gen/bin/app" });
              $$renderer4.push(`<!----> <span>standalone executable.</span> <br/> <br/> `);
              {
                let children = function($$renderer5, { Directory: Directory2, File: File2 }) {
                  Directory2($$renderer5, {
                    name: ".gen",
                    expanded: true,
                    children: ($$renderer6) => {
                      Directory2($$renderer6, {
                        name: "bin",
                        expanded: true,
                        children: ($$renderer7) => {
                          File2($$renderer7, { name: "app", icon: mdiPackage });
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                };
                File_tree($$renderer4, { children });
              }
              $$renderer4.push(`<!---->`);
            }
          });
          $$renderer3.push(`<!---->`);
        }
      });
    }
  });
}
var $$css$1 = {
  hash: "svelte-d4anki",
  code: ':root {--caution-background: #40200d;--caution-text: #fcc192;--caution-title: #fcc192;--caution-icon: #fcc192;--caution-padding: 0.7rem;--caution-roundness: 1rem;--caution-margin: 0.5rem;}.caution.svelte-d4anki {position:relative;display:grid;grid-template-columns:auto 1fr;grid-template-areas:"icon title"\n            "empty empty"\n            "content content";background-color:var(--caution-background);color:var(--caution-text);padding:var(--caution-padding);border-radius:var(--caution-roundness);margin-top:var(--caution-margin);margin-bottom:var(--caution-margin);}.icon.svelte-d4anki {grid-area:icon;color:var(--caution-title);}.title.svelte-d4anki {grid-area:title;color:var(--caution-title);padding-left:var(--caution-padding);}.content.svelte-d4anki {grid-area:content;}'
};
function Caution($$renderer, $$props) {
  $$renderer.global.css.add($$css$1);
  let { children } = $$props;
  $$renderer.push(`<div class="caution svelte-d4anki"><div class="icon svelte-d4anki">`);
  Icon($$renderer, { path: mdiAlertRhombusOutline, size: "1.5rem" });
  $$renderer.push(`<!----></div> <div class="title svelte-d4anki">Caution</div> <div class="content svelte-d4anki">`);
  children($$renderer);
  $$renderer.push(`<!----></div></div>`);
}
var $$css = {
  hash: "svelte-162z5t7",
  code: ':root {--note-background: #12253b;--note-text: #90b1c4;--note-icon: #90b1c4;--note-title: #90b1c4;--note-padding: 0.7rem;--note-roundness: 1rem;--note-margin: 0.5rem;}.note.svelte-162z5t7 {position:relative;display:grid;grid-template-columns:auto 1fr;grid-template-areas:"icon title"\n            "empty empty"\n            "content content";background-color:var(--note-background);color:var(--note-text);padding:var(--note-padding);border-radius:var(--note-roundness);margin-top:var(--note-margin);margin-bottom:var(--note-margin);}.icon.svelte-162z5t7 {grid-area:icon;color:var(--note-icon);}.title.svelte-162z5t7 {grid-area:title;color:var(--note-title);padding-left:var(--note-padding);}.content.svelte-162z5t7 {grid-area:content;}'
};
function Note($$renderer, $$props) {
  $$renderer.global.css.add($$css);
  let { children } = $$props;
  $$renderer.push(`<div class="note svelte-162z5t7"><div class="icon svelte-162z5t7">`);
  Icon($$renderer, { path: mdiInformationOutline, size: "1.5rem" });
  $$renderer.push(`<!----></div> <div class="title svelte-162z5t7">Note</div> <div class="content svelte-162z5t7">`);
  children($$renderer);
  $$renderer.push(`<!----></div></div>`);
}
function Basics($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#basics">Basics</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#routes">Routes</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#path-fields">Path Fields</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#messages">Messages</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#headers">Headers</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#status">Status</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#order-of-operations">Order of Operations</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#queries">Queries</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#forms">Forms</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#json">Json</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#cookies">Cookies</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#session-id">Session Id</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#session">Session</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#navigate">Navigate</a>`);
        }
      });
      $$renderer2.push(`<!---->`);
    };
    Page($$renderer, {
      title: "Overview",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1 id="basics">Basics</h1> <span>Create a new server with `);
        Inline_code($$renderer2, { source: "servers.New()" });
        $$renderer2.push(`<!---->, then followup with servers.Start() in order to
        start a server.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package main

            import "main/lib/core/servers"

            var server = servers.New()      // Creates server.

            func main() {
                defer servers.Start(server) // Starts server.
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="routes">Routes</h1> <span>Each server exposes a slice of Routes which you can freely modify.</span> <br/> <span>You can add a new route by appending to or overwriting `);
        Inline_code($$renderer2, { source: "server.Routes" });
        $$renderer2.push(`<!---->.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package main

            import (
                "main/lib/core/servers"
                "main/lib/routes/welcome"
            )

            var server = servers.New()                         // Creates server.

            func main() {
                defer servers.Start(server)                    // Starts server.
                server.Routes = []routes.Route{                // Overwrites routes.
                    {Pattern: "GET /", Handler: welcome.View}, // Adds route.
                }
            }
        `
        });
        $$renderer2.push(`<!----> <span>Where `);
        Inline_code($$renderer2, { source: "welcome.View" });
        $$renderer2.push(`<!----> is a function pointer.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import "main/lib/core/clients"

            func View(client *clients.Client) {}
        `
        });
        $$renderer2.push(`<!----> <h1 id="path-fields">Path Fields</h1> <span>Route patterns can define dynamic path fields using `);
        Inline_code($$renderer2, { source: "{}" });
        $$renderer2.push(`<!----> syntax.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `routes.Route{Pattern: "GET /{name}", Handler: welcome.View}`
        });
        $$renderer2.push(`<!----> <span>Path fields can then be retrieved with `);
        Inline_code($$renderer2, { source: "receive.Path()" });
        $$renderer2.push(`<!---->.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.Path(client, "name") // Retrieves field "name".
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="messages">Messages</h1> <span>Use `);
        Inline_code($$renderer2, { source: "receive.Message()" });
        $$renderer2.push(`<!----> to retrieve messages sent by the client.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.Message(client) // Retrieves message.
            }
        `
        });
        $$renderer2.push(`<!----> <span>Use `);
        Inline_code($$renderer2, { source: "send.Message()" });
        $$renderer2.push(`<!----> to send a message to the client.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Message(client, "Hello.") // Sends message.
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="headers">Headers</h1> <span>Use `);
        Inline_code($$renderer2, { source: "receive.Header()" });
        $$renderer2.push(`<!----> to retrieve header fields sent by the client.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.Header(client, "Accept") // Retrieves field "Accept".
            }
        `
        });
        $$renderer2.push(`<!----> <span>Use `);
        Inline_code($$renderer2, { source: "send.Header()" });
        $$renderer2.push(`<!----> to send header fields to the client.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                accept := receive.Header(client, "Accept")  // Retrieves field "Accept".
                send.Header(client, "Content-Type", accept) // Sends it back.
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="status">Status</h1> <span>Use `);
        Inline_code($$renderer2, { source: "send.Status()" });
        $$renderer2.push(`<!----> to send the status of the response to the client.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Status(client, 404)           // Sends status 404.
                send.Message(client, "Not found.") // Sends message.
            }
        `
        });
        $$renderer2.push(`<!----> `);
        Caution($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<span>Sending header fields or status after sending out content is not allowed.</span> <br/> <span>Read <a href="#order-of-oprations">below</a>.</span>`);
          }
        });
        $$renderer2.push(`<!----> <h1 id="order-of-operations">Order of Operations</h1> <span>Order of operations matters when sending data to the client.</span> <br/> <span>For example, sending the status code with `);
        Inline_code($$renderer2, { source: "send.Status()" });
        $$renderer2.push(`<!----> after you\u2019ve already sent content with `);
        Inline_code($$renderer2, { source: "send.Message()" });
        $$renderer2.push(`<!----> is not allowed.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Message(client, "Hello.") // Sends message (Succeeds).
                send.Status(client, 404)       // Sends status (Fails).
            }
        `
        });
        $$renderer2.push(`<!----> <span>`);
        Inline_code($$renderer2, { source: "send.Status(client, 404)" });
        $$renderer2.push(`<!----> will fail and the client will receive status 200 instead of 404.</span> `);
        Code($$renderer2, {
          lang: "http",
          source: `
            HTTP/1.1 200 OK
            Date: Sun, 25 May 2025 02:00:37 GMT
            Content-Length: 6
            Content-Type: text/plain; charset=utf-8

            Hello.
        `
        });
        $$renderer2.push(`<!----> <span>The failure is logged to the server\u2019s error logger.</span> <br/> <span>Assuming you\u2019re using the default error logger, you\u2019ll see an error of sorts in your <strong>console</strong></span> `);
        Code($$renderer2, {
          lang: "log",
          source: `
            listening for requests at http://127.0.0.1:8080
            status is locked
        `
        });
        $$renderer2.push(`<!----> <span>`);
        Inline_code($$renderer2, { source: "status is locked" });
        $$renderer2.push(`<!---->, meaning the status code has already been sent to the client and
        there\u2019s nothing you can do about it.</span> <h1 id="queries">Queries</h1> <span>Use `);
        Inline_code($$renderer2, { source: "receive.Query()" });
        $$renderer2.push(`<!----> to retrieve query fields.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                name := receive.Query(client, "name") // Retrieves field "name".
                send.Message(client, "Hello " + name) // Sends message.
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="forms">Forms</h1> <span>Use `);
        Inline_code($$renderer2, { source: "receive.Form()" });
        $$renderer2.push(`<!----> to parse incoming content as multipart form or url encoded form when using `);
        Inline_code($$renderer2, { source: "POST" });
        $$renderer2.push(`<!----> and `);
        Inline_code($$renderer2, { source: "GET" });
        $$renderer2.push(`<!----> http verbs.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            routes.Route{Pattern: "POST /", Handler: welcome.View}
            // or
            routes.Route{Pattern: "GET /", Handler: welcome.View}
        `
        });
        $$renderer2.push(`<!----> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            type Form struct {                             // Defines a struct in which to
                Name string \`form:"name"\`                  // store the form content.
            }

            func View(client *clients.Client) {
                var form Form
                receive.Form(client, &form)                // Retrieves form.
                send.Message(client, "Hello " + form.Name) // Sends message.
            }
        `
        });
        $$renderer2.push(`<!----> `);
        Tip($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<span>You can also use a `);
            Inline_code($$renderer3, { source: "json" });
            $$renderer3.push(`<!----> tag, it will match the field correctly as if it were a `);
            Inline_code($$renderer3, { source: "form" });
            $$renderer3.push(`<!----> tag.</span> <br/> <span>This is so that you can integrate your structs more easily with other libraries that only take into account `);
            Inline_code($$renderer3, { source: "json" });
            $$renderer3.push(`<!----> formats.</span>`);
          }
        });
        $$renderer2.push(`<!----> `);
        Tip($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<span>Form structs can define slices and files.</span> `);
            Code($$renderer3, {
              lang: "go",
              source: `
                type Form struct {
                    Name     string               \`form:"name"\`
                    Comments []string             \`form:"comments"\` // slice of strings
                    File     multipart.FileHeader \`form:"file"\`     // file handler
                }
            `
            });
            $$renderer3.push(`<!----> <span>You can open and read the file.</span> `);
            Code($$renderer3, {
              lang: "go",
              source: `
                src, _ := form.File.Open()
                dst, _ := os.Create("my-file.txt")
                io.Copy(src, dst)
            `
            });
            $$renderer3.push(`<!----> <span>Remember to close your files.</span> `);
            Code($$renderer3, {
              lang: "go",
              source: `
                defer src.Close()
                defer dst.Close()
            `
            });
            $$renderer3.push(`<!---->`);
          }
        });
        $$renderer2.push(`<!----> <h1 id="json">Json</h1> <span>Use `);
        Inline_code($$renderer2, { source: "receive.Json()" });
        $$renderer2.push(`<!----> to parse incoming content as json when using POST and PUT http verbs and `);
        Inline_code($$renderer2, { source: "send.Json()" });
        $$renderer2.push(`<!----> to send json content.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            routes.Route{Pattern: "POST /", Handler: welcome.View}
            // or
            routes.Route{Pattern: "PUT /", Handler: welcome.View}
        `
        });
        $$renderer2.push(`<!----> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            type GreetingDetails struct {      // Defines a struct in which to
                Name string \`json:"name"\`      // store the json content.
            }

            func View(client *clients.Client) {
                var details GreetingDetails    // Creates a zero value.
                receive.Json(client, &details) // Unmarshals the content into details.
                send.Json(client, details)     // Sends content back as json.
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="cookies">Cookies</h1> <span>Use `);
        Inline_code($$renderer2, { source: "receive.Cookie()" });
        $$renderer2.push(`<!----> to retrieve cookies and `);
        Inline_code($$renderer2, { source: "send.Cookie()" });
        $$renderer2.push(`<!----> to send
        them.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                nickname := receive.Cookie(client, "nickname") // Retrieves cookie.
                send.Cookie(client, "nickname", nickname)      // Sends it back.
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="session-id">Session Id</h1> <span>Use `);
        Inline_code($$renderer2, { source: "receive.SessionId()" });
        $$renderer2.push(`<!----> to retrieve the client\u2019s session id.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                _ = receive.SessionId(client) // Retrieves session id.
            }
        `
        });
        $$renderer2.push(`<!----> `);
        Note($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<span>The session id is retrieved from the client\u2019s session-id cookie.</span> <span>If the client doesn\u2019t provide such cookie, `);
            Inline_code($$renderer3, { source: "receive.SessionId()" });
            $$renderer3.push(`<!----> creates a new session id and sends the cookie to the client.</span>`);
          }
        });
        $$renderer2.push(`<!----> `);
        Caution($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<span>Since `);
            Inline_code($$renderer3, { source: "receive.SessionId()" });
            $$renderer3.push(`<!----> might send a cookie to the client, it is important to remember
            that order of operations matters.</span>`);
          }
        });
        $$renderer2.push(`<!----> <h1 id="session">Session</h1> <span>Use `);
        Inline_code($$renderer2, { source: "receive.Session()" });
        $$renderer2.push(`<!----> to retrieve the client\u2019s session.</span> `);
        Note($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->The session is retrieved using `);
            Inline_code($$renderer3, { source: "receive.SessionId()" });
            $$renderer3.push(`<!---->.`);
          }
        });
        $$renderer2.push(`<!----> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
            )

            func View(client *clients.Client) {
                var session *sessions.Session         // Creates a zero value.
                _ = receive.Session(client, &session) // Unmarshals the content into session.
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="redirect">Redirect</h1> <span>Use `);
        Inline_code($$renderer2, { source: "send.Redirect()" });
        $$renderer2.push(`<!----> to redirect to a different location.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Redirect(client, "/login", 307) // Redirects to /login.
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="navigate">Navigate</h1> <span>Use `);
        Inline_code($$renderer2, { source: "send.Navigate()" });
        $$renderer2.push(`<!----> to redirect to a different location with status 302.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
            )

            func View(client *clients.Client) {
                send.Navigate(client, "/login") // Redirects to /login with status 302.
            }
        `
        });
        $$renderer2.push(`<!---->`);
      }
    });
  }
}
function Web_sockets($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
    };
    Page($$renderer, {
      title: "Web Sockets",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1 id="web-sockets">Web Sockets</h1> <span>Use `);
        Inline_code($$renderer2, { source: "send.WsUpgrade()" });
        $$renderer2.push(`<!----> to upgrade the connection to web sockets.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `routes.Route{Pattern: "GET /ws", Handler: welcome.View}`
        });
        $$renderer2.push(`<!----> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
                "time"
            )

            func View(client *clients.Client) {
                alive := receive.IsAlive(client)          // Tracks request status.
                send.WsUpgrade(client)                    // Sends ws upgrade.
                for *alive {                              // Loops until cancellation.
                    name := receive.Message(client)       // Receives message.
                    send.Message(client, "Hello " + name) // Sends message.
                    time.Sleep(time.Second)               // Sleeps for 1 second.
                }
            }
        `
        });
        $$renderer2.push(`<!----> <span>Then consume the web socket on the client.</span> `);
        Code($$renderer2, {
          lang: "svelte",
          source: `
        ${"<"}script lang="ts">
            const messages: string[] = $state([]) // Creates reactive list of messages.
            const socket = new WebSocket("/ws")   // Connects to handler.
            socket.addEventListener("message", function listen(event:MessageEvent) {
                messages.push(event.data)         // Appends incoming messages to the 
                                                  // reactive list of messages for later use.
            })
            socket.send("Hello")                  // Sends message.
        <\/script>

        <h1>Messages</h1>
        {#each messages as message, id (id)}      <!-- Iterates the list of messages. -->
            <div>{message}</div>                  <!-- Renders message. -->
        {/each}

    `
        });
        $$renderer2.push(`<!---->`);
      }
    });
  }
}
function Server_sent_events($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
    };
    Page($$renderer, {
      title: "Server Sent Events",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1>Server Sent Events</h1> <span>Use `);
        Inline_code($$renderer2, { source: "send.SseUpgrade()" });
        $$renderer2.push(`<!----> to upgrade the connection to server sent events.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `routes.Route{Pattern: "GET /sse", Handler: welcome.View}`
        });
        $$renderer2.push(`<!----> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/receive"
                "main/lib/core/send"
                "time"
            )

            func View(client *clients.Client) {
                alive := receive.IsAlive(client)    // Tracks request status.
                event := send.SseUpgrade(client)    // Sends sse upgrade.
                for *alive {                        // Loops until cancellation.
                    event("channel-1")              // Switches to "channel-1".
                    send.Message(client, "Hello 1") // Sends message.
                    event("channel-2")              // Switches to "channel-2".
                    send.Message(client, "Hello 2") // Sends message.
                    time.Sleep(time.Second)         // Sleeps for 1 second.
                }
            }
        `
        });
        $$renderer2.push(`<!----> <span>Then consume the stream on the client.</span> `);
        Code($$renderer2, {
          lang: "svelte",
          source: `
        ${"<"}script lang="ts">
            const messages: string[] = $state([]) // Creates reactive list of messages.
            const socket = new WebSocket("/ws")   // Connects to handler.
            socket.addEventListener("message", function listen(event:MessageEvent) {
                messages.push(event.data)         // Appends incoming messages to the 
                                                  // reactive list of messages for later use.
            })
            socket.send("Hello")                  // Sends message.
        <\/script>

        <h1>Messages</h1>
        {#each messages as message, id (id)}      <!-- Iterates the list of messages. -->
            <div>{message}</div>                  <!-- Renders message. -->
        {/each}
    `
        });
        $$renderer2.push(`<!---->`);
      }
    });
  }
}
var diagram1 = "/assets/guards_diagram_1-8XvtXsMA.svg";
var diagram2 = "/assets/guards_diagram_2-CBpLkatL.svg";
function Guards($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#guards">Guards</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#composition">Composition</a>`);
        }
      });
      $$renderer2.push(`<!---->`);
    };
    Page($$renderer, {
      title: "Guards",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1 id="guards">Guards</h1> <span>A guard is an object that is composed of an optional name and a required handler.</span> <br/> <span>You can add guards to your routes in order to protect them.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            server.Routes = []routes.Route{
                {
                    Pattern: "GET /api/xml/data",
                    Handler: data.Get,
                    Guards: []guards.Guards{
                        {Name: "jsonless", Handler: func(client *clients.Client, allow func()) {
                            if receive.ContentType(client) == "application/json" {
                                return
                            }
                            allow()
                        }},
                    },
                },
            }
        `
        });
        $$renderer2.push(`<!----> <span>Guards will block all incoming requests by default, you must call `);
        Inline_code($$renderer2, { source: "allow()" });
        $$renderer2.push(`<!----> to explicitly allow the request through.</span> <br/> <span>In this example, `);
        Inline_code($$renderer2, { source: "GET /api/xml/data" });
        $$renderer2.push(`<!----> the route will decline requests with content type `);
        Inline_code($$renderer2, { source: "application/json" });
        $$renderer2.push(`<!----></span> <img${attr("src", diagram1)} alt="" loading="lazy" decoding="async" fetchpriority="auto" width="100%"/> <h1 id="composition">Composition</h1> <span>You can compose multiple guards in order to create more advanced restrictions.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            var authenticate = guards.Guard{Name: "authenticate", Handler: func(client *clients.Client, allow func()) {
                session := sessions.Start(receive.SessionId(client))
                if session.Verified && time.Since(session.LastActivity) <= 30*time.Minute {
                    allow()
                    return
                }
                send.Status(client, 401)
                send.Message(client, "not authenticated")
            }}
        `
        });
        $$renderer2.push(`<!----> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            var authorize = guards.Guard{Name: "authorize", Handler: func(client *clients.Client, allow func()) {
                session := sessions.Start(receive.SessionId(client))
                if session.UserId == receive.path("user_id") {
                    allow()
                    return
                }
                send.Status(client, 403)
                send.Message(client, "missing permissions")
            }}
        `
        });
        $$renderer2.push(`<!----> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            server.Routes = []routes.Route{
                {Pattern: "GET /public", Handler: public.Get},
                {Pattern: "GET /dashboard", Handler: dashboard.Get, Guards: []guards.Guard{authenticate}},
                {Pattern: "GET /user/{user_id}/settings", Handler: settings.Get, Guards: []guards.Guard{authenticate, authorize}},
                {Pattern: "DELETE /user/{user_id}", Handler: user.Delete, Guards: []guards.Guard{authenticate, authorize}},
            }
        `
        });
        $$renderer2.push(`<!----> <img${attr("src", diagram2)} alt="" loading="lazy" decoding="async" fetchpriority="auto" width="100%"/>`);
      }
    });
  }
}
function Views($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#views">Views</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#server-exports">Server Exports</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#client-exports">Client Exports</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#send-views">Send Views</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#default-view">Default View</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#view-properties">View Properties</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      {
        let menu = function($$renderer3) {
          Menu_item($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<a href="#render-mode-full">RenderModeFull</a>`);
            }
          });
          $$renderer3.push(`<!----> `);
          Menu_item($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<a href="#render-mode-server">RenderModeServer</a>`);
            }
          });
          $$renderer3.push(`<!----> `);
          Menu_item($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<a href="#render-mode-client">RenderModeClient</a>`);
            }
          });
          $$renderer3.push(`<!---->`);
        };
        Menu_item($$renderer2, {
          menu,
          children: ($$renderer3) => {
            $$renderer3.push(`<a href="#render-modes">Render Modes</a>`);
          }
        });
      }
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#disabling-the-server-side-javascript-runtime"><span>Disabling the server-side JavaScript runtime</span></a>`);
        }
      });
      $$renderer2.push(`<!---->`);
    };
    Page($$renderer, {
      title: "Views",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1 id="views">Views</h1> <span>Views are svelte components exported by `);
        Inline_code($$renderer2, { source: "app/exports.server.ts" });
        $$renderer2.push(`<!----> and/or `);
        Inline_code($$renderer2, { source: "app/exports.client.ts" });
        $$renderer2.push(`<!---->.</span> `);
        {
          let children = function($$renderer3, { Directory: Directory2, File: File2 }) {
            Directory2($$renderer3, {
              name: "app",
              expanded: true,
              children: ($$renderer4) => {
                File2($$renderer4, { name: "exports.client.ts" });
                $$renderer4.push(`<!----> `);
                File2($$renderer4, { name: "exports.server.ts" });
                $$renderer4.push(`<!---->`);
              },
              $$slots: { default: true }
            });
          };
          File_tree($$renderer2, { children });
        }
        $$renderer2.push(`<!----> <h1 id="server-exports">Server Exports</h1> <span>Views that are meant to be rendered on the server should be exported by `);
        Inline_code($$renderer2, { source: "app/exports.server.ts" });
        $$renderer2.push(`<!---->.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            import Welcome from '$lib/views/welcome.svelte'
            import Profile from '$lib/views/profile.svelte'
            export const views = {
                "Welcome": Welcome,
                "Profile": Profile,
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="client-exports">Client Exports</h1> <span>Views that are meant to be rendered on the client should be exported by `);
        Inline_code($$renderer2, { source: "app/exports.client.ts" });
        $$renderer2.push(`<!---->.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            export const views = {
                "Welcome": () => import('$lib/views/welcome.svelte'),
                "Profile": () => import('$lib/views/profile.svelte'),
            }
        `
        });
        $$renderer2.push(`<!----> `);
        Note($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<span>These views are being imported asynchronously in order to split them in different bundles, however you can
            simply create fake promises in order to bundle them all together and eliminate network latency when
            transitioning between views.</span> `);
            Code($$renderer3, {
              lang: "go",
              source: `
                import Welcome from '$lib/views/welcome.svelte'
                import Profile from '$lib/views/profile.svelte'
                export const views = {
                    "Welcome": () => Promise.resolve(Welcome),
                    "Profile": () => Promise.resolve(Profile),
                }
            `
            });
            $$renderer3.push(`<!---->`);
          }
        });
        $$renderer2.push(`<!----> `);
        Note($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<span>Keys in `);
            Inline_code($$renderer3, { source: "app/exports.server.ts" });
            $$renderer3.push(`<!----> and `);
            Inline_code($$renderer3, { source: "app/exports.client.ts" });
            $$renderer3.push(`<!----> are not mutually exclusive.</span> <br/> <span>You can render the same component on both the server and the client at the same time.</span>`);
          }
        });
        $$renderer2.push(`<!----> <h1 id="send-views">Send Views</h1> <span>Use `);
        Inline_code($$renderer2, { source: "send.View()" });
        $$renderer2.push(`<!----> to send a view.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client) {
                send.View(client, views.View{Name: "Welcome"}) // Sends view "Welcome".
            }
        `
        });
        $$renderer2.push(`<!----> <span>The Name of the view will be used to lookup the view component exported by `);
        Inline_code($$renderer2, { source: "app/exports.server.ts" });
        $$renderer2.push(`<!----> and/or `);
        Inline_code($$renderer2, { source: "app/exports.client.ts" });
        $$renderer2.push(`<!---->.</span> <h1 id="default-view">Default View</h1> <span>There is no way to specify a "<strong>default view</strong>\u201D.</span> <span>However, you can use `);
        Inline_code($$renderer2, { source: "send.RequestedFile()" });
        $$renderer2.push(`<!----> in order to send the requested file or run custom logic if it doesn\u2019t exist.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome
            
            import (
                "os"

                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
                "main/lib/routes/welcome"
            )

            func View(client *clients.Client) {
                if !send.RequestedFile() { // Tries to send the requested file, or else...
                    welcome.View(client)   // ...sends the welcome view.
                }
            }
        `
        });
        $$renderer2.push(`<!----> <span>Usually you would map this handler to the default `);
        Inline_code($$renderer2, { source: "GET /" });
        $$renderer2.push(`<!----> pattern, which automatically captures all unmatched requests.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package main

            import (
                "embed"
                "main/lib/core/clients"
                "main/lib/core/servers"
                "main/lib/routes/welcome"
            )

            //go:embed app/dist
            var efs embed.FS
            var server = servers.New()                              // Creates server.

            func main() {
                defer servers.Start(server)                         // Starts server.
                server.Efs = efs                                    // Sets embedded file system.
                server.Routes = append(server.Routes, routes.Route{ // Adds route to the server.
                    Pattern: "GET /",
                    Handler: welcome.View,
                })
            }
        `
        });
        $$renderer2.push(`<!----> <h1 id="view-properties">View Properties</h1> <span>Optionally, you can specify properties for your View with the Props field.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome
            
            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client) {
                send.View(client, views.View{ // Sends view.
                    Name: "Welcome",          // Sets view name.
                    Props: map[string]string{ // Sets view props, which will be injected into the svelte component.
                        "name": "world",      // Adds property "name" with value "world".
                    },
                })
            }
        `
        });
        $$renderer2.push(`<!----> <span>These properties are passed down to your view component.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            ${"<"}script lang="ts">
                type Props = { name: string }
                let {name}:Props = $props() // Retrieves view props.
            <\/script>

            <h1>Hello {name}</h1>
        `
        });
        $$renderer2.push(`<!----> `);
        Note($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<span>View properties are initialized with <a href="https://svelte.dev/docs/svelte/$state">$state()</a> and thus are reactive by default.</span> `);
            Code($$renderer3, {
              lang: "go",
              source: `
                ${"<"}script lang="ts">
                    type Props = { name: string }
                    let { name }: Props = $props() // Retrieves view props.
                <\/script>
                
                <h1>Hello {name}</h1>
            `
            });
            $$renderer3.push(`<!---->`);
          }
        });
        $$renderer2.push(`<!----> <h1 id="render-modes">Render Modes</h1> <span>You can choose how to render views by setting one of 3 values for the `);
        Inline_code($$renderer2, { source: "RenderMode" });
        $$renderer2.push(`<!----> field in your `);
        Inline_code($$renderer2, { source: "View" });
        $$renderer2.push(`<!---->.</span> <br/> `);
        Keyed_section($$renderer2, {
          key: "1",
          children: ($$renderer3) => {
            $$renderer3.push(`<strong id="render-mode-full">RenderModeFull</strong> <br/> <span>Using `);
            Inline_code($$renderer3, { source: "RenderModeFull" });
            $$renderer3.push(`<!---->, the view is rendered on both the server and the client.</span> <br/> <span>This is the <strong>default</strong> mode.</span> `);
            Code($$renderer3, {
              lang: "go",
              source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client) {
                send.View(client, views.View{        // Sends view.
                    Name: "Welcome",                 // Sets view name.
                    RenderMode: view.RenderModeFull, // Renders view on server and client.
                })
            }
        `
            });
            $$renderer3.push(`<!---->`);
          }
        });
        $$renderer2.push(`<!----> `);
        Keyed_section($$renderer2, {
          key: "2",
          children: ($$renderer3) => {
            $$renderer3.push(`<strong id="render-mode-server">RenderModeServer</strong> <br/> <span>Using `);
            Inline_code($$renderer3, { source: "RenderModeServer" });
            $$renderer3.push(`<!---->, the view is rendered only on the server.</span> <br/> <span>You\u2019ll have to deal away with apis such as <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">fetch</a>; your new best friend is <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form">form</a>.</span> `);
            Code($$renderer3, {
              lang: "go",
              source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client) {
                send.View(client, views.View{          // Sends view.
                    Name: "Welcome",                   // Sets view name.
                    RenderMode: view.RenderModeServer, // Renders view only on server.
                })
            }
        `
            });
            $$renderer3.push(`<!----> `);
            Tip($$renderer3, {
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->While using `);
                Inline_code($$renderer4, { source: "RenderModeServer" });
                $$renderer4.push(`<!----> the view won\u2019t serve a JavaScript bundle, but you can still
            use the `);
                Inline_code($$renderer4, { source: "<svelte:head>" });
                $$renderer4.push(`<!----> special tag in order to load scripts dynamically.`);
              }
            });
            $$renderer3.push(`<!---->`);
          }
        });
        $$renderer2.push(`<!----> `);
        Keyed_section($$renderer2, {
          key: "3",
          noLink: true,
          children: ($$renderer3) => {
            $$renderer3.push(`<strong id="render-mode-client">RenderModeClient</strong> <br/> <span>Using `);
            Inline_code($$renderer3, { source: "RenderModeClient" });
            $$renderer3.push(`<!---->, the view is rendered only on the client by loading a
            JavaScript bundle asynchronously.</span> `);
            Code($$renderer3, {
              lang: "go",
              source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client) {
                send.View(client, views.View{          // Sends view.
                    Name: "Welcome",                   // Sets view name.
                    RenderMode: view.RenderModeClient, // Renders view only on client.
                })
            }
        `
            });
            $$renderer3.push(`<!----> `);
            Tip($$renderer3, {
              children: ($$renderer4) => {
                $$renderer4.push(`<span>You can combine any of these render modes with adaptive hyperlinks and forms.</span> <br/> <span>Read more about `);
                Link($$renderer4, {
                  href: "/web_standards",
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->web standards`);
                  }
                });
                $$renderer4.push(`<!---->.</span>`);
              }
            });
            $$renderer3.push(`<!----> `);
            Tip($$renderer3, {
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->When using `);
                Inline_code($$renderer4, { source: "RenderModeFull" });
                $$renderer4.push(`<!----> or `);
                Inline_code($$renderer4, { source: "RenderModeServer" });
                $$renderer4.push(`<!---->, You can
            configure how many JavaScript runtimes are executed in parallel by setting the `);
                Inline_code($$renderer4, { source: "FRIZZANTE_JS_RUNTIME_LIMIT" });
                $$renderer4.push(`<!----> environment variable. `);
                Code($$renderer4, { lang: "shell", source: "FRIZZANTE_JS_RUNTIME_LIMIT=3 ./app" });
                $$renderer4.push(`<!----> `);
                Caution($$renderer4, {
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->Settings this limit too high could lead to large memory usage by your JavaScript runtimes. For most use
                cases a limit of 1 runtime (the default) is more than enough, after all, the Svelte compiler is simply
                concatenating strings together when rendering pages on the server. Modify this field based on actual
                performance measurements.`);
                  }
                });
                $$renderer4.push(`<!---->`);
              }
            });
            $$renderer3.push(`<!---->`);
          }
        });
        $$renderer2.push(`<!----> <h1 id="disabling-the-server-side-javascript-runtime"><span>Disabling the server-side JavaScript runtime</span></h1> <span>You can add the `);
        Inline_code($$renderer2, { source: "no_js_runtime" });
        $$renderer2.push(`<!----> tag to your build process to completely disable the server-side
        JavaScript runtime.</span> `);
        Code($$renderer2, {
          lang: "shell",
          source: "frizzante --build --tags=no_js_runtime"
        });
        $$renderer2.push(`<!----> <span>This will reduce the minimum size of the final binary from 25MB to 10MB.</span>`);
      }
    });
  }
}
function Web_standards($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#web-standards">Web Standards</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#adaptive-hyperlinks">Adaptive Hyperlinks</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#adaptive-forms">Adaptive Forms</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#link-component">Link Component</a>`);
        }
      });
      $$renderer2.push(`<!----> `);
      Menu_item($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<a href="#form-component">Form Component</a>`);
        }
      });
      $$renderer2.push(`<!---->`);
    };
    Page($$renderer, {
      title: "Web Standards",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1 id="web-standards">Web Standards</h1> <span>You can use `);
        Inline_code($$renderer2, { source: "href()" });
        $$renderer2.push(`<!----> and `);
        Inline_code($$renderer2, { source: "action()" });
        $$renderer2.push(`<!----> in order to make your hyperlinks and forms adapt to the client\u2019s browser capabilities and/or the server\u2019s rendering
        configuration.</span> <h1 id="adaptive-hyperlinks">Adaptive Hyperlinks</h1> `);
        Code($$renderer2, {
          lang: "svelte",
          source: `
            ${"<"}script lang="ts">
                import { href } from "$lib/scripts/core/href.ts"
            <\/script>

            <a {...href("/some-other-page")}> Go to some other page </a> <!-- Defines a link, which when triggered will either
                                                                            directly navigate to the given path, or do so
                                                                            through an http request, depending on wether
                                                                            JavaScript is enabled or not. -->
        `
        });
        $$renderer2.push(`<!----> <span>When JavaScript is disabled, `);
        Inline_code($$renderer2, { source: "<a>" });
        $$renderer2.push(`<!----> will render as a traditional anchor, which by default will navigate the client away to /some-other-page</span> <br/> <span>On the other hand, when JavaScript is enabled, `);
        Inline_code($$renderer2, { source: "<a>" });
        $$renderer2.push(`<!----> will render to an anchor that overrides the default behavior of the browser. Instead of navigating away immediately, <a href="/some-other-page">fetch</a> is used to retrieve the contents of `);
        Inline_code($$renderer2, { source: "/some-other-page" });
        $$renderer2.push(`<!----> and update the current state and view based on the server\u2019s response.</span> <br/> <span>For example, given the following handler using `);
        Inline_code($$renderer2, { source: "view.RenderModeServer" });
        $$renderer2.push(`<!----></span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome
            
            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client)  {
                send.View(client, views.View{          // Sends view.
                    Name: "Welcome",                   // Sets name of the view.
                    RenderMode: view.RenderModeServer, // Renders view only on the server.
                })
            }
        `
        });
        $$renderer2.push(`<!----> <span>The view will ultimately render the following in the client\u2019s browser.</span> `);
        Code($$renderer2, {
          lang: "html",
          source: `
            <a href="/some-other-page"> Go to some other page </a>
        `
        });
        $$renderer2.push(`<!----> <span>But using `);
        Inline_code($$renderer2, { source: "view.RenderModeFull" });
        $$renderer2.push(`<!----> will instead render</span> `);
        Code($$renderer2, {
          lang: "html",
          source: `
            <a href="/some-other-page" onclick="onclick(event)"> Go to some other page </a>
        `
        });
        $$renderer2.push(`<!----> <h1 id="adaptive-forms">Adaptive Forms</h1> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            ${"<"}script lang="ts">
                import { action } from "$lib/scripts/core/action.ts"
            <\/script>

            <form {...action("/process")}>            <!-- Defines a form. -->
                <input type="text" name="name" />     <!-- Defines a text field. -->
                <button type="submit">Submit</button> <!-- Defines a button, which when triggered will either
                                                        directly submit the form, or do so through an http request,
                                                        depending on wether JavaScript is enabled or not. -->
            </form>
        `
        });
        $$renderer2.push(`<!----> <span>When JavaScript is disabled, `);
        Inline_code($$renderer2, { source: "<form>" });
        $$renderer2.push(`<!----> will render as a traditional form, which by default will submit to `);
        Inline_code($$renderer2, { source: "/process" });
        $$renderer2.push(`<!----> and navigate the client away.</span> <br/> <span>On the other hand, when JavaScript is enabled, `);
        Inline_code($$renderer2, { source: "<form>" });
        $$renderer2.push(`<!----> will render to a form that overrides
        the default behavior of the browser. Instead of navigating away immediately, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">fetch</a> is used to submit the form to `);
        Inline_code($$renderer2, { source: "/process" });
        $$renderer2.push(`<!----> and update the current state and view based on the server\u2019s response.</span> <br/> <span>For example, given the following handler using `);
        Inline_code($$renderer2, { source: "view.RenderModeServer" });
        $$renderer2.push(`<!---->.</span> `);
        Code($$renderer2, {
          lang: "go",
          source: `
            package welcome

            import (
                "main/lib/core/clients"
                "main/lib/core/send"
                "main/lib/core/views"
            )

            func View(client *clients.Client)  {
                send.View(client, views.View{          // Sends view.
                    Name: "Welcome",                   // Sets name of the view.
                    RenderMode: view.RenderModeServer, // Renders view only on the server.
                })
            }
        `
        });
        $$renderer2.push(`<!----> <span>The view will ultimately render the following in the client\u2019s browser.</span> `);
        Code($$renderer2, {
          lang: "html",
          source: `
            <form action="/process">
                <input type="text" name="name" />
                <button type="submit">Submit</button>
            </form>
        `
        });
        $$renderer2.push(`<!----> <span>But using `);
        Inline_code($$renderer2, { source: "view.RenderModeFull" });
        $$renderer2.push(`<!----> will instead render.</span> `);
        Code($$renderer2, {
          lang: "html",
          source: `
            <form action="/process" onsubmit="onsubmit">
                <input type="text" name="name" />
                <button type="submit">Submit</button>
            </form>
        `
        });
        $$renderer2.push(`<!----> <span>Where `);
        Inline_code($$renderer2, { source: "onsubmit" });
        $$renderer2.push(`<!----> takes care of submitting the form and fetching the new state and view from `);
        Inline_code($$renderer2, { source: "/process" });
        $$renderer2.push(`<!---->.</span> <h1 id="link-component">Link Component</h1> <span>Frizzante provides a `);
        Inline_code($$renderer2, { source: "<Link>" });
        $$renderer2.push(`<!----> component that captures pending and error states while navigating hyperlinks.</span> <br/> <span>It is a replacement for your `);
        Inline_code($$renderer2, { source: "<a>" });
        $$renderer2.push(`<!----> elements.</span> <br/> <span>In your project root directory, run the following</span> `);
        Code($$renderer2, { lang: "shell", source: "frizzante -glinks" });
        $$renderer2.push(`<!----> <span>This will add the `);
        Inline_code($$renderer2, { source: "<Link>" });
        $$renderer2.push(`<!----> component to your project.</span> <br/> <span>This component passes down `);
        Inline_code($$renderer2, { source: "pending" });
        $$renderer2.push(`<!----> and `);
        Inline_code($$renderer2, { source: "error" });
        $$renderer2.push(`<!----> states through the `);
        Inline_code($$renderer2, { source: "children" });
        $$renderer2.push(`<!----> snippet.</span> `);
        Code($$renderer2, {
          lang: "svelte",
          source: `
            ${"<"}script lang="ts">
                import Link from "$lib/components/links/link.svelte"
            <\/script>

            <Link href="/some-path">                               <!-- Defines a link. -->
                {#snippet children({pending, error})}              <!-- Captures the link's pending and error states. -->
                    {#if pending}                                  <!-- If the underlying http request is pending... -->
                        <span>Loading...</span>                    <!-- ...renders a loading hint. -->
                    {:else if error}                               <!-- If there's been some sort of error... -->
                        <span>Something went wrong: {error}</span> <!-- ...renders the error. -->
                    {:else}                                        <!-- If the link is idle... -->
                        <span>Click me</span>                      <!-- ...renders the link's idle content. -->
                    {/if}
                {/snippet}
            </Link>
        `
        });
        $$renderer2.push(`<!----> <h1 id="form-component">Form Component</h1> <span>Frizzante provides a `);
        Inline_code($$renderer2, { source: "<Form>" });
        $$renderer2.push(`<!----> component that captures pending and error states while submitting forms.</span> <br/> <span>It is a replacement for your `);
        Inline_code($$renderer2, { source: "<form>" });
        $$renderer2.push(`<!----> elements.</span> <br/> <span>In your project root directory, run the following</span> `);
        Code($$renderer2, {
          lang: "shell",
          source: `
            frizzante -gforms
        `
        });
        $$renderer2.push(`<!----> <span>This will add the `);
        Inline_code($$renderer2, { source: "<Form>" });
        $$renderer2.push(`<!----> component to your project.</span> <br/> <span>This component passes down pending and error states through the children snippet.</span> `);
        Code($$renderer2, {
          lang: "svelte",
          source: `
            ${"<"}script lang="ts">
                import Form from "$lib/components/forms/form.svelte"
            <\/script>

            <Form method="POST" action="/login">                            <!-- Defines a form. -->
                {#snippet children({pending, error})}                       <!-- Captures the forms's pending and error states. -->
                    <input type="email" name="email">                       <!-- Defines an email field. -->
                    <input type="password" name="password">                 <!-- Defines an password field. -->
                    <button disabled={pending} type="submit">Login</button> <!-- Defines a button, which is disabled when the form request is pending. -->

                    {#if error}                                             <!-- If there's been some sort of error... -->
                        <span>Something went wrong: {error}</span>          <!-- ...renders the error. -->
                    {/if}
                {/snippet}
            </Form>
        `
        });
        $$renderer2.push(`<!---->`);
      }
    });
  }
}
function Type_definitions($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
    };
    Page($$renderer, {
      title: "Type Definitions",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1>Type Definitions</h1> <span>It is possible, but not required, to generate TypeScript type definitions from Go structs with `);
        Inline_code($$renderer2, { source: "types.Generate[T]()" });
        $$renderer2.push(`<!---->, where T is the type you wish to generate.</span> <br/> <br/> `);
        Keyed_section($$renderer2, {
          key: "1",
          children: ($$renderer3) => {
            $$renderer3.push(`<span>Define your Go types.</span> `);
            Code($$renderer3, {
              lang: "go",
              source: `
                package welcome

                type Props struct {
                    Message string \`json:"message"\`
                    Error   string \`json:"error"\`
                }
            `
            });
            $$renderer3.push(`<!----> `);
            Note($$renderer3, {
              children: ($$renderer4) => {
                $$renderer4.push(`<span>All `);
                Inline_code($$renderer4, { source: "json" });
                $$renderer4.push(`<!----> tags are optional.</span>`);
              }
            });
            $$renderer3.push(`<!---->`);
          }
        });
        $$renderer2.push(`<!----> `);
        Keyed_section($$renderer2, {
          key: "2",
          children: ($$renderer3) => {
            $$renderer3.push(`<span>Call `);
            Inline_code($$renderer3, { source: "types.Generate[T]()" });
            $$renderer3.push(`<!---->.</span> `);
            Code($$renderer3, {
              lang: "go",
              source: `
                package welcome

                func init() {
                    _ = types.Generate[Props]()
                }

                type Props struct {
                    Message string \`json:"message"\`
                    Error   string \`json:"error"\`
                }
            `
            });
            $$renderer3.push(`<!---->`);
          }
        });
        $$renderer2.push(`<!----> `);
        Keyed_section($$renderer2, {
          key: "3",
          noLink: true,
          children: ($$renderer3) => {
            $$renderer3.push(`<span>Generate types</span> `);
            Code($$renderer3, {
              lang: "shell",
              source: `
                frizzante -gtypes
            `
            });
            $$renderer3.push(`<!----> <span>This will generate your type definitions in `);
            Inline_code($$renderer3, { source: ".gen/types" });
            $$renderer3.push(`<!---->.</span> `);
            Code($$renderer3, {
              lang: "ts",
              source: `
                export type Props = welcome.Props
                export declare namespace welcome {
                    export type Props = {
                        message: string
                        error: string
                    }
                }
            `
            });
            $$renderer3.push(`<!----> `);
            Tip($$renderer3, {
              children: ($$renderer4) => {
                $$renderer4.push(`<span>You can use the default `);
                Inline_code($$renderer4, { source: "$gen" });
                $$renderer4.push(`<!----> alias to access the `);
                Inline_code($$renderer4, { source: ".gen" });
                $$renderer4.push(`<!----> directory.</span> `);
                Code($$renderer4, {
                  lang: "ts",
                  source: `
                    ${"<"}script lang="ts">
                        import type { Props } from "$gen/types/main/lib/routes/welcome/Props"
                        let { message, error }:Props = $props()
                    <\/script>
                `
                });
                $$renderer4.push(`<!---->`);
              }
            });
            $$renderer3.push(`<!---->`);
          }
        });
        $$renderer2.push(`<!---->`);
      }
    });
  }
}
function Todos_example($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
    };
    Page($$renderer, {
      title: "Todos Example",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1>Todos Example</h1> <span>wip</span>`);
      }
    });
  }
}
function Cli($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
    };
    Page($$renderer, {
      title: "Cli",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1>Cli</h1> <span>wip</span>`);
      }
    });
  }
}
function Docker($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
    };
    Page($$renderer, {
      title: "Docker",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1>Docker</h1> <span>wip</span>`);
      }
    });
  }
}
function Issues($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
    };
    Page($$renderer, {
      title: "Issues",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1>Issues</h1> <span>wip</span>`);
      }
    });
  }
}
function Contributing($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
    };
    Page($$renderer, {
      title: "Contributing",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1>Contributing</h1> <span>wip</span>`);
      }
    });
  }
}
function Faq($$renderer) {
  {
    let rightSidebar = function($$renderer2) {
    };
    Page($$renderer, {
      title: "Faq",
      rightSidebar,
      children: ($$renderer2) => {
        $$renderer2.push(`<h1>Faq</h1> <span>wip</span>`);
      }
    });
  }
}
var views = {
  GetStarted: Get_started,
  Basics,
  WebSockets: Web_sockets,
  ServerSentEvents: Server_sent_events,
  Guards,
  Views,
  WebStandards: Web_standards,
  TypeDefinitions: Type_definitions,
  TodosExample: Todos_example,
  Cli,
  Docker,
  Issues,
  Contributing,
  Faq
};
function Server_router($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { name, props, render: render2, align, type } = $$props;
    const components = views;
    const viewStateValue = { name, props, render: render2, align, type, async pin() {
    } };
    const view = viewStateValue;
    setContext("view", view);
    $$renderer2.push(`<!--[-->`);
    const each_array = ensure_array_like(Object.keys(components));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let key = each_array[$$index];
      if (key === view.name) {
        $$renderer2.push("<!--[-->");
        const Component = components[key];
        if (Component) {
          $$renderer2.push("<!--[-->");
          Component($$renderer2, spread_props([view.props]));
          $$renderer2.push("<!--]-->");
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push("<!--]-->");
        }
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
async function render(args) {
  return render$1(Server_router, { props: args });
}
