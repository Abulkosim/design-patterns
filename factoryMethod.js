// interface Button {
//   render(): void; 
//   onClick(): void; 
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EmailNotification = /** @class */ (function () {
    function EmailNotification() {
    }
    EmailNotification.prototype.send = function (message) {
        console.log("Sending an email: ".concat(message));
    };
    return EmailNotification;
}());
var SMSNotification = /** @class */ (function () {
    function SMSNotification() {
    }
    SMSNotification.prototype.send = function (message) {
        console.log("Sending a message: ".concat(message));
    };
    return SMSNotification;
}());
var PushNotification = /** @class */ (function () {
    function PushNotification() {
    }
    PushNotification.prototype.send = function (message) {
        console.log("Sending a push notification: ".concat(message));
    };
    return PushNotification;
}());
var NotificationFactory = /** @class */ (function () {
    function NotificationFactory() {
    }
    NotificationFactory.prototype.notify = function (message) {
        var newNotification = this.createNotification();
        newNotification.send(message);
    };
    return NotificationFactory;
}());
var EmailNotificationFactory = /** @class */ (function (_super) {
    __extends(EmailNotificationFactory, _super);
    function EmailNotificationFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailNotificationFactory.prototype.createNotification = function () {
        return new EmailNotification();
    };
    return EmailNotificationFactory;
}(NotificationFactory));
var SMSNotificationFactory = /** @class */ (function (_super) {
    __extends(SMSNotificationFactory, _super);
    function SMSNotificationFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SMSNotificationFactory.prototype.createNotification = function () {
        return new SMSNotification();
    };
    return SMSNotificationFactory;
}(NotificationFactory));
var PushNotificationFactory = /** @class */ (function (_super) {
    __extends(PushNotificationFactory, _super);
    function PushNotificationFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushNotificationFactory.prototype.createNotification = function () {
        return new PushNotification();
    };
    return PushNotificationFactory;
}(NotificationFactory));
function createNotifications(type, message) {
    var newNotification;
    if (type === "email") {
        newNotification = new EmailNotificationFactory();
    }
    else if (type === "sms") {
        newNotification = new SMSNotificationFactory();
    }
    else {
        newNotification = new PushNotificationFactory();
    }
    newNotification.notify(message);
}
createNotifications("push", "Hello how are you!");
