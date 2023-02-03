"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class id_generator {
    uid(id) {
        return Date.now().toString(id) + Math.random().toString(id).substr(2);
    }
}
const uid_generator = new id_generator();
exports.default = uid_generator.uid;
