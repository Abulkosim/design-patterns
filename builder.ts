class FormBuilder {
  private form: any = {};

  withInput(name: string, type: string) {
    this.form[name] = { type, element: 'input' };
    return this;
  }

  withSelect(name: string, options: string[]) {
    this.form[name] = { options, element: 'select' };
    return this;
  }

  withValidation(name: string, rules: object) {
    this.form[name] = { ...this.form[name], validation: rules };
    return this;
  }

  build() {
    return this.form;
  }
}

// Usage
const loginForm = new FormBuilder()
  .withInput('email', 'email')
  .withValidation('email', { required: true, email: true })
  .withInput('password', 'password')
  .withValidation('password', { required: true, minLength: 8 })
  .build();

class ComponentBuilder {
  private config: any = {};

  withSize(width: string, height: string) {
    this.config.size = { width, height };
    return this;
  }

  withTheme(theme: string) {
    this.config.theme = theme;
    return this;
  }

  withAnimation(animation: string) {
    this.config.animation = animation;
    return this;
  }

  build() {
    return this.config;
  }
}

// Usage
const modalConfig = new ComponentBuilder()
  .withSize('500px', '300px')
  .withTheme('dark')
  .withAnimation('fade')
  .build();

class DashboardBuilder {
  private widgets: any[] = [];

  addChart(type: string, data: any[]) {
    this.widgets.push({ type: 'chart', chartType: type, data });
    return this;
  }

  addTable(data: object) {
    this.widgets.push({ type: 'table', data });
    return this;
  }

  addNotification(message: string) {
    this.widgets.push({ type: 'notification', message });
    return this;
  }

  build() {
    return { widgets: this.widgets };
  }
}

// Usage
const dashboard = new DashboardBuilder()
  .addChart('line', [1, 2, 3])
  .addTable({ headers: ['Name', 'Age'], rows: [['John', 30]] })
  .addNotification('Welcome!')
  .build();
