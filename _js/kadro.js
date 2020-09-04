const revo_url = "reta-vortaro.de";


// preparu la paĝon: evento-reagoj...
when_ready(function() { 
    console.log("kadro, when_ready...")
    restore_preferences();
    enkadrigu();
    /*
    load_page("main","titolo.html");
    load_page("nav","../inx/_eo.html");
    */
    document.body // getElementById("navigado")
        .addEventListener("click",navigate);

    window
        .addEventListener('popstate', navigate_history);

    /*
    $('#navigado').click(load_inx);
    $('#s_artikolo').click(load_art);
    $("#sercho_frm").submit(serchu);
    $.ajaxSetup({
        converters: {
            "* text": window.String, 
            "text html": true, 
            "text json": jQuery.parseJSON, 
            // ne funkcias kun Voko-XML eble pro manko de DTD dum analizo:
            // "text xml": jQuery.parseXML
            "text xml": window.String
        }
    });
    */
});

// se la artikolo ŝargiĝis aparte de la kadro ni aldonu la kadron
function enkadrigu() {

    // preparu la ĉefan parton de la paĝo
    if (document.getElementsByName("main").length == 0) {
        var main = make_element("main",{});
        main.append(...document.body.children);
        document.body.appendChild(main);
    } else {
        load_page("main","titolo.html");
    }

    // preparu la navigo-parton de la paĝo
    if (document.getElementsByName("nav").length == 0) {
        var nav = make_element("nav",{});
        var div = make_element("div",{id: "navigado"});
        nav.appendChild(div);
        document.body.appendChild(nav);
    }

    // rekreu la indekson laŭ la historio aŭ ŝargu la centran eo-indekson
    if (history.state && history.state.inx) {
        console.log(history.state);
        // ni bezonas unue revo-1b.js:
        load_page("nav","/revo/inx/"+history.state.inx.substring(2)+".html",false);
    } else {
        load_page("nav","../inx/_eo.html");
    }
}

// vd. https://wiki.selfhtml.org/wiki/HTML/Tutorials/Navigation/Dropdown-Men%C3%BC
function nav_toggle() {
    var menu = document.getElementById("navigado");
    /*
    if (menu.style.zIndex >- 1) {
        menu.style.zIndex = -1;
        menu.style.font = "0/0 serif";
    } else {
        menu.style.zIndex = 100;
        menu.style.font = "";   
        menu.style.width = 300;                 
    }*/
    if (menu.style.display == "") {
        menu.style.display = "block"
    } else {
        menu.style.display = ""
    }
}

/*
Navigante ni devas distingi plurajn kazojn:

1. int: temas pri interna referenco (href="#...")
2. ext: temas pri alekstera referenco (href="http(s)://iu-retejo...")
3. nav: temas pri referenco al alia indekso, t.e. inx: target="", art: target="indekso"    
4. main: temas pri referenco al artikolo/ĉefpaĝo, t.e. inx: target="precipa", art: target=""    
    
*/

function ref_target(a_el) {
    var href = a_el.getAttribute("href");
    var trg = a_el.getAttribute("target");   

    if (href.startsWith('#')) {
        return "int";
    } else if (
        href.startsWith('http://') && href.substring('http://'.length-1,revo_url.length) != revo_url
        || href.startsWith('https://') && href.substring('https://'.length-1,revo_url.length) != revo_url
        ) {
        return "ext";
    } else if (trg == "precipa") {
        return "main"
    } else if (trg == "indekso") {
        return "nav"
    } else if (!trg) {
        var cnt = a_el.closest("nav,main");
        if (cnt) return cnt.tagName.toLowerCase(); 
    };
}

/* En la kazoj ref_target = main | nav, ni adaptos la originajn URL-ojn por Ajax:
1. ../xxx -> /revo/xxx
2. aliaj relativaj (t.e. ne ^/ aŭ ^http) -> /revo/art/xxxx | /revo/inx/xxx
3. /cgi-bin/vokomail.pl?art=xxx -> /revo/dlg/redaktilo.html?art=xxx
4. aliaj absolutaj (t.e. ^/ aŭ http) ni lasu
*/

function normalize_href(target, href) {
    // ĉu estas fidinde uzi "target" tie ĉi aŭ ĉu ni uzu "source"?
    const prefix = { main: "art/", nav: "inx/"};
    if (href.startsWith('../')) {
        return '/revo/' + href.substr(3);
    } else if (href[0] != '/' && ! href.startsWith('http')) {
        return '/revo/' + prefix[target] + href;
    } else if (href.startsWith('/cgi-bin/vokomail.pl')) {
        var query = href.substring(href.search('art='));
        return '/revo/dlg/redaktilo.html?' + query
    } else {
        return href;
    }
}     

function load_page(trg,url,push_state=true) {
    HTTPRequest('GET', url, {},
        function(data) {
            // Success!
            var parser = new DOMParser();
            var doc = parser.parseFromString(data,"text/html");
            var nav = document.getElementById("navigado");
            var main = document.querySelector("main");

            if (trg == "nav") {
                nav.textContent= '';
                nav.append(doc.querySelector("table"));
            } else if (trg == "main") {
                var body = doc.body;
                main.textContent = '';
                main.append(...body.children);
                main.setAttribute("id","w:"+url);
                artikolo.preparu_art();
            }                    

            if (push_state)
                history.pushState({
                    inx: nav.firstElementChild.id,
                    art: main.id
                    },
                    null,
                    main.id.substring(2));
            // var article = doc.getElementsByTagName("article");
            // if (article) {
            // rigardo.textContent = '';
            // rigardo.append(...article);  
            
            ///preparu_art();                    
    });
}

function navigate(event) {
    var el = event.target.closest("a");
    if(el) {
        var href = el.getAttribute("href");
        var target = ref_target(el);
    
        if (target != "int") {
            event.preventDefault();
            if (target == "ext") {
                window.open(href);
            } else if (target == "main") {
                load_page(target,normalize_href(target,href));
                /*
                $('#s_artikolo').load(href, //+' body>*'                            
                    preparu_art
                );   
                */  
            } else if (target == "nav") {                   
                load_page(target,normalize_href(target,href));
                /*
                $('#navigado').load(href+' table');
                */
            }
        }
    }
}   

function navigate_history(event) {
    var state = event.state;

    console.log(state);

    // FARENDA: ni komparu kun la nuna stato antaŭ decidi, ĉu parton
    // ni devos renovigi!
    load_page("nav","/revo/inx/"+state.inx.substring(2)+".html",false);
    load_page("main",state.art.substring(2),false);
}            

function load_xml(art) {
    /*
    $("body").css("cursor", "progress");
    $.get('/revo/xml/'+art+'.xml','text')
        .done(function(data) {
                $("#rxmltxt").val(data);
        })
        .fail (function(xhr, textStatus, errorThrown) {
            console.error(xhr.status + " " + xhr.statusText);                
            if (xhr.status == 404) {
                var msg = "Pardonu, la dosiero ne troviĝis sur la servilo: ";
                alert( msg );
            } else {
                var msg = "Pardonu, okazis netandita eraro: ";
                alert( msg + xhr.status + " " + xhr.statusText + xhr.responseText);
            }
        })
        .always(function() {
            $("body").css("cursor", "default");
        })
        */
}


function serchu(event) {
    event.preventDefault();

    /*
    
    $.getJSON("/cgi-bin/sercxu-json.pl",
        { 
            sercxata: $("#serchteksto").val() 
        })
    .done(function(data) {
        //alert( "Data Loaded: " + data );
        for (tr of data) {
            cosole.log(tr);
        }
    });
    */
}

function restore_preferences() {
    redaktilo.restore_preferences();
    artikolo.restore_preferences();
}

