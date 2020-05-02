---
layout: page
title: Informpaĝoj
---

# por redaktantoj


{% assign temoj = site.temoj | sort: "title" %}
{% for t in temoj %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}  

### listoj por redaktantoj ĉe Revo

*  [Novaj artikoloj](http://www.reta-vortaro.de/revo/inx/novaj.html)  
*  [Ŝanĝitaj artikoloj](http://www.reta-vortaro.de/revo/inx/shanghoj.html)  
*  [Strukturaj eraroj](http://www.reta-vortaro.de/revo/inx/eraroj.html)  
*  [Neregulaĵoj trovitaj per RelaxNG](http://www.reta-vortaro.de/revo/inx/relax_eraroj.html)  
*  [Vortokontrolo](http://h1838790.stratoserver.net/revokontrolo/")  
*  [Kelkaj mankantaj tradukoj](http://www.reta-vortaro.de/revo/inx/mankantaj.html)  
*  [Ĉiuj mankantaj tradukoj](http://www.reta-vortaro.de/cgi-bin/mx_trd.pl)  

