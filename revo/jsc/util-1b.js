
function HTTPRequest(method, url, params, onSuccess) {
    var request = new XMLHttpRequest();
    var data = new FormData();

    for (let [key, value] of Object.entries(params)) {
    data.append(key,value);
    }

    request.open(method, url , true);
    
    request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
        onSuccess.call(this,this.response);
    } else {
        // post konektiĝo okazis eraro
        console.error('Eraro dum ŝargo de ' + url);       
    }
    };
    
    request.onerror = function() {
    // konekteraro
    console.error('Eraro dum konektiĝo por ' + url);
    };
    
    //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(data);  
}