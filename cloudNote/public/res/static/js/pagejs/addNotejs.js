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


    // form.on('radio(nature)', function(data){
    //   layer.alert(data);
    // });
    form.on('radio(nature)', function (data) {
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
        // console.log(data.elem); //得到radio原始DOM对象
        // console.log(data.value); //被点击的radio的value值
        return false;
    });

    function succFunction(tt) {
        var json = eval(tt); //数组
        if (json.result) {
            layer.alert("添加成功");
        } else {
            if (json.outcomeCode == -1) {
                layer.alert("添加失败");
                window.location.href = '/view/register.html';
            } else {
                layer.alert("添加失败");
            }
        }
    }

    //监听提交
    form.on('submit(demo1)', function (data) {
        var title = data.field.title;
        var desc = data.field.desc;
        var t_id = data.field.t_id;
        var content = data.field.content;
        if (data.field.nature == 1) {
            //            layer.alert("选中了私有" + title + desc + t_id + content);
            $.ajax({
                url: "/addN",
                async: false,
                type: "POST",
                data: {
                    "title": title,
                    "desc": desc,
                    "content": content,
                },
                dataType: "json",
                success: succFunction
            });
        } else {
            $.ajax({
                url: "/addPublicNote",
                async: false,
                type: "POST",
                data: {
                    "title": title,
                    "desc": desc,
                    "content": content,
                    "t_id": t_id,
                },
                dataType: "json",
                success: succFunction
            });
        }

        //        if (data.nature == 1) {
        //            layer.alert("选中了私有");
        //        }
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

    $(function () {
        var userName = getCookie('userName');
        //        userName = "test1";
        if (isEmpty(userName)) {
            window.location.href = "/view/register.html";
            return;
        }
        $.ajax({
            url: "/getTypeValues",
            async: false,
            type: "POST",
            data: {

            },
            dataType: "json",
            success: function (data) {
                var json = eval(data); //数组
                for (var i = 0; i < json.length; i++) {
                    var html = '<input type="radio" name="t_id" value="' + (i + 1) + '" title="' + json[i] + '" disabled="" class="type-list" checked="">';
                    if (i != 0) {
                        html = '<input type="radio" name="t_id" value="' + (i + 1) + '" title="' + json[i] + '" disabled="" class="type-list" >';
                    }
                    $("#form_type").append(html);
                    //                    data2.push({
                    //                        "value": i + 1,
                    //                        "title": json[i]
                    //                    });
                }


            }
        });
        form.render();
        //进行ajax获取数据
        //        $.ajax({
        //            url: "/paging",
        //            async: false,
        //            type: "POST",
        //            data: {
        //                "page": 1,
        //            },
        //            dataType: "json",
        //            success: initsuccFunction
        //        });
    })


    //输出details接口
    exports('addNotejs', {});
});
