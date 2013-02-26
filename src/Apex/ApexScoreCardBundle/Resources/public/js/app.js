Number.prototype.mod = function(n) {
return ((this%n)+n)%n;
}

function viewModel () {
	var self = this;
	
/*	if (localStorage.getItem("currentHoleStore") != null)
	{
	 	self.currentHole = ko.observable(localStorage.getItem("currentHoleStore"), {persist: 'currentHoleStore'});
	} */
	self.currentHole = ko.observable(1);
	
	
	self.currentHolePar = ko.observable(0);
	self.currentHoleScore = ko.observable(0);
	self.currentHoleHcp = ko.observable(0);
	self.currentHoleLength = ko.observable(0);

	
	self.courseName = ko.observable("");
//	self.currentTees = ko.observable("yellow");
	self.playerGender = ko.observable("");
	self.playerGenders = ko.observableArray(["Male", "Female"]);
	self.playerName = ko.observable("");
	self.playerExactHcp = ko.observable();
	self.courseSl = ko.observable(0);
	self.courseCr = ko.observable(0);
	self.playerDefaultTee = ko.observable();
	self.courseAlias = ko.observable();
	
	self.round_id = ko.observable();
	self.course_id = ko.observable();
	self.round_hcp = ko.observable();
	self.roundStartTime = ko.observable();
	
	self.noScoreEntered = ko.observable(true);
	self.showPoints = ko.observable(false);
	self.sliderVal = ko.observable(0);
	self.hasSlid = ko.observable(false);

	self.holes = ko.observableArray([]);
	self.courseData = ko.observableArray([]);
	self.roundScores = ko.observableArray([]);

	self.roundList = ko.observableArray([]);
	self.roundCourses = ko.observableArray([]);

	self.recentlyPlayedCourses = ko.observableArray([]);
	self.courseList = ko.observableArray([]);


	self.tempcoursename = ko.observable();



	function prePopulateScores () {
		for (var i = 0; i < 18; i++) {
			var el = {};
			el['hole'] = ko.observable(i + 1);
			el['score'] = ko.observable(0);
			el['points'] = ko.observable(0);
			el['scoreToPar'] = ko.observable(0);
			self.roundScores.push(el);
		}
	};
	
	self.coursePar = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_par());
			}
		return s;
	});

//computeds 

	self.holeScoreName = ko.computed(function() {
		if (self.noScoreEntered()) {
			return "";
			}
		else if (self.currentHoleScore() == 0) {
			return "";
			}
		else {			
			var x = parseInt(self.currentHoleScore()) - self.currentHolePar();
			switch (x) {
				case 0: return "Par";
				case -1: return "Birdie";
				case -2: return "Eagle";
				case -3: return "Albatross";
				case 1: return "Bogey";
				case 2: return "Double";
			}
			if (x > 2) {
				return x + " over";
			}
			else if (x < -3) {
				return Math.abs(x) + " under";
			}
		}
	});
	

	self.totalScore = ko.computed(function() {
		var s = 0;
		for (var n = 0, m = self.roundScores().length; n < m; n++) {
			s = s + parseInt(self.roundScores()[n].score());
		}
		return s;
	});
		
	self.totalPoints = ko.computed(function() {
		var s = 0;
		for (var n = 0, m = self.roundScores().length; n < m; n++) {
			s = s + parseInt(self.roundScores()[n].points());
		}
		return s;
	});

	self.totalToPar = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.roundScores().length; i++) {
			s = s + parseInt(self.roundScores()[i].scoreToPar());
		}
		return s;
	});

	self.playerPlayingHcp = ko.computed(function () {
		/* GA PLAYING HANDICAP FORMULA the “EGA Playing Handicap Formula” converts exact handicaps into playing handicaps. PLAYING HCP = EXACT HCP x (SR / 113) + (CR - PAR) */
		var a = parseFloat(self.playerExactHcp());
		var b = parseFloat(self.courseSl()) / 113;
		var c = parseFloat(self.courseCr()) - parseFloat(self.coursePar());
		var playhcp = a * b + c;
		return Math.round(playhcp);
	});
	
	self.currentHoleHcpPar = ko.computed(function () {
		var par = self.currentHolePar();
		var crhcp = parseInt(self.playerPlayingHcp());
		var baseadj, hcpholes;
		baseadj = Math.floor(crhcp / 18);
		hcpholes = (crhcp.mod(18));
		
		if (hcpholes >= parseInt(self.currentHoleHcp())) {
			return parseInt(self.currentHolePar()) + baseadj + 1;
			}
		else {
			return parseInt(par) + parseInt(baseadj);
			}
	});



/* observablet loppuu */

	self.setHoleData = function () {
		var idx = parseInt(self.currentHole()) -1 ; // index fix, sanity?
		
		var par = parseInt(self.holes()[idx].hole_par());
		self.currentHolePar(par);
		self.currentHoleHcp(parseInt(self.holes()[idx].hole_hcp()));
		self.currentHoleLength(self.holes()[idx].hole_length());
	
		var curHole = parseInt(self.currentHole());
		var curScore = parseInt(self.currentHoleScore());
		var curPoints = parseInt(self.currentHolePoints());
				
		
		for (var i = 0; i < self.roundScores().length; i++) {
		    if (self.roundScores()[i].hole() == curHole) {
				self.currentHoleScore(parseInt(self.roundScores()[i].score()));
				self.noScoreEntered(false);
			}
		}
		
		if (self.currentHoleScore() == 0) {
			self.noScoreEntered(true);
		}

	};
	
	
	self.nextHole = function () {
		self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore());

		var curHole = parseInt(self.currentHole());		
		
	
		self.showPoints(false);
		self.noScoreEntered(true);

		if (curHole == 18) {
			self.currentHole(1);
			self.setHoleData();
		}
		else {
			self.currentHole(self.currentHole() + 1);
			self.setHoleData();
		};
	};
	
	self.previousHole = function() {
		self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore());

		var curHole = parseInt(self.currentHole());
		self.noScoreEntered(false);

		if (curHole === 1) {
			self.currentHole(18);
			self.setHoleData();
		}

		else {
			self.currentHole(curHole - 1);
			self.setHoleData();
		};
	}
	
	self.currentHolePoints = ko.computed(function() {
		var curHcpPar = parseInt(self.currentHoleHcpPar());
		var curScore = parseInt(self.currentHoleScore());
		
		if (self.noScoreEntered()) {
			return 0;
			}
		else if ( curScore == 0) {
			return 0;
			}
		else {		
			var y = curHcpPar - curScore + 2;
			self.showPoints(true);
			if (y > 0) {
				return y;
				}
			else {
				return 0;
			}
		}
	});
	
/*	
	self.saveScores = function () {
		var data = [];
		
		data[0] = parseInt(1);
		data[1] = self.courseName;
		data[2] = parseInt(self.totalScore());
		data[3] = parseInt(self.totalPoints());
		
		for (var i = 0, n = 4; i < self.roundScores().length; i++, n++) {
			data[n] = parseInt(self.roundScores()[i].score());
		}
		
		$.ajax ({
			type: 'POST',
			url: 'saveround.php',
			data: { data : data },
			success: function() { */
//				self.rounds.removeAll(); // en saanu listviewiä päivittymään kun kierros on pelattu, rumaruma hack mikä hakee uudestaan serveriltä koko paskan
	//			self.getRounds();        //

		//		$.mobile.changePage('#f_page');
/*				setTimeout(function () {
					myScroll.refresh();
				}, 200);	 */
//			}
	//	});
//	};

		
	self.setScore = function () {
	
		var sVal = parseInt(self.sliderVal());

		if (sVal <50 && sVal >5 || sVal < -5 && sVal > -50 ) {
			if (self.noScoreEntered()) {
				self.currentHoleScore(self.currentHolePar());
				self.noScoreEntered(false);
			}
		} 

		if (sVal >= 51) {
			if (self.noScoreEntered()) {
				self.currentHoleScore(self.currentHolePar());
			}
			self.upScore() ;
			self.noScoreEntered(false);
		}
			
		if (sVal < -51) {
			if (self.noScoreEntered()) {
				self.currentHoleScore(self.currentHolePar());
			}
			self.downScore();
			self.noScoreEntered(false);
		}
			
		var curHole = parseInt(self.currentHole());
		var curScore = parseInt(self.currentHoleScore()) ;
		var curPoints = parseInt(self.currentHolePoints());
		var curHolePar = parseInt(self.currentHolePar());
		var idx = curHole - 1;

		for (var i = 0; i < self.roundScores().length; i++) {
			if (self.roundScores()[i].hole() == curHole) {
				self.roundScores()[i].score(curScore);
				self.roundScores()[i].points(curPoints);
				self.roundScores()[i].scoreToPar(curScore - curHolePar);
			}
		};
			
	};

	self.upScore = function () {
		if (self.hasSlid() == false) {
			var y = self.currentHoleScore();
			self.currentHoleScore(parseInt(y) + 1);
			$("#score").animate({ 
				fontSize: "1.05em", 
				  }, 50, function() {
				  		  $("#score").animate({ 
							fontSize: "1em",
						  }, 300 );
					  }
				  )
			}
		self.hasSlid(true);
	};
	
	self.downScore = function () {
		if (self.hasSlid() === false) {
			var y = parseInt(self.currentHoleScore());
			if (y == 0) {
				}
			else {
				self.currentHoleScore(parseInt(y) - 1);
				$("#score").animate({ 
				fontSize: "0.95em", 
				  }, 50, function() {
			  		  $("#score").animate({ 
						fontSize: "1em",
					  }, 300 );
				  }
 				)
			}
		self.hasSlid(true);
		}
	};
	
	
	self.resetSlider = function () {
		var sVal = self.sliderVal();
		self.hasSlid(false);
		self.sliderVal(0);
	};
	
	
	ko.bindingHandlers.slider = {
	    init: function (element, valueAccessor) {
    	    function setSliderValue(newValue) {
	            var slider = $("#" + element.id);
			//	console.log(slider);
        	    slider.val(newValue);
            	slider.slider('refresh');
	            slider.on('change', function () {
    	            valueAccessor()(slider.val());
	            });
	           	slider.on('slidestop', function () {
						valueAccessor()(slider.val());
	   			});
	        }
    	    valueAccessor().subscribe(setSliderValue);

	    }
	}; 
	
	ko.bindingHandlers.mobileList = {
		'update': function (element, valueAccessor) {
			setTimeout(function () { //To make sure the refresh fires after the DOM is updated
	        console.log("listview refresh");
	        $(element).listview('refresh');
//	        $(element).trigger("create");
		    }, 0);
		}
	};
	
    ko.bindingHandlers.mobileradio = {
        init: function (element, valueAccessor) {
        },
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            if (valueUnwrapped == $(element).val()) {
                $(element).prop("checked", "true").checkboxradio("refresh");
            } else {
  //              $(element).prop('checked', false);
				$(element).removeProp("checked").checkboxradio("refresh");
				
            }
        }
    };
    
	ko.bindingHandlers.jqmValue = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			if (typeof ko.bindingHandlers.value.init !== 'undefined') {
				ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor, viewModel);
			}
		},

		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			if (typeof ko.bindingHandlers.value.update !== 'undefined') {
				ko.bindingHandlers.value.update(element, valueAccessor, allBindingsAccessor, viewModel);
			}

			var instance = $.data(element, 'selectmenu');
			if (instance) {
				$(element).selectmenu('refresh', true);
			}
		}
	};
	
	self.loadPrefs = function() {
		$.mobile.changePage("#prefs");

	};
	
	self.getCourseGeneralData = function (course_id) {
		var data = { course_id : course_id };
		apexEventProxy.getCourseData(
			{ data : data },
			function (data) {
				self.courseName(data.course.name);
				self.courseAlias(data.course.alias);
				
				if (self.playerDefaultTee() == "yellow") {
					if (self.playerGender ()== "Male") {
						self.courseCr(data.course.crYellowMen);
						self.courseSl(data.course.slYellowMen);
					}
					else {
						self.courseCr(data.course.crYellowLadies);
						self.courseSl(data.course.slYellowLadies);
					}
				}
				
				else if (self.playerDefaultTee() == "blue") {
					if (self.playerGender() == "Male") {
						self.courseCr(data.course.crBlueMen);
						self.courseSl(data.course.slBlueMen);
					}
					else {
						self.courseCr(data.course.crBlueLadies);
						self.courseSl(data.course.slBlueLadies);
					}
				}
				
				else if (self.playerDefaultTee() == "red") {
					if (self.playerGender() == "Male") {
						self.courseCr(data.course.crRedMen);
						self.courseSl(data.course.slRedMen);
					}
					else {
						self.courseCr(data.course.crRedLadies);
						self.courseSl(data.course.slRedLadies);
					}
				}
				
				else {
					self.courseCr(data.course.crWhiteMen);
					self.courseSl(data.course.slWhiteMen);
				}
			}
		);
	};
	
	
	self.getHoleData = function(course_id) {
		var data = { course_id : course_id };
		apexEventProxy.getHoleData(
			{ data : data },
			function (data) {
				if (self.playerDefaultTee() == "yellow") {
					for (var i = 0, m = data.holes.length; i < m; i++) {
						self.holes.push({
							hole_number: ko.observable(data.holes[i].hole_number),
							hole_par: ko.observable(data.holes[i].par),
							hole_hcp: ko.observable(data.holes[i].hcp),
							hole_length: ko.observable(data.holes[i].length_yellow)
							});
						};
					}
				else if (self.playerDefaultTee() == "blue") {
					for (var i = 0, m = data.holes.length; i < m; i++) {
						self.holes.push({
							hole_number: ko.observable(data.holes[i].hole_number),
							hole_par: ko.observable(data.holes[i].par),
							hole_hcp: ko.observable(data.holes[i].hcp),
							hole_length: ko.observable(data.holes[i].length_blue)
							});
						};
					}
				else if (self.playerDefaultTee() == "white") {
					for (var i = 0, m = data.holes.length; i < m; i++) {
						self.holes.push({
							hole_number: ko.observable(data.holes[i].hole_number),
							hole_par: ko.observable(data.holes[i].par),
							hole_hcp: ko.observable(data.holes[i].hcp),
							hole_length: ko.observable(data.holes[i].length_white)
							});
						};
					}
				else {
					for (var i = 0, m = data.holes.length; i < m; i++) {
						self.holes.push({
							hole_number: ko.observable(data.holes[i].hole_number),
							hole_par: ko.observable(data.holes[i].par),
							hole_hcp: ko.observable(data.holes[i].hcp),
							hole_length: ko.observable(data.holes[i].length_red)
							});
						};
					}
				self.setHoleData(); 
			}
		);
	};
	
	self.leaveRound = function () {
		self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore());
		$.mobile.changePage("#f_page");
		
	};
		
	
	self.saveHoleScore = function(round_id, round_hcp, hole_id, hole_score) {
		var data = {
			round_id : round_id,
			round_hcp : round_hcp,
			hole_id : hole_id,
			hole_score : hole_score
		};
		
		apexEventProxy.createNewRoundScore(
			{ data : data },
			function (data)	{
			}
		);
	};
	
	
	self.startNewRound = function(course_id) {
		var data = { course_id : course_id };
		apexEventProxy.createNewRound(
			{ data : data},
			function (data) {
				var round_id = data.round_id;
				var start_time = data.round_start_time;
				var data = {
					round_id: round_id
				};
				apexEventProxy.createNewRoundGolfer(
					{ data : data },
					function (data)	{
						self.round_id(round_id);
						self.course_id(course_id);
						self.round_hcp(self.playerExactHcp());
						self.roundStartTime(start_time);
					}
				);
			}
		);
		self.getCourseGeneralData(course_id);
		self.getHoleData(course_id);
		prePopulateScores();
		
		$.mobile.changePage("#s_page");
	};
			
	self.getCourseNameById = function(course_id) {
		var data = { course_id: course_id }
		var course_name;
		apexEventProxy.getCourseData(
			{ data : data },
			function (data) {
				self.tempcoursename(data.course.name);
				alert (data.course.name);
				return data.course.name;
			}
		);
//		alert (self.tempcoursename());
//		return self.tempcoursename();
	}
	
	self.getRoundList = ko.computed(function () {
		var a;
//		var round_list = {};
		apexEventProxy.getRoundList(
			{ a : a },
			function (data) {
				for (var i = 0, m = data.rounds.length; i < m; i++) {
					self.roundList.push({
						id: data.rounds[i].id,
						course_name: data.courses[i].name,
						start_time : data.rounds[i].start_time
					});
				}
			}
		);
	});
	
	self.getRoundList();
	
	self.getCourseList = ko.computed(function (callback) {
		var a;
		apexEventProxy.getCourseList(
		{ a : a },
		function(data) {
//			alert(data.courses[0].name);
			for (var i = 0, m = data.courses.length; i < m; i++) {
				self.courseList.push(data.courses[i]);
				}
			}
		);
	});


	
	self.saveGolfer = function (callback) {
		var data = {
			handicap: self.playerExactHcp(),
			tee: self.playerDefaultTee(),
			gender: self.playerGender()
		};
		apexEventProxy.saveGolferData(
			{ data : data },
			function (data) {
				$.mobile.changePage('#f_page');
			}
		);
	};

	self.getGolferData = function (callback) {
			var a;
			apexEventProxy.getGolferData(
			{ a : a },
			function(data) {
				self.playerName(data.golfer.name);
				self.playerExactHcp(data.golfer.handicap);
				self.playerDefaultTee(data.golfer.tee);
				self.playerGender(data.golfer.gender);
			}
		);
	
	};
	
	self.getGolferData();
	self.getCourseList();
	
	
	self.hcpScroller = function () {
		var whl1 = {'-2':'-2', '-1':'-1', '0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10','11':'11','12':'12','13':'13','14':'14','15':'15','16':'16','17':'17','18':'18','19':'19','20':'20','21':'21','22':'22','23':'23','24':'24','25':'25','26':'26','27':'27','28':'28','29':'29','30':'30','31':'31','32':'32','33':'33','34':'34','35':'35','36':'36','37':'37','38':'38','39':'39','40':'40','41':'41','42':'42','43':'43','44':'44','45':'45','46':'46','47':'47','48':'48','49':'49','50':'50','51':'51','52':'52','53':'53' 
		   };
	
		var whl2 = {'0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9'
			};
	
		var wheel = [{},{}];
	
		wheel[0]['Wheel1'] = whl1;
		wheel[1]['Wheel2'] = whl2;

		$('#i').scroller({
			display: 'inline',
			mode: 'scroller',
			theme: 'android',
			wheels: wheel,
			width: 20,
			height: 30,
			showLabel: false,
			formatResult: function (a) {
				var i = a[0] + "." + a[1];
				return i;
			}
		});    
			
		var hcp = parseFloat(self.playerExactHcp());
		hcp = hcp.toFixed(1);
		var t = [];
		t = hcp.split(".");
		
		$('#i').scroller('setValue', t, true, 1);
			
	};
			
	self.loadCourseSelect = function () {
		$.mobile.changePage('#courseSelect');
	}
}	
	

// end viewModel




/* function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
} */

/*
var imgArray = ['img/handle0.png', 'img/handleplus1.png', 'img/handleplus2.png', 'img/handleminus1.png', 'img/handleminus2.png'];

preload(imgArray); */

		


//$(document).ready(function(){


//$(document).unbind('pageinit');

//$(document).bind('pageinit', function() {
//	$.mobile.ignoreContentEnabled = true;


/*	$("#scoreCard").on('pageshow'), function() {
//		$("scoreCard").trigger("create");
// 		$("#scoreCard").trigger("refresh");
 		alert ("sup");
	}; */



//ko.applyBindings(vm);



window.vm = new viewModel();

$(document).on('pageinit', function() {
	
	window.vm = new viewModel();
//	ko.applyBindings(vm);
	ko.applyBindings(vm, document.getElementById("f_page"));

		
	ko.applyBindings(vm, document.getElementById("scoreCard"));

	ko.applyBindings(vm, document.getElementById("courseSelect"));
	
	$('#s_page').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("s_page"))
	});
	
	$('#prefs').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("prefs"));
		vm.hcpScroller();

//		$("#prefs").selectmenu();
  //      $("#prefs").selectmenu('refresh', true);
	});
		
	
	$(document).off('pageinit');

});	
	
	
//	vm.sliderVal(0);
	
//	$('#f_page').on('pageinit', function() {
	//	ko.applyBindings(vm, document.getElementById("f_page"))});
	
//	$('#s_page').on('pageinit', function() {
	//	ko.applyBindings(vm, document.getElementById("s_page"))});
//	$('#s_page').off('pageinit');

//	$('#s_page').off('pageinit');

		
	//$(document).on('pageinit', '#s_page', function () {
//	ko.applyBindings(vm, document.getElementById("s_page"));
//	ko.applyBindings(vm, document.getElementById("f_page"));
//	ko.applyBindings(vm, document.getElementById("scoreCard"));

//	$(document).unbind('pageinit', '#s_page');
//	$(document).unbind('pageinit');
//});
	
	/*


$(document).on('pageinit', '#scoreCard', function () {
	window.vm = new viewModel();
	ko.applyBindings(viewModel, document.getElementById("scoreCard"));
});

$(document).on('pageinit', '#f_page', function () {
	window.vm = new viewModel();
	ko.applyBindings(viewModel, document.getElementById("f_page"));
	});
	*/
/*	
		$("#s_page").unbind('pageinit');
	}); */

/*	
	$("#f_page").bind('pageinit', function () {
		ko.applyBindings(viewModel, document.getElementById("f_page"));
	}); */


	
//	$(document).unbind('pageinit');
//});



//	$.mobile.loadPage("#scoreCard");

//	vm.sliderVal(0);
//	vm.getCourse();

//	vm.getRounds();

	


