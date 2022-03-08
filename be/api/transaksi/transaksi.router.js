const express = require("express");
const router = express.Router();
const { controllerGetAll, controllerGetId, controllerAdd, controllerEdit, controllerDelete } = require("./transaksi.controller");
const authorize = require("../auth/authorize");
const { IsAdminKasir, IsAdmin, IsOwner } = require("../auth/role");

// routes
router.get("/", authorize, IsAdmin, controllerGetAll); //admin 
router.get("/:id_transaksi", authorize, IsAdmin, IsAdminKasir, IsOwner, controllerGetId); //admin 
router.post("/", authorize, IsAdminKasir, controllerAdd); // kasir
router.put("/", authorize, IsAdminKasir, controllerEdit); //kasir
router.delete("/", authorize, IsAdminKasir, controllerDelete); //admin 
module.exports = router;
