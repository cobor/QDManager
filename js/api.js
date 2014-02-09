$(document).ready(function() {

    //Human FileSizes
    function getReadableFileSizeString(fileSizeInBytes) {

        var i = -1;
        var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    }
    
    //Human date
    function getDateHuman(timestamp){
        var d = new Date(timestamp*1000);
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    //Cargar lista de archivos y la coloca en la tabla.
    function getFilelistKS1(refresh) 
    {
        //Si es una refresco comprobamos si es kas naranja o limon.
        if(refresh) {
            $("#ficheros-remotos").empty();
        }
        $.getJSON('http://api.bots.tf/gala/',function(data){
            data.forEach(function(item) {
                 $("#ficheros-remotos").append('<li class="list-group-item"><span id="filename">'+item["name"]+'</span><span id="filedate" class="badge">'+getDateHuman(item["date"])+'</span><span id="filesize" class="badge">'+getReadableFileSizeString(item["size"])+'</span></li>');
            });
        });
    }

    //Refresh KS1
    $("#refresh-ks1").click(function(){
        getFilelistKS1(true);
    });

    //Disabling Cache
    $.ajaxSetup({ cache: false });

    //Carga inicial.
    getFilelistKS1();
});





