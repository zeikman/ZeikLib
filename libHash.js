
window.libHash = (function() {
    var hexcase = 0;
    var b64pad = "";
    var chrsz = 8;

    var libHash = {
        safe_add: function(x, y) {
            var lsw = (x & 65535) + (y & 65535);
            var msw = (x >> 16 ) + (y >> 16 ) + (lsw >> 16);
            return (msw << 16) | (lsw & 65535);
        },

        rol: function(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        },

        str2binb: function(str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;

            for (var i = 0; i < str.length * chrsz; i += chrsz) {
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
            }
            return bin;
        },

        binb2hex: function(binarray) {
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";

            for (var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 15) +
                    hex_tab.charAt((binarray[ i >> 2] >> ((3 - i % 4) * 8)) & 15);
            }
            return str;
        },

        binb2b64: function(binarray) {
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 + /";
            var str = "";

            for (var i = 0; i < binarray.length * 4; i += 3) {
                var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 255) << 16) |
                    (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 255) << 8) |
                    ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 255);

                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > binarray.length * 32) {
                        str += b64pad;
                    } else {
                        str += tab.charAt((triplet >> 6 * (3 - j)) & 63);
                    }
                }
            }
            return str;
        },

        binb2str: function(bin) {
            var str = "";
            var mask = (1 << chrsz) - 1;

            for (var i = 0; i < bin.length * 32; i += chrsz) {
                str += String.fromCharCode((bin[i >> 5] >>> (32 - chrsz - i % 32)) & mask);
            }
            return str;
        },

        hex_sha1: function(s) {
            return libHash.binb2hex(libHash.core_sha1(libHash.str2binb(s), s.length * chrsz));
        },

        b64_sha1: function(s) {
            return libHash.binb2b64(libHash.core_sha1(libHash.str2binb(s) , s.length * chrsz));
        },

        str_sha1: function(s) {
            return libHash.binb2str(libHash.core_sha1(libHash.str2binb(s), s.length * chrsz));
        },

        hex_hmac_sha1: function(key, data) {
            return libHash.binb2hex(libHash.core_hmac_sha1(key, data));
        },

        b64_hmac_sha1: function(key, data) {
            return libHash.binb2b64(libHash.core_hmac_sha1(key, data));
        },

        str_hmac_sha1: function(key, data) {
            return libHash.binb2str(libHash.core_hmac_sha1(key, data));
        },

        sha1_ft: function(t, b, c, d) {
            if (t < 20) {
                return (b & c) | ((~b) & d);
            }
            if (t < 40) {
                return b ^ c ^ d;
            }
            if (t < 60) {
                return (b & c) | (b & d) | (c & d);
            }
            return b ^ c ^ d;
        },

        sha1_kt: function(t) {
            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
        },

        core_sha1: function(x, len) {
            x[len >> 5] |= 128 << (24 - len % 32);
            x[((len + 64 >> 9) << 4) + 15] = len;

            var w = Array(80);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            var e = -1009589776;

            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                var olde = e;

                for (var j = 0; j < 80; j++) {
                    if (j < 16) {
                        w[j] = x[i + j];
                    } else {
                        w[j] = libHash.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                    }
                    var t = libHash.safe_add(libHash.safe_add(libHash.rol(a, 5), libHash.sha1_ft(j, b, c, d)), libHash.safe_add(libHash.safe_add(e, w[j]), libHash.sha1_kt(j)));
                    e = d;
                    d = c;
                    c = libHash.rol(b, 30);
                    b = a;
                    a = t;
                }

                a = libHash.safe_add(a, olda);
                b = libHash.safe_add(b, oldb);
                c = libHash.safe_add(c, oldc);
                d = libHash.safe_add(d, oldd);
                e = libHash.safe_add(e, olde);
            }
            return Array(a, b, c, d, e);
        },

        core_hmac_sha1: function(key, data) {
            var bkey = str2binb(key);

            if (bkey.length > 16) {
                bkey = libHash.core_sha1(bkey, key.length * chrsz);
            }

            var ipad = Array(16),
                opad = Array(16);

            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 909522486;
                opad[i] = bkey[i] ^ 1549556828;
            }

            var hash = libHash.core_sha1(ipad.concat(libHash.str2binb(data)), 512 + data.length * chrsz);
            return libHash.core_sha1(opad.concat(hash), 512 + 160);
        },
    };
    return libHash;
}());
