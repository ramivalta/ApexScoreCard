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

		self.holes.removeAll();
		
		self.saveSuccess(false);
		self.saveFailure(false);
	};
	
	self.newCourse = function() {
		self.resetForm();
		self.noOfHoles("18");
		
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
		$( "#save" ).button({ enabled: true });
		self.course_id("new");

		self.showHoleToggle(true);
		
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
		if (self.addedBy() !== "") {
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
				// response
				
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
//						alert ("success");
//						self.course_id(course_id);
						$("#save").button("enable");
						
						if (self.course_id() === "new") {
	//						console.log("hit");
		/*					var course = {
								name : self.courseName(),
								id : self.course_id()
							}; */

							self.courseList.removeAll();
							self.getCourseList();
							self.course_id(course_id);
						}
						
//						self.courseList().sort();
						
//							self.courseList.push(data.courses[i]);
						
						
						self.saveFailure(false);
						self.saveSuccess(true);
					}
				);
			}
		);
	};
	
	self.coursePar = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_par(), 10);
			}
		return s;
	});

	self.courseLengthRed = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_length_red(), 10);
			}
		return s;
	});

	self.courseLengthBlue = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_length_blue(), 10);
			}
		return s;
	});

	self.courseLengthYellow = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_length_yellow(), 10);
			}
		return s;
	});
	
	self.courseLengthWhite = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_length_white(), 10);
			}
		return s;
	});

	self.getCourseGeneralData = function (course_id) {
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
//					console.log("no adder");
					self.addedBy("");
					self.adderName("");
				}
			}
		);
		self.course_id(course_id);
		self.getHoleData(course_id);
		
//		console.log(self.addedBy());
		
//		if (self.addedBy() !== undefined) {
//			self.getGolferById(parseInt(self.addedBy(), 10));
//		};
		
	};

	self.getHoleData = function(course_id) {
	
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
//				self.setHoleData();

		);

	};
	
		
	self.getCourseList = function (callback) {
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
	};
	
	self.getCourseList();
//	$( "#save" ).button({ enabled: true });
	
/*	self.saveGolfer = function (callback) {
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
	}; */

	self.getGolferData = function () {
			var a;
			apexEventProxy.getGolferData(
			{ a : a },
			function(data) {
				if (data.message === "failed") {
					alert ("not logged in");
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
//			console.log(golfer_id);
			var data = { golfer_id : golfer_id };
			apexEventProxy.getGolferDataById(
			{ data : data },
			function(data) {
				if (data.message !== "failed") {
					self.adderName(data.golfer.name);
//					console.log("adder name " + data.golfer.name);
				}
//				self.playerExactHcp(data.golfer.handicap);
	//			self.playerDefaultTee(data.golfer.tee);
		//		self.playerGender(data.golfer.gender);
			}
		);
	};
	
	self.getGolferData();

}	
	

$(document).ready(function() {

	window.vm = new viewModel();
	ko.applyBindings(vm);
});	
