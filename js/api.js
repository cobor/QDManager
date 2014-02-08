//Cargar lista de archivos y la coloca en la tabla.
function getFilelistKS1() 
{
    $.getJSON('http://api.bots.tf/gala/',function(data){
            console.log(data[0]);
    });
}

//Disabling Cache
$.ajaxSetup({ cache: false });


//Carga inicial.
getFilelistKS1();



