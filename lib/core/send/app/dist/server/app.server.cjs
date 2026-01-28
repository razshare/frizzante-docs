"use strict";
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

// dist/server/app.server.js
var app_server_exports = {};
__export(app_server_exports, {
  render: () => render
});
module.exports = __toCommonJS(app_server_exports);

// node_modules/clsx/dist/clsx.mjs
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

// node_modules/@mdi/js/mdi.js
var mdiArrowLeft = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";
var mdiArrowRight = "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";
var mdiCheckCircleOutline = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z";
var mdiCircleOutline = "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
var mdiPlus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";

// dist/server/app.server.js
var HYDRATION_START = "[";
var HYDRATION_END = "]";
var ELEMENT_IS_NAMESPACED = 1;
var ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
var ELEMENT_IS_INPUT = 1 << 2;
var ATTR_REGEX = /[&"<]/g;
var CONTENT_REGEX = /[&<]/g;
function escape_html(value, is_attr) {
  const str = String(value ?? "");
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
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
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
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
    for (var key in directives) {
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
  for (var key in styles) {
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
function experimental_async_ssr() {
  {
    console.warn(`https://svelte.dev/e/experimental_async_ssr`);
  }
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
   * @param {(renderer: Renderer) => void} fn
   */
  async(fn) {
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
      if (child.global.mode === "sync") {
        await_invalid();
      }
      result.catch(() => {
      });
      child.promise = result;
    }
    return child;
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
   * @returns {void}
   */
  select(attrs, fn, css_hash, classes, styles, flags) {
    const { value, ...select_attrs } = attrs;
    this.push(`<select${attributes(select_attrs, css_hash, classes, styles, flags)}>`);
    this.child((renderer) => {
      renderer.local.select_value = value;
      fn(renderer);
    });
    this.push("</select>");
  }
  /**
   * @param {Record<string, any>} attrs
   * @param {string | number | boolean | ((renderer: Renderer) => void)} body
   * @param {string | undefined} [css_hash]
   * @param {Record<string, boolean> | undefined} [classes]
   * @param {Record<string, string> | undefined} [styles]
   * @param {number | undefined} [flags]
   */
  option(attrs, body, css_hash, classes, styles, flags) {
    this.#out.push(`<option${attributes(attrs, css_hash, classes, styles, flags)}`);
    const close = (renderer, value, { head: head2, body: body2 }) => {
      if ("value" in attrs) {
        value = attrs.value;
      }
      if (value === this.local.select_value) {
        renderer.#out.push(" selected");
      }
      renderer.#out.push(`>${body2}</option>`);
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
      close(this, body, { body });
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
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string }} [options]
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
              experimental_async_ssr();
              const result2 = sync ??= _Renderer.#render(component, options);
              const user_result = onfulfilled({
                head: result2.head,
                body: result2.body,
                html: result2.body
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
   * Collect all of the `onDestroy` callbacks regsitered during rendering. In an async context, this is only safe to call
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
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string }} options
   * @returns {Promise<AccumulatedContent>}
   */
  static async #render_async(component, options) {
    var previous_context = ssr_context;
    try {
      const renderer = _Renderer.#open_render("async", component, options);
      const content = await renderer.#collect_content_async();
      return _Renderer.#close_render(content, renderer);
    } finally {
      abort();
      set_ssr_context(previous_context);
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
        await item.#collect_content_async(content);
      }
    }
    return content;
  }
  /**
   * @template {Record<string, any>} Props
   * @param {'sync' | 'async'} mode
   * @param {import('svelte').Component<Props>} component
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string }} options
   * @returns {Renderer}
   */
  static #open_render(mode, component, options) {
    const renderer = new _Renderer(
      new SSRState(mode, options.idPrefix ? options.idPrefix + "-" : "")
    );
    renderer.push(BLOCK_OPEN);
    if (options.context) {
      push();
      ssr_context.c = options.context;
      ssr_context.r = renderer;
    }
    component(renderer, options.props ?? {});
    if (options.context) {
      pop();
    }
    renderer.push(BLOCK_CLOSE);
    return renderer;
  }
  /**
   * @param {AccumulatedContent} content
   * @param {Renderer} renderer
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
      body
    };
  }
};
var SSRState = class {
  /** @readonly @type {'sync' | 'async'} */
  mode;
  /** @readonly @type {() => string} */
  uid;
  /** @readonly @type {Set<{ hash: string; code: string }>} */
  css = /* @__PURE__ */ new Set();
  /** @type {{ path: number[], value: string }} */
  #title = { path: [], value: "" };
  /**
   * @param {'sync' | 'async'} mode
   * @param {string} [id_prefix]
   */
  constructor(mode, id_prefix = "") {
    this.mode = mode;
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
  return Renderer.render(
    /** @type {Component<Props>} */
    component,
    options
  );
}
function head(renderer, fn) {
  renderer.head((renderer2) => {
    renderer2.push(BLOCK_OPEN);
    renderer2.child(fn);
    renderer2.push(BLOCK_CLOSE);
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
  for (name in attrs) {
    if (typeof attrs[name] === "function") continue;
    if (name[0] === "$" && name[1] === "$") continue;
    if (INVALID_ATTR_NAME_CHAR_REGEX.test(name)) continue;
    var value = attrs[name];
    if (lowercase) {
      name = name.toLowerCase();
    }
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
    for (key in obj) {
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
function ensure_array_like(array_like_or_iterator) {
  if (array_like_or_iterator) {
    return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }
  return [];
}
var $$css$2 = {
  hash: "svelte-w3wuk5",
  code: '.layout.svelte-w3wuk5 {position:fixed;left:0;right:0;top:0;bottom:0;display:grid;justify-content:center;align-content:center;font-family:"Noto Sans Gothic", serif;text-align:center;overflow-y:auto;overflow-x:hidden;}'
};
function Layout($$renderer, $$props) {
  $$renderer.global.css.add($$css$2);
  $$renderer.component(($$renderer2) => {
    const view = getContext("view");
    let { title = view.name, children } = $$props;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(title)}</title>`);
      });
      $$renderer3.push(`<meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>`);
    });
    $$renderer2.push(`<div class="layout svelte-w3wuk5">`);
    children($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
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
    if (view.isSnapshot) {
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
    let query = "";
    requestUrl = form.action.split("?")[0] ?? "";
    if (view.isSnapshot) {
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
      query = `?${params.toString()}`;
      response = await fetch(`${requestUrl}${query}`, {
        headers: {
          Accept: "application/json"
        }
      });
    } else {
      requestUrl = form.action;
      if (view.isSnapshot) {
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
  if (view.isSnapshot) {
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
var started = false;
function route(view) {
  if (!IS_BROWSER || started) {
    return;
  }
  const form = document.createElement("form");
  const anchor = document.createElement("a");
  const listener = async function pop2(e) {
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
      event.preventDefault();
      const record = await swap(anchor, view);
      record();
      return false;
    }
  };
}
var $$css$1 = {
  hash: "svelte-kck7gq",
  code: "pre.svelte-kck7gq {font-size:calc(0.5vw + 0.2rem);}\n    @media (width <= 720px) {pre.svelte-kck7gq {font-size:calc(2vw);}\n    }"
};
function Logo($$renderer) {
  $$renderer.global.css.add($$css$1);
  $$renderer.push(`<pre class="text-primary svelte-kck7gq" style="line-height:1.1em">
\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2588\u2557\u2591\u2591\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557
\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2551\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2557\u2591\u2588\u2588\u2551\u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D
\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2588\u2554\u2550\u255D\u2591\u2591\u2588\u2588\u2588\u2554\u2550\u255D\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2557\u2588\u2588\u2551\u2591\u2591\u2591\u2588\u2588\u2551\u2591\u2591\u2591\u2588\u2588\u2588\u2588\u2588\u2557\u2591\u2591
\u2588\u2588\u2554\u2550\u2550\u255D\u2591\u2591\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u255D\u2591\u2591\u2588\u2588\u2554\u2550\u2550\u255D\u2591\u2591\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2588\u2588\u2588\u2588\u2551\u2591\u2591\u2591\u2588\u2588\u2551\u2591\u2591\u2591\u2588\u2588\u2554\u2550\u2550\u255D\u2591\u2591
\u2588\u2588\u2551\u2591\u2591\u2591\u2591\u2591\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551\u2591\u2591\u2588\u2588\u2551\u2588\u2588\u2551\u2591\u255A\u2588\u2588\u2588\u2551\u2591\u2591\u2591\u2588\u2588\u2551\u2591\u2591\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557
\u255A\u2550\u255D\u2591\u2591\u2591\u2591\u2591\u255A\u2550\u255D\u2591\u2591\u255A\u2550\u255D\u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D\u2591\u2591\u255A\u2550\u255D\u255A\u2550\u255D\u2591\u2591\u255A\u2550\u2550\u255D\u2591\u2591\u2591\u255A\u2550\u255D\u2591\u2591\u2591\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D
</pre>`);
}
var $$css = {
  hash: "svelte-1g9256p",
  code: "svg.svelte-1g9256p {--size: 1rem;width:var(--size);height:var(--size);}"
};
function Icon($$renderer, $$props) {
  $$renderer.global.css.add($$css);
  let { path, size = "1rem", fill = "currentColor", stroke = "none" } = $$props;
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr_style(`--size:${stringify(size)}`)} viewBox="0 0 24 24"${attr("stroke", stroke)}${attr("fill", fill)} class="svelte-1g9256p"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"${attr("d", path)}></path></svg>`);
}
var frames = ["\u2BCC", "\u2BCF", "\u2BCE", "\u2BCD"];
function Sparkle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, refresh: update = 500 } = $$props;
    let index = 0;
    let value = frames[index];
    children($$renderer2, value);
    $$renderer2.push(`<!---->`);
  });
}
function Description$1($$renderer) {
  $$renderer.push(`<div class="pt-6"></div> <p class="text-xl text-base-content/60">Modern Go + Svelte Framework</p>`);
}
function BackgroundEffect($$renderer) {
  const color = "text-secondary";
  {
    let children = function($$renderer2, frame) {
      $$renderer2.push(`<span${attr_class(`${stringify(color)} absolute left-32 -top-10`)}>${escape_html(frame)}</span>`);
    };
    Sparkle($$renderer, { refresh: 500, children });
  }
  $$renderer.push(`<!----> `);
  {
    let children = function($$renderer2, frame) {
      $$renderer2.push(`<span${attr_class(`${stringify(color)} absolute left-24 -top-52`)}>${escape_html(frame)}</span>`);
    };
    Sparkle($$renderer, { refresh: 300, children });
  }
  $$renderer.push(`<!----> `);
  {
    let children = function($$renderer2, frame) {
      $$renderer2.push(`<span${attr_class(`${stringify(color)} absolute right-4 -top-40`)}>${escape_html(frame)}</span>`);
    };
    Sparkle($$renderer, { refresh: 1200, children });
  }
  $$renderer.push(`<!----> `);
  {
    let children = function($$renderer2, frame) {
      $$renderer2.push(`<span${attr_class(`${stringify(color)} absolute right-20 -top-14`)}>${escape_html(frame)}</span>`);
    };
    Sparkle($$renderer, { refresh: 570, children });
  }
  $$renderer.push(`<!----> `);
  {
    let children = function($$renderer2, frame) {
      $$renderer2.push(`<span${attr_class(`${stringify(color)} absolute right-40 -top-56`)}>${escape_html(frame)}</span>`);
    };
    Sparkle($$renderer, { refresh: 330, children });
  }
  $$renderer.push(`<!----> `);
  {
    let children = function($$renderer2, frame) {
      $$renderer2.push(`<span${attr_class(`${stringify(color)} absolute left-40 -top-56`)}>${escape_html(frame)}</span>`);
    };
    Sparkle($$renderer, { refresh: 400, children });
  }
  $$renderer.push(`<!----> `);
  {
    let children = function($$renderer2, frame) {
      $$renderer2.push(`<span${attr_class(`${stringify(color)} absolute -right-10 -top-16`)}>${escape_html(frame)}</span>`);
    };
    Sparkle($$renderer, { refresh: 490, children });
  }
  $$renderer.push(`<!----> `);
  {
    let children = function($$renderer2, frame) {
      $$renderer2.push(`<span${attr_class(`${stringify(color)} absolute -left-10 -top-16`)}>${escape_html(frame)}</span>`);
    };
    Sparkle($$renderer, { refresh: 350, children });
  }
  $$renderer.push(`<!----> `);
  {
    let children = function($$renderer2, frame) {
      $$renderer2.push(`<span${attr_class(`${stringify(color)} absolute text-center -top-60`)}>${escape_html(frame)}</span>`);
    };
    Sparkle($$renderer, { refresh: 560, children });
  }
  $$renderer.push(`<!---->`);
}
function TodosButton($$renderer) {
  $$renderer.push(`<a${attributes({ class: "btn btn-primary btn-lg", ...href("/todos") })}><span>Show Todos</span> `);
  Icon($$renderer, { path: mdiArrowRight });
  $$renderer.push(`<!----></a>`);
}
function DocumentationButton($$renderer) {
  $$renderer.push(`<a class="btn btn-secondary btn-lg" href="https://razshare.github.io/frizzante-docs/guides/get-started" target="_blank"><span>Documentation</span></a>`);
}
function Welcome($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    Layout($$renderer2, {
      title: "Welcome",
      children: ($$renderer3) => {
        Logo($$renderer3);
        $$renderer3.push(`<!----> `);
        Description$1($$renderer3);
        $$renderer3.push(`<!----> <div class="pt-6"></div> <div class="flex justify-center gap-2 relative">`);
        BackgroundEffect($$renderer3);
        $$renderer3.push(`<!----> `);
        TodosButton($$renderer3);
        $$renderer3.push(`<!----> `);
        DocumentationButton($$renderer3);
        $$renderer3.push(`<!----></div>`);
      }
    });
  });
}
function action(path = "") {
  if (!IS_BROWSER) {
    return { action: path, async onsubmit() {
    } };
  }
  const view = getContext("view");
  route(view);
  return {
    action: path,
    async onsubmit(event) {
      event.preventDefault();
      const form = event.target;
      await swap(form, view).then(function done(record) {
        record();
      });
    }
  };
}
function Description($$renderer) {
  $$renderer.push(`<h1 class="text-3xl">Daily Tasks</h1> <p class="text-lg text-base-content/60">Organize and track your daily activities</p>`);
}
function NoTodosFound($$renderer) {
  $$renderer.push(`<div class="text-center text-base-content/50 text-lg"><span>No tasks yet. Add one above to get started!</span></div>`);
}
function ToggleTodoButton($$renderer, todo, index) {
  const aria = todo.checked ? "Uncheck" : "Check";
  const value = todo.checked ? "0" : "1";
  const icon = todo.checked ? mdiCheckCircleOutline : mdiCircleOutline;
  $$renderer.push(`<form${attributes({
    method: "POST",
    ...action("/toggle"),
    class: "grow content-center"
  })}><input type="hidden" name="index"${attr("value", index)}/> <input type="hidden" name="value"${attr("value", value)}/> <button type="submit"${attr_class("w-full flex cursor-pointer", void 0, {
    "line-through": todo.checked,
    "text-base-content": todo.checked,
    "opacity-50": todo.checked
  })}${attr("aria-label", aria)}>`);
  Icon($$renderer, { path: icon });
  $$renderer.push(`<!----> <div class="pr-4"></div> <span>${escape_html(todo.description)}</span></button></form>`);
}
function RemoveTodoButton($$renderer, index) {
  $$renderer.push(`<form${attributes({ method: "POST", ...action("/remove") })}><input type="hidden" name="index"${attr("value", index)}/> <button type="submit" class="btn btn-ghost btn-sm btn-square hover:text-error hover:bg-error/20 transition-colors" aria-label="Delete">`);
  Icon($$renderer, { path: mdiClose });
  $$renderer.push(`<!----></button></form>`);
}
function BackButton($$renderer) {
  $$renderer.push(`<div class="pt-4"></div> <a${attributes({ class: "btn btn-neutral text-lg", ...href("/") })}>`);
  Icon($$renderer, { path: mdiArrowLeft });
  $$renderer.push(`<!----> <span>Back</span></a>`);
}
function Todos($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { items = [], error } = $$props;
    let unchecked = (function count() {
      let value = 0;
      for (const todo of items) {
        if (!todo.checked) {
          value++;
        }
      }
      return value;
    })();
    function AddTodoForm($$renderer3) {
      $$renderer3.push(`<form${attributes({ method: "POST", ...action("/add"), class: "flex" })}><input type="text" name="description" placeholder="Add a new task..." class="input bg-base-100/ text-lg w-full"/> <div class="pt-4"></div> <button type="submit" class="btn btn-ghost text-lg">`);
      Icon($$renderer3, { path: mdiPlus });
      $$renderer3.push(`<!----> <span>Add</span></button></form> `);
      if (error) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="pt-4"></div> <div class="alert alert-error"><span>${escape_html(error)}</span></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    function ShowTodosList($$renderer3, items2) {
      if (items2.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(items2);
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          let todo = each_array[index];
          $$renderer3.push(`<div class="flex w-full text-base-content/80">`);
          ToggleTodoButton($$renderer3, todo, index);
          $$renderer3.push(`<!----> `);
          RemoveTodoButton($$renderer3, index);
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]--> `);
        CountUncheckedTodos($$renderer3);
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        NoTodosFound($$renderer3);
      }
      $$renderer3.push(`<!--]-->`);
    }
    function CountUncheckedTodos($$renderer3) {
      $$renderer3.push(`<div class="text-lg text-base-content/50 text-center"><span>${escape_html(unchecked)} tasks remaining</span></div>`);
    }
    Layout($$renderer2, {
      title: "Todos",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full min-w-[450px] max-w-2xl"><div class="text-center">`);
        Description($$renderer3);
        $$renderer3.push(`<!----></div> <div class="card-body relative p-6">`);
        AddTodoForm($$renderer3);
        $$renderer3.push(`<!----> <div class="divider"></div> `);
        ShowTodosList($$renderer3, items);
        $$renderer3.push(`<!----> `);
        BackButton($$renderer3);
        $$renderer3.push(`<!----></div></div>`);
      }
    });
  });
}
var views = {
  Welcome,
  Todos
};
function Server_router($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { name, props, render: render2, align, isSnapshot } = $$props;
    const components = views;
    const view = { name, props, render: render2, align, isSnapshot, async pin() {
    } };
    setContext("view", view);
    $$renderer2.push(`<!--[-->`);
    const each_array = ensure_array_like(Object.keys(components));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let key = each_array[$$index];
      if (key === view.name) {
        $$renderer2.push("<!--[-->");
        const Component = components[key];
        $$renderer2.push(`<!---->`);
        Component($$renderer2, spread_props([view.props]));
        $$renderer2.push(`<!---->`);
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
