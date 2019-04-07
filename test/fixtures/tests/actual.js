const displayAddress = function () {
    return `${this.homeNumber$} ${this.city} ${this.postalCode}, ${this.state}`;
}.property('homeNumber', 'city', 'postalCode', 'state');

function cityState() {
    return `${this.city} ${this.state}`;
};

const displayCityState = cityState.bind(someEmberObj).property('city', 'state');

const testObj = EmberObject.extend({
    address: displayAddress,

    fullname: function () {
        return `${this.firstName} ${this.lastName}`;
    }.property("firstName", "lastName"),

    fullname2: function () {
        return `${this.firstName} ${this.lastName}`;
    }['property']("firstName", "lastName"),

    showGroupAvatar: function () {
        return this.get('thread.isGroupChat') || this.get('thread.isEventChat');
    }.property('thread.isGroupChat', 'thread.isEventChat'),

    showMiniProfile: function () {
        return (this.get('isSingleUserChat') || this.get('withMiniProfile')) && !this.get('isInTopMenu');
    }.property('isSingleUserChat', 'withMiniProfile', 'isInTopMenu'),
});