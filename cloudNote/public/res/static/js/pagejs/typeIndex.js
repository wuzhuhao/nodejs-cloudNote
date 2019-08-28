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
    var data2 = [
//        {
    //            "value": 1,
    //            "title": "类型1"
    //            }
    //    , {
    //            "value": 2,
    //            "title": "类型2"
    //            }
    //    , {
    //            "value": 3,
    //            "title": "类型3"
    //            }
    //    , {
    //            "value": 4,
    //            "title": "类型4"
    //            } //, "disabled": true
    //    , {
    //            "value": 5,
    //            "title": "类型5"
    //            }
    //    , {
    //            "value": 6,
    //            "title": "类型6"
    //            }
    //    , {
    //            "value": 7,
    //            "title": "类型7"
    //            }
    //    , {
    //            "value": 8,
    //            "title": "类型8"
    //            }
    //    , {
    //            "value": 9,
    //            "title": "类型9"
    //            } //, "disabled": true
    //    , {
    //            "value": 10,
    //            "title": "类型10"
    //            }
  ];
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
    form.on('radio(type_id)', function (data) {
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
                url: "url",
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

    function succFunction(tt) {
        //             $("#list").html('');

        //eval将字符串转成对象数组
        //var json = { "id": "10086", "uname": "zhangsan", "email": "zhangsan@qq.com" };
        //json = eval(json);
        //alert("===json:id=" + json.id + ",uname=" + json.uname + ",email=" + json.email);
        var json = eval(tt); //数组

        $.each(json.noteList, function (index, item) {
            var itemElement = $($(".item")[index]);
            itemElement.css("display", "");
            //修改值
            itemElement.attr("data-id", item[0]);
            itemElement.find("h3 > a").first().text(item[2]);
            itemElement.find("h5 > span").first().text(item[1]);
            itemElement.find("p").first().text(item[4]);
            console.log($(".item")[index]);
        });
        for (var i = json.noteList.length; i < 3; i++) {
            var itemElement = $($(".item")[i]);
            itemElement.css("display", "none");
        }
        console.log(json.noteList);
        console.log(json.page);
        console.log(json.totalpage);
        console.log(json.totalnum);
    }


    function initRender(count) {
        /*index分页器  start*/
        laypage.render({
            elem: 'indexPage' //注意，这里的 test1 是 ID，不用加 # 号
                ,
            count: count //数据总数，从服务端得到
                ,
            limit: 3,
            groups: 2,
            theme: '#1e9fff',
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                var page = obj.curr;
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                //                console.log(obj.limit); //得到每页显示的条数
                //首次不执行
                if (!first) {
                    $.ajax({
                        url: "/Publicpaging",
                        async: false,
                        type: "POST",
                        data: {
                            "page": page,
                        },
                        dataType: "json",
                        success: succFunction
                        //            function (data) {
                        //                alert(data)
                        //                return data;
                        //            }
                    });
                }
            }
        });
        /*index分页器  end*/
    }

    function initsuccFunction(tt) {
        //             $("#list").html('');

        //eval将字符串转成对象数组
        //var json = { "id": "10086", "uname": "zhangsan", "email": "zhangsan@qq.com" };
        //json = eval(json);
        //alert("===json:id=" + json.id + ",uname=" + json.uname + ",email=" + json.email);
        for (var i = 0; i < 3; i++) {
            var itemElement = $($(".item")[i]);
            itemElement.css("display", "none");
        }
        var json = eval(tt); //数组
        $.each(json.noteList, function (index, item) {
            var itemElement = $($(".item")[index]);
            itemElement.css("display", "");
            //修改值
            itemElement.attr("data-id", item[0]);
            itemElement.find("h3 > a").first().text(item[2]);
            itemElement.find("h3 > a").first().attr("href", "/view/details.html?n_id=" + item[0]);
            itemElement.find("h5 > span").first().text(item[1]);
            itemElement.find("p").first().text(item[4]);
            itemElement.find("div.comment > a").first().attr("href", "/view/updateNote.html?n_id=" + item[0]);
            console.log($(".item")[index]);
            $(itemElement.find("div.comment > a")[1]).attr("data-id", item[0]);
        });
        for (var i = json.noteList.length; i < 3; i++) {
            var itemElement = $($(".item")[i]);
            itemElement.css("display", "none");
        }
        initRender(json.totalnum);
        console.log(json.noteList);
        console.log(json.page);
        console.log(json.totalpage);
        console.log(json.totalnum);
    }
    $(function () {
        var userName = getCookie('userName');
        //        userName = "test1";
        var list;
        if (isEmpty(userName)) {
            window.location.href = "/view/register.html";
            return;
        }
        //进行ajax获取数据
        var haveTypeList = [];
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
                    data2.push({
                        "value": i + 1,
                        "title": json[i]
                    });
                }

            }
        });
        $.ajax({
            url: "/Publicpaging",
            async: false,
            type: "POST",
            data: {
                "t_id": 1,
            },
            dataType: "json",
            success: initsuccFunction
        });
        $.ajax({
            url: "/gettypelist",
            async: false,
            type: "POST",
            data: {

            },
            dataType: "json",
            success: function (data) {
                var json = eval(data); //数组
                if (json.outcomeCode == 1) {
                    haveTypeList = json.result;
                } else {
                    if (json.outcomeCode == -1) {
                        window.location.href = '/view/register.html';
                    } else {
                        layer.alert("获取列表失败，请重新刷新尝试");
                    }
                }
            }
        });
        for (var i = 0; i < data2.length; i++) {
            for (var j = 0; j < haveTypeList.length; j++) {
                if (data2[i].value == haveTypeList[j]) {

                    var html = '<input filter="type_id" type="radio" name="t_id" value="' + haveTypeList[j] + '" title="' + data2[i].title + '" checked="">'
                    $("#type_form").find("div ").first().find("div").first().append(html);
                    break;
                }
            }

        }
        form.render();
    })


    //输出details接口
    exports('typeIndex', {});
});
