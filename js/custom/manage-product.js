var productModal = $("#productModal");
$(function () {

    //JSON data by API call
    $.get(jobListApiUrl, function (response) {
        if (response) {
            var table = '';
            $.each(response, function (index, product) {
                table += '<tr data-id="' + product.company + '" data-name="' + product.profile + '" data-unit="' + product.salary + '" data-price="' + product.experience + '">' +
                    '<td>' + product.company + '</td>' +
                    '<td>' + product.profile + '</td>' +
                    '<td>' + product.salary + '</td>' +
                    '<td>' + product.experience + '</td></tr>';
            });
            $("table").find('tbody').empty().html(table);
        }
    });
});

// var editModal = $("#editModal");
// $(function () {

//     //JSON data by API call
//     $.get(productEditApiUrl, function (response) {
//         if (response) {
//             var table = '';
//             $.each(response, function (index, product) {
//                 table += '<tr data-id="' + product.product_id + '" data-name="' + product.name + '" data-unit="' + product.uom_id + '" data-price="' + product.price_per_unit + '">' +
//                     '<td>' + product.name + '</td>' +
//                     '<td>' + product.uom_name + '</td>' +
//                     '<td>' + product.price_per_unit + '</td>' +
//                     '<td><span class="btn btn-xs btn-danger delete-product">Delete</span></td>' +
//                     '<td><button type="button" class="btn btn-sm btn-primary pull-right" data-toggle="modal" data-target="#editModal">Edit</button></td></tr>';
//             });
//             $("table").find('tbody').empty().html(table);
//         }
//     });
// });

// Save Product
$("#saveProduct").on("click", function () {
    var data = $("#productForm").serializeArray();
    var requestPayload = {
        company: null,
        profile: null,
        salary: null,
        experience: null
    };
    for (var i = 0; i < data.length; ++i) {
        var element = data[i];
        switch (element.name) {
            case 'company':
                requestPayload.company = element.value;
                break;
            case 'profile':
                requestPayload.profile = element.value;
                break;
            case 'salary':
                requestPayload.salary = element.value;
                break;
            case 'experience':
                requestPayload.experience = element.value;
                break;
        }
    }
    callApi("POST", jobSaveApiUrl, {
        'data': JSON.stringify(requestPayload)
    });
});

$("#editProduct").on("click", function () {
    var tr = $(this).closest('tr');
    var data = $("#editForm").serializeArray();
    var requestPayload = {
        product_name: null,
        uom_id: null,
        price_per_unit: null,
        product_id: tr.data('id')
    };
    for (var i = 0; i < data.length; ++i) {
        var element = data[i];
        switch (element.name) {
            case 'name':
                requestPayload.product_name = element.value;
                break;
            case 'uoms':
                requestPayload.uom_id = element.value;
                break;
            case 'price':
                requestPayload.price_per_unit = element.value;
                break;
        }
    }
    callApi("POST", productEditApiUrl, {
        'data': JSON.stringify(requestPayload)
    });
});

$(document).on("click", ".delete-product", function () {
    var tr = $(this).closest('tr');
    var data = {
        product_id: tr.data('id')
    };
    var isDelete = confirm("Are you sure to delete " + tr.data('name') + " item?");
    if (isDelete) {
        callApi("POST", productDeleteApiUrl, data);
    }
});

// productModal.on('hide.bs.modal', function () {
//     $("#id").val('0');
//     $("#name, #unit, #price").val('');
//     productModal.find('.modal-title').text('Add New Product');
// });

// productModal.on('show.bs.modal', function () {
//     //JSON data by API call
//     $.get(uomListApiUrl, function (response) {
//         if (response) {
//             var options = '<option value="">--Select--</option>';
//             $.each(response, function (index, uom) {
//                 options += '<option value="' + uom.uom_id + '">' + uom.uom_name + '</option>';
//             });
//             $("#uoms").empty().html(options);
//         }
//     });
// });

// editModal.on('hide.bs.modal', function () {
//     $("#id").val('0');
//     $("#name, #unit, #price").val('');
//     editModal.find('.modal-title').text('Edit Product');
// });

// editModal.on('show.bs.modal', function () {
//     //JSON data by API call
//     $.get(uomListApiUrl, function (response) {
//         if (response) {
//             var options = '<option value="">--Select--</option>';
//             $.each(response, function (index, uom) {
//                 options += '<option value="' + uom.uom_id + '">' + uom.uom_name + '</option>';
//             });
//             $("#edituoms").empty().html(options);
//         }
//     });
// });