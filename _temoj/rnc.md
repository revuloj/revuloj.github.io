---
layout: page
title: Dokumentstrukturo (RelaxNG)
---
# RelaxNG-difino de strukturo de Voko-vortaro uzata en Reta Vortaro

<!-- kreita je 2024-08-14 el voko-grundo/dtd/vokoxml.rnc per voko-grundo/perl/rnc2md.pl -->

![ulmobranĉo](../assets/img/ulmo.jpg){: style="float: right; margin-left: 2em; max-width: 20%; border: solid gray 1px"}

# Enhavo

[► Strukturo de artikolo](#strukturo-de-artikolo)  
[► Strukturoj de detalaj elementoj](#strukturoj-de-detalaj-elementoj)

**Strukturelementoj (rekte uzeblaj en XML):**  
[adm](#adm-)&nbsp;| [alineo](#alineo-)&nbsp;| [art](#art-)&nbsp;| [aut](#aut-)&nbsp;| [autoro](#autoro-)&nbsp;| [baz](#baz-)&nbsp;| [bib](#bib-)&nbsp;| [bld](#bld-)&nbsp;| [ctl](#ctl-)&nbsp;| [dif](#dif-)&nbsp;| [drv](#drv-)&nbsp;| [ekz](#ekz-)&nbsp;| [em](#em-)&nbsp;| [epilogo](#epilogo-)&nbsp;| [esc](#esc-)&nbsp;| [fnt](#fnt-)&nbsp;| [frm](#frm-)&nbsp;| [g](#g-)&nbsp;| [gra](#gra-)&nbsp;| [ind](#ind-)&nbsp;| [k](#k-)&nbsp;| [kap](#kap-)&nbsp;| [ke](#ke-)&nbsp;| [klr](#klr-)&nbsp;| [lok](#lok-)&nbsp;| [lstref](#lstref-)&nbsp;| [mis](#mis-)&nbsp;| [mlg](#mlg-)&nbsp;| [mll](#mll-)&nbsp;| [mrk](#mrk-)&nbsp;| [nac](#nac-)&nbsp;| [nom](#nom-)&nbsp;| [ofc](#ofc-)&nbsp;| [parto](#parto-)&nbsp;| [pr](#pr-)&nbsp;| [precipa-parto](#precipa-parto-)&nbsp;| [prologo](#prologo-)&nbsp;| [rad](#rad-)&nbsp;| [ref](#ref-)&nbsp;| [refgrp](#refgrp-)&nbsp;| [rim](#rim-)&nbsp;| [sekcio](#sekcio-)&nbsp;| [snc](#snc-)&nbsp;| [sncref](#sncref-)&nbsp;| [sub](#sub-)&nbsp;| [subart](#subart-)&nbsp;| [subdrv](#subdrv-)&nbsp;| [subsnc](#subsnc-)&nbsp;| [sup](#sup-)&nbsp;| [tezrad](#tezrad-)&nbsp;| [titolo](#titolo-)&nbsp;| [tld](#tld-)&nbsp;| [trd](#trd-)&nbsp;| [trdgrp](#trdgrp-)&nbsp;| [ts](#ts-)&nbsp;| [url](#url-)&nbsp;| [uzo](#uzo-)&nbsp;| [var](#var-)&nbsp;| [vortaro](#vortaro-)&nbsp;| [vrk](#vrk-)&nbsp;| [vspec](#vspec-)&nbsp;| 

**Helpdifinoj (uzataj por difini la aranĝon de elementoj):**  
[indikiloj](#indikiloj-)&nbsp;| [dif-ref-parto](#dif-ref-parto-)&nbsp;| [dif-ref](#dif-ref-)&nbsp;| [difiniloj-supl](#difiniloj-supl-)&nbsp;| [referenciloj](#referenciloj-)&nbsp;| [tradukiloj](#tradukiloj-)&nbsp;| [unua-parto](#unua-parto-)&nbsp;| [sekva-parto](#sekva-parto-)&nbsp;| [tekst-stiloj](#tekst-stiloj-)&nbsp;| [fako](#fako-)&nbsp;| [art-marko](#art-marko-)&nbsp;| [drv-marko](#drv-marko-)&nbsp;| [snc-marko](#snc-marko-)&nbsp;| [marko](#marko-)&nbsp;| [prononco](#prononco-)&nbsp;| 

La [teĥnika manlibro](manlibro) montras al vi kiel en artikoloj kombini tiujn strukturelementojn pri la plej oftaj okazoj.


***
.  

## *KADRA STRUKTURO DE VORTARO*{: style="color: brown"}
***
### vortaro <a href="#enhavo">▲</a>


Radiko de la strukturarbo de vortaro. La elemento ampleksas
la tutan vortaron.<br/>
Ĝi entenas aŭ prologon, precipan parton kaj epilogon aŭ plurajn
artikolojn. Prologo kaj epilogo estas nedevigaj. La ebleco de rekta
enteno de artikolo ne estas destinita por kompletaj vortaroj, sed por
eltiroj aŭ unuopa artikolo.


```
vortaro =
  element vortaro {
    attlist-vortaro,
    ((prologo?, precipa-parto, epilogo?) | art+)
  }
attlist-vortaro &= empty
```

### prologo <a href="#enhavo">▲</a>


Prologo de la vortaro. Ĝi povas enteni la titolo(j)n 
kaj aŭtoro(j)n de la vortaro kaj aliajn tekstojn.


```
prologo =
  element prologo {
    attlist-prologo, (text | titolo | autoro | alineo)*
  }
attlist-prologo &= empty
```

### epilogo <a href="#enhavo">▲</a>


Epilogo de la vortaro. 
Ĝi povas enhavi iun tekston aŭ plurajn alineojn.


```
epilogo = element epilogo { attlist-epilogo, (text | alineo)* }
attlist-epilogo &= empty
```

### titolo <a href="#enhavo">▲</a>

Titolo de la vortaro. Ĝi estas entenata en la 
prologo. Pluraj titoloj estas permesitaj.


```
titolo = element titolo { attlist-titolo, text }
attlist-titolo &= empty
```

### autoro <a href="#enhavo">▲</a>

Indiko de aŭtoro(j) de la vortaro. 
Ĝi estas enhavata en la prologo kaj povas okazi tie plurfoje.


```
autoro = element autoro { attlist-autoro, text }
attlist-autoro &= empty
```

### alineo <a href="#enhavo">▲</a>

Unuopa alineo en la prologo- aŭ epilogo-teksto.


```
alineo = element alineo { attlist-alineo, (text | url)* }
attlist-alineo &= empty
```

### precipa-parto <a href="#enhavo">▲</a>

Precipa parto de la vortaro. Ĝi enhavas rekte ĉiujn
artikolojn aŭ sekciojn aŭ partojn. 
Diversaj partoj povas dividi diversajn lingvojn de la kapvortoj.
Sekcioj grupigas vortojn komenciĝantajn je sama litero.


```
precipa-parto =
  element precipa-parto {
    attlist-precipa-parto, (parto+ | sekcio+ | art+)
  }
attlist-precipa-parto &= empty
```

### parto <a href="#enhavo">▲</a>


Vortaroparto. Ĝi estas entenata en la precipa parto. Parto normale
prezentas unu lingvon en plurlingva vortaro aŭ lingvodirekton en
dulingva vortaro. Ĝia atributo <em>lng</em> indikas la lingvon de
la kapvortoj en la parto.


```
parto = element parto { attlist-parto, (sekcio+ | art+) }
attlist-parto &= attribute lng { text }?
```

### sekcio <a href="#enhavo">▲</a>

Sekcio en vortaro. Ĝi estas entenata en la precipa parto aŭ en
parto de ĝi kaj normale entenas ĉiujn artikolojn, kies kapvorto
komenciĝas je sama litero. La atributo <em>lit</em> indikas tiun
komencliteron.


```
sekcio = element sekcio { attlist-sekcio, art+ }
attlist-sekcio &= attribute lit { text }?
```

***
.  

## *STRUKTURO DE ARTIKOLO*{: style="color: brown"}
***
### _indikiloj_ <a href="#enhavo">▲</a>

Tuj post la kapvorto venas ordinare unue kelkaj indikiloj pri la 
[gra](#gra-)matiko, [uzo](#uzo-) k.a.


```
indikiloj = 
  fnt
  | gra
  | uzo
  | mlg
  | tezrad
```

### _dif-ref-parto_ <a href="#enhavo">▲</a>


Ĉe sinonimoj oni povas uzi referencon al alia vorto aŭ senco ([dif-ref](#dif-ref-)), kiu difinas ĝin.
Ĝin povas suplementi [indikiloj](#indikiloj-), aliaj [referenciloj](#referenciloj-), [rim](#rim-)arko, 
[tradukiloj](#tradukiloj-) kaj [adm](#adm-)inistra noto.


```
dif-ref-parto =
  indikiloj*,
  dif-ref,
  referenciloj*,
  rim*,
  tradukiloj*,
  adm*
```

### _dif-ref_ <a href="#enhavo">▲</a>


Foje la difino anstataŭiĝas per difina [ref](#ref-)erenco
aŭ grupo da ili ([refgrp](#refgrp-)). Oni uzas tiam la tipon <em>dif</em>.


```
dif-ref =
  element refgrp { attribute tip { "dif" },  (text? & ref+) }
  | element ref { attribute tip { "dif" }, attribute cel { text }, 
      (text | tld | klr | sncref)* }
```

### _difiniloj-supl_ <a href="#enhavo">▲</a>


Post difino povas veni diversaj suplementoj kiel [ekz](#ekz-)emploj, [referenciloj](#referenciloj-), 
bildoj ([bld](#bld-)), [rim](#rim-)arkoj...


```
difiniloj-supl =
  referenciloj
  | ekz
  | bld
  | rim
  | adm
```

### _referenciloj_ <a href="#enhavo">▲</a>


La referenciloj montras al rilataj vortoj kaj sencoj ([refgrp](#refgrp-), [ref](#ref-)), 
vortlistoj ([lstref](#lstref-)) aŭ al interreta paĝo ([url](#url-)).


```
referenciloj =
  ref
  | refgrp
  | lstref
  | url
```

### _tradukiloj_ <a href="#enhavo">▲</a>


La nacilingvaj tradukoj de la senco aŭ derivaĵo - unuopa ([trd](#trd-)) 
aŭ pluraj grupigite ([trdgrp](#trdgrp-)).


```
tradukiloj = 
  trdgrp
  | trd
```

### _unua-parto_ <a href="#enhavo">▲</a>


Unua parto de teksto en artikolo, derivaĵo aŭ senco, 
kiu venas antaŭ subdividoj, t.e. ekz. en derivaĵo tio, kio venas antaŭ sencoj.
Tio povas esti [indikiloj](#indikiloj-) kaj eble [dif](#dif-)ino.


```
unua-parto = 
  indikiloj*,
  dif?
```

### _sekva-parto_ <a href="#enhavo">▲</a>


Sekva parto de teksto en artikolo, derivaĵo aŭ senco venante post subdividoj,
kiu ekz. en derivaĵo venas post la sencoj. Ĝi konsistas el [difiniloj-supl](#difiniloj-supl-) kaj
[tradukiloj](#tradukiloj-), sekvata de [adm](#adm-)inistra noto. Ĉiuj partoj povas esti forlasitaj.


```
sekva-parto =
  difiniloj-supl*,
  tradukiloj*,
  adm*
```

### _tekst-stiloj_ <a href="#enhavo">▲</a>


La unuo [tekst-stiloj](#tekst-stiloj-) 
listigas ĉiujn strukturilojn, kiuj donas stilon al tekstoparto,
ekz. [em](#em-)fazita, citilita ([ctl](#ctl-)), [mis](#mis-)a, altigita ([sup](#sup-))
aŭ malaltigita ([sub](#sub-)) teksto kaj formulo ([frm](#frm-)).
Aliaj elementoj klarigo ([klr](#klr-)), tildo ([tld](#tld-)), 
sencreferenco ([sncref](#sncref-)), [nom](#nom-)o aŭ [nac](#nac-)ilingva esprimo
same povas esti multloke, do ankaŭ ili estas listigitaj tie ĉi.


```
tekst-stiloj = tld | sncref | klr | em | ts | sup | sub | ctl | mis| frm | nom | nac
```

### art <a href="#enhavo">▲</a>


Unuopa artikolo de la vortaro. Ĝi povas okazi en
[vortaro](#vortaro-) (se ne ekzistas precipa-parto),
[precipa-parto](#precipa-parto-), [parto](#parto-) aŭ [sekcio](#sekcio-). Tio
dependas de la konkreta strukturo de la vortaro. Ĉiu artikolo
entenas unue kapvorton kaj poste aŭ priskribajn elementojn aŭ plurajn
derivaĵojn aŭ plurajn sencojn de la kapvorto aŭ subartikolojn.


```
art =  
  element art {
    attlist-art, 
    art-kap, 
    unua-parto,
    (subart | drv | snc)*,
    sekva-parto
  }
attlist-art &= attribute mrk { art-marko }
```

### subart <a href="#enhavo">▲</a>


Subartikolo. Ĝi povas okazi en [art](#art-),
se la signifoj de vorto (ofte ĉe prepozicioj kaj afiksoj) estas
tre diversaj.


```
subart =
  element subart { 
    attlist-subart, 
    unua-parto,
    (drv | snc)*,
    sekva-parto 
  }
attlist-subart &= attribute mrk { drv-marko }?
```

### drv <a href="#enhavo">▲</a>


Derivaĵo ene de artikolo. Unu artikolo povas priskribi plurajn
derivaĵojn de la kapvorto. Derivaĵo komenciĝas je kapvorto kaj
priskribaj elementoj pri ĝi aŭ el unu aŭ pluraj sencoj aŭ el unu aŭ
pluraj subdividoj [subdrv](#subdrv-).

La enhavo de derivaĵo povas obei al unu el du modeloj:
1. Ordinare komence estas [unua-parto](#unua-parto-) sekvata de sencoj aŭ subderivaĵoj
kaj poste [sekva-parto](#sekva-parto-). 
2. En kelkaj okazoj ni difinas per referenco
al alia vorto kaj aldonas nur indikilojn, vd. [dif-ref-parto](#dif-ref-parto-).


```
drv =
  element drv {
    attlist-drv, 
    drv-kap, 
    (dif-ref-parto |
      (
        unua-parto,
        (subdrv | snc)*,
        sekva-parto
      )
    )
  }
attlist-drv &= attribute mrk { drv-marko }
```

### var <a href="#enhavo">▲</a>


Variaĵo de la vorto, ekz. meĥaniko - mekaniko, pomarbo -
pomujo. Ĝi povas enhavi fontindikon k.s., sed ankaŭ rimarkojn 
kaj ekzemplojn, sed ĝi ne havas propran difinon. Ĝi aperas ene
de kapvorto, ĉar ĝi ja estas ĝia variaĵo.


```
art-var = element var { attlist-var, art-kap, (uzo | klr | ekz | rim)* }
drv-var = element var { attlist-var, drv-kap, (uzo | klr | ekz | rim)* }
attlist-var &= empty
```

### subdrv <a href="#enhavo">▲</a>


Subderivaĵo. Ĝi grupigas plurajn proksimajn sencojn, se la
priskribita vorto havas tre multajn sencojn. Tio povas
rezulti en pli klara strukturo de la artikolo. La subdividaĵoj
estas nombrataj per A), B), ...

La enhavo de subderivaĵo povas obei al unu el du modeloj:
1. Ordinare komence estas [unua-parto](#unua-parto-) sekvata de sencoj 
kaj poste [sekva-parto](#sekva-parto-). 
2. En kelkaj okazoj ni difinas per referenco
al alia vorto kaj aldonas nur indikilojn, vd. [dif-ref-parto](#dif-ref-parto-).


```
subdrv =
  element subdrv { 
    attlist-subdrv, 
    (dif-ref-parto |
      (
        unua-parto,
        (snc)*,
        sekva-parto
      )
    )
  }
attlist-subdrv &= attribute mrk { snc-marko }?
```

### snc <a href="#enhavo">▲</a>


Senco de unuopa vorto en artikolo. Komparu la latinajn ciferojn en
la artikoloj de PIV. 

Per <em>mrk</em> (vd [snc-marko](#snc-marko-)) 
oni povas referenci sencon de alie. Per <em>ref</em> oni
referencas al alia senco samartikola (uzata en malmultaj longaj artikoloj, ekz.
"al"). Per <em>num</em> oni povus atribui al la senco fiksitan numeron, 
sed tion ni normale ne uzas, ni lasas tion al la aŭtomata numerado.

La enhavo de senco povas obei al unu el du modeloj:
1. Ordinare komence estas [unua-parto](#unua-parto-) eble sekvata de subsencoj 
kaj poste [sekva-parto](#sekva-parto-). 
2. En kelkaj okazoj ni difinas per referenco
al alia vorto kaj aldonas nur indikilojn, vd. [dif-ref-parto](#dif-ref-parto-).


```
snc = 
  element snc { 
    attlist-snc, 
    (dif-ref-parto |
      (
        unua-parto,
        (subsnc)*,
        sekva-parto
      )
    )
  }
attlist-snc &=
  attribute mrk { snc-marko }?,
  attribute num { text }?,
  attribute ref { text }?
```

### subsnc <a href="#enhavo">▲</a>


Subsenco ene de senco. Ĝi redonas subtilaĵojn ene de unu senco.
Ili estas nombrataj per a), b), ...

La enhavo de subsenco povas obei al unu el du modeloj:
1. Ordinare komence estas [unua-parto](#unua-parto-)  
kaj poste [sekva-parto](#sekva-parto-). 
2. En kelkaj okazoj ni difinas per referenco
al alia vorto kaj aldonas nur indikilojn, vd. [dif-ref-parto](#dif-ref-parto-).


```
subsnc = 
  element subsnc { 
    attlist-subsnc, 
    (dif-ref-parto |
      (
        unua-parto,
        sekva-parto
      )
    )
  }
attlist-subsnc &=
  attribute mrk { marko }?,
  attribute ref { text }?
```

### sncref <a href="#enhavo">▲</a>


Referenco al alia senco. Tiu elemento estas anstataŭigata
per la numero de la referencita senco. Vi povas forlasi la atributon 
ref, se ekzistas parenca elemento ref, kies atributo cel montras al la
referencita senco.


```
sncref = element sncref { attlist-sncref, empty }
attlist-sncref &= attribute ref { text }?
```

***
.  

## *STRUKTUROJ DE DETALAJ ELEMENTOJ*{: style="color: brown"}
***
### _fako_ <a href="#enhavo">▲</a>


Fakoj estas tri- aŭ kvarlingvaj majusklaj etikedoj difinitaj en la
<a href="fakoj.html">listo de fakoj</a>


```
fako = xsd:string { pattern = "[A-Z]{3,4}" }
```

### _art-marko_ <a href="#enhavo">▲</a>


La marko identigas la artikolon unike. Ĝi estu identa kun la dosiernomo sen la '.xml'.
Por uzo de versiokontrolo CVS en Revo uziĝas por novaj artikoloj 
anstataŭe $Id$ kiun CVS etendas al kompleta versioindiko.


```
art-marko = xsd:string { pattern = "$Id$|($Id: )?([a-z0-9_]+)(.xml)?.*" }
```

### _drv-marko_ <a href="#enhavo">▲</a>


La marko de derivaĵo konsistas el dosiernomo, punkto kaj aldono, donanta la
kapvorton, kie la radikon anstataŭ tildon oni montras per '0', ekz.
'hom.0o', 'berlin.B0o'.


```
drv-marko = xsd:ID { pattern = "([a-z0-9_]+)\.[A-Za-z_]*0[A-Za-z_0]*(\.[A-Za-z_0-9]+)?" }
```

### _snc-marko_ <a href="#enhavo">▲</a>


La marko de senco konsistas el la marko de la derivaĵo, punkto kaj
identigilo de la senco, ekz. 'ord.0o.BIO', 'azen.0o.figure'.


```
snc-marko = xsd:ID { pattern = "([a-z0-9_]+)\.[A-Za-z_]*0[A-Za-z_0]*\.[A-Za-z_0-9]+" }
```

### _marko_ <a href="#enhavo">▲</a>


La marko identigas 'nodon' de la vortaro, ekz. artikolon, derivaĵon, sencon aŭ rimarkon,
kiun oni povas referenci de alia loko en la vortaro per la sama marko.


```
marko = xsd:ID { pattern = "([a-z0-9_]+)\.[A-Za-z0-9\._]+" }
```

### _prononco_ <a href="#enhavo">▲</a>


La pronco povas esti donita aŭ per latinaj literoj (kun supersignoj)
per hiragano, katakano aŭ bopomofo kaj kelkaj apartaj signoj


```
prononco = xsd:string { pattern = "[\p{IsBasicLatin}\p{IsLatin-1Supplement}\p{IsLatinExtended-A}\p{IsLatinExtended-B}]+|\p{IsBopomofo}+|[\s\p{IsHiragana}\p{IsKatakana}\p{IsCJKSymbolsandPunctuation}\p{IsHalfwidthandFullwidthForms}]+" }
```

### kap <a href="#enhavo">▲</a>


Kapvorto okazas en du kuntekstoj -- komence de artikolo
kaj komence de derivaĵo, en la unua kazo ĝi signas radikon
en la dua kazo ĝi konsistas el iuj literoj kaj eble tildo
refencanta al la kapvorto, krome en la kapvorto povas okazi
fontindiko.


```
art-kap = element kap { attlist-kap, (text | rad | ofc | fnt | tld | art-var)* }
drv-kap = element kap { attlist-kap, (text | ofc | fnt | tld | drv-var)* }
attlist-kap &= empty
```

### rad <a href="#enhavo">▲</a>


Radiko de kapvorto. Ĝi estas bezonata por anstaŭigo
de tildoj. Sekve la "radiko" de afiksoj kaj finaĵoj estu
ili mem, sen la streketoj antaŭe aŭ malantaŭe.
La atributo <em>var</em> povas identigi radikon de variaĵo.


```
rad = element rad { attlist-rad, text }
attlist-rad &= attribute var { text }?
```

### ofc <a href="#enhavo">▲</a>


Oficialeco de la kapvorto/derivaĵo, 
povas esti *, 1, ..., 9, 10, 11 
aŭ por kelkaj esceptoj jarnombro kiel 1953 (analoga, -end, mis-)
en iuj okazoj oficialeco povas esti en krampoj (analogio, koncentra)


```
ofc = 
  element ofc { 
    attlist-ofc, 
    xsd:string { pattern="\*|\(?[1-9]\)?|1[0-1]|19[0-9]{2}" } 
  }
attlist-ofc &= empty
```

### fnt <a href="#enhavo">▲</a>


Fonto enhavas informojn pri aŭtoro, verko, trovloko
aŭ aliajn informojn.


```
fnt = element fnt { attlist-fnt, (text | bib | aut | vrk | lok | url)* }
attlist-fnt &= empty
```

### gra <a href="#enhavo">▲</a>


Kiel grammatikaj informoj momente estas permesataj
nur indiko de la vortspeco aŭ simpla teksto


```
gra = element gra { attlist-gra, (text | vspec)* }
attlist-gra &= empty
```

### vspec <a href="#enhavo">▲</a>


Vortspeco. Ekz. subst. por substantivo; tr/ntr
por transitivaj kaj netransitivaj verboj ktp.


```
vspec = element vspec { 
  attlist-vspec, 
  (
    ("tr"|"ntr"|"x"|"abs.") 
  | ("subst."|"substantivo") 
  | ("adj."|"adjektivo") 
  | ("adv."|"adverbo") 
  | ("artikolo"|"determinilo")
  | ("interj."|"interjekcio"|"ekkrio"|"sonimito") 
  | ("konj."|"konjunkcio") 
  | ("subordigilo") 
  | ("pref."|"prefikso") | ("suf."|"sufikso") 
  | ("prep."|"prepozicio") | "prepoziciaĵo"
  | ("pron."|"pronomo") 
  ) 
  }
attlist-vspec &= empty
```

### uzo <a href="#enhavo">▲</a>


La uzo povas esti stilo, fako, regiono aŭ alia klarigo,
kiel estas uzata la vorto aŭ termino. Por la fakoj kaj stiloj uzu
unu el la aliloke listigitaj mallongigoj.


```
uzo = element uzo { attlist-uzo, (text | tld)* }
attlist-uzo &= attribute tip { "fak" | "reg" | "klr" | "stl" }?
```

### dif <a href="#enhavo">▲</a>


Difino estas la frazo difinanta la vorton, sencon aŭ
subsencon. Ĝi povas esti ankaŭ en alia(j) lingvo(j) ol la vorto
mem. La lingvon indikas la atributo <em>lng</em>.


```
dif =
  element dif {
    attlist-dif,
    (text | trd | trdgrp | ref | refgrp | ke | dif-ref | ekz | snc | tekst-stiloj)*
  }
attlist-dif &= attribute lng { text }?
```

### ekz <a href="#enhavo">▲</a>


Ekzemplo konsistas el ekzemplofrazo,
klarigoj kaj fonto.


```
ekz =
  element ekz {
    attlist-ekz,
    (text
     | fnt
     | uzo
     | ref
     | refgrp
     | dif-ref
     | ind
     | trd
     | trdgrp
     | esc
     | tekst-stiloj)*
  }
attlist-ekz &= attribute mrk { marko }?
```

### rim <a href="#enhavo">▲</a>


Rimarko povas enhavi iujn indikojn pri la vorto aŭ
senco, krome referencojn, ekzemplojn, emfazitajn partojn.


```
rim =
  element rim {
    attlist-rim, (text | ref | refgrp | ke | ekz | aut | fnt | esc | tekst-stiloj)*
  }
attlist-rim &=
  attribute num { text }?,
  attribute mrk { marko }?
```

### refgrp <a href="#enhavo">▲</a>


Referencgrupo grupigas plurajn samtipajn
referencojn. La tipon indikas la atributo <em>tip</em>.
Tiukaze ne uzu la atributon <em>tip</em> en la subelementoj
[ref](#ref-)!


```
refgrp = element refgrp { attlist-refgrp, (text? & ke* & ref+) }
attlist-refgrp &=
  [ a:defaultValue = "vid" ]
  attribute tip {
    "vid"
    | "hom"
    | "sin"
    | "ant"
    | "super"
    | "sub"
    | "prt"
    | "malprt"
    | "lst"
    | "ekz"
  }?
```

### ref <a href="#enhavo">▲</a>


Referenco montras al alia, simil- aŭ alisignifa vorto,
oni povas distingi diversajn rilattipojn al la
referencita vorto. La enhavo de la referenco estas tio, kio
aperas en la legebla teksto. La referencitan vorton mem
oni difinas per la atributo <em>cel</em>. La celon oni plej
bone difinas per: radiko.derivaĵo.difino, oni povas uzi
la numeron de la difino aŭ derivaĵo. Plej bone oni
generas la markojn (t.e. la eblaj celoj de referenco)
aŭtomate por minimumigi erarojn.
La atributoj <em>lst</em> kaj <em>val</em> servas por referenci al vortlisto (<em>tip="lst"</em>),
ekz. monatoj. Se temas pri ordigita listo, vi povas indiki valoron per <em>val</em>,
ekz. "3" ĉe la monato marto.


```
ref = element ref { attlist-ref, (text | tld | klr | sncref)* }
attlist-ref &=
  attribute tip {
    "vid"
    | "hom"
    | "sin"
    | "ant"
    | "super"
    | "sub"
    | "prt"
    | "malprt"
    | "lst"
    | "ekz"
  }?,
  attribute cel { text },
  attribute lst { text }?,
  attribute val { text }?
```

### lstref <a href="#enhavo">▲</a>


Referenco al vortlisto el artikolo.


```
lstref = element lstref { attlist-lstref, (text | tld | klr)* }
attlist-lstref &= attribute lst { text }
```

### tezrad <a href="#enhavo">▲</a>


Tezaŭraradiko. La kapvorto aperas en la enirlisto
de la tezaŭro. Se vi uzas la atributon <em>fak</em>, 
ĝi aperas en la struktura enirlisto de la fako.


```
tezrad = element tezrad { attlist-tezrad, empty }
attlist-tezrad &= attribute fak { fako }?
```

### trdgrp <a href="#enhavo">▲</a>


Tradukgrupo kunigas diversajn tradukojn de
sama lingvo.


```
trdgrp = element trdgrp { attlist-trdgrp, (text | trd)* }
attlist-trdgrp &= attribute lng { text }
```

### trd <a href="#enhavo">▲</a>


Traduko kosistas el traduka vorto aŭ frazo
kaj klarigoj, poste povos sekvi aliaj elementoj.
Per la atributo <em>fnt</em> oni povas indiki kie
oni trovis la tradukon.
La atributo <em>kod</em> estas uzebla por aldoni
komputile interpreteblan kodon - ni uzas tion por gestolingvo.


```
trd = element trd { attlist-trd, (text | klr | ind | pr | mll | ofc | baz)* }
attlist-trd &=
  attribute lng { text }?,
  attribute fnt { text }?,
  attribute kod { text }?
```

### ind <a href="#enhavo">▲</a>


Parto de traduko, kiu liveras la kapvorton en la
indekso, do &lt;trd&gt;sich &lt;ind&gt;bem&uuml;hen&lt;/ind&gt;&lt;/trd&gt;
aperas sub bem&uuml;hen. Aŭ parto de ekzemplo aŭ bildpriskribo, al
kiu rilatas internaj tradukoj ktp.


```
ind = element ind { attlist-ind, (text | tld | klr | mll)* }
attlist-ind &= empty
```

### pr <a href="#enhavo">▲</a>


Prononco/transskribo, kiel oni uzas por japanaj lingvoj (pinjino, bopomofo, hiragano ks)
aŭ fonetikaj indikoj de nomoj.
Se traduko havas transskribon, ni uzos tiun por la indeksado/enordigo en literĉaptiron de la indekso.
Pro la limigita nombro de literoj/literumaj signoj, tio ebligas ĉapitrigi la lingvoindeksojn de
silabaj lingvoj. Ankaŭ ni ebligas serĉadon laŭ transskribo aldone al la ideografia skribmaniero.


```
pr = element pr { attlist-pr, prononco }
attlist-pr &= empty
```

### mll <a href="#enhavo">▲</a>


Mallongigita traduko, por ekz. ne montri tutan frazon en la indekso oni
povas aperigi tie nur komencon, finon aŭ mezon.


```
mll = element mll { attlist-mll, (text | tld | klr | ind)* }
attlist-mll &= attribute tip { "kom" | "mez" | "fin" }?
```

### baz <a href="#enhavo">▲</a>


Baza formo de traduko, sub kiu la vorto subordiĝos en la indekso.
Tion ni uzas ekzemple en la indonezia indekso, kie sub "ajar" aperas "belajar", "mengajar" ktp. 


```
baz = element baz { attlist-baz, text* }
attlist-baz &= empty
```

### ke <a href="#enhavo">▲</a>


Komunlingva esprimo, per kiu oni povas anstataŭigi la (fakan, tre specialan) kapvorton en
pli simpla komuna lingvo.
Tiu esprimo povas konsisti el teksto kaj eventuale enhavi <em>ref</em>erencon. Ĝi
povas aperi ene de <em>dif</em>ino, <em>rim</em>marko kaj referencgrupo ([refgrp](#refgrp-)).


```
ke = element ke { attlist-ke, (text | ref | dif-ref)* }
attlist-ke &= empty
```

### bld <a href="#enhavo">▲</a>


Bildo povas ilustri iun vorton aŭ sencon. Per la
atributo <em>lok</em> ĝi
referencas al ekstera dosiero, kiu entenas la bildon.
Per <em>alt</em> aŭ <em>lrg</em> vi povas doni fiksan formaton.
Per <em>tip</em> vi donas tipon de la bildo, t.e. <em>img</em>
por JPEG, GIF, PNG-bildo, <em>svg</em> por SVG-vektorgrafiko.
Per [fnt](#fnt-) vi donas fonton kaj <em>prm</em> la permesilon
laŭ kiu la bildo rajtas esti uzata (vd ĉe Wikimedia Commons).


```
bld =
  element bld {
    attlist-bld, (text | tld | klr | fnt | mrk | ind | trd | trdgrp)*
  }
attlist-bld &=
  attribute lok { xsd:anyURI },
  attribute mrk { marko }?,
  [ a:defaultValue = "img" ] attribute tip { "img" | "svg" }?,
  attribute alt { xsd:int }?,
  attribute lrg { xsd:int }?,
  attribute prm { text }?
```

### mrk <a href="#enhavo">▲</a>


Per la elemento <em>mrk</em> oni povas marki lokon en bildo per ia
kadro, kies pozicio kaj aspekto estas priskribita en la atributo <em>stl</em>
per la rimedoj de CSS. Per la atributo [cel](#cel-) oni povas aldoni 
referencon al iu kapvorto de Revo.
Cetere bildo-marko povas enhavi tekston kaj/aŭ referencojn.


```
mrk =
  element mrk {
    attlist-mrk, (text | ref)*
  }
attlist-mrk &= 
  attribute stl { text },
  attribute cel { text }?  
```

### adm <a href="#enhavo">▲</a>


Administraj informoj estu por redaktado. Ili enhavas tekston kaj eventuale aŭtoron.
Cetere ili povus enhavi informojn pri kreodato, ŝanĝdato, eraroj kaj
plibonigproponoj pri artikolo. Ĝia strukturo do ankoraŭ estas
diskutatebla.


```
adm = element adm { attlist-adm, (text | aut)* }
attlist-adm &= empty
```

### tld <a href="#enhavo">▲</a>


Tildo rilatas al la radiko, donita en la kapvorto
ĝi ne bezonas enhavon. La atributo <em>lit</em> indikas alian
komencliteron ol havas la radiko, grava por majuskligo kaj
minuskligo.
La atributo <em>var</em> povas identigi radikon de variaĵo.


```
tld = element tld { attlist-tld, empty }
attlist-tld &= 
  attribute lit { text }?,
  attribute var { text }?
```

### klr <a href="#enhavo">▲</a>


Klarigo pri vorto, difino, ekzemplo ktp.
Klarigoj en tradukoj povas esti provizitaj per atributo <em>tip</em>
Ĉe tip='ind' la klarigo aperas en la indekso, sed ne en la artikolo.
Ĉe tip='amb' ĝi ankaŭ aperas en la artikolo.
Sen la atributo, aktuale ĝi aperas en la serĉrezultoj kaj artikolo, sed
ne en la lingvo-indekso (eble ni ŝanĝos tion estonte)


```
klr =
  element klr {
    attlist-klr,
    (text | trd | trdgrp | ekz | ref | refgrp | esc | tekst-stiloj)*
  }
attlist-klr &= attribute tip { "ind" | "amb" }?
```

### bib <a href="#enhavo">▲</a>


Bibliografia indiko por fonto, estas mallongigo el
listo de difinitaj bibliografieroj kaj anstataŭas verko- kaj aŭtoroindikon
en la fontoj.


```
bib = element bib { attlist-bib, text* }
attlist-bib &= empty
```

### vrk <a href="#enhavo">▲</a>


Verko, en kiu troviĝas citita frazo aŭ vorto


```
vrk = element vrk { attlist-vrk, (text | url)* }
attlist-vrk &= empty
```

### lok <a href="#enhavo">▲</a>


Loko, kie troviĝas citita frazo aŭ vorto en verko


```
lok = element lok { attlist-lok, (text | url)* }
attlist-lok &= empty
```

### aut <a href="#enhavo">▲</a>


Aŭtoro de citita frazo aŭ verko


```
aut = element aut { attlist-aut, text }
attlist-aut &= empty
```

### frm <a href="#enhavo">▲</a>


Matematika aŭ kemia formulo, por matematikaj formuloj oni povas
ankaŭ doni esprimon laŭ sintakso de AsciiMath por pli bela kompostado


```
frm = element frm { attlist-frm, (text | sup | sub | g | k)* }
attlist-frm &= attribute am { text }?
```

### g <a href="#enhavo">▲</a>


Grasa parto de formulo, ekz. vektoro, matrico k.s.,
bv. uzi nur en frm


```
g = element g { attlist-g, text* }
attlist-g &= empty
```

### k <a href="#enhavo">▲</a>


Kursiva parto de formulo, ekz. variablo k.s.,
bv. uzi nur en frm


```
k = element k { attlist-k, text* }
attlist-k &= empty
```

### em <a href="#enhavo">▲</a>


Emfazo. Normale grase skribata vortoj.


```
em = element em { attlist-em, (text | tld)* }
attlist-em &= empty
```

### ts <a href="#enhavo">▲</a>


Trastrekita teksto, ekz-e por montri korekton en misskribita citaĵo.


```
ts = element ts { attlist-ts, (text | tld)* }
attlist-ts &= empty
```

### sup <a href="#enhavo">▲</a>


Altigita teksto, ekz. en ĥemiaj formuloj


```
sup = element sup { attlist-sup, (text | g | k)* }
attlist-sup &= empty
```

### sub <a href="#enhavo">▲</a>


Malaltigita teksto, ekz. en ĥemiaj formuloj


```
sub = element sub { attlist-sub, (text | g | k)* }
attlist-sub &= empty
```

### ctl <a href="#enhavo">▲</a>


Citilita teksto, ekz. memindika uzo de vorto


```
ctl = element ctl { attlist-ctl, (text | tld | em | ts | frm | nom | nac | esc)* }
attlist-ctl &= empty
```

### mis <a href="#enhavo">▲</a>


Misstila teksto, ekz. malĝusta, arĥaika kc


```
mis = element mis { attlist-mis, (text | tld | em | ts | frm | nom | nac | esc)* }
attlist-mis &= empty
```

### nom <a href="#enhavo">▲</a>


Nomo ne-esperantigita, ignorata dum vortkontrolo
ekz. "Karl Bein"


```
nom = element nom { attlist-nom, text* }
attlist-nom &= empty
```

### nac <a href="#enhavo">▲</a>


Nacilingva vorto aŭ esprimo, ignorata dum vortkontrolo
ekz. "powerful"


```
nac = element nac { attlist-nac, text* }
attlist-nac &= empty
```

### esc <a href="#enhavo">▲</a>


Escepta vorto aŭ esprimo laŭ vortanaliza gramatiko, 
ekz. "vivipova" (anst. "pova vivi" aŭ "vivopova"), "ĵusfarita" (anst. "ĵus farita")


```
esc = element esc { attlist-esc, text* }
attlist-esc &= empty
```

### url <a href="#enhavo">▲</a>


Referenco al iu ekstera dosiero. En la HTML-versio de vortaro
tio fariĝas &lt;a href=...&gt; Anstataŭ la TTT-ejo prefere uzu
la alinomojn difinitajn en la DTD, ĉar alikaze la referencoj tro
ofte malvalidiĝus.


```
url = element url { attlist-url, text }
attlist-url &= attribute ref { xsd:anyURI }?
```

### mlg <a href="#enhavo">▲</a>


Mallongigo de la kapvorto, ekz. ĉe nomoj de organizaĵoj. 
Per <em>kod</em> vi povas indiki devenon de la mallongigo, ekz. ISO-3166 ĉe landokodoj


```
mlg = element mlg { attlist-mlg, text }
attlist-mlg &= attribute kod { text }?
```

