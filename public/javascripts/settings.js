var ajaxSettings = {
  url: 'http://localhost:3000/api',
  dataType: 'json',
  contentType: 'application/json'  
}

tinymce.init({
  selector: 'textarea',
  height: 400,
  menubar: false,
  plugins: [
    'autolink lists link image',
    'visualblocks code',
    'media table contextmenu paste code'
  ],
  toolbar: 'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
  style_formats: [
    {
      title: 'Headers',
      items: [
        { title: 'Big Header', format: 'h2'},
        { title: 'Normal Header', format: 'h3'},
        { title: 'Small Header', format: 'h4'}
      ]
    }
  ]
});
