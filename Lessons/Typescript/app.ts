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
        greeting: string; // Showing that you can still put properties and functions into scope
        Hello(string): string;
    };

    export class myController {

        private _idGenerator: number;
        public people: Array<Person>;
        scope: IDemoContollerScope;

        public constructor($scope: IDemoContollerScope) {
            this.scope = $scope;            

            // examples showing how to put properties and functions into $scope.
            this.scope.greeting = "Hello World";
            this.scope.Hello = (name) => //  use this form of function definition to ensure access to 'this' and proper scoping.
            {
                return "Hello " + name;
            }

            this.people = [new Person('Chris', 10, 0), new Person('Alex', 11, 1), new Person('Ryan', 12, 1), new Person('Kelly', 13, 1), new Person('Sam', 13, 1)];
            this._idGenerator = this.people.length;
           
            $scope.$watch('controller.sortField', () => // This form of function defintition very import for scoping!!!
            { 
                console.log('sortField changed');
                this.sortAscending = true;
            });

            this.scope.$watch('controller.sortField+controller.sortAscending', () => {  // Note that using this.scope... (instead of $scope...) means you can easily move the code elsewhere.
                console.log('sortField+sortAscending changed');
                this.sort = ((this.sortAscending) ? "+" : "-") + this.sortField;
            });

            this.sortField = 'name'; // This will trigger the $scope.$watch statements
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

        // showDetail, editPerson, EditPerson()
        public showDetail: boolean;
        public editPerson: Person; // Temporary person to hold edits to a new or existing person.  
        
        public StartAddPerson() {
            this.editPerson = { 'name': null, 'age': null, id: null };
            this.showDetail = true;
        }

        public StartEditPerson(person: Person) // Start editing an existing person.
        {
            this.editPerson = JSON.parse(JSON.stringify(person));
            this.showDetail = true;
        }

        public CancelEditPerson() { // Cancel editting.
            this.editPerson = { 'name': null, 'age': null, id: null };
            this.showDetail = null;
        }


        public AddPerson()
        {
            this.editPerson.id = this._idGenerator++;
            this.people.push(this.editPerson);
            this.CancelEditPerson();
        }


        public UpdatePerson()
        {
            var person = this.editPerson;
            for (var i = 0; i < this.people.length; i++) {
                if (this.people[i].id == person.id) {
                    this.people[i] = person;
                    break;
                }
            }
            this.CancelEditPerson();
        }

        public DeletePerson()
        {            
            for (var i = 0; i < this.people.length; i++) {
                if (this.people[i].id == this.editPerson.id) { this.people.splice(i, 1); break; }
            }
            this.CancelEditPerson();
        }
    }
}

// Angular specifics
var app = angular.module('demoApp', []);
app.controller('demoController', demoApp.Controller.myController);
