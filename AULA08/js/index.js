$.support.cors = true;

$(document).ready(
    function(){
        GETUsers();
        $("#ready").append("Página carregada");    
        var $input_cpf = $("#input_cpf");
        $input_cpf.mask('000.000.000-00', {reverse: true});
        $("#ready").fadeOut(5000);
    }
)

$('#bt_cadastrar').click(
    function(){
        POSTUsers();
    }
)

function POSTUsers(){
    var User = {
        name : document.getElementById('input_nome').value,
        cpf : document.getElementById('input_cpf').value,
        occupation : document.getElementById('input_cargo').value
    };    

    if (User.name == '') {
        alert('Favor, informe seu nome')
    } else {
        $.ajax({
            type:'POST',
            url:'http://localhost:9000/users',    
            contentType:'application/json',
            data: JSON.stringify(User),
            success: function(data){
                $("#result").append("Cadastrado com sucesso!");       
                $("#result").css("background-color", "yellow");
                console.log(data);
                
                $('#tabela_user').append(
                    '<tr> ' +
                    '    <td>0</td>'+
                    '    <td>'+data.guuid+'</td>'+
                    '    <td>'+data.name+'</td>'+
                    '    <td>'+data.cpf+'</td>'+
                    '    <td>'+data.occupation+'</td>'+
                    '</tr>'
                )                       
            },
            error: function(data){
                alert('Falha ao Incluir!');
                console.log(data);
            }
        })
    }    
}

function GETUsers(){
    $.ajax({
        type:'GET',
        url:'http://localhost:9000/users',
        success: function(data){
            $.each(data, function(i, user){
                $('#tabela_user').append(
                    '<tr> ' +
                    '    <td>'+i+'</td>'+
                    '    <td>'+user.guuid+'</td>'+
                    '    <td>'+user.name+'</td>'+
                    '    <td>'+user.cpf+'</td>'+
                    '    <td>'+user.occupation+'</td>'+
                    '</tr>'
                )                    
            })            
        },
        error: function(data){
            console.log(data);
        }
    })
}