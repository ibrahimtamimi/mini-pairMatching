var random = function (max) {
	return Math.floor((Math.random() * max) );
}

var Schedule = function() {
	this.id = 0;
	this.pairsHistory = [];
	this.stdudent = [];
  	this.Schedule = []
  	this.dayBordList = [];
  	this.prepBordList = [];
};

Schedule.prototype.addStudent = function(value) {
  this.id++;
  this.stdudent.push ({
			name : value,
			history : [],
			id : this.id
		});
};

Schedule.prototype.getAllStudent = function() {
  return this.stdudent;
};

Schedule.prototype.shuffleStudent = function() {
	var j, x, i;
    for (i = this.stdudent.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = this.stdudent[i - 1];
        this.stdudent[i - 1] = this.stdudent[j];
        this.stdudent[j] = x;
    };
};

Schedule.prototype.createSlot = function(driver,navigater){
	this.dayBordList.push({
		driver : driver.name,
		navigater : navigater.name
	});
	driver.history.push(navigater.id);
	navigater.history.push(driver.id);
};

Schedule.prototype.dayBord = function () {
	if(this.stdudent.length % 2 !== 0){
		this.stdudent.addStudent('solo')
	}
	this.shuffleStudent();
	var arr = this.stdudent.slice();
	while(arr.length > 0){
		var navigaterId = random(arr.length);
		var driverId = random(arr.length);
		if(arr[driverId].history.indexOf(navigaterId) === -1 && driverId !== navigaterId){
//			console.log(arr[driverId].name, arr[navigaterId].name)
			this.createSlot(arr[driverId],arr[navigaterId]);
			if(navigaterId > driverId){
				arr.splice(navigaterId,1);
				arr.splice(driverId,1);
			}else{
				arr.splice(driverId,1);
				arr.splice(navigaterId,1);
			}
		}
	}	
};

Schedule.prototype.creatrPrepBordList = function (d) {
		for (var i = 0; i < d ; i++) {
			this.dayBord();
			this.prepBordList.push(this.dayBordList);
			this.dayBordList = [];
		}
};


var bord = new Schedule();

bord.dayBordList
bord.creatrPrepBordList(5);