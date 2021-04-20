(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function handleTransactionDeletion(){
  $('.delete-transaction').on('click', function(){
    var label = $(this).attr('data-label');

    let data = {label: label};
    console.log(data);

    fetch("/transaction/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => {
      window.location.replace("/dashboard");
    });
  });
}

function handleBucketDeletion(){
  $('.delete-bucket').on('click', function(){
    var label = $(this).attr('data-label');

    let data = {label: label};

    fetch("/bucket/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => {
      window.location.replace("/dashboard");
    });
  });
}

function handleTransactionAssign(){
  $('.badge-transaction-assign').on('click', function(){
    var b_label = $(this).attr('data-bucketLabel');
    var t_label = $(this).attr('data-transactionLabel');

    var data = {b_label: b_label, t_label: t_label};
    fetch("/transaction/assign", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    }).then(res => {
      window.location.replace("/dashboard");
    })
  });
}

$(document).ready(function(){
  if($(".alert-danger")[0]){
    $('#createBucketModal').modal('show');
  }

  handleTransactionDeletion();

  handleBucketDeletion();

  handleTransactionAssign();
});
