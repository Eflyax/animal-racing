import { Room, Client } from "colyseus";
import { Schema, MapSchema, type } from "@colyseus/schema";

export class State extends Schema {

  @type("number") foobar: number;

}

export class MyRoom extends Room {

  onCreate(options: any) {
    console.log(options);
  }

  onJoin(client: Client, options: any) {
    console.log('client connected');
  }

  onMessage(client: Client, message: any) {
    if (!message) {
      return;
    }
    console.log('server message: ' + message);
    this.broadcast(message);
  }

  onLeave(client: Client, consented: boolean) {
    console.log('client disconnected');
  }

  onDispose() {
  }

}
