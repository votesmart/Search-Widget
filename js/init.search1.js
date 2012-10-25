/**
 *
 * Project Vote Smart Widgets
 * Copyright 2009 Project Vote Smart
 * 
 * Widget code released onder the BSD License
 * http://www.opensource.org/licenses/bsd-license.php
 * 
 * Documentation http://api.votesmart.org/docs/widgets/
 * 
 * Description: Sets up configuration and imports the important non-optional files
 * 
 * Created: 2009-07-24
 * 
 * Last modified:
 *  
 */

/*****************
 * Configuration *
 *****************/
// Server/Site settings
var __PVS_DOMROOT = "http://votesmart.org/static/js/widgets/search/";      // Trailing slash required
                                                // Can also have domain name in var (may have issues with XSS protections)
var __PVS_SERVER = "http://api.votesmart.org/";
var __PVS_KEY = '243e0b6d69b73e6986243a50e7a68a0c';
//'14fc97094470f4531f000f2';

/******************
 * Initialization *
 ******************/
function pvs_import_js(filepoop) {
        if (filepoop != '') {
                var scriptTag = document.createElement('script');
                scriptTag.type = 'text/javascript';
                scriptTag.src = filepoop;
                // Can't use jQuery at this point so using basic DOM
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
                //document.body.appendChild(scriptTag);
        }
}

function pvs_import_css(filepoop) {
        if (filepoop != '') {
                var linkTag = document.createElement('link');
                linkTag.type = 'text/css';
                linkTag.rel = 'stylesheet';
                linkTag.href = filepoop;
                // Can't use jQuery at this point so using basic DOM
                document.getElementsByTagName('head')[0].appendChild(linkTag);
                //document.body.appendChild(scriptTag);
        }
}

// Necessary items
// Thanks Safari... pvsImportJs(__PVS_DOMROOT + "js/jquery-1.2.js");
// Classes
pvs_import_js(__PVS_DOMROOT + "js/pvs_search.js");
// Finally, let's do this... stuff
pvs_import_css(__PVS_DOMROOT + "pvs_search.css");
pvs_import_js(__PVS_DOMROOT + "js/init.search2.js");
