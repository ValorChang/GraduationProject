/**
 * Created by Fanpeng on 2017/2/6.
 */
$(function () {

    // 查询状态
    var query_flag = true;

    // 页面调整大小后自动适配
    $(window).on("resize", function () {
        $('#dataTable').jqxGrid({
            height: jqxUtil.getGridHeight(30, 30, 30)
        });
    });

    sidebar.callback = function () {
        $('#dataTable').jqxGrid("render");
    };

    // 此处的search方法是预留
    var search = function () {

        // 获取选中行的boundIndex
        var rowIndex = -1;

        // 获取选中行记录的id
        var rowId = 0;

        // 此处是为了多次刷新准备的
        if (!query_flag) {
            return;
        }
        query_flag = false;

        // 设置数据源
        var source = {
            url: "./queryClasses.do",
            datatype: "json",
            type: "post",
            id: 'class_id',
            datafields: [
                {name: 'class_id', type: 'String'},
                {name: 'class_name', type: 'String'},
            ],
        };

        /*data-blind*/
        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#dataTable").jqxGrid({
            width: "100%",
            height: jqxUtil.getGridHeight(30, 30, 30),
            source: dataAdapter,
            theme: jqx_default_theme,
            altrows: true,
            filterable: true,
            showfilterrow: true,
            columns: [
                {text: '班级编号', dataField: 'class_id', align: "center", cellsAlign: 'center', width: "50%"},
                {text: '班级名称', dataField: 'class_name', align: "center", cellsAlign: 'center', width: "50%"},
            ],
        }).on("bindingcomplete", function () {
            query_flag = true;
        });
    };

    search();
})
