/*

*/
var Portal = {
    
    xmlhttp : null,
    
    getInfos: function(element){
        var table = element.getElementsByTagName("table")[0];
        var p = table.getElementsByTagName("p")[2];
        return p.innerHTML;
    },
    
    login : function(login, senha, success, error){
        this.xmlhttp = new XMLHttpRequest();
        this.xmlhttp.open("POST","https://portaldoaluno.ifba.edu.br/aluno.asp",false);
        this.xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        this.xmlhttp.send("login_username=" + login + "&secretkey=" + senha + "&js_autodetect_results=0&just_logged_in=1");
        this.xmlhttp.onreadystatechange = this.request(success, error);
    },  
    
    
    request: function(success, error){
        if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200){
            var html = document.createElement("div"); 
            html.innerHTML = this.xmlhttp.responseText;
            if(html.innerText.indexOf("Senha inválida") != -1){
                if(error != null)
                    error();
            }else{
                data = {
                    infos : Portal.getInfos(html)
                }

                if(success != null)
                    success(data);
            }
        }
    }
}