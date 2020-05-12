---
layout: page
title: Manlibro teĥnika
---

# pri strukturado de la XML-fontodosieroj laŭ la dokumenttipdifino
{:.no_toc}

![manoj](../assets/img/manoj.jpg){: style="float: left; margin-right: 2em; max-width: 50%; border: solid gray 1px"}


* Enhavo
{:toc}

<br clear="all"/>

Pri la ekzakta specifo de la strukturelementoj informas la [Dokumentstrukturo (RelaxNG)](rnc).

## vortaro

Ekzistas du eblecoj por realigi vortaron laŭ la Voko-DTD.
1. La tuta vortaro estas en unu dosiero
2. Ĉiu unuopa artikolo estas en propra dosiero

En la unua okazo, kiu konvenas por malgrandaj vortaroj aŭ por
aŭtomataj traktoj de la tuta vortaro, ĝi konsistas el la tri grandaj partoj
prologo, precipa parto kaj epilogo. La precipa parto enhavas la
unuopajn [artikolojn](#artikolo).

```
<![CDATA[<?xml version="1.0"?>
<!DOCTYPE vortaro SYSTEM "../dtd/vokoxml.dtd">  
]]>
<vortaro>
  <prologo>
    ...
  </prologo>
  <precipa-parto>
    <art>
      ...
    </art>
    <art>
      ...
    </art>
    <art>
      ...
    </art>
  </precipa-parto>
  <epilogo>
    ...
  </epilogo>
</vortaro>
```

En la dua okazo, kiu konvenas por redaktado de grandaj vortaroj
kaj kiun uzas Reta Vortaro, ĉiu dosiero enhavas krom la devigaj kadraj elementoj nur unu
artikolon. 

```
<![CDATA[<?xml version="1.0"?>
<!DOCTYPE vortaro SYSTEM "../dtd/vokoxml.dtd"> 
]]>
<vortaro>
  <art>
    ...
  </art>
</vortaro>
```

## artikolo

Artikolo enhavas la informojn pri unu kapvorto. Ĝi
konsistas do el la [kapvorto](#kapvorto) kaj la priskribo. La priskribo 
estas normale dividita en plurajn [derivaĵoj](#derivaĵoj). Krome 
la artikolo ricevas markon, kiu permesas referenci al la
artikolo de aliaj lokoj. La marko principe egalas al la dosiernomo.


```
<art mrk="vort">
  <kap><rad>vort</rad>/o</kap>
  <drv mrk="vort.0o">
    ...
  </drv>
  <drv mrk="vort.0igi">
    ...
  </drv>
  <drv mrk="vort.sen0a">
    ...
  </drv>
</art>
```



 
Se la artikoloj estas administrataj per la arĥivosistemo
CVS, la marko estas aŭtomate donita de tiu sistemo en loko
markita per `$Id$` kaj tiukaze enhavas krome indikojn pri
versio kaj ŝanĝtempo de la artikolo. Tiujn informojn uzas
ankaŭ la retpoŝta redaktoservo por certigi, ke ne du
redaktantoj redaktas samtempe la saman artikolon.
Ampleksaj artikoloj cetere povas esti dividitaj en
subartikoloj. 
 

```
<art mrk="&#36;Id: vort.xml,v 1.6 2000/03/31 20:09:48 revo Exp &#36;">
  <kap><rad>vort</rad>/o</kap>
  <subart>
    ...
  </subart>
  <subart>
    ...
  </subart>
</art>
```

*Noto*: Artikoloj de terminaroj normale ne bezonas la derivaĵojn kaj 
povas rekte enhavi la sencojn aŭ eĉ la difinojn kaj
ekzemplojn.

## kapvorto

Kapvorto okazas en du lokoj, kiel kapvorto de [artikolo](#artikolo) 
kaj kiel kapvorto de [derivaĵo](#derivaĵoj). En la kapvorto de la artikolo 
oni normale signas la radikon, per kiu oni povas anstataŭi la 
tildojn en la cetera artikolo. Krome la kapvorto povas enhavi 
indikon pri la [fonto](#fontindikoj) kaj oficialeco de la kapvorto.

```
<kap>
  <rad>vort</rad>/o
  <ofc>*</ofc>
</kap>
```

 
La kapvortoj de la derivaĵoj referencas per tildo al
la radiko kaj nur aldonas prefiksojn, finaĵojn ktp.
 

```
<kap>
  sen<tld/>a
</kap>
```


## derivaĵoj
 
Derivaĵoj entenas la priskribon pri iu vorto derivita
el la kapvorto de la artikolo. Ili konsistas el propra
kapvorto kaj ĝia priskribo, kiu ofte estas dividita
en plurajn sencojn. Se temas pri nur unu senco, la divido
principe ne estas necesa. Sed por faciligi la taskon de
la konvertiloj mi rekomendas eĉ ĉe nur unu senco krampi
ĝin per `<snc>...</snc>`. Por ke derivaĵoj 
estu rekte referenceblaj el aliaj artikoloj ili ricevas 
same kiel la artikolo markon, kiu konsistas el la 
dosiernomo, punkto kaj la kapvorto de la derivaĵo, en kiu
la tildo estas anstataŭigita per nulo.
 
```
<drv mrk="vort.sen0a">
  <kap>sen<tld/>a</kap>
  <snc>
  </snc>  
</drv>
```
 
Multsignifajn derivaĵojn oni povas dividi per `subdrv`.
 

## sencoj
 
Sencoj entenas la priskribon pri unu senco de vorto.
La priskribo povas uzi iujn el la sekvaj partoj:
uzo, difino, [ekzemplo](#ekzemploj), [referenco](#referencoj), 
[traduko](#tradukoj) kaj kelkaj aliaj.
 

```
<snc>
  <dif>
    ...:
    <ekz>...</ekz>;
    <ekz>...</ekz>.
  </dif>
  <refgrp tip="sin">
    <ref cel="...">...</ref>,
    <ref cel="...">...</ref>
  </refgrp>
  <trd lng="cs">...</trd>
  <trd lng="de">...</trd>
  <trd lng="en">...</trd>
</snc>
<snc>
  <uzo tip="fak">ZOO</uzo>
  <dif>
    ...
  </dif>
  <bld lok="...">...</bld>
  <trd lng="en">...</trd>
</snc>
```

 
Sencon, kiu ampleksas plurajn subtilajn subsencojn oni
povas dividi per `subsnc`.
  
Se vi volas referenci al iu senco, vi enmetu markon,
kies unua parto estu la marko de la enhavanta derivaĵo
kaj la dua parto identigu la sencon mem:
 

```
<drv mrk="dorm.0i">
  <snc mrk="dorm.0i.ripozi">
    ...
  </snc>
  <snc mrk="dorm.0i.malvivi">
    ...
  </snc>
</drv>
```

 
Ĉar la sencnumeroj estas elkalkulataj aŭtomate, ekzistas
specialaj rimedoj por enŝovi tian numeron en la tekston:
 

```
<rim> 
  La senco dormi <sncref ref="dorm.0i.malvivi"/> estas
  uzata nur...
</rim>
```

 
en la prezento fariĝas "Rim: La senco dormi <i>2</i>
estas uzata nur..."
  
Se malsupre en artikolo vi volas doni ekzemplojn rilate
al senco pli frue aperanta, vi povas fari tion per:
 

```
<snc ref="dorm.0i.malvivi">
  <ekz>
    ...
  </ekz>
</snc>
```

 
Tio poste fariĝos "2: ..." (Komparu la artikolon pri "al").
 
## ekzemploj

 
Ekzemploj ilustras la uzon de vorto kaj povas enhavi 
krom la citita aŭ ekzempla teksto klarigojn kaj 
[fontindikon](#fontindikoj).
 

```
<ekz>
  ili sin <tld/>is je kvar okuloj
  <klr>(intervidi&amp;gcirc;is kaj parolis duope, sen atestantoj)</klr>
  <fnt><bib>Ne&amp;gcirc;aBlovado</bib></fnt>
</ekz>
```

 
Ellason ene de citaĵo oni povas montri per klariga tripunkto:
 

```
<ekz>
  iun matenon <klr>[...]</klr> mi observis en la aero <tld/>forman objekton
  <fnt><bib>M&amp;uuml;nchhausen</bib>, <lok>&amp;ccirc;apitro 9a</lok></fnt>
</ekz>
```

## fontindikoj

 
Fontoj indikas la devenon de citaĵo aŭ kapvorto.
Ili indikas normale la verkon kaj la lokon ene de 
la verko. La verkon plej konvene oni indikas per 
referenco al la bibliografio.
 

```
<ekz>
  ili <tld/>igas mian vivon en kavo
  <fnt><bib>MT</bib>, <lok>&amp;Jer; 3:53</lok></fnt>
</ekz>
```

 Jen kiel oni citas el artikolo de revuo: 

```
<ekz>
  la fama <tld/>o de Hammurabi
  <fnt>
  <aut>Andrzej Grz&amp;eogonek;bowski</aut>,
  <vrk>Irano: la 131a lando de MT</vrk>,
  <bib>LOdE</bib>,
  <lok>2001-07, numero 81a</lok>
  </fnt>
</ekz>
```


 
La bibliografio enhavas la mallongigojn de la referencverkoj, 
ekzemple `MT` povas stari por la Malnova Testamento, `LOdE` por
La Ondo de Esperanto, `Viki` por Vikipedio kaj tiel plu.
 

 
Se la fonto estas vortaro aŭ leksikono tiel, ke oni trovas la citaĵon
laŭ la alfabeta indekso, sufiĉas sole la mallongigo de referencverko
kiel fontindiko. Ordinare tio aperas ĉe la fontindikoj de kapvortoj:
 

```
  <kap><rad>levier</rad>/o <fnt><bib>PIV1</bib></fnt></kap>
```

 
Se iom grava verko mankas en la bibliografio, vi povas peti, 
ke la administranto aldonu ĝin.
 

 
Verkoj ne tre ofte citataj, ekzemple mallongaj interretaj paĝoj, 
restos ekster la bibliografio.  En tiaj okazoj, vi povas uzi ankaŭ 
fontindikon similan al la sekva:

 

```
  <fnt>
  <aut>Pavel Stan&amp;ccirc;ev, trad. Vedi</aut>,
  <vrk>
    <url ref="http://donh.best.vwh.net/.../kolora_knabino.html">La
    kolora knabino</url>
  </vrk>,
  <lok>Paco, 1989-2, p. 8a-9a</lok>
  </fnt>
```

 
  Rektaj krampoj ĉirkaŭas informon ne trovitan en la verko mem, 
  kiel sube la daton:
 

```
  <fnt>
  <aut>Amri Wandel</aut>,
  <vrk>La moderna astrofiziko</vrk>,
  <lok><url ref="http://esperanto.org/AEK/biblioteko.html">Virtuala
  Biblioteko de AEKo</url>, [vidita je 2006-01-24]</lok>
  </fnt>
```

## tradukoj

 
Simplajn tradukojn vi donas ene de strukturo senco, derivaĵo
aŭ simila per indiko de la ISO-kodo de la lingvo kaj la
traduka vorto.
 
```
<trd lng="de">am&amp;uuml;sieren</trd>
```
 
La diversaj tradukoj aperu en la artikolo ordigitaj laŭ
la lingvokodo, aliokaze ĉe multaj lingvoj oni iam perdas 
la superrigardon.
  
Ofte la tradukoj konsistas el pluraj vortoj kaj oni devas
marki la vorton, sub kiu la traduko aperu en la indekso de la koncerna
lingvo.
 
```
<trd lng="de">sich <ind>am&amp;uuml;sieren</ind></trd>
```
 
Se estas pluraj eblaj tradukoj oni grupigu ilin. Klarigojn,
kiuj helpas trovi la ĝustan tradukon oni ankaŭ  povas aldoni.
 
```
<trdgrp lng="de">
  <trd>Maulesel <klr>(de azenino)</klr></trd>,
  <trd>Maultier <klr>(de &amp;ccirc;evalino)</klr></trd>
</trdgrp>
```
 
Klarigojn, kiuj aperu en la lingvoindekso, sed ne
en la artikolo mem, oni donas tiel.
 
```
<trd>geben <klr tip="ind">(es gibt)</klr></trd>
```
 
Se ili aperu kaj en la lingvoindekso kaj en la
artikolo mem, oni povas skribi:
 
```
<klr tip="amb">...</klr>
```
 
Vi ankaŭ povas traduki ekzemplon aŭ parton de ekzemplo, 
se ĝi redonas tipan parolmanieron. La tradukatan parton de
la ekzemplo vi devas signi per la strukturilo `<ind>`.
 
```
<ekz>
  <ind>ne gravas</ind>
  <trd lng="de">macht nichts</trd>
</ekz>
```
 
Se la ekzemplo aŭ la traduko estas tro longaj por aperi tute 
en la indekso, vi povas provizi mallongigon, kiu laŭ sia tipo
aldonos tripunkton antaŭe kaj/aŭ malantaŭe.
 
```
<ekz>
  <ind>
    sed tio 
    <mll tip="fin">ne gravas</mll>
  </ind>!
  <trd lng="de">
    aber das 
    <mll tip="fin">macht nichts</mll>
  </trd>
</ekz>
```
 
Tio fariĝas "...macht nichts = ...ne gravas" en la indekso.


## referencoj
 
Referencoj servas por montri rilatojn de vorto 
al aliaj vortoj. Ekzistas diversaj eblaj rilatoj.
 
__supernocio/subnocio__
: Tiu rilato estas uzata por montri pli ĝeneralan vorton
 aŭ ekzemplon. (Hundo estas besto. Ekzemplo de besto estas hundo)

__parto/malparto__
: Tiu rilato estas uzata por montri, ke io estas parto de io
 alia. (Monato estas parto de jaro. Semajno konsistas el la semajnotagoj
 lundo, mardo, ...). Foje estas malfacile distingi tiun rilatotipon de
 la antaŭa. Provu tiukaze formuli frazon kun "ekzemplo" aŭ "konsistas
 el" aŭ "parto de", ofte tio helpas trovi la ĝustan rilaton.

__sinonimo/antonimo__
: Tiu rilato estas uzata por montri samsencajn aŭ malsamsencajn
 vortojn. (Monataĵo estas samsenca vorto kiel menstruo. Malo de
 konstrui estas detrui.)

__difina__
: Tiu rilato estas uzata, se vorto sinonima al alia, sed
pli malofta aŭ evitinda estas difinita per referenco al la 
pli uzinda vorto, sub kiu troviĝas la tuta difino. (En la tezaŭro
difina kaj sinonima referencoj estas traktitaj kiel ekvivalentaj)

__homonima__
: Tiu rilato estas uzata por atentigi pri samforma sed
alisignifa vorto, ekz. *ero* (parteto) kaj *ero* (tempodaŭro). 

__nespecifita__
: Ofte oni volas referenci al simila aŭ komparinda vorto, sed
  la rilato ne estas tre strikta (Fari, komparu al krei, konstrui.)

```
<!-- en la artikolo pri hundo -->
<ref tip="super" cel="best.o">besto</ref>

<!-- en la artikolo pri besto -->
<ref tip="sub" cel="hund.o">hundo</ref>

<!-- en la artikolo pri monato -->
<ref tip="malprt" cel="jar.0o">jaro</ref>

<!-- en la artikolo pri semajno -->
<ref tip="prt" cel="lund.0o">lundo</ref>

<!-- en la artikolo pri monataĵo -->
<ref tip="sin" cel="menstru.0o">menstruo</ref>

<!-- en la artikolo pri konstrui -->
<ref tip="ant" cel="detru.0i">detrui</ref>

<!-- en la artikolo pri Germanio -->
<ref tip="dif" cel="german1.0ujo">Germanujo</ref>

<!-- en la artikolo pri "er" -->
<ref tip="hom" cel="er1.0o">ero <klr>(tempolkalkulo)</klr></ref>

<!-- en la artikolo pri fari -->
<ref tip="vid" cel="kre.0i">krei</ref>
<!-- au -->
<ref cel="konstru.0i">konstrui</ref>
```
 
Ĉe la nespecifita tipo oni povas forlasi la tipon aŭ
uzi `vid`. En la unua okazo ne aperos referencsigno en
la artikolo en la dua okazo aperos sageto.
  
Se oni volas referenci al pluraj vortoj kun sama rilato
al la kapvorto oni povas grupigi tiujn referencojn.
 
```
<!-- en la artikolo pri semajno -->
<refgrp tip="prt">
  <ref cel="lund.0o">lundo</ref>,
  <ref cel="mard.0o">mardo</ref>,
  ktp.
</refgrp>

<!-- en la artikolo pri fari -->
<refgrp>
  <ref cel="kre.0i">krei</ref>,
  <ref cel="konstru.0i">konstrui</ref>
</refgrp>
```
 
Forlaso de la tipo ĉe referencgrupo signifas la implicitan
tipon `vid` kaj do antaŭ la referencoj aperos sageto.
  
*Noto*: Ene de difinoj la tipoj de referencoj ne estas indikitaj
per signo, ĉar tio ĝenas la fluan legadon. Tamen vi indiku la
tipon, ĉar ĝi povas esti uzata de programoj, kiuj analizas la
rilatojn inter vortoj.
 


## uzindikoj
 
Uzo indikas en kiu medio vorto estas uzata. Tio povas
rilati al fako, stilo, regiono, tempo ktp.:

```
<!-- arkaisma vorto el fako biologio -->
<drv mrk="krkspl.0o">
  <kap><tld/>o</kap>
  <uzo tip="fak">BIO</uzo>
  <uzo tip="stl">ARK</uzo>
  <uzo tip="klr">p.p. vertebruloj</uzo>
  ...
</drv>
```

