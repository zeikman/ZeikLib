/**
 * libParam.js (19 June, 2014)
 * @namespace libParam
 * @version 1.0.0
 */
// # Browser Cookie
//      http://www.w3schools.com/js/js_cookies.asp
// # Query String
//      http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
// # MDN Document.cookie
//      https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
window.libParam = (function() {
    var libParam = {
        /* --------------- Native Functions --------------- */

        /**
         * Transform query string to Array
         * @memberof libParam
         * @private
         * @param {String} prmstr - parameter string
         */
        _transformCookiesToAssocArray: function(prmstr) {
            var cookies = {};
            var prmarr = prmstr.split(';');
            for (var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].trim().split('=');
                cookies[tmparr[0]] = tmparr[1];
            }
            return cookies;
        },

        /**
         * Transform query string to Array
         * @memberof libParam
         * @private
         * @param {String} prmstr - parameter string
         */
        _transformQueryStringToAssocArray: function(prmstr) {
            var params = {};
            var prmarr = prmstr.split('&');
            for (var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split('=');
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        },

        /* --------------- Cookie --------------- */

        /**
         * Set cookie
         * @memberof libParam
         * @instance
         * @param {String} name - cookie name
         * @param {*} value - cookie value
         * @param {String} path - cookie URL path
         * @param {String} exdays - cookie expire date
         * @param {String} domain - cookie domain
         * @param {String} secure - cookie security
         */
        setCookie: function(name, value, path, exdays, domain, secure) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = 'expires=' + d.toGMTString();
            if (name && value) {
                document.cookie = name + '=' + value +
                                  // ((path) ? '; path=' + path : '; path=/') +
                                  ((path) ? '; path=' + path : '') +
                                  ((exdays) ? '; expires=' + expires : '') +
                                  ((domain) ? '; domain=' + domain : '') +
                                  ((secure) ? '; secure=' + secure : '');
                return name+': '+value;
            } else {
                return '';
            }

            /*if (!path)
                path = '/';

            if (!exdays) {
                document.cookie = name+'='+value+'; path='+path;
                return name+': '+value;
            } else {
                document.cookie = name+'='+value+'; path='+path+'; '+expires;
                return name+': '+value;
            }*/
        },

        /**
         * Get cookie
         * @memberof libParam
         * @instance
         * @param {String} name - cookie
         */
        getCookie: function(name) {
            name = name + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) != (-1)) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        },

        /**
         * Get all cookies
         * @memberof libParam
         * @instance
         */
        getAllCookies: function() {
            return libParam_transformCookiesToAssocArray(document.cookie);
        },

        /**
         * Check cookie existence
         * @memberof libParam
         * @instance
         * @param {String} name - cookie name
         */
        checkCookie: function(name) {
            var tempCookie = libParamgetCookie(name);
            if (tempCookie !== '') { return true; }
            return false;
        },

        /**
         * Delete cookie
         * @memberof libParam
         * @instance
         * @param {String} name - cookie name
         * @param {String} path - cookie URL path
         */
        delCookie: function(name, path) {
            var tempCookie = libParamgetCookie(name);
            if (tempCookie !== '') {
                if (!path) {
                    // document.cookie = name+'=; path=/; expires='+new Date(0).toUTCString();
                    document.cookie = name+'=; expires='+new Date(0).toUTCString();
                    return true;
                } else {
                    document.cookie = name+'=; path='+path+'; expires='+new Date(0).toUTCString();
                    return true;
                }
            } else {
                return false;
            }
        },

        /**
         * Delete All cookies
         * @instance
         * @memberof libParam
         * @param {String} path - cookie URL path
         */
        delAllCookies: function(path) {
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (!path) {
                    // document.cookie = c.substring(0, c.indexOf('='))+'=; path=/; expires='+new Date(0).toUTCString();
                    document.cookie = c.substring(0, c.indexOf('='))+'=; expires='+new Date(0).toUTCString();
                } else {
                    document.cookie = c.substring(0, c.indexOf('='))+'=; path='+path+'; expires='+new Date(0).toUTCString();
                }
            }
            return true;
        },

        /* --------------- Qeury String --------------- */

        /**
         * Convert object into query string
         * @memberof libParam
         * @instance
         * @param {Object} qsObj - Query string object
         */
        objectToQueryString: function(qsObj) {
            var qsString = '';
            $.each(qsObj, function(key, value) {
                qsString = qsString + key + '=' + encodeURIComponent(value) + '&';
            });
            return qsString.substring(0, qsString.length - 1);
        },

        /**
         * Append query string
         * @memberof libParam
         * @instance
         * @param {String} url - Uniform Resource Locator
         * @param {Object} params - query string in object form, { key:value } pair
         */
        insertQueryString: function(url, params) {
            // url += '?';
            // $.each(params, function(key, value) {
            //     url = url + key + '=' + value + '&';
            // });
            // return url.substring(0, url.length - 1);

            // CHANGED: Check index of question mark
            if (url.indexOf('?') > -1) {
                // NOTE: Merge params
                var qs = libParam.getSearchParameters(url);
                url = url.split('?')[0];
                Object.assign(qs, params);
                params = qs;
            }
            return url + '?' + libParam.objectToQueryString(params);
        },

        /**
         * Set query string
         * @memberof libParam
         * @instance
         * @param {String} key - query string key
         * @param {*} value - query string value
         * @param {String} url - Uniform Resource Locator to be append with query string
         */
        updateQueryString: function(key, value, url) {
            if (!url) { url = window.location.href; }
            var re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi');
            if (re.test(url)) {
                if (key === '') {
                    return url;
                } else {
                    if (typeof value !== 'undefined' && value !== null) {
                        return url.replace(re, '$1' + key + '=' + value + '$2$3');
                    } else {
                        var hash = url.split('#');
                        url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
                        if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
                            url += '#' + hash[1];
                        }
                        return url;
                    }
                }
            } else {
                if (key === '') {
                    return url;
                } else {
                    if (typeof value !== 'undefined' && value !== null) {
                        var separator = url.indexOf('?') !== -1 ? '&' : '?',
                        hash_ = url.split('#');
                        url = hash_[0] + separator + key + '=' + value;
                        if (typeof hash_[1] !== 'undefined' && hash_[1] !== null) {
                            url += '#' + hash_[1];
                        }
                        return url;
                    } else {
                        return url;
                    }
                }
            }
        },

        /**
         * Get query string
         * @memberof libParam
         * @instance
         * @param {String} [url] - Uniform Resource Locator which the query string will be extracted. If URL not
         * provided, current browser URL will be used instead
         */
        getSearchParameters: function(url) {
            var prmstr = (typeof url == 'string' && url) ?
                url.split('?')[1] :
                window.location.search.substr(1);
            return prmstr !== null && prmstr !== '' ? libParam._transformQueryStringToAssocArray(prmstr) : {};
        }
    };
    return libParam;
}());
