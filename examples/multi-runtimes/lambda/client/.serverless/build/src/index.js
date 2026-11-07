var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x4) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x4, {
  get: (a3, b3) => (typeof require !== "undefined" ? require : a3)[b3]
}) : x4)(function(x4) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x4 + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e2) {
    throw mod = 0, e2;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/@ioredis/commands/built/commands.json
var require_commands = __commonJS({
  "../../node_modules/@ioredis/commands/built/commands.json"(exports, module) {
    module.exports = {
      acl: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          cat: {
            arity: -2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          deluser: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          dryrun: {
            arity: -4,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          genpass: {
            arity: -2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getuser: {
            arity: 3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          list: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          load: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          log: {
            arity: -2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          save: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          setuser: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          users: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          whoami: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      append: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arcount: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      ardel: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      ardelrange: {
        arity: -4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arget: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      argetrange: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      argrep: {
        arity: -6,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arinfo: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arinsert: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arlastitems: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      armget: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      armset: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arnext: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arop: {
        arity: -5,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arring: {
        arity: -4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arscan: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arseek: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arset: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      asking: {
        arity: 1,
        flags: [
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      auth: {
        arity: -2,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      backup: {
        arity: 2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          abort: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          cleanup: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          list: {
            arity: 2,
            flags: [
              "admin",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          seal: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          start: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          status: {
            arity: 2,
            flags: [
              "admin",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      bgrewriteaof: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      bgsave: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      bitcount: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      bitfield: {
        arity: -2,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      bitfield_ro: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      bitop: {
        arity: -4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 2,
        keyStop: -1,
        step: 1
      },
      bitpos: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      blmove: {
        arity: 6,
        flags: [
          "write",
          "denyoom",
          "blocking"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      blmovem: {
        arity: -6,
        flags: [
          "write",
          "denyoom",
          "blocking"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      blmpop: {
        arity: -5,
        flags: [
          "write",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      blpop: {
        arity: -3,
        flags: [
          "write",
          "blocking"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      brpop: {
        arity: -3,
        flags: [
          "write",
          "blocking"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      brpoplpush: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "blocking"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      bzmpop: {
        arity: -5,
        flags: [
          "write",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      bzpopmax: {
        arity: -3,
        flags: [
          "write",
          "blocking",
          "fast"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      bzpopmin: {
        arity: -3,
        flags: [
          "write",
          "blocking",
          "fast"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      client: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          caching: {
            arity: 3,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getname: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getredir: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          id: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          info: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          kill: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          list: {
            arity: -2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "no-evict": {
            arity: 3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "no-touch": {
            arity: 3,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          pause: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          reply: {
            arity: 3,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          setinfo: {
            arity: 4,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          setname: {
            arity: 3,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          tracking: {
            arity: -3,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          trackinginfo: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          unblock: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          unpause: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      cluster: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          addslots: {
            arity: -3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          addslotsrange: {
            arity: -4,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          bumpepoch: {
            arity: 2,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "count-failure-reports": {
            arity: 3,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          countkeysinslot: {
            arity: 3,
            flags: [
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          delslots: {
            arity: -3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          delslotsrange: {
            arity: -4,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          failover: {
            arity: -2,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          flushslots: {
            arity: 2,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          forget: {
            arity: 3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getkeysinslot: {
            arity: 4,
            flags: [
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          info: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          keyslot: {
            arity: 3,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          links: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          meet: {
            arity: -4,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          migration: {
            arity: -4,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          myid: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          myshardid: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          nodes: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          replicas: {
            arity: 3,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          replicate: {
            arity: 3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          reset: {
            arity: -2,
            flags: [
              "admin",
              "noscript",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          saveconfig: {
            arity: 2,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "set-config-epoch": {
            arity: 3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          setslot: {
            arity: -4,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          shards: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          slaves: {
            arity: 3,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "slot-stats": {
            arity: -4,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            step: 0
          },
          slots: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          syncslots: {
            arity: -3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      command: {
        arity: -1,
        flags: [
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          count: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          docs: {
            arity: -2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getkeys: {
            arity: -3,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getkeysandflags: {
            arity: -3,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          info: {
            arity: -2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          list: {
            arity: -2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      config: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          get: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          resetstat: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          rewrite: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          set: {
            arity: -4,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          }
        }
      },
      copy: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      dbsize: {
        arity: 1,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "agg_sum",
        step: 0
      },
      debug: {
        arity: -2,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      decr: {
        arity: 2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      decrby: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      del: {
        arity: -2,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        responsePolicy: "agg_sum",
        step: 1
      },
      delex: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      digest: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      discard: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      dump: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      echo: {
        arity: 2,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      eval: {
        arity: -3,
        flags: [
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      eval_ro: {
        arity: -3,
        flags: [
          "readonly",
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      evalsha: {
        arity: -3,
        flags: [
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      evalsha_ro: {
        arity: -3,
        flags: [
          "readonly",
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      exec: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "skip_slowlog"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      exists: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        responsePolicy: "agg_sum",
        step: 1
      },
      expire: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      expireat: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      expiretime: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      failover: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      fcall: {
        arity: -3,
        flags: [
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      fcall_ro: {
        arity: -3,
        flags: [
          "readonly",
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      flushall: {
        arity: -1,
        flags: [
          "write"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "all_succeeded",
        step: 0
      },
      flushdb: {
        arity: -1,
        flags: [
          "write"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "all_succeeded",
        step: 0
      },
      function: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          delete: {
            arity: 3,
            flags: [
              "write",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "all_succeeded",
            step: 0
          },
          dump: {
            arity: 2,
            flags: [
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          flush: {
            arity: -2,
            flags: [
              "write",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "all_succeeded",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          kill: {
            arity: 2,
            flags: [
              "noscript",
              "allow_busy"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "one_succeeded",
            step: 0
          },
          list: {
            arity: -2,
            flags: [
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          load: {
            arity: -3,
            flags: [
              "write",
              "denyoom",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "all_succeeded",
            step: 0
          },
          restore: {
            arity: -3,
            flags: [
              "write",
              "denyoom",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "all_succeeded",
            step: 0
          },
          stats: {
            arity: 2,
            flags: [
              "noscript",
              "allow_busy"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "special",
            step: 0
          }
        }
      },
      geoadd: {
        arity: -5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geodist: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geohash: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geopos: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadius: {
        arity: -6,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadius_ro: {
        arity: -6,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadiusbymember: {
        arity: -5,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadiusbymember_ro: {
        arity: -5,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geosearch: {
        arity: -7,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geosearchstore: {
        arity: -8,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      get: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getbit: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getdel: {
        arity: 2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getex: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getrange: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getset: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hdel: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hello: {
        arity: -1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      hexists: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hexpire: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hexpireat: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hexpiretime: {
        arity: -5,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hget: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hgetall: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hgetdel: {
        arity: -5,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hgetex: {
        arity: -5,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      himport: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          discard: {
            arity: 3,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            step: 0
          },
          discardall: {
            arity: 2,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            step: 0
          },
          prepare: {
            arity: -4,
            flags: [
              "denyoom"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            step: 0
          },
          set: {
            arity: -5,
            flags: [
              "write",
              "denyoom"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          }
        }
      },
      hincrby: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hincrbyfloat: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hkeys: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hmget: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hmset: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hotkeys: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          get: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "special",
            responsePolicy: "special",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          reset: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "special",
            step: 0
          },
          start: {
            arity: -2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "special",
            step: 0
          },
          stop: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "special",
            step: 0
          }
        }
      },
      hpersist: {
        arity: -5,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hpexpire: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hpexpireat: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hpexpiretime: {
        arity: -5,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hpttl: {
        arity: -5,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hrandfield: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hscan: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hset: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hsetex: {
        arity: -6,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hsetnx: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hstrlen: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      httl: {
        arity: -5,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hvals: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      incr: {
        arity: 2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      incrby: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      incrbyfloat: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      increx: {
        arity: -2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      info: {
        arity: -1,
        flags: [
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "special",
        step: 0
      },
      keys: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        step: 0
      },
      lastsave: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      latency: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          doctor: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "special",
            step: 0
          },
          graph: {
            arity: 3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "special",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          histogram: {
            arity: -2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "special",
            step: 0
          },
          history: {
            arity: 3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "special",
            step: 0
          },
          latest: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "special",
            step: 0
          },
          reset: {
            arity: -2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "agg_sum",
            step: 0
          }
        }
      },
      lcs: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      lindex: {
        arity: 3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      linsert: {
        arity: 5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      llen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lmove: {
        arity: 5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      lmovem: {
        arity: -5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      lmpop: {
        arity: -4,
        flags: [
          "write",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      lolwut: {
        arity: -1,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      lpop: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lpos: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lpush: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lpushx: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lrange: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lrem: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lset: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      ltrim: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      memory: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          doctor: {
            arity: 2,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "special",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "malloc-stats": {
            arity: 2,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "special",
            step: 0
          },
          purge: {
            arity: 2,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "all_succeeded",
            step: 0
          },
          stats: {
            arity: 2,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "special",
            step: 0
          },
          usage: {
            arity: -3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          }
        }
      },
      mget: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        step: 1
      },
      migrate: {
        arity: -6,
        flags: [
          "write",
          "movablekeys"
        ],
        keyStart: 3,
        keyStop: 3,
        step: 1
      },
      module: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          list: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          load: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          loadex: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          unload: {
            arity: 3,
            flags: [
              "admin",
              "noscript",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      monitor: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      move: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      mset: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        responsePolicy: "all_succeeded",
        step: 2
      },
      msetex: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "multi_shard",
        responsePolicy: "all_succeeded",
        step: 0
      },
      msetnx: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 2
      },
      multi: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      object: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          encoding: {
            arity: 3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          freq: {
            arity: 3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          idletime: {
            arity: 3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          refcount: {
            arity: 3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          }
        }
      },
      persist: {
        arity: 2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pexpire: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pexpireat: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pexpiretime: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pfadd: {
        arity: -2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pfcount: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      pfdebug: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "admin"
        ],
        keyStart: 2,
        keyStop: 2,
        step: 1
      },
      pfmerge: {
        arity: -2,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      pfselftest: {
        arity: 1,
        flags: [
          "admin"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      ping: {
        arity: -1,
        flags: [
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "all_succeeded",
        step: 0
      },
      psetex: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      psubscribe: {
        arity: -2,
        flags: [
          "denyoom",
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      psync: {
        arity: -3,
        flags: [
          "admin",
          "noscript",
          "no_async_loading",
          "no_multi"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      pttl: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      publish: {
        arity: 3,
        flags: [
          "pubsub",
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      pubsub: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          channels: {
            arity: -2,
            flags: [
              "pubsub",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          numpat: {
            arity: 2,
            flags: [
              "pubsub",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          numsub: {
            arity: -2,
            flags: [
              "pubsub",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          shardchannels: {
            arity: -2,
            flags: [
              "pubsub",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          shardnumsub: {
            arity: -2,
            flags: [
              "pubsub",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      punsubscribe: {
        arity: -1,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      quit: {
        arity: -1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      randomkey: {
        arity: 1,
        flags: [
          "readonly"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "special",
        step: 0
      },
      readonly: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      readwrite: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      rename: {
        arity: 3,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      renamenx: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      replconf: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      replicaof: {
        arity: 3,
        flags: [
          "admin",
          "noscript",
          "stale",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      reset: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      restore: {
        arity: -4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      "restore-asking": {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "asking"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      role: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      rpop: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      rpoplpush: {
        arity: 3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      rpush: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      rpushx: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sadd: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      save: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading",
          "no_multi"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      scan: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "special",
        responsePolicy: "special",
        step: 0
      },
      scard: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      script: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          debug: {
            arity: 3,
            flags: [
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          exists: {
            arity: -3,
            flags: [
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "agg_logical_and",
            step: 0
          },
          flush: {
            arity: -2,
            flags: [
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          kill: {
            arity: 2,
            flags: [
              "noscript",
              "allow_busy"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "one_succeeded",
            step: 0
          },
          load: {
            arity: 3,
            flags: [
              "noscript",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          }
        }
      },
      sdiff: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sdiffcard: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sdiffstore: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      select: {
        arity: 2,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      set: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setbit: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setex: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setnx: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setrange: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      shutdown: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale",
          "no_multi",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sinter: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sintercard: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sinterstore: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sismember: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      slaveof: {
        arity: 3,
        flags: [
          "admin",
          "noscript",
          "stale",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      slowlog: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          get: {
            arity: -2,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          len: {
            arity: 2,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "agg_sum",
            step: 0
          },
          reset: {
            arity: 2,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          }
        }
      },
      smembers: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      smismember: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      smove: {
        arity: 4,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      sort: {
        arity: -2,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sort_ro: {
        arity: -2,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      spop: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      spublish: {
        arity: 3,
        flags: [
          "pubsub",
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      srandmember: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      srem: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sscan: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      ssubscribe: {
        arity: -2,
        flags: [
          "denyoom",
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      strlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      subscribe: {
        arity: -2,
        flags: [
          "denyoom",
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      substr: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sunion: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sunioncard: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sunionstore: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sunsubscribe: {
        arity: -1,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      swapdb: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sync: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading",
          "no_multi"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      time: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      touch: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        responsePolicy: "agg_sum",
        step: 1
      },
      trimslots: {
        arity: -5,
        flags: [
          "write"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      ttl: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      type: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      unlink: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        responsePolicy: "agg_sum",
        step: 1
      },
      unsubscribe: {
        arity: -1,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      unwatch: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      vadd: {
        arity: -5,
        flags: [
          "write",
          "denyoom",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vcard: {
        arity: 2,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vdim: {
        arity: 2,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vemb: {
        arity: -3,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vgetattr: {
        arity: 3,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vinfo: {
        arity: 2,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vismember: {
        arity: 3,
        flags: [
          "readonly",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vlinks: {
        arity: -3,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vrandmember: {
        arity: -2,
        flags: [
          "readonly",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vrange: {
        arity: -4,
        flags: [
          "readonly",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vrem: {
        arity: 3,
        flags: [
          "write",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vsetattr: {
        arity: 4,
        flags: [
          "write",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vsim: {
        arity: -4,
        flags: [
          "readonly",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      wait: {
        arity: 3,
        flags: [
          "blocking"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "agg_min",
        step: 0
      },
      waitaof: {
        arity: 4,
        flags: [
          "blocking"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "agg_min",
        step: 0
      },
      watch: {
        arity: -2,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      xack: {
        arity: -4,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xackdel: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xadd: {
        arity: -5,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xautoclaim: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xcfgset: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xclaim: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xdel: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xdelex: {
        arity: -5,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xgroup: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          create: {
            arity: -5,
            flags: [
              "write",
              "denyoom"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          createconsumer: {
            arity: 5,
            flags: [
              "write",
              "denyoom"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          delconsumer: {
            arity: 5,
            flags: [
              "write"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          destroy: {
            arity: 4,
            flags: [
              "write"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          setid: {
            arity: -5,
            flags: [
              "write"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          }
        }
      },
      xidmprecord: {
        arity: 5,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xinfo: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          consumers: {
            arity: 4,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          groups: {
            arity: 3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          stream: {
            arity: -3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          }
        }
      },
      xlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xnack: {
        arity: -7,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xpending: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xread: {
        arity: -4,
        flags: [
          "readonly",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      xreadgroup: {
        arity: -7,
        flags: [
          "write",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      xrevrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xsetid: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xtrim: {
        arity: -4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zadd: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zcard: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zcount: {
        arity: 4,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zdiff: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zdiffstore: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zincrby: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zinter: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zintercard: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zinterstore: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zlexcount: {
        arity: 4,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zmpop: {
        arity: -4,
        flags: [
          "write",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zmscore: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zpopmax: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zpopmin: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrandmember: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrangebylex: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrangebyscore: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrangestore: {
        arity: -5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      zrank: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrem: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zremrangebylex: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zremrangebyrank: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zremrangebyscore: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrangebylex: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrangebyscore: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrank: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zscan: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zscore: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zunion: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zunionstore: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      }
    };
  }
});

// ../../node_modules/@ioredis/commands/built/index.js
var require_built = __commonJS({
  "../../node_modules/@ioredis/commands/built/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getKeyIndexes = exports.hasFlag = exports.exists = exports.list = void 0;
    var commands_json_1 = __importDefault(require_commands());
    var commandMetadata = commands_json_1.default;
    exports.list = Object.keys(commandMetadata);
    var flags = {};
    exports.list.forEach((commandName) => {
      flags[commandName] = commandMetadata[commandName].flags.reduce(function(flags2, flag) {
        flags2[flag] = true;
        return flags2;
      }, {});
    });
    function exists(commandName, options) {
      commandName = (options === null || options === void 0 ? void 0 : options.caseInsensitive) ? String(commandName).toLowerCase() : commandName;
      return Boolean(commandMetadata[commandName]);
    }
    exports.exists = exists;
    function hasFlag(commandName, flag, options) {
      commandName = (options === null || options === void 0 ? void 0 : options.nameCaseInsensitive) ? String(commandName).toLowerCase() : commandName;
      if (!flags[commandName]) {
        throw new Error("Unknown command " + commandName);
      }
      return Boolean(flags[commandName][flag]);
    }
    exports.hasFlag = hasFlag;
    function getKeyIndexes(commandName, args, options) {
      commandName = (options === null || options === void 0 ? void 0 : options.nameCaseInsensitive) ? String(commandName).toLowerCase() : commandName;
      const command = commandMetadata[commandName];
      if (!command) {
        throw new Error("Unknown command " + commandName);
      }
      if (!Array.isArray(args)) {
        throw new Error("Expect args to be an array");
      }
      let resolvedCommand = command;
      for (let i2 = 0; i2 < args.length && resolvedCommand.subcommands; i2++) {
        const subcommand = resolvedCommand.subcommands[String(args[i2]).toLowerCase()];
        if (!subcommand) {
          break;
        }
        resolvedCommand = subcommand;
      }
      const keys = [];
      const parseExternalKey = Boolean(options && options.parseExternalKey);
      const takeDynamicKeys = (args2, startIndex) => {
        const keys2 = [];
        const keyStop = Number(args2[startIndex]);
        for (let i2 = 0; i2 < keyStop; i2++) {
          keys2.push(i2 + startIndex + 1);
        }
        return keys2;
      };
      const takeKeyAfterToken = (args2, startIndex, token) => {
        for (let i2 = startIndex; i2 < args2.length - 1; i2 += 1) {
          if (String(args2[i2]).toLowerCase() === token.toLowerCase()) {
            return i2 + 1;
          }
        }
        return null;
      };
      switch (commandName) {
        case "zunionstore":
        case "zinterstore":
        case "zdiffstore":
          keys.push(0, ...takeDynamicKeys(args, 1));
          break;
        case "eval":
        case "evalsha":
        case "eval_ro":
        case "evalsha_ro":
        case "fcall":
        case "fcall_ro":
        case "blmpop":
        case "bzmpop":
          keys.push(...takeDynamicKeys(args, 1));
          break;
        case "sdiffcard":
        case "sintercard":
        case "sunioncard":
        case "lmpop":
        case "zunion":
        case "zinter":
        case "zmpop":
        case "zintercard":
        case "zdiff": {
          keys.push(...takeDynamicKeys(args, 0));
          break;
        }
        case "msetex": {
          const numKeys = Number(args[0]);
          for (let i2 = 0; i2 < numKeys; i2++) {
            keys.push(1 + i2 * 2);
          }
          break;
        }
        case "georadius": {
          keys.push(0);
          const storeKey = takeKeyAfterToken(args, 5, "STORE");
          if (storeKey)
            keys.push(storeKey);
          const distKey = takeKeyAfterToken(args, 5, "STOREDIST");
          if (distKey)
            keys.push(distKey);
          break;
        }
        case "georadiusbymember": {
          keys.push(0);
          const storeKey = takeKeyAfterToken(args, 4, "STORE");
          if (storeKey)
            keys.push(storeKey);
          const distKey = takeKeyAfterToken(args, 4, "STOREDIST");
          if (distKey)
            keys.push(distKey);
          break;
        }
        case "sort":
        case "sort_ro":
          keys.push(0);
          for (let i2 = 1; i2 < args.length - 1; i2++) {
            let arg = args[i2];
            if (typeof arg !== "string") {
              continue;
            }
            const directive = arg.toUpperCase();
            if (directive === "GET") {
              i2 += 1;
              arg = args[i2];
              if (arg !== "#") {
                if (parseExternalKey) {
                  keys.push([i2, getExternalKeyNameLength(arg)]);
                } else {
                  keys.push(i2);
                }
              }
            } else if (directive === "BY") {
              i2 += 1;
              if (parseExternalKey) {
                keys.push([i2, getExternalKeyNameLength(args[i2])]);
              } else {
                keys.push(i2);
              }
            } else if (directive === "STORE") {
              i2 += 1;
              keys.push(i2);
            }
          }
          break;
        case "migrate":
          if (args[2] === "") {
            for (let i2 = 5; i2 < args.length - 1; i2++) {
              const arg = args[i2];
              if (typeof arg === "string" && arg.toUpperCase() === "KEYS") {
                for (let j2 = i2 + 1; j2 < args.length; j2++) {
                  keys.push(j2);
                }
                break;
              }
            }
          } else {
            keys.push(2);
          }
          break;
        case "xreadgroup":
        case "xread":
          for (let i2 = commandName === "xread" ? 0 : 3; i2 < args.length - 1; i2++) {
            if (String(args[i2]).toUpperCase() === "STREAMS") {
              for (let j2 = i2 + 1; j2 <= i2 + (args.length - 1 - i2) / 2; j2++) {
                keys.push(j2);
              }
              break;
            }
          }
          break;
        default:
          if (resolvedCommand.step > 0) {
            const keyStart = resolvedCommand.keyStart - 1;
            const keyStop = resolvedCommand.keyStop > 0 ? resolvedCommand.keyStop : args.length + resolvedCommand.keyStop + 1;
            for (let i2 = keyStart; i2 < keyStop; i2 += resolvedCommand.step) {
              keys.push(i2);
            }
          }
          break;
      }
      return keys;
    }
    exports.getKeyIndexes = getKeyIndexes;
    function getExternalKeyNameLength(key) {
      if (typeof key !== "string") {
        key = String(key);
      }
      const hashPos = key.indexOf("->");
      return hashPos === -1 ? key.length : hashPos;
    }
  }
});

// ../../node_modules/standard-as-callback/built/utils.js
var require_utils = __commonJS({
  "../../node_modules/standard-as-callback/built/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tryCatch = exports.errorObj = void 0;
    exports.errorObj = { e: {} };
    var tryCatchTarget;
    function tryCatcher(err, val) {
      try {
        const target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
      } catch (e2) {
        exports.errorObj.e = e2;
        return exports.errorObj;
      }
    }
    function tryCatch(fn) {
      tryCatchTarget = fn;
      return tryCatcher;
    }
    exports.tryCatch = tryCatch;
  }
});

// ../../node_modules/standard-as-callback/built/index.js
var require_built2 = __commonJS({
  "../../node_modules/standard-as-callback/built/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    function throwLater(e2) {
      setTimeout(function() {
        throw e2;
      }, 0);
    }
    function asCallback(promise, nodeback, options) {
      if (typeof nodeback === "function") {
        promise.then((val) => {
          let ret;
          if (options !== void 0 && Object(options).spread && Array.isArray(val)) {
            ret = utils_1.tryCatch(nodeback).apply(void 0, [null].concat(val));
          } else {
            ret = val === void 0 ? utils_1.tryCatch(nodeback)(null) : utils_1.tryCatch(nodeback)(null, val);
          }
          if (ret === utils_1.errorObj) {
            throwLater(ret.e);
          }
        }, (cause) => {
          if (!cause) {
            const newReason = new Error(cause + "");
            Object.assign(newReason, { cause });
            cause = newReason;
          }
          const ret = utils_1.tryCatch(nodeback)(cause);
          if (ret === utils_1.errorObj) {
            throwLater(ret.e);
          }
        });
      }
      return promise;
    }
    exports.default = asCallback;
  }
});

// ../../node_modules/redis-errors/lib/old.js
var require_old = __commonJS({
  "../../node_modules/redis-errors/lib/old.js"(exports, module) {
    "use strict";
    var assert = __require("assert");
    var util = __require("util");
    function RedisError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(RedisError, Error);
    Object.defineProperty(RedisError.prototype, "name", {
      value: "RedisError",
      configurable: true,
      writable: true
    });
    function ParserError(message, buffer2, offset) {
      assert(buffer2);
      assert.strictEqual(typeof offset, "number");
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      Error.captureStackTrace(this, this.constructor);
      Error.stackTraceLimit = tmp;
      this.offset = offset;
      this.buffer = buffer2;
    }
    util.inherits(ParserError, RedisError);
    Object.defineProperty(ParserError.prototype, "name", {
      value: "ParserError",
      configurable: true,
      writable: true
    });
    function ReplyError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      Error.captureStackTrace(this, this.constructor);
      Error.stackTraceLimit = tmp;
    }
    util.inherits(ReplyError, RedisError);
    Object.defineProperty(ReplyError.prototype, "name", {
      value: "ReplyError",
      configurable: true,
      writable: true
    });
    function AbortError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(AbortError, RedisError);
    Object.defineProperty(AbortError.prototype, "name", {
      value: "AbortError",
      configurable: true,
      writable: true
    });
    function InterruptError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(InterruptError, AbortError);
    Object.defineProperty(InterruptError.prototype, "name", {
      value: "InterruptError",
      configurable: true,
      writable: true
    });
    module.exports = {
      RedisError,
      ParserError,
      ReplyError,
      AbortError,
      InterruptError
    };
  }
});

// ../../node_modules/redis-errors/lib/modern.js
var require_modern = __commonJS({
  "../../node_modules/redis-errors/lib/modern.js"(exports, module) {
    "use strict";
    var assert = __require("assert");
    var RedisError = class extends Error {
      get name() {
        return this.constructor.name;
      }
    };
    var ParserError = class extends RedisError {
      constructor(message, buffer2, offset) {
        assert(buffer2);
        assert.strictEqual(typeof offset, "number");
        const tmp = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        super(message);
        Error.stackTraceLimit = tmp;
        this.offset = offset;
        this.buffer = buffer2;
      }
      get name() {
        return this.constructor.name;
      }
    };
    var ReplyError = class extends RedisError {
      constructor(message) {
        const tmp = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        super(message);
        Error.stackTraceLimit = tmp;
      }
      get name() {
        return this.constructor.name;
      }
    };
    var AbortError = class extends RedisError {
      get name() {
        return this.constructor.name;
      }
    };
    var InterruptError = class extends AbortError {
      get name() {
        return this.constructor.name;
      }
    };
    module.exports = {
      RedisError,
      ParserError,
      ReplyError,
      AbortError,
      InterruptError
    };
  }
});

// ../../node_modules/redis-errors/index.js
var require_redis_errors = __commonJS({
  "../../node_modules/redis-errors/index.js"(exports, module) {
    "use strict";
    var Errors2 = process.version.charCodeAt(1) < 55 && process.version.charCodeAt(2) === 46 ? require_old() : require_modern();
    module.exports = Errors2;
  }
});

// ../../node_modules/cluster-key-slot/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/cluster-key-slot/lib/index.js"(exports, module) {
    var lookup = [
      0,
      4129,
      8258,
      12387,
      16516,
      20645,
      24774,
      28903,
      33032,
      37161,
      41290,
      45419,
      49548,
      53677,
      57806,
      61935,
      4657,
      528,
      12915,
      8786,
      21173,
      17044,
      29431,
      25302,
      37689,
      33560,
      45947,
      41818,
      54205,
      50076,
      62463,
      58334,
      9314,
      13379,
      1056,
      5121,
      25830,
      29895,
      17572,
      21637,
      42346,
      46411,
      34088,
      38153,
      58862,
      62927,
      50604,
      54669,
      13907,
      9842,
      5649,
      1584,
      30423,
      26358,
      22165,
      18100,
      46939,
      42874,
      38681,
      34616,
      63455,
      59390,
      55197,
      51132,
      18628,
      22757,
      26758,
      30887,
      2112,
      6241,
      10242,
      14371,
      51660,
      55789,
      59790,
      63919,
      35144,
      39273,
      43274,
      47403,
      23285,
      19156,
      31415,
      27286,
      6769,
      2640,
      14899,
      10770,
      56317,
      52188,
      64447,
      60318,
      39801,
      35672,
      47931,
      43802,
      27814,
      31879,
      19684,
      23749,
      11298,
      15363,
      3168,
      7233,
      60846,
      64911,
      52716,
      56781,
      44330,
      48395,
      36200,
      40265,
      32407,
      28342,
      24277,
      20212,
      15891,
      11826,
      7761,
      3696,
      65439,
      61374,
      57309,
      53244,
      48923,
      44858,
      40793,
      36728,
      37256,
      33193,
      45514,
      41451,
      53516,
      49453,
      61774,
      57711,
      4224,
      161,
      12482,
      8419,
      20484,
      16421,
      28742,
      24679,
      33721,
      37784,
      41979,
      46042,
      49981,
      54044,
      58239,
      62302,
      689,
      4752,
      8947,
      13010,
      16949,
      21012,
      25207,
      29270,
      46570,
      42443,
      38312,
      34185,
      62830,
      58703,
      54572,
      50445,
      13538,
      9411,
      5280,
      1153,
      29798,
      25671,
      21540,
      17413,
      42971,
      47098,
      34713,
      38840,
      59231,
      63358,
      50973,
      55100,
      9939,
      14066,
      1681,
      5808,
      26199,
      30326,
      17941,
      22068,
      55628,
      51565,
      63758,
      59695,
      39368,
      35305,
      47498,
      43435,
      22596,
      18533,
      30726,
      26663,
      6336,
      2273,
      14466,
      10403,
      52093,
      56156,
      60223,
      64286,
      35833,
      39896,
      43963,
      48026,
      19061,
      23124,
      27191,
      31254,
      2801,
      6864,
      10931,
      14994,
      64814,
      60687,
      56684,
      52557,
      48554,
      44427,
      40424,
      36297,
      31782,
      27655,
      23652,
      19525,
      15522,
      11395,
      7392,
      3265,
      61215,
      65342,
      53085,
      57212,
      44955,
      49082,
      36825,
      40952,
      28183,
      32310,
      20053,
      24180,
      11923,
      16050,
      3793,
      7920
    ];
    var toUTF8Array = function toUTF8Array2(str) {
      var char;
      var i2 = 0;
      var p3 = 0;
      var utf8 = [];
      var len = str.length;
      for (; i2 < len; i2++) {
        char = str.charCodeAt(i2);
        if (char < 128) {
          utf8[p3++] = char;
        } else if (char < 2048) {
          utf8[p3++] = char >> 6 | 192;
          utf8[p3++] = char & 63 | 128;
        } else if ((char & 64512) === 55296 && i2 + 1 < str.length && (str.charCodeAt(i2 + 1) & 64512) === 56320) {
          char = 65536 + ((char & 1023) << 10) + (str.charCodeAt(++i2) & 1023);
          utf8[p3++] = char >> 18 | 240;
          utf8[p3++] = char >> 12 & 63 | 128;
          utf8[p3++] = char >> 6 & 63 | 128;
          utf8[p3++] = char & 63 | 128;
        } else {
          utf8[p3++] = char >> 12 | 224;
          utf8[p3++] = char >> 6 & 63 | 128;
          utf8[p3++] = char & 63 | 128;
        }
      }
      return utf8;
    };
    var generate = module.exports = function generate2(str) {
      var char;
      var i2 = 0;
      var start = -1;
      var result = 0;
      var resultHash = 0;
      var utf8 = typeof str === "string" ? toUTF8Array(str) : str;
      var len = utf8.length;
      while (i2 < len) {
        char = utf8[i2++];
        if (start === -1) {
          if (char === 123) {
            start = i2;
          }
        } else if (char !== 125) {
          resultHash = lookup[(char ^ resultHash >> 8) & 255] ^ resultHash << 8;
        } else if (i2 - 1 !== start) {
          return resultHash & 16383;
        }
        result = lookup[(char ^ result >> 8) & 255] ^ result << 8;
      }
      return result & 16383;
    };
    module.exports.generateMulti = function generateMulti(keys) {
      var i2 = 1;
      var len = keys.length;
      var base = generate(keys[0]);
      while (i2 < len) {
        if (generate(keys[i2++]) !== base) return -1;
      }
      return base;
    };
  }
});

// ../../node_modules/ioredis/built/utils/defaults.js
var require_defaults = __commonJS({
  "../../node_modules/ioredis/built/utils/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaults = void 0;
    var IS_UNSIGNED_INTEGER = /^(?:0|[1-9]\d*)$/;
    function isNil(value) {
      return value == null;
    }
    function eq(value, other) {
      return value === other || Number.isNaN(value) && Number.isNaN(other);
    }
    function isLength(value) {
      return Number.isSafeInteger(value) && value >= 0;
    }
    function isArrayLike(value) {
      return value != null && typeof value !== "function" && isLength(value.length);
    }
    function isObject(value) {
      return value !== null && (typeof value === "object" || typeof value === "function");
    }
    function isIndex(value, length = Number.MAX_SAFE_INTEGER) {
      switch (typeof value) {
        case "number":
          return Number.isInteger(value) && value >= 0 && value < length;
        case "symbol":
          return false;
        case "string":
          return IS_UNSIGNED_INTEGER.test(value);
      }
    }
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      if (typeof index === "number" && isArrayLike(object) && isIndex(index) && index < object.length || typeof index === "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    function defaults(object, ...sources) {
      object = Object(object);
      const objectProto = Object.prototype;
      let length = sources.length;
      const guard = length > 2 ? sources[2] : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
      }
      for (let i2 = 0; i2 < length; i2++) {
        if (isNil(sources[i2])) {
          continue;
        }
        const source = sources[i2];
        for (const key in source) {
          const value = object[key];
          if (value === void 0 || !objectProto.hasOwnProperty.call(object, key) && eq(value, objectProto[key])) {
            object[key] = source[key];
          }
        }
      }
      return object;
    }
    exports.defaults = defaults;
  }
});

// ../../node_modules/ioredis/built/utils/isArguments.js
var require_isArguments = __commonJS({
  "../../node_modules/ioredis/built/utils/isArguments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isArguments = void 0;
    function getTag(value) {
      if (value == null) {
        return value === void 0 ? "[object Undefined]" : "[object Null]";
      }
      return Object.prototype.toString.call(value);
    }
    function isArguments(value) {
      return value !== null && typeof value === "object" && getTag(value) === "[object Arguments]";
    }
    exports.isArguments = isArguments;
  }
});

// ../../node_modules/ioredis/built/utils/lodash.js
var require_lodash = __commonJS({
  "../../node_modules/ioredis/built/utils/lodash.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o2, m3, k2, k22) {
      if (k22 === void 0) k22 = k2;
      var desc = Object.getOwnPropertyDescriptor(m3, k2);
      if (!desc || ("get" in desc ? !m3.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m3[k2];
        } };
      }
      Object.defineProperty(o2, k22, desc);
    }) : (function(o2, m3, k2, k22) {
      if (k22 === void 0) k22 = k2;
      o2[k22] = m3[k2];
    }));
    var __exportStar = exports && exports.__exportStar || function(m3, exports2) {
      for (var p3 in m3) if (p3 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p3)) __createBinding(exports2, m3, p3);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noop = void 0;
    function noop3() {
    }
    exports.noop = noop3;
    __exportStar(require_defaults(), exports);
    __exportStar(require_isArguments(), exports);
  }
});

// ../../node_modules/ms/index.js
var require_ms = __commonJS({
  "../../node_modules/ms/index.js"(exports, module) {
    var s3 = 1e3;
    var m3 = s3 * 60;
    var h4 = m3 * 60;
    var d4 = h4 * 24;
    var w2 = d4 * 7;
    var y3 = d4 * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n2 = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n2 * y3;
        case "weeks":
        case "week":
        case "w":
          return n2 * w2;
        case "days":
        case "day":
        case "d":
          return n2 * d4;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n2 * h4;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n2 * m3;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n2 * s3;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n2;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d4) {
        return Math.round(ms / d4) + "d";
      }
      if (msAbs >= h4) {
        return Math.round(ms / h4) + "h";
      }
      if (msAbs >= m3) {
        return Math.round(ms / m3) + "m";
      }
      if (msAbs >= s3) {
        return Math.round(ms / s3) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d4) {
        return plural(ms, msAbs, d4, "day");
      }
      if (msAbs >= h4) {
        return plural(ms, msAbs, h4, "hour");
      }
      if (msAbs >= m3) {
        return plural(ms, msAbs, m3, "minute");
      }
      if (msAbs >= s3) {
        return plural(ms, msAbs, s3, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n2, name) {
      var isPlural = msAbs >= n2 * 1.5;
      return Math.round(ms / n2) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// ../../node_modules/debug/src/common.js
var require_common = __commonJS({
  "../../node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i2 = 0; i2 < namespace.length; i2++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i2);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v3) => {
            enableOverride = v3;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// ../../node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "../../node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m3;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m3 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m3[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c3 = "color: " + this.color;
      args.splice(1, 0, c3, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c3);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r2;
      try {
        r2 = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v3) {
      try {
        return JSON.stringify(v3);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// ../../../../node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "../../../../node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    module.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// ../../../../node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../../../node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    var os2 = __require("os");
    var tty = __require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os2.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// ../../node_modules/debug/src/node.js
var require_node = __commonJS({
  "../../node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_2, k2) => {
        return k2.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c3 = this.color;
        const colorCode = "\x1B[3" + (c3 < 8 ? c3 : "8;5;" + c3);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i2 = 0; i2 < keys.length; i2++) {
        debug.inspectOpts[keys[i2]] = exports.inspectOpts[keys[i2]];
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v3) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v3, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v3) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v3, this.inspectOpts);
    };
  }
});

// ../../node_modules/debug/src/index.js
var require_src = __commonJS({
  "../../node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// ../../node_modules/ioredis/built/utils/debug.js
var require_debug = __commonJS({
  "../../node_modules/ioredis/built/utils/debug.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.genRedactedString = exports.getStringValue = exports.MAX_ARGUMENT_LENGTH = void 0;
    var debug_1 = require_src();
    var MAX_ARGUMENT_LENGTH = 200;
    exports.MAX_ARGUMENT_LENGTH = MAX_ARGUMENT_LENGTH;
    var NAMESPACE_PREFIX = "ioredis";
    function getStringValue(v3) {
      if (v3 === null) {
        return;
      }
      switch (typeof v3) {
        case "boolean":
          return;
        case "number":
          return;
        case "object":
          if (Buffer.isBuffer(v3)) {
            return v3.toString("hex");
          }
          if (Array.isArray(v3)) {
            return v3.join(",");
          }
          try {
            return JSON.stringify(v3);
          } catch (e2) {
            return;
          }
        case "string":
          return v3;
      }
    }
    exports.getStringValue = getStringValue;
    function genRedactedString(str, maxLen) {
      const { length } = str;
      return length <= maxLen ? str : str.slice(0, maxLen) + ' ... <REDACTED full-length="' + length + '">';
    }
    exports.genRedactedString = genRedactedString;
    function genDebugFunction(namespace) {
      const fn = (0, debug_1.default)(`${NAMESPACE_PREFIX}:${namespace}`);
      function wrappedDebug(...args) {
        if (!fn.enabled) {
          return;
        }
        for (let i2 = 1; i2 < args.length; i2++) {
          const str = getStringValue(args[i2]);
          if (typeof str === "string" && str.length > MAX_ARGUMENT_LENGTH) {
            args[i2] = genRedactedString(str, MAX_ARGUMENT_LENGTH);
          }
        }
        return fn.apply(null, args);
      }
      Object.defineProperties(wrappedDebug, {
        namespace: {
          get() {
            return fn.namespace;
          }
        },
        enabled: {
          get() {
            return fn.enabled;
          }
        },
        destroy: {
          get() {
            return fn.destroy;
          }
        },
        log: {
          get() {
            return fn.log;
          },
          set(l3) {
            fn.log = l3;
          }
        }
      });
      return wrappedDebug;
    }
    exports.default = genDebugFunction;
  }
});

// ../../node_modules/ioredis/built/constants/TLSProfiles.js
var require_TLSProfiles = __commonJS({
  "../../node_modules/ioredis/built/constants/TLSProfiles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RedisCloudCA = `-----BEGIN CERTIFICATE-----
MIIDTzCCAjegAwIBAgIJAKSVpiDswLcwMA0GCSqGSIb3DQEBBQUAMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTAeFw0xMzEwMDExMjE0NTVaFw0yMzA5MjkxMjE0NTVaMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALZqkh/DczWP
JnxnHLQ7QL0T4B4CDKWBKCcisriGbA6ZePWVNo4hfKQC6JrzfR+081NeD6VcWUiz
rmd+jtPhIY4c+WVQYm5PKaN6DT1imYdxQw7aqO5j2KUCEh/cznpLxeSHoTxlR34E
QwF28Wl3eg2vc5ct8LjU3eozWVk3gb7alx9mSA2SgmuX5lEQawl++rSjsBStemY2
BDwOpAMXIrdEyP/cVn8mkvi/BDs5M5G+09j0gfhyCzRWMQ7Hn71u1eolRxwVxgi3
TMn+/vTaFSqxKjgck6zuAYjBRPaHe7qLxHNr1So/Mc9nPy+3wHebFwbIcnUojwbp
4nctkWbjb2cCAwEAAaNQME4wHQYDVR0OBBYEFP1whtcrydmW3ZJeuSoKZIKjze3w
MB8GA1UdIwQYMBaAFP1whtcrydmW3ZJeuSoKZIKjze3wMAwGA1UdEwQFMAMBAf8w
DQYJKoZIhvcNAQEFBQADggEBAG2erXhwRAa7+ZOBs0B6X57Hwyd1R4kfmXcs0rta
lbPpvgULSiB+TCbf3EbhJnHGyvdCY1tvlffLjdA7HJ0PCOn+YYLBA0pTU/dyvrN6
Su8NuS5yubnt9mb13nDGYo1rnt0YRfxN+8DM3fXIVr038A30UlPX2Ou1ExFJT0MZ
uFKY6ZvLdI6/1cbgmguMlAhM+DhKyV6Sr5699LM3zqeI816pZmlREETYkGr91q7k
BpXJu/dtHaGxg1ZGu6w/PCsYGUcECWENYD4VQPd8N32JjOfu6vEgoEAwfPP+3oGp
Z4m3ewACcWOAenqflb+cQYC4PsF7qbXDmRaWrbKntOlZ3n0=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIGMTCCBBmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwajELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJzMS0w
KwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcN
MTgwMjI1MTUzNzM3WhcNMjgwMjIzMTUzNzM3WjBfMQswCQYDVQQGEwJVUzELMAkG
A1UECAwCQ0ExEjAQBgNVBAoMCVJlZGlzTGFiczEvMC0GA1UEAwwmUkNQIEludGVy
bWVkaWF0ZSBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA
A4ICDwAwggIKAoICAQDf9dqbxc8Bq7Ctq9rWcxrGNKKHivqLAFpPq02yLPx6fsOv
Tq7GsDChAYBBc4v7Y2Ap9RD5Vs3dIhEANcnolf27QwrG9RMnnvzk8pCvp1o6zSU4
VuOE1W66/O1/7e2rVxyrnTcP7UgK43zNIXu7+tiAqWsO92uSnuMoGPGpeaUm1jym
hjWKtkAwDFSqvHY+XL5qDVBEjeUe+WHkYUg40cAXjusAqgm2hZt29c2wnVrxW25W
P0meNlzHGFdA2AC5z54iRiqj57dTfBTkHoBczQxcyw6hhzxZQ4e5I5zOKjXXEhZN
r0tA3YC14CTabKRus/JmZieyZzRgEy2oti64tmLYTqSlAD78pRL40VNoaSYetXLw
hhNsXCHgWaY6d5bLOc/aIQMAV5oLvZQKvuXAF1IDmhPA+bZbpWipp0zagf1P1H3s
UzsMdn2KM0ejzgotbtNlj5TcrVwpmvE3ktvUAuA+hi3FkVx1US+2Gsp5x4YOzJ7u
P1WPk6ShF0JgnJH2ILdj6kttTWwFzH17keSFICWDfH/+kM+k7Y1v3EXMQXE7y0T9
MjvJskz6d/nv+sQhY04xt64xFMGTnZjlJMzfQNi7zWFLTZnDD0lPowq7l3YiPoTT
t5Xky83lu0KZsZBo0WlWaDG00gLVdtRgVbcuSWxpi5BdLb1kRab66JptWjxwXQID
AQABo4HrMIHoMDoGA1UdHwQzMDEwL6AtoCuGKWh0dHBzOi8vcmwtY2Etc2VydmVy
LnJlZGlzbGFicy5jb20vdjEvY3JsMEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcw
AYYqaHR0cHM6Ly9ybC1jYS1zZXJ2ZXIucmVkaXNsYWJzLmNvbS92MS9vY3NwMB0G
A1UdDgQWBBQHar5OKvQUpP2qWt6mckzToeCOHDAfBgNVHSMEGDAWgBQi42wH6hM4
L2sujEvLM0/u8lRXTzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIB
hjANBgkqhkiG9w0BAQsFAAOCAgEAirEn/iTsAKyhd+pu2W3Z5NjCko4NPU0EYUbr
AP7+POK2rzjIrJO3nFYQ/LLuC7KCXG+2qwan2SAOGmqWst13Y+WHp44Kae0kaChW
vcYLXXSoGQGC8QuFSNUdaeg3RbMDYFT04dOkqufeWVccoHVxyTSg9eD8LZuHn5jw
7QDLiEECBmIJHk5Eeo2TAZrx4Yx6ufSUX5HeVjlAzqwtAqdt99uCJ/EL8bgpWbe+
XoSpvUv0SEC1I1dCAhCKAvRlIOA6VBcmzg5Am12KzkqTul12/VEFIgzqu0Zy2Jbc
AUPrYVu/+tOGXQaijy7YgwH8P8n3s7ZeUa1VABJHcxrxYduDDJBLZi+MjheUDaZ1
jQRHYevI2tlqeSBqdPKG4zBY5lS0GiAlmuze5oENt0P3XboHoZPHiqcK3VECgTVh
/BkJcuudETSJcZDmQ8YfoKfBzRQNg2sv/hwvUv73Ss51Sco8GEt2lD8uEdib1Q6z
zDT5lXJowSzOD5ZA9OGDjnSRL+2riNtKWKEqvtEG3VBJoBzu9GoxbAc7wIZLxmli
iF5a/Zf5X+UXD3s4TMmy6C4QZJpAA2egsSQCnraWO2ULhh7iXMysSkF/nzVfZn43
iqpaB8++9a37hWq14ZmOv0TJIDz//b2+KC4VFXWQ5W5QC6whsjT+OlG4p5ZYG0jo
616pxqo=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFujCCA6KgAwIBAgIJAJ1aTT1lu2ScMA0GCSqGSIb3DQEBCwUAMGoxCzAJBgNV
BAYTAlVTMQswCQYDVQQIDAJDQTELMAkGA1UEBwwCQ0ExEjAQBgNVBAoMCVJlZGlz
TGFiczEtMCsGA1UEAwwkUmVkaXNMYWJzIFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MB4XDTE4MDIyNTE1MjA0MloXDTM4MDIyMDE1MjA0MlowajELMAkGA1UEBhMC
VVMxCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJz
MS0wKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkw
ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLEjXy7YrbN5Waau5cd6g1
G5C2tMmeTpZ0duFAPxNU4oE3RHS5gGiok346fUXuUxbZ6QkuzeN2/2Z+RmRcJhQY
Dm0ZgdG4x59An1TJfnzKKoWj8ISmoHS/TGNBdFzXV7FYNLBuqZouqePI6ReC6Qhl
pp45huV32Q3a6IDrrvx7Wo5ZczEQeFNbCeCOQYNDdTmCyEkHqc2AGo8eoIlSTutT
ULOC7R5gzJVTS0e1hesQ7jmqHjbO+VQS1NAL4/5K6cuTEqUl+XhVhPdLWBXJQ5ag
54qhX4v+ojLzeU1R/Vc6NjMvVtptWY6JihpgplprN0Yh2556ewcXMeturcKgXfGJ
xeYzsjzXerEjrVocX5V8BNrg64NlifzTMKNOOv4fVZszq1SIHR8F9ROrqiOdh8iC
JpUbLpXH9hWCSEO6VRMB2xJoKu3cgl63kF30s77x7wLFMEHiwsQRKxooE1UhgS9K
2sO4TlQ1eWUvFvHSTVDQDlGQ6zu4qjbOpb3Q8bQwoK+ai2alkXVR4Ltxe9QlgYK3
StsnPhruzZGA0wbXdpw0bnM+YdlEm5ffSTpNIfgHeaa7Dtb801FtA71ZlH7A6TaI
SIQuUST9EKmv7xrJyx0W1pGoPOLw5T029aTjnICSLdtV9bLwysrLhIYG5bnPq78B
cS+jZHFGzD7PUVGQD01nOQIDAQABo2MwYTAdBgNVHQ4EFgQUIuNsB+oTOC9rLoxL
yzNP7vJUV08wHwYDVR0jBBgwFoAUIuNsB+oTOC9rLoxLyzNP7vJUV08wDwYDVR0T
AQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggIBAHfg
z5pMNUAKdMzK1aS1EDdK9yKz4qicILz5czSLj1mC7HKDRy8cVADUxEICis++CsCu
rYOvyCVergHQLREcxPq4rc5Nq1uj6J6649NEeh4WazOOjL4ZfQ1jVznMbGy+fJm3
3Hoelv6jWRG9iqeJZja7/1s6YC6bWymI/OY1e4wUKeNHAo+Vger7MlHV+RuabaX+
hSJ8bJAM59NCM7AgMTQpJCncrcdLeceYniGy5Q/qt2b5mJkQVkIdy4TPGGB+AXDJ
D0q3I/JDRkDUFNFdeW0js7fHdsvCR7O3tJy5zIgEV/o/BCkmJVtuwPYOrw/yOlKj
TY/U7ATAx9VFF6/vYEOMYSmrZlFX+98L6nJtwDqfLB5VTltqZ4H/KBxGE3IRSt9l
FXy40U+LnXzhhW+7VBAvyYX8GEXhHkKU8Gqk1xitrqfBXY74xKgyUSTolFSfFVgj
mcM/X4K45bka+qpkj7Kfv/8D4j6aZekwhN2ly6hhC1SmQ8qjMjpG/mrWOSSHZFmf
ybu9iD2AYHeIOkshIl6xYIa++Q/00/vs46IzAbQyriOi0XxlSMMVtPx0Q3isp+ji
n8Mq9eOuxYOEQ4of8twUkUDd528iwGtEdwf0Q01UyT84S62N8AySl1ZBKXJz6W4F
UhWfa/HQYOAPDdEjNgnVwLI23b8t0TozyCWw7q8h
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIEjzCCA3egAwIBAgIQe55B/ALCKJDZtdNT8kD6hTANBgkqhkiG9w0BAQsFADBM
MSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xv
YmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0yMjAxMjYxMjAwMDBaFw0y
NTAxMjYwMDAwMDBaMFgxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
IG52LXNhMS4wLAYDVQQDEyVHbG9iYWxTaWduIEF0bGFzIFIzIE9WIFRMUyBDQSAy
MDIyIFEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmGmg1LW9b7Lf
8zDD83yBDTEkt+FOxKJZqF4veWc5KZsQj9HfnUS2e5nj/E+JImlGPsQuoiosLuXD
BVBNAMcUFa11buFMGMeEMwiTmCXoXRrXQmH0qjpOfKgYc5gHG3BsRGaRrf7VR4eg
ofNMG9wUBw4/g/TT7+bQJdA4NfE7Y4d5gEryZiBGB/swaX6Jp/8MF4TgUmOWmalK
dZCKyb4sPGQFRTtElk67F7vU+wdGcrcOx1tDcIB0ncjLPMnaFicagl+daWGsKqTh
counQb6QJtYHa91KvCfKWocMxQ7OIbB5UARLPmC4CJ1/f8YFm35ebfzAeULYdGXu
jE9CLor0OwIDAQABo4IBXzCCAVswDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG
CCsGAQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW
BBSH5Zq7a7B/t95GfJWkDBpA8HHqdjAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj
move4t0bvDB7BggrBgEFBQcBAQRvMG0wLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3Nw
Mi5nbG9iYWxzaWduLmNvbS9yb290cjMwOwYIKwYBBQUHMAKGL2h0dHA6Ly9zZWN1
cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L3Jvb3QtcjMuY3J0MDYGA1UdHwQvMC0w
K6ApoCeGJWh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vcm9vdC1yMy5jcmwwIQYD
VR0gBBowGDAIBgZngQwBAgIwDAYKKwYBBAGgMgoBAjANBgkqhkiG9w0BAQsFAAOC
AQEAKRic9/f+nmhQU/wz04APZLjgG5OgsuUOyUEZjKVhNGDwxGTvKhyXGGAMW2B/
3bRi+aElpXwoxu3pL6fkElbX3B0BeS5LoDtxkyiVEBMZ8m+sXbocwlPyxrPbX6mY
0rVIvnuUeBH8X0L5IwfpNVvKnBIilTbcebfHyXkPezGwz7E1yhUULjJFm2bt0SdX
y+4X/WeiiYIv+fTVgZZgl+/2MKIsu/qdBJc3f3TvJ8nz+Eax1zgZmww+RSQWeOj3
15Iw6Z5FX+NwzY/Ab+9PosR5UosSeq+9HhtaxZttXG1nVh+avYPGYddWmiMT90J5
ZgKnO/Fx2hBgTxhOTMYaD312kg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----`;
    var TLSProfiles = {
      RedisCloudFixed: { ca: RedisCloudCA },
      RedisCloudFlexible: { ca: RedisCloudCA }
    };
    exports.default = TLSProfiles;
  }
});

// ../../node_modules/ioredis/built/utils/index.js
var require_utils2 = __commonJS({
  "../../node_modules/ioredis/built/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noop = exports.isArguments = exports.defaults = exports.Debug = exports.zipMap = exports.isResp2SubscriberMode = exports.CONNECTION_CLOSED_ERROR_MSG = exports.shuffle = exports.sample = exports.resolveTLSProfile = exports.parseURL = exports.optimizeErrorStack = exports.toArg = exports.convertMapToArray = exports.convertObjectToArray = exports.timeout = exports.packObject = exports.isInt = exports.wrapMultiResult = exports.convertBufferToString = void 0;
    var lodash_1 = require_lodash();
    Object.defineProperty(exports, "defaults", { enumerable: true, get: function() {
      return lodash_1.defaults;
    } });
    Object.defineProperty(exports, "isArguments", { enumerable: true, get: function() {
      return lodash_1.isArguments;
    } });
    Object.defineProperty(exports, "noop", { enumerable: true, get: function() {
      return lodash_1.noop;
    } });
    var debug_1 = require_debug();
    exports.Debug = debug_1.default;
    var TLSProfiles_1 = require_TLSProfiles();
    function convertBufferToString(value, encoding) {
      if (value instanceof Buffer) {
        return value.toString(encoding);
      }
      if (Array.isArray(value)) {
        const length = value.length;
        const res = Array(length);
        for (let i2 = 0; i2 < length; ++i2) {
          res[i2] = value[i2] instanceof Buffer && encoding === "utf8" ? value[i2].toString() : convertBufferToString(value[i2], encoding);
        }
        return res;
      }
      if (isPlainObject(value)) {
        const keys = Object.keys(value);
        const res = {};
        for (const element of keys) {
          const item = value[element];
          const converted = item instanceof Buffer && encoding === "utf8" ? item.toString() : convertBufferToString(item, encoding);
          if (element === "__proto__" || element === "constructor") {
            Object.defineProperty(res, element, {
              value: converted,
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            res[element] = converted;
          }
        }
        return res;
      }
      return value;
    }
    exports.convertBufferToString = convertBufferToString;
    function isPlainObject(value) {
      if (value === null || typeof value !== "object") {
        return false;
      }
      const proto = Object.getPrototypeOf(value);
      return proto === Object.prototype || proto === null;
    }
    function wrapMultiResult(arr) {
      if (!arr) {
        return null;
      }
      const result = [];
      const length = arr.length;
      for (let i2 = 0; i2 < length; ++i2) {
        const item = arr[i2];
        if (item instanceof Error) {
          result.push([item]);
        } else {
          result.push([null, item]);
        }
      }
      return result;
    }
    exports.wrapMultiResult = wrapMultiResult;
    function isInt(value) {
      const x4 = parseFloat(value);
      return !isNaN(value) && (x4 | 0) === x4;
    }
    exports.isInt = isInt;
    function packObject(array) {
      const result = {};
      const length = array.length;
      for (let i2 = 1; i2 < length; i2 += 2) {
        result[array[i2 - 1]] = array[i2];
      }
      return result;
    }
    exports.packObject = packObject;
    function timeout(callback, timeout2) {
      let timer2 = null;
      const run = function() {
        if (timer2) {
          clearTimeout(timer2);
          timer2 = null;
          callback.apply(this, arguments);
        }
      };
      timer2 = setTimeout(run, timeout2, new Error("timeout"));
      return run;
    }
    exports.timeout = timeout;
    function convertObjectToArray(obj) {
      const result = [];
      const keys = Object.keys(obj);
      for (let i2 = 0, l3 = keys.length; i2 < l3; i2++) {
        result.push(keys[i2], obj[keys[i2]]);
      }
      return result;
    }
    exports.convertObjectToArray = convertObjectToArray;
    function convertMapToArray(map) {
      const result = [];
      let pos = 0;
      map.forEach(function(value, key) {
        result[pos] = key;
        result[pos + 1] = value;
        pos += 2;
      });
      return result;
    }
    exports.convertMapToArray = convertMapToArray;
    function toArg(arg) {
      if (arg === null || typeof arg === "undefined") {
        return "";
      }
      if (typeof arg === "number" && Number.isInteger(arg) && !Number.isSafeInteger(arg)) {
        return BigInt(arg).toString();
      }
      return String(arg);
    }
    exports.toArg = toArg;
    function optimizeErrorStack(error, friendlyStack, filterPath) {
      const stacks = friendlyStack.split("\n");
      let lines = "";
      let i2;
      for (i2 = 1; i2 < stacks.length; ++i2) {
        if (stacks[i2].indexOf(filterPath) === -1) {
          break;
        }
      }
      for (let j2 = i2; j2 < stacks.length; ++j2) {
        lines += "\n" + stacks[j2];
      }
      if (error.stack) {
        const pos = error.stack.indexOf("\n");
        error.stack = error.stack.slice(0, pos) + lines;
      }
      return error;
    }
    exports.optimizeErrorStack = optimizeErrorStack;
    function parseURL(url) {
      if (isInt(url)) {
        return { port: url };
      }
      const rawUrl = url;
      const hasProtocol = /^rediss?:\/\//i.test(rawUrl);
      const isProtocolRelative = rawUrl.startsWith("//");
      if (rawUrl[0] === "/" && !isProtocolRelative) {
        const qIdx = rawUrl.indexOf("?");
        const result2 = {
          path: qIdx === -1 ? rawUrl : rawUrl.slice(0, qIdx)
        };
        if (qIdx !== -1) {
          const options2 = {};
          const params = new URLSearchParams(rawUrl.slice(qIdx + 1));
          params.forEach((value, key) => {
            options2[key] = parseURLQueryItem(key, value);
          });
          (0, lodash_1.defaults)(result2, options2);
        }
        return result2;
      }
      let parsed;
      if (hasProtocol) {
        parsed = new URL(rawUrl);
      } else if (isProtocolRelative) {
        parsed = new URL("redis:" + rawUrl);
      } else {
        parsed = new URL("redis://" + rawUrl);
      }
      const options = {};
      parsed.searchParams.forEach((value, key) => {
        options[key] = parseURLQueryItem(key, value);
      });
      const result = {};
      if (parsed.username || parsed.password) {
        result.username = decodeURIComponent(parsed.username);
        result.password = decodeURIComponent(parsed.password);
      }
      if (parsed.pathname && parsed.pathname !== "/") {
        if (hasProtocol || isProtocolRelative) {
          if (parsed.pathname.length > 1) {
            result.db = parsed.pathname.slice(1);
          }
        } else {
          result.path = parsed.pathname;
        }
      }
      if (parsed.hostname) {
        result.host = parsed.hostname.replace(/^\[|\]$/g, "");
      }
      if (parsed.port) {
        result.port = parsed.port;
      }
      (0, lodash_1.defaults)(result, options);
      return result;
    }
    exports.parseURL = parseURL;
    function parseURLQueryItem(key, value) {
      if (key === "family") {
        const intFamily = Number.parseInt(value, 10);
        if (!Number.isNaN(intFamily)) {
          return intFamily;
        }
      }
      return value;
    }
    function resolveTLSProfile(options) {
      let tls2 = options?.tls;
      if (typeof tls2 === "string")
        tls2 = { profile: tls2 };
      const profile = TLSProfiles_1.default[tls2?.profile];
      if (profile) {
        tls2 = Object.assign({}, profile, tls2);
        delete tls2.profile;
        options = Object.assign({}, options, { tls: tls2 });
      }
      return options;
    }
    exports.resolveTLSProfile = resolveTLSProfile;
    function sample(array, from = 0) {
      const length = array.length;
      if (from >= length) {
        return null;
      }
      return array[from + Math.floor(Math.random() * (length - from))];
    }
    exports.sample = sample;
    function shuffle(array) {
      let counter = array.length;
      while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
        [array[counter], array[index]] = [array[index], array[counter]];
      }
      return array;
    }
    exports.shuffle = shuffle;
    exports.CONNECTION_CLOSED_ERROR_MSG = "Connection is closed.";
    function isResp2SubscriberMode(condition) {
      return Boolean(condition?.subscriber) && condition?.protocol !== 3;
    }
    exports.isResp2SubscriberMode = isResp2SubscriberMode;
    function zipMap(keys, values2) {
      const map = /* @__PURE__ */ new Map();
      keys.forEach((key, index) => {
        map.set(key, values2[index]);
      });
      return map;
    }
    exports.zipMap = zipMap;
  }
});

// ../../node_modules/ioredis/built/utils/argumentParsers.js
var require_argumentParsers = __commonJS({
  "../../node_modules/ioredis/built/utils/argumentParsers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseBlockOption = exports.parseSecondsArgument = void 0;
    var parseNumberArgument = (arg) => {
      if (typeof arg === "number") {
        return arg;
      }
      if (Buffer.isBuffer(arg)) {
        return parseNumberArgument(arg.toString());
      }
      if (typeof arg === "string") {
        const value = Number(arg);
        return Number.isFinite(value) ? value : void 0;
      }
      return void 0;
    };
    var parseStringArgument = (arg) => {
      if (typeof arg === "string") {
        return arg;
      }
      if (Buffer.isBuffer(arg)) {
        return arg.toString();
      }
      return void 0;
    };
    var parseSecondsArgument = (arg) => {
      const value = parseNumberArgument(arg);
      if (value === void 0) {
        return void 0;
      }
      if (value <= 0) {
        return 0;
      }
      return value * 1e3;
    };
    exports.parseSecondsArgument = parseSecondsArgument;
    var parseBlockOption = (args) => {
      for (let i2 = 0; i2 < args.length; i2++) {
        const token = parseStringArgument(args[i2]);
        if (token && token.toLowerCase() === "block") {
          const duration = parseNumberArgument(args[i2 + 1]);
          if (duration === void 0) {
            return void 0;
          }
          if (duration <= 0) {
            return 0;
          }
          return duration;
        }
      }
      return null;
    };
    exports.parseBlockOption = parseBlockOption;
  }
});

// ../../node_modules/ioredis/built/replyTransformers.js
var require_replyTransformers = __commonJS({
  "../../node_modules/ioredis/built/replyTransformers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sortedSetWithScorePairCommands = exports.transformStreamReadReply = exports.transformPairReply = exports.transformVsimReply = exports.wrapStreamMapPairs = exports.flattenNestedArrayItems = exports.passthroughReplyTransformer = void 0;
    var passthroughReplyTransformer = function(result) {
      return result;
    };
    exports.passthroughReplyTransformer = passthroughReplyTransformer;
    var flattenNestedArrayItems = function(result) {
      if (!Array.isArray(result)) {
        return result;
      }
      let flat = null;
      for (let i2 = 0; i2 < result.length; i2++) {
        const item = result[i2];
        if (Array.isArray(item)) {
          if (!flat) {
            flat = result.slice(0, i2);
          }
          flat.push(...item);
        } else if (flat) {
          flat.push(item);
        }
      }
      return flat ?? result;
    };
    exports.flattenNestedArrayItems = flattenNestedArrayItems;
    var flattenPairTransformers = {
      2: {
        legacy: exports.passthroughReplyTransformer,
        resp3: exports.passthroughReplyTransformer
      },
      3: {
        legacy: exports.flattenNestedArrayItems,
        resp3: exports.passthroughReplyTransformer
      }
    };
    var vsimTransformers = {
      2: {
        legacy: exports.flattenNestedArrayItems,
        resp3: exports.passthroughReplyTransformer
      },
      3: {
        legacy: exports.flattenNestedArrayItems,
        resp3: exports.passthroughReplyTransformer
      }
    };
    var wrapStreamMapPairs = function(result) {
      if (!Array.isArray(result)) {
        return result;
      }
      const wrapped = [];
      for (let i2 = 0; i2 < result.length; i2 += 2) {
        wrapped.push([result[i2], result[i2 + 1]]);
      }
      return wrapped;
    };
    exports.wrapStreamMapPairs = wrapStreamMapPairs;
    var streamReadTransformers = {
      2: {
        legacy: exports.passthroughReplyTransformer,
        resp3: exports.passthroughReplyTransformer
      },
      3: {
        legacy: exports.wrapStreamMapPairs,
        resp3: exports.passthroughReplyTransformer
      }
    };
    var transformVsimReply = function(result, context) {
      return vsimTransformers[context.protocol][context.replyMapping](result, context);
    };
    exports.transformVsimReply = transformVsimReply;
    var transformPairReply = function(result, context) {
      return flattenPairTransformers[context.protocol][context.replyMapping](result, context);
    };
    exports.transformPairReply = transformPairReply;
    var transformStreamReadReply = function(result, context) {
      return streamReadTransformers[context.protocol][context.replyMapping](result, context);
    };
    exports.transformStreamReadReply = transformStreamReadReply;
    exports.sortedSetWithScorePairCommands = [
      "zdiff",
      "zinter",
      "zpopmax",
      "zpopmin",
      "zunion",
      "zrandmember",
      "zrange",
      "zrangebyscore",
      "zrevrange",
      "zrevrangebyscore"
    ];
  }
});

// ../../node_modules/ioredis/built/Command.js
var require_Command = __commonJS({
  "../../node_modules/ioredis/built/Command.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_built();
    var calculateSlot = require_lib();
    var standard_as_callback_1 = require_built2();
    var utils_1 = require_utils2();
    var argumentParsers_1 = require_argumentParsers();
    var replyTransformers_1 = require_replyTransformers();
    var Command = class _Command {
      /**
       * Check whether the command has the flag
       */
      static checkFlag(flagName, commandName) {
        commandName = commandName.toLowerCase();
        return !!this.getFlagMap()[flagName][commandName];
      }
      static setArgumentTransformer(name, func) {
        this._transformer.argument[name] = func;
      }
      static setReplyTransformer(name, func) {
        this._transformer.reply[name] = func;
      }
      static getFlagMap() {
        if (!this.flagMap) {
          this.flagMap = Object.keys(_Command.FLAGS).reduce((map, flagName) => {
            map[flagName] = {};
            _Command.FLAGS[flagName].forEach((commandName) => {
              map[flagName][commandName] = true;
            });
            return map;
          }, {});
        }
        return this.flagMap;
      }
      /**
       * Creates an instance of Command.
       * @param name Command name
       * @param args An array of command arguments
       * @param options
       * @param callback The callback that handles the response.
       * If omit, the response will be handled via Promise
       */
      constructor(name, args = [], options = {}, callback) {
        this.name = name;
        this.inTransaction = false;
        this.isTraced = false;
        this.isResolved = false;
        this.isSettled = false;
        this.transformed = false;
        this.replyEncoding = options.replyEncoding;
        this.protocol = 2;
        this.replyMapping = "legacy";
        this.errorStack = options.errorStack;
        this.args = args.flat();
        this.callback = callback;
        this.initPromise();
        if (options.keyPrefix) {
          const isBufferKeyPrefix = options.keyPrefix instanceof Buffer;
          let keyPrefixBuffer = isBufferKeyPrefix ? options.keyPrefix : null;
          this._iterateKeys((key) => {
            if (key instanceof Buffer) {
              if (keyPrefixBuffer === null) {
                keyPrefixBuffer = Buffer.from(options.keyPrefix);
              }
              return Buffer.concat([keyPrefixBuffer, key]);
            } else if (isBufferKeyPrefix) {
              return Buffer.concat([options.keyPrefix, Buffer.from(String(key))]);
            }
            return options.keyPrefix + key;
          });
        }
        if (options.readOnly) {
          this.isReadOnly = true;
        }
      }
      getSlot() {
        if (typeof this.slot === "undefined") {
          const key = this.getKeys()[0];
          this.slot = key == null ? null : calculateSlot(key);
        }
        return this.slot;
      }
      getKeys() {
        return this._iterateKeys();
      }
      setReplyContext(context) {
        this.protocol = context?.protocol ?? 2;
        this.replyMapping = context?.replyMapping ?? "legacy";
      }
      /**
       * Convert command to writable buffer or string
       */
      toWritable(_socket) {
        let result;
        const commandStr = "*" + (this.args.length + 1) + "\r\n$" + Buffer.byteLength(this.name) + "\r\n" + this.name + "\r\n";
        if (this.bufferMode) {
          const buffers = new MixedBuffers();
          buffers.push(commandStr);
          for (let i2 = 0; i2 < this.args.length; ++i2) {
            const arg = this.args[i2];
            if (arg instanceof Buffer) {
              if (arg.length === 0) {
                buffers.push("$0\r\n\r\n");
              } else {
                buffers.push("$" + arg.length + "\r\n");
                buffers.push(arg);
                buffers.push("\r\n");
              }
            } else {
              buffers.push("$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n");
            }
          }
          result = buffers.toBuffer();
        } else {
          result = commandStr;
          for (let i2 = 0; i2 < this.args.length; ++i2) {
            const arg = this.args[i2];
            result += "$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n";
          }
        }
        return result;
      }
      stringifyArguments() {
        for (let i2 = 0; i2 < this.args.length; ++i2) {
          const arg = this.args[i2];
          if (typeof arg === "string") {
          } else if (arg instanceof Buffer) {
            this.bufferMode = true;
          } else {
            this.args[i2] = (0, utils_1.toArg)(arg);
          }
        }
      }
      /**
       * Convert buffer/buffer[] to string/string[],
       * and apply reply transformer.
       */
      transformReply(result) {
        if (this.replyEncoding) {
          result = (0, utils_1.convertBufferToString)(result, this.replyEncoding);
        }
        const transformer = _Command._transformer.reply[this.name];
        if (transformer) {
          result = transformer(result, {
            commandName: this.name,
            protocol: this.protocol,
            replyMapping: this.replyMapping
          });
        }
        return result;
      }
      /**
       * Set the wait time before terminating the attempt to execute a command
       * and generating an error.
       */
      setTimeout(ms) {
        if (!this._commandTimeoutTimer) {
          this._commandTimeoutTimer = setTimeout(() => {
            if (!this.isSettled) {
              this.reject(new Error("Command timed out"));
            }
          }, ms);
        }
      }
      /**
       * Set a timeout for blocking commands.
       * When the timeout expires, the command resolves with null (matching Redis behavior).
       * This handles the case of undetectable network failures (e.g., docker network disconnect)
       * where the TCP connection becomes a zombie and no close event fires.
       */
      setBlockingTimeout(ms) {
        if (ms <= 0) {
          return;
        }
        if (this._blockingTimeoutTimer) {
          clearTimeout(this._blockingTimeoutTimer);
          this._blockingTimeoutTimer = void 0;
        }
        const now = Date.now();
        if (this._blockingDeadline === void 0) {
          this._blockingDeadline = now + ms;
        }
        const remaining = this._blockingDeadline - now;
        if (remaining <= 0) {
          this.resolve(null);
          return;
        }
        this._blockingTimeoutTimer = setTimeout(() => {
          if (this.isSettled) {
            this._blockingTimeoutTimer = void 0;
            return;
          }
          this._blockingTimeoutTimer = void 0;
          this.resolve(null);
        }, remaining);
      }
      /**
       * Extract the blocking timeout from the command arguments.
       *
       * @returns The timeout in seconds, null for indefinite blocking (timeout of 0),
       *          or undefined if this is not a blocking command
       */
      extractBlockingTimeout() {
        const args = this.args;
        if (!args || args.length === 0) {
          return void 0;
        }
        const name = this.name.toLowerCase();
        if (name === "blmovem") {
          return (0, argumentParsers_1.parseSecondsArgument)(args[4]);
        }
        if (_Command.checkFlag("LAST_ARG_TIMEOUT_COMMANDS", name)) {
          return (0, argumentParsers_1.parseSecondsArgument)(args[args.length - 1]);
        }
        if (_Command.checkFlag("FIRST_ARG_TIMEOUT_COMMANDS", name)) {
          return (0, argumentParsers_1.parseSecondsArgument)(args[0]);
        }
        if (_Command.checkFlag("BLOCK_OPTION_COMMANDS", name)) {
          return (0, argumentParsers_1.parseBlockOption)(args);
        }
        return void 0;
      }
      /**
       * Clear the command and blocking timers
       */
      _clearTimers() {
        const existingTimer = this._commandTimeoutTimer;
        if (existingTimer) {
          clearTimeout(existingTimer);
          delete this._commandTimeoutTimer;
        }
        const blockingTimer = this._blockingTimeoutTimer;
        if (blockingTimer) {
          clearTimeout(blockingTimer);
          delete this._blockingTimeoutTimer;
        }
      }
      initPromise() {
        this.isResolved = false;
        this.isSettled = false;
        const promise = new Promise((resolve, reject) => {
          if (!this.transformed) {
            this.transformed = true;
            const transformer = _Command._transformer.argument[this.name];
            if (transformer) {
              this.args = transformer(this.args);
            }
            this.stringifyArguments();
          }
          this.resolve = this._convertValue(resolve);
          this.reject = (err) => {
            this._clearTimers();
            this.isSettled = true;
            if (this.errorStack) {
              reject((0, utils_1.optimizeErrorStack)(err, this.errorStack.stack, __dirname));
            } else {
              reject(err);
            }
          };
        });
        this.promise = (0, standard_as_callback_1.default)(promise, this.callback);
      }
      /**
       * Iterate through the command arguments that are considered keys.
       */
      _iterateKeys(transform = (key) => key) {
        if (typeof this.keys === "undefined") {
          this.keys = [];
          if ((0, commands_1.exists)(this.name, { caseInsensitive: true })) {
            const keyIndexes = (0, commands_1.getKeyIndexes)(this.name, this.args, {
              nameCaseInsensitive: true
            });
            for (const index of keyIndexes) {
              this.args[index] = transform(this.args[index]);
              this.keys.push(this.args[index]);
            }
          }
        }
        return this.keys;
      }
      /**
       * Convert the value from buffer to the target encoding.
       */
      _convertValue(resolve) {
        return (value) => {
          try {
            this._clearTimers();
            resolve(this.transformReply(value));
            this.isResolved = true;
            this.isSettled = true;
          } catch (err) {
            this.reject(err);
          }
          return this.promise;
        };
      }
    };
    Command.FLAGS = {
      VALID_IN_SUBSCRIBER_MODE: [
        "subscribe",
        "psubscribe",
        "unsubscribe",
        "punsubscribe",
        "ssubscribe",
        "sunsubscribe",
        "ping",
        "quit"
      ],
      VALID_IN_MONITOR_MODE: ["monitor", "auth"],
      ENTER_SUBSCRIBER_MODE: ["subscribe", "psubscribe", "ssubscribe"],
      EXIT_SUBSCRIBER_MODE: ["unsubscribe", "punsubscribe", "sunsubscribe"],
      WILL_DISCONNECT: ["quit"],
      HANDSHAKE_COMMANDS: [
        "auth",
        "hello",
        "select",
        "client",
        "readonly",
        "info"
      ],
      IGNORE_RECONNECT_ON_ERROR: ["client"],
      BLOCKING_COMMANDS: [
        "blpop",
        "brpop",
        "brpoplpush",
        "blmove",
        "blmovem",
        "bzpopmin",
        "bzpopmax",
        "bzmpop",
        "blmpop",
        "xread",
        "xreadgroup"
      ],
      LAST_ARG_TIMEOUT_COMMANDS: [
        "blpop",
        "brpop",
        "brpoplpush",
        "blmove",
        "bzpopmin",
        "bzpopmax"
      ],
      FIRST_ARG_TIMEOUT_COMMANDS: ["bzmpop", "blmpop"],
      BLOCK_OPTION_COMMANDS: ["xread", "xreadgroup"]
    };
    Command._transformer = {
      argument: {},
      reply: {}
    };
    exports.default = Command;
    var msetArgumentTransformer = function(args) {
      if (args.length === 1) {
        if (args[0] instanceof Map) {
          return (0, utils_1.convertMapToArray)(args[0]);
        }
        if (typeof args[0] === "object" && args[0] !== null) {
          return (0, utils_1.convertObjectToArray)(args[0]);
        }
      }
      return args;
    };
    var hsetArgumentTransformer = function(args) {
      if (args.length === 2) {
        if (args[1] instanceof Map) {
          return [args[0]].concat((0, utils_1.convertMapToArray)(args[1]));
        }
        if (typeof args[1] === "object" && args[1] !== null) {
          return [args[0]].concat((0, utils_1.convertObjectToArray)(args[1]));
        }
      }
      return args;
    };
    Command.setArgumentTransformer("mset", msetArgumentTransformer);
    Command.setArgumentTransformer("msetnx", msetArgumentTransformer);
    Command.setArgumentTransformer("hset", hsetArgumentTransformer);
    Command.setArgumentTransformer("hmset", hsetArgumentTransformer);
    Command.setReplyTransformer("hgetall", function(result) {
      if (Array.isArray(result)) {
        const obj = {};
        for (let i2 = 0; i2 < result.length; i2 += 2) {
          const key = result[i2];
          const value = result[i2 + 1];
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value,
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
        }
        return obj;
      }
      return result;
    });
    Command.setReplyTransformer("vsim", replyTransformers_1.transformVsimReply);
    Command.setReplyTransformer("hrandfield", replyTransformers_1.transformPairReply);
    Command.setReplyTransformer("xread", replyTransformers_1.transformStreamReadReply);
    Command.setReplyTransformer("xreadgroup", replyTransformers_1.transformStreamReadReply);
    for (const command of replyTransformers_1.sortedSetWithScorePairCommands) {
      Command.setReplyTransformer(command, replyTransformers_1.transformPairReply);
    }
    var MixedBuffers = class {
      constructor() {
        this.length = 0;
        this.items = [];
      }
      push(x4) {
        this.length += Buffer.byteLength(x4);
        this.items.push(x4);
      }
      toBuffer() {
        const result = Buffer.allocUnsafe(this.length);
        let offset = 0;
        for (const item of this.items) {
          const length = Buffer.byteLength(item);
          Buffer.isBuffer(item) ? item.copy(result, offset) : result.write(item, offset, length);
          offset += length;
        }
        return result;
      }
    };
  }
});

// ../../node_modules/ioredis/built/errors/ClusterAllFailedError.js
var require_ClusterAllFailedError = __commonJS({
  "../../node_modules/ioredis/built/errors/ClusterAllFailedError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var redis_errors_1 = require_redis_errors();
    var ClusterAllFailedError = class extends redis_errors_1.RedisError {
      constructor(message, lastNodeError) {
        super(message);
        this.lastNodeError = lastNodeError;
        Error.captureStackTrace(this, this.constructor);
      }
      get name() {
        return this.constructor.name;
      }
    };
    ClusterAllFailedError.defaultMessage = "Failed to refresh slots cache.";
    exports.default = ClusterAllFailedError;
  }
});

// ../../node_modules/ioredis/built/ScanStream.js
var require_ScanStream = __commonJS({
  "../../node_modules/ioredis/built/ScanStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stream_1 = __require("stream");
    var ScanStream = class extends stream_1.Readable {
      constructor(opt) {
        super(opt);
        this.opt = opt;
        this._redisCursor = "0";
        this._redisDrained = false;
      }
      _read() {
        if (this._redisDrained) {
          this.push(null);
          return;
        }
        const args = [this._redisCursor];
        if (this.opt.key) {
          args.unshift(this.opt.key);
        }
        if (this.opt.match) {
          args.push("MATCH", this.opt.match);
        }
        if (this.opt.type) {
          args.push("TYPE", this.opt.type);
        }
        if (this.opt.count) {
          args.push("COUNT", String(this.opt.count));
        }
        if (this.opt.noValues) {
          args.push("NOVALUES");
        }
        this.opt.redis[this.opt.command](args, (err, res) => {
          if (err) {
            this.emit("error", err);
            return;
          }
          this._redisCursor = res[0] instanceof Buffer ? res[0].toString() : res[0];
          if (this._redisCursor === "0") {
            this._redisDrained = true;
          }
          this.push(res[1]);
        });
      }
      close() {
        this._redisDrained = true;
      }
    };
    exports.default = ScanStream;
  }
});

// ../../node_modules/ioredis/built/autoPipelining.js
var require_autoPipelining = __commonJS({
  "../../node_modules/ioredis/built/autoPipelining.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.executeWithAutoPipelining = exports.getFirstValueInFlattenedArray = exports.shouldUseAutoPipelining = exports.notAllowedAutoPipelineCommands = exports.kCallbacks = exports.kExec = void 0;
    var lodash_1 = require_lodash();
    var calculateSlot = require_lib();
    var standard_as_callback_1 = require_built2();
    var commands_1 = require_built();
    exports.kExec = /* @__PURE__ */ Symbol("exec");
    exports.kCallbacks = /* @__PURE__ */ Symbol("callbacks");
    exports.notAllowedAutoPipelineCommands = [
      "auth",
      "info",
      "script",
      "quit",
      "cluster",
      "pipeline",
      "multi",
      "subscribe",
      "psubscribe",
      "unsubscribe",
      "unpsubscribe",
      "select",
      "client",
      "hello",
      "readonly",
      "himport"
    ];
    function executeAutoPipeline(client, slotKey) {
      if (client._runningAutoPipelines.has(slotKey)) {
        return;
      }
      if (!client._autoPipelines.has(slotKey)) {
        return;
      }
      client._runningAutoPipelines.add(slotKey);
      const pipeline = client._autoPipelines.get(slotKey);
      client._autoPipelines.delete(slotKey);
      const callbacks = pipeline[exports.kCallbacks];
      pipeline[exports.kCallbacks] = null;
      pipeline.exec(function(err, results) {
        client._runningAutoPipelines.delete(slotKey);
        if (err) {
          for (let i2 = 0; i2 < callbacks.length; i2++) {
            process.nextTick(callbacks[i2], err);
          }
        } else {
          for (let i2 = 0; i2 < callbacks.length; i2++) {
            process.nextTick(callbacks[i2], ...results[i2]);
          }
        }
        if (client._autoPipelines.has(slotKey)) {
          executeAutoPipeline(client, slotKey);
        }
      });
    }
    function shouldUseAutoPipelining(client, functionName, commandName) {
      return functionName && client.options.enableAutoPipelining && !client.isPipeline && !exports.notAllowedAutoPipelineCommands.includes(commandName) && !client.options.autoPipeliningIgnoredCommands.includes(commandName);
    }
    exports.shouldUseAutoPipelining = shouldUseAutoPipelining;
    function getFirstValueInFlattenedArray(args) {
      for (let i2 = 0; i2 < args.length; i2++) {
        const arg = args[i2];
        if (typeof arg === "string") {
          return arg;
        } else if (Array.isArray(arg) || (0, lodash_1.isArguments)(arg)) {
          if (arg.length === 0) {
            continue;
          }
          return arg[0];
        }
        const flattened = [arg].flat();
        if (flattened.length > 0) {
          return flattened[0];
        }
      }
      return void 0;
    }
    exports.getFirstValueInFlattenedArray = getFirstValueInFlattenedArray;
    function getFirstKeyForCommand(commandName, args) {
      if ((0, commands_1.exists)(commandName, { caseInsensitive: true })) {
        const flattenedArgs = args.flat();
        const keyIndexes = (0, commands_1.getKeyIndexes)(commandName, flattenedArgs, {
          nameCaseInsensitive: true
        });
        if (keyIndexes.length) {
          return flattenedArgs[keyIndexes[0]];
        }
      }
      return getFirstValueInFlattenedArray(args);
    }
    function executeWithAutoPipelining(client, functionName, commandName, args, callback) {
      if (client.isCluster && !client.slots.length) {
        if (client.status === "wait")
          client.connect().catch(lodash_1.noop);
        return (0, standard_as_callback_1.default)(new Promise(function(resolve, reject) {
          client.delayUntilReady((err) => {
            if (err) {
              reject(err);
              return;
            }
            executeWithAutoPipelining(client, functionName, commandName, args, null).then(resolve, reject);
          });
        }), callback);
      }
      const prefix = client.options.keyPrefix || "";
      let slotKey = client.isCluster ? client.slots[calculateSlot(`${prefix}${getFirstKeyForCommand(commandName, args)}`)].join(",") : "main";
      if (client.isCluster && client.options.scaleReads !== "master") {
        const isReadOnly = (0, commands_1.exists)(commandName) && (0, commands_1.hasFlag)(commandName, "readonly");
        slotKey += isReadOnly ? ":read" : ":write";
      }
      if (!client._autoPipelines.has(slotKey)) {
        const pipeline2 = client.pipeline();
        pipeline2[exports.kExec] = false;
        pipeline2[exports.kCallbacks] = [];
        client._autoPipelines.set(slotKey, pipeline2);
      }
      const pipeline = client._autoPipelines.get(slotKey);
      if (!pipeline[exports.kExec]) {
        pipeline[exports.kExec] = true;
        setImmediate(executeAutoPipeline, client, slotKey);
      }
      const autoPipelinePromise = new Promise(function(resolve, reject) {
        pipeline[exports.kCallbacks].push(function(err, value) {
          if (err) {
            reject(err);
            return;
          }
          resolve(value);
        });
        if (functionName === "call") {
          args.unshift(commandName);
        }
        pipeline[functionName](...args);
      });
      return (0, standard_as_callback_1.default)(autoPipelinePromise, callback);
    }
    exports.executeWithAutoPipelining = executeWithAutoPipelining;
  }
});

// ../../node_modules/ioredis/built/Script.js
var require_Script = __commonJS({
  "../../node_modules/ioredis/built/Script.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var crypto_1 = __require("crypto");
    var Command_1 = require_Command();
    var standard_as_callback_1 = require_built2();
    var Script = class {
      constructor(lua, numberOfKeys = null, keyPrefix = "", readOnly = false) {
        this.lua = lua;
        this.numberOfKeys = numberOfKeys;
        this.keyPrefix = keyPrefix;
        this.readOnly = readOnly;
        this.sha = (0, crypto_1.createHash)("sha1").update(lua).digest("hex");
        const sha = this.sha;
        const socketHasScriptLoaded = /* @__PURE__ */ new WeakSet();
        this.Command = class CustomScriptCommand extends Command_1.default {
          toWritable(socket) {
            const origReject = this.reject;
            this.reject = (err) => {
              if (err.message.indexOf("NOSCRIPT") !== -1) {
                socketHasScriptLoaded.delete(socket);
              }
              origReject.call(this, err);
            };
            if (!socketHasScriptLoaded.has(socket)) {
              socketHasScriptLoaded.add(socket);
              this.name = "eval";
              this.args[0] = lua;
            } else if (this.name === "eval") {
              this.name = "evalsha";
              this.args[0] = sha;
            }
            return super.toWritable(socket);
          }
        };
      }
      execute(container, args, options, callback) {
        if (typeof this.numberOfKeys === "number") {
          args.unshift(this.numberOfKeys);
        }
        if (this.keyPrefix) {
          options.keyPrefix = this.keyPrefix;
        }
        if (this.readOnly) {
          options.readOnly = true;
        }
        const evalsha = new this.Command("evalsha", [this.sha, ...args], options);
        evalsha.promise = evalsha.promise.catch((err) => {
          if (err.message.indexOf("NOSCRIPT") === -1) {
            throw err;
          }
          const resend = new this.Command("evalsha", [this.sha, ...args], options);
          const client = container.isPipeline ? container.redis : container;
          return client.sendCommand(resend);
        });
        (0, standard_as_callback_1.default)(evalsha.promise, callback);
        return container.sendCommand(evalsha);
      }
    };
    exports.default = Script;
  }
});

// ../../node_modules/ioredis/built/utils/Commander.js
var require_Commander = __commonJS({
  "../../node_modules/ioredis/built/utils/Commander.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_built();
    var autoPipelining_1 = require_autoPipelining();
    var Command_1 = require_Command();
    var Script_1 = require_Script();
    var Commander = class {
      constructor() {
        this.options = {};
        this.scriptsSet = {};
        this.addedBuiltinSet = /* @__PURE__ */ new Set();
      }
      /**
       * Return supported builtin commands
       */
      getBuiltinCommands() {
        return commands.slice(0);
      }
      /**
       * Create a builtin command
       */
      createBuiltinCommand(commandName) {
        return {
          string: generateFunction(null, commandName, "utf8"),
          buffer: generateFunction(null, commandName, null)
        };
      }
      /**
       * Create add builtin command
       */
      addBuiltinCommand(commandName) {
        this.addedBuiltinSet.add(commandName);
        this[commandName] = generateFunction(commandName, commandName, "utf8");
        this[commandName + "Buffer"] = generateFunction(commandName + "Buffer", commandName, null);
      }
      /**
       * Define a custom command using lua script
       */
      defineCommand(name, definition) {
        const script = new Script_1.default(definition.lua, definition.numberOfKeys, this.options.keyPrefix, definition.readOnly);
        this.scriptsSet[name] = script;
        this[name] = generateScriptingFunction(name, name, script, "utf8");
        this[name + "Buffer"] = generateScriptingFunction(name + "Buffer", name, script, null);
      }
      /**
       * @ignore
       */
      sendCommand(command, stream, node) {
        throw new Error('"sendCommand" is not implemented');
      }
    };
    var commands = commands_1.list.filter((command) => command !== "monitor");
    commands.push("sentinel");
    commands.forEach(function(commandName) {
      Commander.prototype[commandName] = generateFunction(commandName, commandName, "utf8");
      Commander.prototype[commandName + "Buffer"] = generateFunction(commandName + "Buffer", commandName, null);
    });
    Commander.prototype.call = generateFunction("call", "utf8");
    Commander.prototype.callBuffer = generateFunction("callBuffer", null);
    Commander.prototype.send_command = Commander.prototype.call;
    function generateFunction(functionName, _commandName, _encoding) {
      if (typeof _encoding === "undefined") {
        _encoding = _commandName;
        _commandName = null;
      }
      return function(...args) {
        const commandName = _commandName || args.shift();
        let callback = args[args.length - 1];
        if (typeof callback === "function") {
          args.pop();
        } else {
          callback = void 0;
        }
        const options = {
          errorStack: this.options.showFriendlyErrorStack ? new Error() : void 0,
          keyPrefix: this.options.keyPrefix,
          replyEncoding: _encoding
        };
        if (!(0, autoPipelining_1.shouldUseAutoPipelining)(this, functionName, commandName)) {
          return this.sendCommand(
            // @ts-expect-error
            new Command_1.default(commandName, args, options, callback)
          );
        }
        return (0, autoPipelining_1.executeWithAutoPipelining)(
          this,
          functionName,
          commandName,
          // @ts-expect-error
          args,
          callback
        );
      };
    }
    function generateScriptingFunction(functionName, commandName, script, encoding) {
      return function(...args) {
        const callback = typeof args[args.length - 1] === "function" ? args.pop() : void 0;
        const options = {
          replyEncoding: encoding
        };
        if (this.options.showFriendlyErrorStack) {
          options.errorStack = new Error();
        }
        if (!(0, autoPipelining_1.shouldUseAutoPipelining)(this, functionName, commandName)) {
          return script.execute(this, args, options, callback);
        }
        return (0, autoPipelining_1.executeWithAutoPipelining)(this, functionName, commandName, args, callback);
      };
    }
    exports.default = Commander;
  }
});

// ../../node_modules/ioredis/built/himport/HimportCoordinator.js
var require_HimportCoordinator = __commonJS({
  "../../node_modules/ioredis/built/himport/HimportCoordinator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.interceptHimportControlCommand = exports.isHimportControlCommand = exports.isInternalHimportCommand = exports.unbindHimportCoordinator = exports.setHimportRole = exports.interceptHimportPipeline = exports.interceptHimportCommand = exports.getHimportBinding = exports.bindHimportCoordinator = exports.cloneHimportFieldsets = exports.hasHimportCoordinator = void 0;
    var Command_1 = require_Command();
    var utils_1 = require_utils2();
    exports.hasHimportCoordinator = /* @__PURE__ */ Symbol("hasHimportCoordinator");
    var bindings = /* @__PURE__ */ new WeakMap();
    var internalCommands = /* @__PURE__ */ new WeakSet();
    var debug = (0, utils_1.Debug)("himport");
    function copyValue(value) {
      return value instanceof Buffer ? Buffer.from(value) : value;
    }
    function canonicalize(value) {
      return Buffer.from(value).toString("base64");
    }
    function commandToken(value) {
      if (value === void 0) {
        return "";
      }
      return Buffer.isBuffer(value) ? value.toString("utf8").toUpperCase() : String(value).toUpperCase();
    }
    function cloneHimportFieldsets(fieldsets) {
      if (fieldsets === void 0) {
        return void 0;
      }
      if (!Array.isArray(fieldsets)) {
        throw new TypeError("himportFieldsets must be an array");
      }
      const names = /* @__PURE__ */ new Set();
      const copied = fieldsets.map((fieldset) => {
        if (!fieldset || typeof fieldset !== "object") {
          throw new TypeError("Each HIMPORT fieldset must be an object");
        }
        if (typeof fieldset.name !== "string" && !Buffer.isBuffer(fieldset.name)) {
          throw new TypeError("Each HIMPORT fieldset name must be a string or Buffer");
        }
        if (!Array.isArray(fieldset.fields)) {
          throw new TypeError("Each HIMPORT fieldset fields value must be an array");
        }
        const name = copyValue(fieldset.name);
        const canonicalName = canonicalize(name);
        if (names.has(canonicalName)) {
          throw new TypeError("Duplicate HIMPORT fieldset name");
        }
        names.add(canonicalName);
        const fields = fieldset.fields.map((field) => {
          if (typeof field !== "string" && !Buffer.isBuffer(field)) {
            throw new TypeError("Each HIMPORT field must be a string or Buffer");
          }
          return copyValue(field);
        });
        return Object.freeze({
          name,
          fields: Object.freeze(fields)
        });
      });
      return Object.freeze(copied);
    }
    exports.cloneHimportFieldsets = cloneHimportFieldsets;
    var HimportCoordinator = class {
      constructor(fieldsets) {
        this.definitionsByName = /* @__PURE__ */ new Map();
        this.sessions = /* @__PURE__ */ new WeakMap();
        this.managedSets = /* @__PURE__ */ new WeakMap();
        this.definitions = fieldsets.map((fieldset) => {
          const definition = {
            canonicalName: canonicalize(fieldset.name),
            name: fieldset.name,
            fields: fieldset.fields
          };
          this.definitionsByName.set(definition.canonicalName, definition);
          return definition;
        });
      }
      get size() {
        return this.definitions.length;
      }
      beginSession(connection2) {
        this.sessions.set(connection2, {
          fieldsets: /* @__PURE__ */ new Map()
        });
      }
      detach(connection2) {
        this.sessions.delete(connection2);
      }
      invalidate(connection2) {
        const session = this.sessions.get(connection2);
        if (session) {
          session.fieldsets.clear();
        }
      }
      getDefinitions() {
        return this.definitions;
      }
      classify(command) {
        const existing = this.managedSets.get(command);
        if (existing) {
          return existing;
        }
        if (command.name.toLowerCase() !== "himport" || commandToken(command.args[0]) !== "SET") {
          return void 0;
        }
        const fieldsetName = command.args[2];
        if (typeof fieldsetName !== "string" && !Buffer.isBuffer(fieldsetName)) {
          return void 0;
        }
        const definition = this.definitionsByName.get(canonicalize(fieldsetName));
        if (!definition) {
          return void 0;
        }
        const context = {
          definition,
          recoveryAttempts: 0,
          recoveryInstalled: false
        };
        this.managedSets.set(command, context);
        return context;
      }
      prepareCommand(connection2, command) {
        const context = this.classify(command);
        if (!context) {
          return void 0;
        }
        return this.ensurePrepared(connection2, context.definition);
      }
      hasManagedSet(commands) {
        return commands.some((command) => this.classify(command) !== void 0);
      }
      prepareCommands(connection2, commands) {
        const preparations = /* @__PURE__ */ new Set();
        for (const command of commands) {
          const preparation = this.prepareCommand(connection2, command);
          if (preparation) {
            preparations.add(preparation);
          }
        }
        if (preparations.size === 0) {
          return void 0;
        }
        return Promise.all(preparations).then(() => void 0);
      }
      interceptCommand(connection2, command, ready, resumeSend) {
        if (command.isSettled) {
          return true;
        }
        if (command.name.toLowerCase() === "reset") {
          this.invalidate(connection2);
        }
        const managedSet = this.classify(command);
        if (!managedSet) {
          return false;
        }
        this.installRecovery(connection2, command, resumeSend);
        const maySend = this.consumeAllowedSend(connection2, command);
        if (!ready || maySend) {
          return false;
        }
        const preparation = this.prepareCommand(connection2, command);
        if (!preparation) {
          return false;
        }
        preparation.then(() => {
          if (command.isSettled) {
            return;
          }
          try {
            this.allowNextSend(connection2, command);
            resumeSend();
          } catch (error) {
            command.reject(error);
          }
        }, (error) => {
          if (!command.isSettled) {
            command.reject(error);
          }
        });
        return true;
      }
      allowNextSend(connection2, command) {
        const context = this.classify(command);
        if (context) {
          context.sendWithoutPreparationOn = connection2;
        }
      }
      consumeAllowedSend(connection2, command) {
        const context = this.managedSets.get(command);
        if (context?.sendWithoutPreparationOn !== connection2) {
          return false;
        }
        context.sendWithoutPreparationOn = void 0;
        return true;
      }
      installRecovery(connection2, command, resumeSend) {
        const context = this.classify(command);
        if (!context) {
          return;
        }
        context.lastConnection = connection2;
        context.resumeSend = resumeSend;
        if (context.recoveryInstalled) {
          return;
        }
        context.recoveryInstalled = true;
        const reject = command.reject;
        command.reject = (error) => {
          if (command.isSettled) {
            return;
          }
          const recoveryConnection = context.lastConnection;
          const recoverySend = context.resumeSend;
          if (context.recoveryAttempts > 0 || !recoveryConnection || !recoverySend || !isMissingFieldsetError(error)) {
            reject.call(command, error);
            return;
          }
          context.recoveryAttempts += 1;
          this.markUnprepared(recoveryConnection, context.definition);
          const preparation = this.ensurePrepared(recoveryConnection, context.definition);
          Promise.resolve(preparation).then(() => {
            if (command.isSettled) {
              return;
            }
            try {
              this.allowNextSend(recoveryConnection, command);
              recoverySend();
            } catch (sendError) {
              reject.call(command, sendError);
            }
          }, (preparationError) => {
            if (!command.isSettled) {
              reject.call(command, preparationError);
            }
          });
        };
      }
      ensurePrepared(connection2, definition) {
        const session = this.getSession(connection2);
        const current = session.fieldsets.get(definition.canonicalName);
        if (current?.status === "prepared") {
          return void 0;
        }
        if (current?.status === "preparing") {
          return current.promise;
        }
        const command = new Command_1.default("himport", [
          "PREPARE",
          definition.name,
          ...definition.fields
        ]);
        internalCommands.add(command);
        const promise = Promise.resolve(connection2.sendCommand(command)).then(() => {
          if (this.sessions.get(connection2) !== session) {
            return this.ensurePrepared(connection2, definition) ?? Promise.resolve();
          }
          const latest = session.fieldsets.get(definition.canonicalName);
          if (latest?.status === "preparing" && latest.promise === promise) {
            session.fieldsets.set(definition.canonicalName, {
              status: "prepared"
            });
          }
        }, (error) => {
          if (this.sessions.get(connection2) !== session) {
            return this.ensurePrepared(connection2, definition) ?? Promise.resolve();
          }
          const latest = session.fieldsets.get(definition.canonicalName);
          if (latest?.status === "preparing" && latest.promise === promise) {
            session.fieldsets.delete(definition.canonicalName);
          }
          throw error;
        });
        session.fieldsets.set(definition.canonicalName, {
          status: "preparing",
          promise
        });
        return promise;
      }
      getSession(connection2) {
        let session = this.sessions.get(connection2);
        if (!session) {
          session = {
            fieldsets: /* @__PURE__ */ new Map()
          };
          this.sessions.set(connection2, session);
        }
        return session;
      }
      markUnprepared(connection2, definition) {
        const fieldsets = this.getSession(connection2).fieldsets;
        if (fieldsets.get(definition.canonicalName)?.status === "prepared") {
          fieldsets.delete(definition.canonicalName);
        }
      }
    };
    exports.default = HimportCoordinator;
    function bindHimportCoordinator(owner, coordinator, role) {
      bindings.set(owner, { coordinator, role });
      owner[exports.hasHimportCoordinator] = true;
    }
    exports.bindHimportCoordinator = bindHimportCoordinator;
    function getHimportBinding(owner) {
      return bindings.get(owner);
    }
    exports.getHimportBinding = getHimportBinding;
    function interceptHimportCommand(connection2, command, ready, resumeSend) {
      const binding = bindings.get(connection2);
      if (!binding || binding.role === "replica" || isInternalHimportCommand(command)) {
        return false;
      }
      return binding.coordinator.interceptCommand(connection2, command, ready, resumeSend);
    }
    exports.interceptHimportCommand = interceptHimportCommand;
    function interceptHimportPipeline({ owner, commands, slot, preferredNodeKey, setDestination, resume, reject }) {
      const binding = bindings.get(owner);
      if (!binding || !binding.coordinator.hasManagedSet(commands)) {
        return false;
      }
      let connection2 = owner;
      if (binding.role === "cluster") {
        const nodeKey = preferredNodeKey ?? owner.slots?.[slot]?.[0];
        const connectionPool = owner.connectionPool;
        const clusterConnection = nodeKey && connectionPool?.getInstanceByKey(nodeKey) || connectionPool?.getSampleInstance("master");
        if (!clusterConnection) {
          reject(new Error("No master node is available for the pipeline"));
          return true;
        }
        connection2 = clusterConnection;
        setDestination(connection2);
      }
      const preparation = binding.coordinator.prepareCommands(connection2, commands);
      if (!preparation) {
        return false;
      }
      preparation.then(() => {
        try {
          resume();
        } catch (error) {
          reject(error);
        }
      }, (error) => {
        reject(error);
      });
      return true;
    }
    exports.interceptHimportPipeline = interceptHimportPipeline;
    function setHimportRole(owner, role) {
      const binding = bindings.get(owner);
      if (binding) {
        binding.role = role;
      }
    }
    exports.setHimportRole = setHimportRole;
    function unbindHimportCoordinator(owner) {
      const binding = bindings.get(owner);
      if (binding) {
        binding.coordinator.detach(owner);
        bindings.delete(owner);
      }
      owner[exports.hasHimportCoordinator] = false;
    }
    exports.unbindHimportCoordinator = unbindHimportCoordinator;
    function isInternalHimportCommand(command) {
      return internalCommands.has(command);
    }
    exports.isInternalHimportCommand = isInternalHimportCommand;
    function isHimportControlCommand(command) {
      if (command.name.toLowerCase() !== "himport") {
        return false;
      }
      return ["PREPARE", "DISCARD", "DISCARDALL"].includes(commandToken(command.args[0]));
    }
    exports.isHimportControlCommand = isHimportControlCommand;
    function interceptHimportControlCommand(connections, command) {
      if (!isHimportControlCommand(command) || connections.length === 0) {
        return false;
      }
      const replies = connections.map((connection2) => {
        const clone = new Command_1.default(command.name, command.args);
        connection2.sendCommand(clone);
        return clone.promise;
      });
      Promise.allSettled(replies).then((results) => {
        let firstReply;
        let hasFirstReply = false;
        for (const result of results) {
          if (result.status === "rejected") {
            command.reject(result.reason);
            return;
          }
          if (!hasFirstReply) {
            firstReply = result.value;
            hasFirstReply = true;
          } else if (String(result.value) !== String(firstReply)) {
            debug("divergent HIMPORT reply across masters (%s != %s)", result.value, firstReply);
          }
        }
        command.resolve(firstReply);
      });
      return true;
    }
    exports.interceptHimportControlCommand = interceptHimportControlCommand;
    function isMissingFieldsetError(error) {
      return error.message.toLowerCase().includes("no such fieldset");
    }
  }
});

// ../../node_modules/ioredis/built/Pipeline.js
var require_Pipeline = __commonJS({
  "../../node_modules/ioredis/built/Pipeline.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var calculateSlot = require_lib();
    var commands_1 = require_built();
    var standard_as_callback_1 = require_built2();
    var util_1 = __require("util");
    var Command_1 = require_Command();
    var buffer_1 = __require("buffer");
    var utils_1 = require_utils2();
    var Commander_1 = require_Commander();
    var HimportCoordinator_1 = require_HimportCoordinator();
    function generateMultiWithNodes(redis, keys) {
      const slot = calculateSlot(keys[0]);
      const target = redis._groupsBySlot[slot];
      for (let i2 = 1; i2 < keys.length; i2++) {
        if (redis._groupsBySlot[calculateSlot(keys[i2])] !== target) {
          return -1;
        }
      }
      return slot;
    }
    var Pipeline = class extends Commander_1.default {
      constructor(redis) {
        super();
        this.redis = redis;
        this.isPipeline = true;
        this.replyPending = 0;
        this._queue = [];
        this._result = [];
        this._transactions = 0;
        this._shaToScript = {};
        this.isCluster = this.redis.constructor.name === "Cluster" || this.redis.isCluster;
        this.options = redis.options;
        Object.keys(redis.scriptsSet).forEach((name) => {
          const script = redis.scriptsSet[name];
          this._shaToScript[script.sha] = script;
          this[name] = redis[name];
          this[name + "Buffer"] = redis[name + "Buffer"];
        });
        redis.addedBuiltinSet.forEach((name) => {
          this[name] = redis[name];
          this[name + "Buffer"] = redis[name + "Buffer"];
        });
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        const _this = this;
        Object.defineProperty(this, "length", {
          get: function() {
            return _this._queue.length;
          }
        });
      }
      fillResult(value, position) {
        if (this._queue[position].name === "exec" && Array.isArray(value[1])) {
          const execLength = value[1].length;
          for (let i2 = 0; i2 < execLength; i2++) {
            if (value[1][i2] instanceof Error) {
              continue;
            }
            const cmd = this._queue[position - (execLength - i2)];
            try {
              value[1][i2] = cmd.transformReply(value[1][i2]);
            } catch (err) {
              value[1][i2] = err;
            }
          }
        }
        this._result[position] = value;
        if (--this.replyPending) {
          return;
        }
        if (this.isCluster) {
          let retriable = true;
          let commonError;
          for (let i2 = 0; i2 < this._result.length; ++i2) {
            const error = this._result[i2][0];
            const command = this._queue[i2];
            if (error) {
              if (command.name === "exec" && error.message === "EXECABORT Transaction discarded because of previous errors.") {
                continue;
              }
              if (!commonError) {
                commonError = {
                  name: error.name,
                  message: error.message
                };
              } else if (commonError.name !== error.name || commonError.message !== error.message) {
                retriable = false;
                break;
              }
            } else if (!command.inTransaction) {
              const isReadOnly = (0, commands_1.exists)(command.name, { caseInsensitive: true }) && (0, commands_1.hasFlag)(command.name, "readonly", { nameCaseInsensitive: true });
              if (!isReadOnly) {
                retriable = false;
                break;
              }
            }
          }
          if (commonError && retriable) {
            const _this = this;
            const errv = commonError.message.split(" ");
            const queue2 = this._queue;
            let inTransaction = false;
            this._queue = [];
            for (let i2 = 0; i2 < queue2.length; ++i2) {
              if (errv[0] === "ASK" && !inTransaction && queue2[i2].name !== "asking" && (!queue2[i2 - 1] || queue2[i2 - 1].name !== "asking")) {
                const asking = new Command_1.default("asking");
                asking.ignore = true;
                this.sendCommand(asking);
              }
              queue2[i2].initPromise();
              this.sendCommand(queue2[i2]);
              inTransaction = queue2[i2].inTransaction;
            }
            let matched = true;
            if (typeof this.leftRedirections === "undefined") {
              this.leftRedirections = {};
            }
            const exec = function() {
              _this.exec();
            };
            const cluster = this.redis;
            cluster.handleError(commonError, this.leftRedirections, {
              moved: function(slot, key) {
                _this.preferKey = key;
                if (cluster.slots[slot]) {
                  if (cluster.slots[slot][0] !== key) {
                    cluster.slots[slot] = [key];
                  }
                } else {
                  cluster.slots[slot] = [key];
                }
                cluster._groupsBySlot[slot] = cluster._groupsIds[cluster.slots[slot].join(";")];
                cluster.refreshSlotsCache();
                _this.exec();
              },
              ask: function(_slot, key) {
                _this.preferKey = key;
                _this.exec();
              },
              tryagain: exec,
              clusterDown: exec,
              connectionClosed: exec,
              maxRedirections: () => {
                matched = false;
              },
              defaults: () => {
                matched = false;
              }
            });
            if (matched) {
              return;
            }
          }
        }
        let ignoredCount = 0;
        for (let i2 = 0; i2 < this._queue.length - ignoredCount; ++i2) {
          if (this._queue[i2 + ignoredCount].ignore) {
            ignoredCount += 1;
          }
          this._result[i2] = this._result[i2 + ignoredCount];
        }
        this.resolve(this._result.slice(0, this._result.length - ignoredCount));
      }
      sendCommand(command) {
        if (this._transactions > 0) {
          command.inTransaction = true;
        }
        const position = this._queue.length;
        command.pipelineIndex = position;
        command.promise.then((result) => {
          this.fillResult([null, result], position);
        }).catch((error) => {
          this.fillResult([error], position);
        });
        this._queue.push(command);
        return this;
      }
      addBatch(commands) {
        let command, commandName, args;
        for (let i2 = 0; i2 < commands.length; ++i2) {
          command = commands[i2];
          commandName = command[0];
          args = command.slice(1);
          this[commandName].apply(this, args);
        }
        return this;
      }
    };
    exports.default = Pipeline;
    var multi = Pipeline.prototype.multi;
    Pipeline.prototype.multi = function() {
      this._transactions += 1;
      return multi.apply(this, arguments);
    };
    var execBuffer = Pipeline.prototype.execBuffer;
    Pipeline.prototype.execBuffer = (0, util_1.deprecate)(function() {
      if (this._transactions > 0) {
        this._transactions -= 1;
      }
      return execBuffer.apply(this, arguments);
    }, "Pipeline#execBuffer: Use Pipeline#exec instead");
    Pipeline.prototype.exec = function(callback) {
      if (this.isCluster && !this.redis.slots.length) {
        if (this.redis.status === "wait")
          this.redis.connect().catch(utils_1.noop);
        if (callback && !this.nodeifiedPromise) {
          this.nodeifiedPromise = true;
          (0, standard_as_callback_1.default)(this.promise, callback);
        }
        this.redis.delayUntilReady((err) => {
          if (err) {
            this.reject(err);
            return;
          }
          this.exec(callback);
        });
        return this.promise;
      }
      if (this._transactions > 0) {
        this._transactions -= 1;
        return execBuffer.apply(this, arguments);
      }
      if (!this.nodeifiedPromise) {
        this.nodeifiedPromise = true;
        (0, standard_as_callback_1.default)(this.promise, callback);
      }
      if (!this._queue.length) {
        this.resolve([]);
      }
      let pipelineSlot;
      if (this.isCluster) {
        const sampleKeys = [];
        for (let i2 = 0; i2 < this._queue.length; i2++) {
          const keys = this._queue[i2].getKeys();
          if (keys.length) {
            sampleKeys.push(keys[0]);
          }
          if (keys.length && calculateSlot.generateMulti(keys) < 0) {
            this.reject(new Error("All the keys in a pipeline command should belong to the same slot"));
            return this.promise;
          }
        }
        if (sampleKeys.length) {
          pipelineSlot = generateMultiWithNodes(this.redis, sampleKeys);
          if (pipelineSlot < 0) {
            this.reject(new Error("All keys in the pipeline should belong to the same slots allocation group"));
            return this.promise;
          }
        } else {
          pipelineSlot = Math.random() * 16384 | 0;
        }
      }
      const _this = this;
      let node;
      const himportIntercepted = (0, HimportCoordinator_1.interceptHimportPipeline)({
        owner: _this.redis,
        commands: _this._queue,
        slot: pipelineSlot,
        preferredNodeKey: _this.preferKey,
        setDestination(connection2) {
          node = {
            slot: pipelineSlot,
            redis: connection2
          };
        },
        resume: execPipeline,
        reject(error) {
          _this.reject(error);
        }
      });
      if (!himportIntercepted) {
        execPipeline();
      }
      return this.promise;
      function execPipeline() {
        let writePending = _this.replyPending = _this._queue.length;
        if (_this.isCluster && !node) {
          node = {
            slot: pipelineSlot,
            redis: _this.redis.connectionPool.nodes.all[_this.preferKey]
          };
        }
        let data = "";
        let buffers;
        const stream = {
          isPipeline: true,
          destination: _this.isCluster ? node : { redis: _this.redis },
          write(writable) {
            if (typeof writable !== "string") {
              if (!buffers) {
                buffers = [];
              }
              if (data) {
                buffers.push(Buffer.from(data, "utf8"));
                data = "";
              }
              buffers.push(writable);
            } else {
              if (data.length + writable.length >= buffer_1.constants.MAX_STRING_LENGTH) {
                if (!buffers) {
                  buffers = [];
                }
                if (data) {
                  buffers.push(Buffer.from(data, "utf8"));
                  data = "";
                }
              }
              data += writable;
            }
            if (!--writePending) {
              if (buffers) {
                if (data) {
                  buffers.push(Buffer.from(data, "utf8"));
                }
                stream.destination.redis.stream.write(Buffer.concat(buffers));
              } else {
                stream.destination.redis.stream.write(data);
              }
              writePending = _this._queue.length;
              data = "";
              buffers = void 0;
            }
          }
        };
        for (let i2 = 0; i2 < _this._queue.length; ++i2) {
          _this.redis.sendCommand(_this._queue[i2], stream, node);
        }
        return _this.promise;
      }
    };
  }
});

// ../../node_modules/ioredis/built/tracing.js
var require_tracing = __commonJS({
  "../../node_modules/ioredis/built/tracing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.traceConnect = exports.traceBatch = exports.traceCommand = exports.sanitizeArgs = void 0;
    var SERIALIZATION_SUBSETS = [
      { regex: /^ECHO/i, args: 0 },
      {
        regex: /^(GETSET|LPUSH|MSET|PFA|PSETEX|PUBLISH|RPUSH|SADD|SET|SPUBLISH|XADD|ZADD)/i,
        args: 1
      },
      { regex: /^(HSET|HMSET|LSET|LINSERT)/i, args: 2 },
      {
        regex: /^(ACL|BIT|B[LRZ]|CLIENT|CLUSTER|CONFIG|COMMAND|DECR|DEL|EVAL|EX|FUNCTION|GEO|GET|HINCR|HMGET|HSCAN|INCR|L[TRLM]|MEMORY|P[EFISTU]|RPOP|S[CDIMORSU]|XACK|X[CDGILPRT]|Z[CDILMPRS])/i,
        args: -1
      }
    ];
    function sanitizeArgs(commandName, args) {
      let allowedArgCount = 0;
      for (const subset of SERIALIZATION_SUBSETS) {
        if (subset.regex.test(commandName)) {
          allowedArgCount = subset.args;
          break;
        }
      }
      if (allowedArgCount === -1) {
        return args.map((a3) => String(a3));
      }
      const result = [];
      for (let i2 = 0; i2 < args.length; i2++) {
        if (i2 < allowedArgCount) {
          result.push(String(args[i2]));
        } else {
          result.push("?");
        }
      }
      return result;
    }
    exports.sanitizeArgs = sanitizeArgs;
    var dc = (() => {
      try {
        return "getBuiltinModule" in process ? process.getBuiltinModule("node:diagnostics_channel") : __require("node:diagnostics_channel");
      } catch {
        return void 0;
      }
    })();
    var hasTracingChannel = dc && typeof dc.tracingChannel === "function";
    var commandChannel = hasTracingChannel ? dc.tracingChannel("ioredis:command") : void 0;
    var batchChannel = hasTracingChannel ? dc.tracingChannel("ioredis:batch") : void 0;
    var connectChannel = hasTracingChannel ? dc.tracingChannel("ioredis:connect") : void 0;
    function shouldTrace(channel) {
      return !!channel && channel.hasSubscribers !== false;
    }
    var noop3 = () => {
    };
    function traceCommand(fn, contextFactory) {
      if (!shouldTrace(commandChannel))
        return fn();
      const traced = commandChannel.tracePromise(fn, contextFactory());
      traced.catch(noop3);
      return traced;
    }
    exports.traceCommand = traceCommand;
    function traceBatch(fn, contextFactory) {
      if (!shouldTrace(batchChannel))
        return fn();
      const traced = batchChannel.tracePromise(fn, contextFactory());
      traced.catch(noop3);
      return traced;
    }
    exports.traceBatch = traceBatch;
    function traceConnect(fn, contextFactory) {
      if (!shouldTrace(connectChannel))
        return fn();
      return connectChannel.tracePromise(fn, contextFactory());
    }
    exports.traceConnect = traceConnect;
  }
});

// ../../node_modules/ioredis/built/transaction.js
var require_transaction = __commonJS({
  "../../node_modules/ioredis/built/transaction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addTransactionSupport = void 0;
    var utils_1 = require_utils2();
    var standard_as_callback_1 = require_built2();
    var Pipeline_1 = require_Pipeline();
    var tracing_1 = require_tracing();
    function addTransactionSupport(redis) {
      redis.pipeline = function(commands) {
        const pipeline = new Pipeline_1.default(this);
        if (Array.isArray(commands)) {
          pipeline.addBatch(commands);
        }
        return pipeline;
      };
      const { multi } = redis;
      redis.multi = function(commands, options) {
        if (typeof options === "undefined" && !Array.isArray(commands)) {
          options = commands;
          commands = null;
        }
        if (options && options.pipeline === false) {
          return multi.call(this);
        }
        const pipeline = new Pipeline_1.default(this);
        pipeline.multi();
        if (Array.isArray(commands)) {
          pipeline.addBatch(commands);
        }
        const exec2 = pipeline.exec;
        pipeline.exec = function(callback) {
          if (this.isCluster && !this.redis.slots.length) {
            if (this.redis.status === "wait")
              this.redis.connect().catch(utils_1.noop);
            return (0, standard_as_callback_1.default)(new Promise((resolve, reject) => {
              this.redis.delayUntilReady((err) => {
                if (err) {
                  reject(err);
                  return;
                }
                this.exec(pipeline).then(resolve, reject);
              });
            }), callback);
          }
          if (this._transactions > 0) {
            exec2.call(pipeline);
          }
          if (this.nodeifiedPromise) {
            return exec2.call(pipeline);
          }
          const batchSize = Math.max(pipeline.length - 2, 0);
          const execAndUnwrap = () => exec2.call(pipeline).then(function(result) {
            const execResult = result[result.length - 1];
            if (typeof execResult === "undefined") {
              throw new Error("Pipeline cannot be used to send any commands when the `exec()` has been called on it.");
            }
            if (execResult[0]) {
              execResult[0].previousErrors = [];
              for (let i2 = 0; i2 < result.length - 1; ++i2) {
                if (result[i2][0]) {
                  execResult[0].previousErrors.push(result[i2][0]);
                }
              }
              throw execResult[0];
            }
            return (0, utils_1.wrapMultiResult)(execResult[1]);
          });
          const promise = "_buildBatchContext" in this.redis ? (0, tracing_1.traceBatch)(execAndUnwrap, () => this.redis._buildBatchContext(batchSize)) : execAndUnwrap();
          return (0, standard_as_callback_1.default)(promise, callback);
        };
        const { execBuffer } = pipeline;
        pipeline.execBuffer = function(callback) {
          if (this._transactions > 0) {
            execBuffer.call(pipeline);
          }
          return pipeline.exec(callback);
        };
        return pipeline;
      };
      const { exec } = redis;
      redis.exec = function(callback) {
        return (0, standard_as_callback_1.default)(exec.call(this).then(function(results) {
          if (Array.isArray(results)) {
            results = (0, utils_1.wrapMultiResult)(results);
          }
          return results;
        }), callback);
      };
    }
    exports.addTransactionSupport = addTransactionSupport;
  }
});

// ../../node_modules/ioredis/built/utils/applyMixin.js
var require_applyMixin = __commonJS({
  "../../node_modules/ioredis/built/utils/applyMixin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function applyMixin(derivedConstructor, mixinConstructor) {
      Object.getOwnPropertyNames(mixinConstructor.prototype).forEach((name) => {
        Object.defineProperty(derivedConstructor.prototype, name, Object.getOwnPropertyDescriptor(mixinConstructor.prototype, name));
      });
    }
    exports.default = applyMixin;
  }
});

// ../../node_modules/ioredis/built/cluster/ClusterOptions.js
var require_ClusterOptions = __commonJS({
  "../../node_modules/ioredis/built/cluster/ClusterOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_CLUSTER_OPTIONS = void 0;
    var dns_1 = __require("dns");
    exports.DEFAULT_CLUSTER_OPTIONS = {
      clusterRetryStrategy: (times) => Math.min(100 + times * 2, 2e3),
      clusterNodeRetryStrategy: null,
      enableOfflineQueue: true,
      enableReadyCheck: true,
      scaleReads: "master",
      maxRedirections: 16,
      retryDelayOnMoved: 0,
      retryDelayOnFailover: 100,
      retryDelayOnClusterDown: 100,
      retryDelayOnTryAgain: 100,
      slotsRefreshTimeout: 1e3,
      useSRVRecords: false,
      resolveSrv: dns_1.resolveSrv,
      dnsLookup: dns_1.lookup,
      enableAutoPipelining: false,
      autoPipeliningIgnoredCommands: [],
      shardedSubscribers: false
    };
  }
});

// ../../node_modules/ioredis/built/cluster/util.js
var require_util = __commonJS({
  "../../node_modules/ioredis/built/cluster/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getConnectionName = exports.weightSrvRecords = exports.groupSrvRecords = exports.getUniqueHostnamesFromOptions = exports.normalizeNodeOptions = exports.nodeKeyToRedisOptions = exports.getNodeKey = exports.waitForRedisReady = void 0;
    var utils_1 = require_utils2();
    var net_1 = __require("net");
    function waitForRedisReady(redis) {
      if (redis.status === "ready") {
        return Promise.resolve();
      }
      if (redis.status === "wait") {
        return redis.connect();
      }
      if (redis.status === "end") {
        return Promise.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
      }
      return new Promise((resolve, reject) => {
        const onReady = () => {
          redis.removeListener("end", onEnd);
          resolve();
        };
        const onEnd = () => {
          redis.removeListener("ready", onReady);
          reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
        };
        redis.once("ready", onReady);
        redis.once("end", onEnd);
      });
    }
    exports.waitForRedisReady = waitForRedisReady;
    function getNodeKey(node) {
      node.port = node.port || 6379;
      node.host = node.host || "127.0.0.1";
      return node.host + ":" + node.port;
    }
    exports.getNodeKey = getNodeKey;
    function nodeKeyToRedisOptions(nodeKey) {
      const portIndex = nodeKey.lastIndexOf(":");
      if (portIndex === -1) {
        throw new Error(`Invalid node key ${nodeKey}`);
      }
      return {
        host: nodeKey.slice(0, portIndex),
        port: Number(nodeKey.slice(portIndex + 1))
      };
    }
    exports.nodeKeyToRedisOptions = nodeKeyToRedisOptions;
    function normalizeNodeOptions(nodes) {
      return nodes.map((node) => {
        const options = {};
        if (typeof node === "object") {
          Object.assign(options, node);
        } else if (typeof node === "string") {
          Object.assign(options, (0, utils_1.parseURL)(node));
        } else if (typeof node === "number") {
          options.port = node;
        } else {
          throw new Error("Invalid argument " + node);
        }
        if (typeof options.port === "string") {
          options.port = parseInt(options.port, 10);
        }
        delete options.db;
        if (!options.port) {
          options.port = 6379;
        }
        if (!options.host) {
          options.host = "127.0.0.1";
        }
        return (0, utils_1.resolveTLSProfile)(options);
      });
    }
    exports.normalizeNodeOptions = normalizeNodeOptions;
    function getUniqueHostnamesFromOptions(nodes) {
      const uniqueHostsMap = {};
      nodes.forEach((node) => {
        uniqueHostsMap[node.host] = true;
      });
      return Object.keys(uniqueHostsMap).filter((host) => !(0, net_1.isIP)(host));
    }
    exports.getUniqueHostnamesFromOptions = getUniqueHostnamesFromOptions;
    function groupSrvRecords(records) {
      const recordsByPriority = {};
      for (const record of records) {
        if (!recordsByPriority.hasOwnProperty(record.priority)) {
          recordsByPriority[record.priority] = {
            totalWeight: record.weight,
            records: [record]
          };
        } else {
          recordsByPriority[record.priority].totalWeight += record.weight;
          recordsByPriority[record.priority].records.push(record);
        }
      }
      return recordsByPriority;
    }
    exports.groupSrvRecords = groupSrvRecords;
    function weightSrvRecords(recordsGroup) {
      if (recordsGroup.records.length === 1) {
        recordsGroup.totalWeight = 0;
        return recordsGroup.records.shift();
      }
      const random = Math.floor(Math.random() * (recordsGroup.totalWeight + recordsGroup.records.length));
      let total = 0;
      for (const [i2, record] of recordsGroup.records.entries()) {
        total += 1 + record.weight;
        if (total > random) {
          recordsGroup.totalWeight -= record.weight;
          recordsGroup.records.splice(i2, 1);
          return record;
        }
      }
    }
    exports.weightSrvRecords = weightSrvRecords;
    function getConnectionName(component, nodeConnectionName) {
      const prefix = `ioredis-cluster(${component})`;
      return nodeConnectionName ? `${prefix}:${nodeConnectionName}` : prefix;
    }
    exports.getConnectionName = getConnectionName;
  }
});

// ../../node_modules/ioredis/built/cluster/ClusterSubscriber.js
var require_ClusterSubscriber = __commonJS({
  "../../node_modules/ioredis/built/cluster/ClusterSubscriber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var utils_1 = require_utils2();
    var Redis_1 = require_Redis();
    var debug = (0, utils_1.Debug)("cluster:subscriber");
    var ClusterSubscriber = class {
      constructor(connectionPool, emitter, isSharded = false) {
        this.connectionPool = connectionPool;
        this.emitter = emitter;
        this.isSharded = isSharded;
        this.started = false;
        this.subscriber = null;
        this.slotRange = [];
        this.onSubscriberEnd = () => {
          if (!this.started) {
            debug("subscriber has disconnected, but ClusterSubscriber is not started, so not reconnecting.");
            return;
          }
          debug("subscriber has disconnected, selecting a new one...");
          this.selectSubscriber();
        };
        this.connectionPool.on("-node", (_2, key) => {
          if (!this.started || !this.subscriber) {
            return;
          }
          if ((0, util_1.getNodeKey)(this.subscriber.options) === key) {
            debug("subscriber has left, selecting a new one...");
            this.selectSubscriber();
          }
        });
        this.connectionPool.on("+node", () => {
          if (!this.started || this.subscriber) {
            return;
          }
          debug("a new node is discovered and there is no subscriber, selecting a new one...");
          this.selectSubscriber();
        });
      }
      getInstance() {
        return this.subscriber;
      }
      /**
       * Associate this subscriber to a specific slot range.
       *
       * Returns the range or an empty array if the slot range couldn't be associated.
       *
       * BTW: This is more for debugging and testing purposes.
       *
       * @param range
       */
      associateSlotRange(range) {
        if (this.isSharded) {
          this.slotRange = range;
        }
        return this.slotRange;
      }
      start() {
        this.started = true;
        this.selectSubscriber();
        debug("started");
      }
      stop() {
        this.started = false;
        if (this.subscriber) {
          this.subscriber.disconnect();
          this.subscriber = null;
        }
      }
      isStarted() {
        return this.started;
      }
      selectSubscriber() {
        const lastActiveSubscriber = this.lastActiveSubscriber;
        if (lastActiveSubscriber) {
          lastActiveSubscriber.off("end", this.onSubscriberEnd);
          lastActiveSubscriber.disconnect();
        }
        if (this.subscriber) {
          this.subscriber.off("end", this.onSubscriberEnd);
          this.subscriber.disconnect();
        }
        const sampleNode = (0, utils_1.sample)(this.connectionPool.getNodes());
        if (!sampleNode) {
          debug("selecting subscriber failed since there is no node discovered in the cluster yet");
          this.subscriber = null;
          return;
        }
        const { options } = sampleNode;
        debug("selected a subscriber %s:%s", options.host, options.port);
        let connectionPrefix = "subscriber";
        if (this.isSharded)
          connectionPrefix = "ssubscriber";
        this.subscriber = new Redis_1.default({
          port: options.port,
          host: options.host,
          username: options.username,
          password: options.password,
          enableReadyCheck: true,
          connectionName: (0, util_1.getConnectionName)(connectionPrefix, options.connectionName),
          lazyConnect: true,
          tls: options.tls,
          protocol: options.protocol,
          replyMapping: options.replyMapping,
          // Don't try to reconnect the subscriber connection. If the connection fails
          // we will get an end event (handled below), at which point we'll pick a new
          // node from the pool and try to connect to that as the subscriber connection.
          retryStrategy: null
        });
        this.subscriber.on("error", utils_1.noop);
        this.subscriber.on("moved", () => {
          this.emitter.emit("forceRefresh");
        });
        this.subscriber.once("end", this.onSubscriberEnd);
        const previousChannels = { subscribe: [], psubscribe: [], ssubscribe: [] };
        if (lastActiveSubscriber) {
          const condition = lastActiveSubscriber.condition || lastActiveSubscriber.prevCondition;
          if (condition && condition.subscriber) {
            previousChannels.subscribe = condition.subscriber.channels("subscribe");
            previousChannels.psubscribe = condition.subscriber.channels("psubscribe");
            previousChannels.ssubscribe = condition.subscriber.channels("ssubscribe");
          }
        }
        if (previousChannels.subscribe.length || previousChannels.psubscribe.length || previousChannels.ssubscribe.length) {
          let pending = 0;
          for (const type of ["subscribe", "psubscribe", "ssubscribe"]) {
            const channels = previousChannels[type];
            if (channels.length == 0) {
              continue;
            }
            debug("%s %d channels", type, channels.length);
            if (type === "ssubscribe") {
              for (const channel of channels) {
                pending += 1;
                this.subscriber[type](channel).then(() => {
                  if (!--pending) {
                    this.lastActiveSubscriber = this.subscriber;
                  }
                }).catch(() => {
                  debug("failed to ssubscribe to channel: %s", channel);
                });
              }
            } else {
              pending += 1;
              this.subscriber[type](channels).then(() => {
                if (!--pending) {
                  this.lastActiveSubscriber = this.subscriber;
                }
              }).catch(() => {
                debug("failed to %s %d channels", type, channels.length);
              });
            }
          }
        } else {
          this.lastActiveSubscriber = this.subscriber;
        }
        for (const event of [
          "message",
          "messageBuffer"
        ]) {
          this.subscriber.on(event, (arg1, arg2) => {
            this.emitter.emit(event, arg1, arg2);
          });
        }
        for (const event of ["pmessage", "pmessageBuffer"]) {
          this.subscriber.on(event, (arg1, arg2, arg3) => {
            this.emitter.emit(event, arg1, arg2, arg3);
          });
        }
        if (this.isSharded == true) {
          for (const event of [
            "smessage",
            "smessageBuffer"
          ]) {
            this.subscriber.on(event, (arg1, arg2) => {
              this.emitter.emit(event, arg1, arg2);
            });
          }
        }
      }
    };
    exports.default = ClusterSubscriber;
  }
});

// ../../node_modules/ioredis/built/cluster/ConnectionPool.js
var require_ConnectionPool = __commonJS({
  "../../node_modules/ioredis/built/cluster/ConnectionPool.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var events_1 = __require("events");
    var utils_1 = require_utils2();
    var util_1 = require_util();
    var Redis_1 = require_Redis();
    var debug = (0, utils_1.Debug)("cluster:connectionPool");
    var ConnectionPool = class extends events_1.EventEmitter {
      constructor(redisOptions, clusterNodeRetryStrategy = null, hooks = {}) {
        super();
        this.redisOptions = redisOptions;
        this.clusterNodeRetryStrategy = clusterNodeRetryStrategy;
        this.hooks = hooks;
        this.nodes = {
          all: {},
          master: {},
          slave: {}
        };
        this.specifiedOptions = {};
      }
      getNodes(role = "all") {
        const nodes = this.nodes[role];
        return Object.keys(nodes).map((key) => nodes[key]);
      }
      getInstanceByKey(key) {
        return this.nodes.all[key];
      }
      getSampleInstance(role) {
        const keys = Object.keys(this.nodes[role]);
        const sampleKey = (0, utils_1.sample)(keys);
        return this.nodes[role][sampleKey];
      }
      /**
       * Add a master node to the pool
       * @param node
       */
      addMasterNode(node) {
        const key = (0, util_1.getNodeKey)(node.options);
        const redis = this.createRedisFromOptions(node, node.options.readOnly);
        if (!node.options.readOnly) {
          this.nodes.all[key] = redis;
          this.nodes.master[key] = redis;
          return true;
        }
        return false;
      }
      /**
       * Creates a Redis connection instance from the node options
       * @param node
       * @param readOnly
       */
      createRedisFromOptions(node, readOnly) {
        const redis = new Redis_1.default((0, utils_1.defaults)({
          // By default, never try to reconnect when a node is lost,
          // instead, waiting for a `MOVED` error and fetching slots again.
          // When `clusterNodeRetryStrategy` is set, use it to allow
          // reconnection (e.g. for replica nodes that restart without
          // any slot changes).
          retryStrategy: typeof this.clusterNodeRetryStrategy === "function" ? this.clusterNodeRetryStrategy : null,
          // Offline queue should be enabled so that
          // we don't need to wait for the `ready` event
          // before sending commands to the node.
          enableOfflineQueue: true,
          readOnly
        }, node, this.redisOptions, { lazyConnect: true }));
        this.hooks.onCreate?.(redis, readOnly);
        return redis;
      }
      /**
       * Find or create a connection to the node
       */
      findOrCreate(node, readOnly = false) {
        const key = (0, util_1.getNodeKey)(node);
        readOnly = Boolean(readOnly);
        if (this.specifiedOptions[key]) {
          Object.assign(node, this.specifiedOptions[key]);
        } else {
          this.specifiedOptions[key] = node;
        }
        let redis;
        if (this.nodes.all[key]) {
          redis = this.nodes.all[key];
          if (redis.options.readOnly !== readOnly) {
            redis.options.readOnly = readOnly;
            debug("Change role of %s to %s", key, readOnly ? "slave" : "master");
            redis[readOnly ? "readonly" : "readwrite"]().catch(utils_1.noop);
            if (readOnly) {
              delete this.nodes.master[key];
              this.nodes.slave[key] = redis;
            } else {
              delete this.nodes.slave[key];
              this.nodes.master[key] = redis;
            }
            this.hooks.onRoleChange?.(redis, key, readOnly);
          }
        } else {
          debug("Connecting to %s as %s", key, readOnly ? "slave" : "master");
          redis = this.createRedisFromOptions(node, readOnly);
          this.nodes.all[key] = redis;
          this.nodes[readOnly ? "slave" : "master"][key] = redis;
          redis.once("end", () => {
            if (this.nodes.all[key] && this.nodes.all[key] !== redis) {
              return;
            }
            this.removeNode(key);
            this.emit("-node", redis, key);
            if (!Object.keys(this.nodes.all).length) {
              this.emit("drain");
            }
          });
          this.emit("+node", redis, key);
          redis.on("error", (error) => {
            this.emit("nodeError", error, key);
          });
        }
        return redis;
      }
      /**
       * Replace the connection to the node with a fresh one. Used when the
       * existing connection is known to be stale, e.g. after a MOVED redirect
       * that points back at the node it came from.
       */
      recreate(node, readOnly = false) {
        const key = (0, util_1.getNodeKey)(node);
        const existing = this.nodes.all[key];
        if (existing) {
          debug("Recreating connection to %s", key);
          this.removeNode(key);
          existing.disconnect();
        }
        const redis = this.findOrCreate(node, readOnly);
        if (existing) {
          this.emit("-node", existing, key);
        }
        return redis;
      }
      /**
       * Reset the pool with a set of nodes.
       * The old node will be removed.
       */
      reset(nodes) {
        debug("Reset with %O", nodes);
        const newNodes = {};
        nodes.forEach((node) => {
          const key = (0, util_1.getNodeKey)(node);
          if (!(node.readOnly && newNodes[key])) {
            newNodes[key] = node;
          }
        });
        Object.keys(this.nodes.all).forEach((key) => {
          if (!newNodes[key]) {
            debug("Disconnect %s because the node does not hold any slot", key);
            this.nodes.all[key].disconnect();
            this.removeNode(key);
          }
        });
        Object.keys(newNodes).forEach((key) => {
          const node = newNodes[key];
          this.findOrCreate(node, node.readOnly);
        });
      }
      /**
       * Remove a node from the pool.
       */
      removeNode(key) {
        const { nodes } = this;
        if (nodes.all[key]) {
          debug("Remove %s from the pool", key);
          this.hooks.onRemove?.(nodes.all[key]);
          delete nodes.all[key];
        }
        delete nodes.master[key];
        delete nodes.slave[key];
      }
    };
    exports.default = ConnectionPool;
  }
});

// ../../node_modules/denque/index.js
var require_denque = __commonJS({
  "../../node_modules/denque/index.js"(exports, module) {
    "use strict";
    function Denque(array, options) {
      var options = options || {};
      this._capacity = options.capacity;
      this._head = 0;
      this._tail = 0;
      if (Array.isArray(array)) {
        this._fromArray(array);
      } else {
        this._capacityMask = 3;
        this._list = new Array(4);
      }
    }
    Denque.prototype.peekAt = function peekAt(index) {
      var i2 = index;
      if (i2 !== (i2 | 0)) {
        return void 0;
      }
      var len = this.size();
      if (i2 >= len || i2 < -len) return void 0;
      if (i2 < 0) i2 += len;
      i2 = this._head + i2 & this._capacityMask;
      return this._list[i2];
    };
    Denque.prototype.get = function get(i2) {
      return this.peekAt(i2);
    };
    Denque.prototype.peek = function peek() {
      if (this._head === this._tail) return void 0;
      return this._list[this._head];
    };
    Denque.prototype.peekFront = function peekFront() {
      return this.peek();
    };
    Denque.prototype.peekBack = function peekBack() {
      return this.peekAt(-1);
    };
    Object.defineProperty(Denque.prototype, "length", {
      get: function length() {
        return this.size();
      }
    });
    Denque.prototype.size = function size2() {
      if (this._head === this._tail) return 0;
      if (this._head < this._tail) return this._tail - this._head;
      else return this._capacityMask + 1 - (this._head - this._tail);
    };
    Denque.prototype.unshift = function unshift(item) {
      if (arguments.length === 0) return this.size();
      var len = this._list.length;
      this._head = this._head - 1 + len & this._capacityMask;
      this._list[this._head] = item;
      if (this._tail === this._head) this._growArray();
      if (this._capacity && this.size() > this._capacity) this.pop();
      if (this._head < this._tail) return this._tail - this._head;
      else return this._capacityMask + 1 - (this._head - this._tail);
    };
    Denque.prototype.shift = function shift() {
      var head = this._head;
      if (head === this._tail) return void 0;
      var item = this._list[head];
      this._list[head] = void 0;
      this._head = head + 1 & this._capacityMask;
      if (head < 2 && this._tail > 1e4 && this._tail <= this._list.length >>> 2) this._shrinkArray();
      return item;
    };
    Denque.prototype.push = function push(item) {
      if (arguments.length === 0) return this.size();
      var tail = this._tail;
      this._list[tail] = item;
      this._tail = tail + 1 & this._capacityMask;
      if (this._tail === this._head) {
        this._growArray();
      }
      if (this._capacity && this.size() > this._capacity) {
        this.shift();
      }
      if (this._head < this._tail) return this._tail - this._head;
      else return this._capacityMask + 1 - (this._head - this._tail);
    };
    Denque.prototype.pop = function pop() {
      var tail = this._tail;
      if (tail === this._head) return void 0;
      var len = this._list.length;
      this._tail = tail - 1 + len & this._capacityMask;
      var item = this._list[this._tail];
      this._list[this._tail] = void 0;
      if (this._head < 2 && tail > 1e4 && tail <= len >>> 2) this._shrinkArray();
      return item;
    };
    Denque.prototype.removeOne = function removeOne(index) {
      var i2 = index;
      if (i2 !== (i2 | 0)) {
        return void 0;
      }
      if (this._head === this._tail) return void 0;
      var size2 = this.size();
      var len = this._list.length;
      if (i2 >= size2 || i2 < -size2) return void 0;
      if (i2 < 0) i2 += size2;
      i2 = this._head + i2 & this._capacityMask;
      var item = this._list[i2];
      var k2;
      if (index < size2 / 2) {
        for (k2 = index; k2 > 0; k2--) {
          this._list[i2] = this._list[i2 = i2 - 1 + len & this._capacityMask];
        }
        this._list[i2] = void 0;
        this._head = this._head + 1 + len & this._capacityMask;
      } else {
        for (k2 = size2 - 1 - index; k2 > 0; k2--) {
          this._list[i2] = this._list[i2 = i2 + 1 + len & this._capacityMask];
        }
        this._list[i2] = void 0;
        this._tail = this._tail - 1 + len & this._capacityMask;
      }
      return item;
    };
    Denque.prototype.remove = function remove(index, count) {
      var i2 = index;
      var removed;
      var del_count = count;
      if (i2 !== (i2 | 0)) {
        return void 0;
      }
      if (this._head === this._tail) return void 0;
      var size2 = this.size();
      var len = this._list.length;
      if (i2 >= size2 || i2 < -size2 || count < 1) return void 0;
      if (i2 < 0) i2 += size2;
      if (count === 1 || !count) {
        removed = new Array(1);
        removed[0] = this.removeOne(i2);
        return removed;
      }
      if (i2 === 0 && i2 + count >= size2) {
        removed = this.toArray();
        this.clear();
        return removed;
      }
      if (i2 + count > size2) count = size2 - i2;
      var k2;
      removed = new Array(count);
      for (k2 = 0; k2 < count; k2++) {
        removed[k2] = this._list[this._head + i2 + k2 & this._capacityMask];
      }
      i2 = this._head + i2 & this._capacityMask;
      if (index + count === size2) {
        this._tail = this._tail - count + len & this._capacityMask;
        for (k2 = count; k2 > 0; k2--) {
          this._list[i2 = i2 + 1 + len & this._capacityMask] = void 0;
        }
        return removed;
      }
      if (index === 0) {
        this._head = this._head + count + len & this._capacityMask;
        for (k2 = count - 1; k2 > 0; k2--) {
          this._list[i2 = i2 + 1 + len & this._capacityMask] = void 0;
        }
        return removed;
      }
      if (i2 < size2 / 2) {
        this._head = this._head + index + count + len & this._capacityMask;
        for (k2 = index; k2 > 0; k2--) {
          this.unshift(this._list[i2 = i2 - 1 + len & this._capacityMask]);
        }
        i2 = this._head - 1 + len & this._capacityMask;
        while (del_count > 0) {
          this._list[i2 = i2 - 1 + len & this._capacityMask] = void 0;
          del_count--;
        }
        if (index < 0) this._tail = i2;
      } else {
        this._tail = i2;
        i2 = i2 + count + len & this._capacityMask;
        for (k2 = size2 - (count + index); k2 > 0; k2--) {
          this.push(this._list[i2++]);
        }
        i2 = this._tail;
        while (del_count > 0) {
          this._list[i2 = i2 + 1 + len & this._capacityMask] = void 0;
          del_count--;
        }
      }
      if (this._head < 2 && this._tail > 1e4 && this._tail <= len >>> 2) this._shrinkArray();
      return removed;
    };
    Denque.prototype.splice = function splice(index, count) {
      var i2 = index;
      if (i2 !== (i2 | 0)) {
        return void 0;
      }
      var size2 = this.size();
      if (i2 < 0) i2 += size2;
      if (i2 > size2) return void 0;
      if (arguments.length > 2) {
        var k2;
        var temp;
        var removed;
        var arg_len = arguments.length;
        var len = this._list.length;
        var arguments_index = 2;
        if (!size2 || i2 < size2 / 2) {
          temp = new Array(i2);
          for (k2 = 0; k2 < i2; k2++) {
            temp[k2] = this._list[this._head + k2 & this._capacityMask];
          }
          if (count === 0) {
            removed = [];
            if (i2 > 0) {
              this._head = this._head + i2 + len & this._capacityMask;
            }
          } else {
            removed = this.remove(i2, count);
            this._head = this._head + i2 + len & this._capacityMask;
          }
          while (arg_len > arguments_index) {
            this.unshift(arguments[--arg_len]);
          }
          for (k2 = i2; k2 > 0; k2--) {
            this.unshift(temp[k2 - 1]);
          }
        } else {
          temp = new Array(size2 - (i2 + count));
          var leng = temp.length;
          for (k2 = 0; k2 < leng; k2++) {
            temp[k2] = this._list[this._head + i2 + count + k2 & this._capacityMask];
          }
          if (count === 0) {
            removed = [];
            if (i2 != size2) {
              this._tail = this._head + i2 + len & this._capacityMask;
            }
          } else {
            removed = this.remove(i2, count);
            this._tail = this._tail - leng + len & this._capacityMask;
          }
          while (arguments_index < arg_len) {
            this.push(arguments[arguments_index++]);
          }
          for (k2 = 0; k2 < leng; k2++) {
            this.push(temp[k2]);
          }
        }
        return removed;
      } else {
        return this.remove(i2, count);
      }
    };
    Denque.prototype.clear = function clear() {
      this._list = new Array(this._list.length);
      this._head = 0;
      this._tail = 0;
    };
    Denque.prototype.isEmpty = function isEmpty() {
      return this._head === this._tail;
    };
    Denque.prototype.toArray = function toArray() {
      return this._copyArray(false);
    };
    Denque.prototype._fromArray = function _fromArray(array) {
      var length = array.length;
      var capacity = this._nextPowerOf2(length);
      this._list = new Array(capacity);
      this._capacityMask = capacity - 1;
      this._tail = length;
      for (var i2 = 0; i2 < length; i2++) this._list[i2] = array[i2];
    };
    Denque.prototype._copyArray = function _copyArray(fullCopy, size2) {
      var src = this._list;
      var capacity = src.length;
      var length = this.length;
      size2 = size2 | length;
      if (size2 == length && this._head < this._tail) {
        return this._list.slice(this._head, this._tail);
      }
      var dest = new Array(size2);
      var k2 = 0;
      var i2;
      if (fullCopy || this._head > this._tail) {
        for (i2 = this._head; i2 < capacity; i2++) dest[k2++] = src[i2];
        for (i2 = 0; i2 < this._tail; i2++) dest[k2++] = src[i2];
      } else {
        for (i2 = this._head; i2 < this._tail; i2++) dest[k2++] = src[i2];
      }
      return dest;
    };
    Denque.prototype._growArray = function _growArray() {
      if (this._head != 0) {
        var newList = this._copyArray(true, this._list.length << 1);
        this._tail = this._list.length;
        this._head = 0;
        this._list = newList;
      } else {
        this._tail = this._list.length;
        this._list.length <<= 1;
      }
      this._capacityMask = this._capacityMask << 1 | 1;
    };
    Denque.prototype._shrinkArray = function _shrinkArray() {
      this._list.length >>>= 1;
      this._capacityMask >>>= 1;
    };
    Denque.prototype._nextPowerOf2 = function _nextPowerOf2(num) {
      var log2 = Math.log(num) / Math.log(2);
      var nextPow2 = 1 << log2 + 1;
      return Math.max(nextPow2, 4);
    };
    module.exports = Denque;
  }
});

// ../../node_modules/ioredis/built/cluster/DelayQueue.js
var require_DelayQueue = __commonJS({
  "../../node_modules/ioredis/built/cluster/DelayQueue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils2();
    var Deque = require_denque();
    var debug = (0, utils_1.Debug)("delayqueue");
    var DelayQueue = class {
      constructor() {
        this.queues = {};
        this.timeouts = {};
      }
      /**
       * Add a new item to the queue
       *
       * @param bucket bucket name
       * @param item function that will run later
       * @param options
       */
      push(bucket, item, options) {
        const callback = options.callback || process.nextTick;
        if (!this.queues[bucket]) {
          this.queues[bucket] = new Deque();
        }
        const queue2 = this.queues[bucket];
        queue2.push(item);
        if (!this.timeouts[bucket]) {
          this.timeouts[bucket] = setTimeout(() => {
            callback(() => {
              this.timeouts[bucket] = null;
              this.execute(bucket);
            });
          }, options.timeout);
        }
      }
      execute(bucket) {
        const queue2 = this.queues[bucket];
        if (!queue2) {
          return;
        }
        const { length } = queue2;
        if (!length) {
          return;
        }
        debug("send %d commands in %s queue", length, bucket);
        this.queues[bucket] = null;
        while (queue2.length > 0) {
          queue2.shift()();
        }
      }
    };
    exports.default = DelayQueue;
  }
});

// ../../node_modules/ioredis/built/cluster/ShardedSubscriber.js
var require_ShardedSubscriber = __commonJS({
  "../../node_modules/ioredis/built/cluster/ShardedSubscriber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var utils_1 = require_utils2();
    var Redis_1 = require_Redis();
    var debug = (0, utils_1.Debug)("cluster:subscriberGroup:shardedSubscriber");
    var SubscriberStatus = {
      IDLE: "idle",
      STARTING: "starting",
      CONNECTED: "connected",
      STOPPING: "stopping",
      ENDED: "ended"
    };
    var ALLOWED_STATUS_UPDATES = {
      [SubscriberStatus.IDLE]: [
        SubscriberStatus.STARTING,
        SubscriberStatus.STOPPING,
        SubscriberStatus.ENDED
      ],
      [SubscriberStatus.STARTING]: [
        SubscriberStatus.CONNECTED,
        SubscriberStatus.STOPPING,
        SubscriberStatus.ENDED
      ],
      [SubscriberStatus.CONNECTED]: [
        SubscriberStatus.STOPPING,
        SubscriberStatus.ENDED
      ],
      [SubscriberStatus.STOPPING]: [SubscriberStatus.ENDED],
      [SubscriberStatus.ENDED]: []
    };
    var ShardedSubscriber = class {
      constructor(emitter, options, redisOptions) {
        this.emitter = emitter;
        this.status = SubscriberStatus.IDLE;
        this.instance = null;
        this.connectPromise = null;
        this.messageListeners = /* @__PURE__ */ new Map();
        this.onEnd = () => {
          this.updateStatus(SubscriberStatus.ENDED);
          this.emitter.emit("-node", this.instance, this.nodeKey);
        };
        this.onError = (error) => {
          this.emitter.emit("nodeError", error, this.nodeKey);
        };
        this.onMoved = () => {
          this.emitter.emit("moved");
        };
        this.instance = new Redis_1.default((0, utils_1.defaults)({
          enableReadyCheck: false,
          enableOfflineQueue: true,
          connectionName: (0, util_1.getConnectionName)("ssubscriber", options.connectionName),
          /**
           * Disable auto reconnection for subscribers.
           * The ClusterSubscriberGroup will handle the reconnection.
           */
          retryStrategy: null,
          lazyConnect: true
        }, options, redisOptions));
        this.lazyConnect = redisOptions?.lazyConnect ?? true;
        this.nodeKey = (0, util_1.getNodeKey)(options);
        this.instance.on("end", this.onEnd);
        this.instance.on("error", this.onError);
        this.instance.on("moved", this.onMoved);
        for (const event of ["smessage", "smessageBuffer"]) {
          const listener = (...args) => {
            this.emitter.emit(event, ...args);
          };
          this.messageListeners.set(event, listener);
          this.instance.on(event, listener);
        }
      }
      async start() {
        if (this.connectPromise) {
          return this.connectPromise;
        }
        if (this.status === SubscriberStatus.STARTING || this.status === SubscriberStatus.CONNECTED) {
          return;
        }
        if (this.status === SubscriberStatus.ENDED || !this.instance) {
          throw new Error(`Sharded subscriber ${this.nodeKey} cannot be restarted once ended.`);
        }
        this.updateStatus(SubscriberStatus.STARTING);
        this.connectPromise = this.instance.connect();
        try {
          await this.connectPromise;
          this.updateStatus(SubscriberStatus.CONNECTED);
        } catch (err) {
          this.updateStatus(SubscriberStatus.ENDED);
          throw err;
        } finally {
          this.connectPromise = null;
        }
      }
      stop() {
        this.updateStatus(SubscriberStatus.STOPPING);
        if (this.instance) {
          this.instance.disconnect();
          this.instance.removeAllListeners();
          this.messageListeners.clear();
          this.instance = null;
        }
        this.updateStatus(SubscriberStatus.ENDED);
        debug("stopped %s", this.nodeKey);
      }
      isStarted() {
        return [
          SubscriberStatus.CONNECTED,
          SubscriberStatus.STARTING
        ].includes(this.status);
      }
      get subscriberStatus() {
        return this.status;
      }
      isHealthy() {
        return (this.status === SubscriberStatus.IDLE || this.status === SubscriberStatus.CONNECTED || this.status === SubscriberStatus.STARTING) && this.instance !== null;
      }
      getInstance() {
        return this.instance;
      }
      getNodeKey() {
        return this.nodeKey;
      }
      isLazyConnect() {
        return this.lazyConnect;
      }
      updateStatus(nextStatus) {
        if (this.status === nextStatus) {
          return;
        }
        if (!ALLOWED_STATUS_UPDATES[this.status].includes(nextStatus)) {
          debug("Invalid status transition for %s: %s -> %s", this.nodeKey, this.status, nextStatus);
          return;
        }
        this.status = nextStatus;
      }
    };
    exports.default = ShardedSubscriber;
  }
});

// ../../node_modules/ioredis/built/cluster/ClusterSubscriberGroup.js
var require_ClusterSubscriberGroup = __commonJS({
  "../../node_modules/ioredis/built/cluster/ClusterSubscriberGroup.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils2();
    var util_1 = require_util();
    var calculateSlot = require_lib();
    var ShardedSubscriber_1 = require_ShardedSubscriber();
    var debug = (0, utils_1.Debug)("cluster:subscriberGroup");
    var ClusterSubscriberGroup = class _ClusterSubscriberGroup {
      /**
       * Register callbacks
       *
       * @param cluster
       */
      constructor(subscriberGroupEmitter, options) {
        this.subscriberGroupEmitter = subscriberGroupEmitter;
        this.options = options;
        this.shardedSubscribers = /* @__PURE__ */ new Map();
        this.clusterSlots = [];
        this.subscriberToSlotsIndex = /* @__PURE__ */ new Map();
        this.channels = /* @__PURE__ */ new Map();
        this.failedAttemptsByNode = /* @__PURE__ */ new Map();
        this.isResetting = false;
        this.pendingReset = null;
        this.handleSubscriberConnectFailed = (error, nodeKey) => {
          const currentAttempts = this.failedAttemptsByNode.get(nodeKey) || 0;
          const failedAttempts = currentAttempts + 1;
          this.failedAttemptsByNode.set(nodeKey, failedAttempts);
          const attempts = Math.min(failedAttempts, _ClusterSubscriberGroup.MAX_RETRY_ATTEMPTS);
          const backoff2 = Math.min(_ClusterSubscriberGroup.BASE_BACKOFF_MS * 2 ** attempts, _ClusterSubscriberGroup.MAX_BACKOFF_MS);
          const jitter = Math.floor((Math.random() - 0.5) * (backoff2 * 0.5));
          const delay = Math.max(0, backoff2 + jitter);
          debug("Failed to connect subscriber for %s. Refreshing slots in %dms", nodeKey, delay);
          this.subscriberGroupEmitter.emit("subscriberConnectFailed", {
            delay,
            error
          });
        };
        this.handleSubscriberConnectSucceeded = (nodeKey) => {
          this.failedAttemptsByNode.delete(nodeKey);
        };
      }
      /**
       * Get the responsible subscriber.
       *
       * @param slot
       */
      getResponsibleSubscriber(slot) {
        const nodeKey = this.clusterSlots[slot][0];
        const sub = this.shardedSubscribers.get(nodeKey);
        if (sub && sub.subscriberStatus === "idle") {
          sub.start().then(() => {
            this.handleSubscriberConnectSucceeded(sub.getNodeKey());
          }).catch((err) => {
            this.handleSubscriberConnectFailed(err, sub.getNodeKey());
          });
        }
        return sub;
      }
      /**
       * Adds a channel for which this subscriber group is responsible
       *
       * @param channels
       */
      addChannels(channels) {
        const slot = calculateSlot(channels[0]);
        for (const c3 of channels) {
          if (calculateSlot(c3) !== slot) {
            return -1;
          }
        }
        const currChannels = this.channels.get(slot);
        if (!currChannels) {
          this.channels.set(slot, channels);
        } else {
          this.channels.set(slot, currChannels.concat(channels));
        }
        return Array.from(this.channels.values()).reduce((sum, array) => sum + array.length, 0);
      }
      /**
       * Removes channels for which the subscriber group is responsible by optionally unsubscribing
       * @param channels
       */
      removeChannels(channels) {
        const slot = calculateSlot(channels[0]);
        for (const c3 of channels) {
          if (calculateSlot(c3) !== slot) {
            return -1;
          }
        }
        const slotChannels = this.channels.get(slot);
        if (slotChannels) {
          const updatedChannels = slotChannels.filter((c3) => !channels.includes(c3));
          this.channels.set(slot, updatedChannels);
        }
        return Array.from(this.channels.values()).reduce((sum, array) => sum + array.length, 0);
      }
      /**
       * Disconnect all subscribers and clear some of the internal state.
       */
      stop() {
        for (const s3 of this.shardedSubscribers.values()) {
          s3.stop();
        }
        this.pendingReset = null;
        this.shardedSubscribers.clear();
        this.subscriberToSlotsIndex.clear();
      }
      /**
       * Start all not yet started subscribers
       */
      start() {
        const startPromises = [];
        for (const s3 of this.shardedSubscribers.values()) {
          if (this.shouldStartSubscriber(s3)) {
            startPromises.push(s3.start().then(() => {
              this.handleSubscriberConnectSucceeded(s3.getNodeKey());
            }).catch((err) => {
              this.handleSubscriberConnectFailed(err, s3.getNodeKey());
            }));
            this.subscriberGroupEmitter.emit("+subscriber");
          }
        }
        return Promise.all(startPromises);
      }
      /**
       * Resets the subscriber group by disconnecting all subscribers that are no longer needed and connecting new ones.
       */
      async reset(clusterSlots, clusterNodes) {
        if (this.isResetting) {
          this.pendingReset = { slots: clusterSlots, nodes: clusterNodes };
          return;
        }
        this.isResetting = true;
        try {
          const hasTopologyChanged = this._refreshSlots(clusterSlots);
          const hasFailedSubscribers = this.hasUnhealthySubscribers();
          if (!hasTopologyChanged && !hasFailedSubscribers) {
            debug("No topology change detected or failed subscribers. Skipping reset.");
            return;
          }
          for (const [nodeKey, shardedSubscriber] of this.shardedSubscribers) {
            if (
              // If the subscriber is still responsible for a slot range and is healthy then keep it
              this.subscriberToSlotsIndex.has(nodeKey) && shardedSubscriber.isHealthy()
            ) {
              debug("Skipping deleting subscriber for %s", nodeKey);
              continue;
            }
            debug("Removing subscriber for %s", nodeKey);
            shardedSubscriber.stop();
            this.shardedSubscribers.delete(nodeKey);
            this.subscriberGroupEmitter.emit("-subscriber");
          }
          const startPromises = [];
          for (const [nodeKey, _2] of this.subscriberToSlotsIndex) {
            const existingSubscriber = this.shardedSubscribers.get(nodeKey);
            if (existingSubscriber && existingSubscriber.isHealthy()) {
              debug("Skipping creating new subscriber for %s", nodeKey);
              if (!existingSubscriber.isStarted() && this.shouldStartSubscriber(existingSubscriber)) {
                startPromises.push(existingSubscriber.start().then(() => {
                  this.handleSubscriberConnectSucceeded(nodeKey);
                }).catch((error) => {
                  this.handleSubscriberConnectFailed(error, nodeKey);
                }));
              }
              continue;
            }
            if (existingSubscriber && !existingSubscriber.isHealthy()) {
              debug("Replacing subscriber for %s", nodeKey);
              existingSubscriber.stop();
              this.shardedSubscribers.delete(nodeKey);
              this.subscriberGroupEmitter.emit("-subscriber");
            }
            debug("Creating new subscriber for %s", nodeKey);
            const redis = clusterNodes.find((node) => {
              return (0, util_1.getNodeKey)(node.options) === nodeKey;
            });
            if (!redis) {
              debug("Failed to find node for key %s", nodeKey);
              continue;
            }
            const sub = new ShardedSubscriber_1.default(this.subscriberGroupEmitter, redis.options, this.options.redisOptions);
            this.shardedSubscribers.set(nodeKey, sub);
            if (this.shouldStartSubscriber(sub)) {
              startPromises.push(sub.start().then(() => {
                this.handleSubscriberConnectSucceeded(nodeKey);
              }).catch((error) => {
                this.handleSubscriberConnectFailed(error, nodeKey);
              }));
            }
            this.subscriberGroupEmitter.emit("+subscriber");
          }
          await Promise.all(startPromises);
          this._resubscribe();
          this.subscriberGroupEmitter.emit("subscribersReady");
        } finally {
          this.isResetting = false;
          if (this.pendingReset) {
            const { slots, nodes } = this.pendingReset;
            this.pendingReset = null;
            await this.reset(slots, nodes);
          }
        }
      }
      /**
       * Refreshes the subscriber-related slot ranges
       *
       * Returns false if no refresh was needed
       *
       * @param targetSlots
       */
      _refreshSlots(targetSlots) {
        if (this._slotsAreEqual(targetSlots) && this.subscriberToSlotsIndex.size > 0) {
          debug("Nothing to refresh because the new cluster map is equal to the previous one.");
          return false;
        }
        debug("Refreshing the slots of the subscriber group.");
        this.subscriberToSlotsIndex = /* @__PURE__ */ new Map();
        for (let slot = 0; slot < targetSlots.length; slot++) {
          const node = targetSlots[slot][0];
          if (!this.subscriberToSlotsIndex.has(node)) {
            this.subscriberToSlotsIndex.set(node, []);
          }
          this.subscriberToSlotsIndex.get(node).push(Number(slot));
        }
        this.clusterSlots = JSON.parse(JSON.stringify(targetSlots));
        return true;
      }
      /**
       * Resubscribes to the previous channels
       *
       * @private
       */
      _resubscribe() {
        if (this.shardedSubscribers) {
          this.shardedSubscribers.forEach((s3, nodeKey) => {
            const subscriberSlots = this.subscriberToSlotsIndex.get(nodeKey);
            if (subscriberSlots) {
              subscriberSlots.forEach((ss) => {
                const redis = s3.getInstance();
                const channels = this.channels.get(ss);
                if (channels && channels.length > 0) {
                  if (!redis || redis.status === "end") {
                    return;
                  }
                  if (redis.status === "ready") {
                    redis.ssubscribe(...channels).catch((err) => {
                      debug("Failed to ssubscribe on node %s: %s", nodeKey, err);
                    });
                  } else {
                    redis.once("ready", () => {
                      redis.ssubscribe(...channels).catch((err) => {
                        debug("Failed to ssubscribe on node %s: %s", nodeKey, err);
                      });
                    });
                  }
                }
              });
            }
          });
        }
      }
      /**
       * Deep equality of the cluster slots objects
       *
       * @param other
       * @private
       */
      _slotsAreEqual(other) {
        if (this.clusterSlots === void 0) {
          return false;
        } else {
          return JSON.stringify(this.clusterSlots) === JSON.stringify(other);
        }
      }
      /**
       * Checks if any subscribers are in an unhealthy state.
       *
       * A subscriber is considered unhealthy if:
       * - It exists but is not started (failed/disconnected)
       * - It's missing entirely for a node that should have one
       *
       * @returns true if any subscribers need to be recreated
       */
      hasUnhealthySubscribers() {
        const hasFailedSubscribers = Array.from(this.shardedSubscribers.values()).some((sub) => !sub.isHealthy());
        const hasMissingSubscribers = Array.from(this.subscriberToSlotsIndex.keys()).some((nodeKey) => !this.shardedSubscribers.has(nodeKey));
        return hasFailedSubscribers || hasMissingSubscribers;
      }
      shouldStartSubscriber(sub) {
        if (sub.isStarted()) {
          return false;
        }
        if (!sub.isLazyConnect()) {
          return true;
        }
        const subscriberSlots = this.subscriberToSlotsIndex.get(sub.getNodeKey());
        if (!subscriberSlots) {
          return false;
        }
        return subscriberSlots.some((slot) => {
          const channels = this.channels.get(slot);
          return Boolean(channels && channels.length > 0);
        });
      }
    };
    ClusterSubscriberGroup.MAX_RETRY_ATTEMPTS = 10;
    ClusterSubscriberGroup.MAX_BACKOFF_MS = 2e3;
    ClusterSubscriberGroup.BASE_BACKOFF_MS = 100;
    exports.default = ClusterSubscriberGroup;
  }
});

// ../../node_modules/ioredis/built/cluster/index.js
var require_cluster = __commonJS({
  "../../node_modules/ioredis/built/cluster/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_built();
    var events_1 = __require("events");
    var redis_errors_1 = require_redis_errors();
    var standard_as_callback_1 = require_built2();
    var Command_1 = require_Command();
    var ClusterAllFailedError_1 = require_ClusterAllFailedError();
    var Redis_1 = require_Redis();
    var ScanStream_1 = require_ScanStream();
    var transaction_1 = require_transaction();
    var utils_1 = require_utils2();
    var applyMixin_1 = require_applyMixin();
    var Commander_1 = require_Commander();
    var ClusterOptions_1 = require_ClusterOptions();
    var ClusterSubscriber_1 = require_ClusterSubscriber();
    var ConnectionPool_1 = require_ConnectionPool();
    var DelayQueue_1 = require_DelayQueue();
    var util_1 = require_util();
    var Deque = require_denque();
    var ClusterSubscriberGroup_1 = require_ClusterSubscriberGroup();
    var HimportCoordinator_1 = require_HimportCoordinator();
    var debug = (0, utils_1.Debug)("cluster");
    var REJECT_OVERWRITTEN_COMMANDS = /* @__PURE__ */ new WeakSet();
    var Cluster = class _Cluster extends Commander_1.default {
      /**
       * Creates an instance of Cluster.
       */
      //TODO: Add an option that enables or disables sharded PubSub
      // `redisOptions.replyMapping` carries the `ReplyMapping` class type parameter
      // so RESP3 return shapes are inferred from the options literal at construction,
      // mirroring the single-node `Redis` constructor.
      constructor(startupNodes, options = {}) {
        super();
        this.slots = [];
        this._groupsIds = {};
        this._groupsBySlot = Array(16384);
        this.isCluster = true;
        this.retryAttempts = 0;
        this.delayQueue = new DelayQueue_1.default();
        this.offlineQueue = new Deque();
        this.isRefreshing = false;
        this._refreshSlotsCacheCallbacks = [];
        this._autoPipelines = /* @__PURE__ */ new Map();
        this._runningAutoPipelines = /* @__PURE__ */ new Set();
        this._readyDelayedCallbacks = [];
        this.connectionEpoch = 0;
        events_1.EventEmitter.call(this);
        this.startupNodes = startupNodes;
        this.options = (0, utils_1.defaults)({}, options, ClusterOptions_1.DEFAULT_CLUSTER_OPTIONS, this.options);
        this.options.himportFieldsets = (0, HimportCoordinator_1.cloneHimportFieldsets)(this.options.himportFieldsets);
        const himportCoordinator = this.options.himportFieldsets?.length ? new HimportCoordinator_1.default(this.options.himportFieldsets) : void 0;
        if (himportCoordinator) {
          (0, HimportCoordinator_1.bindHimportCoordinator)(this, himportCoordinator, "cluster");
        }
        if (this.options.shardedSubscribers) {
          this.createShardedSubscriberGroup();
        }
        if (this.options.redisOptions && this.options.redisOptions.keyPrefix && !this.options.keyPrefix) {
          this.options.keyPrefix = this.options.redisOptions.keyPrefix;
        }
        if (typeof this.options.scaleReads !== "function" && ["all", "master", "slave"].indexOf(this.options.scaleReads) === -1) {
          throw new Error('Invalid option scaleReads "' + this.options.scaleReads + '". Expected "all", "master", "slave" or a custom function');
        }
        const redisOptions = { ...this.options.redisOptions ?? {} };
        delete redisOptions.himportFieldsets;
        this.connectionPool = new ConnectionPool_1.default(redisOptions, this.options.clusterNodeRetryStrategy, himportCoordinator ? {
          onCreate: (redis, readOnly) => {
            (0, HimportCoordinator_1.bindHimportCoordinator)(redis, himportCoordinator, readOnly ? "replica" : "master");
          },
          onRoleChange: (redis, key, readOnly) => {
            (0, HimportCoordinator_1.setHimportRole)(redis, readOnly ? "replica" : "master");
            himportCoordinator.invalidate(redis);
            if (!readOnly) {
              (0, util_1.waitForRedisReady)(redis).then(() => {
                for (const definition of himportCoordinator.getDefinitions()) {
                  const preparation = himportCoordinator.ensurePrepared(redis, definition);
                  preparation?.catch((error) => {
                    this.emit("node error", error, key);
                  });
                }
              }, (error) => {
                this.emit("node error", error, key);
              });
            }
          },
          onRemove: (redis) => {
            (0, HimportCoordinator_1.unbindHimportCoordinator)(redis);
          }
        } : void 0);
        this.connectionPool.on("-node", (redis, key) => {
          this.emit("-node", redis);
        });
        this.connectionPool.on("+node", (redis) => {
          this.emit("+node", redis);
        });
        this.connectionPool.on("drain", () => {
          this.setStatus("close");
        });
        this.connectionPool.on("nodeError", (error, key) => {
          this.emit("node error", error, key);
        });
        this.subscriber = new ClusterSubscriber_1.default(this.connectionPool, this);
        if (this.options.scripts) {
          Object.entries(this.options.scripts).forEach(([name, definition]) => {
            this.defineCommand(name, definition);
          });
        }
        if (this.options.lazyConnect) {
          this.setStatus("wait");
        } else {
          this.connect().catch((err) => {
            debug("connecting failed: %s", err);
          });
        }
      }
      /**
       * Connect to a cluster
       */
      connect() {
        return new Promise((resolve, reject) => {
          if (this.status === "connecting" || this.status === "connect" || this.status === "ready") {
            reject(new Error("Redis is already connecting/connected"));
            return;
          }
          const epoch = ++this.connectionEpoch;
          this.setStatus("connecting");
          this.resolveStartupNodeHostnames().then((nodes) => {
            if (this.connectionEpoch !== epoch) {
              debug("discard connecting after resolving startup nodes because epoch not match: %d != %d", epoch, this.connectionEpoch);
              reject(new redis_errors_1.RedisError("Connection is discarded because a new connection is made"));
              return;
            }
            if (this.status !== "connecting") {
              debug("discard connecting after resolving startup nodes because the status changed to %s", this.status);
              reject(new redis_errors_1.RedisError("Connection is aborted"));
              return;
            }
            this.connectionPool.reset(nodes);
            if (this.options.shardedSubscribers) {
              this.shardedSubscribers.reset(this.slots, this.connectionPool.getNodes("all")).catch((err) => {
                debug("Error while starting subscribers: %s", err);
              });
            }
            const readyHandler = () => {
              this.setStatus("ready");
              this.retryAttempts = 0;
              this.executeOfflineCommands();
              this.resetNodesRefreshInterval();
              resolve();
            };
            let closeListener = void 0;
            const refreshListener = () => {
              this.invokeReadyDelayedCallbacks(void 0);
              this.removeListener("close", closeListener);
              this.manuallyClosing = false;
              this.setStatus("connect");
              if (this.options.enableReadyCheck) {
                this.readyCheck((err, fail) => {
                  if (err || fail) {
                    debug("Ready check failed (%s). Reconnecting...", err || fail);
                    if (this.status === "connect") {
                      this.disconnect(true);
                    }
                  } else {
                    readyHandler();
                  }
                });
              } else {
                readyHandler();
              }
            };
            closeListener = () => {
              const error = new Error("None of startup nodes is available");
              this.removeListener("refresh", refreshListener);
              this.invokeReadyDelayedCallbacks(error);
              reject(error);
            };
            this.once("refresh", refreshListener);
            this.once("close", closeListener);
            this.once("close", this.handleCloseEvent.bind(this));
            this.refreshSlotsCache((err) => {
              if (err && err.message === ClusterAllFailedError_1.default.defaultMessage) {
                Redis_1.default.prototype.silentEmit.call(this, "error", err);
                this.connectionPool.reset([]);
              }
            });
            this.subscriber.start();
            if (this.options.shardedSubscribers) {
              this.shardedSubscribers.start().catch((err) => {
                debug("Error while starting subscribers: %s", err);
              });
            }
          }).catch((err) => {
            this.setStatus("close");
            this.handleCloseEvent(err);
            this.invokeReadyDelayedCallbacks(err);
            reject(err);
          });
        });
      }
      /**
       * Disconnect from every node in the cluster.
       */
      disconnect(reconnect = false) {
        const status = this.status;
        this.setStatus("disconnecting");
        if (!reconnect) {
          this.manuallyClosing = true;
        }
        if (this.reconnectTimeout && !reconnect) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
          debug("Canceled reconnecting attempts");
        }
        this.clearNodesRefreshInterval();
        this.subscriber.stop();
        if (this.options.shardedSubscribers) {
          this.shardedSubscribers.stop();
        }
        if (status === "wait") {
          this.setStatus("close");
          this.handleCloseEvent();
        } else {
          this.connectionPool.reset([]);
        }
      }
      /**
       * Quit the cluster gracefully.
       */
      quit(callback) {
        const status = this.status;
        this.setStatus("disconnecting");
        this.manuallyClosing = true;
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        this.clearNodesRefreshInterval();
        this.subscriber.stop();
        if (this.options.shardedSubscribers) {
          this.shardedSubscribers.stop();
        }
        if (status === "wait") {
          const ret = (0, standard_as_callback_1.default)(Promise.resolve("OK"), callback);
          setImmediate(function() {
            this.setStatus("close");
            this.handleCloseEvent();
          }.bind(this));
          return ret;
        }
        return (0, standard_as_callback_1.default)(Promise.all(this.nodes().map((node) => node.quit().catch((err) => {
          if (err.message === utils_1.CONNECTION_CLOSED_ERROR_MSG) {
            return "OK";
          }
          throw err;
        }))).then(() => "OK"), callback);
      }
      /**
       * Create a new instance with the same startup nodes and options as the current one.
       *
       * @example
       * ```js
       * var cluster = new Redis.Cluster([{ host: "127.0.0.1", port: "30001" }]);
       * var anotherCluster = cluster.duplicate();
       * ```
       */
      duplicate(overrideStartupNodes = [], overrideOptions) {
        const startupNodes = overrideStartupNodes.length > 0 ? overrideStartupNodes : this.startupNodes.slice(0);
        const options = Object.assign({}, this.options, overrideOptions);
        if (this.options.redisOptions && overrideOptions?.redisOptions) {
          options.redisOptions = Object.assign({}, this.options.redisOptions, overrideOptions.redisOptions);
        }
        return new _Cluster(startupNodes, options);
      }
      /**
       * Get nodes with the specified role
       */
      nodes(role = "all") {
        if (role !== "all" && role !== "master" && role !== "slave") {
          throw new Error('Invalid role "' + role + '". Expected "all", "master" or "slave"');
        }
        return this.connectionPool.getNodes(role);
      }
      /**
       * This is needed in order not to install a listener for each auto pipeline
       *
       * @ignore
       */
      delayUntilReady(callback) {
        this._readyDelayedCallbacks.push(callback);
      }
      /**
       * Get the number of commands queued in automatic pipelines.
       *
       * This is not available (and returns 0) until the cluster is connected and slots information have been received.
       */
      get autoPipelineQueueSize() {
        let queued = 0;
        for (const pipeline of this._autoPipelines.values()) {
          queued += pipeline.length;
        }
        return queued;
      }
      /**
       * Refresh the slot cache
       *
       * @ignore
       */
      refreshSlotsCache(callback) {
        if (callback) {
          this._refreshSlotsCacheCallbacks.push(callback);
        }
        if (this.isRefreshing) {
          return;
        }
        this.isRefreshing = true;
        const _this = this;
        const wrapper = (error) => {
          this.isRefreshing = false;
          for (const callback2 of this._refreshSlotsCacheCallbacks) {
            callback2(error);
          }
          this._refreshSlotsCacheCallbacks = [];
        };
        const nodes = (0, utils_1.shuffle)(this.connectionPool.getNodes());
        let lastNodeError = null;
        function tryNode(index) {
          if (index === nodes.length) {
            const error = new ClusterAllFailedError_1.default(ClusterAllFailedError_1.default.defaultMessage, lastNodeError);
            return wrapper(error);
          }
          const node = nodes[index];
          const key = `${node.options.host}:${node.options.port}`;
          debug("getting slot cache from %s", key);
          _this.getInfoFromNode(node, function(err) {
            switch (_this.status) {
              case "close":
              case "end":
                return wrapper(new Error("Cluster is disconnected."));
              case "disconnecting":
                return wrapper(new Error("Cluster is disconnecting."));
            }
            if (err) {
              _this.emit("node error", err, key);
              lastNodeError = err;
              tryNode(index + 1);
            } else {
              _this.emit("refresh");
              wrapper();
            }
          });
        }
        tryNode(0);
      }
      /**
       * @ignore
       */
      sendCommand(command, stream, node) {
        if (this.status === "wait") {
          this.connect().catch(utils_1.noop);
        }
        if (this.status === "end") {
          command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
          return command.promise;
        }
        if (!stream && !node && this.status === "ready" && (0, HimportCoordinator_1.isHimportControlCommand)(command) && (0, HimportCoordinator_1.interceptHimportControlCommand)(this.connectionPool.getNodes("master"), command)) {
          return command.promise;
        }
        let to = this.options.scaleReads;
        if (to !== "master") {
          const isCommandReadOnly = command.isReadOnly || (0, commands_1.exists)(command.name) && (0, commands_1.hasFlag)(command.name, "readonly");
          if (!isCommandReadOnly) {
            to = "master";
          }
        }
        let targetSlot = node ? node.slot : command.getSlot();
        const ttl = {};
        const _this = this;
        let lastRedis = null;
        if (!node && !REJECT_OVERWRITTEN_COMMANDS.has(command)) {
          REJECT_OVERWRITTEN_COMMANDS.add(command);
          const reject = command.reject;
          command.reject = function(err) {
            const partialTry = tryConnection.bind(null, true);
            _this.handleError(err, ttl, {
              moved: function(slot, key) {
                debug("command %s is moved to %s", command.name, key);
                targetSlot = Number(slot);
                if (_this.slots[slot]) {
                  _this.slots[slot][0] = key;
                } else {
                  _this.slots[slot] = [key];
                }
                _this._groupsBySlot[slot] = _this._groupsIds[_this.slots[slot].join(";")];
                const mapped = _this.natMapper(key);
                const mappedKey = (0, util_1.getNodeKey)(mapped);
                if (lastRedis && (0, util_1.getNodeKey)(lastRedis.options) === mappedKey && _this.connectionPool.getInstanceByKey(mappedKey) === lastRedis) {
                  debug("MOVED redirect points back at %s; recreating its connection", mappedKey);
                  _this.connectionPool.recreate(mapped);
                } else {
                  _this.connectionPool.findOrCreate(mapped);
                }
                tryConnection();
                debug("refreshing slot caches... (triggered by MOVED error)");
                _this.refreshSlotsCache();
              },
              ask: function(slot, key) {
                debug("command %s is required to ask %s:%s", command.name, key);
                const mapped = _this.natMapper(key);
                _this.connectionPool.findOrCreate(mapped);
                tryConnection(false, `${mapped.host}:${mapped.port}`);
              },
              tryagain: partialTry,
              clusterDown: partialTry,
              connectionClosed: partialTry,
              maxRedirections: function(redirectionError) {
                reject.call(command, redirectionError);
              },
              defaults: function() {
                reject.call(command, err);
              }
            });
          };
        }
        tryConnection();
        function tryConnection(random, asking) {
          if (_this.status === "end") {
            command.reject(new redis_errors_1.AbortError("Cluster is ended."));
            return;
          }
          let redis;
          if (_this.status === "ready" || command.name === "cluster") {
            if (node && node.redis) {
              redis = node.redis;
            } else if (Command_1.default.checkFlag("ENTER_SUBSCRIBER_MODE", command.name) || Command_1.default.checkFlag("EXIT_SUBSCRIBER_MODE", command.name)) {
              if (_this.options.shardedSubscribers && (command.name == "ssubscribe" || command.name == "sunsubscribe")) {
                const sub = _this.shardedSubscribers.getResponsibleSubscriber(targetSlot);
                if (!sub) {
                  command.reject(new redis_errors_1.AbortError(`No sharded subscriber for slot: ${targetSlot}`));
                  return;
                }
                let status = -1;
                if (command.name == "ssubscribe") {
                  status = _this.shardedSubscribers.addChannels(command.getKeys());
                }
                if (command.name == "sunsubscribe") {
                  status = _this.shardedSubscribers.removeChannels(command.getKeys());
                }
                if (status !== -1) {
                  redis = sub.getInstance();
                } else {
                  command.reject(new redis_errors_1.AbortError("Possible CROSSSLOT error: All channels must hash to the same slot"));
                }
              } else {
                redis = _this.subscriber.getInstance();
              }
              if (!redis) {
                command.reject(new redis_errors_1.AbortError("No subscriber for the cluster"));
                return;
              }
            } else {
              if (!random) {
                if (typeof targetSlot === "number" && _this.slots[targetSlot]) {
                  const nodeKeys = _this.slots[targetSlot];
                  if (typeof to === "function") {
                    const nodes = nodeKeys.map(function(key) {
                      return _this.connectionPool.getInstanceByKey(key);
                    });
                    redis = to(nodes, command);
                    if (Array.isArray(redis)) {
                      redis = (0, utils_1.sample)(redis);
                    }
                    if (!redis) {
                      redis = nodes[0];
                    }
                  } else {
                    let key;
                    if (to === "all") {
                      key = (0, utils_1.sample)(nodeKeys);
                    } else if (to === "slave" && nodeKeys.length > 1) {
                      key = (0, utils_1.sample)(nodeKeys, 1);
                    } else {
                      key = nodeKeys[0];
                    }
                    redis = _this.connectionPool.getInstanceByKey(key);
                  }
                }
                if (asking) {
                  redis = _this.connectionPool.getInstanceByKey(asking);
                }
              }
              if (!redis) {
                redis = (typeof to === "function" ? null : _this.connectionPool.getSampleInstance(to)) || _this.connectionPool.getSampleInstance("all");
              }
              if (redis && !_this.options.enableOfflineQueue && redis.status !== "ready" && redis.status !== "wait") {
                command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
                return;
              }
            }
            if (node && !node.redis) {
              node.redis = redis;
            }
          }
          if (!redis && _this.options.enableOfflineQueue) {
            _this.offlineQueue.push({
              command,
              stream,
              node
            });
            return;
          }
          if (!redis) {
            command.reject(new Error("Cluster isn't ready and enableOfflineQueue options is false"));
            return;
          }
          lastRedis = redis;
          if (asking) {
            const himportBinding = (0, HimportCoordinator_1.getHimportBinding)(redis);
            const managedSet = !stream && himportBinding?.role === "master" ? himportBinding.coordinator.classify(command) : void 0;
            if (managedSet) {
              (0, util_1.waitForRedisReady)(redis).then(() => {
                if (command.isSettled) {
                  return;
                }
                const preparation = himportBinding.coordinator.prepareCommand(redis, command);
                return preparation ?? Promise.resolve();
              }).then(() => {
                if (command.isSettled) {
                  return;
                }
                himportBinding.coordinator.allowNextSend(redis, command);
                redis.asking();
                redis.sendCommand(command, stream);
              }, (error) => {
                if (!command.isSettled) {
                  command.reject(error);
                }
              });
              return;
            }
            redis.asking();
          }
          redis.sendCommand(command, stream);
        }
        return command.promise;
      }
      sscanStream(key, options) {
        return this.createScanStream("sscan", { key, options });
      }
      sscanBufferStream(key, options) {
        return this.createScanStream("sscanBuffer", { key, options });
      }
      hscanStream(key, options) {
        return this.createScanStream("hscan", { key, options });
      }
      hscanBufferStream(key, options) {
        return this.createScanStream("hscanBuffer", { key, options });
      }
      zscanStream(key, options) {
        return this.createScanStream("zscan", { key, options });
      }
      zscanBufferStream(key, options) {
        return this.createScanStream("zscanBuffer", { key, options });
      }
      /**
       * @ignore
       */
      handleError(error, ttl, handlers) {
        if (typeof ttl.value === "undefined") {
          ttl.value = this.options.maxRedirections;
        } else {
          ttl.value -= 1;
        }
        if (ttl.value <= 0) {
          handlers.maxRedirections(new Error("Too many Cluster redirections. Last error: " + error));
          return;
        }
        const errv = error.message.split(" ");
        if (errv[0] === "MOVED") {
          const slot = Number(errv[1]);
          if (!Number.isInteger(slot) || slot < 0 || slot >= 16384) {
            handlers.defaults();
            return;
          }
          const timeout = this.options.retryDelayOnMoved;
          if (timeout && typeof timeout === "number") {
            this.delayQueue.push("moved", handlers.moved.bind(null, slot, errv[2]), { timeout });
          } else {
            handlers.moved(slot, errv[2]);
          }
        } else if (errv[0] === "ASK") {
          handlers.ask(errv[1], errv[2]);
        } else if (errv[0] === "TRYAGAIN") {
          this.delayQueue.push("tryagain", handlers.tryagain, {
            timeout: this.options.retryDelayOnTryAgain
          });
        } else if (errv[0] === "CLUSTERDOWN" && this.options.retryDelayOnClusterDown > 0) {
          this.delayQueue.push("clusterdown", handlers.connectionClosed, {
            timeout: this.options.retryDelayOnClusterDown,
            callback: this.refreshSlotsCache.bind(this)
          });
        } else if (error.message === utils_1.CONNECTION_CLOSED_ERROR_MSG && this.options.retryDelayOnFailover > 0 && this.status === "ready") {
          this.delayQueue.push("failover", handlers.connectionClosed, {
            timeout: this.options.retryDelayOnFailover,
            callback: this.refreshSlotsCache.bind(this)
          });
        } else {
          handlers.defaults();
        }
      }
      resetOfflineQueue() {
        this.offlineQueue = new Deque();
      }
      clearNodesRefreshInterval() {
        if (this.slotsTimer) {
          clearTimeout(this.slotsTimer);
          this.slotsTimer = null;
        }
      }
      resetNodesRefreshInterval() {
        if (this.slotsTimer || !this.options.slotsRefreshInterval) {
          return;
        }
        const nextRound = () => {
          this.slotsTimer = setTimeout(() => {
            debug('refreshing slot caches... (triggered by "slotsRefreshInterval" option)');
            this.refreshSlotsCache(() => {
              nextRound();
            });
          }, this.options.slotsRefreshInterval);
        };
        nextRound();
      }
      /**
       * Change cluster instance's status
       */
      setStatus(status) {
        debug("status: %s -> %s", this.status || "[empty]", status);
        this.status = status;
        process.nextTick(() => {
          this.emit(status);
        });
      }
      /**
       * Called when closed to check whether a reconnection should be made
       */
      handleCloseEvent(reason) {
        if (reason) {
          debug("closed because %s", reason);
        }
        let retryDelay;
        if (!this.manuallyClosing && typeof this.options.clusterRetryStrategy === "function") {
          retryDelay = this.options.clusterRetryStrategy.call(this, ++this.retryAttempts, reason);
        }
        if (typeof retryDelay === "number") {
          this.setStatus("reconnecting");
          this.reconnectTimeout = setTimeout(() => {
            this.reconnectTimeout = null;
            debug("Cluster is disconnected. Retrying after %dms", retryDelay);
            this.connect().catch(function(err) {
              debug("Got error %s when reconnecting. Ignoring...", err);
            });
          }, retryDelay);
        } else {
          if (this.options.shardedSubscribers) {
            this.subscriberGroupEmitter?.removeAllListeners();
          }
          this.setStatus("end");
          this.flushQueue(new Error("None of startup nodes is available"));
        }
      }
      /**
       * Flush offline queue with error.
       */
      flushQueue(error) {
        let item;
        while (item = this.offlineQueue.shift()) {
          item.command.reject(error);
        }
      }
      executeOfflineCommands() {
        if (this.offlineQueue.length) {
          debug("send %d commands in offline queue", this.offlineQueue.length);
          const offlineQueue = this.offlineQueue;
          this.resetOfflineQueue();
          let item;
          while (item = offlineQueue.shift()) {
            this.sendCommand(item.command, item.stream, item.node);
          }
        }
      }
      natMapper(nodeKey) {
        const key = typeof nodeKey === "string" ? nodeKey : `${nodeKey.host}:${nodeKey.port}`;
        let mapped = null;
        if (this.options.natMap && typeof this.options.natMap === "function") {
          mapped = this.options.natMap(key);
        } else if (this.options.natMap && typeof this.options.natMap === "object") {
          mapped = this.options.natMap[key];
        }
        if (mapped) {
          debug("NAT mapping %s -> %O", key, mapped);
          return Object.assign({}, mapped);
        }
        return typeof nodeKey === "string" ? (0, util_1.nodeKeyToRedisOptions)(nodeKey) : nodeKey;
      }
      getInfoFromNode(redis, callback) {
        if (!redis) {
          return callback(new Error("Node is disconnected"));
        }
        const duplicatedConnection = redis.duplicate({
          enableOfflineQueue: true,
          enableReadyCheck: false,
          retryStrategy: null,
          protocol: 2,
          replyMapping: "legacy",
          connectionName: (0, util_1.getConnectionName)("refresher", this.options.redisOptions && this.options.redisOptions.connectionName)
        });
        duplicatedConnection.on("error", utils_1.noop);
        duplicatedConnection.cluster("SLOTS", (0, utils_1.timeout)((err, result) => {
          duplicatedConnection.disconnect();
          if (err) {
            debug("error encountered running CLUSTER.SLOTS: %s", err);
            return callback(err);
          }
          if (this.status === "disconnecting" || this.status === "close" || this.status === "end") {
            debug("ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s", result.length, this.status);
            callback();
            return;
          }
          const nodes = [];
          debug("cluster slots result count: %d", result.length);
          for (let i2 = 0; i2 < result.length; ++i2) {
            const items = result[i2];
            const slotRangeStart = items[0];
            const slotRangeEnd = items[1];
            const keys = [];
            for (let j3 = 2; j3 < items.length; j3++) {
              if (!items[j3][0]) {
                continue;
              }
              const node = this.natMapper({
                host: items[j3][0],
                port: items[j3][1]
              });
              node.readOnly = j3 !== 2;
              nodes.push(node);
              keys.push(node.host + ":" + node.port);
            }
            debug("cluster slots result [%d]: slots %d~%d served by %s", i2, slotRangeStart, slotRangeEnd, keys);
            for (let slot = slotRangeStart; slot <= slotRangeEnd; slot++) {
              this.slots[slot] = keys;
            }
          }
          this._groupsIds = /* @__PURE__ */ Object.create(null);
          let j2 = 0;
          for (let i2 = 0; i2 < 16384; i2++) {
            const target = (this.slots[i2] || []).join(";");
            if (!target.length) {
              this._groupsBySlot[i2] = void 0;
              continue;
            }
            if (!this._groupsIds[target]) {
              this._groupsIds[target] = ++j2;
            }
            this._groupsBySlot[i2] = this._groupsIds[target];
          }
          this.connectionPool.reset(nodes);
          if (this.options.shardedSubscribers) {
            this.shardedSubscribers.reset(this.slots, this.connectionPool.getNodes("all")).catch((err2) => {
              debug("Error while starting subscribers: %s", err2);
            });
          }
          callback();
        }, this.options.slotsRefreshTimeout));
      }
      invokeReadyDelayedCallbacks(err) {
        for (const c3 of this._readyDelayedCallbacks) {
          process.nextTick(c3, err);
        }
        this._readyDelayedCallbacks = [];
      }
      /**
       * Check whether Cluster is able to process commands
       */
      readyCheck(callback) {
        this.cluster("INFO", (err, res) => {
          if (err) {
            return callback(err);
          }
          if (typeof res !== "string") {
            return callback();
          }
          let state;
          const lines = res.split("\r\n");
          for (let i2 = 0; i2 < lines.length; ++i2) {
            const parts = lines[i2].split(":");
            if (parts[0] === "cluster_state") {
              state = parts[1];
              break;
            }
          }
          if (state === "fail") {
            debug("cluster state not ok (%s)", state);
            callback(null, state);
          } else {
            callback();
          }
        });
      }
      resolveSrv(hostname) {
        return new Promise((resolve, reject) => {
          this.options.resolveSrv(hostname, (err, records) => {
            if (err) {
              return reject(err);
            }
            const self = this, groupedRecords = (0, util_1.groupSrvRecords)(records), sortedKeys = Object.keys(groupedRecords).sort((a3, b3) => parseInt(a3) - parseInt(b3));
            function tryFirstOne(err2) {
              if (!sortedKeys.length) {
                return reject(err2);
              }
              const key = sortedKeys[0], group = groupedRecords[key], record = (0, util_1.weightSrvRecords)(group);
              if (!group.records.length) {
                sortedKeys.shift();
              }
              self.dnsLookup(record.name).then((host) => resolve({
                host,
                port: record.port
              }), tryFirstOne);
            }
            tryFirstOne();
          });
        });
      }
      dnsLookup(hostname) {
        return new Promise((resolve, reject) => {
          this.options.dnsLookup(hostname, (err, address) => {
            if (err) {
              debug("failed to resolve hostname %s to IP: %s", hostname, err.message);
              reject(err);
            } else {
              debug("resolved hostname %s to IP %s", hostname, address);
              resolve(address);
            }
          });
        });
      }
      /**
       * Normalize startup nodes, and resolving hostnames to IPs.
       *
       * This process happens every time when #connect() is called since
       * #startupNodes and DNS records may chanage.
       */
      async resolveStartupNodeHostnames() {
        if (!Array.isArray(this.startupNodes) || this.startupNodes.length === 0) {
          throw new Error("`startupNodes` should contain at least one node.");
        }
        const startupNodes = (0, util_1.normalizeNodeOptions)(this.startupNodes);
        const hostnames = (0, util_1.getUniqueHostnamesFromOptions)(startupNodes);
        if (hostnames.length === 0) {
          return startupNodes;
        }
        const configs = await Promise.all(hostnames.map((this.options.useSRVRecords ? this.resolveSrv : this.dnsLookup).bind(this)));
        const hostnameToConfig = (0, utils_1.zipMap)(hostnames, configs);
        return startupNodes.map((node) => {
          const config = hostnameToConfig.get(node.host);
          if (!config) {
            return node;
          }
          if (this.options.useSRVRecords) {
            return Object.assign({}, node, config);
          }
          return Object.assign({}, node, { host: config });
        });
      }
      createScanStream(command, { key, options = {} }) {
        return new ScanStream_1.default({
          objectMode: true,
          key,
          redis: this,
          command,
          ...options
        });
      }
      createShardedSubscriberGroup() {
        this.subscriberGroupEmitter = new events_1.EventEmitter();
        this.shardedSubscribers = new ClusterSubscriberGroup_1.default(this.subscriberGroupEmitter, this.options);
        const refreshSlotsCacheCallback = (err) => {
          if (err instanceof ClusterAllFailedError_1.default) {
            this.disconnect(true);
          }
        };
        this.subscriberGroupEmitter.on("-node", (redis, nodeKey) => {
          this.emit("-node", redis, nodeKey);
          this.refreshSlotsCache(refreshSlotsCacheCallback);
        });
        this.subscriberGroupEmitter.on("subscriberConnectFailed", ({ delay, error }) => {
          this.emit("error", error);
          setTimeout(() => {
            this.refreshSlotsCache(refreshSlotsCacheCallback);
          }, delay);
        });
        this.subscriberGroupEmitter.on("moved", () => {
          this.refreshSlotsCache(refreshSlotsCacheCallback);
        });
        this.subscriberGroupEmitter.on("-subscriber", () => {
          this.emit("-subscriber");
        });
        this.subscriberGroupEmitter.on("+subscriber", () => {
          this.emit("+subscriber");
        });
        this.subscriberGroupEmitter.on("nodeError", (error, nodeKey) => {
          this.emit("nodeError", error, nodeKey);
        });
        this.subscriberGroupEmitter.on("subscribersReady", () => {
          this.emit("subscribersReady");
        });
        for (const event of ["smessage", "smessageBuffer"]) {
          this.subscriberGroupEmitter.on(event, (arg1, arg2, arg3) => {
            this.emit(event, arg1, arg2, arg3);
          });
        }
      }
    };
    (0, applyMixin_1.default)(Cluster, events_1.EventEmitter);
    (0, transaction_1.addTransactionSupport)(Cluster.prototype);
    exports.default = Cluster;
  }
});

// ../../node_modules/ioredis/built/connectors/AbstractConnector.js
var require_AbstractConnector = __commonJS({
  "../../node_modules/ioredis/built/connectors/AbstractConnector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils2();
    var debug = (0, utils_1.Debug)("AbstractConnector");
    var AbstractConnector = class {
      constructor(disconnectTimeout) {
        this.connecting = false;
        this.disconnectTimeout = disconnectTimeout;
      }
      check(info) {
        return true;
      }
      disconnect() {
        this.connecting = false;
        if (this.stream) {
          const stream = this.stream;
          const timeout = setTimeout(() => {
            debug("stream %s:%s still open, destroying it", stream.remoteAddress, stream.remotePort);
            stream.destroy();
          }, this.disconnectTimeout);
          stream.on("close", () => clearTimeout(timeout));
          stream.end();
        }
      }
    };
    exports.default = AbstractConnector;
  }
});

// ../../node_modules/ioredis/built/connectors/StandaloneConnector.js
var require_StandaloneConnector = __commonJS({
  "../../node_modules/ioredis/built/connectors/StandaloneConnector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var net_1 = __require("net");
    var tls_1 = __require("tls");
    var utils_1 = require_utils2();
    var AbstractConnector_1 = require_AbstractConnector();
    var StandaloneConnector = class extends AbstractConnector_1.default {
      constructor(options) {
        super(options.disconnectTimeout);
        this.options = options;
      }
      connect(_2) {
        const { options } = this;
        this.connecting = true;
        let connectionOptions;
        if ("path" in options && options.path) {
          connectionOptions = {
            path: options.path
          };
        } else {
          connectionOptions = {};
          if ("port" in options && options.port != null) {
            connectionOptions.port = options.port;
          }
          if ("host" in options && options.host != null) {
            connectionOptions.host = options.host;
          }
          if ("family" in options && options.family != null) {
            connectionOptions.family = options.family;
          }
        }
        if (options.tls) {
          Object.assign(connectionOptions, options.tls);
        }
        return new Promise((resolve, reject) => {
          process.nextTick(() => {
            if (!this.connecting) {
              reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
              return;
            }
            try {
              if (options.tls) {
                this.stream = (0, tls_1.connect)(connectionOptions);
              } else {
                this.stream = (0, net_1.createConnection)(connectionOptions);
              }
            } catch (err) {
              reject(err);
              return;
            }
            this.stream.once("error", (err) => {
              this.firstError = err;
            });
            resolve(this.stream);
          });
        });
      }
    };
    exports.default = StandaloneConnector;
  }
});

// ../../node_modules/ioredis/built/connectors/SentinelConnector/SentinelIterator.js
var require_SentinelIterator = __commonJS({
  "../../node_modules/ioredis/built/connectors/SentinelConnector/SentinelIterator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isSentinelEql(a3, b3) {
      return (a3.host || "127.0.0.1") === (b3.host || "127.0.0.1") && (a3.port || 26379) === (b3.port || 26379);
    }
    var SentinelIterator = class {
      constructor(sentinels) {
        this.cursor = 0;
        this.sentinels = sentinels.slice(0);
      }
      next() {
        const done = this.cursor >= this.sentinels.length;
        return { done, value: done ? void 0 : this.sentinels[this.cursor++] };
      }
      reset(moveCurrentEndpointToFirst) {
        if (moveCurrentEndpointToFirst && this.sentinels.length > 1 && this.cursor !== 1) {
          this.sentinels.unshift(...this.sentinels.splice(this.cursor - 1));
        }
        this.cursor = 0;
      }
      add(sentinel) {
        for (let i2 = 0; i2 < this.sentinels.length; i2++) {
          if (isSentinelEql(sentinel, this.sentinels[i2])) {
            return false;
          }
        }
        this.sentinels.push(sentinel);
        return true;
      }
      toString() {
        return `${JSON.stringify(this.sentinels)} @${this.cursor}`;
      }
    };
    exports.default = SentinelIterator;
  }
});

// ../../node_modules/ioredis/built/connectors/SentinelConnector/FailoverDetector.js
var require_FailoverDetector = __commonJS({
  "../../node_modules/ioredis/built/connectors/SentinelConnector/FailoverDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FailoverDetector = void 0;
    var utils_1 = require_utils2();
    var debug = (0, utils_1.Debug)("FailoverDetector");
    var CHANNEL_NAME = "+switch-master";
    var FailoverDetector = class {
      // sentinels can't be used for regular commands after this
      constructor(connector, sentinels) {
        this.isDisconnected = false;
        this.connector = connector;
        this.sentinels = sentinels;
      }
      cleanup() {
        this.isDisconnected = true;
        for (const sentinel of this.sentinels) {
          sentinel.client.disconnect();
        }
      }
      async subscribe() {
        debug("Starting FailoverDetector");
        const promises = [];
        for (const sentinel of this.sentinels) {
          const promise = sentinel.client.subscribe(CHANNEL_NAME).catch((err) => {
            debug("Failed to subscribe to failover messages on sentinel %s:%s (%s)", sentinel.address.host || "127.0.0.1", sentinel.address.port || 26739, err.message);
          });
          promises.push(promise);
          sentinel.client.on("message", (channel) => {
            if (!this.isDisconnected && channel === CHANNEL_NAME) {
              this.disconnect();
            }
          });
        }
        await Promise.all(promises);
      }
      disconnect() {
        this.isDisconnected = true;
        debug("Failover detected, disconnecting");
        this.connector.disconnect();
      }
    };
    exports.FailoverDetector = FailoverDetector;
  }
});

// ../../node_modules/ioredis/built/connectors/SentinelConnector/index.js
var require_SentinelConnector = __commonJS({
  "../../node_modules/ioredis/built/connectors/SentinelConnector/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SentinelIterator = void 0;
    var net_1 = __require("net");
    var utils_1 = require_utils2();
    var tls_1 = __require("tls");
    var SentinelIterator_1 = require_SentinelIterator();
    exports.SentinelIterator = SentinelIterator_1.default;
    var AbstractConnector_1 = require_AbstractConnector();
    var Redis_1 = require_Redis();
    var FailoverDetector_1 = require_FailoverDetector();
    var debug = (0, utils_1.Debug)("SentinelConnector");
    var SentinelConnector = class extends AbstractConnector_1.default {
      constructor(options) {
        super(options.disconnectTimeout);
        this.options = options;
        this.emitter = null;
        this.failoverDetector = null;
        if (!this.options.sentinels.length) {
          throw new Error("Requires at least one sentinel to connect to.");
        }
        if (!this.options.name) {
          throw new Error("Requires the name of master.");
        }
        this.sentinelIterator = new SentinelIterator_1.default(this.options.sentinels);
      }
      check(info) {
        const roleMatches = !info.role || this.options.role === info.role;
        if (!roleMatches) {
          debug("role invalid, expected %s, but got %s", this.options.role, info.role);
          this.sentinelIterator.next();
          this.sentinelIterator.next();
          this.sentinelIterator.reset(true);
        }
        return roleMatches;
      }
      disconnect() {
        super.disconnect();
        if (this.failoverDetector) {
          this.failoverDetector.cleanup();
        }
      }
      connect(eventEmitter) {
        this.connecting = true;
        this.retryAttempts = 0;
        let lastError;
        const connectToNext = async () => {
          const endpoint = this.sentinelIterator.next();
          if (endpoint.done) {
            this.sentinelIterator.reset(false);
            const retryDelay = typeof this.options.sentinelRetryStrategy === "function" ? this.options.sentinelRetryStrategy(++this.retryAttempts) : null;
            let errorMsg = typeof retryDelay !== "number" ? "All sentinels are unreachable and retry is disabled." : `All sentinels are unreachable. Retrying from scratch after ${retryDelay}ms.`;
            if (lastError) {
              errorMsg += ` Last error: ${lastError.message}`;
            }
            debug(errorMsg);
            const error = new Error(errorMsg);
            if (typeof retryDelay === "number") {
              eventEmitter("error", error);
              await new Promise((resolve) => setTimeout(resolve, retryDelay));
              return connectToNext();
            } else {
              throw error;
            }
          }
          let resolved = null;
          let err = null;
          try {
            resolved = await this.resolve(endpoint.value);
          } catch (error) {
            err = error;
          }
          if (!this.connecting) {
            throw new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG);
          }
          const endpointAddress = endpoint.value.host + ":" + endpoint.value.port;
          if (resolved) {
            debug("resolved: %s:%s from sentinel %s", resolved.host, resolved.port, endpointAddress);
            if (this.options.enableTLSForSentinelMode && this.options.tls) {
              Object.assign(resolved, this.options.tls);
              this.stream = (0, tls_1.connect)(resolved);
              this.stream.once("secureConnect", this.initFailoverDetector.bind(this));
            } else {
              this.stream = (0, net_1.createConnection)(resolved);
              this.stream.once("connect", this.initFailoverDetector.bind(this));
            }
            this.stream.once("error", (err2) => {
              this.firstError = err2;
            });
            return this.stream;
          } else {
            const errorMsg = err ? "failed to connect to sentinel " + endpointAddress + " because " + err.message : "connected to sentinel " + endpointAddress + " successfully, but got an invalid reply: " + resolved;
            debug(errorMsg);
            eventEmitter("sentinelError", new Error(errorMsg));
            if (err) {
              lastError = err;
            }
            return connectToNext();
          }
        };
        return connectToNext();
      }
      async updateSentinels(client) {
        if (!this.options.updateSentinels) {
          return;
        }
        const result = await client.sentinel("sentinels", this.options.name);
        if (!Array.isArray(result)) {
          return;
        }
        result.map(utils_1.packObject).forEach((sentinel) => {
          const flags = sentinel.flags ? sentinel.flags.split(",") : [];
          if (flags.indexOf("disconnected") === -1 && sentinel.ip && sentinel.port) {
            const endpoint = this.sentinelNatResolve(addressResponseToAddress(sentinel));
            if (this.sentinelIterator.add(endpoint)) {
              debug("adding sentinel %s:%s", endpoint.host, endpoint.port);
            }
          }
        });
        debug("Updated internal sentinels: %s", this.sentinelIterator);
      }
      async resolveMaster(client) {
        const result = await client.sentinel("get-master-addr-by-name", this.options.name);
        await this.updateSentinels(client);
        return this.sentinelNatResolve(Array.isArray(result) ? { host: result[0], port: Number(result[1]) } : null);
      }
      async resolveSlave(client) {
        const result = await client.sentinel("slaves", this.options.name);
        if (!Array.isArray(result)) {
          return null;
        }
        const availableSlaves = result.map(utils_1.packObject).filter((slave) => slave.flags && !slave.flags.match(/(disconnected|s_down|o_down)/));
        return this.sentinelNatResolve(selectPreferredSentinel(availableSlaves, this.options.preferredSlaves));
      }
      sentinelNatResolve(item) {
        if (!item || !this.options.natMap)
          return item;
        const key = `${item.host}:${item.port}`;
        let result = item;
        if (typeof this.options.natMap === "function") {
          result = this.options.natMap(key) || item;
        } else if (typeof this.options.natMap === "object") {
          result = this.options.natMap[key] || item;
        }
        return result;
      }
      connectToSentinel(endpoint, options) {
        const redis = new Redis_1.default({
          port: endpoint.port || 26379,
          host: endpoint.host,
          username: this.options.sentinelUsername || null,
          password: this.options.sentinelPassword || null,
          family: endpoint.family || ("path" in this.options && this.options.path ? void 0 : this.options.family),
          tls: this.options.sentinelTLS,
          retryStrategy: null,
          enableReadyCheck: false,
          protocol: this.options.protocol,
          replyMapping: "legacy",
          connectTimeout: this.options.connectTimeout,
          commandTimeout: this.options.sentinelCommandTimeout,
          ...options
        });
        return redis;
      }
      async resolve(endpoint) {
        const client = this.connectToSentinel(endpoint);
        client.on("error", noop3);
        try {
          if (this.options.role === "slave") {
            return await this.resolveSlave(client);
          } else {
            return await this.resolveMaster(client);
          }
        } finally {
          client.disconnect();
        }
      }
      async initFailoverDetector() {
        if (!this.options.failoverDetector) {
          return;
        }
        this.sentinelIterator.reset(true);
        const sentinels = [];
        while (sentinels.length < this.options.sentinelMaxConnections) {
          const { done, value } = this.sentinelIterator.next();
          if (done) {
            break;
          }
          const client = this.connectToSentinel(value, {
            lazyConnect: true,
            retryStrategy: this.options.sentinelReconnectStrategy,
            protocol: this.options.protocol,
            replyMapping: "legacy"
          });
          client.on("reconnecting", () => {
            this.emitter?.emit("sentinelReconnecting");
          });
          sentinels.push({ address: value, client });
        }
        this.sentinelIterator.reset(false);
        if (this.failoverDetector) {
          this.failoverDetector.cleanup();
        }
        this.failoverDetector = new FailoverDetector_1.FailoverDetector(this, sentinels);
        await this.failoverDetector.subscribe();
        this.emitter?.emit("failoverSubscribed");
      }
    };
    exports.default = SentinelConnector;
    function selectPreferredSentinel(availableSlaves, preferredSlaves) {
      if (availableSlaves.length === 0) {
        return null;
      }
      let selectedSlave;
      if (typeof preferredSlaves === "function") {
        selectedSlave = preferredSlaves(availableSlaves);
      } else if (preferredSlaves !== null && typeof preferredSlaves === "object") {
        const preferredSlavesArray = Array.isArray(preferredSlaves) ? [...preferredSlaves] : [preferredSlaves];
        preferredSlavesArray.sort((a3, b3) => {
          const aPrio = a3.prio ?? 1;
          const bPrio = b3.prio ?? 1;
          if (aPrio < bPrio) {
            return -1;
          }
          if (aPrio > bPrio) {
            return 1;
          }
          return 0;
        });
        for (let p3 = 0; p3 < preferredSlavesArray.length; p3++) {
          for (let a3 = 0; a3 < availableSlaves.length; a3++) {
            const slave = availableSlaves[a3];
            if (slave.ip === preferredSlavesArray[p3].ip) {
              if (slave.port === preferredSlavesArray[p3].port) {
                selectedSlave = slave;
                break;
              }
            }
          }
          if (selectedSlave) {
            break;
          }
        }
      }
      if (!selectedSlave) {
        selectedSlave = (0, utils_1.sample)(availableSlaves);
      }
      return addressResponseToAddress(selectedSlave);
    }
    function addressResponseToAddress(input) {
      return { host: input.ip, port: Number(input.port) };
    }
    function noop3() {
    }
  }
});

// ../../node_modules/ioredis/built/connectors/index.js
var require_connectors = __commonJS({
  "../../node_modules/ioredis/built/connectors/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SentinelConnector = exports.StandaloneConnector = void 0;
    var StandaloneConnector_1 = require_StandaloneConnector();
    exports.StandaloneConnector = StandaloneConnector_1.default;
    var SentinelConnector_1 = require_SentinelConnector();
    exports.SentinelConnector = SentinelConnector_1.default;
  }
});

// ../../node_modules/ioredis/built/errors/MaxRetriesPerRequestError.js
var require_MaxRetriesPerRequestError = __commonJS({
  "../../node_modules/ioredis/built/errors/MaxRetriesPerRequestError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var redis_errors_1 = require_redis_errors();
    var MaxRetriesPerRequestError = class extends redis_errors_1.AbortError {
      constructor(maxRetriesPerRequest) {
        const message = `Reached the max retries per request limit (which is ${maxRetriesPerRequest}). Refer to "maxRetriesPerRequest" option for details.`;
        super(message);
        Error.captureStackTrace(this, this.constructor);
      }
      get name() {
        return this.constructor.name;
      }
    };
    exports.default = MaxRetriesPerRequestError;
  }
});

// ../../node_modules/ioredis/built/errors/index.js
var require_errors = __commonJS({
  "../../node_modules/ioredis/built/errors/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MaxRetriesPerRequestError = void 0;
    var MaxRetriesPerRequestError_1 = require_MaxRetriesPerRequestError();
    exports.MaxRetriesPerRequestError = MaxRetriesPerRequestError_1.default;
  }
});

// ../../node_modules/ioredis/built/utils/version.js
var require_version = __commonJS({
  "../../node_modules/ioredis/built/utils/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PACKAGE_VERSION = void 0;
    exports.PACKAGE_VERSION = "6.0.0";
  }
});

// ../../node_modules/ioredis/built/SubscriptionSet.js
var require_SubscriptionSet = __commonJS({
  "../../node_modules/ioredis/built/SubscriptionSet.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SubscriptionSet = class {
      constructor() {
        this.set = {
          subscribe: {},
          psubscribe: {},
          ssubscribe: {}
        };
      }
      add(set, channel) {
        this.set[mapSet(set)][channel] = true;
      }
      del(set, channel) {
        delete this.set[mapSet(set)][channel];
      }
      channels(set) {
        return Object.keys(this.set[mapSet(set)]);
      }
      isEmpty() {
        return this.channels("subscribe").length === 0 && this.channels("psubscribe").length === 0 && this.channels("ssubscribe").length === 0;
      }
    };
    exports.default = SubscriptionSet;
    function mapSet(set) {
      if (set === "unsubscribe") {
        return "subscribe";
      }
      if (set === "punsubscribe") {
        return "psubscribe";
      }
      if (set === "sunsubscribe") {
        return "ssubscribe";
      }
      return set;
    }
  }
});

// ../../node_modules/ioredis/built/resp/verbatim-string.js
var require_verbatim_string = __commonJS({
  "../../node_modules/ioredis/built/resp/verbatim-string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VerbatimString = void 0;
    var VerbatimString = class extends String {
      constructor(format, value) {
        super(value);
        this.format = format;
      }
    };
    exports.VerbatimString = VerbatimString;
  }
});

// ../../node_modules/ioredis/built/resp/errors.js
var require_errors2 = __commonJS({
  "../../node_modules/ioredis/built/resp/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BlobError = exports.SimpleError = void 0;
    var redis_errors_1 = require_redis_errors();
    var SimpleError = class extends redis_errors_1.ReplyError {
      get name() {
        return "ReplyError";
      }
    };
    exports.SimpleError = SimpleError;
    var BlobError = class extends redis_errors_1.ReplyError {
      get name() {
        return "ReplyError";
      }
    };
    exports.BlobError = BlobError;
  }
});

// ../../node_modules/ioredis/built/resp/decoder.js
var require_decoder = __commonJS({
  "../../node_modules/ioredis/built/resp/decoder.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f3) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f3) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f3) {
      if (kind === "a" && !f3) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
    };
    var _Decoder_instances;
    var _a;
    var _Decoder_cursor;
    var _Decoder_next;
    var _Decoder_pushTypeMapping;
    var _Decoder_continueDecodeTypeValue;
    var _Decoder_decodeTypeValue;
    var _Decoder_handleDecodedValue;
    var _Decoder_continueDecodeValue;
    var _Decoder_decodeNull;
    var _Decoder_decodeBoolean;
    var _Decoder_decodeNumber;
    var _Decoder_maybeDecodeNumberValue;
    var _Decoder_decodeNumberValue;
    var _Decoder_decodeUnsingedNumber;
    var _Decoder_decodeBigNumber;
    var _Decoder_maybeDecodeBigNumberValue;
    var _Decoder_decodeBigNumberValue;
    var _Decoder_decodeUnsingedBigNumber;
    var _Decoder_decodeDouble;
    var _Decoder_maybeDecodeDoubleInteger;
    var _Decoder_decodeDoubleInteger;
    var _Decoder_continueDecodeDoubleInteger;
    var _Decoder_DOUBLE_DECIMAL_MULTIPLIERS;
    var _Decoder_decodeDoubleDecimal;
    var _Decoder_decodeDoubleExponent;
    var _Decoder_continueDecodeDoubleExponent;
    var _Decoder_findCRLF;
    var _Decoder_decodeSimpleString;
    var _Decoder_continueDecodeSimpleString;
    var _Decoder_decodeBlobString;
    var _Decoder_continueDecodeBlobStringLength;
    var _Decoder_decodeStringWithLength;
    var _Decoder_continueDecodeStringWithLength;
    var _Decoder_decodeBlobStringWithLength;
    var _Decoder_decodeVerbatimString;
    var _Decoder_continueDecodeVerbatimStringLength;
    var _Decoder_decodeVerbatimStringWithLength;
    var _Decoder_decodeVerbatimStringFormat;
    var _Decoder_continueDecodeVerbatimStringFormat;
    var _Decoder_decodeVerbatimStringWithFormat;
    var _Decoder_continueDecodeVerbatimStringWithFormat;
    var _Decoder_decodeSimpleError;
    var _Decoder_continueDecodeSimpleError;
    var _Decoder_decodeBlobError;
    var _Decoder_continueDecodeBlobError;
    var _Decoder_decodeNestedType;
    var _Decoder_decodeNestedTypeValue;
    var _Decoder_decodeArray;
    var _Decoder_decodeArrayWithLength;
    var _Decoder_continueDecodeArrayLength;
    var _Decoder_decodeArrayItems;
    var _Decoder_continueDecodeArrayItems;
    var _Decoder_decodeSet;
    var _Decoder_continueDecodeSetLength;
    var _Decoder_decodeSetItems;
    var _Decoder_decodeSetAsSet;
    var _Decoder_continueDecodeSetAsSet;
    var _Decoder_decodeMap;
    var _Decoder_continueDecodeMapLength;
    var _Decoder_decodeMapItems;
    var _Decoder_decodeMapAsMap;
    var _Decoder_decodeMapKey;
    var _Decoder_decodeMapKeyValue;
    var _Decoder_continueDecodeMapKey;
    var _Decoder_continueDecodeMapValue;
    var _Decoder_decodeMapAsObject;
    var _Decoder_continueDecodeMapAsObjectKey;
    var _Decoder_continueDecodeMapAsObjectValue;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Decoder = exports.PUSH_TYPE_MAPPING = exports.RESP_TYPES = void 0;
    var verbatim_string_1 = require_verbatim_string();
    var errors_1 = require_errors2();
    exports.RESP_TYPES = {
      NULL: 95,
      // _
      BOOLEAN: 35,
      // #
      NUMBER: 58,
      // :
      BIG_NUMBER: 40,
      // (
      DOUBLE: 44,
      // ,
      SIMPLE_STRING: 43,
      // +
      BLOB_STRING: 36,
      // $
      VERBATIM_STRING: 61,
      // =
      SIMPLE_ERROR: 45,
      // -
      BLOB_ERROR: 33,
      // !
      ARRAY: 42,
      // *
      SET: 126,
      // ~
      MAP: 37,
      // %
      PUSH: 62
      // >
    };
    var ASCII = {
      "\r": 13,
      t: 116,
      "+": 43,
      "-": 45,
      "0": 48,
      ".": 46,
      i: 105,
      n: 110,
      E: 69,
      e: 101
    };
    exports.PUSH_TYPE_MAPPING = {
      [exports.RESP_TYPES.BLOB_STRING]: Buffer
    };
    var Decoder = class {
      constructor(config) {
        _Decoder_instances.add(this);
        _Decoder_cursor.set(this, 0);
        _Decoder_next.set(this, void 0);
        _Decoder_pushTypeMapping.set(this, void 0);
        this.onReply = config.onReply;
        this.onErrorReply = config.onErrorReply;
        this.onPush = config.onPush;
        this.getTypeMapping = config.getTypeMapping;
        __classPrivateFieldSet(this, _Decoder_pushTypeMapping, {
          ...config.getTypeMapping(),
          ...exports.PUSH_TYPE_MAPPING
        }, "f");
      }
      reset() {
        __classPrivateFieldSet(this, _Decoder_cursor, 0, "f");
        __classPrivateFieldSet(this, _Decoder_next, void 0, "f");
      }
      write(chunk) {
        var _b;
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") - chunk.length, "f");
          return;
        }
        if (__classPrivateFieldGet(this, _Decoder_next, "f")) {
          if (__classPrivateFieldGet(this, _Decoder_next, "f").call(this, chunk) || __classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
            __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") - chunk.length, "f");
            return;
          }
        }
        do {
          const type = chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")];
          if (__classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length) {
            __classPrivateFieldSet(this, _Decoder_next, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeTypeValue).bind(this, type), "f");
            break;
          }
          if (__classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeTypeValue).call(this, type, chunk)) {
            break;
          }
        } while (__classPrivateFieldGet(this, _Decoder_cursor, "f") < chunk.length);
        __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") - chunk.length, "f");
      }
    };
    exports.Decoder = Decoder;
    _a = Decoder, _Decoder_cursor = /* @__PURE__ */ new WeakMap(), _Decoder_next = /* @__PURE__ */ new WeakMap(), _Decoder_pushTypeMapping = /* @__PURE__ */ new WeakMap(), _Decoder_instances = /* @__PURE__ */ new WeakSet(), _Decoder_continueDecodeTypeValue = function _Decoder_continueDecodeTypeValue2(type, chunk) {
      __classPrivateFieldSet(this, _Decoder_next, void 0, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeTypeValue).call(this, type, chunk);
    }, _Decoder_decodeTypeValue = function _Decoder_decodeTypeValue2(type, chunk) {
      switch (type) {
        case exports.RESP_TYPES.NULL:
          this.onReply(__classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNull).call(this));
          return false;
        case exports.RESP_TYPES.BOOLEAN:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBoolean).call(this, this.getTypeMapping()[exports.RESP_TYPES.BOOLEAN], chunk));
        case exports.RESP_TYPES.NUMBER:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumber).call(this, this.getTypeMapping()[exports.RESP_TYPES.NUMBER], chunk));
        case exports.RESP_TYPES.BIG_NUMBER:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumber).call(this, this.getTypeMapping()[exports.RESP_TYPES.BIG_NUMBER], chunk));
        case exports.RESP_TYPES.DOUBLE:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDouble).call(this, this.getTypeMapping()[exports.RESP_TYPES.DOUBLE], chunk));
        case exports.RESP_TYPES.SIMPLE_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, this.getTypeMapping()[exports.RESP_TYPES.SIMPLE_STRING], chunk));
        case exports.RESP_TYPES.BLOB_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobString).call(this, this.getTypeMapping()[exports.RESP_TYPES.BLOB_STRING], chunk));
        case exports.RESP_TYPES.VERBATIM_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeVerbatimString).call(this, this.getTypeMapping()[exports.RESP_TYPES.VERBATIM_STRING], chunk));
        case exports.RESP_TYPES.SIMPLE_ERROR:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onErrorReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleError).call(this, chunk));
        case exports.RESP_TYPES.BLOB_ERROR:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onErrorReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobError).call(this, chunk));
        case exports.RESP_TYPES.ARRAY:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArray).call(this, this.getTypeMapping(), chunk));
        case exports.RESP_TYPES.SET:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSet).call(this, this.getTypeMapping(), chunk));
        case exports.RESP_TYPES.MAP:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMap).call(this, this.getTypeMapping(), chunk));
        case exports.RESP_TYPES.PUSH:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onPush, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArray).call(this, __classPrivateFieldGet(this, _Decoder_pushTypeMapping, "f"), chunk));
        default:
          throw new Error(`Unknown RESP type ${type} "${String.fromCharCode(type)}"`);
      }
    }, _Decoder_handleDecodedValue = function _Decoder_handleDecodedValue2(cb, value) {
      if (typeof value === "function") {
        __classPrivateFieldSet(this, _Decoder_next, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeValue).bind(this, cb, value), "f");
        return true;
      }
      cb(value);
      return false;
    }, _Decoder_continueDecodeValue = function _Decoder_continueDecodeValue2(cb, next, chunk) {
      __classPrivateFieldSet(this, _Decoder_next, void 0, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, cb, next(chunk));
    }, _Decoder_decodeNull = function _Decoder_decodeNull2() {
      __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 2, "f");
      return null;
    }, _Decoder_decodeBoolean = function _Decoder_decodeBoolean2(type, chunk) {
      const boolean = chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")] === ASCII.t;
      __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 3, "f");
      return type === Number ? boolean ? 1 : 0 : boolean;
    }, _Decoder_decodeNumber = function _Decoder_decodeNumber2(type, chunk) {
      if (type === String) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, String, chunk);
      }
      switch (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")]) {
        case ASCII["+"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeNumberValue).call(this, false, chunk);
        case ASCII["-"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeNumberValue).call(this, true, chunk);
        default:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumberValue).call(this, false, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).bind(this, 0), chunk);
      }
    }, _Decoder_maybeDecodeNumberValue = function _Decoder_maybeDecodeNumberValue2(isNegative, chunk) {
      var _b;
      const cb = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).bind(this, 0);
      return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumberValue).bind(this, isNegative, cb) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumberValue).call(this, isNegative, cb, chunk);
    }, _Decoder_decodeNumberValue = function _Decoder_decodeNumberValue2(isNegative, numberCb, chunk) {
      const number = numberCb(chunk);
      return typeof number === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumberValue2).bind(this, isNegative, number) : isNegative ? -number : number;
    }, _Decoder_decodeUnsingedNumber = function _Decoder_decodeUnsingedNumber2(number, chunk) {
      let cursor = __classPrivateFieldGet(this, _Decoder_cursor, "f");
      do {
        const byte = chunk[cursor];
        if (byte === ASCII["\r"]) {
          __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
          return number;
        }
        number = number * 10 + byte - ASCII["0"];
      } while (++cursor < chunk.length);
      __classPrivateFieldSet(this, _Decoder_cursor, cursor, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber2).bind(this, number);
    }, _Decoder_decodeBigNumber = function _Decoder_decodeBigNumber2(type, chunk) {
      if (type === String) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, String, chunk);
      }
      switch (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")]) {
        case ASCII["+"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeBigNumberValue).call(this, false, chunk);
        case ASCII["-"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeBigNumberValue).call(this, true, chunk);
        default:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumberValue).call(this, false, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedBigNumber).bind(this, 0n), chunk);
      }
    }, _Decoder_maybeDecodeBigNumberValue = function _Decoder_maybeDecodeBigNumberValue2(isNegative, chunk) {
      var _b;
      const cb = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedBigNumber).bind(this, 0n);
      return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumberValue).bind(this, isNegative, cb) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumberValue).call(this, isNegative, cb, chunk);
    }, _Decoder_decodeBigNumberValue = function _Decoder_decodeBigNumberValue2(isNegative, bigNumberCb, chunk) {
      const bigNumber = bigNumberCb(chunk);
      return typeof bigNumber === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumberValue2).bind(this, isNegative, bigNumber) : isNegative ? -bigNumber : bigNumber;
    }, _Decoder_decodeUnsingedBigNumber = function _Decoder_decodeUnsingedBigNumber2(bigNumber, chunk) {
      let cursor = __classPrivateFieldGet(this, _Decoder_cursor, "f");
      do {
        const byte = chunk[cursor];
        if (byte === ASCII["\r"]) {
          __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
          return bigNumber;
        }
        bigNumber = bigNumber * 10n + BigInt(byte - ASCII["0"]);
      } while (++cursor < chunk.length);
      __classPrivateFieldSet(this, _Decoder_cursor, cursor, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedBigNumber2).bind(this, bigNumber);
    }, _Decoder_decodeDouble = function _Decoder_decodeDouble2(type, chunk) {
      if (type === String || type === Buffer) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, type, chunk);
      }
      switch (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")]) {
        case ASCII.n:
          __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 5, "f");
          return NaN;
        case ASCII["+"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeDoubleInteger).call(this, false, chunk);
        case ASCII["-"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeDoubleInteger).call(this, true, chunk);
        default:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleInteger).call(this, false, 0, chunk);
      }
    }, _Decoder_maybeDecodeDoubleInteger = function _Decoder_maybeDecodeDoubleInteger2(isNegative, chunk) {
      var _b;
      return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleInteger).bind(this, isNegative, 0) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleInteger).call(this, isNegative, 0, chunk);
    }, _Decoder_decodeDoubleInteger = function _Decoder_decodeDoubleInteger2(isNegative, integer, chunk) {
      if (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")] === ASCII.i) {
        __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 5, "f");
        return isNegative ? -Infinity : Infinity;
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleInteger).call(this, isNegative, integer, chunk);
    }, _Decoder_continueDecodeDoubleInteger = function _Decoder_continueDecodeDoubleInteger2(isNegative, integer, chunk) {
      let cursor = __classPrivateFieldGet(this, _Decoder_cursor, "f");
      do {
        const byte = chunk[cursor];
        switch (byte) {
          case ASCII["."]:
            __classPrivateFieldSet(this, _Decoder_cursor, cursor + 1, "f");
            return __classPrivateFieldGet(this, _Decoder_cursor, "f") < chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleDecimal).call(this, isNegative, 0, integer, chunk) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleDecimal).bind(this, isNegative, 0, integer);
          case ASCII.E:
          case ASCII.e: {
            __classPrivateFieldSet(this, _Decoder_cursor, cursor + 1, "f");
            const i2 = isNegative ? -integer : integer;
            return __classPrivateFieldGet(this, _Decoder_cursor, "f") < chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleExponent).call(this, i2, chunk) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleExponent).bind(this, i2);
          }
          case ASCII["\r"]:
            __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
            return isNegative ? -integer : integer;
          default:
            integer = integer * 10 + byte - ASCII["0"];
        }
      } while (++cursor < chunk.length);
      __classPrivateFieldSet(this, _Decoder_cursor, cursor, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleInteger2).bind(this, isNegative, integer);
    }, _Decoder_decodeDoubleDecimal = function _Decoder_decodeDoubleDecimal2(isNegative, decimalIndex, double, chunk) {
      let cursor = __classPrivateFieldGet(this, _Decoder_cursor, "f");
      do {
        const byte = chunk[cursor];
        switch (byte) {
          case ASCII.E:
          case ASCII.e: {
            __classPrivateFieldSet(this, _Decoder_cursor, cursor + 1, "f");
            const d4 = isNegative ? -double : double;
            return __classPrivateFieldGet(this, _Decoder_cursor, "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleExponent).bind(this, d4) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleExponent).call(this, d4, chunk);
          }
          case ASCII["\r"]:
            __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
            return isNegative ? -double : double;
        }
        if (decimalIndex < __classPrivateFieldGet(_a, _a, "f", _Decoder_DOUBLE_DECIMAL_MULTIPLIERS).length) {
          double += (byte - ASCII["0"]) * __classPrivateFieldGet(_a, _a, "f", _Decoder_DOUBLE_DECIMAL_MULTIPLIERS)[decimalIndex++];
        }
      } while (++cursor < chunk.length);
      __classPrivateFieldSet(this, _Decoder_cursor, cursor, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleDecimal2).bind(this, isNegative, decimalIndex, double);
    }, _Decoder_decodeDoubleExponent = function _Decoder_decodeDoubleExponent2(double, chunk) {
      var _b, _c;
      switch (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")]) {
        case ASCII["+"]:
          return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent).bind(this, false, double, 0) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent).call(this, false, double, 0, chunk);
        case ASCII["-"]:
          return __classPrivateFieldSet(this, _Decoder_cursor, (_c = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_c), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent).bind(this, true, double, 0) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent).call(this, true, double, 0, chunk);
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent).call(this, false, double, 0, chunk);
    }, _Decoder_continueDecodeDoubleExponent = function _Decoder_continueDecodeDoubleExponent2(isNegative, double, exponent, chunk) {
      let cursor = __classPrivateFieldGet(this, _Decoder_cursor, "f");
      do {
        const byte = chunk[cursor];
        if (byte === ASCII["\r"]) {
          __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
          return double * 10 ** (isNegative ? -exponent : exponent);
        }
        exponent = exponent * 10 + byte - ASCII["0"];
      } while (++cursor < chunk.length);
      __classPrivateFieldSet(this, _Decoder_cursor, cursor, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent2).bind(this, isNegative, double, exponent);
    }, _Decoder_findCRLF = function _Decoder_findCRLF2(chunk, cursor) {
      while (chunk[cursor] !== ASCII["\r"]) {
        if (++cursor === chunk.length) {
          __classPrivateFieldSet(this, _Decoder_cursor, chunk.length, "f");
          return -1;
        }
      }
      __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
      return cursor;
    }, _Decoder_decodeSimpleString = function _Decoder_decodeSimpleString2(type, chunk) {
      const start = __classPrivateFieldGet(this, _Decoder_cursor, "f"), crlfIndex = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_findCRLF).call(this, chunk, start);
      if (crlfIndex === -1) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSimpleString).bind(this, [chunk.subarray(start)], type);
      }
      const slice = chunk.subarray(start, crlfIndex);
      return type === Buffer ? slice : slice.toString();
    }, _Decoder_continueDecodeSimpleString = function _Decoder_continueDecodeSimpleString2(chunks, type, chunk) {
      const start = __classPrivateFieldGet(this, _Decoder_cursor, "f"), crlfIndex = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_findCRLF).call(this, chunk, start);
      if (crlfIndex === -1) {
        chunks.push(chunk.subarray(start));
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSimpleString2).bind(this, chunks, type);
      }
      chunks.push(chunk.subarray(start, crlfIndex));
      const buffer2 = Buffer.concat(chunks);
      return type === Buffer ? buffer2 : buffer2.toString();
    }, _Decoder_decodeBlobString = function _Decoder_decodeBlobString2(type, chunk) {
      if (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")] === ASCII["-"]) {
        __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 4, "f");
        return null;
      }
      const length = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).call(this, 0, chunk);
      if (typeof length === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeBlobStringLength).bind(this, length, type);
      } else if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).bind(this, length, type);
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).call(this, length, type, chunk);
    }, _Decoder_continueDecodeBlobStringLength = function _Decoder_continueDecodeBlobStringLength2(lengthCb, type, chunk) {
      const length = lengthCb(chunk);
      if (typeof length === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeBlobStringLength2).bind(this, length, type);
      } else if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).bind(this, length, type);
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).call(this, length, type, chunk);
    }, _Decoder_decodeStringWithLength = function _Decoder_decodeStringWithLength2(length, skip, type, chunk) {
      const end = __classPrivateFieldGet(this, _Decoder_cursor, "f") + length;
      if (end >= chunk.length) {
        const slice2 = chunk.subarray(__classPrivateFieldGet(this, _Decoder_cursor, "f"));
        __classPrivateFieldSet(this, _Decoder_cursor, chunk.length, "f");
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeStringWithLength).bind(this, length - slice2.length, [slice2], skip, type);
      }
      const slice = chunk.subarray(__classPrivateFieldGet(this, _Decoder_cursor, "f"), end);
      __classPrivateFieldSet(this, _Decoder_cursor, end + skip, "f");
      return type === Buffer ? slice : slice.toString();
    }, _Decoder_continueDecodeStringWithLength = function _Decoder_continueDecodeStringWithLength2(length, chunks, skip, type, chunk) {
      const end = __classPrivateFieldGet(this, _Decoder_cursor, "f") + length;
      if (end >= chunk.length) {
        const slice = chunk.subarray(__classPrivateFieldGet(this, _Decoder_cursor, "f"));
        chunks.push(slice);
        __classPrivateFieldSet(this, _Decoder_cursor, chunk.length, "f");
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeStringWithLength2).bind(this, length - slice.length, chunks, skip, type);
      }
      chunks.push(chunk.subarray(__classPrivateFieldGet(this, _Decoder_cursor, "f"), end));
      __classPrivateFieldSet(this, _Decoder_cursor, end + skip, "f");
      const buffer2 = Buffer.concat(chunks);
      return type === Buffer ? buffer2 : buffer2.toString();
    }, _Decoder_decodeBlobStringWithLength = function _Decoder_decodeBlobStringWithLength2(length, type, chunk) {
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeStringWithLength).call(this, length, 2, type, chunk);
    }, _Decoder_decodeVerbatimString = function _Decoder_decodeVerbatimString2(type, chunk) {
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringLength).call(this, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).bind(this, 0), type, chunk);
    }, _Decoder_continueDecodeVerbatimStringLength = function _Decoder_continueDecodeVerbatimStringLength2(lengthCb, type, chunk) {
      const length = lengthCb(chunk);
      return typeof length === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringLength2).bind(this, length, type) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeVerbatimStringWithLength).call(this, length, type, chunk);
    }, _Decoder_decodeVerbatimStringWithLength = function _Decoder_decodeVerbatimStringWithLength2(length, type, chunk) {
      const stringLength = length - 4;
      if (type === verbatim_string_1.VerbatimString) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeVerbatimStringFormat).call(this, stringLength, chunk);
      }
      __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 4, "f");
      return __classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).bind(this, stringLength, type) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).call(this, stringLength, type, chunk);
    }, _Decoder_decodeVerbatimStringFormat = function _Decoder_decodeVerbatimStringFormat2(stringLength, chunk) {
      const formatCb = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeStringWithLength).bind(this, 3, 1, String);
      return __classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringFormat).bind(this, stringLength, formatCb) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringFormat).call(this, stringLength, formatCb, chunk);
    }, _Decoder_continueDecodeVerbatimStringFormat = function _Decoder_continueDecodeVerbatimStringFormat2(stringLength, formatCb, chunk) {
      const format = formatCb(chunk);
      return typeof format === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringFormat2).bind(this, stringLength, format) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeVerbatimStringWithFormat).call(this, stringLength, format, chunk);
    }, _Decoder_decodeVerbatimStringWithFormat = function _Decoder_decodeVerbatimStringWithFormat2(stringLength, format, chunk) {
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringWithFormat).call(this, format, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).bind(this, stringLength, String), chunk);
    }, _Decoder_continueDecodeVerbatimStringWithFormat = function _Decoder_continueDecodeVerbatimStringWithFormat2(format, stringCb, chunk) {
      const string = stringCb(chunk);
      return typeof string === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringWithFormat2).bind(this, format, string) : new verbatim_string_1.VerbatimString(format, string);
    }, _Decoder_decodeSimpleError = function _Decoder_decodeSimpleError2(chunk) {
      const string = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, String, chunk);
      return typeof string === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSimpleError).bind(this, string) : new errors_1.SimpleError(string);
    }, _Decoder_continueDecodeSimpleError = function _Decoder_continueDecodeSimpleError2(stringCb, chunk) {
      const string = stringCb(chunk);
      return typeof string === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSimpleError2).bind(this, string) : new errors_1.SimpleError(string);
    }, _Decoder_decodeBlobError = function _Decoder_decodeBlobError2(chunk) {
      const string = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobString).call(this, String, chunk);
      return typeof string === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeBlobError).bind(this, string) : new errors_1.BlobError(string);
    }, _Decoder_continueDecodeBlobError = function _Decoder_continueDecodeBlobError2(stringCb, chunk) {
      const string = stringCb(chunk);
      return typeof string === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeBlobError2).bind(this, string) : new errors_1.BlobError(string);
    }, _Decoder_decodeNestedType = function _Decoder_decodeNestedType2(typeMapping, chunk) {
      var _b;
      const type = chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")];
      return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedTypeValue).bind(this, type, typeMapping) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedTypeValue).call(this, type, typeMapping, chunk);
    }, _Decoder_decodeNestedTypeValue = function _Decoder_decodeNestedTypeValue2(type, typeMapping, chunk) {
      switch (type) {
        case exports.RESP_TYPES.NULL:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNull).call(this);
        case exports.RESP_TYPES.BOOLEAN:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBoolean).call(this, typeMapping[exports.RESP_TYPES.BOOLEAN], chunk);
        case exports.RESP_TYPES.NUMBER:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumber).call(this, typeMapping[exports.RESP_TYPES.NUMBER], chunk);
        case exports.RESP_TYPES.BIG_NUMBER:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumber).call(this, typeMapping[exports.RESP_TYPES.BIG_NUMBER], chunk);
        case exports.RESP_TYPES.DOUBLE:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDouble).call(this, typeMapping[exports.RESP_TYPES.DOUBLE], chunk);
        case exports.RESP_TYPES.SIMPLE_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, typeMapping[exports.RESP_TYPES.SIMPLE_STRING], chunk);
        case exports.RESP_TYPES.BLOB_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobString).call(this, typeMapping[exports.RESP_TYPES.BLOB_STRING], chunk);
        case exports.RESP_TYPES.VERBATIM_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeVerbatimString).call(this, typeMapping[exports.RESP_TYPES.VERBATIM_STRING], chunk);
        case exports.RESP_TYPES.SIMPLE_ERROR:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleError).call(this, chunk);
        case exports.RESP_TYPES.BLOB_ERROR:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobError).call(this, chunk);
        case exports.RESP_TYPES.ARRAY:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArray).call(this, typeMapping, chunk);
        case exports.RESP_TYPES.SET:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSet).call(this, typeMapping, chunk);
        case exports.RESP_TYPES.MAP:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMap).call(this, typeMapping, chunk);
        default:
          throw new Error(`Unknown RESP type ${type} "${String.fromCharCode(type)}"`);
      }
    }, _Decoder_decodeArray = function _Decoder_decodeArray2(typeMapping, chunk) {
      if (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")] === ASCII["-"]) {
        __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 4, "f");
        return null;
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayWithLength).call(this, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).call(this, 0, chunk), typeMapping, chunk);
    }, _Decoder_decodeArrayWithLength = function _Decoder_decodeArrayWithLength2(length, typeMapping, chunk) {
      return typeof length === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeArrayLength).bind(this, length, typeMapping) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayItems).call(this, new Array(length), 0, typeMapping, chunk);
    }, _Decoder_continueDecodeArrayLength = function _Decoder_continueDecodeArrayLength2(lengthCb, typeMapping, chunk) {
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayWithLength).call(this, lengthCb(chunk), typeMapping, chunk);
    }, _Decoder_decodeArrayItems = function _Decoder_decodeArrayItems2(array, filled, typeMapping, chunk) {
      for (let i2 = filled; i2 < array.length; i2++) {
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayItems2).bind(this, array, i2, typeMapping);
        }
        const item = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
        if (typeof item === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeArrayItems).bind(this, array, i2, item, typeMapping);
        }
        array[i2] = item;
      }
      return array;
    }, _Decoder_continueDecodeArrayItems = function _Decoder_continueDecodeArrayItems2(array, filled, itemCb, typeMapping, chunk) {
      const item = itemCb(chunk);
      if (typeof item === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeArrayItems2).bind(this, array, filled, item, typeMapping);
      }
      array[filled++] = item;
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayItems).call(this, array, filled, typeMapping, chunk);
    }, _Decoder_decodeSet = function _Decoder_decodeSet2(typeMapping, chunk) {
      const length = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).call(this, 0, chunk);
      if (typeof length === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSetLength).bind(this, length, typeMapping);
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSetItems).call(this, length, typeMapping, chunk);
    }, _Decoder_continueDecodeSetLength = function _Decoder_continueDecodeSetLength2(lengthCb, typeMapping, chunk) {
      const length = lengthCb(chunk);
      return typeof length === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSetLength2).bind(this, length, typeMapping) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSetItems).call(this, length, typeMapping, chunk);
    }, _Decoder_decodeSetItems = function _Decoder_decodeSetItems2(length, typeMapping, chunk) {
      return typeMapping[exports.RESP_TYPES.SET] === Set ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSetAsSet).call(this, /* @__PURE__ */ new Set(), length, typeMapping, chunk) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayItems).call(this, new Array(length), 0, typeMapping, chunk);
    }, _Decoder_decodeSetAsSet = function _Decoder_decodeSetAsSet2(set, remaining, typeMapping, chunk) {
      while (remaining > 0) {
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSetAsSet2).bind(this, set, remaining, typeMapping);
        }
        const item = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
        if (typeof item === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSetAsSet).bind(this, set, remaining, item, typeMapping);
        }
        set.add(item);
        --remaining;
      }
      return set;
    }, _Decoder_continueDecodeSetAsSet = function _Decoder_continueDecodeSetAsSet2(set, remaining, itemCb, typeMapping, chunk) {
      const item = itemCb(chunk);
      if (typeof item === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSetAsSet2).bind(this, set, remaining, item, typeMapping);
      }
      set.add(item);
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSetAsSet).call(this, set, remaining - 1, typeMapping, chunk);
    }, _Decoder_decodeMap = function _Decoder_decodeMap2(typeMapping, chunk) {
      const length = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).call(this, 0, chunk);
      if (typeof length === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapLength).bind(this, length, typeMapping);
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapItems).call(this, length, typeMapping, chunk);
    }, _Decoder_continueDecodeMapLength = function _Decoder_continueDecodeMapLength2(lengthCb, typeMapping, chunk) {
      const length = lengthCb(chunk);
      return typeof length === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapLength2).bind(this, length, typeMapping) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapItems).call(this, length, typeMapping, chunk);
    }, _Decoder_decodeMapItems = function _Decoder_decodeMapItems2(length, typeMapping, chunk) {
      switch (typeMapping[exports.RESP_TYPES.MAP]) {
        case Map:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsMap).call(this, /* @__PURE__ */ new Map(), length, typeMapping, chunk);
        case Array:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayItems).call(this, new Array(length * 2), 0, typeMapping, chunk);
        default:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsObject).call(this, {}, length, typeMapping, chunk);
      }
    }, _Decoder_decodeMapAsMap = function _Decoder_decodeMapAsMap2(map, remaining, typeMapping, chunk) {
      while (remaining > 0) {
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsMap2).bind(this, map, remaining, typeMapping);
        }
        const key = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapKey).call(this, typeMapping, chunk);
        if (typeof key === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapKey).bind(this, map, remaining, key, typeMapping);
        }
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapValue).bind(this, map, remaining, key, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).bind(this, typeMapping), typeMapping);
        }
        const value = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
        if (typeof value === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapValue).bind(this, map, remaining, key, value, typeMapping);
        }
        map.set(key, value);
        --remaining;
      }
      return map;
    }, _Decoder_decodeMapKey = function _Decoder_decodeMapKey2(typeMapping, chunk) {
      var _b;
      const type = chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")];
      return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapKeyValue).bind(this, type, typeMapping) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapKeyValue).call(this, type, typeMapping, chunk);
    }, _Decoder_decodeMapKeyValue = function _Decoder_decodeMapKeyValue2(type, typeMapping, chunk) {
      switch (type) {
        // decode simple string map key as string (and not as buffer)
        case exports.RESP_TYPES.SIMPLE_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, String, chunk);
        // decode blob string map key as string (and not as buffer)
        case exports.RESP_TYPES.BLOB_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobString).call(this, String, chunk);
        default:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedTypeValue).call(this, type, typeMapping, chunk);
      }
    }, _Decoder_continueDecodeMapKey = function _Decoder_continueDecodeMapKey2(map, remaining, keyCb, typeMapping, chunk) {
      const key = keyCb(chunk);
      if (typeof key === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapKey2).bind(this, map, remaining, key, typeMapping);
      }
      if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapValue).bind(this, map, remaining, key, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).bind(this, typeMapping), typeMapping);
      }
      const value = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
      if (typeof value === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapValue).bind(this, map, remaining, key, value, typeMapping);
      }
      map.set(key, value);
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsMap).call(this, map, remaining - 1, typeMapping, chunk);
    }, _Decoder_continueDecodeMapValue = function _Decoder_continueDecodeMapValue2(map, remaining, key, valueCb, typeMapping, chunk) {
      const value = valueCb(chunk);
      if (typeof value === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapValue2).bind(this, map, remaining, key, value, typeMapping);
      }
      map.set(key, value);
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsMap).call(this, map, remaining - 1, typeMapping, chunk);
    }, _Decoder_decodeMapAsObject = function _Decoder_decodeMapAsObject2(object, remaining, typeMapping, chunk) {
      while (remaining > 0) {
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsObject2).bind(this, object, remaining, typeMapping);
        }
        const key = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapKey).call(this, typeMapping, chunk);
        if (typeof key === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectKey).bind(this, object, remaining, key, typeMapping);
        }
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectValue).bind(this, object, remaining, key, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).bind(this, typeMapping), typeMapping);
        }
        const value = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
        if (typeof value === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectValue).bind(this, object, remaining, key, value, typeMapping);
        }
        if (key === "__proto__" || key === "constructor") {
          Object.defineProperty(object, key, {
            value,
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          object[key] = value;
        }
        --remaining;
      }
      return object;
    }, _Decoder_continueDecodeMapAsObjectKey = function _Decoder_continueDecodeMapAsObjectKey2(object, remaining, keyCb, typeMapping, chunk) {
      const key = keyCb(chunk);
      if (typeof key === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectKey2).bind(this, object, remaining, key, typeMapping);
      }
      if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectValue).bind(this, object, remaining, key, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).bind(this, typeMapping), typeMapping);
      }
      const value = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
      if (typeof value === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectValue).bind(this, object, remaining, key, value, typeMapping);
      }
      if (key === "__proto__" || key === "constructor") {
        Object.defineProperty(object, key, {
          value,
          configurable: true,
          enumerable: true,
          writable: true
        });
      } else {
        object[key] = value;
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsObject).call(this, object, remaining - 1, typeMapping, chunk);
    }, _Decoder_continueDecodeMapAsObjectValue = function _Decoder_continueDecodeMapAsObjectValue2(object, remaining, key, valueCb, typeMapping, chunk) {
      const value = valueCb(chunk);
      if (typeof value === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectValue2).bind(this, object, remaining, key, value, typeMapping);
      }
      if (key === "__proto__" || key === "constructor") {
        Object.defineProperty(object, key, {
          value,
          configurable: true,
          enumerable: true,
          writable: true
        });
      } else {
        object[key] = value;
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsObject).call(this, object, remaining - 1, typeMapping, chunk);
    };
    _Decoder_DOUBLE_DECIMAL_MULTIPLIERS = { value: [
      0.1,
      0.01,
      1e-3,
      1e-4,
      1e-5,
      1e-6,
      1e-7,
      1e-8,
      1e-9,
      1e-10,
      1e-11,
      1e-12,
      1e-13,
      1e-14,
      1e-15,
      1e-16,
      1e-17
    ] };
  }
});

// ../../node_modules/ioredis/built/DataHandler.js
var require_DataHandler = __commonJS({
  "../../node_modules/ioredis/built/DataHandler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Command_1 = require_Command();
    var utils_1 = require_utils2();
    var SubscriptionSet_1 = require_SubscriptionSet();
    var decoder_1 = require_decoder();
    var debug = (0, utils_1.Debug)("dataHandler");
    var DataHandler = class {
      constructor(redis, parserOptions) {
        this.redis = redis;
        const typeMapping = getParserTypeMapping(parserOptions);
        const decoder = new decoder_1.Decoder({
          getTypeMapping: () => typeMapping,
          onReply: (reply) => {
            this.dispatch(() => this.returnReply(reply));
          },
          onErrorReply: (err) => {
            this.dispatch(() => this.returnError(err));
          },
          onPush: (reply) => {
            this.dispatch(() => this.returnPush(reply));
          }
        });
        redis.stream.prependListener("data", (data) => {
          try {
            decoder.write(data);
          } catch (err) {
            this.returnFatalError(err);
          }
        });
        redis.stream.resume();
      }
      // Rethrows user listener/transformer exceptions asynchronously so they
      // surface as uncaught exceptions (as with redis-parser in v5) instead of
      // unwinding the decoder mid-parse and tearing down the connection as a
      // fatal protocol error.
      dispatch(fn) {
        try {
          fn();
        } catch (err) {
          process.nextTick(() => {
            throw err;
          });
        }
      }
      returnFatalError(err) {
        err.message += ". Please report this.";
        this.redis.recoverFromFatalError(err, err, { offlineQueue: false });
      }
      returnError(err) {
        const item = this.shiftCommand(err);
        if (!item) {
          return;
        }
        err.command = {
          name: item.command.name,
          args: item.command.args
        };
        const isMovedSsubscribe = item.command.name === "ssubscribe" && err.message.startsWith("MOVED ");
        if (isMovedSsubscribe) {
          this.redis.emit("moved");
        }
        this.redis.handleReconnection(err, item);
      }
      returnReply(reply) {
        if (this.handleMonitorReply(reply)) {
          return;
        }
        if (this.redis.condition.protocol !== 3 && this.handleSubscriberReply(reply)) {
          return;
        }
        const item = this.shiftCommand(reply);
        if (!item) {
          return;
        }
        if (Command_1.default.checkFlag("ENTER_SUBSCRIBER_MODE", item.command.name)) {
          this.redis.condition.subscriber = new SubscriptionSet_1.default();
          this.redis.condition.subscriber.add(item.command.name, reply[1].toString());
          if (!fillSubCommand(item.command, reply[2])) {
            this.redis.commandQueue.unshift(item);
          }
        } else if (Command_1.default.checkFlag("EXIT_SUBSCRIBER_MODE", item.command.name)) {
          if (!fillUnsubCommand(item.command, reply[2])) {
            this.redis.commandQueue.unshift(item);
          }
        } else {
          item.command.resolve(reply);
        }
      }
      returnPush(reply) {
        if (!Array.isArray(reply) || reply.length === 0) {
          return;
        }
        const replyType = reply[0].toString();
        debug('receive push "%s"', replyType);
        switch (replyType) {
          case "message":
          case "pmessage":
          case "smessage":
            this.handleSubscriberReply(reply);
            break;
          case "ssubscribe":
          case "subscribe":
          case "psubscribe": {
            if (!this.redis.condition.subscriber) {
              this.redis.condition.subscriber = new SubscriptionSet_1.default();
            }
            const channel = reply[1].toString();
            this.redis.condition.subscriber.add(replyType, channel);
            const item = this.shiftCommand(reply);
            if (!item) {
              return;
            }
            if (!fillSubCommand(item.command, reply[2])) {
              this.redis.commandQueue.unshift(item);
            }
            break;
          }
          case "sunsubscribe":
          case "unsubscribe":
          case "punsubscribe": {
            if (this.redis.condition.subscriber) {
              const channel = reply[1] ? reply[1].toString() : null;
              if (channel) {
                this.redis.condition.subscriber.del(replyType, channel);
              }
            }
            const count = reply[2];
            if (Number(count) === 0) {
              this.redis.condition.subscriber = false;
            }
            if (this.handleUnsolicitedUnsubscribe(replyType)) {
              return;
            }
            const item = this.shiftCommand(reply);
            if (!item) {
              return;
            }
            if (!fillUnsubCommand(item.command, count)) {
              this.redis.commandQueue.unshift(item);
            }
            break;
          }
        }
      }
      // Cluster sends unsolicited `sunsubscribe` pushes on slot migration; those
      // answer no queued command, so shifting the queue head would resolve an
      // unrelated in-flight command. Detected via a non-matching queue head, and
      // `sunsubscribe` reuses the ssubscribe-MOVED recovery path.
      handleUnsolicitedUnsubscribe(replyType) {
        const head = this.redis.commandQueue.peekFront();
        if (head && head.command.name.toLowerCase() === replyType) {
          return false;
        }
        if (replyType === "sunsubscribe") {
          this.redis.emit("moved");
        }
        return true;
      }
      handleSubscriberReply(reply) {
        if (!this.redis.condition.subscriber) {
          return false;
        }
        const replyType = Array.isArray(reply) ? reply[0].toString() : null;
        debug('receive reply "%s" in subscriber mode', replyType);
        switch (replyType) {
          case "message":
            if (this.redis.listeners("message").length > 0) {
              this.redis.emit("message", reply[1].toString(), reply[2] ? reply[2].toString() : "");
            }
            this.redis.emit("messageBuffer", reply[1], reply[2]);
            break;
          case "pmessage": {
            const pattern = reply[1].toString();
            if (this.redis.listeners("pmessage").length > 0) {
              this.redis.emit("pmessage", pattern, reply[2].toString(), reply[3].toString());
            }
            this.redis.emit("pmessageBuffer", pattern, reply[2], reply[3]);
            break;
          }
          case "smessage": {
            if (this.redis.listeners("smessage").length > 0) {
              this.redis.emit("smessage", reply[1].toString(), reply[2] ? reply[2].toString() : "");
            }
            this.redis.emit("smessageBuffer", reply[1], reply[2]);
            break;
          }
          case "ssubscribe":
          case "subscribe":
          case "psubscribe": {
            const channel = reply[1].toString();
            this.redis.condition.subscriber.add(replyType, channel);
            const item = this.shiftCommand(reply);
            if (!item) {
              return;
            }
            if (!fillSubCommand(item.command, reply[2])) {
              this.redis.commandQueue.unshift(item);
            }
            break;
          }
          case "sunsubscribe":
          case "unsubscribe":
          case "punsubscribe": {
            const channel = reply[1] ? reply[1].toString() : null;
            if (channel) {
              this.redis.condition.subscriber.del(replyType, channel);
            }
            const count = reply[2];
            if (Number(count) === 0) {
              this.redis.condition.subscriber = false;
            }
            if (this.handleUnsolicitedUnsubscribe(replyType)) {
              break;
            }
            const item = this.shiftCommand(reply);
            if (!item) {
              return;
            }
            if (!fillUnsubCommand(item.command, count)) {
              this.redis.commandQueue.unshift(item);
            }
            break;
          }
          default: {
            const item = this.shiftCommand(reply);
            if (!item) {
              return;
            }
            item.command.resolve(reply);
          }
        }
        return true;
      }
      handleMonitorReply(reply) {
        if (this.redis.status !== "monitoring") {
          return false;
        }
        const replyStr = reply.toString();
        if (replyStr === "OK") {
          return false;
        }
        const len = replyStr.indexOf(" ");
        const timestamp = replyStr.slice(0, len);
        const argIndex = replyStr.indexOf('"');
        const args = replyStr.slice(argIndex + 1, -1).split('" "').map((elem) => elem.replace(/\\"/g, '"'));
        const dbAndSource = replyStr.slice(len + 2, argIndex - 2).split(" ");
        this.redis.emit("monitor", timestamp, args, dbAndSource[1], dbAndSource[0]);
        return true;
      }
      shiftCommand(reply) {
        const item = this.redis.commandQueue.shift();
        if (!item) {
          const message = "Command queue state error. If you can reproduce this, please report it.";
          const error = new Error(message + (reply instanceof Error ? ` Last error: ${reply.message}` : ` Last reply: ${reply.toString()}`));
          this.redis.emit("error", error);
          return null;
        }
        return item;
      }
    };
    exports.default = DataHandler;
    var legacyTypeMapping = {
      [decoder_1.RESP_TYPES.SIMPLE_STRING]: Buffer,
      [decoder_1.RESP_TYPES.BLOB_STRING]: Buffer,
      [decoder_1.RESP_TYPES.VERBATIM_STRING]: Buffer,
      [decoder_1.RESP_TYPES.BIG_NUMBER]: String,
      // RESP2 represented doubles as bulk strings and booleans as `1`/`0`
      // integers. Decode doubles to Buffer (like blob strings, so `replyEncoding`
      // still chooses string-vs-buffer per command) and booleans to numbers, so
      // RESP3 replies match the classic RESP2 shape.
      [decoder_1.RESP_TYPES.DOUBLE]: Buffer,
      [decoder_1.RESP_TYPES.BOOLEAN]: Number,
      [decoder_1.RESP_TYPES.MAP]: Array,
      [decoder_1.RESP_TYPES.SET]: Array
    };
    var resp3TypeMapping = {
      [decoder_1.RESP_TYPES.SIMPLE_STRING]: Buffer,
      [decoder_1.RESP_TYPES.BLOB_STRING]: Buffer,
      [decoder_1.RESP_TYPES.VERBATIM_STRING]: Buffer,
      [decoder_1.RESP_TYPES.BIG_NUMBER]: String,
      [decoder_1.RESP_TYPES.SET]: Array
    };
    function getParserTypeMapping(parserOptions) {
      const base = parserOptions.replyMapping === "resp3" ? resp3TypeMapping : legacyTypeMapping;
      return parserOptions.stringNumbers ? { ...base, [decoder_1.RESP_TYPES.NUMBER]: String, [decoder_1.RESP_TYPES.DOUBLE]: String } : base;
    }
    var remainingRepliesMap = /* @__PURE__ */ new WeakMap();
    function fillSubCommand(command, count) {
      let remainingReplies = remainingRepliesMap.has(command) ? remainingRepliesMap.get(command) : command.args.length;
      remainingReplies -= 1;
      if (remainingReplies <= 0) {
        command.resolve(count);
        remainingRepliesMap.delete(command);
        return true;
      }
      remainingRepliesMap.set(command, remainingReplies);
      return false;
    }
    function fillUnsubCommand(command, count) {
      let remainingReplies = remainingRepliesMap.has(command) ? remainingRepliesMap.get(command) : command.args.length;
      if (remainingReplies === 0) {
        if (Number(count) === 0) {
          remainingRepliesMap.delete(command);
          command.resolve(count);
          return true;
        }
        return false;
      }
      remainingReplies -= 1;
      if (remainingReplies <= 0) {
        command.resolve(count);
        return true;
      }
      remainingRepliesMap.set(command, remainingReplies);
      return false;
    }
  }
});

// ../../node_modules/ioredis/built/redis/event_handler.js
var require_event_handler = __commonJS({
  "../../node_modules/ioredis/built/redis/event_handler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.readyHandler = exports.errorHandler = exports.closeHandler = exports.connectHandler = void 0;
    var redis_errors_1 = require_redis_errors();
    var Command_1 = require_Command();
    var errors_1 = require_errors();
    var utils_1 = require_utils2();
    var version_1 = require_version();
    var DataHandler_1 = require_DataHandler();
    var HimportCoordinator_1 = require_HimportCoordinator();
    var debug = (0, utils_1.Debug)("connection");
    function getHandshakeCommands(self) {
      const commands = [];
      if (self.condition.protocol === 3) {
        const helloCommandArgs = [self.condition.protocol];
        if (self.condition.auth) {
          helloCommandArgs.push("AUTH");
          if (Array.isArray(self.condition.auth)) {
            helloCommandArgs.push(self.condition.auth[0], self.condition.auth[1]);
          } else {
            helloCommandArgs.push("default", self.condition.auth);
          }
        }
        commands.push({
          kind: "hello",
          send: () => self.hello(helloCommandArgs),
          errorHandler: handleAuthError
        });
      } else if (self.condition.auth) {
        commands.push({
          kind: "auth",
          send: () => self.auth(self.condition.auth),
          errorHandler: handleAuthError
        });
      }
      if (self.condition.select) {
        commands.push({
          kind: "select",
          send: () => self.select(self.condition.select),
          errorHandler: (err) => self.silentEmit("error", err)
        });
      }
      if (self.options.connectionName) {
        debug("set the connection name [%s]", self.options.connectionName);
        commands.push({
          kind: "client",
          send: () => self.client("setname", self.options.connectionName),
          errorHandler: utils_1.noop
        });
      }
      if (self.options.readOnly) {
        debug("set the connection to readonly mode");
        commands.push({
          kind: "readonly",
          send: () => self.readonly(),
          errorHandler: utils_1.noop
        });
      }
      if (!self.options.disableClientInfo) {
        debug("set the client info");
        commands.push({
          kind: "client",
          send: () => self.client("SETINFO", "LIB-VER", version_1.PACKAGE_VERSION),
          errorHandler: utils_1.noop
        });
        commands.push({
          kind: "client",
          send: () => self.client("SETINFO", "LIB-NAME", self.options?.clientInfoTag ? `ioredis(${self.options.clientInfoTag})` : "ioredis"),
          errorHandler: utils_1.noop
        });
      }
      const himportBinding = (0, HimportCoordinator_1.getHimportBinding)(self);
      if (himportBinding && himportBinding.role !== "replica") {
        for (const definition of himportBinding.coordinator.getDefinitions()) {
          commands.push({
            kind: "himport",
            send: () => himportBinding.coordinator.ensurePrepared(self, definition) ?? Promise.resolve(),
            errorHandler: (err) => self.silentEmit("error", err)
          });
        }
      }
      return commands;
    }
    async function sendHandshake(commands, protocol) {
      if (protocol !== 3) {
        await Promise.all(commands.map(({ send, errorHandler: errorHandler2 }) => errorHandler2 ? send().catch(errorHandler2) : send()));
        return;
      }
      const results = await Promise.allSettled(commands.map(({ send }) => send()));
      const helloIndex = commands.findIndex(({ kind }) => kind === "hello");
      const helloResult = helloIndex === -1 ? void 0 : results[helloIndex];
      if (helloResult?.status === "rejected" && isProtocolNegotiationError(helloResult.reason)) {
        throw helloResult.reason;
      }
      for (let i2 = 0; i2 < results.length; i2++) {
        const result = results[i2];
        if (result.status === "rejected") {
          const { errorHandler: errorHandler2 } = commands[i2];
          if (errorHandler2) {
            errorHandler2(result.reason);
            continue;
          }
          throw result.reason;
        }
      }
    }
    function connectHandler(self) {
      return async function() {
        try {
          self.resetCommandQueue();
          self.condition.handshake = true;
          self.setStatus("connect");
          new DataHandler_1.default(self, {
            stringNumbers: self.options.stringNumbers,
            replyMapping: self.condition.replyMapping
          });
          const { connectionEpoch } = self;
          const himportBinding = (0, HimportCoordinator_1.getHimportBinding)(self);
          himportBinding?.coordinator.beginSession(self);
          const isActiveConnect = () => connectionEpoch === self.connectionEpoch && self.status === "connect";
          const finishHandshake = () => {
            if (!isActiveConnect()) {
              return false;
            }
            self.condition.handshake = false;
            return true;
          };
          try {
            await sendHandshake(getHandshakeCommands(self), self.condition.protocol);
          } catch (err) {
            if (!isActiveConnect()) {
              return;
            }
            if (!isProtocolNegotiationError(err)) {
              return self.recoverFromFatalError(err, err);
            }
            if (self.options.replyMapping === "resp3") {
              console.warn('[WARN] replyMapping "resp3" was requested, but the server does not support RESP3. Replies will use RESP2-compatible shapes until connected to a server that supports RESP3.');
            }
            debug("server rejected RESP3, downgrading connection to RESP2");
            self.condition.protocol = 2;
            self.condition.replyMapping = "legacy";
            try {
              await sendHandshake(getHandshakeCommands(self), self.condition.protocol);
            } catch (downgradeErr) {
              if (!isActiveConnect()) {
                return;
              }
              return self.recoverFromFatalError(downgradeErr, downgradeErr);
            }
          }
          if (!isActiveConnect()) {
            return;
          }
          if (!self.options.enableReadyCheck) {
            if (!finishHandshake()) {
              return;
            }
            return exports.readyHandler(self)();
          }
          self._readyCheck(function(err, info) {
            if (!isActiveConnect()) {
              return;
            }
            if (err) {
              self.recoverFromFatalError(err, err);
            } else if (self.connector.check(info)) {
              if (!finishHandshake()) {
                return;
              }
              exports.readyHandler(self)();
            } else {
              self.disconnect(true);
            }
          });
        } catch (err) {
          self.recoverFromFatalError(err, err);
        }
      };
    }
    exports.connectHandler = connectHandler;
    function handleAuthError(err) {
      const msg = err.message || "";
      if (msg.indexOf("no password is set") !== -1) {
        console.warn("[WARN] Redis server does not require a password, but a password was supplied.");
        return;
      }
      if (msg.indexOf("without any password configured for the default user") !== -1) {
        console.warn("[WARN] This Redis server's `default` user does not require a password, but a password was supplied");
        return;
      }
      if (msg.indexOf("wrong number of arguments for 'auth' command") !== -1) {
        console.warn(`[ERROR] The server returned "wrong number of arguments for 'auth' command". You are probably passing both username and password to Redis version 5 or below. You should only pass the 'password' option for Redis version 5 and under.`);
        return;
      }
      throw err;
    }
    function isProtocolNegotiationError(err) {
      const msg = (err.message || "").toUpperCase();
      return msg.includes("NOPROTO") || msg.includes("UNKNOWN COMMAND") && msg.includes("HELLO");
    }
    function abortError(command) {
      const err = new redis_errors_1.AbortError("Command aborted due to connection close");
      err.command = {
        name: command.name,
        args: command.args
      };
      return err;
    }
    function abortIncompletePipelines(commandQueue) {
      let expectedIndex = 0;
      for (let i2 = 0; i2 < commandQueue.length; ) {
        const command = commandQueue.peekAt(i2)?.command;
        const pipelineIndex = command.pipelineIndex;
        if (pipelineIndex === void 0 || pipelineIndex === 0) {
          expectedIndex = 0;
        }
        if (pipelineIndex !== void 0 && pipelineIndex !== expectedIndex++) {
          commandQueue.remove(i2, 1);
          command.reject(abortError(command));
          continue;
        }
        i2++;
      }
    }
    function abortTransactionFragments(commandQueue) {
      for (let i2 = 0; i2 < commandQueue.length; ) {
        const command = commandQueue.peekAt(i2)?.command;
        if (command.name === "multi") {
          break;
        }
        if (command.name === "exec") {
          commandQueue.remove(i2, 1);
          command.reject(abortError(command));
          break;
        }
        if (command.inTransaction) {
          commandQueue.remove(i2, 1);
          command.reject(abortError(command));
        } else {
          i2++;
        }
      }
    }
    function closeHandler(self) {
      return function() {
        const prevStatus = self.status;
        self.setStatus("close");
        if (self.socketTimeoutTimer !== void 0) {
          clearTimeout(self.socketTimeoutTimer);
          self.socketTimeoutTimer = void 0;
        }
        if (self.commandQueue.length) {
          abortIncompletePipelines(self.commandQueue);
        }
        if (self.offlineQueue.length) {
          abortTransactionFragments(self.offlineQueue);
        }
        if (prevStatus === "ready") {
          if (!self.prevCondition) {
            self.prevCondition = self.condition;
          }
          if (self.commandQueue.length) {
            self.prevCommandQueue = self.commandQueue;
          }
        }
        if (self.manuallyClosing) {
          self.manuallyClosing = false;
          debug("skip reconnecting since the connection is manually closed.");
          return close();
        }
        if (typeof self.options.retryStrategy !== "function") {
          debug("skip reconnecting because `retryStrategy` is not a function");
          return close();
        }
        const retryDelay = self.options.retryStrategy(++self.retryAttempts);
        if (typeof retryDelay !== "number") {
          debug("skip reconnecting because `retryStrategy` doesn't return a number");
          return close();
        }
        debug("reconnect in %sms", retryDelay);
        self.setStatus("reconnecting", retryDelay);
        self.reconnectTimeout = setTimeout(function() {
          self.reconnectTimeout = null;
          self.connect().catch(utils_1.noop);
        }, retryDelay);
        const { maxRetriesPerRequest } = self.options;
        if (typeof maxRetriesPerRequest === "number") {
          if (maxRetriesPerRequest < 0) {
            debug("maxRetriesPerRequest is negative, ignoring...");
          } else {
            const remainder = self.retryAttempts % (maxRetriesPerRequest + 1);
            if (remainder === 0) {
              debug("reach maxRetriesPerRequest limitation, flushing command queue...");
              self.flushQueue(new errors_1.MaxRetriesPerRequestError(maxRetriesPerRequest));
            }
          }
        }
      };
      function close() {
        self.setStatus("end");
        self.flushQueue(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
      }
    }
    exports.closeHandler = closeHandler;
    function errorHandler(self) {
      return function(error) {
        debug("error: %s", error);
        self.silentEmit("error", error);
      };
    }
    exports.errorHandler = errorHandler;
    function readyHandler(self) {
      return function() {
        self.setStatus("ready");
        self.retryAttempts = 0;
        if (self.options.monitor) {
          self.call("monitor").then(() => self.setStatus("monitoring"), (error) => self.emit("error", error));
          const { sendCommand } = self;
          self.sendCommand = function(command) {
            if (Command_1.default.checkFlag("VALID_IN_MONITOR_MODE", command.name)) {
              return sendCommand.call(self, command);
            }
            command.reject(new Error("Connection is in monitoring mode, can't process commands."));
            return command.promise;
          };
          self.once("close", function() {
            delete self.sendCommand;
          });
          return;
        }
        const finalSelect = self.prevCondition ? self.prevCondition.select : self.condition.select;
        if (self.prevCondition) {
          const condition = self.prevCondition;
          self.prevCondition = null;
          if (condition.subscriber && self.options.autoResubscribe) {
            if (self.condition.select !== finalSelect) {
              debug("connect to db [%d]", finalSelect);
              self.select(finalSelect);
            }
            const subscribeChannels = condition.subscriber.channels("subscribe");
            if (subscribeChannels.length) {
              debug("subscribe %d channels", subscribeChannels.length);
              self.subscribe(subscribeChannels);
            }
            const psubscribeChannels = condition.subscriber.channels("psubscribe");
            if (psubscribeChannels.length) {
              debug("psubscribe %d channels", psubscribeChannels.length);
              self.psubscribe(psubscribeChannels);
            }
            const ssubscribeChannels = condition.subscriber.channels("ssubscribe");
            if (ssubscribeChannels.length) {
              debug("ssubscribe %s", ssubscribeChannels.length);
              for (const channel of ssubscribeChannels) {
                self.ssubscribe(channel);
              }
            }
          }
        }
        if (self.prevCommandQueue) {
          if (self.options.autoResendUnfulfilledCommands) {
            debug("resend %d unfulfilled commands", self.prevCommandQueue.length);
            while (self.prevCommandQueue.length > 0) {
              const item = self.prevCommandQueue.shift();
              if (item.select !== self.condition.select && item.command.name !== "select") {
                self.select(item.select);
              }
              self.sendCommand(item.command, item.stream);
            }
          } else {
            self.prevCommandQueue = null;
          }
        }
        if (self.offlineQueue.length) {
          debug("send %d commands in offline queue", self.offlineQueue.length);
          const offlineQueue = self.offlineQueue;
          self.resetOfflineQueue();
          while (offlineQueue.length > 0) {
            const item = offlineQueue.shift();
            if (item.select !== self.condition.select && item.command.name !== "select") {
              self.select(item.select);
            }
            self.sendCommand(item.command, item.stream);
          }
        }
        if (self.condition.select !== finalSelect) {
          debug("connect to db [%d]", finalSelect);
          self.select(finalSelect);
        }
      };
    }
    exports.readyHandler = readyHandler;
  }
});

// ../../node_modules/ioredis/built/redis/RedisOptions.js
var require_RedisOptions = __commonJS({
  "../../node_modules/ioredis/built/redis/RedisOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_REDIS_OPTIONS = void 0;
    exports.DEFAULT_REDIS_OPTIONS = {
      // Connection
      port: 6379,
      host: "localhost",
      family: 0,
      connectTimeout: 1e4,
      disconnectTimeout: 2e3,
      retryStrategy: function(times) {
        const jitter = Math.floor(Math.random() * 200);
        const delay = Math.min(Math.pow(2, times - 1) * 50, 5e3);
        return delay + jitter;
      },
      keepAlive: 3e4,
      noDelay: true,
      connectionName: null,
      disableClientInfo: false,
      clientInfoTag: void 0,
      // Sentinel
      sentinels: null,
      name: null,
      role: "master",
      sentinelRetryStrategy: function(times) {
        return Math.min(times * 10, 1e3);
      },
      sentinelReconnectStrategy: function() {
        return 6e4;
      },
      natMap: null,
      enableTLSForSentinelMode: false,
      updateSentinels: true,
      failoverDetector: false,
      // Status
      username: null,
      password: null,
      db: 0,
      // Others
      enableOfflineQueue: true,
      enableReadyCheck: true,
      autoResubscribe: true,
      autoResendUnfulfilledCommands: true,
      lazyConnect: false,
      keyPrefix: "",
      reconnectOnError: null,
      readOnly: false,
      stringNumbers: false,
      protocol: 3,
      replyMapping: "legacy",
      maxRetriesPerRequest: 20,
      maxLoadingRetryTime: 1e4,
      enableAutoPipelining: false,
      autoPipeliningIgnoredCommands: [],
      sentinelMaxConnections: 10,
      blockingTimeoutGrace: 100
    };
  }
});

// ../../node_modules/ioredis/built/Redis.js
var require_Redis = __commonJS({
  "../../node_modules/ioredis/built/Redis.js"(exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_built();
    var events_1 = __require("events");
    var standard_as_callback_1 = require_built2();
    var cluster_1 = require_cluster();
    var Command_1 = require_Command();
    var connectors_1 = require_connectors();
    var SentinelConnector_1 = require_SentinelConnector();
    var eventHandler = require_event_handler();
    var RedisOptions_1 = require_RedisOptions();
    var ScanStream_1 = require_ScanStream();
    var transaction_1 = require_transaction();
    var utils_1 = require_utils2();
    var tracing_1 = require_tracing();
    var applyMixin_1 = require_applyMixin();
    var Commander_1 = require_Commander();
    var lodash_1 = require_lodash();
    var HimportCoordinator_1 = require_HimportCoordinator();
    var HimportCoordinator_2 = require_HimportCoordinator();
    var Deque = require_denque();
    var debug = (0, utils_1.Debug)("redis");
    var Redis = class _Redis extends Commander_1.default {
      /**
       * Create a Redis instance.
       * This is the same as `new Redis()` but is included for compatibility with node-redis.
       */
      static createClient(...args) {
        return new _Redis(...args);
      }
      constructor(arg1, arg2, arg3) {
        super();
        this.status = "wait";
        this.isCluster = false;
        this.reconnectTimeout = null;
        this.connectionEpoch = 0;
        this.retryAttempts = 0;
        this.manuallyClosing = false;
        this[_a] = false;
        this._autoPipelines = /* @__PURE__ */ new Map();
        this._runningAutoPipelines = /* @__PURE__ */ new Set();
        this.parseOptions(arg1, arg2, arg3);
        events_1.EventEmitter.call(this);
        this.options.himportFieldsets = (0, HimportCoordinator_2.cloneHimportFieldsets)(this.options.himportFieldsets);
        if (this.options.himportFieldsets?.length) {
          (0, HimportCoordinator_1.bindHimportCoordinator)(this, new HimportCoordinator_1.default(this.options.himportFieldsets), "standalone");
        }
        this.resetCommandQueue();
        this.resetOfflineQueue();
        if (this.options.Connector) {
          this.connector = new this.options.Connector(this.options);
        } else if (this.options.sentinels) {
          const sentinelConnector = new SentinelConnector_1.default(this.options);
          sentinelConnector.emitter = this;
          this.connector = sentinelConnector;
        } else {
          this.connector = new connectors_1.StandaloneConnector(this.options);
        }
        if (this.options.scripts) {
          Object.entries(this.options.scripts).forEach(([name, definition]) => {
            this.defineCommand(name, definition);
          });
        }
        if (this.options.lazyConnect) {
          this.setStatus("wait");
        } else {
          this.connect().catch(lodash_1.noop);
        }
      }
      get autoPipelineQueueSize() {
        let queued = 0;
        for (const pipeline of this._autoPipelines.values()) {
          queued += pipeline.length;
        }
        return queued;
      }
      /**
       * Create a connection to Redis.
       * This method will be invoked automatically when creating a new Redis instance
       * unless `lazyConnect: true` is passed.
       *
       * When calling this method manually, a Promise is returned, which will
       * be resolved when the connection status is ready. The promise can reject
       * if the connection fails, times out, or if Redis is already connecting/connected.
       */
      connect(callback) {
        const promise = (0, tracing_1.traceConnect)(() => this._connect(), () => {
          const { address, port } = this._getServerAddress();
          return {
            serverAddress: address,
            serverPort: port,
            connectionEpoch: this.connectionEpoch
          };
        });
        return (0, standard_as_callback_1.default)(promise, callback);
      }
      _connect() {
        return new Promise((resolve, reject) => {
          if (this.status === "connecting" || this.status === "connect" || this.status === "ready") {
            reject(new Error("Redis is already connecting/connected"));
            return;
          }
          this.connectionEpoch += 1;
          this.setStatus("connecting");
          const { options } = this;
          this.condition = {
            select: options.db,
            auth: options.username ? [options.username, options.password] : options.password,
            subscriber: false,
            protocol: options.protocol,
            replyMapping: options.protocol === 3 && options.replyMapping === "resp3" ? "resp3" : "legacy",
            handshake: false
          };
          const _this = this;
          (0, standard_as_callback_1.default)(this.connector.connect(function(type, err) {
            _this.silentEmit(type, err);
          }), function(err, stream) {
            if (err) {
              _this.flushQueue(err);
              _this.silentEmit("error", err);
              reject(err);
              _this.setStatus("end");
              return;
            }
            let CONNECT_EVENT = options.tls ? "secureConnect" : "connect";
            if ("sentinels" in options && options.sentinels && !options.enableTLSForSentinelMode) {
              CONNECT_EVENT = "connect";
            }
            _this.stream = stream;
            if (options.noDelay) {
              stream.setNoDelay(true);
            }
            if (typeof options.keepAlive === "number") {
              if (stream.connecting) {
                stream.once(CONNECT_EVENT, () => {
                  stream.setKeepAlive(true, options.keepAlive);
                });
              } else {
                stream.setKeepAlive(true, options.keepAlive);
              }
            }
            if (stream.connecting) {
              stream.once(CONNECT_EVENT, eventHandler.connectHandler(_this));
              if (options.connectTimeout) {
                let connectTimeoutCleared = false;
                stream.setTimeout(options.connectTimeout, function() {
                  if (connectTimeoutCleared) {
                    return;
                  }
                  stream.setTimeout(0);
                  stream.destroy();
                  const err2 = new Error("connect ETIMEDOUT");
                  err2.errorno = "ETIMEDOUT";
                  err2.code = "ETIMEDOUT";
                  err2.syscall = "connect";
                  eventHandler.errorHandler(_this)(err2);
                });
                stream.once(CONNECT_EVENT, function() {
                  connectTimeoutCleared = true;
                  stream.setTimeout(0);
                });
              }
            } else if (stream.destroyed) {
              const firstError = _this.connector.firstError;
              if (firstError) {
                process.nextTick(() => {
                  eventHandler.errorHandler(_this)(firstError);
                });
              }
              process.nextTick(eventHandler.closeHandler(_this));
            } else {
              process.nextTick(eventHandler.connectHandler(_this));
            }
            if (!stream.destroyed) {
              stream.once("error", eventHandler.errorHandler(_this));
              stream.once("close", eventHandler.closeHandler(_this));
            }
            const connectionReadyHandler = function() {
              _this.removeListener("close", connectionCloseHandler);
              resolve();
            };
            var connectionCloseHandler = function() {
              _this.removeListener("ready", connectionReadyHandler);
              reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
            };
            _this.once("ready", connectionReadyHandler);
            _this.once("close", connectionCloseHandler);
          });
        });
      }
      /**
       * Disconnect from Redis.
       *
       * This method closes the connection immediately,
       * and may lose some pending replies that haven't written to client.
       * If you want to wait for the pending replies, use Redis#quit instead.
       */
      disconnect(reconnect = false) {
        if (!reconnect) {
          this.manuallyClosing = true;
        }
        if (this.reconnectTimeout && !reconnect) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        if (this.status === "wait") {
          eventHandler.closeHandler(this)();
        } else {
          this.connector.disconnect();
        }
      }
      /**
       * Disconnect from Redis.
       *
       * @deprecated
       */
      end() {
        this.disconnect();
      }
      /**
       * Create a new instance with the same options as the current one.
       *
       * @example
       * ```js
       * var redis = new Redis(6380);
       * var anotherRedis = redis.duplicate();
       * ```
       */
      duplicate(override) {
        return new _Redis({
          ...this.options,
          ...override ?? {}
        });
      }
      /**
       * Mode of the connection.
       *
       * One of `"normal"`, `"subscriber"`, or `"monitor"`. When the connection is
       * not in `"normal"` mode, certain commands are not allowed.
       */
      get mode() {
        return this.options.monitor ? "monitor" : (0, utils_1.isResp2SubscriberMode)(this.condition) ? "subscriber" : "normal";
      }
      /**
       * Listen for all requests received by the server in real time.
       *
       * This command will create a new connection to Redis and send a
       * MONITOR command via the new connection in order to avoid disturbing
       * the current connection.
       *
       * @param callback The callback function. If omit, a promise will be returned.
       * @example
       * ```js
       * var redis = new Redis();
       * redis.monitor(function (err, monitor) {
       *   // Entering monitoring mode.
       *   monitor.on('monitor', function (time, args, source, database) {
       *     console.log(time + ": " + util.inspect(args));
       *   });
       * });
       *
       * // supports promise as well as other commands
       * redis.monitor().then(function (monitor) {
       *   monitor.on('monitor', function (time, args, source, database) {
       *     console.log(time + ": " + util.inspect(args));
       *   });
       * });
       * ```
       */
      monitor(callback) {
        const monitorInstance = this.duplicate({
          monitor: true,
          lazyConnect: false,
          himportFieldsets: void 0
        });
        return (0, standard_as_callback_1.default)(new Promise(function(resolve, reject) {
          monitorInstance.once("error", reject);
          monitorInstance.once("monitoring", function() {
            resolve(monitorInstance);
          });
        }), callback);
      }
      /**
       * Send a command to Redis
       *
       * This method is used internally and in most cases you should not
       * use it directly. If you need to send a command that is not supported
       * by the library, you can use the `call` method:
       *
       * ```js
       * const redis = new Redis();
       *
       * redis.call('set', 'foo', 'bar');
       * // or
       * redis.call(['set', 'foo', 'bar']);
       * ```
       *
       * @ignore
       */
      sendCommand(command, stream) {
        command.setReplyContext(this.condition ?? this.options);
        if (this.status === "wait") {
          this.connect().catch(lodash_1.noop);
        }
        if (this.status === "end") {
          command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
          return command.promise;
        }
        if ((0, utils_1.isResp2SubscriberMode)(this.condition) && !Command_1.default.checkFlag("VALID_IN_SUBSCRIBER_MODE", command.name)) {
          command.reject(new Error("Connection in subscriber mode, only subscriber commands may be used"));
          return command.promise;
        }
        if (typeof this.options.commandTimeout === "number") {
          command.setTimeout(this.options.commandTimeout);
        }
        if (!stream && this[HimportCoordinator_1.hasHimportCoordinator] && (0, HimportCoordinator_1.interceptHimportCommand)(this, command, this.status === "ready", () => {
          this.sendCommand(command);
        })) {
          return command.promise;
        }
        const blockingTimeout = this.getBlockingTimeoutInMs(command);
        let writable = this.status === "ready" || // During handshake, only internal handshake commands may bypass the queue.
        !stream && this.status === "connect" && this.condition?.handshake && (Command_1.default.checkFlag("HANDSHAKE_COMMANDS", command.name) || (0, HimportCoordinator_1.isInternalHimportCommand)(command)) || // Before ready, loading-safe commands remain writable after handshake.
        !stream && this.status === "connect" && !this.condition?.handshake && (0, commands_1.exists)(command.name, { caseInsensitive: true }) && (0, commands_1.hasFlag)(command.name, "loading", { nameCaseInsensitive: true });
        if (!this.stream) {
          writable = false;
        } else if (!this.stream.writable) {
          writable = false;
        } else if (this.stream._writableState && this.stream._writableState.ended) {
          writable = false;
        }
        if (!writable) {
          if (!this.options.enableOfflineQueue) {
            command.reject(new Error("Stream isn't writeable and enableOfflineQueue options is false"));
            return command.promise;
          }
          if (command.name === "quit" && this.offlineQueue.length === 0) {
            this.disconnect();
            command.resolve(Buffer.from("OK"));
            return command.promise;
          }
          if (debug.enabled) {
            debug("queue command[%s]: %d -> %s(%o)", this._getDescription(), this.condition.select, command.name, command.args);
          }
          this.offlineQueue.push({
            command,
            stream,
            select: this.condition.select
          });
          if (Command_1.default.checkFlag("BLOCKING_COMMANDS", command.name)) {
            const offlineTimeout = this.getConfiguredBlockingTimeout();
            if (offlineTimeout !== void 0) {
              command.setBlockingTimeout(offlineTimeout);
            }
          }
        } else {
          if (debug.enabled) {
            debug("write command[%s]: %d -> %s(%o)", this._getDescription(), this.condition?.select, command.name, command.args);
          }
          if (stream) {
            if ("isPipeline" in stream && stream.isPipeline) {
              stream.write(command.toWritable(stream.destination.redis.stream));
            } else {
              stream.write(command.toWritable(stream));
            }
          } else {
            this.stream.write(command.toWritable(this.stream));
          }
          this.commandQueue.push({
            command,
            stream,
            select: this.condition.select
          });
          if (blockingTimeout !== void 0) {
            command.setBlockingTimeout(blockingTimeout);
          }
          if (Command_1.default.checkFlag("WILL_DISCONNECT", command.name)) {
            this.manuallyClosing = true;
          }
          if (this.options.socketTimeout !== void 0 && this.socketTimeoutTimer === void 0) {
            this.setSocketTimeout();
          }
        }
        if (command.name === "select" && (0, utils_1.isInt)(command.args[0])) {
          const db = parseInt(command.args[0], 10);
          if (this.condition.select !== db) {
            this.condition.select = db;
            this.emit("select", db);
            debug("switch to db [%d]", this.condition.select);
          }
        }
        if (!writable || command.isTraced) {
          return command.promise;
        }
        command.isTraced = true;
        return (0, tracing_1.traceCommand)(() => command.promise, () => this._buildCommandContext(command));
      }
      getBlockingTimeoutInMs(command) {
        if (!Command_1.default.checkFlag("BLOCKING_COMMANDS", command.name)) {
          return void 0;
        }
        const configuredTimeout = this.getConfiguredBlockingTimeout();
        if (configuredTimeout === void 0) {
          return void 0;
        }
        const timeout = command.extractBlockingTimeout();
        if (typeof timeout === "number") {
          if (timeout > 0) {
            return timeout + (this.options.blockingTimeoutGrace ?? RedisOptions_1.DEFAULT_REDIS_OPTIONS.blockingTimeoutGrace);
          }
          return configuredTimeout;
        }
        if (timeout === null) {
          return configuredTimeout;
        }
        return void 0;
      }
      getConfiguredBlockingTimeout() {
        if (typeof this.options.blockingTimeout === "number" && this.options.blockingTimeout > 0) {
          return this.options.blockingTimeout;
        }
        return void 0;
      }
      setSocketTimeout() {
        const stream = this.stream;
        this.socketTimeoutTimer = setTimeout(() => {
          stream.destroy(new Error(`Socket timeout. Expecting data, but didn't receive any in ${this.options.socketTimeout}ms.`));
          this.socketTimeoutTimer = void 0;
        }, this.options.socketTimeout);
        stream.once("data", () => {
          clearTimeout(this.socketTimeoutTimer);
          this.socketTimeoutTimer = void 0;
          if (this.commandQueue.length === 0)
            return;
          this.setSocketTimeout();
        });
      }
      scanStream(options) {
        return this.createScanStream("scan", { options });
      }
      scanBufferStream(options) {
        return this.createScanStream("scanBuffer", { options });
      }
      sscanStream(key, options) {
        return this.createScanStream("sscan", { key, options });
      }
      sscanBufferStream(key, options) {
        return this.createScanStream("sscanBuffer", { key, options });
      }
      hscanStream(key, options) {
        return this.createScanStream("hscan", { key, options });
      }
      hscanBufferStream(key, options) {
        return this.createScanStream("hscanBuffer", { key, options });
      }
      zscanStream(key, options) {
        return this.createScanStream("zscan", { key, options });
      }
      zscanBufferStream(key, options) {
        return this.createScanStream("zscanBuffer", { key, options });
      }
      /**
       * Emit only when there's at least one listener.
       *
       * @ignore
       */
      silentEmit(eventName, arg) {
        let error;
        if (eventName === "error") {
          error = arg;
          if (this.status === "end") {
            return;
          }
          if (this.manuallyClosing) {
            if (error instanceof Error && (error.message === utils_1.CONNECTION_CLOSED_ERROR_MSG || // @ts-expect-error
            error.syscall === "connect" || // @ts-expect-error
            error.syscall === "read")) {
              return;
            }
          }
        }
        if (this.listeners(eventName).length > 0) {
          return this.emit.apply(this, arguments);
        }
        if (error && error instanceof Error) {
          console.error("[ioredis] Unhandled error event:", error.stack);
        }
        return false;
      }
      /**
       * @ignore
       */
      recoverFromFatalError(_commandError, err, options) {
        this.flushQueue(err, options);
        this.silentEmit("error", err);
        this.disconnect(true);
      }
      /**
       * @ignore
       */
      handleReconnection(err, item) {
        let needReconnect = false;
        const ignoreReconnectOnError = Command_1.default.checkFlag("IGNORE_RECONNECT_ON_ERROR", item.command.name) || this.condition?.handshake && Command_1.default.checkFlag("HANDSHAKE_COMMANDS", item.command.name);
        if (this.options.reconnectOnError && !ignoreReconnectOnError) {
          needReconnect = this.options.reconnectOnError(err);
        }
        switch (needReconnect) {
          case 1:
          case true:
            if (this.status !== "reconnecting") {
              this.disconnect(true);
            }
            item.command.reject(err);
            break;
          case 2:
            if (this.status !== "reconnecting") {
              this.disconnect(true);
            }
            if (this.condition?.select !== item.select && item.command.name !== "select") {
              this.select(item.select);
            }
            this.sendCommand(item.command);
            break;
          default:
            item.command.reject(err);
        }
      }
      /**
       * @ignore
       */
      _getServerAddress() {
        if ("path" in this.options && this.options.path) {
          return { address: this.options.path, port: void 0 };
        }
        return {
          address: "host" in this.options && this.options.host || "localhost",
          port: "port" in this.options && this.options.port || 6379
        };
      }
      _buildCommandContext(command) {
        const { address, port } = this._getServerAddress();
        return {
          command: command.name,
          args: (0, tracing_1.sanitizeArgs)(command.name, command.args),
          database: this.condition?.select ?? this.options.db ?? 0,
          serverAddress: address,
          serverPort: port
        };
      }
      _buildBatchContext(batchSize) {
        const { address, port } = this._getServerAddress();
        return {
          batchMode: "MULTI",
          batchSize,
          database: this.condition?.select ?? this.options.db ?? 0,
          serverAddress: address,
          serverPort: port
        };
      }
      /**
       * Get description of the connection. Used for debugging.
       */
      _getDescription() {
        let description;
        if ("path" in this.options && this.options.path) {
          description = this.options.path;
        } else if (this.stream && this.stream.remoteAddress && this.stream.remotePort) {
          description = this.stream.remoteAddress + ":" + this.stream.remotePort;
        } else if ("host" in this.options && this.options.host) {
          description = this.options.host + ":" + this.options.port;
        } else {
          description = "";
        }
        if (this.options.connectionName) {
          description += ` (${this.options.connectionName})`;
        }
        return description;
      }
      resetCommandQueue() {
        this.commandQueue = new Deque();
      }
      resetOfflineQueue() {
        this.offlineQueue = new Deque();
      }
      parseOptions(...args) {
        const options = {};
        let isTls = false;
        for (let i2 = 0; i2 < args.length; ++i2) {
          const arg = args[i2];
          if (arg === null || typeof arg === "undefined") {
            continue;
          }
          if (typeof arg === "object") {
            (0, lodash_1.defaults)(options, arg);
          } else if (typeof arg === "string") {
            (0, lodash_1.defaults)(options, (0, utils_1.parseURL)(arg));
            if (arg.startsWith("rediss://")) {
              isTls = true;
            }
          } else if (typeof arg === "number") {
            options.port = arg;
          } else {
            throw new Error("Invalid argument " + arg);
          }
        }
        if (isTls) {
          (0, lodash_1.defaults)(options, { tls: true });
        }
        (0, lodash_1.defaults)(options, _Redis.defaultOptions);
        if (typeof options.port === "string") {
          options.port = parseInt(options.port, 10);
        }
        if (typeof options.db === "string") {
          options.db = parseInt(options.db, 10);
        }
        if (options.replyMapping === "resp3" && options.protocol !== 3) {
          throw new Error('The "resp3" replyMapping is only supported with protocol 3');
        }
        this.options = (0, utils_1.resolveTLSProfile)(options);
      }
      /**
       * Change instance's status
       */
      setStatus(status, arg) {
        if (debug.enabled) {
          debug("status[%s]: %s -> %s", this._getDescription(), this.status || "[empty]", status);
        }
        this.status = status;
        process.nextTick(this.emit.bind(this, status, arg));
      }
      createScanStream(command, { key, options = {} }) {
        return new ScanStream_1.default({
          objectMode: true,
          key,
          redis: this,
          command,
          ...options
        });
      }
      /**
       * Flush offline queue and command queue with error.
       *
       * @param error The error object to send to the commands
       * @param options options
       */
      flushQueue(error, options) {
        options = (0, lodash_1.defaults)({}, options, {
          offlineQueue: true,
          commandQueue: true
        });
        let item;
        if (options.offlineQueue) {
          while (item = this.offlineQueue.shift()) {
            item.command.reject(error);
          }
        }
        if (options.commandQueue) {
          if (this.commandQueue.length > 0) {
            if (this.stream) {
              this.stream.removeAllListeners("data");
            }
            while (item = this.commandQueue.shift()) {
              item.command.reject(error);
            }
          }
        }
      }
      /**
       * Check whether Redis has finished loading the persistent data and is able to
       * process commands.
       */
      _readyCheck(callback) {
        const _this = this;
        this.info(function(err, res) {
          if (err) {
            if (err.message && err.message.includes("NOPERM")) {
              console.warn(`Skipping the ready check because INFO command fails: "${err.message}". You can disable ready check with "enableReadyCheck". More: https://github.com/luin/ioredis/wiki/Disable-ready-check.`);
              return callback(null, {});
            }
            return callback(err);
          }
          if (typeof res !== "string") {
            return callback(null, res);
          }
          const info = {};
          const lines = res.split("\r\n");
          for (let i2 = 0; i2 < lines.length; ++i2) {
            const [fieldName, ...fieldValueParts] = lines[i2].split(":");
            const fieldValue = fieldValueParts.join(":");
            if (fieldValue) {
              info[fieldName] = fieldValue;
            }
          }
          if (!info.loading || info.loading === "0") {
            callback(null, info);
          } else {
            const loadingEtaMs = (info.loading_eta_seconds || 1) * 1e3;
            const retryTime = _this.options.maxLoadingRetryTime && _this.options.maxLoadingRetryTime < loadingEtaMs ? _this.options.maxLoadingRetryTime : loadingEtaMs;
            debug("Redis server still loading, trying again in " + retryTime + "ms");
            setTimeout(function() {
              _this._readyCheck(callback);
            }, retryTime);
          }
        }).catch(lodash_1.noop);
      }
    };
    _a = HimportCoordinator_1.hasHimportCoordinator;
    Redis.Cluster = cluster_1.default;
    Redis.Command = Command_1.default;
    Redis.defaultOptions = RedisOptions_1.DEFAULT_REDIS_OPTIONS;
    (0, applyMixin_1.default)(Redis, events_1.EventEmitter);
    (0, transaction_1.addTransactionSupport)(Redis.prototype);
    exports.default = Redis;
  }
});

// ../../node_modules/ioredis/built/index.js
var require_built3 = __commonJS({
  "../../node_modules/ioredis/built/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.print = exports.ReplyError = exports.SentinelIterator = exports.SentinelConnector = exports.AbstractConnector = exports.Pipeline = exports.ScanStream = exports.Command = exports.Cluster = exports.Redis = exports.default = void 0;
    exports = module.exports = require_Redis().default;
    var Redis_1 = require_Redis();
    Object.defineProperty(exports, "default", { enumerable: true, get: function() {
      return Redis_1.default;
    } });
    var Redis_2 = require_Redis();
    Object.defineProperty(exports, "Redis", { enumerable: true, get: function() {
      return Redis_2.default;
    } });
    var cluster_1 = require_cluster();
    Object.defineProperty(exports, "Cluster", { enumerable: true, get: function() {
      return cluster_1.default;
    } });
    var Command_1 = require_Command();
    Object.defineProperty(exports, "Command", { enumerable: true, get: function() {
      return Command_1.default;
    } });
    var ScanStream_1 = require_ScanStream();
    Object.defineProperty(exports, "ScanStream", { enumerable: true, get: function() {
      return ScanStream_1.default;
    } });
    var Pipeline_1 = require_Pipeline();
    Object.defineProperty(exports, "Pipeline", { enumerable: true, get: function() {
      return Pipeline_1.default;
    } });
    var AbstractConnector_1 = require_AbstractConnector();
    Object.defineProperty(exports, "AbstractConnector", { enumerable: true, get: function() {
      return AbstractConnector_1.default;
    } });
    var SentinelConnector_1 = require_SentinelConnector();
    Object.defineProperty(exports, "SentinelConnector", { enumerable: true, get: function() {
      return SentinelConnector_1.default;
    } });
    Object.defineProperty(exports, "SentinelIterator", { enumerable: true, get: function() {
      return SentinelConnector_1.SentinelIterator;
    } });
    exports.ReplyError = require_redis_errors().ReplyError;
    Object.defineProperty(exports, "Promise", {
      get() {
        console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.");
        return Promise;
      },
      set(_lib) {
        console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.");
      }
    });
    function print(err, reply) {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log("Reply: " + reply);
      }
    }
    exports.print = print;
  }
});

// ../../node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "../../node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i2 = 0, l3 = handlers.length, ee = new Array(l3); i2 < l3; i2++) {
        ee[i2] = handlers[i2].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a12, a22, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i2;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a12), true;
          case 3:
            return listeners.fn.call(listeners.context, a12, a22), true;
          case 4:
            return listeners.fn.call(listeners.context, a12, a22, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a12, a22, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a12, a22, a3, a4, a5), true;
        }
        for (i2 = 1, args = new Array(len - 1); i2 < len; i2++) {
          args[i2 - 1] = arguments[i2];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j2;
        for (i2 = 0; i2 < length; i2++) {
          if (listeners[i2].once) this.removeListener(event, listeners[i2].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i2].fn.call(listeners[i2].context);
              break;
            case 2:
              listeners[i2].fn.call(listeners[i2].context, a12);
              break;
            case 3:
              listeners[i2].fn.call(listeners[i2].context, a12, a22);
              break;
            case 4:
              listeners[i2].fn.call(listeners[i2].context, a12, a22, a3);
              break;
            default:
              if (!args) for (j2 = 1, args = new Array(len - 1); j2 < len; j2++) {
                args[j2 - 1] = arguments[j2];
              }
              listeners[i2].fn.apply(listeners[i2].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i2 = 0, events = [], length = listeners.length; i2 < length; i2++) {
          if (listeners[i2].fn !== fn || once && !listeners[i2].once || context && listeners[i2].context !== context) {
            events.push(listeners[i2]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// ../../node_modules/dotenv/dist/index.cjs
var require_dist = __commonJS({
  "../../node_modules/dotenv/dist/index.cjs"(exports, module) {
    var j2 = (e2, n2) => () => {
      try {
        return n2 || e2((n2 = { exports: {} }).exports, n2), n2.exports;
      } catch (t2) {
        throw n2 = 0, t2;
      }
    };
    var k2 = j2((xe, U2) => {
      function G(e2) {
        return typeof e2 == "string" ? !["false", "0", "no", "off", ""].includes(e2.toLowerCase()) : !!e2;
      }
      function Y(e2 = process.env) {
        let n2 = {};
        for (let t2 of ["ENCODING", "PATH", "QUIET", "DEBUG", "OVERRIDE", "FAST"]) {
          let o2 = e2[`DOTENV_${t2}`] != null ? e2[`DOTENV_${t2}`] : e2[`DOTENV_CONFIG_${t2}`];
          o2 != null && (n2[t2.toLowerCase()] = t2 === "ENCODING" || t2 === "PATH" ? o2 : G(o2));
        }
        return n2;
      }
      U2.exports = { parseBoolean: G, optionsFromEnv: Y };
    });
    var N2 = j2((ye, x4) => {
      var z2 = __require("fs"), I = __require("path"), Z2 = __require("os"), { URL: ee, fileURLToPath: te } = __require("url"), { parseBoolean: $3, optionsFromEnv: B3 } = k2(), re = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg, b3 = new Uint8Array(256);
      for (let e2 = 48; e2 <= 57; e2++) b3[e2] = 1;
      for (let e2 = 65; e2 <= 90; e2++) b3[e2] = 1;
      for (let e2 = 97; e2 <= 122; e2++) b3[e2] = 1;
      b3[45] = 1;
      b3[46] = 1;
      b3[95] = 1;
      function ne(e2) {
        let n2 = {}, t2 = e2.toString();
        t2 = t2.replace(/\r\n?/mg, `
`);
        let o2;
        for (; (o2 = re.exec(t2)) != null; ) {
          let r2 = o2[1], s3 = o2[2] || "";
          s3 = s3.trim();
          let i2 = s3[0];
          s3 = s3.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), i2 === '"' && (s3 = s3.replace(/\\n/g, `
`), s3 = s3.replace(/\\r/g, "\r")), n2[r2] = s3;
        }
        return n2;
      }
      function w2(e2) {
        return e2 <= 32 ? e2 === 32 || e2 >= 9 && e2 <= 13 : e2 >= 160 && (e2 === 160 || e2 === 5760 || e2 >= 8192 && e2 <= 8202 || e2 === 8232 || e2 === 8233 || e2 === 8239 || e2 === 8287 || e2 === 12288 || e2 === 65279);
      }
      function q3(e2) {
        return e2 === 10 || e2 === 8232 || e2 === 8233;
      }
      function oe(e2) {
        let n2 = {}, t2 = typeof e2 == "string" ? e2 : e2.toString();
        t2.indexOf("\r") !== -1 && (t2 = t2.replace(/\r\n?/g, `
`));
        let o2 = t2.length, r2 = 0;
        for (; r2 < o2; ) {
          let s3 = t2.charCodeAt(r2);
          for (; r2 < o2 && w2(s3); ) r2++, s3 = t2.charCodeAt(r2);
          if (r2 >= o2) break;
          if (s3 === 35) {
            for (; r2 < o2 && !q3(t2.charCodeAt(r2)); ) r2++;
            continue;
          }
          let i2 = -1;
          if (s3 === 101 && r2 + 6 < o2 && t2.charCodeAt(r2 + 1) === 120 && t2.charCodeAt(r2 + 2) === 112 && t2.charCodeAt(r2 + 3) === 111 && t2.charCodeAt(r2 + 4) === 114 && t2.charCodeAt(r2 + 5) === 116) {
            let v3 = t2.charCodeAt(r2 + 6);
            if (w2(v3)) {
              let u3 = r2 + 7;
              for (; u3 < o2 && w2(t2.charCodeAt(u3)); ) u3++;
              b3[t2.charCodeAt(u3)] && (i2 = r2 + 6, r2 = u3);
            } else s3 = t2.charCodeAt(r2);
          }
          let l3 = r2, d4 = 0;
          for (; r2 < o2 && (d4 = t2.charCodeAt(r2), b3[d4]); ) r2++;
          if (r2 === l3) {
            for (; r2 < o2 && !q3(t2.charCodeAt(r2)); ) r2++;
            continue;
          }
          let h4 = t2.slice(l3, r2), f3 = r2;
          if (r2 >= o2 && (d4 = 0), w2(d4)) do
            r2++, d4 = r2 < o2 ? t2.charCodeAt(r2) : 0;
          while (w2(d4));
          if (d4 === 61) r2++;
          else if (d4 === 58 && r2 === f3 && r2 + 1 < o2 && w2(t2.charCodeAt(r2 + 1))) r2 += 2;
          else {
            for (r2 = i2 === -1 ? f3 : i2; r2 < o2 && !q3(t2.charCodeAt(r2)); ) r2++;
            continue;
          }
          let c3 = r2, a3 = r2;
          for (; a3 < o2 && w2(t2.charCodeAt(a3)); ) a3++;
          let g2 = t2.charCodeAt(a3), p3, y3 = false;
          if (g2 === 39 || g2 === 34 || g2 === 96) {
            let v3 = t2[a3], u3 = t2.indexOf(v3, a3 + 1), m3 = -1, C2 = -1;
            for (; u3 !== -1; ) {
              let O2 = t2.charCodeAt(u3 - 1) === 92, E2 = u3 + 1;
              for (; E2 < o2 && !q3(t2.charCodeAt(E2)) && w2(t2.charCodeAt(E2)); ) E2++;
              if ((E2 === o2 || q3(t2.charCodeAt(E2)) || t2.charCodeAt(E2) === 35) && (m3 = u3, C2 = E2), !O2) break;
              u3 = t2.indexOf(v3, u3 + 1);
            }
            if (m3 !== -1) {
              if (p3 = t2.slice(a3 + 1, m3), r2 = C2, t2.charCodeAt(r2) === 35) for (; r2 < o2 && !q3(t2.charCodeAt(r2)); ) r2++;
              y3 = true;
            }
          }
          if (!y3) {
            let v3 = t2.indexOf(`
`, c3);
            v3 === -1 && (v3 = o2);
            let u3;
            if (o2 < 4096) u3 = t2.indexOf("#", c3), (u3 === -1 || u3 > v3) && (u3 = v3);
            else for (u3 = c3; u3 < v3 && t2.charCodeAt(u3) !== 35; ) u3++;
            let m3 = c3, C2 = u3;
            for (; m3 < C2 && w2(t2.charCodeAt(m3)); ) m3++;
            for (; C2 > m3 && w2(t2.charCodeAt(C2 - 1)); ) C2--;
            let O2 = t2.charCodeAt(m3);
            if (p3 = t2.slice(m3, C2), p3.includes("\u2028") || p3.includes("\u2029") ? p3 = p3.replace(/^(['"`])([\s\S]*)\1$/mg, "$2") : C2 - m3 >= 2 && (O2 === 39 || O2 === 34 || O2 === 96) && t2.charCodeAt(C2 - 1) === O2 && (p3 = t2.slice(m3 + 1, C2 - 1)), r2 = u3, u3 < v3) for (; r2 < o2 && !q3(t2.charCodeAt(r2)); ) r2++;
          }
          g2 === 34 && (y3 || a3 < r2) && p3.indexOf("\\") !== -1 && (p3 = p3.replace(/\\n/g, `
`).replace(/\\r/g, "\r")), n2[h4] = p3;
        }
        return n2;
      }
      function se(e2, n2) {
        return n2 && $3(n2.fast) ? oe(e2) : ne(e2);
      }
      function T2(e2) {
        console.log(`\u2506 ${e2}`);
      }
      function ie(e2) {
        console.error(`\u25C7 ${e2}`);
      }
      function V(e2) {
        return e2[0] === "~" ? I.join(Z2.homedir(), e2.slice(1)) : e2;
      }
      function ce(e2 = {}) {
        let n2 = { ...e2 };
        for (let t2 of Object.keys(n2)) n2[t2] === void 0 && delete n2[t2];
        return { ...B3(), ...n2 };
      }
      function ae(e2) {
        e2 = ce(e2);
        let n2 = I.resolve(process.cwd(), ".env"), t2 = "utf8", o2 = process.env;
        e2 && e2.processEnv != null && (o2 = e2.processEnv);
        let r2 = $3(e2 && e2.debug);
        e2 && e2.encoding ? t2 = e2.encoding : r2 && T2("no encoding is specified (UTF-8 is used by default)");
        let s3 = [n2];
        if (e2 && e2.path) if (!Array.isArray(e2.path)) s3 = [V(e2.path)];
        else {
          s3 = [];
          for (let c3 of e2.path) s3.push(V(c3));
        }
        let i2, l3 = {}, d4 = { fast: e2.fast };
        for (let c3 of s3) try {
          let a3 = A2.parse(z2.readFileSync(c3, { encoding: t2 }), d4);
          A2.populate(l3, a3, e2);
        } catch (a3) {
          r2 && T2(`failed to load ${c3} ${a3.message}`), i2 = a3;
        }
        let h4 = A2.populate(o2, l3, e2), f3 = $3(Object.prototype.hasOwnProperty.call(e2, "quiet") ? e2.quiet : B3(o2).quiet);
        if (r2 || !f3) {
          let c3 = Object.keys(h4).length, a3 = [];
          for (let g2 of s3) try {
            let p3 = I.relative(process.cwd(), g2 instanceof ee ? te(g2) : g2);
            a3.push(p3);
          } catch (p3) {
            r2 && T2(`failed to load ${g2} ${p3.message}`), i2 = p3;
          }
          ie(`injected env (${c3}) from ${a3.join(",")}`);
        }
        return i2 ? { parsed: l3, error: i2 } : { parsed: l3 };
      }
      function le(e2) {
        return A2.configDotenv(e2);
      }
      function fe(e2, n2, t2 = {}) {
        let o2 = $3(t2 && t2.debug), r2 = $3(t2 && t2.override), s3 = {};
        if (e2 === null || typeof e2 != "object" || n2 === null || typeof n2 != "object") {
          let i2 = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
          throw i2.code = "OBJECT_REQUIRED", i2;
        }
        for (let i2 of Object.keys(n2)) Object.prototype.hasOwnProperty.call(e2, i2) ? (r2 === true && (e2[i2] = n2[i2], s3[i2] = n2[i2]), o2 && T2(r2 === true ? `"${i2}" is already defined and WAS overwritten` : `"${i2}" is already defined and was NOT overwritten`)) : (e2[i2] = n2[i2], s3[i2] = n2[i2]);
        return s3;
      }
      var A2 = { configDotenv: ae, config: le, parse: se, populate: fe };
      x4.exports.configDotenv = A2.configDotenv;
      x4.exports.config = A2.config;
      x4.exports.parse = A2.parse;
      x4.exports.populate = A2.populate;
      x4.exports = A2;
    });
    var M2 = j2((Te, W) => {
      var _2 = __require("child_process"), ue = __require("fs"), L2 = __require("path");
      function de(e2) {
        let n2 = ['"'], t2 = 0;
        for (let o2 of e2) {
          if (o2 === "\\") {
            t2++;
            continue;
          }
          o2 === '"' ? n2.push("\\".repeat(t2 * 2 + 1), '"') : n2.push("\\".repeat(t2), o2), t2 = 0;
        }
        return n2.push("\\".repeat(t2 * 2), '"'), n2.join("");
      }
      function H2(e2, n2 = 1) {
        for (let t2 = 0; t2 < n2; t2++) {
          let o2 = [];
          for (let r2 of e2) {
            let s3 = r2.charCodeAt(0), i2 = s3 >= 48 && s3 <= 57 || s3 >= 65 && s3 <= 90 || s3 >= 97 && s3 <= 122, l3 = "\\/:._-".includes(r2);
            !i2 && !l3 && s3 < 128 && o2.push("^"), o2.push(r2);
          }
          e2 = o2.join("");
        }
        return e2;
      }
      function P3(e2, n2) {
        let t2 = Object.keys(e2).reverse().find((o2) => o2.toUpperCase() === n2);
        return t2 === void 0 ? void 0 : e2[t2];
      }
      function pe(e2, n2, t2) {
        let o2 = (P3(n2, "PATHEXT") || ".COM;.EXE;.BAT;.CMD").split(";").filter(Boolean), s3 = o2.some((l3) => e2.toLowerCase().endsWith(l3.toLowerCase())) ? ["", ...o2] : [...o2, ""], i2 = /[\\/]/.test(e2) ? [t2] : [t2, ...(P3(n2, "PATH") || "").split(";")];
        for (let l3 of i2) for (let d4 of s3) {
          let h4 = L2.resolve(t2, l3.replace(/^"|"$/g, ""), e2 + d4);
          try {
            if (ue.statSync(h4).isFile()) return h4;
          } catch {
          }
        }
      }
      function he(e2, n2, t2) {
        if (process.platform !== "win32") return _2.spawn(e2, n2, t2);
        let o2 = t2.env || process.env, r2 = pe(e2, o2, t2.cwd || process.cwd());
        if (r2 && /\.(?:exe|com)$/i.test(r2)) return _2.spawn(r2, n2, t2);
        let s3 = /\.(?:bat|cmd)$/i.test(r2 || e2), i2 = [H2(L2.normalize(r2 || e2))];
        for (let d4 of n2) i2.push(H2(de(d4), s3 ? 2 : 1));
        let l3 = i2.join(" ");
        return _2.spawn(P3(o2, "COMSPEC") || "cmd.exe", ["/d", "/v:off", "/s", "/c", `"${l3}"`], { ...t2, windowsVerbatimArguments: true });
      }
      W.exports = he;
    });
    var X = j2(($e, F3) => {
      var ge = __require("fs"), me = __require("os"), Q2 = __require("path"), ve = __require("child_process"), Ce = M2(), R4 = N2(), { optionsFromEnv: J2 } = k2();
      function D() {
        console.log(["Usage: dotenv run [--help] [-q|--quiet] [--debug] [--override] [--fast] [-f|--file <paths>] [--] <command> [args...]", "", "Run a command with environment variables from a .env file.", "Place dotenv options before the command; all following arguments go to the command.", "", "Options:", "  -f, --file <paths>  .env paths, comma-separated or repeated (default: .env)", "  -q, --quiet suppress the injected env message", "  --debug     enable debug logging", "  --override  override existing environment variables", "  --fast      use the faster character-scanner parser", "", "Environment variables (DOTENV_CONFIG_* names remain as fallbacks):", "  DOTENV_PATH, DOTENV_ENCODING, DOTENV_QUIET,", "  DOTENV_DEBUG, DOTENV_OVERRIDE,", "  DOTENV_FAST"].join(`
`));
      }
      function we(e2) {
        let n2 = [], t2 = false, o2, r2, s3, i2, l3 = -1;
        for (let h4 = 0; h4 < e2.length; h4++) {
          let f3 = e2[h4];
          if (f3 === "--") {
            l3 = h4 + 1;
            break;
          }
          if (f3 === "--help" || f3 === "-h") return { help: true };
          if (f3 === "--quiet" || f3 === "-q") {
            o2 = true;
            continue;
          }
          if (f3 === "--debug") {
            r2 = true;
            continue;
          }
          if (f3 === "--override") {
            s3 = true;
            continue;
          }
          if (f3 === "--fast") {
            i2 = true;
            continue;
          }
          if (f3 === "-f" || f3 === "--file" || f3.startsWith("-f=") || f3.startsWith("--file=")) {
            let c3 = f3.indexOf("="), a3 = c3 === -1 ? f3 : f3.slice(0, c3), g2 = c3 === -1 ? e2[++h4] : f3.slice(c3 + 1);
            if (!g2 || g2 === "--") return { error: `${a3} requires a path` };
            let p3 = g2.split(",").map((y3) => y3.trim()).filter(Boolean);
            if (p3.length === 0) return { error: `${a3} requires a path` };
            n2.push(...p3), t2 = true;
            continue;
          }
          if (f3.startsWith("-")) return { error: `unknown option: ${f3}` };
          l3 = h4;
          break;
        }
        let d4 = l3 === -1 ? [] : e2.slice(l3);
        return { paths: n2, pathSet: t2, quiet: o2, debug: r2, override: s3, fast: i2, command: d4 };
      }
      function Ae(e2) {
        return e2[0] === "~" ? Q2.join(me.homedir(), e2.slice(1)) : e2;
      }
      function Ee(e2) {
        let n2 = J2(), t2 = { encoding: n2.encoding || "utf8", quiet: n2.quiet, debug: n2.debug === true, override: n2.override === true, fast: n2.fast === true, paths: [".env"], defaultPath: true };
        return n2.path && (t2.paths = [n2.path], t2.defaultPath = false), e2.pathSet && (t2.paths = e2.paths, t2.defaultPath = false), e2.quiet != null && (t2.quiet = e2.quiet), e2.debug != null && (t2.debug = e2.debug), e2.override != null && (t2.override = e2.override), e2.fast != null && (t2.fast = e2.fast), t2;
      }
      function be(e2) {
        let n2 = {}, t2 = [], o2 = { override: e2.override, debug: e2.debug };
        for (let s3 of e2.paths) {
          let i2 = Q2.resolve(process.cwd(), Ae(s3));
          try {
            let l3 = R4.parse(ge.readFileSync(i2, { encoding: e2.encoding }), { fast: e2.fast });
            R4.populate(n2, l3, o2), t2.push(s3);
          } catch (l3) {
            if (e2.debug && console.log(`\u2506 failed to load ${s3} ${l3.message}`), !(e2.defaultPath && l3.code === "ENOENT")) throw l3;
          }
        }
        return { injected: R4.populate(process.env, n2, o2), loadedPaths: t2 };
      }
      function K2(e2) {
        let n2 = e2[0];
        if (n2 === "--help" || n2 === "-h") {
          D();
          return;
        }
        if (n2 !== "run") {
          D(), process.exitCode = 1;
          return;
        }
        let t2 = we(e2.slice(1));
        if (t2.help) {
          D();
          return;
        }
        if (t2.error) {
          console.error(`dotenv: ${t2.error}`), D(), process.exitCode = 1;
          return;
        }
        if (t2.command.length === 0) {
          D(), process.exitCode = 1;
          return;
        }
        let o2 = Ee(t2);
        try {
          let c3 = be(o2);
          if (!(o2.quiet == null ? J2().quiet : o2.quiet)) {
            let g2 = `\u25C7 injected env (${Object.keys(c3.injected).length})`;
            c3.loadedPaths.length > 0 && (g2 += ` from ${c3.loadedPaths.join(", ")}`), console.error(g2);
          }
        } catch (c3) {
          console.error(`dotenv: ${c3.message}`), process.exitCode = 1;
          return;
        }
        let r2 = !!process.stdin.isTTY, s3 = process.platform !== "win32" && !r2, i2 = Ce(t2.command[0], t2.command.slice(1), { stdio: "inherit", detached: s3 }), l3 = /* @__PURE__ */ new Map(), d4 = 0;
        function h4(c3) {
          if (!(!i2.pid || i2.exitCode !== null || i2.signalCode !== null)) {
            if (process.platform === "win32") {
              ve.spawnSync("taskkill", ["/pid", String(i2.pid), "/T", "/F"], { stdio: "ignore" });
              return;
            }
            try {
              process.kill(s3 ? -i2.pid : i2.pid, c3);
            } catch (a3) {
              if (a3.code !== "ESRCH") throw a3;
            }
          }
        }
        function f3() {
          for (let [c3, a3] of l3) process.removeListener(c3, a3);
        }
        for (let c3 of ["SIGINT", "SIGTERM", "SIGHUP", "SIGQUIT"]) {
          let a3 = () => {
            if (c3 === "SIGINT") {
              if (d4++, r2 && process.platform !== "win32" && d4 === 1) return;
              if (d4 > 1) {
                h4(d4 === 2 ? "SIGTERM" : "SIGKILL");
                return;
              }
            }
            h4(c3);
          };
          l3.set(c3, a3), process.on(c3, a3);
        }
        i2.on("error", function(c3) {
          f3(), console.error(`dotenv: ${c3.message}`), process.exitCode = 1;
        }), i2.on("exit", function(c3, a3) {
          f3(), typeof c3 == "number" ? process.exit(c3) : (setInterval(() => {
          }, 1e3), process.kill(process.pid, a3));
        });
      }
      F3.exports = K2;
      __require.main === F3 && K2(process.argv.slice(2));
    });
    var S2 = N2();
    var qe = X();
    module.exports = S2;
    module.exports.config = S2.config;
    module.exports.configDotenv = S2.configDotenv;
    module.exports.parse = S2.parse;
    module.exports.populate = S2.populate;
    __require.main === module && qe(process.argv.slice(2));
  }
});

// ../../node_modules/dotenv/dist/config.cjs
var require_config = __commonJS({
  "../../node_modules/dotenv/dist/config.cjs"() {
    var dotenv = require_dist();
    var quiet = process.env.DOTENV_QUIET != null ? process.env.DOTENV_QUIET : process.env.DOTENV_CONFIG_QUIET;
    dotenv.config({ quiet: quiet != null ? quiet : true });
  }
});

// ../../node_modules/@nightx.co/pulsar-client/dist/chunk-50ghkm06.js
var y = Object.create;
var { getPrototypeOf: v, defineProperty: c, getOwnPropertyNames: b } = Object;
var f = Object.prototype.hasOwnProperty;
function h(e2) {
  return this[e2];
}
var R;
var x;
var q = (e2, r2, i2) => {
  var o2 = e2 != null && typeof e2 === "object";
  if (o2) {
    var t2 = r2 ? R ??= /* @__PURE__ */ new WeakMap() : x ??= /* @__PURE__ */ new WeakMap(), n2 = t2.get(e2);
    if (n2) return n2;
  }
  i2 = e2 != null ? y(v(e2)) : {};
  let g2 = r2 || !e2 || !e2.__esModule ? c(i2, "default", { value: e2, enumerable: true }) : i2;
  for (let a3 of b(e2)) if (!f.call(g2, a3)) c(g2, a3, { get: h.bind(e2, a3), enumerable: true });
  if (o2) t2.set(e2, g2);
  return g2;
};
var $ = (e2, r2) => () => (r2 || e2((r2 = { exports: {} }).exports, r2), r2.exports);
var u = class {
};
var p = class extends u {
  driver;
  constructor(e2) {
    super();
    this.driver = e2;
    this.driver = e2;
  }
  get sql() {
    return this.driver.getNativeClient();
  }
  get prefix() {
    if (!this.driver.prefix) throw Error("[PostgresQueueRepository] Driver prefix is missing. Ensure the prefix is configured by calling driver.setPrefix(string).");
    return this.driver.prefix;
  }
  async deregisterWorker(e2, r2) {
    if (!e2) return;
    let i2 = `${this.prefix}:queues:${r2}:worker_registry`, o2 = `${this.prefix}:global_worker_registry`, t2 = `${i2}:${e2}`;
    await this.sql`
            DELETE FROM pulsar.queue_cache
            WHERE (key = ${i2} AND field = ${e2})
               OR (key = ${o2} AND field = ${t2})
        `;
  }
  async pauseQueue(e2, r2) {
  }
  async resumeQueue(e2, r2) {
  }
};
var l = class extends u {
  driver;
  protocol;
  constructor(e2) {
    super();
    this.driver = e2;
    this.protocol = e2.options.protocol, this.driver = e2;
  }
  get redis() {
    return this.driver.getNativeClient();
  }
  get prefix() {
    if (!this.driver.prefix) throw Error("[RedisQueueRepository] Driver prefix is missing. Ensure the prefix is configured by calling driver.setPrefix(string).");
    return this.driver.prefix;
  }
  async deregisterWorker(e2, r2) {
    if (!e2) return;
    let i2 = `${this.prefix}:queues:${r2}:worker_registry`, o2 = `${this.prefix}:global_worker_registry`, t2 = `${i2}:${e2}`, n2 = this.redis.pipeline();
    n2.hdel(i2, e2), n2.hdel(o2, t2), await n2.exec();
  }
  async pauseQueue(e2, r2) {
  }
  async resumeQueue(e2, r2) {
  }
  async evalScript(e2, r2, i2) {
    if (this.protocol === "http") return await this.redis.eval(e2, r2, i2);
    return await this.redis.eval(e2, r2.length, ...r2, ...i2);
  }
};
var m = class {
  log(e2, ...r2) {
    console.log(e2, ...r2);
  }
  warn(e2, ...r2) {
    console.warn(e2, ...r2);
  }
  error(e2, ...r2) {
    console.error(e2, ...r2);
  }
  debug(e2, ...r2) {
    console.debug(e2, ...r2);
  }
};
var s = class _s {
  static provider = new m();
  setProvider(e2) {
    _s.provider = e2;
  }
  log(e2, ...r2) {
    _s.provider.log(e2, ...r2);
  }
  warn(e2, ...r2) {
    _s.provider.warn(e2, ...r2);
  }
  error(e2, ...r2) {
    _s.provider.error(e2, ...r2);
  }
  debug(e2, ...r2) {
    if (_s.provider.debug) _s.provider.debug(e2, ...r2);
  }
};
var d = class {
  driver;
  logger;
  constructor(e2) {
    this.driver = e2;
    this.logger = new s();
  }
  get sql() {
    return this.driver.getNativeClient();
  }
  async ack(e2, r2) {
    if (Array.isArray(r2)) {
      let i2 = r2.map((t2) => t2.toString());
      return (await this.sql`
                SELECT pgmq.delete(
                ${e2}::text,
                ${i2}::bigint[]
                ) AS deleted
            `).length > 0;
    } else {
      let i2 = await this.sql`
                SELECT pgmq.delete(
                    ${e2}::text,
                    ${r2.toString()}::bigint
                ) AS deleted
            `;
      return Boolean(i2[0]?.deleted);
    }
  }
  async nack(e2, r2) {
  }
  async retry(e2, r2) {
    if (Array.isArray(r2)) {
      let i2 = r2.map((t2) => t2.toString());
      return (await this.sql`
                SELECT pgmq.set_vt(
                    ${e2},
                    id::bigint,
                    0
                ) AS set_vt
                FROM unnest(${i2}::bigint[]) AS id
            `).filter((t2) => Boolean(t2.set_vt)).length > 0;
    } else {
      let i2 = await this.sql`
                SELECT pgmq.set_vt(
                    ${e2},
                    ${r2.toString()},
                    0
                ) AS set_vt
            `;
      return Boolean(i2[0]?.set_vt);
    }
  }
};
var P = class {
  repository;
  cache;
  db;
  ops;
  logger;
  strategy;
  isConnected = false;
  constructor(e2) {
    if (this.logger = new s(), !e2.db) throw Error("[PulsarUnifiedStorage] PostgresDriver is required for core engine to operate.");
    this.cache = e2.cache, this.db = e2.db, this.ops = new d(this.db);
    let r2 = e2.strategy ?? "AUTO";
    if (r2 === "AUTO") r2 = this.cache ? "REDIS_CACHE" : "PG_UNLOGGED";
    switch (this.strategy = r2, this.strategy) {
      case "REDIS_CACHE":
        if (!this.cache) throw Error("[PulsarUnifiedStorage] Strategy 'REDIS_CACHE' requires a valid Redis cache driver.");
        this.repository = new l(this.cache);
        break;
      case "PG_UNLOGGED":
        this.repository = new p(this.db);
        break;
      default:
        throw Error(`[PulsarUnifiedStorage] Unsupported storage strategy: '${this.strategy}'`);
    }
  }
  bindInstanceId(e2) {
    if (this.cache) this.cache.setKeyPrefix(e2);
    if (this.db) this.db.setKeyPrefix(e2);
  }
  async connect() {
    if (this.isConnected) return;
    let e2 = [];
    if (this.cache) e2.push(this.cache.connect());
    if (this.db) e2.push(this.db.connect());
    await Promise.all(e2), this.logger.log(`[PulsarStorage] Storage layer active [Strategy: ${this.strategy}]`), this.isConnected = true;
  }
  async disconnect() {
    this.isConnected = false;
    let e2 = [];
    if (this.cache) e2.push(this.cache.disconnect());
    if (this.db) e2.push(this.db.disconnect());
    await Promise.all(e2);
  }
  async healthCheck() {
    let e2 = {};
    if (this.db) e2.db = await this.db.healthCheck();
    return e2;
  }
};

// ../../node_modules/postgres/src/index.js
import os from "os";
import fs from "fs";

// ../../node_modules/postgres/src/query.js
var originCache = /* @__PURE__ */ new Map();
var originStackCache = /* @__PURE__ */ new Map();
var originError = /* @__PURE__ */ Symbol("OriginError");
var CLOSE = {};
var Query = class extends Promise {
  constructor(strings, args, handler2, canceller, options = {}) {
    let resolve, reject;
    super((a3, b3) => {
      resolve = a3;
      reject = b3;
    });
    this.tagged = Array.isArray(strings.raw);
    this.strings = strings;
    this.args = args;
    this.handler = handler2;
    this.canceller = canceller;
    this.options = options;
    this.state = null;
    this.statement = null;
    this.resolve = (x4) => (this.active = false, resolve(x4));
    this.reject = (x4) => (this.active = false, reject(x4));
    this.active = false;
    this.cancelled = null;
    this.executed = false;
    this.signature = "";
    this[originError] = this.handler.debug ? new Error() : this.tagged && cachedError(this.strings);
  }
  get origin() {
    return (this.handler.debug ? this[originError].stack : this.tagged && originStackCache.has(this.strings) ? originStackCache.get(this.strings) : originStackCache.set(this.strings, this[originError].stack).get(this.strings)) || "";
  }
  static get [Symbol.species]() {
    return Promise;
  }
  cancel() {
    return this.canceller && (this.canceller(this), this.canceller = null);
  }
  simple() {
    this.options.simple = true;
    this.options.prepare = false;
    return this;
  }
  async readable() {
    this.simple();
    this.streaming = true;
    return this;
  }
  async writable() {
    this.simple();
    this.streaming = true;
    return this;
  }
  cursor(rows = 1, fn) {
    this.options.simple = false;
    if (typeof rows === "function") {
      fn = rows;
      rows = 1;
    }
    this.cursorRows = rows;
    if (typeof fn === "function")
      return this.cursorFn = fn, this;
    let prev;
    return {
      [Symbol.asyncIterator]: () => ({
        next: () => {
          if (this.executed && !this.active)
            return { done: true };
          prev && prev();
          const promise = new Promise((resolve, reject) => {
            this.cursorFn = (value) => {
              resolve({ value, done: false });
              return new Promise((r2) => prev = r2);
            };
            this.resolve = () => (this.active = false, resolve({ done: true }));
            this.reject = (x4) => (this.active = false, reject(x4));
          });
          this.execute();
          return promise;
        },
        return() {
          prev && prev(CLOSE);
          return { done: true };
        }
      })
    };
  }
  describe() {
    this.options.simple = false;
    this.onlyDescribe = this.options.prepare = true;
    return this;
  }
  stream() {
    throw new Error(".stream has been renamed to .forEach");
  }
  forEach(fn) {
    this.forEachFn = fn;
    this.handle();
    return this;
  }
  raw() {
    this.isRaw = true;
    return this;
  }
  values() {
    this.isRaw = "values";
    return this;
  }
  async handle() {
    !this.executed && (this.executed = true) && await 1 && this.handler(this);
  }
  execute() {
    this.handle();
    return this;
  }
  then() {
    this.handle();
    return super.then.apply(this, arguments);
  }
  catch() {
    this.handle();
    return super.catch.apply(this, arguments);
  }
  finally() {
    this.handle();
    return super.finally.apply(this, arguments);
  }
};
function cachedError(xs) {
  if (originCache.has(xs))
    return originCache.get(xs);
  const x4 = Error.stackTraceLimit;
  Error.stackTraceLimit = 4;
  originCache.set(xs, new Error());
  Error.stackTraceLimit = x4;
  return originCache.get(xs);
}

// ../../node_modules/postgres/src/errors.js
var PostgresError = class extends Error {
  constructor(x4) {
    super(x4.message);
    this.name = this.constructor.name;
    Object.assign(this, x4);
  }
};
var Errors = {
  connection,
  postgres,
  generic,
  notSupported
};
function connection(x4, options, socket) {
  const { host, port } = socket || options;
  const error = Object.assign(
    new Error("write " + x4 + " " + (options.path || host + ":" + port)),
    {
      code: x4,
      errno: x4,
      address: options.path || host
    },
    options.path ? {} : { port }
  );
  Error.captureStackTrace(error, connection);
  return error;
}
function postgres(x4) {
  const error = new PostgresError(x4);
  Error.captureStackTrace(error, postgres);
  return error;
}
function generic(code, message) {
  const error = Object.assign(new Error(code + ": " + message), { code });
  Error.captureStackTrace(error, generic);
  return error;
}
function notSupported(x4) {
  const error = Object.assign(
    new Error(x4 + " (B) is not supported"),
    {
      code: "MESSAGE_NOT_SUPPORTED",
      name: x4
    }
  );
  Error.captureStackTrace(error, notSupported);
  return error;
}

// ../../node_modules/postgres/src/types.js
var types = {
  string: {
    to: 25,
    from: null,
    // defaults to string
    serialize: (x4) => "" + x4
  },
  number: {
    to: 0,
    from: [21, 23, 26, 700, 701],
    serialize: (x4) => "" + x4,
    parse: (x4) => +x4
  },
  json: {
    to: 114,
    from: [114, 3802],
    serialize: (x4) => JSON.stringify(x4),
    parse: (x4) => JSON.parse(x4)
  },
  boolean: {
    to: 16,
    from: 16,
    serialize: (x4) => x4 === true ? "t" : "f",
    parse: (x4) => x4 === "t"
  },
  date: {
    to: 1184,
    from: [1082, 1114, 1184],
    serialize: (x4) => (x4 instanceof Date ? x4 : new Date(x4)).toISOString(),
    parse: (x4) => new Date(x4)
  },
  bytea: {
    to: 17,
    from: 17,
    serialize: (x4) => "\\x" + Buffer.from(x4).toString("hex"),
    parse: (x4) => Buffer.from(x4.slice(2), "hex")
  }
};
var NotTagged = class {
  then() {
    notTagged();
  }
  catch() {
    notTagged();
  }
  finally() {
    notTagged();
  }
};
var Identifier = class extends NotTagged {
  constructor(value) {
    super();
    this.value = escapeIdentifier(value);
  }
};
var Parameter = class extends NotTagged {
  constructor(value, type, array) {
    super();
    this.value = value;
    this.type = type;
    this.array = array;
  }
};
var Builder = class extends NotTagged {
  constructor(first, rest) {
    super();
    this.first = first;
    this.rest = rest;
  }
  build(before, parameters, types2, options) {
    const keyword = builders.map(([x4, fn]) => ({ fn, i: before.search(x4) })).sort((a3, b3) => a3.i - b3.i).pop();
    return keyword.i === -1 ? escapeIdentifiers(this.first, options) : keyword.fn(this.first, this.rest, parameters, types2, options);
  }
};
function handleValue(x4, parameters, types2, options) {
  let value = x4 instanceof Parameter ? x4.value : x4;
  if (value === void 0) {
    x4 instanceof Parameter ? x4.value = options.transform.undefined : value = x4 = options.transform.undefined;
    if (value === void 0)
      throw Errors.generic("UNDEFINED_VALUE", "Undefined values are not allowed");
  }
  return "$" + types2.push(
    x4 instanceof Parameter ? (parameters.push(x4.value), x4.array ? x4.array[x4.type || inferType(x4.value)] || x4.type || firstIsString(x4.value) : x4.type) : (parameters.push(x4), inferType(x4))
  );
}
var defaultHandlers = typeHandlers(types);
function stringify(q3, string, value, parameters, types2, options) {
  for (let i2 = 1; i2 < q3.strings.length; i2++) {
    string += stringifyValue(string, value, parameters, types2, options) + q3.strings[i2];
    value = q3.args[i2];
  }
  return string;
}
function stringifyValue(string, value, parameters, types2, o2) {
  return value instanceof Builder ? value.build(string, parameters, types2, o2) : value instanceof Query ? fragment(value, parameters, types2, o2) : value instanceof Identifier ? value.value : value && value[0] instanceof Query ? value.reduce((acc, x4) => acc + " " + fragment(x4, parameters, types2, o2), "") : handleValue(value, parameters, types2, o2);
}
function fragment(q3, parameters, types2, options) {
  q3.fragment = true;
  return stringify(q3, q3.strings[0], q3.args[0], parameters, types2, options);
}
function valuesBuilder(first, parameters, types2, columns, options) {
  return first.map(
    (row) => "(" + columns.map(
      (column) => stringifyValue("values", row[column], parameters, types2, options)
    ).join(",") + ")"
  ).join(",");
}
function values(first, rest, parameters, types2, options) {
  const multi = Array.isArray(first[0]);
  const columns = rest.length ? rest.flat() : Object.keys(multi ? first[0] : first);
  return valuesBuilder(multi ? first : [first], parameters, types2, columns, options);
}
function select(first, rest, parameters, types2, options) {
  typeof first === "string" && (first = [first].concat(rest));
  if (Array.isArray(first))
    return escapeIdentifiers(first, options);
  let value;
  const columns = rest.length ? rest.flat() : Object.keys(first);
  return columns.map((x4) => {
    value = first[x4];
    return (value instanceof Query ? fragment(value, parameters, types2, options) : value instanceof Identifier ? value.value : handleValue(value, parameters, types2, options)) + " as " + escapeIdentifier(options.transform.column.to ? options.transform.column.to(x4) : x4);
  }).join(",");
}
var builders = Object.entries({
  values,
  in: (...xs) => {
    const x4 = values(...xs);
    return x4 === "()" ? "(null)" : x4;
  },
  select,
  as: select,
  returning: select,
  "\\(": select,
  update(first, rest, parameters, types2, options) {
    return (rest.length ? rest.flat() : Object.keys(first)).map(
      (x4) => escapeIdentifier(options.transform.column.to ? options.transform.column.to(x4) : x4) + "=" + stringifyValue("values", first[x4], parameters, types2, options)
    );
  },
  insert(first, rest, parameters, types2, options) {
    const columns = rest.length ? rest.flat() : Object.keys(Array.isArray(first) ? first[0] : first);
    return "(" + escapeIdentifiers(columns, options) + ")values" + valuesBuilder(Array.isArray(first) ? first : [first], parameters, types2, columns, options);
  }
}).map(([x4, fn]) => [new RegExp("((?:^|[\\s(])" + x4 + "(?:$|[\\s(]))(?![\\s\\S]*\\1)", "i"), fn]);
function notTagged() {
  throw Errors.generic("NOT_TAGGED_CALL", "Query not called as a tagged template literal");
}
var serializers = defaultHandlers.serializers;
var parsers = defaultHandlers.parsers;
function firstIsString(x4) {
  if (Array.isArray(x4))
    return firstIsString(x4[0]);
  return typeof x4 === "string" ? 1009 : 0;
}
var mergeUserTypes = function(types2) {
  const user = typeHandlers(types2 || {});
  return {
    serializers: Object.assign({}, serializers, user.serializers),
    parsers: Object.assign({}, parsers, user.parsers)
  };
};
function typeHandlers(types2) {
  return Object.keys(types2).reduce((acc, k2) => {
    types2[k2].from && [].concat(types2[k2].from).forEach((x4) => acc.parsers[x4] = types2[k2].parse);
    if (types2[k2].serialize) {
      acc.serializers[types2[k2].to] = types2[k2].serialize;
      types2[k2].from && [].concat(types2[k2].from).forEach((x4) => acc.serializers[x4] = types2[k2].serialize);
    }
    return acc;
  }, { parsers: {}, serializers: {} });
}
function escapeIdentifiers(xs, { transform: { column } }) {
  return xs.map((x4) => escapeIdentifier(column.to ? column.to(x4) : x4)).join(",");
}
var escapeIdentifier = function escape(str) {
  return '"' + str.replace(/"/g, '""').replace(/\./g, '"."') + '"';
};
var inferType = function inferType2(x4) {
  return x4 instanceof Parameter ? x4.type : x4 instanceof Date ? 1184 : x4 instanceof Uint8Array ? 17 : x4 === true || x4 === false ? 16 : typeof x4 === "bigint" ? 20 : Array.isArray(x4) ? inferType2(x4[0]) : 0;
};
var escapeBackslash = /\\/g;
var escapeQuote = /"/g;
function arrayEscape(x4) {
  return x4.replace(escapeBackslash, "\\\\").replace(escapeQuote, '\\"');
}
var arraySerializer = function arraySerializer2(xs, serializer, options, typarray) {
  if (Array.isArray(xs) === false)
    return xs;
  if (!xs.length)
    return "{}";
  const first = xs[0];
  const delimiter = typarray === 1020 ? ";" : ",";
  if (Array.isArray(first) && !first.type)
    return "{" + xs.map((x4) => arraySerializer2(x4, serializer, options, typarray)).join(delimiter) + "}";
  return "{" + xs.map((x4) => {
    if (x4 === void 0) {
      x4 = options.transform.undefined;
      if (x4 === void 0)
        throw Errors.generic("UNDEFINED_VALUE", "Undefined values are not allowed");
    }
    return x4 === null ? "null" : '"' + arrayEscape(serializer ? serializer(x4.type ? x4.value : x4) : "" + x4) + '"';
  }).join(delimiter) + "}";
};
var arrayParserState = {
  i: 0,
  char: null,
  str: "",
  quoted: false,
  last: 0
};
var arrayParser = function arrayParser2(x4, parser, typarray) {
  arrayParserState.i = arrayParserState.last = 0;
  return arrayParserLoop(arrayParserState, x4, parser, typarray);
};
function arrayParserLoop(s3, x4, parser, typarray) {
  const xs = [];
  const delimiter = typarray === 1020 ? ";" : ",";
  for (; s3.i < x4.length; s3.i++) {
    s3.char = x4[s3.i];
    if (s3.quoted) {
      if (s3.char === "\\") {
        s3.str += x4[++s3.i];
      } else if (s3.char === '"') {
        xs.push(parser ? parser(s3.str) : s3.str);
        s3.str = "";
        s3.quoted = x4[s3.i + 1] === '"';
        s3.last = s3.i + 2;
      } else {
        s3.str += s3.char;
      }
    } else if (s3.char === '"') {
      s3.quoted = true;
    } else if (s3.char === "{") {
      s3.last = ++s3.i;
      xs.push(arrayParserLoop(s3, x4, parser, typarray));
    } else if (s3.char === "}") {
      s3.quoted = false;
      s3.last < s3.i && xs.push(parser ? parser(x4.slice(s3.last, s3.i)) : x4.slice(s3.last, s3.i));
      s3.last = s3.i + 1;
      break;
    } else if (s3.char === delimiter && s3.p !== "}" && s3.p !== '"') {
      xs.push(parser ? parser(x4.slice(s3.last, s3.i)) : x4.slice(s3.last, s3.i));
      s3.last = s3.i + 1;
    }
    s3.p = s3.char;
  }
  s3.last < s3.i && xs.push(parser ? parser(x4.slice(s3.last, s3.i + 1)) : x4.slice(s3.last, s3.i + 1));
  return xs;
}
var toCamel = (x4) => {
  let str = x4[0];
  for (let i2 = 1; i2 < x4.length; i2++)
    str += x4[i2] === "_" ? x4[++i2].toUpperCase() : x4[i2];
  return str;
};
var toPascal = (x4) => {
  let str = x4[0].toUpperCase();
  for (let i2 = 1; i2 < x4.length; i2++)
    str += x4[i2] === "_" ? x4[++i2].toUpperCase() : x4[i2];
  return str;
};
var toKebab = (x4) => x4.replace(/_/g, "-");
var fromCamel = (x4) => x4.replace(/([A-Z])/g, "_$1").toLowerCase();
var fromPascal = (x4) => (x4.slice(0, 1) + x4.slice(1).replace(/([A-Z])/g, "_$1")).toLowerCase();
var fromKebab = (x4) => x4.replace(/-/g, "_");
function createJsonTransform(fn) {
  return function jsonTransform(x4, column) {
    return typeof x4 === "object" && x4 !== null && (column.type === 114 || column.type === 3802) ? Array.isArray(x4) ? x4.map((x5) => jsonTransform(x5, column)) : Object.entries(x4).reduce((acc, [k2, v3]) => Object.assign(acc, { [fn(k2)]: jsonTransform(v3, column) }), {}) : x4;
  };
}
toCamel.column = { from: toCamel };
toCamel.value = { from: createJsonTransform(toCamel) };
fromCamel.column = { to: fromCamel };
var camel = { ...toCamel };
camel.column.to = fromCamel;
toPascal.column = { from: toPascal };
toPascal.value = { from: createJsonTransform(toPascal) };
fromPascal.column = { to: fromPascal };
var pascal = { ...toPascal };
pascal.column.to = fromPascal;
toKebab.column = { from: toKebab };
toKebab.value = { from: createJsonTransform(toKebab) };
fromKebab.column = { to: fromKebab };
var kebab = { ...toKebab };
kebab.column.to = fromKebab;

// ../../node_modules/postgres/src/connection.js
import net from "net";
import tls from "tls";
import crypto from "crypto";
import Stream from "stream";
import { performance as performance2 } from "perf_hooks";

// ../../node_modules/postgres/src/result.js
var Result = class extends Array {
  constructor() {
    super();
    Object.defineProperties(this, {
      count: { value: null, writable: true },
      state: { value: null, writable: true },
      command: { value: null, writable: true },
      columns: { value: null, writable: true },
      statement: { value: null, writable: true }
    });
  }
  static get [Symbol.species]() {
    return Array;
  }
};

// ../../node_modules/postgres/src/queue.js
var queue_default = Queue;
function Queue(initial = []) {
  let xs = initial.slice();
  let index = 0;
  return {
    get length() {
      return xs.length - index;
    },
    remove: (x4) => {
      const index2 = xs.indexOf(x4);
      return index2 === -1 ? null : (xs.splice(index2, 1), x4);
    },
    push: (x4) => (xs.push(x4), x4),
    shift: () => {
      const out = xs[index++];
      if (index === xs.length) {
        index = 0;
        xs = [];
      } else {
        xs[index - 1] = void 0;
      }
      return out;
    }
  };
}

// ../../node_modules/postgres/src/bytes.js
var size = 256;
var buffer = Buffer.allocUnsafe(size);
var messages = "BCcDdEFfHPpQSX".split("").reduce((acc, x4) => {
  const v3 = x4.charCodeAt(0);
  acc[x4] = () => {
    buffer[0] = v3;
    b2.i = 5;
    return b2;
  };
  return acc;
}, {});
var b2 = Object.assign(reset, messages, {
  N: String.fromCharCode(0),
  i: 0,
  inc(x4) {
    b2.i += x4;
    return b2;
  },
  str(x4) {
    const length = Buffer.byteLength(x4);
    fit(length);
    b2.i += buffer.write(x4, b2.i, length, "utf8");
    return b2;
  },
  i16(x4) {
    fit(2);
    buffer.writeUInt16BE(x4, b2.i);
    b2.i += 2;
    return b2;
  },
  i32(x4, i2) {
    if (i2 || i2 === 0) {
      buffer.writeUInt32BE(x4, i2);
      return b2;
    }
    fit(4);
    buffer.writeUInt32BE(x4, b2.i);
    b2.i += 4;
    return b2;
  },
  z(x4) {
    fit(x4);
    buffer.fill(0, b2.i, b2.i + x4);
    b2.i += x4;
    return b2;
  },
  raw(x4) {
    buffer = Buffer.concat([buffer.subarray(0, b2.i), x4]);
    b2.i = buffer.length;
    return b2;
  },
  end(at = 1) {
    buffer.writeUInt32BE(b2.i - at, at);
    const out = buffer.subarray(0, b2.i);
    b2.i = 0;
    buffer = Buffer.allocUnsafe(size);
    return out;
  }
});
var bytes_default = b2;
function fit(x4) {
  if (buffer.length - b2.i < x4) {
    const prev = buffer, length = prev.length;
    buffer = Buffer.allocUnsafe(length + (length >> 1) + x4);
    prev.copy(buffer);
  }
}
function reset() {
  b2.i = 0;
  return b2;
}

// ../../node_modules/postgres/src/connection.js
var connection_default = Connection;
var uid = 1;
var Sync = bytes_default().S().end();
var Flush = bytes_default().H().end();
var SSLRequest = bytes_default().i32(8).i32(80877103).end(8);
var ExecuteUnnamed = Buffer.concat([bytes_default().E().str(bytes_default.N).i32(0).end(), Sync]);
var DescribeUnnamed = bytes_default().D().str("S").str(bytes_default.N).end();
var noop = () => {
};
var retryRoutines = /* @__PURE__ */ new Set([
  "FetchPreparedStatement",
  "RevalidateCachedQuery",
  "transformAssignedExpr"
]);
var errorFields = {
  83: "severity_local",
  // S
  86: "severity",
  // V
  67: "code",
  // C
  77: "message",
  // M
  68: "detail",
  // D
  72: "hint",
  // H
  80: "position",
  // P
  112: "internal_position",
  // p
  113: "internal_query",
  // q
  87: "where",
  // W
  115: "schema_name",
  // s
  116: "table_name",
  // t
  99: "column_name",
  // c
  100: "data type_name",
  // d
  110: "constraint_name",
  // n
  70: "file",
  // F
  76: "line",
  // L
  82: "routine"
  // R
};
function Connection(options, queues = {}, { onopen = noop, onend = noop, onclose = noop } = {}) {
  const {
    sslnegotiation,
    ssl,
    max,
    user,
    host,
    port,
    database,
    parsers: parsers2,
    transform,
    onnotice,
    onnotify,
    onparameter,
    max_pipeline,
    keep_alive,
    backoff: backoff2,
    target_session_attrs
  } = options;
  const sent = queue_default(), id = uid++, backend = { pid: null, secret: null }, idleTimer = timer(end, options.idle_timeout), lifeTimer = timer(end, options.max_lifetime), connectTimer = timer(connectTimedOut, options.connect_timeout);
  let socket = null, cancelMessage, errorResponse = null, result = new Result(), incoming = Buffer.alloc(0), needsTypes = options.fetch_types, backendParameters = {}, statements = {}, statementId = Math.random().toString(36).slice(2), statementCount = 1, closedTime = 0, remaining = 0, hostIndex = 0, retries = 0, length = 0, delay = 0, rows = 0, serverSignature = null, nextWriteTimer = null, terminated = false, incomings = null, results = null, initial = null, ending = null, stream = null, chunk = null, ended = null, nonce = null, query = null, final = null;
  const connection2 = {
    queue: queues.closed,
    idleTimer,
    connect(query2) {
      initial = query2;
      reconnect();
    },
    terminate,
    execute,
    cancel,
    end,
    count: 0,
    id
  };
  queues.closed && queues.closed.push(connection2);
  return connection2;
  async function createSocket() {
    let x4;
    try {
      x4 = options.socket ? await Promise.resolve(options.socket(options)) : new net.Socket();
    } catch (e2) {
      error(e2);
      return;
    }
    x4.on("error", error);
    x4.on("close", closed);
    x4.on("drain", drain);
    return x4;
  }
  async function cancel({ pid, secret }, resolve, reject) {
    try {
      cancelMessage = bytes_default().i32(16).i32(80877102).i32(pid).i32(secret).end(16);
      await connect();
      socket.once("error", reject);
      socket.once("close", resolve);
    } catch (error2) {
      reject(error2);
    }
  }
  function execute(q3) {
    if (terminated)
      return queryError(q3, Errors.connection("CONNECTION_DESTROYED", options));
    if (stream)
      return queryError(q3, Errors.generic("COPY_IN_PROGRESS", "You cannot execute queries during copy"));
    if (q3.cancelled)
      return;
    try {
      q3.state = backend;
      query ? sent.push(q3) : (query = q3, query.active = true);
      build(q3);
      return write(toBuffer(q3)) && !q3.describeFirst && !q3.cursorFn && sent.length < max_pipeline && (!q3.options.onexecute || q3.options.onexecute(connection2));
    } catch (error2) {
      sent.length === 0 && write(Sync);
      errored(error2);
      return true;
    }
  }
  function toBuffer(q3) {
    if (q3.parameters.length >= 65534)
      throw Errors.generic("MAX_PARAMETERS_EXCEEDED", "Max number of parameters (65534) exceeded");
    return q3.options.simple ? bytes_default().Q().str(q3.statement.string + bytes_default.N).end() : q3.describeFirst ? Buffer.concat([describe(q3), Flush]) : q3.prepare ? q3.prepared ? prepared(q3) : Buffer.concat([describe(q3), prepared(q3)]) : unnamed(q3);
  }
  function describe(q3) {
    return Buffer.concat([
      Parse(q3.statement.string, q3.parameters, q3.statement.types, q3.statement.name),
      Describe("S", q3.statement.name)
    ]);
  }
  function prepared(q3) {
    return Buffer.concat([
      Bind(q3.parameters, q3.statement.types, q3.statement.name, q3.cursorName),
      q3.cursorFn ? Execute("", q3.cursorRows) : ExecuteUnnamed
    ]);
  }
  function unnamed(q3) {
    return Buffer.concat([
      Parse(q3.statement.string, q3.parameters, q3.statement.types),
      DescribeUnnamed,
      prepared(q3)
    ]);
  }
  function build(q3) {
    const parameters = [], types2 = [];
    const string = stringify(q3, q3.strings[0], q3.args[0], parameters, types2, options);
    !q3.tagged && q3.args.forEach((x4) => handleValue(x4, parameters, types2, options));
    q3.prepare = options.prepare && ("prepare" in q3.options ? q3.options.prepare : true);
    q3.string = string;
    q3.signature = q3.prepare && types2 + string;
    q3.onlyDescribe && delete statements[q3.signature];
    q3.parameters = q3.parameters || parameters;
    q3.prepared = q3.prepare && q3.signature in statements;
    q3.describeFirst = q3.onlyDescribe || parameters.length && !q3.prepared;
    q3.statement = q3.prepared ? statements[q3.signature] : { string, types: types2, name: q3.prepare ? statementId + statementCount++ : "" };
    typeof options.debug === "function" && options.debug(id, string, parameters, types2);
  }
  function write(x4, fn) {
    chunk = chunk ? Buffer.concat([chunk, x4]) : Buffer.from(x4);
    if (fn || chunk.length >= 1024)
      return nextWrite(fn);
    nextWriteTimer === null && (nextWriteTimer = setImmediate(nextWrite));
    return true;
  }
  function nextWrite(fn) {
    const x4 = socket.write(chunk, fn);
    nextWriteTimer !== null && clearImmediate(nextWriteTimer);
    chunk = nextWriteTimer = null;
    return x4;
  }
  function connectTimedOut() {
    errored(Errors.connection("CONNECT_TIMEOUT", options, socket));
    socket.destroy();
  }
  async function secure() {
    if (sslnegotiation !== "direct") {
      write(SSLRequest);
      const canSSL = await new Promise((r2) => socket.once("data", (x4) => r2(x4[0] === 83)));
      if (!canSSL && ssl === "prefer")
        return connected();
    }
    const options2 = {
      socket,
      servername: net.isIP(socket.host) ? void 0 : socket.host
    };
    if (sslnegotiation === "direct")
      options2.ALPNProtocols = ["postgresql"];
    if (ssl === "require" || ssl === "allow" || ssl === "prefer")
      options2.rejectUnauthorized = false;
    else if (typeof ssl === "object")
      Object.assign(options2, ssl);
    socket.removeAllListeners();
    socket = tls.connect(options2);
    socket.on("secureConnect", connected);
    socket.on("error", error);
    socket.on("close", closed);
    socket.on("drain", drain);
  }
  function drain() {
    !query && onopen(connection2);
  }
  function data(x4) {
    if (incomings) {
      incomings.push(x4);
      remaining -= x4.length;
      if (remaining > 0)
        return;
    }
    incoming = incomings ? Buffer.concat(incomings, length - remaining) : incoming.length === 0 ? x4 : Buffer.concat([incoming, x4], incoming.length + x4.length);
    while (incoming.length > 4) {
      length = incoming.readUInt32BE(1);
      if (length >= incoming.length) {
        remaining = length - incoming.length;
        incomings = [incoming];
        break;
      }
      try {
        handle(incoming.subarray(0, length + 1));
      } catch (e2) {
        query && (query.cursorFn || query.describeFirst) && write(Sync);
        errored(e2);
      }
      incoming = incoming.subarray(length + 1);
      remaining = 0;
      incomings = null;
    }
  }
  async function connect() {
    terminated = false;
    backendParameters = {};
    socket || (socket = await createSocket());
    if (!socket)
      return;
    connectTimer.start();
    if (options.socket)
      return ssl ? secure() : connected();
    socket.on("connect", ssl ? secure : connected);
    if (options.path)
      return socket.connect(options.path);
    socket.ssl = ssl;
    socket.connect(port[hostIndex], host[hostIndex]);
    socket.host = host[hostIndex];
    socket.port = port[hostIndex];
    hostIndex = (hostIndex + 1) % port.length;
  }
  function reconnect() {
    setTimeout(connect, closedTime ? Math.max(0, closedTime + delay - performance2.now()) : 0);
  }
  function connected() {
    try {
      statements = {};
      needsTypes = options.fetch_types;
      statementId = Math.random().toString(36).slice(2);
      statementCount = 1;
      lifeTimer.start();
      socket.on("data", data);
      keep_alive && socket.setKeepAlive && socket.setKeepAlive(true, 1e3 * keep_alive);
      const s3 = StartupMessage();
      write(s3);
    } catch (err) {
      error(err);
    }
  }
  function error(err) {
    if (connection2.queue === queues.connecting && options.host[retries + 1])
      return;
    errored(err);
    while (sent.length)
      queryError(sent.shift(), err);
  }
  function errored(err) {
    stream && (stream.destroy(err), stream = null);
    query && queryError(query, err);
    initial && (queryError(initial, err), initial = null);
  }
  function queryError(query2, err) {
    if (query2.reserve)
      return query2.reject(err);
    if (!err || typeof err !== "object")
      err = new Error(err);
    "query" in err || "parameters" in err || Object.defineProperties(err, {
      stack: { value: err.stack + query2.origin.replace(/.*\n/, "\n"), enumerable: options.debug },
      query: { value: query2.string, enumerable: options.debug },
      parameters: { value: query2.parameters, enumerable: options.debug },
      args: { value: query2.args, enumerable: options.debug },
      types: { value: query2.statement && query2.statement.types, enumerable: options.debug }
    });
    query2.reject(err);
  }
  function end() {
    return ending || (!connection2.reserved && onend(connection2), !connection2.reserved && !initial && !query && sent.length === 0 ? (terminate(), new Promise((r2) => socket && socket.readyState !== "closed" ? socket.once("close", r2) : r2())) : ending = new Promise((r2) => ended = r2));
  }
  function terminate() {
    terminated = true;
    if (stream || query || initial || sent.length)
      error(Errors.connection("CONNECTION_DESTROYED", options));
    clearImmediate(nextWriteTimer);
    if (socket) {
      socket.removeListener("data", data);
      socket.removeListener("connect", connected);
      socket.readyState === "open" && socket.end(bytes_default().X().end());
    }
    ended && (ended(), ending = ended = null);
  }
  async function closed(hadError) {
    incoming = Buffer.alloc(0);
    remaining = 0;
    incomings = null;
    clearImmediate(nextWriteTimer);
    socket.removeListener("data", data);
    socket.removeListener("connect", connected);
    idleTimer.cancel();
    lifeTimer.cancel();
    connectTimer.cancel();
    socket.removeAllListeners();
    socket = null;
    if (initial)
      return reconnect();
    !hadError && (query || sent.length) && error(Errors.connection("CONNECTION_CLOSED", options, socket));
    closedTime = performance2.now();
    hadError && options.shared.retries++;
    delay = (typeof backoff2 === "function" ? backoff2(options.shared.retries) : backoff2) * 1e3;
    onclose(connection2, Errors.connection("CONNECTION_CLOSED", options, socket));
  }
  function handle(xs, x4 = xs[0]) {
    (x4 === 68 ? DataRow : (
      // D
      x4 === 100 ? CopyData : (
        // d
        x4 === 65 ? NotificationResponse : (
          // A
          x4 === 83 ? ParameterStatus : (
            // S
            x4 === 90 ? ReadyForQuery : (
              // Z
              x4 === 67 ? CommandComplete : (
                // C
                x4 === 50 ? BindComplete : (
                  // 2
                  x4 === 49 ? ParseComplete : (
                    // 1
                    x4 === 116 ? ParameterDescription : (
                      // t
                      x4 === 84 ? RowDescription : (
                        // T
                        x4 === 82 ? Authentication : (
                          // R
                          x4 === 110 ? NoData : (
                            // n
                            x4 === 75 ? BackendKeyData : (
                              // K
                              x4 === 69 ? ErrorResponse : (
                                // E
                                x4 === 115 ? PortalSuspended : (
                                  // s
                                  x4 === 51 ? CloseComplete : (
                                    // 3
                                    x4 === 71 ? CopyInResponse : (
                                      // G
                                      x4 === 78 ? NoticeResponse : (
                                        // N
                                        x4 === 72 ? CopyOutResponse : (
                                          // H
                                          x4 === 99 ? CopyDone : (
                                            // c
                                            x4 === 73 ? EmptyQueryResponse : (
                                              // I
                                              x4 === 86 ? FunctionCallResponse : (
                                                // V
                                                x4 === 118 ? NegotiateProtocolVersion : (
                                                  // v
                                                  x4 === 87 ? CopyBothResponse : (
                                                    // W
                                                    /* c8 ignore next */
                                                    UnknownMessage
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    ))(xs);
  }
  function DataRow(x4) {
    let index = 7;
    let length2;
    let column;
    let value;
    const row = query.isRaw ? new Array(query.statement.columns.length) : {};
    for (let i2 = 0; i2 < query.statement.columns.length; i2++) {
      column = query.statement.columns[i2];
      length2 = x4.readInt32BE(index);
      index += 4;
      value = length2 === -1 ? null : query.isRaw === true ? x4.subarray(index, index += length2) : column.parser === void 0 ? x4.toString("utf8", index, index += length2) : column.parser.array === true ? column.parser(x4.toString("utf8", index + 1, index += length2)) : column.parser(x4.toString("utf8", index, index += length2));
      query.isRaw ? row[i2] = query.isRaw === true ? value : transform.value.from ? transform.value.from(value, column) : value : row[column.name] = transform.value.from ? transform.value.from(value, column) : value;
    }
    query.forEachFn ? query.forEachFn(transform.row.from ? transform.row.from(row) : row, result) : result[rows++] = transform.row.from ? transform.row.from(row) : row;
  }
  function ParameterStatus(x4) {
    const [k2, v3] = x4.toString("utf8", 5, x4.length - 1).split(bytes_default.N);
    backendParameters[k2] = v3;
    if (options.parameters[k2] !== v3) {
      options.parameters[k2] = v3;
      onparameter && onparameter(k2, v3);
    }
  }
  function ReadyForQuery(x4) {
    if (query) {
      if (errorResponse) {
        query.retried ? errored(query.retried) : query.prepared && retryRoutines.has(errorResponse.routine) ? retry(query, errorResponse) : errored(errorResponse);
      } else {
        query.resolve(results || result);
      }
    } else if (errorResponse) {
      errored(errorResponse);
    }
    query = results = errorResponse = null;
    result = new Result();
    connectTimer.cancel();
    if (initial) {
      if (target_session_attrs) {
        if (!backendParameters.in_hot_standby || !backendParameters.default_transaction_read_only)
          return fetchState();
        else if (tryNext(target_session_attrs, backendParameters))
          return terminate();
      }
      if (needsTypes) {
        initial.reserve && (initial = null);
        return fetchArrayTypes();
      }
      initial && !initial.reserve && execute(initial);
      options.shared.retries = retries = 0;
      initial = null;
      return;
    }
    while (sent.length && (query = sent.shift()) && (query.active = true, query.cancelled))
      Connection(options).cancel(query.state, query.cancelled.resolve, query.cancelled.reject);
    if (query)
      return;
    connection2.reserved ? !connection2.reserved.release && x4[5] === 73 ? ending ? terminate() : (connection2.reserved = null, onopen(connection2)) : connection2.reserved() : ending ? terminate() : onopen(connection2);
  }
  function CommandComplete(x4) {
    rows = 0;
    for (let i2 = x4.length - 1; i2 > 0; i2--) {
      if (x4[i2] === 32 && x4[i2 + 1] < 58 && result.count === null)
        result.count = +x4.toString("utf8", i2 + 1, x4.length - 1);
      if (x4[i2 - 1] >= 65) {
        result.command = x4.toString("utf8", 5, i2);
        result.state = backend;
        break;
      }
    }
    final && (final(), final = null);
    if (result.command === "BEGIN" && max !== 1 && !connection2.reserved)
      return errored(Errors.generic("UNSAFE_TRANSACTION", "Only use sql.begin, sql.reserved or max: 1"));
    if (query.options.simple)
      return BindComplete();
    if (query.cursorFn) {
      result.count && query.cursorFn(result);
      write(Sync);
    }
  }
  function ParseComplete() {
    query.parsing = false;
  }
  function BindComplete() {
    !result.statement && (result.statement = query.statement);
    result.columns = query.statement.columns;
  }
  function ParameterDescription(x4) {
    const length2 = x4.readUInt16BE(5);
    for (let i2 = 0; i2 < length2; ++i2)
      !query.statement.types[i2] && (query.statement.types[i2] = x4.readUInt32BE(7 + i2 * 4));
    query.prepare && (statements[query.signature] = query.statement);
    query.describeFirst && !query.onlyDescribe && (write(prepared(query)), query.describeFirst = false);
  }
  function RowDescription(x4) {
    if (result.command) {
      results = results || [result];
      results.push(result = new Result());
      result.count = null;
      query.statement.columns = null;
    }
    const length2 = x4.readUInt16BE(5);
    let index = 7;
    let start;
    query.statement.columns = Array(length2);
    for (let i2 = 0; i2 < length2; ++i2) {
      start = index;
      while (x4[index++] !== 0) ;
      const table = x4.readUInt32BE(index);
      const number = x4.readUInt16BE(index + 4);
      const type = x4.readUInt32BE(index + 6);
      query.statement.columns[i2] = {
        name: transform.column.from ? transform.column.from(x4.toString("utf8", start, index - 1)) : x4.toString("utf8", start, index - 1),
        parser: parsers2[type],
        table,
        number,
        type
      };
      index += 18;
    }
    result.statement = query.statement;
    if (query.onlyDescribe)
      return query.resolve(query.statement), write(Sync);
  }
  async function Authentication(x4, type = x4.readUInt32BE(5)) {
    (type === 3 ? AuthenticationCleartextPassword : type === 5 ? AuthenticationMD5Password : type === 10 ? SASL : type === 11 ? SASLContinue : type === 12 ? SASLFinal : type !== 0 ? UnknownAuth : noop)(x4, type);
  }
  async function AuthenticationCleartextPassword() {
    const payload = await Pass();
    write(
      bytes_default().p().str(payload).z(1).end()
    );
  }
  async function AuthenticationMD5Password(x4) {
    const payload = "md5" + await md5(
      Buffer.concat([
        Buffer.from(await md5(await Pass() + user)),
        x4.subarray(9)
      ])
    );
    write(
      bytes_default().p().str(payload).z(1).end()
    );
  }
  async function SASL() {
    nonce = (await crypto.randomBytes(18)).toString("base64");
    bytes_default().p().str("SCRAM-SHA-256" + bytes_default.N);
    const i2 = bytes_default.i;
    write(bytes_default.inc(4).str("n,,n=*,r=" + nonce).i32(bytes_default.i - i2 - 4, i2).end());
  }
  async function SASLContinue(x4) {
    const res = x4.toString("utf8", 9).split(",").reduce((acc, x5) => (acc[x5[0]] = x5.slice(2), acc), {});
    const saltedPassword = await crypto.pbkdf2Sync(
      await Pass(),
      Buffer.from(res.s, "base64"),
      parseInt(res.i),
      32,
      "sha256"
    );
    const clientKey = await hmac(saltedPassword, "Client Key");
    const auth = "n=*,r=" + nonce + ",r=" + res.r + ",s=" + res.s + ",i=" + res.i + ",c=biws,r=" + res.r;
    serverSignature = (await hmac(await hmac(saltedPassword, "Server Key"), auth)).toString("base64");
    const payload = "c=biws,r=" + res.r + ",p=" + xor(
      clientKey,
      Buffer.from(await hmac(await sha256(clientKey), auth))
    ).toString("base64");
    write(
      bytes_default().p().str(payload).end()
    );
  }
  function SASLFinal(x4) {
    if (x4.toString("utf8", 9).split(bytes_default.N, 1)[0].slice(2) === serverSignature)
      return;
    errored(Errors.generic("SASL_SIGNATURE_MISMATCH", "The server did not return the correct signature"));
    socket.destroy();
  }
  function Pass() {
    return Promise.resolve(
      typeof options.pass === "function" ? options.pass() : options.pass
    );
  }
  function NoData() {
    result.statement = query.statement;
    result.statement.columns = [];
    if (query.onlyDescribe)
      return query.resolve(query.statement), write(Sync);
  }
  function BackendKeyData(x4) {
    backend.pid = x4.readUInt32BE(5);
    backend.secret = x4.readUInt32BE(9);
  }
  async function fetchArrayTypes() {
    needsTypes = false;
    const types2 = await new Query([`
      select b.oid, b.typarray
      from pg_catalog.pg_type a
      left join pg_catalog.pg_type b on b.oid = a.typelem
      where a.typcategory = 'A'
      group by b.oid, b.typarray
      order by b.oid
    `], [], execute);
    types2.forEach(({ oid, typarray }) => addArrayType(oid, typarray));
  }
  function addArrayType(oid, typarray) {
    if (!!options.parsers[typarray] && !!options.serializers[typarray]) return;
    const parser = options.parsers[oid];
    options.shared.typeArrayMap[oid] = typarray;
    options.parsers[typarray] = (xs) => arrayParser(xs, parser, typarray);
    options.parsers[typarray].array = true;
    options.serializers[typarray] = (xs) => arraySerializer(xs, options.serializers[oid], options, typarray);
  }
  function tryNext(x4, xs) {
    return x4 === "read-write" && xs.default_transaction_read_only === "on" || x4 === "read-only" && xs.default_transaction_read_only === "off" || x4 === "primary" && xs.in_hot_standby === "on" || x4 === "standby" && xs.in_hot_standby === "off" || x4 === "prefer-standby" && xs.in_hot_standby === "off" && options.host[retries];
  }
  function fetchState() {
    const query2 = new Query([`
      show transaction_read_only;
      select pg_catalog.pg_is_in_recovery()
    `], [], execute, null, { simple: true });
    query2.resolve = ([[a3], [b3]]) => {
      backendParameters.default_transaction_read_only = a3.transaction_read_only;
      backendParameters.in_hot_standby = b3.pg_is_in_recovery ? "on" : "off";
    };
    query2.execute();
  }
  function ErrorResponse(x4) {
    if (query) {
      (query.cursorFn || query.describeFirst) && write(Sync);
      errorResponse = Errors.postgres(parseError(x4));
    } else {
      errored(Errors.postgres(parseError(x4)));
    }
  }
  function retry(q3, error2) {
    delete statements[q3.signature];
    q3.retried = error2;
    execute(q3);
  }
  function NotificationResponse(x4) {
    if (!onnotify)
      return;
    let index = 9;
    while (x4[index++] !== 0) ;
    onnotify(
      x4.toString("utf8", 9, index - 1),
      x4.toString("utf8", index, x4.length - 1)
    );
  }
  async function PortalSuspended() {
    try {
      const x4 = await Promise.resolve(query.cursorFn(result));
      rows = 0;
      x4 === CLOSE ? write(Close(query.portal)) : (result = new Result(), write(Execute("", query.cursorRows)));
    } catch (err) {
      write(Sync);
      query.reject(err);
    }
  }
  function CloseComplete() {
    result.count && query.cursorFn(result);
    query.resolve(result);
  }
  function CopyInResponse() {
    stream = new Stream.Writable({
      autoDestroy: true,
      write(chunk2, encoding, callback) {
        socket.write(bytes_default().d().raw(chunk2).end(), callback);
      },
      destroy(error2, callback) {
        callback(error2);
        socket.write(bytes_default().f().str(error2 + bytes_default.N).end());
        stream = null;
      },
      final(callback) {
        socket.write(bytes_default().c().end());
        final = callback;
        stream = null;
      }
    });
    query.resolve(stream);
  }
  function CopyOutResponse() {
    stream = new Stream.Readable({
      read() {
        socket.resume();
      }
    });
    query.resolve(stream);
  }
  function CopyBothResponse() {
    stream = new Stream.Duplex({
      autoDestroy: true,
      read() {
        socket.resume();
      },
      /* c8 ignore next 11 */
      write(chunk2, encoding, callback) {
        socket.write(bytes_default().d().raw(chunk2).end(), callback);
      },
      destroy(error2, callback) {
        callback(error2);
        socket.write(bytes_default().f().str(error2 + bytes_default.N).end());
        stream = null;
      },
      final(callback) {
        socket.write(bytes_default().c().end());
        final = callback;
      }
    });
    query.resolve(stream);
  }
  function CopyData(x4) {
    stream && (stream.push(x4.subarray(5)) || socket.pause());
  }
  function CopyDone() {
    stream && stream.push(null);
    stream = null;
  }
  function NoticeResponse(x4) {
    onnotice ? onnotice(parseError(x4)) : console.log(parseError(x4));
  }
  function EmptyQueryResponse() {
  }
  function FunctionCallResponse() {
    errored(Errors.notSupported("FunctionCallResponse"));
  }
  function NegotiateProtocolVersion() {
    errored(Errors.notSupported("NegotiateProtocolVersion"));
  }
  function UnknownMessage(x4) {
    console.error("Postgres.js : Unknown Message:", x4[0]);
  }
  function UnknownAuth(x4, type) {
    console.error("Postgres.js : Unknown Auth:", type);
  }
  function Bind(parameters, types2, statement = "", portal = "") {
    let prev, type;
    bytes_default().B().str(portal + bytes_default.N).str(statement + bytes_default.N).i16(0).i16(parameters.length);
    parameters.forEach((x4, i2) => {
      if (x4 === null)
        return bytes_default.i32(4294967295);
      type = types2[i2];
      parameters[i2] = x4 = type in options.serializers ? options.serializers[type](x4) : "" + x4;
      prev = bytes_default.i;
      bytes_default.inc(4).str(x4).i32(bytes_default.i - prev - 4, prev);
    });
    bytes_default.i16(0);
    return bytes_default.end();
  }
  function Parse(str, parameters, types2, name = "") {
    bytes_default().P().str(name + bytes_default.N).str(str + bytes_default.N).i16(parameters.length);
    parameters.forEach((x4, i2) => bytes_default.i32(types2[i2] || 0));
    return bytes_default.end();
  }
  function Describe(x4, name = "") {
    return bytes_default().D().str(x4).str(name + bytes_default.N).end();
  }
  function Execute(portal = "", rows2 = 0) {
    return Buffer.concat([
      bytes_default().E().str(portal + bytes_default.N).i32(rows2).end(),
      Flush
    ]);
  }
  function Close(portal = "") {
    return Buffer.concat([
      bytes_default().C().str("P").str(portal + bytes_default.N).end(),
      bytes_default().S().end()
    ]);
  }
  function StartupMessage() {
    return cancelMessage || bytes_default().inc(4).i16(3).z(2).str(
      Object.entries(Object.assign(
        {
          user,
          database,
          client_encoding: "UTF8"
        },
        options.connection
      )).filter(([, v3]) => v3).map(([k2, v3]) => k2 + bytes_default.N + v3).join(bytes_default.N)
    ).z(2).end(0);
  }
}
function parseError(x4) {
  const error = {};
  let start = 5;
  for (let i2 = 5; i2 < x4.length - 1; i2++) {
    if (x4[i2] === 0) {
      error[errorFields[x4[start]]] = x4.toString("utf8", start + 1, i2);
      start = i2 + 1;
    }
  }
  return error;
}
function md5(x4) {
  return crypto.createHash("md5").update(x4).digest("hex");
}
function hmac(key, x4) {
  return crypto.createHmac("sha256", key).update(x4).digest();
}
function sha256(x4) {
  return crypto.createHash("sha256").update(x4).digest();
}
function xor(a3, b3) {
  const length = Math.max(a3.length, b3.length);
  const buffer2 = Buffer.allocUnsafe(length);
  for (let i2 = 0; i2 < length; i2++)
    buffer2[i2] = a3[i2] ^ b3[i2];
  return buffer2;
}
function timer(fn, seconds) {
  seconds = typeof seconds === "function" ? seconds() : seconds;
  if (!seconds)
    return { cancel: noop, start: noop };
  let timer2;
  return {
    cancel() {
      timer2 && (clearTimeout(timer2), timer2 = null);
    },
    start() {
      timer2 && clearTimeout(timer2);
      timer2 = setTimeout(done, seconds * 1e3, arguments);
    }
  };
  function done(args) {
    fn.apply(null, args);
    timer2 = null;
  }
}

// ../../node_modules/postgres/src/subscribe.js
var noop2 = () => {
};
function Subscribe(postgres2, options) {
  const subscribers = /* @__PURE__ */ new Map(), slot = "postgresjs_" + Math.random().toString(36).slice(2), state = {};
  let connection2, stream, ended = false;
  const sql = subscribe.sql = postgres2({
    ...options,
    transform: { column: {}, value: {}, row: {} },
    max: 1,
    fetch_types: false,
    idle_timeout: null,
    max_lifetime: null,
    connection: {
      ...options.connection,
      replication: "database"
    },
    onclose: async function() {
      if (ended)
        return;
      stream = null;
      state.pid = state.secret = void 0;
      connected(await init(sql, slot, options.publications));
      subscribers.forEach((event) => event.forEach(({ onsubscribe }) => onsubscribe()));
    },
    no_subscribe: true
  });
  const end = sql.end, close = sql.close;
  sql.end = async () => {
    ended = true;
    stream && await new Promise((r2) => (stream.once("close", r2), stream.end()));
    return end();
  };
  sql.close = async () => {
    stream && await new Promise((r2) => (stream.once("close", r2), stream.end()));
    return close();
  };
  return subscribe;
  async function subscribe(event, fn, onsubscribe = noop2, onerror = noop2) {
    event = parseEvent(event);
    if (!connection2)
      connection2 = init(sql, slot, options.publications);
    const subscriber = { fn, onsubscribe };
    const fns = subscribers.has(event) ? subscribers.get(event).add(subscriber) : subscribers.set(event, /* @__PURE__ */ new Set([subscriber])).get(event);
    const unsubscribe = () => {
      fns.delete(subscriber);
      fns.size === 0 && subscribers.delete(event);
    };
    return connection2.then((x4) => {
      connected(x4);
      onsubscribe();
      stream && stream.on("error", onerror);
      return { unsubscribe, state, sql };
    });
  }
  function connected(x4) {
    stream = x4.stream;
    state.pid = x4.state.pid;
    state.secret = x4.state.secret;
  }
  async function init(sql2, slot2, publications) {
    if (!publications)
      throw new Error("Missing publication names");
    const xs = await sql2.unsafe(
      `CREATE_REPLICATION_SLOT ${slot2} TEMPORARY LOGICAL pgoutput NOEXPORT_SNAPSHOT`
    );
    const [x4] = xs;
    const stream2 = await sql2.unsafe(
      `START_REPLICATION SLOT ${slot2} LOGICAL ${x4.consistent_point} (proto_version '1', publication_names '${publications}')`
    ).writable();
    const state2 = {
      lsn: Buffer.concat(x4.consistent_point.split("/").map((x5) => Buffer.from(("00000000" + x5).slice(-8), "hex")))
    };
    stream2.on("data", data);
    stream2.on("error", error);
    stream2.on("close", sql2.close);
    return { stream: stream2, state: xs.state };
    function error(e2) {
      console.error("Unexpected error during logical streaming - reconnecting", e2);
    }
    function data(x5) {
      if (x5[0] === 119) {
        parse(x5.subarray(25), state2, sql2.options.parsers, handle, options.transform);
      } else if (x5[0] === 107 && x5[17]) {
        state2.lsn = x5.subarray(1, 9);
        pong();
      }
    }
    function handle(a3, b3) {
      const path = b3.relation.schema + "." + b3.relation.table;
      call("*", a3, b3);
      call("*:" + path, a3, b3);
      b3.relation.keys.length && call("*:" + path + "=" + b3.relation.keys.map((x5) => a3[x5.name]), a3, b3);
      call(b3.command, a3, b3);
      call(b3.command + ":" + path, a3, b3);
      b3.relation.keys.length && call(b3.command + ":" + path + "=" + b3.relation.keys.map((x5) => a3[x5.name]), a3, b3);
    }
    function pong() {
      const x5 = Buffer.alloc(34);
      x5[0] = "r".charCodeAt(0);
      x5.fill(state2.lsn, 1);
      x5.writeBigInt64BE(BigInt(Date.now() - Date.UTC(2e3, 0, 1)) * BigInt(1e3), 25);
      stream2.write(x5);
    }
  }
  function call(x4, a3, b3) {
    subscribers.has(x4) && subscribers.get(x4).forEach(({ fn }) => fn(a3, b3, x4));
  }
}
function Time(x4) {
  return new Date(Date.UTC(2e3, 0, 1) + Number(x4 / BigInt(1e3)));
}
function parse(x4, state, parsers2, handle, transform) {
  const char = (acc, [k2, v3]) => (acc[k2.charCodeAt(0)] = v3, acc);
  Object.entries({
    R: (x5) => {
      let i2 = 1;
      const r2 = state[x5.readUInt32BE(i2)] = {
        schema: x5.toString("utf8", i2 += 4, i2 = x5.indexOf(0, i2)) || "pg_catalog",
        table: x5.toString("utf8", i2 + 1, i2 = x5.indexOf(0, i2 + 1)),
        columns: Array(x5.readUInt16BE(i2 += 2)),
        keys: []
      };
      i2 += 2;
      let columnIndex = 0, column;
      while (i2 < x5.length) {
        column = r2.columns[columnIndex++] = {
          key: x5[i2++],
          name: transform.column.from ? transform.column.from(x5.toString("utf8", i2, i2 = x5.indexOf(0, i2))) : x5.toString("utf8", i2, i2 = x5.indexOf(0, i2)),
          type: x5.readUInt32BE(i2 += 1),
          parser: parsers2[x5.readUInt32BE(i2)],
          atttypmod: x5.readUInt32BE(i2 += 4)
        };
        column.key && r2.keys.push(column);
        i2 += 4;
      }
    },
    Y: () => {
    },
    // Type
    O: () => {
    },
    // Origin
    B: (x5) => {
      state.date = Time(x5.readBigInt64BE(9));
      state.lsn = x5.subarray(1, 9);
    },
    I: (x5) => {
      let i2 = 1;
      const relation = state[x5.readUInt32BE(i2)];
      const { row } = tuples(x5, relation.columns, i2 += 7, transform);
      handle(row, {
        command: "insert",
        relation
      });
    },
    D: (x5) => {
      let i2 = 1;
      const relation = state[x5.readUInt32BE(i2)];
      i2 += 4;
      const key = x5[i2] === 75;
      handle(
        key || x5[i2] === 79 ? tuples(x5, relation.columns, i2 += 3, transform).row : null,
        {
          command: "delete",
          relation,
          key
        }
      );
    },
    U: (x5) => {
      let i2 = 1;
      const relation = state[x5.readUInt32BE(i2)];
      i2 += 4;
      const key = x5[i2] === 75;
      const xs = key || x5[i2] === 79 ? tuples(x5, relation.columns, i2 += 3, transform) : null;
      xs && (i2 = xs.i);
      const { row } = tuples(x5, relation.columns, i2 + 3, transform);
      handle(row, {
        command: "update",
        relation,
        key,
        old: xs && xs.row
      });
    },
    T: () => {
    },
    // Truncate,
    C: () => {
    }
    // Commit
  }).reduce(char, {})[x4[0]](x4);
}
function tuples(x4, columns, xi, transform) {
  let type, column, value;
  const row = transform.raw ? new Array(columns.length) : {};
  for (let i2 = 0; i2 < columns.length; i2++) {
    type = x4[xi++];
    column = columns[i2];
    value = type === 110 ? null : type === 117 ? void 0 : column.parser === void 0 ? x4.toString("utf8", xi + 4, xi += 4 + x4.readUInt32BE(xi)) : column.parser.array === true ? column.parser(x4.toString("utf8", xi + 5, xi += 4 + x4.readUInt32BE(xi))) : column.parser(x4.toString("utf8", xi + 4, xi += 4 + x4.readUInt32BE(xi)));
    transform.raw ? row[i2] = transform.raw === true ? value : transform.value.from ? transform.value.from(value, column) : value : row[column.name] = transform.value.from ? transform.value.from(value, column) : value;
  }
  return { i: xi, row: transform.row.from ? transform.row.from(row) : row };
}
function parseEvent(x4) {
  const xs = x4.match(/^(\*|insert|update|delete)?:?([^.]+?\.?[^=]+)?=?(.+)?/i) || [];
  if (!xs)
    throw new Error("Malformed subscribe pattern: " + x4);
  const [, command, path, key] = xs;
  return (command || "*") + (path ? ":" + (path.indexOf(".") === -1 ? "public." + path : path) : "") + (key ? "=" + key : "");
}

// ../../node_modules/postgres/src/large.js
import Stream2 from "stream";
function largeObject(sql, oid, mode = 131072 | 262144) {
  return new Promise(async (resolve, reject) => {
    await sql.begin(async (sql2) => {
      let finish;
      !oid && ([{ oid }] = await sql2`select lo_creat(-1) as oid`);
      const [{ fd }] = await sql2`select lo_open(${oid}, ${mode}) as fd`;
      const lo = {
        writable,
        readable,
        close: () => sql2`select lo_close(${fd})`.then(finish),
        tell: () => sql2`select lo_tell64(${fd})`,
        read: (x4) => sql2`select loread(${fd}, ${x4}) as data`,
        write: (x4) => sql2`select lowrite(${fd}, ${x4})`,
        truncate: (x4) => sql2`select lo_truncate64(${fd}, ${x4})`,
        seek: (x4, whence = 0) => sql2`select lo_lseek64(${fd}, ${x4}, ${whence})`,
        size: () => sql2`
          select
            lo_lseek64(${fd}, location, 0) as position,
            seek.size
          from (
            select
              lo_lseek64($1, 0, 2) as size,
              tell.location
            from (select lo_tell64($1) as location) tell
          ) seek
        `
      };
      resolve(lo);
      return new Promise(async (r2) => finish = r2);
      async function readable({
        highWaterMark = 2048 * 8,
        start = 0,
        end = Infinity
      } = {}) {
        let max = end - start;
        start && await lo.seek(start);
        return new Stream2.Readable({
          highWaterMark,
          async read(size2) {
            const l3 = size2 > max ? size2 - max : size2;
            max -= size2;
            const [{ data }] = await lo.read(l3);
            this.push(data);
            if (data.length < size2)
              this.push(null);
          }
        });
      }
      async function writable({
        highWaterMark = 2048 * 8,
        start = 0
      } = {}) {
        start && await lo.seek(start);
        return new Stream2.Writable({
          highWaterMark,
          write(chunk, encoding, callback) {
            lo.write(chunk).then(() => callback(), callback);
          }
        });
      }
    }).catch(reject);
  });
}

// ../../node_modules/postgres/src/index.js
Object.assign(Postgres, {
  PostgresError,
  toPascal,
  pascal,
  toCamel,
  camel,
  toKebab,
  kebab,
  fromPascal,
  fromCamel,
  fromKebab,
  BigInt: {
    to: 20,
    from: [20],
    parse: (x4) => BigInt(x4),
    // eslint-disable-line
    serialize: (x4) => x4.toString()
  }
});
var src_default = Postgres;
function Postgres(a3, b3) {
  const options = parseOptions(a3, b3), subscribe = options.no_subscribe || Subscribe(Postgres, { ...options });
  let ending = false;
  const queries = queue_default(), connecting = queue_default(), reserved = queue_default(), closed = queue_default(), ended = queue_default(), open = queue_default(), busy = queue_default(), full = queue_default(), queues = { connecting, reserved, closed, ended, open, busy, full };
  const connections = [...Array(options.max)].map(() => connection_default(options, queues, { onopen, onend, onclose }));
  const sql = Sql(handler2);
  Object.assign(sql, {
    get parameters() {
      return options.parameters;
    },
    largeObject: largeObject.bind(null, sql),
    subscribe,
    CLOSE,
    END: CLOSE,
    PostgresError,
    options,
    reserve,
    listen,
    begin,
    close,
    end
  });
  return sql;
  function Sql(handler3) {
    handler3.debug = options.debug;
    Object.entries(options.types).reduce((acc, [name, type]) => {
      acc[name] = (x4) => new Parameter(x4, type.to);
      return acc;
    }, typed);
    Object.assign(sql2, {
      types: typed,
      typed,
      unsafe,
      notify,
      array,
      json,
      file
    });
    return sql2;
    function typed(value, type) {
      return new Parameter(value, type);
    }
    function sql2(strings, ...args) {
      const query = strings && Array.isArray(strings.raw) ? new Query(strings, args, handler3, cancel) : typeof strings === "string" && !args.length ? new Identifier(options.transform.column.to ? options.transform.column.to(strings) : strings) : new Builder(strings, args);
      return query;
    }
    function unsafe(string, args = [], options2 = {}) {
      arguments.length === 2 && !Array.isArray(args) && (options2 = args, args = []);
      const query = new Query([string], args, handler3, cancel, {
        prepare: false,
        ...options2,
        simple: "simple" in options2 ? options2.simple : args.length === 0
      });
      return query;
    }
    function file(path, args = [], options2 = {}) {
      arguments.length === 2 && !Array.isArray(args) && (options2 = args, args = []);
      const query = new Query([], args, (query2) => {
        fs.readFile(path, "utf8", (err, string) => {
          if (err)
            return query2.reject(err);
          query2.strings = [string];
          handler3(query2);
        });
      }, cancel, {
        ...options2,
        simple: "simple" in options2 ? options2.simple : args.length === 0
      });
      return query;
    }
  }
  async function listen(name, fn, onlisten) {
    const listener = { fn, onlisten };
    const sql2 = listen.sql || (listen.sql = Postgres({
      ...options,
      max: 1,
      idle_timeout: null,
      max_lifetime: null,
      fetch_types: false,
      onclose() {
        Object.entries(listen.channels).forEach(([name2, { listeners }]) => {
          delete listen.channels[name2];
          Promise.all(listeners.map((l3) => listen(name2, l3.fn, l3.onlisten).catch(() => {
          })));
        });
      },
      onnotify(c3, x4) {
        c3 in listen.channels && listen.channels[c3].listeners.forEach((l3) => l3.fn(x4));
      }
    }));
    const channels = listen.channels || (listen.channels = {}), exists = name in channels;
    if (exists) {
      channels[name].listeners.push(listener);
      const result2 = await channels[name].result;
      listener.onlisten && listener.onlisten();
      return { state: result2.state, unlisten };
    }
    channels[name] = { result: sql2`listen ${sql2.unsafe('"' + name.replace(/"/g, '""') + '"')}`, listeners: [listener] };
    const result = await channels[name].result;
    listener.onlisten && listener.onlisten();
    return { state: result.state, unlisten };
    async function unlisten() {
      if (name in channels === false)
        return;
      channels[name].listeners = channels[name].listeners.filter((x4) => x4 !== listener);
      if (channels[name].listeners.length)
        return;
      delete channels[name];
      return sql2`unlisten ${sql2.unsafe('"' + name.replace(/"/g, '""') + '"')}`;
    }
  }
  async function notify(channel, payload) {
    return await sql`select pg_notify(${channel}, ${"" + payload})`;
  }
  async function reserve() {
    const queue2 = queue_default();
    const c3 = open.length ? open.shift() : await new Promise((resolve, reject) => {
      const query = { reserve: resolve, reject };
      queries.push(query);
      closed.length && connect(closed.shift(), query);
    });
    move(c3, reserved);
    c3.reserved = () => queue2.length ? c3.execute(queue2.shift()) : move(c3, reserved);
    c3.reserved.release = true;
    const sql2 = Sql(handler3);
    sql2.release = () => {
      c3.reserved = null;
      onopen(c3);
    };
    return sql2;
    function handler3(q3) {
      c3.queue === full ? queue2.push(q3) : c3.execute(q3) || move(c3, full);
    }
  }
  async function begin(options2, fn) {
    !fn && (fn = options2, options2 = "");
    const queries2 = queue_default();
    let savepoints = 0, connection2, prepare = null;
    try {
      await sql.unsafe("begin " + options2.replace(/[^a-z ]/ig, ""), [], { onexecute }).execute();
      return await Promise.race([
        scope(connection2, fn),
        new Promise((_2, reject) => connection2.onclose = reject)
      ]);
    } catch (error) {
      throw error;
    }
    async function scope(c3, fn2, name) {
      const sql2 = Sql(handler3);
      sql2.savepoint = savepoint;
      sql2.prepare = (x4) => prepare = x4.replace(/[^a-z0-9$-_. ]/gi);
      let uncaughtError, result;
      name && await sql2`savepoint ${sql2(name)}`;
      try {
        result = await new Promise((resolve, reject) => {
          const x4 = fn2(sql2);
          Promise.resolve(Array.isArray(x4) ? Promise.all(x4) : x4).then(resolve, reject);
        });
        if (uncaughtError)
          throw uncaughtError;
      } catch (e2) {
        await (name ? sql2`rollback to ${sql2(name)}` : sql2`rollback`);
        throw e2 instanceof PostgresError && e2.code === "25P02" && uncaughtError || e2;
      }
      if (!name) {
        prepare ? await sql2`prepare transaction '${sql2.unsafe(prepare)}'` : await sql2`commit`;
      }
      return result;
      function savepoint(name2, fn3) {
        if (name2 && Array.isArray(name2.raw))
          return savepoint((sql3) => sql3.apply(sql3, arguments));
        arguments.length === 1 && (fn3 = name2, name2 = null);
        return scope(c3, fn3, "s" + savepoints++ + (name2 ? "_" + name2 : ""));
      }
      function handler3(q3) {
        q3.catch((e2) => uncaughtError || (uncaughtError = e2));
        c3.queue === full ? queries2.push(q3) : c3.execute(q3) || move(c3, full);
      }
    }
    function onexecute(c3) {
      connection2 = c3;
      move(c3, reserved);
      c3.reserved = () => queries2.length ? c3.execute(queries2.shift()) : move(c3, reserved);
    }
  }
  function move(c3, queue2) {
    c3.queue.remove(c3);
    queue2.push(c3);
    c3.queue = queue2;
    queue2 === open ? c3.idleTimer.start() : c3.idleTimer.cancel();
    return c3;
  }
  function json(x4) {
    return new Parameter(x4, 3802);
  }
  function array(x4, type) {
    if (!Array.isArray(x4))
      return array(Array.from(arguments));
    return new Parameter(x4, type || (x4.length ? inferType(x4) || 25 : 0), options.shared.typeArrayMap);
  }
  function handler2(query) {
    if (ending)
      return query.reject(Errors.connection("CONNECTION_ENDED", options, options));
    if (open.length)
      return go(open.shift(), query);
    if (closed.length)
      return connect(closed.shift(), query);
    busy.length ? go(busy.shift(), query) : queries.push(query);
  }
  function go(c3, query) {
    return c3.execute(query) ? move(c3, busy) : move(c3, full);
  }
  function cancel(query) {
    return new Promise((resolve, reject) => {
      query.state ? query.active ? connection_default(options).cancel(query.state, resolve, reject) : query.cancelled = { resolve, reject } : (queries.remove(query), query.cancelled = true, query.reject(Errors.generic("57014", "canceling statement due to user request")), resolve());
    });
  }
  async function end({ timeout = null } = {}) {
    if (ending)
      return ending;
    await 1;
    let timer2;
    return ending = Promise.race([
      new Promise((r2) => timeout !== null && (timer2 = setTimeout(destroy, timeout * 1e3, r2))),
      Promise.all(connections.map((c3) => c3.end()).concat(
        listen.sql ? listen.sql.end({ timeout: 0 }) : [],
        subscribe.sql ? subscribe.sql.end({ timeout: 0 }) : []
      ))
    ]).then(() => clearTimeout(timer2));
  }
  async function close() {
    await Promise.all(connections.map((c3) => c3.end()));
  }
  async function destroy(resolve) {
    await Promise.all(connections.map((c3) => c3.terminate()));
    while (queries.length)
      queries.shift().reject(Errors.connection("CONNECTION_DESTROYED", options));
    resolve();
  }
  function connect(c3, query) {
    move(c3, connecting);
    c3.connect(query);
    return c3;
  }
  function onend(c3) {
    move(c3, ended);
  }
  function onopen(c3) {
    if (queries.length === 0)
      return move(c3, open);
    let max = Math.ceil(queries.length / (connecting.length + 1)), ready = true;
    while (ready && queries.length && max-- > 0) {
      const query = queries.shift();
      if (query.reserve)
        return query.reserve(c3);
      ready = c3.execute(query);
    }
    ready ? move(c3, busy) : move(c3, full);
  }
  function onclose(c3, e2) {
    move(c3, closed);
    c3.reserved = null;
    c3.onclose && (c3.onclose(e2), c3.onclose = null);
    options.onclose && options.onclose(c3.id);
    queries.length && connect(c3, queries.shift());
  }
}
function parseOptions(a3, b3) {
  if (a3 && a3.shared)
    return a3;
  const env = process.env, o2 = (!a3 || typeof a3 === "string" ? b3 : a3) || {}, { url, multihost } = parseUrl(a3), query = [...url.searchParams].reduce((a4, [b4, c3]) => (a4[b4] = c3, a4), {}), host = o2.hostname || o2.host || multihost || url.hostname || env.PGHOST || "localhost", port = o2.port || url.port || env.PGPORT || 5432, user = o2.user || o2.username || url.username || env.PGUSERNAME || env.PGUSER || osUsername();
  o2.no_prepare && (o2.prepare = false);
  query.sslmode && (query.ssl = query.sslmode, delete query.sslmode);
  "timeout" in o2 && (console.log("The timeout option is deprecated, use idle_timeout instead"), o2.idle_timeout = o2.timeout);
  query.sslrootcert === "system" && (query.ssl = "verify-full");
  const ints = ["idle_timeout", "connect_timeout", "max_lifetime", "max_pipeline", "backoff", "keep_alive"];
  const defaults = {
    max: globalThis.Cloudflare ? 3 : 10,
    ssl: false,
    sslnegotiation: null,
    idle_timeout: null,
    connect_timeout: 30,
    max_lifetime,
    max_pipeline: 100,
    backoff,
    keep_alive: 60,
    prepare: true,
    debug: false,
    fetch_types: true,
    publications: "alltables",
    target_session_attrs: null
  };
  return {
    host: Array.isArray(host) ? host : host.split(",").map((x4) => x4.split(":")[0]),
    port: Array.isArray(port) ? port : host.split(",").map((x4) => parseInt(x4.split(":")[1] || port)),
    path: o2.path || host.indexOf("/") > -1 && host + "/.s.PGSQL." + port,
    database: o2.database || o2.db || (url.pathname || "").slice(1) || env.PGDATABASE || user,
    user,
    pass: o2.pass || o2.password || url.password || env.PGPASSWORD || "",
    ...Object.entries(defaults).reduce(
      (acc, [k2, d4]) => {
        const value = k2 in o2 ? o2[k2] : k2 in query ? query[k2] === "disable" || query[k2] === "false" ? false : query[k2] : env["PG" + k2.toUpperCase()] || d4;
        acc[k2] = typeof value === "string" && ints.includes(k2) ? +value : value;
        return acc;
      },
      {}
    ),
    connection: {
      application_name: env.PGAPPNAME || "postgres.js",
      ...o2.connection,
      ...Object.entries(query).reduce((acc, [k2, v3]) => (k2 in defaults || (acc[k2] = v3), acc), {})
    },
    types: o2.types || {},
    target_session_attrs: tsa(o2, url, env),
    onnotice: o2.onnotice,
    onnotify: o2.onnotify,
    onclose: o2.onclose,
    onparameter: o2.onparameter,
    socket: o2.socket,
    transform: parseTransform(o2.transform || { undefined: void 0 }),
    parameters: {},
    shared: { retries: 0, typeArrayMap: {} },
    ...mergeUserTypes(o2.types)
  };
}
function tsa(o2, url, env) {
  const x4 = o2.target_session_attrs || url.searchParams.get("target_session_attrs") || env.PGTARGETSESSIONATTRS;
  if (!x4 || ["read-write", "read-only", "primary", "standby", "prefer-standby"].includes(x4))
    return x4;
  throw new Error("target_session_attrs " + x4 + " is not supported");
}
function backoff(retries) {
  return (0.5 + Math.random() / 2) * Math.min(3 ** retries / 100, 20);
}
function max_lifetime() {
  return 60 * (30 + Math.random() * 30);
}
function parseTransform(x4) {
  return {
    undefined: x4.undefined,
    column: {
      from: typeof x4.column === "function" ? x4.column : x4.column && x4.column.from,
      to: x4.column && x4.column.to
    },
    value: {
      from: typeof x4.value === "function" ? x4.value : x4.value && x4.value.from,
      to: x4.value && x4.value.to
    },
    row: {
      from: typeof x4.row === "function" ? x4.row : x4.row && x4.row.from,
      to: x4.row && x4.row.to
    }
  };
}
function parseUrl(url) {
  if (!url || typeof url !== "string")
    return { url: { searchParams: /* @__PURE__ */ new Map() } };
  let host = url;
  host = host.slice(host.indexOf("://") + 3).split(/[?/]/)[0];
  host = decodeURIComponent(host.slice(host.indexOf("@") + 1));
  const urlObj = new URL(url.replace(host, host.split(",")[0]));
  return {
    url: {
      username: decodeURIComponent(urlObj.username),
      password: decodeURIComponent(urlObj.password),
      host: urlObj.host,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      searchParams: urlObj.searchParams
    },
    multihost: host.indexOf(",") > -1 && host
  };
}
function osUsername() {
  try {
    return os.userInfo().username;
  } catch (_2) {
    return process.env.USERNAME || process.env.USER || process.env.LOGNAME;
  }
}

// ../../node_modules/@nightx.co/pulsar-client/dist/chunk-gzzjd4hw.js
var import_ioredis = __toESM(require_built3(), 1);
import QY from "node:crypto";
var YY = class {
  options;
  type = "database";
  name = "PostgresDriver";
  sql;
  isConnected = false;
  prefix;
  logger;
  constructor($3) {
    this.options = $3;
    this.logger = new s();
  }
  initClient() {
    if (this.isConnected) return;
    this.sql = src_default(this.options.connectionString, { prepare: false }), this.isConnected = true;
  }
  setKeyPrefix($3) {
    this.prefix = $3;
  }
  async connect() {
    if (!this.isConnected) {
      this.initClient();
      try {
        await this.sql`SELECT 1`, this.logger.log(`[PostgresDriver] : Pool connected with : ${this.options.connectionProtocol ?? "TCP"}`);
      } catch ($3) {
        throw this.logger.log("[PostgresDriver] : Health check failed:", $3), $3;
      }
    }
  }
  async disconnect() {
    if (this.isConnected) await this.sql.end(), this.isConnected = false, this.logger.log("[PostgresDriver] : Pool disconnected.");
  }
  async healthCheck() {
    let $3 = Date.now();
    try {
      if (!this.isConnected) throw Error("Connection pool is closed.");
      return await this.sql`SELECT 1`, { status: "up", latencyMs: Date.now() - $3 };
    } catch (Y) {
      return { status: "down", latencyMs: Date.now() - $3, details: { error: Y.message } };
    }
  }
  getNativeClient() {
    if (!this.sql) throw Error("[PostgresDriver] : Client is not initialized. Call connect() first.");
    return this.sql;
  }
  async close() {
    await this.disconnect();
  }
};
var q2 = QY.webcrypto?.subtle || {};
var WY = Object.defineProperty;
var TY = ($3, Y) => {
  for (var Q2 in Y) WY($3, Q2, { get: Y[Q2], enumerable: true });
};
var i = {};
TY(i, { UpstashError: () => H, UpstashJSONParseError: () => h2, UrlError: () => g });
var H = class extends Error {
  constructor($3, Y) {
    super($3, Y);
    this.name = "UpstashError";
  }
};
var g = class extends Error {
  constructor($3) {
    super(`Upstash Redis client was passed an invalid URL. You should pass a URL starting with https. Received: "${$3}". `);
    this.name = "UrlError";
  }
};
var h2 = class extends H {
  constructor($3, Y) {
    let Q2 = $3.length > 200 ? $3.slice(0, 200) + "..." : $3;
    super(`Unable to parse response body: ${Q2}`, Y);
    this.name = "UpstashJSONParseError";
  }
};
function N($3) {
  return JSON.parse(c2($3));
}
function c2($3) {
  return typeof $3 === "string" && $3.startsWith("\uFEFF") ? $3.slice(1) : $3;
}
function p2($3) {
  let Y = Array.isArray($3) ? $3.map((Q2) => {
    try {
      return p2(Q2);
    } catch {
      return Q2;
    }
  }) : N($3);
  if (typeof Y === "number" && Y.toString() !== c2($3)) return $3;
  return Y;
}
function E($3) {
  try {
    return p2($3);
  } catch {
    return $3;
  }
}
function B($3) {
  return [$3[0], ...E($3.slice(1))];
}
function zY($3) {
  let [Y, Q2] = $3, W = [];
  for (let T2 = 0; T2 < Q2.length; T2 += 2) W.push({ key: Q2[T2], type: Q2[T2 + 1] });
  return [Y, W];
}
function VY(...$3) {
  let Y = {};
  for (let Q2 of $3) {
    if (!Q2) continue;
    for (let [W, T2] of Object.entries(Q2)) if (T2 !== void 0 && T2 !== null) Y[W] = T2;
  }
  return Y;
}
function J($3) {
  if (typeof $3 === "object" && $3 !== null && !Array.isArray($3)) return $3;
  if (!Array.isArray($3)) return {};
  let Y = {};
  for (let Q2 = 0; Q2 < $3.length; Q2 += 2) if (typeof $3[Q2] === "string") Y[$3[Q2]] = $3[Q2 + 1];
  return Y;
}
var UY = 1048576;
var n = class {
  baseUrl;
  headers;
  options;
  readYourWrites;
  upstashSyncToken = "";
  hasCredentials;
  retry;
  constructor($3) {
    this.options = { backend: $3.options?.backend, agent: $3.agent, responseEncoding: $3.responseEncoding ?? false, cache: $3.cache, signal: $3.signal, keepAlive: $3.keepAlive ?? true }, this.upstashSyncToken = "", this.readYourWrites = $3.readYourWrites ?? true, this.baseUrl = ($3.baseUrl || "").replace(/\/$/, "");
    let Y = /^https?:\/\/[^\s#$./?].\S*$/;
    if (this.baseUrl && !Y.test(this.baseUrl)) throw new g(this.baseUrl);
    if (this.headers = { "Content-Type": "application/json", ...$3.headers }, this.hasCredentials = Boolean(this.baseUrl && this.headers.authorization.split(" ")[1]), this.options.responseEncoding === "base64") this.headers["Upstash-Encoding"] = "base64";
    this.retry = typeof $3.retry === "boolean" && !$3.retry ? { attempts: 1, backoff: () => 0 } : { attempts: $3.retry?.retries ?? 5, backoff: $3.retry?.backoff ?? ((Q2) => Math.exp(Q2) * 50) };
  }
  mergeTelemetry($3) {
    this.headers = P2(this.headers, "Upstash-Telemetry-Runtime", $3.runtime), this.headers = P2(this.headers, "Upstash-Telemetry-Platform", $3.platform), this.headers = P2(this.headers, "Upstash-Telemetry-Sdk", $3.sdk);
  }
  async request($3) {
    if (this.readYourWrites) this.headers["upstash-sync-token"] = this.upstashSyncToken;
    let Y = VY(this.headers, $3.headers ?? {}), Q2 = [this.baseUrl, ...$3.path ?? []].join("/"), W = Y.Accept === "text/event-stream", T2 = $3.signal ?? this.options.signal, V = typeof T2 === "function", U2 = { cache: this.options.cache, method: "POST", headers: Y, body: JSON.stringify($3.body), keepalive: this.options.keepAlive, agent: this.options.agent, signal: V ? T2() : T2, backend: this.options.backend };
    if (!this.hasCredentials) console.warn("[Upstash Redis] Redis client was initialized without url or token. Failed to execute command.");
    let M2 = null, D = null;
    for (let Z2 = 0; Z2 <= this.retry.attempts; Z2++) {
      if (Z2 > 0 && Y["Upstash-Telemetry-Sdk"]) Y["Upstash-Telemetry-Retry"] = String(Z2);
      try {
        M2 = await fetch(Q2, U2);
        break;
      } catch (L2) {
        if (U2.signal?.aborted && V) throw L2;
        else if (U2.signal?.aborted) {
          let w2 = U2.signal.reason, I = new Blob([JSON.stringify({ result: w2 instanceof Error ? null : w2 ?? null })]);
          M2 = new Response(I, { status: 200, statusText: "Aborted" });
          break;
        }
        if (D = L2, Z2 < this.retry.attempts) await new Promise((w2) => setTimeout(w2, this.retry.backoff(Z2)));
      }
    }
    if (!M2) throw D ?? Error("Exhausted all retries");
    if (!M2.ok) {
      let Z2, L2 = await M2.text();
      try {
        Z2 = JSON.parse(L2);
      } catch (w2) {
        throw new h2(L2, { cause: w2 });
      }
      throw new H(`${Z2.error}, command was: ${JSON.stringify($3.body)}`);
    }
    if (this.readYourWrites) {
      let Z2 = M2.headers;
      this.upstashSyncToken = Z2.get("upstash-sync-token") ?? "";
    }
    if (W && $3 && $3.onMessage && M2.body) {
      let Z2 = M2.body.getReader(), L2 = new TextDecoder();
      return (async () => {
        try {
          let w2 = "";
          while (true) {
            let { value: I, done: O2 } = await Z2.read();
            if (O2) break;
            w2 += L2.decode(I, { stream: true });
            let b3 = w2.split(`
`);
            if (w2 = b3.pop() || "", w2.length > UY) throw Error("Buffer size exceeded (1MB)");
            for (let v3 of b3) if (v3.startsWith("data: ")) {
              let s9 = v3.slice(6);
              $3.onMessage?.(s9);
            }
          }
        } catch (w2) {
          if (w2 instanceof Error && w2.name === "AbortError") ;
          else console.error("Stream reading error:", w2);
        } finally {
          try {
            await Z2.cancel();
          } catch {
          }
        }
      })(), { result: 1 };
    }
    let G, X = await M2.text();
    try {
      G = JSON.parse(X);
    } catch (Z2) {
      throw new h2(X, { cause: Z2 });
    }
    if (this.readYourWrites) {
      let Z2 = M2.headers;
      this.upstashSyncToken = Z2.get("upstash-sync-token") ?? "";
    }
    if (this.options.responseEncoding === "base64") {
      if (Array.isArray(G)) return G.map(({ result: L2, error: w2 }) => ({ result: A(L2), error: w2 }));
      return { result: A(G.result), error: G.error };
    }
    return G;
  }
};
function f2($3) {
  let Y = "";
  try {
    let Q2 = atob($3), W = Q2.length, T2 = new Uint8Array(W);
    for (let V = 0; V < W; V++) T2[V] = Q2.charCodeAt(V);
    Y = new TextDecoder().decode(T2);
  } catch {
    Y = $3;
  }
  return Y;
}
function A($3) {
  let Y = void 0;
  switch (typeof $3) {
    case "undefined":
      return $3;
    case "number": {
      Y = $3;
      break;
    }
    case "object": {
      if (Array.isArray($3)) Y = $3.map((Q2) => typeof Q2 === "string" ? f2(Q2) : Array.isArray(Q2) ? Q2.map((W) => A(W)) : Q2);
      else Y = null;
      break;
    }
    case "string": {
      Y = $3 === "OK" ? "OK" : f2($3);
      break;
    }
    default:
      break;
  }
  return Y;
}
function P2($3, Y, Q2) {
  if (!Q2) return $3;
  if (!$3[Y]) return $3[Y] = Q2, $3;
  if (!$3[Y].split(",").map((T2) => T2.trim()).includes(Q2.trim())) $3[Y] = [$3[Y], Q2].join(",");
  return $3;
}
var MY = ($3) => {
  switch (typeof $3) {
    case "string":
    case "number":
    case "boolean":
      return $3;
    default:
      return JSON.stringify($3);
  }
};
var z = class {
  command;
  serialize;
  deserialize;
  headers;
  path;
  onMessage;
  isStreaming;
  signal;
  constructor($3, Y) {
    if (this.serialize = MY, this.deserialize = Y?.automaticDeserialization === void 0 || Y.automaticDeserialization ? Y?.deserialize ?? E : (Q2) => Q2, this.command = $3.map((Q2) => this.serialize(Q2)), this.headers = Y?.headers, this.path = Y?.path, this.onMessage = Y?.streamOptions?.onMessage, this.isStreaming = Y?.streamOptions?.isStreaming ?? false, this.signal = Y?.streamOptions?.signal, Y?.latencyLogging) {
      let Q2 = this.exec.bind(this);
      this.exec = async (W) => {
        let T2 = performance.now(), V = await Q2(W), M2 = (performance.now() - T2).toFixed(2);
        return console.log(`Latency for \x1B[38;2;19;185;39m${this.command[0].toString().toUpperCase()}\x1B[0m: \x1B[38;2;0;255;255m${M2} ms\x1B[0m`), V;
      };
    }
  }
  async exec($3) {
    let { result: Y, error: Q2 } = await $3.request({ body: this.command, path: this.path, upstashSyncToken: $3.upstashSyncToken, headers: this.headers, onMessage: this.onMessage, isStreaming: this.isStreaming, signal: this.signal });
    if (Q2) throw new H(Q2);
    if (Y === void 0) throw TypeError("Request did not return a result");
    return this.deserialize(Y);
  }
};
var _ = class extends z {
  constructor($3, Y) {
    let Q2 = $3.map((W) => typeof W === "string" ? W : String(W));
    super(Q2, Y);
  }
};
var DY = ["TEXT", "U64", "I64", "F64", "BOOL", "DATE", "KEYWORD", "FACET", "HYBRID"];
function t($3) {
  return typeof $3 === "string" && DY.includes($3);
}
function d2($3) {
  return typeof $3 === "object" && $3 !== null && "type" in $3 && t($3.type);
}
function GY($3) {
  return typeof $3 === "object" && $3 !== null && !d2($3);
}
function r($3, Y = []) {
  let Q2 = [];
  for (let [W, T2] of Object.entries($3)) {
    let V = [...Y, W], U2 = V.join(".");
    if (t(T2)) Q2.push({ path: U2, type: T2 });
    else if (d2(T2)) Q2.push({ path: U2, type: T2.type, fast: "fast" in T2 ? T2.fast : void 0, noTokenize: "noTokenize" in T2 ? T2.noTokenize : void 0, noStem: "noStem" in T2 ? T2.noStem : void 0, from: "from" in T2 ? T2.from : void 0 });
    else if (GY(T2)) {
      let M2 = r(T2, V);
      Q2.push(...M2);
    }
  }
  return Q2;
}
function ZY($3) {
  return $3.map((Y) => {
    let Q2 = Y, W = Q2[0], T2 = Number(Q2[1]), V = Q2[2];
    if (V === void 0) return { key: W, score: T2 };
    if (!Array.isArray(V) || V.length === 0) return { key: W, score: T2, data: {} };
    let U2 = {};
    for (let M2 of V) {
      let D = M2[0], G = M2[1], X = D.split(".");
      if (X.length === 1) U2[D] = G;
      else {
        let Z2 = U2;
        for (let L2 = 0; L2 < X.length - 1; L2++) {
          let w2 = X[L2];
          if (!(w2 in Z2)) Z2[w2] = {};
          Z2 = Z2[w2];
        }
        Z2[X.at(-1)] = G;
      }
    }
    if ("$" in U2) U2 = U2.$;
    return { key: W, score: T2, data: U2 };
  });
}
function XY($3) {
  let Y = {};
  for (let Q2 = 0; Q2 < $3.length; Q2 += 2) switch ($3[Q2]) {
    case "name": {
      Y.name = $3[Q2 + 1];
      break;
    }
    case "type": {
      Y.dataType = $3[Q2 + 1].toLowerCase();
      break;
    }
    case "prefixes": {
      Y.prefixes = $3[Q2 + 1];
      break;
    }
    case "language": {
      Y.language = $3[Q2 + 1];
      break;
    }
    case "schema": {
      let T2 = {};
      for (let V of $3[Q2 + 1]) {
        let U2 = V[0], M2 = { type: V[1] };
        if (V.length > 2) for (let D = 2; D < V.length; D++) switch (V[D]) {
          case "NOSTEM": {
            M2.noStem = true;
            break;
          }
          case "NOTOKENIZE": {
            M2.noTokenize = true;
            break;
          }
          case "FAST": {
            M2.fast = true;
            break;
          }
          case "FROM": {
            M2.from = V[++D];
            break;
          }
        }
        T2[U2] = M2;
      }
      Y.schema = T2;
      break;
    }
  }
  return Y;
}
function wY($3) {
  return typeof $3 === "number" ? $3 : Number.parseInt($3, 10);
}
function LY($3) {
  return e($3);
}
function e($3) {
  let Y = {};
  for (let Q2 = 0; Q2 < $3.length; Q2 += 2) {
    let W = $3[Q2], T2 = $3[Q2 + 1];
    if (Array.isArray(T2)) if (T2.length > 0 && typeof T2[0] === "string") Y[W] = T2[0] === "buckets" ? NY(T2) : F(T2);
    else Y[W] = e(T2);
    else Y[W] = T2;
  }
  return Y;
}
function _Y($3) {
  if (typeof $3 === "string" && $3 !== "" && !Number.isNaN(Number($3))) return Number($3);
  return $3;
}
function F($3) {
  let Y = {};
  for (let Q2 = 0; Q2 < $3.length; Q2 += 2) {
    let W = $3[Q2], T2 = $3[Q2 + 1];
    if (Array.isArray(T2) && T2.length > 0) if (typeof T2[0] === "string") Y[W] = F(T2);
    else if (Array.isArray(T2[0]) && typeof T2[0][0] === "string") Y[W] = T2.map((V) => F(V));
    else Y[W] = T2;
    else Y[W] = _Y(T2);
  }
  return Y;
}
function NY($3) {
  if ($3[0] === "buckets" && Array.isArray($3[1])) {
    let Y = { buckets: $3[1].map((Q2) => {
      let W = {};
      for (let T2 = 0; T2 < Q2.length; T2 += 2) {
        let V = Q2[T2], U2 = Q2[T2 + 1];
        W[V] = Array.isArray(U2) && U2.length > 0 && typeof U2[0] === "string" ? F(U2) : U2;
      }
      return W;
    }) };
    for (let Q2 = 2; Q2 < $3.length; Q2 += 2) Y[$3[Q2]] = $3[Q2 + 1];
    return Y;
  }
  return $3;
}
function k($3, Y, Q2) {
  let W = JSON.stringify(Q2?.filter ?? {}), T2 = [$3, Y, W];
  if (Q2?.limit !== void 0) T2.push("LIMIT", Q2.limit.toString());
  if (Q2?.offset !== void 0) T2.push("OFFSET", Q2.offset.toString());
  if (Q2?.select && Object.keys(Q2.select).length === 0) T2.push("NOCONTENT");
  if (Q2) {
    if ("orderBy" in Q2 && Q2.orderBy) {
      T2.push("ORDERBY");
      for (let [V, U2] of Object.entries(Q2.orderBy)) T2.push(V, U2);
    } else if ("scoreFunc" in Q2 && Q2.scoreFunc) T2.push("SCOREFUNC", ...HY(Q2.scoreFunc));
  }
  if (Q2?.highlight) {
    if (T2.push("HIGHLIGHT", "FIELDS", Q2.highlight.fields.length.toString(), ...Q2.highlight.fields), Q2.highlight.preTag && Q2.highlight.postTag) T2.push("TAGS", Q2.highlight.preTag, Q2.highlight.postTag);
  }
  if (Q2?.select && Object.keys(Q2.select).length > 0) T2.push("SELECT", Object.keys(Q2.select).length.toString(), ...Object.keys(Q2.select));
  return T2;
}
function HY($3) {
  let Y = [];
  if (typeof $3 === "string") Y.push("FIELDVALUE", $3);
  else if ("fields" in $3) {
    if ($3.combineMode) Y.push("COMBINEMODE", $3.combineMode.toUpperCase());
    if ($3.scoreMode) Y.push("SCOREMODE", $3.scoreMode.toUpperCase());
    for (let Q2 of $3.fields) Y.push(...y2(Q2));
  } else Y.push(...y2($3));
  return Y;
}
function y2($3) {
  let Y = [];
  if (typeof $3 === "string") Y.push("FIELDVALUE", $3);
  else {
    if ($3.scoreMode) Y.push("SCOREMODE", $3.scoreMode.toUpperCase());
    if (Y.push("FIELDVALUE", $3.field), $3.modifier) Y.push("MODIFIER", $3.modifier.toUpperCase());
    if ($3.factor !== void 0) Y.push("FACTOR", $3.factor.toString());
    if ($3.missing !== void 0) Y.push("MISSING", $3.missing.toString());
  }
  return Y;
}
function JY($3) {
  let { name: Y, schema: Q2, dataType: W, language: T2, skipInitialScan: V, existsOk: U2 } = $3, M2;
  if ($3.dataType === "stream") M2 = ["ON", "STREAM", $3.stream];
  else {
    let X = Array.isArray($3.prefix) ? $3.prefix : [$3.prefix];
    M2 = ["ON", W.toUpperCase(), "PREFIX", X.length.toString(), ...X];
  }
  let D = [Y, ...V ? ["SKIPINITIALSCAN"] : [], ...U2 ? ["EXISTSOK"] : [], ...M2, ...T2 ? ["LANGUAGE", T2] : [], "SCHEMA"], G = r(Q2);
  for (let X of G) {
    if (D.push(X.path, X.type), X.fast) D.push("FAST");
    if (X.noTokenize) D.push("NOTOKENIZE");
    if (X.noStem) D.push("NOSTEM");
    if (X.from) D.push("FROM", X.from);
  }
  return ["SEARCH.CREATE", ...D];
}
function KY($3, Y) {
  let Q2 = JSON.stringify(Y?.filter ?? {}), W = JSON.stringify(Y.aggregations);
  return ["SEARCH.AGGREGATE", $3, Q2, W];
}
var o = class {
  name;
  schema;
  client;
  constructor({ name: $3, schema: Y, client: Q2 }) {
    this.name = $3, this.schema = Y, this.client = Q2;
  }
  async waitIndexing() {
    let $3 = ["SEARCH.WAITINDEXING", this.name];
    return await new _($3).exec(this.client);
  }
  async describe() {
    let $3 = ["SEARCH.DESCRIBE", this.name], Y = await new _($3).exec(this.client);
    if (!Y) return null;
    return XY(Y);
  }
  async query($3) {
    let Y = k("SEARCH.QUERY", this.name, $3), Q2 = await new _(Y).exec(this.client);
    if (!Q2) return Q2;
    return ZY(Q2);
  }
  async aggregate($3) {
    let Y = KY(this.name, $3), Q2 = await new _(Y).exec(this.client);
    return LY(Q2);
  }
  async count({ filter: $3 }) {
    let Y = k("SEARCH.COUNT", this.name, { filter: $3 }), Q2 = await new _(Y).exec(this.client);
    return { count: wY(Q2) };
  }
  async drop() {
    let $3 = ["SEARCH.DROP", this.name];
    return await new _($3).exec(this.client);
  }
  async addAlias({ alias: $3 }) {
    let Y = ["SEARCH.ALIASADD", $3, this.name];
    return await new _(Y).exec(this.client);
  }
};
async function qY($3, Y) {
  let { name: Q2, schema: W } = Y, T2 = JY(Y);
  return await new _(T2).exec($3), m2($3, { name: Q2, schema: W });
}
function m2($3, Y) {
  let { name: Q2, schema: W } = Y;
  return new o({ name: Q2, schema: W, client: $3 });
}
async function FY($3) {
  let Q2 = await new _(["SEARCH.LISTALIASES"]).exec($3);
  if (Q2 === 0 || Array.isArray(Q2) && Q2.length === 0) return {};
  if (!Array.isArray(Q2)) return {};
  let W = {};
  for (let T2 of Q2) if (Array.isArray(T2) && T2.length === 2) {
    let [V, U2] = T2;
    W[V] = U2;
  }
  return W;
}
async function jY($3, { indexName: Y, alias: Q2 }) {
  return await new _(["SEARCH.ALIASADD", Q2, Y]).exec($3);
}
async function EY($3, { alias: Y }) {
  return await new _(["SEARCH.ALIASDEL", Y]).exec($3);
}
function BY($3) {
  let Y = new Uint8Array($3.length * 4), Q2 = new DataView(Y.buffer);
  for (let [V, U2] of $3.entries()) Q2.setFloat32(V * 4, U2, true);
  let W = "", T2 = 32768;
  for (let V = 0; V < Y.length; V += T2) W += String.fromCodePoint(...Y.subarray(V, V + T2));
  return btoa(W);
}
function a($3) {
  if (Array.isArray($3)) return ["VALUES", $3.length, ...$3];
  if ($3 instanceof Float32Array) return ["BASE64-FP32", BY($3)];
  return ["BASE64-FP32", $3.base64];
}
function IY($3) {
  if ($3 === null) return null;
  return $3.map(Number);
}
function PY($3) {
  return $3.map(([Y, Q2]) => ({ id: String(Y), score: Number(Q2) }));
}
function hY($3) {
  if ($3 === null) return null;
  let Y = Array.isArray($3) ? Object.fromEntries(Array.from({ length: Math.floor($3.length / 2) }, (Q2, W) => [String($3[W * 2]), $3[W * 2 + 1]])) : $3;
  return { dimension: Number(Y.dimension), metric: String(Y.metric).toUpperCase() };
}
var AY = class extends z {
  constructor([$3, Y, Q2], W) {
    super(["VECTOR.ADD", $3, Y, ...a(Q2)], W);
  }
};
var SY = class extends z {
  constructor([$3], Y) {
    super(["VECTOR.COUNT", $3], Y);
  }
};
var xY = class extends z {
  constructor([$3, Y], Q2) {
    let W = ["VECTOR.CREATE", $3, "DIM", Y.dimension, "METRIC", Y.metric];
    if (Y.existsOk) W.push("EXISTSOK");
    super(W, Q2);
  }
};
var RY = class extends z {
  constructor([$3, Y], Q2) {
    super(["VECTOR.DEL", $3, Y], Q2);
  }
};
var OY = class extends z {
  constructor([$3], Y) {
    super(["VECTOR.DROP", $3], Y);
  }
};
var bY = class extends z {
  constructor([$3, Y], Q2) {
    super(["VECTOR.GET", $3, Y], { deserialize: IY, ...Q2 });
  }
};
var vY = class extends z {
  constructor([$3], Y) {
    super(["VECTOR.INFO", $3], { deserialize: hY, ...Y });
  }
};
var fY = class extends z {
  constructor([$3, Y], Q2) {
    let W = ["VECTOR.QUERY", $3, "TOPK", Y.topK];
    if (Y.profile) W.push("PROFILE", Y.profile);
    W.push(...a(Y.vector));
    super(W, { deserialize: PY, ...Q2 });
  }
};
var x2 = class {
  name;
  client;
  commandOptions;
  constructor({ name: $3, client: Y, commandOptions: Q2 }) {
    this.name = $3, this.client = Y, this.commandOptions = Q2;
  }
  add($3, Y) {
    return new AY([this.name, $3, Y], this.commandOptions).exec(this.client);
  }
  get($3) {
    return new bY([this.name, $3], this.commandOptions).exec(this.client);
  }
  query($3) {
    return new fY([this.name, $3], this.commandOptions).exec(this.client);
  }
  delete($3) {
    return new RY([this.name, $3], this.commandOptions).exec(this.client);
  }
  count() {
    return new SY([this.name], this.commandOptions).exec(this.client);
  }
  info() {
    return new vY([this.name], this.commandOptions).exec(this.client);
  }
  drop() {
    return new OY([this.name], this.commandOptions).exec(this.client);
  }
};
async function kY($3, { name: Y, ...Q2 }, W) {
  return await new xY([Y, Q2], W).exec($3), new x2({ name: Y, client: $3, commandOptions: W });
}
function yY($3, Y, Q2) {
  return new x2({ name: Y, client: $3, commandOptions: Q2 });
}
function CY($3) {
  if ($3.length === 0) return null;
  let Y = {};
  for (let Q2 = 0; Q2 < $3.length; Q2 += 2) {
    let W = $3[Q2], T2 = $3[Q2 + 1];
    try {
      Y[W] = N(T2);
    } catch {
      Y[W] = T2;
    }
  }
  return Y;
}
var s2 = class extends z {
  constructor($3, Y) {
    let Q2 = ["hrandfield", $3[0]];
    if (typeof $3[1] === "number") Q2.push($3[1]);
    if ($3[2]) Q2.push("WITHVALUES");
    super(Q2, { deserialize: $3[2] ? (W) => CY(W) : Y?.deserialize, ...Y });
  }
};
var $1 = class extends z {
  constructor($3, Y) {
    super(["append", ...$3], Y);
  }
};
var Y1 = class extends z {
  constructor($3, Y) {
    super(["ARCOUNT", ...$3], Y);
  }
};
var Q1 = class extends z {
  constructor($3, Y) {
    super(["ARDEL", ...$3], Y);
  }
};
var W1 = class extends z {
  constructor([$3, ...Y], Q2) {
    super(["ARDELRANGE", $3, ...Y.flat()], Q2);
  }
};
var T1 = class extends z {
  constructor($3, Y) {
    super(["ARGET", ...$3], Y);
  }
};
var z1 = class extends z {
  constructor($3, Y) {
    super(["ARGETRANGE", ...$3], Y);
  }
};
var V1 = class extends z {
  constructor([$3, Y, Q2, W], T2) {
    let V = ["ARGREP", $3, Y, Q2];
    for (let U2 of W.predicates) if ("exact" in U2) V.push("EXACT", U2.exact);
    else if ("match" in U2) V.push("MATCH", U2.match);
    else if ("glob" in U2) V.push("GLOB", U2.glob);
    else V.push("RE", U2.re);
    if (W.combine) V.push(W.combine.toUpperCase());
    if (W.noCase) V.push("NOCASE");
    if (W.withValues) V.push("WITHVALUES");
    if (W.limit !== void 0) V.push("LIMIT", W.limit);
    super(V, { deserialize: (U2) => E(U2).map((M2) => Array.isArray(M2) ? [String(M2[0]), M2[1]] : String(M2)), ...T2 });
  }
};
function uY($3) {
  return $3.replaceAll(/-([a-z])/g, (Y, Q2) => Q2.toUpperCase());
}
function lY($3) {
  let Y = Array.isArray($3) ? Array.from({ length: Math.floor($3.length / 2) }, (T2, V) => [$3[V * 2], $3[V * 2 + 1]]) : Object.entries($3), Q2 = /* @__PURE__ */ new Set(["len", "nextInsertIndex"]), W = {};
  for (let [T2, V] of Y) {
    let U2 = uY(String(T2));
    if (Q2.has(U2)) {
      W[U2] = String(V);
      continue;
    }
    let M2 = typeof V === "number" ? V : Number(V);
    W[U2] = Number.isNaN(M2) ? V : M2;
  }
  return W;
}
var U1 = class extends z {
  constructor([$3, Y], Q2) {
    let W = ["ARINFO", $3];
    if (Y?.full) W.push("FULL");
    super(W, { deserialize: lY, ...Q2 });
  }
};
var M1 = class extends z {
  constructor($3, Y) {
    super(["ARINSERT", ...$3], { deserialize: String, ...Y });
  }
};
var D1 = class extends z {
  constructor([$3, Y, Q2], W) {
    let T2 = ["ARLASTITEMS", $3, Y];
    if (Q2?.rev) T2.push("REV");
    super(T2, W);
  }
};
var G1 = class extends z {
  constructor($3, Y) {
    super(["ARLEN", ...$3], { deserialize: String, ...Y });
  }
};
var Z1 = class extends z {
  constructor($3, Y) {
    super(["ARMGET", ...$3], Y);
  }
};
var X1 = class extends z {
  constructor([$3, Y], Q2) {
    let W = Array.isArray(Y) ? Y : Object.entries(Y);
    super(["ARMSET", $3, ...W.flatMap(([T2, V]) => [T2, V])], Q2);
  }
};
var w1 = class extends z {
  constructor($3, Y) {
    super(["ARNEXT", ...$3], { deserialize: (Q2) => Q2 === null ? null : String(Q2), ...Y });
  }
};
var L1 = class extends z {
  constructor([$3, Y, Q2, W], T2) {
    let V = ["AROP", $3, Y, Q2];
    if (typeof W === "string") V.push(W.toUpperCase());
    else V.push("MATCH", W.match);
    super(V, { deserialize: (U2) => U2 === null ? null : Number(U2), ...T2 });
  }
};
var _1 = class extends z {
  constructor($3, Y) {
    super(["ARRING", ...$3], { deserialize: String, ...Y });
  }
};
var N1 = class extends z {
  constructor([$3, Y, Q2, W], T2) {
    let V = ["ARSCAN", $3, Y, Q2];
    if (W?.limit !== void 0) V.push("LIMIT", W.limit);
    super(V, { deserialize: (U2) => E(U2).map(([M2, D]) => [String(M2), D]), ...T2 });
  }
};
var H1 = class extends z {
  constructor($3, Y) {
    super(["ARSEEK", ...$3], Y);
  }
};
var J1 = class extends z {
  constructor($3, Y) {
    super(["ARSET", ...$3], Y);
  }
};
var K1 = class extends z {
  constructor([$3, Y, Q2], W) {
    let T2 = ["bitcount", $3];
    if (typeof Y === "number") T2.push(Y);
    if (typeof Q2 === "number") T2.push(Q2);
    super(T2, W);
  }
};
var q1 = class {
  constructor($3, Y, Q2, W = (T2) => T2.exec(this.client)) {
    this.client = Y, this.opts = Q2, this.execOperation = W, this.command = ["bitfield", ...$3];
  }
  command;
  chain(...$3) {
    return this.command.push(...$3), this;
  }
  get(...$3) {
    return this.chain("get", ...$3);
  }
  set(...$3) {
    return this.chain("set", ...$3);
  }
  incrby(...$3) {
    return this.chain("incrby", ...$3);
  }
  overflow($3) {
    return this.chain("overflow", $3);
  }
  exec() {
    let $3 = new z(this.command, this.opts);
    return this.execOperation($3);
  }
};
var F1 = class extends z {
  constructor($3, Y) {
    super(["bitop", ...$3], Y);
  }
};
var j1 = class extends z {
  constructor($3, Y) {
    super(["bitpos", ...$3], Y);
  }
};
var E1 = class extends z {
  constructor([$3, Y], Q2) {
    super(["CLIENT", "SETINFO", $3.toUpperCase(), Y], Q2);
  }
};
var B1 = class extends z {
  constructor([$3, Y, Q2], W) {
    super(["COPY", $3, Y, ...Q2?.replace ? ["REPLACE"] : []], { ...W, deserialize(T2) {
      if (T2 > 0) return "COPIED";
      return "NOT_COPIED";
    } });
  }
};
var I1 = class extends z {
  constructor($3) {
    super(["dbsize"], $3);
  }
};
var P1 = class extends z {
  constructor($3, Y) {
    super(["decr", ...$3], Y);
  }
};
var h1 = class extends z {
  constructor($3, Y) {
    super(["decrby", ...$3], Y);
  }
};
var A1 = class extends z {
  constructor($3, Y) {
    super(["del", ...$3], Y);
  }
};
var S1 = class extends z {
  constructor($3, Y) {
    super(["echo", ...$3], Y);
  }
};
var x1 = class extends z {
  constructor([$3, Y, Q2], W) {
    super(["eval_ro", $3, Y.length, ...Y, ...Q2 ?? []], W);
  }
};
var R1 = class extends z {
  constructor([$3, Y, Q2], W) {
    super(["eval", $3, Y.length, ...Y, ...Q2 ?? []], W);
  }
};
var O1 = class extends z {
  constructor([$3, Y, Q2], W) {
    super(["evalsha_ro", $3, Y.length, ...Y, ...Q2 ?? []], W);
  }
};
var b1 = class extends z {
  constructor([$3, Y, Q2], W) {
    super(["evalsha", $3, Y.length, ...Y, ...Q2 ?? []], W);
  }
};
var v1 = class extends z {
  constructor($3, Y) {
    super(["exists", ...$3], Y);
  }
};
var f1 = class extends z {
  constructor($3, Y) {
    super(["expire", ...$3.filter(Boolean)], Y);
  }
};
var k1 = class extends z {
  constructor($3, Y) {
    super(["expireat", ...$3], Y);
  }
};
var y1 = class extends z {
  constructor([$3, Y, Q2], W) {
    super(["fcall", $3, ...Y ? [Y.length, ...Y] : [0], ...Q2 ?? []], W);
  }
};
var C1 = class extends z {
  constructor([$3, Y, Q2], W) {
    super(["fcall_ro", $3, ...Y ? [Y.length, ...Y] : [0], ...Q2 ?? []], W);
  }
};
var u1 = class extends z {
  constructor($3, Y) {
    let Q2 = ["flushall"];
    if ($3 && $3.length > 0 && $3[0].async) Q2.push("async");
    super(Q2, Y);
  }
};
var l1 = class extends z {
  constructor([$3], Y) {
    let Q2 = ["flushdb"];
    if ($3?.async) Q2.push("async");
    super(Q2, Y);
  }
};
var i1 = class extends z {
  constructor([$3], Y) {
    super(["function", "delete", $3], Y);
  }
};
var g1 = class extends z {
  constructor($3) {
    super(["function", "flush"], $3);
  }
};
var c1 = class extends z {
  constructor([$3], Y) {
    let Q2 = ["function", "list"];
    if ($3?.libraryName) Q2.push("libraryname", $3.libraryName);
    if ($3?.withCode) Q2.push("withcode");
    super(Q2, { deserialize: iY, ...Y });
  }
};
function iY($3) {
  if (!Array.isArray($3)) return [];
  return $3.map((Y) => {
    let Q2 = J(Y), W = Q2.functions.map((T2) => J(T2));
    return { libraryName: Q2.library_name, engine: Q2.engine, functions: W.map((T2) => ({ name: T2.name, description: T2.description ?? void 0, flags: T2.flags })), libraryCode: Q2.library_code };
  });
}
var p1 = class extends z {
  constructor([$3], Y) {
    super(["function", "load", ...$3.replace ? ["replace"] : [], $3.code], Y);
  }
};
var n1 = class extends z {
  constructor($3) {
    super(["function", "stats"], { deserialize: gY, ...$3 });
  }
};
function gY($3) {
  let Y = J(J($3).engines), Q2 = Object.fromEntries(Object.entries(Y).map(([T2, V]) => [T2, J(V)]));
  return { engines: Object.fromEntries(Object.entries(Q2).map(([T2, V]) => [T2, { librariesCount: V.libraries_count, functionsCount: V.functions_count }])) };
}
var t1 = class extends z {
  constructor([$3, Y, ...Q2], W) {
    let T2 = ["geoadd", $3];
    if ("nx" in Y && Y.nx) T2.push("nx");
    else if ("xx" in Y && Y.xx) T2.push("xx");
    if ("ch" in Y && Y.ch) T2.push("ch");
    if ("latitude" in Y && Y.latitude) T2.push(Y.longitude, Y.latitude, Y.member);
    T2.push(...Q2.flatMap(({ latitude: V, longitude: U2, member: M2 }) => [U2, V, M2]));
    super(T2, W);
  }
};
var d1 = class extends z {
  constructor([$3, Y, Q2, W = "M"], T2) {
    super(["GEODIST", $3, Y, Q2, W], T2);
  }
};
var r1 = class extends z {
  constructor($3, Y) {
    let [Q2] = $3, W = Array.isArray($3[1]) ? $3[1] : $3.slice(1);
    super(["GEOHASH", Q2, ...W], Y);
  }
};
var e1 = class extends z {
  constructor($3, Y) {
    let [Q2] = $3, W = Array.isArray($3[1]) ? $3[1] : $3.slice(1);
    super(["GEOPOS", Q2, ...W], { deserialize: (T2) => cY(T2), ...Y });
  }
};
function cY($3) {
  let Y = [];
  for (let Q2 of $3) {
    if (!Q2?.[0] || !Q2?.[1]) continue;
    Y.push({ lng: Number.parseFloat(Q2[0]), lat: Number.parseFloat(Q2[1]) });
  }
  return Y;
}
var o1 = class extends z {
  constructor([$3, Y, Q2, W, T2], V) {
    let U2 = ["GEOSEARCH", $3];
    if (Y.type === "FROMMEMBER" || Y.type === "frommember") U2.push(Y.type, Y.member);
    if (Y.type === "FROMLONLAT" || Y.type === "fromlonlat") U2.push(Y.type, Y.coordinate.lon, Y.coordinate.lat);
    if (Q2.type === "BYRADIUS" || Q2.type === "byradius") U2.push(Q2.type, Q2.radius, Q2.radiusType);
    if (Q2.type === "BYBOX" || Q2.type === "bybox") U2.push(Q2.type, Q2.rect.width, Q2.rect.height, Q2.rectType);
    if (U2.push(W), T2?.count) U2.push("COUNT", T2.count.limit, ...T2.count.any ? ["ANY"] : []);
    let M2 = (D) => {
      if (!T2?.withCoord && !T2?.withDist && !T2?.withHash) return D.map((G) => {
        try {
          return { member: N(G) };
        } catch {
          return { member: G };
        }
      });
      return D.map((G) => {
        let X = 1, Z2 = {};
        try {
          Z2.member = N(G[0]);
        } catch {
          Z2.member = G[0];
        }
        if (T2.withDist) Z2.dist = Number.parseFloat(G[X++]);
        if (T2.withHash) Z2.hash = G[X++].toString();
        if (T2.withCoord) Z2.coord = { long: Number.parseFloat(G[X][0]), lat: Number.parseFloat(G[X][1]) };
        return Z2;
      });
    };
    super([...U2, ...T2?.withCoord ? ["WITHCOORD"] : [], ...T2?.withDist ? ["WITHDIST"] : [], ...T2?.withHash ? ["WITHHASH"] : []], { deserialize: M2, ...V });
  }
};
var m1 = class extends z {
  constructor([$3, Y, Q2, W, T2, V], U2) {
    let M2 = ["GEOSEARCHSTORE", $3, Y];
    if (Q2.type === "FROMMEMBER" || Q2.type === "frommember") M2.push(Q2.type, Q2.member);
    if (Q2.type === "FROMLONLAT" || Q2.type === "fromlonlat") M2.push(Q2.type, Q2.coordinate.lon, Q2.coordinate.lat);
    if (W.type === "BYRADIUS" || W.type === "byradius") M2.push(W.type, W.radius, W.radiusType);
    if (W.type === "BYBOX" || W.type === "bybox") M2.push(W.type, W.rect.width, W.rect.height, W.rectType);
    if (M2.push(T2), V?.count) M2.push("COUNT", V.count.limit, ...V.count.any ? ["ANY"] : []);
    super([...M2, ...V?.storeDist ? ["STOREDIST"] : []], U2);
  }
};
var a1 = class extends z {
  constructor($3, Y) {
    super(["get", ...$3], Y);
  }
};
var s1 = class extends z {
  constructor($3, Y) {
    super(["getbit", ...$3], Y);
  }
};
var $$ = class extends z {
  constructor($3, Y) {
    super(["getdel", ...$3], Y);
  }
};
var Y$ = class extends z {
  constructor([$3, Y], Q2) {
    let W = ["getex", $3];
    if (Y) {
      if ("ex" in Y && typeof Y.ex === "number") W.push("ex", Y.ex);
      else if ("px" in Y && typeof Y.px === "number") W.push("px", Y.px);
      else if ("exat" in Y && typeof Y.exat === "number") W.push("exat", Y.exat);
      else if ("pxat" in Y && typeof Y.pxat === "number") W.push("pxat", Y.pxat);
      else if ("persist" in Y && Y.persist) W.push("persist");
    }
    super(W, Q2);
  }
};
var Q$ = class extends z {
  constructor($3, Y) {
    super(["getrange", ...$3], Y);
  }
};
var W$ = class extends z {
  constructor($3, Y) {
    super(["getset", ...$3], Y);
  }
};
var T$ = class extends z {
  constructor($3, Y) {
    super(["hdel", ...$3], Y);
  }
};
var z$ = class extends z {
  constructor($3, Y) {
    super(["hexists", ...$3], Y);
  }
};
var V$ = class extends z {
  constructor($3, Y) {
    let [Q2, W, T2, V] = $3, U2 = Array.isArray(W) ? W : [W];
    super(["hexpire", Q2, T2, ...V ? [V] : [], "FIELDS", U2.length, ...U2], Y);
  }
};
var U$ = class extends z {
  constructor($3, Y) {
    let [Q2, W, T2, V] = $3, U2 = Array.isArray(W) ? W : [W];
    super(["hexpireat", Q2, T2, ...V ? [V] : [], "FIELDS", U2.length, ...U2], Y);
  }
};
var M$ = class extends z {
  constructor($3, Y) {
    let [Q2, W] = $3, T2 = Array.isArray(W) ? W : [W];
    super(["hexpiretime", Q2, "FIELDS", T2.length, ...T2], Y);
  }
};
var D$ = class extends z {
  constructor($3, Y) {
    let [Q2, W] = $3, T2 = Array.isArray(W) ? W : [W];
    super(["hpersist", Q2, "FIELDS", T2.length, ...T2], Y);
  }
};
var G$ = class extends z {
  constructor($3, Y) {
    let [Q2, W, T2, V] = $3, U2 = Array.isArray(W) ? W : [W];
    super(["hpexpire", Q2, T2, ...V ? [V] : [], "FIELDS", U2.length, ...U2], Y);
  }
};
var Z$ = class extends z {
  constructor($3, Y) {
    let [Q2, W, T2, V] = $3, U2 = Array.isArray(W) ? W : [W];
    super(["hpexpireat", Q2, T2, ...V ? [V] : [], "FIELDS", U2.length, ...U2], Y);
  }
};
var X$ = class extends z {
  constructor($3, Y) {
    let [Q2, W] = $3, T2 = Array.isArray(W) ? W : [W];
    super(["hpexpiretime", Q2, "FIELDS", T2.length, ...T2], Y);
  }
};
var w$ = class extends z {
  constructor($3, Y) {
    let [Q2, W] = $3, T2 = Array.isArray(W) ? W : [W];
    super(["hpttl", Q2, "FIELDS", T2.length, ...T2], Y);
  }
};
var L$ = class extends z {
  constructor($3, Y) {
    super(["hget", ...$3], Y);
  }
};
function pY($3) {
  if ($3.length === 0) return null;
  let Y = {};
  for (let Q2 = 0; Q2 < $3.length; Q2 += 2) {
    let W = $3[Q2], T2 = $3[Q2 + 1];
    try {
      let V = !Number.isNaN(Number(T2)) && !Number.isSafeInteger(Number(T2));
      Y[W] = V ? T2 : N(T2);
    } catch {
      Y[W] = T2;
    }
  }
  return Y;
}
var _$ = class extends z {
  constructor($3, Y) {
    super(["hgetall", ...$3], { deserialize: (Q2) => pY(Q2), ...Y });
  }
};
function R2($3, Y) {
  if (Y.every((W) => W === null)) return null;
  let Q2 = {};
  for (let [W, T2] of $3.entries()) try {
    Q2[T2] = N(Y[W]);
  } catch {
    Q2[T2] = Y[W];
  }
  return Q2;
}
var N$ = class extends z {
  constructor([$3, ...Y], Q2) {
    super(["hmget", $3, ...Y], { deserialize: (W) => R2(Y, W), ...Q2 });
  }
};
var H$ = class extends z {
  constructor([$3, ...Y], Q2) {
    super(["hgetdel", $3, "FIELDS", Y.length, ...Y], { deserialize: (W) => R2(Y.map(String), W), ...Q2 });
  }
};
var J$ = class extends z {
  constructor([$3, Y, ...Q2], W) {
    let T2 = ["hgetex", $3];
    if ("ex" in Y && typeof Y.ex === "number") T2.push("EX", Y.ex);
    else if ("px" in Y && typeof Y.px === "number") T2.push("PX", Y.px);
    else if ("exat" in Y && typeof Y.exat === "number") T2.push("EXAT", Y.exat);
    else if ("pxat" in Y && typeof Y.pxat === "number") T2.push("PXAT", Y.pxat);
    else if ("persist" in Y && Y.persist) T2.push("PERSIST");
    T2.push("FIELDS", Q2.length, ...Q2);
    super(T2, { deserialize: (V) => R2(Q2.map(String), V), ...W });
  }
};
var K$ = class extends z {
  constructor($3, Y) {
    super(["hincrby", ...$3], Y);
  }
};
var q$ = class extends z {
  constructor($3, Y) {
    super(["hincrbyfloat", ...$3], Y);
  }
};
var F$ = class extends z {
  constructor([$3], Y) {
    super(["hkeys", $3], Y);
  }
};
var j$ = class extends z {
  constructor($3, Y) {
    super(["hlen", ...$3], Y);
  }
};
var E$ = class extends z {
  constructor([$3, Y], Q2) {
    super(["hmset", $3, ...Object.entries(Y).flatMap(([W, T2]) => [W, T2])], Q2);
  }
};
var B$ = class extends z {
  constructor([$3, Y, Q2], W) {
    let T2 = ["hscan", $3, Y];
    if (Q2?.match) T2.push("match", Q2.match);
    if (typeof Q2?.count === "number") T2.push("count", Q2.count);
    super(T2, { deserialize: B, ...W });
  }
};
var I$ = class extends z {
  constructor([$3, Y], Q2) {
    super(["hset", $3, ...Object.entries(Y).flatMap(([W, T2]) => [W, T2])], Q2);
  }
};
var P$ = class extends z {
  constructor([$3, Y, Q2], W) {
    let T2 = ["hsetex", $3];
    if (Y.conditional) T2.push(Y.conditional.toUpperCase());
    if (Y.expiration) {
      if ("ex" in Y.expiration && typeof Y.expiration.ex === "number") T2.push("EX", Y.expiration.ex);
      else if ("px" in Y.expiration && typeof Y.expiration.px === "number") T2.push("PX", Y.expiration.px);
      else if ("exat" in Y.expiration && typeof Y.expiration.exat === "number") T2.push("EXAT", Y.expiration.exat);
      else if ("pxat" in Y.expiration && typeof Y.expiration.pxat === "number") T2.push("PXAT", Y.expiration.pxat);
      else if ("keepttl" in Y.expiration && Y.expiration.keepttl) T2.push("KEEPTTL");
    }
    let V = Object.entries(Q2);
    T2.push("FIELDS", V.length);
    for (let [U2, M2] of V) T2.push(U2, M2);
    super(T2, W);
  }
};
var h$ = class extends z {
  constructor($3, Y) {
    super(["hsetnx", ...$3], Y);
  }
};
var A$ = class extends z {
  constructor($3, Y) {
    super(["hstrlen", ...$3], Y);
  }
};
var S$ = class extends z {
  constructor($3, Y) {
    let [Q2, W] = $3, T2 = Array.isArray(W) ? W : [W];
    super(["httl", Q2, "FIELDS", T2.length, ...T2], Y);
  }
};
var x$ = class extends z {
  constructor($3, Y) {
    super(["hvals", ...$3], Y);
  }
};
var R$ = class extends z {
  constructor($3, Y) {
    super(["incr", ...$3], Y);
  }
};
var O$ = class extends z {
  constructor($3, Y) {
    super(["incrby", ...$3], Y);
  }
};
var b$ = class extends z {
  constructor($3, Y) {
    super(["incrbyfloat", ...$3], Y);
  }
};
var v$ = class extends z {
  constructor($3, Y) {
    super(["JSON.ARRAPPEND", ...$3], Y);
  }
};
var f$ = class extends z {
  constructor($3, Y) {
    super(["JSON.ARRINDEX", ...$3], Y);
  }
};
var k$ = class extends z {
  constructor($3, Y) {
    super(["JSON.ARRINSERT", ...$3], Y);
  }
};
var y$ = class extends z {
  constructor($3, Y) {
    super(["JSON.ARRLEN", $3[0], $3[1] ?? "$"], Y);
  }
};
var C$ = class extends z {
  constructor($3, Y) {
    super(["JSON.ARRPOP", ...$3], Y);
  }
};
var u$ = class extends z {
  constructor($3, Y) {
    let Q2 = $3[1] ?? "$", W = $3[2] ?? 0, T2 = $3[3] ?? 0;
    super(["JSON.ARRTRIM", $3[0], Q2, W, T2], Y);
  }
};
var l$ = class extends z {
  constructor($3, Y) {
    super(["JSON.CLEAR", ...$3], Y);
  }
};
var i$ = class extends z {
  constructor($3, Y) {
    super(["JSON.DEL", ...$3], Y);
  }
};
var g$ = class extends z {
  constructor($3, Y) {
    super(["JSON.FORGET", ...$3], Y);
  }
};
var c$ = class extends z {
  constructor($3, Y) {
    let Q2 = ["JSON.GET"];
    if (typeof $3[1] === "string") Q2.push(...$3);
    else {
      if (Q2.push($3[0]), $3[1]) {
        if ($3[1].indent) Q2.push("INDENT", $3[1].indent);
        if ($3[1].newline) Q2.push("NEWLINE", $3[1].newline);
        if ($3[1].space) Q2.push("SPACE", $3[1].space);
      }
      Q2.push(...$3.slice(2));
    }
    super(Q2, Y);
  }
};
var p$ = class extends z {
  constructor($3, Y) {
    let Q2 = ["JSON.MERGE", ...$3];
    super(Q2, Y);
  }
};
var n$ = class extends z {
  constructor($3, Y) {
    super(["JSON.MGET", ...$3[0], $3[1]], Y);
  }
};
var t$ = class extends z {
  constructor($3, Y) {
    let Q2 = ["JSON.MSET"];
    for (let W of $3) Q2.push(W.key, W.path, W.value);
    super(Q2, Y);
  }
};
var d$ = class extends z {
  constructor($3, Y) {
    super(["JSON.NUMINCRBY", ...$3], Y);
  }
};
var r$ = class extends z {
  constructor($3, Y) {
    super(["JSON.NUMMULTBY", ...$3], Y);
  }
};
var e$ = class extends z {
  constructor($3, Y) {
    super(["JSON.OBJKEYS", ...$3], Y);
  }
};
var o$ = class extends z {
  constructor($3, Y) {
    super(["JSON.OBJLEN", ...$3], Y);
  }
};
var m$ = class extends z {
  constructor($3, Y) {
    super(["JSON.RESP", ...$3], Y);
  }
};
var a$ = class extends z {
  constructor($3, Y) {
    let Q2 = ["JSON.SET", $3[0], $3[1], $3[2]];
    if ($3[3]) {
      if ($3[3].nx) Q2.push("NX");
      else if ($3[3].xx) Q2.push("XX");
    }
    super(Q2, Y);
  }
};
var s$ = class extends z {
  constructor($3, Y) {
    super(["JSON.STRAPPEND", ...$3], Y);
  }
};
var $0 = class extends z {
  constructor($3, Y) {
    super(["JSON.STRLEN", ...$3], Y);
  }
};
var Y0 = class extends z {
  constructor($3, Y) {
    super(["JSON.TOGGLE", ...$3], Y);
  }
};
var Q0 = class extends z {
  constructor($3, Y) {
    super(["JSON.TYPE", ...$3], Y);
  }
};
var W0 = class extends z {
  constructor($3, Y) {
    super(["keys", ...$3], Y);
  }
};
var T0 = class extends z {
  constructor($3, Y) {
    super(["lindex", ...$3], Y);
  }
};
var z0 = class extends z {
  constructor($3, Y) {
    super(["linsert", ...$3], Y);
  }
};
var V0 = class extends z {
  constructor($3, Y) {
    super(["llen", ...$3], Y);
  }
};
var U0 = class extends z {
  constructor($3, Y) {
    super(["lmove", ...$3], Y);
  }
};
var M0 = class extends z {
  constructor($3, Y) {
    let [Q2, W, T2, V] = $3;
    super(["LMPOP", Q2, ...W, T2, ...V ? ["COUNT", V] : []], Y);
  }
};
var D0 = class extends z {
  constructor($3, Y) {
    super(["lpop", ...$3], Y);
  }
};
var G0 = class extends z {
  constructor($3, Y) {
    let Q2 = ["lpos", $3[0], $3[1]];
    if (typeof $3[2]?.rank === "number") Q2.push("rank", $3[2].rank);
    if (typeof $3[2]?.count === "number") Q2.push("count", $3[2].count);
    if (typeof $3[2]?.maxLen === "number") Q2.push("maxLen", $3[2].maxLen);
    super(Q2, Y);
  }
};
var Z0 = class extends z {
  constructor($3, Y) {
    super(["lpush", ...$3], Y);
  }
};
var X0 = class extends z {
  constructor($3, Y) {
    super(["lpushx", ...$3], Y);
  }
};
var w0 = class extends z {
  constructor($3, Y) {
    super(["lrange", ...$3], Y);
  }
};
var L0 = class extends z {
  constructor($3, Y) {
    super(["lrem", ...$3], Y);
  }
};
var _0 = class extends z {
  constructor($3, Y) {
    super(["lset", ...$3], Y);
  }
};
var N0 = class extends z {
  constructor($3, Y) {
    super(["ltrim", ...$3], Y);
  }
};
var H0 = class extends z {
  constructor($3, Y) {
    let Q2 = Array.isArray($3[0]) ? $3[0] : $3;
    super(["mget", ...Q2], Y);
  }
};
var J0 = class extends z {
  constructor([$3], Y) {
    super(["mset", ...Object.entries($3).flatMap(([Q2, W]) => [Q2, W])], Y);
  }
};
var K0 = class extends z {
  constructor([$3], Y) {
    super(["msetnx", ...Object.entries($3).flat()], Y);
  }
};
var q0 = class extends z {
  constructor($3, Y) {
    super(["persist", ...$3], Y);
  }
};
var F0 = class extends z {
  constructor($3, Y) {
    super(["pexpire", ...$3], Y);
  }
};
var j0 = class extends z {
  constructor($3, Y) {
    super(["pexpireat", ...$3], Y);
  }
};
var E0 = class extends z {
  constructor($3, Y) {
    super(["pfadd", ...$3], Y);
  }
};
var B0 = class extends z {
  constructor($3, Y) {
    super(["pfcount", ...$3], Y);
  }
};
var I0 = class extends z {
  constructor($3, Y) {
    super(["pfmerge", ...$3], Y);
  }
};
var P0 = class extends z {
  constructor($3, Y) {
    let Q2 = ["ping"];
    if ($3?.[0] !== void 0) Q2.push($3[0]);
    super(Q2, Y);
  }
};
var h0 = class extends z {
  constructor($3, Y) {
    super(["psetex", ...$3], Y);
  }
};
var A0 = class extends z {
  constructor($3, Y) {
    super(["pttl", ...$3], Y);
  }
};
var S0 = class extends z {
  constructor($3, Y) {
    super(["publish", ...$3], Y);
  }
};
var x0 = class extends z {
  constructor($3) {
    super(["randomkey"], $3);
  }
};
var R0 = class extends z {
  constructor($3, Y) {
    super(["rename", ...$3], Y);
  }
};
var O0 = class extends z {
  constructor($3, Y) {
    super(["renamenx", ...$3], Y);
  }
};
var b0 = class extends z {
  constructor($3, Y) {
    super(["rpop", ...$3], Y);
  }
};
var v0 = class extends z {
  constructor($3, Y) {
    super(["rpush", ...$3], Y);
  }
};
var f0 = class extends z {
  constructor($3, Y) {
    super(["rpushx", ...$3], Y);
  }
};
var k0 = class extends z {
  constructor($3, Y) {
    super(["sadd", ...$3], Y);
  }
};
var y0 = class extends z {
  constructor([$3, Y], Q2) {
    let W = ["scan", $3];
    if (Y?.match) W.push("match", Y.match);
    if (typeof Y?.count === "number") W.push("count", Y.count);
    if (Y && "withType" in Y && Y.withType === true) W.push("withtype");
    else if (Y && "type" in Y && Y.type && Y.type.length > 0) W.push("type", Y.type);
    super(W, { deserialize: Y?.withType ? zY : B, ...Q2 });
  }
};
var C0 = class extends z {
  constructor($3, Y) {
    super(["scard", ...$3], Y);
  }
};
var u0 = class extends z {
  constructor($3, Y) {
    super(["script", "exists", ...$3], { deserialize: (Q2) => Q2, ...Y });
  }
};
var l0 = class extends z {
  constructor([$3], Y) {
    let Q2 = ["script", "flush"];
    if ($3?.sync) Q2.push("sync");
    else if ($3?.async) Q2.push("async");
    super(Q2, Y);
  }
};
var i0 = class extends z {
  constructor($3, Y) {
    super(["script", "load", ...$3], Y);
  }
};
var g0 = class extends z {
  constructor($3, Y) {
    super(["sdiff", ...$3], Y);
  }
};
var c0 = class extends z {
  constructor($3, Y) {
    super(["sdiffstore", ...$3], Y);
  }
};
var p0 = class extends z {
  constructor([$3, Y, Q2], W) {
    let T2 = ["set", $3, Y];
    if (Q2) {
      if ("nx" in Q2 && Q2.nx) T2.push("nx");
      else if ("xx" in Q2 && Q2.xx) T2.push("xx");
      if ("get" in Q2 && Q2.get) T2.push("get");
      if ("ex" in Q2 && typeof Q2.ex === "number") T2.push("ex", Q2.ex);
      else if ("px" in Q2 && typeof Q2.px === "number") T2.push("px", Q2.px);
      else if ("exat" in Q2 && typeof Q2.exat === "number") T2.push("exat", Q2.exat);
      else if ("pxat" in Q2 && typeof Q2.pxat === "number") T2.push("pxat", Q2.pxat);
      else if ("keepTtl" in Q2 && Q2.keepTtl) T2.push("keepTtl");
    }
    super(T2, W);
  }
};
var n0 = class extends z {
  constructor($3, Y) {
    super(["setbit", ...$3], Y);
  }
};
var t0 = class extends z {
  constructor($3, Y) {
    super(["setex", ...$3], Y);
  }
};
var d0 = class extends z {
  constructor($3, Y) {
    super(["setnx", ...$3], Y);
  }
};
var r0 = class extends z {
  constructor($3, Y) {
    super(["setrange", ...$3], Y);
  }
};
var e0 = class extends z {
  constructor($3, Y) {
    super(["sinter", ...$3], Y);
  }
};
var o0 = class extends z {
  constructor($3, Y) {
    let [Q2, W] = $3, T2 = ["sintercard", Q2.length, ...Q2];
    if (W?.limit !== void 0) T2.push("LIMIT", W.limit);
    super(T2, Y);
  }
};
var m0 = class extends z {
  constructor($3, Y) {
    super(["sinterstore", ...$3], Y);
  }
};
var a0 = class extends z {
  constructor($3, Y) {
    super(["sismember", ...$3], Y);
  }
};
var s0 = class extends z {
  constructor($3, Y) {
    super(["smembers", ...$3], Y);
  }
};
var $9 = class extends z {
  constructor($3, Y) {
    super(["smismember", $3[0], ...$3[1]], Y);
  }
};
var Y9 = class extends z {
  constructor($3, Y) {
    super(["smove", ...$3], Y);
  }
};
var Q9 = class extends z {
  constructor([$3, Y], Q2) {
    let W = ["spop", $3];
    if (typeof Y === "number") W.push(Y);
    super(W, Q2);
  }
};
var W9 = class extends z {
  constructor([$3, Y], Q2) {
    let W = ["srandmember", $3];
    if (typeof Y === "number") W.push(Y);
    super(W, Q2);
  }
};
var T9 = class extends z {
  constructor($3, Y) {
    super(["srem", ...$3], Y);
  }
};
var z9 = class extends z {
  constructor([$3, Y, Q2], W) {
    let T2 = ["sscan", $3, Y];
    if (Q2?.match) T2.push("match", Q2.match);
    if (typeof Q2?.count === "number") T2.push("count", Q2.count);
    super(T2, { deserialize: B, ...W });
  }
};
var V9 = class extends z {
  constructor($3, Y) {
    super(["strlen", ...$3], Y);
  }
};
var U9 = class extends z {
  constructor($3, Y) {
    super(["sunion", ...$3], Y);
  }
};
var M9 = class extends z {
  constructor($3, Y) {
    super(["sunionstore", ...$3], Y);
  }
};
var D9 = class extends z {
  constructor($3) {
    super(["time"], $3);
  }
};
var G9 = class extends z {
  constructor($3, Y) {
    super(["touch", ...$3], Y);
  }
};
var Z9 = class extends z {
  constructor($3, Y) {
    super(["ttl", ...$3], Y);
  }
};
var X9 = class extends z {
  constructor($3, Y) {
    super(["type", ...$3], Y);
  }
};
var w9 = class extends z {
  constructor($3, Y) {
    super(["unlink", ...$3], Y);
  }
};
var L9 = class extends z {
  constructor([$3, Y, Q2], W) {
    let T2 = Array.isArray(Q2) ? [...Q2] : [Q2];
    super(["XACK", $3, Y, ...T2], W);
  }
};
var _9 = class extends z {
  constructor([$3, Y, Q2, ...W], T2) {
    let V = ["XACKDEL", $3, Y];
    V.push(Q2.toUpperCase(), "IDS", W.length, ...W);
    super(V, T2);
  }
};
var N9 = class extends z {
  constructor([$3, Y, Q2, W], T2) {
    let V = ["XADD", $3];
    if (W) {
      if (W.nomkStream) V.push("NOMKSTREAM");
      if (W.trim) {
        if (V.push(W.trim.type, W.trim.comparison, W.trim.threshold), W.trim.limit !== void 0) V.push("LIMIT", W.trim.limit);
      }
    }
    V.push(Y);
    for (let [U2, M2] of Object.entries(Q2)) V.push(U2, M2);
    super(V, T2);
  }
};
var H9 = class extends z {
  constructor([$3, Y, Q2, W, T2, V], U2) {
    let M2 = [];
    if (V?.count) M2.push("COUNT", V.count);
    if (V?.justId) M2.push("JUSTID");
    super(["XAUTOCLAIM", $3, Y, Q2, W, T2, ...M2], U2);
  }
};
var J9 = class extends z {
  constructor([$3, Y, Q2, W, T2, V], U2) {
    let M2 = Array.isArray(T2) ? [...T2] : [T2], D = [];
    if (V?.idleMS) D.push("IDLE", V.idleMS);
    if (V?.idleMS) D.push("TIME", V.timeMS);
    if (V?.retryCount) D.push("RETRYCOUNT", V.retryCount);
    if (V?.force) D.push("FORCE");
    if (V?.justId) D.push("JUSTID");
    if (V?.lastId) D.push("LASTID", V.lastId);
    super(["XCLAIM", $3, Y, Q2, W, ...M2, ...D], U2);
  }
};
var K9 = class extends z {
  constructor([$3, Y], Q2) {
    let W = Array.isArray(Y) ? [...Y] : [Y];
    super(["XDEL", $3, ...W], Q2);
  }
};
var q9 = class extends z {
  constructor([$3, Y, ...Q2], W) {
    let T2 = ["XDELEX", $3];
    if (Y) T2.push(Y.toUpperCase());
    T2.push("IDS", Q2.length, ...Q2);
    super(T2, W);
  }
};
var F9 = class extends z {
  constructor([$3, Y], Q2) {
    let W = ["XGROUP"];
    switch (Y.type) {
      case "CREATE": {
        if (W.push("CREATE", $3, Y.group, Y.id), Y.options) {
          if (Y.options.MKSTREAM) W.push("MKSTREAM");
          if (Y.options.ENTRIESREAD !== void 0) W.push("ENTRIESREAD", Y.options.ENTRIESREAD.toString());
        }
        break;
      }
      case "CREATECONSUMER": {
        W.push("CREATECONSUMER", $3, Y.group, Y.consumer);
        break;
      }
      case "DELCONSUMER": {
        W.push("DELCONSUMER", $3, Y.group, Y.consumer);
        break;
      }
      case "DESTROY": {
        W.push("DESTROY", $3, Y.group);
        break;
      }
      case "SETID": {
        if (W.push("SETID", $3, Y.group, Y.id), Y.options?.ENTRIESREAD !== void 0) W.push("ENTRIESREAD", Y.options.ENTRIESREAD.toString());
        break;
      }
      default:
        throw Error("Invalid XGROUP");
    }
    super(W, Q2);
  }
};
var j9 = class extends z {
  constructor([$3, Y], Q2) {
    let W = [];
    if (Y.type === "CONSUMERS") W.push("CONSUMERS", $3, Y.group);
    else W.push("GROUPS", $3);
    super(["XINFO", ...W], Q2);
  }
};
var E9 = class extends z {
  constructor($3, Y) {
    super(["XLEN", ...$3], Y);
  }
};
var B9 = class extends z {
  constructor([$3, Y, Q2, W, T2, V], U2) {
    let M2 = V?.consumer === void 0 ? [] : Array.isArray(V.consumer) ? [...V.consumer] : [V.consumer];
    super(["XPENDING", $3, Y, ...V?.idleTime ? ["IDLE", V.idleTime] : [], Q2, W, T2, ...M2], U2);
  }
};
function nY($3) {
  let Y = {};
  for (let Q2 of $3) for (let W = 0; W < Q2.length; W += 2) {
    let T2 = Q2[W], V = Q2[W + 1];
    if (!(T2 in Y)) Y[T2] = {};
    for (let U2 = 0; U2 < V.length; U2 += 2) {
      let M2 = V[U2], D = V[U2 + 1];
      try {
        Y[T2][M2] = N(D);
      } catch {
        Y[T2][M2] = D;
      }
    }
  }
  return Y;
}
var I9 = class extends z {
  constructor([$3, Y, Q2, W], T2) {
    let V = ["XRANGE", $3, Y, Q2];
    if (typeof W === "number") V.push("COUNT", W);
    super(V, { deserialize: (U2) => nY(U2), ...T2 });
  }
};
var tY = "ERR Unbalanced XREAD list of streams: for each stream key an ID or '$' must be specified";
var P9 = class extends z {
  constructor([$3, Y, Q2], W) {
    if (Array.isArray($3) && Array.isArray(Y) && $3.length !== Y.length) throw Error(tY);
    let T2 = [];
    if (typeof Q2?.count === "number") T2.push("COUNT", Q2.count);
    if (typeof Q2?.blockMS === "number") T2.push("BLOCK", Q2.blockMS);
    T2.push("STREAMS", ...Array.isArray($3) ? [...$3] : [$3], ...Array.isArray(Y) ? [...Y] : [Y]);
    super(["XREAD", ...T2], W);
  }
};
var dY = "ERR Unbalanced XREADGROUP list of streams: for each stream key an ID or '$' must be specified";
var h9 = class extends z {
  constructor([$3, Y, Q2, W, T2], V) {
    if (Array.isArray(Q2) && Array.isArray(W) && Q2.length !== W.length) throw Error(dY);
    let U2 = [];
    if (typeof T2?.count === "number") U2.push("COUNT", T2.count);
    if (typeof T2?.blockMS === "number") U2.push("BLOCK", T2.blockMS);
    if (typeof T2?.NOACK === "boolean" && T2.NOACK) U2.push("NOACK");
    U2.push("STREAMS", ...Array.isArray(Q2) ? [...Q2] : [Q2], ...Array.isArray(W) ? [...W] : [W]);
    super(["XREADGROUP", "GROUP", $3, Y, ...U2], V);
  }
};
var A9 = class extends z {
  constructor([$3, Y, Q2, W], T2) {
    let V = ["XREVRANGE", $3, Y, Q2];
    if (typeof W === "number") V.push("COUNT", W);
    super(V, { deserialize: (U2) => rY(U2), ...T2 });
  }
};
function rY($3) {
  let Y = {};
  for (let Q2 of $3) for (let W = 0; W < Q2.length; W += 2) {
    let T2 = Q2[W], V = Q2[W + 1];
    if (!(T2 in Y)) Y[T2] = {};
    for (let U2 = 0; U2 < V.length; U2 += 2) {
      let M2 = V[U2], D = V[U2 + 1];
      try {
        Y[T2][M2] = N(D);
      } catch {
        Y[T2][M2] = D;
      }
    }
  }
  return Y;
}
var S9 = class extends z {
  constructor([$3, Y], Q2) {
    let { limit: W, strategy: T2, threshold: V, exactness: U2 = "~" } = Y;
    super(["XTRIM", $3, T2, U2, V, ...W ? ["LIMIT", W] : []], Q2);
  }
};
var j = class extends z {
  constructor([$3, Y, ...Q2], W) {
    let T2 = ["zadd", $3];
    if ("nx" in Y && Y.nx) T2.push("nx");
    else if ("xx" in Y && Y.xx) T2.push("xx");
    if ("ch" in Y && Y.ch) T2.push("ch");
    if ("incr" in Y && Y.incr) T2.push("incr");
    if ("lt" in Y && Y.lt) T2.push("lt");
    else if ("gt" in Y && Y.gt) T2.push("gt");
    if ("score" in Y && "member" in Y) T2.push(Y.score, Y.member);
    T2.push(...Q2.flatMap(({ score: V, member: U2 }) => [V, U2]));
    super(T2, W);
  }
};
var x9 = class extends z {
  constructor($3, Y) {
    super(["zcard", ...$3], Y);
  }
};
var R9 = class extends z {
  constructor($3, Y) {
    super(["zcount", ...$3], Y);
  }
};
var O9 = class extends z {
  constructor($3, Y) {
    super(["zincrby", ...$3], Y);
  }
};
var b9 = class extends z {
  constructor([$3, Y, Q2, W], T2) {
    let V = ["zinterstore", $3, Y];
    if (Array.isArray(Q2)) V.push(...Q2);
    else V.push(Q2);
    if (W) {
      if ("weights" in W && W.weights) V.push("weights", ...W.weights);
      else if ("weight" in W && typeof W.weight === "number") V.push("weights", W.weight);
      if ("aggregate" in W) V.push("aggregate", W.aggregate);
    }
    super(V, T2);
  }
};
var v9 = class extends z {
  constructor($3, Y) {
    super(["zlexcount", ...$3], Y);
  }
};
var f9 = class extends z {
  constructor([$3, Y], Q2) {
    let W = ["zpopmax", $3];
    if (typeof Y === "number") W.push(Y);
    super(W, Q2);
  }
};
var k9 = class extends z {
  constructor([$3, Y], Q2) {
    let W = ["zpopmin", $3];
    if (typeof Y === "number") W.push(Y);
    super(W, Q2);
  }
};
var y9 = class extends z {
  constructor([$3, Y, Q2, W], T2) {
    let V = ["zrange", $3, Y, Q2];
    if (W?.byScore) V.push("byscore");
    if (W?.byLex) V.push("bylex");
    if (W?.rev) V.push("rev");
    if (W?.count !== void 0 && W.offset !== void 0) V.push("limit", W.offset, W.count);
    if (W?.withScores) V.push("withscores");
    super(V, T2);
  }
};
var C9 = class extends z {
  constructor($3, Y) {
    super(["zrank", ...$3], Y);
  }
};
var u9 = class extends z {
  constructor($3, Y) {
    super(["zrem", ...$3], Y);
  }
};
var l9 = class extends z {
  constructor($3, Y) {
    super(["zremrangebylex", ...$3], Y);
  }
};
var i9 = class extends z {
  constructor($3, Y) {
    super(["zremrangebyrank", ...$3], Y);
  }
};
var g9 = class extends z {
  constructor($3, Y) {
    super(["zremrangebyscore", ...$3], Y);
  }
};
var c9 = class extends z {
  constructor($3, Y) {
    super(["zrevrank", ...$3], Y);
  }
};
var p9 = class extends z {
  constructor([$3, Y, Q2], W) {
    let T2 = ["zscan", $3, Y];
    if (Q2?.match) T2.push("match", Q2.match);
    if (typeof Q2?.count === "number") T2.push("count", Q2.count);
    super(T2, { deserialize: B, ...W });
  }
};
var n9 = class extends z {
  constructor($3, Y) {
    super(["zscore", ...$3], Y);
  }
};
var t9 = class extends z {
  constructor([$3, Y, Q2], W) {
    let T2 = ["zunion", $3];
    if (Array.isArray(Y)) T2.push(...Y);
    else T2.push(Y);
    if (Q2) {
      if ("weights" in Q2 && Q2.weights) T2.push("weights", ...Q2.weights);
      else if ("weight" in Q2 && typeof Q2.weight === "number") T2.push("weights", Q2.weight);
      if ("aggregate" in Q2) T2.push("aggregate", Q2.aggregate);
      if (Q2.withScores) T2.push("withscores");
    }
    super(T2, W);
  }
};
var d9 = class extends z {
  constructor([$3, Y, Q2, W], T2) {
    let V = ["zunionstore", $3, Y];
    if (Array.isArray(Q2)) V.push(...Q2);
    else V.push(Q2);
    if (W) {
      if ("weights" in W && W.weights) V.push("weights", ...W.weights);
      else if ("weight" in W && typeof W.weight === "number") V.push("weights", W.weight);
      if ("aggregate" in W) V.push("aggregate", W.aggregate);
    }
    super(V, T2);
  }
};
var r9 = class extends z {
  constructor($3, Y) {
    super(["zdiffstore", ...$3], Y);
  }
};
var e9 = class extends z {
  constructor($3, Y) {
    let [Q2, W] = $3;
    super(["zmscore", Q2, ...W], Y);
  }
};
var C = class {
  client;
  commands;
  commandOptions;
  multiExec;
  constructor($3) {
    if (this.client = $3.client, this.commands = [], this.commandOptions = $3.commandOptions, this.multiExec = $3.multiExec ?? false, this.commandOptions?.latencyLogging) {
      let Y = this.exec.bind(this);
      this.exec = async (Q2) => {
        let W = performance.now(), T2 = await (Q2 ? Y(Q2) : Y()), U2 = (performance.now() - W).toFixed(2);
        return console.log(`Latency for \x1B[38;2;19;185;39m${this.multiExec ? ["MULTI-EXEC"] : ["PIPELINE"].toString().toUpperCase()}\x1B[0m: \x1B[38;2;0;255;255m${U2} ms\x1B[0m`), T2;
      };
    }
  }
  exec = async ($3) => {
    if (this.commands.length === 0) throw Error("Pipeline is empty");
    let Y = this.multiExec ? ["multi-exec"] : ["pipeline"], Q2 = await this.client.request({ path: Y, body: Object.values(this.commands).map((W) => W.command) });
    return $3?.keepErrors ? Q2.map(({ error: W, result: T2 }, V) => {
      return { error: W, result: this.commands[V].deserialize(T2) };
    }) : Q2.map(({ error: W, result: T2 }, V) => {
      if (W) throw new H(`Command ${V + 1} [ ${this.commands[V].command[0]} ] failed: ${W}`);
      return this.commands[V].deserialize(T2);
    });
  };
  length() {
    return this.commands.length;
  }
  chain($3) {
    return this.commands.push($3), this;
  }
  append = (...$3) => this.chain(new $1($3, this.commandOptions));
  arcount = (...$3) => this.chain(new Y1($3, this.commandOptions));
  ardel = (...$3) => this.chain(new Q1($3, this.commandOptions));
  ardelrange = (...$3) => this.chain(new W1($3, this.commandOptions));
  arget = (...$3) => this.chain(new T1($3, this.commandOptions));
  argetrange = (...$3) => this.chain(new z1($3, this.commandOptions));
  argrep = ($3, Y, Q2, W) => this.chain(new V1([$3, Y, Q2, W], this.commandOptions));
  arinfo = (...$3) => this.chain(new U1($3, this.commandOptions));
  arinsert = ($3, ...Y) => this.chain(new M1([$3, ...Y], this.commandOptions));
  arlastitems = (...$3) => this.chain(new D1($3, this.commandOptions));
  arlen = (...$3) => this.chain(new G1($3, this.commandOptions));
  armget = (...$3) => this.chain(new Z1($3, this.commandOptions));
  armset = ($3, Y) => this.chain(new X1([$3, Y], this.commandOptions));
  arnext = (...$3) => this.chain(new w1($3, this.commandOptions));
  arop = ($3, Y, Q2, W) => this.chain(new L1([$3, Y, Q2, W], this.commandOptions));
  arring = ($3, Y, ...Q2) => this.chain(new _1([$3, Y, ...Q2], this.commandOptions));
  arscan = (...$3) => this.chain(new N1($3, this.commandOptions));
  arseek = (...$3) => this.chain(new H1($3, this.commandOptions));
  arset = ($3, Y, ...Q2) => this.chain(new J1([$3, Y, ...Q2], this.commandOptions));
  bitcount = (...$3) => this.chain(new K1($3, this.commandOptions));
  bitfield = (...$3) => new q1($3, this.client, this.commandOptions, this.chain.bind(this));
  bitop = ($3, Y, Q2, ...W) => this.chain(new F1([$3, Y, Q2, ...W], this.commandOptions));
  bitpos = (...$3) => this.chain(new j1($3, this.commandOptions));
  clientSetinfo = (...$3) => this.chain(new E1($3, this.commandOptions));
  copy = (...$3) => this.chain(new B1($3, this.commandOptions));
  zdiffstore = (...$3) => this.chain(new r9($3, this.commandOptions));
  dbsize = () => this.chain(new I1(this.commandOptions));
  decr = (...$3) => this.chain(new P1($3, this.commandOptions));
  decrby = (...$3) => this.chain(new h1($3, this.commandOptions));
  del = (...$3) => this.chain(new A1($3, this.commandOptions));
  echo = (...$3) => this.chain(new S1($3, this.commandOptions));
  evalRo = (...$3) => this.chain(new x1($3, this.commandOptions));
  eval = (...$3) => this.chain(new R1($3, this.commandOptions));
  evalshaRo = (...$3) => this.chain(new O1($3, this.commandOptions));
  evalsha = (...$3) => this.chain(new b1($3, this.commandOptions));
  exists = (...$3) => this.chain(new v1($3, this.commandOptions));
  expire = (...$3) => this.chain(new f1($3, this.commandOptions));
  expireat = (...$3) => this.chain(new k1($3, this.commandOptions));
  flushall = ($3) => this.chain(new u1($3, this.commandOptions));
  flushdb = (...$3) => this.chain(new l1($3, this.commandOptions));
  geoadd = (...$3) => this.chain(new t1($3, this.commandOptions));
  geodist = (...$3) => this.chain(new d1($3, this.commandOptions));
  geopos = (...$3) => this.chain(new e1($3, this.commandOptions));
  geohash = (...$3) => this.chain(new r1($3, this.commandOptions));
  geosearch = (...$3) => this.chain(new o1($3, this.commandOptions));
  geosearchstore = (...$3) => this.chain(new m1($3, this.commandOptions));
  get = (...$3) => this.chain(new a1($3, this.commandOptions));
  getbit = (...$3) => this.chain(new s1($3, this.commandOptions));
  getdel = (...$3) => this.chain(new $$($3, this.commandOptions));
  getex = (...$3) => this.chain(new Y$($3, this.commandOptions));
  getrange = (...$3) => this.chain(new Q$($3, this.commandOptions));
  getset = ($3, Y) => this.chain(new W$([$3, Y], this.commandOptions));
  hdel = (...$3) => this.chain(new T$($3, this.commandOptions));
  hexists = (...$3) => this.chain(new z$($3, this.commandOptions));
  hexpire = (...$3) => this.chain(new V$($3, this.commandOptions));
  hexpireat = (...$3) => this.chain(new U$($3, this.commandOptions));
  hexpiretime = (...$3) => this.chain(new M$($3, this.commandOptions));
  httl = (...$3) => this.chain(new S$($3, this.commandOptions));
  hpexpire = (...$3) => this.chain(new G$($3, this.commandOptions));
  hpexpireat = (...$3) => this.chain(new Z$($3, this.commandOptions));
  hpexpiretime = (...$3) => this.chain(new X$($3, this.commandOptions));
  hpttl = (...$3) => this.chain(new w$($3, this.commandOptions));
  hpersist = (...$3) => this.chain(new D$($3, this.commandOptions));
  hget = (...$3) => this.chain(new L$($3, this.commandOptions));
  hgetall = (...$3) => this.chain(new _$($3, this.commandOptions));
  hgetdel = (...$3) => this.chain(new H$($3, this.commandOptions));
  hgetex = (...$3) => this.chain(new J$($3, this.commandOptions));
  hincrby = (...$3) => this.chain(new K$($3, this.commandOptions));
  hincrbyfloat = (...$3) => this.chain(new q$($3, this.commandOptions));
  hkeys = (...$3) => this.chain(new F$($3, this.commandOptions));
  hlen = (...$3) => this.chain(new j$($3, this.commandOptions));
  hmget = (...$3) => this.chain(new N$($3, this.commandOptions));
  hmset = ($3, Y) => this.chain(new E$([$3, Y], this.commandOptions));
  hrandfield = ($3, Y, Q2) => this.chain(new s2([$3, Y, Q2], this.commandOptions));
  hscan = (...$3) => this.chain(new B$($3, this.commandOptions));
  hset = ($3, Y) => this.chain(new I$([$3, Y], this.commandOptions));
  hsetex = (...$3) => this.chain(new P$($3, this.commandOptions));
  hsetnx = ($3, Y, Q2) => this.chain(new h$([$3, Y, Q2], this.commandOptions));
  hstrlen = (...$3) => this.chain(new A$($3, this.commandOptions));
  hvals = (...$3) => this.chain(new x$($3, this.commandOptions));
  incr = (...$3) => this.chain(new R$($3, this.commandOptions));
  incrby = (...$3) => this.chain(new O$($3, this.commandOptions));
  incrbyfloat = (...$3) => this.chain(new b$($3, this.commandOptions));
  keys = (...$3) => this.chain(new W0($3, this.commandOptions));
  lindex = (...$3) => this.chain(new T0($3, this.commandOptions));
  linsert = ($3, Y, Q2, W) => this.chain(new z0([$3, Y, Q2, W], this.commandOptions));
  llen = (...$3) => this.chain(new V0($3, this.commandOptions));
  lmove = (...$3) => this.chain(new U0($3, this.commandOptions));
  lpop = (...$3) => this.chain(new D0($3, this.commandOptions));
  lmpop = (...$3) => this.chain(new M0($3, this.commandOptions));
  lpos = (...$3) => this.chain(new G0($3, this.commandOptions));
  lpush = ($3, ...Y) => this.chain(new Z0([$3, ...Y], this.commandOptions));
  lpushx = ($3, ...Y) => this.chain(new X0([$3, ...Y], this.commandOptions));
  lrange = (...$3) => this.chain(new w0($3, this.commandOptions));
  lrem = ($3, Y, Q2) => this.chain(new L0([$3, Y, Q2], this.commandOptions));
  lset = ($3, Y, Q2) => this.chain(new _0([$3, Y, Q2], this.commandOptions));
  ltrim = (...$3) => this.chain(new N0($3, this.commandOptions));
  mget = (...$3) => this.chain(new H0($3, this.commandOptions));
  mset = ($3) => this.chain(new J0([$3], this.commandOptions));
  msetnx = ($3) => this.chain(new K0([$3], this.commandOptions));
  persist = (...$3) => this.chain(new q0($3, this.commandOptions));
  pexpire = (...$3) => this.chain(new F0($3, this.commandOptions));
  pexpireat = (...$3) => this.chain(new j0($3, this.commandOptions));
  pfadd = (...$3) => this.chain(new E0($3, this.commandOptions));
  pfcount = (...$3) => this.chain(new B0($3, this.commandOptions));
  pfmerge = (...$3) => this.chain(new I0($3, this.commandOptions));
  ping = ($3) => this.chain(new P0($3, this.commandOptions));
  psetex = ($3, Y, Q2) => this.chain(new h0([$3, Y, Q2], this.commandOptions));
  pttl = (...$3) => this.chain(new A0($3, this.commandOptions));
  publish = (...$3) => this.chain(new S0($3, this.commandOptions));
  randomkey = () => this.chain(new x0(this.commandOptions));
  rename = (...$3) => this.chain(new R0($3, this.commandOptions));
  renamenx = (...$3) => this.chain(new O0($3, this.commandOptions));
  rpop = (...$3) => this.chain(new b0($3, this.commandOptions));
  rpush = ($3, ...Y) => this.chain(new v0([$3, ...Y], this.commandOptions));
  rpushx = ($3, ...Y) => this.chain(new f0([$3, ...Y], this.commandOptions));
  sadd = ($3, Y, ...Q2) => this.chain(new k0([$3, Y, ...Q2], this.commandOptions));
  scan = (...$3) => this.chain(new y0($3, this.commandOptions));
  scard = (...$3) => this.chain(new C0($3, this.commandOptions));
  scriptExists = (...$3) => this.chain(new u0($3, this.commandOptions));
  scriptFlush = (...$3) => this.chain(new l0($3, this.commandOptions));
  scriptLoad = (...$3) => this.chain(new i0($3, this.commandOptions));
  sdiff = (...$3) => this.chain(new g0($3, this.commandOptions));
  sdiffstore = (...$3) => this.chain(new c0($3, this.commandOptions));
  set = ($3, Y, Q2) => this.chain(new p0([$3, Y, Q2], this.commandOptions));
  setbit = (...$3) => this.chain(new n0($3, this.commandOptions));
  setex = ($3, Y, Q2) => this.chain(new t0([$3, Y, Q2], this.commandOptions));
  setnx = ($3, Y) => this.chain(new d0([$3, Y], this.commandOptions));
  setrange = (...$3) => this.chain(new r0($3, this.commandOptions));
  sinter = (...$3) => this.chain(new e0($3, this.commandOptions));
  sintercard = (...$3) => this.chain(new o0($3, this.commandOptions));
  sinterstore = (...$3) => this.chain(new m0($3, this.commandOptions));
  sismember = ($3, Y) => this.chain(new a0([$3, Y], this.commandOptions));
  smembers = (...$3) => this.chain(new s0($3, this.commandOptions));
  smismember = ($3, Y) => this.chain(new $9([$3, Y], this.commandOptions));
  smove = ($3, Y, Q2) => this.chain(new Y9([$3, Y, Q2], this.commandOptions));
  spop = (...$3) => this.chain(new Q9($3, this.commandOptions));
  srandmember = (...$3) => this.chain(new W9($3, this.commandOptions));
  srem = ($3, ...Y) => this.chain(new T9([$3, ...Y], this.commandOptions));
  sscan = (...$3) => this.chain(new z9($3, this.commandOptions));
  strlen = (...$3) => this.chain(new V9($3, this.commandOptions));
  sunion = (...$3) => this.chain(new U9($3, this.commandOptions));
  sunionstore = (...$3) => this.chain(new M9($3, this.commandOptions));
  time = () => this.chain(new D9(this.commandOptions));
  touch = (...$3) => this.chain(new G9($3, this.commandOptions));
  ttl = (...$3) => this.chain(new Z9($3, this.commandOptions));
  type = (...$3) => this.chain(new X9($3, this.commandOptions));
  unlink = (...$3) => this.chain(new w9($3, this.commandOptions));
  zadd = (...$3) => {
    if ("score" in $3[1]) return this.chain(new j([$3[0], $3[1], ...$3.slice(2)], this.commandOptions));
    return this.chain(new j([$3[0], $3[1], ...$3.slice(2)], this.commandOptions));
  };
  xadd = (...$3) => this.chain(new N9($3, this.commandOptions));
  xack = (...$3) => this.chain(new L9($3, this.commandOptions));
  xackdel = (...$3) => this.chain(new _9($3, this.commandOptions));
  xdel = (...$3) => this.chain(new K9($3, this.commandOptions));
  xdelex = (...$3) => this.chain(new q9($3, this.commandOptions));
  xgroup = (...$3) => this.chain(new F9($3, this.commandOptions));
  xread = (...$3) => this.chain(new P9($3, this.commandOptions));
  xreadgroup = (...$3) => this.chain(new h9($3, this.commandOptions));
  xinfo = (...$3) => this.chain(new j9($3, this.commandOptions));
  xlen = (...$3) => this.chain(new E9($3, this.commandOptions));
  xpending = (...$3) => this.chain(new B9($3, this.commandOptions));
  xclaim = (...$3) => this.chain(new J9($3, this.commandOptions));
  xautoclaim = (...$3) => this.chain(new H9($3, this.commandOptions));
  xtrim = (...$3) => this.chain(new S9($3, this.commandOptions));
  xrange = (...$3) => this.chain(new I9($3, this.commandOptions));
  xrevrange = (...$3) => this.chain(new A9($3, this.commandOptions));
  zcard = (...$3) => this.chain(new x9($3, this.commandOptions));
  zcount = (...$3) => this.chain(new R9($3, this.commandOptions));
  zincrby = ($3, Y, Q2) => this.chain(new O9([$3, Y, Q2], this.commandOptions));
  zinterstore = (...$3) => this.chain(new b9($3, this.commandOptions));
  zlexcount = (...$3) => this.chain(new v9($3, this.commandOptions));
  zmscore = (...$3) => this.chain(new e9($3, this.commandOptions));
  zpopmax = (...$3) => this.chain(new f9($3, this.commandOptions));
  zpopmin = (...$3) => this.chain(new k9($3, this.commandOptions));
  zrange = (...$3) => this.chain(new y9($3, this.commandOptions));
  zrank = ($3, Y) => this.chain(new C9([$3, Y], this.commandOptions));
  zrem = ($3, ...Y) => this.chain(new u9([$3, ...Y], this.commandOptions));
  zremrangebylex = (...$3) => this.chain(new l9($3, this.commandOptions));
  zremrangebyrank = (...$3) => this.chain(new i9($3, this.commandOptions));
  zremrangebyscore = (...$3) => this.chain(new g9($3, this.commandOptions));
  zrevrank = ($3, Y) => this.chain(new c9([$3, Y], this.commandOptions));
  zscan = (...$3) => this.chain(new p9($3, this.commandOptions));
  zscore = ($3, Y) => this.chain(new n9([$3, Y], this.commandOptions));
  zunionstore = (...$3) => this.chain(new d9($3, this.commandOptions));
  zunion = (...$3) => this.chain(new t9($3, this.commandOptions));
  get json() {
    return { arrappend: (...$3) => this.chain(new v$($3, this.commandOptions)), arrindex: (...$3) => this.chain(new f$($3, this.commandOptions)), arrinsert: (...$3) => this.chain(new k$($3, this.commandOptions)), arrlen: (...$3) => this.chain(new y$($3, this.commandOptions)), arrpop: (...$3) => this.chain(new C$($3, this.commandOptions)), arrtrim: (...$3) => this.chain(new u$($3, this.commandOptions)), clear: (...$3) => this.chain(new l$($3, this.commandOptions)), del: (...$3) => this.chain(new i$($3, this.commandOptions)), forget: (...$3) => this.chain(new g$($3, this.commandOptions)), get: (...$3) => this.chain(new c$($3, this.commandOptions)), merge: (...$3) => this.chain(new p$($3, this.commandOptions)), mget: (...$3) => this.chain(new n$($3, this.commandOptions)), mset: (...$3) => this.chain(new t$($3, this.commandOptions)), numincrby: (...$3) => this.chain(new d$($3, this.commandOptions)), nummultby: (...$3) => this.chain(new r$($3, this.commandOptions)), objkeys: (...$3) => this.chain(new e$($3, this.commandOptions)), objlen: (...$3) => this.chain(new o$($3, this.commandOptions)), resp: (...$3) => this.chain(new m$($3, this.commandOptions)), set: (...$3) => this.chain(new a$($3, this.commandOptions)), strappend: (...$3) => this.chain(new s$($3, this.commandOptions)), strlen: (...$3) => this.chain(new $0($3, this.commandOptions)), toggle: (...$3) => this.chain(new Y0($3, this.commandOptions)), type: (...$3) => this.chain(new Q0($3, this.commandOptions)) };
  }
  get functions() {
    return { load: (...$3) => this.chain(new p1($3, this.commandOptions)), list: (...$3) => this.chain(new c1($3, this.commandOptions)), delete: (...$3) => this.chain(new i1($3, this.commandOptions)), flush: () => this.chain(new g1(this.commandOptions)), stats: () => this.chain(new n1(this.commandOptions)), call: (...$3) => this.chain(new y1($3, this.commandOptions)), callRo: (...$3) => this.chain(new C1($3, this.commandOptions)) };
  }
};
var u2 = 1e3;
var eY = /* @__PURE__ */ new Set(["arcount", "arget", "argetrange", "argrep", "arinfo", "arlastitems", "arlen", "armget", "arnext", "arop", "arscan", "get", "getrange", "mget", "strlen", "bitcount", "bitpos", "getbit", "hexists", "hget", "hgetall", "hkeys", "hlen", "hmget", "hrandfield", "hscan", "hstrlen", "httl", "hvals", "hexpiretime", "hpexpiretime", "hpttl", "lindex", "llen", "lpos", "lrange", "scard", "sdiff", "sinter", "sintercard", "sismember", "smembers", "smismember", "srandmember", "sscan", "sunion", "zcard", "zcount", "zlexcount", "zmscore", "zrange", "zrank", "zrevrank", "zscan", "zscore", "zunion", "exists", "type", "ttl", "pttl", "randomkey", "touch", "pfcount", "xinfo", "xlen", "xpending", "xrange", "xread", "xrevrange", "geodist", "geohash", "geopos", "geosearch", "scriptExists", "evalRo", "evalshaRo", "dbsize", "echo", "ping", "time", "scan", "keys", "arrindex", "arrlen", "objkeys", "objlen", "resp", "list", "stats", "callRo"]);
var oY = /* @__PURE__ */ new Set(["scan", "keys", "flushdb", "flushall", "dbsize", "hscan", "hgetall", "hkeys", "lrange", "sscan", "smembers", "xrange", "xrevrange", "zscan", "zrange", "exec"]);
function S($3, Y = "root") {
  let Q2 = $3;
  if (!Q2.autoPipelineExecutor) Q2.autoPipelineExecutor = new mY(Q2);
  return new Proxy(Q2, { get: (W, T2) => {
    if (T2 === "pipelineCounter") return W.autoPipelineExecutor.pipelineCounter;
    if (Y === "root" && T2 === "json") return S(W, "json");
    if (Y === "root" && T2 === "functions") return S(W, "functions");
    if (Y === "root") {
      let D = T2 in W && !(T2 in W.autoPipelineExecutor.pipeline), G = oY.has(T2);
      if (D || G) return W[T2];
    }
    let V = W.autoPipelineExecutor.pipeline, U2 = Y === "json" ? V.json[T2] : Y === "functions" ? V.functions[T2] : V[T2];
    if (typeof U2 === "function") return (...D) => {
      let G = eY.has(T2) ? "read" : "write";
      return W.autoPipelineExecutor.withAutoPipeline(G, (X) => {
        (Y === "json" ? X.json[T2] : Y === "functions" ? X.functions[T2] : X[T2])(...D);
      });
    };
    return U2;
  } });
}
var mY = class {
  pipelinePromises = /* @__PURE__ */ new WeakMap();
  activeReadPipeline = null;
  activeWritePipeline = null;
  readIndex = 0;
  writeIndex = 0;
  redis;
  pipeline;
  pipelineCounter = 0;
  constructor($3) {
    this.redis = $3, this.pipeline = $3.pipeline();
  }
  async withAutoPipeline($3, Y) {
    let Q2 = $3 === "read", W = Q2 ? this.activeReadPipeline : this.activeWritePipeline, T2 = W ?? this.redis.pipeline();
    if (!W) if (Q2) this.activeReadPipeline = T2, this.readIndex = 0;
    else this.activeWritePipeline = T2, this.writeIndex = 0;
    let V = Q2 ? this.readIndex++ : this.writeIndex++;
    if (Y(T2), Q2 && this.readIndex >= u2) this.activeReadPipeline = null;
    else if (!Q2 && this.writeIndex >= u2) this.activeWritePipeline = null;
    let D = (await this.deferExecution().then(() => {
      if (!this.pipelinePromises.has(T2)) {
        let G = T2.exec({ keepErrors: true });
        if (this.pipelineCounter += 1, this.pipelinePromises.set(T2, G), this.activeReadPipeline === T2) this.activeReadPipeline = null;
        if (this.activeWritePipeline === T2) this.activeWritePipeline = null;
      }
      return this.pipelinePromises.get(T2);
    }))[V];
    if (D.error) throw new H(`Command failed: ${D.error}`);
    return D.result;
  }
  async deferExecution() {
    await Promise.resolve(), await Promise.resolve();
  }
};
var aY = class extends z {
  constructor($3, Y) {
    let Q2 = { Accept: "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" };
    super([], { ...Y, headers: Q2, path: ["psubscribe", ...$3], streamOptions: { isStreaming: true, onMessage: Y?.streamOptions?.onMessage, signal: Y?.streamOptions?.signal } });
  }
};
var l2 = class extends EventTarget {
  subscriptions;
  client;
  listeners;
  opts;
  constructor($3, Y, Q2 = false, W) {
    super();
    this.client = $3, this.subscriptions = /* @__PURE__ */ new Map(), this.listeners = /* @__PURE__ */ new Map(), this.opts = W;
    for (let T2 of Y) if (Q2) this.subscribeToPattern(T2);
    else this.subscribeToChannel(T2);
  }
  subscribeToChannel($3) {
    let Y = new AbortController(), Q2 = new sY([$3], { streamOptions: { signal: Y.signal, onMessage: (W) => this.handleMessage(W, false) } });
    Q2.exec(this.client).catch((W) => {
      if (W.name !== "AbortError") this.dispatchToListeners("error", W);
    }), this.subscriptions.set($3, { command: Q2, controller: Y, isPattern: false });
  }
  subscribeToPattern($3) {
    let Y = new AbortController(), Q2 = new aY([$3], { streamOptions: { signal: Y.signal, onMessage: (W) => this.handleMessage(W, true) } });
    Q2.exec(this.client).catch((W) => {
      if (W.name !== "AbortError") this.dispatchToListeners("error", W);
    }), this.subscriptions.set($3, { command: Q2, controller: Y, isPattern: true });
  }
  handleMessage($3, Y) {
    let Q2 = $3.replace(/^data:\s*/, ""), W = Q2.indexOf(","), T2 = Q2.indexOf(",", W + 1), V = Y ? Q2.indexOf(",", T2 + 1) : -1;
    if (W !== -1 && T2 !== -1) {
      let U2 = Q2.slice(0, W);
      if (Y && U2 === "pmessage" && V !== -1) {
        let M2 = Q2.slice(W + 1, T2), D = Q2.slice(T2 + 1, V), G = Q2.slice(V + 1);
        try {
          let X = this.opts?.automaticDeserialization === false ? G : JSON.parse(G);
          this.dispatchToListeners("pmessage", { pattern: M2, channel: D, message: X }), this.dispatchToListeners(`pmessage:${M2}`, { pattern: M2, channel: D, message: X });
        } catch (X) {
          this.dispatchToListeners("error", Error(`Failed to parse message: ${X}`));
        }
      } else {
        let M2 = Q2.slice(W + 1, T2), D = Q2.slice(T2 + 1);
        try {
          if (U2 === "subscribe" || U2 === "psubscribe" || U2 === "unsubscribe" || U2 === "punsubscribe") {
            let G = Number.parseInt(D);
            this.dispatchToListeners(U2, G);
          } else {
            let G = this.opts?.automaticDeserialization === false ? D : $8(D);
            this.dispatchToListeners(U2, { channel: M2, message: G }), this.dispatchToListeners(`${U2}:${M2}`, { channel: M2, message: G });
          }
        } catch (G) {
          this.dispatchToListeners("error", Error(`Failed to parse message: ${G}`));
        }
      }
    }
  }
  dispatchToListeners($3, Y) {
    let Q2 = this.listeners.get($3);
    if (Q2) for (let W of Q2) W(Y);
  }
  on($3, Y) {
    if (!this.listeners.has($3)) this.listeners.set($3, /* @__PURE__ */ new Set());
    this.listeners.get($3)?.add(Y);
  }
  removeAllListeners() {
    this.listeners.clear();
  }
  async unsubscribe($3) {
    if ($3) for (let Y of $3) {
      let Q2 = this.subscriptions.get(Y);
      if (Q2) {
        try {
          Q2.controller.abort();
        } catch {
        }
        this.subscriptions.delete(Y);
      }
    }
    else {
      for (let Y of this.subscriptions.values()) try {
        Y.controller.abort();
      } catch {
      }
      this.subscriptions.clear(), this.removeAllListeners();
    }
  }
  getSubscribedChannels() {
    return [...this.subscriptions.keys()];
  }
};
var sY = class extends z {
  constructor($3, Y) {
    let Q2 = { Accept: "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" };
    super([], { ...Y, headers: Q2, path: ["subscribe", ...$3], streamOptions: { isStreaming: true, onMessage: Y?.streamOptions?.onMessage, signal: Y?.streamOptions?.signal } });
  }
};
var $8 = ($3) => {
  try {
    return JSON.parse($3);
  } catch {
    return $3;
  }
};
var Y8 = class {
  script;
  sha1;
  initPromise;
  redis;
  constructor($3, Y) {
    this.redis = $3, this.script = Y, this.sha1 = "", this.init(Y);
  }
  init($3) {
    if (!this.initPromise) this.initPromise = this.digest($3).then((Y) => {
      this.sha1 = Y;
    });
    return this.initPromise;
  }
  async eval($3, Y) {
    return await this.init(this.script), await this.redis.eval(this.script, $3, Y);
  }
  async evalsha($3, Y) {
    return await this.init(this.script), await this.redis.evalsha(this.sha1, $3, Y);
  }
  async exec($3, Y) {
    return await this.init(this.script), await this.redis.evalsha(this.sha1, $3, Y).catch(async (W) => {
      if (W instanceof Error && W.message.toLowerCase().includes("noscript")) return await this.redis.eval(this.script, $3, Y);
      throw W;
    });
  }
  async digest($3) {
    let Y = new TextEncoder().encode($3), Q2 = await q2.digest("SHA-1", Y);
    return [...new Uint8Array(Q2)].map((T2) => T2.toString(16).padStart(2, "0")).join("");
  }
};
var Q8 = class {
  script;
  sha1;
  initPromise;
  redis;
  constructor($3, Y) {
    this.redis = $3, this.sha1 = "", this.script = Y, this.init(Y);
  }
  init($3) {
    if (!this.initPromise) this.initPromise = this.digest($3).then((Y) => {
      this.sha1 = Y;
    });
    return this.initPromise;
  }
  async evalRo($3, Y) {
    return await this.init(this.script), await this.redis.evalRo(this.script, $3, Y);
  }
  async evalshaRo($3, Y) {
    return await this.init(this.script), await this.redis.evalshaRo(this.sha1, $3, Y);
  }
  async exec($3, Y) {
    return await this.init(this.script), await this.redis.evalshaRo(this.sha1, $3, Y).catch(async (W) => {
      if (W instanceof Error && W.message.toLowerCase().includes("noscript")) return await this.redis.evalRo(this.script, $3, Y);
      throw W;
    });
  }
  async digest($3) {
    let Y = new TextEncoder().encode($3), Q2 = await q2.digest("SHA-1", Y);
    return [...new Uint8Array(Q2)].map((T2) => T2.toString(16).padStart(2, "0")).join("");
  }
};
var o9 = class {
  client;
  opts;
  enableTelemetry;
  enableAutoPipelining;
  constructor($3, Y) {
    if (this.client = $3, this.opts = Y, this.enableTelemetry = Y?.enableTelemetry ?? true, Y?.readYourWrites === false) this.client.readYourWrites = false;
    this.enableAutoPipelining = Y?.enableAutoPipelining ?? true;
  }
  get readYourWritesSyncToken() {
    return this.client.upstashSyncToken;
  }
  set readYourWritesSyncToken($3) {
    this.client.upstashSyncToken = $3;
  }
  get json() {
    return { arrappend: (...$3) => new v$($3, this.opts).exec(this.client), arrindex: (...$3) => new f$($3, this.opts).exec(this.client), arrinsert: (...$3) => new k$($3, this.opts).exec(this.client), arrlen: (...$3) => new y$($3, this.opts).exec(this.client), arrpop: (...$3) => new C$($3, this.opts).exec(this.client), arrtrim: (...$3) => new u$($3, this.opts).exec(this.client), clear: (...$3) => new l$($3, this.opts).exec(this.client), del: (...$3) => new i$($3, this.opts).exec(this.client), forget: (...$3) => new g$($3, this.opts).exec(this.client), get: (...$3) => new c$($3, this.opts).exec(this.client), merge: (...$3) => new p$($3, this.opts).exec(this.client), mget: (...$3) => new n$($3, this.opts).exec(this.client), mset: (...$3) => new t$($3, this.opts).exec(this.client), numincrby: (...$3) => new d$($3, this.opts).exec(this.client), nummultby: (...$3) => new r$($3, this.opts).exec(this.client), objkeys: (...$3) => new e$($3, this.opts).exec(this.client), objlen: (...$3) => new o$($3, this.opts).exec(this.client), resp: (...$3) => new m$($3, this.opts).exec(this.client), set: (...$3) => new a$($3, this.opts).exec(this.client), strappend: (...$3) => new s$($3, this.opts).exec(this.client), strlen: (...$3) => new $0($3, this.opts).exec(this.client), toggle: (...$3) => new Y0($3, this.opts).exec(this.client), type: (...$3) => new Q0($3, this.opts).exec(this.client) };
  }
  get functions() {
    return { load: (...$3) => new p1($3, this.opts).exec(this.client), list: (...$3) => new c1($3, this.opts).exec(this.client), delete: (...$3) => new i1($3, this.opts).exec(this.client), flush: () => new g1(this.opts).exec(this.client), stats: () => new n1(this.opts).exec(this.client), call: (...$3) => new y1($3, this.opts).exec(this.client), callRo: (...$3) => new C1($3, this.opts).exec(this.client) };
  }
  use = ($3) => {
    let Y = this.client.request.bind(this.client);
    this.client.request = (Q2) => $3(Q2, Y);
  };
  addTelemetry = ($3) => {
    if (!this.enableTelemetry) return;
    try {
      this.client.mergeTelemetry($3);
    } catch {
    }
  };
  createScript($3, Y) {
    return Y?.readonly ? new Q8(this, $3) : new Y8(this, $3);
  }
  get search() {
    return { createIndex: ($3) => {
      return qY(this.client, $3);
    }, index: ($3) => {
      return m2(this.client, $3);
    }, alias: { list: () => {
      return FY(this.client);
    }, add: ({ indexName: $3, alias: Y }) => {
      return jY(this.client, { indexName: $3, alias: Y });
    }, delete: ({ alias: $3 }) => {
      return EY(this.client, { alias: $3 });
    } } };
  }
  get vector() {
    return { createIndex: ($3) => {
      return kY(this.client, $3, this.opts);
    }, index: ($3) => {
      return yY(this.client, $3, this.opts);
    } };
  }
  pipeline = () => new C({ client: this.client, commandOptions: this.opts, multiExec: false });
  autoPipeline = () => {
    return S(this);
  };
  multi = () => new C({ client: this.client, commandOptions: this.opts, multiExec: true });
  bitfield = (...$3) => new q1($3, this.client, this.opts);
  append = (...$3) => new $1($3, this.opts).exec(this.client);
  arcount = (...$3) => new Y1($3, this.opts).exec(this.client);
  ardel = (...$3) => new Q1($3, this.opts).exec(this.client);
  ardelrange = (...$3) => new W1($3, this.opts).exec(this.client);
  arget = (...$3) => new T1($3, this.opts).exec(this.client);
  argetrange = (...$3) => new z1($3, this.opts).exec(this.client);
  argrep = ($3, Y, Q2, W) => new V1([$3, Y, Q2, W], this.opts).exec(this.client);
  arinfo = (...$3) => new U1($3, this.opts).exec(this.client);
  arinsert = ($3, ...Y) => new M1([$3, ...Y], this.opts).exec(this.client);
  arlastitems = (...$3) => new D1($3, this.opts).exec(this.client);
  arlen = (...$3) => new G1($3, this.opts).exec(this.client);
  armget = (...$3) => new Z1($3, this.opts).exec(this.client);
  armset = ($3, Y) => new X1([$3, Y], this.opts).exec(this.client);
  arnext = (...$3) => new w1($3, this.opts).exec(this.client);
  arop = ($3, Y, Q2, W) => new L1([$3, Y, Q2, W], this.opts).exec(this.client);
  arring = ($3, Y, ...Q2) => new _1([$3, Y, ...Q2], this.opts).exec(this.client);
  arscan = (...$3) => new N1($3, this.opts).exec(this.client);
  arseek = (...$3) => new H1($3, this.opts).exec(this.client);
  arset = ($3, Y, ...Q2) => new J1([$3, Y, ...Q2], this.opts).exec(this.client);
  bitcount = (...$3) => new K1($3, this.opts).exec(this.client);
  bitop = ($3, Y, Q2, ...W) => new F1([$3, Y, Q2, ...W], this.opts).exec(this.client);
  bitpos = (...$3) => new j1($3, this.opts).exec(this.client);
  clientSetinfo = (...$3) => new E1($3, this.opts).exec(this.client);
  copy = (...$3) => new B1($3, this.opts).exec(this.client);
  dbsize = () => new I1(this.opts).exec(this.client);
  decr = (...$3) => new P1($3, this.opts).exec(this.client);
  decrby = (...$3) => new h1($3, this.opts).exec(this.client);
  del = (...$3) => new A1($3, this.opts).exec(this.client);
  echo = (...$3) => new S1($3, this.opts).exec(this.client);
  evalRo = (...$3) => new x1($3, this.opts).exec(this.client);
  eval = (...$3) => new R1($3, this.opts).exec(this.client);
  evalshaRo = (...$3) => new O1($3, this.opts).exec(this.client);
  evalsha = (...$3) => new b1($3, this.opts).exec(this.client);
  exec = ($3) => new _($3, this.opts).exec(this.client);
  exists = (...$3) => new v1($3, this.opts).exec(this.client);
  expire = (...$3) => new f1($3, this.opts).exec(this.client);
  expireat = (...$3) => new k1($3, this.opts).exec(this.client);
  flushall = ($3) => new u1($3, this.opts).exec(this.client);
  flushdb = (...$3) => new l1($3, this.opts).exec(this.client);
  geoadd = (...$3) => new t1($3, this.opts).exec(this.client);
  geopos = (...$3) => new e1($3, this.opts).exec(this.client);
  geodist = (...$3) => new d1($3, this.opts).exec(this.client);
  geohash = (...$3) => new r1($3, this.opts).exec(this.client);
  geosearch = (...$3) => new o1($3, this.opts).exec(this.client);
  geosearchstore = (...$3) => new m1($3, this.opts).exec(this.client);
  get = (...$3) => new a1($3, this.opts).exec(this.client);
  getbit = (...$3) => new s1($3, this.opts).exec(this.client);
  getdel = (...$3) => new $$($3, this.opts).exec(this.client);
  getex = (...$3) => new Y$($3, this.opts).exec(this.client);
  getrange = (...$3) => new Q$($3, this.opts).exec(this.client);
  getset = ($3, Y) => new W$([$3, Y], this.opts).exec(this.client);
  hdel = (...$3) => new T$($3, this.opts).exec(this.client);
  hexists = (...$3) => new z$($3, this.opts).exec(this.client);
  hexpire = (...$3) => new V$($3, this.opts).exec(this.client);
  hexpireat = (...$3) => new U$($3, this.opts).exec(this.client);
  hexpiretime = (...$3) => new M$($3, this.opts).exec(this.client);
  httl = (...$3) => new S$($3, this.opts).exec(this.client);
  hpexpire = (...$3) => new G$($3, this.opts).exec(this.client);
  hpexpireat = (...$3) => new Z$($3, this.opts).exec(this.client);
  hpexpiretime = (...$3) => new X$($3, this.opts).exec(this.client);
  hpttl = (...$3) => new w$($3, this.opts).exec(this.client);
  hpersist = (...$3) => new D$($3, this.opts).exec(this.client);
  hget = (...$3) => new L$($3, this.opts).exec(this.client);
  hgetall = (...$3) => new _$($3, this.opts).exec(this.client);
  hgetdel = (...$3) => new H$($3, this.opts).exec(this.client);
  hgetex = (...$3) => new J$($3, this.opts).exec(this.client);
  hincrby = (...$3) => new K$($3, this.opts).exec(this.client);
  hincrbyfloat = (...$3) => new q$($3, this.opts).exec(this.client);
  hkeys = (...$3) => new F$($3, this.opts).exec(this.client);
  hlen = (...$3) => new j$($3, this.opts).exec(this.client);
  hmget = (...$3) => new N$($3, this.opts).exec(this.client);
  hmset = ($3, Y) => new E$([$3, Y], this.opts).exec(this.client);
  hrandfield = ($3, Y, Q2) => new s2([$3, Y, Q2], this.opts).exec(this.client);
  hscan = (...$3) => new B$($3, this.opts).exec(this.client);
  hset = ($3, Y) => new I$([$3, Y], this.opts).exec(this.client);
  hsetex = (...$3) => new P$($3, this.opts).exec(this.client);
  hsetnx = ($3, Y, Q2) => new h$([$3, Y, Q2], this.opts).exec(this.client);
  hstrlen = (...$3) => new A$($3, this.opts).exec(this.client);
  hvals = (...$3) => new x$($3, this.opts).exec(this.client);
  incr = (...$3) => new R$($3, this.opts).exec(this.client);
  incrby = (...$3) => new O$($3, this.opts).exec(this.client);
  incrbyfloat = (...$3) => new b$($3, this.opts).exec(this.client);
  keys = (...$3) => new W0($3, this.opts).exec(this.client);
  lindex = (...$3) => new T0($3, this.opts).exec(this.client);
  linsert = ($3, Y, Q2, W) => new z0([$3, Y, Q2, W], this.opts).exec(this.client);
  llen = (...$3) => new V0($3, this.opts).exec(this.client);
  lmove = (...$3) => new U0($3, this.opts).exec(this.client);
  lpop = (...$3) => new D0($3, this.opts).exec(this.client);
  lmpop = (...$3) => new M0($3, this.opts).exec(this.client);
  lpos = (...$3) => new G0($3, this.opts).exec(this.client);
  lpush = ($3, ...Y) => new Z0([$3, ...Y], this.opts).exec(this.client);
  lpushx = ($3, ...Y) => new X0([$3, ...Y], this.opts).exec(this.client);
  lrange = (...$3) => new w0($3, this.opts).exec(this.client);
  lrem = ($3, Y, Q2) => new L0([$3, Y, Q2], this.opts).exec(this.client);
  lset = ($3, Y, Q2) => new _0([$3, Y, Q2], this.opts).exec(this.client);
  ltrim = (...$3) => new N0($3, this.opts).exec(this.client);
  mget = (...$3) => new H0($3, this.opts).exec(this.client);
  mset = ($3) => new J0([$3], this.opts).exec(this.client);
  msetnx = ($3) => new K0([$3], this.opts).exec(this.client);
  persist = (...$3) => new q0($3, this.opts).exec(this.client);
  pexpire = (...$3) => new F0($3, this.opts).exec(this.client);
  pexpireat = (...$3) => new j0($3, this.opts).exec(this.client);
  pfadd = (...$3) => new E0($3, this.opts).exec(this.client);
  pfcount = (...$3) => new B0($3, this.opts).exec(this.client);
  pfmerge = (...$3) => new I0($3, this.opts).exec(this.client);
  ping = ($3) => new P0($3, this.opts).exec(this.client);
  psetex = ($3, Y, Q2) => new h0([$3, Y, Q2], this.opts).exec(this.client);
  psubscribe = ($3) => {
    let Y = Array.isArray($3) ? $3 : [$3];
    return new l2(this.client, Y, true, this.opts);
  };
  pttl = (...$3) => new A0($3, this.opts).exec(this.client);
  publish = (...$3) => new S0($3, this.opts).exec(this.client);
  randomkey = () => new x0().exec(this.client);
  rename = (...$3) => new R0($3, this.opts).exec(this.client);
  renamenx = (...$3) => new O0($3, this.opts).exec(this.client);
  rpop = (...$3) => new b0($3, this.opts).exec(this.client);
  rpush = ($3, ...Y) => new v0([$3, ...Y], this.opts).exec(this.client);
  rpushx = ($3, ...Y) => new f0([$3, ...Y], this.opts).exec(this.client);
  sadd = ($3, Y, ...Q2) => new k0([$3, Y, ...Q2], this.opts).exec(this.client);
  scan($3, Y) {
    return new y0([$3, Y], this.opts).exec(this.client);
  }
  scard = (...$3) => new C0($3, this.opts).exec(this.client);
  scriptExists = (...$3) => new u0($3, this.opts).exec(this.client);
  scriptFlush = (...$3) => new l0($3, this.opts).exec(this.client);
  scriptLoad = (...$3) => new i0($3, this.opts).exec(this.client);
  sdiff = (...$3) => new g0($3, this.opts).exec(this.client);
  sdiffstore = (...$3) => new c0($3, this.opts).exec(this.client);
  set = ($3, Y, Q2) => new p0([$3, Y, Q2], this.opts).exec(this.client);
  setbit = (...$3) => new n0($3, this.opts).exec(this.client);
  setex = ($3, Y, Q2) => new t0([$3, Y, Q2], this.opts).exec(this.client);
  setnx = ($3, Y) => new d0([$3, Y], this.opts).exec(this.client);
  setrange = (...$3) => new r0($3, this.opts).exec(this.client);
  sinter = (...$3) => new e0($3, this.opts).exec(this.client);
  sintercard = (...$3) => new o0($3, this.opts).exec(this.client);
  sinterstore = (...$3) => new m0($3, this.opts).exec(this.client);
  sismember = ($3, Y) => new a0([$3, Y], this.opts).exec(this.client);
  smismember = ($3, Y) => new $9([$3, Y], this.opts).exec(this.client);
  smembers = (...$3) => new s0($3, this.opts).exec(this.client);
  smove = ($3, Y, Q2) => new Y9([$3, Y, Q2], this.opts).exec(this.client);
  spop = (...$3) => new Q9($3, this.opts).exec(this.client);
  srandmember = (...$3) => new W9($3, this.opts).exec(this.client);
  srem = ($3, ...Y) => new T9([$3, ...Y], this.opts).exec(this.client);
  sscan = (...$3) => new z9($3, this.opts).exec(this.client);
  strlen = (...$3) => new V9($3, this.opts).exec(this.client);
  subscribe = ($3) => {
    let Y = Array.isArray($3) ? $3 : [$3];
    return new l2(this.client, Y, false, this.opts);
  };
  sunion = (...$3) => new U9($3, this.opts).exec(this.client);
  sunionstore = (...$3) => new M9($3, this.opts).exec(this.client);
  time = () => new D9().exec(this.client);
  touch = (...$3) => new G9($3, this.opts).exec(this.client);
  ttl = (...$3) => new Z9($3, this.opts).exec(this.client);
  type = (...$3) => new X9($3, this.opts).exec(this.client);
  unlink = (...$3) => new w9($3, this.opts).exec(this.client);
  xadd = (...$3) => new N9($3, this.opts).exec(this.client);
  xack = (...$3) => new L9($3, this.opts).exec(this.client);
  xackdel = (...$3) => new _9($3, this.opts).exec(this.client);
  xdel = (...$3) => new K9($3, this.opts).exec(this.client);
  xdelex = (...$3) => new q9($3, this.opts).exec(this.client);
  xgroup = (...$3) => new F9($3, this.opts).exec(this.client);
  xread = (...$3) => new P9($3, this.opts).exec(this.client);
  xreadgroup = (...$3) => new h9($3, this.opts).exec(this.client);
  xinfo = (...$3) => new j9($3, this.opts).exec(this.client);
  xlen = (...$3) => new E9($3, this.opts).exec(this.client);
  xpending = (...$3) => new B9($3, this.opts).exec(this.client);
  xclaim = (...$3) => new J9($3, this.opts).exec(this.client);
  xautoclaim = (...$3) => new H9($3, this.opts).exec(this.client);
  xtrim = (...$3) => new S9($3, this.opts).exec(this.client);
  xrange = (...$3) => new I9($3, this.opts).exec(this.client);
  xrevrange = (...$3) => new A9($3, this.opts).exec(this.client);
  zadd = (...$3) => {
    if ("score" in $3[1]) return new j([$3[0], $3[1], ...$3.slice(2)], this.opts).exec(this.client);
    return new j([$3[0], $3[1], ...$3.slice(2)], this.opts).exec(this.client);
  };
  zcard = (...$3) => new x9($3, this.opts).exec(this.client);
  zcount = (...$3) => new R9($3, this.opts).exec(this.client);
  zdiffstore = (...$3) => new r9($3, this.opts).exec(this.client);
  zincrby = ($3, Y, Q2) => new O9([$3, Y, Q2], this.opts).exec(this.client);
  zinterstore = (...$3) => new b9($3, this.opts).exec(this.client);
  zlexcount = (...$3) => new v9($3, this.opts).exec(this.client);
  zmscore = (...$3) => new e9($3, this.opts).exec(this.client);
  zpopmax = (...$3) => new f9($3, this.opts).exec(this.client);
  zpopmin = (...$3) => new k9($3, this.opts).exec(this.client);
  zrange = (...$3) => new y9($3, this.opts).exec(this.client);
  zrank = ($3, Y) => new C9([$3, Y], this.opts).exec(this.client);
  zrem = ($3, ...Y) => new u9([$3, ...Y], this.opts).exec(this.client);
  zremrangebylex = (...$3) => new l9($3, this.opts).exec(this.client);
  zremrangebyrank = (...$3) => new i9($3, this.opts).exec(this.client);
  zremrangebyscore = (...$3) => new g9($3, this.opts).exec(this.client);
  zrevrank = ($3, Y) => new c9([$3, Y], this.opts).exec(this.client);
  zscan = (...$3) => new p9($3, this.opts).exec(this.client);
  zscore = ($3, Y) => new n9([$3, Y], this.opts).exec(this.client);
  zunion = (...$3) => new t9($3, this.opts).exec(this.client);
  zunionstore = (...$3) => new d9($3, this.opts).exec(this.client);
};
var m9 = "v1.41.0";
if (typeof atob > "u") global.atob = ($3) => Buffer.from($3, "base64").toString("utf8");
var a9 = class $2 extends o9 {
  constructor(Y) {
    if ("request" in Y) {
      super(Y);
      return;
    }
    if (!Y.url) console.warn("[Upstash Redis] The 'url' property is missing or undefined in your Redis config. To create a database instantly (no signup needed), run: curl -X POST https://upstash.com/start-redis");
    else if (Y.url.startsWith(" ") || Y.url.endsWith(" ") || /\r|\n/.test(Y.url)) console.warn("[Upstash Redis] The redis url contains whitespace or newline, which can cause errors!");
    if (!Y.token) console.warn("[Upstash Redis] The 'token' property is missing or undefined in your Redis config. To create a database instantly (no signup needed), run: curl -X POST https://upstash.com/start-redis");
    else if (Y.token.startsWith(" ") || Y.token.endsWith(" ") || /\r|\n/.test(Y.token)) console.warn("[Upstash Redis] The redis token contains whitespace or newline, which can cause errors!");
    let Q2 = new n({ baseUrl: Y.url, retry: Y.retry, headers: { authorization: `Bearer ${Y.token}` }, agent: Y.agent, responseEncoding: Y.responseEncoding, cache: Y.cache ?? "no-store", signal: Y.signal, keepAlive: Y.keepAlive, readYourWrites: Y.readYourWrites }), W = typeof process === "object" && process && typeof process.env === "object" && process.env ? process.env : {};
    super(Q2, { automaticDeserialization: Y.automaticDeserialization, enableTelemetry: Y.enableTelemetry ?? !W.UPSTASH_DISABLE_TELEMETRY, latencyLogging: Y.latencyLogging, enableAutoPipelining: Y.enableAutoPipelining });
    let T2 = typeof process === "object" && process ? process.version : void 0;
    if (this.addTelemetry({ runtime: typeof EdgeRuntime === "string" ? "edge-light" : T2 ? `node@${T2}` : "unknown", platform: W.UPSTASH_CONSOLE ? "console" : W.VERCEL ? "vercel" : W.AWS_REGION ? "aws" : "unknown", sdk: `@upstash/redis@${m9}` }), this.enableAutoPipelining) return this.autoPipeline();
  }
  static fromEnv(Y) {
    if (typeof process !== "object" || !process || typeof process.env !== "object" || !process.env) throw TypeError('[Upstash Redis] Unable to get environment variables, `process.env` is undefined. If you are deploying to cloudflare, please import from "@upstash/redis/cloudflare" instead');
    let Q2 = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    if (!Q2) console.warn("[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_URL`. To create a database instantly (no signup needed), run: curl -X POST https://upstash.com/start-redis");
    let W = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    if (!W) console.warn("[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_TOKEN`. To create a database instantly (no signup needed), run: curl -X POST https://upstash.com/start-redis");
    return new $2({ ...Y, url: Q2, token: W });
  }
};
var T8 = class {
  options;
  type = "cache";
  name = "RedisDriver";
  tcpClient;
  httpClient;
  prefix;
  logger;
  constructor($3) {
    this.options = $3;
    this.logger = new s();
  }
  initClients() {
    if (this.options.protocol === "http") this.httpClient = new a9({ url: this.options.url, token: this.options.token });
    else this.tcpClient = new import_ioredis.Redis(this.options.connectionString, { lazyConnect: true, maxRetriesPerRequest: 3 });
  }
  setKeyPrefix($3) {
    this.prefix = $3;
  }
  async connect() {
    if (this.options.protocol == "tcp") {
      if (!this.tcpClient) this.initClients();
      if (!this.tcpClient) throw Error("TCP Client could not found");
      let $3 = this.tcpClient.status;
      if ($3 === "end" || $3 === "close") this.initClients();
      if (this.tcpClient.status === "wait") await this.tcpClient.connect(), this.logger.log(`[RedisDriver] : TCP Connected to ${this.options.connectionString}`);
    } else if (this.options.protocol == "http") {
      if (!this.httpClient) this.initClients();
      let $3 = await this.httpClient.ping();
      if ($3.toLowerCase() === "pong") this.logger.log("[RedisDriver] : HTTP REST client initialized.");
      else this.logger.warn("[RedisDriver] : HTTP REST client initialized, but ping failed with unexpected response:", $3);
    }
  }
  async disconnect() {
    if (this.options.protocol == "tcp" && this.tcpClient) {
      let $3 = this.tcpClient.status;
      if ($3 !== "end" && $3 !== "close") try {
        await this.tcpClient.quit(), this.logger.log("[RedisDriver] : TCP Disconnected.");
      } catch (Y) {
        this.tcpClient.disconnect();
      }
    }
  }
  async healthCheck() {
    let $3 = Date.now();
    try {
      if (this.options.protocol === "tcp") await this.tcpClient.ping();
      else await this.httpClient.ping();
      return { status: "up", latencyMs: Date.now() - $3 };
    } catch (Y) {
      return { status: "down", latencyMs: Date.now() - $3, details: { error: Y.message } };
    }
  }
  getNativeClient($3) {
    if (($3 ?? this.options.protocol) === "tcp") {
      if (!this.tcpClient) throw Error("[RedisDriver] : TCP client is not initialized.");
      return this.tcpClient;
    }
    if (!this.httpClient) throw Error("[RedisDriver] : REST client is not initialized.");
    return this.httpClient;
  }
};

// ../../node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_index.default;

// ../../node_modules/@nightx.co/pulsar-client/dist/chunk-wrqk568g.js
var w = $((Wk) => {
  Object.defineProperty(Wk, "__esModule", { value: true });
  Wk.utf8Count = qW;
  Wk.utf8EncodeJs = b3;
  Wk.utf8EncodeTE = t2;
  Wk.utf8Encode = JW;
  Wk.utf8DecodeJs = e2;
  Wk.utf8DecodeTD = kk;
  Wk.utf8Decode = IW;
  function qW(k2) {
    let W = k2.length, l3 = 0, q3 = 0;
    while (q3 < W) {
      let $3 = k2.charCodeAt(q3++);
      if (($3 & 4294967168) === 0) {
        l3++;
        continue;
      } else if (($3 & 4294965248) === 0) l3 += 2;
      else {
        if ($3 >= 55296 && $3 <= 56319) {
          if (q3 < W) {
            let P3 = k2.charCodeAt(q3);
            if ((P3 & 64512) === 56320) ++q3, $3 = (($3 & 1023) << 10) + (P3 & 1023) + 65536;
          }
        }
        if (($3 & 4294901760) === 0) l3 += 3;
        else l3 += 4;
      }
    }
    return l3;
  }
  function b3(k2, W, l3) {
    let q3 = k2.length, $3 = l3, P3 = 0;
    while (P3 < q3) {
      let J2 = k2.charCodeAt(P3++);
      if ((J2 & 4294967168) === 0) {
        W[$3++] = J2;
        continue;
      } else if ((J2 & 4294965248) === 0) W[$3++] = J2 >> 6 & 31 | 192;
      else {
        if (J2 >= 55296 && J2 <= 56319) {
          if (P3 < q3) {
            let N2 = k2.charCodeAt(P3);
            if ((N2 & 64512) === 56320) ++P3, J2 = ((J2 & 1023) << 10) + (N2 & 1023) + 65536;
          }
        }
        if ((J2 & 4294901760) === 0) W[$3++] = J2 >> 12 & 15 | 224, W[$3++] = J2 >> 6 & 63 | 128;
        else W[$3++] = J2 >> 18 & 7 | 240, W[$3++] = J2 >> 12 & 63 | 128, W[$3++] = J2 >> 6 & 63 | 128;
      }
      W[$3++] = J2 & 63 | 128;
    }
  }
  var $W = new TextEncoder(), PW = 50;
  function t2(k2, W, l3) {
    $W.encodeInto(k2, W.subarray(l3));
  }
  function JW(k2, W, l3) {
    if (k2.length > PW) t2(k2, W, l3);
    else b3(k2, W, l3);
  }
  var NW = 4096;
  function e2(k2, W, l3) {
    let q3 = W, $3 = q3 + l3, P3 = [], J2 = "";
    while (q3 < $3) {
      let N2 = k2[q3++];
      if ((N2 & 128) === 0) P3.push(N2);
      else if ((N2 & 224) === 192) {
        let g2 = k2[q3++] & 63;
        P3.push((N2 & 31) << 6 | g2);
      } else if ((N2 & 240) === 224) {
        let g2 = k2[q3++] & 63, I = k2[q3++] & 63;
        P3.push((N2 & 31) << 12 | g2 << 6 | I);
      } else if ((N2 & 248) === 240) {
        let g2 = k2[q3++] & 63, I = k2[q3++] & 63, m3 = k2[q3++] & 63, X = (N2 & 7) << 18 | g2 << 12 | I << 6 | m3;
        if (X > 65535) X -= 65536, P3.push(X >>> 10 & 1023 | 55296), X = 56320 | X & 1023;
        P3.push(X);
      } else P3.push(N2);
      if (P3.length >= NW) J2 += String.fromCharCode(...P3), P3.length = 0;
    }
    if (P3.length > 0) J2 += String.fromCharCode(...P3);
    return J2;
  }
  var gW = new TextDecoder(), GW = 200;
  function kk(k2, W, l3) {
    let q3 = k2.subarray(W, W + l3);
    return gW.decode(q3);
  }
  function IW(k2, W, l3) {
    if (l3 > GW) return kk(k2, W, l3);
    else return e2(k2, W, l3);
  }
});
var L = $((qk) => {
  Object.defineProperty(qk, "__esModule", { value: true });
  qk.ExtData = void 0;
  class lk {
    type;
    data;
    constructor(k2, W) {
      this.type = k2, this.data = W;
    }
  }
  qk.ExtData = lk;
});
var M = $((Pk) => {
  Object.defineProperty(Pk, "__esModule", { value: true });
  Pk.DecodeError = void 0;
  class A2 extends Error {
    constructor(k2) {
      super(k2);
      let W = Object.create(A2.prototype);
      Object.setPrototypeOf(this, W), Object.defineProperty(this, "name", { configurable: true, enumerable: false, value: A2.name });
    }
  }
  Pk.DecodeError = A2;
});
var O = $((Nk) => {
  Object.defineProperty(Nk, "__esModule", { value: true });
  Nk.UINT32_MAX = void 0;
  Nk.setUint64 = CW;
  Nk.setInt64 = KW;
  Nk.getInt64 = RW;
  Nk.getUint64 = YW;
  Nk.UINT32_MAX = 4294967295;
  function CW(k2, W, l3) {
    let q3 = l3 / 4294967296, $3 = l3;
    k2.setUint32(W, q3), k2.setUint32(W + 4, $3);
  }
  function KW(k2, W, l3) {
    let q3 = Math.floor(l3 / 4294967296), $3 = l3;
    k2.setUint32(W, q3), k2.setUint32(W + 4, $3);
  }
  function RW(k2, W) {
    let l3 = k2.getInt32(W), q3 = k2.getUint32(W + 4);
    return l3 * 4294967296 + q3;
  }
  function YW(k2, W) {
    let l3 = k2.getUint32(W), q3 = k2.getUint32(W + 4);
    return l3 * 4294967296 + q3;
  }
});
var a2 = $((Xk) => {
  Object.defineProperty(Xk, "__esModule", { value: true });
  Xk.timestampExtension = Xk.EXT_TIMESTAMP = void 0;
  Xk.encodeTimeSpecToTimestamp = Ik;
  Xk.encodeDateToTimeSpec = rk;
  Xk.encodeTimestampExtension = Zk;
  Xk.decodeTimestampToTimeSpec = mk;
  Xk.decodeTimestampExtension = Fk;
  var wW = M(), Gk = O();
  Xk.EXT_TIMESTAMP = -1;
  var AW = 4294967295, MW = 17179869183;
  function Ik({ sec: k2, nsec: W }) {
    if (k2 >= 0 && W >= 0 && k2 <= MW) if (W === 0 && k2 <= AW) {
      let l3 = new Uint8Array(4);
      return new DataView(l3.buffer).setUint32(0, k2), l3;
    } else {
      let l3 = k2 / 4294967296, q3 = k2 & 4294967295, $3 = new Uint8Array(8), P3 = new DataView($3.buffer);
      return P3.setUint32(0, W << 2 | l3 & 3), P3.setUint32(4, q3), $3;
    }
    else {
      let l3 = new Uint8Array(12), q3 = new DataView(l3.buffer);
      return q3.setUint32(0, W), (0, Gk.setInt64)(q3, 4, k2), l3;
    }
  }
  function rk(k2) {
    let W = k2.getTime(), l3 = Math.floor(W / 1e3), q3 = (W - l3 * 1e3) * 1e6, $3 = Math.floor(q3 / 1e9);
    return { sec: l3 + $3, nsec: q3 - $3 * 1e9 };
  }
  function Zk(k2) {
    if (k2 instanceof Date) {
      let W = rk(k2);
      return Ik(W);
    } else return null;
  }
  function mk(k2) {
    let W = new DataView(k2.buffer, k2.byteOffset, k2.byteLength);
    switch (k2.byteLength) {
      case 4: {
        let l3 = W.getUint32(0), q3 = 0;
        return { sec: l3, nsec: 0 };
      }
      case 8: {
        let l3 = W.getUint32(0), q3 = W.getUint32(4), $3 = (l3 & 3) * 4294967296 + q3, P3 = l3 >>> 2;
        return { sec: $3, nsec: P3 };
      }
      case 12: {
        let l3 = (0, Gk.getInt64)(W, 4), q3 = W.getUint32(0);
        return { sec: l3, nsec: q3 };
      }
      default:
        throw new wW.DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${k2.length}`);
    }
  }
  function Fk(k2) {
    let W = mk(k2);
    return new Date(W.sec * 1e3 + W.nsec / 1e6);
  }
  Xk.timestampExtension = { type: Xk.EXT_TIMESTAMP, encode: Zk, decode: Fk };
});
var h3 = $((Ck) => {
  Object.defineProperty(Ck, "__esModule", { value: true });
  Ck.ExtensionCodec = void 0;
  var i2 = L(), zW = a2();
  class E2 {
    static defaultCodec = new E2();
    __brand;
    builtInEncoders = [];
    builtInDecoders = [];
    encoders = [];
    decoders = [];
    constructor() {
      this.register(zW.timestampExtension);
    }
    register({ type: k2, encode: W, decode: l3 }) {
      if (k2 >= 0) this.encoders[k2] = W, this.decoders[k2] = l3;
      else {
        let q3 = -1 - k2;
        this.builtInEncoders[q3] = W, this.builtInDecoders[q3] = l3;
      }
    }
    tryToEncode(k2, W) {
      for (let l3 = 0; l3 < this.builtInEncoders.length; l3++) {
        let q3 = this.builtInEncoders[l3];
        if (q3 != null) {
          let $3 = q3(k2, W);
          if ($3 != null) {
            let P3 = -1 - l3;
            return new i2.ExtData(P3, $3);
          }
        }
      }
      for (let l3 = 0; l3 < this.encoders.length; l3++) {
        let q3 = this.encoders[l3];
        if (q3 != null) {
          let $3 = q3(k2, W);
          if ($3 != null) {
            let P3 = l3;
            return new i2.ExtData(P3, $3);
          }
        }
      }
      if (k2 instanceof i2.ExtData) return k2;
      return null;
    }
    decode(k2, W, l3) {
      let q3 = W < 0 ? this.builtInDecoders[-1 - W] : this.decoders[W];
      if (q3) return q3(k2, W, l3);
      else return new i2.ExtData(W, k2);
    }
  }
  Ck.ExtensionCodec = E2;
});
var x3 = $((Rk) => {
  Object.defineProperty(Rk, "__esModule", { value: true });
  Rk.ensureUint8Array = DW;
  function vW(k2) {
    return k2 instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && k2 instanceof SharedArrayBuffer;
  }
  function DW(k2) {
    if (k2 instanceof Uint8Array) return k2;
    else if (ArrayBuffer.isView(k2)) return new Uint8Array(k2.buffer, k2.byteOffset, k2.byteLength);
    else if (vW(k2)) return new Uint8Array(k2);
    else return Uint8Array.from(k2);
  }
});
var d3 = $((Hk) => {
  Object.defineProperty(Hk, "__esModule", { value: true });
  Hk.Encoder = Hk.DEFAULT_INITIAL_BUFFER_SIZE = Hk.DEFAULT_MAX_DEPTH = void 0;
  var Yk = w(), aW = h3(), Uk = O(), EW = x3();
  Hk.DEFAULT_MAX_DEPTH = 100;
  Hk.DEFAULT_INITIAL_BUFFER_SIZE = 2048;
  class _2 {
    extensionCodec;
    context;
    useBigInt64;
    maxDepth;
    initialBufferSize;
    sortKeys;
    forceFloat32;
    ignoreUndefined;
    forceIntegerToFloat;
    pos;
    view;
    bytes;
    entered = false;
    constructor(k2) {
      this.extensionCodec = k2?.extensionCodec ?? aW.ExtensionCodec.defaultCodec, this.context = k2?.context, this.useBigInt64 = k2?.useBigInt64 ?? false, this.maxDepth = k2?.maxDepth ?? Hk.DEFAULT_MAX_DEPTH, this.initialBufferSize = k2?.initialBufferSize ?? Hk.DEFAULT_INITIAL_BUFFER_SIZE, this.sortKeys = k2?.sortKeys ?? false, this.forceFloat32 = k2?.forceFloat32 ?? false, this.ignoreUndefined = k2?.ignoreUndefined ?? false, this.forceIntegerToFloat = k2?.forceIntegerToFloat ?? false, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
    }
    clone() {
      return new _2({ extensionCodec: this.extensionCodec, context: this.context, useBigInt64: this.useBigInt64, maxDepth: this.maxDepth, initialBufferSize: this.initialBufferSize, sortKeys: this.sortKeys, forceFloat32: this.forceFloat32, ignoreUndefined: this.ignoreUndefined, forceIntegerToFloat: this.forceIntegerToFloat });
    }
    reinitializeState() {
      this.pos = 0;
    }
    encodeSharedRef(k2) {
      if (this.entered) return this.clone().encodeSharedRef(k2);
      try {
        return this.entered = true, this.reinitializeState(), this.doEncode(k2, 1), this.bytes.subarray(0, this.pos);
      } finally {
        this.entered = false;
      }
    }
    encode(k2) {
      if (this.entered) return this.clone().encode(k2);
      try {
        return this.entered = true, this.reinitializeState(), this.doEncode(k2, 1), this.bytes.slice(0, this.pos);
      } finally {
        this.entered = false;
      }
    }
    doEncode(k2, W) {
      if (W > this.maxDepth) throw Error(`Too deep objects in depth ${W}`);
      if (k2 == null) this.encodeNil();
      else if (typeof k2 === "boolean") this.encodeBoolean(k2);
      else if (typeof k2 === "number") if (!this.forceIntegerToFloat) this.encodeNumber(k2);
      else this.encodeNumberAsFloat(k2);
      else if (typeof k2 === "string") this.encodeString(k2);
      else if (this.useBigInt64 && typeof k2 === "bigint") this.encodeBigInt64(k2);
      else this.encodeObject(k2, W);
    }
    ensureBufferSizeToWrite(k2) {
      let W = this.pos + k2;
      if (this.view.byteLength < W) this.resizeBuffer(W * 2);
    }
    resizeBuffer(k2) {
      let W = new ArrayBuffer(k2), l3 = new Uint8Array(W), q3 = new DataView(W);
      l3.set(this.bytes), this.view = q3, this.bytes = l3;
    }
    encodeNil() {
      this.writeU8(192);
    }
    encodeBoolean(k2) {
      if (k2 === false) this.writeU8(194);
      else this.writeU8(195);
    }
    encodeNumber(k2) {
      if (!this.forceIntegerToFloat && Number.isSafeInteger(k2)) if (k2 >= 0) if (k2 < 128) this.writeU8(k2);
      else if (k2 < 256) this.writeU8(204), this.writeU8(k2);
      else if (k2 < 65536) this.writeU8(205), this.writeU16(k2);
      else if (k2 < 4294967296) this.writeU8(206), this.writeU32(k2);
      else if (!this.useBigInt64) this.writeU8(207), this.writeU64(k2);
      else this.encodeNumberAsFloat(k2);
      else if (k2 >= -32) this.writeU8(224 | k2 + 32);
      else if (k2 >= -128) this.writeU8(208), this.writeI8(k2);
      else if (k2 >= -32768) this.writeU8(209), this.writeI16(k2);
      else if (k2 >= -2147483648) this.writeU8(210), this.writeI32(k2);
      else if (!this.useBigInt64) this.writeU8(211), this.writeI64(k2);
      else this.encodeNumberAsFloat(k2);
      else this.encodeNumberAsFloat(k2);
    }
    encodeNumberAsFloat(k2) {
      if (this.forceFloat32) this.writeU8(202), this.writeF32(k2);
      else this.writeU8(203), this.writeF64(k2);
    }
    encodeBigInt64(k2) {
      if (k2 >= BigInt(0)) this.writeU8(207), this.writeBigUint64(k2);
      else this.writeU8(211), this.writeBigInt64(k2);
    }
    writeStringHeader(k2) {
      if (k2 < 32) this.writeU8(160 + k2);
      else if (k2 < 256) this.writeU8(217), this.writeU8(k2);
      else if (k2 < 65536) this.writeU8(218), this.writeU16(k2);
      else if (k2 < 4294967296) this.writeU8(219), this.writeU32(k2);
      else throw Error(`Too long string: ${k2} bytes in UTF-8`);
    }
    encodeString(k2) {
      let l3 = (0, Yk.utf8Count)(k2);
      this.ensureBufferSizeToWrite(5 + l3), this.writeStringHeader(l3), (0, Yk.utf8Encode)(k2, this.bytes, this.pos), this.pos += l3;
    }
    encodeObject(k2, W) {
      let l3 = this.extensionCodec.tryToEncode(k2, this.context);
      if (l3 != null) this.encodeExtension(l3);
      else if (Array.isArray(k2)) this.encodeArray(k2, W);
      else if (ArrayBuffer.isView(k2)) this.encodeBinary(k2);
      else if (typeof k2 === "object") this.encodeMap(k2, W);
      else throw Error(`Unrecognized object: ${Object.prototype.toString.apply(k2)}`);
    }
    encodeBinary(k2) {
      let W = k2.byteLength;
      if (W < 256) this.writeU8(196), this.writeU8(W);
      else if (W < 65536) this.writeU8(197), this.writeU16(W);
      else if (W < 4294967296) this.writeU8(198), this.writeU32(W);
      else throw Error(`Too large binary: ${W}`);
      let l3 = (0, EW.ensureUint8Array)(k2);
      this.writeU8a(l3);
    }
    encodeArray(k2, W) {
      let l3 = k2.length;
      if (l3 < 16) this.writeU8(144 + l3);
      else if (l3 < 65536) this.writeU8(220), this.writeU16(l3);
      else if (l3 < 4294967296) this.writeU8(221), this.writeU32(l3);
      else throw Error(`Too large array: ${l3}`);
      for (let q3 of k2) this.doEncode(q3, W + 1);
    }
    countWithoutUndefined(k2, W) {
      let l3 = 0;
      for (let q3 of W) if (k2[q3] !== void 0) l3++;
      return l3;
    }
    encodeMap(k2, W) {
      let l3 = Object.keys(k2);
      if (this.sortKeys) l3.sort();
      let q3 = this.ignoreUndefined ? this.countWithoutUndefined(k2, l3) : l3.length;
      if (q3 < 16) this.writeU8(128 + q3);
      else if (q3 < 65536) this.writeU8(222), this.writeU16(q3);
      else if (q3 < 4294967296) this.writeU8(223), this.writeU32(q3);
      else throw Error(`Too large map object: ${q3}`);
      for (let $3 of l3) {
        let P3 = k2[$3];
        if (!(this.ignoreUndefined && P3 === void 0)) this.encodeString($3), this.doEncode(P3, W + 1);
      }
    }
    encodeExtension(k2) {
      if (typeof k2.data === "function") {
        let l3 = k2.data(this.pos + 6), q3 = l3.length;
        if (q3 >= 4294967296) throw Error(`Too large extension object: ${q3}`);
        this.writeU8(201), this.writeU32(q3), this.writeI8(k2.type), this.writeU8a(l3);
        return;
      }
      let W = k2.data.length;
      if (W === 1) this.writeU8(212);
      else if (W === 2) this.writeU8(213);
      else if (W === 4) this.writeU8(214);
      else if (W === 8) this.writeU8(215);
      else if (W === 16) this.writeU8(216);
      else if (W < 256) this.writeU8(199), this.writeU8(W);
      else if (W < 65536) this.writeU8(200), this.writeU16(W);
      else if (W < 4294967296) this.writeU8(201), this.writeU32(W);
      else throw Error(`Too large extension object: ${W}`);
      this.writeI8(k2.type), this.writeU8a(k2.data);
    }
    writeU8(k2) {
      this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, k2), this.pos++;
    }
    writeU8a(k2) {
      let W = k2.length;
      this.ensureBufferSizeToWrite(W), this.bytes.set(k2, this.pos), this.pos += W;
    }
    writeI8(k2) {
      this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, k2), this.pos++;
    }
    writeU16(k2) {
      this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, k2), this.pos += 2;
    }
    writeI16(k2) {
      this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, k2), this.pos += 2;
    }
    writeU32(k2) {
      this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, k2), this.pos += 4;
    }
    writeI32(k2) {
      this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, k2), this.pos += 4;
    }
    writeF32(k2) {
      this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, k2), this.pos += 4;
    }
    writeF64(k2) {
      this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, k2), this.pos += 8;
    }
    writeU64(k2) {
      this.ensureBufferSizeToWrite(8), (0, Uk.setUint64)(this.view, this.pos, k2), this.pos += 8;
    }
    writeI64(k2) {
      this.ensureBufferSizeToWrite(8), (0, Uk.setInt64)(this.view, this.pos, k2), this.pos += 8;
    }
    writeBigUint64(k2) {
      this.ensureBufferSizeToWrite(8), this.view.setBigUint64(this.pos, k2), this.pos += 8;
    }
    writeBigInt64(k2) {
      this.ensureBufferSizeToWrite(8), this.view.setBigInt64(this.pos, k2), this.pos += 8;
    }
  }
  Hk.Encoder = _2;
});
var Mk = $((Ak) => {
  Object.defineProperty(Ak, "__esModule", { value: true });
  Ak.encode = _W;
  var xW = d3();
  function _W(k2, W) {
    return new xW.Encoder(W).encodeSharedRef(k2);
  }
});
var ik = $((Ok) => {
  Object.defineProperty(Ok, "__esModule", { value: true });
  Ok.prettyByte = cW;
  function cW(k2) {
    return `${k2 < 0 ? "-" : ""}0x${Math.abs(k2).toString(16).padStart(2, "0")}`;
  }
});
var zk = $((Tk) => {
  Object.defineProperty(Tk, "__esModule", { value: true });
  Tk.CachedKeyDecoder = void 0;
  var pW = w(), uW = 16, yW = 16;
  class hk {
    hit = 0;
    miss = 0;
    caches;
    maxKeyLength;
    maxLengthPerKey;
    constructor(k2 = uW, W = yW) {
      this.maxKeyLength = k2, this.maxLengthPerKey = W, this.caches = [];
      for (let l3 = 0; l3 < this.maxKeyLength; l3++) this.caches.push([]);
    }
    canBeCached(k2) {
      return k2 > 0 && k2 <= this.maxKeyLength;
    }
    find(k2, W, l3) {
      let q3 = this.caches[l3 - 1];
      k: for (let $3 of q3) {
        let P3 = $3.bytes;
        for (let J2 = 0; J2 < l3; J2++) if (P3[J2] !== k2[W + J2]) continue k;
        return $3.str;
      }
      return null;
    }
    store(k2, W) {
      let l3 = this.caches[k2.length - 1], q3 = { bytes: k2, str: W };
      if (l3.length >= this.maxLengthPerKey) l3[Math.random() * l3.length | 0] = q3;
      else l3.push(q3);
    }
    decode(k2, W, l3) {
      let q3 = this.find(k2, W, l3);
      if (q3 != null) return this.hit++, q3;
      this.miss++;
      let $3 = (0, pW.utf8DecodeJs)(k2, W, l3), P3 = Uint8Array.prototype.slice.call(k2, W, W + l3);
      return this.store(P3, $3), $3;
    }
  }
  Tk.CachedKeyDecoder = hk;
});
var T = $((Ek) => {
  Object.defineProperty(Ek, "__esModule", { value: true });
  Ek.Decoder = void 0;
  var c3 = ik(), jW = h3(), C2 = O(), oW = w(), vk = x3(), sW = zk(), V = M(), f3 = "array", S2 = "map_key", Lk = "map_value", bW = (k2) => {
    if (typeof k2 === "string" || typeof k2 === "number") return k2;
    throw new V.DecodeError("The type of key must be string or number but " + typeof k2);
  };
  class ak {
    stack = [];
    stackHeadPosition = -1;
    get length() {
      return this.stackHeadPosition + 1;
    }
    top() {
      return this.stack[this.stackHeadPosition];
    }
    pushArrayState(k2) {
      let W = this.getUninitializedStateFromPool();
      W.type = f3, W.position = 0, W.size = k2, W.array = Array(k2);
    }
    pushMapState(k2) {
      let W = this.getUninitializedStateFromPool();
      W.type = S2, W.readCount = 0, W.size = k2, W.map = {};
    }
    getUninitializedStateFromPool() {
      if (this.stackHeadPosition++, this.stackHeadPosition === this.stack.length) {
        let k2 = { type: void 0, size: 0, array: void 0, position: 0, readCount: 0, map: void 0, key: null };
        this.stack.push(k2);
      }
      return this.stack[this.stackHeadPosition];
    }
    release(k2) {
      if (this.stack[this.stackHeadPosition] !== k2) throw Error("Invalid stack state. Released state is not on top of the stack.");
      if (k2.type === f3) {
        let l3 = k2;
        l3.size = 0, l3.array = void 0, l3.position = 0, l3.type = void 0;
      }
      if (k2.type === S2 || k2.type === Lk) {
        let l3 = k2;
        l3.size = 0, l3.map = void 0, l3.readCount = 0, l3.type = void 0;
      }
      this.stackHeadPosition--;
    }
    reset() {
      this.stack.length = 0, this.stackHeadPosition = -1;
    }
  }
  var H2 = -1, p3 = new DataView(new ArrayBuffer(0)), tW = new Uint8Array(p3.buffer);
  try {
    p3.getInt8(0);
  } catch (k2) {
    if (!(k2 instanceof RangeError)) throw Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
  }
  var Dk = RangeError("Insufficient data"), eW = new sW.CachedKeyDecoder();
  class u3 {
    extensionCodec;
    context;
    useBigInt64;
    rawStrings;
    maxStrLength;
    maxBinLength;
    maxArrayLength;
    maxMapLength;
    maxExtLength;
    keyDecoder;
    mapKeyConverter;
    totalPos = 0;
    pos = 0;
    view = p3;
    bytes = tW;
    headByte = H2;
    stack = new ak();
    entered = false;
    constructor(k2) {
      this.extensionCodec = k2?.extensionCodec ?? jW.ExtensionCodec.defaultCodec, this.context = k2?.context, this.useBigInt64 = k2?.useBigInt64 ?? false, this.rawStrings = k2?.rawStrings ?? false, this.maxStrLength = k2?.maxStrLength ?? C2.UINT32_MAX, this.maxBinLength = k2?.maxBinLength ?? C2.UINT32_MAX, this.maxArrayLength = k2?.maxArrayLength ?? C2.UINT32_MAX, this.maxMapLength = k2?.maxMapLength ?? C2.UINT32_MAX, this.maxExtLength = k2?.maxExtLength ?? C2.UINT32_MAX, this.keyDecoder = k2?.keyDecoder !== void 0 ? k2.keyDecoder : eW, this.mapKeyConverter = k2?.mapKeyConverter ?? bW;
    }
    clone() {
      return new u3({ extensionCodec: this.extensionCodec, context: this.context, useBigInt64: this.useBigInt64, rawStrings: this.rawStrings, maxStrLength: this.maxStrLength, maxBinLength: this.maxBinLength, maxArrayLength: this.maxArrayLength, maxMapLength: this.maxMapLength, maxExtLength: this.maxExtLength, keyDecoder: this.keyDecoder });
    }
    reinitializeState() {
      this.totalPos = 0, this.headByte = H2, this.stack.reset();
    }
    setBuffer(k2) {
      let W = (0, vk.ensureUint8Array)(k2);
      this.bytes = W, this.view = new DataView(W.buffer, W.byteOffset, W.byteLength), this.pos = 0;
    }
    appendBuffer(k2) {
      if (this.headByte === H2 && !this.hasRemaining(1)) this.setBuffer(k2);
      else {
        let W = this.bytes.subarray(this.pos), l3 = (0, vk.ensureUint8Array)(k2), q3 = new Uint8Array(W.length + l3.length);
        q3.set(W), q3.set(l3, W.length), this.setBuffer(q3);
      }
    }
    hasRemaining(k2) {
      return this.view.byteLength - this.pos >= k2;
    }
    createExtraByteError(k2) {
      let { view: W, pos: l3 } = this;
      return RangeError(`Extra ${W.byteLength - l3} of ${W.byteLength} byte(s) found at buffer[${k2}]`);
    }
    decode(k2) {
      if (this.entered) return this.clone().decode(k2);
      try {
        this.entered = true, this.reinitializeState(), this.setBuffer(k2);
        let W = this.doDecodeSync();
        if (this.hasRemaining(1)) throw this.createExtraByteError(this.pos);
        return W;
      } finally {
        this.entered = false;
      }
    }
    *decodeMulti(k2) {
      if (this.entered) {
        yield* this.clone().decodeMulti(k2);
        return;
      }
      try {
        this.entered = true, this.reinitializeState(), this.setBuffer(k2);
        while (this.hasRemaining(1)) yield this.doDecodeSync();
      } finally {
        this.entered = false;
      }
    }
    async decodeAsync(k2) {
      if (this.entered) return this.clone().decodeAsync(k2);
      try {
        this.entered = true;
        let W = false, l3;
        for await (let J2 of k2) {
          if (W) throw this.entered = false, this.createExtraByteError(this.totalPos);
          this.appendBuffer(J2);
          try {
            l3 = this.doDecodeSync(), W = true;
          } catch (N2) {
            if (!(N2 instanceof RangeError)) throw N2;
          }
          this.totalPos += this.pos;
        }
        if (W) {
          if (this.hasRemaining(1)) throw this.createExtraByteError(this.totalPos);
          return l3;
        }
        let { headByte: q3, pos: $3, totalPos: P3 } = this;
        throw RangeError(`Insufficient data in parsing ${(0, c3.prettyByte)(q3)} at ${P3} (${$3} in the current buffer)`);
      } finally {
        this.entered = false;
      }
    }
    decodeArrayStream(k2) {
      return this.decodeMultiAsync(k2, true);
    }
    decodeStream(k2) {
      return this.decodeMultiAsync(k2, false);
    }
    async *decodeMultiAsync(k2, W) {
      if (this.entered) {
        yield* this.clone().decodeMultiAsync(k2, W);
        return;
      }
      try {
        this.entered = true;
        let l3 = W, q3 = -1;
        for await (let $3 of k2) {
          if (W && q3 === 0) throw this.createExtraByteError(this.totalPos);
          if (this.appendBuffer($3), l3) q3 = this.readArraySize(), l3 = false, this.complete();
          try {
            while (true) if (yield this.doDecodeSync(), --q3 === 0) break;
          } catch (P3) {
            if (!(P3 instanceof RangeError)) throw P3;
          }
          this.totalPos += this.pos;
        }
      } finally {
        this.entered = false;
      }
    }
    doDecodeSync() {
      k: while (true) {
        let k2 = this.readHeadByte(), W;
        if (k2 >= 224) W = k2 - 256;
        else if (k2 < 192) if (k2 < 128) W = k2;
        else if (k2 < 144) {
          let q3 = k2 - 128;
          if (q3 !== 0) {
            this.pushMapState(q3), this.complete();
            continue k;
          } else W = {};
        } else if (k2 < 160) {
          let q3 = k2 - 144;
          if (q3 !== 0) {
            this.pushArrayState(q3), this.complete();
            continue k;
          } else W = [];
        } else {
          let q3 = k2 - 160;
          W = this.decodeString(q3, 0);
        }
        else if (k2 === 192) W = null;
        else if (k2 === 194) W = false;
        else if (k2 === 195) W = true;
        else if (k2 === 202) W = this.readF32();
        else if (k2 === 203) W = this.readF64();
        else if (k2 === 204) W = this.readU8();
        else if (k2 === 205) W = this.readU16();
        else if (k2 === 206) W = this.readU32();
        else if (k2 === 207) if (this.useBigInt64) W = this.readU64AsBigInt();
        else W = this.readU64();
        else if (k2 === 208) W = this.readI8();
        else if (k2 === 209) W = this.readI16();
        else if (k2 === 210) W = this.readI32();
        else if (k2 === 211) if (this.useBigInt64) W = this.readI64AsBigInt();
        else W = this.readI64();
        else if (k2 === 217) {
          let q3 = this.lookU8();
          W = this.decodeString(q3, 1);
        } else if (k2 === 218) {
          let q3 = this.lookU16();
          W = this.decodeString(q3, 2);
        } else if (k2 === 219) {
          let q3 = this.lookU32();
          W = this.decodeString(q3, 4);
        } else if (k2 === 220) {
          let q3 = this.readU16();
          if (q3 !== 0) {
            this.pushArrayState(q3), this.complete();
            continue k;
          } else W = [];
        } else if (k2 === 221) {
          let q3 = this.readU32();
          if (q3 !== 0) {
            this.pushArrayState(q3), this.complete();
            continue k;
          } else W = [];
        } else if (k2 === 222) {
          let q3 = this.readU16();
          if (q3 !== 0) {
            this.pushMapState(q3), this.complete();
            continue k;
          } else W = {};
        } else if (k2 === 223) {
          let q3 = this.readU32();
          if (q3 !== 0) {
            this.pushMapState(q3), this.complete();
            continue k;
          } else W = {};
        } else if (k2 === 196) {
          let q3 = this.lookU8();
          W = this.decodeBinary(q3, 1);
        } else if (k2 === 197) {
          let q3 = this.lookU16();
          W = this.decodeBinary(q3, 2);
        } else if (k2 === 198) {
          let q3 = this.lookU32();
          W = this.decodeBinary(q3, 4);
        } else if (k2 === 212) W = this.decodeExtension(1, 0);
        else if (k2 === 213) W = this.decodeExtension(2, 0);
        else if (k2 === 214) W = this.decodeExtension(4, 0);
        else if (k2 === 215) W = this.decodeExtension(8, 0);
        else if (k2 === 216) W = this.decodeExtension(16, 0);
        else if (k2 === 199) {
          let q3 = this.lookU8();
          W = this.decodeExtension(q3, 1);
        } else if (k2 === 200) {
          let q3 = this.lookU16();
          W = this.decodeExtension(q3, 2);
        } else if (k2 === 201) {
          let q3 = this.lookU32();
          W = this.decodeExtension(q3, 4);
        } else throw new V.DecodeError(`Unrecognized type byte: ${(0, c3.prettyByte)(k2)}`);
        this.complete();
        let l3 = this.stack;
        while (l3.length > 0) {
          let q3 = l3.top();
          if (q3.type === f3) if (q3.array[q3.position] = W, q3.position++, q3.position === q3.size) W = q3.array, l3.release(q3);
          else continue k;
          else if (q3.type === S2) {
            if (W === "__proto__") throw new V.DecodeError("The key __proto__ is not allowed");
            q3.key = this.mapKeyConverter(W), q3.type = Lk;
            continue k;
          } else if (q3.map[q3.key] = W, q3.readCount++, q3.readCount === q3.size) W = q3.map, l3.release(q3);
          else {
            q3.key = null, q3.type = S2;
            continue k;
          }
        }
        return W;
      }
    }
    readHeadByte() {
      if (this.headByte === H2) this.headByte = this.readU8();
      return this.headByte;
    }
    complete() {
      this.headByte = H2;
    }
    readArraySize() {
      let k2 = this.readHeadByte();
      switch (k2) {
        case 220:
          return this.readU16();
        case 221:
          return this.readU32();
        default:
          if (k2 < 160) return k2 - 144;
          else throw new V.DecodeError(`Unrecognized array type byte: ${(0, c3.prettyByte)(k2)}`);
      }
    }
    pushMapState(k2) {
      if (k2 > this.maxMapLength) throw new V.DecodeError(`Max length exceeded: map length (${k2}) > maxMapLengthLength (${this.maxMapLength})`);
      this.stack.pushMapState(k2);
    }
    pushArrayState(k2) {
      if (k2 > this.maxArrayLength) throw new V.DecodeError(`Max length exceeded: array length (${k2}) > maxArrayLength (${this.maxArrayLength})`);
      this.stack.pushArrayState(k2);
    }
    decodeString(k2, W) {
      if (!this.rawStrings || this.stateIsMapKey()) return this.decodeUtf8String(k2, W);
      return this.decodeBinary(k2, W);
    }
    decodeUtf8String(k2, W) {
      if (k2 > this.maxStrLength) throw new V.DecodeError(`Max length exceeded: UTF-8 byte length (${k2}) > maxStrLength (${this.maxStrLength})`);
      if (this.bytes.byteLength < this.pos + W + k2) throw Dk;
      let l3 = this.pos + W, q3;
      if (this.stateIsMapKey() && this.keyDecoder?.canBeCached(k2)) q3 = this.keyDecoder.decode(this.bytes, l3, k2);
      else q3 = (0, oW.utf8Decode)(this.bytes, l3, k2);
      return this.pos += W + k2, q3;
    }
    stateIsMapKey() {
      if (this.stack.length > 0) return this.stack.top().type === S2;
      return false;
    }
    decodeBinary(k2, W) {
      if (k2 > this.maxBinLength) throw new V.DecodeError(`Max length exceeded: bin length (${k2}) > maxBinLength (${this.maxBinLength})`);
      if (!this.hasRemaining(k2 + W)) throw Dk;
      let l3 = this.pos + W, q3 = this.bytes.subarray(l3, l3 + k2);
      return this.pos += W + k2, q3;
    }
    decodeExtension(k2, W) {
      if (k2 > this.maxExtLength) throw new V.DecodeError(`Max length exceeded: ext length (${k2}) > maxExtLength (${this.maxExtLength})`);
      let l3 = this.view.getInt8(this.pos + W), q3 = this.decodeBinary(k2, W + 1);
      return this.extensionCodec.decode(q3, l3, this.context);
    }
    lookU8() {
      return this.view.getUint8(this.pos);
    }
    lookU16() {
      return this.view.getUint16(this.pos);
    }
    lookU32() {
      return this.view.getUint32(this.pos);
    }
    readU8() {
      let k2 = this.view.getUint8(this.pos);
      return this.pos++, k2;
    }
    readI8() {
      let k2 = this.view.getInt8(this.pos);
      return this.pos++, k2;
    }
    readU16() {
      let k2 = this.view.getUint16(this.pos);
      return this.pos += 2, k2;
    }
    readI16() {
      let k2 = this.view.getInt16(this.pos);
      return this.pos += 2, k2;
    }
    readU32() {
      let k2 = this.view.getUint32(this.pos);
      return this.pos += 4, k2;
    }
    readI32() {
      let k2 = this.view.getInt32(this.pos);
      return this.pos += 4, k2;
    }
    readU64() {
      let k2 = (0, C2.getUint64)(this.view, this.pos);
      return this.pos += 8, k2;
    }
    readI64() {
      let k2 = (0, C2.getInt64)(this.view, this.pos);
      return this.pos += 8, k2;
    }
    readU64AsBigInt() {
      let k2 = this.view.getBigUint64(this.pos);
      return this.pos += 8, k2;
    }
    readI64AsBigInt() {
      let k2 = this.view.getBigInt64(this.pos);
      return this.pos += 8, k2;
    }
    readF32() {
      let k2 = this.view.getFloat32(this.pos);
      return this.pos += 4, k2;
    }
    readF64() {
      let k2 = this.view.getFloat64(this.pos);
      return this.pos += 8, k2;
    }
  }
  Ek.Decoder = u3;
});
var ck = $((dk) => {
  Object.defineProperty(dk, "__esModule", { value: true });
  dk.decode = kl;
  dk.decodeMulti = Wl;
  var _k = T();
  function kl(k2, W) {
    return new _k.Decoder(W).decode(k2);
  }
  function Wl(k2, W) {
    return new _k.Decoder(W).decodeMulti(k2);
  }
});
var yk = $((uk) => {
  Object.defineProperty(uk, "__esModule", { value: true });
  uk.isAsyncIterable = fk;
  uk.asyncIterableFromStream = pk;
  uk.ensureAsyncIterable = $l;
  function fk(k2) {
    return k2[Symbol.asyncIterator] != null;
  }
  async function* pk(k2) {
    let W = k2.getReader();
    try {
      while (true) {
        let { done: l3, value: q3 } = await W.read();
        if (l3) return;
        yield q3;
      }
    } finally {
      W.releaseLock();
    }
  }
  function $l(k2) {
    if (fk(k2)) return k2;
    else return pk(k2);
  }
});
var ok = $((jk) => {
  Object.defineProperty(jk, "__esModule", { value: true });
  jk.decodeAsync = gl;
  jk.decodeArrayStream = Gl;
  jk.decodeMultiStream = Il;
  var y3 = T(), j2 = yk();
  async function gl(k2, W) {
    let l3 = (0, j2.ensureAsyncIterable)(k2);
    return new y3.Decoder(W).decodeAsync(l3);
  }
  function Gl(k2, W) {
    let l3 = (0, j2.ensureAsyncIterable)(k2);
    return new y3.Decoder(W).decodeArrayStream(l3);
  }
  function Il(k2, W) {
    let l3 = (0, j2.ensureAsyncIterable)(k2);
    return new y3.Decoder(W).decodeStream(l3);
  }
});
var B2 = $((G) => {
  Object.defineProperty(G, "__esModule", { value: true });
  G.decodeTimestampExtension = G.encodeTimestampExtension = G.decodeTimestampToTimeSpec = G.encodeTimeSpecToTimestamp = G.encodeDateToTimeSpec = G.EXT_TIMESTAMP = G.ExtData = G.ExtensionCodec = G.Encoder = G.DecodeError = G.Decoder = G.decodeMultiStream = G.decodeArrayStream = G.decodeAsync = G.decodeMulti = G.decode = G.encode = void 0;
  var Fl = Mk();
  Object.defineProperty(G, "encode", { enumerable: true, get: function() {
    return Fl.encode;
  } });
  var sk = ck();
  Object.defineProperty(G, "decode", { enumerable: true, get: function() {
    return sk.decode;
  } });
  Object.defineProperty(G, "decodeMulti", { enumerable: true, get: function() {
    return sk.decodeMulti;
  } });
  var o2 = ok();
  Object.defineProperty(G, "decodeAsync", { enumerable: true, get: function() {
    return o2.decodeAsync;
  } });
  Object.defineProperty(G, "decodeArrayStream", { enumerable: true, get: function() {
    return o2.decodeArrayStream;
  } });
  Object.defineProperty(G, "decodeMultiStream", { enumerable: true, get: function() {
    return o2.decodeMultiStream;
  } });
  var Xl = T();
  Object.defineProperty(G, "Decoder", { enumerable: true, get: function() {
    return Xl.Decoder;
  } });
  var Vl = M();
  Object.defineProperty(G, "DecodeError", { enumerable: true, get: function() {
    return Vl.DecodeError;
  } });
  var Ql = d3();
  Object.defineProperty(G, "Encoder", { enumerable: true, get: function() {
    return Ql.Encoder;
  } });
  var Cl = h3();
  Object.defineProperty(G, "ExtensionCodec", { enumerable: true, get: function() {
    return Cl.ExtensionCodec;
  } });
  var Kl = L();
  Object.defineProperty(G, "ExtData", { enumerable: true, get: function() {
    return Kl.ExtData;
  } });
  var Y = a2();
  Object.defineProperty(G, "EXT_TIMESTAMP", { enumerable: true, get: function() {
    return Y.EXT_TIMESTAMP;
  } });
  Object.defineProperty(G, "encodeDateToTimeSpec", { enumerable: true, get: function() {
    return Y.encodeDateToTimeSpec;
  } });
  Object.defineProperty(G, "encodeTimeSpecToTimestamp", { enumerable: true, get: function() {
    return Y.encodeTimeSpecToTimestamp;
  } });
  Object.defineProperty(G, "decodeTimestampToTimeSpec", { enumerable: true, get: function() {
    return Y.decodeTimestampToTimeSpec;
  } });
  Object.defineProperty(G, "encodeTimestampExtension", { enumerable: true, get: function() {
    return Y.encodeTimestampExtension;
  } });
  Object.defineProperty(G, "decodeTimestampExtension", { enumerable: true, get: function() {
    return Y.decodeTimestampExtension;
  } });
});
var ek = q(B2(), 1);
var K = class extends eventemitter3_default {
  id;
  data;
  defferedStates = [];
  constructor(k2, W) {
    super();
    this.id = k2;
    this.data = W;
  }
  async ack(k2 = true) {
    if (k2) {
      this.defferedStates.push({ action: "ack", id: this.id });
      return;
    }
    this.emit("ack", this);
  }
  async nack(k2 = true) {
    if (k2) {
      this.defferedStates.push({ action: "nack", id: this.id });
      return;
    }
    this.emit("nack", this);
  }
  async retry(k2 = true) {
    if (k2) {
      this.defferedStates.push({ action: "retry", id: this.id });
      return;
    }
    this.emit("retry", this);
  }
};
var R3 = class {
  queueName;
  options;
  logger;
  constructor(k2, W) {
    this.queueName = k2;
    this.options = W;
    this.validateOptions(), this.logger = new s();
  }
  validateOptions() {
    this.options.concurrency = this.options.concurrency ?? 1, this.options.removeOnComplete = this.options.removeOnComplete ?? true, this.options.removeOnFail = this.options.removeOnFail ?? false;
  }
  async handleProcesses(k2, W, l3) {
    await this.transport.connect();
    let q3 = [...W], $3 = this.options.concurrency ?? 1, P3 = 0, J2 = async () => {
      while (q3.length > 0) {
        let g2 = q3.shift();
        if (!g2) return;
        let I = await this.attachEventAction(g2);
        try {
          await l3(g2, P3);
        } catch (m3) {
          this.logger.error(`[Worker] Job ${g2.id} threw an unhandled error:`, m3);
        } finally {
          P3++, I();
        }
      }
    }, N2 = Array.from({ length: $3 }, () => J2());
    await Promise.all(N2), await this.transport.deregister(k2), await this.onComplete(W);
  }
  async attachEventAction(k2) {
    let W = async () => {
      console.log(`[Job ${k2.id}] Acknowledged`), await this.transport.ack(this.queueName, k2.id);
    }, l3 = async () => {
      console.log(`[Job ${k2.id}] Nacked`), await this.transport.nack(this.queueName, k2.id);
    }, q3 = async () => {
      console.log(`[Job ${k2.id}] Retrying`), await this.transport.retry(this.queueName, k2.id);
    };
    return k2.once("ack", W), k2.once("nack", l3), k2.once("retry", q3), () => {
      k2.off("ack", W), k2.off("nack", l3), k2.off("retry", q3);
    };
  }
  async onComplete(k2) {
    await this.dispatchDefferedActions(k2), this.logger.log("cycle completed");
  }
  async dispatchDefferedActions(k2) {
    let W = [];
    k2.map((q3) => W.push(...q3.defferedStates)), this.logger.log(`acknoledging : ${k2.length} deffered jobs`);
    let l3 = /* @__PURE__ */ new Map();
    W.forEach((q3) => {
      if (!l3.has(q3.action)) l3.set(q3.action, []);
      l3.get(q3.action).push(q3.id);
    });
    for (let [q3, $3] of l3.entries()) switch (q3) {
      case "ack":
        this.logger.log(`acknowledging ${$3.length} items.`), await this.transport.ack(this.queueName, $3);
        break;
      case "nack":
        this.logger.log(`nacknowledging ${$3.length} items.`), await this.transport.nack(this.queueName, $3);
        break;
      case "retry":
        this.logger.log(`retrying ${$3.length} items.`), await this.transport.retry(this.queueName, $3);
        break;
    }
  }
};
var WW = q(B2(), 1);
var kW = /* @__PURE__ */ new Set(["GET", "HEAD"]);
var Z = { isArrayBufferLike(k2) {
  let W = Object.prototype.toString.call(k2);
  return W === "[object ArrayBuffer]" || W === "[object SharedArrayBuffer]";
}, isBufferJson(k2) {
  return !!k2 && k2.type === "Buffer" && Array.isArray(k2.data);
}, isBytesLike(k2) {
  return ArrayBuffer.isView(k2) || Z.isArrayBufferLike(k2) || Z.isBufferJson(k2);
}, base64ToBytes(k2) {
  let W = atob(k2.replace(/\s/g, "")), l3 = new Uint8Array(W.length);
  for (let q3 = 0; q3 < W.length; q3++) l3[q3] = W.charCodeAt(q3);
  return l3;
}, latin1ToBytes(k2) {
  let W = new Uint8Array(k2.length);
  for (let l3 = 0; l3 < k2.length; l3++) W[l3] = k2.charCodeAt(l3) & 255;
  return W;
}, toBytes(k2, W = false, l3 = false) {
  if (typeof k2 === "string") {
    if (W) return Z.base64ToBytes(k2);
    if (l3) return Z.latin1ToBytes(k2);
    return new TextEncoder().encode(k2);
  }
  if (ArrayBuffer.isView(k2)) return new Uint8Array(k2.buffer, k2.byteOffset, k2.byteLength);
  if (Z.isArrayBufferLike(k2)) return new Uint8Array(k2);
  if (Z.isBufferJson(k2)) return Uint8Array.from(k2.data);
  return new TextEncoder().encode(String(k2));
}, bytesToText(k2) {
  return new TextDecoder().decode(k2);
}, async readStreamBytes(k2) {
  let W = new TextEncoder(), l3 = [];
  for await (let J2 of k2) l3.push(typeof J2 === "string" ? W.encode(J2) : Z.toBytes(J2));
  let q3 = l3.reduce((J2, N2) => J2 + N2.length, 0), $3 = new Uint8Array(q3), P3 = 0;
  for (let J2 of l3) $3.set(J2, P3), P3 += J2.length;
  return $3;
}, isEmptyPlainObject(k2) {
  return !!k2 && typeof k2 === "object" && !Z.isBytesLike(k2) && !Array.isArray(k2) && Object.keys(k2).length === 0;
} };
var F2 = { normalizeHeaders(k2) {
  let W = {};
  if (!k2) return W;
  if (typeof k2.forEach === "function" && typeof k2.get === "function") return k2.forEach((l3, q3) => {
    W[String(q3).toLowerCase()] = String(l3);
  }), W;
  for (let [l3, q3] of Object.entries(k2)) {
    if (q3 == null) continue;
    W[l3.toLowerCase()] = Array.isArray(q3) ? q3.join(", ") : String(q3);
  }
  return W;
}, normalizeQuery(k2) {
  let W = {};
  if (!k2) return W;
  let l3 = (q3, $3) => {
    if ($3 == null) return;
    let P3 = typeof $3 === "object" ? JSON.stringify($3) : String($3);
    W[q3] = q3 in W ? `${W[q3]},${P3}` : P3;
  };
  if (typeof k2.forEach === "function") k2.forEach((q3, $3) => l3($3, q3));
  else for (let [q3, $3] of Object.entries(k2)) l3(q3, Array.isArray($3) ? $3.join(",") : $3);
  return W;
}, queryFromUrl(k2) {
  let W = k2.indexOf("?");
  if (W === -1) return {};
  let l3 = k2.indexOf("#", W);
  return F2.normalizeQuery(new URLSearchParams(k2.slice(W + 1, l3 === -1 ? void 0 : l3)));
}, decodeUrlEncodedMap(k2) {
  let W = (q3) => {
    try {
      return decodeURIComponent(q3.replace(/\+/g, " "));
    } catch {
      return q3;
    }
  }, l3 = {};
  for (let [q3, $3] of Object.entries(k2)) l3[W(q3)] = Array.isArray($3) ? $3.map((P3) => W(String(P3))) : $3 == null ? $3 : W(String($3));
  return l3;
} };
var Q = { bodyKind(k2) {
  let W = k2.toLowerCase();
  if (W.includes("msgpack")) return "msgpack";
  if (/^\s*(image|audio|video)\//.test(W) || /application\/(octet-stream|pdf|zip|gzip)/.test(W)) return "binary";
  return "text";
}, parseTextBody(k2, W) {
  let l3 = W.toLowerCase();
  if (l3.includes("json")) try {
    return JSON.parse(k2);
  } catch {
    return k2;
  }
  if (l3.includes("application/x-www-form-urlencoded")) return F2.normalizeQuery(new URLSearchParams(k2));
  if (!l3.trim()) {
    let q3 = k2.trimStart();
    if (q3.startsWith("{") || q3.startsWith("[")) try {
      return JSON.parse(k2);
    } catch {
    }
  }
  return k2;
}, decodeBytes(k2, W) {
  let l3 = Q.bodyKind(W);
  if (l3 === "msgpack") try {
    return { body: WW.decode(k2), rawBody: null };
  } catch ($3) {
    throw Error(`[parseAnyPayload] Invalid MessagePack payload (${k2.byteLength} bytes): ${$3 instanceof Error ? $3.message : String($3)}`, { cause: $3 });
  }
  if (l3 === "binary") return { body: k2, rawBody: null };
  let q3 = Z.bytesToText(k2);
  return { body: Q.parseTextBody(q3, W), rawBody: q3 };
}, finalizeBody(k2, W, l3 = false) {
  if (k2 == null || k2 === "") return { body: null, rawBody: null };
  if (typeof k2 !== "string" && !Z.isBytesLike(k2)) return { body: k2, rawBody: null };
  let q3 = Q.bodyKind(W), $3 = q3 === "msgpack" || q3 === "binary", P3 = Z.toBytes(k2, l3, $3);
  if (P3.byteLength === 0) return { body: null, rawBody: null };
  return Q.decodeBytes(P3, W);
} };
var U = { isFetchRequest(k2) {
  return !!k2 && typeof k2.clone === "function" && typeof k2.url === "string" && typeof k2.headers?.get === "function" && (typeof k2.arrayBuffer === "function" || typeof k2.text === "function");
}, unwrapInput(k2) {
  let W = k2;
  if (!U.isFetchRequest(W) && U.isFetchRequest(W.request)) W = W.request;
  else if (!U.isFetchRequest(W) && U.isFetchRequest(W.req?.raw)) W = W.req.raw;
  else if (W.req && W.req.headers && !W.headers) W = W.req;
  return W;
} };
async function v2(k2) {
  if (!k2) throw Error("[parseAnyPayload] No request object/event provided.");
  let W = U.unwrapInput(k2);
  if (U.isFetchRequest(W)) {
    let l3;
    try {
      l3 = W.clone();
    } catch {
      l3 = W;
    }
    let q3 = String(l3.method || "GET").toUpperCase(), $3 = F2.normalizeHeaders(l3.headers), P3 = $3["content-type"] || "", J2 = null;
    if (!kW.has(q3)) try {
      J2 = typeof l3.arrayBuffer === "function" ? new Uint8Array(await l3.arrayBuffer()) : new TextEncoder().encode(await l3.text());
    } catch {
      J2 = null;
    }
    let { body: N2, rawBody: g2 } = Q.finalizeBody(J2, P3);
    return { method: q3, url: l3.url, headers: $3, query: F2.queryFromUrl(l3.url), body: N2, rawBody: g2 };
  }
  if (W.requestContext || W.httpMethod || W.rawPath) {
    let l3 = F2.normalizeHeaders(W.multiValueHeaders ?? W.headers), q3 = String(W.requestContext?.http?.method || W.httpMethod || "POST").toUpperCase(), $3 = !!W.requestContext?.elb, P3 = {};
    if (W.rawQueryString) P3 = F2.queryFromUrl(`?${W.rawQueryString}`);
    else {
      let n2 = W.multiValueQueryStringParameters ?? W.queryStringParameters;
      if (n2 && $3) n2 = F2.decodeUrlEncodedMap(n2);
      P3 = F2.normalizeQuery(n2);
    }
    let J2 = W.rawPath || W.path || "/", N2 = W.rawQueryString ? `?${W.rawQueryString}` : Object.keys(P3).length ? `?${new URLSearchParams(P3).toString()}` : "", g2 = l3["x-forwarded-proto"]?.split(",")[0]?.trim() || "https", I = l3.host || W.requestContext?.domainName || "lambda.local", m3 = W.rawUrl || `${g2}://${I}${J2}${N2}`, { body: X, rawBody: D } = Q.finalizeBody(W.body, l3["content-type"] || "", !!W.isBase64Encoded);
    return { method: q3, url: m3, headers: l3, query: P3, body: X, rawBody: D };
  }
  if (W.headers && W.method) {
    let l3 = F2.normalizeHeaders(W.headers), q3 = String(W.method).toUpperCase(), $3 = l3["content-type"] || "", P3 = W.originalUrl || W.url || "/", J2 = P3;
    if (!/^https?:\/\//i.test(P3)) {
      let X = l3["x-forwarded-proto"]?.split(",")[0]?.trim() || W.protocol || (W.socket?.encrypted ? "https" : "http"), D = l3["x-forwarded-host"] || l3.host || "localhost";
      J2 = `${X}://${D}${P3}`;
    }
    let g2 = W.query && Object.keys(W.query).length > 0 ? F2.normalizeQuery(W.query) : F2.queryFromUrl(J2), I = W.body !== void 0 ? W.body : W.rawBody;
    if (Z.isEmptyPlainObject(I) && !$3.toLowerCase().includes("json")) I = W.rawBody;
    if (I === void 0 && !kW.has(q3) && typeof W[Symbol.asyncIterator] === "function") try {
      I = await Z.readStreamBytes(W);
    } catch {
      I = void 0;
    }
    let m3 = Q.finalizeBody(I, $3);
    if (m3.rawBody === null && W.rawBody != null && Q.bodyKind($3) === "text") m3.rawBody = typeof W.rawBody === "string" ? W.rawBody : Z.bytesToText(Z.toBytes(W.rawBody));
    return { method: q3, url: J2, headers: l3, query: g2, body: m3.body, rawBody: m3.rawBody };
  }
  throw Error("[parseAnyPayload] Could not identify runtime payload type.");
}
var Hl = class extends R3 {
  transport = this;
  storage;
  instanceIdAsiggned = false;
  constructor(k2, W) {
    super(k2, W);
    this.storage = new P(W.storage);
  }
  async handle(k2, W) {
    let l3 = await v2(k2);
    if (new URL(l3.url).pathname.endsWith("/dispatch")) {
      let { batch: $3, worker_id: P3 } = l3.body, J2 = l3.headers, N2 = J2["x-instance-id"], g2 = J2["x-api-key"];
      if (console.log(J2), !N2) return { status: 400, message: "Bad Request: Instance ID is required." };
      if (!g2) return { status: 400, message: "Bad Request: API key is required." };
      if (g2 !== this.options.apiKey) return { status: 401, message: "Unauthorized: Invalid API key provided." };
      if (!P3) return { status: 400, message: "Bad Request: Worker ID is required." };
      if (!$3 || $3.length === 0) return { status: 400, message: "Bad Request: Batch must contain at least one item." };
      if (!this.instanceIdAsiggned) this.storage.bindInstanceId(N2), this.instanceIdAsiggned = true;
      let I = $3.map((m3) => new K(m3.msg_id, m3));
      return this.handleProcesses(P3, I, W);
    }
  }
  async connect() {
    await this.storage.connect();
  }
  async ack(k2, W) {
    await this.storage.ops.ack(k2, W);
  }
  async nack(k2, W) {
    await this.storage.ops.nack(k2, W);
  }
  async retry(k2, W) {
    await this.storage.ops.retry(k2, W);
  }
  async deregister(k2) {
    await this.storage.repository.deregisterWorker(k2, this.queueName);
  }
};
var lW = q(B2(), 1);

// src/setup.ts
var import_config = __toESM(require_config(), 1);
var cacheStorage = new T8({
  protocol: "tcp",
  connectionString: process.env.REDIS_TCP
});
var postgresDriver = new YY({
  connectionString: process.env.POSTGRESSQL_TCP,
  connectionProtocol: "tcp"
});
var unifiedStorage = new P({
  cache: cacheStorage,
  db: postgresDriver,
  strategy: "AUTO"
});
var queue = "q_2";
var apiKey = "MMvGnFbCs7gpFaO31SOmvz4b82jEp1SVfoKLUAIIivqGXPoVDDeycjDfdwAOIkwx";
var worker = new Hl(queue, {
  apiKey,
  storage: unifiedStorage,
  concurrency: 1
});

// src/index.ts
var handler = async (event) => {
  const path = event.path;
  console.log({
    isBase64Encoded: event.isBase64Encoded,
    bodyType: typeof event.body,
    bodyPreview: typeof event.body === "string" ? event.body.slice(0, 80) : event.body
  });
  if (path == "/dispatch") {
    const response = await worker.handle(
      event,
      async (job) => {
        await job.ack(true);
      }
    );
    if (response) {
      return {
        statusCode: response.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: response.message })
      };
    }
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Test route " })
    };
  }
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Not Found" })
  };
};
export {
  handler
};
//# sourceMappingURL=index.js.map
