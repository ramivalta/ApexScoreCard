Number.prototype.mod = function(n) {
return ((this%n)+n)%n;
};

function viewModel () {
	var self = this;

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
	self.round_tee = ko.observable();
	self.roundStartTime = ko.observable();
	self.roundEndTime = ko.observable("");
	
	self.noScoreEntered = ko.observable(true);
	self.showPoints = ko.observable(false);
	self.sliderVal = ko.observable(0);
	self.hasSlid = ko.observable(false);
	self.loadedRoundStartTime = ko.observable("");

	self.holes = ko.observableArray([]);
	self.courseData = ko.observableArray([]);
	self.roundScores = ko.observableArray([]);
	self.roundList = ko.observableArray([]);

	self.recentlyPlayedCourses = ko.observableArray([]); 

	self.courseList = ko.observableArray([]);

//	self.totalToPar = ko.observable();
	self.scoreCard = ko.observableArray();
	
	self.scrollPos = ko.observable();
	self.roundDuration = ko.observable();
	self.firstRun = ko.observable("working");
	
	self.clickedRound = ko.observable();
	self.clickedRoundStartTime = ko.observable("");
	self.hcpPreview = ko.observable("");
	
	self.bogikorttiVersion = ko.observable("Bogikortti 0.1 - Bugikortti");
	
	self.prePopulateScores = function () {
		for (var i = 0; i < 18; i++) {
			var el = {};
			el.hole = ko.observable(i + 1);
			el.score = ko.observable(0);
			el.points = ko.observable(0);
			el.scoreToPar = ko.observable(0);
			self.roundScores.push(el);
		}
	};
	
	self.prePopulateScores();
	
	
	self.loadRecentCourses = function () {
		self.recentlyPlayedCourses.removeAll();
		var data;

		apexEventProxy.getRecentCourses(
			{ data : data },
			function (data) {
				for (var i = 0; i < data.courses.length; i++) {
					var l = {};
					l.id = data.courses[i].id;
					l.name = data.courses[i].name;
					l.alias = data.courses[i].alias;
					self.recentlyPlayedCourses.push(l);
				}
			}
		);

	};

	self.loadRecentCourses();

	self.calcRoundDuration = function() {
		var secs;
		if (self.roundEndTime() !== "") {
			secs = moment(self.roundEndTime()).diff(self.roundStartTime(), 'seconds');
		}
		else {
			var date = new Date();
			var temp = date.getFullYear() + "/" + parseInt(date.getMonth() + 1, 10) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
			var formatted = moment(temp).format("YYYY-MM-DD HH:mm:ss"); 
			secs = moment(formatted).diff(self.roundStartTime(), 'seconds');
		}			
		
		var hours = secs / 3600;
		var seconds = secs.mod(3600);
		var minutes = seconds / 60;
		seconds = seconds.mod(60);
		
		if (hours < 1) {
			hours = "";
		}
		else {
			hours = (Math.floor(hours) + " h");
		}
		
		minutes = (Math.floor(minutes) + " min");
		self.roundDuration(hours + " " + minutes);
	};

	self.coursePar = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_par(), 10);
			}
		return s;
	});

	self.courseLength = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_length(), 10);
			}
		return s;
	});

	self.holeScoreName = ko.computed(function() {
		if (self.noScoreEntered()) {
			return "";
			}
		else if (self.currentHoleScore() === 0) {
			return "";
			}
		else {			
			var x = self.currentHoleScore() - self.currentHolePar();
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
			s = s + parseInt(self.roundScores()[n].score(), 10);
		}
		return s;
	});
		
	self.totalPoints = ko.computed(function() {
		var s = 0;
		for (var n = 0, m = self.roundScores().length; n < m; n++) {
			s = s + parseInt(self.roundScores()[n].points(), 10);
		}
		return s;
	});

	self.playerPlayingHcp = ko.computed(function () {
		/* GA PLAYING HANDICAP FORMULA the “EGA Playing Handicap Formula” converts exact handicaps into playing handicaps. PLAYING HCP = EXACT HCP x (SR / 113) + (CR - PAR) */
		var a = parseFloat(self.round_hcp());
		var b = parseFloat(self.courseSl()) / 113;
		var par;
		
		if (self.holes().length === 9) {
			par = self.coursePar() * 2;
		}
		else { par = self.coursePar(); }
		
		var c = parseFloat(self.courseCr()) - parseFloat(par);
		var playhcp = a * b + c;
		return Math.round(playhcp);
	});
		
	self.currentHoleHcpPar = ko.computed(function () {
		var par = self.currentHolePar();
		var crhcp = parseInt(self.playerPlayingHcp(), 10);
		var baseadj, hcpholes;
		baseadj = Math.floor(crhcp / 18);
		hcpholes = (crhcp.mod(18));
		
		if (hcpholes >= parseInt(self.currentHoleHcp(), 10)) {
			return parseInt(self.currentHolePar(), 10) + baseadj + 1;
			}
		else {
			return parseInt(par, 10) + parseInt(baseadj, 10);
		}
	});
	
	self.setHoleData = function () {
		var idx = parseInt(self.currentHole(), 10) -1;
		
		var par = parseInt(self.holes()[idx].hole_par(), 10);
		self.currentHolePar(par);
		self.currentHoleHcp(parseInt(self.holes()[idx].hole_hcp(), 10));
		self.currentHoleLength(self.holes()[idx].hole_length());
	
		var curHole = parseInt(self.currentHole(), 10);
		var curScore = parseInt(self.currentHoleScore(), 10);
		var curPoints = parseInt(self.currentHolePoints(), 10);
				
		for (var i = 0; i < self.roundScores().length; i++) {
			if (self.roundScores()[i].hole() === curHole) {
				self.currentHoleScore(parseInt(self.roundScores()[i].score(), 10));
				self.noScoreEntered(false);
			}
		}
		
		if (self.currentHoleScore() === 0) {
			self.noScoreEntered(true);
		}
	};
		
	self.nextHole = function () {
		var curHole = parseInt(self.currentHole(), 10);
		
		self.saveHoleScore(self.round_id(), self.round_hcp(), curHole, self.currentHoleScore(), self.round_tee());

		self.showPoints(false);
		self.noScoreEntered(true);

		var c_len = self.holes().length;
		if (curHole === c_len) {
			self.currentHole(1);
			self.setHoleData();
		}
		else {
			self.currentHole(curHole + 1);
			self.setHoleData();
		}
		$.mobile.changePage('#s_page', { transition: "slidefade",
                                    allowSamePageTransition: true});
	};
	
	self.previousHole = function() {
		var curHole = parseInt(self.currentHole(), 10);
		
		self.saveHoleScore(self.round_id(), self.round_hcp(), curHole, self.currentHoleScore(), self.round_tee());

		self.noScoreEntered(false);

		var c_len = self.holes().length;
		if (curHole === 1) {
			self.currentHole(c_len);
			self.setHoleData();
		}
		else {
			self.currentHole(curHole - 1);
			self.setHoleData();
		}
		
		$.mobile.changePage('#s_page', { transition: "slidefade", reverse: true,
                                    allowSamePageTransition: true});
	};
	
	self.currentHolePoints = ko.computed(function() {
		var curHcpPar = parseInt(self.currentHoleHcpPar(), 10);
		var curScore = parseInt(self.currentHoleScore(), 10);
		
		if (self.noScoreEntered() || curScore === 0) {
			self.showPoints(false);
			return 0;
			}
		else {		
			var y = curHcpPar - curScore + 2;
			self.showPoints(true);
			if (y > 0) {
				return (y + " points");
				}
			else {
				return (0 + " points");
			}
		}
	});
	
	self.sliderMove = function () {
	
		var sVal = parseInt(self.sliderVal(), 10);

		if (sVal <25 && sVal >= 0 || sVal <= 0 && sVal > -25 ) {
			if (self.noScoreEntered()) {
				self.currentHoleScore(self.currentHolePar());
				self.noScoreEntered(false);
			}
		} 

		if (sVal >= 26) {
			if (self.noScoreEntered()) {
				self.currentHoleScore(self.currentHolePar());
			}
			self.upScore() ;
			self.noScoreEntered(false);
		}
			
		if (sVal < -26) {
			if (self.noScoreEntered()) {
				self.currentHoleScore(self.currentHolePar());
			}
			self.downScore();
			self.noScoreEntered(false);
		}
			
		var curHole = parseInt(self.currentHole(), 10);
		var curScore = parseInt(self.currentHoleScore(), 10);
		var curPoints = parseInt(self.currentHolePoints(), 10);
		var curHolePar = parseInt(self.currentHolePar(), 10);

		self.setScore(curHole, curScore, curPoints, curHolePar);
	};
	
	self.setScore = function (hole, score, points, holePar) {
		for (var i = 0; i < self.roundScores().length; i++) {
			if (self.roundScores()[i].hole() === hole) {
				self.roundScores()[i].score(score);
				self.roundScores()[i].points(points);
				self.roundScores()[i].scoreToPar(score - holePar);
			}
		}
	};
		
	
	self.upScore = function () {
		if (self.hasSlid() === false) {
			var y = self.currentHoleScore();
			self.currentHoleScore(parseInt(y, 10) + 1);
			$("#score").animate({ 
				fontSize: "1.05em" 
					}, 50, function() {
						$("#score").animate({ 
							fontSize: "1em"
						}, 300 );
					}
				);
			}
		self.hasSlid(true);
	};
	
	self.downScore = function () {
		if (self.hasSlid() === false) {
			var y = parseInt(self.currentHoleScore(), 10);
			if (y !== 0) {
				self.currentHoleScore(parseInt(y, 10) - 1);
				$("#score").animate({ 
				fontSize: "0.95em"
					}, 50, function() {
						$("#score").animate({ 
							fontSize: "1em"
						}, 300 );
					}
				);
			}
		self.hasSlid(true);
		}
	};
	
	
	self.resetSlider = function () {
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
//			console.log("listview refresh");
				var instance = $.data(element, 'listview');
				if (instance) {
					$(element).listview('refresh', true);
					}
			}, 0);
		}
	};
	
    ko.bindingHandlers.mobileradio = {
		init: function (element, valueAccessor) {
		},
		update: function (element, valueAccessor) {
			var value = valueAccessor();
			var valueUnwrapped = ko.utils.unwrapObservable(value);
			if (valueUnwrapped === $(element).val()) {
				$(element).prop("checked", "true").checkboxradio("refresh");
			} else {
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
		if (self.loadedRoundStartTime() !== "") {
//			var el = $("span:contains('" + self.loadedRoundStartTime() + "')");
//			el.parent().parent().parent().parent().parent().attr('style', '');
			self.scrollPos(0);
			self.loadedRoundStartTime("");
		}
		$.mobile.changePage('#prefs', { transition: "slidefade", reverse:true });

	};
	
	self.getCourseGeneralData = function (course_id) {
		var data = { course_id : course_id };
		apexEventProxy.getCourseData(
			{ data : data },
			function (data) {
				self.courseName(data.course.name);
				self.courseAlias(data.course.alias);
				
				if (self.playerDefaultTee() === "yellow") {
					if (self.playerGender() === "Male") {
						self.courseCr(data.course.crYellowMen);
						self.courseSl(data.course.slYellowMen);
					}
					else {
						self.courseCr(data.course.crYellowLadies);
						self.courseSl(data.course.slYellowLadies);
					}
				}
				
				else if (self.playerDefaultTee() === "blue") {
					if (self.playerGender() === "Male") {
						self.courseCr(data.course.crBlueMen);
						self.courseSl(data.course.slBlueMen);
					}
					else {
						self.courseCr(data.course.crBlueLadies);
						self.courseSl(data.course.slBlueLadies);
					}
				}
				
				else if (self.playerDefaultTee() === "red") {
					if (self.playerGender() === "Male") {
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
				var i, m;

				if (self.playerDefaultTee() === "yellow") {
					for (i = 0, m = data.holes.length; i < m; i++) {
						self.holes.push({
							hole_number: ko.observable(data.holes[i].hole_number),
							hole_par: ko.observable(data.holes[i].par),
							hole_hcp: ko.observable(data.holes[i].hcp),
							hole_length: ko.observable(data.holes[i].length_yellow)
							});
						}
					}
				else if (self.playerDefaultTee() === "blue") {
					for (i = 0, m = data.holes.length; i < m; i++) {
						self.holes.push({
							hole_number: ko.observable(data.holes[i].hole_number),
							hole_par: ko.observable(data.holes[i].par),
							hole_hcp: ko.observable(data.holes[i].hcp),
							hole_length: ko.observable(data.holes[i].length_blue)
							});
						}
					}
				else if (self.playerDefaultTee() === "white") {
					for (i = 0, m = data.holes.length; i < m; i++) {
						self.holes.push({
							hole_number: ko.observable(data.holes[i].hole_number),
							hole_par: ko.observable(data.holes[i].par),
							hole_hcp: ko.observable(data.holes[i].hcp),
							hole_length: ko.observable(data.holes[i].length_white)
							});
						}
					}
				else {
					for (i = 0, m = data.holes.length; i < m; i++) {
						self.holes.push({
							hole_number: ko.observable(data.holes[i].hole_number),
							hole_par: ko.observable(data.holes[i].par),
							hole_hcp: ko.observable(data.holes[i].hcp),
							hole_length: ko.observable(data.holes[i].length_red)
							});
						}
					}
				
				self.setHoleData();
			}
		);
	};
	
	self.leaveRound = function () {
		self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore(), self.round_tee());

		if (self.roundEndTime() === "")
		{
			var d = new Date();
			d = d.format("yyyy-mm-dd HH:MM:ss");
			var data = { 
				round_id : self.round_id(),
				end_time : d
			};
			apexEventProxy.endRound(
				{ data : data },
				function (data) {
					
				}
			);
			if (self.firstRun() === true) {
				self.firstRun(false);
			}
		}

		for (var i = 0; i < self.roundList().length; i++) {
			if (self.roundList()[i].id === self.round_id()) {
				self.roundList()[i].score(self.totalScore());
				self.roundList()[i].par(self.coursePar());

			}
		}

		self.roundEndTime("");
		self.scoreCard.removeAll();
		self.roundScores.removeAll();
		self.prePopulateScores();

		$.mobile.changePage("#f_page", { transition: "slidefade", reverse: true });
	};
		
	
	self.saveHoleScore = function(round_id, round_hcp, hole_id, hole_score, round_tee) {
		var data = {
			round_id : round_id,
			round_hcp : round_hcp,
			hole_id : hole_id,
			hole_score : hole_score,
			round_tee : round_tee
		};
		
		apexEventProxy.createNewRoundScore(
			{ data : data },
			function (data)	{
			}
		);
	};
	
	
	self.startNewRound = function(course_id, course_name) {
	
		self.holes.removeAll();
		
//		console.log("course id: " + course_id);
//		console.log("course name: " + course_name);
	
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
						self.roundStartTime(start_time.date);
						self.round_hcp(self.playerExactHcp());
						self.round_tee(self.playerDefaultTee());
						
						self.roundList.unshift({
							id : round_id,
							course_name : course_name,
							start_time : start_time,
							score : ko.observable(),
							par : ko.observable()
						});
						
						self.loadRecentCourses();
					}
				);
			}
		);
		self.getCourseGeneralData(course_id);
		self.getHoleData(course_id);
		
		self.currentHole(1); // kymppireiältä alkavat kierrokset?
		
		$.mobile.changePage('#s_page', { transition: "slidefade",
                                    allowSamePageTransition: true});
	};
	
	self.highlightLoaded = function(start_time) {
		if (start_time == self.loadedRoundStartTime()) return true;

		else return false;
	};
	
	self.highlightDeleted = function(start_time) {
		if (start_time == self.clickedRoundStartTime()) {
			if (self.highlightLoaded(start_time) === true) {
				self.loadedRoundStartTime("");
			}
			return true;
		}

		else return false;
	};
	
	self.loadRound = function(round_id, start_time) {

		var loc = $(window).scrollTop();
		self.scrollPos(loc);

//		if (self.loadedRoundStartTime() !== "") {
//			var el = $("span:contains('" + self.loadedRoundStartTime() + "')");
	//		el.parent().parent().parent().parent().parent().attr('style', '');
//		}

		self.loadedRoundStartTime(start_time);
		self.holes.removeAll();

		var data = { round_id : round_id };
		apexEventProxy.getRound(
			{ data : data },
			function (data) {
				var course_id = data.round.course_id;
				var start_time = data.round.start_time;
				var end_time = data.round.end_time;
				self.getRoundScores(round_id);
				self.getCourseGeneralData(course_id);
				self.getHoleData(course_id);
				self.round_id(round_id);
				self.course_id(course_id);
				self.roundStartTime(start_time.date);
				if (end_time === null) {
					self.roundEndTime("");					
				}
				else {
					self.roundEndTime(end_time.date);
				}
			}
		);
	
		$.mobile.changePage('#s_page', { transition: "slidefade", allowSamePageTransition: true});
	};
	
	self.el = ko.observable();
	
	self.deleteRoundDialog = function(round_id, start_time) {
		self.clickedRound(round_id);

		if (start_time) {
			var el = $("span:contains('" + start_time + "')");
			self.el(el);
			self.clickedRoundStartTime(start_time);
		}
		

		$("#delPopUp").popup( "open", { transition: "pop", positionTo: '#f_header'  });
		
/*		$.mobile.changePage("#delPopUp", { transition: "pop", role: "popup" }); */
		
	};
	
	self.deleteRound = function() {

		var el = self.el();
		var elli = el.parent().parent().parent().parent();
		$(elli).slideUp();
		
		
		var data = { round_id : self.clickedRound() };
		apexEventProxy.deleteRound(
			{ data : data },
			function (data) {
				for (var i = 0; i < self.roundList().length; i++) {
					if (self.roundList()[i].id === self.clickedRound()) {
						self.roundList.splice(i, 1);
						if (self.roundList().length === 0) {
							self.firstRun(true);
						}
					}
				}
			}
		);

		self.clickedRoundStartTime("");
		
		$("#delPopUp").popup( "close", { transition: "fade" });
		
	};

	self.cancelRoundDelete = function() {
		if (self.clickedRoundStartTime() !== "") {
	//		var el = $("span:contains('" + self.clickedRoundStartTime() + "')");
		//	el.parent().parent().parent().parent().parent().attr('style', '');
			self.clickedRoundStartTime("");
		}	
		$("#delPopUp").popup( "close", { transition: "fade" });
	};

	self.getRoundScores = function(round_id) {
	
		var data = { round_id : round_id };
		apexEventProxy.getRoundScores(
			{ data : data },
			function (data) {
				for (var i = 0; i < data.scores.length; i++) {
					for (var z = 0; z < self.roundScores().length; z++) {
						if (self.roundScores()[z].hole() === data.scores[i].hole_id) {
							self.roundScores()[z].score(data.scores[i].score);
							self.round_hcp(data.scores[i].round_hcp);
							self.round_tee(data.scores[i].round_tee);
						}
					}
				}
				
				setTimeout(function () { 
					self.fillScoreCard();	
			    }, 500); // hax :(
				
				if (self.round_hcp() === "") {
					self.round_hcp(self.playerExactHcp());
	//				console.log("round_hcp not set");
				}
	
				if (self.round_tee() === "") {
					self.round_tee(self.playerDefaultTee());
//					console.log("round_tee not set");
				}
				
				self.currentHole(1);

				if (parseInt(self.roundScores()[0].score(), 10) !== 0) {
					self.currentHoleScore(parseInt(self.roundScores()[0].score(), 10));
					self.noScoreEntered(false);
				}
				else {
					self.noScoreEntered(true);
				}
			}
		);
	};
	
	self.getRoundList = function (callback) {
		var a;
		apexEventProxy.getRoundList(
			{ a : a },
			function (data) {
				if (data.message !== "fail") {
					for (var i = 0, m = data.rounds.length; i < m; i++) {
						self.roundList.push({
							id: data.rounds[i].id,
							course_name: data.courses[i].name,
							start_time : data.rounds[i].start_time,
							score : ko.observable(data.scores[i]),
							par : ko.observable(data.pars[i])
						});
					if (self.roundList().length > 0) {
						self.firstRun(false);

					}
						else { self.firstRun(true);
					}
	//				alert (data.rounds[i].start_time.date)
					}
	//			$.mobile.loading("hide");
				}
				else {
					self.firstRun(true);
				}
				
			}
		);
	};
	
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
				$.mobile.changePage('#f_page', { transition: "slidefade" });
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
		
	self.showScoreCard = function () {
		self.fillScoreCard();
		$.mobile.changePage("#scoreCard", { transition: 'slidedown', role: 'dialog'});
	};
	
	self.totalToPar = ko.computed(function() {
		var toPar = 0;
		var y;
		for (var i = 0; i < self.roundScores().length; i++) {
			y = parseInt(self.roundScores()[i].score(), 10);
			if (y > 0) toPar += y - parseInt(self.holes()[i].hole_par(), 10);
		}
		
		return toPar;
		
	}).extend({throttle: 500 });
	
	self.validateRound = ko.computed(function() {
		var h = self.holes().length;
		for (var i = 0; i < h; i++) {
			var y = parseInt(self.roundScores()[i].score(), 10);
			if (y === 0) {
				return false;
			}

		}
		return true;
		
	}).extend({throttle: 1000 });
	
	self.fillScoreCard = function (callback) {
		self.scoreCard.removeAll();
		for (var i = 0; i < self.holes().length; i++) {
		
			var t = self.getHolePoints(self.roundScores()[i].score(), self.holes()[i].hole_par(), self.holes()[i].hole_hcp()); 

			self.roundScores()[i].points(t); // laitetaan scorenäkymälle näkyvään observableen 
	
			var p;
			if (self.roundScores()[i].score() > 0) {
				p = self.roundScores()[i].score() - self.holes()[i].hole_par();
			}
			else { p = 0; }

			var line = {
				hole_number : self.holes()[i].hole_number,
				hole_par : self.holes()[i].hole_par,
				hole_hcp : self.holes()[i].hole_hcp,
				hole_length : self.holes()[i].hole_length,
				score : self.roundScores()[i].score,
				scoreToPar : p,
				points : t
			};
			
			self.scoreCard.push(line);
		}
		self.calcHcpPreview();

	};
	
	self.getHolePoints = function(score, par, hole_hcp) {
		
		score = parseInt(score, 10);
		par = parseInt(par, 10);
		hole_hcp = parseInt(hole_hcp, 10);
		
		var crhcp = parseInt(self.playerPlayingHcp(), 10);
		var baseadj, hcpholes, hole_hcp_par;
		baseadj = Math.floor(crhcp / 18);
		hcpholes = (crhcp.mod(18));
		
		if (hcpholes >= hole_hcp) {
			hole_hcp_par = par + baseadj + 1;
			}
		else {
			hole_hcp_par = par + parseInt(baseadj, 10);
			}
		
		if (score === 0)
			{
				return 0;
			}
		else {		
			var y = hole_hcp_par - score + 2;
			if (y > 0)
			{
				return y;
			}
			else
			{
				return 0;
			}
		}
	};
		
	self.getGolferData();
	self.getCourseList();
	
	
	self.hcpScroller = function () {
		var whl1 = {
		'-3':'-3','-2':'-2','-1':'-1','0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10','11':'11','12':'12','13':'13','14':'14','15':'15','16':'16','17':'17','18':'18','19':'19','20':'20','21':'21','22':'22','23':'23','24':'24','25':'25','26':'26','27':'27','28':'28','29':'29','30':'30','31':'31','32':'32','33':'33','34':'34','35':'35','36':'36','37':'37','38':'38','39':'39','40':'40','41':'41','42':'42','43':'43','44':'44','45':'45','46':'46','47':'47','48':'48','49':'49','50':'50','51':'51','52':'52','53':'53', '54':'54'
		};
	
		var whl2 = {'0':'.0','1':'.1','2':'.2','3':'.3','4':'.4','5':'.5','6':'.6','7':'.7','8':'.8','9':'.9'
			};
	
		var wheel = [{},{}];
	
		wheel[0]['Wheel1'] = whl1;
		wheel[1]['Wheel2'] = whl2;

		$('#i').scroller({
			display: 'inline',
			mode: 'scroller',
			theme: 'ios',
			wheels: wheel,
			width: 50,
			height: 30,
			showLabel: false,
			formatResult: function (a) {
				var i = a[0] + "." + a[1];
//				var i = a[0] + a[1];
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
		if (self.loadedRoundStartTime() !== "") {
//			var el = $("span:contains('" + self.loadedRoundStartTime() + "')");
//			el.parent().parent().parent().parent().parent().attr('style', '');
			self.scrollPos(0);
		}
		self.loadedRoundStartTime("");
		$.mobile.changePage('#courseSelect', { transition: "slidefade" });

	};
	
	self.getHcpGroup = function(hcp) {
	
		var h = hcp;
		var num_holes = self.holes().length;
		var group = {};
		
	
		if (h >= 36.1) {
			group.factor = 1;
			group.buffer = 0;
			group.incr = 0;
		}
			
		if (h >= 26.5 && h <= 36.0) {
			group.factor = 0.5;
			group.incr = 0.2;
			if (num_holes === 9) group.buffer = 3;
			else group.buffer = 5;
		}
			
		if (h >= 18.5 && h <= 26.4) {
			group.factor = 0.4;
			group.incr = 0.1;
			if (num_holes === 9) group.buffer = 2;
			else group.buffer = 4;
		}
			
		if (h >= 11.5 && h <= 18.4) {
			if (num_holes === 9) return "9hole";
			else group.buffer = 3;
			group.factor = 0.3;
			group.incr = 0.1;
		}
			
		if (h >= 4.5 && h <= 11.4) {
			if (num_holes === 9) return "9hole";
			group.buffer = 2;
			group.factor = 0.2;
			group.incr = 0.1;
		}
			
		if (h <= 4.4) {
			if (num_holes === 9) return "9hole";
			group.factor = 0.1;
			group.incr = 0.1;
			group.buffer = 1;
		}

/*		console.log("factor: " + group.factor);
		console.log("incr: " + group.incr);
		console.log("buffer: " + group.buffer); */
		return group;
		
	}
	
	self.calcHcpPreview = function() {
		var p = parseInt(self.totalPoints(), 10);
		var hcp = parseFloat(self.playerExactHcp());

		var num_holes = parseInt(self.holes().length, 10);
		var par_points;
		
		if (num_holes === 9) par_points = 18;
		else par_points = 36;
		
		var group;

		if (p > par_points ) {
			while (p > par_points) {
				group = self.getHcpGroup(hcp);
				if (group == "9hole") {
					self.hcpPreview("N/a for 9 hole rounds");
					return;
				}
				hcp = hcp - (1 * group.factor);
				p--;
			}
			self.hcpPreview(parseFloat(hcp).toFixed(1));
		}
		
		else {
			group = self.getHcpGroup(hcp);
			if (group == "9hole") {
				self.hcpPreview("N/a for 9 hole rounds");
				return;
			}
			if (p >= par_points - group.buffer)	self.hcpPreview(hcp);
			else self.hcpPreview(hcp + group.incr);
		}
		
	};
	
}	
	
	
$(document).on('pageinit', function() {

	window.vm = new viewModel();
	
	ko.virtualElements.allowedBindings.mobileList = true;

	
	ko.applyBindings(vm, document.getElementById("f_page"));
	
	
	$('#f_page').on('pageshow', function() {
		if (vm.loadedRoundStartTime() !== "") {
//			var el = $("span:contains('" + vm.loadedRoundStartTime() + "')");
//			el.parent().parent().parent().parent().parent().attr('style', 'background: #D7DBDD !important');
			$.mobile.silentScroll(vm.scrollPos());
		}

	});
	
	$('#courseSelect').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("courseSelect"));
	});
	
	$('#scoreCard').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("scoreCard"));
	});
	
	$('#s_page').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("s_page"));
	});


	$('#s_page').on('pageshow', function(e) {
	
 	// https://github.com/jquery/jquery-mobile/issues/4078
	//	$(this).addClass('ui-page-active');

		vm.calcRoundDuration();
		var clock = setInterval(function() { 
			vm.calcRoundDuration();
		} , 20000); 
		
	});
	
	$('#s_page').on('pagehide', function() {
//		if (clock) {
	//		clearInterval(clock);
		//}
	});

	$('#prefs').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("prefs"));
		vm.hcpScroller();
	});
	
	$(document).off('pageinit');
});	
