/**

 @Name：layui.blog 闲言轻博客模块
 @Author：徐志文
 @License：MIT
 @Site：http://www.layui.com/template/xianyan/
    
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
    //模拟数据
    var data1 = [
            {
                "value": "1",
                "title": "李白"
            }
    , {
                "value": "2",
                "title": "杜甫"
            }
    , {
                "value": "3",
                "title": "苏轼"
            }
    , {
                "value": "4",
                "title": "李清照"
            }
    , {
                "value": "5",
                "title": "鲁迅"
            } //"disabled": true
    , {
                "value": "6",
                "title": "巴金"
            }
    , {
                "value": "7",
                "title": "冰心"
            }
    , {
                "value": "8",
                "title": "矛盾"
            }
    , {
                "value": "9",
                "title": "贤心"
            }
  ],
        data2 = [
//            {
    //                "value": 1,
    //                "title": "类型1"
    //            }
    //    , {
    //                "value": 2,
    //                "title": "类型2"
    //            }
    //    , {
    //                "value": 3,
    //                "title": "类型3"
    //            }
    //    , {
    //                "value": 4,
    //                "title": "类型4"
    //            } //, "disabled": true
    //    , {
    //                "value": 5,
    //                "title": "类型5"
    //            }
    //    , {
    //                "value": 6,
    //                "title": "类型6"
    //            }
    //    , {
    //                "value": 7,
    //                "title": "类型7"
    //            }
    //    , {
    //                "value": 8,
    //                "title": "类型8"
    //            }
    //    , {
    //                "value": 9,
    //                "title": "类型9"
    //            } //, "disabled": true
    //    , {
    //                "value": 10,
    //                "title": "类型10"
    //            }
  ];

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
        //初始右侧数据
        transfer.render({
            elem: '#test2',
            data: data2,
            title: ['未关注话题', '已关注话题'] //自定义标题
                ,
            value: haveTypeList,
            width: 200,
            onchange: function (obj, index) {
                var url = "/addtype";
                var msg = "关注";
                if (index != 0) {
                    /*取消话题*/
                    url = "/deltype";
                    msg = "取消关注";
                }
                var t_id = obj[0].value;
                $.ajax({
                    url: url,
                    async: false,
                    type: "POST",
                    data: {
                        "typelist": t_id,
                    },
                    dataType: "json",
                    success: function (data) {
                        var json = eval(data);
                        if (json) {
                            layer.alert(msg + "成功");
                        } else {
                            layer.alert(msg + "失败，请刷新页面尝试");
                        }
                    }
                });
                //                var arr = ['左边', '右边'];
                // layer.alert('来自 <strong>'+ arr[index] + '</strong> 的数据：'+ JSON.stringify(obj)); //获得被穿梭时的数据

            }
        })
    });



    //输出test接口
    exports('comment', {});
});
