const STATE_PARTY_COMMAND = 1;
class BattleEngine {
    state: number;
    callback: BattleCallback;

    constructor(callback: BattleCallback) {
        this.callback = callback;
        this.state = STATE_PARTY_COMMAND;
    }

    doNext() {
        switch(this.state) {
        case STATE_PARTY_COMMAND:
            this.callback.showPartyCommand();
            break;
        }
    }

    run() {
        // TODO: to roll dice
        this.callback.didRun();
    }
}

interface BattleCallback {
    showPartyCommand();
    didRun();
}