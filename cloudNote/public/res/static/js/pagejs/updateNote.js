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

    //表单start


    //创建一个编辑器
    // var editIndex = layedit.build('LAY_demo_editor');

    //自定义验证规则
    form.verify({
        title: function (value) {
            if (value.length < 5) {
                return '标题至少得5个字符啊';
            }
        },
        pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
        content: function (value) {
            layedit.sync(editIndex);
        }
    });


    //监听选方法没用到
    /*form.on('radio(nature)', function (data) {
        if (data.elem.id == 'privateElem') {
            console.log("私有动作");
            //            $('.type-list').removeAttr("checked");
            $('.type-list').attr("disabled", "");
            form.render();
        } else {
            console.log("公开动作");
            $('.type-list').removeAttr("disabled");
            form.render();
        }
        return false;
    });*/

    //修改回调方法
    function updateSuccFunction(tt) {
        var json = eval(tt); //数组
        if (json.result) {
            layer.alert("修改成功");
        } else {
            if (json.outcomeCode == -1) {
                layer.alert("修改失败");
                window.location.href = '/view/register.html';
            } else {
                layer.alert("修改失败");
            }
        }
    }

    //监听提交
    form.on('submit(demo1)', function (data) {
        var title = data.field.title;
        var desc = data.field.desc;
        var t_id = data.field.t_id;
        var content = data.field.content;
        var id = data.field.id;
        if (data.field.nature == 1) {
            $.ajax({
                url: "/updatetitle",
                async: false,
                type: "POST",
                data: {
                    "title": title,
                    "desc": desc,
                    "content": content,
                    "id": id,
                },
                dataType: "json",
                success: updateSuccFunction
            });
        } else {
            $.ajax({
                url: "url",
                async: false,
                type: "POST",
                data: {
                    "title": title,
                    "desc": desc,
                    "content": content,
                    "t_id": t_id,
                    "id": id,
                },
                dataType: "json",
                success: updateSuccFunction
            });
        }
        //        layer.alert(JSON.stringify(data.field), {
        //            title: '最终的提交信息'
        //        })
        return false;
    });

    //判断字符是否为空的方法
    function isEmpty(obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    }

    //获取cookie方法
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

    //私密笔记加载回调方法
    function pubsuccFunction(tt) {
        var json = eval(tt); //数组
        if (json.outcomeCode == 1) {
            layer.alert("加载完成");
            var note = json.result;
            form.val('updateForm', {
                "title": note[2] // "name": "value"
                    ,
                "desc": note[3],
                "nature": 1,
                "id": note[0],
                "t_id": 2,
                "content": note[4]
            });
            $('#publicElem').attr("disabled", "");
            form.render();
        } else {
            if (json.outcomeCode == -1) {
                layer.alert("加载失败");
                window.location.href = '/view/register.html';
            } else {
                layer.alert("加载失败");
            }
        }
    }


    //公开笔记加载回调方法（需修改）
    function prisuccFunction(tt) {
        var json = eval(tt); //数组
        if (json.outcomeCode == 1) {
            layer.alert("加载完成");
            var note = json.result;
            form.val('updateForm', {
                "title": note[2] // "name": "value"
                    ,
                "desc": note[3],
                "nature": 2,
                "id": note[0],
                "t_id": 2,
                "content": note[4]
            });
            //开放点击事件
            $('.type-list').removeAttr("disabled");
            form.render();
        } else {
            if (json.outcomeCode == -1) {
                layer.alert("加载失败");
                window.location.href = '/view/register.html';
            } else {
                layer.alert("加载失败");
            }
        }
    }

    //获取get参数
    function getParam(paramName) {
        paramValue = "", isFound = !1;
        if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
            arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
            while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
        }
        return paramValue == "" && (paramValue = null), paramValue
    }

    //网页刷新时执行方法
    $(function () {
        var t_id = getParam("t_id");
        var n_id = getParam("n_id");
        var userName = getCookie('userName');
        //        userName = "test1";
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
                success: pubsuccFunction
            });
        } else {
            $.ajax({
                url: "/getNote",
                async: false,
                type: "POST",
                data: {
                    "id": n_id,
                },
                dataType: "json",
                success: prisuccFunction
            });

        }
    })


    //输出details接口
    exports('updateNote', {});
});
