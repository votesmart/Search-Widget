Search-Widget
=============

A javascript widget that allows someone to find a list of their representatives by entering their zipcode.

[Documentation](http://api.votesmart.org/docs/widgets/)

USING THE WIDGET
================
Place the code on to your server where it is publicly accessable.

Edit `init.search1.js` to reflect the proper settings.

Place the following code into your HTML.

```html
<!-- BEGIN VOTESMART WIDGET -->
<script type="text/javascript" src="http://votesmart.org/js/widgets/search/js/jquery-1.2.js"></script>
<script type="text/javascript" src="http://votesmart.org/js/widgets/search/js/init.search1.js"></script>
<div id="pvs_search"><a href="http://votesmart.org">Project Vote Smart</a> - Search Candidates, Elections and Officials<br /><br />Javascript must be enabled.</div>
<!-- END VOTESMART WIDGET -->
```

_NOTICE_ - You may have to alter the script tags to point to the proper location of the widget scripts.

Any questions can be directed to webmaster@votesmart.org

LICENSE
=======
Copyright&copy; 2007 Project Vote Smart

Widget code released under the [BSD License](http://www.opensource.org/licenses/bsd-license.php)
