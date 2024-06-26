"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assignments_1 = require("../controllers/assignments");
const router = (0, express_1.Router)();
router.post('/', assignments_1.assignTeachersToClasses);
exports.default = router;
