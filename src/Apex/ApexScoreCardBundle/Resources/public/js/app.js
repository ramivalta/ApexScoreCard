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
	self.locale_tee = ko.observable();
	
	self.round_id = ko.observable();
	self.course_id = ko.observable();
	self.round_hcp = ko.observable();
	self.round_tee = ko.observable();
	self.roundStartTime = ko.observable();
	self.roundEndTime = ko.observable("");
	
	
	self.courseCrYellowMen = ko.observable();
	self.courseSlYellowMen = ko.observable();
	self.courseCrYellowLadies = ko.observable();
	self.courseSlYellowLadies = ko.observable();

	self.courseCrBlueMen = ko.observable();
	self.courseSlBlueMen = ko.observable();

	self.courseCrBlueLadies = ko.observable();
	self.courseSlBlueLadies = ko.observable();
			
	self.courseCrRedMen = ko.observable();
	self.courseSlRedMen = ko.observable();

	self.courseCrRedLadies = ko.observable();
	self.courseSlRedLadies = ko.observable();

	self.courseCrWhiteMen = ko.observable();
	self.courseSlWhiteMen = ko.observable();
	
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
	
	self.roundFinished = ko.observable(false);
	
	self.cachedScore = ko.observable(0);
	
	self.bogikorttiVersion = ko.observable("Bogikortti v0.2.3 - 'Bogi se on tuplabogikin'");
	
	self.prePopulateScores = function () {
//		if (self.roundScores().length > 0) self.roundScores.removeAll();

//		self.round_tee = ko.observable();
//		self.round_hcp = ko.observable();


		for (var i = 0; i < 18; i++) {
			var el = {};
			el.hole = ko.observable(i + 1);
			el.score = ko.observable(0);
			el.points = ko.observable(0);
			el.scoreToPar = ko.observable(0);
			self.roundScores.push(el);
		}
	};
	
	moment().lang('fi');
	
	self.prePopulateScores();
	
	self.translate_tee = function() {
		if (self.round_tee() === "yellow") return "keltainen";
		else if (self.round_tee() === "blue") return "sininen";
		else if (self.round_tee() === "red") return "punainen";
		else if (self.round_tee() === "white") return "valkoinen";
	};
	
	self.loadRecentCourses = function () {
		self.recentlyPlayedCourses.removeAll();
		var data;

		apexEventProxy.getRecentCourses(
			{ data : data },
			function (data) {
				if (data.message === "fail") {
					return;
				}
				else {
					for (var i = 0; i < data.courses.length; i++) {
						var l = {};
						l.id = data.courses[i].id;
						l.name = data.courses[i].name;
						l.alias = data.courses[i].alias;
						l.hole_count = data.courses[i].hole_count;
						self.recentlyPlayedCourses.push(l);
					}
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
	}).extend({throttle: 1 });

	self.courseLength = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			if (self.round_tee() === "yellow") s = s + parseInt(self.holes()[i].hole_length_yellow(), 10);
			else if (self.round_tee() === "blue")  s = s + parseInt(self.holes()[i].hole_length_blue(), 10);
			else if (self.round_tee() === "white") s = s + parseInt(self.holes()[i].hole_length_white(), 10);
			else if (self.round_tee() === "red")  s = s + parseInt(self.holes()[i].hole_length_red(), 10);	
		}
		return s;
	}).extend({throttle: 1 });

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
				case -3: return "Albatrossi";
				case 1: return "Bogi";
				case 2: return "Tuplabogi";
			}
			if (x > 2) {
				return x + " yli";
			}
			else if (x < -3) {
				return Math.abs(x) + " alle";
			}
		}
	}).extend({throttle: 1 });
	
	self.totalScore = ko.computed(function() {
		if (self.roundScores().length > 0) {
			var s = 0;
			for (var n = 0, m = self.roundScores().length; n < m; n++) {
				s += self.roundScores()[n].score();
			}
			return s;
		}
	}).extend({throttle: 1 });
		
	self.totalPoints = ko.computed(function() {
		if (self.roundScores().length > 0) {
			var s = 0;
			for (var n = 0, m = self.roundScores().length; n < m; n++) {
				s += self.roundScores()[n].points();
			}
			return s;
		}
	}).extend({throttle: 1 });

	self.playerPlayingHcp = ko.computed(function () {
		/* GA PLAYING HANDICAP FORMULA the “EGA Playing Handicap Formula” converts exact handicaps into playing handicaps. PLAYING HCP = EXACT HCP x (SR / 113) + (CR - PAR) */
		
	//	if (typeof self.round_hcp() === 'undefined' || typeof self.round_tee() === 'undefined' || typeof self.courseCr() === 'undefined' || typeof self.courseSl() === 'undefined' || typeof self.coursePar() === 'undefined' || typeof self.holes().length === 0) return false;
		
/*		console.log("round hcp: " + self.round_hcp());
		console.log("playing hcp: " + self.playerExactHcp());
		console.log("round tee: " + self.round_tee()); */
		
//		console.log(typeof self.round_tee());
//		console.log(self.round_tee());
		
		var courseSl;
		var courseCr;
		
		if (self.playerGender() === "Male") {
			if (self.round_tee() === "yellow") { 
				courseSl = self.courseSlYellowMen();
				courseCr = self.courseCrYellowMen();
			}
			else if (self.round_tee() === "blue") { 
				courseSl = self.courseSlBlueMen();
				courseCr = self.courseCrBlueMen();
			}
			else if (self.round_tee() === "red") { 
				courseSl = self.courseSlRedMen();
				courseCr = self.courseCrRedMen();
			}
			else if (self.round_tee() === "white") {
				courseSl = self.courseSlWhiteMen();
				courseCr = self.courseCrWhiteMen();
			}
		}
		
		else if (self.playerGender() === "Female") {
			if (self.round_tee() === "yellow") {
				courseSl = self.courseSlYellowLadies();
				courseCr = self.courseCrYellowLadies();
			}
			else if (self.round_tee() === "blue") { 
				courseSl = self.courseSlBlueLadies();
				courseCr = self.courseCrBlueLadies();
			}
			else if (self.round_tee() === "red") {
				courseSl = self.courseSlRedLadies();
				courseCr = self.courseCrRedLadies();
			}
			else if (self.round_tee() === "white") {
				courseSl = self.courseSlWhiteLadies();
				courseCr = self.courseCrWhiteLadies();
			}			
		}
		
		var a = parseFloat(self.round_hcp());
		var b = parseFloat(courseSl / 113);
		var par;
		
		if (self.holes().length === 9) { par = self.coursePar() * 2; }
		else if (self.holes().length === 18) { par = self.coursePar(); }
		else return false;
		
		var c = parseFloat(courseCr - parseFloat(par));
		var playhcp = a * b + c;
		
		if (isNaN(playhcp)) return false;
		
//		console.log(playhcp);
		
		return Math.round(playhcp);
	}).extend({throttle: 100 });
		
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
	}).extend({throttle: 1 });
	
	self.setHoleData = function (hole) {
		if (self.holes().length === 0)
			return false;
		
		var curHole = hole;
		
//		var curHole = parseInt(self.currentHole(), 10);
		var curScore = parseInt(self.currentHoleScore(), 10);
		var curPoints = parseInt(self.currentHolePoints(), 10);
	
		var idx = curHole - 1;
		
		var par = parseInt(self.holes()[idx].hole_par(), 10);
		self.currentHolePar(par);
		self.currentHoleHcp(parseInt(self.holes()[idx].hole_hcp(), 10));
//		console.log("setholedata round_tee: " + self.round_tee());
		
		if (self.round_tee() === "yellow") 		self.currentHoleLength(self.holes()[idx].hole_length_yellow());
		else if (self.round_tee() === "blue") self.currentHoleLength(self.holes()[idx].hole_length_blue());
		else if (self.round_tee() === "white") self.currentHoleLength(self.holes()[idx].hole_length_white());
		else if (self.round_tee() === "red") self.currentHoleLength(self.holes()[idx].hole_length_red());
		
		
//		self.currentHoleLength(self.holes()[idx].hole_length());

		for (var i = 0; i < self.roundScores().length; i++) {
			if (self.roundScores()[i].hole() === curHole) {
				self.currentHoleScore(parseInt(self.roundScores()[i].score(), 10));
				self.noScoreEntered(false);
			}
		}
		
		if (self.currentHoleScore() === 0) {
			self.noScoreEntered(true);
		}

//		self.saveHoleScore(self.round_id(), self.round_hcp(), curHole, curScore, self.round_tee());
		
		self.cachedScore( {
			round_id: self.round_id(),
			round_hcp : self.round_hcp(),
			hole_id : hole,
			hole_score : self.currentHoleScore(),
			round_tee : self.round_tee()
		});	
				
	};
	
	self.saveHoleScore = function(round_id, round_hcp, hole_id, hole_score, round_tee) {
	
		if (self.cachedScore() !== 0) {
	/*		console.log("cache: " +
				self.cachedScore().round_id + " " +
				self.cachedScore().round_hcp + " " +
				self.cachedScore().hole_id + " " +
				self.cachedScore().hole_score + " " +
				self.cachedScore().round_tee + " "
			); */
		
		
			if (self.cachedScore().round_id === round_id && self.cachedScore().round_hcp === round_hcp && self.cachedScore().hole_id === hole_id &&
				self.cachedScore().hole_score === hole_score &&
				self.cachedScore().round_tee === round_tee) {
//				console.log("cached");
				return;
			}
		}
	
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
				self.cachedScore( {
					round_id: round_id,
					round_hcp : round_hcp,
					hole_id : hole_id,
					hole_score : hole_score,
					round_tee : round_tee
				});
				
//				console.log("saved... " + round_id + " " + round_hcp + " " + hole_id + " " + hole_score + " " + round_tee);
			
			}
		);
	};
	
	self.saveScore = ko.computed(function() {
		if (typeof self.round_id() === 'undefined' || typeof self.round_hcp() === 'undefined') {
			return false;
		}
///		console.log("trying to save... " + self.round_id() + " " + self.round_hcp() + " " + self.currentHole() + " " + self.currentHoleScore() + " " + self.round_tee());
	
		self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore(), self.round_tee());
	}).extend({throttle: 2000 });
		
		
	self.nextHole = function () {
		var curHole = parseInt(self.currentHole(), 10);
		
		self.saveHoleScore(self.round_id(), self.round_hcp(), curHole, self.currentHoleScore(), self.round_tee());

		self.showPoints(false);
		self.noScoreEntered(true);

		var c_len = self.holes().length;
		if (curHole === c_len) {
			self.currentHole(1);
			self.setHoleData(1);
		}
		else {
			self.currentHole(curHole + 1);
			self.setHoleData(curHole + 1);
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
			self.setHoleData(c_len);
		}
		else {
			self.currentHole(curHole - 1);
			self.setHoleData(curHole - 1);
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
				return (y + " pistettä");
				}
			else {
				return (0 + " pistettä");
			}
		}
	}).extend({throttle: 1 });
	
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
/*			self.currentHoleScore(parseInt(y, 10) + 1);
			$("#score").animate({ 
				fontSize: "1.05em" 
					}, 50, function() {
						$("#score").animate({ 
							fontSize: "1em"
						}, 300 );
					}
				); */
			var scoreEl = $(".scoreDisplay");

			self.currentHoleScore(parseInt(y, 10) + 1);				
	
			$(scoreEl).transition({ 
				perspective: '100',
				rotateY: '360deg',
				duration: 250
			}).
			transition( {
				perspective: '0',
				rotateY: '0deg',
				duration: 0
			});
		} 
		self.hasSlid(true);
	};
	
	self.downScore = function () {
		if (self.hasSlid() === false) {
			var y = self.currentHoleScore();
			
			var scoreEl = $(".scoreDisplay");


			if (self.currentHoleScore() > 0) self.currentHoleScore(y - 1);

			
			$(scoreEl).transition({ 
				perspective: '100',
				rotateY: '-360deg',
				duration: 250
/*				complete: function() {
					
				} */
			}).
					
/*			transition({ 
				perspective: '100',
				rotateY: '-360deg',
				duration: 100,
			}). */
				
			transition({
				perspective: '0',
				rotateY: '0deg',
				duration: 0
			});

		}
		self.hasSlid(true);
	};
	
	
	self.resetSlider = function () {
		self.hasSlid(false);
		$("#slaidi").slider('option', 'value', 0); 
		self.sliderVal(0);
	};
	
	self.sliderMove = function () {
		var sVal = parseInt(self.sliderVal(), 10);
		var par = self.currentHolePar();

		if (sVal <25 && sVal >= 0 || sVal <= 0 && sVal > -25 ) {
			if (self.noScoreEntered() === true) {

				self.currentHoleScore(par);
			}
		} 

		if (sVal >= 26) {
			if (self.noScoreEntered() === true) {
				self.currentHoleScore(par);
			}
			self.upScore();
		}
			
		if (sVal < -26) {
			if (self.noScoreEntered() === true) {
				self.currentHoleScore(par);
			}
			self.downScore();
		}
		self.noScoreEntered(false);			
		var curHole = parseInt(self.currentHole(), 10);
		var curScore = parseInt(self.currentHoleScore(), 10);
		var curPoints = parseInt(self.currentHolePoints(), 10);
		var curHolePar = parseInt(self.currentHolePar(), 10);

		self.setScore(curHole, curScore, curPoints, curHolePar);
		
	};
	
	
/*	ko.bindingHandlers.uislider = {
		init: function (element, valueAccessor) {
			function setSliderValue(newValue) {
		//		var slider = $("#" + element.id);
				var slider = $("#slaidi");
				$(slider).slider();
				$(slider).slider( "option", "max", 50);
				$(slider).slider( "option", "min", -50);				
			//	console.log(slider);
				slider.val(newValue);
				slider.slider('refresh');
				slider.on('slidechange', function () {
					valueAccessor()(slider.val());
				});
				slider.on('slidestop', function () {
					valueAccessor()(slider.val());
					self.resetSlider();
				});
				
				slider.on('stop', function() {
					valueAccessor()(slider.val());
				});
				
			}
			valueAccessor().subscribe(setSliderValue);
		}
	}; */
	
	ko.bindingHandlers.uislider = {
		init: function (element, valueAccessor, allBindingsAccessor) {
			var options = allBindingsAccessor().sliderOptions || {};
//			console.log(options);
			
			$(element).slider(options);

//			$(element).slider( { value: 0, min: -50, max: 50, step : 1, animate: 'true' });
			
	//		$(element).slider( { animate: 'slow' });

			ko.utils.registerEventHandler(element, "slidechange", function (event, ui) {
				var observable = valueAccessor();
				observable(ui.value);
			});
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).slider("destroy");
			});
			ko.utils.registerEventHandler(element, "slide", function (event, ui) {
				var observable = valueAccessor();
				observable(ui.value);
			});
			
			ko.utils.registerEventHandler(element, "slidestop", function (event, ui) {
				var observable = valueAccessor();
				observable(ui.value);
			});
			
		},
		update: function (element, valueAccessor) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			if (isNaN(value)) {
				value = 0;
			}
			
			
			$(element).slider("value", value);
		}
	};

		
	ko.bindingHandlers.mobileList = {
		'update': function (element, valueAccessor) {
			setTimeout(function () { //To make sure the refresh fires after the DOM is updated
				try {
					$(element).listview('refresh', true); //
				}
				catch (err) {
				}
				
			/* ei tunnu toimivan ko:n virtuaalielementtien kanssa, tehdään rumasti try/catchilla tän sijaan
				var instance = $.data(element, 'listview');
				if (instance) {
					$(element).listview('refresh', true);
					}
			*/
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

	self.scoreCardClicked = false;

	self.showScoreCard = function () {
	
		if (self.scoreCardClicked === false) {
			self.scoreCardClicked = true;
			self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore(), self.round_tee());

			$.mobile.changePage("#scoreCard", { transition: 'fade'});
		}
		
	};
	
	self.closeScoreCard = function() {
		self.scoreCardClicked = false;
		$.mobile.changePage('#s_page', { transition: 'fade', reverse:true });
	};
	
	self.getCourseData = function (course_id, round_id) {

		if (round_id) self.getRoundScores(round_id);

		var data = { course_id : course_id };

		for (var i = 0; self.courseList().length > i; i++) {
			if (self.courseList()[i].id === course_id) {

				self.courseName(self.courseList()[i].name);
				self.courseAlias(self.courseList()[i].alias);

				self.courseCrYellowMen(self.courseList()[i].crYellowMen);
				self.courseSlYellowMen(self.courseList()[i].slYellowMen);
				self.courseCrYellowLadies(self.courseList()[i].crYellowLadies);
				self.courseSlYellowLadies(self.courseList()[i].slYellowLadies);

				self.courseCrBlueMen(self.courseList()[i].crBlueMen);
				self.courseSlBlueMen(self.courseList()[i].slBlueMen);

				self.courseCrBlueLadies(self.courseList()[i].crBlueLadies);
				self.courseSlBlueLadies(self.courseList()[i].slBlueLadies);
			

				self.courseCrRedMen(self.courseList()[i].crRedMen);
				self.courseSlRedMen(self.courseList()[i].slRedMen);

				self.courseCrRedLadies(self.courseList()[i].crRedLadies);
				self.courseSlRedLadies(self.courseList()[i].slRedLadies);

				self.courseCrWhiteMen(self.courseList()[i].crWhiteMen);
				self.courseSlWhiteMen(self.courseList()[i].slWhiteMen);
	
				break;				
			}

		}
		
		apexEventProxy.getHoleData(
			{ data : data },
			function (data) {
				var i;
				var h = data.holes.length;

//				console.log("round_tee: " + self.round_tee());

				for (i = 0; i < h; i++) {
					self.holes.push({
						hole_number: ko.observable(data.holes[i].hole_number),
						hole_par: ko.observable(data.holes[i].par),
						hole_hcp: ko.observable(data.holes[i].hcp),
						hole_length_yellow: ko.observable(data.holes[i].length_yellow),
						hole_length_blue: ko.observable(data.holes[i].length_blue),
						hole_length_white: ko.observable(data.holes[i].length_white),
						hole_length_red: ko.observable(data.holes[i].length_red)
					});
				}
			self.setHoleData(self.currentHole());				
			}
		);
	}; 
	
	self.leaveRound = function () {
	
		var round_id = self.round_id();
//		console.log(round_id);

		self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore(), self.round_tee());

		if (self.roundEndTime() === "" && self.validateRound() === true)
		{
			var d = new Date();
			d = d.format("yyyy-mm-dd HH:MM:ss");
			var data = { 
				round_id : round_id,
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
	//	self.scoreCard.removeAll();
		self.roundScores.removeAll();
		self.prePopulateScores();
		self.newRoundClicked = false;
	
		$.mobile.changePage("#f_page", { transition: "slidefade", reverse: true });
	};
		
	self.newRoundClicked = false;
	
	self.startNewRound = function(course_id, course_name) {
	
		if (self.newRoundClicked === false) {
		   var interval = setInterval(function(){
				$.mobile.loading('show');
				clearInterval(interval);
			},1);
			self.newRoundClicked = true;
			self.holes.removeAll();
			self.roundFinished(false);
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
						
						
							self.saveHoleScore(round_id, self.playerExactHcp(), 1, 0, self.playerDefaultTee()); // TODO: pitäis tehdä controllerissa
						
							self.roundList.unshift({
								id : round_id,
								course_name : course_name,
								start_time : start_time,
								score : ko.observable(0),
								par : ko.observable(0)
							});
						
							self.loadRecentCourses();
						}
					);
					self.getCourseData(course_id, round_id);
				
					self.currentHole(1); // kymppireiältä alkavat kierrokset?
					self.setHoleData(1);
					
					
				   var interval = setInterval(function(){
						$.mobile.loading('hide');
						clearInterval(interval);
					},1);
		
					$.mobile.changePage('#s_page', { transition: "slidefade", allowSamePageTransition: true});
					
				}
			);
		
		}
		
		else return;
		
/*		self.currentHole(1); // kymppireiältä alkavat kierrokset?
		self.setHoleData(1);
		
		$.mobile.changePage('#s_page', { transition: "slidefade",
                                    allowSamePageTransition: true}); */
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


	   var interval = setInterval(function(){
			$.mobile.loading('show');
			clearInterval(interval);
		},1);


		var loc = $(window).scrollTop();
		self.scrollPos(loc);

		self.roundFinished(false);
		
		self.loadedRoundStartTime(start_time);
		self.holes.removeAll();

		var data = { round_id : round_id };
		apexEventProxy.getRound(
			{ data : data },
			function (data) {
				var course_id = data.round.course_id;
				var start_time = data.round.start_time;
				var end_time = data.round.end_time;
				self.getCourseData(course_id, round_id);
				self.round_id(round_id);
				self.course_id(course_id);
				self.roundStartTime(start_time.date);
				if (end_time === null) {
					self.roundEndTime("");					
				}
				else {
					self.roundEndTime(end_time.date);
				}
				
			   var interval = setInterval(function(){
					$.mobile.loading('hide');
					clearInterval(interval);
				},1);
				
				$.mobile.changePage('#s_page', { transition: "slidefade", allowSamePageTransition: true});
				
			}
		);
	
//		$.mobile.changePage('#s_page', { transition: "slidefade", allowSamePageTransition: true});
	};
	
	self.el = ko.observable();
	
	self.deleteRoundDialog = function(round_id, start_time) {
		self.clickedRound(round_id);

		if (start_time) {
			var el = $("span:contains('" + start_time + "')");
			self.el(el);
			self.clickedRoundStartTime(start_time);
		}

		$("#delPopUp").popup( "open", { transition: "pop", shadow: false, positionTo: event.target  });
		
	};
	
	self.deleteRound = function() {

		var el = self.el();
		var elli = el.parent().parent().parent().parent();
		var round_id = self.clickedRound();
		var divs = $(elli).length;
		
	//	$(elli).transition({x: '-500px', opacity: '0', duration: 500, complete: function() {
		$(elli).transition({scale: '1, 0', duration: 350, easing: 'in', complete: function() {
				if ( --divs > 0) return;
				delRound(round_id);
			}
		});

		function delRound (round_id) {
			var data = { round_id : round_id };
			apexEventProxy.deleteRound(
			{ data : data },
				function (data) {
					//
				}
			);
			
			for (var i = 0; i < self.roundList().length; i++) {
				if (self.roundList()[i].id === self.clickedRound()) {
					self.roundList.splice(i, 1);
					if (self.roundList().length === 0) {
							self.firstRun(true);
					}
				}
				self.clickedRoundStartTime("");
			}
		};
		
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


	self.showroundtee = ko.computed(function() {
		var tee = self.round_tee();
		var hcp = self.round_hcp();
		var id = self.round_id();
/*		console.log("ROUND TEE: " + tee);
		console.log("ROUND HCP: " + tee); */
	});

	self.getRoundScores = function(round_id) {
	
		var data = { round_id : round_id };
		apexEventProxy.getRoundScores(
			{ data : data },
			function (data) {
				
				if (data.scores.length === 0) {
					self.round_hcp(self.playerExactHcp());
					self.round_tee(self.playerDefaultTee());
				}
				else {
					var hcp, tee;
					for (var i = 0; i < data.scores.length; i++) {
						for (var z = 0; z < self.roundScores().length; z++) {
							if (self.roundScores()[z].hole() === data.scores[i].hole_id) {
								self.roundScores()[z].score(data.scores[i].score);
								hcp = data.scores[i].round_hcp;
								tee = data.scores[i].round_tee;
							}

						}
//						console.log("scores " + data.scores[i].score);
//						console.log("holes " + data.scores[i].hole_id);
//						if (data.scores[i].score === 0 && hole === 0) hole = data.scores[i].hole_id;
					}
					self.round_hcp(hcp);
					self.round_tee(tee);
				}
			
				self.locale_tee(self.translate_tee());
			
//				console.log(self.holes().length);
				
				var hole = 0;
				for (var x = 0; x < self.holes().length; x++) {
					if (self.roundScores()[x].score() === 0 && hole === 0) {
						hole = self.roundScores()[x].hole();
					}
				}
					
				if (hole !== 0) {
					self.currentHole(hole);
					self.setHoleData(hole);
					self.noScoreEntered(true);
				}
				else {
					self.currentHole(1);
					self.currentHoleScore(parseInt(self.roundScores()[0].score(), 10));
					self.setHoleData(1);
					self.noScoreEntered(false);
				}
			}
		);
	};
	
	self.getRoundList = function (callback) {
		var a;

	   var interval = setInterval(function(){
			$.mobile.loading('show');
			clearInterval(interval);
		},1);

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

			interval = setInterval(function() {
				$.mobile.loading('hide');
				clearInterval(interval);
			},1);


			}
			
		);
	};
	
	self.getRoundList();
	
	
	self.getCourseList = function () {
		var a;
		apexEventProxy.getCourseList(
		{ a : a },
		function(data) {
			for (var i = 0, m = data.courses.length; i < m; i++) {
				self.courseList.push(data.courses[i]);
				}
			}
		);
	};
	
	self.saveGolfer = function (callback) {
		var data = {
			handicap: self.playerExactHcp(),
			tee: self.playerDefaultTee(),
			gender: self.playerGender()
		};
		apexEventProxy.saveGolferData(
			{ data : data },
			function (data) {
				//
			}
		);
		$.mobile.changePage('#f_page', { transition: "slidefade" });
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
		
	self.totalToPar = ko.computed(function() {
		if (self.holes().length > 0 && self.roundScores().length > 0) {
			var toPar = 0;
			var y;
			for (var i = 0; i < self.roundScores().length; i++) {
				y = parseInt(self.roundScores()[i].score(), 10);
				if (y > 0) toPar += y - parseInt(self.holes()[i].hole_par(), 10);
			}
		
			return toPar;
		}
		else return false;
		
	}).extend({throttle: 350 });
	
	self.validateRound = ko.computed(function() {
		if (self.roundFinished() === true) {
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
						self.roundEndTime(d);
					}
				);

			}
			return true;
		}
		
		if (self.holes().length > 0 && self.roundScores().length > 0) 
		{

			if (self.roundEndTime() !== "") {
				self.roundFinished("true");
				return true;
			}
			
			var h = self.holes().length;
			for (var i = 0; i < h; i++) {
				var y = parseInt(self.roundScores()[i].score(), 10);
				if (y === 0) {
					return false;
				}
			}
			
			self.roundFinished("true");
			return true;
		}	
		else return false;
		
	}).extend({throttle: 250 });
	
		
	self.calcHcpPreview = function() {
		var p = parseInt(self.totalPoints(), 10);
		var hcp = parseFloat(self.round_hcp());	

		var num_holes = parseInt(self.holes().length, 10);
		var par_points;
		
		if (num_holes === 9) par_points = 18;
		else par_points = 36;
		
		var group;
		group = self.getHcpGroup(hcp);

		if (p > par_points ) {
			while (p > par_points) {
				if (group == "9hole") {
					self.hcpPreview("Ei käytössä 9 reiän kierroksella");
					return;
				}
				hcp = hcp - (1 * group.factor);
				group = self.getHcpGroup(hcp);
				p--;
			}
			self.hcpPreview(parseFloat(hcp).toFixed(1));
		}
		
		else {
			if (group == "9hole") {
				self.hcpPreview("Ei käytössä 9 reiän kierroksella");
				return;
			}
			if (p >= par_points - group.buffer)	self.hcpPreview(hcp);
			else self.hcpPreview(parseFloat(hcp + group.incr).toFixed(1));
		}
		
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
		
	};
	
	self.fillScoreCard = ko.computed(function () {
		self.scoreCard.removeAll();
		for (var i = 0; i < self.holes().length; i++) {
		
			var t = self.getHolePoints(self.roundScores()[i].score(), self.holes()[i].hole_par(), self.holes()[i].hole_hcp()); 

			self.roundScores()[i].points(t); // laitetaan scorenäkymälle näkyvään observableen 
	
			var p;
			if (self.roundScores()[i].score() > 0) {
				p = self.roundScores()[i].score() - self.holes()[i].hole_par();
			}
			else { p = 0; }
			
			var hole_len;
			if (self.round_tee() === "yellow") hole_len = self.holes()[i].hole_length_yellow();
			else if (self.round_tee() === "blue") hole_len = self.holes()[i].hole_length_blue();
			else if (self.round_tee() === "white") hole_len = self.holes()[i].hole_length_white();
			else if (self.round_tee() === "red") hole_len = self.holes()[i].hole_length_red();
			
			

			var line = {
				hole_number : self.holes()[i].hole_number,
				hole_par : self.holes()[i].hole_par,
				hole_hcp : self.holes()[i].hole_hcp,
				hole_length : hole_len,
				score : self.roundScores()[i].score,
				scoreToPar : p,
				points : t
			};
			
			self.scoreCard.push(line);
		}
		self.calcHcpPreview();

	}).extend( { throttle: 5 });
	
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
			self.scrollPos(0);
		}
		self.loadedRoundStartTime("");
		$.mobile.changePage('#courseSelect', { transition: "slidefade" });
	};
	
}	
	
	
$(document).on('pageinit', function() {
	window.vm = new viewModel();
	ko.virtualElements.allowedBindings.mobileList = true; // 
	
	ko.applyBindings(vm, document.getElementById("f_page"));
	
	$('body').on('touchmove', function (e) {
	var searchTerms = '.scrollOuter',
		$target = $(e.target),
		parents = $target.parents(searchTerms);
		if (parents.length || $target.hasClass(searchTerms)) {
			// ignore as we want the scroll to happen
			// (This is where we may need to check if at limit)
		} else {
			e.preventDefault();
		}
	});
	
	$('#f_page').on('pageshow', function() {
		if (vm.loadedRoundStartTime() !== "") {
//			$('html, body').animate({scrollTop: vm.scrollPos()}, "slow");

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

	$('#courseSelect').on('pageshow', function(e) {
		$('#courseList').listview('refresh');
	});

	$('#s_page').on('pageshow', function(e) {
	
 	// https://github.com/jquery/jquery-mobile/issues/4078
	//	$(this).addClass('ui-page-active');
		
//		$("#slaidi").slider();
		
		vm.calcRoundDuration();
		var clock = setInterval(function() { 
			vm.calcRoundDuration();
		} , 2000); 
		
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
