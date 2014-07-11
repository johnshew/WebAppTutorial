"use strict";

module demoApp.Controller {

    export class Person {
        name: string;
        age: number;
        id: number;
        constructor(name: string, age: number, id: number = null) {
            this.name = name;
            this.age = age;
            this.id = id;
        }
    };

    export interface IDemoContollerScope extends ng.IScope {
        greeting: string;
    };

    export class demoController {

        private _idGenerator: number;
        static $inject = ['$scope', '$location']; // ensures $inject variable won't get clobbered by minify
        public people: Array<Person>;
        scope: IDemoContollerScope;

        public constructor($scope: IDemoContollerScope) {
            this.scope = $scope;
            this.scope.greeting = "Hello World";

            this.people = [new Person('Chris', 10, 0), new Person('Alex', 11, 1), new Person('Ryan', 12, 1), new Person('Kelly', 13, 1), new Person('Sam', 13, 1)];
            this._idGenerator = this.people.length;
           
            $scope.$watch('controller.sortField', () => { // very import for scoping!!!
                console.log('sortField changed');
                this.sortAscending = true;
            });

            this.scope.$watch('controller.sortField+controller.sortAscending', () => {  // using this.scope (instead of $scope) means you can easily move the code elsewhere.
                console.log('sortField+sortAscending changed');
                this.sort = ((this.sortAscending) ? "+" : "-") + this.sortField;
            });

            this.sortField = 'name'; // will trigger watch
        }

        public sortField: string;
        public sortAscending: boolean;
        public sort: string;
        public filter: string;

        public SortButtonClick(field: string)
        {
            this.sortField = field;
            this.sortAscending = !this.sortAscending;
        }

        // showDetail, detailPerson, editPerson(person)
        public showDetail: boolean;
        public editPerson: Person;

        public AddButtonClick() {
            this.editPerson = { 'name': null, 'age': null, id: null };
            this.showDetail = true;
        }

        public EditPerson(person) {
            this.editPerson = JSON.parse(JSON.stringify(person));
            this.showDetail = true;
        }

        public AddPerson = function () {
            this.editPerson.id = this._idGenerator++;
            this.people.push(this.editPerson);
            this.CancelDetail();
        }

        public DeletePerson() {            
            for (var i = 0; i < this.people.length; i++) {
                if (this.people[i].id == this.editPerson.id) { this.people.splice(i, 1); break; }
            }
            this.CancelDetail();
        }

        public UpdatePerson() {
            var person = this.editPerson;
            for (var i = 0; i < this.people.length; i++) {
                if (this.people[i].id == person.id) {
                    this.people[i] = person;
                    break;
                }
            }
            this.CancelDetail();
        }

        public CancelDetail() {
            this.editPerson = { 'name': null, 'age': null, id: null };
            this.showDetail = null;
        }
    }
}

// Angular specifics
var app = angular.module('demoApp', []);
app.controller('demoController', demoApp.Controller.demoController);
