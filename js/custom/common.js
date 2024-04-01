// Define your api here
var jobListApiUrl = 'http://127.0.0.1:5003/getJobs';
var jobSaveApiUrl = 'http://127.0.0.1:5003/insertJob';

function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function (msg) {
        window.location.reload();
    });
}