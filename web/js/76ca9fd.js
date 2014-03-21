Number.prototype.mod = function(n) {
return ((this%n)+n)%n;
};

function viewModel () {
	var self = this;
	
	self.holes = ko.observableArray([]);
	self.course_id = ko.observable();
	self.courseName = ko.observable();
	self.courseAlias = ko.observable();
	self.courseCrYellowMen = ko.observable();
	self.courseSlYellowMen = ko.observable();
	self.courseCrRedMen = ko.observable();
	self.courseSlRedMen = ko.observable();
	self.courseCrBlueMen = ko.observable();
	self.courseSlBlueMen = ko.observable();
	self.courseCrWhiteMen = ko.observable();
	self.courseSlWhiteMen = ko.observable();	
	
	self.courseCrRedLadies = ko.observable();
	self.courseSlRedLadies = ko.observable();
	self.courseCrYellowLadies = ko.observable();
	self.courseSlYellowLadies = ko.observable();
	self.courseCrBlueLadies = ko.observable();
	self.courseSlBlueLadies = ko.observable();
	
	self.showHoles = ko.observable(false);
	
	self.redTeeEnabled = ko.observable(true);
	self.blueTeeEnabled = ko.observable(true);
	self.yellowTeeEnabled = ko.observable(true);
	self.whiteTeeEnabled = ko.observable(true);

	self.redTeeEnabledLadies = ko.observable(true);
	self.blueTeeEnabledLadies = ko.observable(true);
	self.yellowTeeEnabledLadies = ko.observable(true);
	
	self.courseNumberOfHoles = ko.observable();
	
	self.playerName = ko.observable();
	self.playerExactHcp = ko.observable();
	self.playerDefaultTee = ko.observable();
	self.playerGender = ko.observable();
	
	
	self.courseList = ko.observableArray([]);

	self.courseData = ko.observableArray([]);
	self.courseHoles = ko.observableArray([]);
	
	self.showHoleToggle = ko.observable(false);
	self.saveSuccess = ko.observable(false);
	self.saveFailure = ko.observable(false);
	
	self.noOfHoles = ko.observable(0);
	self.addedBy = ko.observable();
	self.adderName = ko.observable();
	
	self.playerId = ko.observable();
	
	self.nippedHoles = ko.observable([]);

	self.roundList = ko.observableArray([]);
	self.roundScores = ko.observableArray([]);
	self.holes = ko.observableArray([]);

	self.playerPlayingHcp = ko.observable();	

	self.roundStartTime = ko.observable();

	
	
	self.resetForm = function() {
		self.courseName = ko.observable();
		self.courseAlias = ko.observable();
		self.courseCrYellowMen = ko.observable();
		self.courseSlYellowMen = ko.observable();
		self.courseCrRedMen = ko.observable();
		self.courseSlRedMen = ko.observable();
		self.courseCrBlueMen = ko.observable();
		self.courseSlBlueMen = ko.observable();
		self.courseCrWhiteMen = ko.observable();
		self.courseSlWhiteMen = ko.observable();	
	
		self.courseCrRedLadies = ko.observable();
		self.courseSlRedLadies = ko.observable();
		self.courseCrYellowLadies = ko.observable();
		self.courseSlYellowLadies = ko.observable();
		self.courseCrBlueLadies = ko.observable();
		self.courseSlBlueLadies = ko.observable();
		
		self.redTeeEnabled = ko.observable(true);
		self.blueTeeEnabled = ko.observable(true);
		self.yellowTeeEnabled = ko.observable(true);
		self.whiteTeeEnabled = ko.observable(true);

		self.holes.removeAll();
		
		self.saveSuccess(false);
		self.saveFailure(false);
	};
	
	self.newCourse = function() {
		self.resetForm();
		self.noOfHoles("18");
		self.adderName("");
		
		while (self.holes().length < 18) {
			self.holes.push({
				hole_number: ko.observable(self.holes().length + 1),
				hole_par: ko.observable(0),
				hole_hcp: ko.observable(),
				hole_length_yellow: ko.observable(0),
				hole_length_blue: ko.observable(0),
				hole_length_red: ko.observable(0),
				hole_length_white: ko.observable(0),
			});
	
		}
		self.course_id("new");
		
		$( "#save" ).button({ enabled: true });

		self.showHoleToggle(true);
		
	};
	
	self.setNine = function () {
		self.noOfHoles(9);
	};
	
	self.setEighteen = function () {
		self.noOfHoles(18);
	};
	
	
	self.holeNumToggle = ko.computed(function() {
		if (parseInt(self.noOfHoles(), 10) === 18) {
//			if (self.holes().length < 18) {
/*				if (self.nippedHoles().length > 1) {
					for (var i = 0; i < self.nippedHoles().length; i++) {
						self.holes.push(self.nippedHoles()[i]);
					}
				} */
//				else {
					var i = 0;
					while (self.holes().length < 18) {
//						console.log(self.holes().length);
	//					console.log("lengthening");
						self.holes.push({
							hole_number: ko.observable(self.holes().length + 1),
							hole_par: ko.observable(0),
							hole_hcp: ko.observable(),
							hole_length_yellow: ko.observable(0),
							hole_length_blue: ko.observable(0),
							hole_length_red: ko.observable(0),
							hole_length_white: ko.observable(0),
						});
	//				}
	//			}
			}
		}

		else if (parseInt(self.noOfHoles(), 10) === 9) {
//			console.log("hurkadurka");
			while (self.holes().length > 9) {
//				self.nippedHoles().push(self.holes.pop());
				self.holes.pop();
//				console.log("shortening");					
//				i++;
		
			}
		}
	});
		
	
	self.saveCourse = function() {
	
		$("#save").button("disable");
	
		var form = $('#form').parsley();
		var form2 = $('#formi2').parsley();
		
		$('#formi2').parsley( 'validate' );
		$('#form').parsley( 'validate' );
		

		var valid = $('#form').parsley('isValid');
		var valid2 = $('#formi2').parsley('isValid');
		
/*		console.log("form " + valid);
		console.log("formi2 " + valid2); */
		
		if (valid === false || valid2 === false) {
			self.saveFailure(true);
			$("#save").button("enable");
			return false;
		}
			
		// use normal tees if championship tees aren't set.
		if (self.blueTeeEnabled() === false) {
			self.courseCrBlueMen(self.courseCrRedMen());
			self.courseSlBlueMen(self.courseSlRedMen());
			self.courseCrBlueLadies(self.courseCrRedLadies());
			self.courseSlBlueLadies(self.courseSlRedLadies());
		}
		
		if (self.whiteTeeEnabled() === false) {
			self.courseCrWhiteMen(self.courseCrYellowMen());
			self.courseSlWhiteMen(self.courseSlYellowMen());
		}
		
		var adder;
		if (self.addedBy() != null) {
			adder = self.addedBy();
		}
		else {
			adder = self.playerId();
		}
		
		var data = {
			course_id		: self.course_id(),
			courseName		: self.courseName(),
			courseAlias		: self.courseAlias(),
			crRedMen 		: self.courseCrRedMen(),
			crBlueMen 		: self.courseCrBlueMen(),
			crYellowMen		: self.courseCrYellowMen(),
			crWhiteMen		: self.courseCrWhiteMen(),
			slRedMen		: self.courseSlRedMen(),
			slBlueMen		: self.courseSlBlueMen(),
			slYellowMen		: self.courseSlYellowMen(),
			slWhiteMen		: self.courseSlWhiteMen(),
			
			crRedLadies		: self.courseCrRedLadies(),
			crBlueLadies	: self.courseCrBlueLadies(),
			crYellowLadies 	: self.courseCrYellowLadies(),
			slRedLadies		: self.courseSlRedLadies(),
			slBlueLadies	: self.courseSlBlueLadies(),
			slYellowLadies 	: self.courseSlYellowLadies(),
			addedBy			: adder
		};
		
		apexEventProxy.saveCourseData(
			{ data : data },
			function (data) {
				var course_id = data.course_id;
				var i;
				
				if (self.blueTeeEnabled() === false) {
					for (i = 0; i < self.holes().length; i++) {
					self.holes()[i].hole_length_blue(self.holes()[i].hole_length_red());
					}
				}
				if (self.whiteTeeEnabled() === false) {
					for (i = 0; i < self.holes().length; i++) {
					self.holes()[i].hole_length_white(self.holes()[i].hole_length_yellow());
					}
				}
				
				var data = ko.toJSON(self.holes());

				apexEventProxy.saveHoleData(
					{ data : data,
					  course_id : course_id },
					function (data) {
						$("#save").button("enable");
						
						if (self.course_id() === "new") {
							self.courseList.removeAll();
							self.getCourseList();
							self.course_id(course_id);
						}
						
						self.saveFailure(false);
						self.saveSuccess(true);
					}
				);
			}
		);
	};
	
	self.courseLengthRed = ko.computed(function() {
		if(self.holes().length > 0) {
			var s = 0;
			for (var i = 0; i < self.holes().length; i++) {
				s = s + parseInt(self.holes()[i].hole_length_red(), 10);
				}
			return s;
		}
	}).extend({ throttle: 50 });

	self.courseLengthBlue = ko.computed(function() {
		if(self.holes().length > 0) {
			var s = 0;
			for (var i = 0; i < self.holes().length; i++) {
				s = s + parseInt(self.holes()[i].hole_length_blue(), 10);
				}
			return s;
		}
	}).extend({ throttle: 50 });

	self.courseLengthYellow = ko.computed(function() {
		if(self.holes().length > 0) {		
			var s = 0;
			for (var i = 0; i < self.holes().length; i++) {
				s = s + parseInt(self.holes()[i].hole_length_yellow(), 10);
				}
			return s;
		}
	}).extend({ throttle: 50 });
	
	self.courseLengthWhite = ko.computed(function() {
		if(self.holes().length > 0) {		
			var s = 0;
			for (var i = 0; i < self.holes().length; i++) {
				s = s + parseInt(self.holes()[i].hole_length_white(), 10);
				}
			return s;
		}
	}).extend({ throttle: 50 });

	/*self.getCourseGeneralData = function (course_id) {
		self.resetForm();
		self.showHoleToggle(false);
		var data = { course_id : course_id };
		apexEventProxy.getCourseData(
			{ data : data },
			function (data) {
				self.courseName(data.course.name);
				self.courseAlias(data.course.alias);

				self.courseCrYellowMen(data.course.crYellowMen);
				self.courseSlYellowMen(data.course.slYellowMen);

				self.courseCrYellowLadies(data.course.crYellowLadies);
				self.courseSlYellowLadies(data.course.slYellowLadies);

				self.courseCrBlueMen(data.course.crBlueMen);
				self.courseSlBlueMen(data.course.slBlueMen);

				self.courseCrBlueLadies(data.course.crBlueLadies);
				self.courseSlBlueLadies(data.course.slBlueLadies);
				
				self.courseCrRedMen(data.course.crRedMen);
				self.courseSlRedMen(data.course.slRedMen);

				self.courseCrRedLadies(data.course.crRedLadies);
				self.courseSlRedLadies(data.course.slRedLadies);
				
				self.courseCrWhiteMen(data.course.crWhiteMen);
				self.courseSlWhiteMen(data.course.slWhiteMen);
				
				if (data.course.addedBy != null) {
					self.addedBy(data.course.addedBy);
					self.getGolferById(parseInt(self.addedBy(), 10));
				}
				
				else {
					self.addedBy(null);
					self.adderName("");
				}
				
				self.getHoleData(course_id);
			}
		);
		
		self.course_id(course_id);
		
	}; */

	self.playerGender = ko.observable("Male");

	self.courseCr = ko.observable(0);
	self.courseSl = ko.observable(0);	


	self.calcPlayingHcp = function(hcp) {
		/* GA PLAYING HANDICAP FORMULA the “EGA Playing Handicap Formula” converts exact handicaps into playing handicaps. PLAYING HCP = EXACT HCP x (SR / 113) + (CR - PAR) */

		/*console.log(self.round_tee());
		console.log(self.courseCr());
		console.log(self.coursePar());*/

		if (typeof self.round_hcp() === 'undefined' || typeof self.round_tee() === 'undefined' || typeof self.courseCr() === 'undefined' || typeof self.courseSl() === 'undefined' || typeof self.coursePar() === 'undefined') return 0;


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

		var a = parseFloat(hcp);
		var b = parseFloat(courseSl / 113);
		var par;

		if (self.holes().length === 9) { par = self.coursePar() * 2; }
		else if (self.holes().length === 18) { par = self.coursePar(); }

		var c = parseFloat(courseCr - parseFloat(par));
		var playhcp = a * b + c;

		//console.log("peliihänderi");
		//console.log(playhcp);

		if (isNaN(playhcp)) return 0;

		self.playerPlayingHcp(Math.round(playhcp));
		fillScoreCard(Math.round(playhcp));

	};



	self.round_hcp = ko.observable();
	self.round_tee = ko.observable();
	self.round_id = ko.observable();

	self.roundEndTime = ko.observable();

	/*self.getHoleData = function(course_id) {
	
		self.noOfHoles(0);
		self.holes.removeAll();
	
		var data = { course_id : course_id };
		apexEventProxy.getHoleData(
			{ data : data },
			function (data) {
				for (var i = 0, m = data.holes.length; i < m; i++) {
					self.holes.push({
						hole_number: ko.observable(data.holes[i].hole_number),
						hole_par: ko.observable(data.holes[i].par),
						hole_hcp: ko.observable(data.holes[i].hcp),
						hole_length_yellow: ko.observable(data.holes[i].length_yellow),
						hole_length_blue: ko.observable(data.holes[i].length_blue),
						hole_length_red: ko.observable(data.holes[i].length_red),
						hole_length_white: ko.observable(data.holes[i].length_white),
					});
				}

			$( "#save" ).button({ enabled: true });	
			}

		);

	}; */
	
		
	self.getCourseList = function (callback) {
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
	
	self.getCourseList();


	self.getGolferData = function () {
		var a;
		apexEventProxy.getGolferData(
			{ a : a },
			function(data) {
				if (data.message === "failed") {
					alert ("not logged in");
					self.playerName("anon");
					self.playerId("");
				}
				else {
					self.playerName(data.golfer.name);
					self.playerExactHcp(data.golfer.handicap);
					self.playerDefaultTee(data.golfer.tee);
					self.playerGender(data.golfer.gender);
					self.playerId(data.golfer.id);
				}
			}
		);
	};

	self.getGolferById = function (golfer_id) {
		if (golfer_id == undefined) {
			return null;
		};
		var data = { golfer_id : golfer_id };
		apexEventProxy.getGolferDataById(
			{ data : data },
			function(data) {
				if (data.message !== "failed") {
					self.adderName(data.golfer.username);
				}

			}
		);
	};
	
	//self.getGolferData();


	
	function getRounds() {
		var data;

		apexEventProxy.getRoundList(
			{ data : data },
			function (data) {
				if (data.message !== "fail") {
					for (var i = 0, m = data.rounds.length; i < m; i++) {
						//console.log(data.rounds[i].start_time);
						var l = {
							id: ko.observable(data.rounds[i].id),
							course_name: ko.observable(data.courses[i].name),
							start_time: ko.observable(data.rounds[i].start_time),
							score: ko.observable(data.scores[i]),
							par: ko.observable(data.pars[i])
						}
						self.roundList.push(l);
					}
				}
			}
		);
	}

	//getRounds();


	function getCourseData (course_id, round_id, cb) {

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

				//console.log("getting holedata");

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

				//self.setHoleData(self.currentHole());

				if (round_id) getRoundScores(round_id, function() { cb() });
				else cb();

			}
		);
	};

	//getCourseData();


	function prePopulateScores() {
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

	prePopulateScores();
	
	function getRoundScores(round_id, cb) {

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
								self.roundScores()[z].fairway_hit(data.scores[i].fairway_hit);
								self.roundScores()[z].green_hit(data.scores[i].green_hit);

								hcp = data.scores[i].round_hcp;
								tee = data.scores[i].round_tee;
							}

						}
					}

					self.round_hcp(hcp);
					self.round_tee(tee);
					self.calcPlayingHcp(hcp);

				}


				//console.log("getroundscore round_tee", self.round_tee());

				//self.locale_tee(self.translate_tee());

				/*var hole = 0;
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
				}*/

				cb();
			}
		);
	};


	self.translate_tee = function() {
		if (self.round_tee() === "yellow") return "Keltainen";
		else if (self.round_tee() === "blue") return "Sininen";
		else if (self.round_tee() === "red") return "Punainen";
		else if (self.round_tee() === "white") return "Valkoinen";
	};	

	self.roundLoaded = ko.observable(false);

	self.loadRound = function(round_id) {

		//round_id, start_time

		if(!round_id) {

			var id = window.location.search.split('round=')[1];
			//console.log(split);

		
			if (!isNaN(parseInt(id, 10))) {
				/*console.log("last param");
				console.log(id);*/
				round_id = parseInt(id, 10);
			}
			else return;
		}

		self.roundLoaded(false);

		//self.loadedRoundStartTime(start_time);
		self.holes([]);


		//console.log(round_id);
		//console.log(start_time);


		var data = { round_id : round_id };
		apexEventProxy.getRound(
			{ data : data },
			function (data) {
				//console.log(data.round.start_time);
				//console.log(data.golfer);

				self.playerName(data.golfer.name);
				self.playerExactHcp(data.golfer.handicap);
				self.playerDefaultTee(data.golfer.tee);
				self.playerGender(data.golfer.gender);
				self.playerId(data.golfer.id);



				//console.log("got bits");
				var course_id = data.round.course_id;
				var start_time = data.round.start_time;
				var end_time = data.round.end_time;
				getCourseData(course_id, round_id, function() {
					self.round_id(round_id);
					self.course_id(course_id);
					self.roundStartTime(start_time.date);
					if (end_time === null) {
						self.roundEndTime("");
					}
					else {
						self.roundEndTime(end_time.date);
					}

					self.roundLoaded(true);

					

					/*self.calcRoundDuration();
					var clock = setInterval(function() {
						self.calcRoundDuration();
					} , 2000);*/
				});
			}
		);
	};

	self.scoreCard = ko.observableArray([]);

	function fillScoreCard(round_hcp) {
		self.scoreCard.removeAll();

		//console.log("filling called");

		for (var i = 0; i < self.holes().length; i++) {

			var t = ko.observable();
			t = getHolePoints(self.roundScores()[i].score(), self.holes()[i].hole_par(), self.holes()[i].hole_hcp(), round_hcp);

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
			self.calcHcpPreview();

		}

		//self.calcHcpPreview();

	};


	function getHolePoints(score, par, hole_hcp, round_hcp) {

		var crhcp = parseInt(round_hcp);
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

	self.getHolePoints = function(score, par, hole_hcp, round_hcp) {

		var crhcp = parseInt(round_hcp);
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

	self.totalToPar = ko.computed(function() {
		if (self.holes().length > 0 && self.roundScores().length > 0) {
			var toPar = 0;
			var y;
			for (var i = 0; i < self.roundScores().length; i++) {
				y = parseInt(self.roundScores()[i].score(), 10);
				if (i < self.holes().length) {
					if (y > 0) toPar += y - parseInt(self.holes()[i].hole_par(), 10);
				}
			}

			return toPar;
		}
		else return false;

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

	self.frontNineScore = ko.computed(function() {
		if (self.roundScores().length > 0) {
			var s = 0;
			for (var n = 0; n < 9; n++) {
				s += self.roundScores()[n].score();
			}
			return s;
		}
	}).extend({throttle: 1});

	self.backNineScore = ko.computed(function() {
		if (self.roundScores().length > 0) {
			var s = 0;
			for (var n = 9; n < self.holes().length; n++) {
				s += self.roundScores()[n].score();
			}
			return s;
		}
	}).extend({throttle: 1});

	self.frontNineToPar = ko.computed(function() {
		if(self.roundScores().length > 0 && self.holes().length > 0) {
			var y, toPar = 0;
			for (var n = 0; n < 9; n++) {
				y = parseInt(self.roundScores()[n].score(), 10);
				if (y > 0) toPar += y - parseInt(self.holes()[n].hole_par(), 10);
			}
			return toPar;
		}

	}).extend({throttle: 1});

	self.backNineToPar = ko.computed(function() {
		if(self.roundScores().length > 0 && self.holes().length > 0) {
			var y, toPar = 0;
			for (var n = 9; n < self.holes().length; n++) {
				y = parseInt(self.roundScores()[n].score(), 10);
				if (y > 0) toPar += y - parseInt(self.holes()[n].hole_par(), 10);
			}
			return toPar;
		}

	}).extend({throttle: 1});

	self.frontNinePoints = ko.computed(function() {
		if(self.roundScores().length > 0) {
			var s = 0;
			for (var n = 0; n < 9; n++) {
				s += self.roundScores()[n].points();
			}
			return s;
		}
	}).extend({throttle: 1 });

	self.backNinePoints = ko.computed(function() {
		if(self.roundScores().length > 0) {
			var s = 0;
			for (var n = 9; n < self.holes().length; n++) {
				s += self.roundScores()[n].points();
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

	self.frontNinePar = ko.computed(function() {
		if (self.holes().length > 0) {
			var s = 0;
			for (var i = 0; i < 9; i++) {
				s += self.holes()[i].hole_par();
			}
			return s;
		}
	}).extend({throttle: 1 });

	self.backNinePar = ko.computed(function() {
		if (self.holes().length > 0) {		
			var s = 0;
			for (var i = 9; i < self.holes().length; i++) {
				s += self.holes()[i].hole_par();
			}
			return s;
		}
	}).extend({throttle: 1 });

	self.coursePar = ko.computed(function() {
		if (self.holes().length > 0) {				
			var s = 0;
			for (var i = 0; i < self.holes().length; i++) {
				s = s + parseInt(self.holes()[i].hole_par(), 10);
			}
			return s;
		}
	}).extend({throttle: 1 });


	ko.bindingHandlers.fadeVisible = {
		init: function(element, valueAccessor) {
			var shouldDisplay = valueAccessor();
			var el = $(element);
			el.toggle(shouldDisplay);
		},
		update: function(element, valueAccessor) {
			// On update, fade in/out
			var shouldDisplay = valueAccessor();
			var el = $(element);

			if (shouldDisplay == true) {
				el.css({ display: 'block'});
				el.transition({ opacity: 1, queue: false, duration: '500' });
			}
			else {
				el.transition({ opacity: 0, queue: false, duration: '500' });
				el.css({ display: 'none'});
			}
		}
	};

	self.hcpPreview = ko.observable();

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

		return group;

	};


}	


$(document).ready(function() {
	window.vm = new viewModel();
	ko.applyBindings(vm);

	vm.loadRound();
});	

// Knockout JavaScript library v3.1.0
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function() {(function(p){var A=this||(0,eval)("this"),w=A.document,K=A.navigator,t=A.jQuery,C=A.JSON;(function(p){"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?p(module.exports||exports):"function"===typeof define&&define.amd?define(["exports"],p):p(A.ko={})})(function(z){function G(a,c){return null===a||typeof a in M?a===c:!1}function N(a,c){var d;return function(){d||(d=setTimeout(function(){d=p;a()},c))}}function O(a,c){var d;return function(){clearTimeout(d);d=setTimeout(a,
c)}}function H(b,c,d,e){a.d[b]={init:function(b,h,g,k,l){var n,r;a.ba(function(){var g=a.a.c(h()),k=!d!==!g,s=!r;if(s||c||k!==n)s&&a.ca.fa()&&(r=a.a.lb(a.e.childNodes(b),!0)),k?(s||a.e.U(b,a.a.lb(r)),a.gb(e?e(l,g):l,b)):a.e.da(b),n=k},null,{G:b});return{controlsDescendantBindings:!0}}};a.g.aa[b]=!1;a.e.Q[b]=!0}var a="undefined"!==typeof z?z:{};a.b=function(b,c){for(var d=b.split("."),e=a,f=0;f<d.length-1;f++)e=e[d[f]];e[d[d.length-1]]=c};a.s=function(a,c,d){a[c]=d};a.version="3.1.0";a.b("version",
a.version);a.a=function(){function b(a,b){for(var c in a)a.hasOwnProperty(c)&&b(c,a[c])}function c(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function d(a,b){a.__proto__=b;return a}var e={__proto__:[]}instanceof Array,f={},h={};f[K&&/Firefox\/2/i.test(K.userAgent)?"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];f.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");b(f,function(a,b){if(b.length)for(var c=0,
d=b.length;c<d;c++)h[b[c]]=a});var g={propertychange:!0},k=w&&function(){for(var a=3,b=w.createElement("div"),c=b.getElementsByTagName("i");b.innerHTML="\x3c!--[if gt IE "+ ++a+"]><i></i><![endif]--\x3e",c[0];);return 4<a?a:p}();return{mb:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],r:function(a,b){for(var c=0,d=a.length;c<d;c++)b(a[c],c)},l:function(a,b){if("function"==typeof Array.prototype.indexOf)return Array.prototype.indexOf.call(a,b);for(var c=0,d=a.length;c<d;c++)if(a[c]===
b)return c;return-1},hb:function(a,b,c){for(var d=0,e=a.length;d<e;d++)if(b.call(c,a[d],d))return a[d];return null},ma:function(b,c){var d=a.a.l(b,c);0<d?b.splice(d,1):0===d&&b.shift()},ib:function(b){b=b||[];for(var c=[],d=0,e=b.length;d<e;d++)0>a.a.l(c,b[d])&&c.push(b[d]);return c},ya:function(a,b){a=a||[];for(var c=[],d=0,e=a.length;d<e;d++)c.push(b(a[d],d));return c},la:function(a,b){a=a||[];for(var c=[],d=0,e=a.length;d<e;d++)b(a[d],d)&&c.push(a[d]);return c},$:function(a,b){if(b instanceof Array)a.push.apply(a,
b);else for(var c=0,d=b.length;c<d;c++)a.push(b[c]);return a},Y:function(b,c,d){var e=a.a.l(a.a.Sa(b),c);0>e?d&&b.push(c):d||b.splice(e,1)},na:e,extend:c,ra:d,sa:e?d:c,A:b,Oa:function(a,b){if(!a)return a;var c={},d;for(d in a)a.hasOwnProperty(d)&&(c[d]=b(a[d],d,a));return c},Fa:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},ec:function(b){b=a.a.R(b);for(var c=w.createElement("div"),d=0,e=b.length;d<e;d++)c.appendChild(a.M(b[d]));return c},lb:function(b,c){for(var d=0,e=b.length,g=[];d<
e;d++){var k=b[d].cloneNode(!0);g.push(c?a.M(k):k)}return g},U:function(b,c){a.a.Fa(b);if(c)for(var d=0,e=c.length;d<e;d++)b.appendChild(c[d])},Bb:function(b,c){var d=b.nodeType?[b]:b;if(0<d.length){for(var e=d[0],g=e.parentNode,k=0,h=c.length;k<h;k++)g.insertBefore(c[k],e);k=0;for(h=d.length;k<h;k++)a.removeNode(d[k])}},ea:function(a,b){if(a.length){for(b=8===b.nodeType&&b.parentNode||b;a.length&&a[0].parentNode!==b;)a.shift();if(1<a.length){var c=a[0],d=a[a.length-1];for(a.length=0;c!==d;)if(a.push(c),
c=c.nextSibling,!c)return;a.push(d)}}return a},Db:function(a,b){7>k?a.setAttribute("selected",b):a.selected=b},ta:function(a){return null===a||a===p?"":a.trim?a.trim():a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},oc:function(b,c){for(var d=[],e=(b||"").split(c),g=0,k=e.length;g<k;g++){var h=a.a.ta(e[g]);""!==h&&d.push(h)}return d},kc:function(a,b){a=a||"";return b.length>a.length?!1:a.substring(0,b.length)===b},Sb:function(a,b){if(a===b)return!0;if(11===a.nodeType)return!1;if(b.contains)return b.contains(3===
a.nodeType?a.parentNode:a);if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&16);for(;a&&a!=b;)a=a.parentNode;return!!a},Ea:function(b){return a.a.Sb(b,b.ownerDocument.documentElement)},eb:function(b){return!!a.a.hb(b,a.a.Ea)},B:function(a){return a&&a.tagName&&a.tagName.toLowerCase()},q:function(b,c,d){var e=k&&g[c];if(!e&&t)t(b).bind(c,d);else if(e||"function"!=typeof b.addEventListener)if("undefined"!=typeof b.attachEvent){var h=function(a){d.call(b,a)},f="on"+c;b.attachEvent(f,
h);a.a.u.ja(b,function(){b.detachEvent(f,h)})}else throw Error("Browser doesn't support addEventListener or attachEvent");else b.addEventListener(c,d,!1)},ha:function(b,c){if(!b||!b.nodeType)throw Error("element must be a DOM node when calling triggerEvent");var d;"input"===a.a.B(b)&&b.type&&"click"==c.toLowerCase()?(d=b.type,d="checkbox"==d||"radio"==d):d=!1;if(t&&!d)t(b).trigger(c);else if("function"==typeof w.createEvent)if("function"==typeof b.dispatchEvent)d=w.createEvent(h[c]||"HTMLEvents"),
d.initEvent(c,!0,!0,A,0,0,0,0,0,!1,!1,!1,!1,0,b),b.dispatchEvent(d);else throw Error("The supplied element doesn't support dispatchEvent");else if(d&&b.click)b.click();else if("undefined"!=typeof b.fireEvent)b.fireEvent("on"+c);else throw Error("Browser doesn't support triggering events");},c:function(b){return a.v(b)?b():b},Sa:function(b){return a.v(b)?b.o():b},ua:function(b,c,d){if(c){var e=/\S+/g,g=b.className.match(e)||[];a.a.r(c.match(e),function(b){a.a.Y(g,b,d)});b.className=g.join(" ")}},Xa:function(b,
c){var d=a.a.c(c);if(null===d||d===p)d="";var e=a.e.firstChild(b);!e||3!=e.nodeType||a.e.nextSibling(e)?a.e.U(b,[b.ownerDocument.createTextNode(d)]):e.data=d;a.a.Vb(b)},Cb:function(a,b){a.name=b;if(7>=k)try{a.mergeAttributes(w.createElement("<input name='"+a.name+"'/>"),!1)}catch(c){}},Vb:function(a){9<=k&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},Tb:function(a){if(k){var b=a.style.width;a.style.width=0;a.style.width=b}},ic:function(b,c){b=a.a.c(b);c=a.a.c(c);for(var d=
[],e=b;e<=c;e++)d.push(e);return d},R:function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(a[c]);return b},mc:6===k,nc:7===k,oa:k,ob:function(b,c){for(var d=a.a.R(b.getElementsByTagName("input")).concat(a.a.R(b.getElementsByTagName("textarea"))),e="string"==typeof c?function(a){return a.name===c}:function(a){return c.test(a.name)},g=[],k=d.length-1;0<=k;k--)e(d[k])&&g.push(d[k]);return g},fc:function(b){return"string"==typeof b&&(b=a.a.ta(b))?C&&C.parse?C.parse(b):(new Function("return "+b))():
null},Ya:function(b,c,d){if(!C||!C.stringify)throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");return C.stringify(a.a.c(b),c,d)},gc:function(c,d,e){e=e||{};var g=e.params||{},k=e.includeFields||this.mb,h=c;if("object"==typeof c&&"form"===a.a.B(c))for(var h=c.action,f=k.length-1;0<=f;f--)for(var u=a.a.ob(c,k[f]),D=u.length-1;0<=D;D--)g[u[D].name]=
u[D].value;d=a.a.c(d);var y=w.createElement("form");y.style.display="none";y.action=h;y.method="post";for(var p in d)c=w.createElement("input"),c.name=p,c.value=a.a.Ya(a.a.c(d[p])),y.appendChild(c);b(g,function(a,b){var c=w.createElement("input");c.name=a;c.value=b;y.appendChild(c)});w.body.appendChild(y);e.submitter?e.submitter(y):y.submit();setTimeout(function(){y.parentNode.removeChild(y)},0)}}}();a.b("utils",a.a);a.b("utils.arrayForEach",a.a.r);a.b("utils.arrayFirst",a.a.hb);a.b("utils.arrayFilter",
a.a.la);a.b("utils.arrayGetDistinctValues",a.a.ib);a.b("utils.arrayIndexOf",a.a.l);a.b("utils.arrayMap",a.a.ya);a.b("utils.arrayPushAll",a.a.$);a.b("utils.arrayRemoveItem",a.a.ma);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",a.a.mb);a.b("utils.getFormFields",a.a.ob);a.b("utils.peekObservable",a.a.Sa);a.b("utils.postJson",a.a.gc);a.b("utils.parseJson",a.a.fc);a.b("utils.registerEventHandler",a.a.q);a.b("utils.stringifyJson",a.a.Ya);a.b("utils.range",a.a.ic);a.b("utils.toggleDomNodeCssClass",
a.a.ua);a.b("utils.triggerEvent",a.a.ha);a.b("utils.unwrapObservable",a.a.c);a.b("utils.objectForEach",a.a.A);a.b("utils.addOrRemoveItem",a.a.Y);a.b("unwrap",a.a.c);Function.prototype.bind||(Function.prototype.bind=function(a){var c=this,d=Array.prototype.slice.call(arguments);a=d.shift();return function(){return c.apply(a,d.concat(Array.prototype.slice.call(arguments)))}});a.a.f=new function(){function a(b,h){var g=b[d];if(!g||"null"===g||!e[g]){if(!h)return p;g=b[d]="ko"+c++;e[g]={}}return e[g]}
var c=0,d="__ko__"+(new Date).getTime(),e={};return{get:function(c,d){var e=a(c,!1);return e===p?p:e[d]},set:function(c,d,e){if(e!==p||a(c,!1)!==p)a(c,!0)[d]=e},clear:function(a){var b=a[d];return b?(delete e[b],a[d]=null,!0):!1},L:function(){return c++ +d}}};a.b("utils.domData",a.a.f);a.b("utils.domData.clear",a.a.f.clear);a.a.u=new function(){function b(b,c){var e=a.a.f.get(b,d);e===p&&c&&(e=[],a.a.f.set(b,d,e));return e}function c(d){var e=b(d,!1);if(e)for(var e=e.slice(0),k=0;k<e.length;k++)e[k](d);
a.a.f.clear(d);a.a.u.cleanExternalData(d);if(f[d.nodeType])for(e=d.firstChild;d=e;)e=d.nextSibling,8===d.nodeType&&c(d)}var d=a.a.f.L(),e={1:!0,8:!0,9:!0},f={1:!0,9:!0};return{ja:function(a,c){if("function"!=typeof c)throw Error("Callback must be a function");b(a,!0).push(c)},Ab:function(c,e){var k=b(c,!1);k&&(a.a.ma(k,e),0==k.length&&a.a.f.set(c,d,p))},M:function(b){if(e[b.nodeType]&&(c(b),f[b.nodeType])){var d=[];a.a.$(d,b.getElementsByTagName("*"));for(var k=0,l=d.length;k<l;k++)c(d[k])}return b},
removeNode:function(b){a.M(b);b.parentNode&&b.parentNode.removeChild(b)},cleanExternalData:function(a){t&&"function"==typeof t.cleanData&&t.cleanData([a])}}};a.M=a.a.u.M;a.removeNode=a.a.u.removeNode;a.b("cleanNode",a.M);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",a.a.u);a.b("utils.domNodeDisposal.addDisposeCallback",a.a.u.ja);a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.u.Ab);(function(){a.a.Qa=function(b){var c;if(t)if(t.parseHTML)c=t.parseHTML(b)||[];else{if((c=t.clean([b]))&&
c[0]){for(b=c[0];b.parentNode&&11!==b.parentNode.nodeType;)b=b.parentNode;b.parentNode&&b.parentNode.removeChild(b)}}else{var d=a.a.ta(b).toLowerCase();c=w.createElement("div");d=d.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!d.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!d.indexOf("<td")||!d.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];b="ignored<div>"+d[1]+b+d[2]+"</div>";for("function"==typeof A.innerShiv?c.appendChild(A.innerShiv(b)):
c.innerHTML=b;d[0]--;)c=c.lastChild;c=a.a.R(c.lastChild.childNodes)}return c};a.a.Va=function(b,c){a.a.Fa(b);c=a.a.c(c);if(null!==c&&c!==p)if("string"!=typeof c&&(c=c.toString()),t)t(b).html(c);else for(var d=a.a.Qa(c),e=0;e<d.length;e++)b.appendChild(d[e])}})();a.b("utils.parseHtmlFragment",a.a.Qa);a.b("utils.setHtml",a.a.Va);a.w=function(){function b(c,e){if(c)if(8==c.nodeType){var f=a.w.xb(c.nodeValue);null!=f&&e.push({Rb:c,cc:f})}else if(1==c.nodeType)for(var f=0,h=c.childNodes,g=h.length;f<g;f++)b(h[f],
e)}var c={};return{Na:function(a){if("function"!=typeof a)throw Error("You can only pass a function to ko.memoization.memoize()");var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);c[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},Hb:function(a,b){var f=c[a];if(f===p)throw Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized.");try{return f.apply(null,b||[]),!0}finally{delete c[a]}},Ib:function(c,e){var f=
[];b(c,f);for(var h=0,g=f.length;h<g;h++){var k=f[h].Rb,l=[k];e&&a.a.$(l,e);a.w.Hb(f[h].cc,l);k.nodeValue="";k.parentNode&&k.parentNode.removeChild(k)}},xb:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:null}}}();a.b("memoization",a.w);a.b("memoization.memoize",a.w.Na);a.b("memoization.unmemoize",a.w.Hb);a.b("memoization.parseMemoText",a.w.xb);a.b("memoization.unmemoizeDomNodeAndDescendants",a.w.Ib);a.Ga={throttle:function(b,c){b.throttleEvaluation=c;var d=null;return a.h({read:b,write:function(a){clearTimeout(d);
d=setTimeout(function(){b(a)},c)}})},rateLimit:function(a,c){var d,e,f;"number"==typeof c?d=c:(d=c.timeout,e=c.method);f="notifyWhenChangesStop"==e?O:N;a.Ma(function(a){return f(a,d)})},notify:function(a,c){a.equalityComparer="always"==c?null:G}};var M={undefined:1,"boolean":1,number:1,string:1};a.b("extenders",a.Ga);a.Fb=function(b,c,d){this.target=b;this.za=c;this.Qb=d;this.sb=!1;a.s(this,"dispose",this.F)};a.Fb.prototype.F=function(){this.sb=!0;this.Qb()};a.N=function(){a.a.sa(this,a.N.fn);this.H=
{}};var F="change";z={V:function(b,c,d){var e=this;d=d||F;var f=new a.Fb(e,c?b.bind(c):b,function(){a.a.ma(e.H[d],f)});e.o&&e.o();e.H[d]||(e.H[d]=[]);e.H[d].push(f);return f},notifySubscribers:function(b,c){c=c||F;if(this.qb(c))try{a.k.jb();for(var d=this.H[c].slice(0),e=0,f;f=d[e];++e)f.sb||f.za(b)}finally{a.k.end()}},Ma:function(b){var c=this,d=a.v(c),e,f,h;c.ia||(c.ia=c.notifySubscribers,c.notifySubscribers=function(a,b){b&&b!==F?"beforeChange"===b?c.bb(a):c.ia(a,b):c.cb(a)});var g=b(function(){d&&
h===c&&(h=c());e=!1;c.Ka(f,h)&&c.ia(f=h)});c.cb=function(a){e=!0;h=a;g()};c.bb=function(a){e||(f=a,c.ia(a,"beforeChange"))}},qb:function(a){return this.H[a]&&this.H[a].length},Wb:function(){var b=0;a.a.A(this.H,function(a,d){b+=d.length});return b},Ka:function(a,c){return!this.equalityComparer||!this.equalityComparer(a,c)},extend:function(b){var c=this;b&&a.a.A(b,function(b,e){var f=a.Ga[b];"function"==typeof f&&(c=f(c,e)||c)});return c}};a.s(z,"subscribe",z.V);a.s(z,"extend",z.extend);a.s(z,"getSubscriptionsCount",
z.Wb);a.a.na&&a.a.ra(z,Function.prototype);a.N.fn=z;a.tb=function(a){return null!=a&&"function"==typeof a.V&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.N);a.b("isSubscribable",a.tb);a.ca=a.k=function(){function b(a){d.push(e);e=a}function c(){e=d.pop()}var d=[],e,f=0;return{jb:b,end:c,zb:function(b){if(e){if(!a.tb(b))throw Error("Only subscribable things can act as dependencies");e.za(b,b.Kb||(b.Kb=++f))}},t:function(a,d,e){try{return b(),a.apply(d,e||[])}finally{c()}},fa:function(){if(e)return e.ba.fa()},
pa:function(){if(e)return e.pa}}}();a.b("computedContext",a.ca);a.b("computedContext.getDependenciesCount",a.ca.fa);a.b("computedContext.isInitial",a.ca.pa);a.m=function(b){function c(){if(0<arguments.length)return c.Ka(d,arguments[0])&&(c.P(),d=arguments[0],c.O()),this;a.k.zb(c);return d}var d=b;a.N.call(c);a.a.sa(c,a.m.fn);c.o=function(){return d};c.O=function(){c.notifySubscribers(d)};c.P=function(){c.notifySubscribers(d,"beforeChange")};a.s(c,"peek",c.o);a.s(c,"valueHasMutated",c.O);a.s(c,"valueWillMutate",
c.P);return c};a.m.fn={equalityComparer:G};var E=a.m.hc="__ko_proto__";a.m.fn[E]=a.m;a.a.na&&a.a.ra(a.m.fn,a.N.fn);a.Ha=function(b,c){return null===b||b===p||b[E]===p?!1:b[E]===c?!0:a.Ha(b[E],c)};a.v=function(b){return a.Ha(b,a.m)};a.ub=function(b){return"function"==typeof b&&b[E]===a.m||"function"==typeof b&&b[E]===a.h&&b.Yb?!0:!1};a.b("observable",a.m);a.b("isObservable",a.v);a.b("isWriteableObservable",a.ub);a.T=function(b){b=b||[];if("object"!=typeof b||!("length"in b))throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
b=a.m(b);a.a.sa(b,a.T.fn);return b.extend({trackArrayChanges:!0})};a.T.fn={remove:function(b){for(var c=this.o(),d=[],e="function"!=typeof b||a.v(b)?function(a){return a===b}:b,f=0;f<c.length;f++){var h=c[f];e(h)&&(0===d.length&&this.P(),d.push(h),c.splice(f,1),f--)}d.length&&this.O();return d},removeAll:function(b){if(b===p){var c=this.o(),d=c.slice(0);this.P();c.splice(0,c.length);this.O();return d}return b?this.remove(function(c){return 0<=a.a.l(b,c)}):[]},destroy:function(b){var c=this.o(),d=
"function"!=typeof b||a.v(b)?function(a){return a===b}:b;this.P();for(var e=c.length-1;0<=e;e--)d(c[e])&&(c[e]._destroy=!0);this.O()},destroyAll:function(b){return b===p?this.destroy(function(){return!0}):b?this.destroy(function(c){return 0<=a.a.l(b,c)}):[]},indexOf:function(b){var c=this();return a.a.l(c,b)},replace:function(a,c){var d=this.indexOf(a);0<=d&&(this.P(),this.o()[d]=c,this.O())}};a.a.r("pop push reverse shift sort splice unshift".split(" "),function(b){a.T.fn[b]=function(){var a=this.o();
this.P();this.kb(a,b,arguments);a=a[b].apply(a,arguments);this.O();return a}});a.a.r(["slice"],function(b){a.T.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.a.na&&a.a.ra(a.T.fn,a.m.fn);a.b("observableArray",a.T);var I="arrayChange";a.Ga.trackArrayChanges=function(b){function c(){if(!d){d=!0;var c=b.notifySubscribers;b.notifySubscribers=function(a,b){b&&b!==F||++f;return c.apply(this,arguments)};var k=[].concat(b.o()||[]);e=null;b.V(function(c){c=[].concat(c||[]);if(b.qb(I)){var d;
if(!e||1<f)e=a.a.Aa(k,c,{sparse:!0});d=e;d.length&&b.notifySubscribers(d,I)}k=c;e=null;f=0})}}if(!b.kb){var d=!1,e=null,f=0,h=b.V;b.V=b.subscribe=function(a,b,d){d===I&&c();return h.apply(this,arguments)};b.kb=function(b,c,l){function h(a,b,c){return r[r.length]={status:a,value:b,index:c}}if(d&&!f){var r=[],m=b.length,q=l.length,s=0;switch(c){case "push":s=m;case "unshift":for(c=0;c<q;c++)h("added",l[c],s+c);break;case "pop":s=m-1;case "shift":m&&h("deleted",b[s],s);break;case "splice":c=Math.min(Math.max(0,
0>l[0]?m+l[0]:l[0]),m);for(var m=1===q?m:Math.min(c+(l[1]||0),m),q=c+q-2,s=Math.max(m,q),B=[],u=[],D=2;c<s;++c,++D)c<m&&u.push(h("deleted",b[c],c)),c<q&&B.push(h("added",l[D],c));a.a.nb(u,B);break;default:return}e=r}}}};a.ba=a.h=function(b,c,d){function e(){q=!0;a.a.A(v,function(a,b){b.F()});v={};x=0;n=!1}function f(){var a=g.throttleEvaluation;a&&0<=a?(clearTimeout(t),t=setTimeout(h,a)):g.wa?g.wa():h()}function h(){if(!r&&!q){if(y&&y()){if(!m){p();return}}else m=!1;r=!0;try{var b=v,d=x;a.k.jb({za:function(a,
c){q||(d&&b[c]?(v[c]=b[c],++x,delete b[c],--d):v[c]||(v[c]=a.V(f),++x))},ba:g,pa:!x});v={};x=0;try{var e=c?s.call(c):s()}finally{a.k.end(),d&&a.a.A(b,function(a,b){b.F()}),n=!1}g.Ka(l,e)&&(g.notifySubscribers(l,"beforeChange"),l=e,g.wa&&!g.throttleEvaluation||g.notifySubscribers(l))}finally{r=!1}x||p()}}function g(){if(0<arguments.length){if("function"===typeof B)B.apply(c,arguments);else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
return this}n&&h();a.k.zb(g);return l}function k(){return n||0<x}var l,n=!0,r=!1,m=!1,q=!1,s=b;s&&"object"==typeof s?(d=s,s=d.read):(d=d||{},s||(s=d.read));if("function"!=typeof s)throw Error("Pass a function that returns the value of the ko.computed");var B=d.write,u=d.disposeWhenNodeIsRemoved||d.G||null,D=d.disposeWhen||d.Da,y=D,p=e,v={},x=0,t=null;c||(c=d.owner);a.N.call(g);a.a.sa(g,a.h.fn);g.o=function(){n&&!x&&h();return l};g.fa=function(){return x};g.Yb="function"===typeof d.write;g.F=function(){p()};
g.ga=k;var w=g.Ma;g.Ma=function(a){w.call(g,a);g.wa=function(){g.bb(l);n=!0;g.cb(g)}};a.s(g,"peek",g.o);a.s(g,"dispose",g.F);a.s(g,"isActive",g.ga);a.s(g,"getDependenciesCount",g.fa);u&&(m=!0,u.nodeType&&(y=function(){return!a.a.Ea(u)||D&&D()}));!0!==d.deferEvaluation&&h();u&&k()&&u.nodeType&&(p=function(){a.a.u.Ab(u,p);e()},a.a.u.ja(u,p));return g};a.$b=function(b){return a.Ha(b,a.h)};z=a.m.hc;a.h[z]=a.m;a.h.fn={equalityComparer:G};a.h.fn[z]=a.h;a.a.na&&a.a.ra(a.h.fn,a.N.fn);a.b("dependentObservable",
a.h);a.b("computed",a.h);a.b("isComputed",a.$b);(function(){function b(a,f,h){h=h||new d;a=f(a);if("object"!=typeof a||null===a||a===p||a instanceof Date||a instanceof String||a instanceof Number||a instanceof Boolean)return a;var g=a instanceof Array?[]:{};h.save(a,g);c(a,function(c){var d=f(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":g[c]=d;break;case "object":case "undefined":var n=h.get(d);g[c]=n!==p?n:b(d,f,h)}});return g}function c(a,b){if(a instanceof Array){for(var c=
0;c<a.length;c++)b(c);"function"==typeof a.toJSON&&b("toJSON")}else for(c in a)b(c)}function d(){this.keys=[];this.ab=[]}a.Gb=function(c){if(0==arguments.length)throw Error("When calling ko.toJS, pass the object you want to convert.");return b(c,function(b){for(var c=0;a.v(b)&&10>c;c++)b=b();return b})};a.toJSON=function(b,c,d){b=a.Gb(b);return a.a.Ya(b,c,d)};d.prototype={save:function(b,c){var d=a.a.l(this.keys,b);0<=d?this.ab[d]=c:(this.keys.push(b),this.ab.push(c))},get:function(b){b=a.a.l(this.keys,
b);return 0<=b?this.ab[b]:p}}})();a.b("toJS",a.Gb);a.b("toJSON",a.toJSON);(function(){a.i={p:function(b){switch(a.a.B(b)){case "option":return!0===b.__ko__hasDomDataOptionValue__?a.a.f.get(b,a.d.options.Pa):7>=a.a.oa?b.getAttributeNode("value")&&b.getAttributeNode("value").specified?b.value:b.text:b.value;case "select":return 0<=b.selectedIndex?a.i.p(b.options[b.selectedIndex]):p;default:return b.value}},X:function(b,c,d){switch(a.a.B(b)){case "option":switch(typeof c){case "string":a.a.f.set(b,a.d.options.Pa,
p);"__ko__hasDomDataOptionValue__"in b&&delete b.__ko__hasDomDataOptionValue__;b.value=c;break;default:a.a.f.set(b,a.d.options.Pa,c),b.__ko__hasDomDataOptionValue__=!0,b.value="number"===typeof c?c:""}break;case "select":if(""===c||null===c)c=p;for(var e=-1,f=0,h=b.options.length,g;f<h;++f)if(g=a.i.p(b.options[f]),g==c||""==g&&c===p){e=f;break}if(d||0<=e||c===p&&1<b.size)b.selectedIndex=e;break;default:if(null===c||c===p)c="";b.value=c}}}})();a.b("selectExtensions",a.i);a.b("selectExtensions.readValue",
a.i.p);a.b("selectExtensions.writeValue",a.i.X);a.g=function(){function b(b){b=a.a.ta(b);123===b.charCodeAt(0)&&(b=b.slice(1,-1));var c=[],d=b.match(e),g,m,q=0;if(d){d.push(",");for(var s=0,B;B=d[s];++s){var u=B.charCodeAt(0);if(44===u){if(0>=q){g&&c.push(m?{key:g,value:m.join("")}:{unknown:g});g=m=q=0;continue}}else if(58===u){if(!m)continue}else if(47===u&&s&&1<B.length)(u=d[s-1].match(f))&&!h[u[0]]&&(b=b.substr(b.indexOf(B)+1),d=b.match(e),d.push(","),s=-1,B="/");else if(40===u||123===u||91===
u)++q;else if(41===u||125===u||93===u)--q;else if(!g&&!m){g=34===u||39===u?B.slice(1,-1):B;continue}m?m.push(B):m=[B]}}return c}var c=["true","false","null","undefined"],d=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,e=RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]","g"),f=/[\])"'A-Za-z0-9_$]+$/,h={"in":1,"return":1,"typeof":1},g={};return{aa:[],W:g,Ra:b,qa:function(e,l){function f(b,e){var l,k=a.getBindingHandler(b);
if(k&&k.preprocess?e=k.preprocess(e,b,f):1){if(k=g[b])l=e,0<=a.a.l(c,l)?l=!1:(k=l.match(d),l=null===k?!1:k[1]?"Object("+k[1]+")"+k[2]:l),k=l;k&&m.push("'"+b+"':function(_z){"+l+"=_z}");q&&(e="function(){return "+e+" }");h.push("'"+b+"':"+e)}}l=l||{};var h=[],m=[],q=l.valueAccessors,s="string"===typeof e?b(e):e;a.a.r(s,function(a){f(a.key||a.unknown,a.value)});m.length&&f("_ko_property_writers","{"+m.join(",")+" }");return h.join(",")},bc:function(a,b){for(var c=0;c<a.length;c++)if(a[c].key==b)return!0;
return!1},va:function(b,c,d,e,g){if(b&&a.v(b))!a.ub(b)||g&&b.o()===e||b(e);else if((b=c.get("_ko_property_writers"))&&b[d])b[d](e)}}}();a.b("expressionRewriting",a.g);a.b("expressionRewriting.bindingRewriteValidators",a.g.aa);a.b("expressionRewriting.parseObjectLiteral",a.g.Ra);a.b("expressionRewriting.preProcessBindings",a.g.qa);a.b("expressionRewriting._twoWayBindings",a.g.W);a.b("jsonExpressionRewriting",a.g);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",a.g.qa);(function(){function b(a){return 8==
a.nodeType&&h.test(f?a.text:a.nodeValue)}function c(a){return 8==a.nodeType&&g.test(f?a.text:a.nodeValue)}function d(a,d){for(var e=a,g=1,k=[];e=e.nextSibling;){if(c(e)&&(g--,0===g))return k;k.push(e);b(e)&&g++}if(!d)throw Error("Cannot find closing comment tag to match: "+a.nodeValue);return null}function e(a,b){var c=d(a,b);return c?0<c.length?c[c.length-1].nextSibling:a.nextSibling:null}var f=w&&"\x3c!--test--\x3e"===w.createComment("test").text,h=f?/^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,
g=f?/^\x3c!--\s*\/ko\s*--\x3e$/:/^\s*\/ko\s*$/,k={ul:!0,ol:!0};a.e={Q:{},childNodes:function(a){return b(a)?d(a):a.childNodes},da:function(c){if(b(c)){c=a.e.childNodes(c);for(var d=0,e=c.length;d<e;d++)a.removeNode(c[d])}else a.a.Fa(c)},U:function(c,d){if(b(c)){a.e.da(c);for(var e=c.nextSibling,g=0,k=d.length;g<k;g++)e.parentNode.insertBefore(d[g],e)}else a.a.U(c,d)},yb:function(a,c){b(a)?a.parentNode.insertBefore(c,a.nextSibling):a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c)},rb:function(c,
d,e){e?b(c)?c.parentNode.insertBefore(d,e.nextSibling):e.nextSibling?c.insertBefore(d,e.nextSibling):c.appendChild(d):a.e.yb(c,d)},firstChild:function(a){return b(a)?!a.nextSibling||c(a.nextSibling)?null:a.nextSibling:a.firstChild},nextSibling:function(a){b(a)&&(a=e(a));return a.nextSibling&&c(a.nextSibling)?null:a.nextSibling},Xb:b,lc:function(a){return(a=(f?a.text:a.nodeValue).match(h))?a[1]:null},wb:function(d){if(k[a.a.B(d)]){var g=d.firstChild;if(g){do if(1===g.nodeType){var f;f=g.firstChild;
var h=null;if(f){do if(h)h.push(f);else if(b(f)){var q=e(f,!0);q?f=q:h=[f]}else c(f)&&(h=[f]);while(f=f.nextSibling)}if(f=h)for(h=g.nextSibling,q=0;q<f.length;q++)h?d.insertBefore(f[q],h):d.appendChild(f[q])}while(g=g.nextSibling)}}}}})();a.b("virtualElements",a.e);a.b("virtualElements.allowedBindings",a.e.Q);a.b("virtualElements.emptyNode",a.e.da);a.b("virtualElements.insertAfter",a.e.rb);a.b("virtualElements.prepend",a.e.yb);a.b("virtualElements.setDomNodeChildren",a.e.U);(function(){a.J=function(){this.Nb=
{}};a.a.extend(a.J.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return null!=b.getAttribute("data-bind");case 8:return a.e.Xb(b);default:return!1}},getBindings:function(a,c){var d=this.getBindingsString(a,c);return d?this.parseBindingsString(d,c,a):null},getBindingAccessors:function(a,c){var d=this.getBindingsString(a,c);return d?this.parseBindingsString(d,c,a,{valueAccessors:!0}):null},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");
case 8:return a.e.lc(b);default:return null}},parseBindingsString:function(b,c,d,e){try{var f=this.Nb,h=b+(e&&e.valueAccessors||""),g;if(!(g=f[h])){var k,l="with($context){with($data||{}){return{"+a.g.qa(b,e)+"}}}";k=new Function("$context","$element",l);g=f[h]=k}return g(c,d)}catch(n){throw n.message="Unable to parse bindings.\nBindings value: "+b+"\nMessage: "+n.message,n;}}});a.J.instance=new a.J})();a.b("bindingProvider",a.J);(function(){function b(a){return function(){return a}}function c(a){return a()}
function d(b){return a.a.Oa(a.k.t(b),function(a,c){return function(){return b()[c]}})}function e(a,b){return d(this.getBindings.bind(this,a,b))}function f(b,c,d){var e,g=a.e.firstChild(c),k=a.J.instance,f=k.preprocessNode;if(f){for(;e=g;)g=a.e.nextSibling(e),f.call(k,e);g=a.e.firstChild(c)}for(;e=g;)g=a.e.nextSibling(e),h(b,e,d)}function h(b,c,d){var e=!0,g=1===c.nodeType;g&&a.e.wb(c);if(g&&d||a.J.instance.nodeHasBindings(c))e=k(c,null,b,d).shouldBindDescendants;e&&!n[a.a.B(c)]&&f(b,c,!g)}function g(b){var c=
[],d={},e=[];a.a.A(b,function y(g){if(!d[g]){var k=a.getBindingHandler(g);k&&(k.after&&(e.push(g),a.a.r(k.after,function(c){if(b[c]){if(-1!==a.a.l(e,c))throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+e.join(", "));y(c)}}),e.length--),c.push({key:g,pb:k}));d[g]=!0}});return c}function k(b,d,k,f){var h=a.a.f.get(b,r);if(!d){if(h)throw Error("You cannot apply bindings multiple times to the same element.");a.a.f.set(b,r,!0)}!h&&f&&a.Eb(b,k);var l;if(d&&"function"!==
typeof d)l=d;else{var n=a.J.instance,m=n.getBindingAccessors||e,x=a.h(function(){(l=d?d(k,b):m.call(n,b,k))&&k.D&&k.D();return l},null,{G:b});l&&x.ga()||(x=null)}var t;if(l){var w=x?function(a){return function(){return c(x()[a])}}:function(a){return l[a]},z=function(){return a.a.Oa(x?x():l,c)};z.get=function(a){return l[a]&&c(w(a))};z.has=function(a){return a in l};f=g(l);a.a.r(f,function(c){var d=c.pb.init,e=c.pb.update,g=c.key;if(8===b.nodeType&&!a.e.Q[g])throw Error("The binding '"+g+"' cannot be used with virtual elements");
try{"function"==typeof d&&a.k.t(function(){var a=d(b,w(g),z,k.$data,k);if(a&&a.controlsDescendantBindings){if(t!==p)throw Error("Multiple bindings ("+t+" and "+g+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");t=g}}),"function"==typeof e&&a.h(function(){e(b,w(g),z,k.$data,k)},null,{G:b})}catch(f){throw f.message='Unable to process binding "'+g+": "+l[g]+'"\nMessage: '+f.message,f;}})}return{shouldBindDescendants:t===p}}
function l(b){return b&&b instanceof a.I?b:new a.I(b)}a.d={};var n={script:!0};a.getBindingHandler=function(b){return a.d[b]};a.I=function(b,c,d,e){var g=this,k="function"==typeof b&&!a.v(b),f,h=a.h(function(){var f=k?b():b,l=a.a.c(f);c?(c.D&&c.D(),a.a.extend(g,c),h&&(g.D=h)):(g.$parents=[],g.$root=l,g.ko=a);g.$rawData=f;g.$data=l;d&&(g[d]=l);e&&e(g,c,l);return g.$data},null,{Da:function(){return f&&!a.a.eb(f)},G:!0});h.ga()&&(g.D=h,h.equalityComparer=null,f=[],h.Jb=function(b){f.push(b);a.a.u.ja(b,
function(b){a.a.ma(f,b);f.length||(h.F(),g.D=h=p)})})};a.I.prototype.createChildContext=function(b,c,d){return new a.I(b,this,c,function(a,b){a.$parentContext=b;a.$parent=b.$data;a.$parents=(b.$parents||[]).slice(0);a.$parents.unshift(a.$parent);d&&d(a)})};a.I.prototype.extend=function(b){return new a.I(this.D||this.$data,this,null,function(c,d){c.$rawData=d.$rawData;a.a.extend(c,"function"==typeof b?b():b)})};var r=a.a.f.L(),m=a.a.f.L();a.Eb=function(b,c){if(2==arguments.length)a.a.f.set(b,m,c),
c.D&&c.D.Jb(b);else return a.a.f.get(b,m)};a.xa=function(b,c,d){1===b.nodeType&&a.e.wb(b);return k(b,c,l(d),!0)};a.Lb=function(c,e,g){g=l(g);return a.xa(c,"function"===typeof e?d(e.bind(null,g,c)):a.a.Oa(e,b),g)};a.gb=function(a,b){1!==b.nodeType&&8!==b.nodeType||f(l(a),b,!0)};a.fb=function(a,b){!t&&A.jQuery&&(t=A.jQuery);if(b&&1!==b.nodeType&&8!==b.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");b=b||A.document.body;h(l(a),
b,!0)};a.Ca=function(b){switch(b.nodeType){case 1:case 8:var c=a.Eb(b);if(c)return c;if(b.parentNode)return a.Ca(b.parentNode)}return p};a.Pb=function(b){return(b=a.Ca(b))?b.$data:p};a.b("bindingHandlers",a.d);a.b("applyBindings",a.fb);a.b("applyBindingsToDescendants",a.gb);a.b("applyBindingAccessorsToNode",a.xa);a.b("applyBindingsToNode",a.Lb);a.b("contextFor",a.Ca);a.b("dataFor",a.Pb)})();var L={"class":"className","for":"htmlFor"};a.d.attr={update:function(b,c){var d=a.a.c(c())||{};a.a.A(d,function(c,
d){d=a.a.c(d);var h=!1===d||null===d||d===p;h&&b.removeAttribute(c);8>=a.a.oa&&c in L?(c=L[c],h?b.removeAttribute(c):b[c]=d):h||b.setAttribute(c,d.toString());"name"===c&&a.a.Cb(b,h?"":d.toString())})}};(function(){a.d.checked={after:["value","attr"],init:function(b,c,d){function e(){return d.has("checkedValue")?a.a.c(d.get("checkedValue")):b.value}function f(){var g=b.checked,f=r?e():g;if(!a.ca.pa()&&(!k||g)){var h=a.k.t(c);l?n!==f?(g&&(a.a.Y(h,f,!0),a.a.Y(h,n,!1)),n=f):a.a.Y(h,f,g):a.g.va(h,d,"checked",
f,!0)}}function h(){var d=a.a.c(c());b.checked=l?0<=a.a.l(d,e()):g?d:e()===d}var g="checkbox"==b.type,k="radio"==b.type;if(g||k){var l=g&&a.a.c(c())instanceof Array,n=l?e():p,r=k||l;k&&!b.name&&a.d.uniqueName.init(b,function(){return!0});a.ba(f,null,{G:b});a.a.q(b,"click",f);a.ba(h,null,{G:b})}}};a.g.W.checked=!0;a.d.checkedValue={update:function(b,c){b.value=a.a.c(c())}}})();a.d.css={update:function(b,c){var d=a.a.c(c());"object"==typeof d?a.a.A(d,function(c,d){d=a.a.c(d);a.a.ua(b,c,d)}):(d=String(d||
""),a.a.ua(b,b.__ko__cssValue,!1),b.__ko__cssValue=d,a.a.ua(b,d,!0))}};a.d.enable={update:function(b,c){var d=a.a.c(c());d&&b.disabled?b.removeAttribute("disabled"):d||b.disabled||(b.disabled=!0)}};a.d.disable={update:function(b,c){a.d.enable.update(b,function(){return!a.a.c(c())})}};a.d.event={init:function(b,c,d,e,f){var h=c()||{};a.a.A(h,function(g){"string"==typeof g&&a.a.q(b,g,function(b){var h,n=c()[g];if(n){try{var r=a.a.R(arguments);e=f.$data;r.unshift(e);h=n.apply(e,r)}finally{!0!==h&&(b.preventDefault?
b.preventDefault():b.returnValue=!1)}!1===d.get(g+"Bubble")&&(b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation())}})})}};a.d.foreach={vb:function(b){return function(){var c=b(),d=a.a.Sa(c);if(!d||"number"==typeof d.length)return{foreach:c,templateEngine:a.K.Ja};a.a.c(c);return{foreach:d.data,as:d.as,includeDestroyed:d.includeDestroyed,afterAdd:d.afterAdd,beforeRemove:d.beforeRemove,afterRender:d.afterRender,beforeMove:d.beforeMove,afterMove:d.afterMove,templateEngine:a.K.Ja}}},init:function(b,
c){return a.d.template.init(b,a.d.foreach.vb(c))},update:function(b,c,d,e,f){return a.d.template.update(b,a.d.foreach.vb(c),d,e,f)}};a.g.aa.foreach=!1;a.e.Q.foreach=!0;a.d.hasfocus={init:function(b,c,d){function e(e){b.__ko_hasfocusUpdating=!0;var k=b.ownerDocument;if("activeElement"in k){var f;try{f=k.activeElement}catch(h){f=k.body}e=f===b}k=c();a.g.va(k,d,"hasfocus",e,!0);b.__ko_hasfocusLastValue=e;b.__ko_hasfocusUpdating=!1}var f=e.bind(null,!0),h=e.bind(null,!1);a.a.q(b,"focus",f);a.a.q(b,"focusin",
f);a.a.q(b,"blur",h);a.a.q(b,"focusout",h)},update:function(b,c){var d=!!a.a.c(c());b.__ko_hasfocusUpdating||b.__ko_hasfocusLastValue===d||(d?b.focus():b.blur(),a.k.t(a.a.ha,null,[b,d?"focusin":"focusout"]))}};a.g.W.hasfocus=!0;a.d.hasFocus=a.d.hasfocus;a.g.W.hasFocus=!0;a.d.html={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Va(b,c())}};H("if");H("ifnot",!1,!0);H("with",!0,!1,function(a,c){return a.createChildContext(c)});var J={};a.d.options={init:function(b){if("select"!==
a.a.B(b))throw Error("options binding applies only to SELECT elements");for(;0<b.length;)b.remove(0);return{controlsDescendantBindings:!0}},update:function(b,c,d){function e(){return a.a.la(b.options,function(a){return a.selected})}function f(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c}function h(c,d){if(r.length){var e=0<=a.a.l(r,a.i.p(d[0]));a.a.Db(d[0],e);m&&!e&&a.k.t(a.a.ha,null,[b,"change"])}}var g=0!=b.length&&b.multiple?b.scrollTop:null,k=a.a.c(c()),l=d.get("optionsIncludeDestroyed");
c={};var n,r;r=b.multiple?a.a.ya(e(),a.i.p):0<=b.selectedIndex?[a.i.p(b.options[b.selectedIndex])]:[];k&&("undefined"==typeof k.length&&(k=[k]),n=a.a.la(k,function(b){return l||b===p||null===b||!a.a.c(b._destroy)}),d.has("optionsCaption")&&(k=a.a.c(d.get("optionsCaption")),null!==k&&k!==p&&n.unshift(J)));var m=!1;c.beforeRemove=function(a){b.removeChild(a)};k=h;d.has("optionsAfterRender")&&(k=function(b,c){h(0,c);a.k.t(d.get("optionsAfterRender"),null,[c[0],b!==J?b:p])});a.a.Ua(b,n,function(c,e,g){g.length&&
(r=g[0].selected?[a.i.p(g[0])]:[],m=!0);e=b.ownerDocument.createElement("option");c===J?(a.a.Xa(e,d.get("optionsCaption")),a.i.X(e,p)):(g=f(c,d.get("optionsValue"),c),a.i.X(e,a.a.c(g)),c=f(c,d.get("optionsText"),g),a.a.Xa(e,c));return[e]},c,k);a.k.t(function(){d.get("valueAllowUnset")&&d.has("value")?a.i.X(b,a.a.c(d.get("value")),!0):(b.multiple?r.length&&e().length<r.length:r.length&&0<=b.selectedIndex?a.i.p(b.options[b.selectedIndex])!==r[0]:r.length||0<=b.selectedIndex)&&a.a.ha(b,"change")});a.a.Tb(b);
g&&20<Math.abs(g-b.scrollTop)&&(b.scrollTop=g)}};a.d.options.Pa=a.a.f.L();a.d.selectedOptions={after:["options","foreach"],init:function(b,c,d){a.a.q(b,"change",function(){var e=c(),f=[];a.a.r(b.getElementsByTagName("option"),function(b){b.selected&&f.push(a.i.p(b))});a.g.va(e,d,"selectedOptions",f)})},update:function(b,c){if("select"!=a.a.B(b))throw Error("values binding applies only to SELECT elements");var d=a.a.c(c());d&&"number"==typeof d.length&&a.a.r(b.getElementsByTagName("option"),function(b){var c=
0<=a.a.l(d,a.i.p(b));a.a.Db(b,c)})}};a.g.W.selectedOptions=!0;a.d.style={update:function(b,c){var d=a.a.c(c()||{});a.a.A(d,function(c,d){d=a.a.c(d);b.style[c]=d||""})}};a.d.submit={init:function(b,c,d,e,f){if("function"!=typeof c())throw Error("The value for a submit binding must be a function");a.a.q(b,"submit",function(a){var d,e=c();try{d=e.call(f.$data,b)}finally{!0!==d&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}})}};a.d.text={init:function(){return{controlsDescendantBindings:!0}},
update:function(b,c){a.a.Xa(b,c())}};a.e.Q.text=!0;a.d.uniqueName={init:function(b,c){if(c()){var d="ko_unique_"+ ++a.d.uniqueName.Ob;a.a.Cb(b,d)}}};a.d.uniqueName.Ob=0;a.d.value={after:["options","foreach"],init:function(b,c,d){function e(){g=!1;var e=c(),f=a.i.p(b);a.g.va(e,d,"value",f)}var f=["change"],h=d.get("valueUpdate"),g=!1;h&&("string"==typeof h&&(h=[h]),a.a.$(f,h),f=a.a.ib(f));!a.a.oa||"input"!=b.tagName.toLowerCase()||"text"!=b.type||"off"==b.autocomplete||b.form&&"off"==b.form.autocomplete||
-1!=a.a.l(f,"propertychange")||(a.a.q(b,"propertychange",function(){g=!0}),a.a.q(b,"focus",function(){g=!1}),a.a.q(b,"blur",function(){g&&e()}));a.a.r(f,function(c){var d=e;a.a.kc(c,"after")&&(d=function(){setTimeout(e,0)},c=c.substring(5));a.a.q(b,c,d)})},update:function(b,c,d){var e=a.a.c(c());c=a.i.p(b);if(e!==c)if("select"===a.a.B(b)){var f=d.get("valueAllowUnset");d=function(){a.i.X(b,e,f)};d();f||e===a.i.p(b)?setTimeout(d,0):a.k.t(a.a.ha,null,[b,"change"])}else a.i.X(b,e)}};a.g.W.value=!0;a.d.visible=
{update:function(b,c){var d=a.a.c(c()),e="none"!=b.style.display;d&&!e?b.style.display="":!d&&e&&(b.style.display="none")}};(function(b){a.d[b]={init:function(c,d,e,f,h){return a.d.event.init.call(this,c,function(){var a={};a[b]=d();return a},e,f,h)}}})("click");a.C=function(){};a.C.prototype.renderTemplateSource=function(){throw Error("Override renderTemplateSource");};a.C.prototype.createJavaScriptEvaluatorBlock=function(){throw Error("Override createJavaScriptEvaluatorBlock");};a.C.prototype.makeTemplateSource=
function(b,c){if("string"==typeof b){c=c||w;var d=c.getElementById(b);if(!d)throw Error("Cannot find template with ID "+b);return new a.n.j(d)}if(1==b.nodeType||8==b.nodeType)return new a.n.Z(b);throw Error("Unknown template type: "+b);};a.C.prototype.renderTemplate=function(a,c,d,e){a=this.makeTemplateSource(a,e);return this.renderTemplateSource(a,c,d)};a.C.prototype.isTemplateRewritten=function(a,c){return!1===this.allowTemplateRewriting?!0:this.makeTemplateSource(a,c).data("isRewritten")};a.C.prototype.rewriteTemplate=
function(a,c,d){a=this.makeTemplateSource(a,d);c=c(a.text());a.text(c);a.data("isRewritten",!0)};a.b("templateEngine",a.C);a.Za=function(){function b(b,c,d,g){b=a.g.Ra(b);for(var k=a.g.aa,l=0;l<b.length;l++){var n=b[l].key;if(k.hasOwnProperty(n)){var r=k[n];if("function"===typeof r){if(n=r(b[l].value))throw Error(n);}else if(!r)throw Error("This template engine does not support the '"+n+"' binding within its templates");}}d="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+a.g.qa(b,
{valueAccessors:!0})+" } })()},'"+d.toLowerCase()+"')";return g.createJavaScriptEvaluatorBlock(d)+c}var c=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,d=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;return{Ub:function(b,c,d){c.isTemplateRewritten(b,d)||c.rewriteTemplate(b,function(b){return a.Za.dc(b,c)},d)},dc:function(a,f){return a.replace(c,function(a,c,d,e,n){return b(n,c,d,f)}).replace(d,function(a,c){return b(c,"\x3c!-- ko --\x3e",
"#comment",f)})},Mb:function(b,c){return a.w.Na(function(d,g){var k=d.nextSibling;k&&k.nodeName.toLowerCase()===c&&a.xa(k,b,g)})}}}();a.b("__tr_ambtns",a.Za.Mb);(function(){a.n={};a.n.j=function(a){this.j=a};a.n.j.prototype.text=function(){var b=a.a.B(this.j),b="script"===b?"text":"textarea"===b?"value":"innerHTML";if(0==arguments.length)return this.j[b];var c=arguments[0];"innerHTML"===b?a.a.Va(this.j,c):this.j[b]=c};var b=a.a.f.L()+"_";a.n.j.prototype.data=function(c){if(1===arguments.length)return a.a.f.get(this.j,
b+c);a.a.f.set(this.j,b+c,arguments[1])};var c=a.a.f.L();a.n.Z=function(a){this.j=a};a.n.Z.prototype=new a.n.j;a.n.Z.prototype.text=function(){if(0==arguments.length){var b=a.a.f.get(this.j,c)||{};b.$a===p&&b.Ba&&(b.$a=b.Ba.innerHTML);return b.$a}a.a.f.set(this.j,c,{$a:arguments[0]})};a.n.j.prototype.nodes=function(){if(0==arguments.length)return(a.a.f.get(this.j,c)||{}).Ba;a.a.f.set(this.j,c,{Ba:arguments[0]})};a.b("templateSources",a.n);a.b("templateSources.domElement",a.n.j);a.b("templateSources.anonymousTemplate",
a.n.Z)})();(function(){function b(b,c,d){var e;for(c=a.e.nextSibling(c);b&&(e=b)!==c;)b=a.e.nextSibling(e),d(e,b)}function c(c,d){if(c.length){var e=c[0],f=c[c.length-1],h=e.parentNode,m=a.J.instance,q=m.preprocessNode;if(q){b(e,f,function(a,b){var c=a.previousSibling,d=q.call(m,a);d&&(a===e&&(e=d[0]||b),a===f&&(f=d[d.length-1]||c))});c.length=0;if(!e)return;e===f?c.push(e):(c.push(e,f),a.a.ea(c,h))}b(e,f,function(b){1!==b.nodeType&&8!==b.nodeType||a.fb(d,b)});b(e,f,function(b){1!==b.nodeType&&8!==
b.nodeType||a.w.Ib(b,[d])});a.a.ea(c,h)}}function d(a){return a.nodeType?a:0<a.length?a[0]:null}function e(b,e,h,n,r){r=r||{};var m=b&&d(b),m=m&&m.ownerDocument,q=r.templateEngine||f;a.Za.Ub(h,q,m);h=q.renderTemplate(h,n,r,m);if("number"!=typeof h.length||0<h.length&&"number"!=typeof h[0].nodeType)throw Error("Template engine must return an array of DOM nodes");m=!1;switch(e){case "replaceChildren":a.e.U(b,h);m=!0;break;case "replaceNode":a.a.Bb(b,h);m=!0;break;case "ignoreTargetNode":break;default:throw Error("Unknown renderMode: "+
e);}m&&(c(h,n),r.afterRender&&a.k.t(r.afterRender,null,[h,n.$data]));return h}var f;a.Wa=function(b){if(b!=p&&!(b instanceof a.C))throw Error("templateEngine must inherit from ko.templateEngine");f=b};a.Ta=function(b,c,h,n,r){h=h||{};if((h.templateEngine||f)==p)throw Error("Set a template engine before calling renderTemplate");r=r||"replaceChildren";if(n){var m=d(n);return a.h(function(){var f=c&&c instanceof a.I?c:new a.I(a.a.c(c)),p=a.v(b)?b():"function"==typeof b?b(f.$data,f):b,f=e(n,r,p,f,h);
"replaceNode"==r&&(n=f,m=d(n))},null,{Da:function(){return!m||!a.a.Ea(m)},G:m&&"replaceNode"==r?m.parentNode:m})}return a.w.Na(function(d){a.Ta(b,c,h,d,"replaceNode")})};a.jc=function(b,d,f,h,r){function m(a,b){c(b,s);f.afterRender&&f.afterRender(b,a)}function q(a,c){s=r.createChildContext(a,f.as,function(a){a.$index=c});var d="function"==typeof b?b(a,s):b;return e(null,"ignoreTargetNode",d,s,f)}var s;return a.h(function(){var b=a.a.c(d)||[];"undefined"==typeof b.length&&(b=[b]);b=a.a.la(b,function(b){return f.includeDestroyed||
b===p||null===b||!a.a.c(b._destroy)});a.k.t(a.a.Ua,null,[h,b,q,f,m])},null,{G:h})};var h=a.a.f.L();a.d.template={init:function(b,c){var d=a.a.c(c());"string"==typeof d||d.name?a.e.da(b):(d=a.e.childNodes(b),d=a.a.ec(d),(new a.n.Z(b)).nodes(d));return{controlsDescendantBindings:!0}},update:function(b,c,d,e,f){var m=c(),q;c=a.a.c(m);d=!0;e=null;"string"==typeof c?c={}:(m=c.name,"if"in c&&(d=a.a.c(c["if"])),d&&"ifnot"in c&&(d=!a.a.c(c.ifnot)),q=a.a.c(c.data));"foreach"in c?e=a.jc(m||b,d&&c.foreach||
[],c,b,f):d?(f="data"in c?f.createChildContext(q,c.as):f,e=a.Ta(m||b,f,c,b)):a.e.da(b);f=e;(q=a.a.f.get(b,h))&&"function"==typeof q.F&&q.F();a.a.f.set(b,h,f&&f.ga()?f:p)}};a.g.aa.template=function(b){b=a.g.Ra(b);return 1==b.length&&b[0].unknown||a.g.bc(b,"name")?null:"This template engine does not support anonymous templates nested within its templates"};a.e.Q.template=!0})();a.b("setTemplateEngine",a.Wa);a.b("renderTemplate",a.Ta);a.a.nb=function(a,c,d){if(a.length&&c.length){var e,f,h,g,k;for(e=
f=0;(!d||e<d)&&(g=a[f]);++f){for(h=0;k=c[h];++h)if(g.value===k.value){g.moved=k.index;k.moved=g.index;c.splice(h,1);e=h=0;break}e+=h}}};a.a.Aa=function(){function b(b,d,e,f,h){var g=Math.min,k=Math.max,l=[],n,p=b.length,m,q=d.length,s=q-p||1,t=p+q+1,u,w,y;for(n=0;n<=p;n++)for(w=u,l.push(u=[]),y=g(q,n+s),m=k(0,n-1);m<=y;m++)u[m]=m?n?b[n-1]===d[m-1]?w[m-1]:g(w[m]||t,u[m-1]||t)+1:m+1:n+1;g=[];k=[];s=[];n=p;for(m=q;n||m;)q=l[n][m]-1,m&&q===l[n][m-1]?k.push(g[g.length]={status:e,value:d[--m],index:m}):
n&&q===l[n-1][m]?s.push(g[g.length]={status:f,value:b[--n],index:n}):(--m,--n,h.sparse||g.push({status:"retained",value:d[m]}));a.a.nb(k,s,10*p);return g.reverse()}return function(a,d,e){e="boolean"===typeof e?{dontLimitMoves:e}:e||{};a=a||[];d=d||[];return a.length<=d.length?b(a,d,"added","deleted",e):b(d,a,"deleted","added",e)}}();a.b("utils.compareArrays",a.a.Aa);(function(){function b(b,c,f,h,g){var k=[],l=a.h(function(){var l=c(f,g,a.a.ea(k,b))||[];0<k.length&&(a.a.Bb(k,l),h&&a.k.t(h,null,[f,
l,g]));k.length=0;a.a.$(k,l)},null,{G:b,Da:function(){return!a.a.eb(k)}});return{S:k,h:l.ga()?l:p}}var c=a.a.f.L();a.a.Ua=function(d,e,f,h,g){function k(b,c){v=r[c];u!==c&&(z[b]=v);v.Ia(u++);a.a.ea(v.S,d);s.push(v);y.push(v)}function l(b,c){if(b)for(var d=0,e=c.length;d<e;d++)c[d]&&a.a.r(c[d].S,function(a){b(a,d,c[d].ka)})}e=e||[];h=h||{};var n=a.a.f.get(d,c)===p,r=a.a.f.get(d,c)||[],m=a.a.ya(r,function(a){return a.ka}),q=a.a.Aa(m,e,h.dontLimitMoves),s=[],t=0,u=0,w=[],y=[];e=[];for(var z=[],m=[],
v,x=0,A,C;A=q[x];x++)switch(C=A.moved,A.status){case "deleted":C===p&&(v=r[t],v.h&&v.h.F(),w.push.apply(w,a.a.ea(v.S,d)),h.beforeRemove&&(e[x]=v,y.push(v)));t++;break;case "retained":k(x,t++);break;case "added":C!==p?k(x,C):(v={ka:A.value,Ia:a.m(u++)},s.push(v),y.push(v),n||(m[x]=v))}l(h.beforeMove,z);a.a.r(w,h.beforeRemove?a.M:a.removeNode);for(var x=0,n=a.e.firstChild(d),E;v=y[x];x++){v.S||a.a.extend(v,b(d,f,v.ka,g,v.Ia));for(t=0;q=v.S[t];n=q.nextSibling,E=q,t++)q!==n&&a.e.rb(d,q,E);!v.Zb&&g&&(g(v.ka,
v.S,v.Ia),v.Zb=!0)}l(h.beforeRemove,e);l(h.afterMove,z);l(h.afterAdd,m);a.a.f.set(d,c,s)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",a.a.Ua);a.K=function(){this.allowTemplateRewriting=!1};a.K.prototype=new a.C;a.K.prototype.renderTemplateSource=function(b){var c=(9>a.a.oa?0:b.nodes)?b.nodes():null;if(c)return a.a.R(c.cloneNode(!0).childNodes);b=b.text();return a.a.Qa(b)};a.K.Ja=new a.K;a.Wa(a.K.Ja);a.b("nativeTemplateEngine",a.K);(function(){a.La=function(){var a=this.ac=function(){if(!t||
!t.tmpl)return 0;try{if(0<=t.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=function(b,e,f){f=f||{};if(2>a)throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");var h=b.data("precompiled");h||(h=b.text()||"",h=t.template(null,"{{ko_with $item.koBindingContext}}"+h+"{{/ko_with}}"),b.data("precompiled",h));b=[e.$data];e=t.extend({koBindingContext:e},f.templateOptions);e=t.tmpl(h,b,e);e.appendTo(w.createElement("div"));
t.fragments={};return e};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+a+" })()) }}"};this.addTemplate=function(a,b){w.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(t.tmpl.tag.ko_code={open:"__.push($1 || '');"},t.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.La.prototype=new a.C;var b=new a.La;0<b.ac&&a.Wa(b);a.b("jqueryTmplTemplateEngine",a.La)})()})})();})();

// moment.js
// version : 2.0.0
// author : Tim Wood
// license : MIT
// momentjs.com
(function(t){function n(t,n){return function(e){return u(t.call(this,e),n)}}function e(t){return function(n){return this.lang().ordinal(t.call(this,n))}}function s(){}function r(t){i(this,t)}function a(t){var n=this._data={},e=t.years||t.year||t.y||0,s=t.months||t.month||t.M||0,r=t.weeks||t.week||t.w||0,a=t.days||t.day||t.d||0,i=t.hours||t.hour||t.h||0,u=t.minutes||t.minute||t.m||0,d=t.seconds||t.second||t.s||0,c=t.milliseconds||t.millisecond||t.ms||0;this._milliseconds=c+1e3*d+6e4*u+36e5*i,this._days=a+7*r,this._months=s+12*e,n.milliseconds=c%1e3,d+=o(c/1e3),n.seconds=d%60,u+=o(d/60),n.minutes=u%60,i+=o(u/60),n.hours=i%24,a+=o(i/24),a+=7*r,n.days=a%30,s+=o(a/30),n.months=s%12,e+=o(s/12),n.years=e}function i(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function o(t){return 0>t?Math.ceil(t):Math.floor(t)}function u(t,n){for(var e=t+"";n>e.length;)e="0"+e;return e}function d(t,n,e){var s,r=n._milliseconds,a=n._days,i=n._months;r&&t._d.setTime(+t+r*e),a&&t.date(t.date()+a*e),i&&(s=t.date(),t.date(1).month(t.month()+i*e).date(Math.min(s,t.daysInMonth())))}function c(t){return"[object Array]"===Object.prototype.toString.call(t)}function h(t,n){var e,s=Math.min(t.length,n.length),r=Math.abs(t.length-n.length),a=0;for(e=0;s>e;e++)~~t[e]!==~~n[e]&&a++;return a+r}function f(t,n){return n.abbr=t,x[t]||(x[t]=new s),x[t].set(n),x[t]}function l(t){return t?(!x[t]&&W&&require("./lang/"+t),x[t]):O.fn._lang}function _(t){return t.match(/\[.*\]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"")}function m(t){var n,e,s=t.match(A);for(n=0,e=s.length;e>n;n++)s[n]=rn[s[n]]?rn[s[n]]:_(s[n]);return function(r){var a="";for(n=0;e>n;n++)a+="function"==typeof s[n].call?s[n].call(r,t):s[n];return a}}function y(t,n){function e(n){return t.lang().longDateFormat(n)||n}for(var s=5;s--&&P.test(n);)n=n.replace(P,e);return nn[n]||(nn[n]=m(n)),nn[n](t)}function M(t){switch(t){case"DDDD":return E;case"YYYY":return N;case"YYYYY":return $;case"S":case"SS":case"SSS":case"DDD":return V;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":case"a":case"A":return I;case"X":return R;case"Z":case"ZZ":return X;case"T":return j;case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return J;default:return RegExp(t.replace("\\",""))}}function D(t,n,e){var s,r=e._a;switch(t){case"M":case"MM":r[1]=null==n?0:~~n-1;break;case"MMM":case"MMMM":s=l(e._l).monthsParse(n),null!=s?r[1]=s:e._isValid=!1;break;case"D":case"DD":case"DDD":case"DDDD":null!=n&&(r[2]=~~n);break;case"YY":r[0]=~~n+(~~n>68?1900:2e3);break;case"YYYY":case"YYYYY":r[0]=~~n;break;case"a":case"A":e._isPm="pm"===(n+"").toLowerCase();break;case"H":case"HH":case"h":case"hh":r[3]=~~n;break;case"m":case"mm":r[4]=~~n;break;case"s":case"ss":r[5]=~~n;break;case"S":case"SS":case"SSS":r[6]=~~(1e3*("0."+n));break;case"X":e._d=new Date(1e3*parseFloat(n));break;case"Z":case"ZZ":e._useUTC=!0,s=(n+"").match(K),s&&s[1]&&(e._tzh=~~s[1]),s&&s[2]&&(e._tzm=~~s[2]),s&&"+"===s[0]&&(e._tzh=-e._tzh,e._tzm=-e._tzm)}null==n&&(e._isValid=!1)}function Y(t){var n,e,s=[];if(!t._d){for(n=0;7>n;n++)t._a[n]=s[n]=null==t._a[n]?2===n?1:0:t._a[n];s[3]+=t._tzh||0,s[4]+=t._tzm||0,e=new Date(0),t._useUTC?(e.setUTCFullYear(s[0],s[1],s[2]),e.setUTCHours(s[3],s[4],s[5],s[6])):(e.setFullYear(s[0],s[1],s[2]),e.setHours(s[3],s[4],s[5],s[6])),t._d=e}}function p(t){var n,e,s=t._f.match(A),r=t._i;for(t._a=[],n=0;s.length>n;n++)e=(M(s[n]).exec(r)||[])[0],e&&(r=r.slice(r.indexOf(e)+e.length)),rn[s[n]]&&D(s[n],e,t);t._isPm&&12>t._a[3]&&(t._a[3]+=12),t._isPm===!1&&12===t._a[3]&&(t._a[3]=0),Y(t)}function g(t){var n,e,s,a,o,u=99;for(a=t._f.length;a>0;a--){if(n=i({},t),n._f=t._f[a-1],p(n),e=new r(n),e.isValid()){s=e;break}o=h(n._a,e.toArray()),u>o&&(u=o,s=e)}i(t,s)}function w(t){var n,e=t._i;if(q.exec(e)){for(t._f="YYYY-MM-DDT",n=0;4>n;n++)if(G[n][1].exec(e)){t._f+=G[n][0];break}X.exec(e)&&(t._f+=" Z"),p(t)}else t._d=new Date(e)}function T(n){var e=n._i,s=Z.exec(e);e===t?n._d=new Date:s?n._d=new Date(+s[1]):"string"==typeof e?w(n):c(e)?(n._a=e.slice(0),Y(n)):n._d=e instanceof Date?new Date(+e):new Date(e)}function v(t,n,e,s,r){return r.relativeTime(n||1,!!e,t,s)}function k(t,n,e){var s=U(Math.abs(t)/1e3),r=U(s/60),a=U(r/60),i=U(a/24),o=U(i/365),u=45>s&&["s",s]||1===r&&["m"]||45>r&&["mm",r]||1===a&&["h"]||22>a&&["hh",a]||1===i&&["d"]||25>=i&&["dd",i]||45>=i&&["M"]||345>i&&["MM",U(i/30)]||1===o&&["y"]||["yy",o];return u[2]=n,u[3]=t>0,u[4]=e,v.apply({},u)}function S(t,n,e){var s=e-n,r=e-t.day();return r>s&&(r-=7),s-7>r&&(r+=7),Math.ceil(O(t).add("d",r).dayOfYear()/7)}function b(t){var n=t._i,e=t._f;return null===n||""===n?null:("string"==typeof n&&(t._i=n=l().preparse(n)),O.isMoment(n)?(t=i({},n),t._d=new Date(+n._d)):e?c(e)?g(t):p(t):T(t),new r(t))}function F(t,n){O.fn[t]=O.fn[t+"s"]=function(t){var e=this._isUTC?"UTC":"";return null!=t?(this._d["set"+e+n](t),this):this._d["get"+e+n]()}}function L(t){O.duration.fn[t]=function(){return this._data[t]}}function H(t,n){O.duration.fn["as"+t]=function(){return+this/n}}for(var O,z,C="2.0.0",U=Math.round,x={},W="undefined"!=typeof module&&module.exports,Z=/^\/?Date\((\-?\d+)/i,A=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,P=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,J=/\d\d?/,V=/\d{1,3}/,E=/\d{3}/,N=/\d{1,4}/,$=/[+\-]?\d{1,6}/,I=/[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,X=/Z|[\+\-]\d\d:?\d\d/i,j=/T/i,R=/[\+\-]?\d+(\.\d{1,3})?/,q=/^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,B="YYYY-MM-DDTHH:mm:ssZ",G=[["HH:mm:ss.S",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],K=/([\+\-]|\d\d)/gi,Q="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),tn={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},nn={},en="DDD w W M D d".split(" "),sn="M D H h m s w W".split(" "),rn={M:function(){return this.month()+1},MMM:function(t){return this.lang().monthsShort(this,t)},MMMM:function(t){return this.lang().months(this,t)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(t){return this.lang().weekdaysMin(this,t)},ddd:function(t){return this.lang().weekdaysShort(this,t)},dddd:function(t){return this.lang().weekdays(this,t)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return u(this.year()%100,2)},YYYY:function(){return u(this.year(),4)},YYYYY:function(){return u(this.year(),5)},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return~~(this.milliseconds()/100)},SS:function(){return u(~~(this.milliseconds()/10),2)},SSS:function(){return u(this.milliseconds(),3)},Z:function(){var t=-this.zone(),n="+";return 0>t&&(t=-t,n="-"),n+u(~~(t/60),2)+":"+u(~~t%60,2)},ZZ:function(){var t=-this.zone(),n="+";return 0>t&&(t=-t,n="-"),n+u(~~(10*t/6),4)},X:function(){return this.unix()}};en.length;)z=en.pop(),rn[z+"o"]=e(rn[z]);for(;sn.length;)z=sn.pop(),rn[z+z]=n(rn[z],2);for(rn.DDDD=n(rn.DDD,3),s.prototype={set:function(t){var n,e;for(e in t)n=t[e],"function"==typeof n?this[e]=n:this["_"+e]=n},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(t){return this._months[t.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(t){return this._monthsShort[t.month()]},monthsParse:function(t){var n,e,s;for(this._monthsParse||(this._monthsParse=[]),n=0;12>n;n++)if(this._monthsParse[n]||(e=O([2e3,n]),s="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[n]=RegExp(s.replace(".",""),"i")),this._monthsParse[n].test(t))return n},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(t){return this._weekdays[t.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(t){return this._weekdaysShort[t.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(t){return this._weekdaysMin[t.day()]},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(t){var n=this._longDateFormat[t];return!n&&this._longDateFormat[t.toUpperCase()]&&(n=this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(t){return t.slice(1)}),this._longDateFormat[t]=n),n},meridiem:function(t,n,e){return t>11?e?"pm":"PM":e?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(t,n){var e=this._calendar[t];return"function"==typeof e?e.apply(n):e},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(t,n,e,s){var r=this._relativeTime[e];return"function"==typeof r?r(t,n,e,s):r.replace(/%d/i,t)},pastFuture:function(t,n){var e=this._relativeTime[t>0?"future":"past"];return"function"==typeof e?e(n):e.replace(/%s/i,n)},ordinal:function(t){return this._ordinal.replace("%d",t)},_ordinal:"%d",preparse:function(t){return t},postformat:function(t){return t},week:function(t){return S(t,this._week.dow,this._week.doy)},_week:{dow:0,doy:6}},O=function(t,n,e){return b({_i:t,_f:n,_l:e,_isUTC:!1})},O.utc=function(t,n,e){return b({_useUTC:!0,_isUTC:!0,_l:e,_i:t,_f:n})},O.unix=function(t){return O(1e3*t)},O.duration=function(t,n){var e,s=O.isDuration(t),r="number"==typeof t,i=s?t._data:r?{}:t;return r&&(n?i[n]=t:i.milliseconds=t),e=new a(i),s&&t.hasOwnProperty("_lang")&&(e._lang=t._lang),e},O.version=C,O.defaultFormat=B,O.lang=function(n,e){return n?(e?f(n,e):x[n]||l(n),O.duration.fn._lang=O.fn._lang=l(n),t):O.fn._lang._abbr},O.langData=function(t){return t&&t._lang&&t._lang._abbr&&(t=t._lang._abbr),l(t)},O.isMoment=function(t){return t instanceof r},O.isDuration=function(t){return t instanceof a},O.fn=r.prototype={clone:function(){return O(this)},valueOf:function(){return+this._d},unix:function(){return Math.floor(+this._d/1e3)},toString:function(){return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._d},toJSON:function(){return O(this).utc().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var t=this;return[t.year(),t.month(),t.date(),t.hours(),t.minutes(),t.seconds(),t.milliseconds()]},isValid:function(){return null==this._isValid&&(this._isValid=this._a?!h(this._a,(this._isUTC?O.utc(this._a):O(this._a)).toArray()):!isNaN(this._d.getTime())),!!this._isValid},utc:function(){return this._isUTC=!0,this},local:function(){return this._isUTC=!1,this},format:function(t){var n=y(this,t||O.defaultFormat);return this.lang().postformat(n)},add:function(t,n){var e;return e="string"==typeof t?O.duration(+n,t):O.duration(t,n),d(this,e,1),this},subtract:function(t,n){var e;return e="string"==typeof t?O.duration(+n,t):O.duration(t,n),d(this,e,-1),this},diff:function(t,n,e){var s,r,a=this._isUTC?O(t).utc():O(t).local(),i=6e4*(this.zone()-a.zone());return n&&(n=n.replace(/s$/,"")),"year"===n||"month"===n?(s=432e5*(this.daysInMonth()+a.daysInMonth()),r=12*(this.year()-a.year())+(this.month()-a.month()),r+=(this-O(this).startOf("month")-(a-O(a).startOf("month")))/s,"year"===n&&(r/=12)):(s=this-a-i,r="second"===n?s/1e3:"minute"===n?s/6e4:"hour"===n?s/36e5:"day"===n?s/864e5:"week"===n?s/6048e5:s),e?r:o(r)},from:function(t,n){return O.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!n)},fromNow:function(t){return this.from(O(),t)},calendar:function(){var t=this.diff(O().startOf("day"),"days",!0),n=-6>t?"sameElse":-1>t?"lastWeek":0>t?"lastDay":1>t?"sameDay":2>t?"nextDay":7>t?"nextWeek":"sameElse";return this.format(this.lang().calendar(n,this))},isLeapYear:function(){var t=this.year();return 0===t%4&&0!==t%100||0===t%400},isDST:function(){return this.zone()<O([this.year()]).zone()||this.zone()<O([this.year(),5]).zone()},day:function(t){var n=this._isUTC?this._d.getUTCDay():this._d.getDay();return null==t?n:this.add({d:t-n})},startOf:function(t){switch(t=t.replace(/s$/,"")){case"year":this.month(0);case"month":this.date(1);case"week":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===t&&this.day(0),this},endOf:function(t){return this.startOf(t).add(t.replace(/s?$/,"s"),1).subtract("ms",1)},isAfter:function(n,e){return e=e!==t?e:"millisecond",+this.clone().startOf(e)>+O(n).startOf(e)},isBefore:function(n,e){return e=e!==t?e:"millisecond",+this.clone().startOf(e)<+O(n).startOf(e)},isSame:function(n,e){return e=e!==t?e:"millisecond",+this.clone().startOf(e)===+O(n).startOf(e)},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return O.utc([this.year(),this.month()+1,0]).date()},dayOfYear:function(t){var n=U((O(this).startOf("day")-O(this).startOf("year"))/864e5)+1;return null==t?n:this.add("d",t-n)},isoWeek:function(t){var n=S(this,1,4);return null==t?n:this.add("d",7*(t-n))},week:function(t){var n=this.lang().week(this);return null==t?n:this.add("d",7*(t-n))},lang:function(n){return n===t?this._lang:(this._lang=l(n),this)}},z=0;Q.length>z;z++)F(Q[z].toLowerCase().replace(/s$/,""),Q[z]);F("year","FullYear"),O.fn.days=O.fn.day,O.fn.weeks=O.fn.week,O.fn.isoWeeks=O.fn.isoWeek,O.duration.fn=a.prototype={weeks:function(){return o(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+2592e6*this._months},humanize:function(t){var n=+this,e=k(n,!t,this.lang());return t&&(e=this.lang().pastFuture(n,e)),this.lang().postformat(e)},lang:O.fn.lang};for(z in tn)tn.hasOwnProperty(z)&&(H(z,tn[z]),L(z.toLowerCase()));H("Weeks",6048e5),O.lang("en",{ordinal:function(t){var n=t%10,e=1===~~(t%100/10)?"th":1===n?"st":2===n?"nd":3===n?"rd":"th";return t+e}}),W&&(module.exports=O),"undefined"==typeof ender&&(this.moment=O),"function"==typeof define&&define.amd&&define("moment",[],function(){return O})}).call(this);
// moment.js language configuration
// language : finnish (fi)
// author : Tarmo Aidantausta : https://github.com/bleadof
(function(){function e(e){function a(e,a,n,_){var s="";switch(n){case"s":return _?"muutaman sekunnin":"muutama sekunti";case"m":return _?"minuutin":"minuutti";case"mm":s=_?"minuutin":"minuuttia";break;case"h":return _?"tunnin":"tunti";case"hh":s=_?"tunnin":"tuntia";break;case"d":return _?"p\u00e4iv\u00e4n":"p\u00e4iv\u00e4";case"dd":s=_?"p\u00e4iv\u00e4n":"p\u00e4iv\u00e4\u00e4";break;case"M":return _?"kuukauden":"kuukausi";case"MM":s=_?"kuukauden":"kuukautta";break;case"y":return _?"vuoden":"vuosi";case"yy":s=_?"vuoden":"vuotta"}return s=t(e,_)+" "+s}function t(e,a){return 10>e?a?_[e]:n[e]:e}var n="nolla yksi kaksi kolme nelj\u00e4 viisi kuusi seitsem\u00e4n kahdeksan yhdeks\u00e4n".split(" "),_=["nolla","yhden","kahden","kolmen","nelj\u00e4n","viiden","kuuden",n[7],n[8],n[9]];e.lang("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\u00e4kuu_hein\u00e4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kes\u00e4_hein\u00e4_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] LT",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] LT",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] LT",llll:"ddd, Do MMM YYYY, [klo] LT"},calendar:{sameDay:"[t\u00e4n\u00e4\u00e4n] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s p\u00e4\u00e4st\u00e4",past:"%s sitten",s:a,m:a,mm:a,h:a,hh:a,d:a,dd:a,M:a,MM:a,y:a,yy:a},ordinal:"%d.",week:{dow:1,doy:4}})}"function"==typeof define&&define.amd&&define(["moment"],e),"undefined"!=typeof window&&window.moment&&e(window.moment)})();
/**
 * @license
 * Lo-Dash 2.4.0 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
}function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n){if(!n||ce.call(n)!=q)return false;
var t=n.valueOf,e=typeof t=="function"&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)}function g(n,t,e){if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:et(t,e,3);for(var r=-1,u=V[typeof n]&&Te(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function _(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:et(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function U(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Te(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
return o}function H(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=et(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Te(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function J(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function Q(n){return n&&typeof n=="object"&&!$e(n)&&me.call(n,"__wrapped__")?n:new X(n)
}function X(n,t){this.__chain__=!!t,this.__wrapped__=n}function Z(n){function t(){if(r){var n=r.slice();be.apply(n,arguments)}if(this instanceof t){var o=tt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return De(t,n),t}function nt(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Re[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
}if(i=$e(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):H({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:g)(n,function(n,i){o[i]=nt(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function tt(n){return wt(n)?je(n):{}}function et(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(Ae.funcNames&&(r=!n.name),r=r||!Ae.funcDecomp,!r)){var u=ge.call(n);
Ae.funcNames||(r=!O.test(u)),r||(r=E.test(u),De(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function rt(n){function t(){var n=f?i:this;if(u){var h=u.slice();be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,rt([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=tt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
}var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return De(t,n),t}function ut(e,r){var u=-1,i=vt(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ot(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&($e(i)||yt(i))){t||(i=ot(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
}function it(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return it(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(p=!u,u||(u=a()),o||(o=a()),f=u.length;f--;)if(u[f]==n)return o[f]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(f=n.length,v=t.length,i=v==n.length,!i&&!r)return i;for(;v--;)if(c=f,p=t[v],r)for(;c--&&!(i=it(n[c],p,e,r,u,o)););else if(!(i=it(n[v],p,e,r,u,o)))break;return i}return _(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&it(n[a],t,e,r,u,o)):void 0
}),i&&!r&&_(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0}),p&&(l(u),l(o)),i}function at(n,t,e,r,u){($e(t)?St:g)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=$e(t))||h(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?$e(l)?l:[]:h(l)?l:{}),r.push(t),u.push(l),c||at(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function ft(n,t){return n+he(Ee()*(t-n+1))}function lt(e,r,u){var i=-1,f=vt(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
if(v){var g=o(h);g?(f=t,h=g):(v=false,h=u?h:(l(h),s))}for(;++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function ct(n){return function(t,e,r){var u={};e=Q.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else g(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function pt(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
var c=n&&n.__bindData__;return c&&true!==c?(c=c.slice(),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&be.apply(c[3]||(c[3]=[]),r),c[1]|=t,pt.apply(null,c)):(1==t||17===t?Z:rt)([n,t,e,r,u,o])}function st(n){return Fe[n]}function vt(){var t=(t=Q.indexOf)===Wt?n:t;return t}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(_(n,function(n,t){e=t}),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return Be[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false
}function mt(n,t,e){var r=Te(n),u=r.length;for(t=et(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return _(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Te(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])}function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false
}function xt(n){for(var t=-1,e=Te(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=vt(),o=n?n.length:0,i=false;return e=(0>e?Ne(0,o+e):e)||0,$e(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):g(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=Q.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else g(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];
t=Q.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else g(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=Q.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return g(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:et(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else g(n,t);
return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:et(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Te(n),r=u.length;g(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=Q.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);else o=[],g(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&$e(n)){e=-1;
for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:Q.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=Q.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else g(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)});return e}function $t(n,t,e,r){var u=3>arguments.length;return t=Q.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=ft(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=Q.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else g(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;for(t=Q.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Ie(Ne(0,r),u))
}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ne(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=Q.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ne(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?Q.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=Q.createCallback(e,r,3)),lt(n,t,e)
}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Le(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Le(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||$e(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?pt(n,17,p(arguments,2),null,t):pt(n,1,null,null,t)}function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Me(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Me()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Me(),a=n.apply(l,o),c||i||(o=l=null)))
}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ne(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ne(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Me(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);
t&&(e||u.length)||(null==e&&(e=t),o=X,t=n,n=Q,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=pe.test(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=function(){try{var n={},t=pe.test(t=re.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),je=pe.test(je=re.create)&&je,ke=pe.test(ke=Xt.isArray)&&ke,xe=e.isFinite,Ce=e.isNaN,Oe=pe.test(Oe=re.keys)&&Oe,Ne=te.max,Ie=te.min,Se=e.parseInt,Ee=te.random,Re={};Re[$]=Xt,Re[T]=Yt,Re[F]=Zt,Re[B]=ne,Re[q]=re,Re[W]=ee,Re[z]=ue,Re[P]=oe,X.prototype=Q.prototype;var Ae=Q.support={};Ae.funcDecomp=!pe.test(e.a)&&E.test(s),Ae.funcNames=typeof ne.name=="string",Q.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:Q}},je||(tt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
var r=new n;n.prototype=null}return r||e.Object()}}());var De=we?function(n,t){M.value=t,we(n,"__bindData__",M)}:Ht,$e=ke||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Te=Oe?function(n){return wt(n)?Oe(n):[]}:J,Fe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Be=_t(Fe),We=ue("("+Te(Be).join("|")+")","g"),qe=ue("["+Te(Fe).join("")+"]","g"),ze=ct(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Pe=ct(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)
}),Ke=ct(function(n,t,e){n[e]=t}),Le=Rt,Me=pe.test(Me=Zt.now)&&Me||function(){return(new Zt).getTime()},Ve=8==Se(d+"08")?Se:function(n,t){return Se(kt(n)?n.replace(I,""):n,t||0)};return Q.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},Q.assign=H,Q.at=function(n){for(var t=arguments,e=-1,r=ot(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];return u},Q.bind=Mt,Q.bindAll=function(n){for(var t=1<arguments.length?ot(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];
n[u]=pt(n[u],1,null,null,n)}return n},Q.bindKey=function(n,t){return 2<arguments.length?pt(t,19,p(arguments,2),null,n):pt(t,3,null,null,n)},Q.chain=function(n){return n=new X(n),n.__chain__=true,n},Q.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},Q.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},Q.constant=function(n){return function(){return n
}},Q.countBy=ze,Q.create=function(n,t){var e=tt(n);return t?H(e,t):e},Q.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return et(n,t,e);if("object"!=r)return Jt(n);var u=Te(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=it(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)}},Q.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,pt(n,4,null,null,null,t)},Q.debounce=Vt,Q.defaults=U,Q.defer=function(n){if(!dt(n))throw new ie;
var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},Q.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},Q.difference=function(n){return ut(n,ot(arguments,true,true,1))},Q.filter=Nt,Q.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ot(n,t)},Q.forEach=St,Q.forEachRight=Et,Q.forIn=_,Q.forInRight=function(n,t,e){var r=[];_(n,function(n,t){r.push(t,n)});var u=r.length;
for(t=et(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},Q.forOwn=g,Q.forOwnRight=mt,Q.functions=bt,Q.groupBy=Pe,Q.indexBy=Ke,Q.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=Q.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Ie(Ne(0,u-r),u))},Q.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=vt(),p=f===n,s=a();++r<u;){var v=arguments[r];($e(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))
}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},Q.invert=_t,Q.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},Q.keys=Te,Q.map=Rt,Q.mapValues=function(n,t,e){var r={};return t=Q.createCallback(t,e,3),g(n,function(n,e,u){r[e]=t(n,e,u)
}),r},Q.max=At,Q.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},Q.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=et(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)at(n,t[u],r,o,i);return l(o),l(i),n},Q.min=function(n,t,e){var u=1/0,o=u;
if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&$e(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:Q.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},Q.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];_(n,function(n,t){u.push(t)});for(var u=ut(u,ot(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=Q.createCallback(t,e,3),_(n,function(n,e,u){t(n,e,u)||(r[e]=n)});return r},Q.once=function(n){var t,e;
if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},Q.pairs=function(n){for(var t=-1,e=Te(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},Q.partial=function(n){return pt(n,16,p(arguments,1))},Q.partialRight=function(n){return pt(n,32,null,p(arguments,1))},Q.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ot(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])}else t=Q.createCallback(t,e,3),_(n,function(n,e,u){t(n,e,u)&&(r[e]=n)
});return r},Q.pluck=Le,Q.property=Jt,Q.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},Q.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ne(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},Q.reject=function(n,t,e){return t=Q.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)})},Q.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=Q.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);
return o},Q.rest=qt,Q.shuffle=Tt,Q.sortBy=function(n,t,e){var r=-1,o=$e(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=Q.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},Q.tap=function(n,t){return t(n),n},Q.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)
},Q.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=et(t,e,1);++r<n;)u[r]=t(r);return u},Q.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},Q.transform=function(n,t,e,r){var u=$e(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=tt(o&&o.prototype)}return t&&(t=Q.createCallback(t,r,4),(u?St:g)(n,function(n,r,u){return t(e,n,r,u)})),e},Q.union=function(){return lt(ot(arguments,true,true))},Q.uniq=Pt,Q.values=xt,Q.where=Nt,Q.without=function(n){return ut(n,p(arguments,1))
},Q.wrap=function(n,t){return pt(t,16,[n])},Q.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if($e(e)||yt(e))var r=r?lt(ut(r,e).concat(ut(e,r))):e}return r||[]},Q.zip=Kt,Q.zipObject=Lt,Q.collect=Rt,Q.drop=qt,Q.each=St,Q.eachRight=Et,Q.extend=H,Q.methods=bt,Q.object=Lt,Q.select=Nt,Q.tail=qt,Q.unique=Pt,Q.unzip=Kt,Gt(Q),Q.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),nt(n,t,typeof e=="function"&&et(e,r,1))},Q.cloneDeep=function(n,t,e){return nt(n,true,typeof t=="function"&&et(t,e,1))
},Q.contains=Ct,Q.escape=function(n){return null==n?"":oe(n).replace(qe,st)},Q.every=Ot,Q.find=It,Q.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=Q.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},Q.findKey=function(n,t,e){var r;return t=Q.createCallback(t,e,3),g(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},Q.findLast=function(n,t,e){var r;return t=Q.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0}),r},Q.findLastIndex=function(n,t,e){var r=n?n.length:0;
for(t=Q.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},Q.findLastKey=function(n,t,e){var r;return t=Q.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},Q.has=function(n,t){return n?me.call(n,t):false},Q.identity=Ut,Q.indexOf=Wt,Q.isArguments=yt,Q.isArray=$e,Q.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},Q.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false},Q.isElement=function(n){return n&&1===n.nodeType||false
},Q.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(g(n,function(){return t=false}),t)},Q.isEqual=function(n,t,e,r){return it(n,t,typeof e=="function"&&et(e,r,2))},Q.isFinite=function(n){return xe(n)&&!Ce(parseFloat(n))},Q.isFunction=dt,Q.isNaN=function(n){return jt(n)&&n!=+n},Q.isNull=function(n){return null===n},Q.isNumber=jt,Q.isObject=wt,Q.isPlainObject=h,Q.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
},Q.isString=kt,Q.isUndefined=function(n){return typeof n=="undefined"},Q.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ne(0,r+e):Ie(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},Q.mixin=Gt,Q.noConflict=function(){return e._=le,this},Q.noop=Ht,Q.now=Me,Q.parseInt=Ve,Q.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Ee(),Ie(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):ft(n,t)
},Q.reduce=Dt,Q.reduceRight=$t,Q.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},Q.runInContext=s,Q.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Te(n).length},Q.some=Ft,Q.sortedIndex=zt,Q.template=function(n,t,e){var r=Q.templateSettings;n=oe(n||""),e=U({},e,r);var u,o=U({},e.imports,r.imports),r=Te(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
}),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},Q.unescape=function(n){return null==n?"":oe(n).replace(We,gt)},Q.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
},Q.all=Ot,Q.any=Ft,Q.detect=It,Q.findWhere=It,Q.foldl=Dt,Q.foldr=$t,Q.include=Ct,Q.inject=Dt,Gt(function(){var n={};return g(Q,function(t,e){Q.prototype[e]||(n[e]=t)}),n}(),false),Q.first=Bt,Q.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=Q.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ne(0,u-r))},Q.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[ft(0,n.length-1)]:v:(n=Tt(n),n.length=Ie(Ne(0,t),n.length),n)
},Q.take=Bt,Q.head=Bt,g(Q,function(n,t){var e="sample"!==t;Q.prototype[t]||(Q.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new X(o,u):o})}),Q.VERSION="2.4.0",Q.prototype.chain=function(){return this.__chain__=true,this},Q.prototype.toString=function(){return oe(this.__wrapped__)},Q.prototype.value=Qt,Q.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];Q.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
return n?new X(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];Q.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];Q.prototype[n]=function(){return new X(t.apply(this.__wrapped__,arguments),this.__chain__)}}),Q}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);
/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */

(function($) {
  $.transit = {
    version: "0.9.9",

    // Map of $.css() keys to values for 'transitionProperty'.
    // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
    propertyMap: {
      marginLeft    : 'margin',
      marginRight   : 'margin',
      marginBottom  : 'margin',
      marginTop     : 'margin',
      paddingLeft   : 'padding',
      paddingRight  : 'padding',
      paddingBottom : 'padding',
      paddingTop    : 'padding'
    },

    // Will simply transition "instantly" if false
    enabled: true,

    // Set this to false if you don't want to use the transition end property.
    useTransitionEnd: false
  };

  var div = document.createElement('div');
  var support = {};

  // Helper function to get the proper vendor property name.
  // (`transition` => `WebkitTransition`)
  function getVendorPropertyName(prop) {
    // Handle unprefixed versions (FF16+, for example)
    if (prop in div.style) return prop;

    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    if (prop in div.style) { return prop; }

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }

  // Helper function to check if transform3D is supported.
  // Should return true for Webkits and Firefox 10+.
  function checkTransform3dSupport() {
    div.style[support.transform] = '';
    div.style[support.transform] = 'rotateY(90deg)';
    return div.style[support.transform] !== '';
  }

  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

  // Check for the browser's transitions support.
  support.transition      = getVendorPropertyName('transition');
  support.transitionDelay = getVendorPropertyName('transitionDelay');
  support.transform       = getVendorPropertyName('transform');
  support.transformOrigin = getVendorPropertyName('transformOrigin');
  support.transform3d     = checkTransform3dSupport();

  var eventNames = {
    'transition':       'transitionEnd',
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  // Detect the 'transitionend' event needed.
  var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

  // Populate jQuery's `$.support` with the vendor prefixes we know.
  // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
  // we set $.support.transition to a string of the actual property name used.
  for (var key in support) {
    if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
      $.support[key] = support[key];
    }
  }

  // Avoid memory leak in IE.
  div = null;

  // ## $.cssEase
  // List of easing aliases that you can use with `$.fn.transition`.
  $.cssEase = {
    '_default':       'ease',
    'in':             'ease-in',
    'out':            'ease-out',
    'in-out':         'ease-in-out',
    'snap':           'cubic-bezier(0,1,.5,1)',
    // Penner equations
    'easeOutCubic':   'cubic-bezier(.215,.61,.355,1)',
    'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
    'easeInCirc':     'cubic-bezier(.6,.04,.98,.335)',
    'easeOutCirc':    'cubic-bezier(.075,.82,.165,1)',
    'easeInOutCirc':  'cubic-bezier(.785,.135,.15,.86)',
    'easeInExpo':     'cubic-bezier(.95,.05,.795,.035)',
    'easeOutExpo':    'cubic-bezier(.19,1,.22,1)',
    'easeInOutExpo':  'cubic-bezier(1,0,0,1)',
    'easeInQuad':     'cubic-bezier(.55,.085,.68,.53)',
    'easeOutQuad':    'cubic-bezier(.25,.46,.45,.94)',
    'easeInOutQuad':  'cubic-bezier(.455,.03,.515,.955)',
    'easeInQuart':    'cubic-bezier(.895,.03,.685,.22)',
    'easeOutQuart':   'cubic-bezier(.165,.84,.44,1)',
    'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
    'easeInQuint':    'cubic-bezier(.755,.05,.855,.06)',
    'easeOutQuint':   'cubic-bezier(.23,1,.32,1)',
    'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
    'easeInSine':     'cubic-bezier(.47,0,.745,.715)',
    'easeOutSine':    'cubic-bezier(.39,.575,.565,1)',
    'easeInOutSine':  'cubic-bezier(.445,.05,.55,.95)',
    'easeInBack':     'cubic-bezier(.6,-.28,.735,.045)',
    'easeOutBack':    'cubic-bezier(.175, .885,.32,1.275)',
    'easeInOutBack':  'cubic-bezier(.68,-.55,.265,1.55)'
  };

  // ## 'transform' CSS hook
  // Allows you to use the `transform` property in CSS.
  //
  //     $("#hello").css({ transform: "rotate(90deg)" });
  //
  //     $("#hello").css('transform');
  //     //=> { rotate: '90deg' }
  //
  $.cssHooks['transit:transform'] = {
    // The getter returns a `Transform` object.
    get: function(elem) {
      return $(elem).data('transform') || new Transform();
    },

    // The setter accepts a `Transform` object or a string.
    set: function(elem, v) {
      var value = v;

      if (!(value instanceof Transform)) {
        value = new Transform(value);
      }

      // We've seen the 3D version of Scale() not work in Chrome when the
      // element being scaled extends outside of the viewport.  Thus, we're
      // forcing Chrome to not use the 3d transforms as well.  Not sure if
      // translate is affectede, but not risking it.  Detection code from
      // http://davidwalsh.name/detecting-google-chrome-javascript
      if (support.transform === 'WebkitTransform' && !isChrome) {
        elem.style[support.transform] = value.toString(true);
      } else {
        elem.style[support.transform] = value.toString();
      }

      $(elem).data('transform', value);
    }
  };

  // Add a CSS hook for `.css({ transform: '...' })`.
  // In jQuery 1.8+, this will intentionally override the default `transform`
  // CSS hook so it'll play well with Transit. (see issue #62)
  $.cssHooks.transform = {
    set: $.cssHooks['transit:transform'].set
  };

  // jQuery 1.8+ supports prefix-free transitions, so these polyfills will not
  // be necessary.
  if ($.fn.jquery < "1.8") {
    // ## 'transformOrigin' CSS hook
    // Allows the use for `transformOrigin` to define where scaling and rotation
    // is pivoted.
    //
    //     $("#hello").css({ transformOrigin: '0 0' });
    //
    $.cssHooks.transformOrigin = {
      get: function(elem) {
        return elem.style[support.transformOrigin];
      },
      set: function(elem, value) {
        elem.style[support.transformOrigin] = value;
      }
    };

    // ## 'transition' CSS hook
    // Allows you to use the `transition` property in CSS.
    //
    //     $("#hello").css({ transition: 'all 0 ease 0' });
    //
    $.cssHooks.transition = {
      get: function(elem) {
        return elem.style[support.transition];
      },
      set: function(elem, value) {
        elem.style[support.transition] = value;
      }
    };
  }

  // ## Other CSS hooks
  // Allows you to rotate, scale and translate.
  registerCssHook('scale');
  registerCssHook('translate');
  registerCssHook('rotate');
  registerCssHook('rotateX');
  registerCssHook('rotateY');
  registerCssHook('rotate3d');
  registerCssHook('perspective');
  registerCssHook('skewX');
  registerCssHook('skewY');
  registerCssHook('x', true);
  registerCssHook('y', true);

  // ## Transform class
  // This is the main class of a transformation property that powers
  // `$.fn.css({ transform: '...' })`.
  //
  // This is, in essence, a dictionary object with key/values as `-transform`
  // properties.
  //
  //     var t = new Transform("rotate(90) scale(4)");
  //
  //     t.rotate             //=> "90deg"
  //     t.scale              //=> "4,4"
  //
  // Setters are accounted for.
  //
  //     t.set('rotate', 4)
  //     t.rotate             //=> "4deg"
  //
  // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
  // functions.
  //
  //     t.toString()         //=> "rotate(90deg) scale(4,4)"
  //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
  //
  function Transform(str) {
    if (typeof str === 'string') { this.parse(str); }
    return this;
  }

  Transform.prototype = {
    // ### setFromString()
    // Sets a property from a string.
    //
    //     t.setFromString('scale', '2,4');
    //     // Same as set('scale', '2', '4');
    //
    setFromString: function(prop, val) {
      var args =
        (typeof val === 'string')  ? val.split(',') :
        (val.constructor === Array) ? val :
        [ val ];

      args.unshift(prop);

      Transform.prototype.set.apply(this, args);
    },

    // ### set()
    // Sets a property.
    //
    //     t.set('scale', 2, 4);
    //
    set: function(prop) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      if (this.setter[prop]) {
        this.setter[prop].apply(this, args);
      } else {
        this[prop] = args.join(',');
      }
    },

    get: function(prop) {
      if (this.getter[prop]) {
        return this.getter[prop].apply(this);
      } else {
        return this[prop] || 0;
      }
    },

    setter: {
      // ### rotate
      //
      //     .css({ rotate: 30 })
      //     .css({ rotate: "30" })
      //     .css({ rotate: "30deg" })
      //     .css({ rotate: "30deg" })
      //
      rotate: function(theta) {
        this.rotate = unit(theta, 'deg');
      },

      rotateX: function(theta) {
        this.rotateX = unit(theta, 'deg');
      },

      rotateY: function(theta) {
        this.rotateY = unit(theta, 'deg');
      },

      // ### scale
      //
      //     .css({ scale: 9 })      //=> "scale(9,9)"
      //     .css({ scale: '3,2' })  //=> "scale(3,2)"
      //
      scale: function(x, y) {
        if (y === undefined) { y = x; }
        this.scale = x + "," + y;
      },

      // ### skewX + skewY
      skewX: function(x) {
        this.skewX = unit(x, 'deg');
      },

      skewY: function(y) {
        this.skewY = unit(y, 'deg');
      },

      // ### perspectvie
      perspective: function(dist) {
        this.perspective = unit(dist, 'px');
      },

      // ### x / y
      // Translations. Notice how this keeps the other value.
      //
      //     .css({ x: 4 })       //=> "translate(4px, 0)"
      //     .css({ y: 10 })      //=> "translate(4px, 10px)"
      //
      x: function(x) {
        this.set('translate', x, null);
      },

      y: function(y) {
        this.set('translate', null, y);
      },

      // ### translate
      // Notice how this keeps the other value.
      //
      //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
      //
      translate: function(x, y) {
        if (this._translateX === undefined) { this._translateX = 0; }
        if (this._translateY === undefined) { this._translateY = 0; }

        if (x !== null && x !== undefined) { this._translateX = unit(x, 'px'); }
        if (y !== null && y !== undefined) { this._translateY = unit(y, 'px'); }

        this.translate = this._translateX + "," + this._translateY;
      }
    },

    getter: {
      x: function() {
        return this._translateX || 0;
      },

      y: function() {
        return this._translateY || 0;
      },

      scale: function() {
        var s = (this.scale || "1,1").split(',');
        if (s[0]) { s[0] = parseFloat(s[0]); }
        if (s[1]) { s[1] = parseFloat(s[1]); }

        // "2.5,2.5" => 2.5
        // "2.5,1" => [2.5,1]
        return (s[0] === s[1]) ? s[0] : s;
      },

      rotate3d: function() {
        var s = (this.rotate3d || "0,0,0,0deg").split(',');
        for (var i=0; i<=3; ++i) {
          if (s[i]) { s[i] = parseFloat(s[i]); }
        }
        if (s[3]) { s[3] = unit(s[3], 'deg'); }

        return s;
      }
    },

    // ### parse()
    // Parses from a string. Called on constructor.
    parse: function(str) {
      var self = this;
      str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
        self.setFromString(prop, val);
      });
    },

    // ### toString()
    // Converts to a `transition` CSS property string. If `use3d` is given,
    // it converts to a `-webkit-transition` CSS property string instead.
    toString: function(use3d) {
      var re = [];

      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          // Don't use 3D transformations if the browser can't support it.
          if ((!support.transform3d) && (
            (i === 'rotateX') ||
            (i === 'rotateY') ||
            (i === 'perspective') ||
            (i === 'transformOrigin'))) { continue; }

          if (i[0] !== '_') {
            if (use3d && (i === 'scale')) {
              re.push(i + "3d(" + this[i] + ",1)");
            } else if (use3d && (i === 'translate')) {
              re.push(i + "3d(" + this[i] + ",0)");
            } else {
              re.push(i + "(" + this[i] + ")");
            }
          }
        }
      }

      return re.join(" ");
    }
  };

  function callOrQueue(self, queue, fn) {
    if (queue === true) {
      self.queue(fn);
    } else if (queue) {
      self.queue(queue, fn);
    } else {
      fn();
    }
  }

  // ### getProperties(dict)
  // Returns properties (for `transition-property`) for dictionary `props`. The
  // value of `props` is what you would expect in `$.css(...)`.
  function getProperties(props) {
    var re = [];

    $.each(props, function(key) {
      key = $.camelCase(key); // Convert "text-align" => "textAlign"
      key = $.transit.propertyMap[key] || $.cssProps[key] || key;
      key = uncamel(key); // Convert back to dasherized

      if ($.inArray(key, re) === -1) { re.push(key); }
    });

    return re;
  }

  // ### getTransition()
  // Returns the transition string to be used for the `transition` CSS property.
  //
  // Example:
  //
  //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
  //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
  //
  function getTransition(properties, duration, easing, delay) {
    // Get the CSS properties needed.
    var props = getProperties(properties);

    // Account for aliases (`in` => `ease-in`).
    if ($.cssEase[easing]) { easing = $.cssEase[easing]; }

    // Build the duration/easing/delay attributes for it.
    var attribs = '' + toMS(duration) + ' ' + easing;
    if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

    // For more properties, add them this way:
    // "margin 200ms ease, padding 200ms ease, ..."
    var transitions = [];
    $.each(props, function(i, name) {
      transitions.push(name + ' ' + attribs);
    });

    return transitions.join(', ');
  }

  // ## $.fn.transition
  // Works like $.fn.animate(), but uses CSS transitions.
  //
  //     $("...").transition({ opacity: 0.1, scale: 0.3 });
  //
  //     // Specific duration
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
  //
  //     // With duration and easing
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
  //
  //     // With callback
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
  //
  //     // With everything
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
  //
  //     // Alternate syntax
  //     $("...").transition({
  //       opacity: 0.1,
  //       duration: 200,
  //       delay: 40,
  //       easing: 'in',
  //       complete: function() { /* ... */ }
  //      });
  //
  $.fn.transition = $.fn.transit = function(properties, duration, easing, callback) {
    var self  = this;
    var delay = 0;
    var queue = true;

    var theseProperties = jQuery.extend(true, {}, properties);

    // Account for `.transition(properties, callback)`.
    if (typeof duration === 'function') {
      callback = duration;
      duration = undefined;
    }

    // Account for `.transition(properties, options)`.
    if (typeof duration === 'object') {
      easing = duration.easing;
      delay = duration.delay || 0;
      queue = duration.queue || true;
      callback = duration.complete;
      duration = duration.duration;
    }

    // Account for `.transition(properties, duration, callback)`.
    if (typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }

    // Alternate syntax.
    if (typeof theseProperties.easing !== 'undefined') {
      easing = theseProperties.easing;
      delete theseProperties.easing;
    }

    if (typeof theseProperties.duration !== 'undefined') {
      duration = theseProperties.duration;
      delete theseProperties.duration;
    }

    if (typeof theseProperties.complete !== 'undefined') {
      callback = theseProperties.complete;
      delete theseProperties.complete;
    }

    if (typeof theseProperties.queue !== 'undefined') {
      queue = theseProperties.queue;
      delete theseProperties.queue;
    }

    if (typeof theseProperties.delay !== 'undefined') {
      delay = theseProperties.delay;
      delete theseProperties.delay;
    }

    // Set defaults. (`400` duration, `ease` easing)
    if (typeof duration === 'undefined') { duration = $.fx.speeds._default; }
    if (typeof easing === 'undefined')   { easing = $.cssEase._default; }

    duration = toMS(duration);

    // Build the `transition` property.
    var transitionValue = getTransition(theseProperties, duration, easing, delay);

    // Compute delay until callback.
    // If this becomes 0, don't bother setting the transition property.
    var work = $.transit.enabled && support.transition;
    var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

    // If there's nothing to do...
    if (i === 0) {
      var fn = function(next) {
        self.css(theseProperties);
        if (callback) { callback.apply(self); }
        if (next) { next(); }
      };

      callOrQueue(self, queue, fn);
      return self;
    } else {
      // transition to 'height: auto' and 'width: auto' properly
      for (var j = 0; j < this.length; j++) {
        var elem = this.eq(j);
        $.each(theseProperties, function(key) {
          var value = elem.css(key);
          elem.css(key, value);
        });
      }
    }

    // Save the old transitions of each element so we can restore it later.
    var oldTransitions = {};

    var run = function(nextCall) {
      var bound = false;

      // Prepare the callback.
      var cb = function() {
        $.each(finalProperties, function(key) {
          self.css(key, finalProperties[key]);
        });

        if (bound) { self.unbind(transitionEnd, cb); }

        if (i > 0) {
          self.each(function() {
            this.style[support.transition] = (oldTransitions[this] || null);
          });
        }

        if (typeof callback === 'function') { callback.apply(self); }
        if (typeof nextCall === 'function') { nextCall(); }
      };

      if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
        // Use the 'transitionend' event if it's available.
        bound = true;
        self.bind(transitionEnd, cb);
      } else {
        // Fallback to timers if the 'transitionend' event isn't supported.
        window.setTimeout(cb, i);
      }

      var finalProperties = {};

      // Apply transitions.
      self.each(function() {
        var elem = $(this);

        $.each(theseProperties, function(key) {
          var value = theseProperties[key];
          if (value === '' || value === 'auto') {
            finalProperties[key] = value;
            var prev = elem.css(key);
            elem.css(key, value);
            theseProperties[key] = elem.css(key);
            elem.css(key, prev);
          }
        });

        if (i > 0) {
          this.offsetWidth; // force a repaint
          this.style[support.transition] = transitionValue;
        }
        elem.css(theseProperties);
      });
    };

    // Defer running. This allows the browser to paint any pending CSS it hasn't
    // painted yet before doing the transitions.
    var deferredRun = function(next) {
        run(next);
    };

    // Use jQuery's fx queue.
    callOrQueue(self, queue, deferredRun);

    // Chainability.
    return this;
  };

  function registerCssHook(prop, isPixels) {
    // For certain properties, the 'px' should not be implied.
    if (!isPixels) { $.cssNumber[prop] = true; }

    $.transit.propertyMap[prop] = support.transform;

    $.cssHooks[prop] = {
      get: function(elem) {
        var t = $(elem).css('transit:transform');
        return t.get(prop);
      },

      set: function(elem, value) {
        var t = $(elem).css('transit:transform');
        t.setFromString(prop, value);

        $(elem).css({ 'transit:transform': t });
      }
    };

  }

  // ### uncamel(str)
  // Converts a camelcase string to a dasherized string.
  // (`marginLeft` => `margin-left`)
  function uncamel(str) {
    return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
  }

  // ### unit(number, unit)
  // Ensures that number `number` has a unit. If no unit is found, assume the
  // default is `unit`.
  //
  //     unit(2, 'px')          //=> "2px"
  //     unit("30deg", 'rad')   //=> "30deg"
  //
  function unit(i, units) {
    if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
      return i;
    } else {
      return "" + i + units;
    }
  }

  // ### toMS(duration)
  // Converts given `duration` to a millisecond string.
  //
  // toMS('fast') => $.fx.speeds[i] => "200ms"
  // toMS('normal') //=> $.fx.speeds._default => "400ms"
  // toMS(10) //=> '10ms'
  // toMS('100ms') //=> '100ms'
  //
  function toMS(duration) {
    var i = duration;

    // Allow string durations like 'fast' and 'slow', without overriding numeric values.
    if (typeof i === 'string' && (!i.match(/^[\-0-9\.]+/))) { i = $.fx.speeds[i] || $.fx.speeds._default; }

    return unit(i, 'ms');
  }

  // Export some functions for testable-ness.
  $.transit.getTransitionValue = getTransition;
})(jQuery);

/// Knockout Mapping plugin v2.4.1
/// (c) 2013 Steven Sanderson, Roy Jacobs - http://knockoutjs.com/
/// License: MIT (http://www.opensource.org/licenses/mit-license.php)
(function(e){"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?e(require("knockout"),exports):"function"===typeof define&&define.amd?define(["knockout","exports"],e):e(ko,ko.mapping={})})(function(e,f){function y(b,c){var a,d;for(d in c)if(c.hasOwnProperty(d)&&c[d])if(a=f.getType(b[d]),d&&b[d]&&"array"!==a&&"string"!==a)y(b[d],c[d]);else if("array"===f.getType(b[d])&&"array"===f.getType(c[d])){a=b;for(var e=d,l=b[d],n=c[d],t={},g=l.length-1;0<=g;--g)t[l[g]]=l[g];for(g=
n.length-1;0<=g;--g)t[n[g]]=n[g];l=[];n=void 0;for(n in t)l.push(t[n]);a[e]=l}else b[d]=c[d]}function E(b,c){var a={};y(a,b);y(a,c);return a}function z(b,c){for(var a=E({},b),e=L.length-1;0<=e;e--){var f=L[e];a[f]&&(a[""]instanceof Object||(a[""]={}),a[""][f]=a[f],delete a[f])}c&&(a.ignore=h(c.ignore,a.ignore),a.include=h(c.include,a.include),a.copy=h(c.copy,a.copy),a.observe=h(c.observe,a.observe));a.ignore=h(a.ignore,j.ignore);a.include=h(a.include,j.include);a.copy=h(a.copy,j.copy);a.observe=h(a.observe,
j.observe);a.mappedProperties=a.mappedProperties||{};a.copiedProperties=a.copiedProperties||{};return a}function h(b,c){"array"!==f.getType(b)&&(b="undefined"===f.getType(b)?[]:[b]);"array"!==f.getType(c)&&(c="undefined"===f.getType(c)?[]:[c]);return e.utils.arrayGetDistinctValues(b.concat(c))}function F(b,c,a,d,k,l,n){var t="array"===f.getType(e.utils.unwrapObservable(c));l=l||"";if(f.isMapped(b)){var g=e.utils.unwrapObservable(b)[p];a=E(g,a)}var j=n||k,h=function(){return a[d]&&a[d].create instanceof
Function},x=function(b){var f=G,g=e.dependentObservable;e.dependentObservable=function(a,b,c){c=c||{};a&&"object"==typeof a&&(c=a);var d=c.deferEvaluation,M=!1;c.deferEvaluation=!0;a=new H(a,b,c);if(!d){var g=a,d=e.dependentObservable;e.dependentObservable=H;a=e.isWriteableObservable(g);e.dependentObservable=d;d=H({read:function(){M||(e.utils.arrayRemoveItem(f,g),M=!0);return g.apply(g,arguments)},write:a&&function(a){return g(a)},deferEvaluation:!0});d.__DO=g;a=d;f.push(a)}return a};e.dependentObservable.fn=
H.fn;e.computed=e.dependentObservable;b=e.utils.unwrapObservable(k)instanceof Array?a[d].create({data:b||c,parent:j,skip:N}):a[d].create({data:b||c,parent:j});e.dependentObservable=g;e.computed=e.dependentObservable;return b},u=function(){return a[d]&&a[d].update instanceof Function},v=function(b,f){var g={data:f||c,parent:j,target:e.utils.unwrapObservable(b)};e.isWriteableObservable(b)&&(g.observable=b);return a[d].update(g)};if(n=I.get(c))return n;d=d||"";if(t){var t=[],s=!1,m=function(a){return a};
a[d]&&a[d].key&&(m=a[d].key,s=!0);e.isObservable(b)||(b=e.observableArray([]),b.mappedRemove=function(a){var c="function"==typeof a?a:function(b){return b===m(a)};return b.remove(function(a){return c(m(a))})},b.mappedRemoveAll=function(a){var c=C(a,m);return b.remove(function(a){return-1!=e.utils.arrayIndexOf(c,m(a))})},b.mappedDestroy=function(a){var c="function"==typeof a?a:function(b){return b===m(a)};return b.destroy(function(a){return c(m(a))})},b.mappedDestroyAll=function(a){var c=C(a,m);return b.destroy(function(a){return-1!=
e.utils.arrayIndexOf(c,m(a))})},b.mappedIndexOf=function(a){var c=C(b(),m);a=m(a);return e.utils.arrayIndexOf(c,a)},b.mappedGet=function(a){return b()[b.mappedIndexOf(a)]},b.mappedCreate=function(a){if(-1!==b.mappedIndexOf(a))throw Error("There already is an object with the key that you specified.");var c=h()?x(a):a;u()&&(a=v(c,a),e.isWriteableObservable(c)?c(a):c=a);b.push(c);return c});n=C(e.utils.unwrapObservable(b),m).sort();g=C(c,m);s&&g.sort();s=e.utils.compareArrays(n,g);n={};var J,A=e.utils.unwrapObservable(c),
y={},z=!0,g=0;for(J=A.length;g<J;g++){var r=m(A[g]);if(void 0===r||r instanceof Object){z=!1;break}y[r]=A[g]}var A=[],B=0,g=0;for(J=s.length;g<J;g++){var r=s[g],q,w=l+"["+g+"]";switch(r.status){case "added":var D=z?y[r.value]:K(e.utils.unwrapObservable(c),r.value,m);q=F(void 0,D,a,d,b,w,k);h()||(q=e.utils.unwrapObservable(q));w=O(e.utils.unwrapObservable(c),D,n);q===N?B++:A[w-B]=q;n[w]=!0;break;case "retained":D=z?y[r.value]:K(e.utils.unwrapObservable(c),r.value,m);q=K(b,r.value,m);F(q,D,a,d,b,w,
k);w=O(e.utils.unwrapObservable(c),D,n);A[w]=q;n[w]=!0;break;case "deleted":q=K(b,r.value,m)}t.push({event:r.status,item:q})}b(A);a[d]&&a[d].arrayChanged&&e.utils.arrayForEach(t,function(b){a[d].arrayChanged(b.event,b.item)})}else if(P(c)){b=e.utils.unwrapObservable(b);if(!b){if(h())return s=x(),u()&&(s=v(s)),s;if(u())return v(s);b={}}u()&&(b=v(b));I.save(c,b);if(u())return b;Q(c,function(d){var f=l.length?l+"."+d:d;if(-1==e.utils.arrayIndexOf(a.ignore,f))if(-1!=e.utils.arrayIndexOf(a.copy,f))b[d]=
c[d];else if("object"!=typeof c[d]&&"array"!=typeof c[d]&&0<a.observe.length&&-1==e.utils.arrayIndexOf(a.observe,f))b[d]=c[d],a.copiedProperties[f]=!0;else{var g=I.get(c[d]),k=F(b[d],c[d],a,d,b,f,b),g=g||k;if(0<a.observe.length&&-1==e.utils.arrayIndexOf(a.observe,f))b[d]=g(),a.copiedProperties[f]=!0;else{if(e.isWriteableObservable(b[d])){if(g=e.utils.unwrapObservable(g),b[d]()!==g)b[d](g)}else g=void 0===b[d]?g:e.utils.unwrapObservable(g),b[d]=g;a.mappedProperties[f]=!0}}})}else switch(f.getType(c)){case "function":u()?
e.isWriteableObservable(c)?(c(v(c)),b=c):b=v(c):b=c;break;default:if(e.isWriteableObservable(b))return q=u()?v(b):e.utils.unwrapObservable(c),b(q),q;h()||u();b=h()?x():e.observable(e.utils.unwrapObservable(c));u()&&b(v(b))}return b}function O(b,c,a){for(var d=0,e=b.length;d<e;d++)if(!0!==a[d]&&b[d]===c)return d;return null}function R(b,c){var a;c&&(a=c(b));"undefined"===f.getType(a)&&(a=b);return e.utils.unwrapObservable(a)}function K(b,c,a){b=e.utils.unwrapObservable(b);for(var d=0,f=b.length;d<
f;d++){var l=b[d];if(R(l,a)===c)return l}throw Error("When calling ko.update*, the key '"+c+"' was not found!");}function C(b,c){return e.utils.arrayMap(e.utils.unwrapObservable(b),function(a){return c?R(a,c):a})}function Q(b,c){if("array"===f.getType(b))for(var a=0;a<b.length;a++)c(a);else for(a in b)c(a)}function P(b){var c=f.getType(b);return("object"===c||"array"===c)&&null!==b}function T(){var b=[],c=[];this.save=function(a,d){var f=e.utils.arrayIndexOf(b,a);0<=f?c[f]=d:(b.push(a),c.push(d))};
this.get=function(a){a=e.utils.arrayIndexOf(b,a);return 0<=a?c[a]:void 0}}function S(){var b={},c=function(a){var c;try{c=a}catch(e){c="$$$"}a=b[c];void 0===a&&(a=new T,b[c]=a);return a};this.save=function(a,b){c(a).save(a,b)};this.get=function(a){return c(a).get(a)}}var p="__ko_mapping__",H=e.dependentObservable,B=0,G,I,L=["create","update","key","arrayChanged"],N={},x={include:["_destroy"],ignore:[],copy:[],observe:[]},j=x;f.isMapped=function(b){return(b=e.utils.unwrapObservable(b))&&b[p]};f.fromJS=
function(b){if(0==arguments.length)throw Error("When calling ko.fromJS, pass the object you want to convert.");try{B++||(G=[],I=new S);var c,a;2==arguments.length&&(arguments[1][p]?a=arguments[1]:c=arguments[1]);3==arguments.length&&(c=arguments[1],a=arguments[2]);a&&(c=E(c,a[p]));c=z(c);var d=F(a,b,c);a&&(d=a);if(!--B)for(;G.length;){var e=G.pop();e&&(e(),e.__DO.throttleEvaluation=e.throttleEvaluation)}d[p]=E(d[p],c);return d}catch(f){throw B=0,f;}};f.fromJSON=function(b){var c=e.utils.parseJson(b);
arguments[0]=c;return f.fromJS.apply(this,arguments)};f.updateFromJS=function(){throw Error("ko.mapping.updateFromJS, use ko.mapping.fromJS instead. Please note that the order of parameters is different!");};f.updateFromJSON=function(){throw Error("ko.mapping.updateFromJSON, use ko.mapping.fromJSON instead. Please note that the order of parameters is different!");};f.toJS=function(b,c){j||f.resetDefaultOptions();if(0==arguments.length)throw Error("When calling ko.mapping.toJS, pass the object you want to convert.");
if("array"!==f.getType(j.ignore))throw Error("ko.mapping.defaultOptions().ignore should be an array.");if("array"!==f.getType(j.include))throw Error("ko.mapping.defaultOptions().include should be an array.");if("array"!==f.getType(j.copy))throw Error("ko.mapping.defaultOptions().copy should be an array.");c=z(c,b[p]);return f.visitModel(b,function(a){return e.utils.unwrapObservable(a)},c)};f.toJSON=function(b,c){var a=f.toJS(b,c);return e.utils.stringifyJson(a)};f.defaultOptions=function(){if(0<arguments.length)j=
arguments[0];else return j};f.resetDefaultOptions=function(){j={include:x.include.slice(0),ignore:x.ignore.slice(0),copy:x.copy.slice(0)}};f.getType=function(b){if(b&&"object"===typeof b){if(b.constructor===Date)return"date";if(b.constructor===Array)return"array"}return typeof b};f.visitModel=function(b,c,a){a=a||{};a.visitedObjects=a.visitedObjects||new S;var d,k=e.utils.unwrapObservable(b);if(P(k))a=z(a,k[p]),c(b,a.parentName),d="array"===f.getType(k)?[]:{};else return c(b,a.parentName);a.visitedObjects.save(b,
d);var l=a.parentName;Q(k,function(b){if(!(a.ignore&&-1!=e.utils.arrayIndexOf(a.ignore,b))){var j=k[b],g=a,h=l||"";"array"===f.getType(k)?l&&(h+="["+b+"]"):(l&&(h+="."),h+=b);g.parentName=h;if(!(-1===e.utils.arrayIndexOf(a.copy,b)&&-1===e.utils.arrayIndexOf(a.include,b)&&k[p]&&k[p].mappedProperties&&!k[p].mappedProperties[b]&&k[p].copiedProperties&&!k[p].copiedProperties[b]&&"array"!==f.getType(k)))switch(f.getType(e.utils.unwrapObservable(j))){case "object":case "array":case "undefined":g=a.visitedObjects.get(j);
d[b]="undefined"!==f.getType(g)?g:f.visitModel(j,c,a);break;default:d[b]=c(j,a.parentName)}}});return d}});
