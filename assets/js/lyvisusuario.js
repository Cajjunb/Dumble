function check_file2(el){
    var name_file = $(el).parent().find("input").val();
    name_file = name_file.split(".");
    var extension = name_file.pop();
    switch(extension){
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'bmp':
            $(el).submit();
            break;
        default:
            swal("Extensão Incorreta!", "A foto só pode ser: .jpg, .jpeg, .png ou .bmp!", "error");
            break;
    }
}