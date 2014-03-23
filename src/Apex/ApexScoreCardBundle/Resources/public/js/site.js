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
	
/*	
	self.holeNumToggle = ko.computed(function() {
		if (parseInt(self.noOfHoles(), 10) === 18) {

					var i = 0;
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
		}

		else if (parseInt(self.noOfHoles(), 10) === 9) {

			while (self.holes().length > 9) {

				self.holes.pop();
		
			}
		}
	});
*/
	
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
	
/*	self.courseLengthRed = ko.computed(function() {
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
	}).extend({ throttle: 50 }); */


	self.playerGender = ko.observable("Male");

	self.courseCr = ko.observable(0);
	self.courseSl = ko.observable(0);	


	self.calcPlayingHcp = function(hcp) {
		/* GA PLAYING HANDICAP FORMULA the “EGA Playing Handicap Formula” converts exact handicaps into playing handicaps. PLAYING HCP = EXACT HCP x (SR / 113) + (CR - PAR) */

		/*console.log(self.round_tee());
		console.log(self.courseCr());
		console.log(self.coursePar());*/

		//if (typeof self.round_hcp() === 'undefined' || typeof self.round_tee() === 'undefined' || typeof self.courseCr() === 'undefined' || typeof self.courseSl() === 'undefined' || typeof self.coursePar() === 'undefined') return 0;


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

/*	self.getGolferData = function () {
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
	}; */

/*	self.getGolferById = function (golfer_id) {
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
	}; */
	
	//self.getGolferData();


	/*
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
	} */

	//getRounds();


	function getCourseData (course_id, round_id, cb) {

		var data = { course_id : course_id };
		apexEventProxy.getCourseData(
			{ data : data },
			function (data) {
				//console.log(data);
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
				
				
				self.course_id(course_id);				

				cb();

				var data = { course_id : course_id };

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
			else window.location.href="/home";
			
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


	//self.getCourseGeneralData = function (course_id, cb) {



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

					//self.roundLoaded(true);

					

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
			//self.calcHcpPreview();


		}
		self.calcHcpPreview();		
		setTimeout(function() {
			self.roundLoaded(true);			
		}, 150);



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

	/*self.courseLength = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			if (self.round_tee() === "yellow") s = s + parseInt(self.holes()[i].hole_length_yellow(), 10);
			else if (self.round_tee() === "blue")  s = s + parseInt(self.holes()[i].hole_length_blue(), 10);
			else if (self.round_tee() === "white") s = s + parseInt(self.holes()[i].hole_length_white(), 10);
			else if (self.round_tee() === "red")  s = s + parseInt(self.holes()[i].hole_length_red(), 10);
		}
		return s;
	}).extend({throttle: 1 }); */

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
		if (self.roundLoaded() == true) {
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

	}).extend({throttle: 1 });

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
