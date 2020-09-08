//_js/artikolo.js
const js_sojlo = 3; //30+3;
const sec_art = "s_artikolo";
const lingvoj_xml = "../cfg/lingvoj.xml";

//const KashEvento = new Event("kashu", {bubbles: true});
const MalkashEvento = new Event("malkashu", {bubbles: true});
const KomutEvento = new Event("komutu", {bubbles: true});

window.addEventListener("hashchange", function() {
    //console.log("hashchange: "+window.location.hash )
    //event.stopPropagation();
    //var id = this.getAttribute("href").split('#')[1];
    var id = getHashParts().mrk; // el: util.js
    if (id) {
        var trg = document.getElementById(id);

        // this.console.log("ni malkaŝu "+id);    
        if (trg && trg.tagName == "H2") {
            // ĉe derivaĵoj, la kaŝita div venos post h2
            var sec = trg.closest("section"); //parentElement;    
            var trg = sec.querySelector("div.kasxebla");
        }
    
        //showContainingDiv(trg);
        //triggerEvent(trg,"malkashu");
        if (trg)
            trg.dispatchEvent(MalkashEvento);
        else
            this.console.error("ne troviĝis saltomarko '"+id+'"')    
    }
});

// difinu ĉion sub nomprefikso "artikolo"

var artikolo = function() {
    var pref_lng = [];
    var pref_dat = Date.now();

    when_doc_ready(function() {
        console.log("artikolo.when_doc_ready...:" + location.href);
        restore_preferences();   
        preparu_art();
        //enkadrigu();
    });

    function preparu_art() {
        // evitu preparon, se ni troviĝas en la redaktilo kaj
        // la artikolo ne ĉeestas!
        if (! document.getElementById(sec_art)) return;

        if (window.location.protocol != 'file:') {
            top.document.title='Reta Vortaro ['
            + document.getElementById(sec_art).getElementsByTagName("H1")[0].textContent.trim()
            + ']';
        }
        /* aktivigu nur por longaj artikoloj... */
        var d = document.getElementsByClassName("kasxebla");
        //if (d.length > js_sojlo) {
            preparu_kashu_sekciojn();
            preparu_malkashu_fontojn();
            preparu_maletendu_sekciojn();
            kashu_malkashu_butonoj();
            piedlinio_preferoj();
            //interna_navigado();
            //etendu_ekzemplojn();   
        //}
    }

    /* kaŝu sekciojn de derivaĵoj, se la artikolo estas tro longa
    kaj provizu ilin per ebleco remalkaŝi */
    function preparu_kashu_sekciojn() {
        var d = document.getElementsByClassName("kasxebla");

        // derivaĵo aŭ alia elemento celita kaj do montrenda
        var h = getHashParts().mrk; 
        var trg = h? document.getElementById(h) : null;
        var d_vid = trg? trg.closest("section.drv, section.fontoj").firstElementChild.id : null;

        var multaj = d.length > js_sojlo;
        var first = true;

        for (var el of d) {

            // forigu titolon "administraj notoj", se la sekcio estas malplena
            if (el.closest(".admin") && el.childElementCount == 0) {
                el.closest(".admin").textContent= '';
                continue;
            }
            
            // provizore ne bezonata: el.addEventListener("kashu", function(event) { kashu_drv(event.currentTarget) });
            el.addEventListener("malkashu", function(event) { 
                malkashu_drv(event.currentTarget);
                event.stopPropagation();
            });
            el.addEventListener("komutu", function(event) { 
                kashu_malkashu_drv(event.currentTarget);
                event.stopPropagation();
            });           

            var h2 = getPrevH2(el);
            if (h2) {

                h2.classList.add("kashilo");
                // ni kaŝas derivaĵon sub la sekvaj kondiĉoj:
                // 1. estas multaj derivaĵoj en la artikolo (vd. js_sojlo)
                // 2a. ne temas pri derivaĵo, al kiu ni celis rekte (per marko #, povas esti drv, snc, ekz, fnt)
                // 2b. aŭ ĝi ne estas la unua derivaĵo en la artikolo, kondiĉe ke ni ne celas al specifa derivaĵo 
                if ( multaj && (h && h2.id != d_vid) || (!h && !first) ) { 
                    // \u25be
                    h2.appendChild(make_icon_button("i_mkash",
                        null,"malkaŝu derivaĵon"));
                    el.classList.add("kasxita") 
                } else {
                    // "\u25b2"
                    h2.appendChild(make_icon_button("i_kash",
                        null,"kaŝu derivaĵon"));
                }                    
                first = false;

                // difinu eventojn
                h2.addEventListener("click", function(event) { 
                    //kashu_malkashu_drv(event);
                    var sec = event.target.closest("section"); //parentElement;    
                    var div = sec.querySelector("div.kasxebla");
                    div.dispatchEvent(KomutEvento);
                    //triggerEvent(div,"komutu");
                });
            }
        }    
    }

    function preparu_malkashu_fontojn() {
        var d = document.getElementsByClassName("fontoj kasxita");
        for (var el of d) {
            el.addEventListener("malkashu", function(event) { 
                event.currentTarget.classList.remove("kasxita");
                event.stopPropagation();
            });
        }
    }

    /* kelkajn sekciojn kiel ekzemploj, tradukoj, rimarkoj ni maletendas, poo eviti troan amplekson.
    Ili ricevas eblecon por reetendi ilin per "pli..." */
    function preparu_maletendu_sekciojn() {
        var d = document.getElementsByClassName("etendebla");
    //    var sojlo = 3+2; // ekde tri drv + trd + fnt, au du drv kaj adm
    // if (d.length > sojlo) { // ĝis tri derivaĵoj (+tradukoj, fontoj), ne kaŝu la alineojn
        for (var el of d) {
            if (el.classList.contains("tradukoj")) {
                maletendu_trd(el);
            }
        }
    }

    /** kaŝu ĉiujn derivaĵojn **/
    function kashu_chiujn_drv() {
        for (var el of document.getElementsByClassName("kasxebla")) 
            if (el.parentElement.classList.contains("drv")
            || el.parentElement.classList.contains("notoj")) 
                kashu_drv(el);
    }

    /** malkaŝu ĉiujn derivaĵojn **/
    function malkashu_chiujn_drv() {
        for (var el of document.getElementsByClassName("kasxebla")) 
            if (el.parentElement.classList.contains("drv")
            || el.parentElement.classList.contains("notoj"))  
                malkashu_drv(el);
    }

    function kashu_drv(el) {
        el.classList.add("kasxita");
        var h2 = getPrevH2(el);
        if (h2) {
            var kash = h2.querySelector(".i_kash");
            if (kash) kash.classList.replace("i_kash","i_mkash");
        }
    }

    function malkashu_drv(el) {
        // console.log("malkaŝu drv");
        el.classList.remove("kasxita");
        var h2 = getPrevH2(el);
        if (h2) {
            var mkash = h2.querySelector(".i_mkash");
            if (mkash) mkash.classList.replace("i_mkash","i_kash");
        }
    }

    function kashu_malkashu_drv(el) {
        //event.stopPropagation();
        //var div = section.getElementsByClassName("kasxebla")[0];

        var sec = el.closest("section"); //parentElement;    
        var div = sec.querySelector("div.kasxebla");

        if (div.classList.contains("kasxita")) 
            malkashu_drv(div)
        else 
            kashu_drv(div);
    }

    function maletendu_trd(element) {
        //var nav_lng = navigator.languages || [navigator.language];
        var eo;
        var maletendita = false;
        var serch_lng = getHashParts().lng;

        for (var id of element.children) {
            var id_lng = id.getAttribute("lang");
            // la tradukoj estas paroj de ea lingvo-nomo kaj nacilingvaj tradukoj
            if (id_lng) {
                if ( id_lng == "eo") {
                    eo = id;
                } else if ( id_lng != serch_lng && pref_lng.indexOf(id_lng) < 0 ) {
                    eo.classList.add("kasxita");
                    id.classList.add("kasxita");
                    maletendita = true;
                } else {
                    // tio necesas, se ni adaptas la preferojn
                    // por vidi pli da tradukoj!
                    eo.classList.remove("kasxita");
                    id.classList.remove("kasxita");
                }
            }
        }
        // aldonu pli...
        if (maletendita && ! element.querySelector(".pli")) {
            var pli = make_element("A",{lang: "eo", href: "#"},"pli...");
                // href=# necesas por ebligi fokusadon per TAB-klavo
            pli.addEventListener("click",etendu_trd);
            pli.classList.add("pli","etendilo");
            element.appendChild(pli);

            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            if ( Math.round((Date.now() - pref_dat) / _MS_PER_DAY, 0) < 1 ) {
                var pref = make_element("A",{lang: "eo", href: "#"}, "preferoj...");
                pref.addEventListener("click",preferoj_dlg);
                pref.classList.add("pref");
                element.appendChild(make_element("SPAN")); // pro la krado
                element.appendChild(pref);
            }
        }
    }

    function etendu_trd(event) {
        event.preventDefault();
        var div_trd = event.target.parentElement;
        for (var id of div_trd.children) {
            id.classList.remove("kasxita");
        };
        // kaŝu pli...
        var 
        p = div_trd.querySelector(".pli"); if (p) p.classList.add("kasxita");
        p = div_trd.querySelector(".pref"); if (p) p.classList.add("kasxita");
    }

    /*
    function make_flat_button(label,handler,hint='') {
        var span = document.createElement("SPAN");
        span.classList.add("kashilo");
        span.appendChild(document.createTextNode(label)); 
        //span.addEventListener("click",handler);
        if (hint) span.setAttribute("title",hint)
        return span;
    }*/

    function kashu_malkashu_butonoj() {
        // aldonu kasho/malkasho-butonojn  
        //var art = document.getElementById(sec_art);
        var art = document.getElementsByTagName("article")[0];
        var div=make_element("DIV",{id: "kash_btn"});
        div.appendChild(make_icon_button("i_kash_ch",kashu_chiujn_drv,"kaŝu ĉiujn derivaĵojn"));
        div.appendChild(make_icon_button("i_mkash_ch",malkashu_chiujn_drv,"malkaŝu ĉiujn derivaĵojn"));
        //h1.appendChild(make_button(icon_opcioj,preferoj_dlg,"agordu viajn preferatajn lingvojn"));
        art.appendChild(div);
    }

    function piedlinio_preferoj() {
        var pied = document.body.getElementsByTagName("FOOTER")[0];
        if (pied) { // en la redeaktilo eble jam foriĝis...
            var first_a = pied.querySelector("A");
            if (first_a) {
                var pref = make_element("A",{class: "redakto", href: "#", title: "agordu preferatajn lingvojn"},"preferoj");
                pref.addEventListener("click",preferoj_dlg);
                first_a.insertAdjacentElement("afterend",pref);
                first_a.insertAdjacentText("afterend"," | ");      
            }
        }
    }

    function preferoj_dlg() {
        var pref = document.getElementById("pref_dlg");
        var inx = [['a','b'],['c','g'],['h','j'],['k','l'],['m','o'],['p','s'],['t','z']];

        if (pref) {
            pref.classList.toggle("kasxita");
            store_preferences();
        // se ankoraŭ ne ekzistas, faru la fenestrojn por preferoj (lingvoj)
        } else {
            var dlg = make_element("DIV",{id: "pref_dlg", class: "overlay"});
            var div = make_element("DIV",{id: "preferoj", class: "preferoj"});
            //var tit = make_element("H2",{title: "tiun ĉi dialogon vi povas malfermi ĉiam el la piedlinio!"},"preferoj");
            var close = make_button("preta",function() {
                document.getElementById("pref_dlg").classList.add("kasxita");
                store_preferences();
                // adaptu la rigardon, t.e. trd-listojn
                preparu_maletendu_sekciojn();            
            },"fermu preferojn");
            close.setAttribute("id","pref_dlg_close");

            var xopt = inx.map(i => { return {id: i.join('_'), label: i.join('..')}; });
            var xdiv = make_element("DIV",{id: "w:ix_literoj", class: "tabs"});
            add_radios(xdiv,"pref_lingvoj",null,xopt,change_pref_lng);
            
            //div.appendChild(make_element("SPAN"));
            xdiv.appendChild(close);
            div.appendChild(xdiv);

            div.appendChild(make_element("H3",{},"preferataj lingvoj"));
            div.appendChild(make_element("H3",{},"aldoneblaj lingvoj"));
            div.appendChild(make_element("UL",{id: "pref_lng"}));
            div.appendChild(make_element("UL",{id: "alia_lng"}));

            //dlg.appendChild(tit)
            dlg.appendChild(div);
        
            // enigu liston de preferoj en la artikolon
            var art = document.getElementById(sec_art);
            var h1 = art.getElementsByTagName("H1")[0];           
            h1.appendChild(dlg);
        
            load_pref_lng();
        } 
    }

    function load_pref_lng() {
        HTTPRequest('GET', lingvoj_xml, {},
        function() {
            // Success!
            var parser = new DOMParser();
            var doc = parser.parseFromString(this.response,"text/xml");
            var plist = document.getElementById("pref_lng");
            var alist = document.getElementById("alia_lng");

            var selection = document.getElementById("preferoj")
                .querySelector('input[name="pref_lingvoj"]:checked').value.split('_');
            
            // kolekti la lingvojn unue, ni bezonos ordigi ilin...
            var lingvoj = {};
            for (e of doc.getElementsByTagName("lingvo")) {
                var c = e.attributes["kodo"];
                if (c.value != "eo") {
                    var ascii = eo_ascii(e.textContent);
                    lingvoj[ascii] = {lc: c.value, ln: e.textContent};
                }
            }

            for (l of Object.keys(lingvoj).sort()) {    
                var lc = lingvoj[l].lc;
                var ln = lingvoj[l].ln;
                var li = document.createElement("LI");
                li.setAttribute("data-lng",lc);
                li.setAttribute("data-la",l);
                li.appendChild(document.createTextNode(ln));

                if ( pref_lng.indexOf(lc) < 0 ) {
                    li.setAttribute("title","aldonu");
                    if (ln[0] < selection[0] || ln[0] > selection[1]) 
                        li.classList.add("kasxita");
                    alist.appendChild(li);
                } else {
                    li.setAttribute("title","forigu");
                    plist.appendChild(li);

                    var lk = li.cloneNode(true);
                    lk.setAttribute("class","kasxita");
                    alist.appendChild(lk);
                }
            }
        
            alist.addEventListener("click",aldonuLingvon);
            plist.addEventListener("click",foriguLingvon);
        });     
    }

    function change_pref_lng() {
        var selection = document.getElementById("preferoj")
            .querySelector('input[name="pref_lingvoj"]:checked').value.split('_');

        for (ch of document.getElementById("alia_lng").childNodes) {
            var la=ch.getAttribute("data-la");
            if (la[0] < selection[0] || la[0] > selection[1]) 
                ch.classList.add("kasxita");
            else
                ch.classList.remove("kasxita");
        }
    }

    /*
    function montru_opciojn() {    
        var opt = make_options();
        var art = document.getElementById(sec_art);
        var h1 = art.getElementsByTagName("H1")[0];   
        h1.appendChild(opt);
    }
    */



    
    function aldonuLingvon(event) {
        var el = event.target; 

        if (el.tagName == "LI") {
            var lng = el.getAttribute("data-lng");
            if (lng) {
                //console.log("+"+lng);
                pref_lng.push(lng);
                pref_dat = Date.now();
            }
            //el.parentElement.removeChild(el);
            document.getElementById("pref_lng").appendChild(el.cloneNode(true));
            el.classList.add("kasxita");
        }
    }

    function foriguLingvon(event) {
        var el = event.target; 

        if (el.tagName == "LI") {
            var lng = el.getAttribute("data-lng");
            if (lng) {
                //console.log("-"+lng);
                // forigu elo la areo pref_lng
                var i = pref_lng.indexOf(lng);
                pref_lng.splice(i, 1);
            }
            el.parentElement.removeChild(el);
            ela = document.getElementById("alia_lng").querySelector("[data-lng='"+lng+"'");
            ela.classList.remove("kasxita");
        }
    }

    // memoras valorojn de preferoj en la loka memoro de la retumilo
    function store_preferences() {
        if (pref_lng.length > 0) {
            var prefs = {};
            prefs["w:preflng"] = pref_lng;
            prefs["w:prefdat"] = pref_dat;
            window.localStorage.setItem("revo_preferoj",JSON.stringify(prefs));     
        }
    }

    // reprenas memorigitajn valorojn de preferoj el la loka memoro de la retumilo
    function restore_preferences() {
        var str = window.localStorage.getItem("revo_preferoj");            
        var prefs = (str? JSON.parse(str) : null);

        var nav_lng = navigator.languages || [navigator.language];
        pref_lng = (prefs && prefs["w:preflng"])? prefs["w:preflng"] : nav_lng.slice();
        pref_dat = (prefs && prefs["w:prefdat"])? prefs["w:prefdat"] : Date.now();
    }

    // kreas grupon de opcioj (radio), donu ilin kiel vektoro da {id,label}
    function add_radios(parent,name,glabel,radios,handler) {
        if (glabel) {
            var gl = document.createElement("LABEL");
            gl.appendChild(document.createTextNode(glabel));
            parent.appendChild(gl);   
        }
        var first = true;
        for (r of radios) {
            var span = document.createElement("SPAN");
            var input = first?
                make_element("INPUT",{name: name, type: "radio", id: r.id, checked: "checked", value: r.id}) :
                make_element("INPUT",{name: name, type: "radio", id: r.id, value: r.id});
            first = false;
            var label = make_element("LABEL",{for: r.id}, r.label);
            span.appendChild(input);
            span.appendChild(label);
            parent.appendChild(span);
        }
        if(handler) {
            parent.addEventListener("click",handler);
        }
    }

    function getPrevH2(element) {
        var prv = element.previousSibling;
        while ( prv && prv.nodeName != "H2") { prv = prv.previousSibling }
        return prv;
    }


   // eksportu publikajn funkction
   return {
        restore_preferences: restore_preferences,
        preparu_art: preparu_art
   }

}();
//_js/kadro.js
const revo_url = "reta-vortaro.de";

// instalu farendaĵojn por prepari la paĝon: evento-reagoj...
when_doc_ready(function() { 
    console.log("kadro.when_doc_ready...")
    restore_preferences();

    // ni ne kreas la kadron, se ni estas en (la malnova) "frameset"
    if (! top.frames.length) {
        // provizore rezignu pri tia preparo, aparte la aŭtomata enkadrigo de artikoloj
        // enkadrigu();
        if (document.getElementById("navigado")) {
            // anstataŭe ŝargu tiujn du el ĉefa indeks-paĝo
            load_page("main","titolo.html");
            load_page("nav","/revo/inx/_eo.html");   
        }
        
        document.body 
        //document.getElementById("navigado")
            .addEventListener("click",navigate_link);
    
        window
            .addEventListener('popstate', navigate_history);    
    }
});


// se la artikolo ŝargiĝis aparte de la kadro ni aldonu la kadron
function enkadrigu() {

    // preparu la ĉefan parton de la paĝo
    if (document.getElementsByTagName("main").length == 0) {
        var main = make_element("main",{});
        main.append(...document.body.children);
        document.body.appendChild(main);
    } else {
        load_page("main","titolo.html");
    }

    // preparu la navigo-parton de la paĝo
    if (document.getElementsByTagName("nav").length == 0) {
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
        load_page("nav","/revo/inx/_eo.html");
    }
}

// vd. https://wiki.selfhtml.org/wiki/HTML/Tutorials/Navigation/Dropdown-Men%C3%BC
function nav_toggle() {
    var menu = document.getElementById("navigado");
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

    if (! href) {
        console.error("mankas atributo href ĉe elemento "+a_el.tagName+" ("+a_el.id+")");
        return;
    }

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

            if (nav && trg == "nav") {
                nav.textContent= '';
                var table = doc.querySelector("table"); 
                fix_url_path(table);
                nav.append(table);
                //img_svg_bg(); // anst. fakvinjetojn, se estas la fak-indekso - ni testos en la funkcio mem!
            } else if (main && trg == "main") {
                var body = doc.body;
                fix_url_path(body);
                main.textContent = '';
                main.append(...body.children);
                main.setAttribute("id","w:"+url);
                artikolo.preparu_art();
            }                    

            //if (push_state)
            //    history.pushState({
            //        inx: nav.firstElementChild.id,
            //        art: main.id
            //        },
            //        null,
            //    main.id.substring(2));
            // provizore ne ŝanĝu la URL de la paĝo
            if (push_state) {
                var nf = nav.firstElementChild? nav.firstElementChild.id : null;
                history.pushState({
                    inx: nf,
                    art: main.id
                    },
                    null,
                    null);
            }                
    });
}

function fix_url_path(element) {
    for (var i of element.getElementsByTagName("img")) {
        var src = i.getAttribute("src");
        if (src.startsWith("..")) i.setAttribute("src",src.substring(1))
    }
}

// anstataŭigu vinjetojn per CSS-SVG-klasoj
//function img_svg_bg() {
//    var x_fak = document.getElementById('x:_fak');
//    if (x_fak) {
//        for (var i of x_fak.getElementsByTagName('img')) {
//            var name=i.getAttribute("alt");
//            i.classList.add(name);
//        }
//    }
//}

function navigate_link(event) {
    var el = event.target.closest("a");
    var href = el? el.getAttribute("href") : null;

    if (el && href) {
        var href = el.getAttribute("href");
        var target = ref_target(el);
    
        if (href && target && target != "int") {
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

    console.log("event.state:"+state);

    // FARENDA: ni komparu kun la nuna stato antaŭ decidi, ĉu parton
    // ni devos renovigi!
    if (state) {
        if (state.inx) load_page("nav","/revo/inx/"+state.inx.substring(2)+".html",false);
        if (state.art) load_page("main",state.art.substring(2),false);    
    }
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
    // tion ni momente povas fari nur, kiam la redaktilo
    // jam ĉeestas, ĉar ni metas valorojn 
    // rekte al DOM:
    // redaktilo.restore_preferences();
    artikolo.restore_preferences();
}


//_js/redaktilo.js

// difinu ĉion sub nomprefikso "redaktilo"
var redaktilo = function() {

  var revo_codes = {
    lingvoj: new Codelist('lingvo', '/revo/cfg/lingvoj.xml'),
    fakoj: new Codelist('fako','/revo/cfg/fakoj.xml'),
    stiloj: new Codelist('stilo','/revo/cfg/stiloj.xml')
  }
  
  var re_lng = /<(?:trd|trdgrp)\s+lng\s*=\s*"([^]*?)"\s*>/mg; 
  var re_fak = /<uzo\s+tip\s*=\s*"fak"\s*>([^]*?)</mg; 
  var re_stl = /<uzo\s+tip\s*=\s*"stl"\s*>([^]*?)</mg; 
  var re_mrk = /<(drv|snc) mrk="([^]*?)">/mg;

  var re_trdgrp = /<trdgrp\s+lng\s*=\s*"[^"]+"\s*>[^]*?<\/trdgrp/mg;	
  var re_trd = /<trd\s+lng\s*=\s*"[^"]+"\s*>[^]*?<\/trd/mg;	
  var re_ref = /<ref([^g>]*)>([^]*?)<\/ref/mg;
  var re_refcel = /cel\s*=\s*"([^"]+?)"/m;


  function Codelist(xmlTag,url) {
    this.url = url;
    this.xmlTag = xmlTag;
    this.codes = {};

    this.fill = function(selection) {
      var sel = document.getElementById(selection);
    
      for (item in this.codes) {
        var opt = createTElement("option",item + ' - ' + this.codes[item]);
        addAttribute(opt,"value",item);
        sel.appendChild(opt);
      }
    };

    this.load = function(selection) {
      var self = this;
      var codes = {};

      HTTPRequest('GET', this.url, {},
        function() {
            // Success!
            var parser = new DOMParser();
            var doc = parser.parseFromString(this.response,"text/xml");
      
            for (e of doc.getElementsByTagName(self.xmlTag)) {
                var c = e.attributes["kodo"];
                //console.log(c);
                codes[c.value] = e.textContent;
            } 
            self.codes = codes;

            if (selection) {
              self.fill.call(self,selection);
            } 
        });
    };  
  }

  /*
  function showhide(id){
      if (document.getElementById){
        obj = document.getElementById(id);
        objb = document.getElementById(id+"b");
        if (obj.style.display == "none"){
          obj.style.display = "";
          objb.style.display = "none";
        } else {
          obj.style.display = "none";
          objb.style.display = "";
        }
      }
  } 

    
  function get_ta() {
      var txtarea;
      if (document.f) {
        txtarea = document.f.xmlTxt;
      } else {
        // some alternate form? take the first one we can find
        var areas = document.getElementsByTagName('textarea');
        txtarea = areas[0];
      }
      return txtarea;
  }
  */
    
  function str_indent() {
      var txtarea = document.getElementById('r:xmltxt');
      var indent = 0;
      if (document.selection  && document.selection.createRange) { // IE/Opera
        var range = document.selection.createRange();
        range.moveStart('character', - 200); 
        var selText = range.text;
        var linestart = selText.lastIndexOf("\n");
        while (selText.charCodeAt(linestart+1+indent) == 32) {indent++;}
      } else if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla
        var startPos = txtarea.selectionStart;
        var linestart = txtarea.value.substring(0, startPos).lastIndexOf("\n");
        while (txtarea.value.substring(0, startPos).charCodeAt(linestart+1+indent) == 32) {indent++;}
      }
      return (str_repeat(" ", indent));
  }
  
    
  function klavo(event) {
      var key = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
      var cx = document.getElementById("r:cx");

    //  alert(key);
      if (key == 13) {
        var txtarea = document.getElementById('r:xmltxt');
        var selText, isSample = false;
    
        if (document.selection  && document.selection.createRange) { // IE/Opera
          //save window scroll position
          if (document.documentElement && document.documentElement.scrollTop)
        var winScroll = document.documentElement.scrollTop
          else if (document.body)
        var winScroll = document.body.scrollTop;
          //get current selection  
          txtarea.focus();
          var range = document.selection.createRange();
          selText = range.text;
    
          range.text = "\n" + str_indent();
          //mark sample text as selected
          range.select();   
          //restore window scroll position
          if (document.documentElement && document.documentElement.scrollTop)
        document.documentElement.scrollTop = winScroll
          else if (document.body)
        document.body.scrollTop = winScroll;
          return false;
        } else if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla
          //save textarea scroll position
          var textScroll = txtarea.scrollTop;
          //get current selection
          txtarea.focus();
          var startPos = txtarea.selectionStart;
          var endPos = txtarea.selectionEnd;
          var tmpstr = "\n" + str_indent();
          txtarea.value = txtarea.value.substring(0, startPos)
                + tmpstr
                + txtarea.value.substring(endPos, txtarea.value.length);
          txtarea.selectionStart = startPos + tmpstr.length;
          txtarea.selectionEnd = txtarea.selectionStart;
          //restore textarea scroll position
          txtarea.scrollTop = textScroll;
          return false;
        }
      } else if (key == 88 || key == 120) {   // X or x
        if (event.altKey) {	// shortcut alt-x  --> toggle cx
          cx.checked = !cx.checked;
          return false;
        }
    
        if (!cx.checked) return true;
        var txtarea = document.getElementById('r:xmltxt');
        if (document.selection  && document.selection.createRange) { // IE/Opera
          //save window scroll position
          if (document.documentElement && document.documentElement.scrollTop)
        var winScroll = document.documentElement.scrollTop
          else if (document.body)
        var winScroll = document.body.scrollTop;
          //get current selection  
          txtarea.focus();
          var range = document.selection.createRange();
          var selText = range.text;
          if (selText != "") return true;
          range.moveStart('character', - 1); 
          var before = range.text;
          var nova = cxigi(before, key);
          if (nova != "") {
            range.text = nova;
            return false;
          }
        } else if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla
          var startPos = txtarea.selectionStart;
          var endPos = txtarea.selectionEnd;
          if (startPos != endPos || startPos == 0) { return true; }
          var before = txtarea.value.substring(startPos - 1, startPos);
          var nova = cxigi(before, key);
          if (nova != "") {
        //save textarea scroll position
        var textScroll = txtarea.scrollTop;
        txtarea.value = txtarea.value.substring(0, startPos - 1)
            + nova
            + txtarea.value.substring(endPos, txtarea.value.length);
        txtarea.selectionStart = startPos + nova.length - 1;
        txtarea.selectionEnd = txtarea.selectionStart;
        //restore textarea scroll position
        txtarea.scrollTop = textScroll;
            return false;
          }
        }
      } else if (key == 84 || key == 116 || key == 1090 || key == 1058) {   // T or t or kir-t or kir-T
        if (event.altKey) {	// shortcut alt-t  --> trd
          insertTags2('<trd lng="',document.getElementById('r:trdlng').value,'">','</trd>','');
        }
      }
  }
    
  function insertTags2(tagOpen, tagAttr, tagEndOpen, tagClose, sampleText) {
      if (tagAttr == "") {
        insertTags(tagOpen, tagEndOpen+tagClose, sampleText)
      } else {
        insertTags(tagOpen+tagAttr+tagEndOpen, tagClose, sampleText)
      }
  }
    
  function indent(offset) {
    var txtarea = document.getElementById('r:xmltxt');
    var selText, isSample=false;

    if (document.selection  && document.selection.createRange) { // IE/Opera
      alert("tio ankoraux ne funkcias.");
    } else if (txtarea.selectionStart || txtarea.selectionStart==0) { // Mozilla

      //save textarea scroll position
      var textScroll = txtarea.scrollTop;
      //get current selection
      txtarea.focus();
      var startPos = txtarea.selectionStart;
      if (startPos > 0) {
        startPos--;
      }
      var endPos = txtarea.selectionEnd;
      if (endPos > 0) {
        endPos--;
      }
      selText = txtarea.value.substring(startPos, endPos);
      if (selText=="") {
        alert("Marku kion vi volas en-/elsxovi.");
      } else {
        var nt;
        if (offset == 2)
          nt = selText.replace(/\n/g, "\n  ");
        else 
          nt = selText.replace(/\n  /g, "\n");
        txtarea.value = txtarea.value.substring(0, startPos)
              + nt
              + txtarea.value.substring(endPos, txtarea.value.length);
        txtarea.selectionStart = startPos+1;
        txtarea.selectionEnd = startPos + nt.length+1;

        //restore textarea scroll position
        txtarea.scrollTop = textScroll;
      }
    } 
  }
    
    // apply tagOpen/tagClose to selection in textarea,
    // use sampleText instead of selection if there is none
  function insertTags(tagOpen, tagClose, sampleText) {
    var txtarea = document.getElementById('r:xmltxt');
    var selText, isSample=false;

    if (document.selection && document.selection.createRange) { // IE/Opera
      //save window scroll position
      if (document.documentElement && document.documentElement.scrollTop)
        var winScroll = document.documentElement.scrollTop
      else if (document.body)
        var winScroll = document.body.scrollTop;

      //get current selection  
      txtarea.focus();
      var range = document.selection.createRange();
      selText = range.text;

      //insert tags
      checkSelectedText();
      range.text = tagOpen + selText + tagClose;

      //mark sample text as selected
      if (isSample && range.moveStart) {
        if (window.opera)
      tagClose = tagClose.replace(/\n/g,'');
      range.moveStart('character', - tagClose.length - selText.length); 
      range.moveEnd('character', - tagClose.length); 
        }
        range.select();   

      //restore window scroll position
    if (document.documentElement && document.documentElement.scrollTop)
        document.documentElement.scrollTop = winScroll
    else if (document.body)
      document.body.scrollTop = winScroll;

    } else if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla

      //save textarea scroll position
      var textScroll = txtarea.scrollTop;
      //get current selection
      txtarea.focus();

      var startPos = txtarea.selectionStart;
      var endPos = txtarea.selectionEnd;
      selText = txtarea.value.substring(startPos, endPos);

      //insert tags
      checkSelectedText();
      txtarea.value = txtarea.value.substring(0, startPos)
              + tagOpen + selText + tagClose
              + txtarea.value.substring(endPos, txtarea.value.length);

      //set new selection
      if (isSample) {
        txtarea.selectionStart = startPos + tagOpen.length;
        txtarea.selectionEnd = startPos + tagOpen.length + selText.length;
      } else {
        txtarea.selectionStart = startPos + tagOpen.length + selText.length + tagClose.length;
        txtarea.selectionEnd = txtarea.selectionStart;
      }

      //restore textarea scroll position
      txtarea.scrollTop = textScroll;
  } 
    
  function checkSelectedText(){
      if (!selText) {
        selText = sampleText;
        isSample = true;
      } else if (selText.charAt(selText.length - 1) == ' ') { //exclude ending space char
        selText = selText.substring(0, selText.length - 1);
        tagClose += ' '
      } 
    }
  }

  function resetCursor() { 
    el = document.getElementById('r:xmltxt');
    if (el.setSelectionRange) { 
        el.focus(); 
        el.setSelectionRange(0, 0); 
    } else if (el.createTextRange) { 
        var range = el.createTextRange();  
        range.moveStart('character', 0); 
        range.select(); 
    } 
    el.focus();
  }
    
  function lines(str){try {return((str.match(/[^\n]*\n[^\n]*/gi).length));} catch(e) {return 0;}}
    
  function nextTag(tag, dir) {
      var txtarea = document.getElementById('r:xmltxt');
      if (document.selection  && document.selection.createRange) { // IE/Opera
        alert("tio ankoraŭ ne funkcias.");
      } else if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla
        var startPos = txtarea.selectionStart;
        var t;
        var pos;
        if (dir > 0) {
          t = txtarea.value.substring(startPos+1);
          pos = startPos + 1 + t.indexOf(tag);
        }
        if (dir < 0) {
          t = txtarea.value.substring(0, startPos);
          pos = t.lastIndexOf(tag);    
        }
        txtarea.selectionStart = pos;
        txtarea.selectionEnd = pos;
        txtarea.focus();
        var line = lines(txtarea.value.substring(0,pos))-10;
        var lastline = lines(txtarea.value.substring(pos))+line+10;
        if (line < 0) line = 0;
        if (line > lastline) line = lastline;
        txtarea.scrollTop = txtarea.scrollHeight * line / lastline;   
    
    //    alert("tio baldaux funkcias. tag="+tag+" pos="+pos+" line="+line+ " lastline="+lastline);
    //    alert("scrollTop="+txtarea.scrollTop+" scrollHeight="+txtarea.scrollHeight);
      }
  }



  // memoras valorojn de kelkaj kampoj en la loka memoro de la retumilo
  function store_preferences() {
    var prefs = {};
    for (key of ['r:redaktanto','r:trdlng','r:klrtip','r:reftip','r:sxangxo']) {
      prefs[key] = document.getElementById(key).value;
    }
    prefs['r:cx'] = document.getElementById('r:cx').checked;
    window.localStorage.setItem("redaktilo_preferoj",JSON.stringify(prefs));  
  }

  // reprenas memorigitajn valorojn de kelkaj kampoj el la loka memoro de la retumilo
  function restore_preferences() {
    var str = window.localStorage.getItem("redaktilo_preferoj");
    var prefs = (str? JSON.parse(str) : null);
    if (prefs) {
      for (key of ['r:redaktanto','r:trdlng','r:klrtip','r:reftip','r:sxangxo']) {
        document.getElementById(key).value = prefs[key];
      }
      document.getElementById('r:cx').checked = prefs['r:cx'];
    }
  }

  function tab_toggle(id) {
    var el = document.getElementById(id);
    var tab_id;
    if (! el.classList.contains('aktiva')) {
      for (ch of el.parentElement.children) {
        ch.classList.remove('aktiva')
        tab_id = 'r:tab_'+ch.id.substring(2);
        document.getElementById(tab_id).classList.add('collapsed');
      }
      el.classList.add('aktiva');
      tab_id = 'r:tab_'+el.id.substring(2);
      document.getElementById(tab_id).classList.remove('collapsed');
    }
    // ni ankaŭ devas kaŝi la butonojn super la reakto-tabulo por la antaŭrigardo...
    if (id == "r:txmltxt") {
      document.getElementById("r:nav_btn").classList.remove('collapsed');
    } else {
      document.getElementById("r:nav_btn").classList.add('collapsed');
    }

  }

  function fs_toggle(id) {
    var el = document.getElementById(id);
    var fs_id;
    if (! el.classList.contains('aktiva')) {
      for (ch of el.parentElement.children) {
        ch.classList.remove('aktiva')
        fs_id = 'r:fs_'+ch.id.substring(2);

        // fermu ĉiujn videblajn tabuletojn
        if (id != "r:chiuj" && ch.id != "r:chiuj") {
          document.getElementById(fs_id).classList.add('collapsed');
        
        } else { // malfermu ĉiujn krom "novaj"
          if ( ch.id == "r:nov" )
            document.getElementById(fs_id).classList.add('collapsed');
          else if ( ch.id != "r:chiuj")
            document.getElementById(fs_id).classList.remove('collapsed');
        }
      }
      el.classList.add('aktiva');
      if ( id != "r:chiuj" ) {
        fs_id = 'r:fs_'+id.substring(2);
        document.getElementById(fs_id).classList.remove('collapsed');
      }
    }
  }

  function createTElement(name,text) {
    var el = document.createElement(name);
    var tx= document.createTextNode(text);
    el.appendChild(tx); return el;
  }

  function addAttribute(node,name,value) {
    var att = document.createAttribute(name);
    att.value = value;
    node.setAttributeNode(att);    
  }

  function listigu_erarojn(err) {
    var el = document.getElementById("r:eraroj");
    var elch = el.children;
    var ul;
    if (! elch.length) {
      ul = document.createElement("ul");                
      el.appendChild(ul);
    } else {
      ul = elch[0];
    };
    for (e of err) {
      var li = createTElement("li",e);               
      ul.appendChild(li);       
    }
  }

  function add_err_msg(msg, matches) {
    var errors = [];

    for (m of matches) {
      var m = msg+m[1];
      errors.push(m)
    }
    if (errors.length)
      listigu_erarojn(errors);
  }

  function kontrolu_kodojn(clist,regex) {
    var xml = document.getElementById("r:xmltxt").value;
    var m; var invalid = [];
    var list = revo_codes[clist];

    if (! list ) {
      console.error("Kodlisto \"" + clist + "\" estas malplena, ni ne povas kontroli ilin!");
      return;
    }
    
    while (m = regex.exec(xml)) {
      if ( m[1] && !list.codes[m[1]] ) {
        invalid.push(m);
        console.error("Nevalida kodo \""+m[1]+"\" ĉe: "+m.index);
      }
    }
    return invalid;
  }

  function kontrolu_mrk(art) {
    var xml = document.getElementById("r:xmltxt").value;
    var m; 
    var errors = [];
    
    while (m = re_mrk.exec(xml)) {
      var el = m[1];
      var mrk = m[2];
      if ( mrk.indexOf(art+'.') != 0 ) {
        errors.push("La marko \"" + mrk + "\" (" + el + ") ne komenciĝas je la dosieronomo (" + art + ".).")
      } else if ( mrk.indexOf('0',art.length) < 0 ) {
        errors.push("La marko \"" + mrk + "\" (" + el + ") ne enhavas \"0\" (por tildo).")
      }
    }
    if (errors.length)
      listigu_erarojn(errors); 
  }

  // trovu tradukojn sen lingvo
  function kontrolu_trd() {
    var xml = document.getElementById("r:xmltxt").value;
    var m; re_t2 = /(<trd.*?<\/trd>)/g;
    var errors = [];
    
    // forigu bonajn trdgrp kaj trd FARENDA: tio ne trovas <trd lng="..."> ene de trdgrp!
    var x = xml.replace(re_trdgrp,'').replace(re_trd,'');
    while (m = re_t2.exec(x)) {
      errors.push("Traduko sen lingvo: "+m[1]);
    }

    if (errors.length)
      listigu_erarojn(errors); 
  }

  function kontrolu_ref() {
    var xml = document.getElementById("r:xmltxt").value;
    var m; 
    var errors = [];
    
    while (m = re_ref.exec(xml)) {
      var ref = m[1];
      if (ref.search(re_refcel) < 0)
        errors.push("Mankas celo en referenco <ref" + ref + ">"+ m[2] +"</ref>.");
    }
    if (errors.length)
      listigu_erarojn(errors); 
  }

  function rantaurigardo() {
    var eraroj = document.getElementById("r:eraroj");
    var art = document.getElementById("r:art").value;
    var xml = document.getElementById("r:xmltxt").value;

    eraroj.textContent='';
    eraroj.classList.remove("collapsed"); // ĉu nur kiam certe estas eraroj?

    if (xml.startsWith("<?xml")) {
      vokohtmlx(xml);
      vokomailx("nur_kontrolo",art,xml);
      kontrolu_mrk(art);
      kontrolu_trd();
      kontrolu_ref();
      add_err_msg("Nekonata lingvo-kodo: ",kontrolu_kodojn("lingvoj",re_lng));
      add_err_msg("Nekonata fako: ",kontrolu_kodojn("fakoj",re_fak));
      add_err_msg("Nekonata stilo: ",kontrolu_kodojn("stiloj",re_stl));
    } else {
      listigu_erarojn(["Averto: Artikolo devas komenciĝi je <?xml !"]);
    }
  // kontrolu_fak();
    //kontrolu_stl();
    //...
  }

  function rkonservo() {
    var art = document.getElementById("r:art").value;
    var xml = document.getElementById("r:xmltxt").value;

    var eraroj = document.getElementById("r:eraroj");
    eraroj.textContent='';
    eraroj.classList.remove("collapsed"); // ĉu nur kiam certe estas eraroj?

    if (xml.startsWith("<?xml")) {
      kontrolu_mrk(art);
      kontrolu_trd();
      kontrolu_ref();
      add_err_msg("Nekonata lingvo-kodo: ",kontrolu_kodojn("lingvoj",re_lng));
      add_err_msg("Nekonata fako: ",kontrolu_kodojn("fakoj",re_fak));
      add_err_msg("Nekonata stilo: ",kontrolu_kodojn("stiloj",re_stl));
      if (document.getElementById("r:eraroj").textContent == '')
        vokomailx("forsendo",art,xml);
    } else {
      listigu_erarojn(["Averto: Artikolo devas komenciĝi je <?xml !"]);
    }
  }

  function create_new_art() {
    var art = document.getElementById("r:nova_art").value;
    var ta = document.getElementById("r:xmltxt");
    document.getElementById("r:art").value = art;
    document.getElementById("r:art_titolo").textContent = art;
    ta.value = 
        '<?xml version="1.0"?>\n'
      + '<!DOCTYPE vortaro SYSTEM "../dtd/vokoxml.dtd">\n'
      + '<vortaro>\n'
      + '<art mrk="\$Id\$">\n'
      + '<kap>\n'
      + '    <rad>' + art + '</rad>/o <fnt><bib>PIV1</bib></fnt>\n'
      + '</kap>\n'
      + '<drv mrk="' + art + '.0o">\n'
      + '  <kap><tld/>o</kap>\n'
      + '  <snc mrk="' + art + '.0o.SNC">\n'
      + '    <uzo tip="fak"></uzo>\n'
      + '    <dif>\n'
      + '      <tld/>o estas:\n'
      + '      <ekz>\n'
      + '        ...\n'
      + '        <fnt><bib></bib>, <lok></lok></fnt>\n'
      + '      </ekz>\n'
      + '    </dif>\n'
      + '  </snc>\n'
      + '  <trd lng=""></trd>\n'
      + '</drv>\n'
      + '</art>\n'
      + '</vortaro>\n';
  }

  function vokohtmlx(xml) {
    HTTPRequest('POST','/cgi-bin/vokohtmlx.pl',
    {
      xmlTxt: xml
    },
    function (data) {
      // Success!
      var parser = new DOMParser();
      var doc = parser.parseFromString(data,"text/html");
      var rigardo = document.getElementById("r:tab_trigardo");

      var article = doc.getElementsByTagName("article");
      if (article) {
        rigardo.textContent = '';
        rigardo.append(...article);  
        preparu_art();

        // eble tio devas esti en preparu_art?
        // refaru matematikajn formulojn, se estas
        if (typeof(MathJax) != 'undefined' && MathJax.Hub) {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        }
      
      } else {
        // FARENDA: post kiam ĉiuj artikoloj havos HTML5-strukturon ni povos forigi tion
        var body = doc.body;
        var pied = body.querySelector("span.redakto");
        if (pied) pied.parentElement.removeChild(pied);
    
        rigardo.textContent = '';
        rigardo.append(...body.childNodes);  
      }
    });
  }
    
  function vokomailx(command,art,xml) {

    var red = document.getElementById("r:redaktanto").value;
    var sxg = document.getElementById("r:sxangxo").value;

    // console.log("vokomailx art:"+art);
    // console.log("vokomailx red:"+red);
    // console.log("vokomailx sxg:"+sxg);

    HTTPRequest('POST','/cgi-bin/vokomailx.pl',
      {
        xmlTxt: xml,
        art: art,
        redaktanto: red,
        sxangxo: sxg,
        command: command
      },
      function (data) {
        // Success!
        var parser = new DOMParser();
        var doc = parser.parseFromString(data,"text/html");

        var err_list = document.getElementById("r:eraroj");

        for (div of doc.body.getElementsByClassName("eraroj")) {
          // debugging...
          console.log("div id=" + div.id);
          err_list.appendChild(div);
        }
        var konfirmo = doc.getElementById("konfirmo");
        if (konfirmo) {
          // debugging...
          console.log("div id=" + konfirmo.id);
          err_list.appendChild(konfirmo);
          err_list.classList.add("konfirmo");
        }
      });
  }

  function load_xml() {
    var art = getParamValue("art");
    if (art) {

      HTTPRequest('GET','/revo/xml/'+art+'.xml',{},
      function() {
          // Success!
          document.getElementById('r:xmltxt').value=this.response;
          document.getElementById("r:art").value = art;
          var titolo = document.getElementById("r:art_titolo");
          titolo.textContent = "\u00ab" + art + "\u00bb"; 
          titolo.setAttribute("href","/revo/art/"+art+".html");
          resetCursor();     
        });
    }
  }

  function sf(pos, line, lastline) {
    document.getElementById("r:xmltxt").focus();
    var txtarea = document.getElementById('r:xmltxt');
    if (document.selection  && document.selection.createRange) { // IE/Opera
      var range = document.selection.createRange();
      range.moveEnd('character', pos); 
      range.moveStart('character', pos); 
      range.select();
      range.scrollIntoView(true);
    } else if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla
      txtarea.selectionStart = pos;
      txtarea.selectionEnd = txtarea.selectionStart;
      var scrollTop = txtarea.scrollHeight * line / lastline;
  //    alert("scrollTop="+scrollTop);
      txtarea.scrollTop = scrollTop;
    }
  }

  function preparu_red() {
    // enlegu bezonaĵojn (listojn, XML-artikolon, preferojn)
    if (document.getElementById("r:xmltxt")) {
      sf(0, 0, 1);
      restore_preferences();
      revo_codes.lingvoj.load();
      revo_codes.fakoj.load("r:sfak");
      revo_codes.stiloj.load("r:sstl");
      load_xml(); // se doniĝis ?art=xxx ni fone ŝargas tiun artikolon
    }

    // preparu aktivajn elmentoj / eventojn
    var tabs = document.getElementById("r:tabs");
    tabs.addEventListener("click", function(event) {
      var a = event.target.closest("a");
      tab_toggle(a.id);
    });

    var fs_t = document.getElementById("r:fs_toggle");
    fs_t.addEventListener("click", function(event) {
      var a = event.target.closest("a");
      fs_toggle(a.id);
      if (a.id == "r:trigardo") {
        trigardo();
      }
    });
  }

  when_doc_ready(function() { 
    console.log("redaktilo.when_doc_ready...:" +  location.href);
    window.onbeforeunload = function() {
      store_preferences();
    }  

  });

  // eksportu publikajn funkction
  return {
    preparu_red: preparu_red,
    create_new_art: create_new_art,
    insertTags: insertTags,
    insertTags2: insertTags2
  }
}();
//_js/util.js

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

// aliras helpo-paĝon
function helpo_pagho(url) {
    window.open('https://revuloj.github.io/temoj/'+url);
}

// por prepari paĝon post kiam ĝi estas ŝargita
function when_doc_ready(onready_fn) {
    if (document.readyState != 'loading'){
      onready_fn();
    } else {
      document.addEventListener('DOMContentLoaded', onready_fn);
    }
}

function make_element(name,attributes,textcontent) {
    var element = document.createElement(name);
    for (var a in attributes) {
        element.setAttribute(a,attributes[a])
    }
    if (textcontent) element.appendChild(document.createTextNode(textcontent));
    return element;
}

function make_button(label,handler,hint='') {
    var btn = document.createElement("BUTTON");
    btn.appendChild(document.createTextNode(label)); 
    btn.addEventListener("click",handler);
    //btn.classList.add("kashilo");
    if (hint) btn.setAttribute("title",hint)
    return btn;
}

function make_icon_button(iclass,handler,hint='') {
    var btn = document.createElement("BUTTON");
    //btn.appendChild(document.createTextNode(label)); 
    if (handler) btn.addEventListener("click",handler);
    btn.classList.add(iclass,"icon_btn");
    if (hint) btn.setAttribute("title",hint)
    return btn;
}

function isLocalLink(url) {
    if (url[0] == '#') return true;
    // necesas kompari ankaŭ la dosiernomon      
    var doc = getUrlFileName(document.location.pathname);
    var trg = getUrlFileName(url);
    return doc==trg;
}

function getUrlFileName(url) {
    return url.substring(url.lastIndexOf('/')+1).split('#')[0];
}

function getHashParts() {
    var h = (location.hash[0] == '#'
        ? location.hash.substr(1) 
        : location.hash);
    var r = {};
    for (p of h.split('&')) {
        if (p.indexOf('=') < 0) {
            r.mrk = p
        } else {
            var v = p.split('=');
            r[v[0]] = v[1];
        }
    }
    return r;
}

// ĉu ni vere bezonos tion? parametroj estas afero de la servilo,
// sed ni povas kaŝi ilin ankaŭ post #, vd. supre getHashParts
function getParamValue(param) {
    var result = null,
        tmp = [];
    location.search.substr(1).split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


function str_repeat(rStr, rNum) {
    var nStr="";
    for (var x=1; x<=rNum; x++) {
        nStr+=rStr;
    }
    return nStr;
} 
  

function eo_ascii(str) {
    return str
        .replace(/ĉ/g,'cx')
        .replace(/ĝ/g,'gx')
        .replace(/ŝ/g,'sx')
        .replace(/ĵ/g,'jx')
        .replace(/ĥ/g,'hx')
        .replace(/ŭ/g,'ux');
}
  
function cxigi(b, key) {
    var n="";
    var k=String.fromCharCode(key);
  
          if (b=='s'     ) n='\u015D';
    else if (b=='\u015D') n='s'+k;
    else if (b=='S'     ) n='\u015C';
    else if (b=='\u015C') n='S'+k;
  
    else if (b=='c'     ) n='\u0109';
    else if (b=='\u0109') n='c'+k;
    else if (b=='C'     ) n='\u0108';
    else if (b=='\u0108') n='C'+k;
  
    else if (b=='h'     ) n='\u0125';
    else if (b=='\u0125') n='h'+k;
    else if (b=='H'     ) n='\u0124';
    else if (b=='\u0124') n='H'+k;
  
    else if (b=='g'     ) n='\u011D';
    else if (b=='\u011D') n='g'+k;
    else if (b=='G'     ) n='\u011C';
    else if (b=='\u011C') n='G'+k;
  
    else if (b=='u'     ) n='\u016D';
    else if (b=='\u016D') n='u'+k;
    else if (b=='U'     ) n='\u016C';
    else if (b=='\u016C') n='U'+k;
  
    else if (b=='j'     ) n='\u0135';
    else if (b=='\u0135') n='j'+k;
    else if (b=='J'     ) n='\u0134';
    else if (b=='\u0134') n='J'+k;
  
    return n;
}
