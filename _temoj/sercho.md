---
layout: page
title: Alternativaj serĉmetodoj
---

## Ordinara serĉo

En Reta Vortaro vi povas serĉi je esperantaj vortoj same kiel je iliaj tradukoj. Por serĉi en tradukoj vi antaŭelektu la traserĉeblajn lingvojn per la listo, kiu aperas klakante sur la piedlinian eron "preferoj" en arbitra artikolo.

Por serĉi en aliaj ol la preferataj lingvoj vi povas aŭ provizore sammaniere aldoni ilin aŭ trafolii la lingvo-indeksojn.

Atentu, ke la ordinara serĉo estas vortkomenca. Do tajpante "kor" vi trovas ĉiujn kapvortojn inkluzive derivaĵojn kaj frazaĵojn, kiuj komenciĝas je "kor...". Por eviti tin vi povas uzi la ĵokeran aŭ regulespriman serĉon (vidu malsupre).

Krom uzi la indeksojn kaj la precipan serĉon de Reta Vortaro vi povas utiligi ankaŭ ĝeneralajn serĉilojn kiel
[Google](https://google.com?q=hipocikloido+site:reta-vortaro.de&hl=eo), 
[Ecosia](https://ecosia.org/search?q=hipocikloido+site:reta-vortaro.de), 
[DuckDuckGo](https://duckduckgo.com/?q=hipocikloido+site:reta-vortaro.de) k.a.

Ili permesas aldoni esprimon `site:reta-vortaro.de` por limigi la serĉon al la retejo de Reta Vortaro, aŭ eĉ pli precize `site:reta-vortaro.de/revo/art` por limigi al ties artikoloj. Tiel vi havas plentekstan serĉon en Reta Vortaro kun la 
malgranda malavantaĝo, ke eble vi ne serĉas laŭ la plej aktuala enhavo de la artikoloj, ĉar la serĉiloj nur de tempo al tempo vizitas Retan Vortaron por trarigardi ties enhavon kaj aktualigi la proprajn indeksojn.

Por faciligi al vi la uzon de tiaj ĝeneralaj serĉiloj ni aldonis kelkajn sur la titolpaĝo de Revo, sed vi ne nepre devas unue aliri la centran retpaĝon de Revo por tajpi vian serĉon. Pluraj retumiloj, kiel ekzemple Fajrovulpo, permesas aldoni la serĉmetodojn specifitajn por Reta Vortaro en sia navig-fenestro.

![Aldoni Serĉilon por Revo en Fajrovulpo](../assets/img/aldoni_revo_serchon.png)

## Serĉi per ĵokersignoj

Vi povas ankaŭ uzi ĵokersignojn en via serĉesprimo: Substreko `_` signifas iun ajn signon: `k_r_` trovas i.a. "kara", "kero", "koro" kaj "kuri". Procentosigno `%` anstataŭas iujn ajn signovicojn inkluzive la malplenan. Do `k%` trovas ĉiujn vortojn komenciĝantajn per "k" kaj `%o` trovas ĉiujn ajn vortojn finiĝantajn per "o", dum `k%o` kombinas ambaŭ serĉojn. Atentu, ke uzante ĵokersignon en via serĉesprimo la serĉo ne plu estas aŭtomate vortkomenca!

<!-- https://dev.mysql.com/doc/refman/5.7/en/pattern-matching.html -->

## Serĉi per regulesprimoj

Ankoraŭ pli specife vi povas serĉi uzante regulesprimojn. Jen [anglalingvaj klarigoj de ties ebloj](https://dev.mysql.com/doc/refman/5.7/en/regexp.html#operator_regexp).

Jen kelkaj eblecoj kiel uzi specialajn signojn por regulesprima serĉo

| Signo | Signifo | Ekzemplo |
| `^` | komenco | `^kor` |
| `$` | fino | `aŭ$` |
| `.` | ĉiu signo | `k.r.` |
| `[]` | iu el la enkrampigitaj literoj | `^pl[iu]$` |
| `[^]` | neniu el la enkrampigitaj literoj | `^kor[^tv]o$` |
| `?` | nul aŭ unu da | `^ko[r]v?o$` |
| `*` | nul aŭ pli da | `^k[ore]*o$` |
| `+` | unu aŭ pli da | `^k[ore]+o$` |
| `|` | alternativo | `(pli|plu)` |
| `[[:<:]]` | vortkomenco - por serĉi en plurvortaĵoj | `[[:<:]]kubo$` |
| `[[:>:]]` | vortfino - por serĉi en plurvortaĵoj | `[[:>:]]a k.+o$` |

Por pliaj ebloj bv. konsulti la anglalingvan paĝon referencitan supre.

Ĉar la ordinara serĉo estas vortkomenca, la serĉo per regulesprimoj estas aparte konvena por limigi serĉon je ekzaktaj vortoj:
`^kubo$` trovas nur tiun vorton, `[[:<:]]kubo[[:>:]]` trovas nur unu- aŭ plurvortaĵojn kiuj enhavas la vorton "kubo".