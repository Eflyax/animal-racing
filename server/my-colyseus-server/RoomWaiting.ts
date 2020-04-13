import { Room, Client } from "colyseus";
import { Schema, MapSchema, type } from "@colyseus/schema";

export class RoomWaiting extends Room {

  onCreate(options: any) {
    this.autoDispose = false;
    console.log('Waiting room created');
  }

  onJoin(client: Client, options: any) {
    console.log('Client connected to waiting room');
  }

  onMessage(client: Client, message: any) {
  }

  onLeave(client: Client, consented: boolean) {
    console.log('Client diconnected from waiting room');
  }

  onDispose() {
  }

}
