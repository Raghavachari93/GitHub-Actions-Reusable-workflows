import { strict as assert } from "node:assert";
import { hello } from "../app.js";

assert.equal(hello("devops"), "hello devops");

