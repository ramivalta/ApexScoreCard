Number.prototype.mod = function(n) {
return ((this%n)+n)%n;
}

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
	
	
	self.courseList = ko.observableArray([]);

	self.courseData = ko.observableArray([]);
	self.courseHoles = ko.observableArray([]);
	
	
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
	}
	
	self.newCourse = function() {
		self.resetForm();
		
		for (var i = 0; i < 18; i++) {
			self.holes.push({
				hole_number: ko.observable(i+1),
				hole_par: ko.observable(0),
				hole_hcp: ko.observable(),
				hole_length_yellow: ko.observable(0),
				hole_length_blue: ko.observable(0),
				hole_length_red: ko.observable(0),
				hole_length_white: ko.observable(0),
			});
			self.course_id("new");
		}
	};
	
	
	self.saveCourse = function() {
		alert (self.course_id());
	
		// use normal tees if championship tees aren't set.
		if (self.blueTeeEnabled() == false) {
			self.courseCrBlueMen(self.courseCrRedMen());
			self.courseSlBlueMen(self.courseSlRedMen());
			self.courseCrBlueLadies(self.courseCrRedLadies());
			self.courseSlBlueLadies(self.courseSlRedLadies());
		}
		
		if (self.whiteTeeEnabled() == false) {
			self.courseCrWhiteMen(self.courseCrYellowMen());
			self.courseSlWhiteMen(self.courseSlYellowMen());
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
		};
		
		apexEventProxy.saveCourseData(
			{ data : data },
			function (data) {
				// response
				
				var course_id = data.course_id;
				
				if (self.blueTeeEnabled() == false) {
					for (var i = 0; i < self.holes().length; i++) {
					self.holes()[i].hole_length_blue(self.holes()[i].hole_length_red());
					}
				}
				if (self.whiteTeeEnabled() == false) {
					for (var i = 0; i < self.holes().length; i++) {
					self.holes()[i].hole_length_white(self.holes()[i].hole_length_yellow());
					}
				}
				
				var data = ko.toJSON(self.holes());

				apexEventProxy.saveHoleData(
					{ data : data,
					  course_id : course_id },
					function (data) {
					}
				);
			}
		);
	};
	
	self.coursePar = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_par());
			}
		return s;
	});

	self.courseLengthRed = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_length_red());
			}
		return s;
	});

	self.courseLengthBlue = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_length_blue());
			}
		return s;
	});

	self.courseLengthYellow = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_length_yellow());
			}
		return s;
	});
	
	self.courseLengthWhite = ko.computed(function() {
		var s = 0;
		for (var i = 0; i < self.holes().length; i++) {
			s = s + parseInt(self.holes()[i].hole_length_white());
			}
		return s;
	});

	self.getCourseGeneralData = function (course_id) {
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
			}
		);
		self.course_id(course_id);
		self.getHoleData(course_id);
		
	};

	self.getHoleData = function(course_id) {
	
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
			}
//				self.setHoleData();
		);
	};
	
		
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
	
	self.getCourseList();
	
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
}	
	

$(document).ready(function() {
	
	window.vm = new viewModel();
	ko.applyBindings(vm);
});	
