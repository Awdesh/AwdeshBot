'use strict';

const assert = require('assert');
const chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const hat = require('hat');
const smoochBot = require('smooch-bot');
const MemoryStore = smoochBot.MemoryStore;
const MemoryLock = smoochBot.MemoryLock;
const Bot = smoochBot.Bot;

describe('bot', function() {
    let bot;
    let store;
    let lock;
    let userId;

    beforeEach(function() {
        store = new MemoryStore();
        lock = new MemoryLock();
        userId = hat();
    });

    describe('constructor', function() {
        it('should create a bot', function() {
            bot = new Bot({
                store,
                lock,
                userId
            });

            bot.store.should.equal(store);
            bot.lock.should.equal(lock);
            bot.userId.should.equal(userId);
        });

        for (let omit of ['store', 'lock', 'userId']) {
            it(`should fail if missing prop ${omit}`, function() {
                let options = {
                    store,
                    lock,
                    userId
                };
                delete options[omit];
                expect(() => new Bot(options)).to.throw;
            });
        }
    });

    describe('method', function() {
        beforeEach(function() {
            bot = new Bot({
                store,
                lock,
                userId
            });
        });

        it('#say', function() {
            return bot.say().should.be.fulfilled;
        });
    });
});
