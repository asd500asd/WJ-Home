cqrbdp.initDatePicker = function() {
    var todaystr = cqrbdp.toDayString();
    // console.log(todaystr);
    $('.datepicker-container input').val(cqrbdp.toDayString('.'));
    /*选择日期*/
    $(".datepicker-container").datetimepicker({
        language: 'zh-CN',
        format: "yyyy.mm.dd",
        weekStart: 1,
        todayBtn: true,
        autoclose: true,
        todayHighlight: true,
        startView: 2,
        minView: 2,
        startDate: "2016-01-01",
        endDate: todaystr,
        initialDate: $('.datepicker-container input').val(),
        pickerPosition: "top-right",
        forceParse: 0
    });


}
