/**

 @Name：layui 云笔记详情模块
 @Author：wuzhuhao
 @License：MIT
    用来进行ajax请求和进行网页渲染
 */
layui.define(['element', 'form', 'laypage', 'jquery', 'laytpl', 'transfer', 'layer', 'util'], function (exports) {
    var element = layui.element,
        form = layui.form,
        laypage = layui.laypage,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        layedit = layui.layedit;
    var transfer = layui.transfer,
        layer = layui.layer,
        util = layui.util;
    var t_id;
    //判断字符是否为空的方法
    function isEmpty(obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    }

    function getCookie(c_name) {
        if (document.cookie.length > 0) { //判断cookie是否存在
            //获取cookie名称加=的索引值
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) { //说明这个cookie存在
                //获取cookie名称对应值的开始索引值
                c_start = c_start + c_name.length + 1
                //从c_start位置开始找第一个分号的索引值，也就是cookie名称对应值的结束索引值
                c_end = document.cookie.indexOf(";", c_start)
                //如果找不到，说明是cookie名称对应值的结束索引值就是cookie的长度
                if (c_end == -1) c_end = document.cookie.length
                //unescape() 函数可对通过 escape() 编码的字符串进行解码
                //获取cookie名称对应的值，并返回
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return "" //不存在返回空字符串
    }

    function getParam(paramName) {
        paramValue = "", isFound = !1;
        if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
            arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
            while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
        }
        return paramValue == "" && (paramValue = null), paramValue
    }

    function succFunction(tt) {
        var json = eval(tt); //数组
        if (json.outcomeCode == 1) {
            layer.alert("加载完成123");
            var json = eval(tt); //数组
            var note = json.result;
            var itemElement = $($(".item")[0]);
            itemElement.css("display", "");
            //修改值
            itemElement.attr("data-id", note[0]);
            itemElement.find("div.count >span").first().attr("data-id", note[0]);
            itemElement.find("h3 > a").first().text(note[2]);
            itemElement.find("h5 > span").first().text(note[1]);
            $(itemElement.find("h5 > span")[1]).text(note[3]);

            itemElement.find("div.count > apan").first().find("a").attr("href", "/view/updateNote.html?n_id=" + note[0]);
            itemElement.find("p").first().text(note[4]);
            console.log($(".item")[0]);
            console.log($($(".item")[0]));
        } else {
            if (json.outcomeCode == -1) {
                layer.alert("加载失败");
                window.location.href = '/view/register.html';
            } else {
                layer.alert("加载失败");
            }
        }
    }

    $(function () {
        //获取参数t_id和n_id
        t_id = getParam("t_id");
        var n_id = getParam("n_id");
        var userName = getCookie('userName');
        if (isEmpty(userName)) {
            window.location.href = "/view/register.html";
            return;
        }
        if (isEmpty(t_id)) {
            $.ajax({
                url: "/getNote",
                async: false,
                type: "POST",
                data: {
                    "id": n_id,
                },
                dataType: "json",
                success: succFunction
            });
        } else {

        }

    });

    $(function () {
        $(".del").on('click', function () {
            layer.confirm('确认删除笔记吗？', {
                btn: ['确定', '取消'] //按钮
            }, function (index) {
                layer.msg('点击了确定', {
                    icon: 1
                });
                // layer.msg(index);
                layer.close();
                layer.close(index);
            }, function (index) {
                layer.msg('点击了取消', {
                    icon: 2
                });
                // layer.msg(index);
                layer.close();
                layer.close(index);
            });
        });
        $(".update").on('click', function () {
            var id = $(this).attr("data-id")
            if (isEmpty(t_id)) {
                t_id = "";
            }
            window.location.href = '/view/updateNote.html?n_id=' + id + "&t_id=" + t_id;
        });
    });


    //输出details接口
    exports('details', {});
});
