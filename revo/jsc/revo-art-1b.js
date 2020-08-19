const js_sojlo = 3; //30+3;
const sec_art = "s_artikolo";
const lingvoj_xml = "../cfg/lingvoj.xml";

var pref_lng = [];
var pref_dat = Date.now();

//const icon_kashu = "\u2305"; //"\u2306";
//const icon_malkashu = "\u2304"; //"\u2335"; // "\u23f7";
//const icon_kashu_chiujn = "\u2353"; //"\u2796\uFE0E"; // "\u23eb\uFE0E";
//const icon_malkashu_chiujn = "\u234c"; //"\u2795\uFE0E"; //"\u23ec\uFE0E";
//const icon_opcioj = "\u2f42"; //"\uD83D\uDC41"; //"\1f441;\uFE0E"; 
//const icon_close = "fermu"; //"\u274C\uFE0E";

//window.onbeforeunload = function() {
//    store_preferences();
//}

///
window.onload = function() {    
    restore_preferences();            
    preparu_art()
}   

function preparu_art() {
    top.document.title='Reta Vortaro ['
        + document.getElementById(sec_art).getElementsByTagName("H1")[0].textContent.trim()
        + ']';
    /* aktivigu nur por longaj artikoloj... */
    var d = document.getElementsByClassName("kasxebla");
    //if (d.length > js_sojlo) {
        preparu_kashu_sekciojn();
        preparu_maletendu_sekciojn();
        kashu_malkashu_butonoj();
        piedlinio_preferoj();
        interna_navigado();
        //etendu_ekzemplojn();   
    //}
}

/* kaŝu sekciojn de derivaĵoj, se la artikolo estas tro longa
   kaj provizu per ebleco remalkaŝi */
function preparu_kashu_sekciojn() {
    var d = document.getElementsByClassName("kasxebla");
    var h = document.location.hash.substr(1); // derivaĵo aŭ alia elemento celita kaj do montrenda
    var trg = h? document.getElementById(h) : null;
    var d_vid = trg? trg.closest("section.drv, section.fontoj").firstElementChild.id : null;
    var multaj = d.length > js_sojlo;
    var first = true;

    for (var el of d) {
        var h2 = getPrevH2(el);
        if (h2) {
            h2.classList.add("kashilo");
            if ( multaj && (h && h2.id != d_vid) || (!h && !first) ) { 
                // \u25be
                h2.appendChild(make_icon_button("i_mkash",
                    kashu_malkashu_drv,"malkaŝu derivaĵon"));
                el.classList.add("kasxita") 
            } else {
                // "\u25b2"
                h2.appendChild(make_icon_button("i_kash",
                    kashu_malkashu_drv,"kaŝu derivaĵon"));
            }                    
            first = false;
            h2.addEventListener("click", function(event) { 
                kashu_malkashu_drv(event);
            });    
        }
    }    
}

/* kelkajn sekciojn kiel ekzemploj, tradukoj, rimarkoj ni maletendas, pro eviti troan amplekson,
  ili ricevas eblecon por reetendi ilin per "pli..." */
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
    for (var el of document.getElementsByClassName("kasxebla")) {
        var h2 = getPrevH2(el);
        if (h2) {
            el.classList.add("kasxita");
            h2.querySelector(".kashilo").textContent = icon_malkashu;
        }
    }    
}

/** malfkaŝu ĉiujn derivaĵojn **/
function malkashu_chiujn_drv() {
    for (var el of document.getElementsByClassName("kasxebla")) {
        var h2 = getPrevH2(el);
        if (h2) {
            el.classList.remove("kasxita") 
            h2.querySelector(".kashilo").textContent = icon_kashu;
        }
    }    
}

function kashu_malkashu_drv(event) {
    var section = event.target.closest("section"); //parentElement;    
    var div = section.getElementsByClassName("kasxebla")[0];
    //getNextDiv(this).classList.toggle("kasxita");
    if (div.classList.contains("kasxita")) {
        for (var el of section.getElementsByClassName("kasxebla")) {
            el.classList.remove("kasxita");
        }
        section.querySelector("h2 .kashilo").textContent = icon_kashu;
        // aktualigu la salto-markon per la "id" de section>h2
        // por teni ĝin malkaŝita ĉe reŝargo de la dokumento
        // aŭ ĉu ni lasu la originan???
        // problemo: tiu derivaĵo saltas eble supren en la paĝo, kio povus konfuzi la leganton...
        //var id = section.querySelector("h2").id;
        //if (id)
        //    document.location.hash = "#"+id;
    } else {
        for (var el of section.getElementsByClassName("kasxebla")) {
            el.classList.add("kasxita");
        }
        section.querySelector("h2 .kashilo").textContent = icon_malkashu;
    }
}

function maletendu_trd(element) {
    //var nav_lng = navigator.languages || [navigator.language];
    var eo;
    var maletendita = false;
    for (var id of element.children) {
        var id_lng = id.getAttribute("lang");
        // la tradukoj estas paroj de ea lingvo-nomo kaj nacilingvaj tradukoj
        if (id_lng) {
            if ( id_lng == "eo") {
                eo = id;
            } else if ( pref_lng.indexOf(id_lng) < 0 ) {
                eo.classList.add("kasxita");
                id.classList.add("kasxita");
                maletendita = true;
            }
        }
    }
    // aldonu pli...
    if (maletendita) {
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
    div_trd.querySelector(".pli").classList.add("kasxita");
    div_trd.querySelector(".pref").classList.add("kasxita");
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
    var art = document.getElementById(sec_art);
    //var h1 = art.getElementsByTagName("H1")[0];   
    var div=make_element("DIV",{id: "kash_btn"});
    div.appendChild(make_icon_button("i_kash_ch",kashu_chiujn_drv,"kaŝu ĉiujn derivaĵojn"));
    div.appendChild(make_icon_button("i_mkash_ch",malkashu_chiujn_drv,"malkaŝu ĉiujn derivaĵojn"));
    //h1.appendChild(make_button(icon_opcioj,preferoj_dlg,"agordu viajn preferatajn lingvojn"));
    art.appendChild(div);
}

function piedlinio_preferoj() {
    var pied = document.body.getElementsByTagName("FOOTER")[0];
    var first_a = pied.querySelector("A");
    var pref = make_element("A",{class: "redakto", href: "#", title: "agordu preferatajn lingvojn"},"preferoj");
    pref.addEventListener("click",preferoj_dlg);
    first_a.insertAdjacentElement("afterend",pref);
    first_a.insertAdjacentText("afterend"," | ");
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
    btn.addEventListener("click",handler);
    btn.classList.add(iclass,"icon_btn");
    if (hint) btn.setAttribute("title",hint)
    return btn;
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
        var close = make_button("fermu",function() {
            document.getElementById("pref_dlg").classList.add("kasxita");
            store_preferences();
        },"fermu preferojn");
        close.setAttribute("id","pref_dlg_close");

        var xbtn = inx.map(
            i => {
                var s = i.join('..');
                return make_button(s, function(){
                    console.log(s)
                },
                "lingvoj "+s)
            });
        var xdiv = make_element("DIV",{class: "ix_literoj"});
        xdiv.append(...xbtn);
        
        div.appendChild(make_element("SPAN"));
        div.appendChild(xdiv);
        div.appendChild(make_element("H3",{},"preferataj lingvoj"));
        div.appendChild(make_element("H3",{},"aldoneblaj lingvoj"));
        div.appendChild(make_element("UL",{id: "pref_lng"}));
        div.appendChild(make_element("UL",{id: "alia_lng"}));

        //dlg.appendChild(tit)
        dlg.appendChild(close);
        dlg.appendChild(div);
    
        // enigu liston de preferoj en la artikolon
        var art = document.getElementById(sec_art);
        var h1 = art.getElementsByTagName("H1")[0];           
        h1.appendChild(dlg);
    
        load_lng();
    } 
}

function load_lng() {
    HTTPRequest('GET', lingvoj_xml, {},
    function() {
        // Success!
        var parser = new DOMParser();
        var doc = parser.parseFromString(this.response,"text/xml");
        var plist = document.getElementById("pref_lng");
        var alist = document.getElementById("alia_lng");
        
        // kolekti la lingvojn unue, ni bezonoso ordigi ilin...
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
            li.appendChild(document.createTextNode(ln));

            if ( pref_lng.indexOf(lc) < 0 ) {
                li.setAttribute("title","aldonu");
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

/*
function montru_opciojn() {    
    var opt = make_options();
    var art = document.getElementById(sec_art);
    var h1 = art.getElementsByTagName("H1")[0];   
    h1.appendChild(opt);
}
*/


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

  
function aldonuLingvon(event) {
    var el = event.target; 

    if (el.tagName == "LI") {
        var lng = el.getAttribute("data-lng");
        if (lng) {
            console.log("+"+lng);
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
            console.log("-"+lng);
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

/* 
// kreas opcio-menuon de la artikolo
function make_options() {
    var div = make_element("DIV",{class: "opcioj"});
    add_radios(div,"o_drv","derivaĵoj",[{id: "drv_elektitaj", label: "elektitaj"},{id: "drv_chiuj", label: "ĉiuj"}]);
    add_radios(div,"o_trd","tradukoj",[{id: "trd_preferataj", label: "preferataj"},{id: "trd_chiuj", label: "ĉiuj"}]);
    add_radios(div,"o_fnt","fontoj",[{id: "fnt_elektita", label: "elektita"},{id: "fnt_chiuj", label: "ĉiuj"}]);
    return div;
}

// kreas grupon de opcioj (radio), donu ilin kiel vektoro da {id,label}
function add_radios(parent,name,glabel,radios) {
    var gl = document.createElement("LABEL");
    gl.appendChild(document.createTextNode(glabel));
    parent.appendChild(gl);
    for (r of radios) {
        var span = document.createElement("SPAN");
        var input = make_element("INPUT",{name: name, type: "radio", id: r.id, value: r.id});
        var label = make_element("LABEL",{for: r.id}, r.label);
        span.appendChild(input);
        span.appendChild(label);
        parent.appendChild(span);
    }
}
*/

function make_element(name,attributes,textcontent) {
    var element = document.createElement(name);
    for (var a in attributes) {
        element.setAttribute(a,attributes[a])
    }
    if (textcontent) element.appendChild(document.createTextNode(textcontent));
    return element;
}


function interna_navigado() {
    // certigu, ke sekcioj malfermiĝu, kiam ili entenas navig-celon
    var a = document.getElementsByTagName("A");
    for (var k=0; k<a.length; k++) {
        var href = a[k].getAttribute("href");
        if (href && isLocalLink(href) && href != "#") {
            a[k].addEventListener("click", function() {
                var id = this.getAttribute("href").split('#')[1];
                var trg = document.getElementById(id);
                showContainingDiv(trg);
            });
        }
    }
}

function getPrevH2(element) {
    var prv = element.previousSibling;
    while ( prv && prv.nodeName != "H2") { prv = prv.previousSibling }
    return prv;
}

function getNextDiv(element) {
    var nxt = element.nextSibling;
    while ( nxt && nxt.nodeName != "DIV") { nxt = nxt.nextSibling }
    return nxt;
}

function showContainingDiv(element) {
    if (element.nodeName == "H2") {
        var div = getNextDiv(element);
        div.classList.remove("kasxita")
    } else {
        var par = element.closest(".kasxita");
        if (par) par.classList.remove("kasxita");
        /*
        var par = element.parentElement;
        while (par) {
            if (par.classList.contains("kasxita")) {
                par.classList.remove("kasxita")
            } else {
                par = par.parentElement;
            }
        }
        */
    }
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

function eo_ascii(str) {
    return str
        .replace(/ĉ/g,'cx')
        .replace(/ĝ/g,'gx')
        .replace(/ŝ/g,'sx')
        .replace(/ĵ/g,'jx')
        .replace(/ĥ/g,'hx')
        .replace(/ŭ/g,'ux');
}