// class OrderManager {
//     constructor() {
//         this.orders = []
//     }

//     placeOrder(order, id) {
//         this.orders.push(id)
//         return `You have successfully ordered ${order} (${id})`;
//     }

//     trackOrder(id) {
//         return `Your order ${id} will arrive in 20 minutes.`
//     }

//     cancelOrder(id) {
//         this.orders = this.orders.filter(order => order.id !== id)
//         return `You have canceled your order ${id}`
//     }
// }

// class OrderManager {
//     constructor() {
//       this.orders = [];
//     }

//     execute(command, ...args) {
//       return command.execute(this.orders, ...args);
//     }
//   }

//   class Command {
//     constructor(execute) {
//       this.execute = execute;
//     }
//   }

//   function PlaceOrderCommand(order, id) {
//     return new Command(orders => {
//       orders.push(id);
//       console.log(`You have successfully ordered ${order} (${id})`);
//     });
//   }

//   function CancelOrderCommand(id) {
//     return new Command(orders => {
//       orders = orders.filter(order => order.id !== id);
//       console.log(`You have canceled your order ${id}`);
//     });
//   }

//   function TrackOrderCommand(id) {
//     return new Command(() =>
//       console.log(`Your order ${id} will arrive in 20 minutes.`)
//     );
//   }

//   const manager = new OrderManager();

//   manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
//   manager.execute(new TrackOrderCommand("1234"));
//   manager.execute(new CancelOrderCommand("1234"));

interface Command {
  execute(): void;
  undo(): void;
}

class TextEditor {
  private content: string = "";

  public getContent() {
    return this.content;
  }

  public setContent(newContent: string): void {
    this.content = newContent;
  }
}

class InsertTextCommand implements Command {
  private previousContent: string = "";

  constructor(
    private editor: TextEditor,
    private textToInsert: string
  ) { }

  public execute(): void {
    this.previousContent = this.editor.getContent();

    this.editor.setContent(this.previousContent + this.textToInsert);
  }

  public undo(): void {
    this.editor.setContent(this.previousContent)
  }
}

class Invoker {
  private history: Command[] = []
  private undone: Command[] = []

  public executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
    this.undone = [];
  }

  public undo(): void {
    const command = this.history.pop(); 
    if (command) {
      command.undo(); 
      this.undone.push(command); 
    }
  }

  public redo(): void {
    const command = this.undone.pop(); 
    if (command) {
      command.execute(); 
      this.history.push(command)
    }
  }
}