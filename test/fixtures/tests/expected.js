const displayAddress = Ember.computed('homeNumber', 'city', 'postalCode', 'state', function () {
    return `${this.homeNumber$} ${this.city} ${this.postalCode}, ${this.state}`;
});

function cityState() {
    return `${this.city} ${this.state}`;
};

const displayCityState = Ember.computed('city', 'state', cityState.bind(someEmberObj));

const testObj = EmberObject.extend({
    address: displayAddress,

    fullname: Ember.computed("firstName", "lastName", function () {
        return `${this.firstName} ${this.lastName}`;
    }),

    fullname2: Ember.computed("firstName", "lastName", function () {
        return `${this.firstName} ${this.lastName}`;
    }),

    showGroupAvatar: Ember.computed('thread.isGroupChat', 'thread.isEventChat', function () {
        return this.get('thread.isGroupChat') || this.get('thread.isEventChat');
    }),

    showMiniProfile: Ember.computed('isSingleUserChat', 'withMiniProfile', 'isInTopMenu', function () {
        return (this.get('isSingleUserChat') || this.get('withMiniProfile')) && !this.get('isInTopMenu');
    })
});