"use strict";
var demoApp;
(function (demoApp) {
    (function (Controller) {
        var Person = (function () {
            function Person(name, age, id) {
                if (typeof id === "undefined") { id = null; }
                this.name = name;
                this.age = age;
                this.id = id;
            }
            return Person;
        })();
        Controller.Person = Person;
        ;

        ;

        var myController = (function () {
            function myController($scope) {
                var _this = this;
                this.scope = $scope;

                // examples showing how to put properties and functions into $scope.
                this.scope.greeting = "Hello World";
                this.scope.Hello = function (name) {
                    return "Hello " + name;
                };

                this.people = [new Person('Chris', 10, 0), new Person('Alex', 11, 1), new Person('Ryan', 12, 1), new Person('Kelly', 13, 1), new Person('Sam', 13, 1)];
                this._idGenerator = this.people.length;

                $scope.$watch('controller.sortField', function () {
                    console.log('sortField changed');
                    _this.sortAscending = true;
                });

                this.scope.$watch('controller.sortField+controller.sortAscending', function () {
                    console.log('sortField+sortAscending changed');
                    _this.sort = ((_this.sortAscending) ? "+" : "-") + _this.sortField;
                });

                this.sortField = 'name'; // This will trigger the $scope.$watch statements
            }
            myController.prototype.SortButtonClick = function (field) {
                this.sortField = field;
                this.sortAscending = !this.sortAscending;
            };

            myController.prototype.StartAddPerson = function () {
                this.editPerson = { 'name': null, 'age': null, id: null };
                this.showDetail = true;
            };

            myController.prototype.StartEditPerson = function (person) {
                this.editPerson = JSON.parse(JSON.stringify(person));
                this.showDetail = true;
            };

            myController.prototype.CancelEditPerson = function () {
                this.editPerson = { 'name': null, 'age': null, id: null };
                this.showDetail = null;
            };

            myController.prototype.AddPerson = function () {
                this.editPerson.id = this._idGenerator++;
                this.people.push(this.editPerson);
                this.CancelEditPerson();
            };

            myController.prototype.UpdatePerson = function () {
                var person = this.editPerson;
                for (var i = 0; i < this.people.length; i++) {
                    if (this.people[i].id == person.id) {
                        this.people[i] = person;
                        break;
                    }
                }
                this.CancelEditPerson();
            };

            myController.prototype.DeletePerson = function () {
                for (var i = 0; i < this.people.length; i++) {
                    if (this.people[i].id == this.editPerson.id) {
                        this.people.splice(i, 1);
                        break;
                    }
                }
                this.CancelEditPerson();
            };
            return myController;
        })();
        Controller.myController = myController;
    })(demoApp.Controller || (demoApp.Controller = {}));
    var Controller = demoApp.Controller;
})(demoApp || (demoApp = {}));

// Angular specifics
var app = angular.module('demoApp', []);
app.controller('demoController', demoApp.Controller.myController);
//# sourceMappingURL=app.js.map
