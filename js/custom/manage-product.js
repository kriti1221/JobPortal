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