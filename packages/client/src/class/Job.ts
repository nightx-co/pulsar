import EventEmitter from "eventemitter3";

export class Job<T = unknown> extends EventEmitter {
    public defferedStates : { action : 'ack' | 'retry' | 'nack', id : number }[] = [];

    constructor(public id : number, public headers : Record<string, any>, public data : T) {
        super();
    }

    async ack(isDeffered : boolean = true) {
        if(isDeffered) {
            this.defferedStates.push({ action : "ack", id : this.id });
            return;
        }
        this.emit('ack', this);
    }

    async nack(isDeffered : boolean = true) {
        if(isDeffered) {
            this.defferedStates.push({ action : "nack", id : this.id });
            return;
        }
        this.emit('nack', this);
    }

    async retry(isDeffered : boolean = true) {
        if(isDeffered) {
            this.defferedStates.push({ action : "retry", id : this.id });
            return;
        }
        this.emit('retry', this);
    }
}