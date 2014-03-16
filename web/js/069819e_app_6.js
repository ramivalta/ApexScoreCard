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
	self.playerPlayingHcp = ko.observable();

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
	self.roundList = ko.observableArray();

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

	self.hitFairway = ko.observable(true);
	self.hitGreen = ko.observable(true);

	self.cachedScore = ko.observable(0);

	self.bogikorttiVersion = ko.observable("Bogikortti v0.2.3 - 'Bogi se on tuplabogikin'");

	self.launchedFromHome = ko.observable();

	self.activePage = ko.observable("front");

	(function launchedFromHome() {
		var x = (window.navigator.standalone) ? true : false;
		console.log(x);
		self.launchedFromHome(x);
		if(x) {
			document.body.style.webkitTransform = 'translate3d(0, 20px, 0)';
		}
	})();


	//$('#courseSelect').css({webkitTransform : 'translate3d(100%, 0, 0)'});


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
			el.fairway_hit = ko.observable(false);
			el.green_hit = ko.observable(false);
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

	self.calcPlayingHcp = function(hcp) {
		/* GA PLAYING HANDICAP FORMULA the “EGA Playing Handicap Formula” converts exact handicaps into playing handicaps. PLAYING HCP = EXACT HCP x (SR / 113) + (CR - PAR) */

		if (typeof self.round_hcp() === 'undefined' || typeof self.round_tee() === 'undefined' || typeof self.courseCr() === 'undefined' || typeof self.courseSl() === 'undefined' || typeof self.coursePar() === 'undefined') return 0;

/*		console.log("round hcp: " + self.round_hcp());
		console.log("playing hcp: " + self.playerExactHcp());
		console.log("round tee: " + self.round_tee()); */

//		console.log(typeof self.round_tee());
//		console.log(self.round_tee());

//		var hcp = self.round_hcp();

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

		/*console.log(self.round_tee());
		console.log(self.round_hcp());*/

		var a = parseFloat(hcp);
		var b = parseFloat(courseSl / 113);
		var par;

		if (self.holes().length === 9) { par = self.coursePar() * 2; }
		else if (self.holes().length === 18) { par = self.coursePar(); }

		var c = parseFloat(courseCr - parseFloat(par));
//		console.log(par);
//		alert (courseCr);

//		alert (a + " " + " " + b + " " + c);

		var playhcp = a * b + c;

//		console.log("pelitasoitus " + playhcp);

		if (isNaN(playhcp)) return 0;

//		self.playerPlayingHcp(Math.round(playhcp));
		self.playerPlayingHcp(Math.round(playhcp));

		self.fillScoreCard(Math.round(playhcp));

//		return (Math.round(playhcp));

	};

	self.currentHoleHcpPar = ko.computed(function () {
		if (typeof self.currentHolePar() === 'undefined' || typeof self.playerPlayingHcp() === 'undefined' || self.playerPlayingHcp() === false) return;
		else {
			var par = self.currentHolePar();
			var crhcp = parseInt(self.playerPlayingHcp(), 10);
			var baseadj, hcpholes;
			baseadj = Math.floor(crhcp / 18);
			hcpholes = (crhcp.mod(18));

//			console.log(hcpholes);
	//		console.log(self.playerPlayingHcp());

			if (hcpholes >= parseInt(self.currentHoleHcp(), 10)) {
				return parseInt(self.currentHolePar(), 10) + baseadj + 1;
				}
			else {
				return parseInt(par, 10) + parseInt(baseadj, 10);
			}
		}
	}).extend({throttle: 10 });

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

		$('#fir-checkbox').checkboxradio();
		$('#gir-checkbox').checkboxradio();

		setTimeout(function() {

			for (var i = 0; i < self.roundScores().length; i++) {
				if (self.roundScores()[i].hole() === curHole) {
					self.currentHoleScore(parseInt(self.roundScores()[i].score(), 10));
					if (self.currentHolePar() === 3) {
						$('#fir-checkbox').checkboxradio( "disable" ); // refreshataan toistaiseksi käsin nää jqm:n checkboxit koska bindaus ei suostu toimimaan
					}
					else $('#fir-checkbox').checkboxradio( "enable" );

					if (self.roundScores()[i].fairway_hit() == true) {
						self.hitFairway(true);
						$('#fir-checkbox').prop( "checked", true).checkboxradio("refresh");
					}
					else if (self.roundScores()[i].fairway_hit() == false) {
						self.hitFairway(false);
						$('#fir-checkbox').prop( "checked", false).checkboxradio("refresh");
					}

					if (self.roundScores()[i].green_hit() == true) {
						self.hitGreen(true);
						$('#gir-checkbox').prop("checked", true).checkboxradio("refresh");
					}
					else if (self.roundScores()[i].green_hit() == false) {
						self.hitGreen(false);
						$('#gir-checkbox').prop("checked", false).checkboxradio("refresh");
					}
					self.noScoreEntered(false);
				}
			}

			if (self.currentHoleScore() === 0) {
				self.noScoreEntered(true);
				self.hitFairway(false),
				self.hitGreen(false);
				$('#gir-checkbox').prop("checked", false).checkboxradio("refresh");
				$('#fir-checkbox').prop( "checked", false).checkboxradio("refresh");
			}
		}, 0);



//		self.saveHoleScore(self.round_id(), self.round_hcp(), curHole, curScore, self.round_tee());

		self.cachedScore( {
			round_id: self.round_id(),
			round_hcp : self.round_hcp(),
			hole_id : hole,
			hole_score : self.currentHoleScore(),
			round_tee : self.round_tee(),
			hit_fairway : self.hitFairway(),
			hit_green : self.hitGreen()
		});

	};

	self.saveHoleScore = function(round_id, round_hcp, hole_id, hole_score, round_tee, fairway_hit, green_hit) {

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
				self.cachedScore().round_tee === round_tee &&  self.cachedScore().fairway_hit === fairway_hit && self.cachedScore().green_hit === green_hit) {
				console.log("cached: " + hole_id + " green hit: " + green_hit);
				return;
			}
		}

		var data = {
			round_id : round_id,
			round_hcp : round_hcp,
			hole_id : hole_id,
			hole_score : hole_score,
			round_tee : round_tee,
			fairway_hit : fairway_hit,
			green_hit : green_hit
		};

		apexEventProxy.createNewRoundScore(
			{ data : data },
			function (data)	{
				console.log("score saved " + hole_id + " green hit: " + green_hit);
				self.cachedScore( {
					round_id: round_id,
					round_hcp : round_hcp,
					hole_id : hole_id,
					hole_score : hole_score,
					round_tee : round_tee,
					fairway_hit : fairway_hit,
					green_hit : green_hit

				});

				self.updateScoreCard(hole_score, hole_id);
				self.calcHcpPreview();

//				console.log("saved... " + round_id + " " + round_hcp + " " + hole_id + " " + hole_score + " " + round_tee);

			}
		);
	};

	self.saveScore = ko.computed(function() {
		if (typeof self.round_id() === 'undefined' || typeof self.round_hcp() === 'undefined' || self.holes().length === 0) {
			return false;
		}

//		console.log(self.holes().length);

///		console.log("trying to save... " + self.round_id() + " " + self.round_hcp() + " " + self.currentHole() + " " + self.currentHoleScore() + " " + self.round_tee());

		self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore(), self.round_tee(), self.hitFairway(), self.hitGreen());
	}).extend({throttle: 2000 });


	var inTransition = false;

	self.nextHole = function () {

		//$('#header_scorepage').css({opacity: '1'});

		if(!inTransition) {
			inTransition = true;
			var el = $('#holeHeader');
			var s_text = $('#s_text');


			var el2 = $('#dataDisplay');

			el2.transition({
				perspective: '1000',
				x: '-100%',
				duration: '400'
			}).transition({
				perspective: '1000',
				x: '100%',
				duration: '0',
			}).transition({
				perspective: '1000',
				x: '0',
				duration: '300'
			});

			//el.css({
			//	x: '0',
			el.transition({
				perspective: '1000',
				x: '-300px',
				opacity: '0',
				duration: '325',
				complete: function() {
				}
			}).transition({
				perspective: '1000',
				x: '300px',
				duration: '0',
				complete: function() { inTransition = false }
			}).transition({
				perspective: '1000',
				x: '0',
				opacity: '1',
				duration: '250',
			});


		}

		var curHole = parseInt(self.currentHole(), 10);

		self.saveHoleScore(self.round_id(), self.round_hcp(), curHole, self.currentHoleScore(), self.round_tee(), self.hitFairway(), self.hitGreen());

		var score_el = $('.scoreDisplay');

		/*score_el.transition({
			x: '-90',
			duration: '350',
			complete: function() {
			}
		}).transition({
			x: '90',
			duration: '0',
		}).transition({
			x: '0',
			duration: '350'
		});*/


		/*var el2 = $('#dataDisplay');


		el2.transition({
			perspective: '1000',
			x: '-100%',
			duration: '400'
		}).transition({
			perspective: '1000',
			x: '100%',
			duration: '0',
		}).transition({
			perspective: '1000',
			x: '0',
			duration: '300'
		}); */


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


		//$.mobile.changePage('#s_page', { transition: "slide",                                    allowSamePageTransition: true});
	};

	self.previousHole = function() {

		if(!inTransition) {
			inTransition = true;
			var el = $('#holeHeader');
			el.transition({
				perspective: '1000',
				x: '0',
				opacity: '1',
				duration: '0',
			}).transition({
				perspective: '1000',
				x: '300px',
				opacity: '0',
				duration: '425',
			}).transition({
				perspective: '1000',
				x: '-300px',
				duration: '0',
				complete: function() { inTransition = false }
			}).transition({
				perspective: '1000',
				x: '0',
				opacity: '1',
				duration: '325',
			});

			var el2 = $('#dataDisplay');

			el2.transition({
				perspective: '1000',
				x: '100%',
				duration: '400'
			}).transition({
				perspective: '1000',
				x: '-100%',
				duration: '0',
			}).transition({
				perspective: '1000',
				x: '0',
				duration: '300'
			});
		}

		var curHole = parseInt(self.currentHole(), 10);

		self.saveHoleScore(self.round_id(), self.round_hcp(), curHole, self.currentHoleScore(), self.round_tee(), self.hitFairway(), self.hitGreen());

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

		//$.mobile.changePage('#s_page', { transition: "slide", reverse: true,                                    allowSamePageTransition: true});
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
//		$("#slaidi").slider('value', 0);
		$(".ui-slider-handle").animate( { left: '50%', easing: 'swing' }, 100);
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
			$(element).slider(options);

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

				var value = ko.unwrap(observable);
				$(element).slider('option', 'value', value);

			});

			ko.utils.registerEventHandler(element, "slidestop", function (event, ui) {
				var observable = valueAccessor();
				observable(ui.value);
			});



			/*var sliderMouseDown = function (element) { // disable clicks on track
				//$('#slaidi').unbind('mousedown');
				console.log("herp");
				var sliderHandle = $('#slaidi').find('.ui-slider-handle');
				console.log(element);
				console.log(sliderHandle[0]);
				if (element.target != sliderHandle[0]) {
					console.log("derp");
					element.stopImmediatePropagation();
					element.preventDefault();
				}
			};

			$(element).on('mousedown', sliderMouseDown)
			$(element).on('touchstart', sliderMouseDown) */




		},
/*		update: function (element, valueAccessor) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			if (isNaN(value)) {
				value = 0;
			}


			$(element).slider("value", value);
		} */
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
			//setTimeout(function() {
			//	$(element).checkboxradio();
			//}, 0);
		},
		update: function (element, valueAccessor) {
			var value = valueAccessor();
			var valueUnwrapped = ko.utils.unwrapObservable(value);

			if (valueUnwrapped === $(element).val()) {
				$(element).prop("checked", true).checkboxradio("refresh");
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
		if(self.activePage() === "prefs") return;

		self.activePage("prefs");

		//console.log("derp");
		self.hcpScroller();
		if (self.loadedRoundStartTime() !== "") {
//			var el = $("span:contains('" + self.loadedRoundStartTime() + "')");
//			el.parent().parent().parent().parent().parent().attr('style', '');
			self.scrollPos(0);
			self.loadedRoundStartTime("");
		}

		var backbtn = $('#pageBackButton');
		var prefs = $('#prefs');
		var prev = $('#f_page');
		var prev_content = $('#f_content');
		var prev_head = $('#f_header');
		var prefs_link = $('#prefs_link');
		var prefs_content = $('#prefs_content');
		var f_content = $('#f_outer');
		var header_front = $('#header_front');
		var f_text = $('#f_text');
		var former_title = $('#pageTitle');


		backbtn.transition({
			perspective: '1000',
			x: '-100%',
			duration: '0',
			opacity: '0',
			complete: function() {
				backbtn.css({display: 'inline-block'});
			}
		}).transition({
			perspective: '1000',
			x: '0',
			duration: '350',
			opacity: '1',
		});

		former_title.transition({
			perspective: '1000',
			opacity: '0',
			duration: '350',
			x: '100%',
			complete: function() {
				former_title.css({ visiblity: 'hidden' });
			}
		});

		var new_round_btn = $('#pageRight');

		new_round_btn.transition({
			perspective: '1000',
			opacity: '0',
			duration: '150',
		});

		f_text.transition({
			perspective: '1000',
			duration: '350',
			marginRight: '0%',
		});

		header_front.transition({
			perspective: '1000',
			x: '33%',
			duration: '350',
			textDecoration: '',

			complete: function() {
				prefs_link.css({ textDecoration: '' });

			}
		});




		prefs.css({transformOrigin: '100% 0'}).transition({
			perspective: '1000',
			x: '-110%',
			duration: '0',
			complete: function() {
				prefs.css({display : 'block' });
				prefs_content.css({display: 'block'});
				/*prev_content.transition({
					perspective: '1000',
					x: '100%',
					duration: '350',
					complete: function() {
						//prev_content.css({ display: 'none' });
					}
				});*/
			}
		}).transition({
			perspective: '1000',
			x: '0',
			duration: '350',
		});

		f_content.css({transformOrigin: '100% 0'}).transition({
			perspective: '1000',
			x: '50%',
			duration: '350',
		});

		var pref_text = $('#pref_text');
		pref_text.css({ textDecoration: 'none', fontWeight: '700'});
	};

	self.hidePrefs = function() {

		self.activePage("front");

		var el = $('#prefs');
		var prev = $('#f_content');
		var prefs_link = $('#prefs_link');
		var prefs_content = $('#prefs_content');
		var prefs = $('#prefs');
		var f_content = $('#f_outer');

		/*prefs_link.transition({
			perspective: '1000',
			marginRight: '100%',
			duration: '350',
		});*/

		var header_front = $('#header_front');
		var f_text = $('#f_text');
		var former_title = $('#pageTitle');
		var pref_text = $('#pref_text');

		pref_text.css({ textDecoration: 'underline'});

		former_title.css({ visibility: 'visible' }).transition({
			perspective: '1000',
			opacity: '1',
			duration: '350',
			x: '0%',
			complete: function() {

			}
		});

		var new_round_btn = $('#pageRight');

		new_round_btn.transition({
			perspective: '1000',
			opacity: '1',
			duration: '850',
		});

		f_content.css({transformOrigin: '100% 0'}).transition({
			perspective: '1000',
			x: '0%',
			duration: '350',
		});

		header_front.transition({
			perspective: '1000',
			x: '0',
			duration: '350',

		});

		f_text.transition({
			perspective: '1000',
			marginRight: '100%',
			duration: '100',
		});

		var backbtn = $('#pageBackButton');
		backbtn.transition({
			perspective: '1000',
			x: '-100%',
			opacity: '0',
			duration: '350',

			complete: function() {
				backbtn.css({display : 'none' });
			}
		});

		prefs.css({transformOrigin: '100% 0'}).transition({
			perspective: '1000',
			x: '-110%',
			duration: '350',
			complete: function() {
				el.css({display : 'none' });
			}
		});

		prev.css({transformOrigin: '100% 0'}).transition({
			perspective: '1000',
			x: '0%',
			duration: '350',
			complete: function() {
				//prev.css({display : 'block'});
			}
		});

		var pref_text = $('#pref_text');
		pref_text.css({ fontWeight: 'normal'});


	}



	self.scoreCardClicked = false;

	self.showScoreCard = function () {

		if (self.scoreCardClicked === false) {
			self.scoreCardClicked = true;
			self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore(), self.round_tee(), self.hitFairway(), self.hitGreen());

			//$.mobile.changePage("#scoreCard", { transition: 'slidedown'});

			var el = $('#scoreCard');


			var hh = $('#header_scorepage');

			hh.css({
				opacity: '0',
				duration: '100',
			});


			//el.css({display : 'block' });
			//el.css({ zIndex = '1000' });


			//el.transition({y : '-1024px'});
			//el.css({display: 'block'});

			el.css({transformOrigin: '100% 0'}).transition({
				perspective: '1000',
				y: '-100%',
				duration: '0',
				complete: function() {
					el.css({display : 'block', position: 'absolute' });


				}
			}).transition( {
				perspective: '1000',
				y: '0px',
				x: '0px',
				top: '0',
				bottom: '0',
				right: '0',
				left: '0',
				duration: '350',
				easing: 'in',
				complete: function() {
				}
			}).transition({
				perspective: '1000',
				y: '-9px',
				duration: '90',
			}).transition({
				perspective: '1000',
				y: '0px',
				duration: '100',
			}).transition({
				perspective: '1000',
				y: '-3px',
				duration: '40',
			}).transition({
				perspective: '1000',
				y: '0px',
				duration: '40',
			}).transition({
				perspective: '1000',
				y: '-1px',
				duration: '20',
			}).transition({
				perspective: '1000',
				y: '0px',
				duration: '20',
			});




	/*s.transition( {
				perspective: '1000',
				height: '0px',
				opacity: '0',
				duration: '250',
				complete: function() {
					s.css('display', 'none');
				}
			}); */



		}

	};

	(function() {
		var supportTouch = $.support.touch,
				scrollEvent = "touchmove scroll",
				touchStartEvent = supportTouch ? "touchstart" : "mousedown",
				touchStopEvent = supportTouch ? "touchend" : "mouseup",
				touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
		$.event.special.swipeupdown = {
			setup: function() {
				var thisObject = this;
				var $this = $(thisObject);
				$this.bind(touchStartEvent, function(event) {
					var data = event.originalEvent.touches ?
							event.originalEvent.touches[ 0 ] :
							event,
							start = {
								time: (new Date).getTime(),
								coords: [ data.pageX, data.pageY ],
								origin: $(event.target)
							},
							stop;

					function moveHandler(event) {
						if (!start) {
							return;
						}
						var data = event.originalEvent.touches ?
								event.originalEvent.touches[ 0 ] :
								event;
						stop = {
							time: (new Date).getTime(),
							coords: [ data.pageX, data.pageY ]
						};

						// prevent scrolling
						if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
							event.preventDefault();
						}
					}
					$this
							.bind(touchMoveEvent, moveHandler)
							.one(touchStopEvent, function(event) {
						$this.unbind(touchMoveEvent, moveHandler);
						if (start && stop) {
							if (stop.time - start.time < 1000 &&
									Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
									Math.abs(start.coords[0] - stop.coords[0]) < 75) {
								start.origin
										.trigger("swipeupdown")
										.trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
							}
						}
						start = stop = undefined;
					});
				});
			}
		};
		$.each({
			swipedown: "swipeupdown",
			swipeup: "swipeupdown"
		}, function(event, sourceEvent){
			$.event.special[event] = {
				setup: function(){
					$(this).bind(sourceEvent, $.noop);
				}
			};
		});

	})();




	self.closeScoreCard = function() {
		self.scoreCardClicked = false;
		//$.mobile.changePage('#s_page', { transition: 'slidedown', reverse:true });

		var el = $('#scoreCard');

		var hh = $('#header_scorepage');

		el.css({transformOrigin: '100% 0'}).transition({
			perspective: '1000',
			y: '-100%',
			duration: '450',
			easing: 'in-out',
			complete: function() {
				el.css({display : 'none'});
				hh.transition({
					opacity: '1',
					duration: '50',
				});

				var b = $('#bottom');
				var s_foot = $('#s_footer');

				b.css({
					webkitFilter: ''
				});
				s_foot.css({
					webkitFilter: ''
				});


			}
		});


	};

	self.getCourseData = function (course_id, round_id, cb) {

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

				if (round_id) self.getRoundScores(round_id, function() { cb() });
				else cb();
//				else self.calcPlayingHcp(self.playerExactHcp());


//				self.fillScoreCard(self.round_hcp()); // f

			}
		);

/*		var hcp = self.playerPlayingHcp();
		self.fillScoreCard(hcp); */
	};

	self.leaveRound = function () {

		var round_id = self.round_id();
//		console.log(round_id);

		self.saveHoleScore(self.round_id(), self.round_hcp(), self.currentHole(), self.currentHoleScore(), self.round_tee(), self.hitFairway(), self.hitGreen());

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

		$.mobile.changePage("#f_page", { transition: "slide", reverse: true });
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

							self.getCourseData(course_id, round_id, function() {

								self.saveHoleScore(round_id, self.playerExactHcp(), 1, 0, self.playerDefaultTee(), false, false); // TODO: pitäis tehdä controllerissa

								self.roundList.unshift({
									id : round_id,
									course_name : course_name,
									start_time : start_time,
									score : ko.observable(0),
									par : ko.observable(0)
								});

								self.loadRecentCourses();

								self.currentHole(1); // kymppireiältä alkavat kierrokset?
								self.setHoleData(1);

								interval = setInterval(function(){
									$.mobile.loading('hide');
									clearInterval(interval);
								},1);

								// showScorePage

								self.showScorePage(true);

								/*$.mobile.changePage('#s_page', { transition: "slide", allowSamePageTransition: true});*/
							});
						}
					);
				}

			);
		}
		else return;
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
		self.holes([]);

		var data = { round_id : round_id };
		apexEventProxy.getRound(
			{ data : data },
			function (data) {
				var course_id = data.round.course_id;
				var start_time = data.round.start_time;
				var end_time = data.round.end_time;
				self.getCourseData(course_id, round_id, function() {
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


					// showScorePage

					//$.mobile.changePage('#s_page', { transition: "slide", allowSamePageTransition: true});
					self.showScorePage();
				});
			}
		);

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


		$(elli).transition({scale: '1, 0', duration: 450, easing: 'in', complete: function() {
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

	self.getRoundScores = function(round_id, cb) {

		var data = { round_id : round_id };
		apexEventProxy.getRoundScores(
			{ data : data },
			function (data) {

				var p_hcp;

				if (data.scores.length === 0) {
					self.round_hcp(self.playerExactHcp());
					self.round_tee(self.playerDefaultTee());
					self.calcPlayingHcp(self.playerExactHcp());
//					console.log("p_hcp data scores len 0 " + p_hcp);
				}
				else {
					var hcp, tee;
					for (var i = 0; i < data.scores.length; i++) {
						for (var z = 0; z < self.roundScores().length; z++) {
							if (self.roundScores()[z].hole() === data.scores[i].hole_id) {
								self.roundScores()[z].score(data.scores[i].score);
							self.roundScores()[z].fairway_hit(data.scores[i].fairway_hit);							self.roundScores()[z].green_hit(data.scores[i].green_hit);

//								console.log(self.roundScores()[z].green_hit());

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
					self.calcPlayingHcp(hcp);
//					console.log("p_hcp has round scores " + p_hcp);

				}

//				console.log("p_hcp: " + p_hcp);
//				self.fillScoreCard(p_hcp);
//				self.fillScoreCard(hcp);	// ffffff



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

				cb();
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
						var l = {
							id: data.rounds[i].id,
							course_name: data.courses[i].name,
							start_time: data.rounds[i].start_time,
							score: ko.observable(data.scores[i]),
							par: ko.observable(data.pars[i])
						}
						self.roundList.push(l);
					}

					if (self.roundList().length > 0) {
						self.firstRun(false);
					}
					else {
						self.firstRun(true);
					}
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
		$.mobile.changePage('#f_page', { transition: "slide" });
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

	self.fairwayPercentage = ko.computed(function() {
		if (self.holes().length > 0 && self.roundScores().length > 0) {

			var x = self.hitFairway();
			var c_hole = self.currentHole() -1;
//			console.log(self.currentHole());
			self.roundScores()[c_hole].fairway_hit(x);

			var fwsHit = 0;
			var c_len = 0;
			for (var i = 0; i < self.roundScores().length; i++) {
				if (self.holes()[i].hole_par() !== 3) {
					c_len++;
						if (self.roundScores()[i].fairway_hit() === true) {
//							console.log(self.holes()[i].hole_par());
							fwsHit++;
						}
					}
				}

			return Math.round(fwsHit / c_len * 100) + "% " + "(" + fwsHit + "/" + c_len + ")";
		}

		else return false;
	}).extend({throttle: 350 });

	self.greenPercentage = ko.computed(function() {
		var x = self.hitGreen();
		var c_hole = self.currentHole() -1;
		self.roundScores()[c_hole].green_hit(x);

//		console.log(x);
		if (self.holes().length > 0 && self.roundScores().length > 0) {
			var gHit = 0;
			var c_len = self.roundScores().length;
			for (var i = 0; i < self.roundScores().length; i++) {
				if (self.roundScores()[i].green_hit() == true) {
					gHit++;
				}
			}

			return Math.round(gHit / c_len * 100) + "% " + "(" + gHit + "/" + c_len + ")";
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


	self.calcHcpPreview = ko.computed(function() {
		if (self.holes().length > 0) {
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
						self.hcpPreview("Ei 9 reiän kierroksella");
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
					self.hcpPreview("Ei 9 reiän kierroksella");
					return;
				}
				if (p >= par_points - group.buffer)	self.hcpPreview(hcp);
				else self.hcpPreview(parseFloat(hcp + group.incr).toFixed(1));
			}
		}
		else return;

	}).extend({throttle: 250 });

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

	self.fillScoreCard = function (round_hcp) {
		self.scoreCard.removeAll();
		/*		console.log(self.roundScores().length);
		console.log(self.holes().length);
		console.log("filling it up"); */
//		console.log("fillscore round hcp: " + round_hcp);


//		round_hcp = self.playerPlayingHcp();

		for (var i = 0; i < self.holes().length; i++) {

			var t = ko.observable();
			t = self.getHolePoints(self.roundScores()[i].score(), self.holes()[i].hole_par(), self.holes()[i].hole_hcp(), round_hcp);

			self.roundScores()[i].points(t); // laitetaan scorenäkymälle näkyvään observableen

			var p = ko.observable();
			if (self.roundScores()[i].score() > 0) {
				p = self.roundScores()[i].score() - self.holes()[i].hole_par();
			}
			else { p = 0; }

			var hole_len;
			if (self.round_tee() === "yellow") hole_len = self.holes()[i].hole_length_yellow();
			else if (self.round_tee() === "blue") hole_len = self.holes()[i].hole_length_blue();
			else if (self.round_tee() === "white") hole_len = self.holes()[i].hole_length_white();
			else if (self.round_tee() === "red") hole_len = self.holes()[i].hole_length_red();



			var line = {};

			line.hole_number = self.holes()[i].hole_number;
			line.hole_par = self.holes()[i].hole_par;
			line.hole_hcp = self.holes()[i].hole_hcp;
			line.hole_length = hole_len;
			line.score = self.roundScores()[i].score;
			line.scoreToPar = ko.observable(p);
			line.points = ko.observable(t);


			self.scoreCard.push(line);
//			self.calcHcpPreview();

		}

		self.calcHcpPreview();

	};
//	.extend( { throttle: 5 });

	self.updateScoreCard = function(score, hole) {
//		console.log(self.holes().length);
		var h = hole - 1;
		var h_points = self.getHolePoints(score, self.holes()[h].hole_par(), self.holes()[h].hole_hcp(), self.playerPlayingHcp());

//		console.log("hole points: " + h_points);

		self.roundScores()[h].points(h_points);

		var p;
		if (self.roundScores()[h].score() > 0) {
			p = score - self.holes()[h].hole_par();
		}
		else p = 0;

//		for (var i = 0; i < self.scoreCard().length; i++) {
	//		if (self.scoreCard().hole_number === hole) {


		self.scoreCard()[h].score(score);
		self.scoreCard()[h].scoreToPar(p);
		self.scoreCard()[h].points(h_points);



/*		console.log("updating score");
		console.log("updated to: " + self.scoreCard()[h].points()); */

//		self.calcHcpPreview();
	};



	self.getHolePoints = function(score, par, hole_hcp, round_hcp) {

//		console.log(score + " " + par + " " + hole_hcp);

//		var crhcp = parseInt(round_hcp, 10);
		var crhcp = parseInt(round_hcp);
		var baseadj, hcpholes, hole_hcp_par;
		baseadj = Math.floor(crhcp / 18);

//		console.log("cr hcp: " + crhcp);
	//	console.log(baseadj);

//		console.log(crhcp);

		hcpholes = (crhcp.mod(18));
//		console.log("hcp holes: " + hcpholes);

		if (hcpholes >= hole_hcp) {

			hole_hcp_par = par + baseadj + 1;
			}
		else {
			hole_hcp_par = par + parseInt(baseadj, 10);
			}

//		console.log("hcp par for hole " + hole_hcp_par);

		if (score === 0)
			{
//				console.log("no score");
				return 0;
			}
		else {
			var y = hole_hcp_par - score + 2;
			if (y > 0)
			{
//				console.log(y + " points");
				return y;
			}
			else
			{
//				console.log(y + " points");
				return 0;
			}
		}
	};

	self.showStats = function() {
		var stats = $('#stats');
		var holedata = $('#holeData');

		var sc = $('#dataDisplay');


		if(stats.is(":visible")) {
			return;
		}


		$(sc).transition({
			perspective: '650px',
			rotateY: '90deg',
			duration: '350',
			complete: function() {
				stats.css('display', 'block');
				holedata.css('display', 'none');
				stats.css('-webkit-transform', 'scaleX(-1)');
			}
		}).transition( {
			perspective: '650px',
			rotateY: '180deg',
			duration: '250',
			complete: function() {
				stats.css('-webkit-transform', 'scaleX(1)');
			}
		}).transition({
			perspective: '650px',
			rotateY: '0deg',
			duration: '0',
			complete: function() {
			},
		});


	};

	self.showHoledata = function() {
		var stats = $('#stats');
		var holedata = $('#holeData');

		var sc = $('#dataDisplay');


		if(holedata.is(":visible")) {
			return;
		}

		$(sc).transition({
			perspective: '650px',
			rotateY: '-90deg',
			duration: '350',
			complete: function() {
				holedata.css('display', 'block');
				stats.css('display', 'none');
				holedata.css('-webkit-transform', 'scaleX(-1)');
			}
		}).transition( {
			perspective: '650px',
			rotateY: '-180deg',
			duration: '250',
			complete: function() {
				holedata.css('-webkit-transform', 'scaleX(1)');
			}
		}).transition({
			perspective: '650px',
			rotateY: '0deg',
			duration: '0',
		});

	};


	self.getGolferData();
	self.getCourseList();

	var scroller_init = false;

	self.hcpScroller = function () {
		if(scroller_init == true) return;
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

		scroller_init = true;

	};

	self.loadCourseSelect = function () {
		if (self.loadedRoundStartTime() !== "") {
			self.scrollPos(0);
		}
		self.loadedRoundStartTime("");

		var c_outer = $('#c_outer');

		var f_outer = $('#f_outer');
		var header_front = $('#header_front');
		var header_c = $('#header_courselist');
		var c_sel = $('#courseSelect');

		header_front.transition({
			perspective: '1000',
			x: '-50%',
			duration: '250',
			opacity: '0',
			complete: function() {
				header_front.css({display: 'none'});
			}
		});

		header_c.css({
			x: '50%',
			opacity: '0',
			display: 'block',
		}).transition({
			perspective: '1000',
			x: '0%',
			opacity: '1',
			duration: '250',
		});


		c_outer.css({
			x: '100%',
			opacity: '1',
			display: 'block',
		});
		c_sel.css({
			display: 'block',
		});


		c_outer.transition({
			perspective: '1000',
			x: '0%',
			duration: '350',
			opacity: '1',
		});

		f_outer.transition({
			perspective: '1000',
			x: '-50%',
			duration: '350',
			complete: function() {
				f_outer.css({
					visibility: 'hidden'
				});
			}
		});
	};

	self.hideCourseSelect = function() {
		var header_front = $('#header_front');
		var header_c = $('#header_courselist');

		var c_outer = $('#c_outer');

		var f_outer = $('#f_outer');
		var c_sel = $('#courseSelect');

		header_front.css({
			x: '-50%',
			y: '-44px',
			opacity: '0',
			display: 'block',
			visibility: 'visible',
		});

//
		f_outer.css({
			x: '-50%',
			visibility: 'visible',
		}).transition({
			perspective: '1000',
			x: '0',
			duration: '350',
			complete: function() {
			}
		});

		c_outer.transition({
			perspective: '1000',
			x: '100%',
			duration: '350',
			complete: function() {
				c_sel.css({display: 'none' });

			}
		});


		header_c.transition({
			perspective: '1000',
			x: '50%',
			opacity: '0',
			duration: '250',
			complete: function() {
				header_c.css({
				});
			}
		});

		header_front.transition({
			perspective: '1000',
			x: '0%',
			duration: '150',
			opacity: '1',
			complete: function() {
				header_front.css({
					//visibility: 'visible',
				});
			}

		});


	}


	self.showScorePage = function(fromCourseList) {

		var s_content = $('#s_content');
		var s_page = $('#s_page');
		var header_score = $('#header_scorepage');

		if(!fromCourseList) {

			var f_outer = $('#f_outer');

			var header_front = $('#header_front');

			header_front.transition({
				x: '-50%',
				opacity: '0',
				duration: '350',
				complete: function() {
					header_front.css({display: 'none'});
				}
			});

			header_score.css({
				x: '100%',
				display: 'block',
			}).transition({
				perspective: '1000',
				x: '0%',
				duration: '350',
			});


			f_outer.transition({
				perspective: '1000',
				x: '-50%',
				duration: '350',
				complete: function() {

				}
			});

			s_page.css({
				x: '100%',
				display: 'block',
			}).transition({
				perspective: '1000',
				x: '0%',
				duration: '350',
			});
		}

		else {

			var c_outer = $('#c_outer');
			var header_course = $('#header_courselist');

			header_course.transition({
				x: '-50%',
				opacity: '0',
				duration: '350',
				complete: function() {
					header_course.css({display: 'none'});
				}
			});

			header_score.css({
				x: '100%',
				display: 'block',
			}).transition({
				perspective: '1000',
				x: '0%',
				duration: '350',
			});

			c_outer.transition({
				perspective: '1000',
				x: '-50%',
				duration: '350',
				complete: function() {

				}
			});

			s_page.css({
				x: '100%',
				display: 'block',
			}).transition({
				perspective: '1000',
				x: '0%',
				duration: '350',
			});




		}



	}

	self.hideScorePage = function() {



	}


}


$(document).on('pageinit', function() {
	window.vm = new viewModel();
	ko.virtualElements.allowedBindings.mobileList = true; //

    /* $(window)
          .bind('orientationchange', function(){
               if (window.orientation % 180 == 0){
                   $(document.body).css("-webkit-transform-origin", "")
                       .css("-webkit-transform", "");
               }
               else {
                   if ( window.orientation > 0) { //clockwise
                     $(document.body).css("-webkit-transform-origin", "200px 190px")
                       .css("-webkit-transform",  "rotate(-90deg)");
                   }
                   else {
                     $(document.body).css("-webkit-transform-origin", "280px 190px")
                       .css("-webkit-transform",  "rotate(90deg)");
                   }
               }
           })
          .trigger('orientationchange'); */

	//ko.applyBindings(vm, document.getElementById("f_page"));
	//ko.applyBindings(vm, document.getElementById("prefs"));
	ko.applyBindings(vm, document.getElementById("root"));

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



	$('#root').on('pageshow', function() {

		if (vm.loadedRoundStartTime() !== "") {
//			$('html, body').animate({scrollTop: vm.scrollPos()}, "slow");

			$.mobile.silentScroll(vm.scrollPos());
		}
	});

	$('#courseSelect').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("courseSelect"));
	});

	$('#s_page').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("s_page"));
	});

	$('#scoreCard').on('pageinit', function () {
		ko.applyBindings(vm, document.getElementById("scoreCard"));
	});


	$('#courseSelect').on('pageshow', function(e) {
		$('#courseList').listview('refresh');
	});

	$('#s_page').on('pageshow', function(e) {

 	// https://github.com/jquery/jquery-mobile/issues/4078
		$(this).addClass('ui-page-active');

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
