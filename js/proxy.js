(function() {

    var _isIE = (
        navigator.appName == "Microsoft Internet Explorer"
    );

    var _removeNode = _isIE ? function() {
        var d;
        return function(n) {
            if(n && n.tagName != 'BODY') {
                d = d || document.createElement('div');
                d.appendChild(n);
                d.innerHTML = '';
            }
        }
    }() : function(n) {
        if(n && n.parentNode && n.tagName != 'BODY') {
            n.parentNode.removeChild(n);
        }
    };


/* [ Request by window.name ]
 * ****************************************************************************
   借助 Window.name 实现 Js 的跨域访问。
   1、 url 向外传值， callback 处理返回结果。
   2、 返回页面中 JS 对 window.name 赋值。

   返回页
   <script language="JavaScript">
       window.name = ...  // 支持 JSON 字符串，可达~2MB
   </script>

   若需同时进行多个请求，回调函数应是不同的函数实例。
   iframe 的自由载入形成了异步机制。
*/

    wnRequest = {
        _doc: document,
        _proxyUrl: 'proxy.html'
    };

    wnRequest.send = function( url, callback )
    {
        if(! url || typeof url !== 'string') {
            return;
        }
        url += (url.indexOf('?') > 0 ? '&' : '?') + 'windowname=get';

        var frame = this._doc.createElement('iframe');
        frame._state = 0;
        this._doc.body.appendChild(frame);
        frame.style.display = 'none';

        (function( el, type, fn ) {
            if (_isIE) {
                el.attachEvent('on' + type, fn);
            } else {
                el.addEventListener(type, fn, false);
            }
        })(frame, 'load', function() {
            if(frame._state == 1) {
                _getData(frame, callback);
            } else if(frame._state == 0) {
                frame._state = 1;
                //frame.contentWindow.location = wnRequest._proxyUrl;
                frame.contentWindow.location.replace(wnRequest._proxyUrl);
            }
        });
        frame.src = url;
    };

    //
    // 设置异域 Js 可访问的本地数据，客户端直接站间转递数据
    // 注：
    // 即浏览器直接将数据转递给另一个域的窗口，数据不上网。
    // 返回页代码：
    // <script type="text/javascript">
    //     if (window.name) {
    //         //... 处理 name 值
    //         window.name = null;
    //     }
    //     // 升为顶级窗口，完成数据转递
    //     try {
    //         top.location.hostname;
    //         if (top.location.hostname != window.location.hostname) {
    //             top.location.href =window.location.href;
    //         }
    //     } catch(e) {
    //         top.location.href = window.location.href;
    //     }
    // </script>
    //
    //
    wnRequest.setname = function( name, url ) {
        if(! url || typeof url !== 'string') {
            return;
        }
        url += (url.indexOf('?') > 0 ? '&' : '?') + 'windowname=loc';

        var frame = this._doc.createElement('iframe');
        frame._count = 0;
        this._doc.body.appendChild(frame);
        frame.style.display = 'none';
        if (_isIE) {
            frame.name = name;
        } else {
            frame.contentWindow.name = name;
        }
        frame.src = url;
    };

    //
    // 私用辅助
    //
    var _clear = function(frame) {
        try {
            frame.contentWindow.document.write('');
            frame.contentWindow.close();
            _removeNode(frame);
        } catch(e) {}
    }

    var _getData = function(frame, callback) {
        try {
            var da = frame.contentWindow.name;
        } catch(e) {}
        _clear(frame);
        if(callback && typeof callback === 'function') {
            callback(da);
        }
    }

})();
