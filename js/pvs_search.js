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
 * Description: Handles candidates, elections and officials list.
 * 
 * Created: 2009-07-24
 * 
 * Last modified:
 *  
 */
        /**
         * Definitions
         */
        this.iface = '';                // API Interface
	this.iface2 = '';
	this.iface3 = '';
        this.data = '';                 // XML JS Object
/*
This method searches the api for elections, candidates and officials based on the zip code and outputs them to the widget
*/
        function get_districts(theZip, theLength) {
		if(theLength==5){
                	this.iface = __PVS_SERVER + "Election.getElectionByZip?o=JSON&key=" + __PVS_KEY + "&zip5=" + theZip + "&jsonCallback=?";
                	this.iface2 = __PVS_SERVER + "Candidates.getByZip?o=JSON&key=" + __PVS_KEY + "&zip5=" + theZip + "&jsonCallback=?";
                	this.iface3 = __PVS_SERVER + "Officials.getByZip?o=JSON&key=" + __PVS_KEY + "&zip5=" + theZip + "&jsonCallback=?";
		}
		else if(theLength==9){
			theZip5 = theZip.substring(0,5);
                        theZip4 = theZip.substring(5,9);	
                	this.iface = __PVS_SERVER + "Election.getElectionByZip?o=JSON&key=" + __PVS_KEY + "&zip5=" + theZip5 + "&zip4=" + theZip4 + "&jsonCallback=?";
                	this.iface2 = __PVS_SERVER + "Candidates.getByZip?o=JSON&key=" + __PVS_KEY + "&zip5=" + theZip5 + "&zip4=" + theZip4 + "&jsonCallback=?";
                	this.iface3 = __PVS_SERVER + "Officials.getByZip?o=JSON&key=" + __PVS_KEY + "&zip5=" + theZip5 + "&zip4=" + theZip4 + "&jsonCallback=?";
		}
                $.getJSON(this.iface,
                        function(data) {
				var election_code = '';
				var widget_code = get_search_box_code();
				if(theLength==9)
					widget_code += '<div class="pvs_search_widget">' + 'Results for ZIP: "' + theZip5 + '-' + theZip4 +'" </div> <br/>';
				else
					widget_code += '<div class="pvs_search_widget">' + 'Results for ZIP: "' + theZip +'" </div> <br/>';
				if (typeof data != "undefined") {
                                	if (typeof data.error == "undefined") {
						if(data.elections.zipMessage)
							widget_code+='<div class="pvs_header2">Current Elections</div> <ul class="pvs_special">' + data.elections.zipMessage + '<br/> <br/> </ul>';
						else
							widget_code+='<div class="pvs_header2">Current Elections</div> <ul class="pvs_search_widget_ul"></ul>';
                                                $.each(data.elections.election, function (i, cand) {
							if(cand.officeTypeId=='G'){
	                                   	             var link = 'http://votesmart.org/election_governor_five_categories.php?state_id=' + cand.stateId;
        	                                             var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.name;
                	                                     html = html + '</a>' + '</li>';
                     	                                     election_code+=html;
							}
							if(cand.officeTypeId=='L'){
	                                                	var link = 'http://votesmart.org/election_state_legislator.php?state_name=' + cand.stateId + '&state_id=' + cand.stateId + '&type=' + 'office' + '&criteria=' + 'upper';
        	                                                var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.name + ', Senate Candidates';
                	                                        html = html + '</a>' + '</li>';
                     	                                     	election_code+=html;
	                                                        var link = 'http://votesmart.org/election_state_legislator.php?state_name=' + cand.stateId + '&state_id=' + cand.stateId + '&type=' + 'office' + '&criteria=' + 'lower';
        	                                                var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.name + ', Delegate Candidates';
                	                                        html = html + '</a>' + '</li>';
                     	                                     	election_code+=html;
							}
                                                });
                                        } 
                                } else {
                                        widget_code+='ERROR 113';
                                }
				get_officials(widget_code, election_code);
                        }
                );
        }

        function get_officials(need_officials, election_code) {
                $.getJSON(this.iface3,
                        function(data) {
				var widget_array = new Array("", "", "", "", "", "");
				var widget_code = '';
                        	if (typeof data != "undefined") {
                                	if (typeof data.error == "undefined") {
						var first=second=third=fourth=fifth=sixth=1;
						if(data.candidateList.zipMessage)
							widget_code+='<div class="pvs_header1">Current Officials</div> <ul class="pvs_search_widget_ul_o pvs_special">' + data.candidateList.zipMessage + '<br/> </ul>';
						else
							widget_code+='<div class="pvs_header1">Current Officials</div> <ul class="pvs_search_widget_ul_o"></ul>';
                                                $.each(data.candidateList.candidate, function (i, cand) {
							var require_dash = 1;
							if(cand.firstName) {	
	                                        		var link = 'http://votesmart.org/summary.php?can_id=' + cand.candidateId;
								if(cand.electionParties!=""){
        	                        	        		var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (' + cand.electionParties.charAt(0);
								}
								else if(cand.officeParties!=""){
        	                       	              		        var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (' + cand.officeParties.charAt(0);
								}
								else{
                                	              		        var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (';
									require_dash = 0;
								}
								if(cand.officeStateId!="" || cand.officeDistrictName!=""){
									if(require_dash)
										html = html + '-' + cand.officeStateId + valid_district(cand.officeDistrictName) + ')';
									else
										html = html + cand.officeStateId + valid_district(cand.officeDistrictName) + ')';
								}
								else{
									html = html + ')';
								}
								if(cand.officeTypeId=='C'){
									if(first){
										widget_code+='<ul class="congressional_official"><b>Congressional</b></ul>';
										first--;
									}
									html = html + '</a>' + '</li>';
                       	                                		widget_array[0]+=html;
								}
								else if(cand.officeTypeId=='G'){
									if(second){
										widget_code+='<ul class="gubernatorial_official"><b>Gubernatorial</b></ul>';
										second--;
									}
									html = html + '</a>' + '</li>';
                       	                                		widget_array[1]+=html;
								}
								else if(cand.officeTypeId=='L'){
									if(third){
										widget_code+='<ul class="state_official"><b>State Legislative</b></ul>';
										third--;
									}
									html = html + '</a>' + '</li>';
                       	                                		widget_array[2]+=html;
								}
								else if(cand.officeTypeId=='P'){
									if(fifth){
										widget_code+='<ul class="presidential_official"><b>Presidential</b></ul>';
										fifth--;
									}
									html = html + '</a>' + '</li>';
                       	                        		       	widget_array[3]+=html;
								}
								else if(cand.officeTypeId=='J'){
									if(sixth){
										widget_code+='<ul class="federal_judicial_official"><b>Federal Judicial</b></ul>';
										sixth--;
									}
									html = html + '</a>' + '</li>';
                       	                        		       	widget_array[4]+=html;
								}
								else{
									if(fourth){
										widget_code+='<ul class="state_wide_official"><b>State Wide</b></ul>';
										fourth--;
									}
									html = html + '</a>' + '</li>';
                       	                                		widget_array[5]+=html;
								}
							}
                                                });
                                        } else {
                                                widget_code+='<span class="pvs_header2">' + data.error.errorMessage + '</span>';
                                                widget_code+='<br/>';
                                                widget_code+='<br/>';
                                        }
                                } else {
                                        widget_code+='ERROR 113';
                                }
				get_candidates((need_officials+widget_code), election_code, widget_array);
			});
	}

        function get_candidates(need_candidates, election_code, officials_array) {
                $.getJSON(this.iface2,
                        function(data) {
				var widget_array = new Array("", "", "", "", "", "");
				var widget_code = '';
                        	if (typeof data != "undefined") {
                        	        widget_code += '<div class="pvs_header1">Current Candidates</div>';
                                	if (typeof data.error == "undefined") {
						var first=second=third=fourth=fifth=sixth=1;
						if(data.candidateList.zipMessage)
							widget_code+='<ul class="pvs_special">' + data.candidateList.zipMessage + '<br/> </ul>';
						else
							widget_code+='<ul class="pvs_search_widget_ul_c"></ul>';
                                                $.each(data.candidateList.candidate, function (i, cand) {
                                                        //alert('ID: ' + cand.candidateId + ' Status: ' + cand.electionStatus);
                                                        if (
                                                                cand.electionStatus != 'Lost' 
                                                                && cand.electionStatus != 'Withdrawn'
                                                                && cand.electionStatus != 'Removed'
                                                                && cand.electionStatus != 'Deceased'
                                                        ) {
							        var require_dash = 1;
							        if(cand.firstName){	
	                                                        	var link = 'http://votesmart.org/summary.php?can_id=' + cand.candidateId;
								        if(cand.electionParties!=""){
                	                      	                       		var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (' + cand.electionParties.charAt(0);
								        }
								        else if(cand.officeParties!=""){
                                       	               	        		var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (' + cand.officeParties.charAt(0);
								        }
								        else{
               	                        	               			var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (';
									        require_dash = 0;
								        }
								        if(cand.electionStateId!="" || cand.electionDistrictName!=""){
									        if(require_dash)
										        html = html + '-' + cand.electionStateId + valid_district(cand.electionDistrictName) + ')';
									        else
										        html = html + cand.electionStateId + valid_district(cand.electionDistrictName) + ')';
								        }
								        else{
									        html = html + ')';
								        }
								        if(cand.electionOfficeTypeId=='C'){
									        if(first){
										        widget_code+='<ul class="congressional_candidate"><b>Congressional</b></ul>';
										        first--;
									        }
									        html = html + '</a>' + '</li>';
                                	                        	       	widget_array[0]+=html;
								        }
								        else if(cand.electionOfficeTypeId=='G'){
									        if(second){
										        widget_code+='<ul class="gubernatorial_candidate"><b>Gubernatorial</b></ul>';
										        second--;
									        }
									        html = html + '</a>' + '</li>';
                                	                        	       	widget_array[1]+=html;
								        }
								        else if(cand.electionOfficeTypeId=='L'){
									        if(third){
										        widget_code+='<ul class="state_candidate"><b>State Legislative</b></ul>';
										        third--;
									        }
									        html = html + '</a>' + '</li>';
                                	                        	       	widget_array[2]+=html;
								        }
								        else if(cand.electionOfficeTypeId=='P'){
									        if(fifth){
										        widget_code+='<ul class="presidential_candidate"><b>Presidential</b></ul>';
										        fifth--;
									        }
									        html = html + '</a>' + '</li>';
                                	                			widget_array[3]+=html;
								        }
								        else if(cand.electionOfficeTypeId=='J'){
									        if(sixth){
										        widget_code+='<ul class="federal_judicial_candidate"><b>Federal Judicial</b></ul>';
										        sixth--;
									        }
									        html = html + '</a>' + '</li>';
                                	                        	       	widget_array[4]+=html;
								        }
								        else{
									        if(fourth){
										        widget_code+='<ul class="state_wide_candidate"><b>State Wide</b></ul>';
										        fourth--;
									        }
									        html = html + '</a>' + '</li>';
                                	                        	       	widget_array[5]+=html;
								        }
							        }
						        }
                                                });
                                        } else {
                                                widget_code+='<span class="pvs_header2">' + data.error.errorMessage + '</span>';
                                                widget_code+='<br/>';
                                                widget_code+='<br/>';
                                        }
                                } else {
                                        widget_code+='ERROR 113';
                                }
				append_code((need_candidates+widget_code), election_code, officials_array, widget_array);
			});
	}

/*
This method searches the api for candidates and officials based on the last name and outputs them to the widget
*/
	function get_officials_by_last_name(theName){
                this.iface = __PVS_SERVER + "Candidates.getByLastname?o=JSON&key=" + __PVS_KEY + "&lastName=" + theName + "&jsonCallback=?";
                this.iface2 = __PVS_SERVER + "Officials.getByLastname?o=JSON&key=" + __PVS_KEY + "&lastName=" + theName + "&jsonCallback=?";
                $.getJSON(this.iface2,
                        function(data) {
				var widget_array = new Array("", "", "", "", "", "");
				var widget_code = get_search_box_code();
				widget_code += '<div class="pvs_search_widget">Results for: "' + theName +'" </div> <br/>';
                        	if (typeof data != "undefined") {
                        	        widget_code+='<div class="pvs_header1">Current Officials</div>';
                                	if (typeof data.error == "undefined") {
						var first=second=third=fourth=fifth=sixth=1;
        					$.each(data.candidateList.candidate, function (i, cand) {
							var require_dash = 1;
							if(cand.firstName) {	
	                                       	                var link = 'http://votesmart.org/summary.php?can_id=' + cand.candidateId;
								if(cand.electionParties!=""){
        	                       	                        	var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (' + cand.electionParties.charAt(0);
								}
								else if(cand.officeParties!=""){
        	                        	               	        var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (' + cand.officeParties.charAt(0);
								}
								else{
        	                        	              		var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (';
									require_dash = 0;
								}
								if(cand.officeStateId!="" || cand.officeDistrictName!=""){
									if(require_dash)
										html = html + '-' + cand.officeStateId + valid_district(cand.officeDistrictName) + ')';
									else
										html = html + cand.officeStateId + valid_district(cand.officeDistrictName) + ')';
								}
								else{
									html = html + ')';
								}
								html = html + '</a>' + '</li>';
								if(cand.officeTypeId=='C'){
									if(first){
										widget_code+='<ul class="congressional_official"><b>Congressional</b></ul>';
										first--;
									}
									html = html + '</a>' + '</li>';
									widget_array[0]+=html;
								}
								else if(cand.officeTypeId=='G'){
									if(second){
										widget_code+='<ul class="gubernatorial_official"><b>Gubernatorial</b></ul>';
										second--;
									}
									html = html + '</a>' + '</li>';
									widget_array[1]+=html;
								}
								else if(cand.officeTypeId=='L'){
									if(third){
										widget_code+='<ul class="state_official"><b>State Legislative</b></ul>';
										third--;
									}
									html = html + '</a>' + '</li>';
									widget_array[2]+=html;
								}
								else if(cand.officeTypeId=='P'){
									if(fifth){
										widget_code+='<ul class="presidential_official"><b>Presidential</b></ul>';
										fifth--;
									}
									html = html + '</a>' + '</li>';
									widget_array[3]+=html;
								}
								else if(cand.officeTypeId=='J'){
									if(sixth){
										widget_code+='<ul class="federal_judicial_official"><b>Federal Judicial</b></ul>';
										sixth--;
									}
									html = html + '</a>' + '</li>';
									widget_array[4]+=html;
								}
								else{
									if(fourth){
										widget_code+='<ul class="state_wide_official"><b>State Wide</b></ul>';
										fourth--;
									}
									html = html + '</a>' + '</li>';
									widget_array[5]+=html;
								}
							}
                                                });
						var require_dash = 1;
						if(data.candidateList.candidate.firstName) {
	                                                var link = 'http://votesmart.org/summary.php?can_id=' + data.candidateList.candidate.candidateId;
							if(data.candidateList.candidate.electionParties!=""){
        	                      	                	var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + data.candidateList.candidate.title + ' ' + data.candidateList.candidate.firstName + ' ' + data.candidateList.candidate.lastName + ' (' + data.candidateList.candidate.electionParties.charAt(0);
							}
							else if(data.candidateList.candidate.officeParties!=""){
        	                        	        	var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + data.candidateList.candidate.title + ' ' + data.candidateList.candidate.firstName + ' ' + data.candidateList.candidate.lastName + ' (' + data.candidateList.candidate.officeParties.charAt(0);
							}
							else{
        	                                      		var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + data.candidateList.candidate.title + ' ' + data.candidateList.candidate.firstName + ' ' + data.candidateList.candidate.lastName + ' (';
								require_dash = 0;
							}
							if(data.candidateList.candidate.officeStateId!="" || data.candidateList.candidate.officeDistrictName!=""){
								if(require_dash)
									html = html + '-' + data.candidateList.candidate.officeStateId + valid_district(data.candidateList.candidate.officeDistrictName) + ')';
								else
									html = html + data.candidateList.candidate.officeStateId + valid_district(data.candidateList.candidate.officeDistrictName) + ')';
							}
							else{
								html = html + ')';
							}
							html = html + '</a>' + '</li>';
							if(data.candidateList.candidate.officeTypeId=='C'){
								if(first){
									widget_code+='<ul class="congressional_official"><b>Congressional</b></ul>';
									first--;
								}
								html = html + '</a>' + '</li>';
								widget_array[0]+=html;
							}
							else if(data.candidateList.candidate.officeTypeId=='G'){
								if(second){
									widget_code+='<ul class="gubernatorial_official"><b>Gubernatorial</b></ul>';
									second--;
								}
								html = html + '</a>' + '</li>';
								widget_array[1]+=html;
							}
							else if(data.candidateList.candidate.officeTypeId=='L'){
								if(third){
									widget_code+='<ul class="state_official"><b>State Legislative</b></ul>';
									third--;
								}
								html = html + '</a>' + '</li>';
								widget_array[2]+=html;
							}
							else if(data.candidateList.candidate.officeTypeId=='P'){
								if(fifth){
									widget_code+='<ul class="presidential_official"><b>Presidential</b></ul>';
									fifth--;
								}
								html = html + '</a>' + '</li>';
								widget_array[3]+=html;
							}
							else if(data.candidateList.candidate.officeTypeId=='J'){
								if(sixth){
									widget_code+='<ul class="federal_judicial_official"><b>Federal Judicial</b></ul>';
									sixth--;
								}
								html = html + '</a>' + '</li>';
								widget_array[4]+=html;
							}
							else{
								if(fourth){
									widget_code+='<ul class="state_wide_official"><b>State Wide</b></ul>';
									fourth--;
								}
								html = html + '</a>' + '</li>';
								widget_array[5]+=html;
							}
						}
                                        } else {
                                                widget_code+='<span class="pvs_header2">' + data.error.errorMessage + '</span>';
                                                widget_code+='<br/>';
                                                widget_code+='<br/>';
                                        }
                                } else {
                                        widget_code+='ERROR 113';
                                }
				get_candidates_by_last_name(widget_code, widget_array);
			});
	}

        function get_candidates_by_last_name(need_candidates, officials_array) {
                $.getJSON(this.iface,
                        function(data) {
				var widget_array = new Array("", "", "", "", "", "");
				var widget_code = '';
                                if (typeof data != "undefined") {
                                        widget_code+='<div class="pvs_header1">Current Candidates</div>';
                                        if (typeof data.error == "undefined") {
						var first=second=third=fourth=fifth=sixth=1;
        					$.each(data.candidateList.candidate, function (i, cand) {
							var require_dash = 1;
							if(cand.firstName){	
	                                                       	var link = 'http://votesmart.org/summary.php?can_id=' + cand.candidateId;
								if(cand.electionParties!="")
        	                                               		var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (' + cand.electionParties.charAt(0);
								else if(cand.officeParties!="")
                                                        		var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (' + cand.officeParties.charAt(0);
								else{
        	                                                	var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + cand.title + ' ' + cand.firstName + ' ' + cand.lastName + ' (';
									require_dash = 0;
								}
								if(cand.electionStateId!="" || cand.electionDistrictName!=""){
									if(require_dash)
										html = html + '-' + cand.electionStateId + valid_district(cand.electionDistrictName) + ')';
									else
										html = html + cand.electionStateId + valid_district(cand.electionDistrictName) + ')';
								}
								else{
									html = html + ')';
								}
								html = html + '</a>' + '</li>';
								if(cand.officeTypeId=='C'){
									if(first){
										widget_code+='<ul class="congressional_candidate"><b>Congressional</b></ul>';
										first--;
									}
									html = html + '</a>' + '</li>';
									widget_array[0]+=html;
								}
								else if(cand.officeTypeId=='G'){
									if(second){
										widget_code+='<ul class="gubernatorial_candidate"><b>Gubernatorial</b></ul>';
										second--;
									}
									html = html + '</a>' + '</li>';
									widget_array[1]+=html;
								}
								else if(cand.officeTypeId=='L'){
									if(third){
										widget_code+='<ul class="state_candidate"><b>State Legislative</b></ul>';
										third--;
									}
									html = html + '</a>' + '</li>';
									widget_array[2]+=html;
								}
								else if(cand.officeTypeId=='P'){
									if(fifth){
										widget_code+='<ul class="presidential_candidate"><b>Presidential</b></ul>';
										fifth--;
									}
									html = html + '</a>' + '</li>';
									widget_array[3]+=html;
								}
								else if(cand.officeTypeId=='J'){
									if(sixth){
										widget_code+='<ul class="federal_judicial_candidate"><b>Federal Judicial</b></ul>';
										sixth--;
									}
									html = html + '</a>' + '</li>';
									widget_array[4]+=html;
								}
								else{
									if(fourth){
										widget_code+='<ul class="state_wide_candidate"><b>State Wide</b></ul>';
										fourth--;
									}
									html = html + '</a>' + '</li>';
									widget_array[5]+=html;
								}
							}
                                                });
						var require_dash = 1;
						if(data.candidateList.candidate.firstName){	
	                                        	var link = 'http://votesmart.org/summary.php?can_id=' + data.candidateList.candidate.candidateId;
							if(data.candidateList.candidate.electionParties!="")
        	                                		var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + data.candidateList.candidate.title + ' ' + data.candidateList.candidate.firstName + ' ' + data.candidateList.candidate.lastName + ' (' + data.candidateList.candidate.electionParties.charAt(0);
							else if(data.candidateList.candidate.officeParties!="")
                                                       		var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + data.candidateList.candidate.title + ' ' + data.candidateList.candidate.firstName + ' ' + data.candidateList.candidate.lastName + ' (' + data.candidateList.candidate.officeParties.charAt(0);
							else{
        	                                               	var html = '<li class="pvs_search_widget_li"><a href="' + link + '">' + data.candidateList.candidate.title + ' ' + data.candidateList.candidate.firstName + ' ' + data.candidateList.candidate.lastName + ' (';
								require_dash = 0;
							}
							if(data.candidateList.candidate.electionStateId!="" || data.candidateList.candidate.electionDistrictName!=""){
								if(require_dash)
									html = html + '-' + data.candidateList.candidate.electionStateId + valid_district(data.candidateList.candidate.electionDistrictName) + ')';
								else
									html = html + data.candidateList.candidate.electionStateId + valid_district(data.candidateList.candidate.electionDistrictName) + ')';
							}
							else{
								html = html + ')';
							}
							html = html + '</a>' + '</li>';
							if(data.candidateList.candidate.officeTypeId=='C'){
								if(first){
									widget_code+='<ul class="congressional_candidate"><b>Congressional</b></ul>';
									first--;
								}
								html = html + '</a>' + '</li>';
								widget_array[0]+=html;
							}
							else if(data.candidateList.candidate.officeTypeId=='G'){
								if(second){
									widget_code+='<ul class="gubernatorial_candidate"><b>Gubernatorial</b></ul>';
									second--;
								}
								html = html + '</a>' + '</li>';
								widget_array[1]+=html;
							}
							else if(data.candidateList.candidate.officeTypeId=='L'){
								if(third){
									widget_code+='<ul class="state_candidate"><b>State Legislative</b></ul>';
									third--;
								}
								html = html + '</a>' + '</li>';
								widget_array[2]+=html;
							}
							else if(data.candidateList.candidate.officeTypeId=='P'){
								if(fifth){
									widget_code+='<ul class="presidential_candidate"><b>Presidential</b></ul>';
									fifth--;
								}
								html = html + '</a>' + '</li>';
								widget_array[3]+=html;
							}
							else if(data.candidateList.candidate.officeTypeId=='J'){
								if(sixth){
									widget_code+='<ul class="federal_judicial_candidate"><b>Federal Judicial</b></ul>';
									sixth--;
								}
								html = html + '</a>' + '</li>';
								widget_array[4]+=html;
							}
							else{
								if(fourth){
									widget_code+='<ul class="state_wide_candidate"><b>State Wide</b></ul>';
									fourth--;
								}
								html = html + '</a>' + '</li>';
								widget_array[5]+=html;
							}
						}
                                        } else {
                                                widget_code+='<span class="pvs_header2">' + data.error.errorMessage + '</span>';
                                                widget_code+='<br/>';
                                                widget_code+='<br/>';
                                        }
                                } else {
                                        widget_code+='ERROR 113';
                                }
				append_code((need_candidates+widget_code), '', officials_array, widget_array);
                        });
        }
        
/*
This method will check if the district is an actual district number used to identify U.S Senate or House and not state level districts
*/
function valid_district(input_value){
	if (!isNaN(parseInt(input_value))){
		return (' ' + input_value);	
	}
	return "";
}

/*
This method evaluates the input and either calls a method that'll search by zip code or last name
*/
function get_type(input_value){
        
	now_loading();

	temp = "" + input_value;	
	out = " "; // replace this
	add = ""; // with this
	while (temp.indexOf(out)>-1) {
		pos= temp.indexOf(out);
		temp = "" + (temp.substring(0, pos) + add +
		temp.substring((pos + out.length), temp.length));
	}
	out = "-"; // replace this
	while (temp.indexOf(out)>-1) {
		pos= temp.indexOf(out);
		temp = "" + (temp.substring(0, pos) + add +
		temp.substring((pos + out.length), temp.length));
	}
	var numericExpression = /^[0-9]+$/;
	if(temp.match(numericExpression)){
		if(temp.length==5){
			get_districts(temp, 5);
		}	
		else if(temp.length==9){
			get_districts(temp, 9);
		}	
		else{
			get_officials_by_last_name(input_value);
		}
	}else{
		get_officials_by_last_name(input_value);
	}
        return false; // This is needed for some browsers so the form won't submit
}

function append_code(to_append, election_code, widget_array1, widget_array2){
	$("#pvs_search").empty();
        $("#pvs_search").append(to_append);

        $("ul.pvs_search_widget_ul").append(election_code);

        $("ul.congressional_official").append(widget_array1[0]);
        $("ul.gubernatorial_official").append(widget_array1[1]);
        $("ul.state_official").append(widget_array1[2]);
        $("ul.presidential_official").append(widget_array1[3]);
        $("ul.federal_judicial_official").append(widget_array1[4]);
        $("ul.state_wide_official").append(widget_array1[5]);

        $("ul.congressional_candidate").append(widget_array2[0]);
        $("ul.gubernatorial_candidate").append(widget_array2[1]);
        $("ul.state_candidate").append(widget_array2[2]);
        $("ul.presidential_candidate").append(widget_array2[3]);
        $("ul.federal_judicial_candidate").append(widget_array2[4]);
        $("ul.state_wide_candidate").append(widget_array2[5]);
}

function now_loading(){
        $("#pvs_search").empty();
	$("#pvs_search").append('<div style="text-align: center; width: 100%; padding: 10px;"><img style="border: 0px;" src="http://votesmart.org/img/ajax-loader.gif" alt="' + "loading..." + '" /></div>');

}

function get_search_box_code(){

        var html = '';
        html += '<div style="width: 100%; text-align: center; margin: 15px auto;"><a style="padding: 5px; text-decoration: none;" href="http://votesmart.org/" onclick="window.open(this.href)"><img src="http://votesmart.org/img/capitol_guy_blue_trans_sm.gif" style="border: 0px;" /><br />Project Vote Smart</a></div>';
        html += '<div class="pvs_search_widget">Search by Candidate\'s or Official\'s Last Name, or Enter Your ZIP Code:</div>';
        html += '<form name="search"> <fieldset> <legend>(Zip)/(Last Name)</legend> <div class="search_box_div" name="search_box_div"> <input class="search_box" id="textbox" name="search_box" type="text" /> </div> <div class="submit_button"> <input type="submit" name="submit" value="Search" onClick="get_type(search_box.value); return false;"/> </div> </fieldset> </form>';
        return html;
        
}       

/*
This method displays the search box and once submit is entered it takes the input and passes it to get_type(input_value)
*/
function pvs_search() {
        // Clear out the search widget
        $("#pvs_search").empty();
        /**
         * Methods
         */
	this.get_info = get_info;
	function get_info() {
                //$("#pvs_search").append(' <br/>');
		$("#pvs_search").append(get_search_box_code());
	}

}
/**
 * CONFIGURATION can be found in init.search1.js
 */
