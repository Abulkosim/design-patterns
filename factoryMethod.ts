// UI FACTORY

interface Button {
  render(): void; 
  onClick(): void; 
}

class WebButton implements Button {
  render() {
    console.log("WebButton render");
  }
  onClick() {
    console.log("WebButton onClick");
  }
}

class MobileButton implements Button {
  render() {
    console.log("MobileButton render");
  }
  onClick() {
    console.log("MobileButton onClick");
  }
}

abstract class Dialog {
  abstract createButton(): Button;

  renderDialog(): void {
    const button = this.createButton();
    button.render();
    button.onClick();
  }
}

class WebDialog extends Dialog {
  createButton(): Button {
    return new WebButton();
  }
}

class MobileDialog extends Dialog {
  createButton(): Button {
    return new MobileButton();
  }
}

function runApp(platform: string) {
  let dialog: Dialog;
  if (platform === "web") {
    dialog = new WebDialog();
  } else {
    dialog = new MobileDialog();
  }
  dialog.renderDialog();
}

runApp("web");
runApp("mobile");

// NOTIFICATION FACTORY

interface CustomNotification{
  send(message: string): void;
}

class EmailNotification implements CustomNotification{
  send(message: string): void {
    console.log(`Sending an email: ${message}`)
  }
}

class SMSNotification implements CustomNotification{
  send(message: string): void {
    console.log(`Sending a message: ${message}`)
  }
}

class PushNotification implements CustomNotification{
  send(message: string): void {
    console.log(`Sending a push notification: ${message}`)
  }
}

abstract class NotificationFactory {
  abstract createNotification(): CustomNotification;

  notify(message: string): void {
    const newNotification = this.createNotification()
    newNotification.send(message);
  }
}

class EmailNotificationFactory extends NotificationFactory {
  createNotification():  CustomNotification {
    return new EmailNotification();
  }
}

class SMSNotificationFactory extends NotificationFactory {
  createNotification():  CustomNotification {
    return new SMSNotification();
  }
}

class PushNotificationFactory extends NotificationFactory {
  createNotification():  CustomNotification {
    return new PushNotification();
  }
}


function createNotifications(type: string, message: string) {
  let newNotification: NotificationFactory;
  if (type === "email") {
    newNotification = new EmailNotificationFactory();
  } else if (type === "sms") {
    newNotification = new SMSNotificationFactory();
  } else {
    newNotification = new PushNotificationFactory();
  }
  newNotification.notify(message);
}

createNotifications("push", "Hello how are you!");