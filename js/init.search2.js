/**
 *
 * Project Vote Smart Widgets
 * Copyright 2009 Project Vote Smart
 * 
 * Widget code released under the BSD License
 * http://www.opensource.org/licenses/bsd-license.php
 * 
 * Documentation http://api.votesmart.org/docs/widgets/
 * 
 * Description: Goes through each widget imports it and gets it all rolling.
 * 
 * Created: 2009-07-24
 * 
 * Last modified:
 *  
 */

$(document).ready(function(){

	var pvs_search_obj = new pvs_search();
	pvs_search_obj.get_info();
        
});
