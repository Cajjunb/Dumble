// JAVA SCRIPT DOCUMENT



// function valida_nome() {

//     var z = document.getElementById("nome").value.trim();
//     var OK = document.getElementById("ok_nome_symbl");
//     var bool = false;
//     var field = document.getElementById("nome");
//     // Tira excesso de espaço !
//     z = z.replace(/(^\s*)|(\s*$)/gi, "");
//     z = z.replace(/[ ]{2,}/gi, " ");
//     z = z.replace(/\n /, "\n");
//     if ((z.length > 0) && (z.length <= 100)) {
//         field.value = z;
//         bool = true;
//     } else {
//         bool = false;
//     }
//     if (bool) {
//         //OK.style.display = "inline";
//         return true;
//     } else {
//         //OK.style.display = "none";
//         alert("nome invalido!");
//         return false;
//     }

// }


function validateName() {
    var nome = document.getElementById("nome");
    var error = "";
    
    if ((nome.value == "") || (nome.value == null)) {
        nome.style.background = 'Red';
        error = "Campo nome não pode ficar vazio";
    } else if ((nome.value.length <= 4) || (nome.value.length >= 20)){
        nome.style.background = 'Red';
        error = "Tamanho de nome invalido.";
    } else {
        nome.style.background = 'Green';
    }
    return error;
}


// function valida_email() {

//     var email = document.getElementById("email").value;
//     var arroba = email.indexOf("@");
//     var ponto = email.lastIndexOf(".");
//     var OK = document.getElementById("ok_email_symbl");
//     var ER = document.getElementById("er_email_symbl");


//     if (arroba < 1 || ponto < arroba + 2 || ponto + 2 >= email.length || email.indexOf(" ") != -1) {
//         //ER.style.display = "inline";
//         //OK.style.display = "none";
//         alert("Entrada incorreta");
//         return false;
//     }
//     else {
//         //ER.style.display = "none";
//         //OK.style.display = "inline";
//         return true;
//     }
//     // subscreve resultados caso usuário apague os dados do campo.
// }

function validateEmail(){
    var email = document.getElementById("email");
    var arroba = email.value.indexOf("@");
    var ponto = email.value.lastIndexOf(".");
    var error = "";
    if (arroba < 1 || ponto < arroba + 2 || ponto + 2 >= email.value.length || email.value.indexOf(" ") != -1) {
        email.style.background = 'Red';
        error = "Email invalido.";
    } else{
        email.style.background = 'Green';
    }
    return error;

}

function valida_senha() {
    var senha1 = document.getElementById("senha");
    var senha2 = document.getElementById("senha2");
    //var error = document.getElementById("error_pw");
    //var message = document.getElementById("message_error");
    //var erro = document.getElementById("er_senha_symbl");
    //var ok = document.getElementById("ok_senha_symbl");
    //var erro2 = document.getElementById("er_senha2_symbl");
    //var ok2 = document.getElementById("ok_senha2_symbl");
    if ((senha1.value.length > 0 && senha1.value.length < 6) || (senha2.value.length > 0 && senha2.value.length < 6)) {
        // error.style.display = "inline-block";
        // message.innerHTML = "A senha deve conter, pelo menos, 6 caracteres!";
        senha1.style.background = 'Red'; 
        if (senha1.value.length < 6 && senha1.value.length != 0) {
            //erro.style.display = "inline";
            //ok.style.display = "none";
            senha1.style.background = 'Red';       
        }
        if (senha2.value.length < 6 && senha2.value.length != 0) {
            //erro2.style.display = "inline";
            //ok2.style.display = "none";
            senha2.style.background = 'Red';
            
        }
       
    } else {
        //error.style.display = "none";
        //message.innerHTML = "";
        // erro.style.display = "none";
        // erro2.style.display = "none";
        // ok.style.display = "none";
        // ok2.style.display = "none";
    }
    if ((senha1.value.length >= 6 && senha1.value.length < 20) && (senha2.value.length >= 6 && senha2.value.length < 20)) {
        if (senha1.value == senha2.value) {
            // erro.style.display = "none";
            // erro2.style.display = "none";
            // ok.style.display = "inline";
            // ok2.style.display = "inline";
            // error.style.display = "none";
            //message.innerHTML = "";
            senha1.style.background = 'Green';
            senha2.style.background = 'Green';
            
        } else {
            // erro.style.display = "inline";
            // erro2.style.display = "inline";
            // ok.style.display = "none";
            // ok2.style.display = "none";
            // error.style.display = "inline-block";
            senha2.style.background = 'Red';
            //message.innerHTML = "As senhas não são iguais!";
            
        }
    }
}



function valida_imagem() {

    var erro = document.getElementById("error_img");
    var messagem = document.getElementById("img_error");
    var arquivo = document.getElementById('file').files[0];



    if (arquivo.size > 2000000) {

        console.log(arquivo.type);

        erro.style.display = "block";

        messagem.innerHTML = "O tamanho máximo permitido é de 2 MB";

    } else {
        if (arquivo.type != "image/png" && arquivo.type != "image/jpeg" && arquivo.type != "image/bmp" && arquivo.type != "image/jpg") {
            erro.style.display = "block";
            messagem.innerHTML = "Só são aceitos as extensões: .bmp, .jpg, .jpeg e .png";

        } else {

            erro.style.display = "none";

            messagem.innerHTML = "";

        }

    }

}



function valida_ncamisa() {

    var erro = document.getElementById("er_ncamisa_symbl");

    var ok = document.getElementById("ok_ncamisa_symbl");

    var content = (document.getElementById("n_camisa").value).toLowerCase();

    var isnum = /^\d+$/.test(content);

    var letters = /^[a-z\u00C0-\u00ff]+$/.test(content);



    if (content.length == 0) {

        ok.style.display = "none";

        erro.style.display = "none";

    } else {

        if ((isnum == true || letters == true ) && content.length > 0 && content.length <= 3) {

            ok.style.display = "inline";

            erro.style.display = "none";

        } else {

            ok.style.display = "none";

            erro.style.display = "inline";

        }

    }

}



function valida_nsapato() {

    var erro = document.getElementById("er_nsapato_symbl");

    var ok = document.getElementById("ok_nsapato_symbl");

    var content = (document.getElementById("n_sapato").value).toLowerCase();

    var isnum = /^\d+$/.test(content);

    var letters = /^[a-z\u00C0-\u00ff]+$/.test(content);





    if (content.length == 0) {

        ok.style.display = "none";

        erro.style.display = "none";

    } else {

        if ((isnum == true || letters == true ) && content.length > 0 && content.length <= 3) {

            ok.style.display = "inline";

            erro.style.display = "none";

        } else {

            ok.style.display = "none";

            erro.style.display = "inline";

        }

    }

}



function valida_ncalca() {

    var erro = document.getElementById("er_ncalca_symbl");

    var ok = document.getElementById("ok_ncalca_symbl");

    var content = (document.getElementById("n_calca").value).toLowerCase();

    var isnum = /^\d+$/.test(content);

    var letters = /^[a-z\u00C0-\u00ff]+$/.test(content);



    if (content.length == 0) {

        ok.style.display = "none";

        erro.style.display = "none";

    } else {

        if ((isnum == true || letters == true ) && content.length > 0 && content.length <= 3) {

            ok.style.display = "inline";

            erro.style.display = "none";

        } else {

            ok.style.display = "none";

            erro.style.display = "inline";

        }

    }

}



function valida_ncamisaso() {

    var erro = document.getElementById("er_ncamisaso_symbl");

    var ok = document.getElementById("ok_ncamisaso_symbl");

    var content = (document.getElementById("n_camisaso").value).toLowerCase();

    var isnum = /^\d+$/.test(content);

    var letters = /^[a-z\u00C0-\u00ff]+$/.test(content);



    if (content.length == 0) {

        ok.style.display = "none";

        erro.style.display = "none";

    } else {

        if ((isnum == true || letters == true ) && content.length > 0 && content.length <= 3) {

            ok.style.display = "inline";

            erro.style.display = "none";

        } else {

            ok.style.display = "none";

            erro.style.display = "inline";

        }

    }

}



function valida_modelo() {

    var nome = document.getElementById('Nome');

    var texto = document.getElementById('comentario_modelo');

    var status = 0;



    if (nome.value.length == 0 || nome.value.length > 100) {

        status += 1;



    }



    if (texto.value.length == 0 || texto.value.length > 200) {

        status += 3;

    }



    switch (status) {

        case 0:

            swal({title: "Sucesso!", text: "Seu modelo foi cadastrado!", type: "success", timer: 6000});

            return true;

        case 1:

            swal("Erro!", "O nome não está correto!", "error");

            return false;

        case 3:

            swal("Erro!", "A descrição do modelo não está correta!", "error");

            return false;

        case 4:

            swal("Erro!", "O nome e descrição do modelo devem ser preenchidos!", "error");

            return false;

    }

}



// Função javascript que valida a data passada, caso seja uma data invalida o valor retornado é a data valida mais próxima

// Formato aceito YYYY-mm-dd

function valida_data(domElem){

    console.log(domElem.val());

    var data = domElem.val();

    data = data.split('-');

    var dia = parseInt(data[0]);

    var mes = parseInt(data[1]);

    var ano = parseInt(data[2]);

    if(mes > 12){

        mes = 12;

    }

    if((mes % 2 == 1 )&&(mes != 9)&&( dia > 31)) // MAIORIA DOS MESES COM 31 DIAS

        dia  =  31;

    if((mes == 2  )&&(ano % 400 == 0)&&( dia > 28))       // FEVEREIRO

        dia = 28;

    else if((mes == 2  )&&(ano % 400 != 0)&&(ano %  4 == 0)&&( dia > 29) )   // FEVEREIRO EM ANOS BISSEXTOS

        dia = 29;

    if((mes == 4  )&&( dia > 30))       // ABRIL

        dia = 30;

    if((mes == 6  )&&( dia > 30))       // JUNHO

        dia = 30;

    if((mes == 8  )&&( dia > 31))       // AGOSTO

        dia = 31;

    if((mes == 9  )&&( dia > 30))       // SETEMBRO

        dia = 30;

    if((mes == 10 )&&( dia > 31))       // OUTUBRO

        dia = 31;

    if((mes == 11  )&&( dia > 30))      // NOVEMBRO

        dia = 30;

    if((mes == 12  )&&( dia > 31))      // DEZEMBRO

        dia = 31;

    data = dia+'-'+mes+'-'+ano;

    return data;



}