(function () {
  "use strict";
  const Jt = 0.5 * (Math.sqrt(3) - 1),
    tt = (3 - Math.sqrt(3)) / 6,
    Gt = 1 / 3,
    K = 1 / 6,
    Tt = (Math.sqrt(5) - 1) / 4,
    z = (5 - Math.sqrt(5)) / 20,
    U = new Float32Array([
      1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1,
      0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
    ]),
    N = new Float32Array([
      0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1,
      -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1,
      0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1,
      0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1,
      -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1,
      -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0,
    ]);
  class Wt {
    constructor(i = Math.random) {
      const n = typeof i == "function" ? i : Ut(i);
      ((this.p = Nt(n)),
        (this.perm = new Uint8Array(512)),
        (this.permMod12 = new Uint8Array(512)));
      for (let a = 0; a < 512; a++)
        ((this.perm[a] = this.p[a & 255]),
          (this.permMod12[a] = this.perm[a] % 12));
    }
    noise2D(i, n) {
      const a = this.permMod12,
        y = this.perm;
      let g = 0,
        u = 0,
        l = 0;
      const t = (i + n) * Jt,
        c = Math.floor(i + t),
        s = Math.floor(n + t),
        e = (c + s) * tt,
        r = c - e,
        h = s - e,
        x = i - r,
        C = n - h;
      let H, f;
      x > C ? ((H = 1), (f = 0)) : ((H = 0), (f = 1));
      const _ = x - H + tt,
        P = C - f + tt,
        w = x - 1 + 2 * tt,
        v = C - 1 + 2 * tt,
        X = c & 255,
        M = s & 255;
      let d = 0.5 - x * x - C * C;
      if (d >= 0) {
        const Z = a[X + y[M]] * 3;
        ((d *= d), (g = d * d * (U[Z] * x + U[Z + 1] * C)));
      }
      let m = 0.5 - _ * _ - P * P;
      if (m >= 0) {
        const Z = a[X + H + y[M + f]] * 3;
        ((m *= m), (u = m * m * (U[Z] * _ + U[Z + 1] * P)));
      }
      let k = 0.5 - w * w - v * v;
      if (k >= 0) {
        const Z = a[X + 1 + y[M + 1]] * 3;
        ((k *= k), (l = k * k * (U[Z] * w + U[Z + 1] * v)));
      }
      return 70 * (g + u + l);
    }
    noise3D(i, n, a) {
      const y = this.permMod12,
        g = this.perm;
      let u, l, t, c;
      const s = (i + n + a) * Gt,
        e = Math.floor(i + s),
        r = Math.floor(n + s),
        h = Math.floor(a + s),
        x = (e + r + h) * K,
        C = e - x,
        H = r - x,
        f = h - x,
        _ = i - C,
        P = n - H,
        w = a - f;
      let v, X, M, d, m, k;
      _ >= P
        ? P >= w
          ? ((v = 1), (X = 0), (M = 0), (d = 1), (m = 1), (k = 0))
          : _ >= w
            ? ((v = 1), (X = 0), (M = 0), (d = 1), (m = 0), (k = 1))
            : ((v = 0), (X = 0), (M = 1), (d = 1), (m = 0), (k = 1))
        : P < w
          ? ((v = 0), (X = 0), (M = 1), (d = 0), (m = 1), (k = 1))
          : _ < w
            ? ((v = 0), (X = 1), (M = 0), (d = 0), (m = 1), (k = 1))
            : ((v = 0), (X = 1), (M = 0), (d = 1), (m = 1), (k = 0));
      const Z = _ - v + K,
        A = P - X + K,
        W = w - M + K,
        S = _ - d + 2 * K,
        b = P - m + 2 * K,
        J = w - k + 2 * K,
        Y = _ - 1 + 3 * K,
        p = P - 1 + 3 * K,
        j = w - 1 + 3 * K,
        D = e & 255,
        F = r & 255,
        B = h & 255;
      let E = 0.6 - _ * _ - P * P - w * w;
      if (E < 0) u = 0;
      else {
        const T = y[D + g[F + g[B]]] * 3;
        ((E *= E), (u = E * E * (U[T] * _ + U[T + 1] * P + U[T + 2] * w)));
      }
      let $ = 0.6 - Z * Z - A * A - W * W;
      if ($ < 0) l = 0;
      else {
        const T = y[D + v + g[F + X + g[B + M]]] * 3;
        (($ *= $), (l = $ * $ * (U[T] * Z + U[T + 1] * A + U[T + 2] * W)));
      }
      let R = 0.6 - S * S - b * b - J * J;
      if (R < 0) t = 0;
      else {
        const T = y[D + d + g[F + m + g[B + k]]] * 3;
        ((R *= R), (t = R * R * (U[T] * S + U[T + 1] * b + U[T + 2] * J)));
      }
      let q = 0.6 - Y * Y - p * p - j * j;
      if (q < 0) c = 0;
      else {
        const T = y[D + 1 + g[F + 1 + g[B + 1]]] * 3;
        ((q *= q), (c = q * q * (U[T] * Y + U[T + 1] * p + U[T + 2] * j)));
      }
      return 32 * (u + l + t + c);
    }
    noise4D(i, n, a, y) {
      const g = this.perm;
      let u, l, t, c, s;
      const e = (i + n + a + y) * Tt,
        r = Math.floor(i + e),
        h = Math.floor(n + e),
        x = Math.floor(a + e),
        C = Math.floor(y + e),
        H = (r + h + x + C) * z,
        f = r - H,
        _ = h - H,
        P = x - H,
        w = C - H,
        v = i - f,
        X = n - _,
        M = a - P,
        d = y - w;
      let m = 0,
        k = 0,
        Z = 0,
        A = 0;
      (v > X ? m++ : k++,
        v > M ? m++ : Z++,
        v > d ? m++ : A++,
        X > M ? k++ : Z++,
        X > d ? k++ : A++,
        M > d ? Z++ : A++);
      const W = m >= 3 ? 1 : 0,
        S = k >= 3 ? 1 : 0,
        b = Z >= 3 ? 1 : 0,
        J = A >= 3 ? 1 : 0,
        Y = m >= 2 ? 1 : 0,
        p = k >= 2 ? 1 : 0,
        j = Z >= 2 ? 1 : 0,
        D = A >= 2 ? 1 : 0,
        F = m >= 1 ? 1 : 0,
        B = k >= 1 ? 1 : 0,
        E = Z >= 1 ? 1 : 0,
        $ = A >= 1 ? 1 : 0,
        R = v - W + z,
        q = X - S + z,
        T = M - b + z,
        bt = d - J + z,
        Mt = v - Y + 2 * z,
        St = X - p + 2 * z,
        Dt = M - j + 2 * z,
        Ft = d - D + 2 * z,
        At = v - F + 3 * z,
        qt = X - B + 3 * z,
        Xt = M - E + 3 * z,
        jt = d - $ + 3 * z,
        kt = v - 1 + 4 * z,
        Ct = X - 1 + 4 * z,
        Zt = M - 1 + 4 * z,
        Ht = d - 1 + 4 * z,
        et = r & 255,
        ot = h & 255,
        it = x & 255,
        st = C & 255;
      let at = 0.6 - v * v - X * X - M * M - d * d;
      if (at < 0) u = 0;
      else {
        const G = (g[et + g[ot + g[it + g[st]]]] % 32) * 4;
        ((at *= at),
          (u =
            at * at * (N[G] * v + N[G + 1] * X + N[G + 2] * M + N[G + 3] * d)));
      }
      let ct = 0.6 - R * R - q * q - T * T - bt * bt;
      if (ct < 0) l = 0;
      else {
        const G = (g[et + W + g[ot + S + g[it + b + g[st + J]]]] % 32) * 4;
        ((ct *= ct),
          (l =
            ct *
            ct *
            (N[G] * R + N[G + 1] * q + N[G + 2] * T + N[G + 3] * bt)));
      }
      let rt = 0.6 - Mt * Mt - St * St - Dt * Dt - Ft * Ft;
      if (rt < 0) t = 0;
      else {
        const G = (g[et + Y + g[ot + p + g[it + j + g[st + D]]]] % 32) * 4;
        ((rt *= rt),
          (t =
            rt *
            rt *
            (N[G] * Mt + N[G + 1] * St + N[G + 2] * Dt + N[G + 3] * Ft)));
      }
      let lt = 0.6 - At * At - qt * qt - Xt * Xt - jt * jt;
      if (lt < 0) c = 0;
      else {
        const G = (g[et + F + g[ot + B + g[it + E + g[st + $]]]] % 32) * 4;
        ((lt *= lt),
          (c =
            lt *
            lt *
            (N[G] * At + N[G + 1] * qt + N[G + 2] * Xt + N[G + 3] * jt)));
      }
      let ut = 0.6 - kt * kt - Ct * Ct - Zt * Zt - Ht * Ht;
      if (ut < 0) s = 0;
      else {
        const G = (g[et + 1 + g[ot + 1 + g[it + 1 + g[st + 1]]]] % 32) * 4;
        ((ut *= ut),
          (s =
            ut *
            ut *
            (N[G] * kt + N[G + 1] * Ct + N[G + 2] * Zt + N[G + 3] * Ht)));
      }
      return 27 * (u + l + t + c + s);
    }
  }
  function Nt(o) {
    const i = new Uint8Array(256);
    for (let n = 0; n < 256; n++) i[n] = n;
    for (let n = 0; n < 255; n++) {
      const a = n + ~~(o() * (256 - n)),
        y = i[n];
      ((i[n] = i[a]), (i[a] = y));
    }
    return i;
  }
  function Ut(o) {
    let i = 0,
      n = 0,
      a = 0,
      y = 1;
    const g = zt();
    return (
      (i = g(" ")),
      (n = g(" ")),
      (a = g(" ")),
      (i -= g(o)),
      i < 0 && (i += 1),
      (n -= g(o)),
      n < 0 && (n += 1),
      (a -= g(o)),
      a < 0 && (a += 1),
      function () {
        const u = 2091639 * i + y * 23283064365386963e-26;
        return ((i = n), (n = a), (a = u - (y = u | 0)));
      }
    );
  }
  function zt() {
    let o = 4022871197;
    return function (i) {
      i = i.toString();
      for (let n = 0; n < i.length; n++) {
        o += i.charCodeAt(n);
        let a = 0.02519603282416938 * o;
        ((o = a >>> 0),
          (a -= o),
          (a *= o),
          (o = a >>> 0),
          (a -= o),
          (o += a * 4294967296));
      }
      return (o >>> 0) * 23283064365386963e-26;
    };
  }
  const Vt = (o, i, n) => Math.max(0, Math.min(1, (n - o) / (i - o))),
    ft = (o, i, n) => {
      const a = Vt(o, i, n);
      return a * a * (3 - 2 * a);
    },
    It = (o, i, n, a) =>
      o.noise2D(i * n.biomeFrequency + a[7][0], a[7][1]) * 0.75 +
      o.noise2D(i * n.biomeFrequency * 2.3 + a[8][0], a[8][1]) * 0.25,
    Yt = (o, i) =>
      1 -
      ft(
        i.biomeEdgeVolcanic - i.biomeBlendWidth,
        i.biomeEdgeVolcanic + i.biomeBlendWidth,
        o,
      ),
    Kt = (o, i) =>
      ft(
        i.biomeEdgeSavanna - i.biomeBlendWidth,
        i.biomeEdgeSavanna + i.biomeBlendWidth,
        o,
      ),
    Lt = (o, i, n, a) => {
      const y = It(o, i, n, a),
        g = Yt(y, n),
        u = Kt(y, n);
      return [1 - g - u, g, u];
    },
    Qt = (o, i, n, a) =>
      o.noise2D(i * n.coveFrequency + a[9][0], a[9][1]) * 0.7 +
      o.noise2D(i * n.coveFrequency * 2.6 + a[10][0], a[10][1]) * 0.3,
    Ot = (o, i, n, a, y) => {
      const g = n.shoreMeanderAmplitude * (1 - n.headlandMeanderDamp * y),
        u = o.noise2D(i * n.shoreMeanderFrequency + a[0][0], a[0][1]),
        l = o.noise2D(i * n.shoreMeanderFrequency * 2.7 + a[1][0], a[1][1]);
      return n.shoreBaseX + g * (u * 0.8 + l * 0.2);
    },
    Bt = (o, i, n, a, y) => {
      const g = Lt(o, i, n, a),
        u = (_) => {
          let P = 0;
          for (let w = 0; w < y.length; w++) {
            const v = y[w].overrides[_];
            P += g[w] * (v !== void 0 ? v : n[_]);
          }
          return P;
        },
        l = Qt(o, i, n, a),
        t = Math.sign(l) * Math.pow(Math.abs(l), 1.3),
        c = ft(0.1, 0.8, l),
        s = Ot(o, i, n, a, c),
        e = u("beachWidth"),
        r = u("mountainStartDistance"),
        h = u("mountainFullDistance") - r,
        x = Math.max(r - n.coveAmplitude * t, e + n.minPassGap),
        C = x + h,
        H = Math.max(u("highlandStartDistance"), C + 30),
        f = Math.max(u("highlandFullDistance"), H + 30);
      return {
        weights: g,
        headland: c,
        shoreX: s,
        beachWidth: e,
        beachTopHeight: u("beachTopHeight"),
        hillsWidth: u("hillsWidth"),
        hillsHeight: u("hillsHeight"),
        mountainStart: x,
        mountainFull: C,
        mountainHeight: u("mountainHeight"),
        ridgeAmplitude: u("ridgeAmplitude"),
        highlandStart: H,
        highlandFull: f,
        highlandHeight: u("highlandHeight"),
        highlandBowlDepth: u("highlandBowlDepth"),
        highlandUndulation: u("highlandUndulation"),
        highlandRidgeAmplitude: u("highlandRidgeAmplitude"),
        highlandDetail: u("highlandDetail"),
        moundHeight: u("moundHeight"),
        oceanDepth: u("oceanDepth"),
        hillsDetail: u("hillsDetail"),
        terraceStrength: u("terraceStrength"),
        mountainScale: 1 + 0.35 * o.noise2D(i * 0.0012 + a[2][0], a[2][1]),
      };
    };
  var Q =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : {};
  function tn(o) {
    return o &&
      o.__esModule &&
      Object.prototype.hasOwnProperty.call(o, "default")
      ? o.default
      : o;
  }
  function nn(o) {
    if (o.__esModule) return o;
    var i = o.default;
    if (typeof i == "function") {
      var n = function a() {
        return this instanceof a
          ? Reflect.construct(i, arguments, this.constructor)
          : i.apply(this, arguments);
      };
      n.prototype = i.prototype;
    } else n = {};
    return (
      Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.keys(o).forEach(function (a) {
        var y = Object.getOwnPropertyDescriptor(o, a);
        Object.defineProperty(
          n,
          a,
          y.get
            ? y
            : {
                enumerable: !0,
                get: function () {
                  return o[a];
                },
              },
        );
      }),
      n
    );
  }
  var gt = { exports: {} };
  (gt.exports,
    (function (o) {
      (function (i, n, a) {
        function y(t) {
          var c = this,
            s = l();
          ((c.next = function () {
            var e = 2091639 * c.s0 + c.c * 23283064365386963e-26;
            return ((c.s0 = c.s1), (c.s1 = c.s2), (c.s2 = e - (c.c = e | 0)));
          }),
            (c.c = 1),
            (c.s0 = s(" ")),
            (c.s1 = s(" ")),
            (c.s2 = s(" ")),
            (c.s0 -= s(t)),
            c.s0 < 0 && (c.s0 += 1),
            (c.s1 -= s(t)),
            c.s1 < 0 && (c.s1 += 1),
            (c.s2 -= s(t)),
            c.s2 < 0 && (c.s2 += 1),
            (s = null));
        }
        function g(t, c) {
          return ((c.c = t.c), (c.s0 = t.s0), (c.s1 = t.s1), (c.s2 = t.s2), c);
        }
        function u(t, c) {
          var s = new y(t),
            e = c && c.state,
            r = s.next;
          return (
            (r.int32 = function () {
              return (s.next() * 4294967296) | 0;
            }),
            (r.double = function () {
              return r() + ((r() * 2097152) | 0) * 11102230246251565e-32;
            }),
            (r.quick = r),
            e &&
              (typeof e == "object" && g(e, s),
              (r.state = function () {
                return g(s, {});
              })),
            r
          );
        }
        function l() {
          var t = 4022871197,
            c = function (s) {
              s = String(s);
              for (var e = 0; e < s.length; e++) {
                t += s.charCodeAt(e);
                var r = 0.02519603282416938 * t;
                ((t = r >>> 0),
                  (r -= t),
                  (r *= t),
                  (t = r >>> 0),
                  (r -= t),
                  (t += r * 4294967296));
              }
              return (t >>> 0) * 23283064365386963e-26;
            };
          return c;
        }
        n && n.exports
          ? (n.exports = u)
          : a && a.amd
            ? a(function () {
                return u;
              })
            : (this.alea = u);
      })(Q, o, !1);
    })(gt));
  var en = gt.exports,
    dt = { exports: {} };
  (dt.exports,
    (function (o) {
      (function (i, n, a) {
        function y(l) {
          var t = this,
            c = "";
          ((t.x = 0),
            (t.y = 0),
            (t.z = 0),
            (t.w = 0),
            (t.next = function () {
              var e = t.x ^ (t.x << 11);
              return (
                (t.x = t.y),
                (t.y = t.z),
                (t.z = t.w),
                (t.w ^= (t.w >>> 19) ^ e ^ (e >>> 8))
              );
            }),
            l === (l | 0) ? (t.x = l) : (c += l));
          for (var s = 0; s < c.length + 64; s++)
            ((t.x ^= c.charCodeAt(s) | 0), t.next());
        }
        function g(l, t) {
          return ((t.x = l.x), (t.y = l.y), (t.z = l.z), (t.w = l.w), t);
        }
        function u(l, t) {
          var c = new y(l),
            s = t && t.state,
            e = function () {
              return (c.next() >>> 0) / 4294967296;
            };
          return (
            (e.double = function () {
              do
                var r = c.next() >>> 11,
                  h = (c.next() >>> 0) / 4294967296,
                  x = (r + h) / (1 << 21);
              while (x === 0);
              return x;
            }),
            (e.int32 = c.next),
            (e.quick = e),
            s &&
              (typeof s == "object" && g(s, c),
              (e.state = function () {
                return g(c, {});
              })),
            e
          );
        }
        n && n.exports
          ? (n.exports = u)
          : a && a.amd
            ? a(function () {
                return u;
              })
            : (this.xor128 = u);
      })(Q, o, !1);
    })(dt));
  var on = dt.exports,
    xt = { exports: {} };
  (xt.exports,
    (function (o) {
      (function (i, n, a) {
        function y(l) {
          var t = this,
            c = "";
          ((t.next = function () {
            var e = t.x ^ (t.x >>> 2);
            return (
              (t.x = t.y),
              (t.y = t.z),
              (t.z = t.w),
              (t.w = t.v),
              ((t.d = (t.d + 362437) | 0) +
                (t.v = t.v ^ (t.v << 4) ^ (e ^ (e << 1)))) |
                0
            );
          }),
            (t.x = 0),
            (t.y = 0),
            (t.z = 0),
            (t.w = 0),
            (t.v = 0),
            l === (l | 0) ? (t.x = l) : (c += l));
          for (var s = 0; s < c.length + 64; s++)
            ((t.x ^= c.charCodeAt(s) | 0),
              s == c.length && (t.d = (t.x << 10) ^ (t.x >>> 4)),
              t.next());
        }
        function g(l, t) {
          return (
            (t.x = l.x),
            (t.y = l.y),
            (t.z = l.z),
            (t.w = l.w),
            (t.v = l.v),
            (t.d = l.d),
            t
          );
        }
        function u(l, t) {
          var c = new y(l),
            s = t && t.state,
            e = function () {
              return (c.next() >>> 0) / 4294967296;
            };
          return (
            (e.double = function () {
              do
                var r = c.next() >>> 11,
                  h = (c.next() >>> 0) / 4294967296,
                  x = (r + h) / (1 << 21);
              while (x === 0);
              return x;
            }),
            (e.int32 = c.next),
            (e.quick = e),
            s &&
              (typeof s == "object" && g(s, c),
              (e.state = function () {
                return g(c, {});
              })),
            e
          );
        }
        n && n.exports
          ? (n.exports = u)
          : a && a.amd
            ? a(function () {
                return u;
              })
            : (this.xorwow = u);
      })(Q, o, !1);
    })(xt));
  var sn = xt.exports,
    pt = { exports: {} };
  (pt.exports,
    (function (o) {
      (function (i, n, a) {
        function y(l) {
          var t = this;
          t.next = function () {
            var s = t.x,
              e = t.i,
              r,
              h;
            return (
              (r = s[e]),
              (r ^= r >>> 7),
              (h = r ^ (r << 24)),
              (r = s[(e + 1) & 7]),
              (h ^= r ^ (r >>> 10)),
              (r = s[(e + 3) & 7]),
              (h ^= r ^ (r >>> 3)),
              (r = s[(e + 4) & 7]),
              (h ^= r ^ (r << 7)),
              (r = s[(e + 7) & 7]),
              (r = r ^ (r << 13)),
              (h ^= r ^ (r << 9)),
              (s[e] = h),
              (t.i = (e + 1) & 7),
              h
            );
          };
          function c(s, e) {
            var r,
              h = [];
            if (e === (e | 0)) h[0] = e;
            else
              for (e = "" + e, r = 0; r < e.length; ++r)
                h[r & 7] =
                  (h[r & 7] << 15) ^ ((e.charCodeAt(r) + h[(r + 1) & 7]) << 13);
            for (; h.length < 8;) h.push(0);
            for (r = 0; r < 8 && h[r] === 0; ++r);
            for (
              r == 8 ? (h[7] = -1) : h[r], s.x = h, s.i = 0, r = 256;
              r > 0;
              --r
            )
              s.next();
          }
          c(t, l);
        }
        function g(l, t) {
          return ((t.x = l.x.slice()), (t.i = l.i), t);
        }
        function u(l, t) {
          l == null && (l = +new Date());
          var c = new y(l),
            s = t && t.state,
            e = function () {
              return (c.next() >>> 0) / 4294967296;
            };
          return (
            (e.double = function () {
              do
                var r = c.next() >>> 11,
                  h = (c.next() >>> 0) / 4294967296,
                  x = (r + h) / (1 << 21);
              while (x === 0);
              return x;
            }),
            (e.int32 = c.next),
            (e.quick = e),
            s &&
              (s.x && g(s, c),
              (e.state = function () {
                return g(c, {});
              })),
            e
          );
        }
        n && n.exports
          ? (n.exports = u)
          : a && a.amd
            ? a(function () {
                return u;
              })
            : (this.xorshift7 = u);
      })(Q, o, !1);
    })(pt));
  var an = pt.exports,
    mt = { exports: {} };
  (mt.exports,
    (function (o) {
      (function (i, n, a) {
        function y(l) {
          var t = this;
          t.next = function () {
            var s = t.w,
              e = t.X,
              r = t.i,
              h,
              x;
            return (
              (t.w = s = (s + 1640531527) | 0),
              (x = e[(r + 34) & 127]),
              (h = e[(r = (r + 1) & 127)]),
              (x ^= x << 13),
              (h ^= h << 17),
              (x ^= x >>> 15),
              (h ^= h >>> 12),
              (x = e[r] = x ^ h),
              (t.i = r),
              (x + (s ^ (s >>> 16))) | 0
            );
          };
          function c(s, e) {
            var r,
              h,
              x,
              C,
              H,
              f = [],
              _ = 128;
            for (
              e === (e | 0)
                ? ((h = e), (e = null))
                : ((e = e + "\0"), (h = 0), (_ = Math.max(_, e.length))),
                x = 0,
                C = -32;
              C < _;
              ++C
            )
              (e && (h ^= e.charCodeAt((C + 32) % e.length)),
                C === 0 && (H = h),
                (h ^= h << 10),
                (h ^= h >>> 15),
                (h ^= h << 4),
                (h ^= h >>> 13),
                C >= 0 &&
                  ((H = (H + 1640531527) | 0),
                  (r = f[C & 127] ^= h + H),
                  (x = r == 0 ? x + 1 : 0)));
            for (
              x >= 128 && (f[((e && e.length) || 0) & 127] = -1),
                x = 127,
                C = 4 * 128;
              C > 0;
              --C
            )
              ((h = f[(x + 34) & 127]),
                (r = f[(x = (x + 1) & 127)]),
                (h ^= h << 13),
                (r ^= r << 17),
                (h ^= h >>> 15),
                (r ^= r >>> 12),
                (f[x] = h ^ r));
            ((s.w = H), (s.X = f), (s.i = x));
          }
          c(t, l);
        }
        function g(l, t) {
          return ((t.i = l.i), (t.w = l.w), (t.X = l.X.slice()), t);
        }
        function u(l, t) {
          l == null && (l = +new Date());
          var c = new y(l),
            s = t && t.state,
            e = function () {
              return (c.next() >>> 0) / 4294967296;
            };
          return (
            (e.double = function () {
              do
                var r = c.next() >>> 11,
                  h = (c.next() >>> 0) / 4294967296,
                  x = (r + h) / (1 << 21);
              while (x === 0);
              return x;
            }),
            (e.int32 = c.next),
            (e.quick = e),
            s &&
              (s.X && g(s, c),
              (e.state = function () {
                return g(c, {});
              })),
            e
          );
        }
        n && n.exports
          ? (n.exports = u)
          : a && a.amd
            ? a(function () {
                return u;
              })
            : (this.xor4096 = u);
      })(Q, o, !1);
    })(mt));
  var cn = mt.exports,
    yt = { exports: {} };
  (yt.exports,
    (function (o) {
      (function (i, n, a) {
        function y(l) {
          var t = this,
            c = "";
          ((t.next = function () {
            var e = t.b,
              r = t.c,
              h = t.d,
              x = t.a;
            return (
              (e = (e << 25) ^ (e >>> 7) ^ r),
              (r = (r - h) | 0),
              (h = (h << 24) ^ (h >>> 8) ^ x),
              (x = (x - e) | 0),
              (t.b = e = (e << 20) ^ (e >>> 12) ^ r),
              (t.c = r = (r - h) | 0),
              (t.d = (h << 16) ^ (r >>> 16) ^ x),
              (t.a = (x - e) | 0)
            );
          }),
            (t.a = 0),
            (t.b = 0),
            (t.c = -1640531527),
            (t.d = 1367130551),
            l === Math.floor(l)
              ? ((t.a = (l / 4294967296) | 0), (t.b = l | 0))
              : (c += l));
          for (var s = 0; s < c.length + 20; s++)
            ((t.b ^= c.charCodeAt(s) | 0), t.next());
        }
        function g(l, t) {
          return ((t.a = l.a), (t.b = l.b), (t.c = l.c), (t.d = l.d), t);
        }
        function u(l, t) {
          var c = new y(l),
            s = t && t.state,
            e = function () {
              return (c.next() >>> 0) / 4294967296;
            };
          return (
            (e.double = function () {
              do
                var r = c.next() >>> 11,
                  h = (c.next() >>> 0) / 4294967296,
                  x = (r + h) / (1 << 21);
              while (x === 0);
              return x;
            }),
            (e.int32 = c.next),
            (e.quick = e),
            s &&
              (typeof s == "object" && g(s, c),
              (e.state = function () {
                return g(c, {});
              })),
            e
          );
        }
        n && n.exports
          ? (n.exports = u)
          : a && a.amd
            ? a(function () {
                return u;
              })
            : (this.tychei = u);
      })(Q, o, !1);
    })(yt));
  var rn = yt.exports,
    Et = { exports: {} },
    ln = {},
    un = Object.freeze({ __proto__: null, default: ln }),
    hn = nn(un);
  (function (o) {
    (function (i, n, a) {
      var y = 256,
        g = 6,
        u = 52,
        l = "random",
        t = a.pow(y, g),
        c = a.pow(2, u),
        s = c * 2,
        e = y - 1,
        r;
      function h(w, v, X) {
        var M = [];
        v = v == !0 ? { entropy: !0 } : v || {};
        var d = f(H(v.entropy ? [w, P(n)] : (w ?? _()), 3), M),
          m = new x(M),
          k = function () {
            for (var Z = m.g(g), A = t, W = 0; Z < c;)
              ((Z = (Z + W) * y), (A *= y), (W = m.g(1)));
            for (; Z >= s;) ((Z /= 2), (A /= 2), (W >>>= 1));
            return (Z + W) / A;
          };
        return (
          (k.int32 = function () {
            return m.g(4) | 0;
          }),
          (k.quick = function () {
            return m.g(4) / 4294967296;
          }),
          (k.double = k),
          f(P(m.S), n),
          (
            v.pass ||
            X ||
            function (Z, A, W, S) {
              return (
                S &&
                  (S.S && C(S, m),
                  (Z.state = function () {
                    return C(m, {});
                  })),
                W ? ((a[l] = Z), A) : Z
              );
            }
          )(k, d, "global" in v ? v.global : this == a, v.state)
        );
      }
      function x(w) {
        var v,
          X = w.length,
          M = this,
          d = 0,
          m = (M.i = M.j = 0),
          k = (M.S = []);
        for (X || (w = [X++]); d < y;) k[d] = d++;
        for (d = 0; d < y; d++)
          ((k[d] = k[(m = e & (m + w[d % X] + (v = k[d])))]), (k[m] = v));
        (M.g = function (Z) {
          for (var A, W = 0, S = M.i, b = M.j, J = M.S; Z--;)
            ((A = J[(S = e & (S + 1))]),
              (W =
                W * y + J[e & ((J[S] = J[(b = e & (b + A))]) + (J[b] = A))]));
          return ((M.i = S), (M.j = b), W);
        })(y);
      }
      function C(w, v) {
        return ((v.i = w.i), (v.j = w.j), (v.S = w.S.slice()), v);
      }
      function H(w, v) {
        var X = [],
          M = typeof w,
          d;
        if (v && M == "object")
          for (d in w)
            try {
              X.push(H(w[d], v - 1));
            } catch {}
        return X.length ? X : M == "string" ? w : w + "\0";
      }
      function f(w, v) {
        for (var X = w + "", M, d = 0; d < X.length;)
          v[e & d] = e & ((M ^= v[e & d] * 19) + X.charCodeAt(d++));
        return P(v);
      }
      function _() {
        try {
          var w;
          return (
            r && (w = r.randomBytes)
              ? (w = w(y))
              : ((w = new Uint8Array(y)),
                (i.crypto || i.msCrypto).getRandomValues(w)),
            P(w)
          );
        } catch {
          var v = i.navigator,
            X = v && v.plugins;
          return [+new Date(), i, X, i.screen, P(n)];
        }
      }
      function P(w) {
        return String.fromCharCode.apply(0, w);
      }
      if ((f(a.random(), n), o.exports)) {
        o.exports = h;
        try {
          r = hn;
        } catch {}
      } else a["seed" + l] = h;
    })(typeof self < "u" ? self : Q, [], Math);
  })(Et);
  var fn = Et.exports,
    gn = en,
    dn = on,
    xn = sn,
    pn = an,
    mn = cn,
    yn = rn,
    O = fn;
  ((O.alea = gn),
    (O.xor128 = dn),
    (O.xorwow = xn),
    (O.xorshift7 = pn),
    (O.xor4096 = mn),
    (O.tychei = yn));
  var vn = O,
    wn = tn(vn);
  const nt = {
      firstOffset: 520,
      interval: 840,
      mogulCount: 8,
      mogulSpacing: 16,
      spacingJitter: 3,
      mogulRadius: 5.5,
      radiusJitter: 0.25,
      mogulHeight: 2,
      heightJitter: 0.35,
      inlandOffset: 8,
      lateralWeave: 3,
    },
    $t = (o) => -(nt.firstOffset + o * nt.interval),
    bn = () => {
      const o = nt;
      return (o.mogulCount - 1) * (o.mogulSpacing + o.spacingJitter * 0.5);
    },
    Mn = (o, i) => {
      const n = nt,
        a = new wn(`duneMelody:${o}`),
        y = $t(o),
        g = a() * Math.PI * 2,
        u = [];
      let l = y,
        t = 0;
      for (let c = 0; c < n.mogulCount; c++) {
        const s = n.mogulSpacing + (a() - 0.5) * n.spacingJitter * 2,
          e = n.mogulRadius * (1 + (a() - 0.5) * n.radiusJitter * 2),
          r = n.mogulHeight + (a() - 0.5) * n.heightJitter * 2;
        c > 0 && (l -= s);
        const h = Math.sin(c * 0.85 + g) * n.lateralWeave,
          x = i(l) - n.inlandOffset + h;
        (u.push({ index: c, x, z: l, radius: e, height: r }),
          (t += x / n.mogulCount));
      }
      return { k: o, startZ: y, endZ: l, centerX: t, moguls: u };
    };
  var vt = typeof Float32Array < "u" ? Float32Array : Array;
  function Pt() {
    var o = new vt(3);
    return (vt != Float32Array && ((o[0] = 0), (o[1] = 0), (o[2] = 0)), o);
  }
  function ht(o, i, n) {
    var a = new vt(3);
    return ((a[0] = o), (a[1] = i), (a[2] = n), a);
  }
  function Sn(o, i) {
    var n = i[0],
      a = i[1],
      y = i[2],
      g = n * n + a * a + y * y;
    return (
      g > 0 && (g = 1 / Math.sqrt(g)),
      (o[0] = i[0] * g),
      (o[1] = i[1] * g),
      (o[2] = i[2] * g),
      o
    );
  }
  function Dn(o, i, n) {
    var a = i[0],
      y = i[1],
      g = i[2],
      u = n[0],
      l = n[1],
      t = n[2];
    return (
      (o[0] = y * t - g * l),
      (o[1] = g * u - a * t),
      (o[2] = a * l - y * u),
      o
    );
  }
  (function () {
    var o = Pt();
    return function (i, n, a, y, g, u) {
      var l, t;
      for (
        n || (n = 3),
          a || (a = 0),
          y ? (t = Math.min(y * n + a, i.length)) : (t = i.length),
          l = a;
        l < t;
        l += n
      )
        ((o[0] = i[l]),
          (o[1] = i[l + 1]),
          (o[2] = i[l + 2]),
          g(o, o, u),
          (i[l] = o[0]),
          (i[l + 1] = o[1]),
          (i[l + 2] = o[2]));
      return i;
    };
  })();
  let V = null,
    Rt = null,
    _t = "";
  const wt = new Map(),
    Fn = (o, i) => {
      const n = nt,
        a = bn(),
        y = n.mogulRadius * 2 + n.spacingJitter,
        g = (-i - n.firstOffset) / n.interval;
      let u = 0;
      for (let l = Math.floor(g); l <= Math.ceil(g); l++) {
        if (l < 0) continue;
        const t = $t(l);
        if (i > t + y || i < t - a - y) continue;
        let c = wt.get(l);
        if (!c) {
          const { corridor: s, corridorOffsets: e, biomes: r } = Rt;
          ((c = Mn(l, (h) => Bt(V, h, s, e, r).shoreX)), wt.set(l, c));
        }
        for (const s of c.moguls) {
          const e = o - s.x,
            r = i - s.z,
            h = e * e + r * r,
            x = s.radius * s.radius;
          h > x * 4 || (u += s.height * Math.exp((-h / x) * 2.2));
        }
      }
      return u;
    },
    An = (o, i, n) => Math.max(0, Math.min(1, (n - o) / (i - o))),
    I = (o, i, n) => {
      const a = An(o, i, n);
      return a * a * (3 - 2 * a);
    },
    L = (o, i, n) => o * (1 - n) + i * n,
    qn = (o, i, n, a, y, g, u, l, t, c, s, e) => {
      let r = 0,
        h = u,
        x = 1,
        C = 0;
      for (let A = 0; A < g; A++) {
        const W = V.noise2D(o * h + c[A][0], i * h + c[A][1]);
        ((r += W * x), (C += x), (x *= y), (h *= a));
      }
      ((r /= C), (r = Math.pow(Math.abs(r), t) * Math.sign(r)));
      const H = n.shoreX - o,
        f = -H,
        _ = I(0, s.oceanRampWidth, f),
        P = I(-6, n.beachWidth, H),
        w = I(n.beachWidth, n.beachWidth + n.hillsWidth, H),
        v = I(n.mountainStart, n.mountainFull, H),
        X = I(n.highlandStart, n.highlandFull, H);
      let M =
        -n.oceanDepth * _ +
        n.beachTopHeight * P +
        n.hillsHeight * w +
        n.mountainHeight * n.mountainScale * Math.pow(v, 1.6);
      if (v > 0) {
        const A =
            1 -
            Math.abs(
              V.noise2D(
                o * s.ridgeFrequency + e[3][0],
                i * s.ridgeFrequency + e[3][1],
              ),
            ),
          W =
            1 -
            Math.abs(
              V.noise2D(
                o * s.ridgeFrequency * 2.6 + e[4][0],
                i * s.ridgeFrequency * 2.6 + e[4][1],
              ),
            );
        M +=
          v *
          Math.pow(A * 0.72 + W * 0.28, 2) *
          n.ridgeAmplitude *
          n.mountainScale;
      }
      const d = I(4, n.beachWidth, H) * (1 - v);
      if (d > 0) {
        const A = V.noise2D(
            o * s.moundFrequency + e[5][0],
            i * s.moundFrequency + e[5][1],
          ),
          W = V.noise2D(
            o * s.moundFrequency * 1.7 + e[6][0],
            i * s.moundFrequency * 1.7 + e[6][1],
          ),
          S = I(-0.25, 0.6, A * 0.85 + W * 0.15);
        M += S * n.moundHeight * d;
      }
      M += Fn(o, i);
      const m = n.terraceStrength * v;
      if (m > 0) {
        const A =
            V.noise2D(
              o * s.terraceJitterFrequency + e[11][0],
              i * s.terraceJitterFrequency + e[11][1],
            ) * s.terraceJitter,
          W = M + A,
          S = Math.floor(W / s.terraceStep),
          b = W / s.terraceStep - S,
          J = (S + I(1 - s.terraceLedge, 1, b)) * s.terraceStep - A;
        M = L(M, J, m);
      }
      if (X > 0) {
        const A = V.noise2D(o * 0.004 + e[15][0], i * 0.004 + e[15][1]),
          W = V.noise2D(
            o * 0.008 + e[15][0] + 83.1,
            i * 0.004 + e[15][1] - 41.7,
          ),
          S = V.noise2D(
            o * 0.006 + e[15][0] - 127.4,
            i * 0.006 + e[15][1] + 62.3,
          ),
          b =
            1 -
            Math.abs(
              V.noise2D(
                o * 0.014 + e[15][0] + 211.8,
                i * 0.009 + e[15][1] - 95.2,
              ),
            ),
          J =
            n.highlandHeight * n.mountainScale -
            n.highlandBowlDepth * I(-0.25, 0.65, A) +
            W * n.highlandUndulation +
            Math.pow(b, 2.2) * n.highlandRidgeAmplitude,
          Y = I(0.46, 0.72, S),
          p = n.highlandHeight * n.mountainScale - n.highlandBowlDepth * 0.45;
        M = L(M, L(J, p, Y * 0.45), X);
      }
      const k =
        I(s.stackBandNear, s.stackBandNear + 20, f) *
        (1 - I(s.stackBandFar - 40, s.stackBandFar, f));
      if (k > 0.001) {
        const A =
            V.noise2D(
              o * s.stackFrequency + e[12][0],
              i * s.stackFrequency + e[12][1],
            ) *
              0.7 +
            V.noise2D(
              o * s.stackFrequency * 2.4 + e[13][0],
              i * s.stackFrequency * 2.4 + e[13][1],
            ) *
              0.3,
          W = Math.pow(
            I(s.stackThreshold, s.stackThreshold + s.stackSharpness, A),
            s.stackPower,
          );
        if (W > 0) {
          const S =
            s.stackHeight +
            s.stackHeightVariation *
              V.noise2D(o * 0.005 + e[14][0], i * 0.005 + e[14][1]);
          M = L(M, S, W * k);
        }
      }
      const Z =
        L(
          L(s.oceanDetail, s.beachDetail, I(-s.oceanRampWidth * 0.5, 0, H)),
          L(
            L(n.hillsDetail, 1 - m * s.terraceDetailSuppress, v),
            n.highlandDetail,
            X,
          ),
          w,
        ) * l;
      return ((M += r * Z), M);
    };
  onmessage = function (o) {
    const i = o.data.id,
      n = o.data.size,
      a = o.data.x,
      y = o.data.z,
      g = o.data.seed,
      u = o.data.subdivisions,
      l = o.data.lacunarity,
      t = o.data.persistence,
      c = o.data.iterations,
      s = o.data.baseFrequency,
      e = o.data.baseAmplitude,
      r = o.data.power,
      h = o.data.iterationsOffsets,
      x = o.data.corridor,
      C = o.data.corridorOffsets,
      H = o.data.biomes,
      f = u + 1;
    V = new Wt(g);
    const _ = new Wt(g);
    Rt = { corridor: x, corridorOffsets: C, biomes: H };
    const P = `${g}:${x.shoreBaseX}:${x.shoreMeanderAmplitude}:${x.shoreMeanderFrequency}:${x.headlandMeanderDamp}:${x.coveFrequency}`;
    P !== _t && ((_t = P), wt.clear());
    const w = new Array(f + 1);
    for (let p = 0; p < f + 1; p++) {
      const j = y + (p / u - 0.5) * n;
      w[p] = Bt(V, j, x, C, H);
    }
    const v = new Float32Array((f + 1) * (f + 1)),
      X = new Float32Array(f * f);
    for (let p = 0; p < f + 1; p++) {
      const j = a + (p / u - 0.5) * n;
      for (let D = 0; D < f + 1; D++) {
        const F = y + (D / u - 0.5) * n,
          B = qn(j, F, w[D], l, t, c, s, e, r, h, x, C),
          E = D * (f + 1) + p;
        if (((v[E] = B), p < f && D < f)) {
          const $ = D * f + p;
          X[$] = B;
        }
      }
    }
    const M = u * 4 + 4,
      d = new Float32Array(f * f * 3 + M * 3);
    for (let p = 0; p < f; p++) {
      const j = y + (p / u - 0.5) * n;
      for (let D = 0; D < f; D++) {
        const F = a + (D / u - 0.5) * n,
          B = X[p * f + D],
          E = (p * f + D) * 3;
        ((d[E] = F), (d[E + 1] = B), (d[E + 2] = j));
      }
    }
    const m = new Float32Array(f * f * 3 + M * 3),
      k = -n / u,
      Z = -n / u;
    for (let p = 0; p < f; p++)
      for (let j = 0; j < f; j++) {
        const D = p * (f + 1) + j,
          F = v[D],
          B = v[D + 1],
          E = v[D + f + 1],
          $ = ht(k, F - B, 0),
          R = ht(0, F - E, Z),
          q = Pt();
        (Dn(q, R, $), Sn(q, q));
        const T = (p * f + j) * 3;
        ((m[T] = q[0]), (m[T + 1] = q[1]), (m[T + 2] = q[2]));
      }
    const A = new Float32Array(f * f * 2 + M * 2);
    for (let p = 0; p < f; p++)
      for (let j = 0; j < f; j++) {
        const D = (p * f + j) * 2;
        ((A[D] = j / (f - 1)), (A[D + 1] = p / (f - 1)));
      }
    const W = u * u,
      S = new (W < 65535 ? Uint16Array : Uint32Array)(W * 6 + u * 4 * 6 * 4);
    for (let p = 0; p < u; p++)
      for (let j = 0; j < u; j++) {
        const D = u + 1,
          F = p * D + j,
          B = p * D + (j + 1),
          E = (p + 1) * D + j,
          $ = (p + 1) * D + (j + 1),
          R = (p * u + j) * 6;
        ((S[R] = F),
          (S[R + 1] = $),
          (S[R + 2] = B),
          (S[R + 3] = $),
          (S[R + 4] = F),
          (S[R + 5] = E));
      }
    let b = f * f,
      J = f * f;
    for (let p = 0; p < f; p++) {
      const D = 0 * f + p,
        F = D * 3;
      if (
        ((d[b * 3] = d[F + 0]),
        (d[b * 3 + 1] = d[F + 1] - 15),
        (d[b * 3 + 2] = d[F + 2]),
        (m[b * 3] = m[F + 0]),
        (m[b * 3 + 1] = m[F + 1]),
        (m[b * 3 + 2] = m[F + 2]),
        (A[b * 2] = 0 / (f - 1)),
        (A[b * 2 + 1] = p / (f - 1)),
        p < f - 1)
      ) {
        const B = D,
          E = D + 1,
          $ = b,
          R = b + 1,
          q = J * 6;
        ((S[q] = E),
          (S[q + 1] = R),
          (S[q + 2] = B),
          (S[q + 3] = $),
          (S[q + 4] = B),
          (S[q + 5] = R),
          J++);
      }
      b++;
    }
    for (let p = 0; p < f; p++) {
      const j = f - 1,
        D = j * f + p,
        F = D * 3;
      if (
        ((d[b * 3] = d[F + 0]),
        (d[b * 3 + 1] = d[F + 1] - 15),
        (d[b * 3 + 2] = d[F + 2]),
        (m[b * 3] = m[F + 0]),
        (m[b * 3 + 1] = m[F + 1]),
        (m[b * 3 + 2] = m[F + 2]),
        (A[b * 2] = j / (f - 1)),
        (A[b * 2 + 1] = p / (f - 1)),
        p < f - 1)
      ) {
        const B = D,
          E = D + 1,
          $ = b,
          R = b + 1,
          q = J * 6;
        ((S[q] = B),
          (S[q + 1] = $),
          (S[q + 2] = E),
          (S[q + 3] = R),
          (S[q + 4] = E),
          (S[q + 5] = $),
          J++);
      }
      b++;
    }
    for (let p = 0; p < f; p++) {
      const D = p * f + 0,
        F = D * 3;
      if (
        ((d[b * 3] = d[F + 0]),
        (d[b * 3 + 1] = d[F + 1] - 15),
        (d[b * 3 + 2] = d[F + 2]),
        (m[b * 3] = m[F + 0]),
        (m[b * 3 + 1] = m[F + 1]),
        (m[b * 3 + 2] = m[F + 2]),
        (A[b * 2] = p / (f - 1)),
        (A[b * 2 + 1] = 0),
        p < f - 1)
      ) {
        const B = D,
          E = D + f,
          $ = b,
          R = b + 1,
          q = J * 6;
        ((S[q] = B),
          (S[q + 1] = $),
          (S[q + 2] = E),
          (S[q + 3] = R),
          (S[q + 4] = E),
          (S[q + 5] = $),
          J++);
      }
      b++;
    }
    for (let p = 0; p < f; p++) {
      const j = f - 1,
        D = p * f + j,
        F = D * 3;
      if (
        ((d[b * 3] = d[F + 0]),
        (d[b * 3 + 1] = d[F + 1] - 15),
        (d[b * 3 + 2] = d[F + 2]),
        (m[b * 3] = m[F + 0]),
        (m[b * 3 + 1] = m[F + 1]),
        (m[b * 3 + 2] = m[F + 2]),
        (A[b * 2] = p / (f - 1)),
        (A[b * 2 + 1] = j / (f - 1)),
        p < f - 1)
      ) {
        const B = D,
          E = D + f,
          $ = b,
          R = b + 1,
          q = J * 6;
        ((S[q] = E),
          (S[q + 1] = R),
          (S[q + 2] = B),
          (S[q + 3] = $),
          (S[q + 4] = B),
          (S[q + 5] = R),
          J++);
      }
      b++;
    }
    const Y = new Float32Array(f * f * 4);
    for (let p = 0; p < f; p++)
      for (let j = 0; j < f; j++) {
        const D = (p * f + j) * 3,
          F = ht(d[D], d[D + 1], d[D + 2]),
          B = (p * f + j) * 3,
          E = ht(m[B], m[B + 1], m[B + 2]);
        if ((Math.max(0, E[1]), F[1] > 0)) {
          _.noise2D(F[0] * 0.05 + h[0][0], F[2] * 0.05 + h[0][0]);
          const q = w[p].shoreX - F[0];
          I(w[p].beachWidth + 4, w[p].beachWidth + 24, q);
        }
        const $ = (p * f + j) * 4;
        ((Y[$] = m[B]),
          (Y[$ + 1] = m[B + 1]),
          (Y[$ + 2] = m[B + 2]),
          (Y[$ + 3] = F[1]));
      }
    postMessage({
      id: i,
      positions: d,
      normals: m,
      indices: S,
      texture: Y,
      uv: A,
    });
  };
})();
