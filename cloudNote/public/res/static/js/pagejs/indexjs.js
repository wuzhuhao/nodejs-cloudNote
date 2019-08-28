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
                        url: "/paging",
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
        if (isEmpty(userName)) {
            window.location.href = "/view/register.html";
            return;
        }
        //进行ajax获取数据
        //        var result = 
        $.ajax({
            url: "/paging",
            async: false,
            type: "POST",
            data: {
                "page": 1,
            },
            dataType: "json",
            success: initsuccFunction
        });
        //        console.log(result);
    })


    $(function () {
        $(".del").on('click', function () {
            var id = $(this).attr("data-id");
            layer.confirm('确认删除笔记吗？', {
                btn: ['确定', '取消'] //按钮
            }, function (index) {
                $.ajax({
                    url: "/deltitle",
                    async: false,
                    type: "POST",
                    data: {
                        "id": id,
                    },
                    dataType: "json",
                    success: function (data) {
                        var json = eval(data);
                        if (json.result) {
                            layer.alert("删除成功");
                        } else {
                            if (json.outcomeCode == -1) {
                                layer.alert("删除失败");
                                //                                window.location.href = '/view/register.html';
                            } else {
                                layer.alert("删除失败");
                            }
                        }
                    }
                });
                //                layer.msg('点击了确定', {
                //                    icon: 1
                //                });
                // layer.msg(index);
                layer.close();
                layer.close(index);
            }, function (index) {
                //                layer.msg('点击了取消', {
                //                    icon: 2
                //                });
                // layer.msg(index);
                layer.close();
                layer.close(index);
            });
        });
    });

    //end 评论的特效


    // start点赞图标变身
    $('#LAY-msg-box').on('click', '.info-img', function () {
        $(this).addClass('layblog-this');
    })


    // end点赞图标变身



    //输出details接口
    exports('indexjs', {});
});
