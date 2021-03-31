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
    console.log(data);

    fetch("/bucket/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => {
      window.location.replace("/dashboard");
    });
  });
}

$(document).ready(function(){
  if($(".alert-danger")[0]){
    $('#createBucketModal').modal('show');
  }

  handleTransactionDeletion();

  handleBucketDeletion();
});
