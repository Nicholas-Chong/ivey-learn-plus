$(function () {
    
    $('button.deleteRoomBooking').off().on('click', function (e) {

        var resourceBookingId = $(this).attr('data-rb');        
         var studentDetailId = $('#mlid').val();
         var ulNode = $(this).closest('ul');
                           
         var dialog = $("#dialogConfirmDeleteRoomBooking").dialog({
             closeText:'',
             modal: true,
             resizable: false,
             width: 350,
             buttons: {
                Cancel: {
                    text: 'Cancel',
                    'class': 'Button',
                    click: function () {
                        dialog.dialog("close");
                    }
                },
                "Delete": {
                    text: 'Delete',
                    priority: 'primary',
                    "class": 'Button Button--primary', 
                    click: function () {
                        dialog.dialog("close");

                        $(document.body).showLoading();
                        ResetErrorMessage();

                        $.ajax({
                            async: true,  //This is needed to avoid a Safari only issue
                            type: "POST",
                            beforeSend: function (request) {
                                request.setRequestHeader("token", $('#token').val());
                                request.setRequestHeader("SessionValues", $("#hdnSessionValues").val());
                            },
                            url: '../MyBookings/DeleteRoomBooking?resourceBookingId=' + resourceBookingId + '&studentDetailId=' + studentDetailId,
                            success: function (data) {
                                $(ulNode).html(data);
                            },
                            error: function (thrownError) {
                                DisplayErrorMessage(thrownError);
                            },
                            complete: function () {                                
                                $(document.body).hideLoading();
                            }
                        });                        
                    }
                }
             },
             close: function () {
                $(document.body).hideLoading();
             }
         });

         return false;
     });

    function ResetErrorMessage() {
        $("#errorMsg").html("");
        $("#errorContainer").hide();
    }
	
    function DisplayErrorMessage(thrownError) {
        $("#errorMsg").html(thrownError);
        $("#errorContainer").show();
    }
});