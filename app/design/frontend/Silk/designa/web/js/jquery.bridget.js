define(['jquery'], function (jQuery) {
    'use strict';

    var arraySlice = Array.prototype.slice;
    var console = window.console;
    var logError = typeof console == 'undefined' ? function () {} : function (message) { console.error(message); };

    function bridget(namespace, PluginClass, $) {
        $ = $ || jQuery || window.jQuery;
        if (!$) {
            return;
        }

        if (!PluginClass.prototype.option) {
            PluginClass.prototype.option = function (opts) {
                if (!$.isPlainObject(opts)) {
                    return;
                }
                this.options = $.extend(true, this.options, opts);
            };
        }

        $.fn[namespace] = function (arg0) {
            if (typeof arg0 == 'string') {
                var args = arraySlice.call(arguments, 1);
                return methodCall(this, arg0, args);
            }

            plainCall(this, arg0);
            return this;
        };

        function methodCall($elems, methodName, args) {
            var returnValue;
            var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

            $elems.each(function (i, elem) {
                var instance = $.data(elem, namespace);
                if (!instance) {
                    logError(namespace + ' not initialized. Cannot call methods, i.e. ' +
                        pluginMethodStr);
                    return;
                }

                var method = instance[methodName];
                if (!method || methodName.charAt(0) == '_') {
                    logError(pluginMethodStr + ' is not a valid method');
                    return;
                }

                var value = method.apply(instance, args);
                returnValue = returnValue === undefined ? value : returnValue;
            });

            return returnValue !== undefined ? returnValue : $elems;
        }

        function plainCall($elems, options) {
            $elems.each(function (i, elem) {
                var instance = $.data(elem, namespace);
                if (instance) {
                    instance.option(options);
                    instance._init();
                } else {
                    instance = new PluginClass(elem, options);
                    $.data(elem, namespace, instance);
                }
            });
        }

        updateJQuery($);
    }

    function updateJQuery($) {
        if (!$ || ($ && $.bridget)) {
            return;
        }
        $.bridget = bridget;
    }

    updateJQuery(jQuery || window.jQuery);

    return bridget;
});