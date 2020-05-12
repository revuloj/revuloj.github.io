---
layout: page
title: Helpo pri Revo-Servo
---

![shtupoj](../assets/img/shtupoj.jpg){: style="float: right; margin-left: 2em; max-width: 50%; border: solid gray 1px"}

* Enhavo
{:toc}

Revo-Servo estas retpoŝta servo, kiu akceptas redaktitajn
artikolojn kaj post sintaksa kontrolo enmetas ilin en la
vortaron.
Por uzi la servon vi devas esti inter la redaktantaro de
Reta Vortaro. Por aliĝi kiel redaktanto, petu ĉe la 
administranto (vd. malsupre).

<br clear="all"/>

## Kiel uzi la servon por redakti artikolon

Vi povas uzi la Revo-Servon per la TTT-formularo. Sekvu
la ligon |redakti...| malsupre de ĉiu artikolo. En la formularo
vi povas ŝanĝi la tekston de la artikolo. Se vi premas
"Sendu", via TTT-legilo sendas la artikolon al
la servo.

Por ampleksaj redaktoj cetere ni havas pli [komfortan redaktilon](https://revaj.steloj.de).

Ankaŭ eblas elŝuti la XML-tekston de la artikolo, redakti
ĝin kaj sendi mesaĝon al &lt;revo(ĉe)retavortaro.de&gt; kun la sekva enhavo:

```
redakto: jen koncize kaj precize priskribu, kion vi ŝanĝis en la artikolo

<?xml ... (sekvas la artikolo)
...
</vortaro>
```

La strekojn ne enmetu en la mesaĝo, `redakto:` estu la unua
vorto sur la unua linio. La tekston vi ankaŭ povas alpendigi anstataŭ
meti en la ĉefan parton de la mesaĝo.


## Kiel uzi la servon por aldoni novan artikolon


Redaktu la novan artikolon kaj sendu ĝin kiel tekstan retleteron al 
&lt;revo(ĉe)retavortaro.de&gt;. La sekva ekzemplo kun la fikcia vorto "veloĉiptero" 
montras la bazan ŝablonon:

```
aldono: velocxipter

 <?xml version="1.0"?>
 <!DOCTYPE vortaro SYSTEM "../dtd/vokoxml.dtd">

 <vortaro>
 <art mrk="$Id$">
 <kap>
     <rad>velo&ccirc;ipter</rad>/o <fnt><bib>PIV1</bib></fnt>
 </kap>
 <drv mrk="velocxipter.0o">
     <kap><tld/>o</kap>
     <snc mrk="velocxipter.0o.AVI">
       <uzo tip="fak">AVI</uzo>
       <dif>
        Flugaparato kiun oni pelas per pedaloj:
         <ekz>
          ...
         </ekz>
       </dif>
     </snc>
     <trd lng="pt">velociptero</trd>
 </drv>
 </art>
 </vortaro>
```


`aldono:` estu la unua vorto sur la unua linio, kaj ĝin sekvu la nomo 
de la nova artikol-dosiero (ordinare la unuaj literoj de la radiko
sekvate laŭbezone de cifero). Tiu nomo ankaŭ estas la unua parto de la 
"mrk"-atributoj de derivaĵoj.


## Kiam Revo-Servo traktos vian artikolon

ReVo-Servo aŭtomate funkcias pli malpli
ĉiuhore por trakti alvenantajn artikolojn. La tuta vortaro
kun ĉiuj indeksoj rekreiĝas ĉiunokte laŭ eŭropa tempo.

Se vi estas redaktanto, vi devus ricevi respondon pri ĉiu
sendita mesaĝo aŭ konfirman aŭ informantan pri eraro. Se vi
ne ricevos respondon dum longa tempo, vi informu min, eble
temas pri eraro.

La redaktita artikolo estos legebla en Interreto normale
tuj post kiam ĝi traktiĝis de Revo-Servo.

<p align="right">
  22.10.1999, Wolfram Diestel
</p>

  (*Noto*: Mi iomete adaptis la tekston lastfoje fine de 2017, sed ne tro, ĉar ĝi
  dokumentas la tagon, en kiu ekfunkciis la retpoŝta redaktoservo, do kiam Revo ekfunkciis kiel publike redaktebla
  retvortaro. Nurlega servo jam ekfunkciis finde de 1997.  Unua versio arĥivita en la Interretarĥivo troviĝas je la
  <a href="https://web.archive.org/web/20000819043436/http://www.uni-leipzig.de:80/esperanto/voko/revo/">7a de Aprilo 2000</a>)



| administranto de Reta Vortaro | Wolfram Diestel &lt;wolfram(ĉe)steloj.de&gt; 
| retpoŝta rondo de redaktantoj | &lt;revuloj(ĉe)groups.io&gt; |
| adreso de ReVo-servo          | &lt;revo(ĉe)retavortaro.de&gt; (nur por redaktitaj artikoloj) |

